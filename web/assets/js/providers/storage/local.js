// web/assets/js/providers/storage/local.js
//
// Default storage provider: saves output directly to the analyst's machine,
// via the File System Access API (`showSaveFilePicker`) when the browser
// supports it, falling back to a synthetic `<a download>` click otherwise
// (Firefox, older Chromium). Needs no credentials — this is the safe default
// for an air-gapped/offline-friendly triage tool.
//
// This is a one-way "download" sink, not a queryable object store: once a
// blob is handed to the browser's save dialog, this app has no handle to read
// it back, enumerate it, or delete it. get()/list()/delete() are implemented
// for interface-shape completeness but throw a clear, non-retryable
// ProviderError explaining why, rather than silently pretending to succeed.

import { ProviderError } from '../lib/retry.js';

function hasFilePicker() {
  return typeof globalThis.showSaveFilePicker === 'function';
}

function hasDom() {
  return (
    typeof document !== 'undefined' &&
    typeof globalThis.URL !== 'undefined' &&
    typeof globalThis.URL.createObjectURL === 'function'
  );
}

function suggestedName(path) {
  const parts = String(path || 'download').split('/');
  return parts[parts.length - 1] || 'download';
}

async function putViaFilePicker(path, blob) {
  const handle = await globalThis.showSaveFilePicker({ suggestedName: suggestedName(path) });
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
  return { path, url: null, via: 'showSaveFilePicker' };
}

async function putViaAnchorDownload(path, blob) {
  const url = globalThis.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = suggestedName(path);
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Give the browser a tick to pick up the download before revoking.
  setTimeout(() => globalThis.URL.revokeObjectURL(url), 30000);
  return { path, url: null, via: 'anchor-download' };
}

export const localProvider = {
  id: 'local',
  label: 'Local download (this device, no credentials)',
  requiredCredentials: [],

  validateCredentials() {
    return { ok: true, errors: [] };
  },

  async put(path, blob, _opts = {}) {
    if (hasFilePicker()) return putViaFilePicker(path, blob);
    if (hasDom()) return putViaAnchorDownload(path, blob);
    throw new ProviderError(
      'local storage provider: no File System Access API and no DOM available in this environment ' +
        '(e.g. a headless/Node test context) — put() cannot be fulfilled here.',
      { retryable: false },
    );
  },

  async get(_path) {
    throw new ProviderError(
      'local storage provider: get() is not supported — this provider only writes downloads chosen by ' +
        "the analyst via the browser's save dialog; the app has no readable handle to that location.",
      { retryable: false },
    );
  },

  async list(_prefix) {
    throw new ProviderError(
      'local storage provider: list() is not supported — downloads go wherever the analyst chose in the ' +
        'save dialog, which this app cannot enumerate.',
      { retryable: false },
    );
  },

  async delete(_path) {
    throw new ProviderError(
      'local storage provider: delete() is not supported — this app has no access to a file once it has ' +
        'been handed off to the browser download flow.',
      { retryable: false },
    );
  },
};

export default localProvider;
