// web/tests/analysis-reduce-scale.test.mjs
//
// WHY THIS FILE EXISTS
// --------------------
// The Analyze step had never been run on real evidence. The first time it was --
// a 480,581-row timeline from a real domain-controller collection -- it died
// immediately:
//
//   RangeError: Maximum call stack size exceeded
//     at rankRows (analysis/reduce.js:237)   <- Math.min(...allMs)
//     at buildEvidencePacks
//     at previewPlan
//
// Spreading an array into a FUNCTION CALL passes one argument per element, so it
// is bounded by the engine's argument limit. Measured in this Node/V8 build:
// 124,000 elements is fine and 125,000 throws -- and because the real limit
// depends on how much stack is left, the threshold is not stable, which makes it
// exactly the kind of bug that shows up only on someone else's data. Spreading
// into an ARRAY LITERAL (`[...map.values()]`, which merge/ and dashboard.js use
// freely) has no such limit.
//
// The entire existing suite passed, before and after the fix, because every
// fixture in web/tests/ is tens to a few thousand rows. rankRows is the FIRST
// thing buildEvidencePacks calls, so nothing downstream of it -- packing, the map
// phase, report assembly, the renderer, the PDF writer -- had ever executed at a
// real row count either. A green suite meant nothing here.
//
// So these tests assert the one property the fixtures cannot: the reduction works
// at a row count ABOVE the argument limit. 200,000 is a deliberate margin over
// the measured ~124k, and the records are as small as the code permits so the
// test stays quick (~1-2 s) and memory-cheap.
//
// If this file ever becomes slow enough to be annoying, shrink the RECORD SHAPE,
// not the COUNT. The count is the entire point.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { rankRows, buildEvidencePacks } from '../assets/js/analysis/reduce.js';

// Comfortably above the measured ~124,000-argument limit, and above any plausible
// future increase to it.
const N = 200_000;
const BASE = Date.UTC(2026, 0, 10, 0, 0, 0);

/** Minimal valid timeline rows. row_hash must be unique: selection and dedupe
 *  both key on it, so repeated hashes would collapse the set and silently
 *  reduce the row count this test is here to exercise. */
function manyRecords(n, { dated = true } = {}) {
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    out[i] = {
      row_hash: String(i).padStart(64, '0'),
      timestamp_utc: dated ? new Date(BASE + i * 1000).toISOString() : '',
      host: 'H',
      source: 'filesystem',
      artifact: 'Windows.NTFS.MFT',
      message: 'm',
      target: 't',
    };
  }
  return out;
}

test('rankRows survives more rows than the engine argument limit (Math.min spread)', () => {
  const records = manyRecords(N);
  // Before the fix this threw RangeError here, not later.
  const ranked = rankRows(records);
  assert.equal(ranked.length, N, 'every input row must survive ranking');
  // Ranking is a permutation, not a filter: no row invented, none lost.
  assert.equal(new Set(ranked.map((r) => r.row_hash)).size, N);
});

test('rankRows survives when EVERY row is undated (degenerate time span)', () => {
  // This exercises selectTier4's degenerate-span branch, NOT the undated spread:
  // with no dated row at all, earliestMs is undefined and the function returns
  // early, so `undated` is never populated. Kept as its own case because it is a
  // real shape and the early return is the thing being asserted.
  const records = manyRecords(N, { dated: false });
  const ranked = rankRows(records);
  assert.equal(ranked.length, N);
  assert.equal(new Set(ranked.map((r) => r.row_hash)).size, N);
});

test('rankRows survives a LARGE undated set alongside dated rows (the undated spread)', () => {
  // THIS is the case that reaches `undated`, and getting it wrong is how the
  // first version of this file passed against the buggy code.
  //
  // selectTier4 only populates `undated` when the span is valid, which needs at
  // least two distinct dated timestamps. An even 50/50 split of 200k also did not
  // reproduce, because 100k undated rows sit just UNDER the ~124k argument limit.
  // So the undated set itself has to exceed the limit.
  //
  // Not a contrived shape: before the MFT/EVTX timestamp-mapping fix (commit
  // b5b63c7) a real collection put 476,357 of 477,010 rows on the zero sentinel
  // while a few hundred rows carried real times -- exactly this distribution.
  const records = manyRecords(N);
  for (let i = 100; i < records.length; i++) records[i].timestamp_utc = '';
  const undatedCount = records.filter((r) => !r.timestamp_utc).length;
  assert.ok(undatedCount > 150_000, `undated set must exceed the argument limit, got ${undatedCount}`);

  const ranked = rankRows(records);
  assert.equal(ranked.length, N);
  assert.equal(new Set(ranked.map((r) => r.row_hash)).size, N);
});

test('buildEvidencePacks reduces a timeline larger than the argument limit', async () => {
  const records = manyRecords(N);
  const { packs, stats, digest } = await buildEvidencePacks(records);

  assert.ok(packs.length > 0, 'must produce at least one evidence pack');
  // buildEvidencePacks' stats report rowsIncluded/rowsOmitted; previewPlan is what
  // adds totalRows on top for the UI's cost preview.
  assert.ok(stats.rowsIncluded > 0, 'must include some rows');
  assert.ok(stats.rowsIncluded < N, 'a 200k-row timeline must be reduced, not sent whole');
  assert.equal(stats.rowsIncluded + stats.rowsOmitted, N, 'included + omitted must account for every row');
  assert.match(digest, /^[0-9a-f]{64}$/, 'digest must be a sha-256 hex string');
});

test('the reduction is still deterministic at scale', async () => {
  // The determinism contract does not get a pass for being large. Two runs over
  // the same input must select the same rows in the same order.
  const a = await buildEvidencePacks(manyRecords(50_000));
  const b = await buildEvidencePacks(manyRecords(50_000));
  assert.equal(a.digest, b.digest, 'same input must yield the same evidence-pack digest');
  assert.deepEqual(
    a.packs.map((p) => p.rowCount),
    b.packs.map((p) => p.rowCount),
    'pack boundaries must be reproducible',
  );
});
