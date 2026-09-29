// web/tests/providers.test.mjs
//
// Fake-fetch tests for every LLM provider adapter in
// web/assets/js/providers/*.js: exact URL, method, required headers, body
// shape, system-prompt placement, response normalization, error mapping,
// streaming delta assembly, abort, retry/backoff, and token/cost estimation.
//
// No real network calls are made anywhere in this file — `globalThis.fetch`
// is replaced with a scripted fake for the duration of each test and restored
// afterwards.

import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

import anthropicProvider, { defaultModelId as anthropicDefaultModelId } from '../assets/js/providers/anthropic.js';
import openAiProvider from '../assets/js/providers/openai.js';
import azureOpenAiProvider, { DEFAULT_API_VERSION } from '../assets/js/providers/azure-openai.js';
import bedrockProvider from '../assets/js/providers/bedrock.js';
import googleProvider from '../assets/js/providers/google.js';
import openRouterProvider from '../assets/js/providers/openrouter.js';
import openCodeProvider from '../assets/js/providers/opencode.js';
import { createMockProvider } from '../assets/js/providers/mock.js';
import { estimateTokens, estimateCost } from '../assets/js/providers/lib/tokens.js';
import { withRetry, ProviderError } from '../assets/js/providers/lib/retry.js';

// ---------------------------------------------------------------------------
// Fake fetch harness
// ---------------------------------------------------------------------------

let originalFetch;
let calls;
let queue;

beforeEach(() => {
  originalFetch = globalThis.fetch;
  calls = [];
  queue = [];
  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init: init || {} });
    if (queue.length === 0) throw new Error(`fake fetch: no queued response for ${url}`);
    const next = queue.shift();
    if (typeof next === 'function') return next();
    return next;
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function jsonResponse(body, { status = 200, headers = {} } = {}) {
  return new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });
}

function textResponse(body, { status = 200, headers = {} } = {}) {
  return new Response(body, { status, headers });
}

