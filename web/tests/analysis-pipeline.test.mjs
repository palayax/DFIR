// web/tests/analysis-pipeline.test.mjs
//
// analyze() (pipeline.js) is the orchestrator that wires dashboard.js,
// reduce.js, prompts.js and validate-report.js together around a provider.
// The single most important property this file must prove is that the
// FINAL report's dashboard/scope/mitre_coverage are ALWAYS the ones computed
// deterministically from the SuperTimeline by our own code, never whatever
// the model happened to write in its JSON response - a hostile or confused
// model must not be able to move a bar on a chart. Everything else here
// (retry, repair loop, abort, graceful degradation, usage accounting,
// deterministic finding ordering) is the surrounding machinery that makes
// that guarantee survive real-world model flakiness.
//
// Uses providers/mock.js exclusively - zero network calls, zero API keys.
//
// Test strategy note: mock.js's hashRequest() hashes only
// {system, messages, jsonSchema, model} (never maxTokens), and
// buildEvidencePacks()/computeDashboard() are pure functions of their
// inputs. So every test below precomputes the exact same pack/scope objects
// analyze() will compute internally (calling the real, exported functions
// with identical arguments), builds the exact prompt analyze() will build
// (via the real, exported prompts.js functions), and registers a canned
// response at that exact hash. For the reduce/repair phases this requires
// replicating pipeline.js's private (unexported) normalizeMapResult() -
// see `normalizeMapResultLike` below, which mirrors it verbatim.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { analyze, PipelineError } from '../assets/js/analysis/pipeline.js';
import { buildEvidencePacks } from '../assets/js/analysis/reduce.js';
import { computeDashboard, computeMitreCoverage } from '../assets/js/analysis/dashboard.js';
import { buildMapPrompt, buildReducePrompt, buildRepairPrompt, PROMPT_VERSION } from '../assets/js/analysis/prompts.js';
import { validateReport } from '../assets/js/analysis/validate-report.js';
import { createMockProvider } from '../assets/js/providers/mock.js';
import { buildCannedMapResponse, buildCannedReduceResponse } from '../fixtures/analysis/canned-responses.mjs';

const MODEL_ID = 'mock-standard';

