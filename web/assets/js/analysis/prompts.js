// web/assets/js/analysis/prompts.js
//
// Versioned prompt templates for the map-reduce analysis pipeline.
// PROMPT_VERSION is recorded into every report's meta.model.prompt_version
// (docs/report_schema.json) so a change in wording is attributable when a
// conclusion is later re-examined — "determinismBoundary" in the schema's
// x-design-notes exists precisely so an LLM-authored report stays auditable
// even though its content is not deterministic.
//
// No network calls, no provider imports here: this module only builds
// {system, user} strings/objects. pipeline.js is the only caller that turns
// these into an actual LLMRequest and hands it to a provider.

export const PROMPT_VERSION = '1.0.0';

// ---------------------------------------------------------------------------
// Shared system prompt
// ---------------------------------------------------------------------------

/**
 * The rules every phase (map, reduce, repair) must follow. Kept as one
 * shared block so map/reduce/repair can never drift into inconsistent
 * instructions about citation or fabrication.
 */
export const SYSTEM_RULES = `You are a digital forensics and incident response (DFIR) analyst assistant reviewing a SuperTimeline built from host triage collection. You will be shown EVIDENCE PACKS: compact tab-separated excerpts of real timeline rows, each carrying a unique row_hash.

Hard rules, in order of importance:

1. EVERY factual claim you make MUST cite at least one row_hash from the evidence you were actually shown, copied EXACTLY as given (64 lowercase hex characters). A fabricated or approximate row_hash is a serious error - it is WORSE than having no evidence at all, because it looks verifiable but is not. If you cannot find a row_hash that supports a claim, do not make the claim.
2. NEVER invent a host name, file path, IP address, domain, account name, registry key, service name, or scheduled task name that does not literally appear in the evidence you were shown. If you need to refer to an entity to explain reasoning but it is not in the evidence, say so explicitly instead of guessing.
3. When the evidence is insufficient to support a confident conclusion, say so. Use "inconclusive" (for an overall assessment) or a "low" confidence rather than forcing a definitive-sounding answer. Populate analytic_gaps[] with what you could not determine, why (pick the closest reason code), and what additional evidence would resolve it.
4. For every client detection you were shown but judged benign, explain why in dismissed_detections[] with a rationale a reviewer could challenge. Do not silently drop a detection - the client deliberately over-collects and expects you to triage it, not ignore it.
5. You will be told which sections of the final report are computed deterministically from the data (dashboard, scope, mitre_coverage counts) - never try to author those; anything you write there will be discarded and replaced.
6. Respond with STRICT JSON ONLY: no markdown code fences, no prose before or after the JSON object.`;

export function buildSystemPrompt() {
  return SYSTEM_RULES;
}

// ---------------------------------------------------------------------------
// Map phase — analyse one evidence pack
// ---------------------------------------------------------------------------

const MAP_RESPONSE_SHAPE = `Respond with a single JSON object of this shape (omit arrays that are genuinely empty, but include the key with an empty array rather than omitting it entirely):
{
  "partial_findings": [
    {
      "title": string,
      "severity": "informational"|"low"|"medium"|"high"|"critical",
      "confidence": "low"|"moderate"|"high",
      "category": one of "initial_access","execution","persistence","privilege_escalation","defense_evasion","credential_access","discovery","lateral_movement","collection","command_and_control","exfiltration","impact","anti_forensics","misconfiguration","hygiene","other",
      "narrative": string,
      "evidence": [ { "row_hash": string, "timestamp_utc": string, "host": string, "excerpt": string, "why_relevant": string } ],
      "mitre_techniques": [string],
      "affected_hosts": [string],
      "affected_accounts": [string],
      "recommendation": string,
      "false_positive_considered": string
    }
  ],
  "iocs": { "files": [], "hashes": [], "ip_addresses": [], "domains": [], "urls": [], "registry_keys": [], "accounts": [], "processes": [], "scheduled_tasks": [], "services": [] },
  "analytic_gaps": [ { "gap": string, "reason": string, "detail": string, "how_to_close": string } ],
  "dismissed_detections": [ { "engine": string, "rule_id": string, "rule_name": string, "occurrences": number, "rationale": string, "confidence": "low"|"moderate"|"high" } ],
  "notes_for_synthesis": string
}
Each ioc entry, if you include one, looks like { "value": string, "context": string, "occurrences": number, "confidence": "low"|"moderate"|"high", "row_hashes": [string] }.
Only cite row_hash values that appear in the evidence pack below. Do not assign an "id" to findings - that is assigned later when everything is merged.`;

