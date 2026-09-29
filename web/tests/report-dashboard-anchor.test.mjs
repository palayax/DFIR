// Guards the anchor contract between report/render.js and report/main.js.
//
// The defect this exists for: main.js's mountDashboard() inserts the entire
// Dashboard section AND the entity-relationship graph relative to
// `[data-testid="attack-narrative"]`. renderAttackNarrative() emitted that
// section only when the report contained narrative PHASES; with no phases it
// returned a bare <p class="empty-state">. So for any report whose model output
// had no narrative phases -- a clean host, a zero-finding run, or simply a model
// that chose not to produce one -- mountDashboard() found no anchor, returned
// early, and every chart silently vanished. No error, no console warning, and the
// report still looked complete.
//
// That is the worst possible thing to lose silently: the dashboard is the part of
// the report computed deterministically from the timeline, the part the
// "a hallucinated number can never reach a chart" guarantee is about.
//
// Two invariants are asserted here:
//   1. render.js ALWAYS emits the anchor, phases or not.
//   2. main.js does not depend on the anchor existing (it has a fallback).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { renderAttackNarrative, renderReport } from '../assets/js/report/render.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ANCHOR = 'data-testid="attack-narrative"';

const MINIMAL_REPORT = {
  schema_version: '1.0.0',
  meta: { generated_utc: '2026-09-29T08:00:00.000Z', engagement: {}, model: { provider: 'mock', model_id: 'mock-standard' } },
  scope: { row_count: 10, hosts: [] },
  verdict: { assessment: 'no_evidence_of_compromise', confidence: 'moderate' },
  executive_summary: { text: 'Nothing of note.' },
  findings: [],
  dashboard: {},
  provenance: {},
};

describe('dashboard anchor contract (render.js <-> main.js)', () => {
  test('renderAttackNarrative emits the anchor even with no phases at all', () => {
    for (const narrative of [undefined, null, {}, { phases: [] }, { summary: 'x', phases: [] }]) {
      const html = renderAttackNarrative({ ...MINIMAL_REPORT, attack_narrative: narrative });
      assert.ok(
        html.includes(ANCHOR),
        `attack_narrative=${JSON.stringify(narrative)} produced markup without ${ANCHOR}; ` +
          'mountDashboard() would find no anchor and silently drop every chart',
      );
    }
  });

  test('renderAttackNarrative still emits the anchor WITH phases (the happy path is unchanged)', () => {
    const html = renderAttackNarrative({
      ...MINIMAL_REPORT,
      attack_narrative: { summary: 's', phases: [{ order: 1, name: 'Initial access', description: 'd', start_utc: '2026-01-01T00:00:00Z' }] },
    });
    assert.ok(html.includes(ANCHOR));
    assert.match(html, /Initial access/);
  });

  test('a full renderReport() of a zero-finding report still contains the anchor', () => {
    const html = renderReport(MINIMAL_REPORT);
    assert.ok(
      html.includes(ANCHOR),
      'a zero-finding report is exactly the case that used to lose its dashboard',
    );
    // The container mountDashboard() falls back to must also exist.
    assert.match(html, /class="report-body"/);
  });

  test('mountDashboard() does not require the anchor to exist', async () => {
    // Structural check: main.js needs a DOM, so assert on its source instead of
    // booting it. What matters is that a missing anchor leads to a fallback
    // insertion rather than an early `return`.
    const src = await readFile(path.join(HERE, '..', 'assets', 'js', 'report', 'main.js'), 'utf8');
    const fn = src.slice(src.indexOf('function mountDashboard()'));
    const body = fn.slice(0, fn.indexOf('\nfunction mountDashboardInto'));
    assert.ok(body.length > 0, 'mountDashboard()/mountDashboardInto() split not found — did the refactor change shape?');
    assert.match(body, /report-body|report-root/, 'mountDashboard() must have a fallback container when the anchor is absent');
    assert.doesNotMatch(
      body,
      /if\s*\(\s*!anchor\s*(\|\||&&)[^)]*\)\s*return\s*;/,
      'mountDashboard() must not bail out merely because the optional narrative section is missing',
    );
  });
});
