// Inline-SVG charts for the BIA explorer. Same rules as business/charts.js:
// pure functions returning SVG strings, colour only through CSS classes, a
// <title> on every mark, and band colour always paired with an icon + label.

import { esc } from './charts.js';
import { bandOf, BIA_MODEL, formatSloValue } from './bia.js';
import { formatUsdShort } from './engine.js';

function lin(v, d0, d1, r0, r1) {
  if (d1 === d0) return r0;
  return r0 + ((v - d0) / (d1 - d0)) * (r1 - r0);
}

/** "▲ 64" chip; the band name is in the label/title so colour is never the only cue. */
export function scoreChip(score, { label = false, prefix = '' } = {}) {
  const b = bandOf(score);
  return `<span class="score-chip band-${b.id}" title="${esc(prefix)}Risk score ${score} / 100 — ${b.label}"><span aria-hidden="true">${b.icon}</span> ${score}${label ? ` <span class="score-band">${b.label}</span>` : ''}</span>`;
}

export function bandLegend() {
  return `<div class="band-legend" aria-label="Risk score bands">${BIA_MODEL.bands.map((b) => `<span class="score-chip band-${b.id}"><span aria-hidden="true">${b.icon}</span> ${b.label} ${b.min}+</span>`).join('')}</div>`;
}

/**
 * Waterfall in the SLO's own unit: plan forecast, minus the shortfall each
 * scenario causes, ending at the cyber-adjusted projection, against the target.
 */
export function sloWaterfallSvg(row, scenarioNames, { maxSteps = 5 } = {}) {
  const slo = row.slo;
  const sign = slo.direction === 'higher_is_better' ? -1 : 1;
  const steps = row.by_scenario.filter((s) => s.loss_usd > 0);
  const top = steps.slice(0, maxSteps);
  const rest = steps.slice(maxSteps).reduce((s, x) => s + x.loss_usd, 0);
  if (rest > 0) top.push({ id: 'other', loss_usd: rest });
  const bars = [{ label: 'Plan forecast', from: 0, to: slo.forecast, kind: 'total' }];
  let level = slo.forecast;
  for (const s of top) {
    const next = level + sign * s.loss_usd * slo.metric_per_usd;
    bars.push({ label: s.id === 'other' ? 'Other scenarios' : scenarioNames.get(s.id) || s.id, from: level, to: next, kind: 'step', usd: s.loss_usd });
    level = next;
  }
  bars.push({ label: 'Cyber-adjusted', from: 0, to: row.projected, kind: 'total' });

  const width = 640;
  const rowH = 28;
  const labelW = 170;
  const height = bars.length * rowH + 40;
  const vals = [slo.target, slo.forecast, row.projected, ...bars.map((b) => b.to)];
  let lo = Math.min(...vals);
  let hi = Math.max(...vals);
  const span = hi - lo || Math.abs(hi) * 0.1 || 1;
  lo -= span * 0.35;
  hi += span * 0.2;
  if (slo.direction === 'lower_is_better' && lo > 0) lo = Math.max(0, lo);
  const x = (v) => lin(v, lo, hi, labelW + 8, width - 60);
  const dec = slo.decimals ?? 1;
  const marks = bars.map((b, i) => {
    const y = 14 + i * rowH;
    const a = b.kind === 'total' ? x(lo) : x(Math.min(b.from, b.to));
    const z = b.kind === 'total' ? x(b.to) : x(Math.max(b.from, b.to));
    const w = Math.max(2, z - a);
    const cls = b.kind === 'total' ? (i === 0 ? 'wf-plan' : 'wf-adjusted') : 'wf-step';
    const value = b.kind === 'total' ? formatSloValue(b.to, slo) : `${formatSloValue(b.to - b.from, { ...slo, decimals: dec + 1 }, { signed: true })} (${formatUsdShort(b.usd)})`;
    const conn = i < bars.length - 1 && b.kind === 'step' ? `<line class="wf-conn" x1="${x(b.to).toFixed(1)}" x2="${x(b.to).toFixed(1)}" y1="${y + rowH - 8}" y2="${y + rowH + 2}"/>` : '';
    return `<g class="wf-bar"><title>${esc(b.label)}: ${esc(value)}</title>
      <text class="viz-label" x="${labelW}" y="${y + 13}" text-anchor="end">${esc(b.label.length > 26 ? `${b.label.slice(0, 25)}…` : b.label)}</text>
      <rect class="${cls}" x="${a.toFixed(1)}" y="${y}" width="${w.toFixed(1)}" height="${rowH - 10}" rx="2"/>
      <text class="viz-value" x="${(a + w + 6).toFixed(1)}" y="${y + 13}">${esc(b.kind === 'total' ? formatSloValue(b.to, slo) : value.split(' (')[0])}</text>${conn}</g>`;
  }).join('');
  const tx = x(slo.target).toFixed(1);
  const target = `<line class="viz-ref" x1="${tx}" x2="${tx}" y1="6" y2="${height - 24}"/><text class="viz-ref-label" x="${tx}" y="${height - 10}" text-anchor="middle">Target ${esc(formatSloValue(slo.target, slo))}</text>`;
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-waterfall" role="img" aria-label="${esc(slo.name)}: plan ${esc(formatSloValue(slo.forecast, slo))}, cyber-adjusted ${esc(formatSloValue(row.projected, slo))}, target ${esc(formatSloValue(slo.target, slo))}">${target}${marks}</svg>`;
}

