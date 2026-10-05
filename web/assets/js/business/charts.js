// Inline-SVG charts for the executive business-risk dashboard.
//
// Same rules as report/charts.js: pure functions returning SVG strings sized by
// viewBox, colour applied only through CSS classes / custom properties defined
// in assets/css/business.css (so light/dark theming is one place), every chart
// paired with a data table, and every mark carrying a <title> so hovering
// reveals the exact value. Status colour always ships with an icon + label.

import { formatUsdShort } from './engine.js';

export function esc(v) {
  return String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function lin(v, d0, d1, r0, r1) {
  if (d1 === d0) return r0;
  const t = Math.max(0, Math.min(1, (v - d0) / (d1 - d0)));
  return r0 + t * (r1 - r0);
}

function pct(v, digits = 0) {
  return `${(v * 100).toFixed(digits)}%`;
}

export const STATUS_META = {
  on_track: { label: 'On track', icon: '✓', cls: 'status-good' },
  at_risk: { label: 'At risk', icon: '!', cls: 'status-warning' },
  breach_projected: { label: 'Breach projected', icon: '▲', cls: 'status-serious' },
  breached: { label: 'Breached', icon: '✕', cls: 'status-critical' },
};

export function statusChip(status) {
  const m = STATUS_META[status] || { label: status, icon: '•', cls: '' };
  return `<span class="status-chip ${m.cls}"><span aria-hidden="true">${m.icon}</span> ${esc(m.label)}</span>`;
}

/** Sequential bucket 1..7 for a 0..1 value (heatmap fill classes seq-1..seq-7). */
function seqBucket(v) {
  if (v <= 0.02) return 0;
  return Math.min(7, 1 + Math.floor(v * 7));
}

// ---------------------------------------------------------------------------
// Sparkline: 12-month history + target line + projected point
// ---------------------------------------------------------------------------

export function sparklineSvg(kpi, projected, { width = 132, height = 34 } = {}) {
  const vals = kpi.history.map((h) => h.value);
  const all = [...vals, kpi.target, projected];
  let lo = Math.min(...all);
  let hi = Math.max(...all);
  if (hi === lo) { hi += 1; lo -= 1; }
  const pad = (hi - lo) * 0.12;
  lo -= pad; hi += pad;
  const n = vals.length;
  const x = (i) => lin(i, 0, n, 3, width - 6);
  const y = (v) => lin(v, lo, hi, height - 3, 3);
  const path = vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join('');
  const ty = y(kpi.target).toFixed(1);
  const px = x(n).toFixed(1);
  const py = y(projected).toFixed(1);
  const lastX = x(n - 1).toFixed(1);
  const lastY = y(vals[n - 1]).toFixed(1);
  return `<svg viewBox="0 0 ${width} ${height}" class="spark" role="img" aria-label="${esc(kpi.name)}: 12-month trend, current ${kpi.current}${esc(kpi.unit)}, target ${kpi.target}${esc(kpi.unit)}, projected ${projected}${esc(kpi.unit)}">
    <line x1="0" x2="${width}" y1="${ty}" y2="${ty}" class="spark-target"><title>Target ${kpi.target} ${esc(kpi.unit)}</title></line>
    <path d="${path}" class="spark-line"/>
    <line x1="${lastX}" y1="${lastY}" x2="${px}" y2="${py}" class="spark-proj"/>
    <circle cx="${lastX}" cy="${lastY}" r="2.6" class="spark-dot"><title>Current ${kpi.current} ${esc(kpi.unit)} (${esc(kpi.history[n - 1].month)})</title></circle>
    <circle cx="${px}" cy="${py}" r="3" class="spark-proj-dot"><title>Projected ${projected} ${esc(kpi.unit)} if current cyber risk materialises</title></circle>
  </svg>`;
}

// ---------------------------------------------------------------------------
// Heatmap: business service x risk dimension
// ---------------------------------------------------------------------------

export function heatmapSvg(rows, dims) {
  const labelW = 230;
  const cellW = 104;
  const cellH = 30;
  const top = 34;
  const width = labelW + dims.length * cellW + 8;
  const height = top + rows.length * cellH + 34;
  const head = dims.map((d, i) => `<text x="${labelW + i * cellW + cellW / 2}" y="20" text-anchor="middle" class="viz-axis">${esc(d[0].toUpperCase() + d.slice(1))}</text>`).join('');
  const body = rows.map((r, ri) => {
    const y = top + ri * cellH;
    const label = `<text x="${labelW - 10}" y="${y + cellH / 2 + 4}" text-anchor="end" class="viz-label">${esc(r.service)}</text>`;
    const cells = dims.map((d, ci) => {
      const v = r[d] || 0;
      const b = seqBucket(v);
      const x = labelW + ci * cellW;
      return `<g class="heat-cell" data-service="${esc(r.service_id)}" data-dim="${esc(d)}" tabindex="0" role="button" aria-label="${esc(r.service)}, ${esc(d)}: ${pct(v)}">
        <rect x="${x + 1}" y="${y + 1}" width="${cellW - 2}" height="${cellH - 2}" rx="3" class="seq-${b}"><title>${esc(r.service)} — ${esc(d)}: ${pct(v)} likelihood (12 mo)</title></rect>
        <text x="${x + cellW / 2}" y="${y + cellH / 2 + 4}" text-anchor="middle" class="heat-text ${b >= 4 ? 'on-dark' : ''}">${v > 0.005 ? pct(v) : '—'}</text>
      </g>`;
    }).join('');
    return label + cells;
  }).join('');
  // sequential legend
  const ly = top + rows.length * cellH + 12;
  const legend = [0, 1, 2, 3, 4, 5, 6, 7].map((b, i) => `<rect x="${labelW + i * 34}" y="${ly}" width="32" height="10" rx="2" class="seq-${b}"/>`).join('') +
    `<text x="${labelW - 10}" y="${ly + 9}" text-anchor="end" class="viz-axis">Likelihood</text>` +
    `<text x="${labelW + 8 * 34 + 6}" y="${ly + 9}" class="viz-axis">0% → 100%</text>`;
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-heatmap" role="img" aria-label="Likelihood of a material event by business service and risk dimension">${head}${body}${legend}</svg>`;
}

export function heatmapTable(rows, dims) {
  return `<table><thead><tr><th>Service</th>${dims.map((d) => `<th>${esc(d)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.service)}</td>${dims.map((d) => `<td class="num">${pct(r[d] || 0, 1)}</td>`).join('')}</tr>`).join('')}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// Horizontal bars: value at risk by service (with appetite share marker)
// ---------------------------------------------------------------------------

export function varBarsSvg(items) {
  const labelW = 230;
  const valueW = 150;
  const barH = 20;
  const gap = 8;
  const width = 760;
  const plotW = width - labelW - valueW;
  const height = items.length * (barH + gap) + 10;
  const max = Math.max(1, ...items.map((i) => i.value));
  const bars = items.map((it, i) => {
    const y = 4 + i * (barH + gap);
    const w = Math.max(2, lin(it.value, 0, max, 0, plotW));
    return `<g class="bar-row" data-service="${esc(it.id)}">
      <text x="${labelW - 10}" y="${y + barH / 2 + 4}" text-anchor="end" class="viz-label">${esc(it.label)}</text>
      <rect x="${labelW}" y="${y}" width="${w.toFixed(1)}" height="${barH}" rx="4" class="bar-fill ${it.flag ? 'bar-flag' : ''}"><title>${esc(it.label)}: ${formatUsdShort(it.value)} annualised value at risk (${pct(it.probability)} likelihood)</title></rect>
      <text x="${labelW + w + 8}" y="${y + barH / 2 + 4}" class="viz-value">${formatUsdShort(it.value)} · ${pct(it.probability)}${it.flag ? ' ▲' : ''}</text>
    </g>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-bars" role="img" aria-label="Annualised value at risk by business service">${bars}</svg>`;
}

