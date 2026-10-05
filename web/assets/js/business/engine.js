// Business-risk correlation engine (layer 3).
//
// computeBusinessRisk(context, opts) turns a BusinessContext (organisation,
// services/BIA, KPIs, assets, controls, cyber-risk register) into the figures
// the executive dashboard shows. It is a PURE, DETERMINISTIC function: no DOM,
// no network, no randomness, no clock. The dashboard never displays a number
// that was typed into the mock data — every figure on it is derived here, which
// is what makes the What-if panel (opts.remediated) meaningful.
//
// The model is deliberately simple and explainable (docs/BUSINESS_RISK_MODEL.md):
//
//   likelihood(risk)  = base(severity) × exploitability × exposure × active-threat
//                       × (1 − 0.5 × effectiveness of the risk's mapped controls)
//   P(service, dim)   = 1 − Π (1 − likelihood × asset-criticality weight)
//                       over open risks touching the service (directly, or at
//                       half weight through a service it depends on)
//   impact(service)   = downtime cost × expected outage + SLA penalty
//                       + regulatory + recovery + reputational exposure
//   value at risk     = P(service) × impact(service)
//   KPI projection    = current − degradation × max_dim(P(service, dim) × sensitivity)
//                       (sign follows the KPI's direction)

export const DIMENSIONS = ['availability', 'integrity', 'confidentiality', 'delivery', 'compliance'];

export const MODEL = Object.freeze({
  severityBase: { critical: 0.11, high: 0.05, medium: 0.016, low: 0.005, informational: 0.001 },
  exploitability: { known_exploited: 1.5, poc: 1.1, theoretical: 0.75 },
  internetFacing: 1.35,
  activeThreat: 1.5, // ioc / ioa / incident_finding: someone is already acting
  controlReduction: 0.5,
  criticalityWeight: { critical: 1, high: 0.8, medium: 0.55, low: 0.3 },
  dependencyWeight: 0.35,
  maxLikelihood: 0.95,
  statusWeight: { implemented: 1, partial: 0.55, planned: 0.15, not_implemented: 0 },
  compliancePenaltyPerRisk: { critical: 0.007, high: 0.003, medium: 0.0008, low: 0.0002, informational: 0 },
  tierWeight: { 1: 1, 2: 0.6, 3: 0.35, 4: 0.2 },
});

const ACTIVE_STATUSES = new Set(['open', 'in_progress', 'accepted']);
const THREAT_TYPES = new Set(['ioc', 'ioa', 'incident_finding']);

function clamp(v, lo, hi) {
  return Math.max(lo, Math.min(hi, v));
}

function round(v, d = 4) {
  const f = 10 ** d;
  return Math.round(v * f) / f;
}

/** Index a context once so the rest of the engine is O(risks × assets). */
export function indexContext(ctx) {
  const assets = new Map(ctx.assets.map((a) => [a.id, a]));
  const services = new Map(ctx.business_services.map((s) => [s.id, s]));
  const controls = new Map(ctx.controls.map((c) => [c.id, c]));
  const kpisByService = new Map();
  for (const k of ctx.kpis) {
    if (!kpisByService.has(k.service_id)) kpisByService.set(k.service_id, []);
    kpisByService.get(k.service_id).push(k);
  }
  const dependents = new Map(); // service -> services that depend on it
  for (const s of ctx.business_services) {
    for (const d of s.depends_on || []) {
      if (!dependents.has(d)) dependents.set(d, []);
      dependents.get(d).push(s.id);
    }
  }
  return { assets, services, controls, kpisByService, dependents };
}

/** Is a risk active on a given ISO date (YYYY-MM-DD or YYYY-MM)? */
function activeOn(risk, isoDate) {
  if (risk.first_seen > isoDate) return false;
  if (risk.status === 'mitigated' && risk.closed_on && risk.closed_on <= isoDate) return false;
  return true;
}

/** Likelihood (0..1) that this risk materialises into a material event in 12 months. */
export function riskLikelihood(risk, idx) {
  const base = MODEL.severityBase[risk.severity] ?? 0.05;
  const expl = MODEL.exploitability[risk.exploitability] ?? 1;
  const exposed = risk.asset_ids.some((id) => idx.assets.get(id)?.internet_facing) ? MODEL.internetFacing : 1;
  const threat = THREAT_TYPES.has(risk.type) ? MODEL.activeThreat : 1;
  const ctls = (risk.control_ids || []).map((id) => idx.controls.get(id)).filter(Boolean);
  const eff = ctls.length ? ctls.reduce((s, c) => s + c.effectiveness * (MODEL.statusWeight[c.status] ?? 0), 0) / ctls.length : 0;
  return clamp(base * expl * exposed * threat * (1 - MODEL.controlReduction * eff), 0, MODEL.maxLikelihood);
}