/** Horizontal single-hue bars (dollars), one per item. */
export function impactBarsSvg(items, { width = 520, valueFmt = formatUsdShort } = {}) {
  if (!items.length) return '<p class="muted">No contribution.</p>';
  const rowH = 24;
  const labelW = 210;
  const height = items.length * rowH + 8;
  const max = Math.max(...items.map((i) => i.value)) || 1;
  const marks = items.map((it, i) => {
    const y = 4 + i * rowH;
    const w = Math.max(2, lin(it.value, 0, max, 0, width - labelW - 70));
    const lbl = it.label.length > 32 ? `${it.label.slice(0, 31)}…` : it.label;
    return `<g class="bar-row${it.focus ? ' is-link' : ''}"${it.focus ? ` data-focus="${esc(it.focus)}" tabindex="0" role="button"` : ''}><title>${esc(it.label)}: ${esc(valueFmt(it.value))}</title>
      <text class="viz-label" x="${labelW - 6}" y="${y + 14}" text-anchor="end">${esc(lbl)}</text>
      <rect class="bar-track" x="${labelW}" y="${y + 3}" width="${width - labelW - 70}" height="14" rx="2"/>
      <rect class="bar-fill" x="${labelW}" y="${y + 3}" width="${w.toFixed(1)}" height="14" rx="2"/>
      <text class="viz-value" x="${(labelW + w + 6).toFixed(1)}" y="${y + 14}">${esc(valueFmt(it.value))}</text></g>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-impact" role="img" aria-label="${esc(items.map((i) => `${i.label} ${valueFmt(i.value)}`).join(', '))}">${marks}</svg>`;
}

/** 12-month cyber-risk score, with the band thresholds as faint reference lines. */
export function scoreTrendSvg(points, { width = 220, height = 56 } = {}) {
  if (!points?.length) return '';
  const x = (i) => lin(i, 0, points.length - 1, 4, width - 8);
  const y = (v) => lin(v, 0, 100, height - 4, 4);
  const path = points.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.score).toFixed(1)}`).join('');
  const refs = [60, 40].map((v) => `<line class="viz-grid" x1="4" x2="${width - 8}" y1="${y(v).toFixed(1)}" y2="${y(v).toFixed(1)}"/>`).join('');
  const last = points[points.length - 1];
  const dots = points.map((p, i) => `<circle class="spark-dot" cx="${x(i).toFixed(1)}" cy="${y(p.score).toFixed(1)}" r="${i === points.length - 1 ? 3 : 1.5}"><title>${esc(p.month)}: score ${p.score}</title></circle>`).join('');
  return `<svg viewBox="0 0 ${width} ${height}" class="viz score-trend" role="img" aria-label="Cyber-risk score over 12 months, now ${last.score}">${refs}<path class="spark-line" d="${path}"/>${dots}</svg>`;
}

/**
 * L6 timeline: one row per finding (open → closed / today) or hunt (weekly runs,
 * dot size = matches), with evidence ticks.
 * rows: [{id, label, kind:'finding'|'hunt', start, end, score, open, evidence:[iso], runs:[{date,hits}]}]
 */
export function timelineSvg(rows, months, asOf) {
  const width = 960;
  const labelW = 300;
  const rowH = 22;
  const top = 26;
  const height = top + rows.length * rowH + 10;
  const t0 = Date.parse(`${months[0]}-01T00:00:00Z`);
  const t1 = Date.parse(`${asOf}T23:59:59Z`);
  const x = (iso) => lin(Date.parse(iso.length === 10 ? `${iso}T12:00:00Z` : iso), t0, t1, labelW + 6, width - 10);
  const axis = months.map((m) => {
    const xx = x(`${m}-01`).toFixed(1);
    return `<line class="viz-grid" x1="${xx}" x2="${xx}" y1="${top - 6}" y2="${height - 6}"/><text class="viz-axis" x="${(Number(xx) + 3).toFixed(1)}" y="14">${esc(m.slice(2))}</text>`;
  }).join('');
  const maxHits = Math.max(1, ...rows.flatMap((r) => (r.runs || []).map((u) => u.hits)));
  const marks = rows.map((r, i) => {
    const y = top + i * rowH;
    const b = bandOf(r.score);
    const lbl = `${r.id} ${r.label}`;
    const text = `<text class="viz-label tl-label" x="${labelW - 6}" y="${y + 14}" text-anchor="end">${esc(lbl.length > 46 ? `${lbl.slice(0, 45)}…` : lbl)}</text>`;
    let body = '';
    if (r.kind === 'hunt') {
      body = `<line class="tl-hunt-track" x1="${labelW + 6}" x2="${width - 10}" y1="${y + 10}" y2="${y + 10}"/>${(r.runs || []).map((u) => {
        const cx = x(u.date).toFixed(1);
        if (!u.hits) return `<circle class="tl-run-empty" cx="${cx}" cy="${y + 10}" r="2.5"><title>${esc(r.id)} run ${esc(u.date)}: no matches</title></circle>`;
        const rad = 3 + 5 * Math.sqrt(u.hits / maxHits);
        return `<circle class="tl-run band-fill-${b.id}" cx="${cx}" cy="${y + 10}" r="${rad.toFixed(1)}"><title>${esc(r.id)} run ${esc(u.date)}: ${u.hits} matches</title></circle>`;
      }).join('')}`;
    } else {
      const a = x(r.start);
      const z = Math.max(a + 3, x(r.end));
      body = `<rect class="tl-bar band-fill-${b.id}${r.open ? '' : ' tl-closed'}" x="${a.toFixed(1)}" y="${y + 4}" width="${(z - a).toFixed(1)}" height="12" rx="3"><title>${esc(r.id)}: ${esc(r.start)} → ${esc(r.open ? 'open' : r.end)} · score ${r.score} (${b.label})</title></rect>
        ${(r.evidence || []).map((e) => `<line class="tl-ev" x1="${x(e).toFixed(1)}" x2="${x(e).toFixed(1)}" y1="${y + 1}" y2="${y + 19}"><title>Evidence collected ${esc(e)}</title></line>`).join('')}`;
    }
    return `<g class="tl-row" data-focus="${esc(r.id)}" tabindex="0" role="button" aria-label="${esc(lbl)}, ${b.label}">${text}${body}</g>`;
  }).join('');
  const now = x(asOf).toFixed(1);
  return `<svg viewBox="0 0 ${width} ${height}" class="viz viz-timeline" role="img" aria-label="Timeline of ${rows.length} hunts and findings">${axis}<line class="viz-ref" x1="${now}" x2="${now}" y1="${top - 6}" y2="${height - 6}"/>${marks}</svg>`;
}