export function varBarsTable(items) {
  return `<table><thead><tr><th>Service</th><th>Value at risk</th><th>Likelihood</th><th>Above appetite</th></tr></thead><tbody>${items.map((i) => `<tr><td>${esc(i.label)}</td><td class="num">${formatUsdShort(i.value)}</td><td class="num">${pct(i.probability, 1)}</td><td>${i.flag ? 'Yes' : 'No'}</td></tr>`).join('')}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// Trend: total value at risk per month, with appetite reference line
// ---------------------------------------------------------------------------

export function trendSvg(points, appetite) {
  const width = 760;
  const height = 230;
  const m = { top: 16, right: 20, bottom: 30, left: 64 };
  const pw = width - m.left - m.right;
  const ph = height - m.top - m.bottom;
  const max = Math.max(appetite || 0, ...points.map((p) => p.value_at_risk_usd)) * 1.12 || 1;
  const x = (i) => m.left + (points.length === 1 ? pw / 2 : (i * pw) / (points.length - 1));
  const y = (v) => m.top + ph - (v / max) * ph;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const grid = ticks.map((t) => `<line x1="${m.left}" x2="${width - m.right}" y1="${y(t).toFixed(1)}" y2="${y(t).toFixed(1)}" class="viz-grid"/><text x="${m.left - 8}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" class="viz-axis">${formatUsdShort(t)}</text>`).join('');
  const line = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value_at_risk_usd).toFixed(1)}`).join('');
  const area = `${line}L${x(points.length - 1).toFixed(1)},${y(0).toFixed(1)}L${x(0).toFixed(1)},${y(0).toFixed(1)}Z`;
  const xlabels = points.map((p, i) => (i % 2 === 1 || i === points.length - 1 ? `<text x="${x(i).toFixed(1)}" y="${height - 10}" text-anchor="middle" class="viz-axis">${esc(p.month)}</text>` : '')).join('');
  const dots = points.map((p, i) => `<g class="trend-pt"><rect x="${(x(i) - pw / points.length / 2).toFixed(1)}" y="${m.top}" width="${(pw / points.length).toFixed(1)}" height="${ph}" class="hit"><title>${esc(p.month)}: ${formatUsdShort(p.value_at_risk_usd)} value at risk, ${p.open_risks} open risks</title></rect><circle cx="${x(i).toFixed(1)}" cy="${y(p.value_at_risk_usd).toFixed(1)}" r="${i === points.length - 1 ? 4.5 : 3}" class="trend-dot"/></g>`).join('');
  const appetiteLine = appetite
    ? `<line x1="${m.left}" x2="${width - m.right}" y1="${y(appetite).toFixed(1)}" y2="${y(appetite).toFixed(1)}" class="viz-ref"/><text x="${width - m.right}" y="${(y(appetite) - 6).toFixed(1)}" text-anchor="end" class="viz-ref-label">Board appetite ${formatUsdShort(appetite)}</text>`
    : '';
  const last = points[points.length - 1];
  const lastLabel = last ? `<text x="${(x(points.length - 1) - 8).toFixed(1)}" y="${(y(last.value_at_risk_usd) - 10).toFixed(1)}" text-anchor="end" class="viz-value">${formatUsdShort(last.value_at_risk_usd)}</text>` : '';
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-trend" role="img" aria-label="Total annualised value at risk, last 12 months">${grid}<path d="${area}" class="trend-area"/><path d="${line}" class="trend-line"/>${appetiteLine}${dots}${lastLabel}${xlabels}</svg>`;
}

