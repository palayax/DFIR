// web/assets/js/providers/storage/gcs.js
//
// Google Cloud Storage JSON API, OAuth bearer auth — no @google-cloud/storage
// SDK. The analyst supplies a short-lived OAuth2 access token (this app does
// not run a token-refresh flow; same caveat as providers/google.js Vertex
// mode).
//
// Supports:
//   - simple upload (`uploadType=media`) for blobs under RESUMABLE_THRESHOLD_BYTES
//   - resumable upload session (`uploadType=resumable`: POST to start ->
//     Location header -> PUT chunk(s) with Content-Range) for larger blobs
//   - GET (`alt=media`), DELETE, and List Objects (JSON `items[]`, paginated
//     via `nextPageToken`)
//
// No presignedUrl(): GCS V4 signed URLs require signing with an RSA private
// key belonging to a service account (a distinct crypto flow from the OAuth
// bearer token this adapter uses) — out of scope for this pass. presignedUrl
// is optional per the StorageProvider interface (see types.js), so this
// adapter simply omits it rather than faking one.

import { withRetry } from '../lib/retry.js';
import { fetchWithNetworkErrors, throwIfError } from '../lib/http.js';

export const JSON_API_BASE = 'https://storage.googleapis.com/storage/v1';
export const UPLOAD_API_BASE = 'https://storage.googleapis.com/upload/storage/v1';
export const RESUMABLE_THRESHOLD_BYTES = 8 * 1024 * 1024; // 8 MiB
export const RESUMABLE_CHUNK_BYTES = 8 * 1024 * 1024; // 8 MiB (must be a multiple of 256 KiB per GCS)

function authHeaders(creds) {
  return { authorization: `Bearer ${creds.accessToken}` };
}

async function toBytes(blobOrBytes) {
  if (blobOrBytes instanceof Uint8Array) return blobOrBytes;
  if (blobOrBytes && typeof blobOrBytes.arrayBuffer === 'function') return new Uint8Array(await blobOrBytes.arrayBuffer());
  if (typeof blobOrBytes === 'string') return new TextEncoder().encode(blobOrBytes);
  return new Uint8Array(0);
}

function byteLength(blobOrBytes) {
  if (blobOrBytes instanceof Uint8Array) return blobOrBytes.byteLength;
  if (blobOrBytes && typeof blobOrBytes.size === 'number') return blobOrBytes.size;
  return 0;
}

function sliceChunk(blobOrBytes, start, end) {
  if (blobOrBytes instanceof Uint8Array) return blobOrBytes.subarray(start, end);
  if (blobOrBytes && typeof blobOrBytes.slice === 'function') return blobOrBytes.slice(start, end);
  return blobOrBytes;
}

