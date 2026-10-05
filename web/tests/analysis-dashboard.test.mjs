// web/tests/analysis-dashboard.test.mjs
//
// computeDashboard()/computeMitreCoverage() must be pure and deterministic:
// every number that ends up behind a chart has to be traceable to real rows,
// and must not depend on the order those rows arrived in (SuperTimeline row
// order is a merge-sort artifact, not an analytic signal). This file builds
// a small, fully hand-verified fixture and asserts EXACT expected aggregates
// (not just "some plausible shape"), then re-runs the same fixture shuffled
// to prove order-independence.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { computeDashboard, computeMitreCoverage, chooseBucketSize, BUCKET_SPAN_THRESHOLDS_MS } from '../assets/js/analysis/dashboard.js';

// ---------------------------------------------------------------------------
// chooseBucketSize boundaries
// ---------------------------------------------------------------------------

test('chooseBucketSize: exact boundaries between minute/hour/day/week', () => {
  assert.equal(chooseBucketSize(0), 'hour'); // degenerate/instant span
  assert.equal(chooseBucketSize(BUCKET_SPAN_THRESHOLDS_MS.minute), 'minute');
  assert.equal(chooseBucketSize(BUCKET_SPAN_THRESHOLDS_MS.minute + 1), 'hour');
  assert.equal(chooseBucketSize(BUCKET_SPAN_THRESHOLDS_MS.hour), 'hour');
  assert.equal(chooseBucketSize(BUCKET_SPAN_THRESHOLDS_MS.hour + 1), 'day');
  assert.equal(chooseBucketSize(BUCKET_SPAN_THRESHOLDS_MS.day), 'day');
  assert.equal(chooseBucketSize(BUCKET_SPAN_THRESHOLDS_MS.day + 1), 'week');
});

// ---------------------------------------------------------------------------
// Hand-verified fixture: 11 rows, 2 hosts, 4 accounts, one 10-minute span
// (2026-01-05T10:00Z .. 2026-01-05T10:10Z, all on the same UTC Monday/hour).
// Every dashboard number below was computed by hand against dashboard.js's
// documented aggregation rules — see the PR/session notes for the full
// row-by-row derivation of entity_graph.
// ---------------------------------------------------------------------------

function iso(minuteOffset) {
  return new Date(Date.UTC(2026, 0, 5, 10, minuteOffset, 0)).toISOString();
}

const FIXTURE = [
  { host: 'HOST-A', user: 'alice', source: 'execution', timestamp_utc: iso(0), severity_max: 'none', process: { name: 'cmd.exe' } },
  { host: 'HOST-A', user: 'alice', source: 'execution', timestamp_utc: iso(1), severity_max: 'high', process: { name: 'cmd.exe' }, detections: [{ engine: 'sigma', rule_id: 'R1', rule_name: 'Rule1', severity: 'high', mitre_techniques: ['T1059'] }] },
  { host: 'HOST-A', user: 'bob', source: 'network', timestamp_utc: iso(2), severity_max: 'medium', network: { dst_ip: '1.2.3.4', domain: 'evil.com', dst_port: 443, direction: 'outbound' }, detections: [{ engine: 'sigma', rule_id: 'R2', rule_name: 'Rule2', severity: 'medium', mitre_techniques: ['T1071'] }] },
  { host: 'HOST-B', user: 'carol', source: 'filesystem', timestamp_utc: iso(3), severity_max: 'none', file: { path: 'C:\\a.txt', name: 'a.txt' } },
  { host: 'HOST-B', user: 'carol', source: 'registry', timestamp_utc: iso(4), severity_max: 'low', registry: { key: 'HKLM\\X' }, detections: [{ engine: 'sigma', rule_id: 'R3', rule_name: 'Rule3', severity: 'low', mitre_techniques: ['T1547'] }] },
  { host: 'HOST-A', user: 'alice', source: 'execution', timestamp_utc: iso(5), severity_max: 'none', process: { name: 'cmd.exe' } },
  { host: 'HOST-B', user: 'carol', source: 'network', timestamp_utc: iso(6), severity_max: 'none', network: { dst_ip: '1.2.3.4', domain: 'evil.com', dst_port: 443, direction: 'outbound' } },
  { host: 'HOST-A', user: 'bob', source: 'filesystem', timestamp_utc: iso(7), severity_max: 'none', file: { path: 'C:\\a.txt', name: 'a.txt' } },
  { host: 'HOST-B', user: 'dave', source: 'eventlog', timestamp_utc: iso(8), severity_max: 'none' },
  { host: 'HOST-A', user: 'alice', source: 'execution', timestamp_utc: iso(9), severity_max: 'critical', process: { name: 'powershell.exe' }, detections: [{ engine: 'sigma', rule_id: 'R1', rule_name: 'Rule1', severity: 'critical', mitre_techniques: ['T1059'] }] },
  { host: 'HOST-B', user: 'dave', source: 'eventlog', timestamp_utc: iso(10), severity_max: 'none' },
];

