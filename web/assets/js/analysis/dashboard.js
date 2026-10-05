// web/assets/js/analysis/dashboard.js
//
// computeDashboard(records, opts) -> { dashboard, scope }
//
// Produces report.dashboard and report.scope from docs/report_schema.json
// DETERMINISTICALLY from the SuperTimeline alone. No model call happens here
// and none ever should: see x-design-notes.dashboardDataIsPrecomputed in the
// schema. pipeline.js calls this once up front and later overwrites whatever
// the model returns for `dashboard`/`scope` with this function's output, so
// every number behind a chart is always traceable to real rows.
//
// Pure and order-independent: computeDashboard(shuffle(records)) deep-equals
// computeDashboard(records) for every field (verified in
// tests/analysis-dashboard.test.mjs). This matters because SuperTimeline
// row order is a merge-sort artifact, not an analytic signal.

import { SEVERITY_ORDER, severityRank, maxSeverityOf } from '../lib/severity.js';
import { isUnknownTimestamp } from '../lib/timestamp.js';

const FINDING_SEVERITY_ORDER = SEVERITY_ORDER.filter((s) => s !== 'none');

/** Adaptive bucket-size thresholds, keyed by the timeline's total span in ms.
 * Deliberately simple fixed cutoffs (documented, not tuned) so the choice is
 * reproducible and testable with exact boundary fixtures. */
export const BUCKET_SPAN_THRESHOLDS_MS = {
  minute: 6 * 60 * 60 * 1000, // span <= 6h -> minute buckets
  hour: 14 * 24 * 60 * 60 * 1000, // span <= 14d -> hour buckets
  day: 180 * 24 * 60 * 60 * 1000, // span <= 180d -> day buckets
  // else -> week
};

export const DEFAULT_TOP_N = 15;

// Entity-graph caps. 500 is deliberately ABOVE report/entity-graph.js's
// ENTITY_GRAPH_NODE_THRESHOLD of 300, so a graph large enough to need the ranked
// fallback still has material for that fallback to rank, while the emitted JSON
// stays bounded. See computeEntityGraph for the measurement that forced these.
export const DEFAULT_MAX_ENTITY_NODES = 500;
export const DEFAULT_MAX_ENTITY_NODES_PER_KIND = 100;

function parseMs(ts) {
  if (!ts || isUnknownTimestamp(ts)) return undefined;
  const ms = Date.parse(ts);
  return Number.isNaN(ms) ? undefined : ms;
}

/** Choose bucket_size from the span between the earliest and latest known
 * timestamps. Exported so pipeline/tests can reason about the boundary
 * without recomputing it from a full record set. */
export function chooseBucketSize(spanMs) {
  if (!(spanMs > 0)) return 'hour'; // single instant or degenerate span
  if (spanMs <= BUCKET_SPAN_THRESHOLDS_MS.minute) return 'minute';
  if (spanMs <= BUCKET_SPAN_THRESHOLDS_MS.hour) return 'hour';
  if (spanMs <= BUCKET_SPAN_THRESHOLDS_MS.day) return 'day';
  return 'week';
}

const BUCKET_MS = { minute: 60 * 1000, hour: 60 * 60 * 1000, day: 24 * 60 * 60 * 1000 };

/** Truncate an epoch-ms instant down to the start of its bucket, in UTC.
 * 'week' buckets start on Monday 00:00:00 UTC (ISO-ish; no ISO week-number
 * dependency, just a fixed, deterministic anchor). */
function bucketStartMs(ms, bucketSize) {
  if (bucketSize === 'week') {
    const d = new Date(ms);
    const dayStart = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    const dow = new Date(dayStart).getUTCDay(); // 0=Sun..6=Sat
    const daysSinceMonday = (dow + 6) % 7;
    return dayStart - daysSinceMonday * BUCKET_MS.day;
  }
  const size = BUCKET_MS[bucketSize];
  return Math.floor(ms / size) * size;
}

function addBucket(ms, bucketSize) {
  if (bucketSize === 'week') return ms + 7 * BUCKET_MS.day;
  return ms + BUCKET_MS[bucketSize];
}

function severityOf(record) {
  return record.severity_max || 'none';
}

function bump(map, key, n = 1) {
  map.set(key, (map.get(key) || 0) + n);
}

function objFromCountMap(map) {
  const out = {};
  for (const [k, v] of map) out[k] = v;
  return out;
}

function topNSorted(entries, topN, tieBreakKey) {
  return entries
    .slice()
    .sort((a, b) => b.count - a.count || String(a[tieBreakKey]).localeCompare(String(b[tieBreakKey])))
    .slice(0, topN);
}

