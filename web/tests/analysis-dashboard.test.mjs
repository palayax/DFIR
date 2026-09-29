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
