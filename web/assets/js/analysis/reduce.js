// web/assets/js/analysis/reduce.js
//
// Deterministic evidence-pack builder. Plain code, no model call — this is
// the "reduce deterministically before spending anything" half of RUN_PLAN.md
// assumption A9. buildEvidencePacks() decides, in a fixed and documented
// order, which SuperTimeline rows are worth a model's attention, renders them
// into compact tabular text (not JSON — see the header comment on
// renderRow()), and packs them under a hard per-pack token budget.
//
// -----------------------------------------------------------------------
// Priority order (deterministic, documented, exercised row-by-row):
//
//   Tier 1 — rows with detections[].length > 0, ordered by severity_max
//            DESC, then timestamp ASC, then row_hash ASC.
//   Tier 2 — rows NOT already selected whose timestamp falls within
//            +/- opts.contextWindowSeconds of ANY tier-1 row (context makes a
//            hit interpretable), ordered by timestamp ASC, then row_hash ASC.
//   Tier 3 — rows not yet selected whose `source` is one of
//            execution/persistence/account/network (opts.prioritySources),
//            ordered by timestamp ASC, then source ASC, then row_hash ASC.
//   Tier 4 — a UNIFORM TIME-STRATIFIED sample of everything still left: the
//            full [earliest,latest] timestamp span of the WHOLE input (not
//            just the remainder) is cut into opts.strataCount equal-width
//            strata; remaining rows are bucketed by which stratum their
//            timestamp falls in (row_hash ASC within a stratum), and then
//            drawn ROUND-ROBIN across strata (stratum 0's first row, stratum
//            1's first row, ... then everyone's second row, ...). Round-robin
//            means that even if the token budget cuts the sample short, the
//            rows actually included are still spread across the whole
//            timeline instead of exhausting one time period before the
//            reduction ratio.
//
// This order depends only on row CONTENT (timestamp/severity/source/hash),
// never on input array position, so buildEvidencePacks(shuffle(records))
// selects and packs the identical rows in the identical order as
// buildEvidencePacks(records).
// -----------------------------------------------------------------------

import { estimateTokens, estimateCost } from '../providers/lib/tokens.js';
import { sha256Hex } from '../lib/hash.js';
import { severityRank } from '../lib/severity.js';
import { isUnknownTimestamp } from '../lib/timestamp.js';

export const DEFAULT_TOKEN_BUDGET = 20000;
export const DEFAULT_MAX_PACKS = 12;
export const DEFAULT_CONTEXT_WINDOW_SECONDS = 300;
export const DEFAULT_STRATA_COUNT = 24;
export const DEFAULT_PRIORITY_SOURCES = ['execution', 'persistence', 'account', 'network'];
export const MESSAGE_MAX_CHARS = 240;
/** Constant per-call overhead (system prompt + JSON-schema boilerplate) used
 * only for the previewPlan() cost estimate — never affects pack contents. */
export const CALL_OVERHEAD_TOKENS = 300;

const COLUMNS = ['row_hash', 'timestamp_utc', 'host', 'user', 'source', 'severity', 'detections', 'target', 'message'];

function parseMs(ts) {
  if (!ts || isUnknownTimestamp(ts)) return undefined;
  const ms = Date.parse(ts);
  return Number.isNaN(ms) ? undefined : ms;
}

function cmpStr(a, b) {
  return (a || '').localeCompare(b || '');
}

function detectionSummary(record) {
  return (record.detections || []).map((d) => `${d.engine}:${d.rule_name}(${d.severity})`).join(';');
}

