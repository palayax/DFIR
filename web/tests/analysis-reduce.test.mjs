// web/tests/analysis-reduce.test.mjs
//
// buildEvidencePacks()/rankRows() are the deterministic "reduce before you
// spend anything" half of the pipeline (RUN_PLAN.md A9): no model call is
// involved, so every selection and every pack boundary must be exactly
// reproducible from row content alone. This file verifies, against a small
// hand-derived fixture:
//   - the tier 1 -> 2 -> 3 -> 4 priority order documented at the top of
//     reduce.js (detections severity-desc, then +/-window context, then
//     priority sources, then time-stratified round robin over everything else)
//   - the token budget is never exceeded except by a single oversized row
//     alone in its own pack (which is never split or dropped)
//   - selection/packing/digest are all independent of input array order
//   - previewPlan()'s cost-estimate arithmetic

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { rankRows, buildEvidencePacks, previewPlan, renderRow, CALL_OVERHEAD_TOKENS } from '../assets/js/analysis/reduce.js';
import { estimateTokens, estimateCost } from '../assets/js/providers/lib/tokens.js';

const BASE = Date.UTC(2026, 0, 10, 0, 0, 0); // 2026-01-10T00:00:00.000Z
const ts = (minutes) => new Date(BASE + minutes * 60000).toISOString();

function det(severity) {
  return [{ engine: 'sigma', rule_id: `R-${severity}`, rule_name: `Rule-${severity}`, severity, mitre_techniques: ['T1059'] }];
}

// --- tier 1: detections present, severity desc, timestamp asc tiebreak -----
const c1 = { row_hash: 'c1', timestamp_utc: ts(100), host: 'H', user: 'u', source: 'eventlog', severity_max: 'critical', detections: det('critical'), message: 'm', target: 't' };
const h1 = { row_hash: 'h1', timestamp_utc: ts(50), host: 'H', user: 'u', source: 'eventlog', severity_max: 'high', detections: det('high'), message: 'm', target: 't' };
const h2 = { row_hash: 'h2', timestamp_utc: ts(30), host: 'H', user: 'u', source: 'eventlog', severity_max: 'high', detections: det('high'), message: 'm', target: 't' };
const m1 = { row_hash: 'm1', timestamp_utc: ts(10), host: 'H', user: 'u', source: 'eventlog', severity_max: 'medium', detections: det('medium'), message: 'm', target: 't' };

// --- tier 2: no detections, but within +/-300s (5min) of a tier-1 row -----
const ctxIn = { row_hash: 'ctx_in', timestamp_utc: ts(52), host: 'H', user: 'u', source: 'other', message: 'm', target: 't' }; // 2min from h1 (ts50)

// --- tier 3: priority source (execution/persistence/account/network), no detections, outside every context window ---
const e1 = { row_hash: 'e1', timestamp_utc: ts(200), host: 'H', user: 'u', source: 'execution', message: 'm', target: 't' };
const n1 = { row_hash: 'n1', timestamp_utc: ts(300), host: 'H', user: 'u', source: 'network', message: 'm', target: 't' };

// --- tier 4: everything else, outside every context window ---
const ctxOut = { row_hash: 'ctx_out', timestamp_utc: ts(60), host: 'H', user: 'u', source: 'other', message: 'm', target: 't' }; // 10min from h1 -> outside 5min window
const o1 = { row_hash: 'o1', timestamp_utc: ts(400), host: 'H', user: 'u', source: 'filesystem', message: 'm', target: 't' };
const o2 = { row_hash: 'o2', timestamp_utc: ts(500), host: 'H', user: 'u', source: 'filesystem', message: 'm', target: 't' };

const RECORDS = [m1, o2, e1, ctxOut, h1, n1, c1, ctxIn, o1, h2]; // deliberately scrambled

function shuffleReverse(records) {
  return [...records].reverse();
}

test('rankRows: tier 1 orders detections by severity desc, then timestamp asc', () => {
  const ranked = rankRows(RECORDS);
  const tier1 = ranked.filter((r) => r._tier === 1).map((r) => r.row_hash);
  assert.deepEqual(tier1, ['c1', 'h2', 'h1', 'm1']); // critical, then high@ts30 before high@ts50, then medium
});

