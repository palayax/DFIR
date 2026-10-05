// Layer 1 — Business context.
//
// The operational half of the ingested data: organisation and risk appetite,
// corporate goals, business services with their BIA, KPIs/SLOs/SLAs (from BI,
// contracts, business owners — or proposed by the AI KPI generator when a
// service has none), GRC controls and policies, ingested documents and the
// API / MCP connectors that keep it live.

import { esc, statusChip, sparklineSvg } from '../business/charts.js';
import { formatUsdShort, computeBusinessRisk } from '../business/engine.js';
import { ensureBusinessContext, loadAcmeContext, checkBusinessContext, mockBanner, downloadBlob } from '../business/data.js';
import { openDialog } from '../ui/dialog.js';
import { showError, showToast } from '../ui/toast.js';

const TABS = [
  ['overview', 'Organisation & goals'],
  ['services', 'Services & BIA'],
  ['kpis', 'KPIs / SLOs / SLAs'],
  ['grc', 'GRC controls & policies'],
  ['documents', 'Documents'],
  ['connectors', 'Connectors (API / MCP)'],
];

const SOURCE_LABEL = { bi: 'BI system', contract: 'Contract', business_owner: 'Business owner', generated: 'AI-proposed' };

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <div class="layer-tag">Layer 1 · Ingested data</div>
      <h1>Business context</h1>
      <div class="view-subtitle">SLOs, SLAs and KPIs, BI/DSS data, GRC policies and controls, BIA and business-owner input — the business side of the analysis.</div>
    </div>`;
  const actions = document.createElement('div');
  actions.className = 'view-actions';
  const loadDemoBtn = Object.assign(document.createElement('button'), { className: 'btn', textContent: 'Load ACME.Corp demo', type: 'button' });
  loadDemoBtn.dataset.testid = 'load-acme-demo';
  const importBtn = Object.assign(document.createElement('button'), { className: 'btn', textContent: 'Import context JSON…', type: 'button' });
  const exportBtn = Object.assign(document.createElement('button'), { className: 'btn', textContent: 'Export context JSON', type: 'button' });
  const fileInput = Object.assign(document.createElement('input'), { type: 'file', accept: '.json,application/json', hidden: true });
  actions.append(loadDemoBtn, importBtn, exportBtn, fileInput);
  header.appendChild(actions);
  container.appendChild(header);

  try {
    await ensureBusinessContext(store);
  } catch (err) {
    showError('Could not load business context', err);
    return { unmount() {} };
  }

  const bannerHost = document.createElement('div');
  container.appendChild(bannerHost);
  const root = document.createElement('div');
  root.className = 'layer-root';
  container.appendChild(root);

  const state = { tab: 'overview' };

  function render() {
    const c = store.getState().businessContext;
    bannerHost.replaceChildren(mockBanner(c));
    const tabs = `<div class="tabs" role="tablist">${TABS.map(([id, label]) => `<button role="tab" type="button" data-tab="${id}" aria-selected="${state.tab === id}">${esc(label)}</button>`).join('')}</div>`;
    const body = { overview, services, kpis, grc, documents, connectors }[state.tab](c);
    root.innerHTML = tabs + body;
  }

  function overview(c) {
    const o = c.organization;
    const a = o.risk_appetite || {};
    return `<div class="two-col-biz">
      <section class="panel"><h2 class="panel-title">${esc(o.name)}</h2>
        <dl class="kv-grid">
          <dt>Industry</dt><dd>${esc(o.industry)}</dd>
          <dt>Employees</dt><dd>${o.employees}</dd>
          <dt>Annual revenue</dt><dd>${formatUsdShort(o.annual_revenue_usd)}</dd>
          <dt>Customers</dt><dd>${o.customers}</dd>
          <dt>Fiscal year</dt><dd>${esc(o.fiscal_year)}</dd>
          <dt>Clouds</dt><dd>${esc(o.cloud_providers.join(', '))}</dd>
          <dt>Frameworks</dt><dd>${esc(o.frameworks.join(' · '))}</dd>
          <dt>Sites</dt><dd>${o.sites.map((s) => `${esc(s.name)} (${esc(s.city)}, ${s.employees})`).join('<br>')}</dd>
          <dt>Leadership</dt><dd>${o.executives.map((e) => `${esc(e.role)}: ${esc(e.name)}`).join('<br>')}</dd>
        </dl>
      </section>
      <section class="panel"><h2 class="panel-title">Board risk appetite</h2>
        <p>${esc(a.statement || '')}</p>
        <dl class="kv-grid">
          <dt>Annual value-at-risk tolerance</dt><dd>${formatUsdShort(a.annual_value_at_risk_usd)}</dd>
          <dt>Max likelihood per service</dt><dd>${Math.round((a.max_service_likelihood || 0) * 100)}%</dd>
          <dt>Compliance floor</dt><dd>${Math.round((a.min_compliance_posture || 0) * 100)}%</dd>
          <dt>KPI breaches tolerated</dt><dd>${a.max_kpis_breached ?? '—'}</dd>
          <dt>Approved</dt><dd>${esc(a.approved_by || '')} · ${esc(a.approved_on || '')}</dd>
        </dl>
        <h2 class="panel-title" style="margin-top:16px">Corporate goals</h2>
        <div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Goal</th><th>Owner</th><th>Linked KPIs</th></tr></thead><tbody>${c.business_goals.map((g) => `<tr><td>${esc(g.title)}</td><td>${esc(g.owner)}</td><td class="muted">${esc(g.kpi_ids.join(', '))}</td></tr>`).join('')}</tbody></table></div>
      </section>
    </div>`;
  }

  function services(c) {
    const kpiCount = new Map();
    for (const k of c.kpis) kpiCount.set(k.service_id, (kpiCount.get(k.service_id) || 0) + 1);
    const svcName = new Map(c.business_services.map((s) => [s.id, s.name]));
    return `<section class="panel"><h2 class="panel-title">Business services and impact analysis (BIA 2026)</h2>
      <p class="biz-figure-note">Extracted from the Business Impact Analysis document and SLA contracts. Impact if disrupted = downtime cost × expected outage + SLA penalties + regulatory, recovery and reputational exposure.</p>
      <div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Service</th><th class="num">Tier</th><th class="num">RTO</th><th class="num">RPO</th><th class="num">MTPD</th><th class="num">Revenue</th><th class="num">Downtime / h</th><th>SLA</th><th>Data</th><th>Depends on</th><th class="num">KPIs</th></tr></thead><tbody>${c.business_services.map((s) => `<tr>
        <td>${esc(s.name)}<div class="muted">${esc(s.owner)} · ${esc(s.description)}</div></td>
        <td class="num">${s.tier}</td><td class="num">${s.rto_hours} h</td><td class="num">${s.rpo_hours} h</td><td class="num">${s.mtpd_hours} h</td>
        <td class="num">${s.annual_revenue_usd ? formatUsdShort(s.annual_revenue_usd) : '—'}</td>
        <td class="num">${formatUsdShort(s.cost_of_downtime_per_hour_usd)}</td>
        <td>${s.sla ? `${esc(s.sla.terms)}<div class="muted">${esc(s.sla.contract)} · penalty ${formatUsdShort(s.sla.penalty_usd)}</div>` : '<span class="muted">internal</span>'}</td>
        <td>${esc(s.data_classification.replace(/_/g, ' '))}</td>
        <td class="muted">${esc(s.depends_on.map((d) => svcName.get(d)?.split(' (')[0]).join(', ') || '—')}</td>
        <td class="num">${kpiCount.get(s.id) || 0}${c.kpis.some((k) => k.service_id === s.id && k.source.type === 'generated') ? ' <span class="badge badge-ai">AI</span>' : ''}</td>
      </tr>`).join('')}</tbody></table></div></section>`;
  }

  function kpis(c) {
    const view = computeBusinessRisk(c, { remediated: store.getState().whatIf || [] });
    const status = new Map(view.kpis.map((k) => [k.kpi.id, k]));
    const svcName = new Map(c.business_services.map((s) => [s.id, s.name]));
    const generated = c.kpis.filter((k) => k.source.type === 'generated');
    const genServices = [...new Set(generated.map((k) => svcName.get(k.service_id)))];
    return `${generated.length ? `<section class="panel"><h2 class="panel-title">AI-proposed KPIs <span class="badge badge-ai">${generated.length}</span></h2>
        <p class="biz-figure-note">No KPI was supplied for ${esc(genServices.join(' and '))}. These were generated from the business context (BIA, policies, asset inventory) and await the owner's approval.</p>
        <div class="card-list">${generated.map((k) => `<article class="card"><h3>${esc(k.name)} <span class="muted">· ${esc(svcName.get(k.service_id))}</span></h3><p>${esc(k.generation.rationale)}</p><div class="card-meta"><span>Target ${k.target} ${esc(k.unit)}</span><span>Current ${k.current} ${esc(k.unit)}</span><span>Confidence ${esc(k.generation.confidence)}</span><span>${esc(k.generation.status)}</span><span>Inputs: ${esc(k.generation.inputs.join(', '))}</span></div></article>`).join('')}</div></section>` : ''}
      <section class="panel"><h2 class="panel-title">${c.kpis.length} KPIs, SLOs and SLAs</h2><div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>KPI</th><th>Service</th><th>Kind</th><th>Source</th><th class="num">Current</th><th class="num">Target</th><th>12 months</th><th>Status</th></tr></thead><tbody>${c.kpis.map((k) => {
        const s = status.get(k.id);
        return `<tr><td>${esc(k.name)}</td><td class="muted">${esc(svcName.get(k.service_id))}</td><td>${esc(k.kind.toUpperCase())}</td><td>${k.source.type === 'generated' ? '<span class="badge badge-ai">AI-proposed</span>' : esc(SOURCE_LABEL[k.source.type] || k.source.type)}<div class="muted">${esc(k.source.system)}</div></td><td class="num">${k.current} ${esc(k.unit)}</td><td class="num">${k.target} ${esc(k.unit)}</td><td>${sparklineSvg(k, s ? s.projected : k.current)}</td><td>${s ? statusChip(s.status) : ''}</td></tr>`;
      }).join('')}</tbody></table></div></section>`;
  }

  function grc(c) {
    const STATUS_TONE = { implemented: 'status-good', partial: 'status-warning', planned: 'status-serious', not_implemented: 'status-critical' };
    const openByCtl = new Map();
    for (const r of c.cyber_risks) {
      if (!['open', 'in_progress', 'accepted'].includes(r.status)) continue;
      for (const id of r.control_ids || []) openByCtl.set(id, (openByCtl.get(id) || 0) + 1);
    }
    return `<section class="panel"><h2 class="panel-title">Control library (${c.controls.length}) — crosswalked to ${c.organization.frameworks.length} frameworks</h2>
      <div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Control</th><th>Domain</th><th>Status</th><th class="num">Effectiveness</th><th>Framework references</th><th class="num">Open risks</th><th>Owner</th></tr></thead><tbody>${c.controls.map((ct) => `<tr>
        <td>${esc(ct.id)} ${esc(ct.title)}</td><td>${esc(ct.domain)}</td>
        <td><span class="status-chip ${STATUS_TONE[ct.status] || ''}">${esc(ct.status.replace('_', ' '))}</span></td>
        <td class="num">${Math.round(ct.effectiveness * 100)}%</td>
        <td class="muted">${esc(ct.framework_refs.map((r) => `${r.framework.split(' ')[0]} ${r.ref}`).join(' · '))}</td>
        <td class="num">${openByCtl.get(ct.id) || 0}</td><td class="muted">${esc(ct.owner)}</td></tr>`).join('')}</tbody></table></div></section>
      <section class="panel"><h2 class="panel-title">Policy register</h2><div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Policy</th><th>Owner</th><th>Status</th><th>Last review</th><th class="num">Open exceptions</th></tr></thead><tbody>${c.policies.map((p) => `<tr><td>${esc(p.id)} ${esc(p.title)}</td><td>${esc(p.owner)}</td><td>${esc(p.status.replace('_', ' '))}</td><td>${esc(p.last_review)}</td><td class="num">${p.open_exceptions}</td></tr>`).join('')}</tbody></table></div></section>`;
  }

  function documents(c) {
    return `<section class="panel"><h2 class="panel-title">Ingested documents (${c.documents.length})</h2>
      <p class="biz-figure-note">Structured (XLSX/CSV/JSON) and unstructured (PDF/DOCX/PPTX) sources. Unstructured documents are converted into business context by AI extraction; every extracted figure keeps a pointer to its source document.</p>
      <div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Document</th><th>Type</th><th>Category</th><th>Source</th><th>Extraction</th><th>Ingested</th></tr></thead><tbody>${c.documents.map((d) => `<tr>
        <td>${esc(d.title)}${d.pages ? `<div class="muted">${d.pages} pages</div>` : ''}</td><td><span class="badge">${esc(d.format.toUpperCase())}</span></td><td>${esc(d.category)}</td><td class="muted">${esc(d.source)}</td>
        <td>${esc(d.extraction.method)} · ${esc(d.extraction.confidence)}<div class="muted">${esc(d.extraction.extracted.join('; '))}</div></td><td>${esc(d.ingested_on)}</td></tr>`).join('')}</tbody></table></div>
      <div class="view-actions" style="margin-top:12px"><label class="btn">Add documents…<input type="file" data-docs multiple hidden accept=".pdf,.docx,.xlsx,.csv,.json,.pptx,.txt,.md"></label></div>
    </section>`;
  }

  function connectors(c) {
    const ICON = { api: 'API', mcp: 'MCP', file: 'File' };
    return `<section class="panel"><h2 class="panel-title">Live data sources</h2>
      <p class="biz-figure-note">API and MCP connectors keep KPIs, controls, posture findings and remediation status current, so the executive dashboard recomputes as the business changes. Credentials are held in memory only, as with LLM keys; connectors are off by default so the console still runs fully air-gapped.</p>
      <div class="connector-grid">${c.connectors.map((k) => `<article class="card">
        <h3>${esc(k.name)}</h3>
        <div class="card-meta"><span class="badge ${k.kind === 'mcp' ? 'badge-mcp' : ''}">${ICON[k.kind] || esc(k.kind)}</span><span>${esc(k.category)}</span></div>
        <p><span class="conn-status-${esc(k.status)}">● ${esc(k.status.replace('_', ' '))}</span>${k.last_sync ? ` · last sync ${esc(k.last_sync.replace('T', ' ').replace('Z', ' UTC'))}` : ''}</p>
        <p class="muted">${k.records} records · ${esc(k.schedule)}${k.note ? ` · ${esc(k.note)}` : ''}</p>
        <div class="view-actions"><button class="btn" type="button" data-sync="${esc(k.id)}" ${k.status === 'not_configured' ? 'disabled' : ''}>Sync now</button><button class="btn" type="button" data-configure="${esc(k.id)}">Configure</button></div>
      </article>`).join('')}</div>
      <div class="view-actions" style="margin-top:12px"><button class="btn btn-primary" type="button" data-add-connector>Add connector…</button></div></section>`;
  }

  function connectorDialog(existing) {
    const body = document.createElement('div');
    body.innerHTML = `<p class="biz-figure-note">Mock configuration — this demo build serves every connector from the ACME.Corp dataset.</p>
      <div class="field"><label>Type<select class="input"><option>REST API</option><option${existing?.kind === 'mcp' ? ' selected' : ''}>MCP server (Streamable HTTP)</option><option>File drop</option></select></label></div>
      <div class="field"><label>Endpoint URL<input class="input" type="url" placeholder="https://bi.acme.example/api" value="${existing?.kind === 'mcp' ? 'https://mcp.acme.example/bi' : ''}"></label></div>
      <div class="field"><label>Authentication<select class="input"><option>OAuth 2.0 (client credentials)</option><option>API key (held in memory)</option><option>None</option></select></label></div>
      <div class="field"><label>Maps to<select class="input"><option>KPIs / SLOs</option><option>Controls & policies</option><option>Cyber-risk findings</option><option>Asset inventory</option><option>BIA / services</option></select></label></div>`;
    const dlg = openDialog({
      title: existing ? `Configure ${existing.name}` : 'Add a data-source connector',
      body,
      actions: [
        { label: 'Cancel', onClick: (close) => close() },
        { label: 'Save', variant: 'primary', onClick: (close) => { close(); showToast({ type: 'success', title: 'Connector saved (mock)', detail: 'No request was made; the demo dataset remains the data source.' }); } },
      ],
    });
    return dlg;
  }

  root.addEventListener('click', (e) => {
    const tab = e.target.closest?.('[data-tab]');
    if (tab) { state.tab = tab.dataset.tab; render(); return; }
    const sync = e.target.closest?.('[data-sync]');
    if (sync) {
      const c = store.getState().businessContext;
      const k = c.connectors.find((x) => x.id === sync.dataset.sync);
      showToast({ type: 'success', title: `${k?.name || 'Connector'} synced`, detail: `${k?.records ?? 0} records refreshed from the mock dataset; dashboard recomputed.` });
      return;
    }
    const conf = e.target.closest?.('[data-configure]');
    if (conf) { connectorDialog(store.getState().businessContext.connectors.find((x) => x.id === conf.dataset.configure)); return; }
    if (e.target.closest?.('[data-add-connector]')) connectorDialog(null);
  });
  root.addEventListener('change', (e) => {
    if (!e.target?.matches?.('input[data-docs]')) return;
    const files = [...e.target.files];
    if (!files.length) return;
    const c = store.getState().businessContext;
    const added = files.map((f, i) => ({
      id: `DOC-U${String(c.documents.length + i + 1).padStart(2, '0')}`,
      title: f.name,
      format: (f.name.split('.').pop() || 'file').toLowerCase(),
      category: 'Uploaded',
      source: 'Analyst upload',
      pages: null,
      ingested_on: new Date().toISOString().slice(0, 10),
      extraction: { method: 'Queued for AI extraction', confidence: 'pending', extracted: ['Configure an LLM provider in Settings to extract business context'] },
    }));
    store.set({ businessContext: { ...c, documents: [...c.documents, ...added] } });
    showToast({ type: 'success', title: `${files.length} document(s) added`, detail: 'Queued for extraction. The file content stays in this browser.' });
  });

  loadDemoBtn.addEventListener('click', async () => {
    try {
      store.set({ businessContext: await loadAcmeContext(), whatIf: [] });
      showToast({ type: 'success', title: 'ACME.Corp demo loaded', detail: 'Every layer now reflects the mock dataset.' });
    } catch (err) {
      showError('Could not load the demo', err);
    }
  });
  importBtn.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const f = fileInput.files?.[0];
    if (!f) return;
    try {
      const parsed = JSON.parse(await f.text());
      const ctx = parsed.context || parsed;
      const errors = checkBusinessContext(ctx);
      if (errors.length) throw new Error(errors.join('; '));
      store.set({ businessContext: ctx, whatIf: [] });
      showToast({ type: 'success', title: 'Business context imported', detail: `${ctx.business_services.length} services, ${ctx.kpis.length} KPIs, ${ctx.cyber_risks.length} cyber risks.` });
    } catch (err) {
      showError('Import failed', err);
    } finally {
      fileInput.value = '';
    }
  });
  exportBtn.addEventListener('click', () => {
    const c = store.getState().businessContext;
    downloadBlob(new Blob([JSON.stringify({ context: c }, null, 1)], { type: 'application/json' }), `${(c.organization?.name || 'context').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-business-context.json`);
  });

  render();
  const unsub = store.subscribeSelector((s) => s.businessContext, (c) => { if (c) render(); });
  return { unmount() { unsub(); } };
}
