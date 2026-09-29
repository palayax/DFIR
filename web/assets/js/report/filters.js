// Global filter bar state: parsing/serializing to a URL hash (so a filtered
// view is deep-linkable/shareable) and applying that state to a report's
// findings/events. Pure functions - no DOM - so main.js can wire them to the
// real address bar and report-render.test.mjs can exercise the logic
// directly.
//
// Hash shape (URL-encoded query-string-like, e.g.
// "#q=mimikatz&sev=high,critical&host=WIN-01&src=wineventlog&t0=...&t1=..."):
//   q     - free-text substring match (title/narrative/excerpt, case-insensitive)
//   sev   - comma-separated severities to include
//   host  - comma-separated hostnames to include (matches affected_hosts or evidence host)
//   src   - comma-separated dashboard source-distribution keys (best-effort:
//           findings don't carry a `source` field directly, so this only
//           narrows the events-over-time/evidence view, not the finding list)
//   t0/t1 - ISO time range brush bounds

export const EMPTY_FILTER_STATE = Object.freeze({
  q: '', severity: [], host: [], source: [], t0: '', t1: '', phase: '',
});

export function parseFilterHash(hash) {
  const clean = (hash || '').replace(/^#/, '');
  if (!clean) return { ...EMPTY_FILTER_STATE };
  const params = new URLSearchParams(clean);
  return {
    q: params.get('q') || '',
    severity: (params.get('sev') || '').split(',').filter(Boolean),
    host: (params.get('host') || '').split(',').filter(Boolean),
    source: (params.get('src') || '').split(',').filter(Boolean),
    t0: params.get('t0') || '',
    t1: params.get('t1') || '',
    phase: params.get('phase') || '',
  };
}

export function serializeFilterState(state) {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  if (state.severity?.length) params.set('sev', state.severity.join(','));
  if (state.host?.length) params.set('host', state.host.join(','));
  if (state.source?.length) params.set('src', state.source.join(','));
  if (state.t0) params.set('t0', state.t0);
  if (state.t1) params.set('t1', state.t1);
  if (state.phase) params.set('phase', state.phase);
  const str = params.toString();
  return str ? `#${str}` : '';
}

function matchesText(finding, q) {
  if (!q) return true;
  const needle = q.toLowerCase();
  const haystack = [finding.title, finding.narrative, finding.recommendation, ...(finding.evidence ?? []).map((e) => e.excerpt)]
    .filter(Boolean).join(' \n ').toLowerCase();
  return haystack.includes(needle);
}

function matchesSeverity(finding, severities) {
  return severities.length === 0 || severities.includes(finding.severity);
}

function matchesHost(finding, hosts) {
  if (hosts.length === 0) return true;
  const findingHosts = new Set([...(finding.affected_hosts ?? []), ...(finding.evidence ?? []).map((e) => e.host)].filter(Boolean));
  return hosts.some((h) => findingHosts.has(h));
}

function matchesTimeRange(finding, t0, t1) {
  if (!t0 && !t1) return true;
  const times = (finding.evidence ?? []).map((e) => e.timestamp_utc).filter(Boolean);
  if (times.length === 0) return true; // don't hide uncited/undated findings from a time brush
  return times.some((t) => (!t0 || t >= t0) && (!t1 || t <= t1));
}

function matchesPhase(finding, phase, phaseFindingIds) {
  if (!phase) return true;
  return (phaseFindingIds.get(phase) ?? new Set()).has(finding.id);
}

/** Filter a report's findings[] against filter state. `report` is used only
 * to resolve attack_narrative phase -> finding_ids for the phase filter. */
export function filterFindings(findings, state, report) {
  const phaseFindingIds = new Map();
  for (const p of report?.attack_narrative?.phases ?? []) {
    phaseFindingIds.set(String(p.order), new Set(p.finding_ids ?? []));
  }
  return (findings ?? []).filter((f) => (
    matchesText(f, state.q)
    && matchesSeverity(f, state.severity ?? [])
    && matchesHost(f, state.host ?? [])
    && matchesTimeRange(f, state.t0, state.t1)
    && matchesPhase(f, state.phase, phaseFindingIds)
  ));
}

/** Filter dashboard.events_over_time buckets to a brushed time range. */
export function filterEvents(events, state) {
  if (!state?.t0 && !state?.t1) return events ?? [];
  return (events ?? []).filter((e) => (!state.t0 || e.bucket_utc >= state.t0) && (!state.t1 || e.bucket_utc <= state.t1));
}

/** Filter evidence rows (flattened across findings, or the raw evidence[]
 * array of a single finding) by the same free-text/host/time criteria. */
export function filterEvidenceRows(rows, state) {
  return (rows ?? []).filter((e) => {
    const textOk = !state.q || `${e.excerpt ?? ''} ${e.why_relevant ?? ''}`.toLowerCase().includes(state.q.toLowerCase());
    const hostOk = !(state.host?.length) || state.host.includes(e.host);
    const timeOk = (!state.t0 || !e.timestamp_utc || e.timestamp_utc >= state.t0) && (!state.t1 || !e.timestamp_utc || e.timestamp_utc <= state.t1);
    return textOk && hostOk && timeOk;
  });
}

export function isFilterActive(state) {
  return !!(state.q || state.severity?.length || state.host?.length || state.source?.length || state.t0 || state.t1 || state.phase);
}
