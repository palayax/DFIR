// web/assets/js/providers/openai.js
//
// OpenAI Chat Completions API, plain fetch — no `openai` SDK.
//
// Also exports `createOpenAiCompatibleProvider`, a small factory shared by
// azure-openai.js / openrouter.js / opencode.js: all four APIs speak the same
// Chat Completions request/response shape and differ only in base URL
// resolution and auth header. Keeping the shape logic in one place means a
// bug fix (e.g. to SSE delta assembly) can't drift between the four files.
// This is still "one file per provider" as required — azure/openrouter/
// opencode each own their credentials, URL rules and defaults; they just
// import the shared plumbing the way they'd import any other local module.

import { withRetry } from './lib/retry.js';
import { fetchWithNetworkErrors, throwIfError, iterateSSE } from './lib/http.js';
import { estimateTokens } from './lib/tokens.js';

export const DEFAULT_BASE_URL = 'https://api.openai.com';

export const models = [
  {
    id: 'gpt-5.1',
    label: 'GPT-5.1',
    contextWindow: 400000,
    maxOutput: 64000,
    inputCostPerMTok: 5,
    outputCostPerMTok: 15,
  },
  {
    id: 'gpt-5.1-mini',
    label: 'GPT-5.1 Mini',
    contextWindow: 400000,
    maxOutput: 64000,
    inputCostPerMTok: 0.5,
    outputCostPerMTok: 2,
  },
];

function toChatMessages(system, messages) {
  const out = [];
  if (system) out.push({ role: 'system', content: system });
  for (const m of messages || []) out.push({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content });
  return out;
}

export function buildChatBody(req, modelId, { omitModel = false } = {}) {
  const body = { messages: toChatMessages(req.system, req.messages) };
  if (!omitModel) body.model = modelId;
  if (typeof req.maxTokens === 'number') body.max_tokens = req.maxTokens;
  if (typeof req.temperature === 'number') body.temperature = req.temperature;
  if (typeof req.topP === 'number') body.top_p = req.topP;
  if (req.stopSequences?.length) body.stop = req.stopSequences;
  if (req.stream) body.stream = true;
  if (req.jsonSchema) {
    body.response_format = { type: 'json_schema', json_schema: { name: 'response', strict: true, schema: req.jsonSchema } };
  }
  return body;
}

export function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

/**
 * @param {{
 *   id: string, label: string, models: object[], requiredCredentials: object[],
 *   defaultBaseUrl?: string,
 *   getBaseUrl?: (creds: object) => string,
 *   resolveUrl?: (baseUrl: string, creds: object) => string,
 *   authHeaders?: (creds: object) => Record<string,string>,
 *   extraHeaders?: (creds: object) => Record<string,string>,
 *   omitModelInBody?: boolean,
 *   requiredKeys?: string[],
 *   getModelId?: (req: object, creds: object) => string,
 * }} config
 */
export function createOpenAiCompatibleProvider(config) {
  const {
    id,
    label,
    models: providerModels,
    requiredCredentials,
    defaultBaseUrl,
    getBaseUrl = (creds) => creds.baseUrl || defaultBaseUrl,
    resolveUrl = (baseUrl) => `${baseUrl}/v1/chat/completions`,
    authHeaders = (creds) => ({ authorization: `Bearer ${creds.apiKey}` }),
    extraHeaders = () => ({}),
    omitModelInBody = false,
    requiredKeys = ['apiKey'],
    getModelId = (req) => req.model || providerModels[0]?.id,
  } = config;

  return {
    id,
    label,
    models: providerModels,
    requiredCredentials,

    validateCredentials(creds) {
      const errors = [];
      for (const key of requiredKeys) {
        if (!creds?.[key]) errors.push(`${key} is required`);
      }
      return { ok: errors.length === 0, errors };
    },

    estimateTokens,

    async send(req, creds = {}, { signal, onDelta } = {}) {
      const baseUrl = (getBaseUrl(creds) || '').replace(/\/$/, '');
      if (!baseUrl) throw new Error(`${label}: baseUrl is required`);
      const modelId = getModelId(req, creds);
      const url = resolveUrl(baseUrl, creds);
      const body = buildChatBody(req, modelId, { omitModel: omitModelInBody });

      return withRetry(
        async () => {
          const response = await fetchWithNetworkErrors(url, {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              ...authHeaders(creds),
              ...extraHeaders(creds),
            },
            body: JSON.stringify(body),
            signal,
          });
          await throwIfError(response);

          if (req.stream && onDelta) {
            let text = '';
            const usage = { inputTokens: 0, outputTokens: 0 };
            let finalModel = modelId;
            let stopReason = null;

            for await (const payload of iterateSSE(response)) {
              let evt;
              try {
                evt = JSON.parse(payload);
              } catch {
                continue;
              }
              const choice = evt.choices?.[0];
              const delta = choice?.delta?.content;
              if (delta) {
                text += delta;
                onDelta({ delta, text });
              }
              if (choice?.finish_reason) stopReason = choice.finish_reason;
              if (evt.model) finalModel = evt.model;
              if (evt.usage) {
                usage.inputTokens = evt.usage.prompt_tokens ?? usage.inputTokens;
                usage.outputTokens = evt.usage.completion_tokens ?? usage.outputTokens;
              }
            }

            return { text, jsonValue: tryParseJson(text), usage, model: finalModel, stopReason, raw: { streamed: true } };
          }

          const data = await response.json();
          const choice = data.choices?.[0];
          const text = choice?.message?.content ?? '';

          return {
            text,
            jsonValue: tryParseJson(text),
            usage: {
              inputTokens: data.usage?.prompt_tokens ?? 0,
              outputTokens: data.usage?.completion_tokens ?? 0,
              cachedInputTokens: data.usage?.prompt_tokens_details?.cached_tokens,
            },
            model: data.model || modelId,
            stopReason: choice?.finish_reason ?? null,
            raw: data,
          };
        },
        { signal },
      );
    },
  };
}

export const openAiProvider = createOpenAiCompatibleProvider({
  id: 'openai',
  label: 'OpenAI',
  models,
  requiredCredentials: [
    { key: 'apiKey', label: 'API key', kind: 'secret', placeholder: 'sk-...', help: 'From platform.openai.com.' },
    {
      key: 'baseUrl',
      label: 'Base URL (advanced)',
      kind: 'text',
      placeholder: DEFAULT_BASE_URL,
      help: 'Override for an OpenAI-compatible proxy.',
    },
  ],
  defaultBaseUrl: DEFAULT_BASE_URL,
});

export default openAiProvider;
