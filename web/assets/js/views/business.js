// Layer 3 — Executive business-risk dashboard.
//
// Every number on this page comes from computeBusinessRisk() over the
// BusinessContext in the store (by default the ACME.Corp mock dataset). It is
// "live": filters and the What-if panel recompute everything immediately, and
// any future connector that refreshes store.businessContext re-renders it.

import { computeBusinessRisk, remediationPriorities, formatUsdShort, DIMENSIONS } from '../business/engine.js';
import {
  esc, figure, statusChip, STATUS_META, sparklineSvg, heatmapSvg, heatmapTable, varBarsSvg, varBarsTable,
  trendSvg, trendTable, complianceSvg, complianceTable, riskMatrixSvg, riskMatrixTable, kpiHealthSvg,
} from '../business/charts.js';
import { ensureBusinessContext, mockBanner, downloadBlob } from '../business/data.js';
import { generateExecutivePdf } from '../business/pdf.js';
import { stringifyCsvRow } from '../lib/csv.js';
import { showError, showToast } from '../ui/toast.js';

function pct(v, d = 0) {
  return `${((v || 0) * 100).toFixed(d)}%`;
}

function signedUsd(v) {
  if (!v) return '±$0';
  return `${v < 0 ? '−' : '+'}${formatUsdShort(Math.abs(v))}`;
}