// ---------------------------------------------------------------------------
// Local mirror of pipeline.js's PRIVATE normalizeMapResult(parsed, pack).
// Not exported by pipeline.js on purpose (it's an internal shaping step),
// so tests that need to predict the exact reduce-phase prompt text (and
// therefore its request hash) replicate it here, verbatim.
// ---------------------------------------------------------------------------
function normalizeMapResultLike(parsed, pack) {
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

/** Mirrors pipeline.js's own dashboard/packs phases exactly (both are pure). */
async function computePipelineContext(records, budget = {}) {
  const { dashboard, scope } = computeDashboard(records, { topN: budget.topN });
  const { packs, stats, digest } = await buildEvidencePacks(records, {
    tokenBudget: budget.tokenBudget,
    maxPacks: budget.maxPacks,
    contextWindowSeconds: budget.contextWindowSeconds,
    strataCount: budget.strataCount,
    prioritySources: budget.prioritySources,
  });
  const scopeWithReduction = { ...scope, rows_analysed: stats.rowsIncluded, reduction_ratio: stats.reductionRatio };
  return { dashboard, scope, packs, stats, digest, scopeWithReduction };
}

function reqFor(system, user, modelId = MODEL_ID) {
  return { system, messages: [{ role: 'user', content: user }], model: modelId };
}

function registerMap(provider, pack, packCount, responseObj, usage, caseContext) {
  const { system, user } = buildMapPrompt(pack, packCount, { caseContext });
  const hash = provider.hashRequest(reqFor(system, user));
  provider.setCanned(hash, { text: JSON.stringify(responseObj), usage });
  return hash;
}

function registerReduce(provider, mapResults, scopeWithReduction, provenanceSummary, responseObj, usage, caseContext) {
  const { system, user } = buildReducePrompt(mapResults, scopeWithReduction, provenanceSummary, { caseContext });
  const hash = provider.hashRequest(reqFor(system, user));
  provider.setCanned(hash, { text: JSON.stringify(responseObj), usage });
  return hash;
}

function mapHashOnly(provider, pack, packCount, caseContext) {
  const { system, user } = buildMapPrompt(pack, packCount, { caseContext });
  return provider.hashRequest(reqFor(system, user));
}

function reduceHashOnly(provider, mapResults, scopeWithReduction, provenanceSummary, caseContext) {
  const { system, user } = buildReducePrompt(mapResults, scopeWithReduction, provenanceSummary, { caseContext });
  return provider.hashRequest(reqFor(system, user));
}

// ---------------------------------------------------------------------------
// Small synthetic SuperTimeline fixtures. row_hash values are well-formed
// (64 lowercase-hex chars) so schema validation's pattern check on
// evidence[].row_hash never spuriously fails.
// ---------------------------------------------------------------------------

const HASH = (n) => n.toString(16).padStart(64, '0');

function rec(n, minuteOffset, overrides = {}) {
  return {
    row_hash: HASH(n),
    timestamp_utc: new Date(Date.UTC(2026, 0, 5, 10, minuteOffset, 0)).toISOString(),
    host: 'HOST-X',
    user: 'alice',
    source: 'execution',
    severity_max: 'none',
    detections: [],
    message: `benign row ${n}`,
    target: `target-${n}`,
    ...overrides,
  };
}

// 3 rows, one real high-severity detection -> a single evidence pack.
const SMALL_RECORDS = [
  rec(1, 0, {
    severity_max: 'high',
    detections: [{ engine: 'sigma', rule_id: 'SIGMA-1', rule_name: 'Suspicious Encoded PowerShell', severity: 'high', mitre_techniques: ['T1059.001'] }],
    message: 'encoded powershell command line',
    target: 'powershell.exe',
  }),
  rec(2, 1, { source: 'network', message: 'benign dns lookup', target: '8.8.8.8' }),
  rec(3, 2, { source: 'filesystem', message: 'routine file write', target: 'C:\\Users\\alice\\doc.txt' }),
];

// 6 rows, a single detection (row 4, critical, one technique) so the
// resulting finding's overall severity and its one MITRE technique's
// coverage severity always agree (a finding spanning two techniques at two
// different severities is a real thing checkSeverityMaxConsistency should
// -and does- flag; that is exercised deliberately elsewhere, not here).
// At tokenBudget:300 this reliably packs into exactly 2 packs of 3 rows
// each, giving one pack something to report and leaving the other benign.
const MULTI_RECORDS = [
  rec(1, 0),
  rec(2, 1),
  rec(3, 2),
  rec(4, 3, {
    severity_max: 'critical',
    detections: [{ engine: 'sigma', rule_id: 'SIGMA-3', rule_name: 'Rule Critical', severity: 'critical', mitre_techniques: ['T1003.001'] }],
    message: 'suspicious activity two',
  }),
  rec(5, 4),
  rec(6, 5),
];
const MULTI_BUDGET = { tokenBudget: 300, maxPacks: 10 };

// ===========================================================================
// 1. Happy path
// ===========================================================================

test('analyze(): happy path produces a schema-valid report on the first try, with engagement metadata passed through', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(SMALL_RECORDS, {});
  assert.equal(ctx.packs.length, 1, 'sanity: SMALL_RECORDS should fit in a single evidence pack');

  const mapResp = buildCannedMapResponse(ctx.packs[0], SMALL_RECORDS, {});
  const normalizedMap = normalizeMapResultLike(mapResp, ctx.packs[0]);
  const reduceResp = buildCannedReduceResponse([normalizedMap], {});

  registerMap(provider, ctx.packs[0], 1, mapResp, { inputTokens: 500, outputTokens: 300 });
  registerReduce(
    provider,
    [normalizedMap],
    ctx.scopeWithReduction,
    { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 1 },
    reduceResp,
    { inputTokens: 800, outputTokens: 400 },
  );

  const engagement = { case_id: 'CASE-0001', examiner: 'Jane Doe', organization: 'Acme Corp', made_up_field: 'should be dropped' };
  const report = await analyze(SMALL_RECORDS, { provider, model: MODEL_ID, engagement, budget: {} });

  const validation = await validateReport(report, { records: SMALL_RECORDS });
  assert.deepEqual(validation.errors, []);
  assert.equal(validation.valid, true, `report should validate cleanly: ${JSON.stringify(validation.errors)}`);

  assert.equal(report.meta.model.provider, 'mock');
  assert.equal(report.meta.model.model_id, MODEL_ID);
  assert.equal(report.meta.model.prompt_version, PROMPT_VERSION);

  // ENGAGEMENT_KEYS-filtered pass-through (the meta.engagement fix under test).
  assert.deepEqual(report.meta.engagement, { case_id: 'CASE-0001', examiner: 'Jane Doe', organization: 'Acme Corp' });

  // One real finding, with the real row_hash cited, id assigned canonically.
  assert.equal(report.findings.length, 1);
  assert.equal(report.findings[0].id, 'F-001');
  assert.equal(report.findings[0].evidence[0].row_hash, HASH(1));

  assert.equal(report.provenance.pack_count, 1);
  assert.deepEqual(report.provenance.packs[0], {
    index: 0,
    rows: ctx.packs[0].rowCount,
    estimated_tokens: ctx.packs[0].estimatedTokens,
    time_range: ctx.packs[0].timeRange,
    selection_strategy: ctx.packs[0].selectionStrategy,
  });
});