export function trendTable(points) {
  return `<table><thead><tr><th>Month</th><th>Value at risk</th><th>Open risks</th></tr></thead><tbody>${points.map((p) => `<tr><td>${esc(p.month)}</td><td class="num">${formatUsdShort(p.value_at_risk_usd)}</td><td class="num">${p.open_risks}</td></tr>`).join('')}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// Compliance posture by framework with the board's floor
// ---------------------------------------------------------------------------

export function complianceSvg(rows, floor) {
  const labelW = 150;
  const valueW = 120;
  const barH = 18;
  const gap = 10;
  const width = 560;
  const plotW = width - labelW - valueW;
  const height = rows.length * (barH + gap) + 26;
  const fx = floor != null ? labelW + floor * plotW : null;
  const bars = rows.map((r, i) => {
    const y = 4 + i * (barH + gap);
    const below = floor != null && r.posture < floor;
    return `<g>
      <text x="${labelW - 10}" y="${y + barH / 2 + 4}" text-anchor="end" class="viz-label">${esc(r.framework)}</text>
      <rect x="${labelW}" y="${y}" width="${plotW}" height="${barH}" rx="4" class="bar-track"/>
      <rect x="${labelW}" y="${y}" width="${Math.max(2, r.posture * plotW).toFixed(1)}" height="${barH}" rx="4" class="bar-fill"><title>${esc(r.framework)}: ${pct(r.posture)} posture — ${r.controls} controls, ${r.open_risks} open risks against them</title></rect>
      <text x="${labelW + plotW + 8}" y="${y + barH / 2 + 4}" class="viz-value">${pct(r.posture)}${below ? ' ▼ below floor' : ''}</text>
    </g>`;
  }).join('');
  const floorLine = fx != null
    ? `<line x1="${fx}" x2="${fx}" y1="0" y2="${height - 18}" class="viz-ref"/><text x="${fx}" y="${height - 4}" text-anchor="middle" class="viz-ref-label">Floor ${pct(floor)}</text>`
    : '';
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-compliance" role="img" aria-label="Compliance posture by framework">${bars}${floorLine}</svg>`;
}

