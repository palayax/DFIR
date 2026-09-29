// Ingest view: drop/select files, parse them (off the main thread via
// ingest.worker.js) and stash the resulting records on the store, ready for
// the Merge view to combine into a SuperTimeline.

import { createDropzone } from '../ui/dropzone.js';
import { createProgress } from '../ui/progress.js';
import { showError, showToast } from '../ui/toast.js';
import { detectIngestModule, getIngestModule } from '../ingest/index.js';

let seq = 0;
function nextId() {
  return `file-${Date.now()}-${++seq}`;
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes)) return '';
  const units = ['B', 'KB', 'MB', 'GB'];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit++;
  }
  return `${value.toFixed(unit === 0 ? 0 : 1)} ${units[unit]}`;
}

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <h1>Ingest</h1>
      <div class="view-subtitle">Add IRTriage exports, Velociraptor acquisitions, or generic CSV/JSON logs.</div>
    </div>`;
  const actions = document.createElement('div');
  actions.className = 'view-actions';
  const continueBtn = document.createElement('a');
  continueBtn.className = 'btn btn-primary';
  continueBtn.href = '#/merge';
  continueBtn.textContent = 'Continue to Merge';
  actions.appendChild(continueBtn);
  header.appendChild(actions);
  container.appendChild(header);

  const dzPanel = document.createElement('div');
  dzPanel.className = 'panel';
  container.appendChild(dzPanel);

  const listPanel = document.createElement('div');
  listPanel.className = 'panel';
  const listTitle = document.createElement('div');
  listTitle.className = 'panel-title';
  listTitle.textContent = 'Files';
  const fileList = document.createElement('ul');
  fileList.className = 'file-list';
  const emptyMsg = document.createElement('div');
  emptyMsg.className = 'empty-state';
  emptyMsg.textContent = 'No files added yet.';
  listPanel.append(listTitle, fileList, emptyMsg);
  container.appendChild(listPanel);

  let worker;
  try {
    worker = new Worker(new URL('../workers/ingest.worker.js', import.meta.url), { type: 'module' });
  } catch (err) {
    showError('Could not start the ingest worker; parsing will be unavailable', err);
    worker = null;
  }

  const pending = new Map(); // requestId -> { fileEntryId }
  let reqSeq = 0;

  function renderFiles() {
    const files = store.getState().files;
    emptyMsg.hidden = files.length !== 0;
    fileList.replaceChildren(
      ...files.map((f) => {
        const li = document.createElement('li');
        li.className = 'file-row';
        const name = document.createElement('span');
        name.className = 'file-name';
        name.textContent = f.name;
        const meta = document.createElement('span');
        meta.className = 'file-meta';
        meta.textContent = `${formatBytes(f.size)} · ${statusLabel(f)}`;
        li.append(name, meta);
        if (f.status === 'parsing') {
          const bar = document.createElement('div');
          bar.style.width = '140px';
          const p = createProgress(bar, { ratio: f.progressRatio ?? null });
          li.appendChild(bar);
        }
        return li;
      }),
    );
  }

  function statusLabel(f) {
    switch (f.status) {
      case 'pending': return 'queued';
      case 'parsing': return `parsing… ${f.rowsParsed ?? 0} rows`;
      case 'parsed': return `${f.recordCount ?? 0} records (${f.moduleId || 'unknown'})`;
      case 'error': return `error: ${f.error}`;
      default: return f.status;
    }
  }

  function updateFile(id, patch) {
    store.set((state) => ({
      files: state.files.map((f) => (f.id === id ? { ...f, ...patch } : f)),
    }));
  }

  function ingestOne(fileEntryId, file) {
    if (!worker) {
      updateFile(fileEntryId, { status: 'error', error: 'ingest worker unavailable' });
      return;
    }
    const requestId = `req-${++reqSeq}`;
    pending.set(requestId, { fileEntryId });
    updateFile(fileEntryId, { status: 'parsing', rowsParsed: 0 });
    worker.postMessage({ type: 'ingest', requestId, file });
  }

  if (worker) {
    worker.addEventListener('message', (event) => {
      const { type, requestId } = event.data || {};
      const entry = pending.get(requestId);
      if (!entry) return;
      if (type === 'progress') {
        updateFile(entry.fileEntryId, { rowsParsed: event.data.rowsParsed });
        renderFiles();
      } else if (type === 'done') {
        pending.delete(requestId);
        updateFile(entry.fileEntryId, {
          status: 'parsed',
          records: event.data.records,
          recordCount: event.data.records.length,
          moduleId: event.data.moduleId,
        });
        renderFiles();
      } else if (type === 'error') {
        pending.delete(requestId);
        updateFile(entry.fileEntryId, { status: 'error', error: event.data.message });
        showError(`Failed to ingest file`, event.data.message);
        renderFiles();
      }
    });
    worker.addEventListener('error', (err) => {
      showError('Ingest worker crashed', err.message || err);
    });
  }

  function addFiles(fileObjs) {
    const newEntries = fileObjs.map((file) => ({
      id: nextId(),
      name: file.name,
      size: file.size,
      status: 'pending',
      _file: file,
    }));
    store.set((state) => ({ files: [...state.files, ...newEntries.map(({ _file, ...rest }) => rest)] }));
    renderFiles();
    for (const entry of newEntries) {
      ingestOne(entry.id, entry._file);
    }
    showToast({ type: 'info', title: `Added ${fileObjs.length} file${fileObjs.length === 1 ? '' : 's'}`, timeoutMs: 3000 });
  }

  const dz = createDropzone(dzPanel, {
    hint: 'IRTriage JSONL/CSV, Velociraptor acquisition ZIP, or generic CSV/JSON',
    onFiles: addFiles,
  });

  const unsubscribe = store.subscribeSelector((s) => s.files, renderFiles);
  renderFiles();

  return {
    unmount() {
      unsubscribe();
      dz.destroy();
      worker?.terminate();
    },
  };
}

export { detectIngestModule, getIngestModule };
