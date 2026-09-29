import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { mergeSuperTimeline, buildDedupeKey, compareRecords, unionDetections } from '../assets/js/merge/supertimeline.js';
import { computeRowHash } from '../assets/js/lib/hash.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FIXTURES = path.join(HERE, '..', 'fixtures');

async function loadJsonl(file) {
  const text = await readFile(path.join(FIXTURES, file), 'utf8');
  return text.split('\n').filter((l) => l.trim()).map((l) => JSON.parse(l));
}

function shuffled(arr, seed) {
  // Deterministic Fisher-Yates using a tiny LCG so "shuffled differently"
  // runs are reproducible across test invocations.
  let s = seed;
  const rand = () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; };
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

async function baseRecord(overrides = {}) {
  const rec = {
    schema_version: '1.0.0',
    timestamp_utc: '2026-05-01T00:00:00.0000000Z',
    timestamp_desc: 'Modified',
    source: 'filesystem',
    artifact: 'Generic.Collectors.File',
    host: 'HOST-A',
    message: 'a file changed',
    ...overrides,
  };
  rec.row_hash = await computeRowHash(rec);
  return rec;
}

test('merging one source with no duplicates: rowsIn === rowsOut, zero duplicates', async () => {
  const records = await loadJsonl('irtriage-sample.jsonl');
  const { records: merged, stats } = await mergeSuperTimeline([
    { id: 'a', label: 'Host1', fileName: 'irtriage-sample.jsonl', records },
  ]);
  assert.equal(stats.totalRowsIn, records.length);
  assert.equal(stats.totalRowsOut, records.length);
  assert.equal(stats.duplicatesRemoved, 0);
  assert.equal(merged.length, records.length);
});

test('exact duplicate rows (same row_hash, same host_id) collapse into one and are counted', async () => {
  const rec = await baseRecord({ host_id: 'GUID-1' });
  const { records, stats } = await mergeSuperTimeline([
    { id: 'a', label: 'A', fileName: 'a.jsonl', records: [rec] },
    { id: 'b', label: 'B', fileName: 'b.jsonl', records: [{ ...rec }] },
  ]);
  assert.equal(records.length, 1);
  assert.equal(stats.duplicatesRemoved, 1);
  assert.equal(stats.totalRowsIn, 2);
  assert.equal(stats.totalRowsOut, 1);
});

test('detections union: duplicate rows contribute distinct detections that get merged, not duplicated', async () => {
  const recA = await baseRecord({ host_id: 'GUID-1' });
  recA.detections = [{ engine: 'sigma', rule_id: 'R1', rule_name: 'Rule One', severity: 'medium' }];
  const recB = { ...recA, detections: [{ engine: 'yara', rule_id: 'R2', rule_name: 'Rule Two', severity: 'high' }] };

  const { records } = await mergeSuperTimeline([
    { id: 'a', label: 'A', fileName: 'a.jsonl', records: [recA] },
    { id: 'b', label: 'B', fileName: 'b.jsonl', records: [recB] },
  ]);
  assert.equal(records.length, 1);
  assert.equal(records[0].detections.length, 2);
  assert.equal(records[0].severity_max, 'high');
  const names = records[0].detections.map((d) => d.rule_name).sort();
  assert.deepEqual(names, ['Rule One', 'Rule Two']);
});

test('detections union: the SAME rule reported twice (same engine+rule_id) is not duplicated, and severity/mitre are unioned', async () => {
  const recA = await baseRecord({ host_id: 'GUID-1' });
  recA.detections = [{ engine: 'sigma', rule_id: 'R1', rule_name: 'Rule One', severity: 'medium', mitre_techniques: ['T1059'] }];
  const recB = { ...recA, detections: [{ engine: 'sigma', rule_id: 'R1', rule_name: 'Rule One', severity: 'high', mitre_techniques: ['T1059.001'] }] };

  const { records } = await mergeSuperTimeline([
    { id: 'a', label: 'A', fileName: 'a.jsonl', records: [recA] },
    { id: 'b', label: 'B', fileName: 'b.jsonl', records: [recB] },
  ]);
  assert.equal(records[0].detections.length, 1);
  assert.equal(records[0].detections[0].severity, 'high');
  assert.deepEqual(records[0].detections[0].mitre_techniques, ['T1059', 'T1059.001']);
});