test('analyze(): with no engagement supplied, meta.engagement is an empty object (schema requires the key, not its contents)', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(SMALL_RECORDS, {});
  const mapResp = buildCannedMapResponse(ctx.packs[0], SMALL_RECORDS, {});
  const normalizedMap = normalizeMapResultLike(mapResp, ctx.packs[0]);
  const reduceResp = buildCannedReduceResponse([normalizedMap], {});

  registerMap(provider, ctx.packs[0], 1, mapResp, { inputTokens: 100, outputTokens: 50 });
  registerReduce(provider, [normalizedMap], ctx.scopeWithReduction, { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 1 }, reduceResp, {
    inputTokens: 100,
    outputTokens: 50,
  });

  const report = await analyze(SMALL_RECORDS, { provider, model: MODEL_ID, budget: {} });
  assert.deepEqual(report.meta.engagement, {});
  const validation = await validateReport(report, { records: SMALL_RECORDS });
  assert.equal(validation.valid, true, `report should validate cleanly: ${JSON.stringify(validation.errors)}`);
});

// ===========================================================================
// 2. The model cannot influence chart numbers - the highest-priority test.
// ===========================================================================

test('analyze(): model-supplied dashboard/scope/mitre_coverage are silently discarded in favor of the deterministically computed ones', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(SMALL_RECORDS, {});
  const mapResp = buildCannedMapResponse(ctx.packs[0], SMALL_RECORDS, {});
  const normalizedMap = normalizeMapResultLike(mapResp, ctx.packs[0]);
  // The model tries to author its own (wildly wrong) dashboard/scope/mitre_coverage.
  const reduceResp = buildCannedReduceResponse([normalizedMap], { includeBogusComputedFields: true });
  assert.equal(reduceResp.dashboard.severity_distribution.critical, 999999, 'sanity: the canned response really does try to lie');
  assert.equal(reduceResp.scope.hosts[0].host, 'BOGUS-HOST-INVENTED-BY-MODEL');
  assert.equal(reduceResp.mitre_coverage[0].technique_id, 'T9999');

  registerMap(provider, ctx.packs[0], 1, mapResp, { inputTokens: 100, outputTokens: 50 });
  registerReduce(provider, [normalizedMap], ctx.scopeWithReduction, { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 1 }, reduceResp, {
    inputTokens: 100,
    outputTokens: 50,
  });

  const report = await analyze(SMALL_RECORDS, { provider, model: MODEL_ID, budget: {} });

  // The real, code-computed dashboard/scope survive untouched.
  assert.deepEqual(report.dashboard, ctx.dashboard);
  assert.notEqual(report.dashboard.severity_distribution.critical, 999999);
  assert.deepEqual(report.scope, ctx.scopeWithReduction);
  assert.notEqual(report.scope.hosts?.[0]?.host, 'BOGUS-HOST-INVENTED-BY-MODEL');

  // mitre_coverage is recomputed from the FINAL sanitized findings, not copied from the model.
  assert.deepEqual(report.mitre_coverage, computeMitreCoverage(SMALL_RECORDS, report.findings));
  assert.ok(!report.mitre_coverage.some((c) => c.technique_id === 'T9999'));

  const validation = await validateReport(report, { records: SMALL_RECORDS });
  assert.equal(validation.valid, true, `report should validate cleanly: ${JSON.stringify(validation.errors)}`);
});

