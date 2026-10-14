// Layer 3 — BIA explorer: cyber risk translated into SLO impact, seven levels deep.
//
//   L1 SLOs → L2 policies → L3 business processes → L4 components (people,
//   procedures, data, systems) → L5 cyber-risk scenarios → L6 hunts & findings
//   → L7 raw evidence
//
// Every link is many-to-many, so the explorer is "focus" based rather than a
// tree: pick ANY node at ANY level and every column narrows to what is
// connected to it (the CISO → six processes → nine policies → every SLO; or
// "Denial of service" → the website, portal, TIP API, VPN ...). Every number is
// computed by business/bia.js from the BusinessContext; the mitigation
// simulator recomputes all of it live.

import {
  computeBia, connectedSet, directLinks, mitigationImpacts, sloScoreTrend, pivot, nameIndex, sloSentence,
  LEVELS, COMPONENT_CATEGORIES, PIVOT_DIMENSIONS, PIVOT_MEASURES, levelOf, BIA_MODEL, formatSloValue,
} from '../business/bia.js';
import { scoreChip, bandLegend, sloWaterfallSvg, impactBarsSvg, scoreTrendSvg, timelineSvg } from '../business/bia-charts.js';
import { esc, statusChip, figure } from '../business/charts.js';
import { formatUsdShort, DIMENSIONS } from '../business/engine.js';
import { ensureBusinessContext, mockBanner, downloadBlob } from '../business/data.js';
import { generateBiaPdf } from '../business/bia-pdf.js';
import { stringifyCsvRow } from '../lib/csv.js';
import { showError, showToast } from '../ui/toast.js';

const TABS = [
  { id: 'impact', label: 'SLO impact' },
  { id: 'explorer', label: 'Drill-down explorer' },
  { id: 'timeline', label: 'Hunts timeline' },
  { id: 'pivot', label: 'Slice & dice' },
];
const COLUMN_LIMIT = 25;
const CATEGORY_ICON = { people: '◉', process: '⟳', data: '▤', system: '▣' };
const KIND_LABEL = {
  vulnerability: 'Vulnerability', misconfiguration: 'Misconfiguration', exposure: 'Exposure', ioc: 'IOC', ioa: 'IOA', incident_finding: 'Incident finding', hunt: 'Hunt',
  scanner_result: 'Scanner result', config_snapshot: 'Config snapshot', exposure_record: 'Exposure record', alert: 'Alert', ticket: 'Ticket', metric_series: 'Metric series',
  architecture_note: 'Architecture note', network_flow: 'Network flows', triage_artifact: 'Triage artifact', hunt_result: 'Hunt result',
};

function option(value, label, selected) {
  return `<option value="${esc(value)}"${selected ? ' selected' : ''}>${esc(label)}</option>`;
}

function signedUsd(v) {
  if (!v) return '±$0';
  return `${v < 0 ? '−' : '+'}${formatUsdShort(Math.abs(v))}`;
}

function fmtMetric(v, slo) {
  return formatSloValue(v, slo);
}