// ---------------------------------------------------------------------------
// scope
// ---------------------------------------------------------------------------

function computeScope(records) {
  const hostMap = new Map(); // `${host}\u0000${host_id||''}` -> agg
  const sources = new Map();
  const artifacts = new Map();
  let earliestMs;
  let latestMs;

  for (const rec of records) {
    const hostKey = `${rec.host || ''}\u0000${rec.host_id || ''}`;
    let h = hostMap.get(hostKey);
    if (!h) {
      h = { host: rec.host, host_id: rec.host_id, row_count: 0, first_event_utc: undefined, last_event_utc: undefined };
      hostMap.set(hostKey, h);
    }
    h.row_count++;

    const ms = parseMs(rec.timestamp_utc);
    if (ms !== undefined) {
      if (h.first_event_utc === undefined || rec.timestamp_utc < h.first_event_utc) h.first_event_utc = rec.timestamp_utc;
      if (h.last_event_utc === undefined || rec.timestamp_utc > h.last_event_utc) h.last_event_utc = rec.timestamp_utc;
      if (earliestMs === undefined || ms < earliestMs) earliestMs = ms;
      if (latestMs === undefined || ms > latestMs) latestMs = ms;
    }

    bump(sources, rec.source || 'other');
    bump(artifacts, rec.artifact || 'unknown');
  }

  const hosts = [...hostMap.values()]
    .map((h) => (h.host_id ? h : { host: h.host, row_count: h.row_count, first_event_utc: h.first_event_utc, last_event_utc: h.last_event_utc }))
    .sort((a, b) => (a.host || '').localeCompare(b.host || '') || (a.host_id || '').localeCompare(b.host_id || ''));

  const time_range = {};
  if (earliestMs !== undefined) time_range.start_utc = new Date(earliestMs).toISOString();
  if (latestMs !== undefined) time_range.end_utc = new Date(latestMs).toISOString();

  return {
    hosts,
    row_count: records.length,
    time_range,
    sources: objFromCountMap(sources),
    artifacts: objFromCountMap(artifacts),
    _earliestMs: earliestMs,
    _latestMs: latestMs,
  };
}

// ---------------------------------------------------------------------------
// events_over_time + hourly_heatmap
// ---------------------------------------------------------------------------

function computeEventsOverTime(records, earliestMs, latestMs, bucketSize) {
  if (earliestMs === undefined || latestMs === undefined) return [];

  const buckets = new Map(); // bucketStartIso -> { count, bySeverity: Map }
  for (const rec of records) {
    const ms = parseMs(rec.timestamp_utc);
    if (ms === undefined) continue;
    const startMs = bucketStartMs(ms, bucketSize);
    const key = startMs;
    let b = buckets.get(key);
    if (!b) {
      b = { count: 0, bySeverity: new Map() };
      buckets.set(key, b);
    }
    b.count++;
    bump(b.bySeverity, severityOf(rec));
  }

  const firstBucket = bucketStartMs(earliestMs, bucketSize);
  const lastBucket = bucketStartMs(latestMs, bucketSize);
  const out = [];
  for (let ms = firstBucket; ms <= lastBucket; ms = addBucket(ms, bucketSize)) {
    const b = buckets.get(ms);
    out.push({
      bucket_utc: new Date(ms).toISOString(),
      count: b ? b.count : 0,
      by_severity: b ? objFromCountMap(b.bySeverity) : {},
    });
  }
  return out;
}

function computeHourlyHeatmap(records) {
  const grid = new Map(); // `${dow}\u0000${hour}` -> count
  for (const rec of records) {
    const ms = parseMs(rec.timestamp_utc);
    if (ms === undefined) continue;
    const d = new Date(ms);
    const key = `${d.getUTCDay()}\u0000${d.getUTCHours()}`;
    bump(grid, key);
  }
  return [...grid.entries()]
    .map(([key, count]) => {
      const [dow, hour] = key.split('\u0000').map(Number);
      return { day_of_week: dow, hour, count };
    })
    .sort((a, b) => a.day_of_week - b.day_of_week || a.hour - b.hour);
}

// ---------------------------------------------------------------------------
// distributions / top-N panels
// ---------------------------------------------------------------------------

