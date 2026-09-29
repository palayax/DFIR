// web/assets/js/analysis/validate-report.js
//
// Validator for docs/report_schema.json (vendored at ./report_schema.json —
// same pattern as web/assets/js/lib/validate-schema.js vendoring the timeline
// schema at web/assets/schema/, and for the same reason: this is a
// backend-less static app, so the schema the browser validates against must
// ship inside web/, not be fetched from docs/ which is outside the deployed
// site root. tests/analysis-validate.test.mjs asserts the vendored copy stays
// byte-identical to docs/report_schema.json.
//
// web/assets/js/lib/validate-schema.js's validateAgainst() is reused as-is
// for structural checks (it is a generic draft-2020-12 subset validator, not
// timeline-specific) — but the report schema uses "$ref": "#/$defs/..." for
// its ioc/recommendation shapes, which validateAgainst does not understand,
// so this module dereferences those before delegating to it.
//
// Beyond schema conformance this module enforces the SEMANTIC checks the
// schema itself cannot express in JSON Schema: every evidence[].row_hash must
// be a row that actually exists in the SuperTimeline (a fabricated citation
// is a hard error - the single most important thing this validator catches,
// per docs/report_schema.json's "everyClaimIsCited" design note), finding
// ids must be unique, mitre_coverage[].technique_id must match the MITRE
// technique pattern (the schema does not put a `pattern` on that property),
// and mitre_coverage[].max_severity must agree with the findings it claims
// support it.

import { validateAgainst } from '../lib/validate-schema.js';
import { severityRank } from '../lib/severity.js';

const SCHEMA_URL = new URL('./report_schema.json', import.meta.url);
const FINDING_ID_PATTERN = /^F-\d{3}$/;
const MITRE_TECHNIQUE_PATTERN = /^T\d{4}(\.\d{3})?$/;
const ROW_HASH_PATTERN = /^[0-9a-f]{64}$/;

let cachedSchema = null;
let cachedDereferenced = null;

export async function loadReportSchema() {
  if (cachedSchema) return cachedSchema;
  const isNode = typeof process !== 'undefined' && !!process.versions?.node;
  let text;
  if (isNode) {
    const { readFile } = await import('node:fs/promises');
    text = await readFile(SCHEMA_URL, 'utf8');
  } else {
    const res = await fetch(SCHEMA_URL);
    text = await res.text();
  }
  cachedSchema = JSON.parse(text);
  return cachedSchema;
}

function resolveRef(ref, root) {
  const m = /^#\/\$defs\/(.+)$/.exec(ref);
  if (!m || !root.$defs || !(m[1] in root.$defs)) {
    throw new Error(`validate-report: unsupported or unknown $ref "${ref}"`);
  }
  return root.$defs[m[1]];
}

/** Deep-clone `node`, replacing every {"$ref": "#/$defs/X"} with the
 * (recursively dereferenced) definition it points to. Guards against cycles,
 * though the report schema has none. */
function dereference(node, root, seen = new Set()) {
  if (Array.isArray(node)) return node.map((n) => dereference(n, root, seen));
  if (node && typeof node === 'object') {
    if (typeof node.$ref === 'string') {
      if (seen.has(node.$ref)) return {};
      const resolved = resolveRef(node.$ref, root);
      return dereference(resolved, root, new Set(seen).add(node.$ref));
    }
    const out = {};
    for (const [k, v] of Object.entries(node)) out[k] = dereference(v, root, seen);
    return out;
  }
  return node;
}

async function getDereferencedSchema() {
  if (cachedDereferenced) return cachedDereferenced;
  const schema = await loadReportSchema();
  cachedDereferenced = dereference(schema, schema);
  return cachedDereferenced;
}

function schemaErrorsToStructured(errors) {
  return errors.map((e) => ({ path: e.path, code: 'schema_violation', message: e.message }));
}

// ---------------------------------------------------------------------------
// semantic checks
// ---------------------------------------------------------------------------

function checkFabricatedCitations(report, validRowHashes) {
  if (!validRowHashes || !Array.isArray(report.findings)) return [];
  const errors = [];
  report.findings.forEach((finding, fi) => {
    (finding.evidence || []).forEach((ev, ei) => {
      if (!ev || typeof ev.row_hash !== 'string') return;
      if (!ROW_HASH_PATTERN.test(ev.row_hash)) return; // schema check already flags malformed hashes
      if (!validRowHashes.has(ev.row_hash)) {
        errors.push({
          path: `$.findings[${fi}].evidence[${ei}].row_hash`,
          code: 'fabricated_citation',
          message: `row_hash ${ev.row_hash} does not correspond to any row in the SuperTimeline that was supplied for validation - this citation is fabricated`,
          findingId: finding.id,
          rowHash: ev.row_hash,
        });
      }
    });
  });
  return errors;
}

