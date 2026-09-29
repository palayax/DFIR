// Declarative Velociraptor-artifact -> timeline-record mapping table.
//
// Coverage policy (be honest about confidence, this is a forensics tool):
//   - Entries below marked [CONFIRMED] use column names verified empirically
//     in docs/research/velociraptor-standalone.md (e.g. Generic.Collectors.File's
//     Btime/Mtime/Ctime/Atime/FullPath/Size, sigma()'s _Rule.*, yara()'s Rule/Meta/String).
//   - Entries marked [HEURISTIC] use the column names Velociraptor's own
//     artifact VQL conventionally produces, but were not captured from a live
//     run in this project's research phase. Treat their timestamp_desc/field
//     mapping as best-effort until cross-checked against a real acquisition.
//   - Every artifact NOT in this table — including the dozens more listed in
//     docs/research/velociraptor-standalone.md §3 that aren't curated here —
//     still produces a timeline row via unmappedFallback() in
//     velociraptor-zip.js, which heuristically finds a timestamp-shaped and a
//     path-shaped column. Nothing is ever silently dropped; low-confidence
//     rows are tagged extra.unmapped_artifact = true so the UI can flag them.
//
// A row that carries N applicable timestamp fields (e.g. MFT's 4 MACB times)
// fans out into N timeline records, one per timestamp_desc — this is what
// turns a flat artifact dump into an actual super-timeline (see
// docs/timeline_schema.json's timestamp_desc description).

function getPath(obj, path) {
  if (!path) return undefined;
  return path.split('.').reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

function setPath(obj, path, value) {
  const parts = path.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    cur[parts[i]] = cur[parts[i]] || {};
    cur = cur[parts[i]];
  }
  const leaf = parts[parts.length - 1];
  const numericLeaf = /_(bytes|pid|ppid|id|port|entry|sequence|type|row)$/.test(leaf) || leaf === 'pid' || leaf === 'ppid';
  if (numericLeaf && typeof value === 'string' && /^-?\d+$/.test(value)) {
    cur[leaf] = Number(value);
  } else {
    cur[leaf] = value;
  }
}

function renderTemplate(template, row) {
  return template.replace(/\{([^}]+)\}/g, (_, key) => {
    const v = getPath(row, key);
    return v == null ? '' : String(v);
  });
}

function applyFieldMap(target, fieldMap, row) {
  if (!fieldMap) return;
  for (const [destPath, srcField] of Object.entries(fieldMap)) {
    const val = getPath(row, srcField);
    if (val === undefined || val === null || val === '') continue;
    setPath(target, destPath, val);
  }
}