/**
 * @param {{text: string, index: number, rowCount?: number}} pack one entry of buildEvidencePacks().packs
 * @param {number} packCount total number of packs in this run
 * @param {{caseContext?: string}} [opts]
 * @returns {{system: string, user: string}}
 */
export function buildMapPrompt(pack, packCount, opts = {}) {
  const system = buildSystemPrompt();
  const contextLine = opts.caseContext ? `Case context provided by the analyst: ${opts.caseContext}\n\n` : '';
  const user = `${contextLine}You are analysing evidence pack ${pack.index + 1} of ${packCount}. Read every row below before answering. Identify anything suspicious or notable, and anything that looks like a benign detection worth dismissing with a reason.\n\n${pack.text}\n\n${MAP_RESPONSE_SHAPE}`;
  return { system, user };
}

// ---------------------------------------------------------------------------
// Reduce / synthesis phase — merge partial findings into the final report
// ---------------------------------------------------------------------------

const REDUCE_RESPONSE_SHAPE = `Respond with a single JSON object matching this shape exactly (this becomes report.verdict / report.executive_summary / report.findings / report.attack_narrative / report.iocs / report.recommendations / report.analytic_gaps / report.dismissed_detections - do NOT include "dashboard", "scope", "mitre_coverage", "meta", or "provenance": those are computed deterministically and any value you supply for them is discarded):
{
  "verdict": { "assessment": "no_evidence_of_compromise"|"inconclusive"|"suspicious_activity"|"likely_compromised"|"confirmed_compromised", "confidence": "low"|"moderate"|"high", "confidence_rationale": string, "rationale": string, "earliest_suspicious_activity_utc": string, "attack_stage": string },
  "executive_summary": { "text": string, "bullets": [string] },
  "findings": [ { "title": string, "severity": "informational"|"low"|"medium"|"high"|"critical", "confidence": "low"|"moderate"|"high", "category": string, "narrative": string, "evidence": [ { "row_hash": string, "timestamp_utc": string, "host": string, "excerpt": string, "why_relevant": string } ], "mitre_techniques": [string], "affected_hosts": [string], "affected_accounts": [string], "first_seen_utc": string, "last_seen_utc": string, "recommendation": string, "false_positive_considered": string } ],
  "attack_narrative": { "summary": string, "phases": [ { "order": number, "name": string, "start_utc": string, "end_utc": string, "description": string, "mitre_tactic": string, "finding_ids": [string] } ] },
  "iocs": { "files": [], "hashes": [], "ip_addresses": [], "domains": [], "urls": [], "registry_keys": [], "accounts": [], "processes": [], "scheduled_tasks": [], "services": [] },
  "recommendations": { "immediate": [ { "action": string, "priority": "critical"|"high"|"medium"|"low", "rationale": string, "finding_ids": [string], "effort": "trivial"|"moderate"|"significant" } ], "short_term": [], "long_term": [], "further_collection": [] },
  "analytic_gaps": [ { "gap": string, "reason": string, "detail": string, "how_to_close": string } ],
  "dismissed_detections": [ { "engine": string, "rule_id": string, "rule_name": string, "occurrences": number, "rationale": string, "confidence": "low"|"moderate"|"high" } ]
}
Do not invent "id" values that look like they matter - the pipeline assigns final F-### ids itself; you may reference findings by their position/title in attack_narrative.phases[].finding_ids and recommendations[].finding_ids using the same id text you used consistently across findings if you already assigned one, otherwise leave finding_ids empty and rely on title matching.
Merge duplicate findings raised by more than one evidence pack into one finding with the union of their evidence.
attack_narrative may be omitted (or leave phases empty) only when verdict.assessment is "no_evidence_of_compromise".`;

