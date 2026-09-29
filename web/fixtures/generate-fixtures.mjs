// Fixture generator: builds every non-trivial binary/large fixture under
// web/fixtures/ from code, so fixtures never drift from the schema/lib logic
// they're meant to exercise. Run with:
//   node fixtures/generate-fixtures.mjs
// from web/. Deterministic: re-running produces byte-identical output.

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { computeRowHash } from '../assets/js/lib/hash.js';
import { CSV_COLUMNS, recordToCsvRow } from '../assets/js/lib/csv-projection.js';
import { stringifyCsvRow } from '../assets/js/lib/csv.js';
import { buildZip } from '../tests/helpers/zip-writer.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const SOURCES_CYCLE = [
  { source: 'filesystem', artifact: 'Generic.Collectors.File', desc: 'Modified' },
  { source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', desc: 'EventTime' },
  { source: 'registry', artifact: 'Windows.Registry.AppCompatCache', desc: 'LastWriteTime' },
  { source: 'execution', artifact: 'Windows.Forensics.Prefetch', desc: 'LastExecuted' },
  { source: 'network', artifact: 'Windows.Network.Netstat', desc: 'EventTime' },
  { source: 'process', artifact: 'Windows.System.Pslist', desc: 'EventTime' },
];

function pad(n, len = 2) { return String(n).padStart(len, '0'); }

function tsAt(baseMs, index, stepSeconds) {
  const d = new Date(baseMs + index * stepSeconds * 1000);
  const y = d.getUTCFullYear(), mo = pad(d.getUTCMonth() + 1), da = pad(d.getUTCDate());
  const h = pad(d.getUTCHours()), mi = pad(d.getUTCMinutes()), s = pad(d.getUTCSeconds());
  return `${y}-${mo}-${da}T${h}:${mi}:${s}.0000000Z`;
}

/** Build `count` deterministic IRTriage-native timeline records for one host. */
async function buildHostRecords({ host, hostId, count, baseMs, stepSeconds, detectEvery = 13 }) {
  const records = [];
  for (let i = 0; i < count; i++) {
    const cycle = SOURCES_CYCLE[i % SOURCES_CYCLE.length];
    const rec = {
      schema_version: '1.0.0',
      timestamp_utc: tsAt(baseMs, i, stepSeconds),
      timestamp_desc: cycle.desc,
      source: cycle.source,
      artifact: cycle.artifact,
      collector_kind: 'velociraptor',
      host,
      host_id: hostId,
      user: i % 4 === 0 ? 'DOMAIN\\alice' : i % 4 === 1 ? 'DOMAIN\\bob' : 'SYSTEM',
      message: `${cycle.source} event #${i} on ${host}`,
      target: `C:\\evidence\\${cycle.source}\\item-${i}.dat`,
      provenance: { raw_file: `raw/${cycle.artifact}/results.json`, raw_row: i },
    };
    if (i % detectEvery === 0) {
      rec.detections = [
        { engine: 'sigma', rule_id: `SIGMA-${i}`, rule_name: `Suspicious activity ${i}`, severity: i % 26 === 0 ? 'critical' : 'high', mitre_techniques: ['T1059', 'T1059.001'] },
      ];
      if (i % (detectEvery * 2) === 0) {
        rec.detections.push({ engine: 'yara', rule_id: `YARA-${i}`, rule_name: `Malware family ${i}`, severity: 'medium' });
      }
      rec.detection_count = rec.detections.length;
      rec.severity_max = rec.detections.some((d) => d.severity === 'critical') ? 'critical' : 'high';
    }
    rec.row_hash = await computeRowHash(rec);
    records.push(rec);
  }
  return records;
}

function toJsonlText(records) {
  return records.map((r) => JSON.stringify(r)).join('\n') + '\n';
}

function toCsvText(records) {
  const bom = '\uFEFF';
  const header = stringifyCsvRow(CSV_COLUMNS, ',');
  const rows = records.map((r) => stringifyCsvRow(recordToCsvRow(r), ','));
  return bom + [header, ...rows].join('\r\n') + '\r\n';
}