function truncate(text, max) {
  if (!text) return '';
  const s = String(text).replace(/[\t\n\r]+/g, ' ');
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

/** Render one record as a single tab-separated evidence line. Tabular text
 * instead of JSON: JSON re-states every field's key as a quoted string and
 * wraps every value in punctuation (quotes, braces, colons, commas) which the
 * BPE tokenizers behind every major provider split into extra tokens — a
 * compact table with one header line spends that budget on evidence instead.
 * row_hash is emitted IN FULL (64 lowercase hex chars): the model is
 * instructed (see prompts.js) to cite it verbatim, and a truncated hash could
 * collide with, or fail to match, the real row during validation. */
export function renderRow(record) {
  return [
    record.row_hash || '',
    record.timestamp_utc || '',
    record.host || '',
    record.user || '',
    record.source || '',
    record.severity_max || 'none',
    detectionSummary(record),
    truncate(record.target, MESSAGE_MAX_CHARS),
    truncate(record.message, MESSAGE_MAX_CHARS),
  ].join('\t');
}

// A fixed-width placeholder time range, used ONLY to size the header at
// pack-open time. toISOString() always emits a fixed-width string
// (YYYY-MM-DDTHH:mm:ss.sssZ), so a header built from this placeholder has
// EXACTLY the same estimateTokens() count as the real header built later in
// closePack() with real dates substituted in — which is what makes the
// per-row running budget check in buildEvidencePacks exact rather than an
// underestimate that could let a pack sneak past tokenBudget.
const PLACEHOLDER_TIME_RANGE = { start_utc: '2026-01-01T00:00:00.000Z', end_utc: '2026-01-01T00:00:00.000Z' };

function renderHeader(packIndex, maxPacks, timeRange, strategyLine) {
  const range = timeRange.start_utc && timeRange.end_utc ? `${timeRange.start_utc} .. ${timeRange.end_utc}` : 'unknown';
  return [
    `# Evidence pack ${packIndex + 1} of up to ${maxPacks}`,
    `# Time range of rows in THIS pack: ${range}`,
    `# Selection: ${strategyLine}`,
    '# Columns are TAB-separated. row_hash is the full 64-char lowercase-hex SHA-256 identity of the row.',
    '# Cite row_hash EXACTLY as shown for every claim. Do not shorten, guess, or invent one.',
    `# ${COLUMNS.join('\t')}`,
  ].join('\n');
}

function strategyLine(opts) {
  return (
    `priority order = detections (severity desc) > ` +
    `+/-${opts.contextWindowSeconds}s context around a detection > ` +
    `${opts.prioritySources.join('/')} rows > ` +
    `time-stratified sample (${opts.strataCount} strata, round-robin)`
  );
}

// ---------------------------------------------------------------------------
// tier selection
// ---------------------------------------------------------------------------

function selectTier1(records) {
  return records
    .filter((r) => (r.detections || []).length > 0)
    .sort(
      (a, b) =>
        severityRank(b.severity_max || 'none') - severityRank(a.severity_max || 'none') ||
        cmpStr(a.timestamp_utc, b.timestamp_utc) ||
        cmpStr(a.row_hash, b.row_hash),
    );
}

function selectTier2(remaining, tier1, windowSeconds) {
  const detMs = tier1.map((r) => parseMs(r.timestamp_utc)).filter((ms) => ms !== undefined).sort((a, b) => a - b);
  if (detMs.length === 0) return [];
  const windowMs = windowSeconds * 1000;

  function withinWindow(ms) {
    // binary search for the closest detection timestamp
    let lo = 0;
    let hi = detMs.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (detMs[mid] < ms) lo = mid + 1;
      else hi = mid;
    }
    const candidates = [detMs[lo]];
    if (lo > 0) candidates.push(detMs[lo - 1]);
    return candidates.some((d) => Math.abs(d - ms) <= windowMs);
  }

  return remaining
    .filter((r) => {
      const ms = parseMs(r.timestamp_utc);
      return ms !== undefined && withinWindow(ms);
    })
    .sort((a, b) => cmpStr(a.timestamp_utc, b.timestamp_utc) || cmpStr(a.row_hash, b.row_hash));
}

function selectTier3(remaining, prioritySources) {
  const set = new Set(prioritySources);
  return remaining
    .filter((r) => set.has(r.source))
    .sort((a, b) => cmpStr(a.timestamp_utc, b.timestamp_utc) || cmpStr(a.source, b.source) || cmpStr(a.row_hash, b.row_hash));
}

/** Uniform time-stratified round-robin sample of `remaining`, using the
 * WHOLE dataset's [earliestMs,latestMs] span to define stratum boundaries so
 * boundaries don't shift depending on what already got selected in tiers 1-3. */
