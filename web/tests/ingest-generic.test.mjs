import test from 'node:test';
import assert from 'node:assert/strict';
import { sniff as sniffCsv, parse as parseGenericCsv } from '../assets/js/ingest/generic-csv.js';
import { sniff as sniffJson, parse as parseGenericJson } from '../assets/js/ingest/generic-json.js';
import { validateRecord } from '../assets/js/lib/validate-schema.js';

function toFile(text, name) {
  return new File([text], name);
}

test('generic-csv: sniff() proposes a plausible mapping from arbitrary headers', async () => {
  const text = 'Date,Computer,Details,User\n2026-02-01T10:00:00Z,WKS01,Login succeeded,alice\n';
  const { headers, sampleRows, suggestedMapping } = await sniffCsv(toFile(text, 'weird.csv'));
  assert.deepEqual(headers, ['Date', 'Computer', 'Details', 'User']);
  assert.equal(sampleRows.length, 1);
  assert.equal(suggestedMapping.timestamp_utc, 'Date');
  assert.equal(suggestedMapping.host, 'Computer');
  assert.equal(suggestedMapping.user, 'User');
});

test('generic-csv: parse() with a confirmed mapping produces schema-valid records', async () => {
  const text = 'Date,Computer,Details,User\r\n2026-02-01T10:00:00Z,WKS01,"Login succeeded, with a comma",alice\r\n';
  const mapping = { timestamp_utc: 'Date', host: 'Computer', message: 'Details', user: 'User' };
  const out = [];
  for await (const r of parseGenericCsv(toFile(text, 'weird.csv'), { mapping, defaults: { source: 'account', artifact: 'weird.csv' } })) {
    out.push(r);
  }
  assert.equal(out.length, 1);
  assert.equal(out[0].host, 'WKS01');
  assert.equal(out[0].message, 'Login succeeded, with a comma');
  assert.equal(out[0].timestamp_utc, '2026-02-01T10:00:00.0000000Z');
  const { valid, errors } = await validateRecord(out[0]);
  assert.equal(valid, true, JSON.stringify(errors));
});

test('generic-csv: nasty CSV with embedded newline inside a quoted field', async () => {
  const text = 'Date,Computer,Details,User\n2026-02-01T10:00:00Z,WKS01,"line one\nline two",alice\n';
  const mapping = { timestamp_utc: 'Date', host: 'Computer', message: 'Details', user: 'User' };
  const out = [];
  for await (const r of parseGenericCsv(toFile(text, 'weird.csv'), { mapping })) out.push(r);
  assert.equal(out.length, 1);
  assert.equal(out[0].message, 'line one\nline two');
});

test('generic-csv: unmapped timestamp falls back to the unknown sentinel', async () => {
  const text = 'A,B\nx,y\n';
  const mapping = { message: 'A' };
  const out = [];
  for await (const r of parseGenericCsv(toFile(text, 'noTime.csv'), { mapping })) out.push(r);
  assert.equal(out[0].timestamp_utc, '0001-01-01T00:00:00.0000000Z');
});

test('generic-json: JSONL input with field mapping', async () => {
  const lines = [
    { ts: '2026-03-01T00:00:00Z', who: 'bob', what: 'ran calc.exe' },
    { ts: '2026-03-01T00:05:00Z', who: 'bob', what: 'opened notepad.exe' },
  ];
  const text = lines.map((l) => JSON.stringify(l)).join('\n');
  const { suggestedMapping } = await sniffJson(toFile(text, 'log.jsonl'));
  assert.equal(suggestedMapping.timestamp_utc, undefined); // "ts" isn't a recognised alias — mapping stays manual
  const mapping = { timestamp_utc: 'ts', user: 'who', message: 'what' };
  const out = [];
  for await (const r of parseGenericJson(toFile(text, 'log.jsonl'), { mapping, defaults: { source: 'process', artifact: 'log.jsonl' } })) {
    out.push(r);
  }
  assert.equal(out.length, 2);
  assert.equal(out[1].message, 'opened notepad.exe');
  assert.equal(out[1].user, 'bob');
});

test('generic-json: top-level JSON array input', async () => {
  const arr = [{ time: '2026-04-01T00:00:00Z', msg: 'event A' }, { time: '2026-04-01T01:00:00Z', msg: 'event B' }];
  const text = JSON.stringify(arr);
  const mapping = { timestamp_utc: 'time', message: 'msg' };
  const out = [];
  for await (const r of parseGenericJson(toFile(text, 'arr.json'), { mapping })) out.push(r);
  assert.equal(out.length, 2);
  assert.equal(out[0].message, 'event A');
  const { valid, errors } = await validateRecord(out[0]);
  assert.equal(valid, true, JSON.stringify(errors));
});
