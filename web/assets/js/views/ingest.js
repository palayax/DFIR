// Ingest view: drop/select files, parse them (off the main thread via
// ingest.worker.js) and stash the resulting records on the store, ready for
// the Merge view to combine into a SuperTimeline.

import { createDropzone } from '../ui/dropzone.js';
import { createProgress } from '../ui/progress.js';
import { showError, showToast } from '../ui/toast.js';
import { detectIngestModule, getIngestModule } from '../ingest/index.js';
import { mountDemoPanel } from '../demo/panel.js';

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

  // The demo entry point. A first-time visitor to the hosted build otherwise
  // lands on an empty console and can see nothing until they supply an evidence
  // ZIP of their own, so the synthetic demo incident needs a visible way in.
  // It is mounted BEFORE the dropzone deliberately: it is the first thing an
  // evaluator should see. It feeds addFiles() — the same entry point the
  // dropzone uses — so the demo exercises the real ingest path rather than a
  // shortcut around it.
  const demoPanel = document.createElement('div');
  demoPanel.className = 'panel';
  container.appendChild(demoPanel);

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

  // The worker is a PERFORMANCE optimisation (it keeps the UI responsive while a
  // multi-hundred-MB acquisition ZIP is unzipped), not a functional requirement.
  // It must never be the difference between a working app and a dead one.
  //
  // It genuinely fails to construct in contexts this app is documented to support:
  //   - `file://`, which README.md and docs/WEB_APP.md both tell an analyst to use
  //     for air-gapped work. Chrome refuses to load a module worker from an opaque
  //     `null` origin.
  //   - any document whose worker URL resolves cross-origin (worker scripts must be
  //     same-origin regardless of CORS headers).
  //
  // Previously `worker = null` meant ingestOne() marked EVERY file
  // `error: 'ingest worker unavailable'`. The page still rendered perfectly, so the
  // app looked healthy and was in fact completely unusable -- nothing can be
  // ingested, therefore nothing can be merged, analysed or reported. Now it falls
  // back to parsing on the main thread: slower, and it blocks the UI on a large
  // file, but it works.
  let worker;
  try {
    worker = new Worker(new URL('../workers/ingest.worker.js', import.meta.url), { type: 'module' });
  } catch (err) {
    worker = null;
    showToast({
      type: 'info',
      title: 'Parsing on the main thread',
      detail: 'The background ingest worker is unavailable here (this is normal when the app is opened directly from disk). Large files will take longer and the page may be briefly unresponsive while they parse.',
      timeoutMs: 9000,
    });
    console.warn('[ingest] worker unavailable, falling back to main-thread parsing:', err);
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
    updateFile(fileEntryId, { status: 'parsing', rowsParsed: 0 });
    if (!worker) {
      ingestOnMainThread(fileEntryId, file);
      return;
    }
    const requestId = `req-${++reqSeq}`;
    pending.set(requestId, { fileEntryId });
    worker.postMessage({ type: 'ingest', requestId, file });
  }

  // Main-thread mirror of ingest.worker.js's handleIngest(). It deliberately
  // reproduces the worker's behaviour rather than sharing code with it, because the
  // worker's interface is postMessage and extracting a shared generator would mean
  // touching the worker protocol that the rest of this view depends on.
  //
  // Yields to the event loop every PROGRESS_INTERVAL rows so the row counter
  // actually updates and the tab does not appear frozen. Without that await, a
  // 1.9 MB JSONL parses in one uninterruptible task and the UI shows "parsing… 0
  // rows" until it is completely done.
  async function ingestOnMainThread(fileEntryId, file) {
    const PROGRESS_INTERVAL = 1000;
    try {
      const entry = await detectIngestModule(file);
      if (!entry) {
        throw new Error(`No ingest module recognised file "${file.name}". Try Generic CSV/JSON mapping.`);
      }
      const records = [];
      let rowsParsed = 0;
      for await (const record of entry.module.parse(file, {})) {
        records.push(record);
        rowsParsed++;
        if (rowsParsed % PROGRESS_INTERVAL === 0) {
          updateFile(fileEntryId, { rowsParsed });
          renderFiles();
          await new Promise((r) => setTimeout(r, 0));
        }
      }
      updateFile(fileEntryId, {
        status: 'parsed',
        records,
        recordCount: records.length,
        moduleId: entry.id,
      });
      renderFiles();
    } catch (err) {
      const message = err?.message || String(err);
      updateFile(fileEntryId, { status: 'error', error: message });
      showError('Failed to ingest file', message);
      renderFiles();
    }
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

  const demo = mountDemoPanel(demoPanel, { onFiles: addFiles });

  const unsubscribe = store.subscribeSelector((s) => s.files, renderFiles);
  renderFiles();

  return {
    unmount() {
      unsubscribe();
      dz.destroy();
      demo.destroy();
      worker?.terminate();
    },
  };
}

export { detectIngestModule, getIngestModule };
