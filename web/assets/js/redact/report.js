// Apply the sensitive-data policy to a finished report, for publication.
//
// This is the piece that makes browser-side redaction actually reachable. The
// engine in ./index.js enforces the policy; this module knows WHERE in a report
// object the governed values live — the same job internal/timeline's
// redact_catalog.go does for a timeline Record.
//
// Why a report needs its own pass even when the timeline was already redacted:
// the model was given real evidence, so it quotes real hostnames, usernames and
// paths back into its narrative, its findings, its IOC panel and its entity graph.
// Redacting the timeline and publishing an un-redacted narrative achieves nothing.

import { Redactor } from './index.js';

/** Profiles offered in the export UI, in increasing order of protection. */
export const REDACT_PROFILES = [
  { id: 'none', label: 'No redaction (verbatim)' },
  { id: 'internal', label: 'Internal sharing (strip secrets, keep identity)' },
  { id: 'publish', label: 'Public publication (pseudonymise everything)' },
];

/**
 * Seed the redactor with the identifiers that appear in THIS report.
 *
 * Patterns recognise shapes; nothing about "WKS-CORP-01" marks it as a hostname.
 * On the client, omitting this step leaked a hostname into 20 timeline rows while
 * the dedicated host column was correctly pseudonymised — so the values are
 * harvested from the report's own structured fields and then scrubbed from every
 * free-text field.
 */
async function seedFromReport(r, report) {
  const hosts = new Set();
  const users = new Set();

  for (const h of report?.scope?.hosts || []) {
    if (h?.host) hosts.add(h.host);
  }
  for (const f of report?.findings || []) {
    for (const h of f.affected_hosts || []) hosts.add(h);
    for (const a of f.affected_accounts || []) users.add(a);
    for (const ev of f.evidence || []) if (ev?.host) hosts.add(ev.host);
  }
  for (const a of report?.dashboard?.accounts_active || []) {
    if (typeof a === 'string') users.add(a);
    else if (a?.account) users.add(a.account);
    else if (a?.name) users.add(a.name);
  }

  for (const h of hosts) await r.seed('timeline.host', h);
  for (const u of users) await r.seed('timeline.user', u);

  // Engagement metadata is `drop` under publish, and it also shows up inside
  // model-authored prose ("during CASE-ACME-001 ...").
  for (const k of ['case_id', 'report_id']) {
    if (report?.meta?.[k]) await r.seed('manifest.engagement', report.meta[k]);
  }
  if (report?.meta?.engagement) {
    for (const v of Object.values(report.meta.engagement)) {
      if (typeof v === 'string') await r.seed('manifest.engagement', v);
    }
  }
}

/** Recursively scan every string in a value with the redactor's free-text pass. */
function scanDeep(value, r, attributeTo) {
  if (typeof value === 'string') return r.text(value, attributeTo);
  if (Array.isArray(value)) return value.map((v) => scanDeep(v, r, attributeTo));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = scanDeep(v, r, attributeTo);
    return out;
  }
  return value;
}

/**
 * Redact a report for publication.
 *
 * Returns `{ report, redaction }` — the redacted copy plus the machine-readable
 * record of what was done. The ORIGINAL is never mutated: an operator who exports
 * a redacted PDF must still have their unredacted report on screen.
 *
 * @param {object} report a report conforming to docs/report_schema.json
 * @param {{profile: string, keyHex?: string}} opts
 */
