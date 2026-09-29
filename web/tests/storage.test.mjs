// web/tests/storage.test.mjs
//
// Fake-fetch tests for every storage provider adapter in
// web/assets/js/providers/storage/*.js (URL/method/headers/body, including
// multipart/resumable/block upload flows), plus the AES-GCM credential
// round-trip tests for web/assets/js/providers/credentials.js.
//
// No real network calls or real localStorage are used anywhere in this file.

import { test, describe, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';

import localProvider from '../assets/js/providers/storage/local.js';
import s3Provider, { MULTIPART_THRESHOLD_BYTES } from '../assets/js/providers/storage/s3.js';
import azureBlobProvider, { BLOCK_THRESHOLD_BYTES } from '../assets/js/providers/storage/azure-blob.js';
import gcsProvider, { RESUMABLE_THRESHOLD_BYTES } from '../assets/js/providers/storage/gcs.js';
import { storageProviders, storageProviderRegistry, getStorageProvider, defaultStorageProviderId } from '../assets/js/providers/storage/index.js';
import { createCredentialStore, SecretCredentials } from '../assets/js/providers/credentials.js';

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
    return typeof next === 'function' ? next() : next;
  };
});

afterEach(() => {
  globalThis.fetch = originalFetch;
});

function res(body, { status = 200, headers = {} } = {}) {
  return new Response(body, { status, headers });
}

function xmlResponse(xml, opts) {
  return res(xml, { headers: { 'content-type': 'application/xml' }, ...opts });
}

function jsonResponse(obj, opts) {
  return res(JSON.stringify(obj), { headers: { 'content-type': 'application/json' }, ...opts });
}

function headerLower(init, name) {
  const h = init.headers || {};
  if (h instanceof Headers) return h.get(name);
  const found = Object.keys(h).find((k) => k.toLowerCase() === name.toLowerCase());
  return found ? h[found] : undefined;
}

function bytesOf(n, fill = 65) {
  return new Uint8Array(n).fill(fill);
}

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

describe('storage registry', () => {
  test('lists local, s3, azure-blob, gcs and defaults to local', () => {
    const ids = storageProviders.map((p) => p.id);
    assert.deepEqual(new Set(ids), new Set(['local', 's3', 'azure-blob', 'gcs']));
    assert.equal(defaultStorageProviderId, 'local');
    assert.equal(getStorageProvider('s3'), storageProviderRegistry.get('s3'));
    assert.equal(getStorageProvider('nope'), null);
  });

  test('local provider needs no credentials', () => {
    assert.deepEqual(localProvider.requiredCredentials, []);
    assert.equal(localProvider.validateCredentials({}).ok, true);
  });
});

// ---------------------------------------------------------------------------
// Local provider — no fetch involved; exercise the "no DOM" failure path,
// which is what actually runs under plain Node (this test environment).
// ---------------------------------------------------------------------------

describe('local storage provider', () => {
  test('put() throws a clear, non-retryable error outside a browser/File System Access context', async () => {
    await assert.rejects(() => localProvider.put('report.json', new Uint8Array([1, 2, 3])), (err) => {
      assert.equal(err.retryable, false);
      assert.match(err.message, /File System Access|DOM/);
      return true;
    });
  });

  test('get()/list()/delete() are explicitly unsupported, not silently no-op', async () => {
    await assert.rejects(() => localProvider.get('x'), (err) => {
      assert.match(err.message, /not supported/);
      return true;
    });
    await assert.rejects(() => localProvider.list('x'), /not supported/);
    await assert.rejects(() => localProvider.delete('x'), /not supported/);
  });
});

// ---------------------------------------------------------------------------
// S3
// ---------------------------------------------------------------------------

const s3Creds = { accessKeyId: 'AKIDEXAMPLE', secretAccessKey: 'secret', region: 'us-east-1', bucket: 'my-bucket' };

