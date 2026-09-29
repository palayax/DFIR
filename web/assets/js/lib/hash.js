// SHA-256 row hashing per docs/timeline_schema.json x-determinism.rowHash.
//
// row_hash = lowercase hex SHA-256 over the UTF-8 join of
// [timestamp_utc, timestamp_desc, source, artifact, message, target, host, user]
// with 0x1F (unit separator) between fields.
//
// Uses crypto.subtle so the same code runs unmodified in the browser and under
// `node --test` (Node's WebCrypto implements the same SubtleCrypto interface).

const UNIT_SEPARATOR = '\u001F';
const ROW_HASH_FIELDS = [
  'timestamp_utc', 'timestamp_desc', 'source', 'artifact',
  'message', 'target', 'host', 'user',
];

function getSubtle() {
  const c = globalThis.crypto;
  if (!c || !c.subtle) {
    throw new Error('crypto.subtle is not available in this environment; cannot compute row_hash.');
  }
  return c.subtle;
}

/** Build the canonical unit-separator-joined string used as the hash input. */
export function canonicalRowJoin(record) {
  return ROW_HASH_FIELDS
    .map((field) => (record[field] == null ? '' : String(record[field])))
    .join(UNIT_SEPARATOR);
}

/** SHA-256 of an arbitrary string or byte buffer, as lowercase hex. */
export async function sha256Hex(input) {
  const bytes = typeof input === 'string' ? new TextEncoder().encode(input) : input;
  const digest = await getSubtle().digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Compute the schema's row_hash for a (partial or complete) timeline record. */
export async function computeRowHash(record) {
  return sha256Hex(canonicalRowJoin(record));
}
