// Executive business-risk report -> watermarked PDF, built on the same
// hand-rolled PDF writer as the forensic report (report/pdf.js), so there is
// still no vendored library anywhere in the app.

import { buildPdfFromBlocks, pdfBlocks } from '../report/pdf.js';
import { formatUsdShort } from './engine.js';
import { STATUS_META } from './charts.js';

const { h, body, kv, rule, spacer, pagebreak, table, bar } = pdfBlocks;

function pct(v) {
  return `${Math.round((v || 0) * 100)}%`;
}

export function buildExecutiveBlocks(ctx, view, { priorities = [] } = {}) {
  const org = ctx.organization || {};
  const hl = view.headline;
  const blocks = [];

  blocks.push(h(1, `${org.name || 'Organisation'} — Cyber-to-Business Risk Report`));
  blocks.push(kv('As of', view.as_of));
  blocks.push(kv('Prepared for', 'Executive Leadership Team and Board Risk Committee'));
  if (view.remediated.length) blocks.push(kv('Scenario', `What-if: ${view.remediated.length} cyber risk(s) assumed remediated (${view.remediated.join(', ')})`));
  if (ctx.synthetic) blocks.push(body('MOCK DATA — this organisation is fictional and every figure is computed from a synthetic dataset.', { color: 'warn', size: 9 }));
  blocks.push(rule());

  blocks.push(h(2, 'Headline'));
  const varTone = hl.appetite_usd && hl.value_at_risk_usd > hl.appetite_usd ? 'bad' : 'ok';
  blocks.push(bar('Annualised value at risk vs appetite', hl.appetite_usd ? Math.min(1, hl.value_at_risk_usd / (hl.appetite_usd * 2)) : 0, `${formatUsdShort(hl.value_at_risk_usd)} / ${formatUsdShort(hl.appetite_usd)}`, { marker: 0.5, tone: varTone }));
  blocks.push(bar('Business risk index (0–100)', hl.risk_index / 100, String(hl.risk_index), { tone: hl.risk_index >= 50 ? 'bad' : hl.risk_index >= 30 ? 'warn' : 'ok' }));
  blocks.push(bar('Average compliance posture', hl.compliance_avg ?? 0, pct(hl.compliance_avg), { marker: hl.compliance_floor ?? undefined, tone: hl.compliance_floor != null && hl.compliance_avg < hl.compliance_floor ? 'bad' : 'ok' }));
  blocks.push(spacer(6));
  blocks.push(body(`${hl.kpis_breached} of ${hl.kpis_total} KPIs/SLAs are already breached and ${hl.kpis_breach_projected} more are projected to breach if current cyber risk materialises; ${hl.kpis_at_risk} are at risk. ${hl.services_above_appetite} of ${hl.services_total} business services exceed the board's likelihood appetite. ${hl.open_risks} cyber risks are open (${hl.open_critical} critical, ${hl.active_threats} active threat indicators).`));

  blocks.push(h(2, 'Top business risks'));
  for (const br of view.business_risks.slice(0, 6)) {
    blocks.push(h(3, br.title));
    blocks.push(body(br.statement, { size: 9.5 }));
  }

  blocks.push(h(2, 'Value at risk by business service'));
  const maxVar = Math.max(1, ...view.services.map((s) => s.value_at_risk_usd));
  for (const s of view.services) {
    blocks.push(bar(s.service.name, s.value_at_risk_usd / maxVar, `${formatUsdShort(s.value_at_risk_usd)} · ${pct(s.probability)}`, { tone: s.above_appetite ? 'bad' : 'ok' }));
  }

  blocks.push(pagebreak());
  blocks.push(h(2, 'Corporate goals'));
  blocks.push(...table(['Goal', 'Owner', 'Status'], view.goals.map((g) => [g.goal.title, g.goal.owner, STATUS_META[g.status]?.label || g.status]), [0.6, 0.18, 0.22]));
  blocks.push(spacer(10));

  blocks.push(h(2, 'KPIs, SLOs and SLAs under pressure'));
  const kpiRows = view.kpis.filter((k) => k.status !== 'on_track').map((k) => [
    k.kpi.name + (k.kpi.source?.type === 'generated' ? ' (AI-proposed)' : ''),
    k.service.name,
    `${k.kpi.current} ${k.kpi.unit}`,
    `${k.kpi.target} ${k.kpi.unit}`,
    `${k.projected} ${k.kpi.unit}`,
    STATUS_META[k.status]?.label || k.status,
  ]);
  blocks.push(...table(['KPI', 'Service', 'Current', 'Target', 'Projected', 'Status'], kpiRows, [0.28, 0.24, 0.11, 0.11, 0.11, 0.15]));
  blocks.push(spacer(10));

  blocks.push(h(2, 'Compliance posture'));
  for (const c of view.compliance) {
    blocks.push(bar(c.framework, c.posture, pct(c.posture), { marker: hl.compliance_floor ?? undefined, tone: hl.compliance_floor != null && c.posture < hl.compliance_floor ? 'bad' : 'ok' }));
  }

  if (priorities.length) {
    blocks.push(spacer(8));
    blocks.push(h(2, 'Recommended remediation (largest risk reduction first)'));
    blocks.push(...table(['Cyber risk', 'Action', 'Risk reduced', 'Cost', 'ETA'], priorities.slice(0, 12).map((p) => [
      `${p.risk.id} ${p.risk.title}`, p.risk.remediation?.action || '', formatUsdShort(p.var_reduction_usd), formatUsdShort(p.cost_usd), `${p.risk.remediation?.eta_days ?? '?'} d`,
    ]), [0.34, 0.34, 0.12, 0.1, 0.1]));
  }

  blocks.push(spacer(8));
  blocks.push(h(2, 'Method'));
  blocks.push(body('Each cyber risk receives a 12-month likelihood from its severity, exploitability, internet exposure and active-threat status, reduced by the effectiveness of mapped controls. Risks propagate to business services through the asset inventory and service dependencies. Value at risk = likelihood × BIA impact (downtime cost × expected outage + SLA penalties + regulatory, recovery and reputational exposure). KPI projections apply the service likelihood in the KPI\'s sensitive dimensions to its degradation-at-full-risk. See docs/BUSINESS_RISK_MODEL.md.', { size: 9 }));
  return blocks;
}

export async function generateExecutivePdf(ctx, view, opts = {}) {
  const classification = opts.classification || 'CONFIDENTIAL — BOARD';
  const { bytes, pageCount } = await buildPdfFromBlocks(buildExecutiveBlocks(ctx, view, opts), {
    watermarkText: ctx.synthetic ? `MOCK DATA — ${classification}` : classification,
    headerText: `${ctx.organization?.name || ''}  —  Cyber-to-Business Risk Report  —  ${view.as_of}`,
    footerText: 'Generated by the IRTriage console (business-risk module)',
    title: `${ctx.organization?.name || ''} Cyber-to-Business Risk Report ${view.as_of}`,
  });
  return { blob: new Blob([bytes], { type: 'application/pdf' }), pageCount };
}
