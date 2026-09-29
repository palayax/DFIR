// web/assets/js/providers/lib/sigv4.js
//
// AWS Signature Version 4, implemented from scratch on top of WebCrypto
// (`crypto.subtle`) only — no aws-sdk, no vendored signer. Reused by
// providers/bedrock.js (header-signed POST) and providers/storage/s3.js
// (header-signed PUT/GET/DELETE/List, and presigned URLs).
//
// Verified against the official AWS "aws-sig-v4-test-suite" vectors
// (get-vanilla / post-vanilla / get-vanilla-query-order-key) in
// web/tests/sigv4.test.mjs — see that file for the literal expected
// canonical request / string-to-sign / signature strings.
//
// Spec reference (for anyone maintaining this):
//   https://docs.aws.amazon.com/IAM/latest/UserGuide/create-signed-request.html
//
// Known simplification: canonical-URI encoding here assumes the path segments
// passed in are NOT already double-percent-encoded (we decode-then-re-encode
// each segment once). This matches every caller in this codebase (Bedrock
// model ids, S3 object keys) and matches the "single encoding" rule S3 itself
// uses; it would differ from the "double encoding" rule for other AWS
// services only if a path segment contains a literal `%` that must survive
// verbatim, which none of our adapters produce.

const encoder = new TextEncoder();

// ---------------------------------------------------------------------------
// Low-level crypto primitives (crypto.subtle only)
// ---------------------------------------------------------------------------

/** @param {string|Uint8Array} data */
function toBytes(data) {
  if (data == null) return new Uint8Array(0);
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  return encoder.encode(String(data));
}

/** SHA-256 over a string or byte array. Returns raw bytes. */
export async function sha256(data) {
  const digest = await crypto.subtle.digest('SHA-256', toBytes(data));
  return new Uint8Array(digest);
}

/** SHA-256 over a string or byte array. Returns lowercase hex. */
export async function sha256Hex(data) {
  return toHex(await sha256(data));
}

/** HMAC-SHA256(key, data) -> raw bytes. `key` is raw key bytes. */
export async function hmac(keyBytes, data) {
  const key = await crypto.subtle.importKey('raw', toBytes(keyBytes), { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
  ]);
  const sig = await crypto.subtle.sign('HMAC', key, toBytes(data));
  return new Uint8Array(sig);
}

/** @param {Uint8Array} bytes */
export function toHex(bytes) {
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += bytes[i].toString(16).padStart(2, '0');
  }
  return out;
}

// ---------------------------------------------------------------------------
// Canonicalization (AWS SigV4 §"Create a canonical request")
// ---------------------------------------------------------------------------

/** RFC 3986 percent-encoding — stricter than encodeURIComponent (also encodes ! ' ( ) *). */
export function rfc3986Encode(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
}

