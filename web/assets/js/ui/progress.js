// Simple progress bar component. Supports determinate (0-1 ratio) and
// indeterminate modes.

/**
 * @param {HTMLElement} container
 * @param {{ label?: string }} [opts]
 */
export function createProgress(container, opts = {}) {
  const wrap = document.createElement('div');
  wrap.className = 'progress-wrap';

  const labelEl = document.createElement('div');
  labelEl.className = 'progress-label';
  const labelText = document.createElement('span');
  const percentText = document.createElement('span');
  labelText.textContent = opts.label || '';
  labelEl.append(labelText, percentText);

  const track = document.createElement('div');
  track.className = 'progress';
  track.setAttribute('role', 'progressbar');
  track.setAttribute('aria-valuemin', '0');
  track.setAttribute('aria-valuemax', '100');

  const bar = document.createElement('div');
  bar.className = 'progress-bar';
  track.appendChild(bar);

  wrap.append(labelEl, track);
  container.appendChild(wrap);

  function set(ratio, { label } = {}) {
    if (label !== undefined) labelText.textContent = label;
    if (ratio == null) {
      bar.classList.add('is-indeterminate');
      bar.style.width = '';
      track.removeAttribute('aria-valuenow');
      percentText.textContent = '';
    } else {
      const pct = Math.max(0, Math.min(100, Math.round(ratio * 100)));
      bar.classList.remove('is-indeterminate');
      bar.style.width = `${pct}%`;
      track.setAttribute('aria-valuenow', String(pct));
      percentText.textContent = `${pct}%`;
    }
  }

  function destroy() {
    wrap.remove();
  }

  set(opts.ratio ?? null);
  return { el: wrap, set, destroy };
}
