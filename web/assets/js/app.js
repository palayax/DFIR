// App bootstrap: hash router, view mounting, global error boundary.
//
// Every uncaught exception or rejected promise anywhere in the app surfaces
// as a toast (never a silent failure / blank screen) via the 'error' and
// 'unhandledrejection' listeners below.

import { appStore } from './store.js';
import { showError } from './ui/toast.js';
import { installDemoTour } from './ui/demo-tour.js';

// The menu is three steps of one workflow: Triage (data sources and assets) ->
// Business context (SLOs, policies, BIA) -> Dashboard (the BIA explorer).
// Everything else is a HIDDEN route: still reachable by deep link and by
// contextual buttons (the IRTriage upload -> SuperTimeline -> AI analysis ->
// forensic report flow starts from Triage; the dashboard's Export menu opens
// the forensic report), but not listed. A hidden route highlights its `parent`.
// Route ids are stable: existing deep links keep working.
const ROUTES = [
  { id: 'triage', path: 'triage', label: 'Triage' },
  { id: 'context', path: 'context', label: 'Business context' },
  { id: 'bia', path: 'bia', label: 'Dashboard' },
  { id: 'settings', path: 'settings', label: 'Settings', icon: '⚙' },
  { id: 'inventory', path: 'inventory', label: 'Estate inventory', hidden: true, parent: 'triage' },
  { id: 'ingest', path: 'ingest', label: 'IRTriage collections', hidden: true, parent: 'triage' },
  { id: 'merge', path: 'merge', label: 'SuperTimeline', hidden: true, parent: 'triage' },
  { id: 'analyze', path: 'analyze', label: 'AI analysis', hidden: true, parent: 'triage' },
  { id: 'report', path: 'report', label: 'Forensic report', hidden: true, parent: 'bia' },
  { id: 'cyber', path: 'cyber', label: 'Risk register', hidden: true, parent: 'bia' },
  { id: 'business', path: 'business', label: 'Executive dashboard', hidden: true, parent: 'bia' },
];
// Friendly aliases for links people type or share.
const ROUTE_ALIASES = { dashboard: 'bia' };
const DEFAULT_ROUTE = 'bia';

const viewLoaders = {
  triage: () => import('./views/triage.js'),
  ingest: () => import('./views/ingest.js'),
  // Estate inventory was folded into Triage; old links land there.
  inventory: () => import('./views/triage.js'),
  context: () => import('./views/context.js'),
  cyber: () => import('./views/cyber.js'),
  merge: () => import('./views/merge.js'),
  analyze: () => import('./views/analyze.js'),
  bia: () => import('./views/bia.js'),
  business: () => import('./views/business.js'),
  report: () => import('./views/report.js'),
  settings: () => import('./views/settings.js'),
};

let currentView = null; // { unmount?: () => void }
let currentRouteId = null;

function parseHash() {
  const raw = (location.hash || '').replace(/^#\/?/, '');
  const first = raw.split('/')[0] || DEFAULT_ROUTE;
  const id = ROUTE_ALIASES[first] || first;
  return ROUTES.some((r) => r.id === id) ? id : DEFAULT_ROUTE;
}

function renderNav() {
  const nav = document.getElementById('app-nav');
  if (!nav) return;
  const current = ROUTES.find((r) => r.id === currentRouteId);
  const activeId = current?.hidden ? current.parent : currentRouteId;
  nav.replaceChildren(
    ...ROUTES.filter((route) => !route.hidden).map((route) => {
      const a = document.createElement('a');
      a.href = `#/${route.path}`;
      if (route.icon) {
        a.className = 'nav-icon';
        a.textContent = route.icon;
        a.title = route.label;
        a.setAttribute('aria-label', route.label);
      } else {
        a.textContent = route.label;
      }
      if (route.id === activeId) {
        a.classList.add('is-active');
        a.setAttribute('aria-current', 'page');
      }
      return a;
    }),
  );
}

async function mountRoute(id) {
  const main = document.getElementById('app-main');
  if (!main) return;

  try {
    currentView?.unmount?.();
  } catch (err) {
    showError('Failed to clean up previous view', err);
  }
  currentView = null;

  currentRouteId = id;
  renderNav();

  main.setAttribute('aria-busy', 'true');
  main.replaceChildren();

  try {
    const mod = await viewLoaders[id]();
    const wrap = document.createElement('div');
    wrap.className = 'view-wrap';
    main.appendChild(wrap);
    currentView = (await mod.mount(wrap, { store: appStore })) || null;
  } catch (err) {
    console.error(err);
    showError(`Failed to load "${id}" view`, err);
    const fallback = document.createElement('div');
    fallback.className = 'view-wrap';
    const panel = document.createElement('div');
    panel.className = 'panel';
    panel.textContent = `This view could not be loaded. Details have been logged to the console.`;
    fallback.appendChild(panel);
    main.replaceChildren(fallback);
  } finally {
    main.removeAttribute('aria-busy');
  }
}

function onHashChange() {
  mountRoute(parseHash());
}

function initTheme() {
  const apply = (theme) => {
    const root = document.documentElement;
    if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
    for (const btn of document.querySelectorAll('.theme-toggle button')) {
      btn.setAttribute('aria-pressed', String(btn.dataset.theme === theme));
    }
  };
  let stored = null;
  try {
    stored = localStorage.getItem('irtriage.theme');
  } catch {
    // localStorage unavailable (privacy mode, etc.) - fall back to 'auto'.
  }
  const theme = stored || 'auto';
  appStore.set({ theme });
  apply(theme);

  document.getElementById('theme-toggle')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-theme]');
    if (!btn) return;
    const next = btn.dataset.theme;
    appStore.set({ theme: next });
    apply(next);
    try {
      localStorage.setItem('irtriage.theme', next);
    } catch {
      // Ignore - theme just won't persist across reloads.
    }
  });
}

function initEngagementPicker() {
  const input = document.getElementById('engagement-input');
  if (!input) return;
  try {
    const stored = localStorage.getItem('irtriage.engagementLabel');
    if (stored) {
      input.value = stored;
      appStore.set({ engagementLabel: stored });
    }
  } catch {
    // Ignore.
  }
  input.addEventListener('change', () => {
    const label = input.value.trim();
    appStore.set({ engagementLabel: label });
    try {
      localStorage.setItem('irtriage.engagementLabel', label);
    } catch {
      // Ignore - non-fatal.
    }
  });
}

function installErrorBoundary() {
  window.addEventListener('error', (event) => {
    showError('Unexpected error', event.error || event.message);
  });
  window.addEventListener('unhandledrejection', (event) => {
    showError('Unexpected error', event.reason);
  });
}

function init() {
  installErrorBoundary();
  initTheme();
  initEngagementPicker();
  installDemoTour(appStore);
  window.addEventListener('hashchange', onHashChange);
  if (!location.hash) location.hash = `#/${DEFAULT_ROUTE}`;
  else onHashChange();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
