// Merges N parsed sources (each an AsyncIterable/Iterable of timeline
// records, per docs/timeline_schema.json) into one deduplicated,
// deterministically-ordered SuperTimeline.
//
// Design summary (see also the module-level tests in tests/merge.test.mjs):
//
// - Dedupe key = row_hash + '\u0000' + (host_id || ''). row_hash alone is the
//   schema's documented dedupe key, but two different hosts can legitimately
//   produce byte-identical rows (same message/artifact/timestamp) when they
//   happen to share a hostname collision-prone environment; host_id (a
//   stable machine GUID, per the schema) is appended so same-named-but-
//   different hosts are never collapsed into one row. Rows with no host_id
//   fall back to '' and behave exactly as row_hash-only dedupe.
//
// - Clock-skew correction is applied per source (opts on each source entry)
//   BEFORE dedup/sort: the original timestamp is preserved verbatim in
//   extra.original_timestamp_utc and timestamp_utc is shifted by a whole
//   number of seconds (addSecondsToTimestamp keeps sub-second fractional
//   digits exact). row_hash is NEVER recomputed after skew - it is an
//   origin-stamped identity/dedupe marker, not a value derived from the
//   corrected timestamp, so correcting clock skew must not change which rows
//   are considered duplicates of each other.
//
// - When two sources both contribute a row that dedupes together (same
//   row_hash+host_id) but their independently-corrected timestamps differ
//   (e.g. two acquisitions of the same event skew-corrected by different
//   amounts), the MINIMUM corrected timestamp is kept. Min is commutative and
//   associative, so the result is identical no matter what order the sources
//   are processed in - this is what makes 3 runs with the same inputs in
//   different file order produce byte-identical output.
//
// - detections[] are unioned across duplicate rows by identity
//   (engine + (rule_id || rule_name)), with mitre_techniques/mitre_tactics/
//   tags/false_positives unioned and severity taking the max. The unioned
//   array is then sorted by (engine, rule_id, rule_name) so its order never
//   depends on which source happened to be processed first.
//
// - extra.source_file / extra.source_label record provenance. When a
//   deduped row is contributed by more than one source file, these become
//   sorted, deduplicated arrays instead of scalars (again order-independent).
//
// - Final total order is (timestamp_utc, source, artifact, row_hash,
//   host_id) - the schema's own 4-field sort key with host_id appended as a
//   final tiebreaker for the (extremely rare) case of two different hosts
//   producing an otherwise fully-identical tuple. All fields are fixed-width
//   RFC3339 / enum / hex strings, so plain lexicographic string comparison is
//   exactly chronological/deterministic - no locale-aware collation is used
//   anywhere in this module.

import { addSecondsToTimestamp, isUnknownTimestamp } from '../lib/timestamp.js';
import { maxSeverityOf, severityMaxOfDetections, SEVERITY_ORDER } from '../lib/severity.js';

function cmp(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

// Dedupe key = row_hash + host_id.
//
// host_id is included because it is deliberately NOT one of the 8 row_hash inputs,
// so two physically different hosts that share a hostname string would otherwise
// collapse into one row.
//
// The empty-row_hash guard is a safety net against destroying evidence. The client
// used to emit row_hash: "" on unjoined ("orphan") detection records, which made
// every orphan share the key "\0" -- N distinct detections merged into ONE row, and
// the loss was reported as "duplicates removed" so it looked correct. That is fixed
// in the client, but archives produced by an older build still exist, and an
// unhashable record must never be treated as a duplicate of an unrelated one.
//
// Falling back to a per-record synthetic key errs toward keeping too much rather
// than silently dropping evidence, which is the right direction for a forensic tool.
let unhashableCounter = 0;

export function buildDedupeKey(record) {
  const hash = typeof record.row_hash === 'string' ? record.row_hash.trim() : '';
  if (!/^[0-9a-f]{64}$/.test(hash)) {
    unhashableCounter += 1;
    // Derive the key from the fields that actually identify this row, so two
    // genuinely identical unhashed rows still dedupe while two DIFFERENT ones
    // never can. Note this includes the detection identity, which is precisely
    // what distinguished the orphan records that used to collapse.
    const identity = [
      record.timestamp_utc, record.timestamp_desc, record.source, record.artifact,
      record.message, record.target, record.host, record.user,
      (record.detections || []).map((d) => `${d.engine}:${d.rule_id || d.rule_name}`).join(','),
    ].join('\u001f');
    return `unhashed:${identity}\u0000${record.host_id || ''}`;
  }
  return `${hash}\u0000${record.host_id || ''}`;
}

// Exposed for tests: how many records lacked a usable row_hash. Non-zero means the
// input came from a client build predating the orphan-hash fix, and the merge
// statistics should say so rather than quietly compensating.
export function unhashableSeen() {
  return unhashableCounter;
}

export function compareRecords(a, b) {
  return (
    cmp(a.timestamp_utc, b.timestamp_utc) ||
    cmp(a.source, b.source) ||
    cmp(a.artifact, b.artifact) ||
    cmp(a.row_hash, b.row_hash) ||
    cmp(a.host_id || '', b.host_id || '')
  );
}

function uniqSortedUnion(a, b) {
  if (!a && !b) return undefined;
  const set = new Set([...(a || []), ...(b || [])]);
  return set.size ? [...set].sort() : undefined;
}

function stripUndefined(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined) out[k] = v;
  }
  return out;
}

