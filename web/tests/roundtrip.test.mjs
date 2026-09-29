import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { exportJsonl, exportCsv, sortKeysDeep, recordToJsonlLine } from '../assets/js/merge/export.js';
import { CSV_COLUMNS, csvRowToRecord } from '../assets/js/lib/csv-projection.js';
import { parseCsvSync, stripBOM } from '../assets/js/lib/csv.js';
import * as jsonlIngest from '../assets/js/ingest/irtriage-jsonl.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(HERE, '..', 'fixtures');

async function loadJsonl(file) {
  const text = await readFile(path.join(FIXTURES, file), 'utf8');
  return text.split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
}

test('sortKeysDeep sorts keys at every nesting level, arrays keep element order', () => {
  const input = { b: 2, a: { d: 4, c: [{ z: 1, y: 2 }] } };
  const sorted = sortKeysDeep(input);
  assert.deepEqual(Object.keys(sorted), ['a', 'b']);
  assert.deepEqual(Object.keys(sorted.a), ['c', 'd']);
  assert.deepEqual(Object.keys(sorted.a.c[0]), ['y', 'z']);
});

test('exportJsonl is byte-for-byte deterministic across repeated calls, independent of input key order', async () => {
  const records = await loadJsonl('irtriage-sample.jsonl');
  const shuffledKeyRecords = records.map((r) => {
    const keys = Object.keys(r).sort(() => 0.5 - Math.random());
    const out = {};
    for (const k of keys) out[k] = r[k];
    return out;
  });
  const a = exportJsonl(records);
  const b = exportJsonl(shuffledKeyRecords);
  assert.equal(a, b, 'export must not depend on input object key order');
  assert.equal(exportJsonl(records), a, 'export must be repeatable');
});

test('JSONL round trip: export then re-ingest via irtriage-jsonl reproduces identical records', async () => {
  const records = await loadJsonl('irtriage-sample.jsonl');
  const text = exportJsonl(records);
  const file = new File([text], 'roundtrip.jsonl');
  const out = [];
  for await (const r of jsonlIngest.parse(file)) out.push(r);
  assert.equal(out.length, records.length);
  for (let i = 0; i < records.length; i++) {
    assert.deepEqual(out[i], records[i], `record ${i} did not round-trip through JSONL export/import`);
  }
});

test('recordToJsonlLine output parses back to a deep-equal object', async () => {
  const records = await loadJsonl('irtriage-sample.jsonl');
  for (const r of records.slice(0, 20)) {
    const line = recordToJsonlLine(r);
    assert.deepEqual(JSON.parse(line), r);
  }
});

test('CSV round trip: exportCsv carries UTF-8 BOM and CRLF line endings per x-csv-projection', async () => {
  const records = await loadJsonl('irtriage-sample.jsonl');
  const text = exportCsv(records.slice(0, 5));
  assert.equal(text.charCodeAt(0), 0xfeff);
  assert.ok(text.includes('\r\n'));
});

test('CSV round trip: fields with a dedicated CSV column survive export -> parse -> unflatten for CSV-safe (<=1 detection) records', async () => {
  const records = await loadJsonl('irtriage-sample.jsonl');
  const csvSafe = records.filter((r) => (r.detections || []).length <= 1);
  assert.ok(csvSafe.length > 20, 'fixture should contain plenty of CSV-safe rows');

  const text = exportCsv(csvSafe);
  const withoutBom = stripBOM(text);
  const { rows } = parseCsvSync(withoutBom, { delimiter: ',' });
  const [header, ...dataRows] = rows;
  assert.deepEqual(header, CSV_COLUMNS);

  for (let i = 0; i < dataRows.length; i++) {
    const rowObj = {};
    CSV_COLUMNS.forEach((col, idx) => { rowObj[col] = dataRows[i][idx]; });
    const reconstructed = csvRowToRecord(rowObj);
    const original = csvSafe[i];

    assert.equal(reconstructed.timestamp_utc, original.timestamp_utc);
    assert.equal(reconstructed.source, original.source);
    assert.equal(reconstructed.artifact, original.artifact);
    assert.equal(reconstructed.host, original.host);
    assert.equal(reconstructed.message, original.message);
    assert.equal(reconstructed.target, original.target);
    assert.equal(reconstructed.row_hash, original.row_hash);
    if (original.detections?.length) {
      assert.equal(reconstructed.detections.length, 1);
      assert.equal(reconstructed.detections[0].rule_name, original.detections[0].rule_name);
      assert.equal(reconstructed.detections[0].severity, original.detections[0].severity);
      assert.equal(reconstructed.detections[0].engine, original.detections[0].engine);
    } else {
      assert.equal(reconstructed.detections, undefined);
    }
  }
});

test('CSV round trip is documented as lossy for multi-detection rows: exporting and reimporting a 2-detection row does not claim false fidelity', async () => {
  const records = await loadJsonl('irtriage-sample.jsonl');
  const multi = records.find((r) => (r.detections || []).length > 1);
  assert.ok(multi, 'fixture should contain at least one multi-detection row');
  const text = exportCsv([multi]);
  const { rows } = parseCsvSync(stripBOM(text), { delimiter: ',' });
  const rowObj = {};
  CSV_COLUMNS.forEach((col, idx) => { rowObj[col] = rows[1][idx]; });
  const reconstructed = csvRowToRecord(rowObj);
  // Best-effort reconstruction recovers the same COUNT of detections...
  assert.equal(reconstructed.detections.length, multi.detections.length);
  // ...and the same rule names/severities (index-aligned per x-csv-projection)...
  assert.deepEqual(reconstructed.detections.map((d) => d.rule_name), multi.detections.map((d) => d.rule_name));
  // ...but per-detection engine attribution is a best-effort heuristic once more
  // than one engine contributed, not a guaranteed-exact reconstruction - this
  // test documents that limitation rather than asserting an impossible fidelity.
});