describe('s3 storage provider', () => {
  test('put() signs a virtual-hosted-style PUT with SigV4', async () => {
    queue.push(res('', { status: 200 }));
    const result = await s3Provider.put('reports/out.json', new TextEncoder().encode('{"a":1}'), {
      creds: s3Creds,
      contentType: 'application/json',
    });
    const { url, init } = calls[0];
    assert.equal(url, 'https://my-bucket.s3.us-east-1.amazonaws.com/reports/out.json');
    assert.equal(init.method, 'PUT');
    assert.ok(headerLower(init, 'Authorization').startsWith('AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/'));
    assert.equal(headerLower(init, 'content-type'), 'application/json');
    assert.equal(result.path, 'reports/out.json');
  });

  test('put() uses path-style URLs when forcePathStyle is set', async () => {
    queue.push(res('', { status: 200 }));
    await s3Provider.put('a.txt', bytesOf(4), { creds: { ...s3Creds, forcePathStyle: true } });
    assert.equal(calls[0].url, 'https://s3.us-east-1.amazonaws.com/my-bucket/a.txt');
  });

  test('put() against a custom S3-compatible endpoint uses that host, path-style', async () => {
    queue.push(res('', { status: 200 }));
    await s3Provider.put('a.txt', bytesOf(4), { creds: { ...s3Creds, endpoint: 'https://minio.local:9000' } });
    assert.equal(calls[0].url, 'https://minio.local:9000/my-bucket/a.txt');
  });

  test('put() for a large blob drives CreateMultipartUpload -> UploadPart* -> CompleteMultipartUpload', async () => {
    const total = MULTIPART_THRESHOLD_BYTES + 10;
    const bigBlob = bytesOf(total, 66);

    queue.push(xmlResponse('<InitiateMultipartUploadResult><UploadId>upload-123</UploadId></InitiateMultipartUploadResult>'));
    queue.push(res('', { headers: { etag: '"etag-1"' } }));
    queue.push(res('', { headers: { etag: '"etag-2"' } }));
    queue.push(xmlResponse('<CompleteMultipartUploadResult><ETag>"final-etag"</ETag></CompleteMultipartUploadResult>'));

    const result = await s3Provider.put('big/file.bin', bigBlob, { creds: s3Creds });

    assert.equal(calls[0].init.method, 'POST');
    assert.ok(calls[0].url.includes('uploads='));
    assert.equal(calls[1].init.method, 'PUT');
    assert.ok(calls[1].url.includes('partNumber=1') && calls[1].url.includes('uploadId=upload-123'));
    assert.equal(calls[2].init.method, 'PUT');
    assert.ok(calls[2].url.includes('partNumber=2'));
    assert.equal(calls[3].init.method, 'POST');
    assert.ok(calls[3].url.includes('uploadId=upload-123'));
    assert.match(calls[3].init.body, /<PartNumber>1<\/PartNumber><ETag>"etag-1"<\/ETag>/);
    assert.match(calls[3].init.body, /<PartNumber>2<\/PartNumber><ETag>"etag-2"<\/ETag>/);

    assert.equal(result.multipart, true);
    assert.equal(result.parts, 2);
  });

  test('CompleteMultipartUpload surfaces an embedded <Error> even on HTTP 200', async () => {
    // Same size as the successful multipart test above -> exactly 2 parts,
    // since MULTIPART_PART_SIZE_BYTES === MULTIPART_THRESHOLD_BYTES.
    const total = MULTIPART_THRESHOLD_BYTES + 10;
    queue.push(xmlResponse('<InitiateMultipartUploadResult><UploadId>u1</UploadId></InitiateMultipartUploadResult>'));
    queue.push(res('', { headers: { etag: '"e1"' } }));
    queue.push(res('', { headers: { etag: '"e2"' } }));
    queue.push(xmlResponse('<Error><Code>InternalError</Code><Message>We encountered an internal error</Message></Error>'));

    await assert.rejects(() => s3Provider.put('big.bin', bytesOf(total), { creds: s3Creds }), /internal error/);
  });

  test('get() returns bytes and content-type', async () => {
    queue.push(res(new TextEncoder().encode('hello'), { headers: { 'content-type': 'text/plain' } }));
    const result = await s3Provider.get('a.txt', { creds: s3Creds });
    assert.equal(new TextDecoder().decode(result.data), 'hello');
    assert.equal(result.contentType, 'text/plain');
    assert.equal(calls[0].init.method, 'GET');
  });

  test('list() parses ListObjectsV2 XML and follows pagination', async () => {
    queue.push(
      xmlResponse(
        '<ListBucketResult><Contents><Key>a.txt</Key><Size>3</Size><LastModified>2024-01-01T00:00:00Z</LastModified></Contents>' +
          '<IsTruncated>true</IsTruncated><NextContinuationToken>tok-1</NextContinuationToken></ListBucketResult>',
      ),
    );
    queue.push(
      xmlResponse(
        '<ListBucketResult><Contents><Key>b.txt</Key><Size>4</Size><LastModified>2024-01-02T00:00:00Z</LastModified></Contents>' +
          '<IsTruncated>false</IsTruncated></ListBucketResult>',
      ),
    );

    const items = await s3Provider.list('', { creds: s3Creds });
    assert.deepEqual(items.map((i) => i.key), ['a.txt', 'b.txt']);
    assert.equal(items[0].size, 3);
    assert.ok(calls[0].url.includes('list-type=2'));
    assert.ok(calls[1].url.includes('continuation-token=tok-1'));
  });

  test('delete() issues a signed DELETE', async () => {
    queue.push(res(null, { status: 204 }));
    await s3Provider.delete('a.txt', { creds: s3Creds });
    assert.equal(calls[0].init.method, 'DELETE');
  });

  test('presignedUrl() returns a query-signed URL with X-Amz-Signature, no network call', async () => {
    const url = await s3Provider.presignedUrl('a.txt', 60, { creds: s3Creds });
    assert.equal(calls.length, 0);
    assert.ok(url.startsWith('https://my-bucket.s3.us-east-1.amazonaws.com/a.txt?'));
    assert.ok(url.includes('X-Amz-Signature='));
    assert.ok(url.includes('X-Amz-Expires=60'));
  });

  test('401/403 are not retried; 500 is retried then succeeds', async () => {
    queue.push(res('access denied', { status: 403 }));
    await assert.rejects(() => s3Provider.get('a.txt', { creds: s3Creds }), (err) => {
      assert.equal(err.retryable, false);
      return true;
    });
    assert.equal(calls.length, 1);

    calls.length = 0;
    queue.push(res('boom', { status: 500 }));
    queue.push(res(new Uint8Array([1]), {}));
    const result = await s3Provider.get('a.txt', { creds: s3Creds });
    assert.equal(calls.length, 2);
    assert.equal(result.data.length, 1);
  });
});

