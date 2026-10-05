// Layer 2 — Cyber-risk register.
//
// Vulnerabilities, misconfigurations, exposures and IOC/IOA findings from the
// BusinessContext, each mapped to assets, controls and (through the asset
// inventory) to the business services it threatens. The likelihood shown per
// risk is the same figure the executive dashboard aggregates.

import { computeBusinessRisk, riskLikelihood, indexContext } from '../business/engine.js';
import { esc } from '../business/charts.js';
import { ensureBusinessContext, mockBanner } from '../business/data.js';
import { showError } from '../ui/toast.js';

const SEV_ORDER = { critical: 4, high: 3, medium: 2, low: 1, informational: 0 };
const TYPE_LABEL = {
  vulnerability: 'Vulnerability',
  misconfiguration: 'Misconfiguration',
  exposure: 'Exposure',
  ioc: 'IOC',
  ioa: 'IOA',
  incident_finding: 'Incident finding',
};

// Technique labels used by the register -> name and tactic (ATT&CK, plus
// MITRE ATLAS for the AI-system findings).
const TECHNIQUES = {
  T1190: ['Exploit Public-Facing Application', 'Initial Access'],
  T1133: ['External Remote Services', 'Initial Access'],
  T1189: ['Drive-by Compromise', 'Initial Access'],
  'T1195.001': ['Compromise Software Dependencies', 'Initial Access'],
  'T1195.002': ['Compromise Software Supply Chain', 'Initial Access'],
  T1078: ['Valid Accounts', 'Initial Access'],
  'T1078.001': ['Default Accounts', 'Initial Access'],
  'T1078.002': ['Domain Accounts', 'Initial Access'],
  'T1078.003': ['Local Accounts', 'Initial Access'],
  'T1078.004': ['Cloud Accounts', 'Initial Access'],
  T1203: ['Exploitation for Client Execution', 'Execution'],
  T1098: ['Account Manipulation', 'Persistence'],
  T1068: ['Exploitation for Privilege Escalation', 'Privilege Escalation'],
  T1611: ['Escape to Host', 'Privilege Escalation'],
  'T1562.001': ['Disable or Modify Tools', 'Defense Evasion'],
  'T1562.002': ['Disable Windows Event Logging', 'Defense Evasion'],
  'T1562.004': ['Disable or Modify System Firewall', 'Defense Evasion'],
  'T1562.008': ['Disable or Modify Cloud Logs', 'Defense Evasion'],
  'T1550.001': ['Application Access Token', 'Defense Evasion'],
  T1528: ['Steal Application Access Token', 'Credential Access'],
  'T1552.001': ['Credentials In Files', 'Credential Access'],
  T1557: ['Adversary-in-the-Middle', 'Credential Access'],
  'T1557.001': ['LLMNR/NBT-NS Poisoning and SMB Relay', 'Credential Access'],
  T1210: ['Exploitation of Remote Services', 'Lateral Movement'],
  T1530: ['Data from Cloud Storage', 'Collection'],
  T1185: ['Browser Session Hijacking', 'Collection'],
  'T1071.001': ['Web Protocols', 'Command and Control'],
  T1219: ['Remote Access Software', 'Command and Control'],
  T1567: ['Exfiltration Over Web Service', 'Exfiltration'],
  T1490: ['Inhibit System Recovery', 'Impact'],
  T1485: ['Data Destruction', 'Impact'],
  'T1565.001': ['Stored Data Manipulation', 'Impact'],
  'AML.T0051': ['LLM Prompt Injection', 'AI systems (ATLAS)'],
  'AML.T0057': ['LLM Data Leakage', 'AI systems (ATLAS)'],
};
const TACTICS = ['Initial Access', 'Execution', 'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access', 'Lateral Movement', 'Collection', 'Command and Control', 'Exfiltration', 'Impact', 'AI systems (ATLAS)'];

