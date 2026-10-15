// BIA engine: the seven-level, many-to-many business-impact graph (layer 3).
//
//   L1 SLOs  ←  L2 policies  ←  L3 business processes  ←  L4 components
//   (people / procedures / data / systems)  ←  L5 cyber-risk scenarios
//   ←  L6 hunts & findings  ←  L7 evidence
//
// computeBia(ctx, opts) scores every node from the cyber-risk register and the
// links in the BusinessContext. Like engine.js it is PURE and DETERMINISTIC (no
// DOM, no clock, no randomness), and no score or dollar figure it returns was
// typed into the mock data. The model (docs/BUSINESS_RISK_MODEL.md §BIA):
//
//   finding likelihood L_f      = engine.riskLikelihood (severity × exploitability
//                                 × exposure × active threat × control effectiveness)
//   P(scenario s on component c) = 1 − (1 − base_s·factor_s)·Π_f (1 − L_f·w_fc)
//                                 over findings f mapped to s that touch c
//                                 (w = criticality of the touched assets)
//   P(component c)  = 1 − Π_s (1 − P(s,c) · impact_s)
//   P(process p)    = 1 − Π_c (1 − P(c) · essentiality(c in p) · κ_process)
//   P(policy)       = 1 − Π_p (1 − P(p) · κ_policy)   (it fails if any process does)
//   SLO shortfall $ = Σ_policy weight · basis · P(policy)
//   P(scenario s)   = 1 − Π_c (1 − P(s,c) · impact_s · κ_process)
//   SLO score       = 100 · (1 − e^(−shortfall / headroom))   — the "cyber-risk score
//                     factor": how much of the gap between plan and target cyber
//                     risk is expected to consume (63 = all of it, i.e. on target)
//
// Attribution (which scenario / finding causes how many dollars) splits each
// probability by HAZARD, −ln(1 − p): for independent causes combined by
// 1 − Π(1 − pᵢ) the hazards add exactly, so the shares are exact at every level.

import { riskLikelihood, indexContext, MODEL, formatUsdShort } from './engine.js';

export const LEVELS = Object.freeze([
  { n: 1, key: 'slo', label: 'SLOs', title: 'Business SLOs' },
  { n: 2, key: 'policy', label: 'Policies', title: 'Policies — what must happen, and when' },
  { n: 3, key: 'process', label: 'Business processes', title: 'Business processes that implement the policies' },
  { n: 4, key: 'component', label: 'BP components', title: 'People, procedures, data and systems' },
  { n: 5, key: 'scenario', label: 'Cyber risks', title: 'Cyber-risk scenarios on the components' },
  { n: 6, key: 'finding', label: 'Hunts & findings', title: 'IOC/IOA hunts and posture findings' },
  { n: 7, key: 'evidence', label: 'Evidence', title: 'Raw data and evidence' },
]);

export const BIA_MODEL = Object.freeze({
  essentiality: { essential: 1, supporting: 0.3 },
  // Share of material component events that disrupt the process enough to matter,
  // and share of process disruptions that make the policy miss its threshold.
  processDisruption: 0.35,
  policyFailure: 0.6,
  explicitComponentWeight: 0.8,
  findingLikelihoodAt100: 0.25,
  bands: [
    { id: 'critical', min: 60, label: 'Critical', icon: '✕' },
    { id: 'high', min: 40, label: 'High', icon: '▲' },
    { id: 'medium', min: 20, label: 'Medium', icon: '!' },
    { id: 'low', min: 0, label: 'Low', icon: '✓' },
  ],
});

export const COMPONENT_CATEGORIES = Object.freeze({
  people: 'People',
  process: 'Procedure',
  data: 'Data',
  system: 'System / service',
});

const ACTIVE = new Set(['open', 'in_progress', 'accepted']);
const STATUS_RANK = { breached: 3, breach_projected: 2, at_risk: 1, on_track: 0 };

export function bandOf(score) {
  return BIA_MODEL.bands.find((b) => score >= b.min) || BIA_MODEL.bands[BIA_MODEL.bands.length - 1];
}

function round(v, d = 4) {
  const f = 10 ** d;
  return Math.round(v * f) / f;
}

const hazard = (p) => (p >= 1 ? 50 : -Math.log(1 - p));

function addInto(target, source, scale) {
  if (!scale) return;
  for (const [k, v] of source) target.set(k, (target.get(k) || 0) + v * scale);
}

function sumValues(m) {
  let s = 0;
  for (const v of m.values()) s += v;
  return s;
}

/** Resolve each component's assets: explicit ids plus an attribute query. */
export function resolveComponentAssets(ctx) {
  const out = new Map();
  for (const c of ctx.bp_components || []) {
    const set = new Set(c.asset_ids || []);
    if (c.asset_query) {
      const q = Object.entries(c.asset_query);
      for (const a of ctx.assets) if (q.every(([k, v]) => a[k] === v)) set.add(a.id);
    }
    out.set(c.id, set);
  }
  return out;
}

