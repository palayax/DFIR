// Hand-written inline SVG chart generators for the report dashboard (C6.6).
// No chart library (per CLAUDE.md: no build step, no bundler, no vendored
// deps) - every chart is built from template strings and a couple of tiny
// scale helpers below.
//
// Each `xxxSvg(...)` function is a pure function returning a well-formed
// `<svg>...</svg>` string sized by a viewBox (so it scales responsively via
// CSS width:100%). Colour (severity hue) is applied only via CSS classes
// (`sev-<severity>`, styled in report.css against the shared --sev-* tokens)
// so charts theme correctly in light/dark without hardcoding hex here - and
// so the *shape*/label channel (see markerFor()) carries meaning
// independently of hue, per the "never rely on colour alone" requirement.
// Each `xxxTable(...)` function returns the same data as an HTML <table>,
// meant to sit inside a <details> fallback next to the chart.

import { formatPercent } from './metrics.js';

const SEVERITY_ORDER = ['critical', 'high', 'medium', 'low', 'informational', 'none'];
// A distinct small glyph per severity so the legend/points never rely on hue
// alone - shape is a second, colour-independent channel.
const SEVERITY_MARKER = {
  critical: '&#9670;', // diamond
  high: '&#9650;', // triangle
  medium: '&#9632;', // square
  low: '&#9679;', // circle
  informational: '&#9711;', // ring
  none: '&#8226;', // small dot
};

