// Step 1 — Triage: every data source the analysis rests on.
//
// End-points, servers, cloud services, SaaS & APIs, network devices,
// peripherals/IoT, security controls, CI/CD & AI, darknet monitoring and
// operational/security audit logs. Folds in the old Estate inventory view.
//
// For each asset or data source: its metadata, triage status, the business
// services and BIA components it supports, its findings (with MITRE ATT&CK /
// OWASP references) and — computed live by business/bia.js — how much of each
// SLO's cyber shortfall traces back to it. Adding a data source "triages" it
// and the dashboard reflects it immediately: that is the demo's thread from a
// single asset to the board-level SLOs.

import { computeBia, assetImpact, mitigationImpacts, rootCausePath } from '../business/bia.js';
import { scoreChip } from '../business/bia-charts.js';
import { esc } from '../business/charts.js';
import { formatUsdShort } from '../business/engine.js';
import { ensureBusinessContext, mockBanner } from '../business/data.js';
import { brandMark, topBrands, frameworkBrand } from '../business/brands.js';
import { DATA_SOURCE_TYPES, POSTURE_CHECKS, DEMO_DATA_SOURCE, addDataSource, removeDataSource } from '../business/context-edit.js';
import { icon } from '../ui/icons.js';
import { showError, showToast } from '../ui/toast.js';

export const CATEGORIES = [
  { id: 'endpoint', label: 'Endpoints', classes: ['endpoint'], icon: 'endpoint' },
  { id: 'server', label: 'Servers', classes: ['server'], icon: 'server' },
  { id: 'cloud', label: 'Cloud services', classes: ['cloud_resource'], icon: 'cloud' },
  { id: 'saas', label: 'SaaS & APIs', classes: ['saas', 'api'], icon: 'api' },
  { id: 'network', label: 'Network devices', classes: ['network_device'], icon: 'network' },
  { id: 'iot', label: 'Peripherals & IoT', classes: ['peripheral_iot'], icon: 'iot' },
  { id: 'security', label: 'Security controls', classes: ['security_control'], icon: 'shield' },
  { id: 'cicd', label: 'CI/CD & AI', classes: ['cicd', 'ai_system'], icon: 'cicd' },
  { id: 'darknet', label: 'Darknet', classes: ['darknet'], icon: 'darknet' },
  { id: 'logs', label: 'Audit & security logs', classes: ['audit_log'], icon: 'log' },
];
const CLASS_LABEL = {
  endpoint: 'Endpoint', server: 'Server', cloud_resource: 'Cloud service', saas: 'SaaS', api: 'API', network_device: 'Network device',
  peripheral_iot: 'Peripheral / IoT', security_control: 'Security control', cicd: 'CI/CD', ai_system: 'AI system', darknet: 'Darknet monitoring', audit_log: 'Audit log',
};
const ACTIVE = new Set(['open', 'in_progress', 'accepted']);
const PAGE = 60;

function option(value, label, selected) {
  return `<option value="${esc(value)}"${selected ? ' selected' : ''}>${esc(label)}</option>`;
}