test('clock-skew correction shifts timestamp_utc and preserves the original in extra.original_timestamp_utc', async () => {
  const rec = await baseRecord({ timestamp_utc: '2026-05-01T00:00:00.1234567Z' });
  rec.row_hash = await computeRowHash(rec);
  const { records } = await mergeSuperTimeline([
    { id: 'a', label: 'A', fileName: 'a.jsonl', records: [rec], skewSeconds: 90 },
  ]);
  assert.equal(records[0].timestamp_utc, '2026-05-01T00:01:30.1234567Z');
  assert.equal(records[0].extra.original_timestamp_utc, '2026-05-01T00:00:00.1234567Z');
  // row_hash must be untouched by skew - it is an origin-stamped identity marker.
  assert.equal(records[0].row_hash, rec.row_hash);
});

test('clock-skew is never applied to the unknown-timestamp sentinel', async () => {
  const rec = await baseRecord({ timestamp_utc: '0001-01-01T00:00:00.0000000Z' });
  rec.row_hash = await computeRowHash(rec);
  const { records } = await mergeSuperTimeline([
    { id: 'a', label: 'A', fileName: 'a.jsonl', records: [rec], skewSeconds: 3600 },
  ]);
  assert.equal(records[0].timestamp_utc, '0001-01-01T00:00:00.0000000Z');
  assert.equal(records[0].extra.original_timestamp_utc, undefined);
});

test('multi-host safety: identical row content but different host_id is NEVER collapsed, even when the hostname string matches', async () => {
  const shared = { timestamp_utc: '2026-06-01T00:00:00.0000000Z', timestamp_desc: 'Modified', source: 'filesystem', artifact: 'Generic.Collectors.File', host: 'DESKTOP-SAME-NAME', message: 'identical event' };
  const recX = { schema_version: '1.0.0', ...shared, host_id: 'MACHINE-GUID-X' };
  recX.row_hash = await computeRowHash(recX); // host string is part of the hash, but host_id is not
  const recY = { schema_version: '1.0.0', ...shared, host_id: 'MACHINE-GUID-Y' };
  recY.row_hash = await computeRowHash(recY);
  assert.equal(recX.row_hash, recY.row_hash, 'row_hash intentionally does not include host_id');

  const { records, stats } = await mergeSuperTimeline([
    { id: 'x', label: 'X', fileName: 'x.jsonl', records: [recX] },
    { id: 'y', label: 'Y', fileName: 'y.jsonl', records: [recY] },
  ]);
  assert.equal(records.length, 2, 'two different machines must remain two rows');
  assert.equal(stats.duplicatesRemoved, 0);
  assert.equal(stats.hostCount, 2);
});

test('source tagging: a row contributed by two files gets an array of source_file/source_label', async () => {
  const rec = await baseRecord({ host_id: 'GUID-1' });
  const { records } = await mergeSuperTimeline([
    { id: 'a', label: 'Collection A', fileName: 'first.jsonl', records: [rec] },
    { id: 'b', label: 'Collection B', fileName: 'second.jsonl', records: [{ ...rec }] },
  ]);
  assert.deepEqual(records[0].extra.source_file, ['first.jsonl', 'second.jsonl']);
  assert.deepEqual(records[0].extra.source_label, ['Collection A', 'Collection B']);
});

test('source tagging: a row from a single file gets a scalar source_file/source_label, not a 1-element array', async () => {
  const rec = await baseRecord();
  const { records } = await mergeSuperTimeline([{ id: 'a', label: 'Only Source', fileName: 'only.jsonl', records: [rec] }]);
  assert.equal(records[0].extra.source_file, 'only.jsonl');
  assert.equal(records[0].extra.source_label, 'Only Source');
});

test('buildDedupeKey composites row_hash and host_id', async () => {
  const rec = await baseRecord({ host_id: 'GUID-1' });
  assert.equal(buildDedupeKey(rec), `${rec.row_hash}\u0000GUID-1`);
  const noHostId = await baseRecord();
  assert.equal(buildDedupeKey(noHostId), `${noHostId.row_hash}\u0000`);
});

