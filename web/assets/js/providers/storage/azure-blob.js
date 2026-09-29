// web/assets/js/providers/storage/azure-blob.js
//
// Azure Blob Storage, SAS-token URL mode: the analyst supplies a
// *container-level* SAS URL (Shared Access Signature already embedded as a
// query string, e.g. from the Azure Portal or `az storage container
// generate-sas`) — no Azure SDK, no account key signing logic needed here,
// since the SAS query string IS the auth.
//
// Supports:
//   - single PUT Blob (`x-ms-blob-type: BlockBlob`) for blobs under
//     BLOCK_THRESHOLD_BYTES
//   - block upload (Put Block + Put Block List) for larger blobs
//   - GET (download), DELETE, and List Blobs (`restype=container&comp=list`,
//     minimal hand-rolled XML parsing — no DOMParser, must run under Node)

import { withRetry } from '../lib/retry.js';
import { fetchWithNetworkErrors, throwIfError } from '../lib/http.js';

export const API_VERSION = '2021-08-06';
export const BLOCK_THRESHOLD_BYTES = 8 * 1024 * 1024; // 8 MiB
export const BLOCK_SIZE_BYTES = 4 * 1024 * 1024; // 4 MiB

function parseContainerUrl(containerUrl) {
  if (!containerUrl) throw new Error('azure-blob storage provider: containerUrl (SAS URL) is required');
  return new URL(containerUrl);
}

function blobUrl(creds, path, extraParams) {
  const u = parseContainerUrl(creds.containerUrl);
  const cleanPath = String(path || '').replace(/^\/+/, '');
  const params = new URLSearchParams(u.search);
  if (extraParams) {
    for (const [k, v] of Object.entries(extraParams)) params.set(k, v);
  }
  return `${u.origin}${u.pathname}/${cleanPath.split('/').map(encodeURIComponent).join('/')}?${params.toString()}`;
}