function selectTier4(remaining, earliestMs, latestMs, strataCount) {
  if (remaining.length === 0) return [];
  if (earliestMs === undefined || latestMs === undefined || latestMs <= earliestMs) {
    // Degenerate span (all-unknown or single-instant timestamps): fall back
    // to a single stratum sorted by row_hash, which is still deterministic.
    return remaining.slice().sort((a, b) => cmpStr(a.row_hash, b.row_hash));
  }
  const span = latestMs - earliestMs;
  const strataWidth = span / strataCount;
  const strata = Array.from({ length: strataCount }, () => []);
  const undated = [];

  for (const r of remaining) {
    const ms = parseMs(r.timestamp_utc);
    if (ms === undefined) {
      undated.push(r);
      continue;
    }
    let idx = Math.floor((ms - earliestMs) / strataWidth);
    if (idx >= strataCount) idx = strataCount - 1;
    if (idx < 0) idx = 0;
    strata[idx].push(r);
  }
  for (const bucket of strata) bucket.sort((a, b) => cmpStr(a.row_hash, b.row_hash));
  undated.sort((a, b) => cmpStr(a.row_hash, b.row_hash));

  const out = [];
  let round = 0;
  let added = true;
  while (added) {
    added = false;
    for (const bucket of strata) {
      if (round < bucket.length) {
        out.push(bucket[round]);
        added = true;
      }
    }
    round++;
  }
  out.push(...undated);
  return out;
}

/**
 * Compute the full deterministic row order (tier 1 -> 2 -> 3 -> 4). Exported
 * standalone (in addition to being used inside buildEvidencePacks) so tests
 * can assert priority ordering without also exercising the packing/budget
 * logic.
 *
 * @returns {Array<object & {_tier: number}>}
 */
export function rankRows(records, opts = {}) {
  const contextWindowSeconds = opts.contextWindowSeconds ?? DEFAULT_CONTEXT_WINDOW_SECONDS;
  const prioritySources = opts.prioritySources ?? DEFAULT_PRIORITY_SOURCES;
  const strataCount = opts.strataCount ?? DEFAULT_STRATA_COUNT;

  const allMs = records.map((r) => parseMs(r.timestamp_utc)).filter((ms) => ms !== undefined);
  const earliestMs = allMs.length ? Math.min(...allMs) : undefined;
  const latestMs = allMs.length ? Math.max(...allMs) : undefined;

  const tier1 = selectTier1(records);
  const selected = new Set(tier1.map((r) => r.row_hash));

  const afterTier1 = records.filter((r) => !selected.has(r.row_hash));
  const tier2 = selectTier2(afterTier1, tier1, contextWindowSeconds);
  for (const r of tier2) selected.add(r.row_hash);

  const afterTier2 = afterTier1.filter((r) => !selected.has(r.row_hash));
  const tier3 = selectTier3(afterTier2, prioritySources);
  for (const r of tier3) selected.add(r.row_hash);

  const afterTier3 = afterTier2.filter((r) => !selected.has(r.row_hash));
  const tier4 = selectTier4(afterTier3, earliestMs, latestMs, strataCount);

  return [
    ...tier1.map((r) => ({ ...r, _tier: 1 })),
    ...tier2.map((r) => ({ ...r, _tier: 2 })),
    ...tier3.map((r) => ({ ...r, _tier: 3 })),
    ...tier4.map((r) => ({ ...r, _tier: 4 })),
  ];
}

// ---------------------------------------------------------------------------
// packing
// ---------------------------------------------------------------------------

function timeRangeOf(rows) {
  let start;
  let end;
  for (const r of rows) {
    if (isUnknownTimestamp(r.timestamp_utc) || !r.timestamp_utc) continue;
    if (!start || r.timestamp_utc < start) start = r.timestamp_utc;
    if (!end || r.timestamp_utc > end) end = r.timestamp_utc;
  }
  return { start_utc: start, end_utc: end };
}

/**
 * @param {object[]} records SuperTimeline rows.
 * @param {{
 *   tokenBudget?: number, maxPacks?: number, contextWindowSeconds?: number,
 *   strataCount?: number, prioritySources?: string[],
 * }} [opts]
 * @returns {Promise<{packs: object[], stats: object, digest: string}>}
 */
