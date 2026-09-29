// web/assets/js/providers/lib/retry.js
//
// Retry with exponential backoff + full jitter, shared by every LLM/storage
// provider adapter. No SDKs — plain fetch + AbortSignal.
//
// Retry policy:
//   - 429, 500, 502, 503, 504  -> retryable
//   - network errors (fetch throws)    -> retryable
//   - 400, 401, 403                    -> NEVER retried (client/auth errors)
//   - anything else non-2xx            -> not retried unless explicitly flagged

/** Error type thrown by provider adapters for HTTP/network failures. */
export class ProviderError extends Error {
  /**
   * @param {string} message
   * @param {{status?: number, retryable?: boolean, cause?: unknown}} [opts]
   */
  constructor(message, opts = {}) {
    super(message);
    this.name = 'ProviderError';
    this.status = opts.status;
    this.retryable = !!opts.retryable;
    if (opts.cause !== undefined) this.cause = opts.cause;
  }
}

const RETRYABLE_STATUSES = new Set([429, 500, 502, 503, 504]);
const NON_RETRYABLE_STATUSES = new Set([400, 401, 403]);

export function isRetryableStatus(status) {
  return RETRYABLE_STATUSES.has(status);
}

export function isNonRetryableStatus(status) {
  return NON_RETRYABLE_STATUSES.has(status);
}

/**
 * Parse a Retry-After header value (seconds, or an HTTP-date) into milliseconds.
 * @param {string|null|undefined} headerValue
 * @returns {number|undefined}
 */
export function parseRetryAfterMs(headerValue) {
  if (!headerValue) return undefined;
  const asSeconds = Number(headerValue);
  if (!Number.isNaN(asSeconds)) return Math.max(0, asSeconds * 1000);
  const asDate = Date.parse(headerValue);
  if (!Number.isNaN(asDate)) return Math.max(0, asDate - Date.now());
  return undefined;
}

function makeAbortError() {
  const e = new Error('Aborted');
  e.name = 'AbortError';
  return e;
}

function defaultSleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(makeAbortError());
      return;
    }
    const id = setTimeout(resolve, ms);
    if (signal) {
      const onAbort = () => {
        clearTimeout(id);
        reject(makeAbortError());
      };
      signal.addEventListener('abort', onAbort, { once: true });
    }
  });
}

/**
 * Run `fn` with exponential backoff + full jitter on retryable failures.
 *
 * @template T
 * @param {(ctx: {attempt: number, signal?: AbortSignal}) => Promise<T>} fn
 * @param {{
 *   maxAttempts?: number,
 *   baseDelayMs?: number,
 *   maxDelayMs?: number,
 *   signal?: AbortSignal,
 *   onRetry?: (info: {attempt: number, delay: number, error: unknown}) => void,
 *   sleep?: (ms: number, signal?: AbortSignal) => Promise<void>,
 *   random?: () => number,
 * }} [opts]
 * @returns {Promise<T>}
 */
export async function withRetry(fn, opts = {}) {
  const {
    maxAttempts = 5,
    baseDelayMs = 250,
    maxDelayMs = 8000,
    signal,
    onRetry,
    sleep = defaultSleep,
    random = Math.random,
  } = opts;

  let attempt = 0;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    attempt += 1;
    if (signal?.aborted) throw makeAbortError();

    try {
      // eslint-disable-next-line no-await-in-loop
      return await fn({ attempt, signal });
    } catch (err) {
      if (err?.name === 'AbortError' || signal?.aborted) throw err;

      const status = err?.status;
      const retryable =
        err instanceof ProviderError
          ? err.retryable
          : isRetryableStatus(status) || err?.isNetworkError === true;

      if (!retryable || attempt >= maxAttempts) throw err;

      const exponential = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1));
      const cappedByRetryAfter =
        typeof err?.retryAfterMs === 'number' && err.retryAfterMs >= 0
          ? err.retryAfterMs
          : exponential;
      // Full jitter: uniform random in [0, delay]
      const delay = random() * cappedByRetryAfter;

      if (onRetry) onRetry({ attempt, delay, error: err });
      // eslint-disable-next-line no-await-in-loop
      await sleep(delay, signal);
    }
  }
}