/** Was a register entry active on a given ISO date? (current status for as_of) */
function activeOn(r, date, asOf) {
  if (!date || date >= asOf) return ACTIVE.has(r.status);
  if (r.first_seen > date) return false;
  if (r.status === 'mitigated') return !(r.closed_on && r.closed_on <= date);
  return true;
}

function passesAsset(a, filters) {
  if (!a) return false;
  if (filters.site && a.site !== filters.site) return false;
  if (filters.cloud && a.cloud !== filters.cloud) return false;
  return true;
}

function sloStatus(slo, forecast, projected) {
  const fails = (v, t) => (slo.direction === 'higher_is_better' ? v < t : v > t);
  if (fails(forecast, slo.target)) return 'breached';
  if (fails(projected, slo.target)) return 'breach_projected';
  if (fails(projected, slo.warning)) return 'at_risk';
  return 'on_track';
}

/**
 * @param {object} ctx BusinessContext with the BIA sections (slos, bia_policies, ...)
 * @param {{remediated?: Iterable<string>, mitigations?: Iterable<string>,
 *          filters?: {site?: string, cloud?: string, service?: string, dimension?: string},
 *          date?: string}} [opts]
 */
export function computeBia(ctx, opts = {}) {
  const idx = indexContext(ctx);
  const filters = opts.filters || {};
  const asOf = ctx.as_of;
  const date = opts.date || null;
  const activeMitigations = new Set(opts.mitigations || []);
  const remediated = new Set(opts.remediated || []);
  const scenarioFactor = new Map();
  for (const m of ctx.mitigations || []) {
    if (!activeMitigations.has(m.id)) continue;
    for (const f of m.finding_ids) remediated.add(f);
    for (const [s, k] of Object.entries(m.scenario_factors || {})) scenarioFactor.set(s, (scenarioFactor.get(s) ?? 1) * k);
  }

  const compAssets = resolveComponentAssets(ctx);
  const assetComps = new Map();
  for (const [cid, set] of compAssets) for (const a of set) {
    if (!assetComps.has(a)) assetComps.set(a, []);
    assetComps.get(a).push(cid);
  }

  // --- L3/L4 scope (service slice) ---
  const processes = (ctx.business_processes || []).filter((p) => !filters.service || p.service_ids.includes(filters.service));
  const inScopeComps = new Set(processes.flatMap((p) => p.components.map((c) => c.id)));
  const scenarios = (ctx.risk_scenarios || []).filter((s) => !filters.dimension || s.dimensions.includes(filters.dimension));
  const scenarioIds = new Set(scenarios.map((s) => s.id));
  const scenarioById = new Map(scenarios.map((s) => [s.id, s]));

  // --- L6 findings ---
  const findings = new Map();
  for (const r of ctx.cyber_risks) {
    const okAssets = r.asset_ids.filter((a) => passesAsset(idx.assets.get(a), filters));
    if (!okAssets.length && (filters.site || filters.cloud)) continue;
    const isActive = activeOn(r, date, asOf) && !(remediated.has(r.id) && (!date || date >= asOf));
    const likelihood = isActive ? riskLikelihood(r, idx) : 0;
    const comps = new Map();
    for (const a of okAssets) {
      const w = MODEL.criticalityWeight[idx.assets.get(a)?.criticality] ?? 0.5;
      for (const c of assetComps.get(a) || []) if (inScopeComps.has(c)) comps.set(c, Math.max(comps.get(c) || 0, w));
    }
    for (const c of r.component_ids || []) if (inScopeComps.has(c)) comps.set(c, Math.max(comps.get(c) || 0, BIA_MODEL.explicitComponentWeight));
    const scen = (r.scenario_ids || []).filter((s) => scenarioIds.has(s));
    if (!comps.size || !scen.length) continue;
    findings.set(r.id, {
      id: r.id, risk: r, active: isActive, likelihood: round(likelihood, 6),
      remediated: remediated.has(r.id) && ACTIVE.has(r.status),
      score: isActive ? Math.round(100 * Math.min(1, likelihood / BIA_MODEL.findingLikelihoodAt100)) : 0,
      comps, scenario_ids: scen,
    });
  }

  // --- L5 × L4 pairs ---
  const pairs = new Map(); // `${s}|${c}` -> pair
  const pair = (s, c) => {
    const k = `${s}|${c}`;
    if (!pairs.has(k)) pairs.set(k, { key: k, scenario_id: s, component_id: c, base: 0, findings: [] });
    return pairs.get(k);
  };
  for (const s of scenarios) {
    const base = s.base_rate * (scenarioFactor.get(s.id) ?? 1);
    for (const c of s.component_ids) if (inScopeComps.has(c)) pair(s.id, c).base = base;
  }
  for (const f of findings.values()) {
    for (const s of f.scenario_ids) for (const [c, w] of f.comps) pair(s, c).findings.push({ id: f.id, x: f.likelihood * w });
  }
  for (const p of pairs.values()) {
    // Sources keyed `${scenario}|${finding or "base"}`; values are hazards.
    p.sources = new Map();
    if (p.base > 0) p.sources.set(`${p.scenario_id}|base`, hazard(p.base));
    for (const f of p.findings) if (f.x > 0) p.sources.set(`${p.scenario_id}|${f.id}`, hazard(f.x));
    p.hazard = sumValues(p.sources);
    p.probability = 1 - Math.exp(-p.hazard);
  }

  // --- L4 components ---
  const componentById = new Map((ctx.bp_components || []).map((c) => [c.id, c]));
  const compRows = new Map();
  for (const cid of inScopeComps) {
    const c = componentById.get(cid);
    if (!c) continue;
    compRows.set(cid, { id: cid, component: c, sources: new Map(), byScenario: new Map(), pairKeys: [] });
  }
  for (const p of pairs.values()) {
    const row = compRows.get(p.component_id);
    if (!row) continue;
    row.pairKeys.push(p.key);
    const impact = scenarioById.get(p.scenario_id)?.impact_factor ?? 1;
    const g = hazard(p.probability * impact);
    row.byScenario.set(p.scenario_id, (row.byScenario.get(p.scenario_id) || 0) + g);
    if (p.hazard > 0) addInto(row.sources, p.sources, g / p.hazard);
  }
  for (const row of compRows.values()) {
    row.hazard = sumValues(row.sources);
    row.probability = 1 - Math.exp(-row.hazard);
  }

  // --- L3 processes ---
  const procRows = new Map();
  for (const p of processes) {
    const row = { id: p.id, process: p, sources: new Map() };
    for (const link of p.components) {
      const c = compRows.get(link.id);
      if (!c || !c.hazard) continue;
      const q = hazard(c.probability * (BIA_MODEL.essentiality[link.role] ?? 1) * BIA_MODEL.processDisruption);
      addInto(row.sources, c.sources, q / c.hazard);
    }
    row.hazard = sumValues(row.sources);
    row.probability = 1 - Math.exp(-row.hazard);
    procRows.set(p.id, row);
  }

  // --- L2 policies ---
  const polRows = new Map();
  for (const pol of ctx.bia_policies || []) {
    const procs = processes.filter((p) => p.policy_ids.includes(pol.id));
    if (!procs.length) continue;
    const row = { id: pol.id, policy: pol, sources: new Map(), process_ids: procs.map((p) => p.id) };
    for (const p of procs) {
      const pr = procRows.get(p.id);
      if (pr.hazard > 0) addInto(row.sources, pr.sources, hazard(pr.probability * BIA_MODEL.policyFailure) / pr.hazard);
    }
    row.hazard = sumValues(row.sources);
    row.probability = 1 - Math.exp(-row.hazard);
    polRows.set(pol.id, row);
  }

  // --- L1 SLOs ---
  const findingScore = (id) => findings.get(id)?.score ?? 0;
  const sloRows = [];
  for (const slo of ctx.slos || []) {
    const links = [];
    for (const pol of ctx.bia_policies || []) {
      for (const l of pol.slo_links) if (l.slo_id === slo.id && polRows.has(pol.id)) links.push({ policy_id: pol.id, weight: l.weight });
    }
    const atStake = slo.basis_usd * links.reduce((s, l) => s + l.weight, 0);
    let loss = 0;
    const lossBySource = new Map();
    const byPolicy = [];
    for (const l of links) {
      const row = polRows.get(l.policy_id);
      const polLoss = l.weight * slo.basis_usd * row.probability;
      loss += polLoss;
      byPolicy.push({ policy_id: l.policy_id, weight: l.weight, probability: round(row.probability), loss_usd: Math.round(polLoss) });
      if (row.hazard > 0) addInto(lossBySource, row.sources, polLoss / row.hazard);
    }
    const byScenario = new Map();
    const byFinding = new Map();
    for (const [k, v] of lossBySource) {
      const [s, f] = k.split('|');
      byScenario.set(s, (byScenario.get(s) || 0) + v);
      if (f !== 'base') byFinding.set(f, (byFinding.get(f) || 0) + v);
    }
    // Root cause down to the asset: each finding's dollars are split over the
    // assets it sits on, weighted by their criticality.
    const byAsset = new Map();
    for (const [fid, v] of byFinding) {
      const f = findings.get(fid);
      const ids = f.risk.asset_ids.filter((a) => passesAsset(idx.assets.get(a), filters));
      const w = ids.map((a) => MODEL.criticalityWeight[idx.assets.get(a)?.criticality] ?? 0.5);
      const total = w.reduce((x, y) => x + y, 0) || 1;
      ids.forEach((a, i) => byAsset.set(a, (byAsset.get(a) || 0) + (v * w[i]) / total));
    }
    const contributing = [...byFinding.entries()].filter(([, v]) => v >= 1).map(([id]) => id);
    const bandCounts = { critical: 0, high: 0, medium: 0, low: 0 };
    for (const id of contributing) bandCounts[bandOf(findingScore(id)).id]++;
    const sign = slo.direction === 'higher_is_better' ? -1 : 1;
    const f10 = 10 ** (slo.decimals ?? 1);
    const deltaMetric = sign * loss * slo.metric_per_usd;
    const projected = Math.round((slo.forecast + deltaMetric) * f10) / f10;
    const headroomUsd = Math.max(Math.abs(slo.forecast - slo.target) / slo.metric_per_usd, slo.basis_usd * 0.001);
    const score = Math.round(100 * (1 - Math.exp(-loss / headroomUsd)));
    sloRows.push({
      id: slo.id, slo, score, band: bandOf(score).id,
      loss_usd: Math.round(loss), loss_pct_of_basis: round(loss / slo.basis_usd), at_stake_usd: Math.round(atStake), headroom_usd: Math.round(headroomUsd),
      projected, delta_metric: round(deltaMetric, 4), status: sloStatus(slo, slo.forecast, projected),
      by_policy: byPolicy.sort((a, b) => b.loss_usd - a.loss_usd || a.policy_id.localeCompare(b.policy_id)),
      by_scenario: [...byScenario.entries()].map(([id, v]) => ({ id, loss_usd: Math.round(v), share: loss ? round(v / loss) : 0 }))
        .sort((a, b) => b.loss_usd - a.loss_usd || a.id.localeCompare(b.id)),
      by_finding: [...byFinding.entries()].map(([id, v]) => ({ id, loss_usd: Math.round(v), score: findingScore(id) }))
        .sort((a, b) => b.loss_usd - a.loss_usd || a.id.localeCompare(b.id)),
      by_asset: [...byAsset.entries()].filter(([, v]) => v >= 1).map(([id, v]) => ({ id, loss_usd: Math.round(v) }))
        .sort((a, b) => b.loss_usd - a.loss_usd || a.id.localeCompare(b.id)),
      contributing_findings: contributing.length,
      findings_by_band: bandCounts,
    });
  }

  // --- L5 scenarios ---
  const scenRows = new Map();
  for (const s of scenarios) {
    const ps = [...pairs.values()].filter((p) => p.scenario_id === s.id && compRows.has(p.component_id));
    if (!ps.length) continue;
    // Likelihood the scenario disrupts at least one business process: each
    // component event weighted by the scenario's impact and the same process
    // disruption share used above (so the score matches what flows upward).
    const h = ps.reduce((acc, p) => acc + hazard(p.probability * s.impact_factor * BIA_MODEL.processDisruption), 0);
    const prob = 1 - Math.exp(-h);
    scenRows.set(s.id, { id: s.id, scenario: s, probability: prob, score: Math.round(100 * prob), component_ids: ps.map((p) => p.component_id).sort(), factor: scenarioFactor.get(s.id) ?? 1 });
  }

  // --- assemble node lists (sorted by score) ---
  const node = (level, id, name, score, extra) => ({ level, id, name, score, band: bandOf(score).id, ...extra });
  const levels = {
    slo: sloRows.map((r) => node(1, r.id, r.slo.name, r.score, { owner: r.slo.owner, status: r.status, loss_usd: r.loss_usd })),
    policy: [...polRows.values()].map((r) => node(2, r.id, r.policy.title, Math.round(100 * r.probability), { owner: r.policy.owner, probability: round(r.probability) })),
    process: [...procRows.values()].map((r) => node(3, r.id, r.process.name, Math.round(100 * r.probability), { owner: r.process.owner, probability: round(r.probability) })),
    component: [...compRows.values()].map((r) => node(4, r.id, r.component.name, Math.round(100 * r.probability), { category: r.component.category, owner: r.component.owner, probability: round(r.probability) })),
    scenario: [...scenRows.values()].map((r) => node(5, r.id, r.scenario.name, r.score, { probability: round(r.probability), factor: r.factor })),
    finding: [],
    evidence: [],
  };
  for (const f of findings.values()) {
    levels.finding.push(node(6, f.id, f.risk.title, f.score, { kind: 'finding', type: f.risk.type, severity: f.risk.severity, status: f.risk.status, active: f.active, remediated: f.remediated }));
  }
  const huntRows = new Map();
  for (const h of ctx.hunts || []) {
    const fids = h.finding_ids.filter((id) => findings.has(id));
    const scen = h.scenario_ids.filter((s) => scenRows.has(s));
    if (!fids.length && !scen.length) continue;
    const score = fids.reduce((m, id) => Math.max(m, findings.get(id).score), 0);
    huntRows.set(h.id, { hunt: h, finding_ids: fids, scenario_ids: scen });
    levels.finding.push(node(6, h.id, h.name, score, { kind: 'hunt', hits: h.runs.reduce((s, r) => s + r.hits, 0), cadence: h.cadence }));
  }
  for (const e of ctx.evidence || []) {
    const fids = e.finding_ids.filter((id) => findings.has(id));
    if (!fids.length && !(e.hunt_id && huntRows.has(e.hunt_id))) continue;
    const score = fids.reduce((m, id) => Math.max(m, findings.get(id).score), 0);
    levels.evidence.push(node(7, e.id, e.summary, score, { kind: e.kind, source: e.source, collected_at: e.collected_at }));
  }
  const byScore = (a, b) => b.score - a.score || a.id.localeCompare(b.id);
  for (const k of Object.keys(levels)) levels[k].sort(byScore);

  // --- headline ---
  const primary = sloRows.find((r) => r.id === 'SLO-ARR') || sloRows[0];
  const activeFindings = [...findings.values()].filter((f) => f.active);
  const headline = {
    slos_total: sloRows.length,
    slos_off_track: sloRows.filter((r) => r.status !== 'on_track').length,
    worst_slo: [...sloRows].sort((a, b) => b.score - a.score)[0]?.id || null,
    primary_slo: primary?.id || null,
    primary_loss_usd: primary?.loss_usd || 0,
    active_findings: activeFindings.length,
    critical_findings: activeFindings.filter((f) => bandOf(f.score).id === 'critical').length,
    high_findings: activeFindings.filter((f) => bandOf(f.score).id === 'high').length,
    mitigations_applied: [...activeMitigations].sort(),
    mitigation_cost_usd: (ctx.mitigations || []).filter((m) => activeMitigations.has(m.id)).reduce((s, m) => s + m.cost_usd, 0),
  };

  return {
    as_of: date || asOf,
    filters,
    headline,
    slos: sloRows,
    levels,
    // Internal structures the graph / focus / pivot helpers need.
    graph: { pairs, compRows, procRows, polRows, scenRows, findings, huntRows, processes },
  };
}

