// Ingest module for the flattened IRTriage timeline.csv projection.
// Reverses the flattening described in docs/timeline_schema.json's
// x-csv-projection block back into nested schema records (see
// lib/csv-projection.js for the shared flatten/unflatten logic that
// merge/export.js uses in the opposite direction).
//
// Interface: detect(file) -> Promise<boolean>, parse(file, opts) -> AsyncIterable<Record>

import { streamToAsyncIterable, peekText } from '../lib/streams.js';
import { CsvParser, stripBOM, sniffDelimiter } from '../lib/csv.js';
import { csvRowToRecord, CSV_COLUMNS } from '../lib/csv-projection.js';

export async function detect(file) {
  const name = (file.name || '').toLowerCase();
  if (!name.endsWith('.csv')) return false;
  const head = stripBOM(await peekText(file, 8192));
  const firstLine = (head.split(/\r\n|\r|\n/, 1)[0] || '');
  // Recognise the native projection specifically by its distinctive, fixed
  // leading columns (generic-csv.js handles anything else with a mapping UI).
  const required = ['timestamp_utc', 'timestamp_desc', 'source', 'artifact', 'row_hash'];
  return required.every((col) => firstLine.includes(col));
}

/**
 * @param {File} file
 * @param {{ delimiter?: string }} [opts]
 */
export async function* parse(file, opts = {}) {
  const stream = file.stream().pipeThrough(new TextDecoderStream('utf-8'));
  let headers = null;
  let parser = null;
  let strippedBOM = false;
  const delimiter = opts.delimiter;

  function* emit(rows) {
    for (const row of rows) {
      if (!headers) {
        headers = row;
        continue;
      }
      if (row.length === 1 && row[0] === '') continue; // trailing blank line
      const obj = {};
      headers.forEach((h, i) => { obj[h] = row[i] ?? ''; });
      yield csvRowToRecord(obj);
    }
  }

  for await (let chunk of streamToAsyncIterable(stream)) {
    if (!strippedBOM) {
      chunk = stripBOM(chunk);
      strippedBOM = true;
    }
    if (!parser) parser = new CsvParser({ delimiter: delimiter || sniffDelimiter(chunk) });
    yield* emit(parser.feed(chunk));
  }
  if (parser) yield* emit(parser.end());
}

export { CSV_COLUMNS };