function computeDistributions(records, topN) {
  const severity = new Map();
  const source = new Map();
  const rules = new Map(); // `${engine}\u0000${rule_name}` -> {count, severity, engine, rule_name}
  const processes = new Map(); // name -> {count, hosts:Set, severity}
  const paths = new Map(); // path -> {count, hosts:Set, severity}
  const endpoints = new Map(); // key -> {ip,domain,port,count,direction,severity}
  const accounts = new Map(); // user -> {count, hosts:Set, first, last}

  for (const rec of records) {
    const sev = severityOf(rec);
    bump(severity, sev);
    bump(source, rec.source || 'other');

    for (const d of rec.detections || []) {
      const key = `${d.engine}\u0000${d.rule_name}`;
      let r = rules.get(key);
      if (!r) {
        r = { rule_name: d.rule_name, engine: d.engine, count: 0, severity: 'informational' };
        rules.set(key, r);
      }
      r.count++;
      r.severity = maxSeverityOf(r.severity, d.severity);
    }

    if (rec.process?.name) {
      let p = processes.get(rec.process.name);
      if (!p) {
        p = { name: rec.process.name, count: 0, hosts: new Set(), max_severity: 'none' };
        processes.set(rec.process.name, p);
      }
      p.count++;
      if (rec.host) p.hosts.add(rec.host);
      p.max_severity = maxSeverityOf(p.max_severity, sev);
    }

    const filePath = rec.file?.path || (rec.source === 'filesystem' ? rec.target : undefined);
    if (filePath) {
      let p = paths.get(filePath);
      if (!p) {
        p = { path: filePath, count: 0, hosts: new Set(), max_severity: 'none' };
        paths.set(filePath, p);
      }
      p.count++;
      if (rec.host) p.hosts.add(rec.host);
      p.max_severity = maxSeverityOf(p.max_severity, sev);
    }

    if (rec.network && (rec.network.dst_ip || rec.network.domain)) {
      const key = `${rec.network.dst_ip || ''}\u0000${rec.network.domain || ''}\u0000${rec.network.dst_port || ''}`;
      let e = endpoints.get(key);
      if (!e) {
        e = {
          ip: rec.network.dst_ip,
          domain: rec.network.domain,
          port: rec.network.dst_port,
          count: 0,
          direction: rec.network.direction,
          max_severity: 'none',
        };
        endpoints.set(key, e);
      }
      e.count++;
      e.max_severity = maxSeverityOf(e.max_severity, sev);
    }

    if (rec.user) {
      let a = accounts.get(rec.user);
      if (!a) {
        a = { account: rec.user, count: 0, hosts: new Set(), first_seen_utc: undefined, last_seen_utc: undefined };
        accounts.set(rec.user, a);
      }
      a.count++;
      if (rec.host) a.hosts.add(rec.host);
      if (!isUnknownTimestamp(rec.timestamp_utc)) {
        if (!a.first_seen_utc || rec.timestamp_utc < a.first_seen_utc) a.first_seen_utc = rec.timestamp_utc;
        if (!a.last_seen_utc || rec.timestamp_utc > a.last_seen_utc) a.last_seen_utc = rec.timestamp_utc;
      }
    }
  }

  const top_detection_rules = topNSorted([...rules.values()], topN, 'rule_name');
  const top_processes = topNSorted(
    [...processes.values()].map((p) => ({ name: p.name, count: p.count, hosts: [...p.hosts].sort(), max_severity: p.max_severity })),
    topN,
    'name',
  );
  const top_paths = topNSorted(
    [...paths.values()].map((p) => ({ path: p.path, count: p.count, hosts: [...p.hosts].sort(), max_severity: p.max_severity })),
    topN,
    'path',
  );
  const network_endpoints = topNSorted([...endpoints.values()], topN, 'ip');
  const accounts_active = topNSorted(
    [...accounts.values()].map((a) => ({ ...a, hosts: [...a.hosts].sort() })),
    topN,
    'account',
  );

  return {
    severity_distribution: objFromCountMap(severity),
    source_distribution: objFromCountMap(source),
    top_detection_rules,
    top_processes,
    top_paths,
    network_endpoints,
    accounts_active,
  };
}

// ---------------------------------------------------------------------------
// entity_graph
// ---------------------------------------------------------------------------

const NODE_KINDS = ['host', 'process', 'file', 'account', 'ip', 'domain', 'registry', 'service', 'task'];

function nodeId(kind, key) {
  return `${kind}:${key}`;
}

function getOrCreateNode(nodes, kind, key, label) {
  const id = nodeId(kind, key);
  let n = nodes.get(id);
  if (!n) {
    n = { id, label: label ?? key, kind, severity: 'none', event_count: 0 };
    nodes.set(id, n);
  }
  return n;
}

function bumpNode(node, severity) {
  node.event_count++;
  node.severity = maxSeverityOf(node.severity, severity);
}

function bumpEdge(edges, source, target, kind) {
  const key = `${source}\u0000${target}\u0000${kind}`;
  const e = edges.get(key);
  if (e) {
    e.weight++;
  } else {
    edges.set(key, { source, target, kind, weight: 1 });
  }
}