function parseHash() {
  const parts = (location.hash || '').replace(/^#\/?/, '').split('/');
  return parts[1] ? decodeURIComponent(parts[1]) : null;
}

export async function mount(container, { store }) {
  container.classList.add('bia-view', 'triage-view');
  const header = document.createElement('div');
  header.className = 'bia-head';
  header.innerHTML = `<div class="bia-title"><h1>Triage</h1><span class="muted bia-sub">Data sources and assets: what is collected, its status, and what it means for the business.</span></div>
    <div class="view-actions"><a class="btn btn-quiet" href="#/ingest">Upload IRTriage collection</a><button type="button" class="btn btn-primary" data-action="add-open">${icon('plus')} Add data source</button></div>`;
  container.appendChild(header);

  let ctx;
  try {
    ctx = await ensureBusinessContext(store);
  } catch (err) {
    showError('Could not load business context', err);
    return { unmount() {} };
  }

  if (ctx.synthetic) header.querySelector('.bia-title').insertAdjacentHTML('beforeend', `<span class="bia-mock" title="${esc(mockBanner(ctx).textContent)}">Mock data · ${esc(ctx.organization?.name || '')}</span>`);
  const addPanel = document.createElement('div');
  addPanel.className = 'bia-pop-panel add-source';
  addPanel.hidden = true;
  const root = document.createElement('div');
  root.className = 'bia-body';
  container.append(addPanel, root);

  const state = {
    cat: '', q: '', site: '', crit: '', triage: '', withFindings: false, sort: 'impact', limit: PAGE,
    selected: parseHash(), showFilters: false, sloId: 'SLO-ARR',
    form: null, running: null,
  };
  let cache = { key: '', bia: null };

  const mitigations = () => store.getState().biaMitigations || [];
  const whatIf = () => store.getState().whatIf || [];
  function biaNow() {
    const c = store.getState().businessContext;
    const key = JSON.stringify([c.id, c.revision || 0, whatIf(), mitigations()]);
    if (cache.key !== key) cache = { key, bia: computeBia(c, { remediated: whatIf(), mitigations: mitigations() }) };
    return cache.bia;
  }

  // ------------------------------------------------------------ helpers
  function assetStats(c, bia) {
    const open = new Map();
    for (const r of c.cyber_risks) {
      if (!ACTIVE.has(r.status) || whatIf().includes(r.id)) continue;
      for (const id of r.asset_ids) {
        if (!open.has(id)) open.set(id, []);
        open.get(id).push(r);
      }
    }
    const scoreOf = new Map(bia.levels.finding.filter((n) => n.kind === 'finding').map((n) => [n.id, n.score]));
    const slo = bia.slos.find((s) => s.id === state.sloId) || bia.slos[0];
    const impact = new Map(slo.by_asset.map((x) => [x.id, x.loss_usd]));
    return { open, scoreOf, impact, slo };
  }

  function triageChip(t) {
    const s = t?.status || 'not_collected';
    const map = { collected: ['status-good', '✓', 'Collected'], stale: ['status-warning', '!', 'Stale'], not_collected: ['status-critical', '✕', 'Not collected'] };
    const [cls, ic, label] = map[s] || map.not_collected;
    return `<span class="status-chip ${cls}"><span aria-hidden="true">${ic}</span> ${label}</span>`;
  }

  // ------------------------------------------------------------ main render
  function render() {
    const c = store.getState().businessContext;
    const bia = biaNow();
    const { open, scoreOf, impact, slo } = assetStats(c, bia);

    const tiles = CATEGORIES.map((cat) => {
      const list = c.assets.filter((a) => cat.classes.includes(a.class));
      const collected = list.filter((a) => a.triage?.status === 'collected').length;
      const nFind = list.reduce((s, a) => s + (open.get(a.id)?.length || 0), 0);
      const isNew = list.some((a) => a.added);
      const brands = topBrands(list, 3);
      return `<button type="button" class="src-tile${state.cat === cat.id ? ' is-on' : ''}" data-cat="${cat.id}" aria-pressed="${state.cat === cat.id}">
        <span class="src-ico">${icon(cat.icon)}</span>
        <span class="src-body"><span class="src-label">${esc(cat.label)}${isNew ? ' <span class="new-badge">new</span>' : ''}</span>
          <span class="src-count">${list.length}</span>
          <span class="src-meta">${list.length ? Math.round((100 * collected) / list.length) : 0}% triaged · ${nFind} findings</span>
          <span class="meter" aria-hidden="true"><span style="width:${list.length ? Math.round((100 * collected) / list.length) : 0}%"></span></span></span>
        <span class="src-brands">${brands.map((b) => brandMark(b)).join('')}</span>
      </button>`;
    }).join('');

    const cat = CATEGORIES.find((x) => x.id === state.cat);
    const q = state.q.toLowerCase();
    let rows = c.assets
      .filter((a) => !cat || cat.classes.includes(a.class))
      .filter((a) => !state.site || a.site === state.site)
      .filter((a) => !state.crit || a.criticality === state.crit)
      .filter((a) => !state.triage || a.triage?.status === state.triage)
      .filter((a) => !state.withFindings || open.has(a.id))
      .filter((a) => !q || `${a.id} ${a.name} ${a.product || ''} ${a.platform || ''} ${a.owner || ''} ${a.department || ''}`.toLowerCase().includes(q));
    const maxScore = (a) => (open.get(a.id) || []).reduce((m, r) => Math.max(m, scoreOf.get(r.id) || 0), 0);
    if (state.sort === 'impact') rows = rows.sort((a, b) => (impact.get(b.id) || 0) - (impact.get(a.id) || 0) || maxScore(b) - maxScore(a) || a.id.localeCompare(b.id));
    else if (state.sort === 'score') rows = rows.sort((a, b) => maxScore(b) - maxScore(a) || a.id.localeCompare(b.id));
    else rows = rows.sort((a, b) => a.name.localeCompare(b.name));
    const shown = rows.slice(0, state.limit);
    const maxImpact = Math.max(1, ...shown.map((a) => impact.get(a.id) || 0));

    const tableRows = shown.map((a) => {
      const f = open.get(a.id) || [];
      const ms = maxScore(a);
      const imp = impact.get(a.id) || 0;
      return `<tr class="clickable${a.id === state.selected ? ' is-selected' : ''}${a.added ? ' is-new' : ''}" data-asset="${esc(a.id)}">
        <td><div class="asset-cell">${brandMark(a.brand, { title: a.product || '' }) || `<span class="brand brand-sm brand-none">${icon(CATEGORIES.find((x) => x.classes.includes(a.class))?.icon || 'system')}</span>`}
          <div><div class="asset-name">${esc(a.name)}${a.added ? ' <span class="new-badge">new</span>' : ''}</div><div class="muted">${esc(a.product || CLASS_LABEL[a.class] || a.class)} · ${esc(a.id)}${a.internet_facing ? ' · internet-facing' : ''}</div></div></div></td>
        <td>${esc(CLASS_LABEL[a.class] || a.class)}</td>
        <td>${esc(a.site)}</td>
        <td><span class="crit crit-${esc(a.criticality)}">${esc(a.criticality)}</span></td>
        <td>${triageChip(a.triage)}</td>
        <td class="num">${f.length ? `${f.length} ${scoreChip(ms)}` : '<span class="muted">—</span>'}</td>
        <td class="num impact-cell">${imp ? `<span class="impact-bar"><span style="width:${Math.round((100 * imp) / maxImpact)}%"></span></span>${formatUsdShort(imp)}` : '<span class="muted">—</span>'}</td>
      </tr>`;
    }).join('');

    const sites = c.organization.sites || [];
    const activeFilters = [state.site && `Site: ${state.site}`, state.crit && `Criticality: ${state.crit}`, state.triage && `Triage: ${state.triage.replace('_', ' ')}`, state.withFindings && 'With findings'].filter(Boolean);
    const filters = `<div class="bia-pop-panel filter-row"${state.showFilters ? '' : ' hidden'}>
      <label>Site<select data-f="site">${option('', 'All', !state.site)}${[...sites.map((s) => [s.id, s.name]), ['CLOUD', 'Cloud'], ['SAAS', 'SaaS / feeds']].map(([v, l]) => option(v, l, state.site === v)).join('')}</select></label>
      <label>Criticality<select data-f="crit">${option('', 'Any', !state.crit)}${['critical', 'high', 'medium', 'low'].map((x) => option(x, x, state.crit === x)).join('')}</select></label>
      <label>Triage status<select data-f="triage">${option('', 'Any', !state.triage)}${['collected', 'stale', 'not_collected'].map((x) => option(x, x.replace('_', ' '), state.triage === x)).join('')}</select></label>
      <label class="inline-check"><input type="checkbox" data-f="withFindings" ${state.withFindings ? 'checked' : ''}> Only with open findings</label>
      <label>Impact measured on<select data-f="sloId">${bia.slos.map((s) => option(s.id, s.slo.name, s.id === state.sloId)).join('')}</select></label>
    </div>`;

    const detail = state.selected ? renderDetail(c, bia, open, scoreOf) : '';
    root.innerHTML = `<div class="src-grid">${tiles}</div>
      <div class="bia-toolbar">
        <input type="search" class="bia-find" data-f="q" placeholder="Find an asset…" aria-label="Find an asset" value="${esc(state.q)}">
        ${cat ? `<span class="focus-chip">${esc(cat.label)}<button type="button" data-action="clear-cat" aria-label="Show all categories">✕</button></span>` : ''}
        ${activeFilters.map((f) => `<span class="filter-chip">${esc(f)}</span>`).join('')}
        <span class="muted">${rows.length} of ${c.assets.length}</span>
        <span class="toolbar-gap"></span>
        <label class="sort-label">Sort<select data-f="sort">${option('impact', `Business impact (${slo.slo.name.split(' (')[0]})`, state.sort === 'impact')}${option('score', 'Highest finding score', state.sort === 'score')}${option('name', 'Name', state.sort === 'name')}</select></label>
        <button type="button" class="btn btn-quiet${state.showFilters ? ' is-on' : ''}" data-action="toggle-filters" aria-expanded="${state.showFilters}">Filters${activeFilters.length ? ` <span class="count">${activeFilters.length}</span>` : ''}</button>
      </div>
      ${filters}
      <div class="triage-layout${detail ? ' has-detail' : ''}">
        <div class="biz-table-wrap triage-table"><table class="biz-table"><thead><tr><th>Asset / data source</th><th>Type</th><th>Site</th><th>Criticality</th><th>Triage</th><th class="num">Findings</th><th class="num">Root-cause impact</th></tr></thead><tbody>${tableRows}</tbody></table>
          ${rows.length > shown.length ? `<p><button class="btn btn-quiet" type="button" data-action="more">Show ${Math.min(PAGE, rows.length - shown.length)} more of ${rows.length - shown.length}</button></p>` : ''}</div>
        ${detail}
      </div>`;
  }

  function renderDetail(c, bia, open, scoreOf) {
    const a = c.assets.find((x) => x.id === state.selected);
    if (!a) return '';
    const findings = c.cyber_risks.filter((r) => r.asset_ids.includes(a.id));
    const impacts = assetImpact(bia, a.id);
    const total = impacts.reduce((s, x) => s + x.loss_usd, 0);
    const comps = (c.bp_components || []).filter((cp) => (cp.asset_ids || []).includes(a.id) || (cp.asset_query && Object.entries(cp.asset_query).every(([k, v]) => a[k] === v)));
    const svc = (id) => c.business_services.find((s) => s.id === id)?.name || id;
    const fixed = new Set(whatIf());
    const applied = new Set(mitigations());
    const mits = (c.mitigations || []).filter((m) => m.finding_ids.some((f) => findings.some((x) => x.id === f)));
    const mitImpact = mits.length ? new Map(mitigationImpacts(c, { remediated: whatIf(), mitigations: mitigations() }, state.sloId).map((m) => [m.mitigation.id, m])) : new Map();
    const top = findings.filter((r) => ACTIVE.has(r.status)).sort((x, y) => (scoreOf.get(y.id) || 0) - (scoreOf.get(x.id) || 0))[0];
    const path = top ? rootCausePath(bia, c, top.id) : null;

    const refChips = (r) => (r.references || []).map((ref) => `<a class="ref-chip" href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer" title="${esc(ref.framework)}: ${esc(ref.name)}">${brandMark(frameworkBrand(ref.framework), { size: 'xs' })}${esc(ref.id)}</a>`).join('');
    const findingRows = findings.map((r) => {
      const active = ACTIVE.has(r.status);
      const score = scoreOf.get(r.id) || 0;
      return `<li class="finding-item${fixed.has(r.id) ? ' is-fixed' : ''}">
        <div class="finding-head">${active && !fixed.has(r.id) ? scoreChip(score) : '<span class="status-chip status-good"><span aria-hidden="true">✓</span> Fixed</span>'}<span class="finding-title">${esc(r.title)}</span></div>
        <div class="finding-meta"><span class="badge">${esc(r.type.replace('_', ' '))}</span><span class="muted">${esc(r.id)} · ${esc(r.source)} · since ${esc(r.first_seen)}</span>${refChips(r)}</div>
        ${active ? `<div class="finding-actions"><label class="inline-check"><input type="checkbox" data-fix="${esc(r.id)}" ${fixed.has(r.id) ? 'checked' : ''}> Remediated</label><span class="muted">${esc(r.remediation?.action || '')}</span></div>` : ''}
      </li>`;
    }).join('');
    const maxImp = Math.max(1, ...impacts.map((x) => x.loss_usd));
    return `<aside class="asset-detail" aria-label="Asset detail">
      <div class="asset-detail-head">${brandMark(a.brand, { title: a.product || '', size: 'lg' }) || `<span class="brand brand-lg brand-none">${icon(CATEGORIES.find((x) => x.classes.includes(a.class))?.icon || 'system')}</span>`}
        <div><h2>${esc(a.name)}${a.added ? ' <span class="new-badge">new</span>' : ''}</h2><div class="muted">${esc(a.product || CLASS_LABEL[a.class])} · ${esc(a.id)}</div></div>
        <button type="button" class="icon-btn" data-action="close-detail" aria-label="Close">${icon('close')}</button></div>
      <details class="fold" open><summary><span class="fold-title">Business impact</span><span class="fold-sum">${total ? `${formatUsdShort(total)} of SLO shortfall traces here` : 'no SLO shortfall traces here'}</span></summary><div class="fold-body">
        ${impacts.length ? `<table class="impact-table">${impacts.map((x) => `<tr><td>${esc(x.name)}</td><td class="impact-cell"><span class="impact-bar"><span style="width:${Math.round((100 * x.loss_usd) / maxImp)}%"></span></span></td><td class="num">${formatUsdShort(x.loss_usd)}</td><td class="num muted">${(x.share * 100).toFixed(1)}%</td></tr>`).join('')}</table>` : '<p class="muted">No open findings on this asset feed an SLO.</p>'}
        ${path ? `<div class="rc-chain-label muted">Strongest path to the board</div>${rootCauseChain(path, bia, c)}` : ''}
        ${top ? `<a class="btn btn-primary" href="#/bia/explorer/${esc(top.id)}">Root cause in the dashboard →</a>` : ''}
      </div></details>
      <details class="fold" open><summary><span class="fold-title">Findings</span><span class="fold-sum">${findings.filter((r) => ACTIVE.has(r.status) && !fixed.has(r.id)).length} open</span></summary><div class="fold-body"><ul class="finding-list">${findingRows || '<li class="muted">No findings.</li>'}</ul></div></details>
      ${mits.length ? `<details class="fold" open><summary><span class="fold-title">Mitigations</span><span class="fold-sum">${mits.length} proposed</span></summary><div class="fold-body">${mits.map((m) => {
        const im = mitImpact.get(m.id);
        return `<label class="sim-item${applied.has(m.id) ? ' is-applied' : ''}"><input type="checkbox" data-mit="${esc(m.id)}" ${applied.has(m.id) ? 'checked' : ''}><span class="sim-text"><strong>${esc(m.title)}</strong><span class="muted">${esc(m.id)} · ${formatUsdShort(m.cost_usd)} · ${m.eta_days} days · fixes ${m.finding_ids.length} findings</span></span><span class="sim-num">−${formatUsdShort(im?.reduction_usd || 0)}<span class="muted">${esc((c.slos.find((s) => s.id === state.sloId)?.name || '').split(' (')[0])}</span></span></label>`;
      }).join('')}</div></details>` : ''}
      <details class="fold"><summary><span class="fold-title">Metadata</span><span class="fold-sum">${esc(CLASS_LABEL[a.class])} · ${esc(a.criticality)}</span></summary><div class="fold-body"><dl class="kv-grid">
        <dt>Type</dt><dd>${esc(CLASS_LABEL[a.class])}${a.subtype ? ` · ${esc(a.subtype.replaceAll('_', ' '))}` : ''}</dd>
        ${a.product ? `<dt>Product</dt><dd>${esc(a.product)}</dd>` : ''}
        <dt>Owner</dt><dd>${esc(a.owner || '—')}</dd><dt>Site</dt><dd>${esc(a.site)}</dd><dt>Criticality</dt><dd>${esc(a.criticality)}</dd>
        ${a.platform ? `<dt>Platform</dt><dd>${esc(a.platform)}</dd>` : ''}${a.cloud ? `<dt>Cloud</dt><dd>${esc(a.cloud.toUpperCase())}${a.region ? ` · ${esc(a.region)}` : ''}</dd>` : ''}
        ${a.ip ? `<dt>Address</dt><dd class="mono">${esc(a.ip)}</dd>` : ''}<dt>Internet-facing</dt><dd>${a.internet_facing ? 'yes' : 'no'}</dd>
        ${a.edr != null ? `<dt>EDR</dt><dd>${a.edr ? 'covered' : 'not covered'}</dd>` : ''}
        ${a.department ? `<dt>Department</dt><dd>${esc(a.department)}</dd>` : ''}
      </dl></div></details>
      <details class="fold"><summary><span class="fold-title">Triage</span><span class="fold-sum">${esc((a.triage?.status || '').replace('_', ' '))}</span></summary><div class="fold-body"><dl class="kv-grid">
        <dt>Status</dt><dd>${triageChip(a.triage)}</dd><dt>Collector</dt><dd>${esc(a.triage?.collector || '—')}</dd><dt>Last collected</dt><dd>${esc(a.triage?.last_collected || 'never')}</dd>
      </dl>${a.class === 'endpoint' || a.class === 'server' ? '<a class="btn btn-quiet" href="#/ingest">Upload an IRTriage collection</a>' : ''}</div></details>
      <details class="fold"><summary><span class="fold-title">Business mapping</span><span class="fold-sum">${a.service_ids.length} services · ${comps.length} BIA components</span></summary><div class="fold-body">
        <div class="pill-list">${a.service_ids.map((s) => `<span class="badge">${esc(svc(s))}</span>`).join(' ')}</div>
        <div class="pill-list comp-links">${comps.map((cp) => `<a class="conn-chip" href="#/bia/explorer/${esc(cp.id)}">${icon(cp.category === 'people' ? 'people' : cp.category === 'data' ? 'data' : cp.category === 'process' ? 'process' : 'system')} ${esc(cp.name)}</a>`).join(' ')}</div>
      </div></details>
      ${a.added ? '<button type="button" class="btn btn-quiet danger-quiet" data-action="remove-source">Remove this data source</button>' : ''}
    </aside>`;
  }

  // ------------------------------------------------------------ add data source
  function blankForm() {
    return { type: 'server', name: '', site: 'BOS', owner: '', product: '', criticality: 'high', internet_facing: false, cloud: '', service_ids: [], component_ids: [], posture: [] };
  }

  function renderAdd() {
    if (!state.form) { addPanel.hidden = true; addPanel.innerHTML = ''; return; }
    addPanel.hidden = false;
    const c = store.getState().businessContext;
    const f = state.form;
    const type = DATA_SOURCE_TYPES.find((t) => t.id === f.type);
    if (state.running) {
      addPanel.innerHTML = `<div class="run-steps">${state.running.steps.map((s, i) => `<div class="run-step ${i < state.running.at ? 'done' : i === state.running.at ? 'doing' : ''}"><span class="run-dot" aria-hidden="true"></span>${esc(s)}</div>`).join('')}</div>`;
      return;
    }
    const comps = c.bp_components || [];
    addPanel.innerHTML = `<div class="add-head"><h2>Add a data source</h2><button type="button" class="btn btn-quiet" data-action="preset">Use demo preset: partner file-transfer gateway</button><button type="button" class="icon-btn" data-action="add-close" aria-label="Close">${icon('close')}</button></div>
      <div class="type-grid">${DATA_SOURCE_TYPES.map((t) => `<button type="button" class="type-card${t.id === f.type ? ' is-on' : ''}" data-type="${t.id}">${icon(t.icon)}<span>${esc(t.label)}</span></button>`).join('')}</div>
      <div class="add-form">
        <label>Name<input class="input" data-ff="name" value="${esc(f.name)}" placeholder="e.g. mft-gw01.acme.example"></label>
        <label>Product / vendor<input class="input" data-ff="product" value="${esc(f.product)}" placeholder="optional"></label>
        ${type.site ? `<label>Site<select data-ff="site">${(c.organization.sites || []).map((s) => option(s.id, s.name, f.site === s.id)).join('')}</select></label>` : `<label>Cloud / platform<select data-ff="cloud">${option('', 'SaaS / feed', !f.cloud)}${['aws', 'azure', 'gcp'].map((x) => option(x, x.toUpperCase(), f.cloud === x)).join('')}</select></label>`}
        <label>Owner<input class="input" data-ff="owner" value="${esc(f.owner)}" placeholder="team"></label>
        <label>Criticality<select data-ff="criticality">${['critical', 'high', 'medium', 'low'].map((x) => option(x, x, f.criticality === x)).join('')}</select></label>
        <label class="inline-check"><input type="checkbox" data-ff="internet_facing" ${f.internet_facing ? 'checked' : ''}> Internet-facing</label>
        <label class="span-2">Business services<select multiple size="4" data-ff="service_ids">${c.business_services.map((s) => option(s.id, s.name, f.service_ids.includes(s.id))).join('')}</select></label>
        <label class="span-2">Supports BIA components<select multiple size="4" data-ff="component_ids">${comps.map((cp) => option(cp.id, cp.name, f.component_ids.includes(cp.id))).join('')}</select></label>
      </div>
      <fieldset class="posture"><legend>What triage will find (posture checks)</legend>${POSTURE_CHECKS.map((p) => `<label class="inline-check"><input type="checkbox" data-posture="${p.id}" ${f.posture.includes(p.id) ? 'checked' : ''}> ${esc(p.label)} <span class="sev-dot sev-${p.severity}" aria-hidden="true"></span></label>`).join('')}</fieldset>
      <div class="view-actions"><span class="muted">Connector: ${esc(type.connector)}</span><button type="button" class="btn btn-primary" data-action="run">${icon('play')} Run triage &amp; add</button></div>`;
  }

  async function runAdd() {
    const f = { ...state.form };
    if (!f.name.trim()) { showToast({ type: 'error', title: 'Name the data source first' }); return; }
    const type = DATA_SOURCE_TYPES.find((t) => t.id === f.type);
    state.running = { at: 0, steps: [`Connecting via ${type.connector}`, 'Collecting configuration, inventory and logs', 'Checking posture and threat-intel feeds', `Analysing: ${f.posture.length} finding${f.posture.length === 1 ? '' : 's'}`, 'Linking to business services and BIA components'] };
    renderAdd();
    for (let i = 1; i <= state.running.steps.length; i++) {
      await new Promise((r) => setTimeout(r, 380));
      state.running.at = i;
      renderAdd();
    }
    try {
      const c = store.getState().businessContext;
      const before = computeBia(c, { remediated: whatIf(), mitigations: mitigations() }).slos.find((s) => s.id === 'SLO-ARR');
      const res = await addDataSource(c, f);
      store.set({ businessContext: res.ctx });
      const after = computeBia(res.ctx, { remediated: whatIf(), mitigations: mitigations() }).slos.find((s) => s.id === 'SLO-ARR');
      state.form = null;
      state.running = null;
      state.selected = res.asset.id;
      state.cat = '';
      state.sort = 'impact';
      renderAdd();
      render();
      history.replaceState(null, '', `#/triage/${encodeURIComponent(res.asset.id)}`);
      showToast({
        type: 'success',
        title: `${res.asset.name.split(' (')[0]} added — ${res.findings.length} findings`,
        detail: before && after ? `ARR shortfall ${formatUsdShort(before.loss_usd)} → ${formatUsdShort(after.loss_usd)} (score ${before.score} → ${after.score}).` : '',
      });
    } catch (err) {
      state.running = null;
      renderAdd();
      showError('Could not add the data source', err);
    }
  }

  // ------------------------------------------------------------ events
  header.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="add-open"]')) { state.form = state.form || blankForm(); renderAdd(); addPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
  });
  addPanel.addEventListener('click', (e) => {
    const t = e.target.closest('[data-type]');
    if (t) { state.form.type = t.dataset.type; renderAdd(); return; }
    const a = e.target.closest('[data-action]')?.dataset.action;
    if (a === 'add-close') { state.form = null; renderAdd(); }
    if (a === 'preset') { state.form = { ...blankForm(), ...DEMO_DATA_SOURCE, product: DEMO_DATA_SOURCE.product, posture: [...DEMO_DATA_SOURCE.posture], service_ids: [...DEMO_DATA_SOURCE.service_ids], component_ids: [...DEMO_DATA_SOURCE.component_ids] }; renderAdd(); }
    if (a === 'run') runAdd();
  });
  addPanel.addEventListener('change', (e) => {
    const k = e.target.dataset.ff;
    if (k) {
      if (e.target.type === 'checkbox') state.form[k] = e.target.checked;
      else if (e.target.multiple) state.form[k] = [...e.target.selectedOptions].map((o) => o.value);
      else state.form[k] = e.target.value;
      return;
    }
    const p = e.target.dataset.posture;
    if (p) {
      const set = new Set(state.form.posture);
      if (e.target.checked) set.add(p); else set.delete(p);
      state.form.posture = [...set];
    }
  });
  addPanel.addEventListener('input', (e) => {
    const k = e.target.dataset.ff;
    if (k && e.target.tagName === 'INPUT' && e.target.type !== 'checkbox') state.form[k] = e.target.value;
  });

  root.addEventListener('click', (e) => {
    const catBtn = e.target.closest('[data-cat]');
    if (catBtn) { state.cat = state.cat === catBtn.dataset.cat ? '' : catBtn.dataset.cat; state.limit = PAGE; render(); return; }
    const a = e.target.closest('[data-action]')?.dataset.action;
    if (a === 'clear-cat') { state.cat = ''; render(); return; }
    if (a === 'toggle-filters') { state.showFilters = !state.showFilters; render(); return; }
    if (a === 'more') { state.limit += PAGE; render(); return; }
    if (a === 'close-detail') { state.selected = null; history.replaceState(null, '', '#/triage'); render(); return; }
    if (a === 'remove-source') {
      const id = state.selected;
      store.set({ businessContext: removeDataSource(store.getState().businessContext, id) });
      state.selected = null;
      history.replaceState(null, '', '#/triage');
      showToast({ type: 'success', title: 'Data source removed', detail: 'The dashboard no longer counts its findings.' });
      return;
    }
    if (e.target.closest('input, label, a, select')) return;
    const row = e.target.closest('[data-asset]');
    if (row) {
      state.selected = row.dataset.asset === state.selected ? null : row.dataset.asset;
      history.replaceState(null, '', state.selected ? `#/triage/${encodeURIComponent(state.selected)}` : '#/triage');
      render();
      root.querySelector('.asset-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
  root.addEventListener('change', (e) => {
    const fix = e.target.dataset.fix;
    if (fix) {
      const set = new Set(whatIf());
      if (e.target.checked) set.add(fix); else set.delete(fix);
      store.set({ whatIf: [...set].sort() });
      return;
    }
    const mit = e.target.dataset.mit;
    if (mit) {
      const set = new Set(mitigations());
      if (e.target.checked) set.add(mit); else set.delete(mit);
      store.set({ biaMitigations: [...set].sort() });
      return;
    }
    const f = e.target.dataset.f;
    if (f && f !== 'q') {
      state[f] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      state.limit = PAGE;
      render();
    }
  });
  let qTimer = null;
  root.addEventListener('input', (e) => {
    if (e.target.dataset.f !== 'q') return;
    clearTimeout(qTimer);
    const v = e.target.value;
    qTimer = setTimeout(() => {
      state.q = v;
      state.limit = PAGE;
      render();
      const input = root.querySelector('input[data-f="q"]');
      input?.focus();
      input?.setSelectionRange(v.length, v.length);
    }, 160);
  });

  // The demo tour drives this view through these events.
  const onDemo = (e) => {
    const d = e.detail || {};
    if (d.action === 'open-add-preset') { state.form = { ...blankForm(), ...DEMO_DATA_SOURCE, posture: [...DEMO_DATA_SOURCE.posture], service_ids: [...DEMO_DATA_SOURCE.service_ids], component_ids: [...DEMO_DATA_SOURCE.component_ids] }; renderAdd(); }
    if (d.action === 'run-add') { if (!state.form) state.form = { ...blankForm(), ...DEMO_DATA_SOURCE, posture: [...DEMO_DATA_SOURCE.posture], service_ids: [...DEMO_DATA_SOURCE.service_ids], component_ids: [...DEMO_DATA_SOURCE.component_ids] }; runAdd(); }
    if (d.action === 'select-asset') { state.selected = d.id; state.cat = ''; render(); history.replaceState(null, '', `#/triage/${encodeURIComponent(d.id)}`); }
  };
  window.addEventListener('irtriage-demo', onDemo);

  render();
  const unsubs = [
    store.subscribeSelector((s) => s.businessContext, (c) => { if (c) render(); }),
    store.subscribeSelector((s) => s.whatIf, () => render()),
    store.subscribeSelector((s) => s.biaMitigations, () => render()),
  ];
  return { unmount() { for (const u of unsubs) u(); window.removeEventListener('irtriage-demo', onDemo); } };
}

/** asset ← finding → scenario → component → process → policy → SLO, as an icon chain. */
export function rootCauseChain(path, bia, ctx) {
  const name = (id) => ctx.assets.find((a) => a.id === id)?.name
    || ctx.cyber_risks.find((r) => r.id === id)?.title
    || ctx.risk_scenarios?.find((s) => s.id === id)?.name
    || ctx.bp_components?.find((c) => c.id === id)?.name
    || ctx.business_processes?.find((p) => p.id === id)?.name
    || ctx.bia_policies?.find((p) => p.id === id)?.title
    || ctx.slos?.find((s) => s.id === id)?.name || id;
  const steps = [
    ['Asset', path.asset_id, 'server', `#/triage/${path.asset_id}`],
    ['Finding', path.finding_id, 'alert', `#/bia/explorer/${path.finding_id}`],
    ['Scenario', path.scenario_id, 'target', `#/bia/explorer/${path.scenario_id}`],
    ['Component', path.component_id, 'system', `#/bia/explorer/${path.component_id}`],
    ['Process', path.process_id, 'process', `#/bia/explorer/${path.process_id}`],
    ['Policy', path.policy_id, 'policy', `#/bia/explorer/${path.policy_id}`],
    ['SLO', path.slo_id, 'growth', `#/bia/explorer/${path.slo_id}`],
  ].filter(([, id]) => id);
  return `<ol class="rc-chain">${steps.map(([k, id, ic, href]) => {
    const n = name(id);
    return `<li><a href="${esc(href)}" title="${esc(n)}">${icon(ic)}<span class="rc-kind">${k}</span><span class="rc-name">${esc(n.length > 34 ? `${n.slice(0, 33)}…` : n)}</span></a></li>`;
  }).join('')}</ol>`;
}

