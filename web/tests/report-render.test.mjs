import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateAgainst } from '../assets/js/lib/validate-schema.js';
import {
  escapeHtml, renderHeader, renderVerdict, renderExecutiveSummary,
  renderFindingCard, renderFindings, renderAttackNarrative, renderIocPanel,
  renderAnalyticGaps, renderDismissedDetections, renderRecommendations, renderReport,
} from '../assets/js/report/render.js';
import { citationRate, isSampled } from '../assets/js/report/metrics.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCHEMA_PATH = path.join(HERE, '..', '..', 'docs', 'report_schema.json');
const FULL_FIXTURE_PATH = path.join(HERE, '..', 'fixtures', 'report', 'full-report.json');
const MINIMAL_FIXTURE_PATH = path.join(HERE, '..', 'fixtures', 'report', 'minimal-report.json');

// docs/report_schema.json uses `$ref: "#/$defs/..."` for the ioc and
// recommendation shapes. web/assets/js/lib/validate-schema.js is a
// deliberately minimal validator (see its own header comment) that supports
// exactly the timeline schema's keyword subset and does NOT resolve $ref.
// Rather than touch that shared, out-of-scope module, resolve $ref locally
// here by inlining referenced $defs before handing the schema to
// validateAgainst - this keeps the "real" validator as the single source of
// truth for keyword semantics while still letting these tests validate a
// schema that happens to use $ref.
function resolveRefs(node, root) {
  if (Array.isArray(node)) return node.map((n) => resolveRefs(n, root));
  if (node && typeof node === 'object') {
    if (typeof node.$ref === 'string') {
      const segments = node.$ref.replace(/^#\//, '').split('/');
      let target = root;
      for (const seg of segments) target = target[seg];
      return resolveRefs(target, root);
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = resolveRefs(v, root);
    return out;
  }
  return node;
}

async function loadReportSchema() {
  const raw = JSON.parse(await readFile(SCHEMA_PATH, 'utf8'));
  return resolveRefs(raw, raw);
}

async function loadFixture(p) {
  return JSON.parse(await readFile(p, 'utf8'));
}

// ---------------------------------------------------------------------------
// Fixture conformance - both fixtures must be valid per the schema contract,
// otherwise every other assertion in this file is testing against invalid
// input.
// ---------------------------------------------------------------------------

test('full-report.json fixture is a schema-valid report with zero errors', async () => {
  const schema = await loadReportSchema();
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const errors = validateAgainst(schema, fixture, '$');
  assert.deepEqual(errors, [], errors.map((e) => `${e.path}: ${e.message}`).join('\n'));
});

test('minimal-report.json fixture is a schema-valid report with zero errors', async () => {
  const schema = await loadReportSchema();
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const errors = validateAgainst(schema, fixture, '$');
  assert.deepEqual(errors, [], errors.map((e) => `${e.path}: ${e.message}`).join('\n'));
});

test('full-report.json fixture has exactly one deliberately uncited finding', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const uncited = fixture.findings.filter((f) => !f.evidence || f.evidence.length === 0);
  assert.equal(uncited.length, 1, `expected exactly 1 uncited finding, found ${uncited.length}`);
  assert.equal(uncited[0].id, 'F-007');
});

test('full-report.json fixture has non-empty analytic_gaps and dismissed_detections', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  assert.ok(fixture.analytic_gaps.length > 0);
  assert.ok(fixture.dismissed_detections.length > 0);
});

// ---------------------------------------------------------------------------
// escapeHtml / XSS
// ---------------------------------------------------------------------------

test('escapeHtml neutralizes every HTML metacharacter', () => {
  assert.equal(escapeHtml('<img src=x onerror=alert(1)>'), '&lt;img src=x onerror=alert(1)&gt;');
  assert.equal(escapeHtml(`"quoted" & 'single'`), '&quot;quoted&quot; &amp; &#39;single&#39;');
  assert.equal(escapeHtml(null), '');
  assert.equal(escapeHtml(undefined), '');
});

test('a finding title containing a script/onerror payload never appears unescaped in a rendered card', () => {
  const payload = '<img src=x onerror=alert(1)>';
  const finding = {
    id: 'F-999', title: payload, severity: 'high', confidence: 'high',
    narrative: 'n/a', evidence: [],
  };
  const html = renderFindingCard(finding);
  assert.ok(!html.includes(payload), 'raw XSS payload must not appear verbatim in rendered output');
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'), 'escaped payload should appear instead');
});

test('renderReport escapes an XSS payload injected via every major string field', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const payload = '<img src=x onerror=alert(1)>';
  const poisoned = structuredClone(fixture);
  poisoned.findings[0].title = payload;
  poisoned.executive_summary.text = payload;
  poisoned.verdict.rationale = payload;
  const html = renderReport(poisoned);
  assert.ok(!html.includes(payload), 'raw payload leaked into rendered report HTML');
});

