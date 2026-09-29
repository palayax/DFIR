// Toast notifications. This is the app's global error-surfacing mechanism:
// app.js's error boundary calls showToast({type:'error', ...}) for every
// uncaught error/rejection so failures are never silent.

let region = null;
let counter = 0;

function ensureRegion() {
  if (region && document.body.contains(region)) return region;
  region = document.createElement('div');
  region.className = 'toast-region';
  region.setAttribute('role', 'region');
  region.setAttribute('aria-label', 'Notifications');
  document.body.appendChild(region);
  return region;
}

/**
 * @param {{ type?: 'info'|'success'|'error', title: string, detail?: string, timeoutMs?: number }} opts
 * @returns {() => void} dismiss function
 */
export function showToast({ type = 'info', title, detail = '', timeoutMs = type === 'error' ? 12000 : 5000 } = {}) {
  const r = ensureRegion();
  const id = `toast-${++counter}`;
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.id = id;
  el.setAttribute('role', type === 'error' ? 'alert' : 'status');
  el.setAttribute('aria-live', type === 'error' ? 'assertive' : 'polite');

  const icon = document.createElement('span');
  icon.className = 'toast-icon';
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = type === 'error' ? '⚠' : type === 'success' ? '✓' : 'ℹ';

  const body = document.createElement('div');
  body.className = 'toast-body';
  const titleEl = document.createElement('div');
  titleEl.className = 'toast-title';
  titleEl.textContent = title;
  body.appendChild(titleEl);
  if (detail) {
    const detailEl = document.createElement('div');
    detailEl.className = 'toast-detail';
    detailEl.textContent = detail;
    body.appendChild(detailEl);
  }

  const dismissBtn = document.createElement('button');
  dismissBtn.className = 'toast-dismiss';
  dismissBtn.setAttribute('aria-label', 'Dismiss notification');
  dismissBtn.textContent = '×';

  el.append(icon, body, dismissBtn);
  r.appendChild(el);

  let timer = null;
  function dismiss() {
    if (timer) clearTimeout(timer);
    el.remove();
  }
  dismissBtn.addEventListener('click', dismiss);
  if (timeoutMs > 0) timer = setTimeout(dismiss, timeoutMs);

  return dismiss;
}

export function showError(title, err) {
  const detail = err instanceof Error ? err.message : err ? String(err) : '';
  return showToast({ type: 'error', title, detail });
}