/** Extract the entities present in a single record, keyed by NODE_KINDS
 * (excluding 'host', which every record with a host contributes). Returns an
 * array of {kind, key, label} for entities *other than* host. */
function entitiesOf(rec) {
  const out = [];
  if (rec.process?.name || rec.process?.image_path) {
    const key = `${rec.host || ''}\u0000${rec.process.name || rec.process.image_path}`;
    out.push({ kind: 'process', key, label: rec.process.name || rec.process.image_path });
  }
  const filePath = rec.file?.path || (rec.source === 'filesystem' ? rec.target : undefined);
  if (filePath) out.push({ kind: 'file', key: filePath, label: rec.file?.name || filePath });
  if (rec.user) out.push({ kind: 'account', key: rec.user, label: rec.user });
  if (rec.network?.dst_ip) out.push({ kind: 'ip', key: rec.network.dst_ip, label: rec.network.dst_ip });
  if (rec.network?.domain) out.push({ kind: 'domain', key: rec.network.domain, label: rec.network.domain });
  const regKey = rec.registry?.key || (rec.source === 'registry' ? rec.target : undefined);
  if (regKey) out.push({ kind: 'registry', key: regKey, label: regKey });
  if (rec.source === 'service' && rec.target) out.push({ kind: 'service', key: rec.target, label: rec.target });
  if (rec.source === 'scheduled_task' && rec.target) out.push({ kind: 'task', key: rec.target, label: rec.target });
  return out;
}

function computeEntityGraph(records, opts = {}) {
  const maxNodes = opts.maxEntityNodes ?? DEFAULT_MAX_ENTITY_NODES;
  const maxPerKind = opts.maxEntityNodesPerKind ?? DEFAULT_MAX_ENTITY_NODES_PER_KIND;
  const nodes = new Map();
  const edges = new Map();

  for (const rec of records) {
    const sev = severityOf(rec);
    const others = entitiesOf(rec);

    let hostNode;
    if (rec.host) {
      hostNode = getOrCreateNode(nodes, 'host', rec.host, rec.host);
      bumpNode(hostNode, sev);
    }

    for (const other of others) {
      const n = getOrCreateNode(nodes, other.kind, other.key, other.label);
      bumpNode(n, sev);
      if (hostNode) bumpEdge(edges, hostNode.id, n.id, `host_${other.kind}`);
    }

    // Direct co-occurrence edges between non-host entities seen in the same
    // row: this is what makes the graph a *link* view (e.g. "this process
    // wrote this file") rather than a star graph hanging off each host.
    const process = others.find((o) => o.kind === 'process');
    const account = others.find((o) => o.kind === 'account');
    for (const other of others) {
      if (other.kind === 'process' || other.kind === 'account') continue;
      if (process) bumpEdge(edges, nodeId('process', process.key), nodeId(other.kind, other.key), `process_${other.kind}`);
    }
    if (process && account) bumpEdge(edges, nodeId('account', account.key), nodeId('process', process.key), 'account_process');
  }

  const nodesTotal = nodes.size;
  const edgesTotal = edges.size;

  // CAP WHAT WE EMIT. Every other dashboard aggregate is bounded by topN; this
  // one was not, and on real evidence that is the difference between a report of
  // tens of kilobytes and one of 67 MB.
  //
  // Measured on a real domain-controller collection (480,581 rows): 116,485
  // nodes, of which 116,229 were `file` nodes with event_count 1 -- one per
  // distinct path seen in the MFT walk. 50 MB of the 67 MB report was this
  // single key. No consumer ever read it: report/entity-graph.js renders a force
  // layout only at <= 300 nodes and otherwise falls back to the top 100 by
  // degree, so >99.9% of those nodes were serialized, stored, transferred and
  // parsed to be discarded at render time. It also meant every real run fell
  // through the sessionStorage handoff to the blob-URL path in views/report.js.
  //
  // Selection is deterministic and severity-first, so the cap can never drop an
  // entity that carries a detection in favour of an arbitrary MFT path:
  //   severity desc -> event_count desc -> id asc (total order, no ties)
  // A per-kind cap runs first so one high-cardinality kind cannot crowd out the
  // others -- without it, 100 alphabetically-lucky file paths would displace
  // every service and account.
  //
  // The true totals are reported in `truncated` rather than being silently lost:
  // "showing 500 of 116,485 entities" is a fact an analyst needs, and a graph
  // that quietly claims to be the whole picture is worse than a smaller one that
  // says what it is.
  const byRank = (a, b) => (
    severityRank(b.severity) - severityRank(a.severity)
    || (b.event_count ?? 0) - (a.event_count ?? 0)
    || a.id.localeCompare(b.id)
  );

  const perKind = new Map();
  for (const n of nodes.values()) {
    if (!perKind.has(n.kind)) perKind.set(n.kind, []);
    perKind.get(n.kind).push(n);
  }
  const kept = [];
  for (const kind of [...perKind.keys()].sort()) {
    kept.push(...perKind.get(kind).sort(byRank).slice(0, maxPerKind));
  }
  kept.sort(byRank);
  const selected = kept.slice(0, maxNodes);

  const keptIds = new Set(selected.map((n) => n.id));
  const edgeArr = [...edges.values()]
    .filter((e) => keptIds.has(e.source) && keptIds.has(e.target))
    .sort((a, b) => a.source.localeCompare(b.source) || a.target.localeCompare(b.target) || a.kind.localeCompare(b.kind));

  // Emit in the stable (kind, id) order the renderer and the tests expect; the
  // ranking above decided MEMBERSHIP, not presentation order.
  const nodeArr = selected.sort((a, b) => a.kind.localeCompare(b.kind) || a.id.localeCompare(b.id));

  const graph = { nodes: nodeArr, edges: edgeArr };
  if (nodeArr.length < nodesTotal || edgeArr.length < edgesTotal) {
    graph.truncated = {
      nodes_total: nodesTotal,
      edges_total: edgesTotal,
      nodes_shown: nodeArr.length,
      edges_shown: edgeArr.length,
      selection: 'severity desc, then event_count desc, then id asc; capped per kind then overall',
    };
  }
  return graph;
}

