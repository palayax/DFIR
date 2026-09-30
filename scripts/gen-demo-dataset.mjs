#!/usr/bin/env node
// scripts/gen-demo-dataset.mjs
//
// Generates web/demo/: a self-contained, SYNTHETIC, forensically coherent
// demo incident that the published web app can load in one click, so an
// evaluator landing on https://palayax.github.io/DFIR/ sees a real
// SuperTimeline instead of an empty console.
//
// Output shape (all plain ES modules, no build step, no runtime deps):
//
//   web/demo/manifest.js          -> export const manifest = { ... }
//   web/demo/host-<slug>.js       -> export const rows = [ ...timeline records... ]
//
// Why ES modules and not .jsonl files fetched over HTTP:
//   - `fetch()` of a same-directory file is blocked from `file://` in Chrome,
//     and docs/WEB_APP.md tells analysts to open index.html from disk for
//     air-gapped work. A dynamic import() is exactly as available as the app's
//     OWN modules -- if the app loads at all, the demo payload loads too.
//   - One copy of the data. A .jsonl mirror would be a second source of truth
//     that can silently drift from the module the loader actually reads.
//   The loader (web/assets/js/demo/index.js) turns the rows back into JSONL
//   text and wraps it in a File, so the demo still flows through the REAL
//   ingest path (ingest/irtriage-jsonl.js detect() + parse()) and the real
//   merge path. Nothing is shortcut.
//
// Naming gotcha: the repo's .gitignore excludes `*_timeline.jsonl`,
// `timeline.jsonl` and `*_timeline.csv` (so a real collection can never be
// committed). Demo payload file names must therefore NOT match those globs --
// hence `host-<slug>.js` and the in-browser file name `<HOST>-demo.jsonl`.
//
// Determinism: no Date.now(), no Math.random(), no map-iteration order. All
// randomness is a seeded mulberry32 PRNG. Running this twice produces
// byte-identical output; web/tests/demo.test.mjs re-derives every row_hash.
//
// Run with:
//   node scripts/gen-demo-dataset.mjs            # regenerate web/demo/
//   node scripts/gen-demo-dataset.mjs --check     # fail if web/demo/ is stale,
//                                                 # writing nothing. This is what
//                                                 # build/build.ps1 gates on.

import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import { computeRowHash, sha256Hex } from '../web/assets/js/lib/hash.js';
import { severityMaxOfDetections } from '../web/assets/js/lib/severity.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(HERE, '..', 'web', 'demo');

// --- argument handling ------------------------------------------------------
// UNKNOWN ARGUMENTS ARE REFUSED, and that is the point of this block. This
// script used to ignore argv completely, which meant `--check` was accepted and
// then wrote the files regardless -- a flag doing the exact opposite of its
// name, with exit 0. Silently ignoring an argument you do not understand turns
// every typo into a wrong action that reports success, so a gate built on it
// reports PASS while verifying nothing.
const ARGS = process.argv.slice(2);
const CHECK_ONLY = ARGS.includes('--check');
{
  const unknown = ARGS.filter((a) => a !== '--check');
  if (unknown.length) {
    console.error(`gen-demo-dataset: unknown argument(s): ${unknown.join(' ')}`);
    console.error('usage: node scripts/gen-demo-dataset.mjs [--check]');
    process.exit(2);
  }
}

const SCHEMA_VERSION = '1.0.0';
const SENTINEL_TS = '0001-01-01T00:00:00.0000000Z';

// ---------------------------------------------------------------------------
// deterministic helpers
// ---------------------------------------------------------------------------

/** mulberry32: tiny, fast, fully deterministic PRNG. */
function makeRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pad(n, len = 2) {
  return String(n).padStart(len, '0');
}

/** RFC3339 UTC with EXACTLY 7 fractional digits and a literal Z. */
function tsAt(ms) {
  const d = new Date(ms);
  const frac = `${pad(d.getUTCMilliseconds(), 3)}0000`;
  return (
    `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}` +
    `T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}.${frac}Z`
  );
}

/** Parse a compact 'YYYY-MM-DDTHH:MM:SS(.mmm)Z' literal to epoch ms. */
function at(iso) {
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) throw new Error(`bad timestamp literal: ${iso}`);
  return ms;
}

const DAY = 86400000;
const HOUR = 3600000;
const MIN = 60000;

// ---------------------------------------------------------------------------
// synthetic identifiers
//
// Everything below is invented. Hosts follow the repo's existing fixture style
// (WKS-CORP-01/02, alice, bob, carol). Every externally-routable IP is from an
// RFC 5737 documentation range (192.0.2/24, 198.51.100/24, 203.0.113/24) and
// every DNS name ends in the RFC 2606 reserved TLD `.example`, so nothing here
// can resolve to, or be mistaken for, a real organisation.
//
// Environment shape: ONE Active Directory forest, TWO domains -- the shape of
// the GOAD-Light lab this demo is a stand-in for, so the narrative includes a
// CROSS-DOMAIN escalation step across the parent/child trust:
//
//   corp.example      (forest root, NetBIOS CORP)  -- DC-CORP-01
//   eu.corp.example   (child domain,  NetBIOS EU)  -- WKS-CORP-01, SRV-CORP-FS02
//
// Windows only, deliberately: IRTriage.exe is GOOS=windows with an embedded
// requireAdministrator PE manifest and there is no Linux collector in the
// product, so a demo showing Linux evidence would advertise a capability that
// does not exist.
//
// EXTENDING THIS: the generator is table-driven. A new collected host is one
// entry in HOSTS[] plus a benign-template set keyed by its `kind` in
// BENIGN_TEMPLATES, plus (optionally) incident rows in INCIDENT_SPECS keyed by
// host name. Nothing else needs to change. Cloud evidence is deliberately NOT
// pre-empted here: it needs new `source` enum values and a nested `cloud`
// object in docs/timeline_schema.json, which is owned elsewhere.
// ---------------------------------------------------------------------------

const FOREST = {
  name: 'corp.example',
  domains: [
    { dns: 'corp.example', netbios: 'CORP', role: 'forest root domain' },
    { dns: 'eu.corp.example', netbios: 'EU', role: 'child domain (parent/child transitive trust to corp.example)' },
  ],
  trust: 'eu.corp.example -> corp.example (parent/child, transitive, two-way)',
};

const HOSTS = [
  {
    name: 'WKS-CORP-01',
    slug: 'wks-corp-01',
    host_id: '4f1c0a9e-0001-4a00-9c31-b0de51000001',
    os: 'Windows 11 Pro 23H2',
    domain: 'eu.corp.example',
    role: 'Finance workstation in the child domain (patient zero)',
    ip: '10.0.5.41',
    kind: 'windows-workstation',
    benign: 900,
    seed: 0x1a2b3c01,
    primaryUser: 'EU\\alice',
  },
  {
    name: 'SRV-CORP-FS02',
    slug: 'srv-corp-fs02',
    host_id: '4f1c0a9e-0002-4a00-9c31-b0de51000002',
    os: 'Windows Server 2022 Standard',
    domain: 'eu.corp.example',
    role: 'Child-domain file server (staging, cross-domain pivot, exfiltration point)',
    ip: '10.0.5.20',
    kind: 'windows-server',
    benign: 700,
    seed: 0x1a2b3c02,
    primaryUser: 'EU\\svc-backup',
  },
  {
    name: 'DC-CORP-01',
    slug: 'dc-corp-01',
    host_id: '4f1c0a9e-0003-4a00-9c31-b0de51000003',
    os: 'Windows Server 2022 Datacenter',
    domain: 'corp.example',
    role: 'Forest-root domain controller (corp.example)',
    ip: '10.0.10.10',
    kind: 'windows-dc',
    benign: 700,
    seed: 0x1a2b3c03,
    primaryUser: 'CORP\\Administrator',
  },
];

// Internal infrastructure that rows reference. Kept in the manifest so the test
// can assert every internal IP a row mentions is a known asset -- an IP that
// belongs to nothing is exactly the kind of incoherence this demo must not have.
const INTERNAL_ASSETS = [
  { ip: '10.0.5.9', label: 'PRX-CORP-01 (outbound web proxy, child site)' },
  { ip: '10.0.5.10', label: 'DC-EU-01 (child-domain controller -- referenced by evidence, NOT collected)' },
  { ip: '10.0.5.15', label: 'JMP-CORP-01 (admin jump host)' },
  { ip: '10.0.5.20', label: 'SRV-CORP-FS02 (child-domain file server, collected)' },
  { ip: '10.0.5.41', label: 'WKS-CORP-01 (finance workstation, collected)' },
  { ip: '10.0.5.42', label: 'WKS-CORP-02 (finance workstation, not collected)' },
  { ip: '10.0.10.10', label: 'DC-CORP-01 (forest-root domain controller, collected)' },
  { ip: '10.0.10.14', label: 'SRV-CORP-BK01 (backup server, root site)' },
];

const ATTACKER_IPS = [
  { ip: '192.0.2.61', label: 'Phishing mail relay that delivered the lure' },
  { ip: '198.51.100.24', label: 'Lure download host and first-stage C2 (TLS 443)' },
  { ip: '203.0.113.77', label: 'Second-stage C2 reached from SRV-CORP-FS02' },
  { ip: '203.0.113.142', label: 'Exfiltration endpoint (3.4 GB outbound)' },
];

const ATTACKER_DOMAINS = [
  { domain: 'invoices.billing-portal.example', label: 'Lure download host' },
  { domain: 'cdn-sync-updates.example', label: 'First-stage C2 (update-service impersonation)' },
  { domain: 'sync-relay.example', label: 'Second-stage C2 reached from SRV-CORP-FS02' },
  { domain: 'files-transfer-node.example', label: 'Exfiltration endpoint' },
];

const BENIGN_DOMAINS = [
  'intranet.corp.example',
  'updates.corp.example',
  'wsus.corp.example',
  'mail.corp.example',
  'sharepoint.corp.example',
  'dc-corp-01.corp.example',
  'dc-eu-01.eu.corp.example',
  'srv-corp-fs02.eu.corp.example',
];

const USER_ROLES = [
  ['EU\\alice', 'Finance analyst on WKS-CORP-01. Opened the lure attachment; her token was used for initial execution and domain discovery.'],
  ['EU\\bob', 'Child-domain IT support technician. Benign administrative activity only -- and the source of most dismissible detections.'],
  ['EU\\carol', 'Finance manager. Benign file-share activity only.'],
  ['EU\\Administrator', 'Child-domain administrator. Benign scheduled maintenance only.'],
  ['EU\\svc-backup', 'Child-domain backup service account. Kerberoasted, then recovered from an LSASS dump and reused for lateral movement and the cross-domain step.'],
  ['EU\\WKS-CORP-01$', 'Computer account of the workstation.'],
  ['EU\\SRV-CORP-FS02$', 'Computer account of the file server.'],
  ['CORP\\Administrator', 'Forest-root domain administrator. Benign maintenance only.'],
  ['CORP\\svc-support', 'Account CREATED BY THE ATTACKER in the FOREST ROOT domain and added to Enterprise Admins.'],
  ['CORP\\DC-CORP-01$', 'Computer account of the forest-root domain controller.'],
  ['SYSTEM', 'Local SYSTEM principal.'],
  ['LOCAL SERVICE', 'Local LOCAL SERVICE principal.'],
  ['NETWORK SERVICE', 'Local NETWORK SERVICE principal.'],
];

// ---------------------------------------------------------------------------
// synthetic file hashes: derived, never hand-typed, so they are reproducible
// and so the SAME artefact carries the SAME hash on every host it appears on
// (that cross-host equality is one of the things the demo is meant to show).
// ---------------------------------------------------------------------------

const HASH_LABELS = [
  ['lure_xlsm', 'Invoice_Q1_2026.xlsm', 'Macro-enabled lure attachment'],
  ['dropper_js', 'inv8841.js', 'WScript dropper written by the macro'],
  ['implant', 'updatesvc.exe', 'First-stage implant (also deployed as upd.exe on SRV-CORP-FS02)'],
  ['adq', 'adq.exe', 'AD enumeration utility staged in the user temp directory'],
  ['roast', 'svcq.exe', 'Kerberos service-ticket harvesting tool'],
  ['lsass_dmp', 'ls.dmp', 'LSASS process minidump'],
  ['sidinj', 'kt.exe', 'Credential/ticket manipulation tool used for the cross-domain step'],
  ['archiver', 'a.exe', 'Renamed archive utility used to stage finance data'],
  ['stage_archive', 'fin-2026Q1.7z', 'Encrypted staging archive (3.4 GB)'],
  ['procdump', 'procdump.exe', 'Signed Sysinternals ProcDump used legitimately by IT (dismissible detection)'],
];

const HASHES = {}; // key -> { sha256, sha1, md5, fileName, label }

async function buildHashes() {
  for (const [key, fileName, label] of HASH_LABELS) {
    const sha256 = await sha256Hex(`irtriage-demo-sha256:${key}`);
    const sha1 = (await sha256Hex(`irtriage-demo-sha1:${key}`)).slice(0, 40);
    const md5 = (await sha256Hex(`irtriage-demo-md5:${key}`)).slice(0, 32);
    HASHES[key] = { sha256, sha1, md5, fileName, label };
  }
}

function h(key) {
  const entry = HASHES[key];
  if (!entry) throw new Error(`unknown hash key ${key}`);
  return { md5: entry.md5, sha1: entry.sha1, sha256: entry.sha256 };
}

// ---------------------------------------------------------------------------
// record construction
//
// Keys are emitted in schema property order so JSON.stringify() is stable, and
// `extra` keys are sorted (the schema requires that for byte-stable output).
// ---------------------------------------------------------------------------

const TOP_ORDER = [
  'schema_version', 'row_hash', 'timestamp_utc', 'timestamp_desc', 'timestamp_source_field',
  'source', 'artifact', 'collector_kind', 'host', 'host_id', 'user', 'message', 'target',
  'file', 'hashes', 'process', 'network', 'registry', 'event',
  'detections', 'severity_max', 'detection_count', 'provenance', 'extra',
];

const NESTED_ORDER = {
  file: ['path', 'name', 'extension', 'size_bytes', 'attributes', 'mft_entry', 'mft_sequence', 'is_directory', 'is_allocated', 'ads_name', 'signature_status', 'signer'],
  hashes: ['md5', 'sha1', 'sha256'],
  process: ['pid', 'ppid', 'name', 'image_path', 'command_line', 'parent_name', 'parent_command_line', 'integrity_level', 'session_id', 'user'],
  network: ['src_ip', 'src_port', 'dst_ip', 'dst_port', 'protocol', 'domain', 'url', 'direction', 'state'],
  registry: ['key', 'value_name', 'value_data', 'value_type', 'hive'],
  event: ['channel', 'provider', 'event_id', 'record_id', 'level', 'computer', 'logon_type', 'logon_id'],
  provenance: ['raw_file', 'raw_row', 'collection_id'],
  detection: ['engine', 'rule_id', 'rule_name', 'severity', 'rule_author', 'rule_description', 'rule_source', 'mitre_techniques', 'mitre_tactics', 'tags', 'false_positives', 'match_detail', 'match_offset'],
};

