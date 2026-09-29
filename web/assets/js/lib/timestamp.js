// Timestamp helpers matching docs/timeline_schema.json's x-determinism block:
// RFC3339 UTC, EXACTLY 7 fractional digits, literal 'Z'; unknown => sentinel.

export const UNKNOWN_TS = '0001-01-01T00:00:00.0000000Z';

const SCHEMA_TS_RE = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.(\d{7})Z$/;

/** Format a JS Date as a schema-conformant timestamp string.
 * Sub-millisecond (4th-7th fractional digit) precision is not available from
 * a JS Date, so it is zero-filled; this is documented as a known precision
 * ceiling for anything normalized from generic/foreign sources. */
export function toSchemaTimestamp(date) {
  const pad = (n, len = 2) => String(n).padStart(len, '0');
  const y = pad(date.getUTCFullYear(), 4);
  const mo = pad(date.getUTCMonth() + 1);
  const d = pad(date.getUTCDate());
  const h = pad(date.getUTCHours());
  const mi = pad(date.getUTCMinutes());
  const s = pad(date.getUTCSeconds());
  const ms = pad(date.getUTCMilliseconds(), 3);
  return `${y}-${mo}-${d}T${h}:${mi}:${s}.${ms}0000Z`;
}

/** Best-effort parse of an arbitrary timestamp value (string, epoch ms/seconds,
 * or Date) into the schema format. Returns undefined if it can't be parsed. */
export function normalizeTimestamp(value) {
  if (value == null || value === '') return undefined;
  if (value instanceof Date) {
    return isNaN(value.getTime()) ? undefined : toSchemaTimestamp(value);
  }
  if (typeof value === 'number') {
    // Heuristic: treat values with second-scale magnitude as unix seconds,
    // otherwise as epoch milliseconds.
    const ms = value > 1e12 ? value : value * 1000;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? undefined : toSchemaTimestamp(d);
  }
  const str = String(value).trim();
  if (!str) return undefined;
  if (SCHEMA_TS_RE.test(str)) return str; // already conformant
  const d = new Date(str);
  return isNaN(d.getTime()) ? undefined : toSchemaTimestamp(d);
}

/** Shift a schema timestamp by a whole number of seconds (clock-skew
 * correction). The sentinel is left untouched. Sub-second fractional digits
 * are preserved exactly since the shift only ever operates on whole seconds. */
export function addSecondsToTimestamp(ts, seconds) {
  if (!seconds || ts === UNKNOWN_TS) return ts;
  const m = SCHEMA_TS_RE.exec(ts);
  if (!m) return ts;
  const [, Y, Mo, D, H, Mi, S, Frac] = m;
  const baseMs = Date.UTC(+Y, +Mo - 1, +D, +H, +Mi, +S);
  const shifted = new Date(baseMs + seconds * 1000);
  return `${toSchemaTimestamp(shifted).slice(0, 19)}.${Frac}Z`;
}

export function isUnknownTimestamp(ts) {
  return ts === UNKNOWN_TS;
}
