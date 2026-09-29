// Minimal ZIP *writer* used only by tests/fixture-generation, to build inputs
// for web/assets/js/lib/unzip.js without depending on a vendored zip library
// (per CLAUDE.md: no vendored deps in shipped app code — this file never
// ships, it only exists under web/tests/).

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

export function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

async function deflateRaw(bytes) {
  const cs = new CompressionStream('deflate-raw');
  const writer = cs.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const chunks = [];
  const reader = cs.readable.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) { out.set(c, off); off += c.length; }
  return out;
}

function u16(n) { return new Uint8Array([n & 0xff, (n >>> 8) & 0xff]); }
function u32(n) {
  return new Uint8Array([n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]);
}
function u64(n) {
  const lo = n % 0x100000000;
  const hi = Math.floor(n / 0x100000000);
  const out = new Uint8Array(8);
  out.set(u32(lo), 0);
  out.set(u32(hi), 4);
  return out;
}

function concat(chunks) {
  const total = chunks.reduce((s, c) => s + c.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) { out.set(c, off); off += c.length; }
  return out;
}

/**
 * Build a ZIP file in memory.
 * entries: [{ name, data: string|Uint8Array, method?: 'stored'|'deflate', forceZip64?: boolean }]
 */
export async function buildZip(entries) {
  const enc = new TextEncoder();
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    const method = entry.method === 'deflate' ? 8 : 0;
    const rawData = typeof entry.data === 'string' ? enc.encode(entry.data) : entry.data;
    const compressedData = method === 8 ? await deflateRaw(rawData) : rawData;
    const nameBytes = enc.encode(entry.name);
    const crc = crc32(rawData);
    const forceZip64 = !!entry.forceZip64;

    let extra = new Uint8Array(0);
    let compSizeField = compressedData.length;
    let uncompSizeField = rawData.length;
    if (forceZip64) {
      compSizeField = 0xffffffff;
      uncompSizeField = 0xffffffff;
      extra = concat([u16(0x0001), u16(16), u64(rawData.length), u64(compressedData.length)]);
    }

    const localHeader = concat([
      u32(0x04034b50), u16(20), u16(0), u16(method), u16(0), u16(0),
      u32(crc), u32(compSizeField), u32(uncompSizeField),
      u16(nameBytes.length), u16(extra.length),
      nameBytes, extra,
    ]);
    const localOffset = offset;
    localParts.push(localHeader, compressedData);
    offset += localHeader.length + compressedData.length;

    let cdOffsetField = localOffset;
    let cdExtra = extra;
    if (forceZip64 || localOffset > 0xffffffff) {
      cdOffsetField = 0xffffffff;
      cdExtra = concat([u16(0x0001), u16(24), u64(rawData.length), u64(compressedData.length), u64(localOffset)]);
    }

    const centralHeader = concat([
      u32(0x02014b50), u16(20), u16(20), u16(0), u16(method), u16(0), u16(0),
      u32(crc), u32(compSizeField), u32(uncompSizeField),
      u16(nameBytes.length), u16(cdExtra.length), u16(0), u16(0), u16(0), u32(0),
      u32(cdOffsetField),
      nameBytes, cdExtra,
    ]);
    centralParts.push(centralHeader);
  }

  const centralDirectory = concat(centralParts);
  const cdOffset = offset;
  const cdSize = centralDirectory.length;

  const anyForced = entries.some((e) => e.forceZip64);
  const tailParts = [];
  if (anyForced) {
    const eocd64Offset = cdOffset + cdSize;
    const eocd64 = concat([
      u32(0x06064b50), u64(44), u16(20), u16(20), u32(0), u32(0),
      u64(entries.length), u64(entries.length), u64(cdSize), u64(cdOffset),
    ]);
    const locator = concat([u32(0x07064b50), u32(0), u64(eocd64Offset), u32(1)]);
    tailParts.push(eocd64, locator);
  }
  const eocd = concat([
    u32(0x06054b50), u16(0), u16(0),
    u16(entries.length), u16(entries.length),
    u32(cdSize), u32(cdOffset > 0xffffffff ? 0xffffffff : cdOffset),
    u16(0),
  ]);
  tailParts.push(eocd);

  return concat([...localParts, centralDirectory, ...tailParts]);
}
