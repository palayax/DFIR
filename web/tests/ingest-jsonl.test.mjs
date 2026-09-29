import test from 'node:test';
import assert from 'node:assert/strict';
import { detect, parse } from '../assets/js/ingest/irtriage-jsonl.js';
import { validateRecord } from '../assets/js/lib/validate-schema.js';

function makeRecord(overrides = {}) {
  return {
    schema_version: '1.0.0',
    row_hash: 'a'.repeat(64),
    timestamp_utc: '2026-01-01T00:00:00.0000000Z',
    timestamp_desc: 'Modified',
    source: 'filesystem',
    artifact: 'Generic.Collectors.File',
    host: 'HOST-A',
    message: 'test row',
    ...overrides,
  };
}

function toFile(text, name) {
  return new File([text], name);
}

test('detect() recognises a schema-conformant JSONL file', async () => {
  const text = JSON.stringify(makeRecord()) + '\n' + JSON.stringify(makeRecord({ timestamp_desc: 'Accessed' })) + '\n';
  const file = toFile(text, 'timeline.jsonl');
  assert.equal(await detect(file), true);
});

test('detect() rejects a non-JSONL file', async () => {
  const file = toFile('not json at all\nsecond line', 'notes.jsonl');
  assert.equal(await detect(file), false);
});

test('parse() yields one record per non-blank line, preserving order', async () => {
  const recs = [makeRecord({ target: 'a' }), makeRecord({ target: 'b' }), makeRecord({ target: 'c' })];
  const text = recs.map((r) => JSON.stringify(r)).join('\n') + '\n\n'; // trailing blank line
  const file = toFile(text, 'timeline.jsonl');
  const out = [];
  for await (const r of parse(file)) out.push(r);
  assert.deepEqual(out.map((r) => r.target), ['a', 'b', 'c']);
});

test('parse() throws a clear, line-numbered error on malformed JSON', async () => {
  const text = JSON.stringify(makeRecord()) + '\n{not valid json\n';
  const file = toFile(text, 'timeline.jsonl');
  await assert.rejects(async () => {
    for await (const _ of parse(file)) { /* drain */ }
  }, /line 2/);
});

test('parsed records pass schema validation', async () => {
  const file = toFile(JSON.stringify(makeRecord()) + '\n', 'timeline.jsonl');
  for await (const r of parse(file)) {
    const { valid, errors } = await validateRecord(r);
    assert.equal(valid, true, JSON.stringify(errors));
  }
});