function esc(v) {
  return String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function noDataSvg(width, height, label) {
  return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg chart-empty" role="img" aria-label="${esc(label)}: no data available">
    <title>${esc(label)}: no data available</title>
    <text x="${width / 2}" y="${height / 2}" text-anchor="middle" class="chart-no-data-text">No data available</text>
  </svg>`;
}

function noDataTable(label) {
  return `<p class="empty-state">No data available for ${esc(label)}.</p>`;
}

/** value in [domainMin,domainMax] -> [rangeMin,rangeMax], clamped. */
function scaleLinear(value, domainMin, domainMax, rangeMin, rangeMax) {
  if (domainMax === domainMin) return rangeMin;
  const t = Math.max(0, Math.min(1, (value - domainMin) / (domainMax - domainMin)));
  return rangeMin + t * (rangeMax - rangeMin);
}

// ---------------------------------------------------------------------------
// 1. Events over time (stacked bar, with brush-to-zoom overlay)
// ---------------------------------------------------------------------------

export function eventsOverTimeSvg(events, opts = {}) {
  const width = opts.width ?? 900;
  const height = opts.height ?? 220;
  const margin = { top: 16, right: 16, bottom: 36, left: 44 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const label = 'Events over time';

  if (!events || events.length === 0) return noDataSvg(width, height, label);

  const maxCount = Math.max(1, ...events.map((e) => e.count ?? 0));
  const barGap = 2;
  const barW = Math.max(1, plotW / events.length - barGap);

  const bars = events.map((e, i) => {
    const x = margin.left + i * (plotW / events.length);
    const bySev = e.by_severity ?? { none: e.count ?? 0 };
    let cursorY = margin.top + plotH;
    const segs = SEVERITY_ORDER.filter((s) => bySev[s] > 0).map((sev) => {
      const segH = scaleLinear(bySev[sev], 0, maxCount, 0, plotH);
      cursorY -= segH;
      return `<rect class="bar-seg sev-${sev}" x="${x.toFixed(2)}" y="${cursorY.toFixed(2)}" width="${barW.toFixed(2)}" height="${segH.toFixed(2)}"><title>${esc(e.bucket_utc)} - ${esc(sev)}: ${bySev[sev]}</title></rect>`;
    }).join('');
    return `<g class="bar-group" data-bucket="${esc(e.bucket_utc)}">${segs}</g>`;
  }).join('\n');

  // Sparse x-axis labels (first, middle, last bucket) to avoid overlap.
  const tickIdx = [0, Math.floor((events.length - 1) / 2), events.length - 1];
  const ticks = [...new Set(tickIdx)].map((i) => {
    const x = margin.left + i * (plotW / events.length) + barW / 2;
    return `<text x="${x.toFixed(2)}" y="${height - margin.bottom + 16}" class="chart-axis-label" text-anchor="middle">${esc(events[i].bucket_utc)}</text>`;
  }).join('');

  const yMaxLabel = `<text x="${margin.left - 6}" y="${margin.top + 4}" class="chart-axis-label" text-anchor="end">${maxCount}</text>`;
  const yZeroLabel = `<text x="${margin.left - 6}" y="${margin.top + plotH}" class="chart-axis-label" text-anchor="end">0</text>`;

  // Brush overlay: main.js attaches pointer listeners to filter the visible
  // time range; purely declarative here (a full-plot-area transparent rect).
  const brush = `<rect class="chart-brush-overlay" data-role="brush" x="${margin.left}" y="${margin.top}" width="${plotW}" height="${plotH}" fill="transparent"></rect>`;

  return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg chart-events-over-time" role="img" aria-label="${esc(label)}, stacked by severity">
    <title>${esc(label)}, stacked by severity</title>
    <line x1="${margin.left}" y1="${margin.top + plotH}" x2="${margin.left + plotW}" y2="${margin.top + plotH}" class="chart-axis-line"></line>
    ${bars}
    ${ticks}
    ${yMaxLabel}${yZeroLabel}
    ${brush}
  </svg>`;
}

export function eventsOverTimeTable(events) {
  if (!events || events.length === 0) return noDataTable('events over time');
  const rows = events.map((e) => `<tr><td>${esc(e.bucket_utc)}</td><td class="num">${e.count ?? 0}</td><td>${Object.entries(e.by_severity ?? {}).map(([k, v]) => `${esc(k)}: ${v}`).join(', ')}</td></tr>`).join('');
  return `<table><thead><tr><th>Bucket</th><th>Count</th><th>By severity</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// 2. Severity distribution
// ---------------------------------------------------------------------------

export function severityDistributionSvg(dist, opts = {}) {
  const width = opts.width ?? 420;
  const height = opts.height ?? 220;
  const margin = { top: 16, right: 16, bottom: 46, left: 40 };
  const label = 'Severity distribution';
  const keys = SEVERITY_ORDER.filter((s) => (dist?.[s] ?? 0) > 0);
  if (!dist || keys.length === 0) return noDataSvg(width, height, label);

  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const max = Math.max(...keys.map((k) => dist[k]));
  const bandW = plotW / keys.length;
  const barW = bandW * 0.6;

  const bars = keys.map((sev, i) => {
    const x = margin.left + i * bandW + (bandW - barW) / 2;
    const h = scaleLinear(dist[sev], 0, max, 0, plotH);
    const y = margin.top + plotH - h;
    return `<g>
      <rect class="bar sev-${sev}" x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${barW.toFixed(2)}" height="${h.toFixed(2)}"><title>${esc(sev)}: ${dist[sev]}</title></rect>
      <text x="${(x + barW / 2).toFixed(2)}" y="${(y - 4).toFixed(2)}" class="chart-value-label" text-anchor="middle">${dist[sev]}</text>
      <text x="${(x + barW / 2).toFixed(2)}" y="${height - margin.bottom + 16}" class="chart-axis-label" text-anchor="middle">${SEVERITY_MARKER[sev]} ${esc(sev)}</text>
    </g>`;
  }).join('');

  return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg chart-severity-distribution" role="img" aria-label="${esc(label)}">
    <title>${esc(label)}</title>
    <line x1="${margin.left}" y1="${margin.top + plotH}" x2="${margin.left + plotW}" y2="${margin.top + plotH}" class="chart-axis-line"></line>
    ${bars}
  </svg>`;
}

export function severityDistributionTable(dist) {
  const keys = SEVERITY_ORDER.filter((s) => (dist?.[s] ?? 0) > 0);
  if (!dist || keys.length === 0) return noDataTable('severity distribution');
  const rows = keys.map((k) => `<tr><td>${esc(k)}</td><td class="num">${dist[k]}</td></tr>`).join('');
  return `<table><thead><tr><th>Severity</th><th>Count</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// 3. Source distribution (horizontal bars - source names vary in length)
// ---------------------------------------------------------------------------

export function sourceDistributionSvg(dist, opts = {}) {
  const label = 'Source distribution';
  const entries = Object.entries(dist ?? {}).sort((a, b) => b[1] - a[1]).slice(0, opts.limit ?? 12);
  const width = opts.width ?? 480;
  const rowH = 22;
  const margin = { top: 10, right: 50, bottom: 10, left: 130 };
  const height = margin.top + margin.bottom + entries.length * rowH;
  if (entries.length === 0) return noDataSvg(width, opts.height ?? 160, label);

  const plotW = width - margin.left - margin.right;
  const max = Math.max(...entries.map(([, v]) => v));

  const bars = entries.map(([name, count], i) => {
    const y = margin.top + i * rowH;
    const w = scaleLinear(count, 0, max, 0, plotW);
    return `<g>
      <text x="${margin.left - 8}" y="${(y + rowH * 0.65).toFixed(2)}" class="chart-axis-label" text-anchor="end">${esc(name)}</text>
      <rect class="bar source-bar" x="${margin.left}" y="${(y + 3).toFixed(2)}" width="${w.toFixed(2)}" height="${rowH - 6}"><title>${esc(name)}: ${count}</title></rect>
      <text x="${(margin.left + w + 6).toFixed(2)}" y="${(y + rowH * 0.65).toFixed(2)}" class="chart-value-label">${count}</text>
    </g>`;
  }).join('');

  return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg chart-source-distribution" role="img" aria-label="${esc(label)}">
    <title>${esc(label)}</title>
    ${bars}
  </svg>`;
}

export function sourceDistributionTable(dist) {
  const entries = Object.entries(dist ?? {}).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return noDataTable('source distribution');
  const rows = entries.map(([k, v]) => `<tr><td>${esc(k)}</td><td class="num">${v}</td></tr>`).join('');
  return `<table><thead><tr><th>Source</th><th>Count</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// 4. Day-of-week x hour-of-day heatmap
// ---------------------------------------------------------------------------

const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function hourlyHeatmapSvg(heatmap, opts = {}) {
  const label = 'Activity heatmap by day of week and hour';
  if (!heatmap || heatmap.length === 0) return noDataSvg(opts.width ?? 760, opts.height ?? 220, label);

  const cell = opts.cell ?? 24;
  const margin = { top: 10, right: 10, bottom: 10, left: 44 };
  const width = margin.left + margin.right + 24 * cell;
  const height = margin.top + margin.bottom + 7 * cell;
  const byKey = new Map(heatmap.map((h) => [`${h.day_of_week}:${h.hour}`, h.count]));
  const max = Math.max(1, ...heatmap.map((h) => h.count ?? 0));

  const cells = [];
  for (let dow = 0; dow < 7; dow++) {
    for (let hour = 0; hour < 24; hour++) {
      const count = byKey.get(`${dow}:${hour}`) ?? 0;
      const x = margin.left + hour * cell;
      const y = margin.top + dow * cell;
      const opacity = count === 0 ? 0 : 0.15 + 0.85 * (count / max);
      // Label shown directly in-cell so intensity (colour) is never the only
      // channel carrying the value - satisfies "not colour alone".
      cells.push(`<rect x="${x}" y="${y}" width="${cell - 1}" height="${cell - 1}" class="heatmap-cell" style="fill-opacity:${opacity.toFixed(2)}"><title>${DOW_LABELS[dow]} ${hour}:00 - ${count} events</title></rect>`);
      if (count > 0 && cell >= 18) {
        cells.push(`<text x="${x + cell / 2}" y="${y + cell / 2 + 3}" class="heatmap-cell-label" text-anchor="middle">${count}</text>`);
      }
    }
  }
  const rowLabels = DOW_LABELS.map((d, i) => `<text x="${margin.left - 6}" y="${margin.top + i * cell + cell / 2 + 3}" class="chart-axis-label" text-anchor="end">${d}</text>`).join('');
  const colLabels = [0, 6, 12, 18].map((h) => `<text x="${margin.left + h * cell + cell / 2}" y="${height - 2}" class="chart-axis-label" text-anchor="middle">${h}:00</text>`).join('');

  return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg chart-heatmap" role="img" aria-label="${esc(label)}">
    <title>${esc(label)}</title>
    ${cells.join('\n')}
    ${rowLabels}
    ${colLabels}
  </svg>`;
}

export function hourlyHeatmapTable(heatmap) {
  if (!heatmap || heatmap.length === 0) return noDataTable('hourly heatmap');
  const rows = heatmap.map((h) => `<tr><td>${DOW_LABELS[h.day_of_week] ?? h.day_of_week}</td><td class="num">${h.hour}:00</td><td class="num">${h.count}</td></tr>`).join('');
  return `<table><thead><tr><th>Day</th><th>Hour</th><th>Count</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// 5. MITRE coverage matrix (tactic columns x technique cells)
// ---------------------------------------------------------------------------

export function mitreCoverageSvg(coverage, opts = {}) {
  const label = 'MITRE ATT&CK coverage';
  if (!coverage || coverage.length === 0) return noDataSvg(opts.width ?? 760, opts.height ?? 160, label);

  const byTactic = new Map();
  for (const t of coverage) {
    const tactic = t.tactic || 'unspecified';
    if (!byTactic.has(tactic)) byTactic.set(tactic, []);
    byTactic.get(tactic).push(t);
  }
  const tactics = [...byTactic.keys()];
  const cellW = opts.cellW ?? 130;
  const cellH = opts.cellH ?? 26;
  const margin = { top: 26, right: 10, bottom: 10, left: 10 };
  const maxRows = Math.max(...tactics.map((t) => byTactic.get(t).length));
  const width = margin.left + margin.right + tactics.length * cellW;
  const height = margin.top + margin.bottom + maxRows * cellH;
  const max = Math.max(1, ...coverage.map((c) => c.event_count ?? 0));

  const headers = tactics.map((t, i) => `<text x="${margin.left + i * cellW + cellW / 2}" y="16" class="chart-axis-label mitre-tactic-label" text-anchor="middle">${esc(t)}</text>`).join('');

  const cells = tactics.map((tactic, col) => byTactic.get(tactic).map((technique, row) => {
    const x = margin.left + col * cellW;
    const y = margin.top + row * cellH;
    const opacity = 0.15 + 0.85 * ((technique.event_count ?? 0) / max);
    return `<g class="mitre-cell" data-technique="${esc(technique.technique_id)}" data-tactic="${esc(tactic)}" tabindex="0" role="button" aria-label="${esc(technique.technique_id)} ${esc(technique.technique_name)}, ${technique.event_count ?? 0} events, max severity ${esc(technique.max_severity) || 'unknown'}">
      <rect x="${x + 2}" y="${y + 2}" width="${cellW - 4}" height="${cellH - 4}" class="mitre-cell-rect" style="fill-opacity:${opacity.toFixed(2)}"><title>${esc(technique.technique_id)} ${esc(technique.technique_name)} - ${technique.event_count ?? 0} events (max severity: ${esc(technique.max_severity)})</title></rect>
      <text x="${x + cellW / 2}" y="${y + cellH / 2 + 4}" text-anchor="middle" class="mitre-cell-label">${esc(technique.technique_id)} (${technique.event_count ?? 0})</text>
    </g>`;
  }).join('')).join('');

  return `<svg viewBox="0 0 ${width} ${height}" class="chart-svg chart-mitre-coverage" role="img" aria-label="${esc(label)}, tactic columns by technique">
    <title>${esc(label)}, tactic columns by technique. Click a cell to filter.</title>
    ${headers}
    ${cells}
  </svg>`;
}

export function mitreCoverageTable(coverage) {
  if (!coverage || coverage.length === 0) return noDataTable('MITRE coverage');
  const rows = coverage.map((c) => `<tr><td>${esc(c.technique_id)}</td><td>${esc(c.technique_name)}</td><td>${esc(c.tactic)}</td><td class="num">${c.event_count ?? 0}</td><td>${esc(c.max_severity)}</td></tr>`).join('');
  return `<table><thead><tr><th>Technique</th><th>Name</th><th>Tactic</th><th>Events</th><th>Max severity</th></tr></thead><tbody>${rows}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// Figure wrapper: chart + accessible fallback table, used by main.js.
// ---------------------------------------------------------------------------

export function renderChartFigure(title, svg, tableHtml) {
  return `<figure class="chart-figure">
    <figcaption>${esc(title)}</figcaption>
    ${svg}
    <details class="chart-data-table"><summary>Data table</summary>${tableHtml}</details>
  </figure>`;
}

export function formatChartPercentLabel(ratio) {
  return formatPercent(ratio);
}
