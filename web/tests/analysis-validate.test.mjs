// web/tests/analysis-validate.test.mjs
//
// validate-report.js is the last line of defense before a report reaches the
// dashboard (C6) or PDF exporter (C7): schema conformance plus the semantic
// checks JSON Schema cannot express - most importantly that every evidence
// citation is a row_hash that actually exists in the SuperTimeline that was
// analysed (a fabricated citation is treated as a hard validation failure,
// not a warning). This file checks: a fully valid report passes; each
// failure mode is caught with a structured, actionable error; and the
// vendored schema copy never silently drifts from docs/report_schema.json
// (same pattern as tests/schema.test.mjs for the timeline schema).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateReport, loadReportSchema, formatReportErrors } from '../assets/js/analysis/validate-report.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CANONICAL_SCHEMA_PATH = path.join(HERE, '..', '..', 'docs', 'report_schema.json');
const VENDORED_SCHEMA_PATH = path.join(HERE, '..', 'assets', 'js', 'analysis', 'report_schema.json');

test('the vendored schema copy (web/assets/js/analysis/report_schema.json) is byte-identical to docs/report_schema.json', async () => {
  const canonical = await readFile(CANONICAL_SCHEMA_PATH, 'utf8');
  const vendored = await readFile(VENDORED_SCHEMA_PATH, 'utf8');
  assert.equal(vendored, canonical, 'web/assets/js/analysis/report_schema.json has drifted from docs/report_schema.json - copy the canonical file over it');
});

test('loadReportSchema() parses the vendored schema and finds the expected top-level shape', async () => {
  const schema = await loadReportSchema();
  assert.equal(schema.type, 'object');
  assert.deepEqual(schema.required, ['schema_version', 'meta', 'scope', 'verdict', 'executive_summary', 'findings', 'dashboard', 'provenance']);
  assert.deepEqual(schema.properties.meta.required, ['generated_utc', 'engagement', 'model']);
});

// ---------------------------------------------------------------------------
// a fully valid report (hand-built, satisfying every `required` at every level)
// ---------------------------------------------------------------------------

const HASH_A = 'a'.repeat(64);
const HASH_B = 'b'.repeat(64);

function validReport(overrides = {}) {
  return {
    schema_version: '1.0.0',
    meta: {
      generated_utc: '2026-01-05T00:00:00.000Z',
      engagement: {},
      model: { provider: 'mock', model_id: 'mock-1' },
    },
    scope: {
      hosts: [{ host: 'HOST-A', row_count: 2 }],
      row_count: 2,
      time_range: { start_utc: '2026-01-05T00:00:00.000Z', end_utc: '2026-01-05T01:00:00.000Z' },
    },
    verdict: { assessment: 'suspicious_activity', confidence: 'moderate' },
    executive_summary: { text: 'Something happened.' },
    findings: [
      {
        id: 'F-001',
        title: 'Suspicious PowerShell',
        severity: 'high',
        confidence: 'high',
        narrative: 'Encoded PowerShell launched from Word.',
        evidence: [{ row_hash: HASH_A }],
        mitre_techniques: ['T1059.001'],
      },
    ],
    dashboard: {
      events_over_time: [{ bucket_utc: '2026-01-05T00:00:00.000Z', count: 2, by_severity: { high: 1, none: 1 } }],
      severity_distribution: { high: 1, none: 1 },
    },
    provenance: { evidence_pack_digest: 'digest-abc' },
    ...overrides,
  };
}

const RECORDS = [{ row_hash: HASH_A }, { row_hash: HASH_B }];

test('validateReport: a fully valid report passes with no errors', async () => {
  const result = await validateReport(validReport(), { records: RECORDS });
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.skipped, []);
});

test('validateReport: without records/rowHashes, the fabricated-citation check is explicitly skipped (not silently passed)', async () => {
  const result = await validateReport(validReport());
  assert.equal(result.valid, true);
  assert.equal(result.skipped.length, 1);
  assert.match(result.skipped[0], /fabricated_citation/);
});

test('validateReport: missing a required top-level key fails schema validation', async () => {
  const report = validReport();
  delete report.verdict;
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.code === 'schema_violation'));
});

test('validateReport: meta.engagement missing entirely fails schema validation (its own sub-fields are optional, but the key is required)', async () => {
  const report = validReport();
  delete report.meta.engagement;
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.code === 'schema_violation'));
});

test('validateReport: a fabricated row_hash citation (well-formed but not in the supplied timeline) is a hard error', async () => {
  const fabricated = 'f'.repeat(64);
  const report = validReport();
  report.findings[0].evidence.push({ row_hash: fabricated });
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, false);
  const err = result.errors.find((e) => e.code === 'fabricated_citation');
  assert.ok(err, 'expected a fabricated_citation error');
  assert.equal(err.rowHash, fabricated);
  assert.equal(err.findingId, 'F-001');
});

test('validateReport: rowHashes option (a bare Set) works the same as records', async () => {
  const result = await validateReport(validReport(), { rowHashes: new Set([HASH_A, HASH_B]) });
  assert.equal(result.valid, true);
});

test('validateReport: duplicate finding ids are caught', async () => {
  const report = validReport();
  report.findings.push({ ...report.findings[0], title: 'A different title, same id' });
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.code === 'duplicate_finding_id'));
});

test('validateReport: an invalid finding id pattern is caught by the schema pattern check', async () => {
  const report = validReport();
  report.findings[0].id = 'F-1'; // wrong width
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.code === 'schema_violation' && e.path.includes('findings')));
});

test('validateReport: mitre_coverage[].technique_id must match the MITRE technique pattern (semantic check, no `pattern` in the schema itself)', async () => {
  const report = validReport({ mitre_coverage: [{ technique_id: 'not-a-technique', event_count: 1, max_severity: 'high' }] });
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.code === 'invalid_mitre_technique_id'));
});

test('validateReport: a valid mitre_coverage technique_id (with sub-technique suffix) passes', async () => {
  const report = validReport({
    mitre_coverage: [{ technique_id: 'T1059.001', event_count: 1, max_severity: 'high', finding_ids: ['F-001'] }],
  });
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, true);
});

test('validateReport: mitre_coverage[].max_severity inconsistent with the findings it cites is caught', async () => {
  const report = validReport({
    mitre_coverage: [{ technique_id: 'T1059.001', event_count: 1, max_severity: 'low', finding_ids: ['F-001'] }], // F-001 is severity 'high'
  });
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, false);
  const err = result.errors.find((e) => e.code === 'severity_max_mismatch');
  assert.ok(err);
  assert.match(err.message, /imply "high"/);
});

test('validateReport: additionalProperties:false is enforced (an author-invented top-level key fails)', async () => {
  const report = validReport({ made_up_field: 'nope' });
  const result = await validateReport(report, { records: RECORDS });
  assert.equal(result.valid, false);
  assert.ok(result.errors.some((e) => e.code === 'schema_violation'));
});

test('validateReport: a non-object report is rejected without throwing', async () => {
  const result = await validateReport(null);
  assert.equal(result.valid, false);
  assert.equal(result.errors[0].code, 'not_an_object');
});

test('formatReportErrors: renders a readable one-line-per-error string', async () => {
  const report = validReport();
  delete report.verdict;
  const result = await validateReport(report, { records: RECORDS });
  const text = formatReportErrors(result.errors);
  assert.equal(typeof text, 'string');
  assert.ok(text.length > 0);
  assert.ok(text.split('\n').length >= result.errors.length);
});
