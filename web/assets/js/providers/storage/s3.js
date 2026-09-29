// web/assets/js/providers/storage/s3.js
//
// Amazon S3 (and S3-compatible: MinIO, R2, etc. via a custom `endpoint`),
// signed from scratch with AWS SigV4 (providers/lib/sigv4.js) — no aws-sdk.
//
// Supports:
//   - virtual-hosted-style (`{bucket}.s3.{region}.amazonaws.com`, the modern
//     AWS default) and path-style (`{endpoint-or-s3-host}/{bucket}`, needed by
//     most S3-compatible services and by `forcePathStyle: true`)
//   - PUT / GET / DELETE / ListObjectsV2 (minimal hand-rolled XML parsing —
//     no DOMParser dependency, since this must also run under plain Node in
//     tests)
//   - multipart upload for blobs over MULTIPART_THRESHOLD_BYTES
//     (CreateMultipartUpload -> UploadPart* -> CompleteMultipartUpload)
//   - presignedUrl() via sigv4.js's query-string signing (presignUrl)

import { signRequest, presignUrl } from '../lib/sigv4.js';
import { withRetry } from '../lib/retry.js';
import { fetchWithNetworkErrors, throwIfError } from '../lib/http.js';

export const MULTIPART_THRESHOLD_BYTES = 8 * 1024 * 1024; // 8 MiB
export const MULTIPART_PART_SIZE_BYTES = 8 * 1024 * 1024;

