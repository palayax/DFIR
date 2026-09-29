// App bootstrap: hash router, view mounting, global error boundary.
//
// Every uncaught exception or rejected promise anywhere in the app surfaces
// as a toast (never a silent failure / blank screen) via the 'error' and
// 'unhandledrejection' listeners below.

import { appStore } from './store.js';
import { showError } from './ui/toast.js';

const ROUTES = [
  { id: 'ingest', path: 'ingest', label: 'Ingest', step: 1 },
  { id: 'merge', path: 'merge', label: 'Merge', step: 2 },
  { id: 'analyze', path: 'analyze', label: 'Analyze', step: 3 },
  { id: 'report', path: 'report', label: 'Report', step: 4 },
  { id: 'settings', path: 'settings', label: 'Settings', step: 5 },
];
const DEFAULT_ROUTE = 'ingest';

const viewLoaders = {
  ingest: () => import('./views/ingest.js'),
  merge: () => import('./views/merge.js'),
  analyze: () => import('./views/analyze.js'),
  report: () => import('./views/report.js'),
  settings: () => import('./views/settings.js'),
};

let currentView = null; // { unmount?: () => void }
let currentRouteId = null;

function parseHash() {
  const raw = (location.hash || '').replace(/^#\/?/, '');
  const id = raw.split('/')[0] || DEFAULT_ROUTE;
  return ROUTES.some((r) => r.id === id) ? id : DEFAULT_ROUTE;
}

function renderNav() {
  const nav = document.getElementById('app-nav');
  if (!nav) return;
  nav.replaceChildren(
    ...ROUTES.map((route) => {
      const a = document.createElement('a');
      a.href = `#/${route.path}`;
      a.textContent = '';
      const stepEl = document.createElement('span');
      stepEl.className = 'nav-step-number';
      stepEl.textContent = String(route.step);
      const labelEl = document.createElement('span');
      labelEl.textContent = route.label;
      a.append(stepEl, labelEl);
      if (route.id === currentRouteId) {
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
  window.addEventListener('hashchange', onHashChange);
  if (!location.hash) location.hash = `#/${DEFAULT_ROUTE}`;
  else onHashChange();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