test('computeDashboard: scope is exact', () => {
  const { scope } = computeDashboard(FIXTURE);
  assert.equal(scope.row_count, 11);
  assert.deepEqual(scope.hosts, [
    { host: 'HOST-A', row_count: 6, first_event_utc: iso(0), last_event_utc: iso(9) },
    { host: 'HOST-B', row_count: 5, first_event_utc: iso(3), last_event_utc: iso(10) },
  ]);
  assert.deepEqual(scope.time_range, { start_utc: iso(0), end_utc: iso(10) });
  assert.deepEqual(scope.sources, { execution: 4, network: 2, filesystem: 2, registry: 1, eventlog: 2 });
  assert.deepEqual(scope.artifacts, { unknown: 11 });
});

test('computeDashboard: bucket_size, events_over_time and hourly_heatmap are exact', () => {
  const { dashboard } = computeDashboard(FIXTURE);
  assert.equal(dashboard.bucket_size, 'minute'); // 10 minute span <= 6h threshold

  const expectedSeverityByMinute = ['none', 'high', 'medium', 'none', 'low', 'none', 'none', 'none', 'none', 'critical', 'none'];
  assert.equal(dashboard.events_over_time.length, 11);
  dashboard.events_over_time.forEach((bucket, i) => {
    assert.equal(bucket.bucket_utc, iso(i));
    assert.equal(bucket.count, 1);
    assert.deepEqual(bucket.by_severity, { [expectedSeverityByMinute[i]]: 1 });
  });

  // All 11 rows fall on 2026-01-05 (a UTC Monday, day_of_week=1), hour 10.
  assert.deepEqual(dashboard.hourly_heatmap, [{ day_of_week: 1, hour: 10, count: 11 }]);
});

test('computeDashboard: severity/source distributions and top-N panels are exact', () => {
  const { dashboard } = computeDashboard(FIXTURE);

  assert.deepEqual(dashboard.severity_distribution, { none: 7, high: 1, medium: 1, low: 1, critical: 1 });
  assert.deepEqual(dashboard.source_distribution, { execution: 4, network: 2, filesystem: 2, registry: 1, eventlog: 2 });

  assert.deepEqual(dashboard.top_detection_rules, [
    { rule_name: 'Rule1', engine: 'sigma', count: 2, severity: 'critical' },
    { rule_name: 'Rule2', engine: 'sigma', count: 1, severity: 'medium' },
    { rule_name: 'Rule3', engine: 'sigma', count: 1, severity: 'low' },
  ]);

  assert.deepEqual(dashboard.top_processes, [
    { name: 'cmd.exe', count: 3, hosts: ['HOST-A'], max_severity: 'high' },
    { name: 'powershell.exe', count: 1, hosts: ['HOST-A'], max_severity: 'critical' },
  ]);

  assert.deepEqual(dashboard.top_paths, [{ path: 'C:\\a.txt', count: 2, hosts: ['HOST-A', 'HOST-B'], max_severity: 'none' }]);

  assert.deepEqual(dashboard.network_endpoints, [{ ip: '1.2.3.4', domain: 'evil.com', port: 443, count: 2, direction: 'outbound', max_severity: 'medium' }]);

  assert.deepEqual(dashboard.accounts_active, [
    { account: 'alice', count: 4, hosts: ['HOST-A'], first_seen_utc: iso(0), last_seen_utc: iso(9) },
    { account: 'carol', count: 3, hosts: ['HOST-B'], first_seen_utc: iso(3), last_seen_utc: iso(6) },
    { account: 'bob', count: 2, hosts: ['HOST-A'], first_seen_utc: iso(2), last_seen_utc: iso(7) },
    { account: 'dave', count: 2, hosts: ['HOST-B'], first_seen_utc: iso(8), last_seen_utc: iso(10) },
  ]);
});