export function complianceTable(rows) {
  return `<table><thead><tr><th>Framework</th><th>Posture</th><th>Controls</th><th>Open risks</th><th>Control gaps</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.framework)}</td><td class="num">${pct(r.posture, 1)}</td><td class="num">${r.controls}</td><td class="num">${r.open_risks}</td><td>${esc(r.gap_control_ids.join(', '))}</td></tr>`).join('')}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// Risk matrix: likelihood (y) x impact (x), one labelled dot per service
// ---------------------------------------------------------------------------

export function riskMatrixSvg(services, appetiteLikelihood) {
  const width = 560;
  const height = 360;
  const m = { top: 14, right: 18, bottom: 40, left: 52 };
  const pw = width - m.left - m.right;
  const ph = height - m.top - m.bottom;
  const maxImpact = Math.max(1, ...services.map((s) => s.impact.total_usd)) * 1.1;
  const x = (v) => m.left + (v / maxImpact) * pw;
  const y = (p) => m.top + ph - p * ph;
  const zones = [
    [0, 0, 0.5, 0.5, 'zone-1'], [0.5, 0, 1, 0.5, 'zone-2'], [0, 0.5, 0.5, 1, 'zone-2'], [0.5, 0.5, 1, 1, 'zone-3'],
  ].map(([x0, y0, x1, y1, c]) => `<rect x="${m.left + x0 * pw}" y="${m.top + (1 - y1) * ph}" width="${(x1 - x0) * pw}" height="${(y1 - y0) * ph}" class="${c}"/>`).join('');
  const ax = `<line x1="${m.left}" y1="${m.top + ph}" x2="${m.left + pw}" y2="${m.top + ph}" class="viz-axis-line"/><line x1="${m.left}" y1="${m.top}" x2="${m.left}" y2="${m.top + ph}" class="viz-axis-line"/>` +
    `<text x="${m.left + pw / 2}" y="${height - 6}" text-anchor="middle" class="viz-axis">Business impact if it happens →</text>` +
    `<text x="14" y="${m.top + ph / 2}" text-anchor="middle" class="viz-axis" transform="rotate(-90 14 ${m.top + ph / 2})">Likelihood (12 mo) →</text>` +
    [0, 0.25, 0.5, 0.75, 1].map((t) => `<text x="${m.left - 6}" y="${(y(t) + 4).toFixed(1)}" text-anchor="end" class="viz-axis">${pct(t)}</text>`).join('') +
    [0.25, 0.5, 0.75, 1].map((t) => `<text x="${x(t * maxImpact).toFixed(1)}" y="${m.top + ph + 16}" text-anchor="middle" class="viz-axis">${formatUsdShort(t * maxImpact)}</text>`).join('');
  const appetiteLine = appetiteLikelihood != null ? `<line x1="${m.left}" x2="${m.left + pw}" y1="${y(appetiteLikelihood).toFixed(1)}" y2="${y(appetiteLikelihood).toFixed(1)}" class="viz-ref"/><text x="${m.left + pw - 4}" y="${(y(appetiteLikelihood) - 5).toFixed(1)}" text-anchor="end" class="viz-ref-label">Appetite ${pct(appetiteLikelihood)}</text>` : '';
  // Place labels top-down and nudge any label whose box would overlap one
  // already placed, so clustered services stay legible (11px text, ~6px/char).
  const placed = [];
  const pts = services
    .map((s) => {
      const cx = x(s.impact.total_usd);
      const cy = y(s.probability);
      const short = s.service.name.replace(/\s*\(.*\)\s*/, '').split(/[&,]/)[0].trim();
      const anchor = cx > m.left + pw * 0.7 ? 'end' : 'start';
      const w = short.length * 6.2;
      const x0 = anchor === 'end' ? cx - 9 - w : cx + 9;
      return { s, cx, cy, short, anchor, x0, x1: x0 + w, ly: cy + 4 };
    })
    .sort((a, b) => a.cy - b.cy || a.cx - b.cx);
  for (const p of pts) {
    for (let guard = 0; guard < 8; guard++) {
      const hit = placed.find((q) => Math.abs(q.ly - p.ly) < 13 && p.x0 < q.x1 && q.x0 < p.x1);
      if (!hit) break;
      p.ly = hit.ly + 13;
    }
    placed.push(p);
  }
  const dots = pts.map(({ s, cx, cy, short, anchor, ly }) => {
    const dx = anchor === 'end' ? -9 : 9;
    const leader = Math.abs(ly - (cy + 4)) > 2 ? `<line x1="${cx.toFixed(1)}" y1="${cy.toFixed(1)}" x2="${(cx + dx * 0.8).toFixed(1)}" y2="${(ly - 4).toFixed(1)}" class="viz-grid"/>` : '';
    return `<g class="matrix-pt" data-service="${esc(s.service.id)}" tabindex="0" role="button" aria-label="${esc(s.service.name)}: ${pct(s.probability)} likelihood, ${formatUsdShort(s.impact.total_usd)} impact">
      ${leader}<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="7" class="matrix-dot tier-${s.service.tier}"><title>${esc(s.service.name)} — likelihood ${pct(s.probability)}, impact ${formatUsdShort(s.impact.total_usd)}, value at risk ${formatUsdShort(s.value_at_risk_usd)}</title></circle>
      <text x="${(cx + dx).toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${anchor}" class="viz-label matrix-label">${esc(short)}</text>
    </g>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-matrix" role="img" aria-label="Business risk matrix: likelihood versus impact per service">${zones}${ax}${appetiteLine}${dots}</svg>`;
}

export function riskMatrixTable(services) {
  return `<table><thead><tr><th>Service</th><th>Tier</th><th>Likelihood</th><th>Impact</th><th>Value at risk</th></tr></thead><tbody>${services.map((s) => `<tr><td>${esc(s.service.name)}</td><td class="num">${s.service.tier}</td><td class="num">${pct(s.probability, 1)}</td><td class="num">${formatUsdShort(s.impact.total_usd)}</td><td class="num">${formatUsdShort(s.value_at_risk_usd)}</td></tr>`).join('')}</tbody></table>`;
}

// ---------------------------------------------------------------------------
// KPI health: one stacked bar of statuses, labelled
// ---------------------------------------------------------------------------

export function kpiHealthSvg(counts) {
  const order = ['breached', 'breach_projected', 'at_risk', 'on_track'];
  const total = order.reduce((s, k) => s + (counts[k] || 0), 0) || 1;
  const width = 560;
  const height = 64;
  let x = 0;
  const segs = order.map((k) => {
    const w = ((counts[k] || 0) / total) * width;
    const m = STATUS_META[k];
    const seg = w > 0 ? `<rect x="${(x + 1).toFixed(1)}" y="4" width="${Math.max(0, w - 2).toFixed(1)}" height="22" rx="4" class="${m.cls}-fill"><title>${m.label}: ${counts[k]} of ${total} KPIs</title></rect>` : '';
    const label = w > 34 ? `<text x="${(x + w / 2).toFixed(1)}" y="46" text-anchor="middle" class="viz-label">${m.icon} ${counts[k]}</text><text x="${(x + w / 2).toFixed(1)}" y="60" text-anchor="middle" class="viz-axis">${esc(m.label)}</text>` : '';
    x += w;
    return seg + label;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-kpi-health" role="img" aria-label="KPI health: ${order.map((k) => `${counts[k] || 0} ${STATUS_META[k].label}`).join(', ')}">${segs}</svg>`;
}

/** Wrap an SVG + table in the same figure markup the report uses. */
export function figure(title, svg, table, { wide = false, note = '' } = {}) {
  return `<figure class="biz-figure${wide ? ' biz-figure-wide' : ''}">
    <figcaption>${esc(title)}</figcaption>
    ${note ? `<p class="biz-figure-note">${note}</p>` : ''}
    ${svg}
    <details class="chart-data-table"><summary>Data table</summary>${table}</details>
  </figure>`;
}
