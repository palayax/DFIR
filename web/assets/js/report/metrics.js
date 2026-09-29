// Small, pure numeric helpers shared by the HTML dashboard (render.js,
// charts.js) and the PDF exporter (pdf.js), so the two renderers can never
// disagree about what the citation rate or sampling ratio actually is.
//
// Per docs/report_schema.json x-design-notes: dashboard numbers are always
// precomputed/derived here from the report JSON, never invented by a
// renderer, and never re-derived by the model.

/** Finding severity vocabulary, per report_schema.json properties.findings.
 * Deliberately NOT the same list as web/assets/js/lib/severity.js (that one
 * is the *timeline* schema's severity_max enum, which also has "none"). */
export const FINDING_SEVERITY_ORDER = ['informational', 'low', 'medium', 'high', 'critical'];
export const CONFIDENCE_ORDER = ['low', 'moderate', 'high'];

export function findingSeverityRank(sev) {
  const i = FINDING_SEVERITY_ORDER.indexOf(sev);
  return i === -1 ? 0 : i;
}

/** Findings-with-citations / total-findings. An uncited finding is one whose
 * evidence[] is missing or empty. Returns { cited, total, rate } where rate
 * is null when there are no findings at all (avoid reporting a fake 100%). */
export function citationRate(report) {
  const findings = report?.findings ?? [];
  const total = findings.length;
  if (total === 0) return { cited: 0, total: 0, rate: null };
  const cited = findings.filter((f) => Array.isArray(f.evidence) && f.evidence.length > 0).length;
  return { cited, total, rate: cited / total };
}

export function isUncited(finding) {
  return !Array.isArray(finding?.evidence) || finding.evidence.length === 0;
}

/** rows_analysed / row_count, preferring the pipeline-supplied
 * scope.reduction_ratio (it is allowed to encode a strategy other than a
 * plain ratio) and falling back to computing it. Returns null when neither
 * is available - callers must treat null as "unknown", not as "1.0". */
export function reductionRatio(report) {
  const scope = report?.scope;
  if (!scope) return null;
  if (typeof scope.reduction_ratio === 'number') return scope.reduction_ratio;
  if (typeof scope.rows_analysed === 'number' && typeof scope.row_count === 'number' && scope.row_count > 0) {
    return scope.rows_analysed / scope.row_count;
  }
  return null;
}

export function isSampled(report) {
  const r = reductionRatio(report);
  return typeof r === 'number' && r < 1;
}

/** Sort a copy of findings by severity desc, then confidence desc - matching
 * the ordering guarantee report_schema.json documents the pipeline makes,
 * so the UI stays correct even if a hand-built fixture or a repaired report
 * didn't preserve it. */
export function sortFindings(findings) {
  return [...(findings ?? [])].sort((a, b) => {
    const sevDiff = findingSeverityRank(b.severity) - findingSeverityRank(a.severity);
    if (sevDiff !== 0) return sevDiff;
    return CONFIDENCE_ORDER.indexOf(b.confidence) - CONFIDENCE_ORDER.indexOf(a.confidence);
  });
}

export function sum(obj) {
  return Object.values(obj ?? {}).reduce((a, b) => a + (Number(b) || 0), 0);
}

export function formatPercent(ratio, digits = 0) {
  if (typeof ratio !== 'number' || !Number.isFinite(ratio)) return '—';
  return `${(ratio * 100).toFixed(digits)}%`;
}
