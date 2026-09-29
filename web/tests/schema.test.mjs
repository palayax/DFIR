import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateAgainst, validateRecord, formatErrors, loadSchema } from '../assets/js/lib/validate-schema.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CANONICAL_SCHEMA_PATH = path.join(HERE, '..', '..', 'docs', 'timeline_schema.json');
const VENDORED_SCHEMA_PATH = path.join(HERE, '..', 'assets', 'schema', 'timeline_schema.json');
const FIXTURES = path.join(HERE, '..', 'fixtures');

async function loadJsonl(file) {
  const text = await readFile(path.join(FIXTURES, file), 'utf8');
  return text.split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
}

function validRecord(overrides = {}) {
  return {
    schema_version: '1.0.0',
    row_hash: 'a'.repeat(64),
    timestamp_utc: '2026-01-01T00:00:00.0000000Z',
    timestamp_desc: 'Modified',
    source: 'filesystem',
    artifact: 'Generic.Collectors.File',
    host: 'HOST-A',
    message: 'valid row',
    ...overrides,
  };
}

test('the vendored schema copy (web/assets/schema/) is byte-identical to docs/timeline_schema.json', async () => {
  const canonical = await readFile(CANONICAL_SCHEMA_PATH, 'utf8');
  const vendored = await readFile(VENDORED_SCHEMA_PATH, 'utf8');
  assert.equal(vendored, canonical, 'web/assets/schema/timeline_schema.json has drifted from docs/timeline_schema.json - copy the canonical file over it');
});

test('loadSchema() parses the vendored schema and finds the expected top-level shape', async () => {
  const schema = await loadSchema();
  assert.equal(schema.title, 'IRTriage Unified Timeline Record');
  assert.ok(Array.isArray(schema.required));
  assert.ok(schema.properties.timestamp_utc);
});

test('a minimal valid record passes validation with zero errors', async () => {
  const { valid, errors } = await validateRecord(validRecord());
  assert.equal(valid, true, formatErrors(errors));
});

test('every record in the 200-row IRTriage JSONL fixture passes schema validation', async () => {
  const records = await loadJsonl('irtriage-sample.jsonl');
  for (const [i, r] of records.entries()) {
    const { valid, errors } = await validateRecord(r);
    assert.equal(valid, true, `fixture record ${i} failed validation:\n${formatErrors(errors)}`);
  }
});

test('every record in the second-host JSONL fixture passes schema validation', async () => {
  const records = await loadJsonl('irtriage-sample-host2.jsonl');
  for (const [i, r] of records.entries()) {
    const { valid, errors } = await validateRecord(r);
    assert.equal(valid, true, `fixture record ${i} failed validation:\n${formatErrors(errors)}`);
  }
});

test('missing a required property produces a useful, path-qualified error', async () => {
  const rec = validRecord();
  delete rec.message;
  const { valid, errors } = await validateRecord(rec);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.message.includes('message')), formatErrors(errors));
});

test('a malformed timestamp_utc (wrong fractional-digit count) fails the pattern check', async () => {
  const rec = validRecord({ timestamp_utc: '2026-01-01T00:00:00.123Z' });
  const { valid, errors } = await validateRecord(rec);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.path === '$.timestamp_utc'), formatErrors(errors));
});

test('an invalid row_hash (not 64 hex chars) fails the pattern check', async () => {
  const rec = validRecord({ row_hash: 'not-a-hash' });
  const { valid, errors } = await validateRecord(rec);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.path === '$.row_hash'), formatErrors(errors));
});

test('an out-of-vocabulary source enum value fails', async () => {
  const rec = validRecord({ source: 'not_a_real_source' });
  const { valid, errors } = await validateRecord(rec);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.path === '$.source'), formatErrors(errors));
});

test('an unknown top-level property is rejected (additionalProperties: false)', async () => {
  const rec = validRecord({ totally_made_up_field: 'x' });
  const { valid, errors } = await validateRecord(rec);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.path.includes('totally_made_up_field')), formatErrors(errors));
});

test('a detections[] entry missing its required severity fails with a nested path', async () => {
  const rec = validRecord({ detections: [{ engine: 'sigma', rule_name: 'x' }] });
  const { valid, errors } = await validateRecord(rec);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.path === '$.detections[0]' && e.message.includes('severity')), formatErrors(errors));
});

test('an invalid mitre_techniques entry (wrong pattern) fails', async () => {
  const rec = validRecord({ detections: [{ engine: 'sigma', rule_name: 'x', severity: 'high', mitre_techniques: ['not-a-technique'] }] });
  const { valid, errors } = await validateRecord(rec);
  assert.equal(valid, false);
  assert.ok(errors.some((e) => e.path === '$.detections[0].mitre_techniques[0]'), formatErrors(errors));
});

test('validateAgainst on a plain sub-schema works standalone (not just via validateRecord)', async () => {
  const schema = await loadSchema();
  const errors = validateAgainst(schema.properties.severity_max, 'critical', '$.severity_max');
  assert.deepEqual(errors, []);
  const badErrors = validateAgainst(schema.properties.severity_max, 'extreme', '$.severity_max');
  assert.equal(badErrors.length, 1);
});