// ---------------------------------------------------------------------------
// Graph navigation: focus on ANY node and get every connected node per level
// ---------------------------------------------------------------------------

/**
 * Connected set for a focus node. Levels above the focus come from walking UP
 * from the node itself; levels below come from the (scenario, component,
 * finding) triples the node actually participates in — so focusing on the
 * company website shows the denial-of-service findings on the WEBSITE, not
 * every denial-of-service finding in the estate.
 * @returns {Map<string, Set<string>>} level key -> node ids (includes the focus)
 */
export function connectedSet(bia, ctx, focusId) {
  const g = bia.graph;
  const out = Object.fromEntries(LEVELS.map((l) => [l.key, new Set()]));
  const level = levelOf(bia, focusId);
  if (!level) return new Map(Object.entries(out));

  const procById = new Map(g.processes.map((p) => [p.id, p]));
  const polsOfProc = (pid) => procById.get(pid)?.policy_ids.filter((x) => g.polRows.has(x)) || [];
  const slosOfPol = (polId) => g.polRows.get(polId)?.policy.slo_links.map((l) => l.slo_id).filter((s) => bia.slos.some((r) => r.id === s)) || [];
  const procsOfComp = (cid) => g.processes.filter((p) => p.components.some((c) => c.id === cid)).map((p) => p.id);

  // Triples (s, c, f|null) in play.
  let triples = [];
  const allTriples = [];
  for (const p of g.pairs.values()) {
    if (!g.compRows.has(p.component_id) || !g.scenRows.has(p.scenario_id)) continue;
    if (p.base > 0) allTriples.push([p.scenario_id, p.component_id, null]);
    for (const f of p.findings) allTriples.push([p.scenario_id, p.component_id, f.id]);
  }

  const evidence = (ctx.evidence || []).filter((e) => bia.levels.evidence.some((n) => n.id === e.id));
  if (level === 'slo' || level === 'policy' || level === 'process') {
    let procs;
    if (level === 'process') procs = [focusId];
    else {
      const pols = level === 'policy' ? [focusId] : [...g.polRows.values()].filter((r) => r.policy.slo_links.some((l) => l.slo_id === focusId)).map((r) => r.id);
      procs = g.processes.filter((p) => p.policy_ids.some((x) => pols.includes(x))).map((p) => p.id);
      for (const x of pols) out.policy.add(x);
    }
    for (const p of procs) out.process.add(p);
    if (level === 'process' || level === 'policy') {
      for (const p of procs) for (const pol of polsOfProc(p)) if (level === 'process') out.policy.add(pol);
    }
    for (const pol of out.policy) for (const s of slosOfPol(pol)) out.slo.add(s);
    if (level === 'slo') { out.slo.clear(); out.slo.add(focusId); }
    if (level === 'policy') { out.slo.clear(); for (const s of slosOfPol(focusId)) out.slo.add(s); }
    const comps = new Set(procs.flatMap((p) => procById.get(p).components.map((c) => c.id)).filter((c) => g.compRows.has(c)));
    for (const c of comps) out.component.add(c);
    triples = allTriples.filter(([, c]) => comps.has(c));
  } else {
    if (level === 'component') triples = allTriples.filter(([, c]) => c === focusId);
    else if (level === 'scenario') triples = allTriples.filter(([s]) => s === focusId);
    else if (level === 'finding') {
      const hunt = g.huntRows.get(focusId);
      if (hunt) {
        const fids = new Set(hunt.finding_ids);
        triples = fids.size ? allTriples.filter(([, , f]) => fids.has(f)) : allTriples.filter(([s, , f]) => f === null && hunt.scenario_ids.includes(s));
      } else triples = allTriples.filter(([, , f]) => f === focusId);
    } else if (level === 'evidence') {
      const e = evidence.find((x) => x.id === focusId);
      const fids = new Set(e?.finding_ids || []);
      const hunt = e?.hunt_id ? g.huntRows.get(e.hunt_id) : null;
      triples = fids.size ? allTriples.filter(([, , f]) => fids.has(f)) : allTriples.filter(([s, , f]) => f === null && hunt?.scenario_ids.includes(s));
    }
    for (const [, c] of triples) out.component.add(c);
    for (const c of out.component) for (const p of procsOfComp(c)) if (g.procRows.has(p)) out.process.add(p);
    for (const p of out.process) for (const pol of polsOfProc(p)) out.policy.add(pol);
    for (const pol of out.policy) for (const s of slosOfPol(pol)) out.slo.add(s);
  }
  for (const [s, , f] of triples) {
    out.scenario.add(s);
    if (f) out.finding.add(f);
  }
  // Hunts that produced (or look for) what is in view.
  for (const [hid, h] of g.huntRows) {
    if (h.finding_ids.some((f) => out.finding.has(f)) || (level !== 'finding' && level !== 'evidence' && !h.finding_ids.length && h.scenario_ids.some((s) => out.scenario.has(s)))) out.finding.add(hid);
  }
  if (level === 'finding') out.finding.add(focusId);
  for (const e of evidence) {
    if (level === 'evidence') { if (e.id === focusId) out.evidence.add(e.id); continue; }
    if (e.finding_ids.some((f) => out.finding.has(f)) || (e.hunt_id && out.finding.has(e.hunt_id) && !e.finding_ids.length)) out.evidence.add(e.id);
  }
  out[level].add(focusId);
  return new Map(Object.entries(out));
}

