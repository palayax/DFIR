// Severity ordering shared by merge, ingest and the (future) report dashboard.
// Matches docs/timeline_schema.json properties.severity_max.enum exactly.

export const SEVERITY_ORDER = ['none', 'informational', 'low', 'medium', 'high', 'critical'];

export function severityRank(severity) {
  const i = SEVERITY_ORDER.indexOf(severity);
  return i === -1 ? 0 : i;
}

export function maxSeverityOf(a, b) {
  return severityRank(a) >= severityRank(b) ? a : b;
}

/** severity_max derived from a detections[] array, per the schema's denormalization note. */
export function severityMaxOfDetections(detections) {
  if (!detections || detections.length === 0) return 'none';
  let best = 'none';
  for (const d of detections) {
    if (severityRank(d.severity) > severityRank(best)) best = d.severity;
  }
  return best;
}