export const gcsProvider = {
  id: 'gcs',
  label: 'Google Cloud Storage',
  requiredCredentials: [
    {
      key: 'accessToken',
      label: 'OAuth access token',
      kind: 'secret',
      placeholder: 'ya29...',
      help: 'Short-lived OAuth2 bearer token for a principal with Storage Object Admin (or equivalent) on the bucket. You are responsible for refreshing it.',
    },
    { key: 'bucket', label: 'Bucket', kind: 'text', placeholder: 'my-ir-case-bucket' },
  ],

  validateCredentials(creds) {
    const errors = [];
    if (!creds?.accessToken) errors.push('accessToken is required');
    if (!creds?.bucket) errors.push('bucket is required');
    return { ok: errors.length === 0, errors };
  },

  async put(path, blob, opts = {}) {
    const total = byteLength(blob);
    if (total > RESUMABLE_THRESHOLD_BYTES) return this._putResumable(path, blob, opts);

    const bytes = await toBytes(blob);
    const creds = opts.creds;
    const contentType = opts.contentType || 'application/octet-stream';
    const url = `${UPLOAD_API_BASE}/b/${encodeURIComponent(creds.bucket)}/o?uploadType=media&name=${encodeURIComponent(path)}`;

    return withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(url, {
          method: 'POST',
          headers: { ...authHeaders(creds), 'content-type': contentType },
          body: bytes,
          signal: opts.signal,
        });
        await throwIfError(response);
        return { path, url: null };
      },
      { signal: opts.signal },
    );
  },

  async _putResumable(path, blob, opts = {}) {
    const creds = opts.creds;
    const total = byteLength(blob);
    const contentType = opts.contentType || 'application/octet-stream';
    const startUrl = `${UPLOAD_API_BASE}/b/${encodeURIComponent(creds.bucket)}/o?uploadType=resumable&name=${encodeURIComponent(path)}`;

    const sessionUrl = await withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(startUrl, {
          method: 'POST',
          headers: {
            ...authHeaders(creds),
            'content-type': 'application/json; charset=UTF-8',
            'x-upload-content-type': contentType,
            'x-upload-content-length': String(total),
          },
          body: JSON.stringify({ name: path }),
          signal: opts.signal,
        });
        await throwIfError(response);
        const location = response.headers.get('location');
        if (!location) throw new Error('gcs storage provider: resumable session response had no Location header');
        return location;
      },
      { signal: opts.signal },
    );

    let lastResponseBody;
    for (let start = 0; start < total; start += RESUMABLE_CHUNK_BYTES) {
      const end = Math.min(start + RESUMABLE_CHUNK_BYTES, total);
      const chunk = await toBytes(sliceChunk(blob, start, end));
      const isFinal = end >= total;

      // eslint-disable-next-line no-await-in-loop
      lastResponseBody = await withRetry(
        async () => {
          const response = await fetchWithNetworkErrors(sessionUrl, {
            method: 'PUT',
            headers: {
              'content-length': String(chunk.byteLength),
              'content-range': `bytes ${start}-${end - 1}/${total}`,
            },
            body: chunk,
            signal: opts.signal,
          });
          // GCS uses 308 Resume Incomplete for intermediate chunks — not an error.
          if (response.status === 308) return undefined;
          await throwIfError(response);
          return response.json().catch(() => undefined);
        },
        { signal: opts.signal },
      );

      if (opts.onProgress) opts.onProgress({ loaded: end, total });
      if (!isFinal) continue;
    }

    return { path, url: null, resumable: true, raw: lastResponseBody };
  },

  async get(path, opts = {}) {
    const creds = opts.creds;
    const url = `${JSON_API_BASE}/b/${encodeURIComponent(creds.bucket)}/o/${encodeURIComponent(path)}?alt=media`;
    return withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(url, { method: 'GET', headers: authHeaders(creds), signal: opts.signal });
        await throwIfError(response);
        const data = new Uint8Array(await response.arrayBuffer());
        return { data, contentType: response.headers.get('content-type') || undefined };
      },
      { signal: opts.signal },
    );
  },

  async list(prefix, opts = {}) {
    const creds = opts.creds;
    const results = [];
    let pageToken;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const params = new URLSearchParams();
      if (prefix) params.set('prefix', prefix);
      if (pageToken) params.set('pageToken', pageToken);
      const url = `${JSON_API_BASE}/b/${encodeURIComponent(creds.bucket)}/o?${params.toString()}`;

      // eslint-disable-next-line no-await-in-loop
      const data = await withRetry(
        async () => {
          const response = await fetchWithNetworkErrors(url, { method: 'GET', headers: authHeaders(creds), signal: opts.signal });
          await throwIfError(response);
          return response.json();
        },
        { signal: opts.signal },
      );

      for (const item of data.items || []) {
        results.push({ key: item.name, size: Number(item.size || 0), lastModified: item.updated });
      }
      if (!data.nextPageToken) break;
      pageToken = data.nextPageToken;
    }
    return results;
  },

  async delete(path, opts = {}) {
    const creds = opts.creds;
    const url = `${JSON_API_BASE}/b/${encodeURIComponent(creds.bucket)}/o/${encodeURIComponent(path)}`;
    await withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(url, { method: 'DELETE', headers: authHeaders(creds), signal: opts.signal });
        await throwIfError(response);
      },
      { signal: opts.signal },
    );
  },
};

export default gcsProvider;