// ===========================================================================
// 3. Deterministic finding id assignment + deterministic final sort order
// ===========================================================================

test('analyze(): finding ids are assigned in the model\'s original array order, but the final list is sorted severity desc / confidence desc / id asc', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(SMALL_RECORDS, {});
  const mapResp = buildCannedMapResponse(ctx.packs[0], SMALL_RECORDS, {});
  const normalizedMap = normalizeMapResultLike(mapResp, ctx.packs[0]);

  // Deliberately scrambled severity/confidence order in the model's response.
  const scrambledFindings = [
    { title: 'Low sev issue', severity: 'low', confidence: 'moderate', narrative: 'n', evidence: [{ row_hash: HASH(1) }] },
    { title: 'Critical sev issue', severity: 'critical', confidence: 'high', narrative: 'n', evidence: [{ row_hash: HASH(1) }] },
    { title: 'High sev issue A (moderate confidence)', severity: 'high', confidence: 'moderate', narrative: 'n', evidence: [{ row_hash: HASH(1) }] },
    { title: 'High sev issue B (high confidence)', severity: 'high', confidence: 'high', narrative: 'n', evidence: [{ row_hash: HASH(1) }] },
  ];
  const reduceResp = { ...buildCannedReduceResponse([normalizedMap], {}), findings: scrambledFindings };

  registerMap(provider, ctx.packs[0], 1, mapResp, { inputTokens: 100, outputTokens: 50 });
  registerReduce(provider, [normalizedMap], ctx.scopeWithReduction, { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 1 }, reduceResp, {
    inputTokens: 100,
    outputTokens: 50,
  });

  const report = await analyze(SMALL_RECORDS, { provider, model: MODEL_ID, budget: {} });

  // ids assigned by ORIGINAL order: Low=F-001, Critical=F-002, HighA=F-003, HighB=F-004.
  const idByTitle = new Map(report.findings.map((f) => [f.title, f.id]));
  assert.equal(idByTitle.get('Low sev issue'), 'F-001');
  assert.equal(idByTitle.get('Critical sev issue'), 'F-002');
  assert.equal(idByTitle.get('High sev issue A (moderate confidence)'), 'F-003');
  assert.equal(idByTitle.get('High sev issue B (high confidence)'), 'F-004');

  // final order: severity desc, then confidence desc, then id asc.
  assert.deepEqual(
    report.findings.map((f) => f.id),
    ['F-002', 'F-004', 'F-003', 'F-001'],
  );
});

// ===========================================================================
// 4. Transient (429) provider failure is retried and the call still succeeds
// ===========================================================================