export const ARTIFACT_MAPPINGS = {
  // --- Filesystem / NTFS -------------------------------------------------
  'Generic.Collectors.File': { // [CONFIRMED] columns per RUN_PLAN research §3
    source: 'filesystem',
    timestampFields: [
      { field: 'Btime', desc: 'Created' },
      { field: 'Mtime', desc: 'Modified' },
      { field: 'Ctime', desc: 'MetadataChanged' },
      { field: 'Atime', desc: 'Accessed' },
    ],
    messageTemplate: 'File collected: {FullPath}',
    targetField: 'FullPath',
    fieldMap: { 'file.path': 'FullPath', 'file.size_bytes': 'Size' },
  },
  'Windows.NTFS.MFT': { // [HEURISTIC]
    source: 'filesystem',
    timestampFields: [
      { field: 'FN_Created0x10', desc: 'Created' },
      { field: 'FN_Modified0x10', desc: 'Modified' },
      { field: 'FN_LastAccess0x10', desc: 'Accessed' },
      { field: 'FN_MFTModified0x10', desc: 'MetadataChanged' },
    ],
    messageTemplate: 'MFT entry {EntryNumber}: {FullPath}',
    targetField: 'FullPath',
    fieldMap: { 'file.path': 'FullPath', 'file.size_bytes': 'FileSize', 'file.mft_entry': 'EntryNumber', 'file.is_directory': 'IsDir' },
  },
  'Windows.Forensics.RecycleBin': { // [HEURISTIC]
    source: 'filesystem',
    timestampFields: [{ field: 'DeletedTime', desc: 'DeletedTime' }],
    messageTemplate: 'Recycle Bin: {FileName} deleted from {OriginalPath}',
    targetField: 'OriginalPath',
    fieldMap: { 'file.path': 'OriginalPath', 'file.name': 'FileName', 'file.size_bytes': 'FileSize' },
  },

  // --- Execution evidence -------------------------------------------------
  'Windows.Forensics.Prefetch': { // [HEURISTIC]
    source: 'execution',
    timestampFields: [
      { field: 'FirstRun', desc: 'FirstExecuted' },
      { field: 'LastRun', desc: 'LastExecuted' },
    ],
    messageTemplate: 'Prefetch: {Executable} ran {RunCount} time(s)',
    targetField: 'Executable',
    fieldMap: { 'file.name': 'Executable' },
  },
  'Windows.Forensics.Amcache': { // [HEURISTIC]
    source: 'execution',
    timestampFields: [{ field: 'LastModified', desc: 'LastWriteTime' }],
    messageTemplate: 'Amcache entry: {FullPath}',
    targetField: 'FullPath',
    fieldMap: { 'file.path': 'FullPath', 'file.size_bytes': 'Size', 'hashes.sha1': 'Sha1' },
  },
  'Windows.Registry.AppCompatCache': { // [HEURISTIC] Shimcache
    source: 'execution',
    timestampFields: [{ field: 'LastModified', desc: 'LastWriteTime' }],
    messageTemplate: 'AppCompatCache (Shimcache): {Path}',
    targetField: 'Path',
    fieldMap: { 'file.path': 'Path' },
  },
  'Windows.Forensics.Bam': { // [HEURISTIC]
    source: 'execution',
    timestampFields: [{ field: 'Time', desc: 'RunTime' }],
    messageTemplate: 'BAM: {Path} executed by {SID}',
    targetField: 'Path',
    fieldMap: { 'file.path': 'Path' },
  },
  'Windows.Registry.UserAssist': { // [HEURISTIC]
    source: 'execution',
    timestampFields: [{ field: 'LastExecution', desc: 'LastExecuted' }],
    messageTemplate: 'UserAssist: {Path} run {RunCount} time(s)',
    targetField: 'Path',
    fieldMap: { 'file.path': 'Path' },
  },

  // --- Event logs ----------------------------------------------------------
  'Windows.EventLogs.Evtx': { // [HEURISTIC]
    source: 'eventlog',
    timestampFields: [{ field: 'System.TimeCreated.SystemTime', desc: 'EventTime' }],
    messageTemplate: 'EventID {System.EventID.Value} ({System.Channel})',
    targetField: 'System.Channel',
    fieldMap: {
      'event.channel': 'System.Channel',
      'event.provider': 'System.Provider.Name',
      'event.event_id': 'System.EventID.Value',
      'event.record_id': 'System.EventRecordID',
      'event.computer': 'System.Computer',
    },
  },
  'Windows.EventLogs.RDPAuth': { // [HEURISTIC]
    source: 'account',
    timestampFields: [{ field: 'EventTime', desc: 'LoginTime' }],
    messageTemplate: 'RDP auth event: user {User} from {SourceIP}',
    targetField: 'User',
    fieldMap: { 'network.src_ip': 'SourceIP' },
  },

  // --- Network ---------------------------------------------------------------
  'Windows.Network.Netstat': { // [HEURISTIC]
    source: 'network',
    timestampFields: [{ field: 'Timestamp', desc: 'EventTime' }],
    messageTemplate: '{Laddr.IP}:{Laddr.Port} -> {Raddr.IP}:{Raddr.Port} ({State})',
    targetField: 'Raddr.IP',
    fieldMap: {
      'network.dst_ip': 'Raddr.IP', 'network.dst_port': 'Raddr.Port',
      'network.src_ip': 'Laddr.IP', 'network.src_port': 'Laddr.Port',
      'network.state': 'State', 'process.pid': 'Pid', 'process.name': 'ProcessName',
    },
  },

  // --- Live state / process ---------------------------------------------------
  'Windows.System.Pslist': { // [HEURISTIC]
    source: 'process',
    timestampFields: [],
    messageTemplate: 'Process {Name} (pid {Pid}, ppid {PPid})',
    targetField: 'CommandLine',
    fieldMap: {
      'process.pid': 'Pid', 'process.ppid': 'PPid', 'process.name': 'Name',
      'process.command_line': 'CommandLine',
    },
  },
  'Windows.System.Services': { // [HEURISTIC]
    source: 'service',
    timestampFields: [],
    messageTemplate: 'Service {Name}: {State} ({PathName})',
    targetField: 'PathName',
    fieldMap: { 'file.path': 'PathName' },
  },
  'Windows.System.TaskScheduler': { // [HEURISTIC]
    source: 'scheduled_task',
    timestampFields: [{ field: 'LastRunTime', desc: 'LastExecuted' }],
    messageTemplate: 'Scheduled task {Name}: {ActionsExec}',
    targetField: 'Path',
    fieldMap: { 'file.path': 'ActionsExec' },
  },
  'Windows.Sys.Users': { // [HEURISTIC]
    source: 'account',
    timestampFields: [{ field: 'LastLogin', desc: 'LoginTime' }],
    messageTemplate: 'User account: {User}',
    targetField: 'User',
    fieldMap: {},
  },

  // --- Persistence -------------------------------------------------------------
  'Windows.Persistence.PowershellProfile': { // [HEURISTIC]
    source: 'persistence',
    timestampFields: [{ field: 'Modified', desc: 'Modified' }],
    messageTemplate: 'PowerShell profile: {FullPath}',
    targetField: 'FullPath',
    fieldMap: { 'file.path': 'FullPath' },
  },
  'Windows.Persistence.PermanentWMIEvents': { // [HEURISTIC]
    source: 'persistence',
    timestampFields: [],
    messageTemplate: 'WMI persistence: {Name}',
    targetField: 'Name',
    fieldMap: {},
  },

  // --- Browsers --------------------------------------------------------------
  'Windows.Applications.Chrome.History': { // [HEURISTIC]
    source: 'browser',
    timestampFields: [{ field: 'VisitTime', desc: 'VisitTime' }],
    messageTemplate: 'Chrome visit: {Title}',
    targetField: 'URL',
    fieldMap: { 'network.url': 'URL' },
  },
  'Windows.Analysis.EvidenceOfDownload': { // [HEURISTIC]
    source: 'browser',
    timestampFields: [{ field: 'Timestamp', desc: 'DownloadTime' }],
    messageTemplate: 'Download evidence: {Path} from {URL}',
    targetField: 'Path',
    fieldMap: { 'file.path': 'Path', 'network.url': 'URL' },
  },

  // --- Detection engines (sigma()/yara() output shape) -----------------------
  // [CONFIRMED] per docs/research/velociraptor-standalone.md §4-5.
  'Custom.IRTriage.Sigma': {
    source: 'detection',
    collector_kind: 'sigma',
    timestampFields: [],
    messageTemplate: 'Sigma match: {_Rule.Title}',
    targetField: '_Rule.Title',
    fieldMap: {},
  },
  'Custom.IRTriage.Yara.Glob': {
    source: 'detection',
    collector_kind: 'yara',
    timestampFields: [],
    messageTemplate: 'YARA match: {Rule} in {File}',
    targetField: 'File',
    fieldMap: { 'file.path': 'File' },
  },
};

