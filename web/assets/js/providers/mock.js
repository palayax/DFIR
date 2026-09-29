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

      const cannedResponse =
        canned.get(hash) ||
        behavior.response || {
          text: `Mock response for request hash ${hash}`,
          usage: {
            inputTokens: estimateTokens(req?.system || '') + (req?.messages || []).reduce((a, m) => a + estimateTokens(m.content), 0),
            outputTokens: 12,
          },
        };

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