function orderObject(obj, keys, what) {
  const out = {};
  for (const k of keys) if (obj[k] !== undefined) out[k] = obj[k];
  for (const k of Object.keys(obj)) {
    if (!keys.includes(k)) throw new Error(`${what}: unexpected key "${k}" (not in docs/timeline_schema.json)`);
  }
  return out;
}

function sortKeys(obj) {
  const out = {};
  for (const k of Object.keys(obj).sort()) out[k] = obj[k];
  return out;
}

/**
 * Build one timeline record. `spec.ms` (epoch ms) or `spec.timestamp_utc`
 * (for the unknown-time sentinel) fixes the time; everything else maps
 * straight onto the schema.
 */
async function mkRow(host, spec) {
  const rec = {
    schema_version: SCHEMA_VERSION,
    timestamp_utc: spec.timestamp_utc ?? tsAt(spec.ms),
    timestamp_desc: spec.timestamp_desc,
    source: spec.source,
    artifact: spec.artifact,
    collector_kind: spec.collector_kind ?? 'velociraptor',
    host: host.name,
    host_id: host.host_id,
    message: spec.message,
  };
  if (spec.timestamp_source_field) rec.timestamp_source_field = spec.timestamp_source_field;
  if (spec.user) rec.user = spec.user;
  if (spec.target) rec.target = spec.target;
  if (spec.file) rec.file = orderObject(spec.file, NESTED_ORDER.file, 'file');
  if (spec.hashes) rec.hashes = orderObject(spec.hashes, NESTED_ORDER.hashes, 'hashes');
  if (spec.process) rec.process = orderObject(spec.process, NESTED_ORDER.process, 'process');
  if (spec.network) rec.network = orderObject(spec.network, NESTED_ORDER.network, 'network');
  if (spec.registry) rec.registry = orderObject(spec.registry, NESTED_ORDER.registry, 'registry');
  if (spec.event) rec.event = orderObject(spec.event, NESTED_ORDER.event, 'event');
  if (spec.detections && spec.detections.length) {
    rec.detections = spec.detections.map((d) => orderObject(d, NESTED_ORDER.detection, 'detection'));
    rec.severity_max = severityMaxOfDetections(rec.detections);
    rec.detection_count = rec.detections.length;
  } else {
    rec.detections = [];
    rec.severity_max = 'none';
    rec.detection_count = 0;
  }
  if (spec.extra) rec.extra = sortKeys(spec.extra);

  // Provenance: every row must be traceable back to a raw acquisition file.
  // raw_row is a per-(host, artifact) counter in GENERATION order, which is
  // deterministic and mirrors reality -- raw result files are not sorted by
  // time, the timeline is. provenance is not one of the 8 row_hash inputs, so
  // assigning it here cannot perturb the hash.
  const provKey = `${host.name}|${spec.artifact}`;
  const rawRow = RAW_ROW_COUNTERS.get(provKey) ?? 0;
  RAW_ROW_COUNTERS.set(provKey, rawRow + 1);
  rec.provenance = {
    raw_file: `raw/${spec.artifact}/results.json`,
    raw_row: rawRow,
    collection_id: `demo-${host.slug}`,
  };

  rec.row_hash = await computeRowHash(rec);
  const ordered = orderObject(rec, TOP_ORDER, 'record');
  if (spec.label) LABELLED.set(spec.label, ordered.row_hash);
  return ordered;
}

/** label -> row_hash, so the manifest narrative can cite real evidence rows. */
const LABELLED = new Map();

/** `${host}|${artifact}` -> next provenance.raw_row index. */
const RAW_ROW_COUNTERS = new Map();

// ---------------------------------------------------------------------------
// detection helpers
// ---------------------------------------------------------------------------

let sigmaSeq = 0;
function sigma(name, severity, techniques, opts = {}) {
  sigmaSeq += 1;
  return {
    engine: 'sigma',
    rule_id: `demo-sigma-${pad(sigmaSeq, 4)}`,
    rule_name: name,
    severity,
    rule_author: 'IRTriage demo rule pack',
    rule_description: opts.description ?? name,
    rule_source: 'sigma:demo-pack',
    mitre_techniques: techniques,
    ...(opts.tactics ? { mitre_tactics: opts.tactics } : {}),
    ...(opts.falsePositives ? { false_positives: opts.falsePositives } : {}),
    ...(opts.matchDetail ? { match_detail: opts.matchDetail } : {}),
  };
}

let yaraSeq = 0;
function yara(name, severity, techniques, opts = {}) {
  yaraSeq += 1;
  return {
    engine: 'yara',
    rule_id: `demo-yara-${pad(yaraSeq, 4)}`,
    rule_name: name,
    severity,
    rule_author: 'IRTriage demo rule pack',
    rule_description: opts.description ?? name,
    rule_source: 'yara:demo-pack',
    mitre_techniques: techniques,
    ...(opts.matchDetail ? { match_detail: opts.matchDetail } : {}),
    ...(opts.matchOffset !== undefined ? { match_offset: opts.matchOffset } : {}),
  };
}

let hayaSeq = 0;
function hayabusa(name, severity, techniques, opts = {}) {
  hayaSeq += 1;
  return {
    engine: 'hayabusa',
    rule_id: `demo-haya-${pad(hayaSeq, 4)}`,
    rule_name: name,
    severity,
    rule_author: 'IRTriage demo rule pack',
    rule_description: opts.description ?? name,
    rule_source: 'hayabusa:demo-pack',
    mitre_techniques: techniques,
    ...(opts.matchDetail ? { match_detail: opts.matchDetail } : {}),
  };
}

// ---------------------------------------------------------------------------
// the collection window
// ---------------------------------------------------------------------------

const WINDOW_START = at('2026-03-07T00:00:00Z'); // Saturday
const WINDOW_DAYS = 8; // 2026-03-07 .. 2026-03-14 inclusive

// Weighted hour-of-day table: mostly business hours, a realistic tail of
// overnight maintenance. Indexed by rng so the heatmap in the report dashboard
// has a believable shape instead of a flat line.
const HOUR_WEIGHTS = [
  [8, 6], [9, 12], [10, 13], [11, 12], [12, 8], [13, 11], [14, 12], [15, 11],
  [16, 9], [17, 6], [18, 3], [7, 3], [19, 2], [20, 1], [21, 1], [22, 1],
  [23, 1], [0, 1], [1, 1], [2, 2], [3, 2], [4, 1], [5, 1], [6, 2],
];
const HOUR_TOTAL = HOUR_WEIGHTS.reduce((s, [, w]) => s + w, 0);

function pickHour(rng) {
  let r = rng() * HOUR_TOTAL;
  for (const [hour, w] of HOUR_WEIGHTS) {
    r -= w;
    if (r <= 0) return hour;
  }
  return 10;
}

/** Deterministic, collision-free timestamp allocator for one host. */
function makeClock(host) {
  const used = new Set();
  return function allocate(rng, i) {
    const day = i % WINDOW_DAYS;
    let ms = WINDOW_START + day * DAY + pickHour(rng) * HOUR + Math.floor(rng() * 60) * MIN +
      Math.floor(rng() * 60) * 1000 + Math.floor(rng() * 1000);
    while (used.has(ms)) ms += 1000;
    used.add(ms);
    return ms;
  };
}

// ---------------------------------------------------------------------------
// baseline process inventory
//
// Emitted for every host so that every process.parent_name referenced anywhere
// in that host's rows resolves to a process.name actually observed on that host.
// A row citing a parent that appears nowhere is an incoherence an analyst would
// spot immediately; web/tests/demo.test.mjs enforces it, and buildHost() below
// re-checks it at generation time so the failure is loud, not silent.
// ---------------------------------------------------------------------------

const PROCESS_BASELINE = {
  'windows-workstation': [
    { name: 'wininit.exe', pid: 592, path: 'C:\\Windows\\System32\\wininit.exe', user: 'SYSTEM' },
    { name: 'services.exe', pid: 748, ppid: 592, path: 'C:\\Windows\\System32\\services.exe', user: 'SYSTEM' },
    { name: 'lsass.exe', pid: 772, ppid: 592, path: 'C:\\Windows\\System32\\lsass.exe', user: 'SYSTEM' },
    { name: 'svchost.exe', pid: 1064, ppid: 748, path: 'C:\\Windows\\System32\\svchost.exe', user: 'NETWORK SERVICE' },
    { name: 'winlogon.exe', pid: 684, path: 'C:\\Windows\\System32\\winlogon.exe', user: 'SYSTEM' },
    { name: 'explorer.exe', pid: 4408, ppid: 4312, path: 'C:\\Windows\\explorer.exe', user: 'EU\\alice' },
    { name: 'taskhostw.exe', pid: 5120, ppid: 1064, path: 'C:\\Windows\\System32\\taskhostw.exe', user: 'EU\\alice' },
    { name: 'cmd.exe', pid: 5388, ppid: 4408, path: 'C:\\Windows\\System32\\cmd.exe', user: 'EU\\alice' },
    { name: 'MsMpEng.exe', pid: 2660, ppid: 748, path: 'C:\\ProgramData\\Microsoft\\Windows Defender\\Platform\\4.18.24090.11-0\\MsMpEng.exe', user: 'SYSTEM' },
  ],
  'windows-server': [
    { name: 'wininit.exe', pid: 560, path: 'C:\\Windows\\System32\\wininit.exe', user: 'SYSTEM' },
    { name: 'services.exe', pid: 928, ppid: 560, path: 'C:\\Windows\\System32\\services.exe', user: 'SYSTEM' },
    { name: 'lsass.exe', pid: 944, ppid: 560, path: 'C:\\Windows\\System32\\lsass.exe', user: 'SYSTEM' },
    { name: 'svchost.exe', pid: 1220, ppid: 928, path: 'C:\\Windows\\System32\\svchost.exe', user: 'NETWORK SERVICE' },
    { name: 'explorer.exe', pid: 3960, ppid: 3872, path: 'C:\\Windows\\explorer.exe', user: 'EU\\bob' },
    { name: 'cmd.exe', pid: 4020, ppid: 3960, path: 'C:\\Windows\\System32\\cmd.exe', user: 'EU\\bob' },
    { name: 'taskhostw.exe', pid: 4400, ppid: 1220, path: 'C:\\Windows\\System32\\taskhostw.exe', user: 'SYSTEM' },
    { name: 'dfsrs.exe', pid: 2144, ppid: 928, path: 'C:\\Windows\\System32\\DFSRs.exe', user: 'SYSTEM' },
    { name: 'MsMpEng.exe', pid: 2712, ppid: 928, path: 'C:\\ProgramData\\Microsoft\\Windows Defender\\Platform\\4.18.24090.11-0\\MsMpEng.exe', user: 'SYSTEM' },
  ],
  'windows-dc': [
    { name: 'wininit.exe', pid: 552, path: 'C:\\Windows\\System32\\wininit.exe', user: 'SYSTEM' },
    { name: 'services.exe', pid: 904, ppid: 552, path: 'C:\\Windows\\System32\\services.exe', user: 'SYSTEM' },
    { name: 'lsass.exe', pid: 920, ppid: 552, path: 'C:\\Windows\\System32\\lsass.exe', user: 'SYSTEM' },
    { name: 'svchost.exe', pid: 1188, ppid: 904, path: 'C:\\Windows\\System32\\svchost.exe', user: 'NETWORK SERVICE' },
    { name: 'dns.exe', pid: 1972, ppid: 904, path: 'C:\\Windows\\System32\\dns.exe', user: 'SYSTEM' },
    { name: 'explorer.exe', pid: 3644, ppid: 3580, path: 'C:\\Windows\\explorer.exe', user: 'CORP\\Administrator' },
    { name: 'cmd.exe', pid: 3712, ppid: 3644, path: 'C:\\Windows\\System32\\cmd.exe', user: 'CORP\\Administrator' },
    { name: 'taskhostw.exe', pid: 4132, ppid: 1188, path: 'C:\\Windows\\System32\\taskhostw.exe', user: 'SYSTEM' },
    { name: 'MsMpEng.exe', pid: 2588, ppid: 904, path: 'C:\\ProgramData\\Microsoft\\Windows Defender\\Platform\\4.18.24090.11-0\\MsMpEng.exe', user: 'SYSTEM' },
  ],
};

function baselineSpecs(host) {
  return PROCESS_BASELINE[host.kind].map((p, idx) => ({
    ms: WINDOW_START + 5 * MIN + idx * 1000,
    source: 'process',
    artifact: 'Windows.System.Pslist',
    timestamp_desc: 'ProcessStartTime',
    timestamp_source_field: 'CreateTime',
    user: p.user,
    message: `Process running: ${p.name} (pid ${p.pid})`,
    target: p.path,
    process: {
      pid: p.pid, ...(p.ppid ? { ppid: p.ppid } : {}), name: p.name, image_path: p.path, user: p.user,
    },
  }));
}

// ---------------------------------------------------------------------------
// benign noise
//
// A timeline that is 100% malicious is not a test of triage. Roughly 97% of the
// demo is ordinary activity, including a handful of deliberately LOW-FIDELITY
// detections (signed Sysinternals tools, PowerShell profile loads, admin use of
// an archiver) that exist so the analysis has realistic false positives to
// dismiss with a rationale rather than a clean 100%-precision feed.
// ---------------------------------------------------------------------------

const DOC_NAMES = [
  'Q1-forecast.xlsx', 'headcount-plan.xlsx', 'board-pack-march.pptx', 'vat-return-2026.xlsx',
  'expenses-feb.xlsx', 'supplier-review.docx', 'audit-notes.docx', 'cashflow-model.xlsx',
  'payroll-summary.xlsx', 'contract-renewal.docx',
];

