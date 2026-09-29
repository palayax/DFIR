// Settings view: pick an LLM provider/model and a storage provider, and
// enter whatever credentials each requires. Reads the real provider
// registries in assets/js/providers/{index,storage/index}.js — this view
// only ever talks to the shared LLMProvider/StorageProvider interface
// (providers/types.js), never a specific adapter.
//
// Credentials are held in memory only (on the store), never written to
// localStorage — they are secrets and this is a static, backend-less app,
// so "in memory for this tab session" is the safest option available.

import { providers, getProvider, defaultProviderId, defaultModelId } from '../providers/index.js';
import { storageProviders, getStorageProvider, defaultStorageProviderId } from '../providers/storage/index.js';
import { showToast, showError } from '../ui/toast.js';

function credentialField(field, value, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'field';
  const label = document.createElement('label');
  label.textContent = field.label;
  const input = document.createElement('input');
  input.className = 'input';
  input.type = field.kind === 'secret' ? 'password' : 'text';
  input.placeholder = field.placeholder || '';
  input.value = value || '';
  input.autocomplete = 'off';
  input.addEventListener('input', () => onChange(field.key, input.value));
  wrap.append(label, input);
  if (field.help) {
    const hint = document.createElement('div');
    hint.className = 'field-hint';
    hint.textContent = field.help;
    wrap.appendChild(hint);
  }
  return wrap;
}

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <h1>Settings</h1>
      <div class="view-subtitle">Choose your LLM provider and storage backend for this session.</div>
    </div>`;
  container.appendChild(header);

  const state = store.getState();
  let llmProviderId = state.settings.llmProviderId || defaultProviderId;
  let llmModelId = state.settings.llmModelId || defaultModelId;
  let storageProviderId = state.settings.storageProviderId || defaultStorageProviderId;
  const llmCreds = { ...(state.settings.llmCreds || {}) };
  const storageCreds = { ...(state.settings.storageCreds || {}) };

  const two = document.createElement('div');
  two.className = 'two-col';
  container.appendChild(two);

  const llmPanel = document.createElement('div');
  llmPanel.className = 'panel';
  const storagePanel = document.createElement('div');
  storagePanel.className = 'panel';
  two.append(llmPanel, storagePanel);

  function renderLlmPanel() {
    llmPanel.replaceChildren();
    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'LLM provider';
    llmPanel.appendChild(title);

    const providerField = document.createElement('div');
    providerField.className = 'field';
    const providerLabel = document.createElement('label');
    providerLabel.textContent = 'Provider';
    const providerSelect = document.createElement('select');
    providerSelect.className = 'input';
    for (const p of providers) {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.label;
      if (p.id === llmProviderId) opt.selected = true;
      providerSelect.appendChild(opt);
    }
    providerField.append(providerLabel, providerSelect);
    llmPanel.appendChild(providerField);

    const provider = getProvider(llmProviderId);

    const modelField = document.createElement('div');
    modelField.className = 'field';
    const modelLabel = document.createElement('label');
    modelLabel.textContent = 'Model';
    const modelSelect = document.createElement('select');
    modelSelect.className = 'input';
    for (const m of provider?.models || []) {
      const opt = document.createElement('option');
      opt.value = m.id;
      opt.textContent = m.label;
      if (m.id === llmModelId) opt.selected = true;
      modelSelect.appendChild(opt);
    }
    modelField.append(modelLabel, modelSelect);
    llmPanel.appendChild(modelField);

    for (const field of provider?.requiredCredentials || []) {
      llmPanel.appendChild(
        credentialField(field, llmCreds[field.key], (key, value) => {
          llmCreds[key] = value;
        }),
      );
    }

    providerSelect.addEventListener('change', () => {
      llmProviderId = providerSelect.value;
      const p = getProvider(llmProviderId);
      llmModelId = p?.models?.[0]?.id || '';
      renderLlmPanel();
    });
    modelSelect.addEventListener('change', () => {
      llmModelId = modelSelect.value;
    });
  }

  function renderStoragePanel() {
    storagePanel.replaceChildren();
    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Storage provider';
    storagePanel.appendChild(title);

    const providerField = document.createElement('div');
    providerField.className = 'field';
    const providerLabel = document.createElement('label');
    providerLabel.textContent = 'Provider';
    const providerSelect = document.createElement('select');
    providerSelect.className = 'input';
    for (const p of storageProviders) {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.label;
      if (p.id === storageProviderId) opt.selected = true;
      providerSelect.appendChild(opt);
    }
    providerField.append(providerLabel, providerSelect);
    storagePanel.appendChild(providerField);

    const provider = getStorageProvider(storageProviderId);
    for (const field of provider?.requiredCredentials || []) {
      storagePanel.appendChild(
        credentialField(field, storageCreds[field.key], (key, value) => {
          storageCreds[key] = value;
        }),
      );
    }

    providerSelect.addEventListener('change', () => {
      storageProviderId = providerSelect.value;
      renderStoragePanel();
    });
  }

  renderLlmPanel();
  renderStoragePanel();

  const actions = document.createElement('div');
  actions.className = 'view-actions';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn btn-primary';
  saveBtn.textContent = 'Save settings';
  actions.appendChild(saveBtn);
  container.appendChild(actions);

  saveBtn.addEventListener('click', () => {
    const llmProvider = getProvider(llmProviderId);
    const storageProvider = getStorageProvider(storageProviderId);
    try {
      const llmCheck = llmProvider?.validateCredentials?.(llmCreds) ?? { ok: true, errors: [] };
      const storageCheck = storageProvider?.validateCredentials?.(storageCreds) ?? { ok: true, errors: [] };
      const errors = [...(llmCheck.errors || []), ...(storageCheck.errors || [])];
      if (errors.length) {
        showError('Some settings need attention', errors.join('; '));
        return;
      }
      store.set((s) => ({
        settings: { ...s.settings, llmProviderId, llmModelId, storageProviderId, llmCreds, storageCreds },
      }));
      showToast({ type: 'success', title: 'Settings saved for this session' });
    } catch (err) {
      showError('Failed to save settings', err);
    }
  });

  return { unmount() {} };
}
