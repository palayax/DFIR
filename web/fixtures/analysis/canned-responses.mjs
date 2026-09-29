// web/fixtures/analysis/canned-responses.mjs
//
// Builders for plausible mock-provider responses used by
// tests/analysis-pipeline.test.mjs. Deliberately NOT a static JSON blob:
// row_hash citations must always match whatever pack/records the test
// actually built (which can shift if intrusion-timeline.json is
// regenerated, or if a test uses a different tokenBudget/maxPacks), so
// these builders pull real row_hashes out of the pack/records passed in
// rather than hard-coding hashes that could silently go stale and make a
// test pass for the wrong reason (a hash nobody re-checks against reality).
//
// These functions return plain JSON objects — the CALLER is responsible for
// registering them with a mock provider via
// mockProvider.setCanned(mockProvider.hashRequest(req), { text: JSON.stringify(obj) }).

/** @returns {object[]} the SuperTimeline rows (from `pack.rowHashes`, in pack order) that carry at least one detection. */
function detectionRowsInPack(pack, recordsByHash) {
  return pack.rowHashes.map((h) => recordsByHash.get(h)).filter((r) => r && Array.isArray(r.detections) && r.detections.length > 0);
}

/**
 * Build a map-phase partial-findings response for one evidence pack.
 * If the pack contains no detections at all (pure benign noise), returns an
 * empty-but-valid shape with a note — exercising the "not every pack has
 * something to say" path.
 *
 * @param {object} pack one entry of buildEvidencePacks().packs
 * @param {object[]} records the full SuperTimeline the pack was built from
 * @param {{fabricateRowHash?: boolean}} [opts] fabricateRowHash appends a
 *   syntactically-valid but nonexistent row_hash to the first finding's
 *   evidence, for exercising validate-report.js's fabricated-citation check
 *   and pipeline.js's repair loop.
 */
export function buildCannedMapResponse(pack, records, opts = {}) {
  const byHash = new Map(records.map((r) => [r.row_hash, r]));
  const detRows = detectionRowsInPack(pack, byHash);
  const noisyRows = detRows.filter((r) => r.detections.some((d) => d.rule_id === 'SIGMA-9001'));
  const realRows = detRows.filter((r) => !r.detections.some((d) => d.rule_id === 'SIGMA-9001'));

  const dismissed_detections = noisyRows.map((r) => ({
    engine: r.detections[0].engine,
    rule_id: r.detections[0].rule_id,
    rule_name: r.detections[0].rule_name,
    occurrences: 1,
    rationale: 'Routine PowerShell profile load by the standard corporate logon script; no suspicious command line or child process observed.',
    confidence: 'high',
  }));

  if (realRows.length === 0) {
    return {
      partial_findings: [],
      iocs: {},
      analytic_gaps: [],
      dismissed_detections,
      notes_for_synthesis: `Evidence pack ${pack.index + 1}: no non-benign detections observed in this pack.`,
    };
  }

  const evidence = realRows.slice(0, 4).map((r) => ({
    row_hash: r.row_hash,
    timestamp_utc: r.timestamp_utc,
    host: r.host,
    excerpt: r.message,
    why_relevant: `Matched detection rule ${r.detections[0].rule_name}`,
  }));
  if (opts.fabricateRowHash) {
    evidence.push({
      row_hash: 'f'.repeat(64),
      timestamp_utc: realRows[0].timestamp_utc,
      host: realRows[0].host,
      excerpt: 'fabricated evidence row not present in the supplied timeline',
      why_relevant: 'This citation does not correspond to any real row',
    });
  }

  const mitreTechniques = [...new Set(realRows.flatMap((r) => r.detections.flatMap((d) => d.mitre_techniques || [])))];
  const finding = {
    title: `Suspicious activity: ${realRows[0].detections[0].rule_name}`,
    severity: realRows.reduce((max, r) => (severityWeight(r.severity_max) > severityWeight(max) ? r.severity_max : max), 'informational'),
    confidence: 'high',
    category: categoryFor(realRows[0]),
    narrative: `${realRows[0].message} (row ${realRows[0].row_hash.slice(0, 12)}...) on host ${realRows[0].host}.`,
    evidence,
    mitre_techniques: mitreTechniques,
    affected_hosts: [...new Set(realRows.map((r) => r.host))],
    recommendation: 'Isolate the host and investigate the process tree around this activity.',
    false_positive_considered: 'Considered and rejected: the command line and process lineage are inconsistent with routine administration.',
  };

  return {
    partial_findings: [finding],
    iocs: {},
    analytic_gaps: [],
    dismissed_detections,
    notes_for_synthesis: `Evidence pack ${pack.index + 1}: ${realRows.length} detection-bearing row(s) analysed.`,
  };
}

const SEVERITY_WEIGHTS = { none: 0, informational: 1, low: 2, medium: 3, high: 4, critical: 5 };
function severityWeight(s) {
  return SEVERITY_WEIGHTS[s] ?? 0;
}