const WKS_APPS = [
  ['OUTLOOK.EXE', 'C:\\Program Files\\Microsoft Office\\root\\Office16\\OUTLOOK.EXE'],
  ['EXCEL.EXE', 'C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE'],
  ['WINWORD.EXE', 'C:\\Program Files\\Microsoft Office\\root\\Office16\\WINWORD.EXE'],
  ['MSEDGE.EXE', 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'],
  ['TEAMS.EXE', 'C:\\Program Files\\WindowsApps\\MSTeams_24245\\ms-teams.exe'],
  ['NOTEPAD.EXE', 'C:\\Windows\\System32\\notepad.exe'],
  ['SNIPPINGTOOL.EXE', 'C:\\Windows\\System32\\SnippingTool.exe'],
  ['CALC.EXE', 'C:\\Windows\\System32\\calc.exe'],
];

const INTRANET_PAGES = [
  ['https://intranet.corp.example/hr/leave', 'HR - leave balance'],
  ['https://intranet.corp.example/finance/monthly-close', 'Finance - monthly close'],
  ['https://sharepoint.corp.example/sites/finance/Shared%20Documents', 'Finance document library'],
  ['https://intranet.corp.example/it/servicedesk', 'IT service desk'],
  ['https://intranet.corp.example/news', 'Company news'],
];

const WKS_USERS = ['EU\\alice', 'EU\\alice', 'EU\\alice', 'EU\\bob'];
const SRV_USERS = ['EU\\carol', 'EU\\alice', 'EU\\bob', 'EU\\svc-backup', 'EU\\Administrator'];
const DC_USERS = ['CORP\\Administrator', 'EU\\alice', 'EU\\bob', 'EU\\carol', 'EU\\svc-backup'];

function pick(rng, arr) {
  return arr[Math.floor(rng() * arr.length) % arr.length];
}

const BENIGN_TEMPLATES = {
  'windows-workstation': [
    (rng) => {
      const user = pick(rng, WKS_USERS);
      return {
        source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
        timestamp_desc: 'EventTime', timestamp_source_field: 'System.TimeCreated.SystemTime', user,
        message: `An account was successfully logged on (interactive): ${user}`,
        target: user,
        event: { channel: 'Security', provider: 'Microsoft-Windows-Security-Auditing', event_id: 4624, record_id: 100000 + Math.floor(rng() * 900000), level: 'Information', computer: 'WKS-CORP-01.eu.corp.example', logon_type: 2, logon_id: `0x${(0x30000 + Math.floor(rng() * 0xffff)).toString(16)}` },
      };
    },
    (rng) => {
      const doc = pick(rng, DOC_NAMES);
      return {
        source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Modified',
        timestamp_source_field: 'Mtime', user: 'EU\\alice',
        message: `File modified: ${doc}`,
        target: `C:\\Users\\alice\\Documents\\${doc}`,
        file: { path: `C:\\Users\\alice\\Documents\\${doc}`, name: doc, extension: doc.split('.').pop(), size_bytes: 20480 + Math.floor(rng() * 400000), mft_entry: 90000 + Math.floor(rng() * 40000), is_directory: false, is_allocated: true },
      };
    },
    (rng) => {
      const [name, image] = pick(rng, WKS_APPS);
      return {
        source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted',
        timestamp_source_field: 'LastRunTimes', user: 'EU\\alice',
        message: `${name} executed (prefetch run count ${2 + Math.floor(rng() * 90)})`,
        target: image,
        process: { name, image_path: image, parent_name: 'explorer.exe' },
        extra: { prefetch_file: `${name}-${(0x10000000 + Math.floor(rng() * 0xfffffff)).toString(16).toUpperCase()}.pf` },
      };
    },
    (rng) => {
      const [url, title] = pick(rng, INTRANET_PAGES);
      return {
        source: 'browser', artifact: 'Windows.Applications.Edge.History', timestamp_desc: 'VisitTime',
        timestamp_source_field: 'last_visit_time', user: 'EU\\alice',
        message: `Edge visit: ${title}`,
        target: url,
        network: { url, domain: new URL(url).hostname, direction: 'outbound' },
      };
    },
    (rng) => ({
      source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'EU\\alice',
      message: 'Outbound HTTPS session via corporate proxy',
      target: '10.0.5.9:8080',
      network: { src_ip: '10.0.5.41', src_port: 49152 + Math.floor(rng() * 16000), dst_ip: '10.0.5.9', dst_port: 8080, protocol: 'tcp', domain: pick(rng, BENIGN_DOMAINS), direction: 'outbound', state: 'ESTABLISHED' },
      process: { name: 'MSEDGE.EXE', image_path: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', parent_name: 'explorer.exe' },
    }),
    (rng) => {
      const [name, image] = pick(rng, WKS_APPS);
      return {
        source: 'registry', artifact: 'Windows.Registry.AppCompatCache', timestamp_desc: 'LastWriteTime',
        timestamp_source_field: 'LastModified', user: 'SYSTEM',
        message: `AppCompatCache entry: ${name}`,
        target: image,
        registry: { key: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache', value_name: 'AppCompatCache', value_data: image, value_type: 'REG_BINARY', hive: 'SYSTEM' },
        extra: { cache_slot: Math.floor(rng() * 1024) },
      };
    },
    (rng) => ({
      source: 'log', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
      timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: `Antimalware definitions updated to 1.421.${300 + Math.floor(rng() * 90)}.0`,
      target: 'Microsoft-Windows-Windows Defender/Operational',
      event: { channel: 'Microsoft-Windows-Windows Defender/Operational', provider: 'Microsoft-Windows-Windows-Defender', event_id: 2000, record_id: 1000 + Math.floor(rng() * 9000), level: 'Information', computer: 'WKS-CORP-01.eu.corp.example' },
      process: { name: 'MsMpEng.exe', parent_name: 'services.exe' },
    }),
    (rng) => ({
      source: 'scheduled_task', artifact: 'Windows.System.TaskScheduler', timestamp_desc: 'RunTime', user: 'SYSTEM',
      message: 'Scheduled task ran: \\Microsoft\\Windows\\UpdateOrchestrator\\Schedule Scan',
      target: '\\Microsoft\\Windows\\UpdateOrchestrator\\Schedule Scan',
      extra: { result_code: 0, task_author: 'Microsoft Corporation', run_duration_seconds: 4 + Math.floor(rng() * 40) },
    }),
    (rng) => ({
      source: 'service', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
      timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: 'Service entered the running state: Windows Update (wuauserv)',
      target: 'wuauserv',
      event: { channel: 'System', provider: 'Service Control Manager', event_id: 7036, record_id: 4000 + Math.floor(rng() * 6000), level: 'Information', computer: 'WKS-CORP-01.eu.corp.example' },
      process: { name: 'services.exe', image_path: 'C:\\Windows\\System32\\services.exe' },
    }),
    (rng) => ({
      source: 'usb_device', artifact: 'Windows.Registry.USBSTOR', timestamp_desc: 'InstallDate', user: 'EU\\alice',
      message: 'Sanctioned encrypted USB volume connected (asset FIN-USB-04)',
      target: 'USBSTOR\\Disk&Ven_Corp&Prod_SecureKey&Rev_1.0',
      registry: { key: 'HKLM\\SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\Disk&Ven_Corp&Prod_SecureKey&Rev_1.0', value_name: 'FriendlyName', value_data: 'Corp SecureKey USB Device', value_type: 'REG_SZ', hive: 'SYSTEM' },
      extra: { serial_number: `FINUSB04${Math.floor(rng() * 9000) + 1000}`, volume_label: 'FIN-USB-04' },
    }),
    (rng) => ({
      source: 'system_info', artifact: 'Windows.Sysinternals.Autoruns', timestamp_desc: 'LastWriteTime', user: 'SYSTEM',
      message: 'Autorun entry enumerated: OneDrive (signed, Microsoft Corporation)',
      target: 'C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe',
      file: { path: 'C:\\Program Files\\Microsoft OneDrive\\OneDrive.exe', name: 'OneDrive.exe', extension: 'exe', signature_status: 'signed_valid', signer: 'Microsoft Corporation', size_bytes: 2800000 + Math.floor(rng() * 90000) },
    }),
  ],

  'windows-server': [
    (rng) => {
      const user = pick(rng, SRV_USERS);
      return {
        source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
        timestamp_desc: 'EventTime', timestamp_source_field: 'System.TimeCreated.SystemTime', user,
        message: `Network share object accessed: \\\\SRV-CORP-FS02\\Finance by ${user}`,
        target: '\\\\SRV-CORP-FS02\\Finance',
        event: { channel: 'Security', provider: 'Microsoft-Windows-Security-Auditing', event_id: 5140, record_id: 200000 + Math.floor(rng() * 800000), level: 'Information', computer: 'SRV-CORP-FS02.eu.corp.example', logon_type: 3 },
        network: { src_ip: pick(rng, ['10.0.5.41', '10.0.5.42', '10.0.5.15']), dst_ip: '10.0.5.20', dst_port: 445, protocol: 'tcp', direction: 'inbound' },
      };
    },
    (rng) => {
      const doc = pick(rng, DOC_NAMES);
      const dir = pick(rng, ['Finance\\2026Q1', 'Finance\\2025Q4', 'Shared\\Templates', 'Finance\\Audit']);
      return {
        source: 'filesystem', artifact: 'Generic.Collectors.File', timestamp_desc: 'Modified',
        timestamp_source_field: 'Mtime', user: pick(rng, SRV_USERS),
        message: `File modified on share: ${doc}`,
        target: `D:\\${dir}\\${doc}`,
        file: { path: `D:\\${dir}\\${doc}`, name: doc, extension: doc.split('.').pop(), size_bytes: 40960 + Math.floor(rng() * 8000000), is_directory: false, is_allocated: true },
      };
    },
    (rng) => ({
      source: 'scheduled_task', artifact: 'Windows.System.TaskScheduler', timestamp_desc: 'RunTime', user: 'EU\\svc-backup',
      message: 'Scheduled task ran: \\Corp\\NightlyShareBackup',
      target: '\\Corp\\NightlyShareBackup',
      extra: { result_code: 0, task_author: 'EU\\bob', run_duration_seconds: 900 + Math.floor(rng() * 2400) },
    }),
    (rng) => ({
      source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'EU\\svc-backup',
      message: 'Backup stream to SRV-CORP-BK01',
      target: '10.0.10.14:10000',
      network: { src_ip: '10.0.5.20', src_port: 49152 + Math.floor(rng() * 16000), dst_ip: '10.0.10.14', dst_port: 10000, protocol: 'tcp', direction: 'outbound', state: 'ESTABLISHED' },
    }),
    (rng) => ({
      source: 'service', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
      timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: 'Service entered the running state: DFS Replication (DFSR)',
      target: 'DFSR',
      event: { channel: 'System', provider: 'Service Control Manager', event_id: 7036, record_id: 5000 + Math.floor(rng() * 6000), level: 'Information', computer: 'SRV-CORP-FS02.eu.corp.example' },
      process: { name: 'dfsrs.exe', image_path: 'C:\\Windows\\System32\\DFSRs.exe', parent_name: 'services.exe' },
    }),
    (rng) => ({
      source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted', user: 'EU\\bob',
      message: 'ROBOCOPY.EXE executed (share maintenance)',
      target: 'C:\\Windows\\System32\\Robocopy.exe',
      process: { name: 'ROBOCOPY.EXE', image_path: 'C:\\Windows\\System32\\Robocopy.exe', parent_name: 'cmd.exe', command_line: 'robocopy D:\\Finance\\2025Q4 E:\\Archive\\2025Q4 /MIR /R:1 /W:1', user: 'EU\\bob' },
      extra: { prefetch_file: `ROBOCOPY.EXE-${(0x10000000 + Math.floor(rng() * 0xfffffff)).toString(16).toUpperCase()}.pf` },
    }),
    (rng) => ({
      source: 'registry', artifact: 'Windows.Registry.Shares', timestamp_desc: 'LastWriteTime', user: 'SYSTEM',
      message: 'Share definition enumerated: Finance',
      target: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Shares\\Finance',
      registry: { key: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Shares\\Finance', value_name: 'Finance', value_data: 'CSCFlags=0;MaxUses=4294967295;Path=D:\\Finance', value_type: 'REG_MULTI_SZ', hive: 'SYSTEM' },
      extra: { max_uses: 4294967295, slot: Math.floor(rng() * 64) },
    }),
    (rng) => ({
      source: 'log', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
      timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: `Volume shadow copy created for D: (nightly backup, ${Math.floor(rng() * 8) + 1} snapshots retained)`,
      target: 'D:\\',
      event: { channel: 'Application', provider: 'VSS', event_id: 8224, record_id: 300 + Math.floor(rng() * 4000), level: 'Information', computer: 'SRV-CORP-FS02.eu.corp.example' },
    }),
    (rng) => ({
      source: 'account', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
      timestamp_desc: 'EventTime', user: 'EU\\SRV-CORP-FS02$',
      message: 'Computer account password changed (machine account maintenance)',
      target: 'EU\\SRV-CORP-FS02$',
      event: { channel: 'Security', provider: 'Microsoft-Windows-Security-Auditing', event_id: 4742, record_id: 210000 + Math.floor(rng() * 700000), level: 'Information', computer: 'SRV-CORP-FS02.eu.corp.example' },
    }),
    (rng) => ({
      source: 'system_info', artifact: 'Windows.System.DiskInfo', timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: `Volume D: capacity report: ${60 + Math.floor(rng() * 30)}% used`,
      target: 'D:\\',
      extra: { file_system: 'NTFS', size_bytes: 4000787030016, volume_label: 'DATA' },
    }),
  ],

  'windows-dc': [
    (rng) => {
      const user = pick(rng, DC_USERS);
      return {
        source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
        timestamp_desc: 'EventTime', timestamp_source_field: 'System.TimeCreated.SystemTime', user,
        message: `Kerberos authentication ticket (TGT) was requested for ${user}`,
        target: user,
        event: { channel: 'Security', provider: 'Microsoft-Windows-Security-Auditing', event_id: 4768, record_id: 400000 + Math.floor(rng() * 900000), level: 'Information', computer: 'DC-CORP-01.corp.example' },
        network: { src_ip: pick(rng, ['10.0.5.41', '10.0.5.42', '10.0.5.20', '10.0.5.15']), dst_ip: '10.0.10.10', dst_port: 88, protocol: 'tcp', direction: 'inbound' },
        extra: { encryption_type: '0x12 (AES256-CTS-HMAC-SHA1-96)', ticket_options: '0x40810010' },
      };
    },
    (rng) => {
      const user = pick(rng, DC_USERS);
      return {
        source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
        timestamp_desc: 'EventTime', user,
        message: `Kerberos service ticket was requested: ${pick(rng, ['cifs/SRV-CORP-FS02.eu.corp.example', 'ldap/DC-CORP-01.corp.example', 'host/SRV-CORP-FS02.eu.corp.example'])}`,
        target: user,
        event: { channel: 'Security', provider: 'Microsoft-Windows-Security-Auditing', event_id: 4769, record_id: 410000 + Math.floor(rng() * 900000), level: 'Information', computer: 'DC-CORP-01.corp.example' },
        extra: { encryption_type: '0x12 (AES256-CTS-HMAC-SHA1-96)', failure_code: '0x0' },
      };
    },
    (rng) => ({
      source: 'account', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
      timestamp_desc: 'EventTime', user: pick(rng, ['EU\\alice', 'EU\\bob', 'EU\\carol']),
      message: 'User password was changed at the request of the account owner',
      target: pick(rng, ['EU\\alice', 'EU\\bob', 'EU\\carol']),
      event: { channel: 'Security', provider: 'Microsoft-Windows-Security-Auditing', event_id: 4723, record_id: 420000 + Math.floor(rng() * 500000), level: 'Information', computer: 'DC-CORP-01.corp.example' },
    }),
    (rng) => ({
      source: 'log', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
      timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: `DNS zone transfer completed for ${pick(rng, ['corp.example', 'eu.corp.example'])}`,
      target: 'Microsoft-Windows-DNS-Server/Audit',
      event: { channel: 'DNS Server', provider: 'Microsoft-Windows-DNS-Server-Service', event_id: 6522, record_id: 900 + Math.floor(rng() * 9000), level: 'Information', computer: 'DC-CORP-01.corp.example' },
      process: { name: 'dns.exe', image_path: 'C:\\Windows\\System32\\dns.exe', parent_name: 'services.exe' },
    }),
    (rng) => ({
      source: 'registry', artifact: 'Windows.Registry.NTDS', timestamp_desc: 'LastWriteTime', user: 'SYSTEM',
      message: 'NTDS parameter enumerated: Database backup path',
      target: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\NTDS\\Parameters',
      registry: { key: 'HKLM\\SYSTEM\\CurrentControlSet\\Services\\NTDS\\Parameters', value_name: 'DSA Database file', value_data: 'C:\\Windows\\NTDS\\ntds.dit', value_type: 'REG_SZ', hive: 'SYSTEM' },
      extra: { slot: Math.floor(rng() * 32) },
    }),
    (rng) => ({
      source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Modified', user: 'SYSTEM',
      message: 'Group Policy template modified: Default Domain Policy',
      target: 'C:\\Windows\\SYSVOL\\sysvol\\corp.example\\Policies\\{31B2F340-016D-11D2-945F-00C04FB984F9}\\GPT.INI',
      file: { path: 'C:\\Windows\\SYSVOL\\sysvol\\corp.example\\Policies\\{31B2F340-016D-11D2-945F-00C04FB984F9}\\GPT.INI', name: 'GPT.INI', extension: 'INI', size_bytes: 59 + Math.floor(rng() * 40), mft_entry: 70000 + Math.floor(rng() * 9000), is_allocated: true },
    }),
    (rng) => ({
      source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: 'Inter-site AD replication session with DC-EU-01',
      target: '10.0.5.10:135',
      network: { src_ip: '10.0.10.10', src_port: 49152 + Math.floor(rng() * 16000), dst_ip: '10.0.5.10', dst_port: 135, protocol: 'tcp', direction: 'outbound', state: 'ESTABLISHED' },
      extra: { naming_context: 'DC=eu,DC=corp,DC=example', replication_partner: 'DC-EU-01' },
    }),
    (rng) => ({
      source: 'service', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
      timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: 'Service entered the running state: Active Directory Domain Services (NTDS)',
      target: 'NTDS',
      event: { channel: 'System', provider: 'Service Control Manager', event_id: 7036, record_id: 6000 + Math.floor(rng() * 6000), level: 'Information', computer: 'DC-CORP-01.corp.example' },
      process: { name: 'services.exe', image_path: 'C:\\Windows\\System32\\services.exe' },
    }),
    (rng) => ({
      source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted', user: 'CORP\\Administrator',
      message: 'REPADMIN.EXE executed (replication health check)',
      target: 'C:\\Windows\\System32\\repadmin.exe',
      process: { name: 'REPADMIN.EXE', image_path: 'C:\\Windows\\System32\\repadmin.exe', parent_name: 'cmd.exe', command_line: 'repadmin /replsummary', user: 'CORP\\Administrator' },
      extra: { prefetch_file: `REPADMIN.EXE-${(0x10000000 + Math.floor(rng() * 0xfffffff)).toString(16).toUpperCase()}.pf` },
    }),
    (rng) => ({
      source: 'system_info', artifact: 'Windows.System.TrustRelationships', timestamp_desc: 'EventTime', user: 'SYSTEM',
      message: 'Forest trust enumerated: eu.corp.example -> corp.example (parent/child, transitive)',
      target: 'eu.corp.example',
      extra: { trust_attributes: 'WITHIN_FOREST', trust_direction: 'Bidirectional', trust_type: 'Uplevel', validated: true, probe: Math.floor(rng() * 8) },
    }),
  ],
};

// Low-fidelity detections attached to a small number of otherwise benign rows.
// These are the dismissible ones: an analyst (or the model) is expected to rule
// them out WITH A REASON, which is the behaviour the demo is meant to exercise.
const NOISY_DETECTIONS = [
  () => sigma('Non-standard PowerShell Profile Load', 'informational', ['T1059.001'], {
    description: 'A PowerShell profile outside the default path was loaded.',
    falsePositives: ['Administrator login scripts', 'Managed workstation baseline profiles'],
    matchDetail: 'ScriptBlockText contains Microsoft.PowerShell_profile.ps1',
  }),
  () => sigma('Rundll32 Execution Without Command-Line Arguments', 'low', ['T1218.011'], {
    description: 'rundll32.exe observed with no arguments.',
    falsePositives: ['Control Panel applets', 'Printer driver installation'],
  }),
  () => yara('Tool_Name_Match_ProcDump', 'low', ['T1003.001'], {
    description: 'File name matches a known credential-dumping utility. Signature and signer are NOT evaluated by this rule.',
    matchDetail: '$name_procdump',
    matchOffset: 512,
  }),
  () => sigma('Archive Utility Execution From Administrative Context', 'informational', ['T1560.001'], {
    description: 'An archiver was executed by an administrative account.',
    falsePositives: ['Backup and log-rotation jobs', 'IT packaging work'],
  }),
  () => hayabusa('Multiple Logon Failures Followed By Success', 'low', ['T1110.001'], {
    description: 'Account lockout threshold approached then a successful logon.',
    matchDetail: 'EventID 4625 x3 then 4624',
  }),
];

/** Benign rows that carry a deliberately low-fidelity detection. */
function noisySpecs(host) {
  const base = WINDOW_START + DAY + 9 * HOUR;
  const out = [];
  const add = (dayOffset, minute, spec) => out.push({ ms: base + dayOffset * DAY + minute * MIN, ...spec });

  if (host.kind === 'windows-workstation') {
    add(0, 12, {
      source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted', user: 'EU\\bob',
      message: 'powershell.exe executed an IT baseline profile script',
      target: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
      process: { name: 'powershell.exe', image_path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe', command_line: 'powershell.exe -File "C:\\ProgramData\\Corp\\IT\\Microsoft.PowerShell_profile.ps1"', parent_name: 'cmd.exe', user: 'EU\\bob' },
      detections: [NOISY_DETECTIONS[0]()],
    });
    add(2, 34, {
      source: 'execution', artifact: 'Windows.System.Pslist', timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
      message: 'rundll32.exe launched by Control Panel with no arguments',
      target: 'C:\\Windows\\System32\\rundll32.exe',
      process: { pid: 6820, ppid: 4408, name: 'rundll32.exe', image_path: 'C:\\Windows\\System32\\rundll32.exe', command_line: 'rundll32.exe', parent_name: 'explorer.exe', user: 'EU\\alice' },
      detections: [NOISY_DETECTIONS[1]()],
    });
    add(4, 51, {
      source: 'filesystem', artifact: 'Generic.Collectors.File', timestamp_desc: 'Created', user: 'EU\\bob',
      message: 'IT toolkit file present: procdump.exe (Microsoft-signed)',
      target: 'C:\\Tools\\Sysinternals\\procdump.exe',
      file: { path: 'C:\\Tools\\Sysinternals\\procdump.exe', name: 'procdump.exe', extension: 'exe', size_bytes: 673016, signature_status: 'signed_valid', signer: 'Microsoft Corporation', is_allocated: true },
      hashes: h('procdump'),
      detections: [NOISY_DETECTIONS[2]()],
    });
  }
  if (host.kind === 'windows-server') {
    add(1, 22, {
      source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted', user: 'EU\\bob',
      message: '7z.exe executed to package last quarter\'s share for archive',
      target: 'C:\\Program Files\\7-Zip\\7z.exe',
      process: { name: '7z.exe', image_path: 'C:\\Program Files\\7-Zip\\7z.exe', command_line: '7z.exe a -t7z E:\\Archive\\2025Q4.7z D:\\Finance\\2025Q4', parent_name: 'cmd.exe', user: 'EU\\bob' },
      detections: [NOISY_DETECTIONS[3]()],
    });
  }
  if (host.kind === 'windows-dc') {
    add(3, 8, {
      source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'hayabusa',
      timestamp_desc: 'EventTime', user: 'EU\\carol',
      message: 'Three failed logons then a success for EU\\carol (typed the old password)',
      target: 'EU\\carol',
      event: { channel: 'Security', provider: 'Microsoft-Windows-Security-Auditing', event_id: 4624, record_id: 488123, level: 'Information', computer: 'DC-CORP-01.corp.example', logon_type: 3 },
      detections: [NOISY_DETECTIONS[4]()],
    });
  }
  return out;
}

/** Two rows per host with the unknown-timestamp sentinel, which must sort first. */
function sentinelSpecs(host) {
  return [
    {
      timestamp_utc: SENTINEL_TS,
      source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created',
      timestamp_source_field: 'Btime', user: 'SYSTEM',
      message: 'MFT entry recovered with zeroed $STANDARD_INFORMATION timestamps',
      target: 'C:\\$Extend\\$RmMetadata\\$TxfLog\\$TxfLog.blf',
      file: { path: 'C:\\$Extend\\$RmMetadata\\$TxfLog\\$TxfLog.blf', name: '$TxfLog.blf', mft_entry: 30, is_allocated: true },
      extra: { note: 'timestamp unavailable in source; sentinel per docs/timeline_schema.json' },
    },
    {
      timestamp_utc: SENTINEL_TS,
      source: 'registry', artifact: 'Windows.Registry.AppCompatCache', timestamp_desc: 'LastWriteTime',
      user: 'SYSTEM',
      message: 'AppCompatCache entry with no recoverable last-write time',
      target: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache',
      registry: { key: 'HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache', value_name: 'AppCompatCache', value_type: 'REG_BINARY', hive: 'SYSTEM' },
      extra: { note: 'timestamp unavailable in source; sentinel per docs/timeline_schema.json' },
    },
  ];
}

// ---------------------------------------------------------------------------
// the incident
//
// One coherent intrusion across a two-domain forest, in the order an analyst
// would reconstruct it. Entities cross-reference: the implant's SHA-256 on
// WKS-CORP-01 is the SAME hash as upd.exe on SRV-CORP-FS02; the account
// recovered from the LSASS dump is the account that authenticates to the file
// server; the file server is the source IP of the cross-domain replication
// request on the forest-root DC.
//
// `label` values are how the manifest narrative cites real row_hash values, so
// every phase in the story points at evidence that actually exists.
// ---------------------------------------------------------------------------

const D1 = at('2026-03-09T00:00:00Z'); // Monday - initial access
const D2 = at('2026-03-10T00:00:00Z'); // discovery + credential access
const D3 = at('2026-03-11T00:00:00Z'); // intra-domain lateral movement
const D4 = at('2026-03-12T00:00:00Z'); // cross-domain escalation
const D5 = at('2026-03-13T00:00:00Z'); // collection + exfiltration
const D6 = at('2026-03-14T00:00:00Z'); // anti-forensics

const IMPLANT_WKS = 'C:\\Users\\alice\\AppData\\Roaming\\Sync\\updatesvc.exe';
const IMPLANT_SRV = 'C:\\Windows\\upd.exe';

function incidentSpecs() {
  /** @type {Record<string, object[]>} */
  const byHost = { 'WKS-CORP-01': [], 'SRV-CORP-FS02': [], 'DC-CORP-01': [] };
  const wks = (s) => byHost['WKS-CORP-01'].push(s);
  const srv = (s) => byHost['SRV-CORP-FS02'].push(s);
  const dc = (s) => byHost['DC-CORP-01'].push(s);

  const sysmon = (eventId, recordId) => ({
    channel: 'Microsoft-Windows-Sysmon/Operational', provider: 'Microsoft-Windows-Sysmon',
    event_id: eventId, record_id: recordId, level: 'Information',
  });
  const sec = (eventId, recordId, computer, extra = {}) => ({
    channel: 'Security', provider: 'Microsoft-Windows-Security-Auditing',
    event_id: eventId, record_id: recordId, level: 'Information', computer, ...extra,
  });
  const WKS_FQDN = 'WKS-CORP-01.eu.corp.example';
  const SRV_FQDN = 'SRV-CORP-FS02.eu.corp.example';
  const DC_FQDN = 'DC-CORP-01.corp.example';

  // === Phase 1: initial access ===============================================
  wks({
    label: 'ia.mail', ms: D1 + 9 * HOUR + 4 * MIN + 12000,
    source: 'log', artifact: 'Windows.Applications.Outlook.Items', timestamp_desc: 'EventTime',
    user: 'EU\\alice',
    message: 'Inbound mail delivered with external link: "Outstanding invoice Q1 2026"',
    target: 'billing@invoices.billing-portal.example',
    network: { src_ip: '192.0.2.61', domain: 'invoices.billing-portal.example', direction: 'inbound' },
    extra: { external_sender: true, spf: 'softfail', subject: 'Outstanding invoice Q1 2026' },
    detections: [sigma('External Mail With Financial Lure Subject And SPF Softfail', 'low', ['T1566.002'], { description: 'Inbound external mail whose subject matches a finance-themed lure pattern and whose SPF result is softfail.' })],
  });
  wks({
    label: 'ia.download', ms: D1 + 9 * HOUR + 12 * MIN + 44000,
    source: 'browser', artifact: 'Windows.Applications.Edge.History', timestamp_desc: 'DownloadTime',
    timestamp_source_field: 'downloads.end_time', user: 'EU\\alice',
    message: 'Edge download completed: Invoice_Q1_2026.xlsm from an external host first seen today',
    target: 'https://invoices.billing-portal.example/dl/inv-8841/Invoice_Q1_2026.xlsm',
    file: { path: 'C:\\Users\\alice\\Downloads\\Invoice_Q1_2026.xlsm', name: 'Invoice_Q1_2026.xlsm', extension: 'xlsm', size_bytes: 184320 },
    hashes: h('lure_xlsm'),
    network: { dst_ip: '198.51.100.24', dst_port: 443, protocol: 'tcp', domain: 'invoices.billing-portal.example', url: 'https://invoices.billing-portal.example/dl/inv-8841/Invoice_Q1_2026.xlsm', direction: 'outbound' },
    detections: [sigma('Macro-Enabled Office Download From Newly Observed Domain', 'medium', ['T1566.002', 'T1204.002'], { description: 'A macro-enabled Office document was downloaded from a domain not previously seen in this environment.' })],
  });
  wks({
    label: 'ia.file', ms: D1 + 9 * HOUR + 12 * MIN + 47000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created',
    timestamp_source_field: 'Btime', user: 'EU\\alice',
    message: 'File created: Invoice_Q1_2026.xlsm (Mark-of-the-Web zone 3)',
    target: 'C:\\Users\\alice\\Downloads\\Invoice_Q1_2026.xlsm',
    file: { path: 'C:\\Users\\alice\\Downloads\\Invoice_Q1_2026.xlsm', name: 'Invoice_Q1_2026.xlsm', extension: 'xlsm', size_bytes: 184320, mft_entry: 118432, mft_sequence: 3, ads_name: 'Zone.Identifier', is_allocated: true, signature_status: 'unsigned' },
    hashes: h('lure_xlsm'),
    extra: { zone_id: 3, referrer_url: 'https://invoices.billing-portal.example/dl/inv-8841' },
  });
  wks({
    label: 'ia.open', ms: D1 + 9 * HOUR + 13 * MIN + 58000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'Process created: EXCEL.EXE opened Invoice_Q1_2026.xlsm',
    target: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE',
    process: { pid: 6112, ppid: 4408, name: 'EXCEL.EXE', image_path: 'C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE', command_line: '"C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE" "C:\\Users\\alice\\Downloads\\Invoice_Q1_2026.xlsm"', parent_name: 'explorer.exe', integrity_level: 'Medium', session_id: 2, user: 'EU\\alice' },
    event: sysmon(1, 884201),
  });

  // === Phase 2: execution ====================================================
  wks({
    label: 'ex.wscript', ms: D1 + 9 * HOUR + 14 * MIN + 2000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'Office application spawned a script interpreter: EXCEL.EXE -> wscript.exe',
    target: 'C:\\Windows\\System32\\wscript.exe',
    process: { pid: 7320, ppid: 6112, name: 'wscript.exe', image_path: 'C:\\Windows\\System32\\wscript.exe', command_line: 'wscript.exe "C:\\Users\\alice\\AppData\\Local\\Temp\\inv8841.js"', parent_name: 'EXCEL.EXE', parent_command_line: '"C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE" "C:\\Users\\alice\\Downloads\\Invoice_Q1_2026.xlsm"', integrity_level: 'Medium', session_id: 2, user: 'EU\\alice' },
    event: sysmon(1, 884219),
    detections: [
      sigma('Office Application Spawned Script Interpreter', 'high', ['T1566.001', 'T1204.002', 'T1059.007'], { description: 'EXCEL.EXE created a wscript.exe child process, which is not part of any documented Office workflow in this environment.', matchDetail: 'ParentImage endswith EXCEL.EXE AND Image endswith wscript.exe' }),
      hayabusa('Proc Exec: Office Child Script Host', 'high', ['T1204.002'], { matchDetail: 'Sysmon 1 ParentImage=EXCEL.EXE' }),
    ],
  });
  wks({
    label: 'ex.dropper', ms: D1 + 9 * HOUR + 14 * MIN + 9000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created', timestamp_source_field: 'Btime',
    user: 'EU\\alice',
    message: 'File created by EXCEL.EXE: inv8841.js (JScript dropper)',
    target: 'C:\\Users\\alice\\AppData\\Local\\Temp\\inv8841.js',
    file: { path: 'C:\\Users\\alice\\AppData\\Local\\Temp\\inv8841.js', name: 'inv8841.js', extension: 'js', size_bytes: 9216, mft_entry: 118501, is_allocated: true },
    hashes: h('dropper_js'),
    detections: [yara('IRTriage_Demo_JScript_Dropper', 'high', ['T1059.007'], { description: 'JScript containing a base64 blob and a WScript.Shell invocation.', matchDetail: '$b64_shell', matchOffset: 1284 })],
  });
  wks({
    label: 'ex.powershell', ms: D1 + 9 * HOUR + 14 * MIN + 31000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'Encoded PowerShell launched by the script interpreter (hidden window, execution policy bypassed)',
    target: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe',
    process: { pid: 7484, ppid: 7320, name: 'powershell.exe', image_path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe', command_line: 'powershell.exe -nop -w hidden -ep bypass -enc SQBFAFgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkA', parent_name: 'wscript.exe', parent_command_line: 'wscript.exe "C:\\Users\\alice\\AppData\\Local\\Temp\\inv8841.js"', integrity_level: 'Medium', session_id: 2, user: 'EU\\alice' },
    event: sysmon(1, 884231),
    detections: [sigma('Encoded PowerShell Command Line With Hidden Window', 'high', ['T1059.001', 'T1027'], { description: 'powershell.exe invoked with -enc, -w hidden and -ep bypass by a non-interactive parent.', matchDetail: 'CommandLine contains -enc AND -w hidden' })],
  });
  wks({
    label: 'ex.c2', ms: D1 + 9 * HOUR + 15 * MIN + 12000,
    source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'EU\\alice',
    message: 'powershell.exe opened an HTTPS session to cdn-sync-updates.example (first observation in this environment)',
    target: '198.51.100.24:443',
    network: { src_ip: '10.0.5.41', src_port: 51344, dst_ip: '198.51.100.24', dst_port: 443, protocol: 'tcp', domain: 'cdn-sync-updates.example', direction: 'outbound', state: 'ESTABLISHED' },
    process: { pid: 7484, name: 'powershell.exe', image_path: 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe', parent_name: 'wscript.exe', user: 'EU\\alice' },
    detections: [sigma('PowerShell Network Connection To Newly Observed Domain', 'medium', ['T1071.001', 'T1105'], { description: 'A PowerShell process contacted an external domain with no prior history in this environment.' })],
  });
  wks({
    label: 'ex.implant.file', ms: D1 + 9 * HOUR + 15 * MIN + 44000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created', timestamp_source_field: 'Btime',
    user: 'EU\\alice',
    message: 'Unsigned executable written to a user-writable directory: updatesvc.exe',
    target: IMPLANT_WKS,
    file: { path: IMPLANT_WKS, name: 'updatesvc.exe', extension: 'exe', size_bytes: 512000, mft_entry: 118644, is_allocated: true, signature_status: 'unsigned' },
    hashes: h('implant'),
    detections: [yara('IRTriage_Demo_Implant_Loader', 'high', ['T1105', 'T1071.001'], { description: 'Loader stub with an embedded C2 hostname and an XOR-decoded configuration block.', matchDetail: '$c2_host_str', matchOffset: 20512 })],
  });
  wks({
    label: 'ex.implant.run', ms: D1 + 9 * HOUR + 16 * MIN + 3000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'Implant executed from AppData: updatesvc.exe (parent powershell.exe)',
    target: IMPLANT_WKS,
    process: { pid: 7900, ppid: 7484, name: 'updatesvc.exe', image_path: IMPLANT_WKS, command_line: `"${IMPLANT_WKS}" -svc`, parent_name: 'powershell.exe', integrity_level: 'Medium', session_id: 2, user: 'EU\\alice' },
    event: sysmon(1, 884260),
    hashes: h('implant'),
    detections: [sigma('Execution From User AppData Roaming Directory', 'high', ['T1204.002', 'T1105'], { description: 'An unsigned binary executed from %APPDATA%, spawned by PowerShell.' })],
  });
  wks({
    label: 'ex.prefetch', ms: D1 + 9 * HOUR + 16 * MIN + 5000,
    source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'FirstExecuted',
    timestamp_source_field: 'LastRunTimes', user: 'EU\\alice',
    message: 'Prefetch records first execution of UPDATESVC.EXE',
    target: IMPLANT_WKS,
    process: { name: 'updatesvc.exe', image_path: IMPLANT_WKS, parent_name: 'powershell.exe' },
    extra: { prefetch_file: 'UPDATESVC.EXE-6A31F0C2.pf', run_count: 1 },
  });
  wks({
    label: 'ex.beacon', ms: D1 + 9 * HOUR + 18 * MIN + 22000,
    source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'EU\\alice',
    message: 'Regular-interval outbound sessions from updatesvc.exe to 198.51.100.24 (60 s +/- 3 s jitter)',
    target: '198.51.100.24:443',
    network: { src_ip: '10.0.5.41', src_port: 51377, dst_ip: '198.51.100.24', dst_port: 443, protocol: 'tcp', domain: 'cdn-sync-updates.example', direction: 'outbound', state: 'ESTABLISHED' },
    process: { pid: 7900, name: 'updatesvc.exe', image_path: IMPLANT_WKS, user: 'EU\\alice' },
    extra: { beacon_interval_seconds: 60, jitter_seconds: 3, observed_sessions: 412 },
    detections: [sigma('Regular-Interval Beaconing From User-Writable Path', 'high', ['T1071.001', 'T1573.001'], { description: 'Periodic equal-size outbound sessions from a binary in a user-writable directory.' })],
  });

  // === Phase 3: persistence ==================================================
  wks({
    label: 'pe.runkey', ms: D1 + 9 * HOUR + 22 * MIN + 10000,
    source: 'persistence', artifact: 'Windows.Registry.NTUSER', timestamp_desc: 'LastWriteTime',
    timestamp_source_field: 'LastModified', user: 'EU\\alice',
    message: 'Run key added: SyncUpdater -> updatesvc.exe in AppData',
    target: 'HKU\\S-1-5-21-2109-1147-3301-1104\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\SyncUpdater',
    registry: { key: 'HKU\\S-1-5-21-2109-1147-3301-1104\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run', value_name: 'SyncUpdater', value_data: IMPLANT_WKS, value_type: 'REG_SZ', hive: 'NTUSER.DAT' },
    detections: [sigma('Run Key Pointing To User AppData Executable', 'high', ['T1547.001'], { description: 'An autorun value was created that points into %APPDATA%.' })],
  });
  wks({
    label: 'pe.task', ms: D1 + 9 * HOUR + 22 * MIN + 48000,
    source: 'persistence', artifact: 'Windows.System.TaskScheduler', timestamp_desc: 'Created', user: 'EU\\alice',
    message: 'Scheduled task created with an update-service-impersonating name: SyncUpdateTask',
    target: '\\Microsoft\\Windows\\Sync\\SyncUpdateTask',
    extra: { task_author: 'EU\\alice', task_command: IMPLANT_WKS, task_trigger: 'AtLogon', xml_path: 'C:\\Windows\\System32\\Tasks\\Microsoft\\Windows\\Sync\\SyncUpdateTask' },
    detections: [sigma('Scheduled Task Impersonating A Microsoft Update Task', 'medium', ['T1053.005'], { description: 'A task was created under a Microsoft-looking path but is not signed by, or registered to, a Microsoft component.' })],
  });
  wks({
    label: 'pe.task.evt', ms: D1 + 9 * HOUR + 23 * MIN + 2000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\alice',
    message: 'A scheduled task was created: \\Microsoft\\Windows\\Sync\\SyncUpdateTask',
    target: '\\Microsoft\\Windows\\Sync\\SyncUpdateTask',
    event: sec(4698, 884301, WKS_FQDN),
  });

  // === Phase 4: discovery ====================================================
  wks({
    label: 'di.whoami', ms: D2 + 2 * HOUR + 5 * MIN + 11000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'Off-hours discovery: whoami.exe /all executed by the implant',
    target: 'C:\\Windows\\System32\\whoami.exe',
    process: { pid: 8104, ppid: 7900, name: 'whoami.exe', image_path: 'C:\\Windows\\System32\\whoami.exe', command_line: 'whoami.exe /all', parent_name: 'updatesvc.exe', integrity_level: 'Medium', session_id: 2, user: 'EU\\alice' },
    event: sysmon(1, 891002),
    detections: [sigma('System Owner Discovery By Non-Interactive Parent', 'low', ['T1033'], { description: 'whoami /all run by a process with no interactive session at 02:05 local time.', falsePositives: ['Logon scripts', 'Software inventory agents'] })],
  });
  wks({
    label: 'di.netgroup', ms: D2 + 2 * HOUR + 6 * MIN + 40000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'Domain group enumeration: net group "Domain Admins" /domain',
    target: 'C:\\Windows\\System32\\net.exe',
    process: { pid: 8140, ppid: 7900, name: 'net.exe', image_path: 'C:\\Windows\\System32\\net.exe', command_line: 'net group "Domain Admins" /domain', parent_name: 'updatesvc.exe', user: 'EU\\alice' },
    event: sysmon(1, 891008),
    detections: [sigma('Privileged Group Enumeration', 'medium', ['T1069.002'], { description: 'Enumeration of a privileged domain group from a workstation.' })],
  });
  wks({
    label: 'di.trusts', ms: D2 + 2 * HOUR + 8 * MIN + 15000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'Forest trust enumeration: nltest /domain_trusts /all_trusts (reveals corp.example <- eu.corp.example)',
    target: 'C:\\Windows\\System32\\nltest.exe',
    process: { pid: 8168, ppid: 7900, name: 'nltest.exe', image_path: 'C:\\Windows\\System32\\nltest.exe', command_line: 'nltest.exe /domain_trusts /all_trusts', parent_name: 'updatesvc.exe', user: 'EU\\alice' },
    event: sysmon(1, 891014),
    extra: { discovered_domains: 'corp.example; eu.corp.example' },
    detections: [sigma('Domain Trust Discovery', 'medium', ['T1482'], { description: 'Trust relationships enumerated from a workstation, typically a precursor to cross-domain movement.' })],
  });
  wks({
    label: 'di.adq.file', ms: D2 + 2 * HOUR + 12 * MIN + 33000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created', user: 'EU\\alice',
    message: 'AD enumeration utility staged in the user temp directory: adq.exe',
    target: 'C:\\Users\\alice\\AppData\\Local\\Temp\\adq.exe',
    file: { path: 'C:\\Users\\alice\\AppData\\Local\\Temp\\adq.exe', name: 'adq.exe', extension: 'exe', size_bytes: 1048576, mft_entry: 119002, is_allocated: true, signature_status: 'unsigned' },
    hashes: h('adq'),
    detections: [yara('IRTriage_Demo_AD_Enumeration_Tool', 'medium', ['T1087.002'], { description: 'Binary containing LDAP filter strings characteristic of bulk directory enumeration tooling.', matchDetail: '$ldap_filter', matchOffset: 8452 })],
  });
  wks({
    label: 'di.adq.run', ms: D2 + 2 * HOUR + 13 * MIN + 2000,
    source: 'execution', artifact: 'Windows.Forensics.Prefetch', timestamp_desc: 'LastExecuted', user: 'EU\\alice',
    message: 'ADQ.EXE executed, writing results to the user temp directory',
    target: 'C:\\Users\\alice\\AppData\\Local\\Temp\\adq.exe',
    process: { name: 'adq.exe', image_path: 'C:\\Users\\alice\\AppData\\Local\\Temp\\adq.exe', command_line: 'adq.exe -f "(objectClass=user)" -o C:\\Users\\alice\\AppData\\Local\\Temp\\u.csv', parent_name: 'updatesvc.exe', user: 'EU\\alice' },
    hashes: h('adq'),
    extra: { prefetch_file: 'ADQ.EXE-11C4B7A9.pf', run_count: 1 },
  });
  dc({
    label: 'di.ldap', ms: D2 + 2 * HOUR + 14 * MIN + 10000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\alice',
    message: 'Bulk directory-service access from WKS-CORP-01: 4,118 object reads in 90 seconds',
    target: 'CN=Users,DC=eu,DC=corp,DC=example',
    event: sec(4662, 4410221, DC_FQDN, { logon_id: '0x5a1f04' }),
    network: { src_ip: '10.0.5.41', dst_ip: '10.0.10.10', dst_port: 389, protocol: 'tcp', direction: 'inbound' },
    extra: { access_mask: '0x100', object_count: 4118, object_type: 'organizationalUnit', window_seconds: 90 },
    detections: [sigma('Bulk LDAP Directory Enumeration From A Workstation', 'medium', ['T1087.002', 'T1018'], { description: 'A single workstation read thousands of directory objects in a short window.', falsePositives: ['Identity-governance scanners', 'Vulnerability management discovery'] })],
  });

  // === Phase 5: credential access ============================================
  wks({
    label: 'cr.minidump', ms: D2 + 2 * HOUR + 31 * MIN + 19000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'LSASS minidump via rundll32 comsvcs.dll MiniDump (pid 772 -> C:\\Windows\\Temp\\ls.dmp)',
    target: 'C:\\Windows\\Temp\\ls.dmp',
    process: { pid: 8360, ppid: 7900, name: 'rundll32.exe', image_path: 'C:\\Windows\\System32\\rundll32.exe', command_line: 'rundll32.exe C:\\Windows\\System32\\comsvcs.dll, MiniDump 772 C:\\Windows\\Temp\\ls.dmp full', parent_name: 'updatesvc.exe', integrity_level: 'High', session_id: 2, user: 'EU\\alice' },
    event: sysmon(1, 891120),
    detections: [
      sigma('LSASS Memory Dump via comsvcs.dll MiniDump', 'critical', ['T1003.001'], { description: 'The comsvcs.dll MiniDump export was invoked against the LSASS process id.', matchDetail: 'CommandLine contains comsvcs.dll AND MiniDump' }),
      hayabusa('Cred Dump: comsvcs MiniDump', 'critical', ['T1003.001'], { matchDetail: 'Sysmon 1 CommandLine=comsvcs.dll,MiniDump' }),
    ],
  });
  wks({
    label: 'cr.dmpfile', ms: D2 + 2 * HOUR + 31 * MIN + 24000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created', user: 'SYSTEM',
    message: 'Process minidump written: ls.dmp (56 MB, LSASS signature present)',
    target: 'C:\\Windows\\Temp\\ls.dmp',
    file: { path: 'C:\\Windows\\Temp\\ls.dmp', name: 'ls.dmp', extension: 'dmp', size_bytes: 58720256, mft_entry: 119204, is_allocated: true },
    hashes: h('lsass_dmp'),
    detections: [yara('IRTriage_Demo_LSASS_Minidump', 'critical', ['T1003.001'], { description: 'Minidump stream header combined with lsass.exe module names.', matchDetail: '$mdmp_lsasrv', matchOffset: 4096 })],
  });
  wks({
    label: 'cr.access', ms: D2 + 2 * HOUR + 31 * MIN + 20000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\alice',
    message: 'Process access to lsass.exe granted PROCESS_VM_READ|PROCESS_QUERY_INFORMATION from rundll32.exe',
    target: 'C:\\Windows\\System32\\lsass.exe',
    process: { pid: 8360, name: 'rundll32.exe', image_path: 'C:\\Windows\\System32\\rundll32.exe', parent_name: 'updatesvc.exe', user: 'EU\\alice' },
    event: sysmon(10, 891121),
    extra: { granted_access: '0x1410', target_image: 'C:\\Windows\\System32\\lsass.exe', target_pid: 772 },
    detections: [sigma('Suspicious Process Access To LSASS', 'high', ['T1003.001'], { description: 'A non-security process opened LSASS with read access.' })],
  });
  wks({
    label: 'cr.roast.tool', ms: D2 + 2 * HOUR + 44 * MIN + 8000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created', user: 'EU\\alice',
    message: 'Kerberos ticket-harvesting tool staged: svcq.exe',
    target: 'C:\\Users\\alice\\AppData\\Local\\Temp\\svcq.exe',
    file: { path: 'C:\\Users\\alice\\AppData\\Local\\Temp\\svcq.exe', name: 'svcq.exe', extension: 'exe', size_bytes: 356352, mft_entry: 119311, is_allocated: true, signature_status: 'unsigned' },
    hashes: h('roast'),
    detections: [yara('IRTriage_Demo_Kerberos_Roasting_Tool', 'high', ['T1558.003'], { description: 'Binary containing Kerberos TGS-REQ construction strings and RC4 downgrade markers.', matchDetail: '$tgs_req_rc4', matchOffset: 15872 })],
  });
  dc({
    label: 'cr.roast.4769', ms: D2 + 2 * HOUR + 48 * MIN + 12000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\alice',
    message: 'Kerberos service ticket requested with RC4 encryption for SPN MSSQLSvc/srv-corp-fs02.eu.corp.example:1433',
    target: 'EU\\svc-backup',
    event: sec(4769, 4411880, DC_FQDN, { logon_id: '0x5a1f04' }),
    network: { src_ip: '10.0.5.41', dst_ip: '10.0.10.10', dst_port: 88, protocol: 'tcp', direction: 'inbound' },
    extra: { encryption_type: '0x17 (RC4-HMAC)', service_name: 'EU\\svc-backup', service_spn: 'MSSQLSvc/srv-corp-fs02.eu.corp.example:1433', ticket_options: '0x40810000' },
    detections: [sigma('Kerberoasting: RC4 Service Ticket Requested For A Service Account', 'high', ['T1558.003'], { description: 'A service ticket was requested with the legacy RC4 encryption type from a workstation, the signature of offline SPN cracking.', falsePositives: ['Legacy applications pinned to RC4'] })],
  });
  dc({
    label: 'cr.roast.4769b', ms: D2 + 2 * HOUR + 52 * MIN + 31000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\alice',
    message: 'Second RC4 service ticket requested for SPN cifs/srv-corp-fs02.eu.corp.example',
    target: 'EU\\svc-backup',
    event: sec(4769, 4411903, DC_FQDN, { logon_id: '0x5a1f04' }),
    extra: { encryption_type: '0x17 (RC4-HMAC)', service_name: 'EU\\svc-backup', service_spn: 'cifs/srv-corp-fs02.eu.corp.example' },
    detections: [sigma('Repeated RC4 Service Ticket Requests From One Source', 'high', ['T1558.003'], { description: 'Multiple RC4 TGS requests for different SPNs from a single host within minutes.' })],
  });

  // === Phase 6: lateral movement inside the child domain =====================
  wks({
    label: 'lm.smb', ms: D3 + 3 * HOUR + 10 * MIN + 5000,
    source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'EU\\svc-backup',
    message: 'SMB session from updatesvc.exe to SRV-CORP-FS02 using the recovered service account',
    target: '10.0.5.20:445',
    network: { src_ip: '10.0.5.41', src_port: 52210, dst_ip: '10.0.5.20', dst_port: 445, protocol: 'tcp', direction: 'outbound', state: 'ESTABLISHED' },
    process: { pid: 7900, name: 'updatesvc.exe', image_path: IMPLANT_WKS, user: 'EU\\svc-backup' },
    detections: [sigma('SMB Session From A Beaconing Process Under A Service Account', 'high', ['T1021.002', 'T1078.002'], { description: 'A process already flagged as beaconing authenticated to a peer over SMB as a service account that has never logged on interactively.' })],
  });
  srv({
    label: 'lm.logon', ms: D3 + 3 * HOUR + 10 * MIN + 9000,
    source: 'account', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'LoginTime', user: 'EU\\svc-backup',
    message: 'Network logon (type 3) for EU\\svc-backup from 10.0.5.41 - first ever logon from a workstation',
    target: 'EU\\svc-backup',
    event: sec(4624, 2210544, SRV_FQDN, { logon_type: 3, logon_id: '0x3e7a14' }),
    network: { src_ip: '10.0.5.41', dst_ip: '10.0.5.20', dst_port: 445, direction: 'inbound' },
    detections: [sigma('Service Account Network Logon From A Workstation', 'high', ['T1078.002', 'T1021.002'], { description: 'A service account whose baseline is server-to-server authenticated from a user workstation.' })],
  });
  srv({
    label: 'lm.copy', ms: D3 + 3 * HOUR + 10 * MIN + 40000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created', user: 'EU\\svc-backup',
    message: 'Implant copied to the file server as C:\\Windows\\upd.exe (identical SHA-256 to updatesvc.exe on WKS-CORP-01)',
    target: IMPLANT_SRV,
    file: { path: IMPLANT_SRV, name: 'upd.exe', extension: 'exe', size_bytes: 512000, mft_entry: 64188, is_allocated: true, signature_status: 'unsigned' },
    hashes: h('implant'),
    detections: [yara('IRTriage_Demo_Implant_Loader', 'high', ['T1105', 'T1570'], { description: 'Same loader stub previously seen on WKS-CORP-01.', matchDetail: '$c2_host_str', matchOffset: 20512 })],
  });
  srv({
    label: 'lm.service', ms: D3 + 3 * HOUR + 11 * MIN + 2000,
    source: 'service', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'InstallDate', user: 'EU\\svc-backup',
    message: 'Service installed remotely: SyncHostSvc -> C:\\Windows\\upd.exe (auto start, LocalSystem)',
    target: 'SyncHostSvc',
    event: { channel: 'System', provider: 'Service Control Manager', event_id: 7045, record_id: 5511903, level: 'Information', computer: SRV_FQDN },
    extra: { image_path: IMPLANT_SRV, service_account: 'LocalSystem', service_type: 'user mode service', start_type: 'auto start' },
    detections: [sigma('Service Created Immediately After A Remote Logon', 'high', ['T1543.003', 'T1569.002', 'T1021.002'], { description: 'A new auto-start service was registered within seconds of a network logon from another host.' })],
  });
  srv({
    label: 'lm.run', ms: D3 + 3 * HOUR + 11 * MIN + 20000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'SYSTEM',
    message: 'Implant running as SYSTEM under services.exe: upd.exe',
    target: IMPLANT_SRV,
    process: { pid: 4188, ppid: 928, name: 'upd.exe', image_path: IMPLANT_SRV, command_line: 'C:\\Windows\\upd.exe -svc', parent_name: 'services.exe', integrity_level: 'System', session_id: 0, user: 'SYSTEM' },
    event: sysmon(1, 5512004),
    hashes: h('implant'),
    detections: [sigma('Unsigned Service Binary Running As SYSTEM From C:\\Windows', 'high', ['T1543.003'], { description: 'An unsigned binary placed directly in C:\\Windows is running with SYSTEM integrity.' })],
  });
  srv({
    label: 'lm.c2', ms: D3 + 3 * HOUR + 14 * MIN + 51000,
    source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'SYSTEM',
    message: 'Second-stage C2 session from upd.exe to sync-relay.example',
    target: '203.0.113.77:8443',
    network: { src_ip: '10.0.5.20', src_port: 49810, dst_ip: '203.0.113.77', dst_port: 8443, protocol: 'tcp', domain: 'sync-relay.example', direction: 'outbound', state: 'ESTABLISHED' },
    process: { pid: 4188, name: 'upd.exe', image_path: IMPLANT_SRV, user: 'SYSTEM' },
    extra: { beacon_interval_seconds: 300, observed_sessions: 88 },
    detections: [sigma('Server Beaconing To An External Host On A Non-Standard TLS Port', 'high', ['T1071.001', 'T1573.001'], { description: 'A file server established repeated outbound sessions to an external host on 8443.' })],
  });

  // === Phase 7: cross-domain escalation (child -> forest root) ===============
  srv({
    label: 'xd.tool', ms: D4 + 1 * HOUR + 32 * MIN + 14000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created', user: 'SYSTEM',
    message: 'Ticket-manipulation tool staged on the file server: kt.exe',
    target: 'C:\\Windows\\Temp\\kt.exe',
    file: { path: 'C:\\Windows\\Temp\\kt.exe', name: 'kt.exe', extension: 'exe', size_bytes: 1264128, mft_entry: 64510, is_allocated: true, signature_status: 'unsigned' },
    hashes: h('sidinj'),
    detections: [yara('IRTriage_Demo_Ticket_Forging_Tool', 'critical', ['T1558.001', 'T1134.005'], { description: 'Binary containing PAC-construction strings and a SID-history injection template.', matchDetail: '$extra_sids_template', matchOffset: 44160 })],
  });
  srv({
    label: 'xd.tool.run', ms: D4 + 1 * HOUR + 36 * MIN + 2000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'SYSTEM',
    message: 'kt.exe executed with a cross-realm SID-history argument referencing the forest-root Enterprise Admins SID',
    target: 'C:\\Windows\\Temp\\kt.exe',
    process: { pid: 4922, ppid: 4188, name: 'kt.exe', image_path: 'C:\\Windows\\Temp\\kt.exe', command_line: 'kt.exe /domain:eu.corp.example /sids:S-1-5-21-3390-2041-7712-519 /target:corp.example', parent_name: 'upd.exe', integrity_level: 'System', session_id: 0, user: 'SYSTEM' },
    event: sysmon(1, 5512990),
    hashes: h('sidinj'),
    detections: [sigma('SID History Injection Targeting A Parent Domain', 'critical', ['T1134.005', 'T1558.001'], { description: 'A command line referencing the forest-root Enterprise Admins RID (519) was issued from a child-domain member server.' })],
  });
  dc({
    label: 'xd.tgt', ms: D4 + 1 * HOUR + 40 * MIN + 22000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\svc-backup',
    message: 'Cross-realm ticket presented to corp.example carrying ExtraSids for the root-domain Enterprise Admins group',
    target: 'EU\\svc-backup',
    event: sec(4768, 4501120, DC_FQDN, { logon_id: '0x6b2201' }),
    network: { src_ip: '10.0.5.20', dst_ip: '10.0.10.10', dst_port: 88, protocol: 'tcp', direction: 'inbound' },
    extra: { encryption_type: '0x17 (RC4-HMAC)', extra_sids: 'S-1-5-21-3390-2041-7712-519', source_realm: 'EU.CORP.EXAMPLE', target_realm: 'CORP.EXAMPLE' },
    detections: [sigma('Cross-Realm Ticket With Privileged ExtraSids', 'critical', ['T1134.005', 'T1558.001'], { description: 'A ticket crossing the parent/child trust carried a privileged root-domain SID in its ExtraSids field.' })],
  });
  dc({
    label: 'xd.dcsync', ms: D4 + 1 * HOUR + 43 * MIN + 51000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\svc-backup',
    message: 'Directory replication rights exercised by a non-DC principal from 10.0.5.20 (DS-Replication-Get-Changes-All)',
    target: 'DC=corp,DC=example',
    event: sec(4662, 4501204, DC_FQDN, { logon_id: '0x6b2201' }),
    network: { src_ip: '10.0.5.20', dst_ip: '10.0.10.10', dst_port: 135, protocol: 'tcp', direction: 'inbound' },
    extra: { access_mask: '0x100', properties: 'DS-Replication-Get-Changes-All {1131f6ad-9c07-11d1-f79f-00c04fc2dcd2}' },
    detections: [
      sigma('DCSync: Replication Rights Used By A Non-Domain-Controller Account', 'critical', ['T1003.006'], { description: 'The DS-Replication-Get-Changes-All extended right was exercised by an account that is not a domain controller.' }),
      hayabusa('Cred Access: DCSync Replication Right', 'critical', ['T1003.006'], { matchDetail: 'EventID 4662 Properties=1131f6ad' }),
    ],
  });
  dc({
    label: 'xd.create', ms: D4 + 1 * HOUR + 44 * MIN + 3000,
    source: 'account', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\svc-backup',
    message: 'User account created in the FOREST ROOT domain: CORP\\svc-support',
    target: 'CORP\\svc-support',
    event: sec(4720, 4501244, DC_FQDN, { logon_id: '0x6b2201' }),
    extra: { sam_account_name: 'svc-support', target_domain: 'CORP', user_account_control: '%%2080 %%2082 %%2084' },
    detections: [sigma('Account Created In The Forest Root By A Child-Domain Principal', 'high', ['T1136.002'], { description: 'A root-domain account was created by a principal whose home domain is the child domain.' })],
  });
  dc({
    label: 'xd.ea', ms: D4 + 1 * HOUR + 44 * MIN + 11000,
    source: 'account', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'EU\\svc-backup',
    message: 'CORP\\svc-support added to Enterprise Admins (forest-wide privilege)',
    target: 'CN=Enterprise Admins,CN=Users,DC=corp,DC=example',
    event: sec(4728, 4501247, DC_FQDN, { logon_id: '0x6b2201' }),
    extra: { group_name: 'Enterprise Admins', member: 'CN=svc-support,CN=Users,DC=corp,DC=example' },
    detections: [sigma('Member Added To Enterprise Admins', 'critical', ['T1098', 'T1078.002'], { description: 'Membership change on the highest-privilege forest group, outside any change window.' })],
  });
  dc({
    label: 'xd.rdp', ms: D4 + 1 * HOUR + 52 * MIN + 40000,
    source: 'account', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'LoginTime', user: 'CORP\\svc-support',
    message: 'Interactive remote logon (type 10) to the forest-root DC by the newly created account',
    target: 'CORP\\svc-support',
    event: sec(4624, 4501390, DC_FQDN, { logon_type: 10, logon_id: '0x6b3311' }),
    network: { src_ip: '10.0.5.20', dst_ip: '10.0.10.10', dst_port: 3389, protocol: 'tcp', direction: 'inbound' },
    detections: [sigma('RDP Logon By An Account Created Minutes Earlier', 'high', ['T1021.001', 'T1078.002'], { description: 'The account used for this interactive logon was created 8 minutes before it was used.' })],
  });

  // === Phase 8: collection and exfiltration ==================================
  srv({
    label: 'ex8.archiver', ms: D5 + 22 * HOUR + 40 * MIN + 18000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'SYSTEM',
    message: 'Renamed archiver executed against the finance share with an encrypted-header password',
    target: 'C:\\Windows\\Temp\\arch\\a.exe',
    process: { pid: 5330, ppid: 4188, name: 'a.exe', image_path: 'C:\\Windows\\Temp\\arch\\a.exe', command_line: 'a.exe a -t7z -mhe=on -pR3dact3d C:\\Windows\\Temp\\arch\\fin-2026Q1.7z D:\\Finance\\2026Q1', parent_name: 'upd.exe', integrity_level: 'System', session_id: 0, user: 'SYSTEM' },
    event: sysmon(1, 5601220),
    hashes: h('archiver'),
    detections: [sigma('Archive Created With Encrypted Headers By A Service Process', 'high', ['T1560.001', 'T1074.001'], { description: 'An archiver with a renamed executable produced a password-protected archive of a business data share.' })],
  });
  srv({
    label: 'ex8.archive', ms: D5 + 22 * HOUR + 58 * MIN + 2000,
    source: 'filesystem', artifact: 'Windows.NTFS.MFT', timestamp_desc: 'Created', user: 'SYSTEM',
    message: 'Staging archive written: fin-2026Q1.7z (3.4 GB) in C:\\Windows\\Temp',
    target: 'C:\\Windows\\Temp\\arch\\fin-2026Q1.7z',
    file: { path: 'C:\\Windows\\Temp\\arch\\fin-2026Q1.7z', name: 'fin-2026Q1.7z', extension: '7z', size_bytes: 3612479488, mft_entry: 64990, is_allocated: true },
    hashes: h('stage_archive'),
    detections: [sigma('Large Archive Staged In A System Temp Directory', 'high', ['T1074.001'], { description: 'A multi-gigabyte archive of business data was written to C:\\Windows\\Temp.' })],
  });
  srv({
    label: 'ex8.exfil', ms: D5 + 23 * HOUR + 5 * MIN + 44000,
    source: 'network', artifact: 'Windows.Network.Netstat', timestamp_desc: 'EventTime', user: 'SYSTEM',
    message: 'Sustained 3.4 GB outbound transfer to files-transfer-node.example over 47 minutes',
    target: '203.0.113.142:8443',
    network: { src_ip: '10.0.5.20', src_port: 49922, dst_ip: '203.0.113.142', dst_port: 8443, protocol: 'tcp', domain: 'files-transfer-node.example', direction: 'outbound', state: 'ESTABLISHED' },
    process: { pid: 4188, name: 'upd.exe', image_path: IMPLANT_SRV, user: 'SYSTEM' },
    extra: { bytes_received: 1841664, bytes_sent: 3612479488, duration_seconds: 2820 },
    detections: [
      sigma('Large Outbound Transfer To A Newly Observed External Host', 'critical', ['T1041'], { description: 'Volume and destination are both unprecedented for this host; the byte count matches the staged archive exactly.' }),
      hayabusa('Exfil: Large Egress From Server', 'critical', ['T1041'], { matchDetail: 'bytes_sent > 1 GB to external host' }),
    ],
  });
  srv({
    label: 'ex8.delete', ms: D5 + 23 * HOUR + 56 * MIN + 12000,
    source: 'filesystem', artifact: 'Windows.NTFS.USNJrnl', timestamp_desc: 'DeletedTime', user: 'SYSTEM',
    message: 'Staging archive deleted after transfer completed (USN FILE_DELETE)',
    target: 'C:\\Windows\\Temp\\arch\\fin-2026Q1.7z',
    file: { path: 'C:\\Windows\\Temp\\arch\\fin-2026Q1.7z', name: 'fin-2026Q1.7z', extension: '7z', size_bytes: 3612479488, mft_entry: 64990, is_allocated: false },
    extra: { usn: 184992104448, usn_reason: 'FILE_DELETE|CLOSE' },
    detections: [sigma('Staged Archive Deleted Immediately After A Large Egress', 'high', ['T1070.004', 'T1074.001'], { description: 'The archive whose size matches the outbound transfer was deleted minutes after the transfer finished.' })],
  });

  // === Phase 9: anti-forensics ==============================================
  srv({
    label: 'af.wevtutil', ms: D6 + 12 * MIN + 41000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'SYSTEM',
    message: 'Event log cleared from the command line: wevtutil.exe cl Security',
    target: 'C:\\Windows\\System32\\wevtutil.exe',
    process: { pid: 5740, ppid: 4188, name: 'wevtutil.exe', image_path: 'C:\\Windows\\System32\\wevtutil.exe', command_line: 'wevtutil.exe cl Security', parent_name: 'upd.exe', integrity_level: 'System', session_id: 0, user: 'SYSTEM' },
    event: sysmon(1, 5602440),
    detections: [sigma('Event Log Cleared Via wevtutil', 'high', ['T1070.001'], { description: 'wevtutil cl was executed against the Security channel.' })],
  });
  srv({
    label: 'af.1102', ms: D6 + 12 * MIN + 58000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'SYSTEM',
    message: 'The audit log was cleared (the last record before the gap)',
    target: 'Security',
    event: { channel: 'Security', provider: 'Microsoft-Windows-Eventlog', event_id: 1102, record_id: 2211002, level: 'Information', computer: SRV_FQDN },
    detections: [sigma('Security Audit Log Cleared', 'high', ['T1070.001'], { description: 'Event 1102 indicates deliberate destruction of audit history.' })],
  });
  srv({
    label: 'af.vss', ms: D6 + 18 * MIN + 20000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'SYSTEM',
    message: 'All volume shadow copies deleted: vssadmin.exe delete shadows /all /quiet',
    target: 'C:\\Windows\\System32\\vssadmin.exe',
    process: { pid: 5802, ppid: 4188, name: 'vssadmin.exe', image_path: 'C:\\Windows\\System32\\vssadmin.exe', command_line: 'vssadmin.exe delete shadows /all /quiet', parent_name: 'upd.exe', integrity_level: 'System', session_id: 0, user: 'SYSTEM' },
    event: sysmon(1, 5602501),
    detections: [sigma('Shadow Copy Deletion', 'critical', ['T1490'], { description: 'Deleting all shadow copies destroys the most useful recovery and forensic source on the host.' })],
  });
  wks({
    label: 'af.del', ms: D6 + 25 * MIN + 5000,
    source: 'execution', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'ProcessStartTime', user: 'EU\\alice',
    message: 'LSASS dump deleted from the workstation: cmd.exe /c del /f /q C:\\Windows\\Temp\\ls.dmp',
    target: 'C:\\Windows\\Temp\\ls.dmp',
    process: { pid: 9204, ppid: 7900, name: 'cmd.exe', image_path: 'C:\\Windows\\System32\\cmd.exe', command_line: 'cmd.exe /c del /f /q C:\\Windows\\Temp\\ls.dmp', parent_name: 'updatesvc.exe', integrity_level: 'High', session_id: 2, user: 'EU\\alice' },
    event: sysmon(1, 892440),
    detections: [sigma('Indicator Removal: Credential Dump Deleted', 'medium', ['T1070.004'], { description: 'The LSASS minidump created earlier was deleted from disk; the MFT and USN entries survive.' })],
  });
  dc({
    label: 'af.dc1102', ms: D6 + 31 * MIN + 12000,
    source: 'eventlog', artifact: 'Windows.EventLogs.Evtx', collector_kind: 'native',
    timestamp_desc: 'EventTime', user: 'CORP\\svc-support',
    message: 'The audit log was cleared on the forest-root domain controller',
    target: 'Security',
    event: { channel: 'Security', provider: 'Microsoft-Windows-Eventlog', event_id: 1102, record_id: 4502990, level: 'Information', computer: DC_FQDN },
    detections: [sigma('Security Audit Log Cleared On A Domain Controller', 'critical', ['T1070.001'], { description: 'Audit history destroyed on the forest-root DC by the attacker-created account.' })],
  });

  return byHost;
}

// ---------------------------------------------------------------------------
// assembly
// ---------------------------------------------------------------------------

/** The schema's total order: (timestamp_utc, source, artifact, row_hash). */
function sortRows(rows) {
  const cmp = (a, b) => (a < b ? -1 : a > b ? 1 : 0);
  return rows.slice().sort(
    (a, b) =>
      cmp(a.timestamp_utc, b.timestamp_utc) ||
      cmp(a.source, b.source) ||
      cmp(a.artifact, b.artifact) ||
      cmp(a.row_hash, b.row_hash),
  );
}

async function buildHost(host, incidentByHost) {
  const rng = makeRng(host.seed);
  const clock = makeClock(host);
  const templates = BENIGN_TEMPLATES[host.kind];
  if (!templates) throw new Error(`no benign templates for host kind ${host.kind}`);

  const specs = [...baselineSpecs(host), ...sentinelSpecs(host), ...noisySpecs(host)];

  for (let i = 0; i < host.benign; i++) {
    const template = templates[i % templates.length];
    const ms = clock(rng, i);
    specs.push({ ms, ...template(rng) });
  }

  for (const spec of incidentByHost[host.name] ?? []) specs.push(spec);

  const rows = [];
  for (const spec of specs) rows.push(await mkRow(host, spec));
  return sortRows(rows);
}

// --- generation-time coherence checks --------------------------------------
// web/tests/demo.test.mjs re-checks all of this against the committed payload.
// Doing it here too means a broken narrative fails LOUDLY at generation time
// rather than shipping a timeline whose entities do not resolve.

const ASSET_IPS = new Set(INTERNAL_ASSETS.map((a) => a.ip));
const KNOWN_USERS = new Set(USER_ROLES.map(([u]) => u));
const KNOWN_DOMAINS = new Set([...BENIGN_DOMAINS, ...ATTACKER_DOMAINS.map((d) => d.domain)]);
const ATTACKER_IP_SET = new Set(ATTACKER_IPS.map((a) => a.ip));

function isInternalIp(ip) {
  return ip.startsWith('10.');
}

function checkCoherence(byHostRows) {
  const problems = [];
  const allHashes = new Map(); // row_hash -> host
  const fileHashes = new Map(); // file name -> sha256

  for (const [hostName, rows] of byHostRows) {
    const processNames = new Set();
    for (const r of rows) if (r.process?.name) processNames.add(r.process.name);

    for (const r of rows) {
      if (allHashes.has(r.row_hash)) {
        problems.push(`duplicate row_hash ${r.row_hash} (${allHashes.get(r.row_hash)} and ${hostName})`);
      }
      allHashes.set(r.row_hash, hostName);

      if (r.process?.parent_name && !processNames.has(r.process.parent_name)) {
        problems.push(`${hostName}: parent process "${r.process.parent_name}" is never observed as a process on this host (row: ${r.message})`);
      }
      if (r.user && !KNOWN_USERS.has(r.user)) {
        problems.push(`${hostName}: unknown principal "${r.user}"`);
      }
      for (const ip of [r.network?.src_ip, r.network?.dst_ip]) {
        if (!ip) continue;
        if (isInternalIp(ip)) {
          if (!ASSET_IPS.has(ip)) problems.push(`${hostName}: internal IP ${ip} is not a known asset`);
        } else if (!ATTACKER_IP_SET.has(ip)) {
          problems.push(`${hostName}: external IP ${ip} is not declared attacker infrastructure`);
        }
      }
      if (r.network?.domain && !KNOWN_DOMAINS.has(r.network.domain)) {
        problems.push(`${hostName}: undeclared domain ${r.network.domain}`);
      }
      if (r.file?.name && r.hashes?.sha256) {
        const prev = fileHashes.get(r.file.name);
        if (prev && prev !== r.hashes.sha256) {
          problems.push(`file ${r.file.name} carries two different SHA-256 values`);
        }
        fileHashes.set(r.file.name, r.hashes.sha256);
      }
    }
  }
  if (problems.length) {
    throw new Error(`demo dataset is incoherent:\n  - ${problems.slice(0, 25).join('\n  - ')}`);
  }
}

// ---------------------------------------------------------------------------
// the narrative: the story the data encodes, citing real row_hash values
// ---------------------------------------------------------------------------

function narrative() {
  const ev = (...labels) => labels.map((l) => {
    const hash = LABELLED.get(l);
    if (!hash) throw new Error(`narrative cites label "${l}" but no row carries it`);
    return hash;
  });

  return [
    {
      id: 'p1', order: 1, tactic: 'Initial Access',
      title: 'Finance-themed lure downloaded and opened on WKS-CORP-01',
      hosts: ['WKS-CORP-01'], techniques: ['T1566.002', 'T1204.002'],
      start_utc: '2026-03-09T09:04:12.0000000Z', end_utc: '2026-03-09T09:13:58.0000000Z',
      summary: 'EU\\alice received external mail with an SPF softfail, downloaded Invoice_Q1_2026.xlsm from invoices.billing-portal.example (first observation of that domain in the environment) and opened it in Excel. The download carries Mark-of-the-Web zone 3 and an unsigned macro-enabled document hash.',
      evidence: ev('ia.mail', 'ia.download', 'ia.file', 'ia.open'),
    },
    {
      id: 'p2', order: 2, tactic: 'Execution',
      title: 'Macro chain drops a loader that beacons to cdn-sync-updates.example',
      hosts: ['WKS-CORP-01'], techniques: ['T1059.007', 'T1059.001', 'T1027', 'T1105', 'T1071.001', 'T1573.001'],
      start_utc: '2026-03-09T09:14:02.0000000Z', end_utc: '2026-03-09T09:18:22.0000000Z',
      summary: 'EXCEL.EXE spawned wscript.exe running a dropped JScript file, which launched hidden encoded PowerShell. PowerShell retrieved updatesvc.exe into %APPDATA%\\Sync and ran it; the implant then established 60-second-interval sessions to 198.51.100.24:443. The full parent chain EXCEL.EXE -> wscript.exe -> powershell.exe -> updatesvc.exe is present in the data.',
      evidence: ev('ex.wscript', 'ex.dropper', 'ex.powershell', 'ex.c2', 'ex.implant.file', 'ex.implant.run', 'ex.prefetch', 'ex.beacon'),
    },
    {
      id: 'p3', order: 3, tactic: 'Persistence',
      title: 'Two redundant autostart mechanisms installed',
      hosts: ['WKS-CORP-01'], techniques: ['T1547.001', 'T1053.005'],
      start_utc: '2026-03-09T09:22:10.0000000Z', end_utc: '2026-03-09T09:23:02.0000000Z',
      summary: 'A per-user Run value (SyncUpdater) and a scheduled task under a Microsoft-looking path (\\Microsoft\\Windows\\Sync\\SyncUpdateTask) both point at the same AppData binary. Security event 4698 independently corroborates the task registry artefact.',
      evidence: ev('pe.runkey', 'pe.task', 'pe.task.evt'),
    },
    {
      id: 'p4', order: 4, tactic: 'Discovery',
      title: 'Off-hours host, group and forest-trust enumeration',
      hosts: ['WKS-CORP-01', 'DC-CORP-01'], techniques: ['T1033', 'T1069.002', 'T1482', 'T1087.002', 'T1018'],
      start_utc: '2026-03-10T02:05:11.0000000Z', end_utc: '2026-03-10T02:14:10.0000000Z',
      summary: 'Between 02:05 and 02:15 the implant ran whoami /all, enumerated Domain Admins, and used nltest /domain_trusts to discover that eu.corp.example is a child of corp.example. A staged tool (adq.exe) then read 4,118 directory objects in 90 seconds, visible on DC-CORP-01 as bulk event-4662 activity sourced from 10.0.5.41.',
      evidence: ev('di.whoami', 'di.netgroup', 'di.trusts', 'di.adq.file', 'di.adq.run', 'di.ldap'),
    },
    {
      id: 'p5', order: 5, tactic: 'Credential Access',
      title: 'LSASS dumped and a service account kerberoasted',
      hosts: ['WKS-CORP-01', 'DC-CORP-01'], techniques: ['T1003.001', 'T1558.003'],
      start_utc: '2026-03-10T02:31:19.0000000Z', end_utc: '2026-03-10T02:52:31.0000000Z',
      summary: 'rundll32 invoked the comsvcs.dll MiniDump export against LSASS (pid 772), producing a 56 MB dump that YARA identifies from its minidump and lsasrv strings; Sysmon event 10 independently records the PROCESS_VM_READ handle. Twenty minutes later two RC4 service tickets were requested for EU\\svc-backup SPNs - the account that authenticates to the file server the following night.',
      evidence: ev('cr.minidump', 'cr.dmpfile', 'cr.access', 'cr.roast.tool', 'cr.roast.4769', 'cr.roast.4769b'),
    },
    {
      id: 'p6', order: 6, tactic: 'Lateral Movement',
      title: 'Pivot to SRV-CORP-FS02 as EU\\svc-backup',
      hosts: ['WKS-CORP-01', 'SRV-CORP-FS02'], techniques: ['T1021.002', 'T1078.002', 'T1543.003', 'T1569.002', 'T1570', 'T1071.001', 'T1573.001'],
      start_utc: '2026-03-11T03:10:05.0000000Z', end_utc: '2026-03-11T03:14:51.0000000Z',
      summary: 'The implant opened SMB to 10.0.5.20 as EU\\svc-backup; the file server records the matching type-3 logon from 10.0.5.41 four seconds later. The loader was copied in as C:\\Windows\\upd.exe with a SHA-256 identical to updatesvc.exe on the workstation, registered as the auto-start service SyncHostSvc, and began second-stage beaconing to sync-relay.example.',
      evidence: ev('lm.smb', 'lm.logon', 'lm.copy', 'lm.service', 'lm.run', 'lm.c2'),
    },
    {
      id: 'p7', order: 7, tactic: 'Privilege Escalation',
      title: 'Cross-domain escalation from eu.corp.example to the forest root',
      hosts: ['SRV-CORP-FS02', 'DC-CORP-01'], techniques: ['T1134.005', 'T1558.001', 'T1003.006', 'T1136.002', 'T1098', 'T1021.001', 'T1078.002'],
      start_utc: '2026-03-12T01:32:14.0000000Z', end_utc: '2026-03-12T01:52:40.0000000Z',
      summary: 'From the file server the attacker ran kt.exe with a SID-history argument naming the forest-root Enterprise Admins RID. DC-CORP-01 then logged a cross-realm ticket carrying that privileged ExtraSid, DS-Replication-Get-Changes-All exercised by a non-DC principal from 10.0.5.20, creation of CORP\\svc-support in the root domain, its addition to Enterprise Admins, and an RDP logon by that account eight minutes after it was created. This is the step the two-domain forest makes possible.',
      evidence: ev('xd.tool', 'xd.tool.run', 'xd.tgt', 'xd.dcsync', 'xd.create', 'xd.ea', 'xd.rdp'),
    },
    {
      id: 'p8', order: 8, tactic: 'Collection and Exfiltration',
      title: '3.4 GB of finance data staged and transferred out',
      hosts: ['SRV-CORP-FS02'], techniques: ['T1560.001', 'T1074.001', 'T1041', 'T1070.004'],
      start_utc: '2026-03-13T22:40:18.0000000Z', end_utc: '2026-03-13T23:56:12.0000000Z',
      summary: 'A renamed archiver produced an encrypted-header archive of D:\\Finance\\2026Q1 in C:\\Windows\\Temp. The outbound transfer to files-transfer-node.example moved exactly 3,612,479,488 bytes - byte-for-byte the archive size - after which the archive was deleted, leaving the USN record behind.',
      evidence: ev('ex8.archiver', 'ex8.archive', 'ex8.exfil', 'ex8.delete'),
    },
    {
      id: 'p9', order: 9, tactic: 'Defense Evasion',
      title: 'Audit logs cleared and shadow copies destroyed',
      hosts: ['SRV-CORP-FS02', 'WKS-CORP-01', 'DC-CORP-01'], techniques: ['T1070.001', 'T1490', 'T1070.004'],
      start_utc: '2026-03-14T00:12:41.0000000Z', end_utc: '2026-03-14T00:31:12.0000000Z',
      summary: 'wevtutil cleared the Security channel on the file server (event 1102 is the last record before the gap), all volume shadow copies were deleted, the LSASS dump was removed from the workstation, and the forest-root DC audit log was cleared by the attacker-created account. Filesystem and USN artefacts survive on every host, which is why the acquisition still reconstructs the story.',
      evidence: ev('af.wevtutil', 'af.1102', 'af.vss', 'af.del', 'af.dc1102'),
    },
  ];
}

// Entities the demo is ASSERTED to contain. Authored by hand (not derived from
// the rows), so the test comparing them against the rows is a real check that
// the story is present rather than a tautology.
const KEY_PROCESSES = [
  'EXCEL.EXE', 'wscript.exe', 'powershell.exe', 'updatesvc.exe', 'rundll32.exe',
  'whoami.exe', 'net.exe', 'nltest.exe', 'adq.exe', 'upd.exe', 'kt.exe',
  'a.exe', 'wevtutil.exe', 'vssadmin.exe', 'cmd.exe',
];

// ---------------------------------------------------------------------------
// emit
// ---------------------------------------------------------------------------

const BANNER = (what) => `// GENERATED FILE -- do not edit by hand.
// ${what}
// Regenerate with:  node scripts/gen-demo-dataset.mjs
//
// SYNTHETIC DATA ONLY. Every host, account, address, domain and hash below is
// invented: RFC 5737 documentation IP ranges, the RFC 2606 reserved .example
// TLD, and hashes derived from fixed labels. No real host was ever collected.
// See docs/DEMO.md.
`;

function moduleSource(what, exportName, value) {
  return `${BANNER(what)}
export const ${exportName} = ${JSON.stringify(value, null, 2)};
`;
}

/** Rows are emitted ONE PER LINE rather than pretty-printed: a third smaller
 * over the wire, and a regeneration diff is then row-granular instead of
 * reflowing thousands of indented lines. */
function rowsModuleSource(what, rows) {
  const body = rows.map((r) => `  ${JSON.stringify(r)},`).join('\n');
  return `${BANNER(what)}
export const rows = [
${body}
];
`;
}

async function main() {
  await buildHashes();
  const incidentByHost = incidentSpecs();

  const byHostRows = new Map();
  for (const host of HOSTS) {
    byHostRows.set(host.name, await buildHost(host, incidentByHost));
  }
  checkCoherence(byHostRows);

  const story = narrative();

  // assert the authored entity inventory really is present in the rows
  const allRows = [...byHostRows.values()].flat();
  const seenProcesses = new Set(allRows.map((r) => r.process?.name).filter(Boolean));
  const missingProcesses = KEY_PROCESSES.filter((p) => !seenProcesses.has(p));
  if (missingProcesses.length) {
    throw new Error(`key processes absent from the dataset: ${missingProcesses.join(', ')}`);
  }
  const seenTechniques = new Set(allRows.flatMap((r) => (r.detections || []).flatMap((d) => d.mitre_techniques || [])));
  const missingTechniques = [...new Set(story.flatMap((p) => p.techniques))].filter((t) => !seenTechniques.has(t));
  if (missingTechniques.length) {
    throw new Error(`narrative techniques with no detection in the rows: ${missingTechniques.join(', ')}`);
  }

  // Every intended output is COLLECTED first and emitted at the end, so
  // --check and the default write share one code path. Generating into a
  // buffer and then either writing it or comparing it is what makes --check
  // mean "would this write change anything"; a --check that re-derives the
  // content by a second route could agree with the file while disagreeing with
  // what a real run produces.
  const outputs = [];

  const files = [];
  for (const host of HOSTS) {
    const rows = byHostRows.get(host.name);
    const moduleName = `host-${host.slug}.js`;
    outputs.push({
      name: moduleName,
      source: rowsModuleSource(`Demo timeline rows for ${host.name} (${rows.length} records).`, rows),
    });
    files.push({
      id: host.slug,
      host: host.name,
      host_id: host.host_id,
      domain: host.domain,
      os: host.os,
      role: host.role,
      ip: host.ip,
      module: `./${moduleName}`,
      file_name: `${host.name}-demo.jsonl`,
      row_count: rows.length,
      detection_row_count: rows.filter((r) => r.detection_count > 0).length,
    });
  }

  const manifest = {
    id: 'irtriage-demo-incident-2026-03',
    schema_version: SCHEMA_VERSION,
    title: 'Demo incident: phishing to forest-root compromise and data exfiltration',
    synthetic: true,
    synthetic_notice:
      'SYNTHETIC DATA ONLY. Generated by scripts/gen-demo-dataset.mjs. Every host, account, ' +
      'IP address, domain and file hash is invented; external addresses come from the RFC 5737 ' +
      'documentation ranges and every DNS name uses the RFC 2606 reserved .example TLD. This ' +
      'payload contains no real host data and is safe to publish.',
    generated_by: 'scripts/gen-demo-dataset.mjs',
    platform: 'windows',
    environment: {
      forest: FOREST.name,
      domains: FOREST.domains,
      trust: FOREST.trust,
      note:
        'One forest, two domains - the shape of the GOAD-Light lab this demo stands in for. ' +
        'Three hosts were collected: the forest-root domain controller, a child-domain member ' +
        'server and a child-domain workstation. The child-domain controller DC-EU-01 (10.0.5.10) ' +
        'is referenced by evidence but was NOT collected, which is normal for a scoped triage.',
    },
    collection_window: {
      start_utc: tsAt(WINDOW_START),
      end_utc: tsAt(WINDOW_START + WINDOW_DAYS * DAY),
    },
    row_count: allRows.length,
    detection_row_count: allRows.filter((r) => r.detection_count > 0).length,
    files,
    entities: {
      hosts: HOSTS.map((h) => ({ name: h.name, host_id: h.host_id, ip: h.ip, os: h.os, domain: h.domain, role: h.role })),
      users: USER_ROLES.map(([name, role]) => ({ name, role })),
      internal_assets: INTERNAL_ASSETS,
      attacker_ips: ATTACKER_IPS,
      attacker_domains: ATTACKER_DOMAINS,
      key_processes: KEY_PROCESSES,
      key_files: HASH_LABELS.map(([key, fileName, label]) => ({
        key, file_name: fileName, label, sha256: HASHES[key].sha256,
      })),
    },
    narrative: story,
  };

  outputs.push({
    name: 'manifest.js',
    source: moduleSource('Demo incident manifest: host inventory, entity inventory and the narrative the rows encode.', 'manifest', manifest),
  });

  // --- emit or verify -------------------------------------------------------
  // Previously this script ignored unknown arguments entirely, so
  // `--check` was accepted and then WROTE the files anyway -- the exact
  // opposite of what the flag says, and silently, with exit 0. That made it
  // unusable as a build gate: wiring it in would have had every client build
  // mutate committed files under a flag whose whole purpose is not to.
  if (CHECK_ONLY) {
    const stale = [];
    for (const out of outputs) {
      const target = path.join(OUT_DIR, out.name);
      let current = null;
      try {
        current = await readFile(target, 'utf8');
      } catch (err) {
        if (err?.code !== 'ENOENT') throw err;
      }
      if (current === null) stale.push(`${out.name}: MISSING`);
      else if (current !== out.source) {
        stale.push(`${out.name}: STALE (committed ${current.length} bytes, regenerated ${out.source.length})`);
      }
    }
    if (stale.length) {
      console.error('web/demo is out of date with scripts/gen-demo-dataset.mjs:');
      for (const s of stale) console.error(`  ${s}`);
      console.error('\nRegenerate with:  node scripts/gen-demo-dataset.mjs');
      process.exitCode = 1;
      return;
    }
    console.log(`web/demo is up to date (${outputs.length} files, ${manifest.row_count} rows, ${files.length} hosts).`);
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  for (const out of outputs) {
    await writeFile(path.join(OUT_DIR, out.name), out.source, 'utf8');
  }

  const bytes = allRows.reduce((n, r) => n + JSON.stringify(r).length + 1, 0);
  console.log('web/demo written.');
  for (const f of files) {
    console.log(`  ${f.host.padEnd(14)} ${String(f.row_count).padStart(5)} rows, ${String(f.detection_row_count).padStart(4)} with detections -> ${f.module}`);
  }
  console.log(`  total          ${String(manifest.row_count).padStart(5)} rows, ${manifest.detection_row_count} with detections`);
  console.log(`  narrative      ${story.length} phases, ${story.reduce((n, p) => n + p.evidence.length, 0)} cited evidence rows`);
  console.log(`  JSONL size     ${(bytes / 1024 / 1024).toFixed(2)} MB across ${files.length} files`);
}

main().catch((err) => {
  console.error(err.message);
  process.exitCode = 1;
});
