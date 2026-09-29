// web/assets/js/providers/index.js
//
// LLM provider registry. Adding a provider means adding one file here and
// one line below — pipeline code (web/assets/js pipeline/*) only ever talks
// to the shared LLMProvider interface (see types.js), never to a specific
// adapter, so registering a new one must not touch pipeline code.

import anthropicProvider, { defaultModelId as anthropicDefaultModelId } from './anthropic.js';
import openAiProvider from './openai.js';
import azureOpenAiProvider from './azure-openai.js';
import bedrockProvider from './bedrock.js';
import googleProvider from './google.js';
import openRouterProvider from './openrouter.js';
import openCodeProvider from './opencode.js';
import { createMockProvider, mockProvider } from './mock.js';

export const providers = [
  anthropicProvider,
  openAiProvider,
  azureOpenAiProvider,
  bedrockProvider,
  googleProvider,
  openRouterProvider,
  openCodeProvider,
];

export const providerRegistry = new Map(providers.map((p) => [p.id, p]));

/** @returns {import('./types.js').LLMProvider|null} */
export function getProvider(id) {
  return providerRegistry.get(id) || null;
}

// RUN_PLAN.md: "default Claude Opus 5.5" for the whole app.
export const defaultProviderId = 'anthropic';
export const defaultModelId = anthropicDefaultModelId;

export {
  anthropicProvider,
  openAiProvider,
  azureOpenAiProvider,
  bedrockProvider,
  googleProvider,
  openRouterProvider,
  openCodeProvider,
  createMockProvider,
  mockProvider,
};

export default providers;