function detectionIdentity(d) {
  return `${d.engine}\u0000${d.rule_id || d.rule_name || ''}`;
}

/** Union two detections[] arrays, merging duplicate rule identities and
 * returning a result whose order never depends on input order. */
export function unionDetections(a = [], b = []) {
  const map = new Map();
  for (const d of [...a, ...b]) {
    const key = detectionIdentity(d);
    if (map.has(key)) {
      const cur = map.get(key);
      cur.severity = maxSeverityOf(cur.severity, d.severity);
      cur.mitre_techniques = uniqSortedUnion(cur.mitre_techniques, d.mitre_techniques);
      cur.mitre_tactics = uniqSortedUnion(cur.mitre_tactics, d.mitre_tactics);
      cur.tags = uniqSortedUnion(cur.tags, d.tags);
      cur.false_positives = uniqSortedUnion(cur.false_positives, d.false_positives);
      for (const f of ['rule_id', 'rule_name', 'rule_author', 'rule_description', 'rule_source', 'match_detail', 'match_offset']) {
        if (cur[f] === undefined && d[f] !== undefined) cur[f] = d[f];
      }
    } else {
      map.set(key, { ...d });
    }
  }
  const out = [...map.values()].map(stripUndefined);
  out.sort((x, y) => cmp(x.engine, y.engine) || cmp(x.rule_id || '', y.rule_id || '') || cmp(x.rule_name || '', y.rule_name || ''));
  return out;
}

function mergeSourceTag(existingExtra, incomingExtra, key) {
  const a = existingExtra[key];
  const b = incomingExtra[key];
  const values = new Set();
  for (const v of Array.isArray(a) ? a : a != null ? [a] : []) values.add(v);
  for (const v of Array.isArray(b) ? b : b != null ? [b] : []) values.add(v);
  if (values.size === 0) return;
  const arr = [...values].sort();
  existingExtra[key] = arr.length === 1 ? arr[0] : arr;
}

/** Apply per-source clock-skew correction and provenance tagging to a raw
 * ingested record. Returns a new record object; never mutates the input. */
export function tagAndCorrect(record, source) {
  const rec = { ...record, extra: { ...(record.extra || {}) } };
  const skewSeconds = source.skewSeconds || 0;

  if (skewSeconds && !isUnknownTimestamp(rec.timestamp_utc)) {
    const corrected = addSecondsToTimestamp(rec.timestamp_utc, skewSeconds);
    if (corrected !== rec.timestamp_utc) {
      rec.extra.original_timestamp_utc = rec.timestamp_utc;
      rec.timestamp_utc = corrected;
    }
  }

  if (source.hostIdOverride && !rec.host_id) rec.host_id = source.hostIdOverride;

  rec.extra.source_file = source.fileName || source.id || 'unknown';
  rec.extra.source_label = source.label || source.fileName || source.id || 'unknown';

  return rec;
}

function mergeInto(existing, incoming) {
  existing.detections = unionDetections(existing.detections, incoming.detections);
  existing.detection_count = existing.detections.length;
  // severity_max is authoritatively derived from the FINAL unioned
  // detections[] (per the schema: "highest severity among detections[], or
  // 'none'"), not merged from each side's possibly-stale/absent severity_max
  // field - that would under-report severity whenever a duplicate row's
  // detections were populated by only one of the two contributing sources.
  existing.severity_max = maxSeverityOf(
    severityMaxOfDetections(existing.detections),
    maxSeverityOf(existing.severity_max || 'none', incoming.severity_max || 'none'),
  );

  mergeSourceTag(existing.extra, incoming.extra, 'source_file');
  mergeSourceTag(existing.extra, incoming.extra, 'source_label');

  if (!existing.host_id && incoming.host_id) existing.host_id = incoming.host_id;

  // Keep the earlier of the two independently skew-corrected timestamps;
  // min() is commutative/associative so this is order-independent.
  if (incoming.timestamp_utc < existing.timestamp_utc) {
    existing.timestamp_utc = incoming.timestamp_utc;
    if (incoming.extra.original_timestamp_utc !== undefined) {
      existing.extra.original_timestamp_utc = incoming.extra.original_timestamp_utc;
    } else {
      delete existing.extra.original_timestamp_utc;
    }
  }

  return existing;
}

