// web/assets/js/providers/lib/http.js
//
// Small shared fetch helpers used by every LLM adapter: network-error
// wrapping, HTTP error classification (auth vs. rate-limit vs. server), and
// an SSE (text/event-stream) line reader. Pure fetch/WebStreams — no deps.

import { ProviderError, parseRetryAfterMs } from './retry.js';

/** @param {Response} response */
async function readErrorBody(response) {
  try {
    return await response.text();
  } catch {
    return '';
  }
}

/**
 * Turn a non-OK fetch Response into a classified ProviderError.
 * @param {Response} response
 * @param {string} bodyText
 */
export function classifyHttpError(response, bodyText) {
  const status = response.status;
  const nonRetryable = status === 400 || status === 401 || status === 403;
  const retryable = !nonRetryable && (status === 429 || status >= 500);

  let message = `HTTP ${status}`;
  if (bodyText) message += `: ${bodyText.slice(0, 500)}`;

  const kind =
    status === 401 || status === 403
      ? 'auth'
      : status === 429
        ? 'rate_limit'
        : status >= 500
          ? 'server'
          : status === 400
            ? 'invalid_request'
            : 'http';

  const err = new ProviderError(message, { status, retryable });
  err.kind = kind;
  err.body = bodyText;

  const retryAfterHeader = response.headers?.get ? response.headers.get('retry-after') : undefined;
  const retryAfterMs = parseRetryAfterMs(retryAfterHeader);
  if (retryAfterMs != null) err.retryAfterMs = retryAfterMs;

  return err;
}

/** Throws a classified ProviderError if `response` is not OK. Otherwise no-op. */
export async function throwIfError(response) {
  if (response.ok) return;
  const bodyText = await readErrorBody(response);
  throw classifyHttpError(response, bodyText);
}

/**
 * fetch() wrapper that converts network failures (DNS, TCP, CORS-opaque, etc.)
 * into a retryable ProviderError, while still letting AbortError propagate as-is.
 */
export async function fetchWithNetworkErrors(url, init) {
  try {
    return await fetch(url, init);
  } catch (err) {
    if (err?.name === 'AbortError') throw err;
    const providerErr = new ProviderError(`Network error: ${err?.message || err}`, {
      retryable: true,
      cause: err,
    });
    providerErr.isNetworkError = true;
    throw providerErr;
  }
}

function extractDataLines(rawEvent) {
  const out = [];
  for (const line of rawEvent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed.startsWith('data:')) continue;
    const payload = trimmed.slice(5).trim();
    if (payload === '[DONE]') continue;
    if (payload.length === 0) continue;
    out.push(payload);
  }
  return out;
}

/**
 * Async-iterate the `data: ...` payloads of a text/event-stream Response body.
 * Works against a real fetch Response (ReadableStream body) or a fake test
 * Response exposing the same `.body.getReader()` shape.
 * @param {Response} response
 * @returns {AsyncGenerator<string>}
 */
export async function* iterateSSE(response) {
  const reader = response.body && typeof response.body.getReader === 'function' ? response.body.getReader() : null;

  if (!reader) {
    const text = await response.text();
    for (const line of extractDataLines(text)) yield line;
    return;
  }

  const decoder = new TextDecoder();
  let buffer = '';
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    let idx;
    while ((idx = buffer.indexOf('\n\n')) !== -1) {
      const rawEvent = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      for (const line of extractDataLines(rawEvent)) yield line;
    }
  }
  buffer += decoder.decode();
  if (buffer.trim()) {
    for (const line of extractDataLines(buffer)) yield line;
  }
}
