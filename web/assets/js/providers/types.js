// web/assets/js/providers/types.js
//
// Shared JSDoc-only type shapes for LLM providers. No runtime code — pure
// documentation types, imported via `import('./types.js').LLMProvider` style
// JSDoc annotations elsewhere. Kept dependency-free (no TypeScript build step
// per CLAUDE.md "no build step, no bundler").

/**
 * @typedef {Object} LLMMessage
 * @property {'user'|'assistant'} role
 * @property {string} content
 */

/**
 * @typedef {Object} LLMRequest
 * @property {string} [system] System prompt. NOT a message in the `messages`
 *   array — each adapter places it wherever its API expects (top-level
 *   `system` for Anthropic/Bedrock, a synthesized `role:'system'` message for
 *   OpenAI-compatible APIs, `systemInstruction` for Gemini).
 * @property {LLMMessage[]} messages
 * @property {number} [maxTokens]
 * @property {number} [temperature]
 * @property {number} [topP]
 * @property {string[]} [stopSequences]
 * @property {object} [jsonSchema] JSON Schema the model's final answer should conform to.
 * @property {boolean} [stream] Request incremental deltas via onDelta.
 * @property {string} [model] Model id override; defaults to the provider's first/default model.
 */

/**
 * @typedef {Object} LLMUsage
 * @property {number} inputTokens
 * @property {number} outputTokens
 * @property {number} [cachedInputTokens]
 */

/**
 * @typedef {Object} LLMResponse
 * @property {string} text Raw assistant text.
 * @property {*} [jsonValue] Parsed JSON if `text` is valid JSON (e.g. jsonSchema was requested).
 * @property {LLMUsage} usage
 * @property {string} model
 * @property {string|null} stopReason
 * @property {*} raw Provider-native response body, for debugging/audit.
 */

/**
 * @typedef {Object} LLMCredentialField
 * @property {string} key
 * @property {string} label
 * @property {'secret'|'text'} kind
 * @property {string} [placeholder]
 * @property {string} [help]
 */

/**
 * @typedef {Object} LLMModel
 * @property {string} id
 * @property {string} label
 * @property {number} contextWindow
 * @property {number} maxOutput
 * @property {number} inputCostPerMTok USD per 1,000,000 input tokens.
 * @property {number} outputCostPerMTok USD per 1,000,000 output tokens.
 */

/**
 * @typedef {Object} LLMProvider
 * @property {string} id
 * @property {string} label
 * @property {LLMModel[]} models
 * @property {LLMCredentialField[]} requiredCredentials
 * @property {(creds: Record<string,string>) => {ok: boolean, errors: string[]}} validateCredentials
 * @property {(req: LLMRequest, creds: Record<string,string>, opts?: {signal?: AbortSignal, onDelta?: (d: {delta: string, text: string}) => void}) => Promise<LLMResponse>} send
 * @property {(text: string) => number} estimateTokens
 */

/**
 * @typedef {Object} StorageCredentialField
 * @property {string} key
 * @property {string} label
 * @property {'secret'|'text'} kind
 * @property {string} [placeholder]
 * @property {string} [help]
 */

/**
 * Note on credentials: unlike LLMProvider.send (which takes `creds` as its
 * own positional argument), every StorageProvider method takes credentials
 * as a field on its trailing `opts` object (`opts.creds`). This keeps the
 * primary call shape matching the brief's `put(path, blob, opts)` /
 * `get(path)` / `list(prefix)` / `delete(path)` / `presignedUrl(path, ttl)`
 * signatures (credentials are optional-looking in that summary because most
 * calls only need to vary path/blob/ttl — `local` needs no credentials at
 * all) while still letting every adapter that DOES need credentials
 * (s3/azure-blob/gcs) receive them per call, the same way the credential
 * store hands them to LLM adapters, rather than baking a single account into
 * a provider singleton.
 *
 * @typedef {Object} StorageOpts
 * @property {Record<string,string>} [creds]
 * @property {string} [contentType]
 * @property {(p: {loaded: number, total: number}) => void} [onProgress]
 * @property {AbortSignal} [signal]
 */

/**
 * @typedef {Object} StorageProvider
 * @property {string} id
 * @property {string} label
 * @property {StorageCredentialField[]} requiredCredentials
 * @property {(creds: Record<string,string>) => {ok: boolean, errors: string[]}} validateCredentials
 * @property {(path: string, blob: Blob|Uint8Array, opts?: StorageOpts) => Promise<{path: string, url?: string|null}>} put
 * @property {(path: string, opts?: StorageOpts) => Promise<{data: Uint8Array, contentType?: string}>} get
 * @property {(prefix: string, opts?: StorageOpts) => Promise<Array<{key: string, size?: number, lastModified?: string}>>} list
 * @property {(path: string, opts?: StorageOpts) => Promise<void>} delete
 * @property {((path: string, ttl: number, opts?: StorageOpts) => Promise<string>)} [presignedUrl]
 */

export {};
