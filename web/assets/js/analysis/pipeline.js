// web/assets/js/analysis/pipeline.js
//
// analyze(records, opts) — the map-reduce orchestrator (RUN_PLAN.md A9):
//
//   1. computeDashboard(records)              -> dashboard, scope   (deterministic, no model)
//   2. buildEvidencePacks(records, budget)     -> packs, stats, digest (deterministic, no model)
//   3. map phase:    one provider.send() per pack, bounded concurrency, retried
//   4. reduce phase: one provider.send() merging every map result into a draft report
//   5. assemble:     candidate model JSON is sanitized into the report shape and
//                     dashboard/scope/mitre_coverage are UNCONDITIONALLY overwritten
//                     with step 1's output — the model's own values for those keys,
//                     if it supplied any, are never read. This is the single
//                     enforcement point for docs/report_schema.json's
//                     "dashboardDataIsPrecomputed" design note.
//   6. validate -> repair loop: up to opts.budget.maxRepairAttempts (default 2)
//                     round trips through validate-report.js's structured errors
//                     and prompts.js's buildRepairPrompt before giving up loudly.
//
// pipeline.js never imports providers/index.js or a specific adapter — the
// caller passes an already-resolved LLMProvider (mock or real) in
// opts.provider, per providers/types.js's LLMProvider shape. This keeps this
// module usable from tests with providers/mock.js and unable to accidentally
// make a network call on its own.
//
// AbortSignal: every await point checks opts.signal first; the function only
// ever returns a report on its single success path at the very end, so an
// abort at any point is guaranteed to throw (AbortError) rather than resolve
// with a half-built report.

import { computeDashboard, computeMitreCoverage } from './dashboard.js';
import { buildEvidencePacks } from './reduce.js';
import { buildMapPrompt, buildReducePrompt, buildRepairPrompt, PROMPT_VERSION } from './prompts.js';
import { validateReport } from './validate-report.js';
import { withRetry, ProviderError } from '../providers/lib/retry.js';
import { estimateCost } from '../providers/lib/tokens.js';
import { severityRank } from '../lib/severity.js';

export const DEFAULT_CONCURRENCY = 3;
export const DEFAULT_MAX_REPAIR_ATTEMPTS = 2;
export const DEFAULT_CALL_MAX_ATTEMPTS = 3; // withRetry attempts per model call (covers transient HTTP errors AND malformed-JSON re-asks)
export const DEFAULT_MAX_OUTPUT_TOKENS = 4096;

const CONFIDENCE_RANK = { low: 0, moderate: 1, high: 2 };

export class PipelineError extends Error {
  constructor(message, opts = {}) {
    super(message);
    this.name = 'PipelineError';
    Object.assign(this, opts);
  }
}

function abortError() {
  const e = new Error('Aborted');
  e.name = 'AbortError';
  return e;
}