function stripProtocol(hostOrUrl) {
  return String(hostOrUrl || '').replace(/^https?:\/\//, '').replace(/\/+$/, '');
}

/** Resolve {origin, pathPrefix} for a bucket, honoring custom endpoints and path-style. */
function resolveBucketLocation(creds) {
  const region = creds.region || 'us-east-1';
  const bucket = creds.bucket;
  if (!bucket) throw new Error('s3 storage provider: bucket is required');

  if (creds.endpoint) {
    const host = stripProtocol(creds.endpoint);
    const protocol = /^https?:\/\//.test(creds.endpoint) && creds.endpoint.startsWith('http://') ? 'http' : 'https';
    if (creds.forcePathStyle === false) {
      return { origin: `${protocol}://${bucket}.${host}`, pathPrefix: '' };
    }
    return { origin: `${protocol}://${host}`, pathPrefix: `/${bucket}` };
  }

  if (creds.forcePathStyle) {
    return { origin: `https://s3.${region}.amazonaws.com`, pathPrefix: `/${bucket}` };
  }
  return { origin: `https://${bucket}.s3.${region}.amazonaws.com`, pathPrefix: '' };
}

function keyPath(pathPrefix, key) {
  const cleanKey = String(key || '').replace(/^\/+/, '');
  return `${pathPrefix}/${cleanKey}`.replace(/\/{2,}/g, '/');
}

function buildUrl(creds, key, query) {
  const { origin, pathPrefix } = resolveBucketLocation(creds);
  const path = key === undefined ? pathPrefix || '/' : keyPath(pathPrefix, key);
  const qs = query ? '?' + new URLSearchParams(query).toString() : '';
  return `${origin}${path || '/'}${qs}`;
}

function sigCreds(creds) {
  return {
    region: creds.region || 'us-east-1',
    service: 's3',
    accessKeyId: creds.accessKeyId,
    secretAccessKey: creds.secretAccessKey,
    sessionToken: creds.sessionToken,
  };
}

async function toBytes(blobOrBytes) {
  if (blobOrBytes instanceof Uint8Array) return blobOrBytes;
  if (blobOrBytes && typeof blobOrBytes.arrayBuffer === 'function') {
    return new Uint8Array(await blobOrBytes.arrayBuffer());
  }
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

// ---------------------------------------------------------------------------
// Minimal XML extraction (no DOMParser — must run under plain Node too)
// ---------------------------------------------------------------------------

function tagValue(xmlBlock, tag) {
  const m = xmlBlock.match(new RegExp(`<${tag}>([^<]*)</${tag}>`));
  return m ? m[1] : undefined;
}

function decodeXmlEntities(str) {
  return String(str || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parseListObjectsXml(xmlText) {
  const contentsBlocks = xmlText.match(/<Contents>[\s\S]*?<\/Contents>/g) || [];
  const items = contentsBlocks.map((block) => ({
    key: decodeXmlEntities(tagValue(block, 'Key')),
    size: Number(tagValue(block, 'Size') || 0),
    lastModified: tagValue(block, 'LastModified'),
  }));
  const isTruncated = /<IsTruncated>true<\/IsTruncated>/.test(xmlText);
  const nextToken = tagValue(xmlText, 'NextContinuationToken');
  return { items, isTruncated, nextToken };
}

function parseCompleteMultipartError(xmlText) {
  // S3 can return 200 OK with an error embedded in the XML body for
  // CompleteMultipartUpload; surface it rather than treating it as success.
  if (/<Error>/.test(xmlText)) {
    return tagValue(xmlText, 'Message') || tagValue(xmlText, 'Code') || 'Unknown S3 error';
  }
  return null;
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export const s3Provider = {
  id: 's3',
  label: 'Amazon S3 / S3-compatible',
  requiredCredentials: [
    { key: 'accessKeyId', label: 'Access key ID', kind: 'secret', placeholder: 'AKIA...', help: 'IAM identity with S3 read/write on the target bucket.' },
    { key: 'secretAccessKey', label: 'Secret access key', kind: 'secret', placeholder: '...', help: 'Paired with the access key ID.' },
    { key: 'sessionToken', label: 'Session token (optional)', kind: 'secret', placeholder: '...', help: 'Only for temporary/STS credentials.' },
    { key: 'region', label: 'Region', kind: 'text', placeholder: 'us-east-1' },
    { key: 'bucket', label: 'Bucket', kind: 'text', placeholder: 'my-ir-case-bucket' },
    {
      key: 'endpoint',
      label: 'Custom endpoint (optional)',
      kind: 'text',
      placeholder: 'https://s3.example-minio.local:9000',
      help: 'For S3-compatible services (MinIO, Cloudflare R2, etc). Leave blank for AWS S3.',
    },
    {
      key: 'forcePathStyle',
      label: 'Force path-style URLs',
      kind: 'text',
      placeholder: 'true | false',
      help: 'Most S3-compatible endpoints need path-style (bucket in the path, not the hostname). Defaults to path-style when a custom endpoint is set, virtual-hosted-style otherwise.',
    },
  ],

  validateCredentials(creds) {
    const errors = [];
    if (!creds?.accessKeyId) errors.push('accessKeyId is required');
    if (!creds?.secretAccessKey) errors.push('secretAccessKey is required');
    if (!creds?.bucket) errors.push('bucket is required');
    return { ok: errors.length === 0, errors };
  },

  async put(path, blob, opts = {}) {
    const total = byteLength(blob);
    if (total > MULTIPART_THRESHOLD_BYTES) {
      return this._putMultipart(path, blob, opts);
    }

    const bytes = await toBytes(blob);
    const contentType = opts.contentType || 'application/octet-stream';
    const url = buildUrl(opts.creds, path);

    return withRetry(
      async () => {
        const signed = await signRequest({
          method: 'PUT',
          url,
          ...sigCreds(opts.creds),
          headers: { 'content-type': contentType },
          body: bytes,
        });
        const response = await fetchWithNetworkErrors(url, { method: 'PUT', headers: signed.headers, body: bytes, signal: opts.signal });
        await throwIfError(response);
        return { path, url: null };
      },
      { signal: opts.signal },
    );
  },

  async _putMultipart(path, blob, opts = {}) {
    const creds = opts.creds;
    const contentType = opts.contentType || 'application/octet-stream';
    const total = byteLength(blob);

    // 1. CreateMultipartUpload
    const createUrl = buildUrl(creds, path, { uploads: '' });
    const uploadId = await withRetry(
      async () => {
        const signed = await signRequest({ method: 'POST', url: createUrl, ...sigCreds(creds), headers: { 'content-type': contentType } });
        const response = await fetchWithNetworkErrors(createUrl, { method: 'POST', headers: signed.headers, signal: opts.signal });
        await throwIfError(response);
        const text = await response.text();
        return tagValue(text, 'UploadId');
      },
      { signal: opts.signal },
    );

    // 2. UploadPart for each chunk
    const parts = [];
    let partNumber = 1;
    for (let start = 0; start < total; start += MULTIPART_PART_SIZE_BYTES) {
      const end = Math.min(start + MULTIPART_PART_SIZE_BYTES, total);
      const chunk = await toBytes(sliceChunk(blob, start, end));
      const partUrl = buildUrl(creds, path, { partNumber: String(partNumber), uploadId });

      // eslint-disable-next-line no-await-in-loop
      const etag = await withRetry(
        async () => {
          const signed = await signRequest({ method: 'PUT', url: partUrl, ...sigCreds(creds), body: chunk });
          const response = await fetchWithNetworkErrors(partUrl, { method: 'PUT', headers: signed.headers, body: chunk, signal: opts.signal });
          await throwIfError(response);
          return response.headers.get('etag');
        },
        { signal: opts.signal },
      );

      parts.push({ partNumber, etag });
      if (opts.onProgress) opts.onProgress({ loaded: end, total });
      partNumber += 1;
    }

    // 3. CompleteMultipartUpload
    const completeBody =
      '<CompleteMultipartUpload>' +
      parts.map((p) => `<Part><PartNumber>${p.partNumber}</PartNumber><ETag>${p.etag}</ETag></Part>`).join('') +
      '</CompleteMultipartUpload>';
    const completeUrl = buildUrl(creds, path, { uploadId });

    await withRetry(
      async () => {
        const signed = await signRequest({
          method: 'POST',
          url: completeUrl,
          ...sigCreds(creds),
          headers: { 'content-type': 'application/xml' },
          body: completeBody,
        });
        const response = await fetchWithNetworkErrors(completeUrl, {
          method: 'POST',
          headers: signed.headers,
          body: completeBody,
          signal: opts.signal,
        });
        await throwIfError(response);
        const text = await response.text();
        const embeddedError = parseCompleteMultipartError(text);
        if (embeddedError) throw new Error(`s3 CompleteMultipartUpload failed: ${embeddedError}`);
      },
      { signal: opts.signal },
    );

    return { path, url: null, multipart: true, parts: parts.length };
  },

  async get(path, opts = {}) {
    const url = buildUrl(opts.creds, path);
    return withRetry(
      async () => {
        const signed = await signRequest({ method: 'GET', url, ...sigCreds(opts.creds) });
        const response = await fetchWithNetworkErrors(url, { method: 'GET', headers: signed.headers, signal: opts.signal });
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
    let continuationToken;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const query = { 'list-type': '2' };
      if (prefix) query.prefix = prefix;
      if (continuationToken) query['continuation-token'] = continuationToken;
      const url = buildUrl(creds, undefined, query);

      // eslint-disable-next-line no-await-in-loop
      const { items, isTruncated, nextToken } = await withRetry(
        async () => {
          const signed = await signRequest({ method: 'GET', url, ...sigCreds(creds) });
          const response = await fetchWithNetworkErrors(url, { method: 'GET', headers: signed.headers, signal: opts.signal });
          await throwIfError(response);
          return parseListObjectsXml(await response.text());
        },
        { signal: opts.signal },
      );

      results.push(...items.map((it) => ({ key: it.key, size: it.size, lastModified: it.lastModified })));
      if (!isTruncated || !nextToken) break;
      continuationToken = nextToken;
    }
    return results;
  },

  async delete(path, opts = {}) {
    const url = buildUrl(opts.creds, path);
    await withRetry(
      async () => {
        const signed = await signRequest({ method: 'DELETE', url, ...sigCreds(opts.creds) });
        const response = await fetchWithNetworkErrors(url, { method: 'DELETE', headers: signed.headers, signal: opts.signal });
        await throwIfError(response);
      },
      { signal: opts.signal },
    );
  },

  async presignedUrl(path, ttl, opts = {}) {
    const url = buildUrl(opts.creds, path);
    return presignUrl({ method: 'GET', url, ...sigCreds(opts.creds), expiresSeconds: ttl || 900 });
  },

  // Exposed for tests / advanced callers.
  _internal: { buildUrl, resolveBucketLocation, parseListObjectsXml },
};

export default s3Provider;