function riskTouches(risk, idx, filters) {
  // Returns Map<serviceId, weight> for this risk, honouring site/cloud filters.
  const out = new Map();
  for (const id of risk.asset_ids) {
    const a = idx.assets.get(id);
    if (!a) continue;
    if (filters.site && a.site !== filters.site) continue;
    if (filters.cloud && a.cloud !== filters.cloud) continue;
    const w = MODEL.criticalityWeight[a.criticality] ?? 0.5;
    for (const s of a.service_ids) out.set(s, Math.max(out.get(s) || 0, w));
  }
  // Dependency propagation: a risk on a service also threatens services that depend on it.
  for (const [s, w] of [...out]) {
    for (const dep of idx.dependents.get(s) || []) {
      const dw = w * MODEL.dependencyWeight;
      if (dw > (out.get(dep) || 0)) out.set(dep, dw);
    }
  }
  return out;
}

function impactOf(service) {
  const i = service.impact || {};
  const downtime = (service.cost_of_downtime_per_hour_usd || 0) * (i.expected_outage_hours || 0);
  const sla = service.sla?.penalty_usd || 0;
  const parts = {
    downtime_usd: downtime,
    sla_penalty_usd: sla,
    regulatory_usd: i.regulatory_usd || 0,
    recovery_usd: i.recovery_usd || 0,
    reputation_usd: i.reputation_usd || 0,
  };
  return { ...parts, total_usd: Object.values(parts).reduce((a, b) => a + b, 0) };
}

function kpiFails(k, value, threshold) {
  return k.direction === 'higher_is_better' ? value < threshold : value > threshold;
}

function projectKpi(k, svcDims) {
  let p = 0;
  let driver = null;
  for (const [dim, sens] of Object.entries(k.sensitivity || {})) {
    const v = (svcDims[dim] || 0) * sens;
    if (v > p) { p = v; driver = dim; }
  }
  const sign = k.direction === 'higher_is_better' ? -1 : 1;
  const projected = k.current + sign * (k.degradation_at_full_risk || 0) * p;
  let status;
  if (kpiFails(k, k.current, k.target)) status = 'breached';
  else if (kpiFails(k, projected, k.target)) status = 'breach_projected';
  else if (kpiFails(k, projected, k.warning)) status = 'at_risk';
  else status = 'on_track';
  const f = 10 ** (k.decimals ?? 2);
  return { pressure: round(p), driver_dimension: driver, projected: Math.round(projected * f) / f, status };
}

const STATUS_RANK = { breached: 3, breach_projected: 2, at_risk: 1, on_track: 0 };

/**
 * @param {object} ctx BusinessContext (web/demo/acme/context.js shape)
 * @param {{remediated?: Iterable<string>, filters?: {site?:string, cloud?:string, service?:string, framework?:string}, asOf?: string}} [opts]
 */