/** Every SLO's shortfall that traces back to one asset (root cause), largest first. */
export function assetImpact(bia, assetId) {
  const rows = [];
  for (const r of bia.slos) {
    const hit = r.by_asset.find((x) => x.id === assetId);
    if (hit) rows.push({ slo_id: r.id, name: r.slo.name, loss_usd: hit.loss_usd, share: r.loss_usd ? round(hit.loss_usd / r.loss_usd) : 0 });
  }
  return rows.sort((a, b) => b.loss_usd - a.loss_usd || a.slo_id.localeCompare(b.slo_id));
}

/**
 * The single strongest chain from a finding up to an SLO, for the root-cause
 * view: asset ← finding → scenario → component → process → policy → SLO.
 * At each step it follows the link that carries the most risk.
 */
export function rootCausePath(bia, ctx, findingId, sloId = null) {
  const g = bia.graph;
  const f = g.findings.get(findingId);
  if (!f) return null;
  let best = null;
  for (const p of g.pairs.values()) {
    const x = p.findings.find((y) => y.id === findingId);
    if (!x || !g.compRows.has(p.component_id)) continue;
    if (!best || x.x > best.x) best = { x: x.x, scenario_id: p.scenario_id, component_id: p.component_id };
  }
  if (!best) return null;
  const procs = g.processes.filter((p) => p.components.some((c) => c.id === best.component_id) && g.procRows.has(p.id))
    .sort((a, b) => g.procRows.get(b.id).probability - g.procRows.get(a.id).probability);
  const proc = procs[0];
  const pols = (proc?.policy_ids || []).filter((x) => g.polRows.has(x));
  let chosen = null;
  for (const pol of pols) {
    for (const l of g.polRows.get(pol).policy.slo_links) {
      if (sloId && l.slo_id !== sloId) continue;
      const row = bia.slos.find((r) => r.id === l.slo_id);
      const loss = row?.by_policy.find((x) => x.policy_id === pol)?.loss_usd || 0;
      if (!chosen || loss > chosen.loss) chosen = { policy_id: pol, slo_id: l.slo_id, loss };
    }
  }
  const assets = [...f.risk.asset_ids].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    const ca = ctx.assets.find((x) => x.id === a)?.criticality;
    const cb = ctx.assets.find((x) => x.id === b)?.criticality;
    return (order[ca] ?? 4) - (order[cb] ?? 4) || a.localeCompare(b);
  });
  return {
    asset_id: assets[0], finding_id: findingId, scenario_id: best.scenario_id, component_id: best.component_id,
    process_id: proc?.id || null, policy_id: chosen?.policy_id || null, slo_id: chosen?.slo_id || null,
  };
}

