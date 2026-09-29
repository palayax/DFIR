// web/assets/js/providers/azure-openai.js
//
// Azure OpenAI Chat Completions. Same request/response shape as OpenAI's
// Chat Completions API (reused via createOpenAiCompatibleProvider) but:
//   - URL is {endpoint}/openai/deployments/{deployment}/chat/completions?api-version=...
//   - Auth header is `api-key`, not `Authorization: Bearer`.
//   - The deployment name (not the base model id) selects the model, so we
//     omit `model` from the request body entirely.

import { createOpenAiCompatibleProvider } from './openai.js';

export const DEFAULT_API_VERSION = '2024-10-21';

export const models = [
  {
    id: 'gpt-5.1',
    label: 'GPT-5.1 (via your Azure deployment)',
    contextWindow: 400000,
    maxOutput: 64000,
    inputCostPerMTok: 5,
    outputCostPerMTok: 15,
  },
];

export const azureOpenAiProvider = createOpenAiCompatibleProvider({
  id: 'azure-openai',
  label: 'Azure OpenAI',
  models,
  requiredCredentials: [
    {
      key: 'endpoint',
      label: 'Resource endpoint',
      kind: 'text',
      placeholder: 'https://{resource}.openai.azure.com',
      help: 'Your Azure OpenAI resource endpoint (Azure Portal -> Keys and Endpoint).',
    },
    {
      key: 'deployment',
      label: 'Deployment name',
      kind: 'text',
      placeholder: 'gpt-5-1-deployment',
      help: 'The deployment name you created in Azure AI Studio — NOT the underlying base model id.',
    },
    {
      key: 'apiKey',
      label: 'API key',
      kind: 'secret',
      placeholder: '...',
      help: 'Key 1 or Key 2 from the Azure OpenAI resource.',
    },
    {
      key: 'apiVersion',
      label: 'API version',
      kind: 'text',
      placeholder: DEFAULT_API_VERSION,
      help: `Defaults to ${DEFAULT_API_VERSION} if left blank.`,
    },
  ],
  requiredKeys: ['apiKey', 'endpoint', 'deployment'],
  getBaseUrl: (creds) => creds.endpoint,
  resolveUrl: (baseUrl, creds) =>
    `${baseUrl}/openai/deployments/${encodeURIComponent(creds.deployment)}/chat/completions?api-version=${encodeURIComponent(
      creds.apiVersion || DEFAULT_API_VERSION,
    )}`,
  authHeaders: (creds) => ({ 'api-key': creds.apiKey }),
  omitModelInBody: true,
  getModelId: (req, creds) => req.model || creds.deployment || models[0].id,
});

export default azureOpenAiProvider;
