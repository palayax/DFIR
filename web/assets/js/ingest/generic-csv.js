// Ingest module for arbitrary CSV with an interactive column-mapping step.
// Two-phase use from a view:
//   1. const { headers, sampleRows, suggestedMapping } = await sniff(file)
//      -> render a mapping UI, let the analyst confirm/adjust it
//   2. for await (const record of parse(file, { mapping, defaults })) ...
//
// Robust against BOM, CRLF, quoted fields with embedded commas/newlines, and
// unknown delimiters (sniffed from the sample).

import { streamToAsyncIterable, peekText } from '../lib/streams.js';
import { CsvParser, stripBOM, sniffDelimiter, parseCsvSync } from '../lib/csv.js';
import { normalizeTimestamp, UNKNOWN_TS } from '../lib/timestamp.js';
import { computeRowHash } from '../lib/hash.js';

export async function detect(file) {
  return (file.name || '').toLowerCase().endsWith('.csv');
}

const SCHEMA_TARGET_FIELDS = ['timestamp_utc', 'timestamp_desc', 'source', 'artifact', 'host', 'user', 'message', 'target'];

function suggestMapping(headers) {
  const lower = headers.map((h) => h.toLowerCase());
  const find = (...candidates) => {
    for (const c of candidates) {
      const i = lower.indexOf(c);
      if (i !== -1) return headers[i];
    }
    return undefined;
  };
  return {
    timestamp_utc: find('timestamp_utc', 'timestamp', 'time', 'datetime', 'date', 'eventtime'),
    message: find('message', 'description', 'summary', 'event', 'details'),
    host: find('host', 'hostname', 'computer', 'system', 'computername'),
    user: find('user', 'username', 'account', 'accountname'),
    target: find('target', 'path', 'file', 'object', 'filename'),
    source: find('source', 'category'),
    artifact: find('artifact', 'collector', 'table', 'logtype', 'sourcetype'),
  };
}

/** Peek the file and propose a column mapping for the UI to confirm. */
export async function sniff(file, { sampleBytes = 65536 } = {}) {
  const text = stripBOM(await peekText(file, sampleBytes));
  const { delimiter, rows } = parseCsvSync(text);
  const headers = rows[0] || [];
  const sampleRows = rows.slice(1, 11);
  return {
    delimiter,
    headers,
    sampleRows,
    suggestedMapping: suggestMapping(headers),
    schemaFields: SCHEMA_TARGET_FIELDS,
  };
}

async function buildRecord(headers, row, mapping, defaults, fileName, rowIndex) {
  const idx = new Map(headers.map((h, i) => [h, i]));
  const get = (col) => (col && idx.has(col) ? row[idx.get(col)] : undefined);

  const timestamp_utc = normalizeTimestamp(mapping.timestamp_utc && get(mapping.timestamp_utc)) || UNKNOWN_TS;
  const record = {
    schema_version: '1.0.0',
    timestamp_utc,
    timestamp_desc: defaults.timestamp_desc || 'EventTime',
    source: (mapping.source && get(mapping.source)) || defaults.source || 'other',
    artifact: (mapping.artifact && get(mapping.artifact)) || defaults.artifact || `generic-csv:${fileName}`,
    host: (mapping.host && get(mapping.host)) || defaults.host || 'unknown-host',
    message: (mapping.message && get(mapping.message)) || defaults.message || row.join(' | '),
  };
  const user = mapping.user && get(mapping.user);
  if (user) record.user = user;
  const target = mapping.target && get(mapping.target);
  if (target) record.target = target;

  record.extra = {
    generic_csv_row_index: rowIndex,
    generic_csv_raw: Object.fromEntries(headers.map((h, i) => [h, row[i]])),
  };
  record.row_hash = await computeRowHash(record);
  return record;
}

/**
 * @param {File} file
 * @param {{ mapping: Record<string,string>, defaults?: object, delimiter?: string }} opts
 */
export async function* parse(file, opts = {}) {
  const { mapping } = opts;
  if (!mapping) throw new Error('generic-csv: parse() requires opts.mapping — call sniff() first to build a mapping UI.');
  const defaults = opts.defaults || {};
  const stream = file.stream().pipeThrough(new TextDecoderStream('utf-8'));
  let headers = null;
  let parser = null;
  let strippedBOM = false;
  let rowIndex = 0;

  async function* emit(rows) {
    for (const row of rows) {
      if (!headers) {
        headers = row;
        continue;
      }
      if (row.length === 1 && row[0] === '') continue;
      yield await buildRecord(headers, row, mapping, defaults, file.name, rowIndex++);
    }
  }

  for await (let chunk of streamToAsyncIterable(stream)) {
    if (!strippedBOM) {
      chunk = stripBOM(chunk);
      strippedBOM = true;
    }
    if (!parser) parser = new CsvParser({ delimiter: opts.delimiter || sniffDelimiter(chunk) });
    yield* emit(parser.feed(chunk));
  }
  if (parser) yield* emit(parser.end());
}
