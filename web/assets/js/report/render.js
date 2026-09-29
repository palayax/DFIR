// Pure HTML-string renderers for the interactive report dashboard (C6).
//
// Every function here is a pure function: (report JSON [, options]) => HTML
// string. No DOM, no globals, no side effects - this is deliberate so
// web/tests/report-render.test.mjs can exercise them under plain Node
// without a browser/DOM shim (per CLAUDE.md: no vendored deps, so no jsdom).
// main.js (browser-only) is what actually injects these strings into the
// live document and wires up interactivity (filtering, tabs, expand/collapse
// - all of which work via plain <details>/<input> HTML features first, JS
// enhancement second).
//
// XSS: every single piece of report-supplied text (titles, narratives,
// excerpts, host/account names, ...) MUST go through escapeHtml before it
// touches a template string. The report is LLM output re-validated by a
// schema, not trusted markup.

import {
  citationRate, reductionRatio, isSampled, isUncited, sortFindings, formatPercent,
} from './metrics.js';

export function escapeHtml(value) {
  if (value == null) return '';
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function esc(v) { return escapeHtml(v); }

function chip(text, cls = '') {
  return `<span class="chip ${cls}">${esc(text)}</span>`;
}

function sevChip(sev) {
  return `<span class="chip chip-finding-sev chip-finding-sev-${esc(sev || 'informational')}">${esc(sev || 'unknown')}</span>`;
}

function confChip(conf) {
  return `<span class="chip chip-confidence chip-confidence-${esc(conf || 'low')}">confidence: ${esc(conf || 'unknown')}</span>`;
}

function list(items, mapFn) {
  if (!items || items.length === 0) return '';
  return `<ul>${items.map((it) => `<li>${mapFn(it)}</li>`).join('')}</ul>`;
}

function emptyNote(text) {
  return `<p class="empty-state report-empty-note">${esc(text)}</p>`;
}

function fmtTs(ts) {
  if (!ts) return '<span class="text-faint">—</span>';
  return `<time class="num mono" datetime="${esc(ts)}">${esc(ts)}</time>`;
}

// ---------------------------------------------------------------------------
// 1. Header
// ---------------------------------------------------------------------------

export function renderHeader(report) {
  const meta = report?.meta ?? {};
  const eng = meta.engagement ?? {};
  const scope = report?.scope ?? {};
  const model = meta.model ?? {};
  const hosts = scope.hosts ?? [];
  const classification = eng.classification && String(eng.classification).trim();
  const ratio = reductionRatio(report);
  const sampled = isSampled(report);
  const { cited, total, rate } = citationRate(report);

  const hostSummary = hosts.length
    ? hosts.map((h) => esc(h.host || h.host_id || 'unknown-host')).join(', ')
    : '<span class="text-faint">no hosts recorded</span>';

  const timeRange = scope.time_range ?? {};
  const rangeText = (timeRange.start_utc || timeRange.end_utc)
    ? `${fmtTs(timeRange.start_utc)} &ndash; ${fmtTs(timeRange.end_utc)}`
    : '<span class="text-faint">unknown</span>';

  return `
<header class="report-header" data-testid="report-header">
  <div class="classification-banner" role="note" aria-label="Handling classification">
    ${classification ? esc(classification) : 'UNCLASSIFIED &mdash; NO MARKING PROVIDED'}
  </div>

  <div class="report-header-grid">
    <div class="report-header-main">
      <h1>${esc(eng.description) || 'Forensic Analysis Report'}</h1>
      <dl class="kv-grid">
        <div><dt>Case ID</dt><dd>${esc(eng.case_id) || '<span class="text-faint">unassigned</span>'}</dd></div>
        <div><dt>Examiner</dt><dd>${esc(eng.examiner) || '<span class="text-faint">unassigned</span>'}</dd></div>
        <div><dt>Organization</dt><dd>${esc(eng.organization) || '<span class="text-faint">&mdash;</span>'}</dd></div>
        <div><dt>Host(s)</dt><dd>${hostSummary}</dd></div>
        <div><dt>Time range</dt><dd>${rangeText}</dd></div>
        <div><dt>Generated</dt><dd>${fmtTs(meta.generated_utc)}</dd></div>
        <div><dt>Model</dt><dd class="mono">${esc(model.provider) || '?'} / ${esc(model.model_id) || '?'}${model.prompt_version ? ` <span class="text-faint">(prompt ${esc(model.prompt_version)})</span>` : ''}</dd></div>
      </dl>
    </div>

    <div class="report-header-stats stat-grid">
      <div class="stat ${sampled ? 'stat-warning' : ''}" data-testid="reduction-ratio-stat">
        <div class="stat-value num">${ratio == null ? '—' : formatPercent(ratio)}</div>
        <div class="stat-label">Rows analysed of total${ratio != null ? ` (${scope.rows_analysed ?? '?'} / ${scope.row_count ?? '?'})` : ''}</div>
        ${sampled ? '<p class="sampling-warning" role="alert">The model saw a <strong>sample</strong> of the collected timeline, not the whole picture. Treat absence of a finding as inconclusive, not as evidence of absence.</p>' : ''}
      </div>
      <div class="stat" data-testid="citation-rate-stat">
        <div class="stat-value num">${rate == null ? '—' : formatPercent(rate)}</div>
        <div class="stat-label">Citation rate${total ? ` (${cited} / ${total} findings cited)` : ' (no findings)'}</div>
      </div>
    </div>
  </div>
</header>`;
}

// ---------------------------------------------------------------------------
// 2. Verdict panel
// ---------------------------------------------------------------------------

const VERDICT_LABELS = {
  no_evidence_of_compromise: 'No evidence of compromise',
  inconclusive: 'Inconclusive',
  suspicious_activity: 'Suspicious activity',
  likely_compromised: 'Likely compromised',
  confirmed_compromised: 'Confirmed compromised',
};

export function renderVerdict(report) {
  const v = report?.verdict;
  if (!v || !v.assessment) {
    return emptyNote('No verdict recorded in this report.');
  }
  const label = VERDICT_LABELS[v.assessment] || v.assessment;
  // "inconclusive" (and no_evidence_of_compromise) are legitimate outcomes,
  // not errors - they get the SAME neutral visual treatment as a positive
  // finding, never a "warning"/"error" styling class.
  const tone = v.assessment === 'confirmed_compromised' || v.assessment === 'likely_compromised'
    ? 'tone-alert'
    : v.assessment === 'suspicious_activity' ? 'tone-caution' : 'tone-neutral';

  return `
<section class="panel verdict-panel verdict-${esc(v.assessment)} ${tone}" aria-labelledby="verdict-heading" data-testid="verdict-panel">
  <h2 id="verdict-heading">Verdict</h2>
  <div class="verdict-headline">
    <span class="verdict-assessment">${esc(label)}</span>
    ${confChip(v.confidence)}
  </div>
  ${v.confidence_rationale ? `<p class="verdict-rationale"><strong>Why this confidence:</strong> ${esc(v.confidence_rationale)}</p>` : ''}
  ${v.rationale ? `<p class="verdict-rationale">${esc(v.rationale)}</p>` : ''}
  <dl class="kv-grid">
    <div><dt>Earliest suspicious activity</dt><dd>${fmtTs(v.earliest_suspicious_activity_utc)}</dd></div>
    <div><dt>Furthest observed attack stage</dt><dd>${esc(v.attack_stage) || '<span class="text-faint">not determined</span>'}</dd></div>
  </dl>
</section>`;
}

// ---------------------------------------------------------------------------
// 3. Executive summary
// ---------------------------------------------------------------------------

export function renderExecutiveSummary(report) {
  const s = report?.executive_summary;
  if (!s || !s.text) return emptyNote('No executive summary recorded in this report.');
  const paragraphs = String(s.text).split(/\n{2,}/).map((p) => `<p>${esc(p.trim())}</p>`).join('');
  const bullets = list(s.bullets, (b) => esc(b));
  return `
<section class="panel" aria-labelledby="exec-summary-heading" data-testid="executive-summary">
  <h2 id="exec-summary-heading">Executive summary</h2>
  <div class="exec-summary-prose">${paragraphs}</div>
  ${bullets ? `<div class="exec-summary-bullets">${bullets}</div>` : ''}
</section>`;
}

// ---------------------------------------------------------------------------
// 4. Findings
// ---------------------------------------------------------------------------

function evidenceTable(evidence) {
  if (!evidence || evidence.length === 0) {
    return '<p class="uncited-badge" role="alert">&#9888; UNCITED &mdash; this finding has no evidence[] entries. Treat it as an unsupported claim until citations are added.</p>';
  }
  const rows = evidence.map((e) => `
    <tr>
      <td>${fmtTs(e.timestamp_utc)}</td>
      <td>${esc(e.host)}</td>
      <td class="mono row-hash">${esc(e.row_hash)}</td>
      <td>${esc(e.excerpt)}</td>
      <td>${esc(e.why_relevant)}</td>
    </tr>`).join('');
  return `
<table class="evidence-table" data-testid="evidence-table">
  <caption class="visually-hidden">Evidence rows citing the SuperTimeline for this finding</caption>
  <thead><tr><th>Timestamp (UTC)</th><th>Host</th><th>Row hash (full)</th><th>Excerpt</th><th>Why relevant</th></tr></thead>
  <tbody>${rows}</tbody>
</table>`;
}

function detectionRulesList(rules) {
  if (!rules || rules.length === 0) return '';
  return `<div class="detection-rules">
    <h4>Supporting detection rules</h4>
    ${list(rules, (r) => `<span class="mono">${esc(r.engine)}</span> &mdash; ${esc(r.rule_name || r.rule_id)}${r.severity ? ` (${esc(r.severity)})` : ''}`)}
  </div>`;
}

export function renderFindingCard(finding, opts = {}) {
  const techniqueNames = opts.techniqueNames || {};
  const uncited = isUncited(finding);
  const mitre = (finding.mitre_techniques ?? []).map((t) => chip(`${t}${techniqueNames[t] ? ` ${techniqueNames[t]}` : ''}`, 'chip-mitre')).join(' ');

  return `
<article class="panel finding-card" data-testid="finding-card" data-finding-id="${esc(finding.id)}" data-severity="${esc(finding.severity)}" ${uncited ? 'data-uncited="true"' : ''}>
  <header class="finding-card-header">
    <button type="button" class="finding-toggle" aria-expanded="false" data-finding-toggle="${esc(finding.id)}">
      <span class="finding-id mono">${esc(finding.id)}</span>
      <span class="finding-title">${esc(finding.title)}</span>
    </button>
    <div class="finding-chips">
      ${sevChip(finding.severity)}
      ${confChip(finding.confidence)}
      ${uncited ? '<span class="chip chip-uncited" data-testid="uncited-badge">&#9888; UNCITED</span>' : ''}
    </div>
  </header>

  <details class="finding-details">
    <summary>Details, evidence &amp; recommendation</summary>
    <p class="finding-narrative">${esc(finding.narrative)}</p>
    <dl class="kv-grid finding-meta">
      ${finding.category ? `<div><dt>Category</dt><dd>${esc(finding.category)}</dd></div>` : ''}
      ${finding.first_seen_utc ? `<div><dt>First seen</dt><dd>${fmtTs(finding.first_seen_utc)}</dd></div>` : ''}
      ${finding.last_seen_utc ? `<div><dt>Last seen</dt><dd>${fmtTs(finding.last_seen_utc)}</dd></div>` : ''}
      ${finding.affected_hosts?.length ? `<div><dt>Affected hosts</dt><dd>${finding.affected_hosts.map(esc).join(', ')}</dd></div>` : ''}
      ${finding.affected_accounts?.length ? `<div><dt>Affected accounts</dt><dd>${finding.affected_accounts.map(esc).join(', ')}</dd></div>` : ''}
    </dl>
    ${mitre ? `<div class="mitre-chips">${mitre}</div>` : ''}
    ${finding.recommendation ? `<p class="finding-recommendation"><strong>Recommendation:</strong> ${esc(finding.recommendation)}</p>` : ''}
    ${finding.false_positive_considered ? `<p class="finding-fp-considered"><strong>Benign explanation considered:</strong> ${esc(finding.false_positive_considered)}</p>` : ''}
    ${detectionRulesList(finding.detection_rules)}
    <h4>Evidence</h4>
    ${evidenceTable(finding.evidence)}
  </details>
</article>`;
}

export function renderFindings(report) {
  const findings = report?.findings ?? [];
  if (findings.length === 0) return emptyNote('No findings were recorded for this report.');

  const techniqueNames = {};
  for (const t of report.mitre_coverage ?? []) {
    if (t.technique_id) techniqueNames[t.technique_id] = t.technique_name;
  }
  const sorted = sortFindings(findings);
  const cards = sorted.map((f) => renderFindingCard(f, { techniqueNames })).join('\n');
  return `
<section aria-labelledby="findings-heading" data-testid="findings-section">
  <h2 id="findings-heading">Findings <span class="text-faint">(${findings.length})</span></h2>
  <div class="findings-list">${cards}</div>
</section>`;
}

// ---------------------------------------------------------------------------
// 5. Attack narrative
// ---------------------------------------------------------------------------

export function renderAttackNarrative(report) {
  const narrative = report?.attack_narrative;
  if (!narrative || !narrative.phases || narrative.phases.length === 0) {
    return emptyNote('No attack narrative was reconstructed for this report (expected when the verdict is "no evidence of compromise").');
  }
  const phases = [...narrative.phases].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const items = phases.map((p) => `
    <button type="button" class="phase-item" data-phase-order="${esc(p.order)}" data-finding-ids="${esc((p.finding_ids ?? []).join(','))}">
      <span class="phase-order num">${esc(p.order)}</span>
      <span class="phase-name">${esc(p.name)}</span>
      ${p.mitre_tactic ? `<span class="phase-tactic chip">${esc(p.mitre_tactic)}</span>` : ''}
      <span class="phase-time">${fmtTs(p.start_utc)}</span>
    </button>`).join('');
  return `
<section class="panel" aria-labelledby="narrative-heading" data-testid="attack-narrative">
  <h2 id="narrative-heading">Attack narrative</h2>
  ${narrative.summary ? `<p>${esc(narrative.summary)}</p>` : ''}
  <div class="phase-timeline" role="list" aria-label="Attack phases, chronological">${items}</div>
  <div class="phase-descriptions">
    ${phases.map((p) => `<div class="phase-description" data-phase-order="${esc(p.order)}"><h4>${esc(p.order)}. ${esc(p.name)}</h4><p>${esc(p.description)}</p></div>`).join('')}
  </div>
</section>`;
}

// ---------------------------------------------------------------------------
// 8. IOC panel
// ---------------------------------------------------------------------------

const IOC_LABELS = {
  files: 'Files', hashes: 'Hashes', ip_addresses: 'IP addresses', domains: 'Domains',
  urls: 'URLs', registry_keys: 'Registry keys', accounts: 'Accounts', processes: 'Processes',
  scheduled_tasks: 'Scheduled tasks', services: 'Services',
};

function iocRows(rows) {
  return rows.map((r) => `
    <tr>
      <td class="mono">${esc(r.value)}</td>
      <td>${esc(r.context)}</td>
      <td class="num">${r.occurrences ?? ''}</td>
      <td>${esc(r.verdict) || '<span class="text-faint">unknown</span>'}</td>
      <td>${esc(r.confidence) || ''}</td>
    </tr>`).join('');
}

export function renderIocPanel(report) {
  const iocs = report?.iocs ?? {};
  const types = Object.keys(IOC_LABELS).filter((k) => Array.isArray(iocs[k]) && iocs[k].length > 0);
  if (types.length === 0) return emptyNote('No indicators of compromise were extracted for this report.');

  const tabs = types.map((t, i) => `
    <input type="radio" name="ioc-tab" id="ioc-tab-${t}" class="ioc-tab-radio" ${i === 0 ? 'checked' : ''}>
    <label for="ioc-tab-${t}" class="ioc-tab-label">${esc(IOC_LABELS[t])} <span class="num">(${iocs[t].length})</span></label>
  `).join('');

  const panels = types.map((t) => `
    <div class="ioc-tab-panel" data-ioc-type="${t}">
      <div class="ioc-tab-actions">
        <button type="button" class="btn btn-icon" data-ioc-copy="${t}">Copy all</button>
        <button type="button" class="btn btn-icon" data-ioc-export="csv" data-ioc-type="${t}">Export CSV</button>
        <button type="button" class="btn btn-icon" data-ioc-export="json" data-ioc-type="${t}">Export JSON</button>
      </div>
      <table class="ioc-table"><thead><tr><th>Value</th><th>Context</th><th>Occurrences</th><th>Verdict</th><th>Confidence</th></tr></thead>
      <tbody>${iocRows(iocs[t])}</tbody></table>
    </div>`).join('');

  return `
<section class="panel ioc-panel" aria-labelledby="ioc-heading" data-testid="ioc-panel">
  <h2 id="ioc-heading">Indicators of compromise</h2>
  <div class="ioc-tabs">${tabs}${panels}</div>
</section>`;
}

// ---------------------------------------------------------------------------
// 9. Analytic gaps + dismissed detections
// ---------------------------------------------------------------------------

export function renderAnalyticGaps(report) {
  const gaps = report?.analytic_gaps ?? [];
  const rowCount = report?.scope?.row_count ?? 0;
  if (gaps.length === 0) {
    // Per x-design-notes: an empty analytic_gaps[] on a large dataset is
    // itself suspicious, and the UI must flag it rather than reading as "no
    // caveats" (a large clean report and an under-analysed one must not look
    // identical).
    const suspicious = rowCount > 500;
    return `
<section class="panel callout callout-gaps" aria-labelledby="gaps-heading" data-testid="analytic-gaps">
  <h2 id="gaps-heading">Analytic gaps</h2>
  ${suspicious
    ? `<p class="callout-flag" role="alert">No analytic gaps were reported despite a ${esc(rowCount)}-row dataset. Either the collection was unusually complete, or the model did not surface its blind spots &mdash; verify before trusting this report's completeness.</p>`
    : emptyNote('No analytic gaps were reported for this report.')}
</section>`;
  }
  const items = gaps.map((g) => `
    <li class="gap-item">
      <p class="gap-text">${esc(g.gap)}</p>
      <div class="gap-meta">
        ${g.reason ? chip(g.reason.replaceAll('_', ' '), 'chip-gap-reason') : ''}
      </div>
      ${g.detail ? `<p class="gap-detail">${esc(g.detail)}</p>` : ''}
      ${g.how_to_close ? `<p class="gap-how-to-close"><strong>How to close:</strong> ${esc(g.how_to_close)}</p>` : ''}
    </li>`).join('');
  return `
<section class="panel callout callout-gaps" aria-labelledby="gaps-heading" data-testid="analytic-gaps">
  <h2 id="gaps-heading">Analytic gaps <span class="text-faint">(${gaps.length})</span></h2>
  <p class="callout-intro">What could not be determined from this collection, and why. These are as important to the report's credibility as the findings themselves.</p>
  <ul class="gap-list">${items}</ul>
</section>`;
}

export function renderDismissedDetections(report) {
  const dismissed = report?.dismissed_detections ?? [];
  if (dismissed.length === 0) return emptyNote('No detections were dismissed as benign in this report.');
  const rows = dismissed.map((d) => `
    <tr>
      <td>${esc(d.rule_name) || esc(d.rule_id)}</td>
      <td class="mono">${esc(d.engine)}</td>
      <td class="num">${d.occurrences ?? ''}</td>
      <td>${esc(d.rationale)}</td>
      <td>${esc(d.confidence) || ''}</td>
    </tr>`).join('');
  return `
<section class="panel callout callout-dismissed" aria-labelledby="dismissed-heading" data-testid="dismissed-detections">
  <h2 id="dismissed-heading">Dismissed detections <span class="text-faint">(${dismissed.length})</span></h2>
  <p class="callout-intro">Client detections judged benign, and why. Challenge any of these you disagree with.</p>
  <table class="dismissed-table"><thead><tr><th>Rule</th><th>Engine</th><th>Occurrences</th><th>Rationale</th><th>Confidence</th></tr></thead>
  <tbody>${rows}</tbody></table>
</section>`;
}

// ---------------------------------------------------------------------------
// 10. Recommendations
// ---------------------------------------------------------------------------

const REC_GROUP_LABELS = {
  immediate: 'Immediate (next hours)',
  short_term: 'Short term',
  long_term: 'Long term',
  further_collection: 'Further collection',
};

function recItem(r) {
  return `
<li class="rec-item">
  <div class="rec-action">${esc(r.action)}</div>
  <div class="rec-chips">
    ${r.priority ? chip(r.priority, `chip-priority-${esc(r.priority)}`) : ''}
    ${r.effort ? chip(`effort: ${r.effort}`, 'chip-effort') : ''}
  </div>
  ${r.rationale ? `<p class="rec-rationale">${esc(r.rationale)}</p>` : ''}
</li>`;
}

export function renderRecommendations(report) {
  const recs = report?.recommendations ?? {};
  const groups = Object.keys(REC_GROUP_LABELS).filter((g) => Array.isArray(recs[g]) && recs[g].length > 0);
  if (groups.length === 0) return emptyNote('No recommendations were recorded for this report.');
  const sections = groups.map((g) => `
    <div class="rec-group" data-rec-group="${g}">
      <h3>${esc(REC_GROUP_LABELS[g])}</h3>
      <ul class="rec-list">${recs[g].map(recItem).join('')}</ul>
    </div>`).join('');
  return `
<section class="panel" aria-labelledby="rec-heading" data-testid="recommendations">
  <h2 id="rec-heading">Recommendations</h2>
  ${sections}
</section>`;
}

// ---------------------------------------------------------------------------
// Top-level assembly
// ---------------------------------------------------------------------------

/** Assemble the full dashboard body (everything except charts/entity graph/
 * filter bar, which live in charts.js/entity-graph.js/filters.js and are
 * mounted by main.js into their own containers) as one HTML string. Used by
 * report.html for a first paint and by report-render.test.mjs to assert
 * every schema-driven section is present. */
export function renderReport(report) {
  if (!report || typeof report !== 'object') {
    return '<div class="empty-state">No report loaded.</div>';
  }
  return [
    renderHeader(report),
    '<div class="report-body">',
    renderVerdict(report),
    renderExecutiveSummary(report),
    renderAttackNarrative(report),
    renderFindings(report),
    renderIocPanel(report),
    renderAnalyticGaps(report),
    renderDismissedDetections(report),
    renderRecommendations(report),
    '</div>',
  ].join('\n');
}
