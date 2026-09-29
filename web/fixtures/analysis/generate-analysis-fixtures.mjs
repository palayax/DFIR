// web/fixtures/analysis/generate-analysis-fixtures.mjs
//
// Builds web/fixtures/analysis/intrusion-timeline.json: a ~300-row
// deterministic SuperTimeline (single host) telling one intrusion story
// (initial access -> execution -> persistence -> credential access ->
// lateral movement) buried in benign noise, plus a handful of low-fidelity
// "noisy detector" hits scattered through the noise so dismissed_detections
// has something realistic to talk about.
//
// Run with (from web/):  node fixtures/analysis/generate-analysis-fixtures.mjs
// Deterministic: re-running produces byte-identical output, same spirit as
// fixtures/generate-fixtures.mjs (fixtures generated from code, from real
// computeRowHash values, never hand-typed hashes).

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { computeRowHash } from '../../assets/js/lib/hash.js';
import { severityMaxOfDetections } from '../../assets/js/lib/severity.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const HOST = 'WKS-CORP-07';
const HOST_ID = 'GUID-HOST-7';
const BASE_MS = Date.UTC(2026, 2, 1, 8, 0, 0); // 2026-03-01T08:00:00Z
const SPAN_MS = 10 * 24 * 60 * 60 * 1000; // 10 days
const BENIGN_COUNT = 289; // + 11 intrusion rows = 300

function pad(n, len = 2) {
  return String(n).padStart(len, '0');
}

function tsAt(ms) {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const mo = pad(d.getUTCMonth() + 1);
  const da = pad(d.getUTCDate());
  const h = pad(d.getUTCHours());
  const mi = pad(d.getUTCMinutes());
  const s = pad(d.getUTCSeconds());
  return `${y}-${mo}-${da}T${h}:${mi}:${s}.0000000Z`;
}