function option(value, label, selected) {
  return `<option value="${esc(value)}"${selected ? ' selected' : ''}>${esc(label)}</option>`;
}

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <div class="layer-tag">Layer 3 · Business risks</div>
      <h1>Executive risk dashboard</h1>
      <div class="view-subtitle">Cyber risk translated into impact on business goals, KPIs, SLAs and compliance.</div>
    </div>`;
  const actions = document.createElement('div');
  actions.className = 'view-actions';
  const pdfBtn = Object.assign(document.createElement('button'), { className: 'btn btn-primary', textContent: 'Export PDF' });
  const jsonBtn = Object.assign(document.createElement('button'), { className: 'btn', textContent: 'Export JSON' });
  const csvBtn = Object.assign(document.createElement('button'), { className: 'btn', textContent: 'Export CSV' });
  const printBtn = Object.assign(document.createElement('button'), { className: 'btn', textContent: 'Print' });
  actions.append(pdfBtn, jsonBtn, csvBtn, printBtn);
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

  const banner = mockBanner(ctx);
  container.appendChild(banner);

  const filters = { site: '', cloud: '', service: '', framework: '' };
  const filterRow = document.createElement('div');
  filterRow.className = 'filter-row panel';
  container.appendChild(filterRow);

  const root = document.createElement('div');
  root.className = 'dash-root';
  container.appendChild(root);

  let current = { view: null, baseline: null, priorities: [] };
  const priorityCache = new Map();

  function renderFilters() {
    const c = store.getState().businessContext;
    const sites = c.organization.sites || [];
    const frameworks = [...new Set(c.controls.flatMap((x) => x.framework_refs.map((r) => r.framework)))].sort();
    filterRow.innerHTML = `
      <label>Site<select data-f="site">${option('', 'All sites', !filters.site)}${sites.map((s) => option(s.id, `${s.name} (${s.city})`, filters.site === s.id)).join('')}</select></label>
      <label>Cloud<select data-f="cloud">${option('', 'All / on-prem', !filters.cloud)}${['aws', 'azure', 'gcp'].map((x) => option(x, x.toUpperCase(), filters.cloud === x)).join('')}</select></label>
      <label>Business service<select data-f="service">${option('', 'All services', !filters.service)}${c.business_services.map((s) => option(s.id, s.name, filters.service === s.id)).join('')}</select></label>
      <label>Framework<select data-f="framework">${option('', 'All frameworks', !filters.framework)}${frameworks.map((f) => option(f, f, filters.framework === f)).join('')}</select></label>
      <button class="btn" data-action="reset-filters" type="button">Reset</button>`;
  }

  filterRow.addEventListener('change', (e) => {
    const f = e.target?.dataset?.f;
    if (!f) return;
    filters[f] = e.target.value;
    render();
  });
  filterRow.addEventListener('click', (e) => {
    if (e.target?.dataset?.action === 'reset-filters') {
      for (const k of Object.keys(filters)) filters[k] = '';
      renderFilters();
      render();
    }
  });

  function prioritiesFor(c) {
    const key = JSON.stringify({ id: c.id, as_of: c.as_of, site: filters.site, cloud: filters.cloud, service: filters.service });
    if (!priorityCache.has(key)) priorityCache.set(key, remediationPriorities(c, { filters: { site: filters.site, cloud: filters.cloud, service: filters.service } }));
    return priorityCache.get(key);
  }

  function tile(label, value, sub, tone = '') {
    return `<div class="tile ${tone}"><div class="tile-label">${esc(label)}</div><div class="tile-value">${value}</div><div class="tile-sub">${sub}</div></div>`;
  }

  function render() {
    const c = store.getState().businessContext;
    const whatIf = store.getState().whatIf || [];
    const f = { ...filters };
    for (const k of Object.keys(f)) if (!f[k]) delete f[k];
    const view = computeBusinessRisk(c, { remediated: whatIf, filters: f });
    const baseline = whatIf.length ? computeBusinessRisk(c, { filters: f }) : view;
    const priorities = prioritiesFor(c);
    current = { view, baseline, priorities };
    const hl = view.headline;
    const bl = baseline.headline;
    const appetite = c.organization.risk_appetite || {};

    const varDelta = hl.value_at_risk_usd - bl.value_at_risk_usd;
    const tiles = `<div class="tile-grid">
      ${tile('Annualised value at risk', formatUsdShort(hl.value_at_risk_usd), `Board appetite ${formatUsdShort(hl.appetite_usd)}${whatIf.length ? ` · scenario ${signedUsd(varDelta)}` : ''}`, hl.appetite_usd && hl.value_at_risk_usd > hl.appetite_usd ? 'tile-alert' : 'tile-ok')}
      ${tile('Business risk index', `${hl.risk_index}<span class="tile-sub"> / 100</span>`, 'Tier-weighted likelihood of a material event', hl.risk_index >= 50 ? 'tile-alert' : hl.risk_index >= 30 ? 'tile-warn' : 'tile-ok')}
      ${tile('KPIs & SLAs', `${hl.kpis_breached + hl.kpis_breach_projected}<span class="tile-sub"> / ${hl.kpis_total}</span>`, `${hl.kpis_breached} breached · ${hl.kpis_breach_projected} breach projected · ${hl.kpis_at_risk} at risk`, hl.kpis_breached > (appetite.max_kpis_breached ?? 99) ? 'tile-alert' : 'tile-warn')}
      ${tile('Services above appetite', `${hl.services_above_appetite}<span class="tile-sub"> / ${hl.services_total}</span>`, `Likelihood ceiling ${pct(appetite.max_service_likelihood)}`, hl.services_above_appetite ? 'tile-alert' : 'tile-ok')}
      ${tile('Compliance posture', pct(hl.compliance_avg), `Floor ${pct(hl.compliance_floor)} across ${view.compliance.length} frameworks`, hl.compliance_floor != null && hl.compliance_avg < hl.compliance_floor ? 'tile-alert' : 'tile-ok')}
      ${tile('Open cyber risks', String(hl.open_risks), `${hl.open_critical} critical · ${hl.active_threats} active threat indicators`, hl.open_critical ? 'tile-warn' : 'tile-ok')}
    </div>`;

    const goals = `<section class="panel"><h2 class="panel-title">FY2027 corporate goals at risk</h2><div class="goal-strip">${view.goals.map((g) => `
      <div class="goal"><div>${esc(g.goal.title)}</div><div class="goal-owner">${esc(g.goal.owner)} · ${esc(g.goal.horizon)}</div><div>${statusChip(g.status)}</div></div>`).join('')}</div></section>`;

    const riskById = new Map(c.cyber_risks.map((r) => [r.id, r]));
    const svcView = new Map(view.services.map((s) => [s.service.id, s]));
    const topRisks = `<section class="panel"><h2 class="panel-title">Top business risks</h2><div class="card-list">${view.business_risks.slice(0, 6).map((br) => {
      const s = svcView.get(br.service_id);
      const drivers = s.drivers.map((d) => {
        const r = riskById.get(d.risk_id);
        return `<tr><td><a href="#/cyber/${esc(r.id)}">${esc(r.id)}</a></td><td><span class="sev-dot sev-${esc(r.severity)}" aria-hidden="true"></span>${esc(r.title)}</td><td>${esc(r.type.replace('_', ' '))}</td><td class="num">${pct(d.contribution, 1)}</td></tr>`;
      }).join('');
      const kpis = s.kpis.filter((k) => k.status !== 'on_track').map((k) => `<li>${esc(k.kpi.name)} — ${k.kpi.current}${esc(k.kpi.unit)} → ${k.projected}${esc(k.kpi.unit)} (target ${k.kpi.target}${esc(k.kpi.unit)}) ${statusChip(k.status)}</li>`).join('');
      const goalsHit = br.goal_ids.map((id) => c.business_goals.find((g) => g.id === id)?.title).filter(Boolean);
      return `<article class="card card-sev-${esc(br.severity)}" id="br-${esc(br.service_id)}">
        <h3>${esc(br.title)}</h3>
        <p>${esc(br.statement)}</p>
        <div class="card-meta"><span>Owner: ${esc(s.service.owner)}</span><span>Tier ${s.service.tier}</span><span>Impact if it happens: ${formatUsdShort(s.impact.total_usd)}</span>${goalsHit.length ? `<span>Goals: ${esc(goalsHit.join('; '))}</span>` : ''}</div>
        <details><summary>Drill down: cyber risks, KPIs and impact breakdown</summary>
          <div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Risk</th><th>Finding</th><th>Type</th><th class="num">Contribution</th></tr></thead><tbody>${drivers}</tbody></table></div>
          ${kpis ? `<p><strong>KPIs/SLAs affected</strong></p><ul>${kpis}</ul>` : ''}
          <p><strong>Impact model</strong>: downtime ${formatUsdShort(s.impact.downtime_usd)} · SLA penalties ${formatUsdShort(s.impact.sla_penalty_usd)} · regulatory ${formatUsdShort(s.impact.regulatory_usd)} · recovery ${formatUsdShort(s.impact.recovery_usd)} · reputation ${formatUsdShort(s.impact.reputation_usd)}</p>
        </details>
      </article>`;
    }).join('')}</div></section>`;

    const matrix = figure('Risk matrix — likelihood vs. business impact', riskMatrixSvg(view.services, appetite.max_service_likelihood), riskMatrixTable(view.services), { note: 'One dot per business service (larger = tier 1). Click a dot to open its business risk.' });
    const varItems = view.services.map((s) => ({ id: s.service.id, label: s.service.name, value: s.value_at_risk_usd, probability: s.probability, flag: s.above_appetite }));
    const bars = figure('Annualised value at risk by business service', varBarsSvg(varItems), varBarsTable(varItems), { note: 'Red bars (▲) exceed the board likelihood appetite.' });
    const kpiCounts = { breached: hl.kpis_breached, breach_projected: hl.kpis_breach_projected, at_risk: hl.kpis_at_risk, on_track: hl.kpis_total - hl.kpis_breached - hl.kpis_breach_projected - hl.kpis_at_risk };
    const health = figure('KPI / SLA health', kpiHealthSvg(kpiCounts), `<table><tbody>${Object.entries(kpiCounts).map(([k, v]) => `<tr><td>${esc(STATUS_META[k].label)}</td><td class="num">${v}</td></tr>`).join('')}</tbody></table>`);
    const compliance = figure('Compliance posture by framework', complianceSvg(view.compliance, hl.compliance_floor), complianceTable(view.compliance), { note: 'Control design and effectiveness, reduced by open cyber risks against those controls.' });
    const heat = figure('Where the risk lands — business service × risk dimension', heatmapSvg(view.heatmap, DIMENSIONS), heatmapTable(view.heatmap, DIMENSIONS), { wide: true });
    const trend = figure('Value at risk — last 12 months', trendSvg(view.trend, hl.appetite_usd), trendTable(view.trend), { note: 'Recomputed from each risk’s first-seen and closure dates.' });

    const kpiRows = view.kpis.map((k) => `<tr>
      <td>${esc(k.kpi.name)}${k.kpi.source?.type === 'generated' ? ' <span class="badge badge-ai" title="Proposed by the AI KPI generator because no KPI was supplied">AI-proposed</span>' : ''}<div class="muted">${esc(k.service.name)} · ${esc(k.kpi.kind.toUpperCase())} · ${esc(k.kpi.source?.system || '')}</div></td>
      <td class="num">${k.kpi.current} ${esc(k.kpi.unit)}</td>
      <td class="num">${k.kpi.target} ${esc(k.kpi.unit)}</td>
      <td class="num">${k.projected} ${esc(k.kpi.unit)}</td>
      <td>${sparklineSvg(k.kpi, k.projected)}</td>
      <td>${statusChip(k.status)}</td>
      <td class="muted">${k.driver_dimension ? esc(k.driver_dimension) : '—'}</td>
    </tr>`).join('');
    const kpiTable = `<section class="panel"><h2 class="panel-title">KPIs, SLOs and SLAs — current, target and projected</h2>
      <p class="biz-figure-note">Projected = value if the service’s current cyber risk materialises (pressure in the KPI’s sensitive dimension × its degradation at full risk). Sparkline: 12 months, dashed line = target, hollow dot = projection.</p>
      <div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>KPI / SLA</th><th class="num">Current</th><th class="num">Target</th><th class="num">Projected</th><th>Trend</th><th>Status</th><th>Driver</th></tr></thead><tbody>${kpiRows}</tbody></table></div></section>`;

    const chosen = new Set(whatIf);
    const scenarioLine = whatIf.length
      ? `<p class="whatif-delta">Scenario: ${whatIf.length} fixed → value at risk ${formatUsdShort(hl.value_at_risk_usd)} (${signedUsd(varDelta)}), KPIs breached/projected ${hl.kpis_breached + hl.kpis_breach_projected} (was ${bl.kpis_breached + bl.kpis_breach_projected}), risk index ${hl.risk_index} (was ${bl.risk_index}).</p>`
      : '<p class="biz-figure-note">Tick cyber risks to see the business effect of fixing them. Ordered by how much value at risk each fix removes on its own.</p>';
    const whatIfPanel = `<section class="panel whatif-panel"><h2 class="panel-title">What-if: remediation scenario</h2>${scenarioLine}
      <div class="view-actions" style="margin-bottom:8px"><button class="btn" type="button" data-action="fix-top">Fix top 5</button><button class="btn" type="button" data-action="clear-whatif">Clear</button></div>
      <div class="whatif-list">${priorities.slice(0, 25).map((p) => `<label class="whatif-item">
        <input type="checkbox" data-risk="${esc(p.risk.id)}" ${chosen.has(p.risk.id) ? 'checked' : ''}>
        <span><strong>${esc(p.risk.id)}</strong> ${esc(p.risk.title)}<br><span class="muted">${esc(p.risk.remediation?.action || '')} · ${formatUsdShort(p.cost_usd)} · ${p.risk.remediation?.eta_days ?? '?'} days</span></span>
        <span class="num">−${formatUsdShort(p.var_reduction_usd)}</span></label>`).join('')}</div></section>`;

    const method = `<details class="panel method"><summary><strong>How this is calculated</strong></summary>
      <dl>
        <dt>Cyber-risk likelihood</dt><dd>Severity base × exploitability (known-exploited 1.5, proof-of-concept 1.1, theoretical 0.75) × internet exposure (1.35) × active threat for IOC/IOA findings (1.5), reduced by up to 50% by the effectiveness of mapped controls.</dd>
        <dt>Service likelihood</dt><dd>1 − Π(1 − likelihood × asset criticality) over open risks on the service’s assets, plus dependencies at 35% weight (e.g. identity risk flows into every service that relies on SSO).</dd>
        <dt>Impact</dt><dd>From the BIA: downtime cost/hour × expected outage + contractual SLA penalties + regulatory, recovery and reputational exposure.</dd>
        <dt>Value at risk</dt><dd>Service likelihood × impact, summed across services and compared with the board-approved appetite.</dd>
        <dt>KPI projection</dt><dd>Current value moved by the KPI’s degradation-at-full-risk × the service likelihood in the dimension the KPI is sensitive to.</dd>
        <dt>Compliance posture</dt><dd>Control status × effectiveness per framework, minus a penalty for each open cyber risk against those controls.</dd>
      </dl></details>`;

    root.innerHTML = `${tiles}${goals}
      <div class="dash-grid">
        <div class="span-7">${topRisks}</div>
        <div class="span-5">${matrix}</div>
        <div class="span-7">${bars}</div>
        <div class="span-5">${health}${compliance}</div>
        <div class="span-12">${heat}</div>
        <div class="span-12">${kpiTable}</div>
        <div class="span-7">${trend}</div>
        <div class="span-5">${whatIfPanel}</div>
        <div class="span-12">${method}</div>
      </div>`;
  }

  root.addEventListener('change', (e) => {
    const id = e.target?.dataset?.risk;
    if (!id) return;
    const set = new Set(store.getState().whatIf || []);
    if (e.target.checked) set.add(id);
    else set.delete(id);
    store.set({ whatIf: [...set].sort() });
  });
  root.addEventListener('click', (e) => {
    const action = e.target?.dataset?.action;
    if (action === 'fix-top') store.set({ whatIf: current.priorities.slice(0, 5).map((p) => p.risk.id).sort() });
    if (action === 'clear-whatif') store.set({ whatIf: [] });
    const pt = e.target.closest?.('.matrix-pt, .bar-row');
    if (pt?.dataset?.service) openRisk(pt.dataset.service);
  });
  root.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const pt = e.target.closest?.('.matrix-pt');
    if (pt?.dataset?.service) { e.preventDefault(); openRisk(pt.dataset.service); }
  });
  function openRisk(serviceId) {
    const card = root.querySelector(`#br-${CSS.escape(serviceId)}`);
    if (!card) return;
    card.querySelector('details')?.setAttribute('open', '');
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  pdfBtn.addEventListener('click', async () => {
    pdfBtn.disabled = true;
    try {
      const c = store.getState().businessContext;
      const { blob, pageCount } = await generateExecutivePdf(c, current.view, { priorities: current.priorities });
      downloadBlob(blob, `${slug(c)}-executive-risk-report.pdf`);
      showToast({ type: 'success', title: 'Executive report exported', detail: `${pageCount} page(s), watermarked.` });
    } catch (err) {
      showError('PDF export failed', err);
    } finally {
      pdfBtn.disabled = false;
    }
  });
  jsonBtn.addEventListener('click', () => {
    const c = store.getState().businessContext;
    const payload = { organization: c.organization.name, synthetic: !!c.synthetic, as_of: c.as_of, generated_by: 'IRTriage console — business-risk module', view: current.view };
    downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), `${slug(c)}-business-risk.json`);
  });
  csvBtn.addEventListener('click', () => {
    const c = store.getState().businessContext;
    const lines = [stringifyCsvRow(['section', 'service', 'item', 'current', 'target', 'projected', 'status', 'likelihood', 'value_at_risk_usd'])];
    for (const s of current.view.services) lines.push(stringifyCsvRow(['service', s.service.name, '', '', '', '', s.above_appetite ? 'above_appetite' : 'within_appetite', s.probability, s.value_at_risk_usd]));
    for (const k of current.view.kpis) lines.push(stringifyCsvRow(['kpi', k.service.name, k.kpi.name, k.kpi.current, k.kpi.target, k.projected, k.status, k.pressure, '']));
    for (const br of current.view.business_risks) lines.push(stringifyCsvRow(['business_risk', br.service_id, br.title, '', '', '', br.severity, br.probability, br.value_at_risk_usd]));
    downloadBlob(new Blob([`﻿${lines.join('\r\n')}\r\n`], { type: 'text/csv' }), `${slug(c)}-business-risk.csv`);
  });
  printBtn.addEventListener('click', () => window.print());

  renderFilters();
  render();
  const unsub = store.subscribeSelector((s) => s.whatIf, () => render());
  const unsubCtx = store.subscribeSelector((s) => s.businessContext, (c) => {
    if (!c) return;
    priorityCache.clear();
    renderFilters();
    render();
  });
  return {
    unmount() {
      unsub();
      unsubCtx();
    },
  };
}

function slug(ctx) {
  return String(ctx?.organization?.name || 'organisation').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + `-${ctx?.as_of || ''}`;
}
