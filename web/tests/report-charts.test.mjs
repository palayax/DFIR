import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  eventsOverTimeSvg, eventsOverTimeTable,
  severityDistributionSvg, severityDistributionTable,
  sourceDistributionSvg, sourceDistributionTable,
  hourlyHeatmapSvg, hourlyHeatmapTable,
  mitreCoverageSvg, mitreCoverageTable,
  renderChartFigure,
} from '../assets/js/report/charts.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FULL_FIXTURE_PATH = path.join(HERE, '..', 'fixtures', 'report', 'full-report.json');
const MINIMAL_FIXTURE_PATH = path.join(HERE, '..', 'fixtures', 'report', 'minimal-report.json');

async function loadFixture(p) {
  return JSON.parse(await readFile(p, 'utf8'));
}

// ---------------------------------------------------------------------------
// A tiny, hand-rolled well-formedness checker for the SVG strings these
// functions produce. No jsdom/xml parser is vendored (per CLAUDE.md), so
// this walks the markup with a simple tag stack: every opening tag must have
// a matching close (or be self-closing / void), tags must nest properly, and
// void SVG elements are allowed to have no closing tag. This is deliberately
// not a full XML parser - it is just strict enough to catch the classes of
// bug a hand-written template-string generator is prone to (unclosed <g>,
// mismatched <text>/<tspan>, a stray '>' inside an attribute value breaking
// the tag boundary, etc).
// ---------------------------------------------------------------------------

function assertWellFormedSvg(svgString, label) {
  assert.ok(svgString.startsWith('<svg'), `${label}: does not start with <svg`);
  assert.ok(svgString.trim().endsWith('</svg>'), `${label}: does not end with </svg>`);

  const tagRe = /<\/?([a-zA-Z][a-zA-Z0-9:-]*)\b[^>]*?(\/?)>/g;
  const stack = [];
  let match;
  let count = 0;
  while ((match = tagRe.exec(svgString)) !== null) {
    count += 1;
    const [full, name, selfClose] = match;
    const isClosing = full.startsWith('</');
    if (isClosing) {
      const top = stack.pop();
      assert.equal(top, name, `${label}: mismatched close tag </${name}> (expected </${top}>) near index ${match.index}`);
    } else if (!selfClose) {
      stack.push(name);
    }
    // self-closing (ends with "/>") tags never get pushed - nothing to balance.
  }
  assert.ok(count > 0, `${label}: no tags found at all - likely not real markup`);
  assert.deepEqual(stack, [], `${label}: unclosed tags remain: ${stack.join(', ')}`);
}

function countOccurrences(haystack, needle) {
  return (haystack.match(new RegExp(needle, 'g')) ?? []).length;
}

// ---------------------------------------------------------------------------
// 1. Events over time
// ---------------------------------------------------------------------------

test('eventsOverTimeSvg produces well-formed SVG with one bar-group per bucket for the full fixture', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const svg = eventsOverTimeSvg(fixture.dashboard.events_over_time);
  assertWellFormedSvg(svg, 'eventsOverTimeSvg');
  assert.equal(countOccurrences(svg, '<g class="bar-group"'), fixture.dashboard.events_over_time.length);
  assert.ok(svg.includes('<title>'));
  assert.ok(/role="img"/.test(svg));
  assert.ok(/aria-label="/.test(svg));
});

test('eventsOverTimeSvg on empty data renders an explicit "no data" state, not a broken/empty chart', () => {
  const svg = eventsOverTimeSvg([]);
  assertWellFormedSvg(svg, 'eventsOverTimeSvg(empty)');
  assert.ok(svg.includes('chart-empty'));
  assert.ok(/no data/i.test(svg));
});

test('eventsOverTimeTable renders one row per bucket, matching the SVG data', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = eventsOverTimeTable(fixture.dashboard.events_over_time);
  // +1 for the <thead> header row.
  assert.equal(countOccurrences(html, '<tr>'), fixture.dashboard.events_over_time.length + 1);
});

test('eventsOverTimeTable on empty data renders a no-data message, not an empty <table>', () => {
  const html = eventsOverTimeTable([]);
  assert.ok(!html.includes('<table>'));
  assert.ok(html.includes('empty-state'));
});

// ---------------------------------------------------------------------------
// 2. Severity distribution
// ---------------------------------------------------------------------------

test('severityDistributionSvg draws one bar per non-zero severity bucket', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const dist = fixture.dashboard.severity_distribution;
  const nonZero = Object.values(dist).filter((v) => v > 0).length;
  const svg = severityDistributionSvg(dist);
  assertWellFormedSvg(svg, 'severityDistributionSvg');
  assert.equal(countOccurrences(svg, '<rect class="bar sev-'), nonZero);
});

test('severityDistributionSvg never encodes severity by colour alone - each bar carries a text label too', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const svg = severityDistributionSvg(fixture.dashboard.severity_distribution);
  for (const sev of Object.keys(fixture.dashboard.severity_distribution)) {
    if (fixture.dashboard.severity_distribution[sev] > 0) {
      assert.ok(svg.includes(`>${sev}</text>`.replace('>', '')) || svg.includes(sev), `missing text label for severity ${sev}`);
    }
  }
});

test('severityDistributionSvg on an empty distribution renders "no data"', () => {
  const svg = severityDistributionSvg({});
  assertWellFormedSvg(svg, 'severityDistributionSvg(empty)');
  assert.ok(svg.includes('chart-empty'));
});

test('severityDistributionTable on empty data shows an explicit empty state', () => {
  const html = severityDistributionTable({});
  assert.ok(html.includes('empty-state'));
});

// ---------------------------------------------------------------------------
// 3. Source distribution
// ---------------------------------------------------------------------------

