// web/assets/js/providers/bedrock.js
//
// AWS Bedrock InvokeModel, for Claude models, using the Anthropic Messages
// body shape (per Bedrock's Anthropic integration) and signed from scratch
// with AWS SigV4 (providers/lib/sigv4.js — crypto.subtle, no aws-sdk).
//
// Deviation: streaming is NOT implemented for Bedrock in this pass.
// Bedrock's streaming variant is a different endpoint
// (invoke-with-response-stream) that returns an AWS-specific binary
// "event-stream" envelope (vnd.amazon.eventstream), not plain SSE — wiring
// that up correctly needs its own frame parser and was out of scope for this
// subtask. `send()` always returns a complete (non-streamed) response;
// `onDelta` is accepted but ignored, and the returned response should still
// be correctly usage/normalized, per the interface's `stream?` being
// optional. Flagged as a gap for a follow-up subtask.

import { signRequest } from './lib/sigv4.js';
import { withRetry } from './lib/retry.js';
import { fetchWithNetworkErrors, throwIfError } from './lib/http.js';
import { estimateTokens } from './lib/tokens.js';

export const BEDROCK_ANTHROPIC_VERSION = 'bedrock-2023-05-31';

export const models = [
  {
    id: 'us.anthropic.claude-opus-5-5-v1:0',
    label: 'Claude Opus 5.5 (Bedrock)',
    contextWindow: 500000,
    maxOutput: 64000,
    inputCostPerMTok: 15,
    outputCostPerMTok: 75,
  },
  {
    id: 'us.anthropic.claude-sonnet-5-v1:0',
    label: 'Claude Sonnet 5 (Bedrock)',
    contextWindow: 300000,
    maxOutput: 64000,
    inputCostPerMTok: 3,
    outputCostPerMTok: 15,
  },
];

function toAnthropicMessages(messages) {
  return (messages || []).map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }));
}

export function buildInvokeBody(req) {
  const body = {
    anthropic_version: BEDROCK_ANTHROPIC_VERSION,
    max_tokens: req.maxTokens ?? 4096,
    messages: toAnthropicMessages(req.messages),
  };
  if (req.system) body.system = req.system;
  if (typeof req.temperature === 'number') body.temperature = req.temperature;
  if (typeof req.topP === 'number') body.top_p = req.topP;
  if (req.stopSequences?.length) body.stop_sequences = req.stopSequences;
  return body;
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
}

export const bedrockProvider = {
  id: 'bedrock',
  label: 'AWS Bedrock (Claude)',
  models,
  requiredCredentials: [
    { key: 'accessKeyId', label: 'Access key ID', kind: 'secret', placeholder: 'AKIA...', help: 'IAM identity with bedrock:InvokeModel.' },
    { key: 'secretAccessKey', label: 'Secret access key', kind: 'secret', placeholder: '...', help: 'Paired with the access key ID.' },
    {
      key: 'sessionToken',
      label: 'Session token (optional)',
      kind: 'secret',
      placeholder: '...',
      help: 'Only needed for temporary/STS credentials.',
    },
    { key: 'region', label: 'Region', kind: 'text', placeholder: 'us-east-1', help: 'AWS region hosting your Bedrock model access.' },
  ],
  validateCredentials(creds) {
    const errors = [];
    if (!creds?.accessKeyId) errors.push('accessKeyId is required');
    if (!creds?.secretAccessKey) errors.push('secretAccessKey is required');
    if (!creds?.region) errors.push('region is required');
    return { ok: errors.length === 0, errors };
  },
  estimateTokens,

  async send(req, creds = {}, { signal } = {}) {
    const modelId = req.model || models[0].id;
    const region = creds.region;
    const host = `bedrock-runtime.${region}.amazonaws.com`;
    const url = `https://${host}/model/${encodeURIComponent(modelId)}/invoke`;
    const body = JSON.stringify(buildInvokeBody(req));

    return withRetry(
      async () => {
        const signed = await signRequest({
          method: 'POST',
          url,
          region,
          service: 'bedrock',
          accessKeyId: creds.accessKeyId,
          secretAccessKey: creds.secretAccessKey,
          sessionToken: creds.sessionToken,
          headers: { 'content-type': 'application/json' },
          body,
        });

        const response = await fetchWithNetworkErrors(url, { method: 'POST', headers: signed.headers, body, signal });
        await throwIfError(response);
        const data = await response.json();
        const text = (data.content || [])
          .filter((b) => b.type === 'text')
          .map((b) => b.text)
          .join('');

        return {
          text,
          jsonValue: tryParseJson(text),
          usage: { inputTokens: data.usage?.input_tokens ?? 0, outputTokens: data.usage?.output_tokens ?? 0 },
          model: modelId,
          stopReason: data.stop_reason ?? null,
          raw: data,
        };
      },
      { signal },
    );
  },
};

export default bedrockProvider;