export function computeBusinessRisk(ctx, opts = {}) {
  const idx = indexContext(ctx);
  const remediated = new Set(opts.remediated || []);
  const filters = opts.filters || {};
  const asOf = opts.asOf || ctx.as_of;

  // --- per-risk likelihood ---
  const riskRows = [];
  for (const r of ctx.cyber_risks) {
    const active = ACTIVE_STATUSES.has(r.status) && !remediated.has(r.id);
    const touches = riskTouches(r, idx, filters);
    if (touches.size === 0 && (filters.site || filters.cloud)) continue;
    riskRows.push({ risk: r, likelihood: active ? riskLikelihood(r, idx) : 0, active, touches, remediatedByWhatIf: remediated.has(r.id) });
  }

  // --- per-service probability by dimension ---
  const svcAcc = new Map(ctx.business_services.map((s) => [s.id, { all: 1, dims: Object.fromEntries(DIMENSIONS.map((d) => [d, 1])), drivers: [] }]));
  for (const row of riskRows) {
    if (!row.active || row.likelihood === 0) continue;
    const dims = row.risk.dimensions && row.risk.dimensions.length ? row.risk.dimensions : DIMENSIONS;
    for (const [svc, w] of row.touches) {
      const acc = svcAcc.get(svc);
      if (!acc) continue;
      const p = row.likelihood * w;
      acc.all *= 1 - p;
      for (const d of dims) acc.dims[d] *= 1 - p;
      acc.drivers.push({ risk_id: row.risk.id, contribution: p });
    }
  }

  const services = ctx.business_services
    .filter((s) => !filters.service || s.id === filters.service)
    .map((s) => {
      const acc = svcAcc.get(s.id);
      const probability = round(1 - acc.all);
      const dims = Object.fromEntries(DIMENSIONS.map((d) => [d, round(1 - acc.dims[d])]));
      const impact = impactOf(s);
      const var_usd = Math.round(probability * impact.total_usd);
      const kpis = (idx.kpisByService.get(s.id) || []).map((k) => ({ kpi: k, ...projectKpi(k, dims) }));
      const drivers = acc.drivers
        .sort((a, b) => b.contribution - a.contribution || a.risk_id.localeCompare(b.risk_id))
        .slice(0, 6)
        .map((d) => ({ ...d, contribution: round(d.contribution) }));
      return {
        service: s, probability, dimensions: dims, impact, value_at_risk_usd: var_usd, kpis, drivers,
        above_appetite: probability > (ctx.organization.risk_appetite?.max_service_likelihood ?? 1),
      };
    })
    .sort((a, b) => b.value_at_risk_usd - a.value_at_risk_usd || a.service.id.localeCompare(b.service.id));

  // --- KPIs (flattened) ---
  const kpiRows = services.flatMap((s) => s.kpis.map((k) => ({ ...k, service: s.service })))
    .sort((a, b) => STATUS_RANK[b.status] - STATUS_RANK[a.status] || b.pressure - a.pressure || a.kpi.id.localeCompare(b.kpi.id));
  const kpiCounts = { breached: 0, breach_projected: 0, at_risk: 0, on_track: 0 };
  for (const k of kpiRows) kpiCounts[k.status]++;

  // --- compliance posture per framework ---
  const fwControls = new Map();
  for (const c of ctx.controls) {
    for (const ref of c.framework_refs) {
      if (!fwControls.has(ref.framework)) fwControls.set(ref.framework, []);
      fwControls.get(ref.framework).push(c);
    }
  }
  const compliance = [...fwControls.entries()]
    .filter(([fw]) => !filters.framework || fw === filters.framework)
    .map(([framework, ctls]) => {
      const ids = new Set(ctls.map((c) => c.id));
      const design = ctls.reduce((s, c) => s + (MODEL.statusWeight[c.status] ?? 0) * (0.6 + 0.4 * c.effectiveness), 0) / ctls.length;
      const openRisks = riskRows.filter((r) => r.active && (r.risk.control_ids || []).some((id) => ids.has(id)));
      const penalty = openRisks.reduce((s, r) => s + (MODEL.compliancePenaltyPerRisk[r.risk.severity] || 0), 0);
      const gaps = ctls.filter((c) => c.status !== 'implemented').map((c) => c.id);
      return { framework, controls: ctls.length, posture: round(clamp(design - penalty, 0, 1)), design_score: round(design), open_risks: openRisks.length, gap_control_ids: gaps };
    })
    .sort((a, b) => a.posture - b.posture || a.framework.localeCompare(b.framework));

  // --- headline ---
  const appetite = ctx.organization.risk_appetite || {};
  const totalVar = services.reduce((s, x) => s + x.value_at_risk_usd, 0);
  const tierSum = services.reduce((s, x) => s + (MODEL.tierWeight[x.service.tier] ?? 0.2), 0) || 1;
  const riskIndex = Math.round((100 * services.reduce((s, x) => s + x.probability * (MODEL.tierWeight[x.service.tier] ?? 0.2), 0)) / tierSum);
  const activeRisks = riskRows.filter((r) => r.active);
  const complianceAvg = compliance.length ? round(compliance.reduce((s, c) => s + c.posture, 0) / compliance.length) : null;
  const headline = {
    risk_index: riskIndex,
    value_at_risk_usd: totalVar,
    appetite_usd: appetite.annual_value_at_risk_usd ?? null,
    kpis_total: kpiRows.length,
    kpis_breached: kpiCounts.breached,
    kpis_breach_projected: kpiCounts.breach_projected,
    kpis_at_risk: kpiCounts.at_risk,
    services_above_appetite: services.filter((s) => s.above_appetite).length,
    services_total: services.length,
    compliance_avg: complianceAvg,
    compliance_floor: appetite.min_compliance_posture ?? null,
    open_risks: activeRisks.length,
    open_critical: activeRisks.filter((r) => r.risk.severity === 'critical').length,
    active_threats: activeRisks.filter((r) => THREAT_TYPES.has(r.risk.type)).length,
  };

  // --- plain-language business risks ---
  const riskById = new Map(ctx.cyber_risks.map((r) => [r.id, r]));
  const businessRisks = services
    .filter((s) => s.probability > 0)
    .map((s) => {
      const threatened = s.kpis
        .filter((k) => k.status !== 'on_track')
        .sort((a, b) => STATUS_RANK[b.status] - STATUS_RANK[a.status] || b.pressure - a.pressure);
      const topDims = Object.entries(s.dimensions).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([d]) => d);
      const drivers = s.drivers.slice(0, 3).map((d) => riskById.get(d.risk_id));
      const pct = Math.round(s.probability * 100);
      const kpiText = threatened.length
        ? `${threatened.length} KPI/SLA${threatened.length > 1 ? 's' : ''} threatened (${threatened.slice(0, 3).map((k) => k.kpi.name).join('; ')})`
        : 'no KPI currently projected to miss target';
      return {
        service_id: s.service.id,
        title: `${s.service.name}: ${pct}% likelihood of a material ${topDims.join(' / ')} event in 12 months`,
        statement: `${s.service.name} carries an estimated ${formatUsdShort(s.value_at_risk_usd)} annualised exposure; ${kpiText}. Main drivers: ${drivers.map((r) => r?.title).filter(Boolean).join('; ') || 'dependency risk'}.`,
        severity: s.probability >= 0.5 ? 'critical' : s.probability >= (appetite.max_service_likelihood ?? 0.35) ? 'high' : s.probability >= 0.15 ? 'medium' : 'low',
        probability: s.probability,
        value_at_risk_usd: s.value_at_risk_usd,
        kpi_ids: threatened.map((k) => k.kpi.id),
        driver_risk_ids: s.drivers.map((d) => d.risk_id),
        goal_ids: (ctx.business_goals || []).filter((g) => g.kpi_ids.some((id) => threatened.some((k) => k.kpi.id === id))).map((g) => g.id),
      };
    });

  // --- heatmap: service x dimension ---
  const heatmap = services.map((s) => ({ service_id: s.service.id, service: s.service.name, ...s.dimensions }));

  // --- 12-month trend of total value at risk (risk lifecycle over time) ---
  const trend = (ctx.months || []).map((m) => {
    const monthEnd = `${m}-31`;
    const sub = computeSnapshotVar(ctx, idx, monthEnd, remediated, filters);
    return { month: m, value_at_risk_usd: sub.var, open_risks: sub.open };
  });

  // --- goals ---
  const kpiStatus = new Map(kpiRows.map((k) => [k.kpi.id, k.status]));
  const goals = (ctx.business_goals || []).map((g) => {
    const statuses = g.kpi_ids.map((id) => kpiStatus.get(id)).filter(Boolean);
    const worst = statuses.reduce((w, s) => (STATUS_RANK[s] > STATUS_RANK[w] ? s : w), 'on_track');
    return { goal: g, status: worst, kpis: g.kpi_ids.map((id) => ({ id, status: kpiStatus.get(id) || 'n/a' })) };
  });

  return {
    as_of: asOf,
    filters,
    remediated: [...remediated].sort(),
    headline,
    services,
    kpis: kpiRows,
    compliance,
    business_risks: businessRisks,
    heatmap,
    trend,
    goals,
    risks: riskRows.map((r) => ({ id: r.risk.id, likelihood: round(r.likelihood), active: r.active, service_ids: [...r.touches.keys()].sort() })),
  };
}