export function levelOf(bia, id) {
  for (const l of LEVELS) if (bia.levels[l.key].some((n) => n.id === id)) return l.key;
  return null;
}

/** Direct neighbours one level up and one level down (for the link overlay). */
export function directLinks(bia, ctx) {
  const g = bia.graph;
  const links = [];
  for (const r of g.polRows.values()) for (const l of r.policy.slo_links) if (bia.slos.some((s) => s.id === l.slo_id)) links.push([l.slo_id, r.id]);
  for (const p of g.processes) {
    for (const pol of p.policy_ids) if (g.polRows.has(pol)) links.push([pol, p.id]);
    for (const c of p.components) if (g.compRows.has(c.id)) links.push([p.id, c.id]);
  }
  for (const p of g.pairs.values()) {
    if (!g.compRows.has(p.component_id) || !g.scenRows.has(p.scenario_id)) continue;
    links.push([p.component_id, p.scenario_id]);
  }
  const seen = new Set();
  for (const f of g.findings.values()) for (const s of f.scenario_ids) if (g.scenRows.has(s)) links.push([s, f.id]);
  for (const [hid, h] of g.huntRows) for (const s of h.scenario_ids) links.push([s, hid]);
  for (const e of ctx.evidence || []) {
    for (const f of e.finding_ids) if (g.findings.has(f)) links.push([f, e.id]);
    if (e.hunt_id && g.huntRows.has(e.hunt_id) && !e.finding_ids.length) links.push([e.hunt_id, e.id]);
  }
  return links.filter(([a, b]) => {
    const k = `${a}>${b}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/** Finding ids remediated by a set of mitigation ids (shared with the executive dashboard). */
export function mitigationFindingIds(ctx, mitigationIds) {
  const set = new Set(mitigationIds || []);
  return (ctx.mitigations || []).filter((m) => set.has(m.id)).flatMap((m) => m.finding_ids);
}

// ---------------------------------------------------------------------------
// Simulation, trend, pivot
// ---------------------------------------------------------------------------

/** What each not-yet-applied mitigation would change, per SLO. */
export function mitigationImpacts(ctx, opts = {}, rankSloId = 'SLO-ARR') {
  const base = computeBia(ctx, opts);
  const baseLoss = new Map(base.slos.map((s) => [s.id, s.loss_usd]));
  const applied = new Set(opts.mitigations || []);
  return (ctx.mitigations || []).map((m) => {
    const isApplied = applied.has(m.id);
    const set = new Set(applied);
    if (isApplied) set.delete(m.id); else set.add(m.id);
    const other = computeBia(ctx, { ...opts, mitigations: [...set] });
    // Positive reduction = dollars this mitigation removes (vs. not having it).
    const delta = Object.fromEntries(other.slos.map((s) => [s.id, isApplied ? s.loss_usd - baseLoss.get(s.id) : baseLoss.get(s.id) - s.loss_usd]));
    const reduction = delta[rankSloId] || 0;
    return { mitigation: m, applied: isApplied, reduction_by_slo: delta, reduction_usd: reduction, roi: m.cost_usd ? round(reduction / m.cost_usd, 2) : null };
  }).sort((a, b) => b.reduction_usd - a.reduction_usd || a.mitigation.id.localeCompare(b.mitigation.id));
}

/** 12-month history of each SLO's cyber-risk score, from first-seen / closure dates. */
export function sloScoreTrend(ctx, opts = {}) {
  const out = new Map();
  for (const m of ctx.months || []) {
    const v = computeBia(ctx, { ...opts, date: `${m}-31` < ctx.as_of ? `${m}-31` : null });
    for (const s of v.slos) {
      if (!out.has(s.id)) out.set(s.id, []);
      out.get(s.id).push({ month: m, score: s.score, loss_usd: s.loss_usd });
    }
  }
  return out;
}

export const PIVOT_DIMENSIONS = Object.freeze({
  slo: 'L1 SLO',
  policy: 'L2 Policy',
  process: 'L3 Business process',
  service: 'Business service',
  owner: 'Process owner',
  category: 'L4 Component type',
  component: 'L4 Component',
  scenario: 'L5 Cyber-risk scenario',
  type: 'L6 Finding type',
  severity: 'L6 Severity',
  site: 'Site',
});

export const PIVOT_MEASURES = Object.freeze({
  findings: 'Open findings (distinct)',
  critical_high: 'Critical + high findings (distinct)',
  max_score: 'Highest finding score',
});

/**
 * Slice & dice: cross-tab any two dimensions over the (SLO, policy, process,
 * component, scenario, finding) paths. Each cell keeps its finding ids so a
 * click can drill through to them.
 */
export function pivot(bia, ctx, rowDim, colDim, measure = 'findings') {
  const g = bia.graph;
  const names = nameIndex(bia, ctx);
  const svcName = new Map(ctx.business_services.map((s) => [s.id, s.name]));
  const assetSite = new Map(ctx.assets.map((a) => [a.id, a.site]));
  const procByComp = new Map();
  for (const p of g.processes) for (const c of p.components) {
    if (!procByComp.has(c.id)) procByComp.set(c.id, []);
    procByComp.get(c.id).push(p);
  }
  const dimKeys = (dim, fact) => {
    switch (dim) {
      case 'slo': return fact.slos;
      case 'policy': return fact.policies;
      case 'process': return fact.processes.map((p) => p.id);
      case 'service': return [...new Set(fact.processes.flatMap((p) => p.service_ids))];
      case 'owner': return [...new Set(fact.processes.map((p) => p.owner))];
      case 'category': return [COMPONENT_CATEGORIES[g.compRows.get(fact.component)?.component.category] || 'Other'];
      case 'component': return [fact.component];
      case 'scenario': return [fact.scenario];
      case 'type': return [fact.finding.risk.type.replace('_', ' ')];
      case 'severity': return [fact.finding.risk.severity];
      case 'site': return [...new Set(fact.finding.risk.asset_ids.map((a) => assetSite.get(a)).filter(Boolean))];
      default: return ['—'];
    }
  };
  const label = (dim, key) => (dim === 'service' ? svcName.get(key) || key : names.get(key) || key);

  const cells = new Map();
  const rowTotals = new Map();
  const colTotals = new Map();
  const add = (map, k, fid) => {
    if (!map.has(k)) map.set(k, new Set());
    map.get(k).add(fid);
  };
  for (const p of g.pairs.values()) {
    if (!g.compRows.has(p.component_id) || !g.scenRows.has(p.scenario_id)) continue;
    const procs = (procByComp.get(p.component_id) || []).filter((x) => g.procRows.has(x.id));
    const pols = [...new Set(procs.flatMap((x) => x.policy_ids).filter((x) => g.polRows.has(x)))];
    const slos = [...new Set(pols.flatMap((x) => g.polRows.get(x).policy.slo_links.map((l) => l.slo_id)))];
    for (const fr of p.findings) {
      const finding = g.findings.get(fr.id);
      if (!finding?.active) continue;
      const fact = { scenario: p.scenario_id, component: p.component_id, processes: procs, policies: pols, slos, finding };
      for (const r of dimKeys(rowDim, fact)) {
        for (const c of dimKeys(colDim, fact)) {
          add(cells, `${r}\u0000${c}`, fr.id);
          add(rowTotals, r, fr.id);
          add(colTotals, c, fr.id);
        }
      }
    }
  }
  const value = (set) => {
    if (!set) return 0;
    if (measure === 'critical_high') return [...set].filter((id) => ['critical', 'high'].includes(g.findings.get(id).risk.severity)).length;
    if (measure === 'max_score') return [...set].reduce((m, id) => Math.max(m, g.findings.get(id).score), 0);
    return set.size;
  };
  const order = (totals, dim) => [...totals.entries()].map(([k, s]) => ({ key: k, label: label(dim, k), total: value(s), finding_ids: [...s].sort() }))
    .sort((a, b) => b.total - a.total || String(a.key).localeCompare(String(b.key)));
  const rows = order(rowTotals, rowDim);
  const cols = order(colTotals, colDim);
  let max = 0;
  const grid = rows.map((r) => cols.map((c) => {
    const set = cells.get(`${r.key}\u0000${c.key}`);
    const v = value(set);
    if (v > max) max = v;
    return { value: v, finding_ids: set ? [...set].sort() : [] };
  }));
  return { rows, cols, grid, max, measure, rowDim, colDim };
}

/** id -> display name for every node in the graph. */
export function nameIndex(bia, ctx) {
  const m = new Map();
  for (const l of LEVELS) for (const n of bia.levels[l.key]) m.set(n.id, n.name);
  for (const s of ctx.risk_scenarios || []) m.set(s.id, s.name);
  return m;
}

/** Format a value in an SLO's own unit ("$150.0M", "95.0%", "45 pts"). */
export function formatSloValue(v, slo, { signed = false } = {}) {
  const d = slo.decimals ?? 1;
  const abs = Math.abs(Number(v));
  const n = abs.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
  const sign = Number(v) < 0 ? '−' : signed ? '+' : '';
  if (slo.unit === '$M') return `${sign}$${n}M`;
  if (slo.unit === '%') return `${sign}${n}%`;
  return `${sign}${n} ${slo.unit}`;
}

/** One-sentence executive reading of an SLO row (the "10 risks → −10%" line). */
export function sloSentence(row, scenarioNames) {
  const b = row.findings_by_band;
  const parts = [b.critical && `${b.critical} critical`, b.high && `${b.high} high`, b.medium && `${b.medium} medium`].filter(Boolean);
  const top = row.by_scenario.slice(0, 2).map((s) => scenarioNames.get(s.id) || s.id).join(' and ');
  const pct = (row.loss_pct_of_basis * 100).toFixed(1);
  return `${row.contributing_findings} open cyber risks${parts.length ? ` (${parts.join(', ')})` : ''} put ${formatUsdShort(row.loss_usd)} of the ${row.slo.basis_label} at risk — ${pct}% of the basis${top ? `, mostly through ${top.toLowerCase()}` : ''}.`;
}

export { STATUS_RANK };