function throwIfAborted(signal) {
  if (signal?.aborted) throw abortError();
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/** Models occasionally wrap JSON in a markdown code fence despite being told
 * not to; tolerate it before giving up and asking for a repair. */
function stripCodeFence(text) {
  if (typeof text !== 'string') return text;
  const m = /^```(?:json)?\s*([\s\S]*?)\s*```$/i.exec(text.trim());
  return m ? m[1] : text;
}

function parseModelJson(response) {
  if (response?.jsonValue !== undefined) return response.jsonValue;
  return tryParseJson(stripCodeFence(response?.text ?? ''));
}

// ---------------------------------------------------------------------------
// bounded-concurrency pool (no vendored library — hand-rolled per CLAUDE.md)
// ---------------------------------------------------------------------------

function runPool(items, worker, concurrency, signal) {
  if (items.length === 0) return Promise.resolve();
  let nextIndex = 0;
  let active = 0;
  let settled = false;

  return new Promise((resolve, reject) => {
    function settleReject(err) {
      if (settled) return;
      settled = true;
      reject(err);
    }
    function settleResolve() {
      if (settled) return;
      settled = true;
      resolve();
    }
    function launchNext() {
      if (settled) return;
      if (signal?.aborted) {
        settleReject(abortError());
        return;
      }
      if (nextIndex >= items.length) {
        if (active === 0) settleResolve();
        return;
      }
      while (active < concurrency && nextIndex < items.length && !settled) {
        const item = items[nextIndex++];
        active++;
        // eslint-disable-next-line no-loop-func
        Promise.resolve()
          .then(() => worker(item))
          .then(() => {
            active--;
            launchNext();
          })
          .catch((err) => {
            active--;
            settleReject(err);
          });
      }
    }
    launchNext();
  });
}

// ---------------------------------------------------------------------------
// model call wrapper: retry covers both transient HTTP errors (via
// providers/lib/retry.js's existing status-code policy) and a model
// response that isn't parseable JSON (treated as a retryable condition worth
// one more ask, distinct from the report-level validate/repair loop which
// deals with JSON that parses but doesn't conform to the schema).
// ---------------------------------------------------------------------------

async function callModel(provider, modelId, creds, { system, user }, { signal, maxAttempts, maxTokens } = {}) {
  return withRetry(
    async () => {
      throwIfAborted(signal);
      const response = await provider.send({ system, messages: [{ role: 'user', content: user }], model: modelId, maxTokens }, creds, { signal });
      const parsed = parseModelJson(response);
      if (parsed === undefined) {
        throw new ProviderError('Model response was not valid JSON', { retryable: true });
      }
      return { response, parsed };
    },
    { maxAttempts, signal },
  );
}

// ---------------------------------------------------------------------------
// sanitization helpers — used only while ASSEMBLING the final report, so that
// whatever the model returns is trimmed down to exactly the shape
// docs/report_schema.json (additionalProperties: false almost everywhere)
// allows, before it ever reaches validate-report.js.
// ---------------------------------------------------------------------------

function pickAllowed(obj, keys) {
  if (!obj || typeof obj !== 'object') return {};
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

function sanitizeArray(arr, keys, requiredKey) {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => pickAllowed(item, keys)).filter((item) => !requiredKey || (typeof item[requiredKey] === 'string' && item[requiredKey].length > 0));
}

function stringArray(v) {
  return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : undefined;
}

function remapIds(ids, idMap) {
  if (!Array.isArray(ids)) return undefined;
  const out = [];
  for (const raw of ids) {
    if (typeof raw !== 'string') continue;
    const canonical = idMap.get(raw) || idMap.get(`title:${raw}`);
    if (canonical && !out.includes(canonical)) out.push(canonical);
  }
  return out;
}

const EVIDENCE_KEYS = ['row_hash', 'timestamp_utc', 'host', 'excerpt', 'why_relevant'];
const FINDING_KEYS = [
  'id', 'title', 'severity', 'confidence', 'category', 'narrative', 'evidence',
  'mitre_techniques', 'affected_hosts', 'affected_accounts', 'first_seen_utc',
  'last_seen_utc', 'recommendation', 'detection_rules', 'false_positive_considered',
];
const DETECTION_RULE_KEYS = ['engine', 'rule_id', 'rule_name', 'severity'];
const PHASE_KEYS = ['order', 'name', 'start_utc', 'end_utc', 'description', 'mitre_tactic', 'finding_ids', 'evidence'];
const IOC_GROUPS = ['files', 'hashes', 'ip_addresses', 'domains', 'urls', 'registry_keys', 'accounts', 'processes', 'scheduled_tasks', 'services'];
const IOC_ITEM_KEYS = ['value', 'context', 'first_seen_utc', 'last_seen_utc', 'occurrences', 'confidence', 'finding_ids', 'row_hashes', 'verdict'];
const REC_GROUPS = ['immediate', 'short_term', 'long_term', 'further_collection'];
const REC_ITEM_KEYS = ['action', 'priority', 'rationale', 'finding_ids', 'effort'];
const GAP_KEYS = ['gap', 'reason', 'detail', 'how_to_close'];
const DISMISSED_KEYS = ['engine', 'rule_id', 'rule_name', 'occurrences', 'rationale', 'confidence'];
const VERDICT_KEYS = ['assessment', 'confidence', 'confidence_rationale', 'rationale', 'earliest_suspicious_activity_utc', 'attack_stage'];
const EXEC_SUMMARY_KEYS = ['text', 'bullets'];
const ENGAGEMENT_KEYS = ['case_id', 'examiner', 'organization', 'classification', 'description'];

function sanitizeFinding(rawFinding, canonicalId) {
  const f = pickAllowed(rawFinding, FINDING_KEYS);
  f.id = canonicalId;
  f.evidence = sanitizeArray(rawFinding?.evidence, EVIDENCE_KEYS, 'row_hash');
  if (rawFinding?.mitre_techniques !== undefined) f.mitre_techniques = stringArray(rawFinding.mitre_techniques) ?? [];
  if (rawFinding?.affected_hosts !== undefined) f.affected_hosts = stringArray(rawFinding.affected_hosts) ?? [];
  if (rawFinding?.affected_accounts !== undefined) f.affected_accounts = stringArray(rawFinding.affected_accounts) ?? [];
  if (rawFinding?.detection_rules !== undefined) f.detection_rules = sanitizeArray(rawFinding.detection_rules, DETECTION_RULE_KEYS);
  return f;
}

function sanitizeIocs(rawIocs, idMap) {
  const out = {};
  for (const group of IOC_GROUPS) {
    const items = sanitizeArray(rawIocs?.[group], IOC_ITEM_KEYS, 'value');
    for (const item of items) {
      const remapped = remapIds(item.finding_ids, idMap);
      if (remapped !== undefined) item.finding_ids = remapped;
    }
    out[group] = items;
  }
  return out;
}

function sanitizeRecommendations(rawRecs, idMap) {
  const out = {};
  for (const group of REC_GROUPS) {
    const items = sanitizeArray(rawRecs?.[group], REC_ITEM_KEYS, 'action');
    for (const item of items) {
      const remapped = remapIds(item.finding_ids, idMap);
      if (remapped !== undefined) item.finding_ids = remapped;
    }
    out[group] = items;
  }
  return out;
}

function sanitizeAttackNarrative(raw, idMap) {
  if (!raw || typeof raw !== 'object') return { phases: [] };
  const out = {};
  if (typeof raw.summary === 'string') out.summary = raw.summary;
  const phases = Array.isArray(raw.phases) ? raw.phases : [];
  out.phases = phases.map((phase) => {
    const p = pickAllowed(phase, PHASE_KEYS);
    const remapped = remapIds(phase?.finding_ids, idMap);
    if (remapped !== undefined) p.finding_ids = remapped;
    return p;
  });
  return out;
}

/**
 * Assign canonical F-### ids to findings, in the model's ORIGINAL order, and
 * build a lookup so cross-references elsewhere in the report (attack
 * narrative phases, recommendations, iocs) can be remapped from whatever the
 * model called a finding to the id the pipeline actually assigned. Findings
 * are sanitized here too; the caller sorts the returned array afterwards
 * (sorting after id assignment means reordering never breaks a
 * string-based cross-reference, because ids live on the objects, not on
 * array position).
 */
function assignFindingIds(rawFindings) {
  const findings = [];
  const idMap = new Map();
  const list = Array.isArray(rawFindings) ? rawFindings : [];
  list.forEach((raw, i) => {
    const canonicalId = `F-${String(i + 1).padStart(3, '0')}`;
    if (typeof raw?.id === 'string') idMap.set(raw.id, canonicalId);
    if (typeof raw?.title === 'string') idMap.set(`title:${raw.title}`, canonicalId);
    findings.push(sanitizeFinding(raw, canonicalId));
  });
  return { findings, idMap };
}

function sortFindings(findings) {
  return findings.slice().sort(
    (a, b) =>
      severityRank(b.severity) - severityRank(a.severity) ||
      (CONFIDENCE_RANK[b.confidence] ?? -1) - (CONFIDENCE_RANK[a.confidence] ?? -1) ||
      String(a.id).localeCompare(String(b.id)),
  );
}

function normalizeMapResult(parsed, pack) {
  const p = parsed && typeof parsed === 'object' ? parsed : {};
  return {
    pack_index: pack.index,
    partial_findings: Array.isArray(p.partial_findings) ? p.partial_findings : [],
    iocs: p.iocs && typeof p.iocs === 'object' ? p.iocs : {},
    analytic_gaps: Array.isArray(p.analytic_gaps) ? p.analytic_gaps : [],
    dismissed_detections: Array.isArray(p.dismissed_detections) ? p.dismissed_detections : [],
    ...(typeof p.notes_for_synthesis === 'string' ? { notes_for_synthesis: p.notes_for_synthesis } : {}),
  };
}

/**
 * Build the final, schema-shaped report object from the model's (candidate)
 * reduce-phase JSON plus every deterministically-computed piece. dashboard,
 * scope and mitre_coverage are ALWAYS taken from `ctx` — `candidate`'s own
 * copies of those keys, if the model supplied any, are never even read here.
 */
function assembleReport(candidate, ctx) {
  const c = candidate && typeof candidate === 'object' ? candidate : {};
  const { findings: sanitizedFindings, idMap } = assignFindingIds(c.findings);
  const findings = sortFindings(sanitizedFindings);

  const report = {
    schema_version: '1.0.0',
    meta: {
      generated_utc: new Date(ctx.finishedAt).toISOString(),
      // report_schema.json requires meta.engagement to be present (though its
      // own sub-fields are all optional) — always include it, defaulting to
      // {} when the caller passed no engagement metadata.
      engagement: pickAllowed(ctx.engagement || {}, ENGAGEMENT_KEYS),
      model: {
        provider: ctx.providerId,
        model_id: ctx.modelId,
        prompt_version: PROMPT_VERSION,
        ...(typeof ctx.temperature === 'number' ? { temperature: ctx.temperature } : {}),
        passes: 1,
      },
      usage: {
        input_tokens: ctx.usage.inputTokens,
        output_tokens: ctx.usage.outputTokens,
        cached_input_tokens: ctx.usage.cachedInputTokens,
        estimated_cost_usd: ctx.costUsd,
        wall_clock_seconds: (ctx.finishedAt - ctx.startedAt) / 1000,
      },
    },
    // --- deterministic, never model-authored ---
    scope: ctx.scope,
    dashboard: ctx.dashboard,
    // --- model-authored, sanitized ---
    verdict: pickAllowed(c.verdict, VERDICT_KEYS),
    executive_summary: pickAllowed(c.executive_summary, EXEC_SUMMARY_KEYS),
    findings,
    attack_narrative: sanitizeAttackNarrative(c.attack_narrative, idMap),
    iocs: sanitizeIocs(c.iocs, idMap),
    // --- deterministic, never model-authored (computed from FINAL finding ids) ---
    mitre_coverage: computeMitreCoverage(ctx.records, findings),
    recommendations: sanitizeRecommendations(c.recommendations, idMap),
    analytic_gaps: sanitizeArray(c.analytic_gaps, GAP_KEYS, 'gap'),
    dismissed_detections: sanitizeArray(c.dismissed_detections, DISMISSED_KEYS),
    // --- deterministic provenance of the analysis itself ---
    provenance: {
      evidence_pack_digest: ctx.digest,
      pack_count: ctx.packs.length,
      packs: ctx.packs.map((p) => ({
        index: p.index,
        rows: p.rowCount,
        estimated_tokens: p.estimatedTokens,
        time_range: p.timeRange,
        selection_strategy: p.selectionStrategy,
      })),
      reduction_strategy: ctx.stats.strategy,
      rows_omitted: ctx.stats.rowsOmitted,
      repair_attempts: ctx.repairAttempts,
      ...(ctx.warnings.length ? { warnings: ctx.warnings } : {}),
    },
  };

  return report;
}

// ---------------------------------------------------------------------------
// public API
// ---------------------------------------------------------------------------

/**
 * @param {object[]} records SuperTimeline rows (docs/timeline_schema.json).
 * @param {{
 *   provider: import('../providers/types.js').LLMProvider,
 *   model: string|{id:string, maxOutput?:number, inputCostPerMTok?:number, outputCostPerMTok?:number},
 *   creds?: Record<string,string>,
 *   budget?: {
 *     tokenBudget?: number, maxPacks?: number, contextWindowSeconds?: number,
 *     strataCount?: number, prioritySources?: string[], topN?: number,
 *     concurrency?: number, maxRepairAttempts?: number, callMaxAttempts?: number,
 *     maxOutputTokensPerCall?: number,
 *   },
 *   signal?: AbortSignal,
 *   onProgress?: (event: {phase: string, message: string, [k: string]: any}) => void,
 *   caseContext?: string,
 *   engagement?: object,
 *   temperature?: number,
 * }} opts
 * @returns {Promise<object>} a report conforming to docs/report_schema.json
 */
export async function analyze(records, opts = {}) {
  const { provider, creds = {}, budget = {}, signal, onProgress = () => {}, caseContext, engagement, temperature } = opts;

  if (!provider || typeof provider.send !== 'function') {
    throw new PipelineError('analyze() requires opts.provider (an LLMProvider) — pipeline.js never imports a specific provider itself', { code: 'missing_provider' });
  }

  const modelId = typeof opts.model === 'string' ? opts.model : opts.model?.id;
  if (!modelId) {
    throw new PipelineError('analyze() requires opts.model (a model id string or a model object with an id)', { code: 'missing_model' });
  }
  const modelObj = typeof opts.model === 'object' && opts.model ? opts.model : (provider.models || []).find((m) => m.id === modelId);

  const startedAt = Date.now();
  throwIfAborted(signal);

  const maxOutputTokens = budget.maxOutputTokensPerCall ?? modelObj?.maxOutput ?? DEFAULT_MAX_OUTPUT_TOKENS;
  const concurrency = budget.concurrency ?? DEFAULT_CONCURRENCY;
  const maxRepairAttempts = budget.maxRepairAttempts ?? DEFAULT_MAX_REPAIR_ATTEMPTS;
  const callMaxAttempts = budget.callMaxAttempts ?? DEFAULT_CALL_MAX_ATTEMPTS;

  const usage = { inputTokens: 0, outputTokens: 0, cachedInputTokens: 0 };
  function accumulateUsage(u) {
    if (!u) return;
    usage.inputTokens += u.inputTokens || 0;
    usage.outputTokens += u.outputTokens || 0;
    usage.cachedInputTokens += u.cachedInputTokens || 0;
  }

  // --- 1. deterministic dashboard/scope ---
  onProgress({ phase: 'dashboard', message: 'Computing dashboard aggregates from the timeline' });
  const { dashboard, scope } = computeDashboard(records, { topN: budget.topN });
  throwIfAborted(signal);

  // --- 2. deterministic evidence packs ---
  onProgress({ phase: 'packs', message: 'Building evidence packs' });
  const { packs, stats, digest } = await buildEvidencePacks(records, {
    tokenBudget: budget.tokenBudget,
    maxPacks: budget.maxPacks,
    contextWindowSeconds: budget.contextWindowSeconds,
    strataCount: budget.strataCount,
    prioritySources: budget.prioritySources,
  });
  throwIfAborted(signal);
  const scopeWithReduction = { ...scope, rows_analysed: stats.rowsIncluded, reduction_ratio: stats.reductionRatio };
  onProgress({ phase: 'packs', message: `Built ${packs.length} evidence pack(s) covering ${stats.rowsIncluded} of ${records.length} row(s)`, packCount: packs.length, stats });

  // --- 3. map phase ---
  const mapResults = new Array(packs.length);
  const warnings = [];

  await runPool(
    packs,
    async (pack) => {
      throwIfAborted(signal);
      const { system, user } = buildMapPrompt(pack, packs.length, { caseContext });
      try {
        const { response, parsed } = await callModel(provider, modelId, creds, { system, user }, { signal, maxAttempts: callMaxAttempts, maxTokens: maxOutputTokens });
        accumulateUsage(response.usage);
        mapResults[pack.index] = normalizeMapResult(parsed, pack);
      } catch (err) {
        if (err?.name === 'AbortError') throw err;
        warnings.push(`Evidence pack ${pack.index + 1} of ${packs.length} could not be analysed: ${err.message}`);
        mapResults[pack.index] = normalizeMapResult({}, pack);
      }
      onProgress({ phase: 'map', message: `Analysed evidence pack ${pack.index + 1} of ${packs.length}`, packIndex: pack.index, packCount: packs.length });
    },
    concurrency,
    signal,
  );
  throwIfAborted(signal);

  // --- 4. reduce / synthesis phase ---
  onProgress({ phase: 'reduce', message: 'Synthesising the final report from all evidence packs' });
  const provenanceSummary = { reduction_strategy: stats.strategy, rows_omitted: stats.rowsOmitted, pack_count: packs.length };
  const { system: reduceSystem, user: reduceUser } = buildReducePrompt(mapResults, scopeWithReduction, provenanceSummary, { caseContext });
  const { response: reduceResponse, parsed: reduceParsed } = await callModel(provider, modelId, creds, { system: reduceSystem, user: reduceUser }, {
    signal,
    maxAttempts: callMaxAttempts,
    maxTokens: maxOutputTokens,
  });
  accumulateUsage(reduceResponse.usage);
  throwIfAborted(signal);

  // --- 5/6. assemble, validate, repair ---
  const rowHashSet = new Set(records.map((r) => r.row_hash));
  let candidate = reduceParsed;
  let lastRawText = reduceResponse.text;
  let repairAttempts = 0;
  let finalReport;
  let validation;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    throwIfAborted(signal);
    const finishedAt = Date.now();
    const ctx = {
      records,
      dashboard,
      scope: scopeWithReduction,
      digest,
      packs,
      stats,
      providerId: provider.id,
      modelId,
      temperature,
      engagement,
      usage,
      costUsd: estimateCost(modelObj, usage.inputTokens, usage.outputTokens).totalCost,
      startedAt,
      finishedAt,
      repairAttempts,
      warnings,
    };
    finalReport = assembleReport(candidate, ctx);

    onProgress({ phase: 'validate', message: `Validating assembled report (repair attempt ${repairAttempts} of ${maxRepairAttempts})`, repairAttempts });
    // eslint-disable-next-line no-await-in-loop
    validation = await validateReport(finalReport, { rowHashes: rowHashSet });
    if (validation.valid) break;

    if (repairAttempts >= maxRepairAttempts) {
      throw new PipelineError(
        `Report failed validation after ${repairAttempts} repair attempt(s): ${validation.errors.map((e) => e.message).join('; ')}`,
        { code: 'validation_failed', errors: validation.errors, report: finalReport },
      );
    }

    repairAttempts++;
    onProgress({ phase: 'repair', message: `Repairing report (attempt ${repairAttempts} of ${maxRepairAttempts})`, repairAttempts, errors: validation.errors });
    const { system: repairSystem, user: repairUser } = buildRepairPrompt(lastRawText, validation.errors);
    // eslint-disable-next-line no-await-in-loop
    const { response: repairResponse, parsed: repairParsed } = await callModel(provider, modelId, creds, { system: repairSystem, user: repairUser }, {
      signal,
      maxAttempts: callMaxAttempts,
      maxTokens: maxOutputTokens,
    });
    accumulateUsage(repairResponse.usage);
    candidate = repairParsed;
    lastRawText = repairResponse.text;
  }

  onProgress({ phase: 'done', message: 'Report complete', report: finalReport });
  return finalReport;
}

export default analyze;