function baseRecord(msOffset, overrides) {
  return {
    schema_version: '1.0.0',
    timestamp_utc: tsAt(BASE_MS + msOffset),
    host: HOST,
    host_id: HOST_ID,
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// benign noise: cycles through ordinary artifact sources, no detections
// (except a handful of deliberately noisy/low-fidelity hits — see below).
// ---------------------------------------------------------------------------

const BENIGN_CYCLE = [
  {
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', timestamp_desc: 'EventTime', user: 'DOMAIN\\alice',
    message: 'An account was successfully logged on', target: 'Security.evtx',
  },
  {
    source: 'filesystem', artifact: 'Generic.Collectors.File', timestamp_desc: 'Modified', user: 'DOMAIN\\alice',
    message: 'File written', target: 'C:\\Users\\alice\\Documents\\quarterly-report.docx',
    file: { path: 'C:\\Users\\alice\\Documents\\quarterly-report.docx', name: 'quarterly-report.docx' },
  },
  {
    source: 'process', artifact: 'Windows.System.Pslist', timestamp_desc: 'EventTime', user: 'SYSTEM',
    message: 'svchost.exe running', target: 'C:\\Windows\\System32\\svchost.exe',
    process: { name: 'svchost.exe', image_path: 'C:\\Windows\\System32\\svchost.exe' },
  },
  {
    source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'DOMAIN\\alice',
    message: 'Outbound connection to update service', target: '23.45.67.8:443',
    network: { dst_ip: '23.45.67.8', domain: 'updates.contoso-cdn.example', dst_port: 443, direction: 'outbound' },
  },
  {
    source: 'registry', artifact: 'Windows.Registry.AppCompatCache', timestamp_desc: 'LastWriteTime', user: 'SYSTEM',
    message: 'AppCompatCache entry updated', target: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache',
    registry: { key: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache' },
  },
  {
    source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted', user: 'DOMAIN\\alice',
    message: 'OUTLOOK.EXE executed', target: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE',
    process: { name: 'OUTLOOK.EXE', image_path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE' },
  },
];

// A low-fidelity rule that fires on ordinary PowerShell profile loading -
// the kind of over-collection the client deliberately does and the model is
// expected to dismiss with a rationale (see prompts.js rule 4).
function noisyDetection(i) {
  return {
    engine: 'sigma',
    rule_id: 'SIGMA-9001',
    rule_name: 'Non-standard PowerShell Profile Load',
    severity: 'informational',
    mitre_techniques: ['T1059.001'],
  };
}

const EXECUTION_CYCLE_INDEX = BENIGN_CYCLE.findIndex((c) => c.source === 'execution');
const NOISY_DETECTION_STRIDE = 41; // co-prime with BENIGN_CYCLE.length (6) so it lands on every cycle slot in turn

async function buildBenignRows() {
  const rows = [];
  const step = SPAN_MS / BENIGN_COUNT;
  let noisyCount = 0;
  for (let i = 0; i < BENIGN_COUNT; i++) {
    // Force every NOISY_DETECTION_STRIDE'th row onto the execution cycle entry
    // so the low-fidelity rule always has an execution row to fire on,
    // regardless of where that index would otherwise land in the cycle.
    const forceNoisy = i > 0 && i % NOISY_DETECTION_STRIDE === 0;
    const cycle = forceNoisy ? BENIGN_CYCLE[EXECUTION_CYCLE_INDEX] : BENIGN_CYCLE[i % BENIGN_CYCLE.length];
    const rec = baseRecord(Math.round(i * step), {
      collector_kind: 'velociraptor',
      source: cycle.source,
      artifact: cycle.artifact,
      timestamp_desc: cycle.timestamp_desc,
      user: cycle.user,
      message: cycle.message,
      target: cycle.target,
      ...(cycle.file ? { file: cycle.file } : {}),
      ...(cycle.process ? { process: cycle.process } : {}),
      ...(cycle.network ? { network: cycle.network } : {}),
      ...(cycle.registry ? { registry: cycle.registry } : {}),
    });
    if (forceNoisy) {
      rec.detections = [noisyDetection(i)];
      rec.detection_count = rec.detections.length;
      rec.severity_max = severityMaxOfDetections(rec.detections);
      noisyCount += 1;
    }
    rec.row_hash = await computeRowHash(rec);
    rows.push(rec);
  }
  return rows;
}

// ---------------------------------------------------------------------------
// the intrusion story: initial access -> execution -> persistence ->
// credential access -> lateral movement. Stage timestamps deliberately land
// on day 3 (business hours), day 4 (02:xx local/UTC - off-hours, feeds the
// hourly heatmap) and day 5 (03:xx - also off-hours).
// ---------------------------------------------------------------------------

const DAY = 24 * 60 * 60 * 1000;

async function buildIntrusionRows() {
  const specs = [
    // --- Stage 1: initial access (day 3, 09:00-09:01) ---
    {
      offset: 3 * DAY + 60 * 60 * 1000, // day3 09:00
      source: 'filesystem', artifact: 'Generic.Collectors.File', timestamp_desc: 'Created', user: 'DOMAIN\\alice',
      message: 'File created: invoice_march.docm', target: 'C:\\Users\\alice\\Downloads\\invoice_march.docm',
      file: { path: 'C:\\Users\\alice\\Downloads\\invoice_march.docm', name: 'invoice_march.docm' },
    },
    {
      offset: 3 * DAY + 60 * 60 * 1000 + 90 * 1000, // day3 09:01:30
      source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted', user: 'DOMAIN\\alice',
      message: 'WINWORD.EXE spawned powershell.exe -enc <base64>', target: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
      process: { name: 'powershell.exe', image_path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe', parent_name: 'WINWORD.EXE' },
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1001', rule_name: 'Office Application Spawned Suspicious Child Process', severity: 'high', mitre_techniques: ['T1566.001', 'T1204.002'] }],
    },
    // --- Stage 2: execution (day 3, 09:02) ---
    {
      offset: 3 * DAY + 60 * 60 * 1000 + 150 * 1000, // day3 09:02:30
      source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted', user: 'DOMAIN\\alice',
      message: 'Suspicious base64-encoded PowerShell command line observed', target: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
      process: { name: 'powershell.exe', image_path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe', command_line: 'powershell.exe -nop -w hidden -enc <base64 stager>' },
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1002', rule_name: 'Suspicious Encoded PowerShell Command Line', severity: 'high', mitre_techniques: ['T1059.001'] }],
    },
    {
      offset: 3 * DAY + 60 * 60 * 1000 + 180 * 1000, // day3 09:03:00
      source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'DOMAIN\\alice',
      message: 'Outbound HTTPS connection from powershell.exe to previously-unseen domain', target: '185.220.101.42:443',
      network: { dst_ip: '185.220.101.42', domain: 'cdn-update-service.net', dst_port: 443, direction: 'outbound' },
      process: { name: 'powershell.exe', image_path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe' },
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1003', rule_name: 'Network Connection From Suspected Beacon Process', severity: 'medium', mitre_techniques: ['T1071.001'] }],
    },
    // --- Stage 3: persistence (day 3, 09:08-09:10) ---
    {
      offset: 3 * DAY + 60 * 60 * 1000 + 480 * 1000, // day3 09:08:00
      source: 'registry', artifact: 'Windows.Registry.NTUSER', timestamp_desc: 'LastWriteTime', user: 'DOMAIN\\alice',
      message: 'Run key value added: OneDriveUpdater', target: 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\OneDriveUpdater',
      registry: { key: 'HKCU\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\OneDriveUpdater', value: 'C:\\Users\\alice\\AppData\\Roaming\\svchost32.exe' },
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1004', rule_name: 'Persistence via Run Key Pointing to AppData Executable', severity: 'medium', mitre_techniques: ['T1547.001'] }],
    },
    {
      offset: 3 * DAY + 60 * 60 * 1000 + 600 * 1000, // day3 09:10:00
      source: 'scheduled_task', artifact: 'Windows.System.TaskScheduler', timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: 'Scheduled task created: MicrosoftEdgeUpdateTaskMachineCore2', target: 'MicrosoftEdgeUpdateTaskMachineCore2',
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1005', rule_name: 'Scheduled Task Created With Update-Service-Impersonating Name', severity: 'medium', mitre_techniques: ['T1053.005'] }],
    },
    // --- Stage 4: credential access (day 4, 02:30-02:34 - off hours) ---
    {
      offset: 4 * DAY + 2 * 60 * 60 * 1000 + 30 * 60 * 1000, // day4 02:30:00
      source: 'execution', artifact: 'Windows.System.Pslist', timestamp_desc: 'EventTime', user: 'DOMAIN\\alice',
      message: 'rundll32.exe invoked comsvcs.dll MiniDump against lsass.exe', target: 'C:\\Windows\\Temp\\lsass_1.dmp',
      process: { name: 'rundll32.exe', image_path: 'C:\\Windows\\System32\\rundll32.exe', command_line: 'rundll32.exe C:\\Windows\\System32\\comsvcs.dll, MiniDump 672 C:\\Windows\\Temp\\lsass_1.dmp full' },
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1006', rule_name: 'LSASS Memory Dump via comsvcs.dll MiniDump', severity: 'critical', mitre_techniques: ['T1003.001'] }],
    },
    {
      offset: 4 * DAY + 2 * 60 * 60 * 1000 + 32 * 60 * 1000, // day4 02:32:00
      source: 'account', artifact: 'Windows.EventLogs.Evtx', timestamp_desc: 'EventTime', user: 'DOMAIN\\alice',
      message: 'Local administrator account created: svc-support', target: 'svc-support',
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1007', rule_name: 'Local Administrator Account Created Outside Change Window', severity: 'high', mitre_techniques: ['T1136.001'] }],
    },
    {
      offset: 4 * DAY + 2 * 60 * 60 * 1000 + 34 * 60 * 1000, // day4 02:34:00
      source: 'account', artifact: 'Windows.EventLogs.Evtx', timestamp_desc: 'EventTime', user: 'svc-support',
      message: 'Interactive logon using newly created account svc-support', target: 'svc-support',
    },
    // --- Stage 5: lateral movement (day 5, 03:15-03:17 - off hours) ---
    {
      offset: 5 * DAY + 3 * 60 * 60 * 1000 + 15 * 60 * 1000, // day5 03:15:00
      source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'svc-support',
      message: 'SMB connection to peer host WKS-CORP-02', target: '10.0.5.22:445',
      network: { dst_ip: '10.0.5.22', dst_port: 445, direction: 'outbound' },
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1008', rule_name: 'SMB Connection From Recently-Created Account', severity: 'high', mitre_techniques: ['T1021.002'] }],
    },
    {
      offset: 5 * DAY + 3 * 60 * 60 * 1000 + 17 * 60 * 1000, // day5 03:17:00
      source: 'service', artifact: 'Windows.EventLogs.Evtx', timestamp_desc: 'EventTime', user: 'svc-support',
      message: 'Remote service created: WindowsUpdate32', target: 'WindowsUpdate32',
      detections: [{ engine: 'sigma', rule_id: 'SIGMA-1009', rule_name: 'Remote Service Creation Following Lateral SMB Connection', severity: 'high', mitre_techniques: ['T1021.002', 'T1569.002'] }],
    },
  ];

  const rows = [];
  for (const spec of specs) {
    const { offset, ...fields } = spec;
    const rec = baseRecord(offset, { collector_kind: 'velociraptor', ...fields });
    if (rec.detections) {
      rec.detection_count = rec.detections.length;
      rec.severity_max = severityMaxOfDetections(rec.detections);
    }
    rec.row_hash = await computeRowHash(rec);
    rows.push(rec);
  }
  return rows;
}

function sortRows(rows) {
  return rows.slice().sort(
    (a, b) =>
      (a.timestamp_utc || '').localeCompare(b.timestamp_utc || '') ||
      (a.source || '').localeCompare(b.source || '') ||
      (a.artifact || '').localeCompare(b.artifact || '') ||
      (a.row_hash || '').localeCompare(b.row_hash || ''),
  );
}

async function main() {
  const benign = await buildBenignRows();
  const intrusion = await buildIntrusionRows();
  const rows = sortRows([...benign, ...intrusion]);

  await writeFile(path.join(HERE, 'intrusion-timeline.json'), `${JSON.stringify(rows, null, 2)}\n`, 'utf8');

  console.log('Fixture written: intrusion-timeline.json');
  console.log('  total rows:    ', rows.length);
  console.log('  benign rows:   ', benign.length);
  console.log('  intrusion rows:', intrusion.length);
  console.log('  detections:    ', rows.filter((r) => (r.detections || []).length > 0).length);
}

main();