function sseResponse(events) {
  const stream = new ReadableStream({
    start(controller) {
      for (const evt of events) {
        controller.enqueue(new TextEncoder().encode(`data: ${evt}\n\n`));
      }
      controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { 'content-type': 'text/event-stream' } });
}

function headerLower(init, name) {
  const h = init.headers || {};
  if (h instanceof Headers) return h.get(name);
  const found = Object.keys(h).find((k) => k.toLowerCase() === name.toLowerCase());
  return found ? h[found] : undefined;
}

function parseBody(init) {
  return JSON.parse(init.body);
}

// ---------------------------------------------------------------------------
// Anthropic
// ---------------------------------------------------------------------------

describe('anthropic provider', () => {
  test('exact URL, method, headers, body shape; system is top-level not a message', async () => {
    queue.push(
      jsonResponse({
        id: 'msg_1',
        model: 'claude-opus-5-5',
        content: [{ type: 'text', text: 'hello there' }],
        stop_reason: 'end_turn',
        usage: { input_tokens: 10, output_tokens: 3 },
      }),
    );

    const result = await anthropicProvider.send(
      { system: 'You are terse.', messages: [{ role: 'user', content: 'hi' }], maxTokens: 256 },
      { apiKey: 'sk-ant-test' },
    );

    assert.equal(calls.length, 1);
    const { url, init } = calls[0];
    assert.equal(url, 'https://api.anthropic.com/v1/messages');
    assert.equal(init.method, 'POST');
    assert.equal(headerLower(init, 'x-api-key'), 'sk-ant-test');
    assert.equal(headerLower(init, 'anthropic-version'), '2023-06-01');
    assert.equal(headerLower(init, 'anthropic-dangerous-direct-browser-access'), 'true');
    assert.equal(headerLower(init, 'content-type'), 'application/json');

    const body = parseBody(init);
    assert.equal(body.system, 'You are terse.');
    assert.equal(body.model, anthropicDefaultModelId);
    assert.equal(body.max_tokens, 256);
    assert.deepEqual(body.messages, [{ role: 'user', content: 'hi' }]);
    assert.ok(
      !body.messages.some((m) => m.role === 'system'),
      'system must never appear inside the messages array',
    );

    assert.equal(result.text, 'hello there');
    assert.equal(result.usage.inputTokens, 10);
    assert.equal(result.usage.outputTokens, 3);
    assert.equal(result.stopReason, 'end_turn');
    assert.equal(result.model, 'claude-opus-5-5');
  });

  test('default model for the whole app is claude-opus-5-5', () => {
    assert.equal(anthropicDefaultModelId, 'claude-opus-5-5');
    assert.equal(anthropicProvider.models[0].id, 'claude-opus-5-5');
    assert.equal(anthropicProvider.models[0].label, 'Claude Opus 5.5');
  });

  test('required model catalogue is present', () => {
    const ids = anthropicProvider.models.map((m) => m.id);
    assert.deepEqual(ids, ['claude-opus-5-5', 'claude-sonnet-5', 'claude-haiku-4-5-20251001', 'claude-fable-5-1']);
  });

  test('401 maps to a non-retryable auth error', async () => {
    queue.push(jsonResponse({ error: { message: 'invalid x-api-key' } }, { status: 401 }));

    await assert.rejects(
      () => anthropicProvider.send({ messages: [{ role: 'user', content: 'hi' }] }, { apiKey: 'bad' }),
      (err) => {
        assert.equal(err.status, 401);
        assert.equal(err.retryable, false);
        assert.equal(err.kind, 'auth');
        return true;
      },
    );
    assert.equal(calls.length, 1, '401 must not be retried');
  });

  test('429 is retried and honors Retry-After, then succeeds', async () => {
    queue.push(jsonResponse({ error: { message: 'rate limited' } }, { status: 429, headers: { 'retry-after': '0' } }));
    queue.push(
      jsonResponse({
        model: 'claude-opus-5-5',
        content: [{ type: 'text', text: 'ok now' }],
        stop_reason: 'end_turn',
        usage: { input_tokens: 1, output_tokens: 1 },
      }),
    );

    const result = await anthropicProvider.send({ messages: [{ role: 'user', content: 'hi' }] }, { apiKey: 'k' });
    assert.equal(calls.length, 2);
    assert.equal(result.text, 'ok now');
  });

  test('streaming assembles content_block_delta events and reports stop_reason/usage', async () => {
    queue.push(
      sseResponse([
        JSON.stringify({ type: 'message_start', message: { model: 'claude-opus-5-5', usage: { input_tokens: 5 } } }),
        JSON.stringify({ type: 'content_block_delta', delta: { type: 'text_delta', text: 'Hel' } }),
        JSON.stringify({ type: 'content_block_delta', delta: { type: 'text_delta', text: 'lo' } }),
        JSON.stringify({ type: 'message_delta', delta: { stop_reason: 'end_turn' }, usage: { output_tokens: 2 } }),
      ]),
    );

    const deltas = [];
    const result = await anthropicProvider.send(
      { messages: [{ role: 'user', content: 'hi' }], stream: true },
      { apiKey: 'k' },
      { onDelta: (d) => deltas.push(d.delta) },
    );

    assert.deepEqual(deltas, ['Hel', 'lo']);
    assert.equal(result.text, 'Hello');
    assert.equal(result.stopReason, 'end_turn');
    assert.equal(result.usage.inputTokens, 5);
    assert.equal(result.usage.outputTokens, 2);
  });

  test('abort propagates AbortError and does not retry', async () => {
    const controller = new AbortController();
    queue.push(() => {
      controller.abort();
      const e = new Error('aborted');
      e.name = 'AbortError';
      throw e;
    });

    await assert.rejects(
      () => anthropicProvider.send({ messages: [{ role: 'user', content: 'hi' }] }, { apiKey: 'k' }, { signal: controller.signal }),
      { name: 'AbortError' },
    );
    assert.equal(calls.length, 1);
  });
});

// ---------------------------------------------------------------------------
// OpenAI
// ---------------------------------------------------------------------------

describe('openai provider', () => {
  test('Chat Completions URL, Bearer auth, system message injected, json_schema response_format', async () => {
    queue.push(
      jsonResponse({
        model: 'gpt-5.1',
        choices: [{ message: { content: '{"ok":true}' }, finish_reason: 'stop' }],
        usage: { prompt_tokens: 20, completion_tokens: 4 },
      }),
    );

    const result = await openAiProvider.send(
      {
        system: 'Be concise.',
        messages: [{ role: 'user', content: 'ping' }],
        jsonSchema: { type: 'object', properties: { ok: { type: 'boolean' } } },
      },
      { apiKey: 'sk-test' },
    );

    const { url, init } = calls[0];
    assert.equal(url, 'https://api.openai.com/v1/chat/completions');
    assert.equal(headerLower(init, 'authorization'), 'Bearer sk-test');

    const body = parseBody(init);
    assert.deepEqual(body.messages[0], { role: 'system', content: 'Be concise.' });
    assert.deepEqual(body.messages[1], { role: 'user', content: 'ping' });
    assert.equal(body.response_format.type, 'json_schema');
    assert.equal(body.response_format.json_schema.strict, true);

    assert.equal(result.text, '{"ok":true}');
    assert.deepEqual(result.jsonValue, { ok: true });
    assert.equal(result.usage.inputTokens, 20);
    assert.equal(result.usage.outputTokens, 4);
    assert.equal(result.stopReason, 'stop');
  });

  test('configurable baseUrl overrides the default host', async () => {
    queue.push(jsonResponse({ choices: [{ message: { content: 'x' } }], usage: {} }));
    await openAiProvider.send({ messages: [{ role: 'user', content: 'hi' }] }, { apiKey: 'k', baseUrl: 'https://my-proxy.example.com' });
    assert.equal(calls[0].url, 'https://my-proxy.example.com/v1/chat/completions');
  });

  test('429 is retryable, 401 is not', async () => {
    queue.push(jsonResponse({}, { status: 429 }));
    queue.push(jsonResponse({ choices: [{ message: { content: 'ok' } }], usage: {} }));
    const ok = await openAiProvider.send({ messages: [{ role: 'user', content: 'hi' }] }, { apiKey: 'k' });
    assert.equal(ok.text, 'ok');
    assert.equal(calls.length, 2);

    calls.length = 0;
    queue.push(jsonResponse({}, { status: 401 }));
    await assert.rejects(() => openAiProvider.send({ messages: [{ role: 'user', content: 'hi' }] }, { apiKey: 'bad' }), (err) => {
      assert.equal(err.retryable, false);
      return true;
    });
    assert.equal(calls.length, 1);
  });

  test('SSE streaming assembles choices[0].delta.content', async () => {
    queue.push(
      sseResponse([
        JSON.stringify({ choices: [{ delta: { content: 'Hi ' } }] }),
        JSON.stringify({ choices: [{ delta: { content: 'there' }, finish_reason: 'stop' }] }),
      ]),
    );
    const deltas = [];
    const result = await openAiProvider.send(
      { messages: [{ role: 'user', content: 'hi' }], stream: true },
      { apiKey: 'k' },
      { onDelta: (d) => deltas.push(d.delta) },
    );
    assert.deepEqual(deltas, ['Hi ', 'there']);
    assert.equal(result.text, 'Hi there');
    assert.equal(result.stopReason, 'stop');
  });
});

// ---------------------------------------------------------------------------
// Azure OpenAI
// ---------------------------------------------------------------------------

describe('azure-openai provider', () => {
  test('deployment-scoped URL, api-key header, model omitted from body', async () => {
    queue.push(
      jsonResponse({
        choices: [{ message: { content: 'azure ok' }, finish_reason: 'stop' }],
        usage: { prompt_tokens: 8, completion_tokens: 2 },
      }),
    );

    const result = await azureOpenAiProvider.send(
      { messages: [{ role: 'user', content: 'hi' }] },
      { apiKey: 'azkey', endpoint: 'https://my-resource.openai.azure.com', deployment: 'gpt-5-1-deployment' },
    );

    const { url, init } = calls[0];
    assert.equal(
      url,
      `https://my-resource.openai.azure.com/openai/deployments/gpt-5-1-deployment/chat/completions?api-version=${DEFAULT_API_VERSION}`,
    );
    assert.equal(headerLower(init, 'api-key'), 'azkey');
    assert.equal(headerLower(init, 'authorization'), undefined);

    const body = parseBody(init);
    assert.equal(body.model, undefined, 'Azure selects the model via the deployment, not a body field');
    assert.equal(result.text, 'azure ok');
    assert.equal(result.model, 'gpt-5-1-deployment');
  });

  test('validateCredentials requires endpoint, deployment, apiKey', () => {
    const res = azureOpenAiProvider.validateCredentials({});
    assert.equal(res.ok, false);
    assert.ok(res.errors.some((e) => e.includes('apiKey')));
    assert.ok(res.errors.some((e) => e.includes('endpoint')));
    assert.ok(res.errors.some((e) => e.includes('deployment')));
  });
});

// ---------------------------------------------------------------------------
// Bedrock
// ---------------------------------------------------------------------------

describe('bedrock provider', () => {
  test('signs the InvokeModel POST with SigV4 and uses the Anthropic Messages body shape', async () => {
    queue.push(
      jsonResponse({
        content: [{ type: 'text', text: 'bedrock says hi' }],
        stop_reason: 'end_turn',
        usage: { input_tokens: 7, output_tokens: 2 },
      }),
    );

    const modelId = bedrockProvider.models[0].id;
    const result = await bedrockProvider.send(
      { system: 'sys', messages: [{ role: 'user', content: 'hi' }], maxTokens: 111 },
      { accessKeyId: 'AKIDEXAMPLE', secretAccessKey: 'secret', region: 'us-east-1' },
    );

    const { url, init } = calls[0];
    assert.equal(url, `https://bedrock-runtime.us-east-1.amazonaws.com/model/${encodeURIComponent(modelId)}/invoke`);
    assert.equal(init.method, 'POST');

    const auth = headerLower(init, 'Authorization');
    assert.ok(auth.startsWith('AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/'), 'Authorization header must be a SigV4 header');
    assert.ok(headerLower(init, 'X-Amz-Date'), 'X-Amz-Date header must be present');

    const body = parseBody(init);
    assert.equal(body.anthropic_version, 'bedrock-2023-05-31');
    assert.equal(body.system, 'sys');
    assert.equal(body.max_tokens, 111);
    assert.deepEqual(body.messages, [{ role: 'user', content: 'hi' }]);

    assert.equal(result.text, 'bedrock says hi');
    assert.equal(result.usage.inputTokens, 7);
    assert.equal(result.usage.outputTokens, 2);
  });

  test('session token adds X-Amz-Security-Token to the signed request', async () => {
    queue.push(jsonResponse({ content: [{ type: 'text', text: 'x' }], usage: {} }));
    await bedrockProvider.send(
      { messages: [{ role: 'user', content: 'hi' }] },
      { accessKeyId: 'AKID', secretAccessKey: 'secret', sessionToken: 'tok123', region: 'us-east-1' },
    );
    assert.equal(headerLower(calls[0].init, 'X-Amz-Security-Token'), 'tok123');
  });
});

// ---------------------------------------------------------------------------
// Google (Gemini)
// ---------------------------------------------------------------------------

describe('google provider (gemini mode)', () => {
  test('system -> systemInstruction, messages -> contents with model role, usageMetadata mapped', async () => {
    queue.push(
      jsonResponse({
        candidates: [{ content: { parts: [{ text: 'gemini reply' }] }, finishReason: 'STOP' }],
        usageMetadata: { promptTokenCount: 12, candidatesTokenCount: 5 },
      }),
    );

    const result = await googleProvider.send(
      { system: 'be brief', messages: [{ role: 'user', content: 'hi' }, { role: 'assistant', content: 'prior' }] },
      { apiKey: 'AIza-test' },
    );

    const { url, init } = calls[0];
    assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro:generateContent?key=AIza-test');
    const body = parseBody(init);
    assert.deepEqual(body.systemInstruction, { parts: [{ text: 'be brief' }] });
    assert.deepEqual(body.contents, [
      { role: 'user', parts: [{ text: 'hi' }] },
      { role: 'model', parts: [{ text: 'prior' }] },
    ]);

    assert.equal(result.text, 'gemini reply');
    assert.equal(result.usage.inputTokens, 12);
    assert.equal(result.usage.outputTokens, 5);
    assert.equal(result.stopReason, 'STOP');
  });

  test('streaming (alt=sse) assembles candidate text deltas', async () => {
    queue.push(
      sseResponse([
        JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Hi ' }] } }] }),
        JSON.stringify({ candidates: [{ content: { parts: [{ text: 'there' }] }, finishReason: 'STOP' }], usageMetadata: { promptTokenCount: 1, candidatesTokenCount: 1 } }),
      ]),
    );
    const deltas = [];
    const result = await googleProvider.send(
      { messages: [{ role: 'user', content: 'hi' }], stream: true },
      { apiKey: 'k' },
      { onDelta: (d) => deltas.push(d.delta) },
    );
    assert.deepEqual(deltas, ['Hi ', 'there']);
    assert.equal(result.text, 'Hi there');
    assert.equal(result.stopReason, 'STOP');
    assert.ok(calls[0].url.includes('alt=sse'));
  });

  test('vertex mode uses OAuth bearer and project/location URL', async () => {
    queue.push(jsonResponse({ candidates: [{ content: { parts: [{ text: 'vertex ok' }] } }], usageMetadata: {} }));
    await googleProvider.send(
      { messages: [{ role: 'user', content: 'hi' }] },
      { mode: 'vertex', accessToken: 'ya29.tok', project: 'proj-1', location: 'us-central1' },
    );
    const { url, init } = calls[0];
    assert.ok(url.includes('/projects/proj-1/locations/us-central1/publishers/google/models/'));
    assert.equal(headerLower(init, 'authorization'), 'Bearer ya29.tok');
  });
});

// ---------------------------------------------------------------------------
// OpenRouter
// ---------------------------------------------------------------------------

describe('openrouter provider', () => {
  test('OpenAI-compatible URL plus HTTP-Referer/X-Title headers', async () => {
    queue.push(jsonResponse({ choices: [{ message: { content: 'or ok' } }], usage: {} }));
    await openRouterProvider.send(
      { messages: [{ role: 'user', content: 'hi' }] },
      { apiKey: 'sk-or-1', referer: 'https://example.org', appTitle: 'IR Suite' },
    );
    const { url, init } = calls[0];
    assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions');
    assert.equal(headerLower(init, 'HTTP-Referer'), 'https://example.org');
    assert.equal(headerLower(init, 'X-Title'), 'IR Suite');
    assert.equal(headerLower(init, 'authorization'), 'Bearer sk-or-1');
  });

  test('includes an Anthropic model in its catalogue', () => {
    assert.ok(openRouterProvider.models.some((m) => m.id.startsWith('anthropic/')));
  });
});

// ---------------------------------------------------------------------------
// OpenCode
// ---------------------------------------------------------------------------

describe('opencode provider', () => {
  test('requires a user-supplied baseUrl (no invented official endpoint)', () => {
    const res = openCodeProvider.validateCredentials({ apiKey: 'k' });
    assert.equal(res.ok, false);
    assert.ok(res.errors.some((e) => e.includes('baseUrl')));
    assert.equal(openCodeProvider.models.length, 0, 'no fixed catalogue — model id is free text');
  });

  test('sends to the user-supplied baseUrl with the free-text model id', async () => {
    queue.push(jsonResponse({ choices: [{ message: { content: 'local llm ok' } }], usage: {} }));
    await openCodeProvider.send(
      { messages: [{ role: 'user', content: 'hi' }] },
      { baseUrl: 'https://gateway.local:8080', apiKey: 'local-key', model: 'qwen2.5-coder' },
    );
    const { url, init } = calls[0];
    assert.equal(url, 'https://gateway.local:8080/v1/chat/completions');
    const body = parseBody(init);
    assert.equal(body.model, 'qwen2.5-coder');
  });
});

// ---------------------------------------------------------------------------
// Mock provider (offline / dry-run infra used by the rest of the test suite)
// ---------------------------------------------------------------------------

describe('mock provider', () => {
  test('is deterministic for identical requests and makes no network calls', async () => {
    const mock = createMockProvider();
    const req = { messages: [{ role: 'user', content: 'same input' }] };
    const a = await mock.send(req, {});
    const b = await mock.send(req, {});
    assert.equal(a.text, b.text);
    assert.equal(calls.length, 0);
  });

  test('setBehavior can simulate 429-then-success and malformed JSON', async () => {
    const mock = createMockProvider();
    const req = { messages: [{ role: 'user', content: 'flaky' }] };
    const hash = mock.hashRequest(req);
    mock.setBehavior(hash, { failTimes: 2, retryAfterMs: 1 });

    const result = await withRetry(() => mock.send(req, {}), { baseDelayMs: 1, maxDelayMs: 5 });
    assert.equal(mock.getCallCount(hash), 3);
    assert.ok(result.text);

    const mock2 = createMockProvider();
    const req2 = { messages: [{ role: 'user', content: 'broken' }] };
    const hash2 = mock2.hashRequest(req2);
    mock2.setBehavior(hash2, { malformedJson: true });
    const broken = await mock2.send({ ...req2, jsonSchema: { type: 'object' } }, {});
    assert.equal(broken.jsonValue, undefined, 'malformed JSON must not be silently parsed');
  });
});

// ---------------------------------------------------------------------------
// Token / cost estimation
// ---------------------------------------------------------------------------

describe('token and cost estimation', () => {
  test('estimateTokens is >=1 for any non-empty text and 0 for empty', () => {
    assert.equal(estimateTokens(''), 0);
    assert.equal(estimateTokens(null), 0);
    assert.ok(estimateTokens('a') >= 1);
    assert.ok(estimateTokens('a much longer piece of English prose to estimate.') > 1);
  });

  test('estimateCost scales linearly with token counts and model rates', () => {
    const model = { inputCostPerMTok: 15, outputCostPerMTok: 75 };
    const cost = estimateCost(model, 1_000_000, 1_000_000);
    assert.equal(cost.inputCost, 15);
    assert.equal(cost.outputCost, 75);
    assert.equal(cost.totalCost, 90);
    const zero = estimateCost(undefined, 100, 100);
    assert.equal(zero.totalCost, 0);
  });
});

// ---------------------------------------------------------------------------
// Retry / backoff primitive (shared by every adapter above)
// ---------------------------------------------------------------------------

describe('withRetry', () => {
  test('retries retryable ProviderErrors up to maxAttempts, then throws', async () => {
    let attempts = 0;
    await assert.rejects(
      () =>
        withRetry(
          async () => {
            attempts += 1;
            throw new ProviderError('always fails', { status: 503, retryable: true });
          },
          { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 2 },
        ),
      { name: 'ProviderError' },
    );
    assert.equal(attempts, 3);
  });

  test('never retries a non-retryable error', async () => {
    let attempts = 0;
    await assert.rejects(
      () =>
        withRetry(async () => {
          attempts += 1;
          throw new ProviderError('bad request', { status: 400, retryable: false });
        }),
      { name: 'ProviderError' },
    );
    assert.equal(attempts, 1);
  });

  test('AbortError is not retried and propagates immediately', async () => {
    let attempts = 0;
    const controller = new AbortController();
    await assert.rejects(
      () =>
        withRetry(
          async () => {
            attempts += 1;
            const e = new Error('nope');
            e.name = 'AbortError';
            throw e;
          },
          { signal: controller.signal },
        ),
      { name: 'AbortError' },
    );
    assert.equal(attempts, 1);
  });
});