test('computeDashboard: entity_graph node/edge counts and key entries are exact', () => {
  const { dashboard } = computeDashboard(FIXTURE);
  const { nodes, edges } = dashboard.entity_graph;

  assert.equal(nodes.length, 12);
  assert.equal(edges.length, 15);

  const nodeById = new Map(nodes.map((n) => [n.id, n]));
  assert.deepEqual(nodeById.get('host:HOST-A'), { id: 'host:HOST-A', label: 'HOST-A', kind: 'host', severity: 'critical', event_count: 6 });
  assert.deepEqual(nodeById.get('host:HOST-B'), { id: 'host:HOST-B', label: 'HOST-B', kind: 'host', severity: 'low', event_count: 5 });
  assert.deepEqual(nodeById.get('account:alice'), { id: 'account:alice', label: 'alice', kind: 'account', severity: 'critical', event_count: 4 });
  assert.deepEqual(nodeById.get('account:dave'), { id: 'account:dave', label: 'dave', kind: 'account', severity: 'none', event_count: 2 });
  assert.deepEqual(nodeById.get('process:HOST-A\u0000cmd.exe'), { id: 'process:HOST-A\u0000cmd.exe', label: 'cmd.exe', kind: 'process', severity: 'high', event_count: 3 });
  assert.deepEqual(nodeById.get('process:HOST-A\u0000powershell.exe'), { id: 'process:HOST-A\u0000powershell.exe', label: 'powershell.exe', kind: 'process', severity: 'critical', event_count: 1 });
  assert.deepEqual(nodeById.get('ip:1.2.3.4'), { id: 'ip:1.2.3.4', label: '1.2.3.4', kind: 'ip', severity: 'medium', event_count: 2 });
  assert.deepEqual(nodeById.get('file:C:\\a.txt'), { id: 'file:C:\\a.txt', label: 'a.txt', kind: 'file', severity: 'none', event_count: 2 });
  assert.deepEqual(nodeById.get('registry:HKLM\\X'), { id: 'registry:HKLM\\X', label: 'HKLM\\X', kind: 'registry', severity: 'low', event_count: 1 });

  // nodes sorted by kind asc, then id asc
  const kinds = nodes.map((n) => n.kind);
  assert.deepEqual(kinds, [...kinds].sort());

  const edgeKey = (e) => `${e.source}\u0000${e.target}\u0000${e.kind}`;
  const edgeByKey = new Map(edges.map((e) => [edgeKey(e), e]));
  assert.equal(edgeByKey.get('host:HOST-A\u0000account:alice\u0000host_account').weight, 4);
  assert.equal(edgeByKey.get('host:HOST-A\u0000account:bob\u0000host_account').weight, 2);
  assert.equal(edgeByKey.get('host:HOST-B\u0000account:carol\u0000host_account').weight, 3);
  assert.equal(edgeByKey.get('host:HOST-A\u0000process:HOST-A\u0000cmd.exe\u0000host_process').weight, 3);
  assert.equal(edgeByKey.get('account:alice\u0000process:HOST-A\u0000cmd.exe\u0000account_process').weight, 3);
  assert.equal(edgeByKey.get('host:HOST-A\u0000ip:1.2.3.4\u0000host_ip').weight, 1);
  assert.equal(edgeByKey.get('host:HOST-B\u0000ip:1.2.3.4\u0000host_ip').weight, 1);

  // edges sorted by source asc, then target asc, then kind asc
  const sortedCopy = edges
    .slice()
    .sort((a, b) => a.source.localeCompare(b.source) || a.target.localeCompare(b.target) || a.kind.localeCompare(b.kind));
  assert.deepEqual(edges, sortedCopy);
});

test('computeDashboard: fully order-independent (shuffled input produces identical output)', () => {
  const shuffled = [...FIXTURE].reverse().sort((a, b) => (a.user > b.user ? 1 : -1));
  assert.notDeepEqual(shuffled.map((r) => r.timestamp_utc), FIXTURE.map((r) => r.timestamp_utc)); // sanity: order actually differs

  const a = computeDashboard(FIXTURE);
  const b = computeDashboard(shuffled);
  assert.deepEqual(a, b);
});

