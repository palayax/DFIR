// web/assets/js/providers/opencode.js
//
// "OpenCode" as an LLM provider — RUN_PLAN.md assumption A8.
//
// There is no single official hosted OpenCode LLM endpoint we can hardcode
// (unlike Anthropic/OpenAI/Bedrock/Gemini, which have one canonical API
// host). We do NOT invent one. Instead this is a generic OpenAI-compatible
// adapter with a REQUIRED user-supplied base URL and a free-text model id —
// the user points it at whatever OpenAI-compatible gateway their OpenCode
// deployment exposes. This is made explicit in the credential `help` text
// per the task brief.

import { createOpenAiCompatibleProvider } from './openai.js';

// No fixed catalogue — the model id is free text supplied by the user via
// the `model` credential field (see requiredCredentials below), since we
// cannot know what an arbitrary self-hosted OpenCode gateway calls its models.
export const models = [];

export const openCodeProvider = createOpenAiCompatibleProvider({
  id: 'opencode',
  label: 'OpenCode (OpenAI-compatible, user-supplied endpoint)',
  models,
  requiredCredentials: [
    {
      key: 'baseUrl',
      label: 'Base URL (required)',
      kind: 'text',
      placeholder: 'https://your-opencode-gateway.example.com',
      help:
        'REQUIRED — OpenCode has no single official hosted endpoint we assume for you ' +
        '(see RUN_PLAN.md assumption A8). Enter the OpenAI-compatible base URL your own ' +
        'OpenCode deployment/gateway exposes.',
    },
    {
      key: 'apiKey',
      label: 'API key',
      kind: 'secret',
      placeholder: '...',
      help: 'Whatever key/token your OpenCode gateway expects as a Bearer token.',
    },
    {
      key: 'model',
      label: 'Model id (free text)',
      kind: 'text',
      placeholder: 'e.g. gpt-4o, llama3.1, qwen2.5-coder ...',
      help: 'Enter exactly the model id your OpenCode gateway expects — there is no fixed catalogue here.',
    },
  ],
  requiredKeys: ['apiKey', 'baseUrl'],
  getBaseUrl: (creds) => creds.baseUrl,
  getModelId: (req, creds) => req.model || creds.model,
});

export default openCodeProvider;