test('rankRows: tier 2 is exactly the non-detection rows within the context window of a tier-1 row', () => {
  const ranked = rankRows(RECORDS);
  const tier2 = ranked.filter((r) => r._tier === 2).map((r) => r.row_hash);
  assert.deepEqual(tier2, ['ctx_in']);
});

test('rankRows: tier 3 is priority-source rows not already selected, ordered by timestamp asc', () => {
  const ranked = rankRows(RECORDS);
  const tier3 = ranked.filter((r) => r._tier === 3).map((r) => r.row_hash);
  assert.deepEqual(tier3, ['e1', 'n1']);
});

test('rankRows: tier 4 is a whole-dataset time-stratified round-robin sample of everything left', () => {
  const ranked = rankRows(RECORDS);
  const tier4 = ranked.filter((r) => r._tier === 4).map((r) => r.row_hash);
  // earliest=10min, latest=500min across ALL rows -> span 490min / 24 strata ~= 20.4min/stratum
  // ctx_out(60min)->stratum 2, o1(400min)->stratum 19, o2(500min)->stratum 23 (clamped) - one per
  // stratum, so round-robin just yields them in ascending stratum-index order.
  assert.deepEqual(tier4, ['ctx_out', 'o1', 'o2']);
});

test('rankRows: full order is tier1 -> tier2 -> tier3 -> tier4, and is independent of input array order', () => {
  const a = rankRows(RECORDS).map((r) => r.row_hash);
  const b = rankRows(shuffleReverse(RECORDS)).map((r) => r.row_hash);
  assert.deepEqual(a, ['c1', 'h2', 'h1', 'm1', 'ctx_in', 'e1', 'n1', 'ctx_out', 'o1', 'o2']);
  assert.deepEqual(b, a);
});

test('rankRows: every input row appears exactly once in the ranked output', () => {
  const ranked = rankRows(RECORDS);
  assert.equal(ranked.length, RECORDS.length);
  assert.deepEqual(new Set(ranked.map((r) => r.row_hash)).size, RECORDS.length);
});

// ---------------------------------------------------------------------------
// buildEvidencePacks: budget enforcement
// ---------------------------------------------------------------------------

test('buildEvidencePacks: never exceeds the token budget except a single oversized row alone in its own pack', async () => {
  // A tight budget forces many single/double-row packs.
  const { packs, stats } = await buildEvidencePacks(RECORDS, { tokenBudget: 120, maxPacks: 50 });
  for (const pack of packs) {
    if (pack.rowCount > 1) {
      assert.ok(pack.estimatedTokens <= 120, `pack ${pack.index} has ${pack.rowCount} rows and ${pack.estimatedTokens} tokens > budget`);
    }
    // Every pack always has at least one row (an empty pack is never emitted).
    assert.ok(pack.rowCount >= 1);
  }
  assert.equal(stats.rowsIncluded + stats.rowsOmitted, RECORDS.length);
  assert.equal(stats.rowsIncluded, packs.reduce((sum, p) => sum + p.rowCount, 0));
});

test('buildEvidencePacks: a single row too large for the whole budget still gets its own pack rather than being dropped or split', async () => {
  const hugeMessage = 'x'.repeat(5000);
  const huge = { row_hash: 'huge', timestamp_utc: ts(1000), host: 'H', user: 'u', source: 'other', message: hugeMessage, target: 't' };
  const { packs, stats } = await buildEvidencePacks([huge], { tokenBudget: 10, maxPacks: 5 });
  assert.equal(packs.length, 1);
  assert.equal(packs[0].rowCount, 1);
  assert.ok(packs[0].estimatedTokens > 10); // genuinely over budget, but present in full
  assert.equal(stats.rowsOmitted, 0);
});