test('computeDashboard: empty input is well-formed, not an error', () => {
  const { dashboard, scope } = computeDashboard([]);
  assert.equal(scope.row_count, 0);
  assert.deepEqual(scope.hosts, []);
  assert.deepEqual(dashboard.events_over_time, []);
  assert.deepEqual(dashboard.severity_distribution, {});
  assert.deepEqual(dashboard.entity_graph, { nodes: [], edges: [] });
});

// ---------------------------------------------------------------------------
// computeMitreCoverage
// ---------------------------------------------------------------------------

test('computeMitreCoverage: counts/max_severity come from detections; finding_ids only from the FINAL findings passed in', () => {
  const records = [
    { detections: [{ severity: 'high', mitre_techniques: ['T1059'] }] },
    { detections: [{ severity: 'critical', mitre_techniques: ['T1059'] }] },
    { detections: [{ severity: 'medium', mitre_techniques: ['T1071.001'] }] },
  ];
  const findings = [
    { id: 'F-001', mitre_techniques: ['T1059'] },
    { id: 'F-002', mitre_techniques: ['T1200'] }, // technique with no detections at all -> ignored
  ];

  const coverage = computeMitreCoverage(records, findings);
  assert.deepEqual(coverage, [
    { technique_id: 'T1059', event_count: 2, max_severity: 'critical', finding_ids: ['F-001'] },
    { technique_id: 'T1071.001', event_count: 1, max_severity: 'medium' },
  ]);
});

test('computeMitreCoverage: with no findings argument, still returns event counts with no finding_ids key', () => {
  const records = [{ detections: [{ severity: 'low', mitre_techniques: ['T1547.001'] }] }];
  assert.deepEqual(computeMitreCoverage(records), [{ technique_id: 'T1547.001', event_count: 1, max_severity: 'low' }]);
});

// ---------------------------------------------------------------------------
// entity_graph cap
//
// Found by running Analyze on real evidence for the first time. A 480,581-row
// domain-controller collection produced an entity graph of 116,485 nodes --
// 116,229 of them `file` nodes with event_count 1, one per distinct path in the
// MFT walk. That was 50 MB of a 67 MB report JSON, and NO consumer ever read it:
// report/entity-graph.js draws a force layout only at <= 300 nodes and otherwise
// renders the top 100 by degree. Every other dashboard aggregate was already
// bounded by topN; this one was not.
//
// The fixtures in this file have a handful of entities, so nothing here could
// have caught it. These tests assert the cap itself, and -- more importantly --
// that the cap can never drop an entity carrying a detection in favour of an
// arbitrary file path.
// ---------------------------------------------------------------------------

/** n distinct file rows, optionally each carrying a detection at `severity`. */
function manyFileRows(n, { startIndex = 0, severity } = {}) {
  const out = new Array(n);
  for (let i = 0; i < n; i++) {
    const k = startIndex + i;
    out[i] = {
      row_hash: String(k).padStart(64, 'a'),
      timestamp_utc: new Date(Date.UTC(2026, 0, 10, 0, 0, 0) + k * 1000).toISOString(),
      host: 'H', source: 'filesystem', artifact: 'Windows.NTFS.MFT',
      // Backslashes DOUBLED. In a template literal `\W` is just "W", `\S` is "S"
      // and `\f` is a FORMFEED, so the single-backslash form silently produced
      // "C:WindowsSystem32\x0Cile-0000000.dll" -- still unique per row, so most
      // assertions here passed while the paths were quietly mangled.
      target: `C:\\Windows\\System32\\file-${String(k).padStart(7, '0')}.dll`,
      message: 'm',
      // severity_max is what dashboard.js's severityOf() reads -- NOT
      // detections[].severity. A fixture that sets only the latter produces
      // severity 'none' everywhere and silently tests nothing, which is how the
      // first version of this test "failed" against correct code.
      ...(severity ? { severity_max: severity, detections: [{ engine: 'sigma', rule_id: `R${k}`, rule_name: `Rule ${k}`, severity }] } : {}),
    };
  }
  return out;
}

test('entity_graph is capped, and reports the TRUE totals rather than losing them silently', () => {
  const { dashboard } = computeDashboard(manyFileRows(3000));
  const g = dashboard.entity_graph;

  assert.ok(g.nodes.length <= 500, `emitted ${g.nodes.length} nodes, cap is 500`);
  assert.ok(g.truncated, 'a capped graph must say so');
  // 3000 distinct paths + 1 host.
  assert.equal(g.truncated.nodes_total, 3001);
  assert.equal(g.truncated.nodes_shown, g.nodes.length);
  assert.equal(g.truncated.edges_shown, g.edges.length);
  assert.ok(g.truncated.selection.length > 0, 'the cap must be auditable');
});