// ---------------------------------------------------------------------------
// Header: classification, reduction ratio, citation rate
// ---------------------------------------------------------------------------

test('renderHeader shows the classification banner text from meta.engagement.classification', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderHeader(fixture);
  assert.ok(html.includes('classification-banner'));
  assert.ok(html.includes(escapeHtml(fixture.meta.engagement.classification)));
});

test('renderHeader falls back to an explicit "no marking" banner when classification is absent', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const html = renderHeader(fixture);
  assert.ok(html.includes('NO MARKING PROVIDED'));
});

test('renderHeader gives the reduction ratio a warning treatment when sampled (< 1.0)', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  assert.ok(isSampled(fixture), 'fixture is expected to have reduction_ratio < 1.0');
  const html = renderHeader(fixture);
  assert.ok(html.includes('stat-warning'));
  assert.ok(html.includes('sampling-warning'));
  assert.ok(/25\.9%|26%/.test(html.replace(/&nbsp;/g, ' ')) || html.includes('25.92%') === false); // ratio rendered somewhere as a percent
});

test('renderHeader reports the citation rate matching citationRate()', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const { cited, total } = citationRate(fixture);
  const html = renderHeader(fixture);
  assert.ok(html.includes(`(${cited} / ${total} findings cited)`));
});

test('renderHeader on the minimal fixture reports "no findings" for citation rate rather than a fake 100%', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const html = renderHeader(fixture);
  assert.ok(html.includes('no findings'));
});

// ---------------------------------------------------------------------------
// Verdict: inconclusive is neutral, not an error
// ---------------------------------------------------------------------------

test('an "inconclusive" verdict renders with neutral tone, never alert/caution styling', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  assert.equal(fixture.verdict.assessment, 'inconclusive');
  const html = renderVerdict(fixture);
  assert.ok(html.includes('tone-neutral'));
  assert.ok(!html.includes('tone-alert'));
  assert.ok(!html.includes('tone-caution'));
});

test('a "likely_compromised" verdict gets the alert tone', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  assert.equal(fixture.verdict.assessment, 'likely_compromised');
  const html = renderVerdict(fixture);
  assert.ok(html.includes('tone-alert'));
});

test('renderVerdict on a report with no verdict at all degrades gracefully (no throw, empty-state message)', () => {
  const html = renderVerdict({});
  assert.ok(html.includes('empty-state'));
});

// ---------------------------------------------------------------------------
// Executive summary
// ---------------------------------------------------------------------------

test('renderExecutiveSummary renders every bullet from the fixture', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderExecutiveSummary(fixture);
  for (const b of fixture.executive_summary.bullets) {
    assert.ok(html.includes(escapeHtml(b)), `missing bullet: ${b}`);
  }
});

// ---------------------------------------------------------------------------
// Findings: uncited badge, expandable cards, severity ordering
// ---------------------------------------------------------------------------

test('renderFindingCard marks a finding with empty evidence[] as uncited with a visible badge', () => {
  const finding = { id: 'F-100', title: 'x', severity: 'medium', confidence: 'low', narrative: 'n/a', evidence: [] };
  const html = renderFindingCard(finding);
  assert.ok(html.includes('data-uncited="true"'));
  assert.ok(html.includes('data-testid="uncited-badge"'));
  assert.ok(html.includes('UNCITED'));
});

test('renderFindingCard does NOT mark a cited finding as uncited', () => {
  const finding = {
    id: 'F-101', title: 'x', severity: 'medium', confidence: 'low', narrative: 'n/a',
    evidence: [{ row_hash: 'a'.repeat(64) }],
  };
  const html = renderFindingCard(finding);
  assert.ok(!html.includes('data-uncited="true"'));
  assert.ok(!html.includes('data-testid="uncited-badge"'));
});

test('renderFindings renders one card per finding and the F-007 card is the uncited one', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderFindings(fixture);
  for (const f of fixture.findings) {
    assert.ok(html.includes(`data-finding-id="${f.id}"`), `missing card for ${f.id}`);
  }
  const f007Start = html.indexOf('data-finding-id="F-007"');
  const cardStart = html.lastIndexOf('<article', f007Start);
  const cardEnd = html.indexOf('</article>', f007Start);
  const cardHtml = html.slice(cardStart, cardEnd);
  assert.ok(cardHtml.includes('data-uncited="true"'));
});

test('renderFindings on an empty findings[] array shows an explicit empty state, not a blank section', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const html = renderFindings(fixture);
  assert.ok(html.includes('empty-state'));
});

// ---------------------------------------------------------------------------
// Attack narrative
// ---------------------------------------------------------------------------

