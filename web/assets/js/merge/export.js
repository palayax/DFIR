// Export a SuperTimeline (an array of timeline records, per
// docs/timeline_schema.json) back out to disk as JSONL (full fidelity) or as
// the flattened CSV projection (analyst tooling, Timeline Explorer/Excel).
//
// Both exports are deterministic byte-for-byte given the same record array:
// object keys are recursively sorted before stringifying (the schema
// explicitly requires this for `extra`; we do it everywhere so the whole
// document is stable, which also makes round-trip and export tests exact
// string comparisons rather than "deep equal ignoring key order").

import { CSV_COLUMNS, recordToCsvRow } from '../lib/csv-projection.js';
import { stringifyCsvRow } from '../lib/csv.js';

/** Recursively sort object keys (arrays keep their element order). */
export function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value !== null && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      out[key] = sortKeysDeep(value[key]);
    }
    return out;
  }
  return value;
}

/** One canonical, key-sorted JSON line per record, '\n'-terminated. */
export function recordToJsonlLine(record) {
  return JSON.stringify(sortKeysDeep(record));
}

/** Serialize the whole SuperTimeline as JSONL text (no leading BOM - JSONL is
 * for full-fidelity machine consumption, not Excel). */
export function exportJsonl(records) {
  return records.map((r) => recordToJsonlLine(r) + '\n').join('');
}

/** Serialize the whole SuperTimeline as the timeline.csv projection: UTF-8
 * with BOM and CRLF line endings, per x-csv-projection, so Excel and
 * Eric Zimmerman's Timeline Explorer open it without an import wizard. */
export function exportCsv(records) {
  const bom = '﻿';
  const header = stringifyCsvRow(CSV_COLUMNS, ',');
  const rows = records.map((r) => stringifyCsvRow(recordToCsvRow(r), ','));
  return bom + [header, ...rows].join('\r\n') + '\r\n';
}

function fileNameFor(engagementId, ext) {
  const base = engagementId ? `supertimeline-${engagementId}` : 'supertimeline';
  return `${base}.${ext}`;
}

/** Build a downloadable Blob + suggested filename for JSONL export. Browser-
 * only convenience wrapper; exportJsonl() itself has no DOM dependency and is
 * what the tests exercise directly under Node. */
export function jsonlBlob(records, { engagementId } = {}) {
  return { blob: new Blob([exportJsonl(records)], { type: 'application/x-ndjson' }), fileName: fileNameFor(engagementId, 'jsonl') };
}

/** Build a downloadable Blob + suggested filename for CSV export. */
export function csvBlob(records, { engagementId } = {}) {
  return { blob: new Blob([exportCsv(records)], { type: 'text/csv' }), fileName: fileNameFor(engagementId, 'csv') };
}