test('compareRecords establishes the schema total order plus host_id tiebreaker', async () => {
  const a = { timestamp_utc: '2026-01-01T00:00:00.0000000Z', source: 'a', artifact: 'a', row_hash: 'aa', host_id: '1' };
  const b = { timestamp_utc: '2026-01-01T00:00:00.0000000Z', source: 'a', artifact: 'a', row_hash: 'aa', host_id: '2' };
  assert.ok(compareRecords(a, b) < 0);
  assert.ok(compareRecords(b, a) > 0);
  assert.equal(compareRecords(a, { ...a }), 0);
});

test('unionDetections output order does not depend on argument order', () => {
  const d1 = { engine: 'sigma', rule_id: 'R1', rule_name: 'A', severity: 'low' };
  const d2 = { engine: 'yara', rule_id: 'R2', rule_name: 'B', severity: 'high' };
  const forward = unionDetections([d1], [d2]);
  const backward = unionDetections([d2], [d1]);
  assert.deepEqual(forward, backward);
});

test('determinism: merging the same 200-row + 30-row fixtures produces byte-identical output regardless of input file order or in-file row order (3 runs)', async () => {
  const host1 = await loadJsonl('irtriage-sample.jsonl');
  const host2 = await loadJsonl('irtriage-sample-host2.jsonl');

  const run = async (seed) => {
    const sources = seed === 0
      ? [
          { id: 'h1', label: 'Host1', fileName: 'irtriage-sample.jsonl', records: host1 },
          { id: 'h2', label: 'Host2', fileName: 'irtriage-sample-host2.jsonl', records: host2 },
        ]
      : [
          { id: 'h2', label: 'Host2', fileName: 'irtriage-sample-host2.jsonl', records: shuffled(host2, seed) },
          { id: 'h1', label: 'Host1', fileName: 'irtriage-sample.jsonl', records: shuffled(host1, seed) },
        ];
    const { records, stats } = await mergeSuperTimeline(sources);
    return { json: JSON.stringify(records), stats: JSON.stringify({ ...stats, perSource: undefined }) };
  };

  const run1 = await run(0);
  const run2 = await run(42);
  const run3 = await run(999);

  assert.equal(run1.json, run2.json, 'run 1 vs run 2 (different order/shuffle) must be byte-identical');
  assert.equal(run2.json, run3.json, 'run 2 vs run 3 (different shuffle seed) must be byte-identical');
  assert.equal(run1.stats, run2.stats);
  assert.equal(run2.stats, run3.stats);
});

test('merge statistics: rowsIn/out, hosts, sources, artifacts, severity counts are correct on the fixtures', async () => {
  const host1 = await loadJsonl('irtriage-sample.jsonl');
  const host2 = await loadJsonl('irtriage-sample-host2.jsonl');
  const { stats } = await mergeSuperTimeline([
    { id: 'h1', label: 'Host1', fileName: 'irtriage-sample.jsonl', records: host1 },
    { id: 'h2', label: 'Host2', fileName: 'irtriage-sample-host2.jsonl', records: host2 },
  ]);
  assert.equal(stats.totalRowsIn, host1.length + host2.length);
  assert.equal(stats.totalRowsOut, host1.length + host2.length); // fixtures are built with no cross-file dupes
  assert.equal(stats.duplicatesRemoved, 0);
  assert.equal(stats.hostCount, 2);
  assert.ok(stats.sources.length > 0);
  assert.ok(stats.artifacts.length > 0);
  const expectedDetections = [...host1, ...host2].reduce((n, r) => n + (r.detections?.length || 0), 0);
  assert.equal(stats.totalDetections, expectedDetections);
  assert.equal(stats.perSource.length, 2);
  assert.equal(stats.perSource[0].rowsIn, host1.length);
  assert.equal(stats.perSource[1].rowsIn, host2.length);
});

test('sorted output is monotonically non-decreasing by the total order', async () => {
  const host1 = await loadJsonl('irtriage-sample.jsonl');
  const host2 = await loadJsonl('irtriage-sample-host2.jsonl');
  const { records } = await mergeSuperTimeline([
    { id: 'h1', label: 'Host1', fileName: 'irtriage-sample.jsonl', records: host1 },
    { id: 'h2', label: 'Host2', fileName: 'irtriage-sample-host2.jsonl', records: host2 },
  ]);
  for (let i = 1; i < records.length; i++) {
    assert.ok(compareRecords(records[i - 1], records[i]) <= 0, `records not sorted at index ${i}`);
  }
});
