// Ingest module for arbitrary JSON: either a top-level JSON array of objects,
// or JSONL (one object per line) — auto-detected — with an interactive
// field-mapping step, mirroring generic-csv.js.
//
// Note on streaming: JSONL is read line-by-line and scales to very large
// files. A single top-level JSON *array*, by contrast, is parsed as one
// document (JSON.parse can't be resumed mid-structure without a real
// streaming JSON parser) — documented limitation for very large plain-array
// inputs; prefer JSONL for anything huge.

import { readLines, peekText } from '../lib/streams.js';
import { normalizeTimestamp, UNKNOWN_TS } from '../lib/timestamp.js';
import { computeRowHash } from '../lib/hash.js';

export async function detect(file) {
  const name = (file.name || '').toLowerCase();
  return name.endsWith('.json') || name.endsWith('.jsonl') || name.endsWith('.ndjson');
}

function getPath(obj, path) {
  if (!path) return undefined;
  return path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

function flattenKeys(obj, prefix = '', depth = 0, out = []) {
  if (depth > 2 || obj == null || typeof obj !== 'object' || Array.isArray(obj)) return out;
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    out.push(path);
    if (v && typeof v === 'object' && !Array.isArray(v)) flattenKeys(v, path, depth + 1, out);
  }
  return out;
}

function suggestMapping(sampleObj) {
  const keys = flattenKeys(sampleObj);
  const lowerMap = new Map(keys.map((k) => [k.toLowerCase(), k]));
  const find = (...cands) => {
    for (const c of cands) if (lowerMap.has(c)) return lowerMap.get(c);
    return undefined;
  };
  return {
    timestamp_utc: find('timestamp_utc', 'timestamp', 'time', 'datetime', 'date', 'eventtime', '@timestamp'),
    message: find('message', 'description', 'summary', 'event'),
    host: find('host', 'hostname', 'computer', 'system'),
    user: find('user', 'username', 'account'),
    target: find('target', 'path', 'file', 'object'),
    source: find('source', 'category'),
    artifact: find('artifact', 'collector', 'table', 'logtype'),
  };
}

async function firstMeaningfulChar(file) {
  const head = await peekText(file, 256);
  const trimmed = head.trimStart();
  return trimmed[0];
}

async function firstSampleObject(file) {
  const first = await firstMeaningfulChar(file);
  if (first === '[') {
    const text = await file.text();
    const arr = JSON.parse(text);
    return Array.isArray(arr) ? arr[0] : arr;
  }
  for await (const line of readLines(file)) {
    const t = line.trim();
    if (!t) continue;
    return JSON.parse(t);
  }
  return undefined;
}

/** Peek the file and propose a field mapping for the UI to confirm. */
export async function sniff(file) {
  const sample = await firstSampleObject(file);
  return {
    sample,
    keys: flattenKeys(sample || {}),
    suggestedMapping: sample ? suggestMapping(sample) : {},
  };
}

async function buildRecordFromObject(obj, mapping, defaults, fileName, rowIndex) {
  const get = (path) => (path ? getPath(obj, path) : undefined);
  const timestamp_utc = normalizeTimestamp(get(mapping.timestamp_utc)) || UNKNOWN_TS;
  const record = {
    schema_version: '1.0.0',
    timestamp_utc,
    timestamp_desc: defaults.timestamp_desc || 'EventTime',
    source: get(mapping.source) || defaults.source || 'other',
    artifact: get(mapping.artifact) || defaults.artifact || `generic-json:${fileName}`,
    host: get(mapping.host) || defaults.host || 'unknown-host',
    message: (typeof get(mapping.message) === 'string' && get(mapping.message)) || defaults.message || JSON.stringify(obj).slice(0, 500),
  };
  const user = get(mapping.user);
  if (user) record.user = String(user);
  const target = get(mapping.target);
  if (target) record.target = String(target);
  record.extra = { generic_json_row_index: rowIndex, generic_json_raw: obj };
  record.row_hash = await computeRowHash(record);
  return record;
}

/**
 * @param {File} file
 * @param {{ mapping: Record<string,string>, defaults?: object }} opts
 */
export async function* parse(file, opts = {}) {
  const { mapping } = opts;
  if (!mapping) throw new Error('generic-json: parse() requires opts.mapping — call sniff() first to build a mapping UI.');
  const defaults = opts.defaults || {};
  const first = await firstMeaningfulChar(file);
  let i = 0;
  if (first === '[') {
    const text = await file.text();
    const arr = JSON.parse(text);
    if (!Array.isArray(arr)) throw new Error(`generic-json: "${file.name}" is a single JSON object, not an array — treating it as one record.`);
    for (const obj of arr) yield await buildRecordFromObject(obj, mapping, defaults, file.name, i++);
  } else {
    for await (const line of readLines(file)) {
      const t = line.trim();
      if (!t) continue;
      let obj;
      try {
        obj = JSON.parse(t);
      } catch (err) {
        throw new Error(`generic-json: invalid JSON on line ${i + 1} of "${file.name}": ${err.message}`);
      }
      yield await buildRecordFromObject(obj, mapping, defaults, file.name, i++);
    }
  }
}