function containerListUrl(creds, prefix, marker) {
  const u = parseContainerUrl(creds.containerUrl);
  const params = new URLSearchParams(u.search);
  params.set('restype', 'container');
  params.set('comp', 'list');
  if (prefix) params.set('prefix', prefix);
  if (marker) params.set('marker', marker);
  return `${u.origin}${u.pathname}?${params.toString()}`;
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

function blockIdForIndex(index) {
  // Fixed-width so lexical == numeric ordering; base64 per the Put Block API.
  const raw = `block-${String(index).padStart(8, '0')}`;
  return typeof btoa === 'function' ? btoa(raw) : Buffer.from(raw).toString('base64');
}

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

function parseListBlobsXml(xmlText) {
  const blocks = xmlText.match(/<Blob>[\s\S]*?<\/Blob>/g) || [];
  const items = blocks.map((block) => ({
    key: decodeXmlEntities(tagValue(block, 'Name')),
    size: Number(tagValue(block, 'Content-Length') || 0),
    lastModified: tagValue(block, 'Last-Modified'),
  }));
  const nextMarker = tagValue(xmlText, 'NextMarker');
  return { items, nextMarker: nextMarker || undefined };
}

function baseHeaders() {
  return { 'x-ms-version': API_VERSION };
}

export const azureBlobProvider = {
  id: 'azure-blob',
  label: 'Azure Blob Storage (SAS URL)',
  requiredCredentials: [
    {
      key: 'containerUrl',
      label: 'Container SAS URL',
      kind: 'secret',
      placeholder: 'https://account.blob.core.windows.net/container?sv=...&sig=...',
      help: 'A container-level Shared Access Signature URL (Azure Portal -> Storage Account -> Container -> Generate SAS). The SAS query string is the entire auth mechanism — no account key is ever entered here.',
    },
  ],

  validateCredentials(creds) {
    const errors = [];
    if (!creds?.containerUrl) errors.push('containerUrl is required');
    else if (!/[?&]sig=/.test(creds.containerUrl)) errors.push('containerUrl does not look like a SAS URL (missing sig= query param)');
    return { ok: errors.length === 0, errors };
  },

  async put(path, blob, opts = {}) {
    const total = byteLength(blob);
    if (total > BLOCK_THRESHOLD_BYTES) return this._putBlocks(path, blob, opts);

    const bytes = await toBytes(blob);
    const url = blobUrl(opts.creds, path);
    return withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(url, {
          method: 'PUT',
          headers: {
            ...baseHeaders(),
            'x-ms-blob-type': 'BlockBlob',
            'content-type': opts.contentType || 'application/octet-stream',
            'content-length': String(bytes.byteLength),
          },
          body: bytes,
          signal: opts.signal,
        });
        await throwIfError(response);
        return { path, url: null };
      },
      { signal: opts.signal },
    );
  },

  async _putBlocks(path, blob, opts = {}) {
    const creds = opts.creds;
    const total = byteLength(blob);
    const blockIds = [];
    let index = 0;

    for (let start = 0; start < total; start += BLOCK_SIZE_BYTES) {
      const end = Math.min(start + BLOCK_SIZE_BYTES, total);
      const chunk = await toBytes(sliceChunk(blob, start, end));
      const blockId = blockIdForIndex(index);
      const url = blobUrl(creds, path, { comp: 'block', blockid: blockId });

      // eslint-disable-next-line no-await-in-loop
      await withRetry(
        async () => {
          const response = await fetchWithNetworkErrors(url, {
            method: 'PUT',
            headers: { ...baseHeaders(), 'content-length': String(chunk.byteLength) },
            body: chunk,
            signal: opts.signal,
          });
          await throwIfError(response);
        },
        { signal: opts.signal },
      );

      blockIds.push(blockId);
      if (opts.onProgress) opts.onProgress({ loaded: end, total });
      index += 1;
    }

    const blockListXml = `<?xml version="1.0" encoding="utf-8"?><BlockList>${blockIds
      .map((id) => `<Latest>${id}</Latest>`)
      .join('')}</BlockList>`;
    const commitUrl = blobUrl(creds, path, { comp: 'blocklist' });

    await withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(commitUrl, {
          method: 'PUT',
          headers: { ...baseHeaders(), 'content-type': 'application/xml' },
          body: blockListXml,
          signal: opts.signal,
        });
        await throwIfError(response);
      },
      { signal: opts.signal },
    );

    return { path, url: null, blocks: blockIds.length };
  },

  async get(path, opts = {}) {
    const url = blobUrl(opts.creds, path);
    return withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(url, { method: 'GET', headers: baseHeaders(), signal: opts.signal });
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
    let marker;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const url = containerListUrl(creds, prefix, marker);
      // eslint-disable-next-line no-await-in-loop
      const { items, nextMarker } = await withRetry(
        async () => {
          const response = await fetchWithNetworkErrors(url, { method: 'GET', headers: baseHeaders(), signal: opts.signal });
          await throwIfError(response);
          return parseListBlobsXml(await response.text());
        },
        { signal: opts.signal },
      );
      results.push(...items);
      if (!nextMarker) break;
      marker = nextMarker;
    }
    return results;
  },

  async delete(path, opts = {}) {
    const url = blobUrl(opts.creds, path);
    await withRetry(
      async () => {
        const response = await fetchWithNetworkErrors(url, { method: 'DELETE', headers: baseHeaders(), signal: opts.signal });
        await throwIfError(response);
      },
      { signal: opts.signal },
    );
  },

  // The container SAS URL already grants time-limited access; a distinct
  // per-blob presigned URL is just the blob URL under that same SAS.
  async presignedUrl(path, _ttl, opts = {}) {
    return blobUrl(opts.creds, path);
  },

  _internal: { blobUrl, containerListUrl, parseListBlobsXml },
};

export default azureBlobProvider;