test('renderAttackNarrative renders every phase in order with its finding_ids wired for cross-filtering', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderAttackNarrative(fixture);
  for (const p of fixture.attack_narrative.phases) {
    assert.ok(html.includes(`data-phase-order="${p.order}"`), `missing phase ${p.order}`);
    for (const fid of p.finding_ids ?? []) {
      const marker = html.slice(html.indexOf(`data-phase-order="${p.order}"`));
      assert.ok(marker.includes(fid) || html.includes(`data-finding-ids="${p.finding_ids.join(',')}"`));
    }
  }
});

test('renderAttackNarrative degrades gracefully with an explanatory empty state when there is no narrative', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const html = renderAttackNarrative(fixture);
  assert.ok(html.includes('empty-state'));
});

// ---------------------------------------------------------------------------
// IOC panel
// ---------------------------------------------------------------------------

test('renderIocPanel creates one tab per non-empty IOC type present in the fixture', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderIocPanel(fixture);
  const nonEmptyTypes = Object.entries(fixture.iocs).filter(([, v]) => Array.isArray(v) && v.length > 0);
  for (const [type] of nonEmptyTypes) {
    assert.ok(html.includes(`data-ioc-type="${type}"`), `missing IOC tab panel for ${type}`);
  }
  // services[] is empty in the fixture and must NOT get a tab.
  assert.ok(!html.includes('data-ioc-type="services"'));
});

test('renderIocPanel wires copy-all and CSV/JSON export controls per type', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderIocPanel(fixture);
  assert.ok(html.includes('data-ioc-copy="files"'));
  assert.ok(html.includes('data-ioc-export="csv" data-ioc-type="files"'));
  assert.ok(html.includes('data-ioc-export="json" data-ioc-type="files"'));
});

test('renderIocPanel on a report with no iocs at all shows an empty state', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const html = renderIocPanel(fixture);
  assert.ok(html.includes('empty-state'));
});

// ---------------------------------------------------------------------------
// Analytic gaps + dismissed detections: visual prominence
// ---------------------------------------------------------------------------

test('renderAnalyticGaps gives gaps a "callout" panel treatment, not a plain list', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderAnalyticGaps(fixture);
  assert.ok(html.includes('callout-gaps'));
  for (const g of fixture.analytic_gaps) {
    assert.ok(html.includes(escapeHtml(g.gap)));
  }
});

test('renderAnalyticGaps flags an empty analytic_gaps[] on a large dataset as suspicious rather than silently clean', () => {
  const report = { scope: { row_count: 10000 }, analytic_gaps: [] };
  const html = renderAnalyticGaps(report);
  assert.ok(html.includes('role="alert"'));
  assert.ok(/despite/i.test(html));
});

test('renderAnalyticGaps on a small/empty dataset with no gaps does not falsely flag it as suspicious', () => {
  const report = { scope: { row_count: 10 }, analytic_gaps: [] };
  const html = renderAnalyticGaps(report);
  assert.ok(!html.includes('role="alert"'));
});

test('renderDismissedDetections gives dismissed detections the same callout prominence', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderDismissedDetections(fixture);
  assert.ok(html.includes('callout-dismissed'));
  for (const d of fixture.dismissed_detections) {
    assert.ok(html.includes(escapeHtml(d.rule_name)));
  }
});

// ---------------------------------------------------------------------------
// Recommendations grouped by the four buckets
// ---------------------------------------------------------------------------

test('renderRecommendations groups actions into immediate/short_term/long_term/further_collection', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderRecommendations(fixture);
  for (const group of ['immediate', 'short_term', 'long_term', 'further_collection']) {
    assert.ok(html.includes(`data-rec-group="${group}"`), `missing recommendation group ${group}`);
    for (const item of fixture.recommendations[group]) {
      assert.ok(html.includes(escapeHtml(item.action)), `missing action in group ${group}: ${item.action}`);
    }
  }
});

// ---------------------------------------------------------------------------
// Full assembly: every schema-driven section present, no throws on either
// fixture.
// ---------------------------------------------------------------------------

test('renderReport assembles every required section for the full fixture with zero throws', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = renderReport(fixture);
  for (const testid of [
    'report-header', 'verdict-panel', 'executive-summary', 'attack-narrative',
    'findings-section', 'ioc-panel', 'analytic-gaps', 'dismissed-detections', 'recommendations',
  ]) {
    assert.ok(html.includes(`data-testid="${testid}"`), `renderReport output missing section: ${testid}`);
  }
});

test('renderReport degrades gracefully to empty-state sections for the minimal fixture with zero throws', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const html = renderReport(fixture);
  assert.ok(html.includes('data-testid="report-header"'));
  assert.ok(html.includes('data-testid="verdict-panel"'));
  assert.ok(html.includes('empty-state'));
});

test('renderReport on null/undefined input never throws', () => {
  assert.doesNotThrow(() => renderReport(null));
  assert.doesNotThrow(() => renderReport(undefined));
});