function emptySeverityCounts() {
  const out = {};
  for (const s of SEVERITY_ORDER) out[s] = 0;
  return out;
}

function newStats() {
  return {
    perSource: [],
    totalRowsIn: 0,
    totalRowsOut: 0,
    duplicatesRemoved: 0,
    hosts: new Set(),
    sources: new Set(),
    artifacts: new Set(),
    severityCounts: emptySeverityCounts(),
    detectionSeverityCounts: emptySeverityCounts(),
    totalDetections: 0,
    earliestTimestamp: undefined,
    latestTimestamp: undefined,
  };
}

function finalizeStats(stats, records) {
  stats.totalRowsOut = records.length;
  for (const rec of records) {
    stats.hosts.add(rec.host_id ? `${rec.host || ''}\u0000${rec.host_id}` : rec.host || '');
    stats.sources.add(rec.source);
    stats.artifacts.add(rec.artifact);
    stats.severityCounts[rec.severity_max || 'none'] = (stats.severityCounts[rec.severity_max || 'none'] || 0) + 1;
    for (const d of rec.detections || []) {
      stats.totalDetections++;
      stats.detectionSeverityCounts[d.severity] = (stats.detectionSeverityCounts[d.severity] || 0) + 1;
    }
    if (!isUnknownTimestamp(rec.timestamp_utc)) {
      if (!stats.earliestTimestamp || rec.timestamp_utc < stats.earliestTimestamp) stats.earliestTimestamp = rec.timestamp_utc;
      if (!stats.latestTimestamp || rec.timestamp_utc > stats.latestTimestamp) stats.latestTimestamp = rec.timestamp_utc;
    }
  }
  return {
    perSource: stats.perSource,
    totalRowsIn: stats.totalRowsIn,
    totalRowsOut: stats.totalRowsOut,
    duplicatesRemoved: stats.duplicatesRemoved,
    hostCount: stats.hosts.size,
    hosts: [...stats.hosts].map((h) => {
      const [host, hostId] = h.split('\u0000');
      return hostId ? { host, host_id: hostId } : { host };
    }),
    sources: [...stats.sources].sort(),
    artifactCount: stats.artifacts.size,
    artifacts: [...stats.artifacts].sort(),
    severityCounts: stats.severityCounts,
    detectionSeverityCounts: stats.detectionSeverityCounts,
    totalDetections: stats.totalDetections,
    timeSpan: { earliest: stats.earliestTimestamp, latest: stats.latestTimestamp },
  };
}

/**
 * @param {Array<{
 *   id?: string, label?: string, fileName?: string,
 *   records: AsyncIterable<object>|Iterable<object>,
 *   skewSeconds?: number, hostIdOverride?: string,
 * }>} sources
 * @param {{ onProgress?: (p:{sourceIndex:number, sourceCount:number, rowsIn:number})=>void }} [opts]
 * @returns {Promise<{ records: object[], stats: object }>}
 */
export async function mergeSuperTimeline(sources, opts = {}) {
  const merged = new Map();
  const stats = newStats();

  for (let sourceIndex = 0; sourceIndex < sources.length; sourceIndex++) {
    const source = sources[sourceIndex];
    let rowsIn = 0;
    for await (const rawRecord of source.records) {
      rowsIn++;
      stats.totalRowsIn++;
      const rec = tagAndCorrect(rawRecord, source);
      const key = buildDedupeKey(rec);
      if (merged.has(key)) {
        stats.duplicatesRemoved++;
        merged.set(key, mergeInto(merged.get(key), rec));
      } else {
        merged.set(key, rec);
      }
      if (opts.onProgress && rowsIn % 500 === 0) {
        opts.onProgress({ sourceIndex, sourceCount: sources.length, rowsIn });
      }
    }
    stats.perSource.push({
      id: source.id,
      label: source.label,
      fileName: source.fileName,
      rowsIn,
      skewSeconds: source.skewSeconds || 0,
    });
    opts.onProgress?.({ sourceIndex, sourceCount: sources.length, rowsIn, done: true });
  }

  const records = [...merged.values()];
  records.sort(compareRecords);

  return { records, stats: finalizeStats(stats, records) };
}