test('sourceDistributionSvg renders one row per source in the fixture (well under the default limit)', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const dist = fixture.dashboard.source_distribution;
  const svg = sourceDistributionSvg(dist);
  assertWellFormedSvg(svg, 'sourceDistributionSvg');
  assert.equal(countOccurrences(svg, 'class="bar source-bar"'), Object.keys(dist).length);
});

test('sourceDistributionSvg respects an explicit limit option, truncating rather than overflowing', () => {
  const dist = { a: 10, b: 9, c: 8, d: 7, e: 6 };
  const svg = sourceDistributionSvg(dist, { limit: 2 });
  assertWellFormedSvg(svg, 'sourceDistributionSvg(limited)');
  assert.equal(countOccurrences(svg, 'class="bar source-bar"'), 2);
});

test('sourceDistributionSvg on empty data renders "no data"', () => {
  const svg = sourceDistributionSvg({});
  assertWellFormedSvg(svg, 'sourceDistributionSvg(empty)');
  assert.ok(svg.includes('chart-empty'));
});

// ---------------------------------------------------------------------------
// 4. Hourly heatmap (day-of-week x hour)
// ---------------------------------------------------------------------------

test('hourlyHeatmapSvg renders exactly 7x24 cells for a full week grid', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const svg = hourlyHeatmapSvg(fixture.dashboard.hourly_heatmap);
  assertWellFormedSvg(svg, 'hourlyHeatmapSvg');
  assert.equal(countOccurrences(svg, 'class="heatmap-cell"'), 7 * 24);
});

test('hourlyHeatmapSvg labels non-zero cells with their numeric count so intensity is never colour-only', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const nonZero = fixture.dashboard.hourly_heatmap.filter((c) => c.count > 0);
  const svg = hourlyHeatmapSvg(fixture.dashboard.hourly_heatmap);
  assertWellFormedSvg(svg, 'hourlyHeatmapSvg (labelled)');
  assert.equal(countOccurrences(svg, 'class="heatmap-cell-label"'), nonZero.length);
});

test('hourlyHeatmapSvg on empty data renders "no data"', () => {
  const svg = hourlyHeatmapSvg([]);
  assertWellFormedSvg(svg, 'hourlyHeatmapSvg(empty)');
  assert.ok(svg.includes('chart-empty'));
});

test('hourlyHeatmapTable renders one row per heatmap cell', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = hourlyHeatmapTable(fixture.dashboard.hourly_heatmap);
  // +1 for the <thead> header row.
  assert.equal(countOccurrences(html, '<tr>'), fixture.dashboard.hourly_heatmap.length + 1);
});

// ---------------------------------------------------------------------------
// 5. MITRE coverage matrix
// ---------------------------------------------------------------------------

test('mitreCoverageSvg renders one interactive cell per technique, grouped into tactic columns', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const svg = mitreCoverageSvg(fixture.mitre_coverage);
  assertWellFormedSvg(svg, 'mitreCoverageSvg');
  assert.equal(countOccurrences(svg, 'class="mitre-cell"'), fixture.mitre_coverage.length);
  const tactics = new Set(fixture.mitre_coverage.map((c) => c.tactic));
  for (const tactic of tactics) {
    assert.ok(svg.includes(`data-tactic="${tactic}"`), `missing tactic column marker for ${tactic}`);
  }
});

test('mitreCoverageSvg cells are keyboard-focusable (tabindex + role=button) for click-to-filter', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const svg = mitreCoverageSvg(fixture.mitre_coverage);
  assert.equal(countOccurrences(svg, 'tabindex="0"'), fixture.mitre_coverage.length);
  assert.equal(countOccurrences(svg, 'role="button"'), fixture.mitre_coverage.length);
});

test('mitreCoverageSvg on empty coverage renders "no data"', () => {
  const svg = mitreCoverageSvg([]);
  assertWellFormedSvg(svg, 'mitreCoverageSvg(empty)');
  assert.ok(svg.includes('chart-empty'));
});

test('mitreCoverageTable renders one row per technique', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const html = mitreCoverageTable(fixture.mitre_coverage);
  // +1 for the <thead> header row.
  assert.equal(countOccurrences(html, '<tr>'), fixture.mitre_coverage.length + 1);
});

// ---------------------------------------------------------------------------
// Minimal fixture: every chart must degrade gracefully (no throws, no
// malformed markup) when the dashboard has no aggregates beyond the two
// schema-required keys.
// ---------------------------------------------------------------------------

test('every chart function degrades gracefully on the minimal fixture', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const d = fixture.dashboard;
  const charts = [
    eventsOverTimeSvg(d.events_over_time),
    severityDistributionSvg(d.severity_distribution),
    sourceDistributionSvg(d.source_distribution),
    hourlyHeatmapSvg(d.hourly_heatmap),
    mitreCoverageSvg(fixture.mitre_coverage),
  ];
  for (const svg of charts) {
    assertWellFormedSvg(svg, 'minimal-fixture chart');
    assert.ok(svg.includes('chart-empty'));
  }
});

// ---------------------------------------------------------------------------
// Figure wrapper
// ---------------------------------------------------------------------------

test('renderChartFigure wraps a chart with a <figcaption> and a <details> data-table fallback', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const svg = severityDistributionSvg(fixture.dashboard.severity_distribution);
  const table = severityDistributionTable(fixture.dashboard.severity_distribution);
  const html = renderChartFigure('Severity distribution', svg, table);
  assert.ok(html.includes('<figcaption>Severity distribution</figcaption>'));
  assert.ok(html.includes('<details class="chart-data-table">'));
  assert.ok(html.includes('<summary>Data table</summary>'));
  assert.ok(html.includes(svg));
  assert.ok(html.includes(table));
});