function parseHash() {
  const parts = (location.hash || '').replace(/^#\/?/, '').split('/');
  const tab = TABS.some((t) => t.id === parts[1]) ? parts[1] : 'impact';
  return { tab, focus: parts[2] ? decodeURIComponent(parts[2]) : null };
}

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <div class="layer-tag">Layer 3 · Business impact analysis</div>
      <h1>BIA explorer</h1>
      <div class="view-subtitle">From business SLOs down to the evidence: slice, dice, drill down and drill through seven levels of cyber-to-business impact.</div>
    </div>`;
  const actions = document.createElement('div');
  actions.className = 'view-actions';
  const pdfBtn = Object.assign(document.createElement('button'), { className: 'btn btn-primary', textContent: 'Export PDF', type: 'button' });
  const jsonBtn = Object.assign(document.createElement('button'), { className: 'btn', textContent: 'Export JSON', type: 'button' });
  const csvBtn = Object.assign(document.createElement('button'), { className: 'btn', textContent: 'Export CSV', type: 'button' });
  actions.append(pdfBtn, jsonBtn, csvBtn);
  header.appendChild(actions);
  container.appendChild(header);

  const loading = document.createElement('div');
  loading.className = 'panel';
  loading.textContent = 'Loading business context…';
  container.appendChild(loading);
  let ctx;
  try {
    ctx = await ensureBusinessContext(store);
  } catch (err) {
    loading.textContent = err.message;
    showError('Could not load business context', err);
    return { unmount() {} };
  }
  loading.remove();
  if (!Array.isArray(ctx.slos) || !ctx.slos.length) {
    const p = document.createElement('div');
    p.className = 'panel';
    p.textContent = 'This business context has no BIA hierarchy (slos, bia_policies, business_processes, bp_components, risk_scenarios). Load the ACME.Corp demo from Business context to explore one.';
    container.appendChild(p);
    return { unmount() {} };
  }
  container.appendChild(mockBanner(ctx));

  const initial = parseHash();
  const state = {
    tab: initial.tab,
    focus: initial.focus,
    filters: { site: '', cloud: '', service: '', dimension: '' },
    rankSlo: 'SLO-ARR',
    selectedSlo: 'SLO-ARR',
    onlyConnected: true,
    search: '',
    minBand: 'low',
    expanded: new Set(),
    pivot: { row: 'scenario', col: 'slo', measure: 'findings', cell: null },
    includeClosed: false,
    simExpanded: false,
  };

  const filterRow = document.createElement('div');
  filterRow.className = 'filter-row panel';
  container.appendChild(filterRow);

  const layout = document.createElement('div');
  layout.className = 'bia-layout';
  const main = document.createElement('div');
  main.className = 'bia-main';
  const side = document.createElement('aside');
  side.className = 'bia-side panel';
  side.setAttribute('aria-label', 'Mitigation simulator');
  layout.append(main, side);
  container.appendChild(layout);

  const tabs = document.createElement('div');
  tabs.className = 'tabs';
  tabs.setAttribute('role', 'tablist');
  const body = document.createElement('div');
  body.className = 'bia-body';
  main.append(tabs, body);

  let current = null; // { bia, baseline, impacts, names, connected }
  const caches = { impacts: new Map(), trend: new Map(), links: new Map() };

  const mitigations = () => store.getState().biaMitigations || [];
  const whatIf = () => store.getState().whatIf || [];
  const activeFilters = () => Object.fromEntries(Object.entries(state.filters).filter(([, v]) => v));
  const cacheKey = (extra = '') => JSON.stringify([ctx.id, ctx.as_of, activeFilters(), whatIf(), mitigations(), extra]);

  function compute() {
    const filters = activeFilters();
    const bia = computeBia(ctx, { remediated: whatIf(), mitigations: mitigations(), filters });
    const baseline = mitigations().length ? computeBia(ctx, { remediated: whatIf(), filters }) : bia;
    const ik = cacheKey(state.rankSlo);
    if (!caches.impacts.has(ik)) caches.impacts.set(ik, mitigationImpacts(ctx, { remediated: whatIf(), mitigations: mitigations(), filters }, state.rankSlo));
    const lk = cacheKey();
    if (!caches.links.has(lk)) caches.links.set(lk, directLinks(bia, ctx));
    const names = nameIndex(bia, ctx);
    if (state.focus && !levelOf(bia, state.focus)) state.focus = null;
    const connected = state.focus ? connectedSet(bia, ctx, state.focus) : null;
    current = { bia, baseline, impacts: caches.impacts.get(ik), links: caches.links.get(lk), names, connected };
    return current;
  }

  function trendFor() {
    const k = cacheKey();
    if (!caches.trend.has(k)) caches.trend.set(k, sloScoreTrend(ctx, { remediated: whatIf(), mitigations: mitigations(), filters: activeFilters() }));
    return caches.trend.get(k);
  }

  function syncHash() {
    const h = `#/bia/${state.tab}${state.focus ? `/${encodeURIComponent(state.focus)}` : ''}`;
    if (location.hash !== h) history.replaceState(null, '', h);
  }

  // ---------------------------------------------------------------- filters
  function renderFilters() {
    const sites = ctx.organization.sites || [];
    filterRow.innerHTML = `
      <span class="slicer-label">Slice</span>
      <label>Site<select data-f="site">${option('', 'All sites', !state.filters.site)}${sites.map((s) => option(s.id, `${s.name} (${s.city})`, state.filters.site === s.id)).join('')}</select></label>
      <label>Cloud<select data-f="cloud">${option('', 'All / on-prem', !state.filters.cloud)}${['aws', 'azure', 'gcp'].map((x) => option(x, x.toUpperCase(), state.filters.cloud === x)).join('')}</select></label>
      <label>Business service<select data-f="service">${option('', 'All services', !state.filters.service)}${ctx.business_services.map((s) => option(s.id, s.name, state.filters.service === s.id)).join('')}</select></label>
      <label>Risk dimension<select data-f="dimension">${option('', 'All dimensions', !state.filters.dimension)}${DIMENSIONS.map((d) => option(d, d[0].toUpperCase() + d.slice(1), state.filters.dimension === d)).join('')}</select></label>
      <button class="btn" data-action="reset-filters" type="button">Reset</button>`;
  }
  filterRow.addEventListener('change', (e) => {
    const f = e.target?.dataset?.f;
    if (!f) return;
    state.filters[f] = e.target.value;
    render();
  });
  filterRow.addEventListener('click', (e) => {
    if (e.target?.dataset?.action !== 'reset-filters') return;
    for (const k of Object.keys(state.filters)) state.filters[k] = '';
    renderFilters();
    render();
  });

  // ---------------------------------------------------------------- simulator
  function renderSide() {
    const { bia, baseline, impacts, names } = current;
    const applied = new Set(mitigations());
    const rank = bia.slos.find((s) => s.id === state.rankSlo) || bia.slos[0];
    const rankBase = baseline.slos.find((s) => s.id === rank.id);
    const changed = bia.slos.filter((s) => s.status !== baseline.slos.find((b) => b.id === s.id)?.status).length;
    const summary = applied.size
      ? `<p class="sim-summary"><strong>${applied.size}</strong> mitigation${applied.size > 1 ? 's' : ''} applied · ${formatUsdShort(bia.headline.mitigation_cost_usd)}<br>
          ${esc(rank.slo.name)}: ${formatUsdShort(rankBase.loss_usd)} → <strong>${formatUsdShort(rank.loss_usd)}</strong> (${signedUsd(rank.loss_usd - rankBase.loss_usd)}), score ${rankBase.score} → ${scoreChip(rank.score)}${changed ? `<br>${changed} SLO status change${changed > 1 ? 's' : ''}` : ''}</p>`
      : '<p class="sim-summary muted">Tick proposed mitigations to see every SLO, score and level recompute live.</p>';
    // Outside the SLO-impact tab the explorer needs the full width: the simulator
    // collapses into a strip of toggle chips above the tabs.
    const narrow = window.matchMedia?.('(max-width: 1200px)').matches;
    const stripMode = state.tab !== 'impact' || narrow;
    const compact = stripMode && !state.simExpanded;
    layout.classList.toggle('is-compact', stripMode);
    if (compact) {
      side.innerHTML = `<div class="sim-strip-head"><h2 class="panel-title">Mitigation simulator</h2>${summary}<button type="button" class="btn" data-action="sim-expand">Details</button></div>
        <div class="sim-chips">${(narrow ? impacts.filter((m, i) => i < 4 || m.applied) : impacts).map((m) => `<button type="button" class="sim-chip" data-mit-toggle="${esc(m.mitigation.id)}" aria-pressed="${m.applied}" title="${esc(m.mitigation.title)}: ${esc(rank.slo.name)} −${formatUsdShort(m.reduction_usd)}, cost ${formatUsdShort(m.mitigation.cost_usd)}"><span aria-hidden="true">${m.applied ? '✓' : '+'}</span> ${esc(m.mitigation.title.length > 34 ? `${m.mitigation.title.slice(0, 33)}…` : m.mitigation.title)} <strong>−${formatUsdShort(m.reduction_usd)}</strong></button>`).join('')}${narrow && impacts.length > 4 ? `<button type="button" class="link-btn" data-action="sim-expand">All ${impacts.length} mitigations</button>` : ''}</div>`;
      return;
    }
    side.innerHTML = `
      <div class="sim-strip-head"><h2 class="panel-title">Mitigation simulator</h2>${stripMode ? '<button type="button" class="btn" data-action="sim-collapse">Collapse</button>' : ''}</div>
      ${summary}
      <label class="sim-rank">Rank by impact on<select data-action="rank">${bia.slos.map((s) => option(s.id, s.slo.name, s.id === state.rankSlo)).join('')}</select></label>
      <div class="view-actions sim-actions"><button class="btn" type="button" data-action="best3">Apply best 3 by ROI</button><button class="btn" type="button" data-action="clear-mit">Clear</button></div>
      <div class="sim-list">${impacts.map((m) => `
        <label class="sim-item${m.applied ? ' is-applied' : ''}">
          <input type="checkbox" data-mit="${esc(m.mitigation.id)}" ${m.applied ? 'checked' : ''}>
          <span class="sim-text"><strong>${esc(m.mitigation.title)}</strong>
            <span class="muted">${esc(m.mitigation.id)} · ${formatUsdShort(m.mitigation.cost_usd)} · ${m.mitigation.eta_days} days · ${m.mitigation.finding_ids.length} findings${Object.keys(m.mitigation.scenario_factors).length ? ` · lowers ${Object.keys(m.mitigation.scenario_factors).map((s) => names.get(s) || s).join(', ').toLowerCase()}` : ''}</span></span>
          <span class="sim-num" title="${esc(rank.slo.name)} shortfall removed${m.roi != null ? `; ROI ${m.roi}x` : ''}">−${formatUsdShort(m.reduction_usd)}<span class="muted">${m.roi != null ? `${m.roi}x` : ''}</span></span>
        </label>`).join('')}</div>
      <p class="biz-figure-note">Figures are the reduction in the selected SLO’s expected cyber shortfall; ROI = reduction ÷ cost. Fixes ticked on the executive dashboard’s What-if panel are included too.</p>`;
  }
  side.addEventListener('change', (e) => {
    if (e.target?.dataset?.action === 'rank') {
      state.rankSlo = e.target.value;
      render();
      return;
    }
    const id = e.target?.dataset?.mit;
    if (!id) return;
    const set = new Set(mitigations());
    if (e.target.checked) set.add(id); else set.delete(id);
    store.set({ biaMitigations: [...set].sort() });
  });
  side.addEventListener('click', (e) => {
    const chip = e.target.closest?.('[data-mit-toggle]');
    if (chip) {
      const set = new Set(mitigations());
      const id = chip.dataset.mitToggle;
      if (set.has(id)) set.delete(id); else set.add(id);
      store.set({ biaMitigations: [...set].sort() });
      return;
    }
    const a = e.target?.dataset?.action;
    if (a === 'sim-expand' || a === 'sim-collapse') { state.simExpanded = a === 'sim-expand'; renderSide(); return; }
    if (a === 'clear-mit') store.set({ biaMitigations: [] });
    if (a === 'best3') {
      const best = current.impacts.filter((m) => !m.applied && m.roi > 0).sort((x, y) => y.roi - x.roi).slice(0, 3).map((m) => m.mitigation.id);
      store.set({ biaMitigations: [...new Set([...mitigations(), ...best])].sort() });
    }
  });

  // ---------------------------------------------------------------- tabs
  function renderTabs() {
    tabs.innerHTML = TABS.map((t) => `<button type="button" role="tab" data-tab="${t.id}" aria-selected="${t.id === state.tab}">${esc(t.label)}</button>`).join('');
  }
  tabs.addEventListener('click', (e) => {
    const t = e.target.closest('[data-tab]')?.dataset.tab;
    if (!t || t === state.tab) return;
    state.tab = t;
    render();
  });

  // ---------------------------------------------------------------- SLO impact
  function renderImpact() {
    const { bia, baseline, names } = current;
    const scen = new Map((ctx.risk_scenarios || []).map((s) => [s.id, s.name]));
    const trend = trendFor();
    const off = bia.slos.filter((s) => s.status !== 'on_track');
    const arr = bia.slos.find((s) => s.id === 'SLO-ARR') || bia.slos[0];
    const arrBase = baseline.slos.find((s) => s.id === arr.id);
    const hl = bia.headline;
    const tiles = `<div class="tile-grid">
      <div class="tile ${off.length ? 'tile-alert' : 'tile-ok'}"><div class="tile-label">SLOs off track after cyber risk</div><div class="tile-value">${off.length}<span class="tile-sub"> / ${bia.slos.length}</span></div><div class="tile-sub">${bia.slos.filter((s) => s.status === 'breach_projected').length} projected to miss target · ${bia.slos.filter((s) => s.status === 'at_risk').length} at risk</div></div>
      <div class="tile ${arr.score >= 60 ? 'tile-alert' : arr.score >= 40 ? 'tile-warn' : 'tile-ok'}"><div class="tile-label">${esc(arr.slo.name)} at risk</div><div class="tile-value">${formatUsdShort(arr.loss_usd)}</div><div class="tile-sub">${(arr.loss_pct_of_basis * 100).toFixed(1)}% of ${esc(arr.slo.basis_label)}${arr.loss_usd !== arrBase.loss_usd ? ` · simulation ${signedUsd(arr.loss_usd - arrBase.loss_usd)}` : ''}</div></div>
      <div class="tile ${hl.critical_findings ? 'tile-alert' : 'tile-warn'}"><div class="tile-label">Open findings feeding SLOs</div><div class="tile-value">${hl.active_findings}</div><div class="tile-sub">${hl.critical_findings} critical · ${hl.high_findings} high (finding score)</div></div>
      <div class="tile tile-warn"><div class="tile-label">Worst SLO</div><div class="tile-value tile-value-sm">${esc(names.get(hl.worst_slo) || '')}</div><div class="tile-sub">${scoreChip(bia.slos.find((s) => s.id === hl.worst_slo)?.score ?? 0, { label: true })}</div></div>
    </div>`;

    const cards = bia.slos.map((r) => {
      const base = baseline.slos.find((b) => b.id === r.id);
      const t = trend.get(r.id) || [];
      const bars = r.by_scenario.slice(0, 3).map((s) => {
        const w = r.loss_usd ? Math.max(3, Math.round((100 * s.loss_usd) / r.by_scenario[0].loss_usd)) : 0;
        return `<div class="mini-bar"><span class="mini-bar-label">${esc(scen.get(s.id) || s.id)}</span><span class="mini-bar-track"><span style="width:${w}%"></span></span><span class="mini-bar-val">${formatUsdShort(s.loss_usd)}</span></div>`;
      }).join('');
      return `<article class="slo-card band-edge-${r.band}${r.id === state.selectedSlo ? ' is-selected' : ''}" data-slo="${esc(r.id)}" tabindex="0" role="button" aria-pressed="${r.id === state.selectedSlo}">
        <div class="slo-card-head"><div><div class="slo-name">${esc(r.slo.name)}</div><div class="muted slo-owner">${esc(r.slo.owner)} · L1 SLO</div></div>${statusChip(r.status)}</div>
        <div class="slo-factor"><span class="muted">Cyber Risk Score Factor</span>${scoreChip(r.score, { label: true })}</div>
        <div class="slo-loss"><span class="slo-loss-value">−${formatUsdShort(r.loss_usd)}</span><span class="muted"> (−${(r.loss_pct_of_basis * 100).toFixed(1)}% of ${esc(r.slo.basis_label)})</span></div>
        <div class="slo-metrics"><span>Target <strong>${fmtMetric(r.slo.target, r.slo)}</strong></span><span>Plan <strong>${fmtMetric(r.slo.forecast, r.slo)}</strong></span><span>Cyber-adjusted <strong>${fmtMetric(r.projected, r.slo)}</strong></span></div>
        <div class="mini-bars">${bars}</div>
        <div class="slo-foot"><span class="muted">${r.contributing_findings} findings: ${r.findings_by_band.critical} critical · ${r.findings_by_band.high} high · ${r.findings_by_band.medium} medium</span>${scoreTrendSvg(t, { width: 120, height: 30 })}</div>
        ${base && base.loss_usd !== r.loss_usd ? `<div class="slo-sim">Simulation: ${formatUsdShort(base.loss_usd)} → ${formatUsdShort(r.loss_usd)} (${signedUsd(r.loss_usd - base.loss_usd)}), score ${base.score} → ${r.score}</div>` : ''}
      </article>`;
    }).join('');

    const sel = bia.slos.find((s) => s.id === state.selectedSlo) || bia.slos[0];
    const t = trend.get(sel.id) || [];
    const scenItems = sel.by_scenario.slice(0, 8).map((s) => ({ label: scen.get(s.id) || s.id, value: s.loss_usd, focus: s.id }));
    const polRows = sel.by_policy.map((p) => `<tr class="clickable" data-focus="${esc(p.policy_id)}"><td>${esc(names.get(p.policy_id) || p.policy_id)}</td><td class="num">${(p.weight * 100).toFixed(1)}%</td><td class="num">${Math.round(p.probability * 100)}%</td><td class="num">${formatUsdShort(p.loss_usd)}</td></tr>`).join('');
    const findRows = sel.by_finding.slice(0, 12).map((x) => `<tr class="clickable" data-focus="${esc(x.id)}"><td class="nowrap">${esc(x.id)}</td><td>${esc(names.get(x.id) || '')}</td><td>${scoreChip(x.score)}</td><td class="num">${formatUsdShort(x.loss_usd)}</td></tr>`).join('');
    const kpis = (sel.slo.kpi_ids || []).map((id) => ctx.kpis.find((k) => k.id === id)).filter(Boolean);
    const detail = `<section class="panel slo-detail">
      <div class="slo-detail-head"><div><div class="layer-tag">L1 · ${esc(sel.slo.owner)}</div><h2>${esc(sel.slo.name)}</h2><p class="slo-sentence">${esc(sloSentence(sel, scen))}</p></div>
        <div class="slo-detail-score">${scoreChip(sel.score, { label: true })}${statusChip(sel.status)}${scoreTrendSvg(t)}<span class="muted">Score, last 12 months</span></div></div>
      <div class="dash-grid">
        <div class="span-7">${figure('Plan → cyber-adjusted, by scenario', sloWaterfallSvg(sel, scen), `<table><tbody>${sel.by_scenario.map((s) => `<tr><td>${esc(scen.get(s.id) || s.id)}</td><td class="num">${formatUsdShort(s.loss_usd)}</td><td class="num">${Math.round(s.share * 100)}%</td></tr>`).join('')}</tbody></table>`, { note: `${esc(sel.slo.description)} Basis: ${formatUsdShort(sel.slo.basis_usd)} (${esc(sel.slo.basis_label)}); headroom between plan and target ${formatUsdShort(sel.headroom_usd)}.` })}</div>
        <div class="span-5">${figure('Shortfall by cyber-risk scenario (L5)', impactBarsSvg(scenItems, { width: 460 }), `<table><tbody>${scenItems.map((i) => `<tr><td>${esc(i.label)}</td><td class="num">${formatUsdShort(i.value)}</td></tr>`).join('')}</tbody></table>`, { note: 'Click a bar to focus that scenario in the explorer.' })}</div>
        <div class="span-6"><section class="panel"><h3 class="panel-title">Policies carrying the shortfall (L2)</h3><div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Policy</th><th class="num">Weight</th><th class="num">P(fail)</th><th class="num">Shortfall</th></tr></thead><tbody>${polRows}</tbody></table></div><p class="biz-figure-note">Weight = share of the SLO’s basis lost if the policy fails; P(fail) is computed from the processes that implement it.</p></section></div>
        <div class="span-6"><section class="panel"><h3 class="panel-title">Top contributing findings (L6)</h3><div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Id</th><th>Finding</th><th>Score</th><th class="num">Shortfall</th></tr></thead><tbody>${findRows}</tbody></table></div></section></div>
        ${kpis.length ? `<div class="span-12"><section class="panel"><h3 class="panel-title">Operational KPIs behind this SLO</h3><div class="pill-list">${kpis.map((k) => `<a class="badge" href="#/business">${esc(k.id)} · ${esc(k.name)}</a>`).join(' ')}</div></section></div>` : ''}
      </div>
      <div class="view-actions"><button class="btn btn-primary" type="button" data-drill="${esc(sel.id)}">Drill down from this SLO →</button></div>
    </section>`;
    body.innerHTML = `${tiles}<div class="slo-grid">${cards}</div>${detail}
      <details class="panel method"><summary><strong>How the cyber-risk score factor is calculated</strong></summary>
        <dl>
          <dt>L6 finding</dt><dd>12-month likelihood from severity × exploitability × internet exposure × active threat, reduced by mapped control effectiveness (the same model as the executive dashboard). Score 100 = likelihood ${BIA_MODEL.findingLikelihoodAt100}.</dd>
          <dt>L5 × L4</dt><dd>Each scenario on each component: 1 − (1 − threat base rate) × Π(1 − finding likelihood × asset criticality) over the findings that enable it there.</dd>
          <dt>L4 → L3 → L2</dt><dd>Component events disrupt the processes that need them (essential 100%, supporting ${Math.round(BIA_MODEL.essentiality.supporting * 100)}%, × ${BIA_MODEL.processDisruption}); a policy fails when its processes are disrupted (× ${BIA_MODEL.policyFailure}).</dd>
          <dt>L1 shortfall</dt><dd>Σ policy weight × SLO financial basis × P(policy fails), converted to the SLO’s unit for the cyber-adjusted projection.</dd>
          <dt>Score factor</dt><dd>100 × (1 − e^(−shortfall ÷ headroom)), where headroom is the gap between plan and target: 63 means cyber risk is expected to consume exactly the headroom.</dd>
          <dt>Attribution</dt><dd>Dollars are split across scenarios and findings by hazard share, −ln(1 − p), which adds exactly under 1 − Π(1 − p).</dd>
        </dl></details>`;
  }

  // ---------------------------------------------------------------- explorer
  const bandRank = { low: 0, medium: 1, high: 2, critical: 3 };

  function nodeMeta(n) {
    if (n.level === 1) return `${esc(n.owner)} · ${statusChip(n.status)}`;
    if (n.level === 2 || n.level === 3) return esc(n.owner || '');
    if (n.level === 4) return `<span class="cat-badge cat-${esc(n.category)}"><span aria-hidden="true">${CATEGORY_ICON[n.category] || ''}</span> ${esc(COMPONENT_CATEGORIES[n.category] || n.category)}</span>`;
    if (n.level === 5) return `${Math.round(n.probability * 100)}% likely to disrupt a process${n.factor < 1 ? ' · <span class="badge">mitigated</span>' : ''}`;
    if (n.level === 6) return n.kind === 'hunt' ? `<span class="badge badge-hunt">Hunt</span> ${n.hits} matches · ${esc(n.cadence)}` : `<span class="badge">${esc(KIND_LABEL[n.type] || n.type)}</span> ${esc(n.id)}${n.remediated ? ' · <span class="badge">fixed (sim)</span>' : n.active ? '' : ' · closed'}`;
    return `<span class="badge">${esc(KIND_LABEL[n.kind] || n.kind)}</span> ${esc(n.collected_at.slice(0, 10))}`;
  }

  function renderExplorer() {
    const { bia, connected, names } = current;
    const q = state.search.trim().toLowerCase();
    const focusLevel = state.focus ? levelOf(bia, state.focus) : null;
    const cols = LEVELS.map((l) => {
      let nodes = bia.levels[l.key];
      const total = nodes.length;
      const conn = connected?.get(l.key);
      if (connected && state.onlyConnected) nodes = nodes.filter((n) => conn.has(n.id));
      if (q) nodes = nodes.filter((n) => n.name.toLowerCase().includes(q) || n.id.toLowerCase().includes(q));
      if (state.minBand !== 'low') nodes = nodes.filter((n) => bandRank[n.band] >= bandRank[state.minBand] || n.id === state.focus);
      const shown = state.expanded.has(l.key) ? nodes : nodes.slice(0, COLUMN_LIMIT);
      const items = shown.map((n) => {
        const cls = ['bia-node', `band-edge-${n.band}`];
        if (n.id === state.focus) cls.push('is-focus');
        else if (conn?.has(n.id)) cls.push('is-connected');
        else if (connected) cls.push('is-dim');
        return `<button type="button" class="${cls.join(' ')}" data-node="${esc(n.id)}" aria-pressed="${n.id === state.focus}">
          <span class="bia-node-name">${esc(n.name)}</span>
          <span class="bia-node-meta">${nodeMeta(n)}</span>
          <span class="bia-node-score">${scoreChip(n.score)}</span></button>`;
      }).join('');
      const more = nodes.length > COLUMN_LIMIT ? `<button type="button" class="link-btn bia-more" data-expand="${l.key}">${state.expanded.has(l.key) ? 'Show fewer' : `Show all ${nodes.length}`}</button>` : '';
      return `<section class="bia-col${focusLevel === l.key ? ' is-focus-col' : ''}" aria-label="Level ${l.n}: ${esc(l.title)}">
        <header class="bia-col-head"><span class="bia-level">L${l.n}</span><span class="bia-col-title" title="${esc(l.title)}">${esc(l.label)}</span><span class="bia-count">${nodes.length}${nodes.length !== total ? `/${total}` : ''}</span></header>
        <div class="bia-col-list">${items || '<p class="muted bia-empty">Nothing at this level.</p>'}${more}</div></section>`;
    }).join('');

    const crumbs = state.focus
      ? `<div class="bia-focus-bar"><span class="muted">Focus</span> <strong>L${LEVELS.find((l) => l.key === focusLevel).n} · ${esc(names.get(state.focus) || state.focus)}</strong>
          <span class="muted">connects to</span> ${LEVELS.filter((l) => l.key !== focusLevel).map((l) => `<span class="badge">L${l.n} ${connected.get(l.key).size}</span>`).join(' ')}
          <button type="button" class="btn" data-action="clear-focus">Clear focus</button></div>`
      : '<div class="bia-focus-bar muted">Select any item in any level to focus on it: every column narrows to what it is connected to, up to the SLOs and down to the evidence.</div>';

    body.innerHTML = `<div class="bia-toolbar">
        <label class="bia-search">Find<input type="search" data-action="search" placeholder="Name or id, any level" value="${esc(state.search)}"></label>
        <label>Minimum score<select data-action="min-band">${BIA_MODEL.bands.slice().reverse().map((b) => option(b.id, b.id === 'low' ? 'All' : `${b.label} (${b.min}+)`, state.minBand === b.id)).join('')}</select></label>
        <label class="inline-check"><input type="checkbox" data-action="only-connected" ${state.onlyConnected ? 'checked' : ''}> Only connected</label>
        ${bandLegend()}
      </div>
      ${crumbs}
      <div class="bia-cols"><div class="bia-cols-grid">${cols}<svg class="bia-links" aria-hidden="true"></svg></div></div>
      <div class="bia-detail-wrap">${state.focus ? renderDetail() : ''}</div>`;
    requestAnimationFrame(drawLinks);
  }

  function drawLinks() {
    const grid = body.querySelector('.bia-cols-grid');
    const svg = grid?.querySelector('svg.bia-links');
    if (!svg) return;
    if (!state.focus || !current.connected) { svg.innerHTML = ''; return; }
    const base = grid.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
    svg.setAttribute('width', base.width);
    svg.setAttribute('height', base.height);
    const pos = new Map();
    for (const el of grid.querySelectorAll('.bia-node')) {
      const r = el.getBoundingClientRect();
      pos.set(el.dataset.node, { l: r.left - base.left, r: r.right - base.left, y: r.top - base.top + r.height / 2 });
    }
    const conn = new Set([...current.connected.values()].flatMap((s) => [...s]));
    const paths = [];
    for (const [a, b] of current.links) {
      if (!conn.has(a) || !conn.has(b)) continue;
      const pa = pos.get(a);
      const pb = pos.get(b);
      if (!pa || !pb) continue;
      const x1 = pa.r;
      const x2 = pb.l;
      if (x2 <= x1) continue;
      const mx = (x1 + x2) / 2;
      const hot = a === state.focus || b === state.focus;
      paths.push(`<path class="bia-link${hot ? ' is-hot' : ''}" d="M${x1.toFixed(1)},${pa.y.toFixed(1)} C${mx.toFixed(1)},${pa.y.toFixed(1)} ${mx.toFixed(1)},${pb.y.toFixed(1)} ${x2.toFixed(1)},${pb.y.toFixed(1)}"/>`);
    }
    svg.innerHTML = paths.join('');
  }

  function chipList(ids, level) {
    const { bia } = current;
    const byId = new Map(bia.levels[level].map((n) => [n.id, n]));
    const nodes = [...ids].map((id) => byId.get(id)).filter(Boolean).sort((a, b) => b.score - a.score);
    if (!nodes.length) return '<span class="muted">—</span>';
    const shown = nodes.slice(0, 14);
    return `${shown.map((n) => `<button type="button" class="conn-chip" data-node="${esc(n.id)}">${scoreChip(n.score)} ${esc(n.name.length > 60 ? `${n.name.slice(0, 59)}…` : n.name)}</button>`).join('')}${nodes.length > shown.length ? `<span class="muted">+${nodes.length - shown.length} more</span>` : ''}`;
  }

  function renderDetail() {
    const { bia, connected, names } = current;
    const id = state.focus;
    const level = levelOf(bia, id);
    const lvl = LEVELS.find((l) => l.key === level);
    const n = bia.levels[level].find((x) => x.id === id);
    const g = bia.graph;
    const scen = new Map((ctx.risk_scenarios || []).map((s) => [s.id, s.name]));
    let specific = '';
    if (level === 'slo') {
      const r = bia.slos.find((s) => s.id === id);
      specific = `<p class="slo-sentence">${esc(sloSentence(r, scen))}</p>
        <dl class="kv-grid"><dt>Target</dt><dd>${fmtMetric(r.slo.target, r.slo)}</dd><dt>Plan forecast</dt><dd>${fmtMetric(r.slo.forecast, r.slo)}</dd><dt>Cyber-adjusted</dt><dd>${fmtMetric(r.projected, r.slo)} ${statusChip(r.status)}</dd><dt>Expected shortfall</dt><dd>${formatUsdShort(r.loss_usd)} (${(r.loss_pct_of_basis * 100).toFixed(1)}% of ${esc(r.slo.basis_label)})</dd></dl>
        ${sloWaterfallSvg(r, scen)}
        <button type="button" class="btn" data-open-slo="${esc(id)}">Open in SLO impact</button>`;
    } else if (level === 'policy') {
      const p = g.polRows.get(id).policy;
      specific = `<p>${esc(p.statement)}</p><dl class="kv-grid"><dt>Owner</dt><dd>${esc(p.owner)}</dd><dt>When</dt><dd>${esc(p.cadence)}</dd><dt>P(policy misses threshold)</dt><dd>${Math.round(n.probability * 100)}%</dd></dl>
        <table class="biz-table"><thead><tr><th>SLO it protects</th><th class="num">Weight</th><th class="num">Shortfall from this policy</th></tr></thead><tbody>${p.slo_links.map((l) => {
          const r = bia.slos.find((s) => s.id === l.slo_id);
          const pl = r?.by_policy.find((x) => x.policy_id === id);
          return `<tr class="clickable" data-node="${esc(l.slo_id)}"><td>${esc(names.get(l.slo_id) || l.slo_id)}</td><td class="num">${(l.weight * 100).toFixed(1)}%</td><td class="num">${pl ? formatUsdShort(pl.loss_usd) : '—'}</td></tr>`;
        }).join('')}</tbody></table>`;
    } else if (level === 'process') {
      const p = g.procRows.get(id).process;
      const groups = Object.keys(COMPONENT_CATEGORIES).map((cat) => {
        const cs = p.components.filter((c) => g.compRows.get(c.id)?.component.category === cat);
        if (!cs.length) return '';
        return `<div class="comp-group"><h4><span aria-hidden="true">${CATEGORY_ICON[cat]}</span> ${esc(COMPONENT_CATEGORIES[cat])}</h4>${cs.map((c) => {
          const cr = g.compRows.get(c.id);
          return `<button type="button" class="conn-chip" data-node="${esc(c.id)}">${scoreChip(Math.round(cr.probability * 100))} ${esc(cr.component.name)} <span class="muted">${c.role}</span></button>`;
        }).join('')}</div>`;
      }).join('');
      specific = `<dl class="kv-grid"><dt>Owner</dt><dd>${esc(p.owner)}</dd><dt>Runs</dt><dd>${esc(p.frequency)}</dd><dt>RTO</dt><dd>${p.rto_hours} h</dd><dt>Business services</dt><dd>${p.service_ids.map((s) => esc(ctx.business_services.find((x) => x.id === s)?.name || s)).join(', ')}</dd></dl>
        <h3 class="panel-title">Breakdown: people, procedures, data, systems (L4)</h3><div class="comp-groups">${groups}</div>`;
    } else if (level === 'component') {
      const cr = g.compRows.get(id);
      const c = cr.component;
      const assets = ctx.assets.filter((a) => (c.asset_ids || []).includes(a.id) || (c.asset_query && Object.entries(c.asset_query).every(([k, v]) => a[k] === v)));
      const pairs = cr.pairKeys.map((k) => g.pairs.get(k)).filter((p) => g.scenRows.has(p.scenario_id)).sort((a, b) => b.probability - a.probability);
      specific = `<dl class="kv-grid"><dt>Type</dt><dd>${esc(COMPONENT_CATEGORIES[c.category])}</dd><dt>Owner</dt><dd>${esc(c.owner)}</dd>${c.headcount ? `<dt>Headcount</dt><dd>${c.headcount}</dd>` : ''}${c.classification ? `<dt>Data classification</dt><dd>${esc(c.classification.replaceAll('_', ' '))}</dd>` : ''}<dt>Assets</dt><dd>${assets.length} — ${assets.slice(0, 6).map((a) => esc(a.name)).join(', ')}${assets.length > 6 ? ' …' : ''} <a href="#/inventory">inventory</a></dd></dl>
        <h3 class="panel-title">Cyber-risk scenarios on this component (L5)</h3>
        <table class="biz-table"><thead><tr><th>Scenario</th><th class="num">P(12 months)</th><th class="num">Findings</th><th>Threat prior</th></tr></thead><tbody>${pairs.map((p) => `<tr class="clickable" data-node="${esc(p.scenario_id)}"><td>${esc(scen.get(p.scenario_id))}</td><td class="num">${Math.round(p.probability * 100)}%</td><td class="num">${p.findings.length}</td><td>${p.base ? `${(p.base * 100).toFixed(1)}%` : '—'}</td></tr>`).join('')}</tbody></table>`;
    } else if (level === 'scenario') {
      const s = g.scenRows.get(id).scenario;
      const mits = (ctx.mitigations || []).filter((m) => m.scenario_factors[id] || m.finding_ids.some((f) => g.findings.get(f)?.scenario_ids.includes(id)));
      const pairs = [...g.pairs.values()].filter((p) => p.scenario_id === id && g.compRows.has(p.component_id)).sort((a, b) => b.probability - a.probability);
      specific = `<p>${esc(s.description)}</p><dl class="kv-grid"><dt>Dimensions</dt><dd>${s.dimensions.map(esc).join(', ')}</dd><dt>ATT&amp;CK tactics</dt><dd>${s.attack_tactics.map(esc).join(', ') || '—'}</dd><dt>Threat prior</dt><dd>${(s.base_rate * 100).toFixed(1)}% per exposed component per year${n.factor < 1 ? ` × ${n.factor.toFixed(2)} (simulated mitigation)` : ''}</dd><dt>Impact factor</dt><dd>${s.impact_factor}</dd></dl>
        <h3 class="panel-title">Where it lands (L4)</h3>
        <table class="biz-table"><thead><tr><th>Component</th><th>Type</th><th class="num">P(12 months)</th><th class="num">Findings</th></tr></thead><tbody>${pairs.map((p) => {
          const c = g.compRows.get(p.component_id).component;
          return `<tr class="clickable" data-node="${esc(c.id)}"><td>${esc(c.name)}</td><td>${esc(COMPONENT_CATEGORIES[c.category])}</td><td class="num">${Math.round(p.probability * 100)}%</td><td class="num">${p.findings.length}</td></tr>`;
        }).join('')}</tbody></table>
        ${mits.length ? `<h3 class="panel-title">Proposed mitigations</h3><div class="pill-list">${mits.map((m) => `<span class="badge">${esc(m.id)} ${esc(m.title)}</span>`).join(' ')}</div>` : ''}`;
    } else if (level === 'finding' && g.huntRows.has(id)) {
      const h = g.huntRows.get(id).hunt;
      const rows = [{ id: h.id, label: h.name, kind: 'hunt', score: n.score, runs: h.runs }];
      specific = `<p><strong>Hypothesis:</strong> ${esc(h.hypothesis)}</p><dl class="kv-grid"><dt>Logic</dt><dd>${esc(h.logic)}</dd><dt>Data sources</dt><dd>${h.data_sources.map(esc).join(', ')}</dd><dt>Cadence</dt><dd>${esc(h.cadence)} · last run ${esc(h.last_run)}</dd><dt>Matches (13 weeks)</dt><dd>${n.hits}</dd></dl>
        ${timelineSvg(rows, ctx.months, ctx.as_of)}`;
    } else if (level === 'finding') {
      const f = g.findings.get(id);
      const r = f.risk;
      const ev = (ctx.evidence || []).filter((e) => e.finding_ids.includes(id));
      const mits = (ctx.mitigations || []).filter((m) => m.finding_ids.includes(id));
      const rows = [{ id: r.id, label: r.title, kind: 'finding', start: r.first_seen, end: r.closed_on || ctx.as_of, open: r.status !== 'mitigated', score: f.score, evidence: ev.map((e) => e.collected_at.slice(0, 10)) }];
      specific = `<dl class="kv-grid"><dt>Type</dt><dd>${esc(KIND_LABEL[r.type] || r.type)}</dd><dt>Severity</dt><dd><span class="sev-dot sev-${esc(r.severity)}" aria-hidden="true"></span>${esc(r.severity)}${r.cvss ? ` · CVSS ${r.cvss}` : ''}${r.epss != null ? ` · EPSS ${r.epss}` : ''}</dd><dt>Status</dt><dd>${esc(r.status.replace('_', ' '))}${f.remediated ? ' (fixed in simulation)' : ''}</dd><dt>Likelihood (12 months)</dt><dd>${(f.likelihood * 100).toFixed(1)}%</dd>
        ${r.vuln_id ? `<dt>Vulnerability id</dt><dd>${esc(r.vuln_id)}</dd>` : ''}<dt>Assets</dt><dd>${r.asset_ids.length} — ${r.asset_ids.slice(0, 5).map((a) => esc(ctx.assets.find((x) => x.id === a)?.name || a)).join(', ')}${r.asset_ids.length > 5 ? ' …' : ''}</dd>
        <dt>Controls</dt><dd>${(r.control_ids || []).map(esc).join(', ')}</dd><dt>ATT&amp;CK</dt><dd>${(r.mitre_techniques || []).map(esc).join(', ') || '—'}</dd><dt>Source</dt><dd>${esc(r.source)} · first seen ${esc(r.first_seen)}</dd>
        <dt>Remediation</dt><dd>${esc(r.remediation?.action || '')} · ${formatUsdShort(r.remediation?.cost_usd || 0)} · ${r.remediation?.eta_days ?? '?'} days</dd>${mits.length ? `<dt>In mitigation</dt><dd>${mits.map((m) => esc(`${m.id} ${m.title}`)).join('; ')}</dd>` : ''}</dl>
        ${timelineSvg(rows, ctx.months, ctx.as_of)}
        <a class="btn" href="#/cyber/${esc(r.id)}">Open in risk register</a>`;
    } else if (level === 'evidence') {
      const e = (ctx.evidence || []).find((x) => x.id === id);
      specific = `<dl class="kv-grid"><dt>Kind</dt><dd>${esc(KIND_LABEL[e.kind] || e.kind)}</dd><dt>Source</dt><dd>${esc(e.source)}</dd><dt>Collected</dt><dd>${esc(e.collected_at)}</dd>${e.asset_id ? `<dt>Asset</dt><dd>${esc(ctx.assets.find((a) => a.id === e.asset_id)?.name || e.asset_id)}</dd>` : ''}<dt>SHA-256</dt><dd class="mono">${esc(e.sha256)}</dd></dl>
        <h3 class="panel-title">Raw record</h3><pre class="raw-json">${esc(JSON.stringify(e.raw, null, 2))}</pre>`;
    }
    const conns = LEVELS.filter((l) => l.key !== level).map((l) => `<div class="conn-row"><div class="conn-level">L${l.n} ${esc(l.label)} <span class="muted">${connected.get(l.key).size}</span></div><div class="conn-chips">${chipList(connected.get(l.key), l.key)}</div></div>`).join('');
    return `<section class="panel bia-detail" aria-label="Drill-through">
      <div class="bia-detail-head"><div><div class="layer-tag">L${lvl.n} · ${esc(lvl.title)}</div><h2>${esc(n.name)}</h2><div class="muted mono">${esc(id)}</div></div>${scoreChip(n.score, { label: true })}</div>
      <div class="two-col-biz"><div>${specific}</div><div><h3 class="panel-title">Connections (many-to-many)</h3>${conns}</div></div>
    </section>`;
  }

  // ---------------------------------------------------------------- timeline
  function renderTimeline() {
    const { bia, connected, names } = current;
    const g = bia.graph;
    let ids = bia.levels.finding.map((n) => n.id);
    if (connected) ids = ids.filter((id) => connected.get('finding').has(id));
    const evByFinding = new Map();
    for (const e of ctx.evidence || []) for (const f of e.finding_ids) {
      if (!evByFinding.has(f)) evByFinding.set(f, []);
      evByFinding.get(f).push(e.collected_at.slice(0, 10));
    }
    const nodes = new Map(bia.levels.finding.map((n) => [n.id, n]));
    const hunts = ids.filter((id) => g.huntRows.has(id)).map((id) => {
      const h = g.huntRows.get(id).hunt;
      return { id, label: h.name, kind: 'hunt', score: nodes.get(id).score, runs: h.runs };
    });
    let finds = ids.filter((id) => g.findings.has(id)).map((id) => {
      const f = g.findings.get(id);
      return { id, label: f.risk.title, kind: 'finding', start: f.risk.first_seen, end: f.risk.closed_on || ctx.as_of, open: f.risk.status !== 'mitigated', score: nodes.get(id).score, evidence: evByFinding.get(id) || [], active: f.active };
    });
    if (!state.includeClosed) finds = finds.filter((f) => f.open);
    finds.sort((a, b) => b.score - a.score || a.start.localeCompare(b.start));
    const limit = connected ? 120 : 60;
    const rows = [...hunts, ...finds.slice(0, limit)];
    body.innerHTML = `<div class="bia-toolbar">
        <span>${connected ? `Showing what connects to <strong>${esc(names.get(state.focus) || state.focus)}</strong>` : `Top ${Math.min(limit, finds.length)} open findings by score, and every hunt`}</span>
        <label class="inline-check"><input type="checkbox" data-action="include-closed" ${state.includeClosed ? 'checked' : ''}> Include remediated</label>
        ${state.focus ? '<button type="button" class="btn" data-action="clear-focus">Clear focus</button>' : ''}${bandLegend()}</div>
      ${figure('L6 — hunts (weekly runs, dot size = matches) and findings (open → closed), with evidence ticks', timelineSvg(rows, ctx.months, ctx.as_of),
        `<table><thead><tr><th>Id</th><th>Item</th><th>Start</th><th>End</th><th>Score</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.id)}</td><td>${esc(r.label)}</td><td>${esc(r.start || r.runs?.[0]?.date || '')}</td><td>${esc(r.kind === 'hunt' ? 'ongoing' : r.open ? 'open' : r.end)}</td><td class="num">${r.score}</td></tr>`).join('')}</tbody></table>`,
        { wide: true, note: 'Click a row to drill through to it in the explorer. The dashed line is the as-of date.' })}`;
  }

  // ---------------------------------------------------------------- pivot
  function renderPivot() {
    const { bia } = current;
    const pv = pivot(bia, ctx, state.pivot.row, state.pivot.col, state.pivot.measure);
    const bucket = (v) => (v <= 0 ? 0 : Math.min(7, 1 + Math.floor((v / (pv.max || 1)) * 6.999)));
    const head = `<tr><th>${esc(PIVOT_DIMENSIONS[pv.rowDim])} \\ ${esc(PIVOT_DIMENSIONS[pv.colDim])}</th>${pv.cols.map((c) => `<th class="num pv-col" title="${esc(c.label)}">${esc(c.label.length > 22 ? `${c.label.slice(0, 21)}…` : c.label)}</th>`).join('')}<th class="num">Total</th></tr>`;
    const rows = pv.rows.map((r, i) => `<tr><th scope="row" class="pv-row">${esc(r.label)}</th>${pv.grid[i].map((cell, j) => {
      const sel = state.pivot.cell && state.pivot.cell[0] === i && state.pivot.cell[1] === j;
      return `<td class="num pv-cell seq-bg-${bucket(cell.value)}${sel ? ' is-selected' : ''}" data-cell="${i},${j}" ${cell.value ? 'tabindex="0" role="button"' : ''} title="${esc(r.label)} × ${esc(pv.cols[j].label)}: ${cell.value}">${cell.value || ''}</td>`;
    }).join('')}<td class="num"><strong>${r.total}</strong></td></tr>`).join('');
    let drill = '<p class="muted">Click a cell to drill through to its findings.</p>';
    if (state.pivot.cell) {
      const [i, j] = state.pivot.cell;
      const cell = pv.grid[i]?.[j];
      if (cell) {
        const nodes = new Map(bia.levels.finding.map((n) => [n.id, n]));
        drill = `<h3 class="panel-title">${esc(pv.rows[i].label)} × ${esc(pv.cols[j].label)} — ${cell.finding_ids.length} findings</h3>
          <div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Id</th><th>Finding</th><th>Type</th><th>Score</th></tr></thead><tbody>${cell.finding_ids.map((id) => nodes.get(id)).filter(Boolean).sort((a, b) => b.score - a.score).map((n) => `<tr class="clickable" data-focus="${esc(n.id)}"><td class="nowrap">${esc(n.id)}</td><td>${esc(n.name)}</td><td>${esc(KIND_LABEL[n.type] || n.type)}</td><td>${scoreChip(n.score)}</td></tr>`).join('')}</tbody></table></div>`;
      }
    }
    body.innerHTML = `<div class="bia-toolbar">
        <label>Rows<select data-pivot="row">${Object.entries(PIVOT_DIMENSIONS).map(([k, v]) => option(k, v, k === state.pivot.row)).join('')}</select></label>
        <label>Columns<select data-pivot="col">${Object.entries(PIVOT_DIMENSIONS).map(([k, v]) => option(k, v, k === state.pivot.col)).join('')}</select></label>
        <label>Measure<select data-pivot="measure">${Object.entries(PIVOT_MEASURES).map(([k, v]) => option(k, v, k === state.pivot.measure)).join('')}</select></label>
        <button type="button" class="btn" data-action="swap-pivot">Swap axes</button>
      </div>
      <section class="panel"><div class="biz-table-wrap pivot-wrap"><table class="biz-table pivot-table"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
      <p class="biz-figure-note">Counts open findings on every SLO → policy → process → component → scenario path, so one finding appears in every cell it reaches (many-to-many); totals count each finding once. Shading is a single-hue scale of the cell value.</p></section>
      <section class="panel">${drill}</section>`;
  }

  // ---------------------------------------------------------------- render
  function render() {
    compute();
    renderTabs();
    renderSide();
    if (state.tab === 'impact') renderImpact();
    else if (state.tab === 'explorer') renderExplorer();
    else if (state.tab === 'timeline') renderTimeline();
    else renderPivot();
    syncHash();
  }

  function setFocus(id, { tab } = {}) {
    state.focus = state.focus === id && !tab ? null : id;
    if (tab) state.tab = tab;
    render();
    if (tab === 'explorer') body.querySelector('.bia-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  body.addEventListener('click', (e) => {
    const t = e.target;
    const node = t.closest?.('[data-node]');
    if (node) { setFocus(node.dataset.node); return; }
    const focus = t.closest?.('[data-focus]');
    if (focus) { setFocus(focus.dataset.focus, { tab: 'explorer' }); return; }
    const slo = t.closest?.('[data-slo]');
    if (slo) { state.selectedSlo = slo.dataset.slo; render(); return; }
    const drill = t.closest?.('[data-drill]');
    if (drill) { state.focus = drill.dataset.drill; state.tab = 'explorer'; render(); return; }
    const openSlo = t.closest?.('[data-open-slo]');
    if (openSlo) { state.selectedSlo = openSlo.dataset.openSlo; state.tab = 'impact'; render(); return; }
    const exp = t.closest?.('[data-expand]');
    if (exp) {
      const k = exp.dataset.expand;
      if (state.expanded.has(k)) state.expanded.delete(k); else state.expanded.add(k);
      render();
      return;
    }
    const cell = t.closest?.('[data-cell]');
    if (cell && cell.textContent.trim()) { state.pivot.cell = cell.dataset.cell.split(',').map(Number); render(); return; }
    const a = t.dataset?.action;
    if (a === 'clear-focus') { state.focus = null; render(); }
    if (a === 'swap-pivot') { [state.pivot.row, state.pivot.col] = [state.pivot.col, state.pivot.row]; state.pivot.cell = null; render(); }
  });
  body.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target.closest?.('[data-focus], [data-slo], [data-cell]');
    if (!el || el.tagName === 'BUTTON' || el.tagName === 'TR') return;
    e.preventDefault();
    el.click();
  });
  body.addEventListener('change', (e) => {
    const a = e.target?.dataset?.action;
    if (a === 'only-connected') { state.onlyConnected = e.target.checked; render(); }
    if (a === 'min-band') { state.minBand = e.target.value; render(); }
    if (a === 'include-closed') { state.includeClosed = e.target.checked; render(); }
    const pv = e.target?.dataset?.pivot;
    if (pv) { state.pivot[pv] = e.target.value; state.pivot.cell = null; render(); }
  });
  let searchTimer = null;
  body.addEventListener('input', (e) => {
    if (e.target?.dataset?.action !== 'search') return;
    clearTimeout(searchTimer);
    const value = e.target.value;
    searchTimer = setTimeout(() => {
      state.search = value;
      render();
      const input = body.querySelector('[data-action="search"]');
      if (input) { input.focus(); input.setSelectionRange(value.length, value.length); }
    }, 180);
  });
  let resizeTimer = null;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (current) renderSide();
      if (state.tab === 'explorer') drawLinks();
    }, 120);
  };
  window.addEventListener('resize', onResize);

  // ---------------------------------------------------------------- exports
  pdfBtn.addEventListener('click', async () => {
    pdfBtn.disabled = true;
    try {
      const { blob, pageCount } = await generateBiaPdf(ctx, current.bia, { impacts: current.impacts, rankSloId: state.rankSlo, baseline: current.baseline });
      downloadBlob(blob, `${slug(ctx)}-bia-slo-impact.pdf`);
      showToast({ type: 'success', title: 'BIA report exported', detail: `${pageCount} page(s), watermarked.` });
    } catch (err) {
      showError('PDF export failed', err);
    } finally {
      pdfBtn.disabled = false;
    }
  });
  jsonBtn.addEventListener('click', () => {
    const { bia } = current;
    const payload = {
      organization: ctx.organization.name, synthetic: !!ctx.synthetic, as_of: bia.as_of, generated_by: 'IRTriage console — BIA module',
      filters: bia.filters, mitigations_applied: bia.headline.mitigations_applied, headline: bia.headline,
      slos: bia.slos.map(({ slo, ...r }) => ({ ...r, name: slo.name, unit: slo.unit, target: slo.target, forecast: slo.forecast })),
      levels: bia.levels,
      mitigations: current.impacts.map((m) => ({ id: m.mitigation.id, title: m.mitigation.title, applied: m.applied, cost_usd: m.mitigation.cost_usd, reduction_by_slo: m.reduction_by_slo })),
    };
    downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), `${slug(ctx)}-bia.json`);
  });
  csvBtn.addEventListener('click', () => {
    const lines = [stringifyCsvRow(['level', 'level_name', 'id', 'name', 'score', 'band', 'detail'])];
    for (const l of LEVELS) for (const n of current.bia.levels[l.key]) {
      const detail = n.level === 1 ? `${n.status}; shortfall ${n.loss_usd}` : n.probability != null ? `p=${n.probability}` : n.type || n.kind || '';
      lines.push(stringifyCsvRow([l.n, l.label, n.id, n.name, n.score, n.band, detail]));
    }
    downloadBlob(new Blob([`﻿${lines.join('\r\n')}\r\n`], { type: 'text/csv' }), `${slug(ctx)}-bia-nodes.csv`);
  });

  renderFilters();
  render();
  const unsubs = [
    store.subscribeSelector((s) => s.biaMitigations, () => render()),
    store.subscribeSelector((s) => s.whatIf, () => render()),
    store.subscribeSelector((s) => s.businessContext, (c) => {
      if (!c || !Array.isArray(c.slos)) return;
      ctx = c;
      for (const m of Object.values(caches)) m.clear();
      renderFilters();
      render();
    }),
  ];
  return {
    unmount() {
      for (const u of unsubs) u();
      window.removeEventListener('resize', onResize);
    },
  };
}

function slug(ctx) {
  return String(ctx?.organization?.name || 'organisation').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + `-${ctx?.as_of || ''}`;
}