export async function buildEvidencePacks(records, opts = {}) {
  const tokenBudget = opts.tokenBudget ?? DEFAULT_TOKEN_BUDGET;
  const maxPacks = opts.maxPacks ?? DEFAULT_MAX_PACKS;
  const resolvedOpts = {
    contextWindowSeconds: opts.contextWindowSeconds ?? DEFAULT_CONTEXT_WINDOW_SECONDS,
    prioritySources: opts.prioritySources ?? DEFAULT_PRIORITY_SOURCES,
    strataCount: opts.strataCount ?? DEFAULT_STRATA_COUNT,
  };

  const ordered = rankRows(records, resolvedOpts);
  const strategy = strategyLine(resolvedOpts);

  const packs = [];
  let current = null;
  let includedCount = 0;
  const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };

  function openPack() {
    current = { index: packs.length, rows: [], headerTokens: 0, bodyTokens: 0 };
    const header = renderHeader(current.index, maxPacks, PLACEHOLDER_TIME_RANGE, strategy);
    current.headerTokens = estimateTokens(header);
  }

  function closePack() {
    if (!current) return;
    const timeRange = timeRangeOf(current.rows);
    const header = renderHeader(current.index, maxPacks, timeRange, strategy);
    const body = current.rows.map(renderRow).join('\n');
    const text = body ? `${header}\n${body}` : header;
    packs.push({
      index: current.index,
      text,
      rowCount: current.rows.length,
      rowHashes: current.rows.map((r) => r.row_hash),
      estimatedTokens: estimateTokens(text),
      timeRange,
      selectionStrategy: strategy,
    });
    current = null;
  }

  for (const row of ordered) {
    if (packs.length >= maxPacks && !current) break;
    if (!current) {
      if (packs.length >= maxPacks) break;
      openPack();
    }

    const rowTokens = estimateTokens(renderRow(row));
    const prospective = current.headerTokens + current.bodyTokens + rowTokens;

    if (prospective > tokenBudget && current.rows.length > 0) {
      closePack();
      if (packs.length >= maxPacks) break;
      openPack();
    }

    current.rows.push(row);
    current.bodyTokens += rowTokens;
    includedCount++;
    tierCounts[row._tier]++;
  }
  if (current && current.rows.length > 0) closePack();
  else if (current) current = null;

  const totalRows = records.length;
  const rowsOmitted = totalRows - includedCount;
  const digest = await sha256Hex(packs.map((p) => p.text).join('\n\u0000\n'));

  return {
    packs,
    stats: {
      rowsIncluded: includedCount,
      rowsOmitted,
      reductionRatio: totalRows > 0 ? includedCount / totalRows : 1,
      strategy,
      perPackTokens: packs.map((p) => p.estimatedTokens),
      tierCounts,
    },
    digest,
  };
}

/**
 * Preflight: what would be sent, and what it would cost, WITHOUT calling any
 * provider. Drives the "confirm before spending" UI required by RUN_PLAN.md
 * assumption A9.
 *
 * @param {object[]} records
 * @param {{
 *   tokenBudget?: number, maxPacks?: number, contextWindowSeconds?: number,
 *   strataCount?: number, prioritySources?: string[],
 *   model?: {id?: string, inputCostPerMTok?: number, outputCostPerMTok?: number},
 *   assumedOutputTokensPerPack?: number, assumedSynthesisOutputTokens?: number,
 * }} [opts]
 */
export async function previewPlan(records, opts = {}) {
  const { packs, stats, digest } = await buildEvidencePacks(records, opts);
  const model = opts.model;
  const assumedOutputPerPack = opts.assumedOutputTokensPerPack ?? 1500;
  const assumedSynthesisOutput = opts.assumedSynthesisOutputTokens ?? 4000;

  const mapInputTokens = packs.reduce((sum, p) => sum + p.estimatedTokens + CALL_OVERHEAD_TOKENS, 0);
  const mapOutputTokens = packs.length * assumedOutputPerPack;
  const reduceInputTokens = mapOutputTokens + CALL_OVERHEAD_TOKENS;
  const reduceOutputTokens = assumedSynthesisOutput;

  const estimatedInputTokens = mapInputTokens + reduceInputTokens;
  const estimatedOutputTokens = mapOutputTokens + reduceOutputTokens;
  const cost = estimateCost(model, estimatedInputTokens, estimatedOutputTokens);

  return {
    packs: packs.map((p) => ({
      index: p.index,
      rowCount: p.rowCount,
      estimatedTokens: p.estimatedTokens,
      timeRange: p.timeRange,
      selectionStrategy: p.selectionStrategy,
    })),
    totalRows: records.length,
    rowsIncluded: stats.rowsIncluded,
    rowsOmitted: stats.rowsOmitted,
    reductionRatio: stats.reductionRatio,
    strategy: stats.strategy,
    estimatedInputTokens,
    estimatedOutputTokens,
    estimatedCostUsd: cost.totalCost,
    model: model ? { id: model.id, inputCostPerMTok: model.inputCostPerMTok, outputCostPerMTok: model.outputCostPerMTok } : undefined,
    digest,
  };
}

export default buildEvidencePacks;
