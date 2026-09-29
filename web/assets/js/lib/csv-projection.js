// The timeline.csv projection: flattening nested schema fields with '_' and
// joining arrays with '; ', exactly as docs/timeline_schema.json's
// x-csv-projection block defines. This module is the single source of truth
// for that flatten/unflatten logic so merge/export.js (record -> CSV) and
// ingest/irtriage-csv.js (CSV -> record) can never drift apart.
//
// CSV is a lossy *projection* of the schema (only the columns below survive;
// this is a documented property of the contract, not a bug here): most
// per-detection fields beyond rule_name/severity, and every field with no
// dedicated column (registry.hive, event.record_id, provenance.collection_id,
// process.integrity_level, ...) are not round-trippable through CSV. Use the
// native JSONL ingest for full fidelity; CSV is for analyst tooling.

import { severityMaxOfDetections } from './severity.js';

export const CSV_COLUMNS = [
  'timestamp_utc', 'timestamp_desc', 'source', 'artifact', 'collector_kind',
  'host', 'user', 'message', 'target',
  'severity_max', 'detection_count', 'detection_rules', 'detection_engines',
  'mitre_techniques', 'detection_severities',
  'file_path', 'file_size_bytes', 'file_extension', 'file_signature_status',
  'hash_sha256', 'hash_md5',
  'process_pid', 'process_ppid', 'process_name', 'process_command_line', 'process_parent_name',
  'event_channel', 'event_id', 'event_provider', 'event_logon_type',
  'registry_key', 'registry_value_name', 'registry_value_data',
  'network_dst_ip', 'network_dst_port', 'network_domain', 'network_url', 'network_direction',
  'provenance_raw_file', 'provenance_raw_row', 'row_hash',
];

const JOIN = '; ';

function uniq(arr) {
  return [...new Set(arr)];
}

function toInt(v) {
  if (v === '' || v == null) return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : undefined;
}

function setIfPresent(obj, key, value) {
  if (value !== '' && value !== undefined && value !== null) obj[key] = value;
}

/** timeline record (per docs/timeline_schema.json) -> ordered array of CSV
 * field values, per CSV_COLUMNS. */
export function recordToCsvRow(record) {
  const detections = record.detections || [];
  const detection_rules = detections.map((d) => d.rule_name ?? '').join(JOIN);
  const detection_engines = uniq(detections.map((d) => d.engine ?? '')).join(JOIN);
  const detection_severities = detections.map((d) => d.severity ?? '').join(JOIN);
  const mitre_techniques = uniq(detections.flatMap((d) => d.mitre_techniques || [])).sort().join(JOIN);

  const map = {
    timestamp_utc: record.timestamp_utc ?? '',
    timestamp_desc: record.timestamp_desc ?? '',
    source: record.source ?? '',
    artifact: record.artifact ?? '',
    collector_kind: record.collector_kind ?? '',
    host: record.host ?? '',
    user: record.user ?? '',
    message: record.message ?? '',
    target: record.target ?? '',
    severity_max: record.severity_max ?? severityMaxOfDetections(detections),
    detection_count: record.detection_count ?? detections.length ?? 0,
    detection_rules,
    detection_engines,
    mitre_techniques,
    detection_severities,
    file_path: record.file?.path ?? '',
    file_size_bytes: record.file?.size_bytes ?? '',
    file_extension: record.file?.extension ?? '',
    file_signature_status: record.file?.signature_status ?? '',
    hash_sha256: record.hashes?.sha256 ?? '',
    hash_md5: record.hashes?.md5 ?? '',
    process_pid: record.process?.pid ?? '',
    process_ppid: record.process?.ppid ?? '',
    process_name: record.process?.name ?? '',
    process_command_line: record.process?.command_line ?? '',
    process_parent_name: record.process?.parent_name ?? '',
    event_channel: record.event?.channel ?? '',
    event_id: record.event?.event_id ?? '',
    event_provider: record.event?.provider ?? '',
    event_logon_type: record.event?.logon_type ?? '',
    registry_key: record.registry?.key ?? '',
    registry_value_name: record.registry?.value_name ?? '',
    registry_value_data: record.registry?.value_data ?? '',
    network_dst_ip: record.network?.dst_ip ?? '',
    network_dst_port: record.network?.dst_port ?? '',
    network_domain: record.network?.domain ?? '',
    network_url: record.network?.url ?? '',
    network_direction: record.network?.direction ?? '',
    provenance_raw_file: record.provenance?.raw_file ?? '',
    provenance_raw_row: record.provenance?.raw_row ?? '',
    row_hash: record.row_hash ?? '',
  };
  return CSV_COLUMNS.map((c) => map[c] ?? '');
}