function safeDecode(segment) {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

/** @param {string} pathname e.g. "/a/b" (already URL-parsed, may contain %XX) */
export function canonicalUri(pathname) {
  if (!pathname) return '/';
  const segments = pathname.split('/');
  const encoded = segments.map((seg) => rfc3986Encode(safeDecode(seg)));
  const joined = encoded.join('/');
  return joined.startsWith('/') ? joined : '/' + joined;
}

/** @param {Array<[string, string]>} pairs raw (not yet percent-encoded) key/value pairs */
export function canonicalQueryFromPairs(pairs) {
  if (!pairs || pairs.length === 0) return '';
  const encoded = pairs.map(([k, v]) => [rfc3986Encode(k), rfc3986Encode(String(v ?? ''))]);
  encoded.sort((a, b) => {
    const ka = a[0] + '=' + a[1];
    const kb = b[0] + '=' + b[1];
    return ka < kb ? -1 : ka > kb ? 1 : 0;
  });
  return encoded.map(([k, v]) => `${k}=${v}`).join('&');
}

/** @param {string} search e.g. "?a=1&b=2" or "" */
export function canonicalQuery(search) {
  const qs = (search || '').startsWith('?') ? search.slice(1) : search || '';
  if (!qs) return '';
  const pairs = qs
    .split('&')
    .filter((p) => p.length > 0)
    .map((p) => {
      const eq = p.indexOf('=');
      const rawK = eq === -1 ? p : p.slice(0, eq);
      const rawV = eq === -1 ? '' : p.slice(eq + 1);
      return [safeDecode(rawK), safeDecode(rawV)];
    });
  return canonicalQueryFromPairs(pairs);
}

function hasHeader(headersObj, name) {
  return Object.keys(headersObj).some((k) => k.toLowerCase() === name);
}

/** @param {Record<string,string>} headersObj */
export function canonicalHeaders(headersObj) {
  const entries = Object.entries(headersObj).map(([k, v]) => [
    k.toLowerCase(),
    String(v).trim().replace(/\s+/g, ' '),
  ]);
  entries.sort((a, b) => (a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0));
  const canonicalHeadersStr = entries.map(([k, v]) => `${k}:${v}\n`).join('');
  const signedHeaders = entries.map(([k]) => k).join(';');
  return { canonicalHeadersStr, signedHeaders };
}

function toAmzDate(date) {
  return date.toISOString().replace(/[:-]|\.\d{3}/g, '');
}

// ---------------------------------------------------------------------------
// Signing key derivation
// ---------------------------------------------------------------------------

/** AWS4 signing-key HMAC chain: kSecret -> kDate -> kRegion -> kService -> kSigning */
export async function deriveSigningKey(secretAccessKey, dateStamp, region, service) {
  const kSecret = encoder.encode('AWS4' + secretAccessKey);
  const kDate = await hmac(kSecret, dateStamp);
  const kRegion = await hmac(kDate, region);
  const kService = await hmac(kRegion, service);
  const kSigning = await hmac(kService, 'aws4_request');
  return kSigning;
}

// ---------------------------------------------------------------------------
// Header-based signing (Authorization header) — used by Bedrock + S3 PUT/GET/DELETE/List
// ---------------------------------------------------------------------------

/**
 * @param {{
 *   method?: string,
 *   url: string,
 *   region: string,
 *   service: string,
 *   accessKeyId: string,
 *   secretAccessKey: string,
 *   sessionToken?: string,
 *   headers?: Record<string,string>,
 *   body?: string|Uint8Array|ArrayBuffer,
 *   datetime?: string,       // YYYYMMDDTHHMMSSZ, defaults to now (UTC)
 *   payloadHash?: string,    // override, e.g. 'UNSIGNED-PAYLOAD'
 * }} opts
 */
export async function signRequest(opts) {
  const {
    method = 'GET',
    url,
    region,
    service,
    accessKeyId,
    secretAccessKey,
    sessionToken,
    headers = {},
    body,
    datetime,
    payloadHash: payloadHashOverride,
  } = opts;

  if (!accessKeyId || !secretAccessKey) throw new Error('sigv4.signRequest: accessKeyId/secretAccessKey required');
  if (!region || !service) throw new Error('sigv4.signRequest: region/service required');

  const u = new URL(url);
  const amzDate = datetime || toAmzDate(new Date());
  const dateStamp = amzDate.slice(0, 8);

  const workingHeaders = { ...headers };
  if (!hasHeader(workingHeaders, 'host')) workingHeaders.Host = u.host;
  if (!hasHeader(workingHeaders, 'x-amz-date')) workingHeaders['X-Amz-Date'] = amzDate;
  if (sessionToken && !hasHeader(workingHeaders, 'x-amz-security-token')) {
    workingHeaders['X-Amz-Security-Token'] = sessionToken;
  }

  const payloadHash = payloadHashOverride || (await sha256Hex(body));

  const canonicalUriStr = canonicalUri(u.pathname);
  const canonicalQueryStr = canonicalQuery(u.search);
  const { canonicalHeadersStr, signedHeaders } = canonicalHeaders(workingHeaders);

  const canonicalRequest = [
    method.toUpperCase(),
    canonicalUriStr,
    canonicalQueryStr,
    canonicalHeadersStr,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const hashedCanonicalRequest = await sha256Hex(canonicalRequest);
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, hashedCanonicalRequest].join('\n');

  const signingKey = await deriveSigningKey(secretAccessKey, dateStamp, region, service);
  const signature = toHex(await hmac(signingKey, stringToSign));

  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  return {
    headers: { ...workingHeaders, Authorization: authorization },
    canonicalRequest,
    stringToSign,
    signature,
    credentialScope,
    amzDate,
    dateStamp,
    signedHeaders,
    payloadHash,
  };
}

// ---------------------------------------------------------------------------
// Query-string signing (presigned URLs) — used by storage/s3.js presignedUrl()
// ---------------------------------------------------------------------------

/**
 * @param {{
 *   method?: string,
 *   url: string,
 *   region: string,
 *   service: string,
 *   accessKeyId: string,
 *   secretAccessKey: string,
 *   sessionToken?: string,
 *   expiresSeconds?: number,
 *   datetime?: string,
 *   extraQuery?: Record<string,string>,
 * }} opts
 * @returns {Promise<string>} the full presigned URL
 */
export async function presignUrl(opts) {
  const {
    method = 'GET',
    url,
    region,
    service,
    accessKeyId,
    secretAccessKey,
    sessionToken,
    expiresSeconds = 900,
    datetime,
    extraQuery = {},
  } = opts;

  const u = new URL(url);
  const amzDate = datetime || toAmzDate(new Date());
  const dateStamp = amzDate.slice(0, 8);
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;

  const headersForSigning = { host: u.host };
  const { canonicalHeadersStr, signedHeaders } = canonicalHeaders(headersForSigning);

  const existingPairs = Array.from(u.searchParams.entries());
  const signingPairs = [
    ...existingPairs,
    ['X-Amz-Algorithm', 'AWS4-HMAC-SHA256'],
    ['X-Amz-Credential', `${accessKeyId}/${credentialScope}`],
    ['X-Amz-Date', amzDate],
    ['X-Amz-Expires', String(expiresSeconds)],
    ['X-Amz-SignedHeaders', signedHeaders],
    ...(sessionToken ? [['X-Amz-Security-Token', sessionToken]] : []),
    ...Object.entries(extraQuery),
  ];

  const canonicalQueryStr = canonicalQueryFromPairs(signingPairs);
  const canonicalUriStr = canonicalUri(u.pathname);
  const payloadHash = 'UNSIGNED-PAYLOAD';

  const canonicalRequest = [
    method.toUpperCase(),
    canonicalUriStr,
    canonicalQueryStr,
    canonicalHeadersStr,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const hashedCanonicalRequest = await sha256Hex(canonicalRequest);
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, hashedCanonicalRequest].join('\n');

  const signingKey = await deriveSigningKey(secretAccessKey, dateStamp, region, service);
  const signature = toHex(await hmac(signingKey, stringToSign));

  return `${u.protocol}//${u.host}${canonicalUriStr}?${canonicalQueryStr}&X-Amz-Signature=${signature}`;
}
