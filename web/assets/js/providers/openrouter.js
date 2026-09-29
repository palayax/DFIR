// web/assets/js/providers/openrouter.js
//
// OpenRouter — OpenAI-compatible Chat Completions at openrouter.ai/api/v1,
// plus the HTTP-Referer / X-Title headers OpenRouter's docs ask clients to
// send for routing/attribution.

import { createOpenAiCompatibleProvider } from './openai.js';

export const DEFAULT_BASE_URL = 'https://openrouter.ai/api/v1';

export const models = [
  {
    id: 'anthropic/claude-opus-5.5',
    label: 'Anthropic: Claude Opus 5.5 (via OpenRouter)',
    contextWindow: 500000,
    maxOutput: 64000,
    inputCostPerMTok: 15,
    outputCostPerMTok: 75,
  },
  {
    id: 'openai/gpt-5.1',
    label: 'OpenAI: GPT-5.1 (via OpenRouter)',
    contextWindow: 400000,
    maxOutput: 64000,
    inputCostPerMTok: 5,
    outputCostPerMTok: 15,
  },
  {
    id: 'google/gemini-3-pro',
    label: 'Google: Gemini 3 Pro (via OpenRouter)',
    contextWindow: 1000000,
    maxOutput: 65536,
    inputCostPerMTok: 3.5,
    outputCostPerMTok: 14,
  },
  {
    id: 'meta-llama/llama-4-maverick',
    label: 'Meta: Llama 4 Maverick (via OpenRouter)',
    contextWindow: 256000,
    maxOutput: 16384,
    inputCostPerMTok: 0.3,
    outputCostPerMTok: 0.9,
  },
];

export const openRouterProvider = createOpenAiCompatibleProvider({
  id: 'openrouter',
  label: 'OpenRouter',
  models,
  requiredCredentials: [
    { key: 'apiKey', label: 'API key', kind: 'secret', placeholder: 'sk-or-...', help: 'From openrouter.ai/keys.' },
    {
      key: 'referer',
      label: 'HTTP-Referer (optional)',
      kind: 'text',
      placeholder: 'https://your-org.github.io/ir-triage',
      help: 'Sent as HTTP-Referer per OpenRouter policy; helps their routing/analytics attribution.',
    },
    {
      key: 'appTitle',
      label: 'App title (optional)',
      kind: 'text',
      placeholder: 'IR Triage Suite',
      help: 'Sent as X-Title.',
    },
  ],
  defaultBaseUrl: DEFAULT_BASE_URL,
  // DEFAULT_BASE_URL already includes the /api/v1 segment (matching
  // OpenRouter's own docs, which quote the base URL as
  // "https://openrouter.ai/api/v1"), so unlike the generic OpenAI-compatible
  // default (`${baseUrl}/v1/chat/completions`) we must NOT append another /v1
  // here or the URL doubles up to .../api/v1/v1/chat/completions.
  resolveUrl: (baseUrl) => `${baseUrl}/chat/completions`,
  extraHeaders: (creds) => {
    const headers = { 'X-Title': creds.appTitle || 'IR Triage Suite' };
    if (creds.referer) headers['HTTP-Referer'] = creds.referer;
    return headers;
  },
});

export default openRouterProvider;
