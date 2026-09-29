// Ingest dispatcher: picks the right parser module for an uploaded file.
// Order matters — more specific detectors run first so, e.g., a native
// timeline.csv is recognised before falling back to the generic-csv mapper.

import * as irtriageJsonl from './irtriage-jsonl.js';
import * as irtriageCsv from './irtriage-csv.js';
import * as velociraptorZip from './velociraptor-zip.js';
import * as genericJson from './generic-json.js';
import * as genericCsv from './generic-csv.js';

export const INGEST_MODULES = [
  { id: 'irtriage-jsonl', label: 'IRTriage timeline (JSONL)', module: irtriageJsonl },
  { id: 'irtriage-csv', label: 'IRTriage timeline (CSV)', module: irtriageCsv },
  { id: 'velociraptor-zip', label: 'Velociraptor/IRTriage acquisition ZIP', module: velociraptorZip },
  { id: 'generic-json', label: 'Generic JSON/JSONL (needs mapping)', module: genericJson },
  { id: 'generic-csv', label: 'Generic CSV (needs mapping)', module: genericCsv },
];

/** Try each module's detect() in priority order; returns the first match or
 * null if nothing recognises the file. */
export async function detectIngestModule(file) {
  for (const entry of INGEST_MODULES) {
    try {
      if (await entry.module.detect(file)) return entry;
    } catch {
      // A detector that throws just means "not this format" — keep trying.
    }
  }
  return null;
}

export function getIngestModule(id) {
  return INGEST_MODULES.find((e) => e.id === id) || null;
}