// ---------------------------------------------------------------------------
// Azure Blob
// ---------------------------------------------------------------------------

const containerUrl = 'https://acct.blob.core.windows.net/container?sv=2021-08-06&sig=deadbeef';

describe('azure-blob storage provider', () => {
  test('single PUT uses x-ms-blob-type: BlockBlob and x-ms-version, keeps the SAS query', async () => {
    queue.push(res('', { status: 201 }));
    const result = await azureBlobProvider.put('reports/out.json', bytesOf(4), {
      creds: { containerUrl },
      contentType: 'application/json',
    });
    const { url, init } = calls[0];
    assert.ok(url.startsWith('https://acct.blob.core.windows.net/container/reports/out.json?'));
    assert.ok(url.includes('sig=deadbeef'));
    assert.equal(headerLower(init, 'x-ms-blob-type'), 'BlockBlob');
    assert.ok(headerLower(init, 'x-ms-version'));
    assert.equal(result.path, 'reports/out.json');
  });

  test('large blob upload uses Put Block + Put Block List', async () => {
    const { BLOCK_SIZE_BYTES } = await import('../assets/js/providers/storage/azure-blob.js');
    const total = BLOCK_THRESHOLD_BYTES + 10;
    const expectedBlocks = Math.ceil(total / BLOCK_SIZE_BYTES);

    for (let i = 0; i < expectedBlocks; i++) queue.push(res('', { status: 201 })); // one per block
    queue.push(res('', { status: 201 })); // commit blocklist

    const result = await azureBlobProvider.put('big/file.bin', bytesOf(total), { creds: { containerUrl } });

    for (let i = 0; i < expectedBlocks; i++) {
      assert.ok(calls[i].url.includes('comp=block') && calls[i].url.includes('blockid='));
    }
    const commitCall = calls[expectedBlocks];
    assert.ok(commitCall.url.includes('comp=blocklist'));
    const latestCount = (commitCall.init.body.match(/<Latest>/g) || []).length;
    assert.equal(latestCount, expectedBlocks);
    assert.equal(result.blocks, expectedBlocks);
  });

  test('get() downloads blob bytes', async () => {
    queue.push(res(new TextEncoder().encode('blobdata'), { headers: { 'content-type': 'application/octet-stream' } }));
    const result = await azureBlobProvider.get('a.bin', { creds: { containerUrl } });
    assert.equal(new TextDecoder().decode(result.data), 'blobdata');
  });

  test('list() parses List Blobs XML and follows NextMarker', async () => {
    queue.push(
      xmlResponse(
        '<EnumerationResults><Blobs><Blob><Name>a.bin</Name><Properties><Content-Length>5</Content-Length>' +
          '<Last-Modified>Mon, 01 Jan 2024 00:00:00 GMT</Last-Modified></Properties></Blob></Blobs>' +
          '<NextMarker>marker-1</NextMarker></EnumerationResults>',
      ),
    );
    queue.push(
      xmlResponse(
        '<EnumerationResults><Blobs><Blob><Name>b.bin</Name><Properties><Content-Length>6</Content-Length></Properties></Blob></Blobs></EnumerationResults>',
      ),
    );
    const items = await azureBlobProvider.list('', { creds: { containerUrl } });
    assert.deepEqual(items.map((i) => i.key), ['a.bin', 'b.bin']);
    assert.ok(calls[0].url.includes('restype=container') && calls[0].url.includes('comp=list'));
    assert.ok(calls[1].url.includes('marker=marker-1'));
  });

  test('delete() issues a DELETE with x-ms-version', async () => {
    queue.push(res('', { status: 202 }));
    await azureBlobProvider.delete('a.bin', { creds: { containerUrl } });
    assert.equal(calls[0].init.method, 'DELETE');
    assert.ok(headerLower(calls[0].init, 'x-ms-version'));
  });

  test('validateCredentials rejects a containerUrl without a sig= query param', () => {
    const result = azureBlobProvider.validateCredentials({ containerUrl: 'https://acct.blob.core.windows.net/container' });
    assert.equal(result.ok, false);
  });
});

