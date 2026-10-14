// "SLO cyber-risk impact" report -> watermarked PDF, from the BIA engine's
// output. Same block engine and Base-14 fonts as the other reports, so every
// string here sticks to WinAnsi (no U+2212 minus, arrows or ≥).

import { buildPdfFromBlocks, pdfBlocks } from '../report/pdf.js';
import { formatUsdShort } from './engine.js';
import { STATUS_META } from './charts.js';
import { bandOf, nameIndex, sloSentence, COMPONENT_CATEGORIES, formatSloValue } from './bia.js';

const { h, body, kv, rule, spacer, pagebreak, table, bar } = pdfBlocks;

const toneOf = (score) => (score >= 60 ? 'bad' : score >= 40 ? 'warn' : 'ok');
// formatSloValue uses U+2212 for negatives, which WinAnsi lacks.
const pdfValue = (v, slo) => formatSloValue(v, slo).replace('−', '-');

export function buildBiaBlocks(ctx, bia, { impacts = [], rankSloId = 'SLO-ARR', baseline = null } = {}) {
  const org = ctx.organization || {};
  const names = nameIndex(bia, ctx);
  const scen = new Map((ctx.risk_scenarios || []).map((s) => [s.id, s.name]));
  const blocks = [];
  blocks.push(h(1, `${org.name || 'Organisation'} - Business Impact Analysis: cyber risk to SLOs`));
  blocks.push(kv('As of', bia.as_of));
  blocks.push(kv('Prepared for', 'Executive Leadership Team and Board Risk Committee'));
  const applied = bia.headline.mitigations_applied;
  if (applied.length) blocks.push(kv('Simulation', `${applied.length} proposed mitigation(s) assumed in place (${applied.join(', ')}), cost ${formatUsdShort(bia.headline.mitigation_cost_usd)}`));
  const f = Object.entries(bia.filters || {}).filter(([, v]) => v);
  if (f.length) blocks.push(kv('Slice', f.map(([k, v]) => `${k}=${v}`).join(', ')));
  if (ctx.synthetic) blocks.push(body('MOCK DATA - this organisation is fictional and every figure is computed from a synthetic dataset.', { color: 'warn', size: 9 }));
  blocks.push(rule());

  blocks.push(h(2, 'Cyber-risk score factor by SLO'));
  blocks.push(body('Score 0-100 = share of the SLO\'s headroom (plan forecast minus target) that open cyber risk is expected to consume: 63 means the SLO is projected to land exactly on target. Bands: Critical 60+, High 40+, Medium 20+, Low.', { size: 9 }));
  for (const r of bia.slos) {
    const before = baseline?.slos.find((x) => x.id === r.id);
    const sim = before && before.loss_usd !== r.loss_usd ? ` (was ${formatUsdShort(before.loss_usd)})` : '';
    blocks.push(bar(r.slo.name, r.score / 100, `${r.score} ${bandOf(r.score).label} - ${formatUsdShort(r.loss_usd)}${sim}`, { tone: toneOf(r.score) }));
  }
  blocks.push(spacer(6));
  blocks.push(...table(['SLO', 'Target', 'Plan', 'Cyber-adjusted', 'Shortfall', 'Status'], bia.slos.map((r) => [
    r.slo.name, pdfValue(r.slo.target, r.slo), pdfValue(r.slo.forecast, r.slo), pdfValue(r.projected, r.slo),
    `${formatUsdShort(r.loss_usd)} (${(r.loss_pct_of_basis * 100).toFixed(1)}%)`, STATUS_META[r.status]?.label || r.status,
  ]), [0.3, 0.12, 0.12, 0.14, 0.16, 0.16]));

  for (const r of bia.slos) {
    blocks.push(pagebreak());
    blocks.push(h(2, `${r.slo.name} - score ${r.score} (${bandOf(r.score).label})`));
    blocks.push(body(sloSentence(r, scen)));
    blocks.push(kv('Owner', r.slo.owner));
    blocks.push(kv('Financial basis', `${formatUsdShort(r.slo.basis_usd)} - ${r.slo.basis_label}`));
    blocks.push(kv('Plan / cyber-adjusted / target', `${pdfValue(r.slo.forecast, r.slo)} / ${pdfValue(r.projected, r.slo)} / ${pdfValue(r.slo.target, r.slo)}`));
    blocks.push(h(3, 'Shortfall by cyber-risk scenario'));
    const max = Math.max(1, ...r.by_scenario.map((s) => s.loss_usd));
    for (const s of r.by_scenario.slice(0, 6)) blocks.push(bar(scen.get(s.id) || s.id, s.loss_usd / max, `${formatUsdShort(s.loss_usd)} (${Math.round(s.share * 100)}%)`, { tone: 'ok' }));
    blocks.push(h(3, 'Policies carrying the shortfall'));
    blocks.push(...table(['Policy', 'Weight', 'P(fail)', 'Shortfall'], r.by_policy.slice(0, 8).map((p) => [names.get(p.policy_id) || p.policy_id, `${(p.weight * 100).toFixed(1)}%`, `${Math.round(p.probability * 100)}%`, formatUsdShort(p.loss_usd)]), [0.58, 0.12, 0.12, 0.18]));
    blocks.push(h(3, 'Top contributing findings'));
    blocks.push(...table(['Finding', 'Score', 'Shortfall'], r.by_finding.slice(0, 10).map((x) => [`${x.id} ${names.get(x.id) || ''}`, `${x.score} ${bandOf(x.score).label}`, formatUsdShort(x.loss_usd)]), [0.68, 0.14, 0.18]));
  }

  blocks.push(pagebreak());
  blocks.push(h(2, 'Where the risk sits (levels 2-5)'));
  for (const [key, title] of [['policy', 'Policies'], ['process', 'Business processes'], ['component', 'Components'], ['scenario', 'Cyber-risk scenarios']]) {
    blocks.push(h(3, title));
    blocks.push(...table(['Item', key === 'component' ? 'Type' : 'Owner', 'Score'], bia.levels[key].slice(0, 10).map((n) => [n.name, key === 'component' ? COMPONENT_CATEGORIES[n.category] || n.category : n.owner || '', `${n.score} ${bandOf(n.score).label}`]), [0.62, 0.2, 0.18]));
  }

  if (impacts.length) {
    blocks.push(pagebreak());
    blocks.push(h(2, `Proposed mitigations ranked by ${names.get(rankSloId) || rankSloId} shortfall removed`));
    blocks.push(...table(['Mitigation', 'Cost', 'ETA', 'Removes', 'ROI', 'In plan'], impacts.map((m) => [
      `${m.mitigation.id} ${m.mitigation.title}`, formatUsdShort(m.mitigation.cost_usd), `${m.mitigation.eta_days} d`, formatUsdShort(m.reduction_usd), m.roi == null ? '-' : `${m.roi}x`, m.applied ? 'yes' : '',
    ]), [0.46, 0.1, 0.08, 0.14, 0.1, 0.12]));
  }

  blocks.push(spacer(8));
  blocks.push(h(2, 'Method'));
  blocks.push(body('Findings (vulnerabilities, misconfigurations, exposures, IOC/IOA hunts) get a 12-month likelihood from severity, exploitability, exposure, active threat and control effectiveness. Each finding raises the likelihood of the cyber-risk scenarios it enables on the components (people, procedures, data, systems) it touches. Component events disrupt the business processes that need them, processes failing make policies miss their thresholds, and each policy carries a weighted share of an SLO\'s financial basis. Probabilities combine as 1 - product(1 - p); dollars are attributed to scenarios and findings by hazard share. See docs/BUSINESS_RISK_MODEL.md.', { size: 9 }));
  return blocks;
}

export async function generateBiaPdf(ctx, bia, opts = {}) {
  const classification = opts.classification || 'CONFIDENTIAL — BOARD';
  const { bytes, pageCount } = await buildPdfFromBlocks(buildBiaBlocks(ctx, bia, opts), {
    watermarkText: ctx.synthetic ? `MOCK DATA — ${classification}` : classification,
    headerText: `${ctx.organization?.name || ''}  —  BIA: cyber risk to SLOs  —  ${bia.as_of}`,
    footerText: 'Generated by the IRTriage console (business-impact module)',
    title: `${ctx.organization?.name || ''} BIA cyber risk to SLOs ${bia.as_of}`,
  });
  return { blob: new Blob([bytes], { type: 'application/pdf' }), pageCount };
}
