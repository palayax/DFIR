import test from 'node:test';
import assert from 'node:assert/strict';
import { detect as detectIrtriage, parse as parseIrtriage } from '../assets/js/ingest/irtriage-csv.js';
import { recordToCsvRow, CSV_COLUMNS } from '../assets/js/lib/csv-projection.js';
import { stringifyCsvRow, parseCsvSync, sniffDelimiter } from '../assets/js/lib/csv.js';

function toFile(text, name) {
  return new File([text], name);
}

function makeRecord(overrides = {}) {
  return {
    schema_version: '1.0.0',
    row_hash: 'b'.repeat(64),
    timestamp_utc: '2026-01-01T00:00:00.0000000Z',
    timestamp_desc: 'Modified',
    source: 'filesystem',
    artifact: 'Generic.Collectors.File',
    host: 'HOST-A',
    message: 'a file changed',
    target: 'C:\\evil.exe',
    detections: [{ engine: 'sigma', rule_name: 'Suspicious Exe', severity: 'high' }],
    ...overrides,
  };
}

function buildCsvText(records) {
  const bom = '\uFEFF';
  const header = stringifyCsvRow(CSV_COLUMNS, ',');
  const rows = records.map((r) => stringifyCsvRow(recordToCsvRow(r), ','));
  return bom + [header, ...rows].join('\r\n') + '\r\n';
}

test('detect() recognises the native CSV projection by its header columns', async () => {
  const text = buildCsvText([makeRecord()]);
  assert.equal(await detectIrtriage(toFile(text, 'timeline.csv')), true);
});

test('detect() rejects an arbitrary CSV', async () => {
  const text = 'colA,colB\n1,2\n';
  assert.equal(await detectIrtriage(toFile(text, 'other.csv')), false);
});

test('parse() reverses the flattening back into nested records', async () => {
  const original = makeRecord();
  const text = buildCsvText([original]);
  const out = [];
  for await (const r of parseIrtriage(toFile(text, 'timeline.csv'))) out.push(r);
  assert.equal(out.length, 1);
  const r = out[0];
  assert.equal(r.timestamp_utc, original.timestamp_utc);
  assert.equal(r.source, original.source);
  assert.equal(r.target, original.target);
  assert.equal(r.row_hash, original.row_hash);
  assert.deepEqual(r.detections, [{ engine: 'sigma', rule_name: 'Suspicious Exe', severity: 'high' }]);
});

test('nasty CSV: embedded commas, quotes, CRLF and BOM parse cleanly', async () => {
  const nasty = makeRecord({
    message: 'quote " comma , and\nnewline inside field',
    target: 'C:\\Users\\Bob\\a,b"c.txt',
  });
  const text = buildCsvText([nasty]);
  assert.equal(text.charCodeAt(0), 0xfeff);
  const out = [];
  for await (const r of parseIrtriage(toFile(text, 'timeline.csv'))) out.push(r);
  assert.equal(out.length, 1);
  assert.equal(out[0].message, nasty.message);
  assert.equal(out[0].target, nasty.target);
});

test('unicode fields survive the round trip', async () => {
  const rec = makeRecord({ message: '文件已更改 — évènement', user: 'DOMAIN\\jos\u00e9' });
  const text = buildCsvText([rec]);
  const out = [];
  for await (const r of parseIrtriage(toFile(text, 'timeline.csv'))) out.push(r);
  assert.equal(out[0].message, rec.message);
  assert.equal(out[0].user, rec.user);
});

test('sniffDelimiter picks the dominant consistent delimiter', () => {
  assert.equal(sniffDelimiter('a,b,c\n1,2,3\n'), ',');
  assert.equal(sniffDelimiter('a;b;c\n1;2;3\n'), ';');
  assert.equal(sniffDelimiter('a\tb\tc\n1\t2\t3\n'), '\t');
});

test('parseCsvSync handles a quoted field spanning a comma and an escaped quote', () => {
  const { rows } = parseCsvSync('h1,h2\n"a,b","he said ""hi"""\n');
  assert.deepEqual(rows, [['h1', 'h2'], ['a,b', 'he said "hi"']]);
});
