// Loading a BusinessContext into the app store.
//
// The ACME.Corp demo payload is an ES module (web/demo/acme/context.js), not a
// JSON file fetched over HTTP, for the same reason as the DFIR demo: fetch() of
// a sibling file is blocked from file://, while a dynamic import() works
// wherever the app's own modules load. URLs are RELATIVE so the GitHub Pages
// /DFIR/ subpath keeps working.

const ACME_URL = new URL('../../../demo/acme/context.js', import.meta.url);

let acmePromise = null;

export function loadAcmeContext() {
  if (!acmePromise) {
    acmePromise = import(ACME_URL.href)
      .then((mod) => {
        const ctx = mod?.context;
        if (!ctx || !Array.isArray(ctx.business_services) || !Array.isArray(ctx.cyber_risks)) {
          throw new Error('web/demo/acme/context.js did not export a BusinessContext.');
        }
        return ctx;
      })
      .catch((err) => {
        acmePromise = null; // allow a retry after a transient failure
        throw new Error(`Could not load the ACME.Corp demo dataset: ${err?.message || err}`);
      });
  }
  return acmePromise;
}

/** Validate the minimum shape every layer relies on. Returns error strings. */
export function checkBusinessContext(ctx) {
  const errors = [];
  if (!ctx || typeof ctx !== 'object') return ['not an object'];
  for (const key of ['organization', 'business_services', 'kpis', 'assets', 'controls', 'cyber_risks']) {
    if (!(key in ctx)) errors.push(`missing "${key}"`);
  }
  if (errors.length) return errors;
  const svc = new Set(ctx.business_services.map((s) => s.id));
  for (const k of ctx.kpis) if (!svc.has(k.service_id)) errors.push(`KPI ${k.id} references unknown service ${k.service_id}`);
  const assets = new Set(ctx.assets.map((a) => a.id));
  for (const r of ctx.cyber_risks) for (const a of r.asset_ids || []) if (!assets.has(a)) errors.push(`risk ${r.id} references unknown asset ${a}`);
  return errors.slice(0, 20);
}

/** Ensure the store holds a context; loads ACME.Corp when it is empty. */
export async function ensureBusinessContext(store) {
  const existing = store.getState().businessContext;
  if (existing) return existing;
  const ctx = await loadAcmeContext();
  if (!store.getState().businessContext) store.set({ businessContext: ctx, whatIf: [] });
  return store.getState().businessContext;
}

/** A small "this is mock data" banner shared by every business-layer view. */
export function mockBanner(ctx) {
  const div = document.createElement('div');
  div.className = 'mock-banner';
  div.setAttribute('role', 'note');
  div.innerHTML = ctx?.synthetic
    ? `<strong>Mock data.</strong> ${escapeHtml(ctx.organization?.name || 'This organisation')} is a fictional company; every figure below is computed from the synthetic dataset (as of ${escapeHtml(ctx.as_of || '')}).`
    : `<strong>Business context:</strong> ${escapeHtml(ctx?.organization?.name || '')} (as of ${escapeHtml(ctx?.as_of || '')}).`;
  return div;
}

export function escapeHtml(v) {
  return String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

export function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
