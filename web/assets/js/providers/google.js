// web/assets/js/providers/google.js
//
// Google Gemini (API-key, generativelanguage.googleapis.com) and Vertex AI
// (project + location + OAuth bearer token) behind one adapter, selected by
// `creds.mode` ('gemini' | 'vertex'). Plain fetch — no @google/generative-ai
// or @google-cloud/vertexai SDK.
//
// Mapping:
//   system                -> systemInstruction.parts[0].text
//   messages[].role       -> 'user' | 'model' (Gemini has no 'assistant')
//   usageMetadata          -> LLMResponse.usage

import { withRetry } from './lib/retry.js';
import { fetchWithNetworkErrors, throwIfError, iterateSSE } from './lib/http.js';
import { estimateTokens } from './lib/tokens.js';

export const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com';

export const models = [
  {
    id: 'gemini-3-pro',
    label: 'Gemini 3 Pro',
    contextWindow: 2000000,
    maxOutput: 65536,
    inputCostPerMTok: 3.5,
    outputCostPerMTok: 14,
  },
  {
    id: 'gemini-3-flash',
    label: 'Gemini 3 Flash',
    contextWindow: 1000000,
    maxOutput: 65536,
    inputCostPerMTok: 0.3,
    outputCostPerMTok: 1.2,
  },
];

function toGeminiContents(messages) {
  return (messages || []).map((m) => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }],
  }));
}

function buildBody(req) {
  const body = { contents: toGeminiContents(req.messages) };
  if (req.system) body.systemInstruction = { parts: [{ text: req.system }] };

  const generationConfig = {};
  if (typeof req.maxTokens === 'number') generationConfig.maxOutputTokens = req.maxTokens;
  if (typeof req.temperature === 'number') generationConfig.temperature = req.temperature;
  if (typeof req.topP === 'number') generationConfig.topP = req.topP;
  if (req.stopSequences?.length) generationConfig.stopSequences = req.stopSequences;
  if (req.jsonSchema) {
    generationConfig.responseMimeType = 'application/json';
    generationConfig.responseSchema = req.jsonSchema;
  }
  if (Object.keys(generationConfig).length) body.generationConfig = generationConfig;
  return body;
}

function extractText(candidate) {
  return (candidate?.content?.parts || []).map((p) => p.text || '').join('');
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export const googleProvider = {
  id: 'google',
  label: 'Google Gemini / Vertex AI',
  models,
  requiredCredentials: [
    {
      key: 'mode',
      label: 'Mode',
      kind: 'text',
      placeholder: 'gemini | vertex',
      help: "'gemini' uses an API key against generativelanguage.googleapis.com. 'vertex' uses a GCP project/location + OAuth bearer token.",
    },
    {
      key: 'apiKey',
      label: 'API key (Gemini mode)',
      kind: 'secret',
      placeholder: 'AIza...',
      help: 'From aistudio.google.com. Only used in gemini mode.',
    },
    {
      key: 'accessToken',
      label: 'OAuth access token (Vertex mode)',
      kind: 'secret',
      placeholder: 'ya29...',
      help: 'Short-lived OAuth2 bearer token for a principal with Vertex AI access. You are responsible for refreshing it — this app does not run a token-refresh flow.',
    },
    {
      key: 'project',
      label: 'GCP project id (Vertex mode)',
      kind: 'text',
      placeholder: 'my-gcp-project',
      help: 'Only used in vertex mode.',
    },
    {
      key: 'location',
      label: 'GCP location (Vertex mode)',
      kind: 'text',
      placeholder: 'us-central1',
      help: 'Only used in vertex mode.',
    },
  ],
  validateCredentials(creds) {
    const errors = [];
    const mode = creds?.mode || 'gemini';
    if (mode === 'vertex') {
      if (!creds?.accessToken) errors.push('accessToken is required for vertex mode');
      if (!creds?.project) errors.push('project is required for vertex mode');
      if (!creds?.location) errors.push('location is required for vertex mode');
    } else if (mode === 'gemini') {
      if (!creds?.apiKey) errors.push('apiKey is required for gemini mode');
    } else {
      errors.push("mode must be 'gemini' or 'vertex'");
    }
    return { ok: errors.length === 0, errors };
  },
  estimateTokens,

  async send(req, creds = {}, { signal, onDelta } = {}) {
    const mode = creds.mode || 'gemini';
    const modelId = req.model || models[0].id;
    const streaming = !!(req.stream && onDelta);
    const method = streaming ? 'streamGenerateContent' : 'generateContent';

    let url;
    const headers = { 'content-type': 'application/json' };

    if (mode === 'vertex') {
      const base = creds.baseUrl || `https://${creds.location}-aiplatform.googleapis.com`;
      url = `${base}/v1/projects/${encodeURIComponent(creds.project)}/locations/${encodeURIComponent(
        creds.location,
      )}/publishers/google/models/${encodeURIComponent(modelId)}:${method}`;
      headers.authorization = `Bearer ${creds.accessToken}`;
    } else {
      const base = (creds.baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
      url = `${base}/v1beta/models/${encodeURIComponent(modelId)}:${method}?key=${encodeURIComponent(creds.apiKey)}`;
    }
    if (streaming) url += (url.includes('?') ? '&' : '?') + 'alt=sse';

    const body = buildBody(req);

    return withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(url, { method: 'POST', headers, body: JSON.stringify(body), signal });
        await throwIfError(response);

        if (streaming) {
          let text = '';
          const usage = { inputTokens: 0, outputTokens: 0 };
          let stopReason = null;

          for await (const payload of iterateSSE(response)) {
            let evt;
            try {
              evt = JSON.parse(payload);
            } catch {
              continue;
            }
            const cand = evt.candidates?.[0];
            const delta = extractText(cand);
            if (delta) {
              text += delta;
              onDelta({ delta, text });
            }
            if (cand?.finishReason) stopReason = cand.finishReason;
            if (evt.usageMetadata) {
              usage.inputTokens = evt.usageMetadata.promptTokenCount ?? usage.inputTokens;
              usage.outputTokens = evt.usageMetadata.candidatesTokenCount ?? usage.outputTokens;
            }
          }

          return { text, jsonValue: tryParseJson(text), usage, model: modelId, stopReason, raw: { streamed: true } };
        }

        const data = await response.json();
        const cand = data.candidates?.[0];
        const text = extractText(cand);

        return {
          text,
          jsonValue: tryParseJson(text),
          usage: {
            inputTokens: data.usageMetadata?.promptTokenCount ?? 0,
            outputTokens: data.usageMetadata?.candidatesTokenCount ?? 0,
            cachedInputTokens: data.usageMetadata?.cachedContentTokenCount,
          },
          model: modelId,
          stopReason: cand?.finishReason ?? null,
          raw: data,
        };
      },
      { signal },
    );
  },
};

export default googleProvider;
