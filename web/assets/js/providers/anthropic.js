// web/assets/js/providers/anthropic.js
//
// Anthropic Messages API. Plain fetch — no @anthropic-ai/sdk.
//
// Gotchas (do not "fix" these away):
//   - `system` is a TOP-LEVEL request field, never a message with role
//     'system'. Anthropic's Messages API only accepts 'user'/'assistant'
//     roles in the `messages` array.
//   - `anthropic-dangerous-direct-browser-access: true` is REQUIRED for any
//     browser-origin call to api.anthropic.com — without it the request is
//     blocked by CORS (this app is backend-less, so every call is
//     browser-origin). This header name looks alarming but it is Anthropic's
//     documented, correct way to opt in to CORS support.
//   - Default model for the whole app is `claude-opus-5-5` per RUN_PLAN.md.

import { withRetry } from './lib/retry.js';
import { fetchWithNetworkErrors, throwIfError, iterateSSE } from './lib/http.js';
import { estimateTokens } from './lib/tokens.js';

export const DEFAULT_BASE_URL = 'https://api.anthropic.com';
export const ANTHROPIC_VERSION = '2023-06-01';

export const models = [
  {
    id: 'claude-opus-5-5',
    label: 'Claude Opus 5.5',
    contextWindow: 500000,
    maxOutput: 64000,
    inputCostPerMTok: 15,
    outputCostPerMTok: 75,
  },
  {
    id: 'claude-sonnet-5',
    label: 'Claude Sonnet 5',
    contextWindow: 300000,
    maxOutput: 64000,
    inputCostPerMTok: 3,
    outputCostPerMTok: 15,
  },
  {
    id: 'claude-haiku-4-5-20251001',
    label: 'Claude Haiku 4.5',
    contextWindow: 200000,
    maxOutput: 32000,
    inputCostPerMTok: 0.8,
    outputCostPerMTok: 4,
  },
  {
    id: 'claude-fable-5-1',
    label: 'Claude Fable 5.1',
    contextWindow: 200000,
    maxOutput: 32000,
    inputCostPerMTok: 1,
    outputCostPerMTok: 5,
  },
];

export const defaultModelId = 'claude-opus-5-5';

function toAnthropicMessages(messages) {
  return (messages || []).map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }));
}

function buildBody(req, modelId) {
  const body = {
    model: modelId,
    max_tokens: req.maxTokens ?? 4096,
    messages: toAnthropicMessages(req.messages),
  };
  if (req.system) body.system = req.system;
  if (typeof req.temperature === 'number') body.temperature = req.temperature;
  if (typeof req.topP === 'number') body.top_p = req.topP;
  if (req.stopSequences?.length) body.stop_sequences = req.stopSequences;
  if (req.stream) body.stream = true;
  return body;
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export const anthropicProvider = {
  id: 'anthropic',
  label: 'Anthropic',
  models,
  requiredCredentials: [
    {
      key: 'apiKey',
      label: 'API key',
      kind: 'secret',
      placeholder: 'sk-ant-...',
      help: 'From console.anthropic.com. Kept in memory unless you opt in to encrypted persistence.',
    },
    {
      key: 'baseUrl',
      label: 'Base URL (advanced)',
      kind: 'text',
      placeholder: DEFAULT_BASE_URL,
      help: 'Override only if you are routing through a compatible proxy.',
    },
  ],
  validateCredentials(creds) {
    const errors = [];
    if (!creds?.apiKey) errors.push('apiKey is required');
    return { ok: errors.length === 0, errors };
  },
  estimateTokens,

  async send(req, creds = {}, { signal, onDelta } = {}) {
    const baseUrl = (creds.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
    const modelId = req.model || defaultModelId;
    const url = `${baseUrl}/v1/messages`;
    const body = buildBody(req, modelId);

    return withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-api-key': creds.apiKey,
            'anthropic-version': ANTHROPIC_VERSION,
            'anthropic-dangerous-direct-browser-access': 'true',
          },
          body: JSON.stringify(body),
          signal,
        });
        await throwIfError(response);

        if (req.stream && onDelta) {
          let text = '';
          const usage = { inputTokens: 0, outputTokens: 0 };
          let stopReason = null;
          let finalModel = modelId;

          for await (const payload of iterateSSE(response)) {
            let evt;
            try {
              evt = JSON.parse(payload);
            } catch {
              continue;
            }
            if (evt.type === 'content_block_delta' && evt.delta?.type === 'text_delta') {
              text += evt.delta.text;
              onDelta({ delta: evt.delta.text, text });
            } else if (evt.type === 'message_start') {
              finalModel = evt.message?.model || finalModel;
              if (evt.message?.usage) usage.inputTokens = evt.message.usage.input_tokens ?? usage.inputTokens;
            } else if (evt.type === 'message_delta') {
              if (evt.delta?.stop_reason) stopReason = evt.delta.stop_reason;
              if (evt.usage) usage.outputTokens = evt.usage.output_tokens ?? usage.outputTokens;
            }
          }

          return { text, jsonValue: tryParseJson(text), usage, model: finalModel, stopReason, raw: { streamed: true } };
        }

        const data = await response.json();
        const text = (data.content || [])
          .filter((b) => b.type === 'text')
          .map((b) => b.text)
          .join('');

        return {
          text,
          jsonValue: tryParseJson(text),
          usage: {
            inputTokens: data.usage?.input_tokens ?? 0,
            outputTokens: data.usage?.output_tokens ?? 0,
            cachedInputTokens: data.usage?.cache_read_input_tokens,
          },
          model: data.model || modelId,
          stopReason: data.stop_reason ?? null,
          raw: data,
        };
      },
      { signal },
    );
  },
};

export default anthropicProvider;
