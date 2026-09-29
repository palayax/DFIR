// web/assets/js/providers/mock.js
//
// Deterministic mock LLM provider. Used by:
//   - the test suite (providers.test.mjs, and any pipeline test elsewhere)
//   - the app's "dry run" mode (analysts can preview a report shape with
//     zero API spend and zero network calls)
//
// NEVER put a real API key here. This adapter makes no network calls at all.

import { ProviderError } from './lib/retry.js';
import { estimateTokens } from './lib/tokens.js';

/** FNV-1a 32-bit hash, hex-encoded. Deterministic, sync, good enough for keying canned fixtures. */
function hashRequest(req) {
  const s = JSON.stringify({
    system: req?.system ?? null,
    messages: req?.messages ?? [],
    jsonSchema: req?.jsonSchema ?? null,
    model: req?.model ?? null,
  });
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

function chunkText(text, size = 8) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size) chunks.push(text.slice(i, i + size));
  return chunks.length ? chunks : [''];
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

function abortError() {
  const e = new Error('Aborted');
  e.name = 'AbortError';
  return e;
}

// ---------------------------------------------------------------------------
// Offline dry-run synthesis
//
// Why this exists: with no canned response registered, send() used to return the
// prose string `Mock response for request hash <hash>`. That is fine for the unit
// tests, which always register their own canned responses -- but it made the mock
// USELESS as the "dry run with zero API spend and zero network" provider that
// docs/WEB_APP.md and the app's own Settings copy advertise. Driven end to end
// against a real 1,643-row timeline, every map call failed
// ("Model response was not valid JSON", swallowed into warnings[]) and the reduce
// call then failed fatally, so the pipeline could never produce a report offline.
// None of the 254 tests caught it because they all inject canned responses and so
// never exercise the default path through analyze().
//
// The synthesis below is deliberately dumb and deterministic. It is NOT pretending
// to be an analyst: it emits a schema-valid report skeleton whose verdict is
// explicitly `inconclusive` and whose text says, in the report itself, that no
// model reasoning took place. What it DOES prove on a dry run is everything
// except the model: pack construction, the map/reduce plumbing, report assembly,
// schema validation, the deterministic dashboard/scope/MITRE figures, the
// renderer, and the PDF writer.
// ---------------------------------------------------------------------------

const ROW_HASH_RE = /\b[0-9a-f]{64}\b/g;

/** Pull real row_hash values out of a rendered prompt so synthesised findings
 * carry citations that actually resolve against the caller's timeline. The
 * evidence rows are rendered TAB-separated with the full 64-hex hash, so a plain
 * scan is reliable; if it finds nothing we emit zero findings rather than invent
 * a hash, which would fail validate-report.js's row-hash check by design. */
function harvestRowHashes(req, limit) {
  const text = (req?.messages || []).map((m) => (typeof m.content === 'string' ? m.content : '')).join('\n');
  const seen = [];
  const dedupe = new Set();
  for (const m of text.matchAll(ROW_HASH_RE)) {
    if (dedupe.has(m[0])) continue;
    dedupe.add(m[0]);
    seen.push(m[0]);
    if (seen.length >= limit) break;
  }
  return seen;
}

// The reduce/repair prompts are the only ones that must yield a full report.
// Rather than pattern-match prompt wording (which would couple this adapter to
// analysis/prompts.js), synthesise a payload that satisfies BOTH consumers:
// normalizeMapResult() reads pack_index/findings/observations and ignores the
// rest, while assembleReport() reads verdict/executive_summary/findings and
// overwrites meta/scope/dashboard/mitre_coverage with deterministic values.
function synthesiseDryRunPayload(req) {
  const hashes = harvestRowHashes(req, 3);
  const findings = hashes.length
    ? [
        {
          id: 'MOCK-0001',
          title: 'Dry run — no model analysis was performed',
          severity: 'informational',
          confidence: 'low',
          category: 'other',
          narrative:
            'This finding was produced by the offline Mock provider, not by a language model. It exists so a dry ' +
            'run exercises the full report path (assembly, schema validation, dashboard rendering, PDF export) ' +
            'without spending tokens or making a network request. Re-run with a real provider for actual analysis.',
          evidence: hashes.map((h) => ({
            row_hash: h,
            why_relevant: 'Cited only to demonstrate that citations resolve against the supplied timeline.',
          })),
          // report_schema.json types this as a STRING (the reasoning), not a
          // boolean flag. Passing `true` fails validation and burns both repair
          // attempts before the run dies -- which is how this was caught.
          false_positive_considered:
            'Not applicable: this finding is a dry-run placeholder, not an assessment of observed activity.',
        },
      ]
    : [];

  return {
    // The map and reduce phases read DIFFERENT keys for the same thing:
    // normalizeMapResult() takes `partial_findings`, while assembleReport() takes
    // `findings`. Emitting only `findings` (the first attempt here) meant every
    // map result was normalised to an empty set, the reduce prompt then contained
    // no row hashes to harvest, and the dry-run report came out with zero
    // findings while every individual call "succeeded". Emit both.
    pack_index: 0,
    partial_findings: findings,
    notes_for_synthesis: 'Offline dry run: no model reasoning was applied to this evidence pack.',
    observations: [],
    // consumed by assembleReport() in the reduce phase
    verdict: {
      assessment: 'inconclusive',
      confidence: 'low',
      confidence_rationale:
        'No model reasoning took place. The Mock provider returns a fixed skeleton, so this verdict reflects the ' +
        'absence of analysis rather than the absence of evidence.',
      rationale: 'Offline dry run via the Mock provider.',
    },
    executive_summary: {
      text:
        'DRY RUN — produced by the offline Mock provider with no language model involved. The timeline was ingested, ' +
        'merged, reduced into evidence packs and rendered, which validates the pipeline end to end. No conclusions ' +
        'about this host should be drawn from this report. Select a real LLM provider on the Settings view to ' +
        'perform an actual analysis.',
      bullets: [
        'All dashboard, scope and MITRE figures in this report are computed deterministically from the timeline and are real.',
        'The verdict, narrative and findings are placeholders and carry no analytic meaning.',
      ],
    },
    findings,
    analytic_gaps: [
      {
        gap: 'No model analysis was performed.',
        reason: 'other',
        detail: 'The Mock provider was selected, which synthesises a fixed report skeleton offline.',
        how_to_close: 'Choose a real LLM provider on the Settings view and re-run the analysis.',
      },
    ],
    attack_narrative: { summary: 'Not assessed — offline dry run.', phases: [] },
    recommendations: { immediate: [], short_term: [], long_term: [], further_collection: [] },
    dismissed_detections: [],
    iocs: {},
  };
}