function computeSnapshotVar(ctx, idx, isoDate, remediated, filters) {
  const acc = new Map(ctx.business_services.map((s) => [s.id, 1]));
  let open = 0;
  for (const r of ctx.cyber_risks) {
    if (!activeOn(r, isoDate)) continue;
    if (!['open', 'in_progress', 'accepted', 'mitigated'].includes(r.status)) continue;
    if (remediated.has(r.id) && isoDate >= (ctx.as_of || '')) continue;
    const touches = riskTouches(r, idx, filters);
    if (touches.size === 0) continue;
    open++;
    const l = riskLikelihood(r, idx);
    for (const [svc, w] of touches) if (acc.has(svc)) acc.set(svc, acc.get(svc) * (1 - l * w));
  }
  let v = 0;
  for (const s of ctx.business_services) {
    if (filters.service && s.id !== filters.service) continue;
    v += (1 - acc.get(s.id)) * impactOf(s).total_usd;
  }
  return { var: Math.round(v), open };
}

/**
 * Rank open risks by how much total value at risk disappears if each one alone
 * is remediated, divided by its remediation cost — "fix these first".
 */
export function remediationPriorities(ctx, opts = {}) {
  const base = computeBusinessRisk(ctx, opts);
  const already = new Set(opts.remediated || []);
  const out = [];
  for (const r of ctx.cyber_risks) {
    if (!ACTIVE_STATUSES.has(r.status) || already.has(r.id)) continue;
    const after = computeBusinessRisk(ctx, { ...opts, remediated: [...already, r.id] });
    const reduction = base.headline.value_at_risk_usd - after.headline.value_at_risk_usd;
    if (reduction <= 0) continue;
    const cost = r.remediation?.cost_usd || 0;
    out.push({ risk: r, var_reduction_usd: reduction, cost_usd: cost, roi: cost > 0 ? round(reduction / cost, 2) : null });
  }
  return out.sort((a, b) => b.var_reduction_usd - a.var_reduction_usd || a.risk.id.localeCompare(b.risk.id));
}

export function formatUsdShort(v) {
  const n = Number(v) || 0;
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `$${Math.round(n / 1e3)}K`;
  return `$${Math.round(n)}`;
}