/** Reverse of recordToCsvRow: a { columnName: stringValue } row object ->
 * a (partial) timeline record. Best-effort per-detection engine/MITRE
 * reconstruction where the projection is inherently lossy (see module doc). */
export function csvRowToRecord(rowObj) {
  const ruleNames = rowObj.detection_rules ? rowObj.detection_rules.split(JOIN) : [];
  const severities = rowObj.detection_severities ? rowObj.detection_severities.split(JOIN) : [];
  const engines = rowObj.detection_engines ? rowObj.detection_engines.split(JOIN) : [];

  let detections;
  if (ruleNames.length > 0) {
    detections = ruleNames.map((name, i) => {
      let engine;
      if (engines.length === 1) engine = engines[0];
      else if (engines.length === ruleNames.length) engine = engines[i];
      else engine = engines[0] || 'sigma';
      return { engine, rule_name: name, severity: severities[i] || 'medium' };
    });
  }

  const record = {
    schema_version: '1.0.0',
    row_hash: rowObj.row_hash,
    timestamp_utc: rowObj.timestamp_utc,
    timestamp_desc: rowObj.timestamp_desc,
    source: rowObj.source,
    artifact: rowObj.artifact,
    host: rowObj.host,
    message: rowObj.message,
  };
  setIfPresent(record, 'collector_kind', rowObj.collector_kind);
  setIfPresent(record, 'user', rowObj.user);
  setIfPresent(record, 'target', rowObj.target);
  if (rowObj.severity_max) record.severity_max = rowObj.severity_max;
  if (detections) {
    record.detections = detections;
    record.detection_count = detections.length;
  } else if (rowObj.detection_count) {
    const dc = toInt(rowObj.detection_count);
    if (dc !== undefined) record.detection_count = dc;
  }

  const file = {};
  setIfPresent(file, 'path', rowObj.file_path);
  const size = toInt(rowObj.file_size_bytes);
  if (size !== undefined) file.size_bytes = size;
  setIfPresent(file, 'extension', rowObj.file_extension);
  setIfPresent(file, 'signature_status', rowObj.file_signature_status);
  if (Object.keys(file).length) record.file = file;

  const hashes = {};
  setIfPresent(hashes, 'sha256', rowObj.hash_sha256);
  setIfPresent(hashes, 'md5', rowObj.hash_md5);
  if (Object.keys(hashes).length) record.hashes = hashes;

  const process = {};
  const pid = toInt(rowObj.process_pid);
  if (pid !== undefined) process.pid = pid;
  const ppid = toInt(rowObj.process_ppid);
  if (ppid !== undefined) process.ppid = ppid;
  setIfPresent(process, 'name', rowObj.process_name);
  setIfPresent(process, 'command_line', rowObj.process_command_line);
  setIfPresent(process, 'parent_name', rowObj.process_parent_name);
  if (Object.keys(process).length) record.process = process;

  const event = {};
  setIfPresent(event, 'channel', rowObj.event_channel);
  const eventId = toInt(rowObj.event_id);
  if (eventId !== undefined) event.event_id = eventId;
  setIfPresent(event, 'provider', rowObj.event_provider);
  const logonType = toInt(rowObj.event_logon_type);
  if (logonType !== undefined) event.logon_type = logonType;
  if (Object.keys(event).length) record.event = event;

  const registry = {};
  setIfPresent(registry, 'key', rowObj.registry_key);
  setIfPresent(registry, 'value_name', rowObj.registry_value_name);
  setIfPresent(registry, 'value_data', rowObj.registry_value_data);
  if (Object.keys(registry).length) record.registry = registry;

  const network = {};
  setIfPresent(network, 'dst_ip', rowObj.network_dst_ip);
  const dstPort = toInt(rowObj.network_dst_port);
  if (dstPort !== undefined) network.dst_port = dstPort;
  setIfPresent(network, 'domain', rowObj.network_domain);
  setIfPresent(network, 'url', rowObj.network_url);
  setIfPresent(network, 'direction', rowObj.network_direction);
  if (Object.keys(network).length) record.network = network;

  const provenance = {};
  setIfPresent(provenance, 'raw_file', rowObj.provenance_raw_file);
  const rawRow = toInt(rowObj.provenance_raw_row);
  if (rawRow !== undefined) provenance.raw_row = rawRow;
  if (Object.keys(provenance).length) record.provenance = provenance;

  return record;
}