/**
 * @returns {import('./types.js').LLMProvider & {
 *   hashRequest: (req: object) => string,
 *   setCanned: (hash: string, response: object) => void,
 *   setBehavior: (hash: string, behavior: object) => void,
 *   getCallCount: (hash: string) => number,
 *   reset: () => void,
 * }}
 */
export function createMockProvider() {
  const canned = new Map();
  const behaviors = new Map();
  const callCounts = new Map();

  return {
    id: 'mock',
    label: 'Mock Provider (offline / dry run)',
    models: [
      {
        id: 'mock-standard',
        label: 'Mock Standard',
        contextWindow: 200000,
        maxOutput: 8192,
        inputCostPerMTok: 0,
        outputCostPerMTok: 0,
      },
    ],
    requiredCredentials: [],
    validateCredentials() {
      return { ok: true, errors: [] };
    },
    estimateTokens,
    hashRequest,

    /** Register a canned {text, jsonValue?, usage?, model?, stopReason?} for a given request hash. */
    setCanned(hash, response) {
      canned.set(hash, response);
    },

    /**
     * Register scripted misbehavior for a given request hash:
     *   { failTimes, retryAfterMs, malformedJson, streamChunks }
     */
    setBehavior(hash, behavior) {
      behaviors.set(hash, behavior);
    },

    getCallCount(hash) {
      return callCounts.get(hash) || 0;
    },

    reset() {
      canned.clear();
      behaviors.clear();
      callCounts.clear();
    },

    async send(req, _creds = {}, { signal, onDelta } = {}) {
      if (signal?.aborted) throw abortError();

      const hash = hashRequest(req);
      const count = (callCounts.get(hash) || 0) + 1;
      callCounts.set(hash, count);
      const behavior = behaviors.get(hash) || {};

      if (behavior.failTimes && count <= behavior.failTimes) {
        const err = new ProviderError(`Mock rate limited (attempt ${count} of ${behavior.failTimes})`, {
          status: 429,
          retryable: true,
        });
        err.retryAfterMs = behavior.retryAfterMs ?? 5;
        throw err;
      }

      // Precedence: an explicitly canned response, then a scripted behavior
      // response, then the offline dry-run skeleton. The first two are how every
      // unit test drives this adapter, so they must keep winning; the third is
      // what makes the provider usable from the app with nothing registered.
      //
      // `malformedJson` deliberately short-circuits synthesis below -- that
      // behavior exists precisely to produce unparseable output, and
      // providers.test.mjs asserts jsonValue stays undefined for it.
      let cannedResponse = canned.get(hash) || behavior.response;
      if (!cannedResponse) {
        const payload = synthesiseDryRunPayload(req);
        const text = JSON.stringify(payload);
        cannedResponse = {
          text,
          usage: {
            inputTokens: estimateTokens(req?.system || '') + (req?.messages || []).reduce((a, m) => a + estimateTokens(m.content), 0),
            outputTokens: estimateTokens(text),
          },
        };
      }

      let text = behavior.malformedJson ? '{ "not": "valid json"  ' : cannedResponse.text ?? '';

      if (req?.stream && onDelta) {
        const chunks = behavior.streamChunks || chunkText(text);
        let acc = '';
        for (const chunk of chunks) {
          if (signal?.aborted) throw abortError();
          acc += chunk;
          onDelta({ delta: chunk, text: acc });
          // yield to the event loop so aborts/timers can interleave, like a real stream
          // eslint-disable-next-line no-await-in-loop
          await Promise.resolve();
        }
        text = acc;
      }

      let jsonValue = cannedResponse.jsonValue;
      if (jsonValue === undefined && req?.jsonSchema) {
        jsonValue = tryParseJson(text);
      }

      return {
        text,
        jsonValue,
        usage: cannedResponse.usage || { inputTokens: 0, outputTokens: 0 },
        model: cannedResponse.model || req?.model || 'mock-standard',
        stopReason: cannedResponse.stopReason || 'end_turn',
        raw: { mock: true, hash, attempt: count },
      };
    },
  };
}

export const mockProvider = createMockProvider();

export default mockProvider;