test('analyze(): a transient retryable provider failure during the map phase is retried by withRetry and the pack still succeeds', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(SMALL_RECORDS, {});
  const mapResp = buildCannedMapResponse(ctx.packs[0], SMALL_RECORDS, {});
  const normalizedMap = normalizeMapResultLike(mapResp, ctx.packs[0]);
  const reduceResp = buildCannedReduceResponse([normalizedMap], {});

  const mapHash = registerMap(provider, ctx.packs[0], 1, mapResp, { inputTokens: 100, outputTokens: 50 });
  provider.setBehavior(mapHash, { failTimes: 1, retryAfterMs: 5 }); // fails once (429), succeeds on attempt 2
  registerReduce(provider, [normalizedMap], ctx.scopeWithReduction, { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 1 }, reduceResp, {
    inputTokens: 100,
    outputTokens: 50,
  });

  const report = await analyze(SMALL_RECORDS, { provider, model: MODEL_ID, budget: { callMaxAttempts: 3 } });

  assert.equal(provider.getCallCount(mapHash), 2, 'the map call should have been retried exactly once');
  assert.equal(report.findings.length, 1);
  assert.ok(!report.provenance.warnings, 'a transient failure that is successfully retried should not produce a warning');
});

// ===========================================================================
// 5. Repair loop: an invalid reduce response gets repaired successfully
// ===========================================================================

test('analyze(): a reduce response with a fabricated citation fails validation and is successfully repaired within maxRepairAttempts', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(SMALL_RECORDS, {});
  const mapResp = buildCannedMapResponse(ctx.packs[0], SMALL_RECORDS, {});
  const normalizedMap = normalizeMapResultLike(mapResp, ctx.packs[0]);

  const badReduce = buildCannedReduceResponse([normalizedMap], { fabricateRowHash: true });
  const goodReduce = buildCannedReduceResponse([normalizedMap], {});

  registerMap(provider, ctx.packs[0], 1, mapResp, { inputTokens: 100, outputTokens: 50 });
  registerReduce(provider, [normalizedMap], ctx.scopeWithReduction, { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 1 }, badReduce, {
    inputTokens: 100,
    outputTokens: 50,
  });

  // The repair prompt's exact text depends on validateReport's exact error
  // messages, which we don't want to hand-predict (fragile). Instead: lazily
  // auto-register the (known-good) fixed response the first time we see a
  // request whose user text is a repair prompt (buildRepairPrompt's fixed
  // preamble), keyed by its real hash - this still exercises the real mock
  // provider's hashing/canned/call-count machinery, it just decides WHAT to
  // register just-in-time instead of predicting the hash in advance.
  const realSend = provider.send;
  let repairCallCount = 0;
  provider.send = async (req, creds, opts) => {
    const isRepairRequest = typeof req?.messages?.[0]?.content === 'string' && req.messages[0].content.startsWith('Your previous response failed validation against the report schema');
    if (isRepairRequest) {
      const hash = provider.hashRequest(req);
      if (provider.getCallCount(hash) === 0) {
        repairCallCount += 1;
        provider.setCanned(hash, { text: JSON.stringify(goodReduce), usage: { inputTokens: 150, outputTokens: 250 } });
      }
    }
    return realSend(req, creds, opts);
  };

  const report = await analyze(SMALL_RECORDS, { provider, model: MODEL_ID, budget: {} });

  assert.equal(repairCallCount, 1, 'exactly one repair round-trip should have happened');
  assert.equal(report.provenance.repair_attempts, 1);
  for (const finding of report.findings) {
    for (const ev of finding.evidence) {
      assert.notEqual(ev.row_hash, 'e'.repeat(64), 'the fabricated citation must not survive into the final report');
    }
  }
  const validation = await validateReport(report, { records: SMALL_RECORDS });
  assert.equal(validation.valid, true, `repaired report should validate cleanly: ${JSON.stringify(validation.errors)}`);
});

// ===========================================================================
// 6. Repair exhaustion surfaces a clear, structured PipelineError
// ===========================================================================