// ---------------------------------------------------------------------------
// GCS
// ---------------------------------------------------------------------------

const gcsCreds = { accessToken: 'ya29.token', bucket: 'my-bucket' };

describe('gcs storage provider', () => {
  test('small put() uses uploadType=media with OAuth bearer', async () => {
    queue.push(res('', { status: 200 }));
    await gcsProvider.put('a.txt', bytesOf(4), { creds: gcsCreds, contentType: 'text/plain' });
    const { url, init } = calls[0];
    assert.ok(url.includes('uploadType=media'));
    assert.ok(url.includes('name=a.txt'));
    assert.equal(headerLower(init, 'authorization'), 'Bearer ya29.token');
  });

  test('large put() drives a resumable session: start -> Location -> chunk PUT(s)', async () => {
    const { RESUMABLE_CHUNK_BYTES } = await import('../assets/js/providers/storage/gcs.js');
    const total = RESUMABLE_THRESHOLD_BYTES + 10;
    const expectedChunks = Math.ceil(total / RESUMABLE_CHUNK_BYTES);

    queue.push(res('', { status: 200, headers: { location: 'https://upload.example.com/session-1' } }));
    for (let i = 0; i < expectedChunks - 1; i++) queue.push(res('', { status: 308 }));
    queue.push(jsonResponse({ name: 'big.bin' }, { status: 200 }));

    const result = await gcsProvider.put('big.bin', bytesOf(total), { creds: gcsCreds });

    assert.ok(calls[0].url.includes('uploadType=resumable'));
    assert.equal(headerLower(calls[0].init, 'x-upload-content-length'), String(total));
    assert.equal(calls[1].url, 'https://upload.example.com/session-1');
    assert.equal(calls[1].init.method, 'PUT');
    assert.ok(headerLower(calls[1].init, 'content-range').startsWith('bytes 0-'));
    assert.equal(calls.length, 1 + expectedChunks);
    assert.equal(result.resumable, true);
  });

  test('resumable upload handles intermediate 308 Resume Incomplete without erroring', async () => {
    const { RESUMABLE_CHUNK_BYTES } = await import('../assets/js/providers/storage/gcs.js');
    const total = RESUMABLE_THRESHOLD_BYTES * 2 + 10;
    const expectedChunks = Math.ceil(total / RESUMABLE_CHUNK_BYTES);

    queue.push(res('', { status: 200, headers: { location: 'https://upload.example.com/session-2' } }));
    for (let i = 0; i < expectedChunks - 1; i++) queue.push(res('', { status: 308 }));
    queue.push(jsonResponse({ name: 'big2.bin' }, { status: 200 }));

    const result = await gcsProvider.put('big2.bin', bytesOf(total), { creds: gcsCreds });
    assert.equal(calls.length, 1 + expectedChunks);
    assert.equal(result.resumable, true);
  });

  test('get() downloads with alt=media', async () => {
    queue.push(res(new TextEncoder().encode('gcsdata'), {}));
    const result = await gcsProvider.get('a.txt', { creds: gcsCreds });
    assert.equal(new TextDecoder().decode(result.data), 'gcsdata');
    assert.ok(calls[0].url.includes('alt=media'));
  });

  test('list() paginates via nextPageToken', async () => {
    queue.push(jsonResponse({ items: [{ name: 'a', size: '1', updated: '2024-01-01' }], nextPageToken: 'p2' }));
    queue.push(jsonResponse({ items: [{ name: 'b', size: '2', updated: '2024-01-02' }] }));
    const items = await gcsProvider.list('', { creds: gcsCreds });
    assert.deepEqual(items.map((i) => i.key), ['a', 'b']);
    assert.ok(calls[1].url.includes('pageToken=p2'));
  });

  test('delete() issues a DELETE with bearer auth', async () => {
    queue.push(res(null, { status: 204 }));
    await gcsProvider.delete('a.txt', { creds: gcsCreds });
    assert.equal(calls[0].init.method, 'DELETE');
    assert.equal(headerLower(calls[0].init, 'authorization'), 'Bearer ya29.token');
  });

  test('has no presignedUrl (requires service-account key signing, out of scope)', () => {
    assert.equal(gcsProvider.presignedUrl, undefined);
  });
});