async function buildGenericCsvFixture() {
  // Arbitrary, non-native column names that need interactive mapping, with a
  // deliberately nasty mix of embedded commas/quotes/CRLF and unicode.
  const header = 'EventTime,Workstation,Description,Account\r\n';
  const rows = [
    ['2026-03-15T09:12:03Z', 'FIN-LAPTOP-07', 'User logged on, interactively', 'CORP\\jsmith'],
    ['2026-03-15T09:14:11Z', 'FIN-LAPTOP-07', 'Opened "budget final.xlsx"', 'CORP\\jsmith'],
    ['2026-03-15T09:20:47Z', 'FIN-LAPTOP-07', 'Process started: powershell.exe -enc ABC==', 'CORP\\jsmith'],
    ['2026-03-15T10:02:00Z', 'FIN-LAPTOP-07', 'Multi-line note:\nsecond line of the same field', 'CORP\\jsmith'],
    ['2026-03-15T10:05:19Z', 'FIN-LAPTOP-07', '文件已被访问 — évènement suspect', 'CORP\\jsmith'],
    ['2026-03-15T11:00:00Z', 'FIN-LAPTOP-07', 'Unmapped timestamp column test', ''],
  ];
  const body = rows.map((r) => stringifyCsvRow(r, ',')).join('\r\n');
  return header + body + '\r\n';
}

function stringifyCsvRowSafe(fields) {
  return stringifyCsvRow(fields, ',');
}

async function buildAcquisitionZip() {
  const clientInfo = JSON.stringify({ Hostname: 'WKS-CORP-03', ClientId: 'C.deadbeef1234' });
  const manifest = JSON.stringify({ tool: 'velociraptor', collection_id: 'FIXTURE-COLLECTION-1' });

  const fileRows = [
    { FullPath: 'C:\\Users\\vic\\Downloads\\invoice.exe', Size: 40960, Btime: '2026-04-01T08:00:00Z', Mtime: '2026-04-01T08:05:00Z', Ctime: '2026-04-01T08:05:00Z', Atime: '2026-04-01T08:10:00Z' },
    { FullPath: 'C:\\Windows\\Temp\\update.dll', Size: 20480, Btime: '2026-04-01T08:06:00Z', Mtime: '2026-04-01T08:06:00Z', Ctime: '2026-04-01T08:06:00Z', Atime: '2026-04-01T08:06:00Z' },
  ];
  const sigmaRows = [
    { _Rule: { Title: 'Suspicious PowerShell Encoded Command' }, EventData: { CommandLine: 'powershell -enc ABC==' } },
  ];
  const unknownRows = [
    { Weirdcolumn: 'zz', Timestamp: '2026-04-01T09:00:00Z', Path: 'C:\\oddball\\thing.bin' },
  ];

  const entries = [
    { name: 'manifest.json', data: manifest, method: 'stored' },
    { name: 'client_info.json', data: clientInfo, method: 'stored' },
    { name: `results/${encodeURIComponent('Generic.Collectors.File/All File Info')}.json`, data: JSON.stringify(fileRows), method: 'deflate' },
    { name: `results/${encodeURIComponent('Custom.IRTriage.Sigma/All Sigma Matches')}.json`, data: JSON.stringify(sigmaRows), method: 'deflate' },
    { name: `results/${encodeURIComponent('Custom.Unknown.Artifact/Rows')}.json`, data: JSON.stringify(unknownRows), method: 'stored' },
  ];
  return buildZip(entries);
}

async function main() {
  const host1 = await buildHostRecords({
    host: 'WKS-CORP-01', hostId: 'GUID-HOST-1', count: 200,
    baseMs: Date.UTC(2026, 1, 10, 8, 0, 0), stepSeconds: 41,
  });
  await writeFile(path.join(HERE, 'irtriage-sample.jsonl'), toJsonlText(host1), 'utf8');
  await writeFile(path.join(HERE, 'irtriage-sample.csv'), toCsvText(host1), 'utf8');

  const host2 = await buildHostRecords({
    host: 'WKS-CORP-02', hostId: 'GUID-HOST-2', count: 30,
    baseMs: Date.UTC(2026, 1, 10, 8, 0, 0), stepSeconds: 97, detectEvery: 7,
  });
  await writeFile(path.join(HERE, 'irtriage-sample-host2.jsonl'), toJsonlText(host2), 'utf8');

  await writeFile(path.join(HERE, 'generic-sample.csv'), await buildGenericCsvFixture(), 'utf8');

  const zipBytes = await buildAcquisitionZip();
  await writeFile(path.join(HERE, 'acquisition-sample.zip'), zipBytes);

  console.log('Fixtures written:');
  console.log('  irtriage-sample.jsonl       ', host1.length, 'records');
  console.log('  irtriage-sample.csv         ', host1.length, 'records');
  console.log('  irtriage-sample-host2.jsonl ', host2.length, 'records');
  console.log('  generic-sample.csv');
  console.log('  acquisition-sample.zip      ', zipBytes.length, 'bytes');
}

main();