/**
 * @param {object[]} partialFindingsResponses raw parsed JSON from each map call (may include malformed/empty entries, which are skipped)
 * @param {{row_count: number, hosts: object[], time_range: object, rows_analysed?: number, reduction_ratio?: number}} scope precomputed report.scope
 * @param {{reduction_strategy?: string, rows_omitted?: number, pack_count?: number}} provenanceSummary
 * @param {{caseContext?: string}} [opts]
 */
export function buildReducePrompt(partialFindingsResponses, scope, provenanceSummary, opts = {}) {
  const system = buildSystemPrompt();
  const contextLine = opts.caseContext ? `Case context provided by the analyst: ${opts.caseContext}\n\n` : '';
  const scopeLine = `Scope actually analysed: ${scope.row_count} total rows in the SuperTimeline across ${scope.hosts?.length ?? 0} host(s); ${scope.rows_analysed ?? 'an unknown number of'} rows were included in the evidence shown to you (reduction ratio ${scope.reduction_ratio ?? 'unknown'}). Reduction strategy: ${provenanceSummary.reduction_strategy ?? 'unknown'}. Rows omitted by budget: ${provenanceSummary.rows_omitted ?? 'unknown'}.`;
  const partialsText = JSON.stringify(partialFindingsResponses, null, 2);
  const user = `${contextLine}${scopeLine}\n\nBelow are the partial analyses produced independently from ${provenanceSummary.pack_count ?? partialFindingsResponses.length} evidence packs covering different (possibly overlapping) parts of the timeline. Merge them into one coherent final report. Resolve duplicates, drop any partial finding whose only evidence you cannot verify was actually cited with a real row_hash, and produce an overall verdict that reflects the STRENGTH of the combined evidence - do not let one confident-sounding partial finding override a lack of corroboration.\n\nPartial analyses (JSON array):\n${partialsText}\n\n${REDUCE_RESPONSE_SHAPE}`;
  return { system, user };
}

// ---------------------------------------------------------------------------
// Repair phase — fix invalid JSON against validator errors
// ---------------------------------------------------------------------------

/**
 * @param {string} invalidText the model's previous raw text output (may not even be parseable JSON)
 * @param {Array<{path?: string, message: string, code?: string}>} errors structured errors from validate-report.js
 * @param {{expectedShapeHint?: string}} [opts]
 */
export function buildRepairPrompt(invalidText, errors, opts = {}) {
  const system = buildSystemPrompt();
  const errorLines = errors.map((e) => `- ${e.path ? `${e.path}: ` : ''}${e.message}${e.code ? ` [${e.code}]` : ''}`).join('\n');
  const user = `Your previous response failed validation against the report schema. Fix ONLY what is broken and return the corrected JSON object in full - do not truncate, do not add prose, do not wrap it in a code fence.

Validation errors:
${errorLines}

Important: if an error says a row_hash was not found in the evidence (a fabricated citation), REMOVE that evidence entry and, if a finding then has zero evidence left, remove that finding entirely rather than inventing a replacement citation. Losing an unsupported finding is correct behaviour, not a failure.
${opts.expectedShapeHint ? `\nReminder of the expected shape:\n${opts.expectedShapeHint}\n` : ''}
Your previous response:
${invalidText}`;
  return { system, user };
}

export default {
  PROMPT_VERSION,
  buildSystemPrompt,
  buildMapPrompt,
  buildReducePrompt,
  buildRepairPrompt,
};
