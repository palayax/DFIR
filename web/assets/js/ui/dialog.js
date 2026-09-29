// Minimal accessible modal dialog. Focus-trapped, Escape to close, restores
// focus to the previously-focused element on close.

let openDialogs = 0;

/**
 * @param {{ title: string, body: Node|string, actions?: Array<{label:string, onClick?: (close)=>void, variant?: 'primary'|'danger'|'default', autofocus?: boolean}> }} opts
 * @returns {{ close: () => void }}
 */
export function openDialog({ title, body, actions = [] } = {}) {
  const previouslyFocused = document.activeElement;
  openDialogs++;

  const overlay = document.createElement('div');
  overlay.className = 'dialog-overlay';

  const dialog = document.createElement('div');
  dialog.className = 'dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  const titleId = `dialog-title-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  dialog.setAttribute('aria-labelledby', titleId);

  const header = document.createElement('div');
  header.className = 'dialog-header';
  const titleEl = document.createElement('h2');
  titleEl.id = titleId;
  titleEl.textContent = title;
  const closeBtn = document.createElement('button');
  closeBtn.className = 'dialog-close';
  closeBtn.setAttribute('aria-label', 'Close dialog');
  closeBtn.textContent = '×';
  header.append(titleEl, closeBtn);

  const bodyEl = document.createElement('div');
  bodyEl.className = 'dialog-body';
  if (typeof body === 'string') bodyEl.textContent = body;
  else if (body instanceof Node) bodyEl.appendChild(body);

  dialog.append(header, bodyEl);

  let footer = null;
  if (actions.length) {
    footer = document.createElement('div');
    footer.className = 'dialog-footer';
    for (const action of actions) {
      const btn = document.createElement('button');
      btn.className = `btn ${action.variant === 'primary' ? 'btn-primary' : action.variant === 'danger' ? 'btn-danger' : ''}`.trim();
      btn.textContent = action.label;
      btn.addEventListener('click', () => action.onClick?.(close));
      footer.appendChild(btn);
      if (action.autofocus) btn.dataset.autofocus = 'true';
    }
    dialog.appendChild(footer);
  }

  overlay.appendChild(dialog);
  document.body.appendChild(overlay);

  function focusable() {
    return [...dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(
      (el) => !el.disabled && el.offsetParent !== null,
    );
  }

  function onKeydown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function onOverlayClick(e) {
    if (e.target === overlay) close();
  }

  let closed = false;
  function close() {
    if (closed) return;
    closed = true;
    document.removeEventListener('keydown', onKeydown, true);
    overlay.removeEventListener('mousedown', onOverlayClick);
    overlay.remove();
    openDialogs--;
    if (previouslyFocused && document.body.contains(previouslyFocused)) {
      previouslyFocused.focus();
    }
  }

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('mousedown', onOverlayClick);
  document.addEventListener('keydown', onKeydown, true);

  const initial = dialog.querySelector('[data-autofocus="true"]') || focusable()[0] || dialog;
  initial.focus();

  return { close };
}

export function confirmDialog({ title, message, confirmLabel = 'Confirm', danger = false }) {
  return new Promise((resolve) => {
    openDialog({
      title,
      body: message,
      actions: [
        { label: 'Cancel', onClick: (close) => { close(); resolve(false); } },
        {
          label: confirmLabel,
          variant: danger ? 'danger' : 'primary',
          autofocus: true,
          onClick: (close) => { close(); resolve(true); },
        },
      ],
    });
  });
}
