// Minimal in-browser/in-Node ZIP reader, no vendored dependency.
//
// Supports: the standard End Of Central Directory record, ZIP64 (via the
// EOCD64 locator + record and the 0x0001 extra field), and entries stored
// with method 0 (stored) or 8 (deflate, via DecompressionStream('deflate-raw')).
// Entry data is exposed as a stream so large entries can be consumed without
// buffering the whole file in memory. Any other compression method throws a
// clear, specific error naming the entry and the method number rather than
// silently skipping it.
//
// This intentionally only reads what a ZIP INTERPRETER needs: the central
// directory (source of truth for size/method/name) plus, per entry, the
// local file header immediately preceding its data (needed because the
// central directory doesn't record the local header's variable-length
// name/extra sizes, which determine where the compressed data actually
// starts).

import { streamToAsyncIterable } from './streams.js';

const EOCD_SIG = 0x06054b50;
const EOCD64_LOCATOR_SIG = 0x07064b50;
const EOCD64_SIG = 0x06064b50;
const CDH_SIG = 0x02014b50;
const LFH_SIG = 0x04034b50;
const MAX_COMMENT = 65535;

function u16(view, off) { return view.getUint16(off, true); }
function u32(view, off) { return view.getUint32(off, true); }
function u64(view, off) {
  const lo = view.getUint32(off, true);
  const hi = view.getUint32(off + 4, true);
  return Number(BigInt(hi) * 0x100000000n + BigInt(lo));
}

async function readSlice(blob, start, end) {
  return new Uint8Array(await blob.slice(start, end).arrayBuffer());
}

async function locateEOCD(blob) {
  const size = blob.size;
  const tailSize = Math.min(size, MAX_COMMENT + 22);
  const tailStart = size - tailSize;
  const tail = await readSlice(blob, tailStart, size);

  for (let i = tail.length - 22; i >= 0; i--) {
    if (tail[i] === 0x50 && tail[i + 1] === 0x4b && tail[i + 2] === 0x05 && tail[i + 3] === 0x06) {
      const view = new DataView(tail.buffer, tail.byteOffset + i, 22);
      const eocdOffset = tailStart + i;
      let cdCount = u16(view, 10);
      let cdSize = u32(view, 12);
      let cdOffset = u32(view, 16);

      if (eocdOffset >= 20) {
        const locBytes = await readSlice(blob, eocdOffset - 20, eocdOffset);
        const locView = new DataView(locBytes.buffer, locBytes.byteOffset, locBytes.byteLength);
        if (u32(locView, 0) === EOCD64_LOCATOR_SIG) {
          const eocd64Offset = u64(locView, 8);
          const rec = await readSlice(blob, eocd64Offset, eocd64Offset + 56);
          const recView = new DataView(rec.buffer, rec.byteOffset, rec.byteLength);
          if (u32(recView, 0) === EOCD64_SIG) {
            cdCount = u64(recView, 32);
            cdSize = u64(recView, 40);
            cdOffset = u64(recView, 48);
          }
        }
      }
      return { cdCount, cdSize, cdOffset };
    }
  }
  throw new Error('Not a valid ZIP file: End Of Central Directory record not found.');
}

function parseZip64Extra(extraBytes, sizes) {
  let uncompressedSize = sizes.uncompressedSize;
  let compressedSize = sizes.compressedSize;
  let localHeaderOffset = sizes.localHeaderOffset;
  const view = new DataView(extraBytes.buffer, extraBytes.byteOffset, extraBytes.byteLength);
  let pos = 0;
  while (pos + 4 <= extraBytes.length) {
    const id = u16(view, pos);
    const dataLen = u16(view, pos + 2);
    if (id === 0x0001) {
      let p = pos + 4;
      const end = Math.min(p + dataLen, extraBytes.length);
      if (uncompressedSize === 0xffffffff && p + 8 <= end) { uncompressedSize = u64(view, p); p += 8; }
      if (compressedSize === 0xffffffff && p + 8 <= end) { compressedSize = u64(view, p); p += 8; }
      if (localHeaderOffset === 0xffffffff && p + 8 <= end) { localHeaderOffset = u64(view, p); p += 8; }
    }
    pos += 4 + dataLen;
  }
  return { uncompressedSize, compressedSize, localHeaderOffset };
}