test('analyze(): if the model never fixes a fabricated citation, repair attempts are exhausted and a structured PipelineError is thrown', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(SMALL_RECORDS, {});
  const mapResp = buildCannedMapResponse(ctx.packs[0], SMALL_RECORDS, {});
  const normalizedMap = normalizeMapResultLike(mapResp, ctx.packs[0]);
  const badReduce = buildCannedReduceResponse([normalizedMap], { fabricateRowHash: true });

  registerMap(provider, ctx.packs[0], 1, mapResp, { inputTokens: 100, outputTokens: 50 });
  registerReduce(provider, [normalizedMap], ctx.scopeWithReduction, { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 1 }, badReduce, {
    inputTokens: 100,
    outputTokens: 50,
  });

  // The repair call gets the SAME bad response every time - it never improves.
  const realSend = provider.send;
  provider.send = async (req, creds, opts) => {
    const isRepairRequest = typeof req?.messages?.[0]?.content === 'string' && req.messages[0].content.startsWith('Your previous response failed validation against the report schema');
    if (isRepairRequest) {
      const hash = provider.hashRequest(req);
      if (provider.getCallCount(hash) === 0) {
        provider.setCanned(hash, { text: JSON.stringify(badReduce), usage: { inputTokens: 100, outputTokens: 50 } });
      }
    }
    return realSend(req, creds, opts);
  };

  await assert.rejects(
    () => analyze(SMALL_RECORDS, { provider, model: MODEL_ID, budget: { maxRepairAttempts: 1 } }),
    (err) => {
      assert.ok(err instanceof PipelineError);
      assert.equal(err.code, 'validation_failed');
      assert.ok(Array.isArray(err.errors) && err.errors.length > 0);
      assert.ok(err.errors.some((e) => e.code === 'fabricated_citation'));
      assert.ok(err.report && Array.isArray(err.report.findings), 'the (still-invalid) report should be attached for diagnosis');
      return true;
    },
  );
});

// ===========================================================================
// 7. Abort handling: never a partial report
// ===========================================================================

test('analyze(): an already-aborted signal rejects immediately with an AbortError and never touches the provider', async () => {
  const provider = createMockProvider();
  let sendCalled = false;
  const realSend = provider.send;
  provider.send = async (...args) => {
    sendCalled = true;
    return realSend(...args);
  };

  const ac = new AbortController();
  ac.abort();

  await assert.rejects(
    () => analyze(SMALL_RECORDS, { provider, model: MODEL_ID, signal: ac.signal, budget: {} }),
    (err) => {
      assert.equal(err.name, 'AbortError');
      return true;
    },
  );
  assert.equal(sendCalled, false);
});

test('analyze(): aborting between the packs phase and the map phase rejects with AbortError and produces no report', async () => {
  const provider = createMockProvider();
  const ac = new AbortController();

  const result = await analyze(SMALL_RECORDS, {
    provider,
    model: MODEL_ID,
    signal: ac.signal,
    budget: {},
    onProgress: (evt) => {
      if (evt.phase === 'packs' && evt.packCount !== undefined) ac.abort(); // abort once packs are known, before any model call
    },
  }).then(
    (report) => ({ resolved: true, report }),
    (err) => ({ resolved: false, err }),
  );

  assert.equal(result.resolved, false);
  assert.equal(result.err.name, 'AbortError');
});

// ===========================================================================
// 8. Usage/cost accumulation across multiple map calls + one reduce call
// ===========================================================================