function pct(v, d = 0) {
  return `${((v || 0) * 100).toFixed(d)}%`;
}

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <div class="layer-tag">Layer 2 · Cyber risks</div>
      <h1>Cyber-risk register</h1>
      <div class="view-subtitle">Vulnerabilities, misconfigurations, exposures and IOC/IOA findings, mapped to assets, controls and business services.</div>
    </div>
    <div class="view-actions">
      <a class="btn" href="#/merge">SuperTimeline</a>
      <a class="btn" href="#/analyze">AI analysis (IOC/IOA)</a>
      <a class="btn btn-primary" href="#/business">Business impact →</a>
    </div>`;
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

  const state = { tab: 'register', type: '', severity: '', status: 'active', service: '', site: '', q: '', selected: null };
  // Deep link: #/cyber/CR-001 opens that risk.
  const deep = (location.hash || '').replace(/^#\/?/, '').split('/')[1];
  if (deep) state.selected = decodeURIComponent(deep);

  function render() {
    const c = store.getState().businessContext;
    const idx = indexContext(c);
    const view = computeBusinessRisk(c, { remediated: store.getState().whatIf || [] });
    const riskSvc = new Map(view.risks.map((r) => [r.id, r.service_ids]));
    const svcName = new Map(c.business_services.map((s) => [s.id, s.name]));
    const active = (r) => ['open', 'in_progress', 'accepted'].includes(r.status);
    const all = c.cyber_risks.map((r) => ({ r, l: riskLikelihood(r, idx), svcs: riskSvc.get(r.id) || [] }));

    const open = all.filter((x) => active(x.r));
    const byType = (t) => open.filter((x) => x.r.type === t).length;
    const exposedCount = open.filter((x) => x.r.asset_ids.some((id) => idx.assets.get(id)?.internet_facing)).length;
    const tiles = `<div class="tile-grid">
      <div class="tile ${open.some((x) => x.r.severity === 'critical') ? 'tile-alert' : ''}"><div class="tile-label">Open cyber risks</div><div class="tile-value">${open.length}</div><div class="tile-sub">${open.filter((x) => x.r.severity === 'critical').length} critical · ${open.filter((x) => x.r.severity === 'high').length} high</div></div>
      <div class="tile"><div class="tile-label">Vulnerabilities</div><div class="tile-value">${byType('vulnerability')}</div><div class="tile-sub">${open.filter((x) => x.r.type === 'vulnerability' && x.r.exploitability === 'known_exploited').length} known-exploited</div></div>
      <div class="tile"><div class="tile-label">Misconfigurations</div><div class="tile-value">${byType('misconfiguration')}</div><div class="tile-sub">Cloud, identity, CI/CD, endpoints</div></div>
      <div class="tile"><div class="tile-label">Exposures</div><div class="tile-value">${byType('exposure')}</div><div class="tile-sub">${exposedCount} risks on internet-facing assets</div></div>
      <div class="tile tile-alert"><div class="tile-label">IOC / IOA findings</div><div class="tile-value">${byType('ioc') + byType('ioa') + byType('incident_finding')}</div><div class="tile-sub">Active threat indicators under investigation</div></div>
      <div class="tile"><div class="tile-label">Remediated (12 months)</div><div class="tile-value">${c.cyber_risks.filter((r) => r.status === 'mitigated').length}</div><div class="tile-sub">Closed findings retained for trend</div></div>
    </div>`;

    const tabs = `<div class="tabs" role="tablist">${[['register', 'Register'], ['threats', 'IOC / IOA'], ['attack', 'ATT&CK coverage']].map(([id, label]) => `<button role="tab" type="button" data-tab="${id}" aria-selected="${state.tab === id}">${esc(label)}</button>`).join('')}</div>`;

    let body = '';
    if (state.tab === 'register') {
      const rows = all
        .filter((x) => (state.status === 'active' ? active(x.r) : state.status ? x.r.status === state.status : true))
        .filter((x) => !state.type || x.r.type === state.type)
        .filter((x) => !state.severity || x.r.severity === state.severity)
        .filter((x) => !state.service || x.svcs.includes(state.service))
        .filter((x) => !state.site || x.r.asset_ids.some((id) => idx.assets.get(id)?.site === state.site))
        .filter((x) => !state.q || `${x.r.id} ${x.r.title} ${x.r.vuln_id || ''} ${x.r.owner}`.toLowerCase().includes(state.q.toLowerCase()))
        .sort((a, b) => b.l - a.l || SEV_ORDER[b.r.severity] - SEV_ORDER[a.r.severity] || a.r.id.localeCompare(b.r.id));
      const opt = (v, l, cur) => `<option value="${esc(v)}"${cur === v ? ' selected' : ''}>${esc(l)}</option>`;
      const filters = `<div class="filter-row panel">
        <label>Search<input class="input" type="search" data-f="q" value="${esc(state.q)}" placeholder="id, title, owner"></label>
        <label>Type<select data-f="type">${opt('', 'All types', state.type)}${Object.entries(TYPE_LABEL).map(([k, l]) => opt(k, l, state.type)).join('')}</select></label>
        <label>Severity<select data-f="severity">${opt('', 'All', state.severity)}${['critical', 'high', 'medium', 'low'].map((s) => opt(s, s, state.severity)).join('')}</select></label>
        <label>Status<select data-f="status">${opt('active', 'Open / in progress / accepted', state.status)}${opt('', 'All incl. remediated', state.status)}${['open', 'in_progress', 'accepted', 'mitigated'].map((s) => opt(s, s.replace('_', ' '), state.status)).join('')}</select></label>
        <label>Business service<select data-f="service">${opt('', 'All', state.service)}${c.business_services.map((s) => opt(s.id, s.name, state.service)).join('')}</select></label>
        <label>Site<select data-f="site">${opt('', 'All', state.site)}${[...c.organization.sites.map((s) => [s.id, s.name]), ['CLOUD', 'Cloud'], ['SAAS', 'SaaS']].map(([v, l]) => opt(v, l, state.site)).join('')}</select></label>
      </div>`;
      const sel = state.selected ? all.find((x) => x.r.id === state.selected) : null;
      const detail = sel ? riskDetail(sel, c, idx, svcName, view) : '';
      const table = `<section class="panel"><h2 class="panel-title">${rows.length} finding${rows.length === 1 ? '' : 's'}</h2><div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>ID</th><th>Finding</th><th>Type</th><th>Severity</th><th class="num">Assets</th><th>Business services</th><th class="num">Likelihood</th><th>Status</th><th>First seen</th></tr></thead><tbody>${rows.map((x) => `
        <tr class="clickable${state.selected === x.r.id ? ' is-selected' : ''}" data-risk="${esc(x.r.id)}" tabindex="0">
          <td class="nowrap">${esc(x.r.id)}</td>
          <td>${esc(x.r.title)}${x.r.vuln_id ? `<div class="muted">${esc(x.r.vuln_id)}${x.r.cvss ? ` · CVSS ${x.r.cvss}` : ''}${x.r.epss != null ? ` · EPSS ${x.r.epss}` : ''}</div>` : ''}</td>
          <td><span class="badge">${esc(TYPE_LABEL[x.r.type] || x.r.type)}</span></td>
          <td><span class="sev-dot sev-${esc(x.r.severity)}" aria-hidden="true"></span>${esc(x.r.severity)}</td>
          <td class="num">${x.r.asset_ids.length}</td>
          <td class="muted">${esc(x.svcs.map((s) => svcName.get(s)?.split(' (')[0]).slice(0, 3).join(', '))}${x.svcs.length > 3 ? ` +${x.svcs.length - 3}` : ''}</td>
          <td class="num">${active(x.r) ? pct(x.l, 1) : '—'}</td>
          <td>${esc(x.r.status.replace('_', ' '))}</td>
          <td class="nowrap">${esc(x.r.first_seen)}</td>
        </tr>`).join('')}</tbody></table></div></section>`;
      body = filters + detail + table;
    } else if (state.tab === 'threats') {
      const threats = all.filter((x) => ['ioc', 'ioa', 'incident_finding'].includes(x.r.type)).sort((a, b) => (b.r.first_seen || '').localeCompare(a.r.first_seen || ''));
      body = `<section class="panel"><h2 class="panel-title">Indicators of compromise / attack</h2>
        <p class="biz-figure-note">Findings raised by the SOC, CASB, identity analytics and IRTriage collections. Each links to the evidence workflow: build a SuperTimeline from the triage collections, then run AI analysis to confirm or dismiss.</p>
        <div class="card-list">${threats.map((x) => `<article class="card card-sev-${esc(x.r.severity)}">
          <h3>${esc(x.r.id)} · ${esc(x.r.title)}</h3>
          <div class="card-meta"><span class="badge">${esc(TYPE_LABEL[x.r.type])}</span><span>${esc(x.r.source)}</span><span>First seen ${esc(x.r.first_seen)}</span><span>Owner: ${esc(x.r.owner)}</span>${x.r.indicator ? `<span>Indicator: <code>${esc(x.r.indicator)}</code></span>` : ''}</div>
          <p>ATT&amp;CK: ${x.r.mitre_techniques.map((t) => `<span class="badge">${esc(t)} ${esc(TECHNIQUES[t]?.[0] || '')}</span>`).join(' ') || '—'} · Affects: ${esc(x.svcs.map((s) => svcName.get(s)).join(', '))}</p>
          <p><strong>Next step:</strong> ${esc(x.r.remediation?.action || '')}</p>
          <div class="view-actions"><button class="btn" type="button" data-open="${esc(x.r.id)}">Open in register</button><a class="btn" href="#/ingest">Add triage collection</a><a class="btn" href="#/analyze">Run AI analysis</a></div>
        </article>`).join('')}</div></section>`;
    } else {
      const cov = new Map();
      for (const x of open) {
        for (const t of x.r.mitre_techniques) {
          const e = cov.get(t) || { id: t, count: 0, sev: 'informational', risks: [] };
          e.count++;
          e.risks.push(x.r.id);
          if (SEV_ORDER[x.r.severity] > SEV_ORDER[e.sev]) e.sev = x.r.severity;
          cov.set(t, e);
        }
      }
      const cols = TACTICS.map((tac) => {
        const techs = [...cov.values()].filter((e) => (TECHNIQUES[e.id]?.[1] || 'Other') === tac).sort((a, b) => b.count - a.count);
        if (!techs.length) return '';
        return `<div class="attack-col"><div class="attack-tactic">${esc(tac)}</div>${techs.map((e) => `<div class="attack-cell" title="${esc(e.risks.join(', '))}"><span class="sev-dot sev-${esc(e.sev)}" aria-hidden="true"></span><strong>${esc(e.id)}</strong> ${esc(TECHNIQUES[e.id]?.[0] || '')}<span class="attack-count">${e.count}</span></div>`).join('')}</div>`;
      }).join('');
      body = `<section class="panel"><h2 class="panel-title">ATT&amp;CK exposure — which techniques the open risks would enable</h2>
        <p class="biz-figure-note">Technique ids are labels on register findings (what an adversary could use the weakness for), not observed activity. The count is the number of open findings per technique; the dot shows the highest severity.</p>
        <div class="attack-grid">${cols}</div></section>`;
    }

    root.innerHTML = tiles + tabs + body;
    if (state.selected && state.tab === 'register') root.querySelector('.drawer')?.scrollIntoView({ block: 'nearest' });
  }

  function riskDetail(x, c, idx, svcName, view) {
    const r = x.r;
    const assets = r.asset_ids.map((id) => idx.assets.get(id)).filter(Boolean);
    const ctls = (r.control_ids || []).map((id) => idx.controls.get(id)).filter(Boolean);
    const kpis = view.kpis.filter((k) => x.svcs.includes(k.kpi.service_id) && k.status !== 'on_track');
    return `<section class="drawer" aria-label="Risk detail">
      <div class="view-header"><h2>${esc(r.id)} · ${esc(r.title)}</h2><button class="btn" type="button" data-close>Close</button></div>
      <div class="two-col-biz">
        <dl class="kv-grid">
          <dt>Type</dt><dd>${esc(TYPE_LABEL[r.type])}</dd>
          <dt>Severity</dt><dd><span class="sev-dot sev-${esc(r.severity)}"></span>${esc(r.severity)}${r.cvss ? ` · CVSS ${r.cvss}` : ''}${r.epss != null ? ` · EPSS ${r.epss}` : ''}</dd>
          <dt>Exploitability</dt><dd>${esc((r.exploitability || '').replace('_', ' '))}</dd>
          <dt>Likelihood (12 mo)</dt><dd>${pct(x.l, 1)}</dd>
          <dt>Status</dt><dd>${esc(r.status.replace('_', ' '))}${r.closed_on ? ` (closed ${esc(r.closed_on)})` : ''}</dd>
          <dt>Source</dt><dd>${esc(r.source)}</dd>
          <dt>Owner</dt><dd>${esc(r.owner)}</dd>
          <dt>First seen</dt><dd>${esc(r.first_seen)}</dd>
          <dt>ATT&amp;CK</dt><dd>${r.mitre_techniques.map((t) => `${esc(t)} ${esc(TECHNIQUES[t]?.[0] || '')}`).join('; ') || '—'}</dd>
          <dt>Remediation</dt><dd>${esc(r.remediation?.action || '')} · effort ${esc(r.remediation?.effort || '?')} · ${r.remediation?.cost_usd ? `$${r.remediation.cost_usd.toLocaleString('en-US')}` : '—'} · ${r.remediation?.eta_days ?? '?'} days</dd>
        </dl>
        <div>
          <p><strong>Business services</strong>: ${esc(x.svcs.map((s) => svcName.get(s)).join(', ') || '—')}</p>
          <p><strong>KPIs / SLAs under pressure</strong>: ${kpis.length ? kpis.map((k) => esc(k.kpi.name)).join('; ') : 'none projected'}</p>
          <p><strong>Failing / related controls</strong>: ${ctls.map((ct) => `${esc(ct.id)} ${esc(ct.title)} (${esc(ct.status.replace('_', ' '))})`).join('; ') || '—'}</p>
          <p><a href="#/business">See the business impact →</a></p>
        </div>
      </div>
      <h3>Affected assets (${assets.length})</h3>
      <div class="biz-table-wrap"><table class="biz-table"><thead><tr><th>Asset</th><th>Class</th><th>Site</th><th>Criticality</th><th>Internet-facing</th><th>Triage</th></tr></thead><tbody>${assets.slice(0, 25).map((a) => `<tr><td>${esc(a.name)}</td><td>${esc(a.class.replace('_', ' '))}</td><td>${esc(a.site)}</td><td>${esc(a.criticality)}</td><td>${a.internet_facing ? 'Yes' : 'No'}</td><td>${esc(a.triage?.status || '')}</td></tr>`).join('')}</tbody></table></div>
      ${assets.length > 25 ? `<p class="muted">… and ${assets.length - 25} more.</p>` : ''}
    </section>`;
  }

  root.addEventListener('click', (e) => {
    const tab = e.target.closest?.('[data-tab]');
    if (tab) { state.tab = tab.dataset.tab; render(); return; }
    if (e.target.closest?.('[data-close]')) { state.selected = null; render(); return; }
    const open = e.target.closest?.('[data-open]');
    if (open) { state.tab = 'register'; state.status = ''; state.selected = open.dataset.open; render(); return; }
    const row = e.target.closest?.('tr[data-risk]');
    if (row) { state.selected = row.dataset.risk; render(); }
  });
  root.addEventListener('keydown', (e) => {
    const row = e.target.closest?.('tr[data-risk]');
    if (row && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); state.selected = row.dataset.risk; render(); }
  });
  root.addEventListener('change', (e) => {
    const f = e.target?.dataset?.f;
    if (f && f !== 'q') { state[f] = e.target.value; render(); }
  });
  root.addEventListener('input', (e) => {
    if (e.target?.dataset?.f === 'q') {
      state.q = e.target.value;
      const pos = e.target.selectionStart;
      render();
      const input = root.querySelector('input[data-f="q"]');
      input?.focus();
      input?.setSelectionRange(pos, pos);
    }
  });

  if (state.selected && !ctx.cyber_risks.some((r) => r.id === state.selected)) state.selected = null;
  if (state.selected) state.status = '';
  render();
  const unsub = store.subscribeSelector((s) => s.businessContext, (c) => { if (c) render(); });
  return { unmount() { unsub(); } };
}