function checkFindingIds(report) {
  if (!Array.isArray(report.findings)) return [];
  const errors = [];
  const seen = new Map();
  report.findings.forEach((finding, fi) => {
    const id = finding?.id;
    if (typeof id !== 'string') return; // schema's `required` already flags a missing id
    if (!FINDING_ID_PATTERN.test(id)) {
      errors.push({ path: `$.findings[${fi}].id`, code: 'invalid_finding_id', message: `finding id "${id}" does not match ^F-\\d{3}$` });
    }
    if (seen.has(id)) {
      errors.push({
        path: `$.findings[${fi}].id`,
        code: 'duplicate_finding_id',
        message: `finding id "${id}" is used by more than one finding (also at index ${seen.get(id)})`,
        findingId: id,
      });
    } else {
      seen.set(id, fi);
    }
  });
  return errors;
}

function checkMitreCoverageTechniqueIds(report) {
  if (!Array.isArray(report.mitre_coverage)) return [];
  const errors = [];
  report.mitre_coverage.forEach((entry, i) => {
    const id = entry?.technique_id;
    if (typeof id === 'string' && !MITRE_TECHNIQUE_PATTERN.test(id)) {
      errors.push({
        path: `$.mitre_coverage[${i}].technique_id`,
        code: 'invalid_mitre_technique_id',
        message: `technique_id "${id}" does not match ^T\\d{4}(\\.\\d{3})?$`,
      });
    }
  });
  return errors;
}

function checkSeverityMaxConsistency(report) {
  if (!Array.isArray(report.mitre_coverage) || !Array.isArray(report.findings)) return [];
  const findingsById = new Map(report.findings.filter((f) => typeof f?.id === 'string').map((f) => [f.id, f]));
  const errors = [];
  report.mitre_coverage.forEach((entry, i) => {
    if (!Array.isArray(entry.finding_ids) || entry.finding_ids.length === 0 || !entry.max_severity) return;
    let expected;
    for (const fid of entry.finding_ids) {
      const f = findingsById.get(fid);
      if (!f?.severity) continue;
      if (expected === undefined || severityRank(f.severity) > severityRank(expected)) expected = f.severity;
    }
    if (expected !== undefined && expected !== entry.max_severity) {
      errors.push({
        path: `$.mitre_coverage[${i}].max_severity`,
        code: 'severity_max_mismatch',
        message: `mitre_coverage[${i}].max_severity is "${entry.max_severity}" but the findings it references (${entry.finding_ids.join(', ')}) imply "${expected}"`,
      });
    }
  });
  return errors;
}

// ---------------------------------------------------------------------------
// public API
// ---------------------------------------------------------------------------

/**
 * @param {object} report a candidate report object (parsed JSON).
 * @param {{records?: object[], rowHashes?: Set<string>|Iterable<string>}} [opts]
 *   Pass `records` (SuperTimeline rows) or `rowHashes` to enable the
 *   fabricated-citation check. Without either, that check is skipped (the
 *   validator still runs every other check) - documented rather than silent,
 *   via the returned `skipped` array.
 * @returns {Promise<{valid: boolean, errors: Array<{path?:string, code:string, message:string, findingId?:string, rowHash?:string}>, skipped: string[]}>}
 */
export async function validateReport(report, opts = {}) {
  const skipped = [];
  if (report === null || typeof report !== 'object' || Array.isArray(report)) {
    return { valid: false, errors: [{ code: 'not_an_object', message: 'report is not a JSON object' }], skipped };
  }

  const schema = await getDereferencedSchema();
  const schemaErrors = schemaErrorsToStructured(validateAgainst(schema, report, '$'));

  let validRowHashes = opts.rowHashes ? (opts.rowHashes instanceof Set ? opts.rowHashes : new Set(opts.rowHashes)) : undefined;
  if (!validRowHashes && opts.records) validRowHashes = new Set(opts.records.map((r) => r.row_hash));
  if (!validRowHashes) skipped.push('fabricated_citation (no records/rowHashes supplied)');

  const errors = [
    ...schemaErrors,
    ...checkFabricatedCitations(report, validRowHashes),
    ...checkFindingIds(report),
    ...checkMitreCoverageTechniqueIds(report),
    ...checkSeverityMaxConsistency(report),
  ];

  return { valid: errors.length === 0, errors, skipped };
}

/** Human-readable formatting, e.g. for logs or a repair-prompt fallback. */
export function formatReportErrors(errors) {
  return errors.map((e) => `${e.path ? `${e.path}: ` : ''}${e.message}${e.code ? ` [${e.code}]` : ''}`).join('\n');
}

export default validateReport;