// ---------------------------------------------------------------------------
// public API
// ---------------------------------------------------------------------------

/**
 * @param {object[]} records SuperTimeline rows (docs/timeline_schema.json).
 * @param {{topN?: number}} [opts]
 * @returns {{dashboard: object, scope: object}}
 */
export function computeDashboard(records, opts = {}) {
  const topN = opts.topN ?? DEFAULT_TOP_N;
  const rows = records || [];

  const scopeRaw = computeScope(rows);
  const { _earliestMs, _latestMs, ...scope } = scopeRaw;

  const spanMs = _earliestMs !== undefined && _latestMs !== undefined ? _latestMs - _earliestMs : 0;
  const bucket_size = chooseBucketSize(spanMs);
  const events_over_time = computeEventsOverTime(rows, _earliestMs, _latestMs, bucket_size);
  const hourly_heatmap = computeHourlyHeatmap(rows);
  const distributions = computeDistributions(rows, topN);
  const entity_graph = computeEntityGraph(rows, {
    maxEntityNodes: opts.maxEntityNodes,
    maxEntityNodesPerKind: opts.maxEntityNodesPerKind,
  });

  const dashboard = {
    events_over_time,
    bucket_size,
    ...distributions,
    hourly_heatmap,
    entity_graph,
  };

  return { dashboard, scope };
}

/** Deterministic MITRE technique coverage, computed from detections[] alone
 * (never from the model — see docs/report_schema.json's mitre_coverage
 * description). `findingsById` (optional) is a Map<string, finding> the
 * pipeline builds AFTER it has assigned canonical ids, used only to attach
 * finding_ids/max_severity cross-references without trusting model-supplied
 * counts. */
export function computeMitreCoverage(records, findings = []) {
  const byTechnique = new Map(); // technique_id -> {event_count, max_severity(from detections)}
  for (const rec of records) {
    for (const d of rec.detections || []) {
      for (const t of d.mitre_techniques || []) {
        let entry = byTechnique.get(t);
        if (!entry) {
          entry = { technique_id: t, event_count: 0, max_severity: 'none' };
          byTechnique.set(t, entry);
        }
        entry.event_count++;
        entry.max_severity = maxSeverityOf(entry.max_severity, d.severity);
      }
    }
  }

  for (const f of findings) {
    for (const t of f.mitre_techniques || []) {
      const entry = byTechnique.get(t);
      if (entry) {
        entry.finding_ids = entry.finding_ids || [];
        if (!entry.finding_ids.includes(f.id)) entry.finding_ids.push(f.id);
      }
    }
  }

  return [...byTechnique.values()]
    .sort((a, b) => a.technique_id.localeCompare(b.technique_id))
    .map((e) => ({
      technique_id: e.technique_id,
      event_count: e.event_count,
      max_severity: e.max_severity,
      ...(e.finding_ids ? { finding_ids: e.finding_ids.sort() } : {}),
    }));
}

export { FINDING_SEVERITY_ORDER, severityRank };
export default computeDashboard;