// ---------------------------------------------------------------------------
// Credentials — AES-GCM round trip (in-memory + opt-in localStorage persistence)
// ---------------------------------------------------------------------------

function createFakeLocalStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k),
    get size() {
      return map.size;
    },
    _map: map,
  };
}

describe('credential store (AES-GCM persistence)', () => {
  test('secret credentials refuse JSON.stringify', () => {
    const creds = new SecretCredentials('anthropic', { apiKey: 'sk-secret' });
    assert.throws(() => JSON.stringify(creds), /Refusing to JSON\.stringify/);
    assert.equal(creds.apiKey, 'sk-secret');
  });

  test('set()/get() work purely in memory with no storage backend', () => {
    const store = createCredentialStore({ storage: null });
    store.set('anthropic', { apiKey: 'sk-1' });
    assert.equal(store.get('anthropic').apiKey, 'sk-1');
    assert.deepEqual(store.listProviderIds(), ['anthropic']);
    store.lock();
    assert.equal(store.get('anthropic'), null);
  });

  test('persist() -> unlock() round trip decrypts to the original credentials', async () => {
    const storage = createFakeLocalStorage();
    const store = createCredentialStore({ storage });
    store.set('anthropic', { apiKey: 'sk-round-trip' });
    store.set('s3', { accessKeyId: 'AKID', secretAccessKey: 'shh', bucket: 'b' });

    await store.persist('correct-passphrase');
    assert.equal(store.isPersisted(), true);
    assert.equal(storage.size, 1, 'exactly one blob written to storage');

    const raw = storage.getItem('ir-triage:credentials:v1');
    assert.doesNotMatch(raw, /sk-round-trip/, 'the persisted blob must not contain plaintext secrets');

    store.lock();
    assert.equal(store.get('anthropic'), null);

    await store.unlock('correct-passphrase');
    assert.equal(store.get('anthropic').apiKey, 'sk-round-trip');
    assert.equal(store.get('s3').accessKeyId, 'AKID');
  });

  test('unlock() with the wrong passphrase fails loudly, does not silently return garbage', async () => {
    const storage = createFakeLocalStorage();
    const store = createCredentialStore({ storage });
    store.set('anthropic', { apiKey: 'sk-x' });
    await store.persist('right-pass');
    store.lock();

    await assert.rejects(() => store.unlock('wrong-pass'), /Incorrect passphrase|corrupted/);
    assert.equal(store.get('anthropic'), null, 'a failed unlock must not leave partial state');
  });

  test('clear() leaves nothing in memory or in the fake localStorage', async () => {
    const storage = createFakeLocalStorage();
    const store = createCredentialStore({ storage });
    store.set('anthropic', { apiKey: 'sk-x' });
    await store.persist('pass');
    assert.equal(storage.size, 1);

    store.clear();
    assert.equal(storage.size, 0, 'persisted blob must be removed');
    assert.deepEqual(store.listProviderIds(), []);
    assert.equal(store.isPersisted(), false);
  });

  test('exportEncrypted()/importEncrypted() round trip without touching storage', async () => {
    const store = createCredentialStore({ storage: createFakeLocalStorage() });
    store.set('openai', { apiKey: 'sk-export' });
    const payload = await store.exportEncrypted('p@ss');
    assert.equal(typeof payload.ciphertext, 'string');
    assert.equal(payload.kdf, 'PBKDF2-SHA256');
    assert.ok(payload.iterations >= 210000);

    const other = createCredentialStore({ storage: null });
    await other.importEncrypted(payload, 'p@ss');
    assert.equal(other.get('openai').apiKey, 'sk-export');

    await assert.rejects(() => other.importEncrypted(payload, 'wrong'), /Incorrect passphrase|corrupted/);
  });
});