/** Map one raw Velociraptor result row for a known artifact into 1..N
 * timeline record skeletons (still missing row_hash — the caller hashes
 * each fanned-out record, since the hash depends on the final timestamp). */
export function mapArtifactRow(artifactName, row, ctx) {
  const spec = ARTIFACT_MAPPINGS[artifactName];
  if (!spec) return null;

  const message = renderTemplate(spec.messageTemplate, row);
  const target = spec.targetField ? String(getPath(row, spec.targetField) ?? '') : undefined;

  const base = {
    schema_version: '1.0.0',
    source: spec.source,
    artifact: artifactName,
    collector_kind: spec.collector_kind || 'velociraptor',
    host: ctx.host || 'unknown-host',
    message,
  };
  if (target) base.target = target;
  if (ctx.hostId) base.host_id = ctx.hostId;
  applyFieldMap(base, spec.fieldMap, row);

  const applicable = (spec.timestampFields || []).filter((tf) => getPath(row, tf.field));
  const timestampList = applicable.length ? applicable : [{ field: null, desc: 'EventTime' }];

  return timestampList.map((tf) => {
    const rec = structuredClone(base);
    const rawTs = tf.field ? getPath(row, tf.field) : undefined;
    rec.timestamp_desc = tf.desc;
    if (tf.field) rec.timestamp_source_field = tf.field;
    rec.provenance = { raw_file: ctx.rawFile, raw_row: ctx.rawRow };
    rec.__rawTimestampValue = rawTs; // consumed by velociraptor-zip.js, stripped before hashing
    return rec;
  });
}

const TS_FIELD_CANDIDATES = [
  'Mtime', 'Timestamp', 'Time', 'EventTime', 'Created', 'Modified', 'ModificationTime',
  'LastWriteTime', 'LastModified', 'CreateTime', 'Btime', 'Ctime', 'Atime', '_Timestamp',
];
const TARGET_FIELD_CANDIDATES = ['FullPath', 'Path', 'FileName', 'Name', 'TargetPath', 'Image', 'CommandLine', 'Url', 'URL'];
const DESC_BY_FIELD = { Mtime: 'Modified', Btime: 'Created', Ctime: 'MetadataChanged', Atime: 'Accessed' };

function summarizeRow(row) {
  const keys = Object.keys(row).slice(0, 4);
  return keys.map((k) => `${k}=${JSON.stringify(row[k])}`).join(', ');
}

/** Safety-net mapping for any artifact not in ARTIFACT_MAPPINGS, so ingest
 * never silently drops an unrecognised artifact's rows. Heuristically finds
 * a timestamp-shaped and a path-shaped column; tags the row as low-confidence. */
export function unmappedFallback(artifactName, row, ctx) {
  const tsField = TS_FIELD_CANDIDATES.find((f) => row[f]);
  const targetField = TARGET_FIELD_CANDIDATES.find((f) => row[f]);
  const record = {
    schema_version: '1.0.0',
    source: 'other',
    artifact: artifactName,
    collector_kind: 'velociraptor',
    host: ctx.host || 'unknown-host',
    timestamp_desc: tsField ? (DESC_BY_FIELD[tsField] || 'EventTime') : 'EventTime',
    message: `${artifactName}: ${summarizeRow(row)}`,
  };
  if (ctx.hostId) record.host_id = ctx.hostId;
  if (targetField) record.target = String(row[targetField]);
  if (tsField) record.timestamp_source_field = tsField;
  record.provenance = { raw_file: ctx.rawFile, raw_row: ctx.rawRow };
  record.extra = { unmapped_artifact: true, raw_row_keys: Object.keys(row).slice(0, 20) };
  record.__rawTimestampValue = tsField ? row[tsField] : undefined;
  return [record];
}
