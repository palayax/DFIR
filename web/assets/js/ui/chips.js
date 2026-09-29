// Chip rendering helpers: severity chips (the only hue-carrying UI element)
// and plain neutral chips (source tags, artifact filters, etc).

const SEVERITY_LABEL = {
  none: 'None',
  informational: 'Info',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

/** @returns {HTMLElement} */
export function severityChip(severity) {
  const sev = severity || 'none';
  const el = document.createElement('span');
  el.className = `chip chip-sev-${sev}`;
  el.textContent = SEVERITY_LABEL[sev] || sev;
  return el;
}

/**
 * @param {string} text
 * @param {{ removable?: boolean, onRemove?: () => void }} [opts]
 */
export function chip(text, opts = {}) {
  const el = document.createElement('span');
  el.className = opts.removable ? 'chip chip-removable' : 'chip';
  const label = document.createElement('span');
  label.textContent = text;
  el.appendChild(label);
  if (opts.removable) {
    const btn = document.createElement('button');
    btn.className = 'chip-remove';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Remove ${text}`);
    btn.textContent = '×';
    btn.addEventListener('click', () => opts.onRemove?.());
    el.appendChild(btn);
  }
  return el;
}

/** Render a list of chips into a container, replacing its contents. */
export function renderChips(container, items, { removable = false, onRemove } = {}) {
  container.replaceChildren(...items.map((item) => chip(String(item), { removable, onRemove: () => onRemove?.(item) })));
}