function categoryFor(row) {
  if (row.source === 'execution' && /lsass/i.test(row.message || '')) return 'credential_access';
  if (row.source === 'execution') return 'execution';
  if (row.source === 'registry' || row.source === 'scheduled_task') return 'persistence';
  if (row.source === 'network' || row.source === 'service') return 'lateral_movement';
  if (row.source === 'account') return 'credential_access';
  return 'other';
}

/**
 * Build a reduce-phase (final synthesis) response from an array of
 * normalized map results (pipeline.js's `normalizeMapResult` shape, or
 * simply objects with `partial_findings`/`dismissed_detections`).
 *
 * @param {object[]} mapResults
 * @param {{includeBogusComputedFields?: boolean, fabricateRowHash?: boolean}} [opts]
 *   includeBogusComputedFields: also populate dashboard/scope/mitre_coverage
 *   with obviously-wrong values, to prove the pipeline discards them (the
 *   model is instructed never to author these, but a scripted test needs to
 *   verify the *code*, not just the prompt, enforces that).
 */
export function buildCannedReduceResponse(mapResults, opts = {}) {
  const allFindings = mapResults.flatMap((m) => m.partial_findings || []);
  const dismissed = mapResults.flatMap((m) => m.dismissed_detections || []);

  const verdict =
    allFindings.length > 0
      ? {
          assessment: 'likely_compromised',
          confidence: 'high',
          confidence_rationale: 'Multiple corroborating high-severity detections spanning execution, persistence, credential access and lateral movement on the same host in a short window.',
          rationale: 'Encoded PowerShell launched from Word, LSASS memory dumping via comsvcs.dll, a newly-created local administrator account, and SMB lateral movement all chain together into a coherent intrusion.',
          attack_stage: 'lateral_movement',
        }
      : {
          assessment: 'no_evidence_of_compromise',
          confidence: 'moderate',
          confidence_rationale: 'No non-benign detections were present in any evidence pack shown.',
          rationale: 'Only benign noise and previously-dismissed low-fidelity detections were observed.',
        };

  const report = {
    verdict,
    executive_summary: {
      text:
        allFindings.length > 0
          ? 'Evidence indicates a multi-stage intrusion beginning with a malicious Office attachment, progressing through encoded PowerShell execution, registry/scheduled-task persistence, LSASS credential theft, and SMB lateral movement to a peer host.'
          : 'No evidence of compromise was found in the analysed evidence.',
      bullets: allFindings.map((f) => f.title).slice(0, 8),
    },
    findings: allFindings,
    attack_narrative: {
      summary: allFindings.length > 0 ? 'Phishing attachment led to credential theft and lateral movement.' : '',
      phases: [],
    },
    iocs: {},
    recommendations: {
      immediate:
        allFindings.length > 0
          ? [
              {
                action: 'Isolate the affected workstation from the network pending forensic imaging.',
                priority: 'critical',
                rationale: 'Active credential theft and lateral movement were observed.',
                finding_ids: [],
                effort: 'trivial',
              },
            ]
          : [],
      short_term: [],
      long_term: [],
      further_collection: [],
    },
    analytic_gaps: [],
    dismissed_detections: dismissed,
  };

  if (opts.fabricateRowHash && report.findings.length > 0) {
    report.findings = report.findings.map((f, i) =>
      i === 0
        ? {
            ...f,
            evidence: [
              ...(f.evidence || []),
              {
                row_hash: 'e'.repeat(64),
                timestamp_utc: new Date(0).toISOString(),
                host: 'nonexistent-host',
                excerpt: 'fabricated evidence not present in the supplied timeline',
                why_relevant: 'fabricated',
              },
            ],
          }
        : f,
    );
  }

  if (opts.includeBogusComputedFields) {
    // The model is told (see prompts.js) never to author these — scripted
    // here anyway, deliberately wrong, so the pipeline test can prove the
    // *code* discards them, not merely that a well-behaved model omits them.
    report.dashboard = {
      events_over_time: [],
      bucket_size: 'week',
      severity_distribution: { critical: 999999 },
      source_distribution: { bogus: 1 },
      top_detection_rules: [],
      top_processes: [],
      top_paths: [],
      network_endpoints: [],
      accounts_active: [],
      hourly_heatmap: [],
      entity_graph: { nodes: [], edges: [] },
    };
    report.scope = {
      hosts: [{ host: 'BOGUS-HOST-INVENTED-BY-MODEL', row_count: 1 }],
      row_count: 1,
      time_range: {},
      sources: {},
      artifacts: {},
    };
    report.mitre_coverage = [{ technique_id: 'T9999', event_count: 999999, max_severity: 'critical' }];
  }

  return report;
}

export default { buildCannedMapResponse, buildCannedReduceResponse };
