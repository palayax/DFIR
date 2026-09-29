// Drives the WHOLE analysis pipeline through the real mock provider with NOTHING
// canned -- i.e. exactly what happens when an analyst picks "Mock Provider
// (offline / dry run)" in Settings and presses Run analysis.
//
// This is the test that was missing. tests/analysis-pipeline.test.mjs covers
// analyze() thoroughly, but every one of its cases registers canned responses
// keyed by request hash, so the mock's DEFAULT path was never exercised through
// the pipeline. Measured against a real 1,643-row collection, that default path
// failed every map call ("Model response was not valid JSON", swallowed into
// warnings[]) and then failed the reduce call fatally -- so the zero-cost dry run
// that docs/WEB_APP.md and the app's Settings copy both recommend did not work at
// all, while 254 tests passed.
//
// Keep this test provider-default-driven: do NOT add setCanned() calls. Its whole
// value is that it asserts the out-of-the-box behaviour.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { analyze } from '../assets/js/analysis/pipeline.js';
import { computeDashboard } from '../assets/js/analysis/dashboard.js';
import { validateReport } from '../assets/js/analysis/validate-report.js';
import { createMockProvider } from '../assets/js/providers/mock.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));

async function loadRecords() {
  const raw = await readFile(path.join(HERE, '..', 'fixtures', 'analysis', 'intrusion-timeline.json'), 'utf8');
  const records = JSON.parse(raw);
  assert.ok(Array.isArray(records) && records.length > 0, 'fixture must be a non-empty record array');
  return records;
}

describe('offline dry run (mock provider, nothing canned)', () => {
  test('analyze() completes and returns a schema-valid report', async () => {
    const records = await loadRecords();
    const provider = createMockProvider();
    const phases = [];

    const report = await analyze(records, {
      provider,
      model: 'mock-standard',
      onProgress: (e) => phases.push({ phase: e.phase, failed: Boolean(e.failed) }),
    });

    // Every map pack must have SUCCEEDED. A dry run whose packs all fail still
    // produces a report (failures are non-fatal by design), so asserting only
    // "a report came back" would not catch the original defect.
    const mapEvents = phases.filter((p) => p.phase === 'map');
    assert.ok(mapEvents.length > 0, 'the map phase must have run at least one pack');
    assert.deepEqual(
      mapEvents.filter((p) => p.failed),
      [],
      'no map pack may fail on the default offline path',
    );
    assert.deepEqual(
      report.provenance.warnings ?? [],
      [],
      `a clean dry run must record no pipeline warnings, got: ${JSON.stringify(report.provenance.warnings)}`,
    );

    const validation = await validateReport(report, { records });
    assert.equal(validation.valid, true, `report must validate: ${JSON.stringify(validation.errors)}`);
  });

  test('the dashboard in a dry-run report is the deterministic one, not model-authored', async () => {
    const records = await loadRecords();
    const provider = createMockProvider();
    const report = await analyze(records, { provider, model: 'mock-standard' });

    // The mock never emits a `dashboard` key at all, and assembleReport()
    // overwrites it unconditionally regardless -- so these figures must equal a
    // straight recomputation from the timeline. This is the "a hallucinated
    // number cannot reach a chart" guarantee, checked on the offline path.
    const { dashboard: expected } = computeDashboard(records);
    assert.deepEqual(report.dashboard, expected, 'report.dashboard must equal computeDashboard(records).dashboard');
    assert.equal(report.scope.row_count, records.length);
  });

  test('every synthesised finding cites a row_hash that exists in the timeline', async () => {
    const records = await loadRecords();
    const provider = createMockProvider();
    const report = await analyze(records, { provider, model: 'mock-standard' });

    const known = new Set(records.map((r) => r.row_hash));
    assert.ok(report.findings.length > 0, 'the dry run should produce at least one illustrative finding');
    for (const f of report.findings) {
      assert.ok(Array.isArray(f.evidence) && f.evidence.length > 0, `finding ${f.id} must carry evidence`);
      for (const ev of f.evidence) {
        assert.match(ev.row_hash, /^[0-9a-f]{64}$/, 'citation must be a 64-hex row_hash');
        assert.ok(known.has(ev.row_hash), `finding ${f.id} cites ${ev.row_hash}, which is not in the supplied timeline`);
      }
    }
  });

  test('a dry-run report says in its own text that no model analysis happened', async () => {
    const records = await loadRecords();
    const provider = createMockProvider();
    const report = await analyze(records, { provider, model: 'mock-standard' });

    // A report that LOOKS like real analysis but contains none is the single
    // most dangerous artifact this app could emit. The verdict must be
    // inconclusive and the summary must say so in plain language.
    assert.equal(report.verdict.assessment, 'inconclusive');
    assert.match(report.executive_summary.text, /dry run/i);
    assert.ok(
      (report.analytic_gaps ?? []).some((g) => /no model analysis/i.test(g.gap)),
      'the absence of model analysis must be recorded as an explicit analytic gap',
    );
  });

  test('two dry runs over the same timeline produce identical analysis output', async () => {
    const records = await loadRecords();
    const a = await analyze(records, { provider: createMockProvider(), model: 'mock-standard' });
    const b = await analyze(records, { provider: createMockProvider(), model: 'mock-standard' });

    // meta carries wall-clock timings and a generated id, so compare everything
    // else -- the analytic content of an offline run must be reproducible.
    const strip = (r) => {
      const { meta, provenance, ...rest } = r;
      const { generated_utc, report_id, usage, ...metaRest } = meta || {};
      return { ...rest, meta: metaRest };
    };
    assert.deepEqual(strip(a), strip(b), 'offline dry-run analysis must be deterministic');
  });
});
