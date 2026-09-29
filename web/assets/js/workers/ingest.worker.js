// Web Worker wrapper around the ingest pipeline. Parsing large CSV/JSONL
// files or unzipping a multi-hundred-MB acquisition ZIP can take a while;
// running it here keeps the main thread (and the UI) responsive.
//
// Protocol (all messages are plain structured-cloneable objects):
//
//   -> { type: 'ingest', requestId, file, moduleId, opts }
//      file is the File/Blob object itself (structured-clonable) - the
//      worker calls detectIngestModule(file) if moduleId is omitted, or
//      getIngestModule(moduleId) when the main thread already resolved one
//      (e.g. after an interactive generic-csv mapping step).
//
//   <- { type: 'progress', requestId, rowsParsed }
//      sent periodically (every PROGRESS_INTERVAL rows) while parsing.
//
//   <- { type: 'done', requestId, records, moduleId, error: null }
//      records is the full parsed array (structured-cloneable plain
//      objects) once parsing completes successfully.
//
//   <- { type: 'error', requestId, message, moduleId }
//      sent instead of 'done' if detection or parsing throws. The worker
//      never lets an error pass silently - every failure is reported back
//      with a requestId so the caller can surface it (as a toast) and
//      never hang waiting for a response that will never arrive.
//
// This module is meant to be constructed as `new Worker(url, { type:
// 'module' })` from the main thread (e.g. in views/ingest.js).

import { detectIngestModule, getIngestModule } from '../ingest/index.js';

const PROGRESS_INTERVAL = 1000;

self.addEventListener('message', (event) => {
  const { type, requestId, file, moduleId, opts } = event.data || {};
  if (type !== 'ingest') return;
  handleIngest({ requestId, file, moduleId, opts }).catch((err) => {
    // Should be unreachable (handleIngest catches internally), but never
    // let an unhandled rejection in the worker vanish silently.
    self.postMessage({ type: 'error', requestId, moduleId, message: err?.message || String(err) });
  });
});

async function handleIngest({ requestId, file, moduleId, opts = {} }) {
  let resolvedModuleId = moduleId;
  try {
    let entry;
    if (moduleId) {
      entry = getIngestModule(moduleId);
      if (!entry) throw new Error(`Unknown ingest module: ${moduleId}`);
    } else {
      entry = await detectIngestModule(file);
      if (!entry) throw new Error(`No ingest module recognised file "${file.name}". Try Generic CSV/JSON mapping.`);
      resolvedModuleId = entry.id;
    }

    const records = [];
    let rowsParsed = 0;
    for await (const record of entry.module.parse(file, opts)) {
      records.push(record);
      rowsParsed++;
      if (rowsParsed % PROGRESS_INTERVAL === 0) {
        self.postMessage({ type: 'progress', requestId, moduleId: resolvedModuleId, rowsParsed });
      }
    }

    self.postMessage({
      type: 'done',
      requestId,
      moduleId: resolvedModuleId,
      records,
      error: null,
    });
  } catch (err) {
    self.postMessage({
      type: 'error',
      requestId,
      moduleId: resolvedModuleId,
      message: err?.message || String(err),
    });
  }
}
