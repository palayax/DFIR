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

// mockProvider is LAST but it IS registered. It was previously exported from
// this module without appearing in this array, which meant the Settings view --
// which builds its dropdown from `providers` -- never offered it. Both
// docs/WEB_APP.md and the published README tell an operator to use the mock
// provider for a zero-cost dry run of a new engagement's config before spending
// real tokens, and that advice was impossible to follow through the UI. It is
// also the only provider that can be exercised end-to-end with no credentials
// and no network, which makes it the one an air-gapped analyst needs most.
export const providers = [
  anthropicProvider,
  openAiProvider,
  azureOpenAiProvider,
  bedrockProvider,
  googleProvider,
  openRouterProvider,
  openCodeProvider,
  mockProvider,
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