function parseCentralDirectory(buf) {
  const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
  const entries = [];
  let offset = 0;
  while (offset + 46 <= buf.length) {
    if (u32(view, offset) !== CDH_SIG) break;
    const method = u16(view, offset + 10);
    const crc32 = u32(view, offset + 16);
    const compressedSize0 = u32(view, offset + 20);
    const uncompressedSize0 = u32(view, offset + 24);
    const nameLen = u16(view, offset + 28);
    const extraLen = u16(view, offset + 30);
    const commentLen = u16(view, offset + 32);
    const localHeaderOffset0 = u32(view, offset + 42);

    const nameBytes = buf.subarray(offset + 46, offset + 46 + nameLen);
    const name = new TextDecoder('utf-8').decode(nameBytes);
    const extraStart = offset + 46 + nameLen;
    const extraBytes = buf.subarray(extraStart, extraStart + extraLen);

    const resolved = parseZip64Extra(extraBytes, {
      uncompressedSize: uncompressedSize0,
      compressedSize: compressedSize0,
      localHeaderOffset: localHeaderOffset0,
    });

    entries.push({
      name,
      method,
      crc32,
      compressedSize: resolved.compressedSize,
      uncompressedSize: resolved.uncompressedSize,
      localHeaderOffset: resolved.localHeaderOffset,
      isDirectory: name.endsWith('/'),
    });

    offset += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

async function getEntryDataRange(blob, entry) {
  const head = await readSlice(blob, entry.localHeaderOffset, entry.localHeaderOffset + 30);
  const view = new DataView(head.buffer, head.byteOffset, head.byteLength);
  if (u32(view, 0) !== LFH_SIG) {
    throw new Error(`Corrupt ZIP: local file header signature mismatch for entry "${entry.name}".`);
  }
  const nameLen = u16(view, 26);
  const extraLen = u16(view, 28);
  const dataStart = entry.localHeaderOffset + 30 + nameLen + extraLen;
  return { start: dataStart, end: dataStart + entry.compressedSize };
}

const SUPPORTED_METHODS = { 0: 'stored', 8: 'deflate' };

/** Open a ZIP-format Blob/File. Reads and parses only the central directory
 * eagerly; entry data is read/decompressed lazily and on demand. */
export async function openZip(blob) {
  const { cdOffset, cdSize } = await locateEOCD(blob);
  const cdBuf = await readSlice(blob, cdOffset, cdOffset + cdSize);
  const entries = parseCentralDirectory(cdBuf);

  async function getEntryStream(entry) {
    const methodName = SUPPORTED_METHODS[entry.method];
    if (!methodName) {
      throw new Error(
        `Unsupported ZIP compression method ${entry.method} for entry "${entry.name}". ` +
        'Only stored (0) and deflate (8) are supported by this reader.'
      );
    }
    const range = await getEntryDataRange(blob, entry);
    const slice = blob.slice(range.start, range.end);
    if (methodName === 'stored') return slice.stream();
    return slice.stream().pipeThrough(new DecompressionStream('deflate-raw'));
  }

  async function getEntryBytes(entry) {
    const stream = await getEntryStream(entry);
    const chunks = [];
    let total = 0;
    for await (const chunk of streamToAsyncIterable(stream)) {
      chunks.push(chunk);
      total += chunk.length;
    }
    const out = new Uint8Array(total);
    let off = 0;
    for (const c of chunks) {
      out.set(c, off);
      off += c.length;
    }
    return out;
  }

  async function getEntryText(entry, encoding = 'utf-8') {
    return new TextDecoder(encoding).decode(await getEntryBytes(entry));
  }

  return { entries, getEntryStream, getEntryBytes, getEntryText };
}