test('entity_graph has no truncated key when nothing was dropped', () => {
  // A small report must be byte-for-byte what it always was: the cap is invisible
  // below the threshold, so existing reports and fixtures do not change shape.
  const { dashboard } = computeDashboard(manyFileRows(5));
  assert.equal(dashboard.entity_graph.truncated, undefined);
  assert.equal(dashboard.entity_graph.nodes.length, 6); // 5 files + 1 host
});

test('entity_graph cap NEVER drops a node carrying a detection', () => {
  // The whole risk of capping: a critical finding's entity being displaced by an
  // alphabetically-lucky MFT path. Selection is severity-first precisely so this
  // cannot happen. 3000 benign files, then one critical.
  const records = [
    ...manyFileRows(3000),
    ...manyFileRows(1, { startIndex: 900_000, severity: 'critical' }),
  ];
  const { dashboard } = computeDashboard(records);
  const g = dashboard.entity_graph;

  // Assert on the FILE node specifically. The host node legitimately inherits
  // the max severity of every row attached to it (bumpNode(hostNode, sev)), so
  // "count the critical nodes" expects 2 here, not 1 -- an earlier version of
  // this assertion read `=== 1` and failed against entirely correct code.
  const criticalFiles = g.nodes.filter((n) => n.kind === 'file' && n.severity === 'critical');
  assert.equal(criticalFiles.length, 1, 'the critical-severity FILE entity must survive the cap');
  assert.match(criticalFiles[0].id, /file-0900000/);
  assert.equal(
    g.nodes.find((n) => n.kind === 'host')?.severity,
    'critical',
    'the host node must carry the max severity of its rows',
  );
});

test('entity_graph keeps every low-cardinality kind -- one kind cannot crowd out the others', () => {
  // Without a per-kind cap, 500 file paths would displace the host, the accounts
  // and the processes, leaving a graph that is technically bounded and
  // analytically useless.
  const records = [
    ...manyFileRows(3000),
    { row_hash: 'b'.repeat(64), timestamp_utc: '2026-01-10T00:00:00.000Z', host: 'H', source: 'execution', user: 'alice', process: { name: 'evil.exe' }, message: 'm', target: 'evil.exe' },
    { row_hash: 'c'.repeat(64), timestamp_utc: '2026-01-10T00:00:01.000Z', host: 'H', source: 'network', network: { dst_ip: '1.2.3.4' }, message: 'm', target: '1.2.3.4' },
    { row_hash: 'd'.repeat(64), timestamp_utc: '2026-01-10T00:00:02.000Z', host: 'H', source: 'service', message: 'm', target: 'EvilSvc' },
  ];
  const { dashboard } = computeDashboard(records);
  const kinds = new Set(dashboard.entity_graph.nodes.map((n) => n.kind));
  for (const k of ['host', 'account', 'process', 'ip', 'service']) {
    assert.ok(kinds.has(k), `kind "${k}" was crowded out of the capped graph`);
  }
});

test('entity_graph edges never reference a node that was capped away', () => {
  // A dangling edge is silently swallowed by the renderer (pos.get returns
  // undefined and the line is skipped) but still inflates the degree counts the
  // ranked fallback sorts by -- so it would quietly mis-rank the node table.
  const { dashboard } = computeDashboard(manyFileRows(3000));
  const ids = new Set(dashboard.entity_graph.nodes.map((n) => n.id));
  for (const e of dashboard.entity_graph.edges) {
    assert.ok(ids.has(e.source), `edge source ${e.source} is not in the emitted node set`);
    assert.ok(ids.has(e.target), `edge target ${e.target} is not in the emitted node set`);
  }
});

test('entity_graph cap is deterministic and order-independent', () => {
  const records = manyFileRows(2000);
  const a = computeDashboard(records).dashboard.entity_graph;
  const shuffled = [...records].reverse();
  const b = computeDashboard(shuffled).dashboard.entity_graph;
  assert.deepEqual(a.nodes.map((n) => n.id), b.nodes.map((n) => n.id));
  assert.deepEqual(a.edges, b.edges);
});