test('analyze(): usage (input/output tokens) accumulates across every map-phase call and the reduce call', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(MULTI_RECORDS, MULTI_BUDGET);
  assert.equal(ctx.packs.length, 2, 'sanity: MULTI_RECORDS at this budget should split into exactly 2 packs');

  const mapResp0 = buildCannedMapResponse(ctx.packs[0], MULTI_RECORDS, {});
  const mapResp1 = buildCannedMapResponse(ctx.packs[1], MULTI_RECORDS, {});
  const normalized0 = normalizeMapResultLike(mapResp0, ctx.packs[0]);
  const normalized1 = normalizeMapResultLike(mapResp1, ctx.packs[1]);
  const reduceResp = buildCannedReduceResponse([normalized0, normalized1], {});

  const usageMap0 = { inputTokens: 111, outputTokens: 22 };
  const usageMap1 = { inputTokens: 333, outputTokens: 44 };
  const usageReduce = { inputTokens: 555, outputTokens: 66, cachedInputTokens: 7 };

  registerMap(provider, ctx.packs[0], 2, mapResp0, usageMap0);
  registerMap(provider, ctx.packs[1], 2, mapResp1, usageMap1);
  registerReduce(
    provider,
    [normalized0, normalized1],
    ctx.scopeWithReduction,
    { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 2 },
    reduceResp,
    usageReduce,
  );

  const report = await analyze(MULTI_RECORDS, { provider, model: MODEL_ID, budget: MULTI_BUDGET });

  assert.equal(report.meta.usage.input_tokens, usageMap0.inputTokens + usageMap1.inputTokens + usageReduce.inputTokens);
  assert.equal(report.meta.usage.output_tokens, usageMap0.outputTokens + usageMap1.outputTokens + usageReduce.outputTokens);
  assert.equal(report.meta.usage.cached_input_tokens, usageReduce.cachedInputTokens);
  assert.ok(typeof report.meta.usage.estimated_cost_usd === 'number');
  assert.ok(report.meta.usage.wall_clock_seconds >= 0);

  const validation = await validateReport(report, { records: MULTI_RECORDS });
  assert.equal(validation.valid, true, `report should validate cleanly: ${JSON.stringify(validation.errors)}`);
});

// ===========================================================================
// 9. Graceful degradation: one permanently-failing pack does not abort the run
// ===========================================================================

test('analyze(): a map-phase pack whose call permanently fails is recorded as a warning, and the run still completes using the other packs', async () => {
  const provider = createMockProvider();
  const ctx = await computePipelineContext(MULTI_RECORDS, MULTI_BUDGET);
  assert.equal(ctx.packs.length, 2);

  // Pack 0's hash is deliberately left un-canned: the mock provider's default
  // fallback text is not valid JSON, so callModel will throw after
  // exhausting attempts. budget.callMaxAttempts:1 makes that immediate
  // (no retry delay) and deterministic.
  const pack0Hash = mapHashOnly(provider, ctx.packs[0], 2);

  const mapResp1 = buildCannedMapResponse(ctx.packs[1], MULTI_RECORDS, {});
  registerMap(provider, ctx.packs[1], 2, mapResp1, { inputTokens: 50, outputTokens: 25 });

  const normalized0 = normalizeMapResultLike({}, ctx.packs[0]); // what pipeline.js substitutes on failure
  const normalized1 = normalizeMapResultLike(mapResp1, ctx.packs[1]);
  const reduceResp = buildCannedReduceResponse([normalized0, normalized1], {});
  registerReduce(
    provider,
    [normalized0, normalized1],
    ctx.scopeWithReduction,
    { reduction_strategy: ctx.stats.strategy, rows_omitted: ctx.stats.rowsOmitted, pack_count: 2 },
    reduceResp,
    { inputTokens: 80, outputTokens: 40 },
  );

  const report = await analyze(MULTI_RECORDS, { provider, model: MODEL_ID, budget: { ...MULTI_BUDGET, callMaxAttempts: 1 } });

  assert.ok(provider.getCallCount(pack0Hash) >= 1, 'pack 0 should have actually been attempted');
  assert.ok(Array.isArray(report.provenance.warnings) && report.provenance.warnings.length >= 1, 'a warning should be recorded for the failed pack');
  // The run still produced a valid, complete report from pack 1's real finding.
  assert.equal(report.findings.length, mapResp1.partial_findings.length);
  const validation = await validateReport(report, { records: MULTI_RECORDS });
  assert.equal(validation.valid, true, `report should validate cleanly: ${JSON.stringify(validation.errors)}`);
});