export async function redactReport(report, { profile, keyHex } = {}) {
  const r = await Redactor.create(profile || 'none', keyHex);
  if (!r.enabled) {
    return { report, redaction: r.buildReport(), redacted: false };
  }

  await seedFromReport(r, report);

  // Deep clone first: structuredClone is native and handles the nested shape
  // without a dependency.
  const out = structuredClone(report);

  // --- identity in structured fields ---------------------------------------
  for (const h of out.scope?.hosts || []) {
    if (h.host) h.host = await r.field('timeline.host', h.host);
  }
  for (const f of out.findings || []) {
    f.affected_hosts = await Promise.all((f.affected_hosts || []).map((h) => r.field('timeline.host', h)));
    f.affected_accounts = await Promise.all((f.affected_accounts || []).map((a) => r.field('timeline.user', a)));
    for (const ev of f.evidence || []) {
      if (ev.host) ev.host = await r.field('timeline.host', ev.host);
      // row_hash is left alone here deliberately: it is the citation key that
      // ties a finding to a timeline row, and the catalogue marks it `review`
      // rather than transforming it. If the timeline was published with
      // recomputed hashes, it must be redacted with the SAME key so these still
      // resolve — which is why the report warns when a random key was used.
    }
  }

  // --- free text -----------------------------------------------------------
  // Everything the model wrote. Scanned rather than dropped: the narrative is the
  // analytic value of the report, and a report with no prose is not a report.
  if (out.executive_summary) out.executive_summary = scanDeep(out.executive_summary, r, 'report.narrative');
  if (out.verdict) out.verdict = scanDeep(out.verdict, r, 'report.narrative');
  if (out.attack_narrative) out.attack_narrative = scanDeep(out.attack_narrative, r, 'report.narrative');
  if (out.recommendations) out.recommendations = scanDeep(out.recommendations, r, 'report.narrative');
  if (out.analytic_gaps) out.analytic_gaps = scanDeep(out.analytic_gaps, r, 'report.narrative');
  if (out.dismissed_detections) out.dismissed_detections = scanDeep(out.dismissed_detections, r, 'report.narrative');

  for (const f of out.findings || []) {
    if (f.title) f.title = r.text(f.title, 'report.narrative');
    if (f.narrative) f.narrative = r.text(f.narrative, 'report.narrative');
    if (f.recommendation) f.recommendation = r.text(f.recommendation, 'report.narrative');
    if (f.false_positive_considered) f.false_positive_considered = r.text(f.false_positive_considered, 'report.narrative');
    for (const ev of f.evidence || []) {
      if (ev.excerpt) ev.excerpt = r.text(ev.excerpt, 'report.evidence_excerpts');
      if (ev.why_relevant) ev.why_relevant = r.text(ev.why_relevant, 'report.evidence_excerpts');
    }
  }

  // The IOC panel deliberately mixes attacker indicators (keep) with victim
  // identifiers (redact), so it is scanned per value rather than kept or dropped
  // wholesale — the private/public IP split inside the engine does the real work.
  if (out.iocs) out.iocs = scanDeep(out.iocs, r, 'report.iocs');

  // Dashboard aggregates are deterministic, but they are aggregates OF
  // identifiers: top accounts, top paths, network endpoints and entity-graph node
  // labels are exactly the customer-identifying values, rolled up.
  for (const k of ['top_processes', 'top_paths', 'network_endpoints', 'accounts_active', 'entity_graph']) {
    if (out.dashboard?.[k]) out.dashboard[k] = scanDeep(out.dashboard[k], r, 'report.dashboard_entities');
  }

  // --- engagement metadata -------------------------------------------------
  if (out.meta) {
    for (const k of ['case_id', 'report_id']) {
      if (out.meta[k]) out.meta[k] = await r.field('report.model_identity', out.meta[k]);
    }
    if (out.meta.engagement) {
      for (const [k, v] of Object.entries(out.meta.engagement)) {
        if (typeof v === 'string' && v) out.meta.engagement[k] = await r.field('report.model_identity', v);
      }
    }
  }

  const redaction = r.buildReport();
  // Carry the record INSIDE the published report as well as alongside it: a
  // reviewer who receives only the PDF or only the JSON must still be able to see
  // that it was redacted, under which profile, and with what caveats.
  out.redaction = redaction;

  return { report: out, redaction, redacted: true };
}

export default redactReport;