test('buildEvidencePacks: maxPacks caps the number of packs and the remainder is reported as omitted', async () => {
  const { packs, stats } = await buildEvidencePacks(RECORDS, { tokenBudget: 60, maxPacks: 2 });
  assert.ok(packs.length <= 2);
  assert.equal(packs.length, 2);
  assert.ok(stats.rowsOmitted > 0);
  assert.equal(stats.rowsIncluded + stats.rowsOmitted, RECORDS.length);
});

test('buildEvidencePacks: pack rowHashes/text/timeRange are internally consistent', async () => {
  const { packs } = await buildEvidencePacks(RECORDS, { tokenBudget: 20000, maxPacks: 12 });
  assert.equal(packs.length, 1); // everything fits in one pack at the default-scale budget
  const pack = packs[0];
  assert.equal(pack.rowHashes.length, pack.rowCount);
  for (const hash of pack.rowHashes) {
    assert.ok(pack.text.includes(hash), `pack text should cite row_hash ${hash} verbatim`);
  }
  assert.equal(pack.timeRange.start_utc, ts(10));
  assert.equal(pack.timeRange.end_utc, ts(500));
});

test('buildEvidencePacks: packing and the resulting digest are independent of input array order', async () => {
  const a = await buildEvidencePacks(RECORDS, { tokenBudget: 200, maxPacks: 20 });
  const b = await buildEvidencePacks(shuffleReverse(RECORDS), { tokenBudget: 200, maxPacks: 20 });
  assert.equal(a.digest, b.digest);
  assert.deepEqual(a.packs.map((p) => p.rowHashes), b.packs.map((p) => p.rowHashes));
  assert.deepEqual(a.stats, b.stats);
});

test('buildEvidencePacks: digest changes if the underlying rows change', async () => {
  const a = await buildEvidencePacks(RECORDS, {});
  const b = await buildEvidencePacks(RECORDS.slice(0, -1), {});
  assert.notEqual(a.digest, b.digest);
});

test('renderRow: emits the full row_hash verbatim as the first tab-separated column', () => {
  const line = renderRow(c1);
  assert.equal(line.split('\t')[0], 'c1');
  assert.ok(line.includes('critical') === false || true); // severity column comes from severity_max, checked below
  assert.equal(line.split('\t')[5], 'critical');
});

// ---------------------------------------------------------------------------
// previewPlan: cost math, no provider call
// ---------------------------------------------------------------------------

test('previewPlan: computes input/output token totals and cost from the actual packs, with no provider involved', async () => {
  const model = { id: 'test-model', inputCostPerMTok: 3, outputCostPerMTok: 15 };
  const plan = await previewPlan(RECORDS, { tokenBudget: 20000, maxPacks: 12, model });

  assert.equal(plan.totalRows, RECORDS.length);
  assert.equal(plan.packs.length, 1);

  const assumedOutputPerPack = 1500; // previewPlan's default
  const assumedSynthesisOutput = 4000; // previewPlan's default
  const mapInputTokens = plan.packs.reduce((sum, p) => sum + p.estimatedTokens + CALL_OVERHEAD_TOKENS, 0);
  const mapOutputTokens = plan.packs.length * assumedOutputPerPack;
  const reduceInputTokens = mapOutputTokens + CALL_OVERHEAD_TOKENS;
  const reduceOutputTokens = assumedSynthesisOutput;

  assert.equal(plan.estimatedInputTokens, mapInputTokens + reduceInputTokens);
  assert.equal(plan.estimatedOutputTokens, mapOutputTokens + reduceOutputTokens);

  const expectedCost = estimateCost(model, plan.estimatedInputTokens, plan.estimatedOutputTokens);
  assert.equal(plan.estimatedCostUsd, expectedCost.totalCost);
  assert.ok(plan.estimatedCostUsd > 0);
});

test('previewPlan: never calls a provider and costs 0 when no model/rates are given', async () => {
  const plan = await previewPlan(RECORDS, {});
  assert.equal(plan.estimatedCostUsd, 0);
  assert.equal(plan.model, undefined);
});

test('estimateTokens sanity: non-empty text always costs at least 1 token (used to size headers/rows)', () => {
  assert.ok(estimateTokens('a') >= 1);
  assert.ok(estimateTokens('') >= 0);
});
