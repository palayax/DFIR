// Layer 1 — Estate inventory (triage coverage).
//
// Every asset class the triage layer covers: endpoints and servers (IRTriage
// collections), cloud resources, SaaS, CI/CD, network devices, peripherals/IoT,
// security controls and AI systems. Each asset is mapped to the business
// services it supports — that mapping is what lets a cyber finding on an asset
// become a business risk in layer 3.

import { esc } from '../business/charts.js';
import { ensureBusinessContext, mockBanner } from '../business/data.js';
import { showError } from '../ui/toast.js';

const CLASS_LABEL = {
  endpoint: 'Endpoints',
  server: 'Servers',
  cloud_resource: 'Cloud resources',
  saas: 'SaaS applications',
  cicd: 'CI/CD pipeline',
  network_device: 'Network devices',
  peripheral_iot: 'Peripherals & IoT',
  security_control: 'Security controls',
  ai_system: 'AI systems',
};
const PAGE = 150;

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <div class="layer-tag">Layer 1 · Ingested data</div>
      <h1>Estate inventory &amp; triage coverage</h1>
      <div class="view-subtitle">End-points, servers, cloud, SaaS, CI/CD, network, peripherals, security controls and AI systems — and the business services each one supports.</div>
    </div>
    <div class="view-actions"><a class="btn" href="#/ingest">Add IRTriage collections</a><a class="btn" href="#/context">Business context →</a></div>`;
  container.appendChild(header);

  let ctx;
  try {
    ctx = await ensureBusinessContext(store);
  } catch (err) {
    showError('Could not load business context', err);
    return { unmount() {} };
  }
  container.appendChild(mockBanner(ctx));

  const root = document.createElement('div');
  root.className = 'layer-root';
  container.appendChild(root);

  const state = { cls: '', site: '', service: '', triage: '', q: '', limit: PAGE };

  function render() {
    const c = store.getState().businessContext;
    const assets = c.assets;
    const svcName = new Map(c.business_services.map((s) => [s.id, s.name]));
    const openByAsset = new Map();
    for (const r of c.cyber_risks) {
      if (!['open', 'in_progress', 'accepted'].includes(r.status)) continue;
      for (const id of r.asset_ids) openByAsset.set(id, (openByAsset.get(id) || 0) + 1);
    }

    const classes = Object.keys(CLASS_LABEL).map((k) => {
      const list = assets.filter((a) => a.class === k);
      const collected = list.filter((a) => a.triage?.status === 'collected').length;
      return { k, n: list.length, cov: list.length ? collected / list.length : 0 };
    });
    const classTiles = `<section class="panel"><h2 class="panel-title">${assets.length} assets across ${c.organization.sites.length} sites and 3 clouds</h2><div class="class-grid">${classes.map((x) => `
      <button type="button" class="class-tile" data-cls="${x.k}" aria-pressed="${state.cls === x.k}">
        <div class="tile-label">${esc(CLASS_LABEL[x.k])}</div><div class="tile-value">${x.n}</div>
        <div class="tile-sub">${Math.round(x.cov * 100)}% triaged</div><div class="meter" aria-hidden="true"><span style="width:${Math.round(x.cov * 100)}%"></span></div>
      </button>`).join('')}</div></section>`;

    const sites = c.organization.sites;
    const siteRows = sites.map((s) => {
      const list = assets.filter((a) => a.site === s.id);
      const ep = list.filter((a) => a.class === 'endpoint');
      const edr = ep.filter((a) => a.edr).length;
      return `<tr><td>${esc(s.name)}</td><td>${esc(s.city)}</td><td class="num">${s.employees}</td><td class="num">${list.length}</td><td class="num">${ep.length ? Math.round((edr / ep.length) * 100) : '—'}%</td><td class="num">${list.filter((a) => a.triage?.status === 'collected').length}</td><td class="muted">${esc(s.role)}</td></tr>`;
    }).join('');
    const siteTable = `<section class="panel"><h2 class="panel-title">Sites</h2><div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Site</th><th>Location</th><th class="num">Staff</th><th class="num">Assets</th><th class="num">EDR coverage</th><th class="num">Triaged</th><th>Role</th></tr></thead><tbody>${siteRows}</tbody></table></div></section>`;

    const opt = (v, l, cur) => `<option value="${esc(v)}"${cur === v ? ' selected' : ''}>${esc(l)}</option>`;
    const filters = `<div class="filter-row panel">
      <label>Search<input class="input" type="search" data-f="q" value="${esc(state.q)}" placeholder="name, platform, owner"></label>
      <label>Class<select data-f="cls">${opt('', 'All classes', state.cls)}${Object.entries(CLASS_LABEL).map(([k, l]) => opt(k, l, state.cls)).join('')}</select></label>
      <label>Site<select data-f="site">${opt('', 'All', state.site)}${[...sites.map((s) => [s.id, s.name]), ['CLOUD', 'Cloud'], ['SAAS', 'SaaS']].map(([v, l]) => opt(v, l, state.site)).join('')}</select></label>
      <label>Business service<select data-f="service">${opt('', 'All', state.service)}${c.business_services.map((s) => opt(s.id, s.name, state.service)).join('')}</select></label>
      <label>Triage status<select data-f="triage">${opt('', 'Any', state.triage)}${['collected', 'stale', 'not_collected'].map((s) => opt(s, s.replace('_', ' '), state.triage)).join('')}</select></label>
    </div>`;

    const rows = assets
      .filter((a) => !state.cls || a.class === state.cls)
      .filter((a) => !state.site || a.site === state.site)
      .filter((a) => !state.service || a.service_ids.includes(state.service))
      .filter((a) => !state.triage || a.triage?.status === state.triage)
      .filter((a) => !state.q || `${a.id} ${a.name} ${a.platform || ''} ${a.owner || ''} ${a.department || ''}`.toLowerCase().includes(state.q.toLowerCase()));
    const shown = rows.slice(0, state.limit);
    const table = `<section class="panel"><h2 class="panel-title">${rows.length} asset${rows.length === 1 ? '' : 's'}</h2><div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Asset</th><th>Class</th><th>Site</th><th>Platform / cloud</th><th>Criticality</th><th>Business services</th><th class="num">Open risks</th><th>Triage</th></tr></thead><tbody>${shown.map((a) => `<tr>
      <td>${esc(a.name)}<div class="muted">${esc(a.id)}${a.internet_facing ? ' · internet-facing' : ''}${a.edr === false ? ' · no EDR' : ''}</div></td>
      <td>${esc(CLASS_LABEL[a.class] || a.class)}${a.subtype ? `<div class="muted">${esc(a.subtype.replace('_', ' '))}</div>` : ''}</td>
      <td>${esc(a.site)}</td>
      <td>${esc(a.platform || (a.cloud ? a.cloud.toUpperCase() : '—'))}</td>
      <td>${esc(a.criticality)}</td>
      <td class="muted">${esc(a.service_ids.map((s) => svcName.get(s)?.split(' (')[0]).join(', '))}</td>
      <td class="num">${openByAsset.get(a.id) || 0}</td>
      <td>${esc((a.triage?.status || '').replace('_', ' '))}<div class="muted">${esc(a.triage?.collector || '')}${a.triage?.last_collected ? ` · ${esc(a.triage.last_collected)}` : ''}</div></td>
    </tr>`).join('')}</tbody></table></div>${rows.length > shown.length ? `<p><button class="btn" type="button" data-more>Show ${Math.min(PAGE, rows.length - shown.length)} more (${rows.length - shown.length} hidden)</button></p>` : ''}</section>`;

    root.innerHTML = classTiles + siteTable + filters + table;
  }

  root.addEventListener('click', (e) => {
    const t = e.target.closest?.('[data-cls]');
    if (t && t.tagName === 'BUTTON') { state.cls = state.cls === t.dataset.cls ? '' : t.dataset.cls; state.limit = PAGE; render(); return; }
    if (e.target.closest?.('[data-more]')) { state.limit += PAGE; render(); }
  });
  root.addEventListener('change', (e) => {
    const f = e.target?.dataset?.f;
    if (f && f !== 'q') { state[f] = e.target.value; state.limit = PAGE; render(); }
  });
  root.addEventListener('input', (e) => {
    if (e.target?.dataset?.f === 'q') {
      state.q = e.target.value;
      state.limit = PAGE;
      const pos = e.target.selectionStart;
      render();
      const input = root.querySelector('input[data-f="q"]');
      input?.focus();
      input?.setSelectionRange(pos, pos);
    }
  });

  render();
  const unsub = store.subscribeSelector((s) => s.businessContext, (c) => { if (c) render(); });
  return { unmount() { unsub(); } };
}
