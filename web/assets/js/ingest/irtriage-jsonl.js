// Ingest module for the native IRTriage timeline.jsonl: already schema
// conformant (one JSON object per line), so this is the fast path — but we
// still validate on request, since a truncated upload or a hand-edited file
// is exactly the kind of thing an analyst will feed this tool.
//
// Interface: detect(file) -> Promise<boolean>, parse(file, opts) -> AsyncIterable<Record>

import { readLines } from '../lib/streams.js';
import { validateRecord } from '../lib/validate-schema.js';

export async function detect(file) {
  const name = (file.name || '').toLowerCase();
  if (!name.endsWith('.jsonl') && !name.endsWith('.ndjson')) return false;
  for await (const line of readLines(file)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      const obj = JSON.parse(trimmed);
      return !!(obj && typeof obj === 'object' &&
        'row_hash' in obj && 'timestamp_utc' in obj && 'schema_version' in obj);
    } catch {
      return false;
    }
  }
  return false;
}

/**
 * @param {File} file
 * @param {{ validate?: boolean, onWarning?: (msg: string) => void }} [opts]
 */
export async function* parse(file, opts = {}) {
  let lineNo = 0;
  for await (const line of readLines(file)) {
    lineNo++;
    const trimmed = line.trim();
    if (!trimmed) continue;
    let record;
    try {
      record = JSON.parse(trimmed);
    } catch (err) {
      throw new Error(`irtriage-jsonl: invalid JSON on line ${lineNo} of "${file.name}": ${err.message}`);
    }
    if (opts.validate) {
      const { valid, errors } = await validateRecord(record);
      if (!valid && opts.onWarning) {
        opts.onWarning(`irtriage-jsonl: ${file.name}:${lineNo} failed schema validation: ${errors[0]?.message ?? 'unknown error'}`);
      }
    }
    yield record;
  }
}
