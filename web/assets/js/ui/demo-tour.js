// DEMO MODE: a guided tour of the three stories that connect triage assets to
// the board-level dashboard.
//
//   1. A new high-risk data source -> reflected in every SLO, with root cause
//      down to the new asset.
//   2. A mitigation applied to an existing asset -> how much risk it removes.
//   3. A change to the business context and SLOs -> how the picture moves.
//
// The tour drives the real views: it navigates, highlights an element, and can
// perform each step's change itself ("Do it"), always through the same store
// and engine the user's own clicks go through. Views listen for
// `irtriage-demo` events for the few UI moves a tour needs (open a form,
// select an asset, switch a tab).

import { computeBia } from '../business/bia.js';
import { formatUsdShort } from '../business/engine.js';
import { loadAcmeContext } from '../business/data.js';
import { DEMO_SLO_CHANGES } from '../business/context-edit.js';
import { icon } from './icons.js';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const emit = (action, extra = {}) => window.dispatchEvent(new CustomEvent('irtriage-demo', { detail: { action, ...extra } }));

function esc(v) {
  return String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

async function waitFor(selector, timeout = 4000) {
  const t0 = Date.now();
  while (Date.now() - t0 < timeout) {
    const el = document.querySelector(selector);
    if (el) return el;
    await sleep(80);
  }
  return null;
}

async function go(hash, selector) {
  if (!location.hash.startsWith(hash)) location.hash = hash;
  if (selector) await waitFor(selector);
  await sleep(120);
}

export function installDemoTour(store) {
  const header = document.querySelector('.app-header');
  if (!header || document.querySelector('.demo-btn')) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'demo-btn';
  btn.innerHTML = `${icon('play')} Demo`;
  btn.title = 'Guided demo: triage assets → business context → dashboard';
  header.insertBefore(btn, header.querySelector('.engagement-picker'));

  const panel = document.createElement('aside');
  panel.className = 'demo-panel';
  panel.hidden = true;
  panel.setAttribute('aria-label', 'Demo mode');
  document.body.appendChild(panel);

  const tour = { scenario: null, step: 0, result: '', busy: false };

  const snap = () => {
    const s = store.getState();
    return computeBia(s.businessContext, { remediated: s.whatIf || [], mitigations: s.biaMitigations || [] });
  };
  const slo = (bia, id) => bia.slos.find((x) => x.id === id);
  const delta = (a, b, id, label = null) => {
    const x = slo(a, id);
    const y = slo(b, id);
    return `${label || x.slo.name}: ${formatUsdShort(x.loss_usd)} → ${formatUsdShort(y.loss_usd)}, score ${x.score} → ${y.score}${x.status !== y.status ? `, ${x.status.replace('_', ' ')} → ${y.status.replace('_', ' ')}` : ''}`;
  };
  const newestAsset = () => store.getState().businessContext.assets.filter((a) => a.added).at(-1);

  const SCENARIOS = [
    {
      title: 'A new high-risk data source',
      blurb: 'Triage finds a partner file-transfer gateway. Watch it reach the board-level SLOs, with root cause down to the asset.',
      steps: [
        {
          title: 'Triage: every data source',
          text: () => `${store.getState().businessContext.assets.length} assets and feeds across endpoints, servers, cloud, SaaS & APIs, devices, peripherals, security controls, darknet monitoring and audit logs — each with metadata, triage status and the business impact that traces back to it.`,
          enter: async () => go('#/triage', '.src-grid'),
          spot: '.src-grid',
        },
        {
          title: 'Add the data source',
          text: () => 'The preset describes mft-gw01, a partner file-transfer gateway: internet-facing, a known-exploited critical vulnerability, an exposed admin interface, a shared admin without MFA, credentials offered on a darknet market, and no EDR.',
          enter: async () => { await go('#/triage', '.src-grid'); emit('open-add-preset'); await waitFor('.add-source:not([hidden]) .posture'); },
          spot: '.add-source',
          act: {
            label: 'Run triage',
            run: async () => {
              const before = snap();
              const n0 = store.getState().businessContext.assets.length;
              emit('run-add');
              const t0 = Date.now();
              while (store.getState().businessContext.assets.length === n0 && Date.now() - t0 < 8000) await sleep(100);
              const after = snap();
              return `${delta(before, after, 'SLO-ARR', 'ARR')}. ${delta(before, after, 'SLO-NRR', 'Net revenue retention')}.`;
            },
          },
        },
        {
          title: 'The dashboard reflects it',
          text: () => {
            const a = newestAsset();
            const arr = slo(snap(), 'SLO-ARR');
            const rank = a ? arr.by_asset.findIndex((x) => x.id === a.id) + 1 : 0;
            return a ? `Root cause for ARR now ranks the new gateway #${rank} of ${arr.by_asset.length} assets (${formatUsdShort(arr.by_asset[rank - 1]?.loss_usd || 0)}). Every SLO card, score and status was recomputed.` : 'Run the previous step first.';
          },
          enter: async () => { await go('#/bia', '.slo-grid'); emit('dashboard-tab', { tab: 'impact', slo: 'SLO-ARR' }); await waitFor('.rc-list'); },
          spot: '.rc-list',
        },
        {
          title: 'Root cause, board to asset',
          text: () => 'The explorer focuses the gateway’s top finding: up through the scenario, component, process and policy to every SLO it threatens — and down to the evidence triage collected.',
          enter: async () => { await go('#/bia', '.slo-grid'); emit('focus-new-asset'); await waitFor('.bia-detail .rc-chain'); },
          spot: '.bia-detail',
        },
      ],
    },
    {
      title: 'Mitigate an existing asset',
      blurb: 'The workforce identity provider is the largest existing root cause. Apply phishing-resistant MFA and see the risk drop.',
      steps: [
        {
          title: 'Find the asset',
          text: () => {
            const arr = slo(snap(), 'SLO-ARR');
            const hit = arr.by_asset.find((x) => x.id === 'SAAS-IDP');
            return `Okta Workforce Identity: every service depends on it, and 11 privileged accounts have no MFA. ${hit ? `${formatUsdShort(hit.loss_usd)} of the ARR shortfall traces here.` : ''}`;
          },
          enter: async () => { await go('#/triage', '.src-grid'); emit('select-asset', { id: 'SAAS-IDP' }); await waitFor('.asset-detail'); },
          spot: '.asset-detail',
        },
        {
          title: 'Apply the mitigation',
          text: () => 'Proposed mitigation MIT-05: phishing-resistant MFA for every account, conditional access for admins, forced resets for breached credentials ($60K, 30 days).',
          enter: async () => { await go('#/triage', '.asset-detail'); emit('select-asset', { id: 'SAAS-IDP' }); await waitFor('.asset-detail [data-mit="MIT-05"]'); },
          spot: '.asset-detail .sim-item:has([data-mit="MIT-05"])',
          act: {
            label: 'Apply MIT-05',
            run: async () => {
              const before = snap();
              const set = new Set(store.getState().biaMitigations || []);
              set.add('MIT-05');
              store.set({ biaMitigations: [...set].sort() });
              await sleep(150);
              const after = snap();
              return `${delta(before, after, 'SLO-ARR', 'ARR')}. ${delta(before, after, 'SLO-TRUST', 'Audit non-conformities')}.`;
            },
          },
        },
        {
          title: 'Every SLO moves',
          text: () => 'The dashboard shows each SLO’s change with the mitigation in place; Simulate lists the remaining mitigations ranked by ROI.',
          enter: async () => { await go('#/bia', '.slo-grid'); emit('dashboard-tab', { tab: 'impact', slo: 'SLO-ARR', showSim: true }); await waitFor('.slo-sim'); },
          spot: '.slo-grid',
        },
      ],
    },
    {
      title: 'Change the business context',
      blurb: 'A big deal raises the ARR plan; new contracts tighten the SLA target. The same cyber risk now reads differently.',
      steps: [
        {
          title: 'SLOs are business inputs',
          text: () => 'Targets, plan forecasts and financial bases come from the board pack and management notes. Every number here is editable; scores and status are computed.',
          enter: async () => { await go('#/context', '.bia-bar'); emit('show-slos'); await waitFor('.slo-edit'); },
          spot: '.slo-edit',
        },
        {
          title: 'Apply the change',
          text: () => DEMO_SLO_CHANGES.map((c) => c.note).join('. ') + '.',
          enter: async () => { await go('#/context', '.slo-edit'); },
          spot: '.slo-edit',
          act: {
            label: 'Apply change',
            run: async () => {
              const before = snap();
              emit('apply-slo-change');
              await sleep(250);
              const after = snap();
              return `${delta(before, after, 'SLO-ARR', 'ARR')}. ${delta(before, after, 'SLO-SLA', 'SLA attainment')}.`;
            },
          },
        },
        {
          title: 'The dashboard re-reads the risk',
          text: () => 'Same findings, different business: the bigger ARR plan absorbs the cyber shortfall, so ARR goes back on track and its score falls; the tighter SLA target leaves no headroom, so the SLA score maxes out.',
          enter: async () => { await go('#/bia', '.slo-grid'); emit('dashboard-tab', { tab: 'impact', slo: 'SLO-SLA' }); await waitFor('.slo-detail'); },
          spot: '.slo-grid',
        },
      ],
    },
  ];

  function spotlight(selector) {
    for (const el of document.querySelectorAll('.demo-spot')) el.classList.remove('demo-spot');
    if (!selector) return;
    const el = document.querySelector(selector);
    if (!el) return;
    el.classList.add('demo-spot');
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function render() {
    if (tour.scenario == null) {
      panel.innerHTML = `<div class="demo-head"><h2>${icon('play')} Demo mode</h2><button type="button" class="icon-btn" data-d="close" aria-label="Close demo">${icon('close')}</button></div>
        <p class="demo-step-text">Three stories that connect a triage asset to the board-level dashboard.</p>
        <div class="demo-scenarios">${SCENARIOS.map((s, i) => `<button type="button" class="demo-scn" data-scn="${i}"><span class="demo-n">${i + 1}</span><strong>${esc(s.title)}</strong><span class="muted">${esc(s.blurb)}</span></button>`).join('')}</div>
        <div class="demo-actions"><button type="button" class="btn btn-quiet" data-d="reset">Reset demo data</button></div>`;
      return;
    }
    const s = SCENARIOS[tour.scenario];
    const st = s.steps[tour.step];
    panel.innerHTML = `<div class="demo-head"><h2>${icon('play')} ${esc(s.title)}</h2><button type="button" class="icon-btn" data-d="close" aria-label="Close demo">${icon('close')}</button></div>
      <div class="demo-progress">${s.steps.map((_, i) => `<span class="${i <= tour.step ? 'done' : ''}"></span>`).join('')}</div>
      <div class="demo-step-title">${tour.step + 1}. ${esc(st.title)}</div>
      <p class="demo-step-text">${esc(st.text())}</p>
      ${tour.result ? `<p class="demo-step-result">${esc(tour.result)}</p>` : ''}
      <div class="demo-actions">
        <button type="button" class="btn btn-quiet" data-d="menu">All stories</button>
        ${st.act && !tour.result ? `<button type="button" class="btn btn-primary" data-d="act"${tour.busy ? ' disabled' : ''}>${icon('play')} ${esc(st.act.label)}</button>` : ''}
        ${tour.step < s.steps.length - 1 ? `<button type="button" class="btn${st.act && !tour.result ? '' : ' btn-primary'}" data-d="next"${tour.busy ? ' disabled' : ''}>Next →</button>` : '<button type="button" class="btn btn-primary" data-d="menu">Done</button>'}
      </div>`;
  }

  async function enterStep() {
    const st = SCENARIOS[tour.scenario].steps[tour.step];
    tour.result = '';
    tour.busy = true;
    render();
    try { await st.enter?.(); } finally { tour.busy = false; }
    render();
    spotlight(st.spot);
  }

  panel.addEventListener('click', async (e) => {
    const scn = e.target.closest('[data-scn]');
    if (scn) { tour.scenario = Number(scn.dataset.scn); tour.step = 0; await enterStep(); return; }
    const d = e.target.closest('[data-d]')?.dataset.d;
    if (d === 'close') { panel.hidden = true; spotlight(null); return; }
    if (d === 'menu') { tour.scenario = null; tour.result = ''; spotlight(null); render(); return; }
    if (d === 'reset') {
      store.set({ businessContext: await loadAcmeContext(), whatIf: [], biaMitigations: [] });
      tour.result = '';
      render();
      return;
    }
    if (d === 'next') { tour.step++; await enterStep(); return; }
    if (d === 'act') {
      const st = SCENARIOS[tour.scenario].steps[tour.step];
      tour.busy = true;
      render();
      try { tour.result = await st.act.run(); } finally { tour.busy = false; }
      render();
      spotlight(st.spot);
    }
  });
  btn.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    if (!panel.hidden) render(); else spotlight(null);
  });
  render();
  return { open() { panel.hidden = false; render(); } };
}
