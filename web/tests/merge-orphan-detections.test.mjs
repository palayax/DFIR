import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeSuperTimeline, buildDedupeKey } from '../assets/js/merge/supertimeline.js';

// Regression guard for a bug that silently destroyed forensic evidence.
//
// The client used to emit row_hash: "" on unjoined ("orphan") detection records, so
// every orphan shared the dedupe key "\0" and N distinct detections collapsed into
// ONE merged row -- counted as "duplicates removed", i.e. indistinguishable from
// correct behaviour. Reproduced end-to-end with 3 YARA rules matching 3 different
// files: the client emitted 3 rows, the merge produced 1, and 2 matched file paths
// were permanently lost.
//
// "Which file did this rule match" is the most important fact about a YARA hit, and
// unjoined is the COMMON case: when Windows.NTFS.MFT returns 0 rows on an unelevated
// run, there is nothing to join to, so every YARA and Nuclei hit becomes an orphan.
//
// Fixed on both sides: the client now hashes orphan records, and buildDedupeKey
// refuses to treat an unhashable record as a duplicate of an unrelated one (so
// archives from an older client build are also safe).
//
// Paths use forward slashes purely to keep the fixtures free of escape hazards.

function orphan(ruleName, target, rowHash = '') {
  return {
    schema_version: '1.0.0',
    row_hash: rowHash,
    timestamp_utc: '0001-01-01T00:00:00.0000000Z',
    timestamp_desc: 'Unknown',
    source: 'detection',
    artifact: 'detection.yara',
    collector_kind: 'yara',
    host: 'HOST1',
    message: `yara detection (unjoined): ${ruleName}`,
    target,
    detections: [{ engine: 'yara', rule_id: ruleName, rule_name: ruleName, severity: 'high' }],
    severity_max: 'high',
    detection_count: 1,
  };
}

const src = (records) => [{ id: 'a', label: 'run1', fileName: 'r1.jsonl', records }];

test('distinct orphan detections with EMPTY row_hash all survive the merge', async () => {
  const { records } = await mergeSuperTimeline(src([
    orphan('MARK_A', 'C:/scan/alpha.txt'),
    orphan('MARK_B', 'C:/scan/bravo.txt'),
    orphan('MARK_C', 'C:/scan/charlie.txt'),
  ]));

  assert.equal(records.length, 3, 'all three unjoined detections must survive the merge');
  assert.deepEqual(
    records.map((r) => r.target).sort(),
    ['C:/scan/alpha.txt', 'C:/scan/bravo.txt', 'C:/scan/charlie.txt'],
    'every matched file path must be preserved',
  );
  assert.deepEqual(
    records.flatMap((r) => r.detections.map((d) => d.rule_name)).sort(),
    ['MARK_A', 'MARK_B', 'MARK_C'],
  );
});

test('two different rules hitting the SAME file stay distinct without a row_hash', async () => {
  const { records } = await mergeSuperTimeline(src([
    orphan('MARK_A', 'C:/scan/alpha.txt'),
    orphan('MARK_D', 'C:/scan/alpha.txt'),
  ]));
  assert.equal(records.length, 2);
});

test('genuinely identical unhashed rows still dedupe (the guard is not a no-op)', async () => {
  const { records, stats } = await mergeSuperTimeline(src([
    orphan('MARK_A', 'C:/scan/alpha.txt'),
    orphan('MARK_A', 'C:/scan/alpha.txt'),
  ]));
  assert.equal(records.length, 1, 'identical rows should still collapse to one');
  assert.equal(stats.duplicatesRemoved, 1);
});

test('properly hashed orphans dedupe on their hash, as normal', async () => {
  const h = 'a'.repeat(64);
  const { records } = await mergeSuperTimeline(src([
    orphan('MARK_A', 'C:/scan/alpha.txt', h),
    orphan('MARK_A', 'C:/scan/alpha.txt', h),
  ]));
  assert.equal(records.length, 1);
});

test('buildDedupeKey rejects malformed hashes, not just empty ones', () => {
  const bad = ['', '   ', 'NOTAHASH', 'A'.repeat(64), 'a'.repeat(63), undefined, null, 12345];
  for (const v of bad) {
    const key = buildDedupeKey({ ...orphan('R', 'C:/x'), row_hash: v });
    assert.ok(key.startsWith('unhashed:'), `expected fallback key for row_hash=${JSON.stringify(v)}`);
  }
  const good = buildDedupeKey({ ...orphan('R', 'C:/x'), row_hash: 'b'.repeat(64) });
  assert.ok(!good.startsWith('unhashed:'), 'a valid hash must be used directly');
});
