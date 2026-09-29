import test from 'node:test';
import assert from 'node:assert/strict';
import { buildZip } from './helpers/zip-writer.mjs';
import { openZip } from '../assets/js/lib/unzip.js';

function toFile(bytes, name = 'test.zip') {
  return new File([bytes], name);
}

test('reads a stored (uncompressed) entry', async () => {
  const zipBytes = await buildZip([{ name: 'hello.txt', data: 'hello world', method: 'stored' }]);
  const zip = await openZip(toFile(zipBytes));
  assert.equal(zip.entries.length, 1);
  assert.equal(zip.entries[0].name, 'hello.txt');
  assert.equal(zip.entries[0].method, 0);
  const text = await zip.getEntryText(zip.entries[0]);
  assert.equal(text, 'hello world');
});

test('reads a deflate-compressed entry', async () => {
  const payload = 'the quick brown fox jumps over the lazy dog '.repeat(200);
  const zipBytes = await buildZip([{ name: 'big.txt', data: payload, method: 'deflate' }]);
  const zip = await openZip(toFile(zipBytes));
  assert.equal(zip.entries[0].method, 8);
  const text = await zip.getEntryText(zip.entries[0]);
  assert.equal(text, payload);
});

test('reads multiple mixed entries with correct byte boundaries', async () => {
  const zipBytes = await buildZip([
    { name: 'a.txt', data: 'AAAA', method: 'stored' },
    { name: 'dir/b.json', data: JSON.stringify({ x: 1 }), method: 'deflate' },
    { name: 'c.txt', data: 'CCCCCCCCCC', method: 'stored' },
  ]);
  const zip = await openZip(toFile(zipBytes));
  assert.equal(zip.entries.length, 3);
  assert.equal(await zip.getEntryText(zip.entries[0]), 'AAAA');
  assert.equal(await zip.getEntryText(zip.entries[1]), JSON.stringify({ x: 1 }));
  assert.equal(await zip.getEntryText(zip.entries[2]), 'CCCCCCCCCC');
});

test('handles a ZIP64 entry (forced extra field with real 64-bit sizes/offset)', async () => {
  const zipBytes = await buildZip([
    { name: 'normal.txt', data: 'normal', method: 'stored' },
    { name: 'zip64.txt', data: 'this entry forces zip64 extra fields', method: 'stored', forceZip64: true },
  ]);
  const zip = await openZip(toFile(zipBytes));
  assert.equal(zip.entries.length, 2);
  const z64 = zip.entries.find((e) => e.name === 'zip64.txt');
  assert.ok(z64);
  assert.equal(z64.uncompressedSize, 'this entry forces zip64 extra fields'.length);
  const text = await zip.getEntryText(z64);
  assert.equal(text, 'this entry forces zip64 extra fields');
});

test('throws a clear error for an unsupported compression method', async () => {
  const zipBytes = await buildZip([{ name: 'ok.txt', data: 'ok', method: 'stored' }]);
  // Corrupt the method field of the single local+central header to method 99 (unsupported).
  // Local header method field is at offset 8-9; central header method field at offset 10-11
  // within its record. Easiest: flip both known offsets for this single-entry zip.
  const bytes = new Uint8Array(zipBytes);
  const view = new DataView(bytes.buffer);
  // Local file header starts at 0.
  view.setUint16(8, 99, true);
  // Find central header signature to patch its method field too.
  for (let i = 0; i < bytes.length - 4; i++) {
    if (view.getUint32(i, true) === 0x02014b50) {
      view.setUint16(i + 10, 99, true);
      break;
    }
  }
  const zip = await openZip(toFile(bytes));
  await assert.rejects(
    () => zip.getEntryBytes(zip.entries[0]),
    /Unsupported ZIP compression method 99/
  );
});
