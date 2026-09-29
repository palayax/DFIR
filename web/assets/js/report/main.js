// Browser-only orchestrator for report.html (C6/C7). Everything imported
// here is a pure function from render.js/charts.js/entity-graph.js/
// filters.js/pdf.js - this file's only job is DOM: loading a report JSON,
// mounting the pure-function HTML into the page, wiring interactivity
// (filter bar, phase/MITRE cross-filtering, IOC copy/export, theme, PDF
// export, print watermark), and keeping the URL hash in sync so a filtered
// view is shareable/deep-linkable (requirement C6.11).
//
// No build step, no framework - plain DOM APIs, matching assets/js/app.js's
// own style (see its initTheme() - the theme toggle below is a deliberate,
// exact copy of that pattern so the two pages behave identically and share
// the same localStorage key).

import { renderReport } from './render.js';
import {
  eventsOverTimeSvg, eventsOverTimeTable,
  severityDistributionSvg, severityDistributionTable,
  sourceDistributionSvg, sourceDistributionTable,
  hourlyHeatmapSvg, hourlyHeatmapTable,
  mitreCoverageSvg, mitreCoverageTable,
  renderChartFigure,
} from './charts.js';
import { renderEntityGraph } from './entity-graph.js';
import {
  EMPTY_FILTER_STATE, parseFilterHash, serializeFilterState,
  filterFindings, filterEvents, isFilterActive,
} from './filters.js';
import { generateReportPdf, resolveWatermarkText } from './pdf.js';

const THEME_KEY = 'irtriage.theme';
// Best-effort handoff key: if the main SPA's own report view (views/report.js,
// out of scope for this module - never read or written by anything else in
// this file) ever stashes a report JSON string here before deep-linking to
// this standalone page, pick it up automatically. Purely additive: if the
// key is absent (the normal case today) this is a no-op and the page falls
// back to ?src=/file input/sample, so it carries no coupling risk.
const SESSION_HANDOFF_KEY = 'irtriage.report.json';
const SAMPLE_REPORT_URL = 'fixtures/report/full-report.json';

let currentReport = null;
let filterState = { ...EMPTY_FILTER_STATE };
// MITRE-technique cross-filter. filters.js's EMPTY_FILTER_STATE/serialize/
// parse deliberately has no "technique" dimension yet (confirmed: no
// filters.test.mjs exists to pin its current shape either) - rather than
// extend that shared, already-tested pure module for a single click-to-filter
// interaction, this dimension is kept local to main.js and ANDed on top of
// filterFindings()'s result. It still round-trips through the URL hash (as
// a separate `tech` param main.js reads/writes itself) so the deep-link
// requirement holds for this dimension too.
let activeTechnique = '';

// ---------------------------------------------------------------------------
// Theme (exact copy of app.js's initTheme pattern - same localStorage key,
// same data-theme attribute, same aria-pressed reflection).
// ---------------------------------------------------------------------------

function initTheme() {
  const apply = (theme) => {
    const root = document.documentElement;
    if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme);
    else root.removeAttribute('data-theme');
    for (const btn of document.querySelectorAll('.theme-toggle button')) {
      btn.setAttribute('aria-pressed', String(btn.dataset.theme === theme));
    }
  };
  let stored = null;
  try {
    stored = localStorage.getItem(THEME_KEY);
  } catch {
    // localStorage unavailable (privacy mode, etc.) - fall back to 'auto'.
  }
  apply(stored || 'auto');

  document.getElementById('theme-toggle')?.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-theme]');
    if (!btn) return;
    const next = btn.dataset.theme;
    apply(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Ignore - theme just won't persist across reloads.
    }
  });
}

// ---------------------------------------------------------------------------
// Status line
// ---------------------------------------------------------------------------

function setStatus(message, tone) {
  const el = document.getElementById('report-status');
  if (!el) return;
  el.textContent = message;
  if (tone) el.setAttribute('data-tone', tone);
  else el.removeAttribute('data-tone');
}

// ---------------------------------------------------------------------------
// Loading a report: ?src= query param, file input, "Load sample", or a
// best-effort sessionStorage handoff. All three paths funnel into
// applyReport() so there is exactly one code path that mounts a report.
// ---------------------------------------------------------------------------

async function loadFromUrl(url) {
  setStatus(`Loading ${url}…`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  const json = await res.json();
  applyReport(json, url);
}

function loadFromFile(file) {
  setStatus(`Reading ${file.name}…`);
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const json = JSON.parse(String(reader.result));
      applyReport(json, file.name);
    } catch (err) {
      setStatus(`Could not parse ${file.name} as JSON: ${err.message}`, 'error');
      console.error(err);
    }
  };
  reader.onerror = () => setStatus(`Could not read ${file.name}.`, 'error');
  reader.readAsText(file);
}

function applyReport(report, sourceLabel) {
  currentReport = report;
  activeTechnique = '';
  filterState = parseCombinedHash(location.hash);
  renderAll();
  setStatus(`Loaded ${sourceLabel}.`, 'success');
  const exportBtn = document.getElementById('export-pdf-btn');
  const printBtn = document.getElementById('print-btn');
  if (exportBtn) exportBtn.disabled = false;
  if (printBtn) printBtn.disabled = false;
  applyPrintWatermark(report);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

function renderAll() {
  const root = document.getElementById('report-root');
  if (!root) return;
  root.innerHTML = renderReport(currentReport);
  mountDashboard();
  syncFilterFormFromState();
  applyFilters();
}

/** Insert the charts + entity-graph dashboard section right after
 * attack-narrative, per render.js's own header comment documenting that
 * split (renderReport() deliberately omits charts/entity-graph/filter-bar -
 * they "live in charts.js/entity-graph.js/filters.js and are mounted by
 * main.js into their own containers"). Inserting rather than editing
 * render.js keeps its 26 passing tests untouched. */
function mountDashboard() {
  const anchor = document.querySelector('[data-testid="attack-narrative"]');
  if (!anchor || !currentReport) return;

  const d = currentReport.dashboard ?? {};
  const mitre = currentReport.mitre_coverage ?? [];

  const figures = [
    ['events-over-time', 'Events over time', eventsOverTimeSvg(d.events_over_time), eventsOverTimeTable(d.events_over_time)],
    ['severity-distribution', 'Severity distribution', severityDistributionSvg(d.severity_distribution), severityDistributionTable(d.severity_distribution)],
    ['source-distribution', 'Source distribution', sourceDistributionSvg(d.source_distribution), sourceDistributionTable(d.source_distribution)],
    ['hourly-heatmap', 'Activity heatmap (day of week x hour)', hourlyHeatmapSvg(d.hourly_heatmap), hourlyHeatmapTable(d.hourly_heatmap)],
    ['mitre-coverage', 'MITRE ATT&CK coverage', mitreCoverageSvg(mitre), mitreCoverageTable(mitre)],
  ].map(([id, title, svg, table]) => `<div data-chart="${id}">${renderChartFigure(title, svg, table)}</div>`).join('\n');

  const entityGraphHtml = renderEntityGraph(d.entity_graph ?? {});

  anchor.insertAdjacentHTML('afterend', `
<section class="dashboard-section" aria-labelledby="dashboard-heading" data-testid="dashboard-section">
  <h2 id="dashboard-heading">Dashboard</h2>
  <div class="dashboard-charts-grid">${figures}</div>
</section>
<section class="panel dashboard-section" aria-labelledby="entity-graph-heading" data-testid="entity-graph-section">
  <h2 id="entity-graph-heading">Entity relationship graph</h2>
  ${entityGraphHtml}
</section>`);
}

/** Re-render just the events-over-time chart against the active time-range
 * filter. The rest of the dashboard (severity/source/heatmap/MITRE/entity
 * graph) is intentionally NOT recomputed on every filter tick: the entity
 * graph in particular reruns an O(n^2) force simulation, which is fine once
 * per report load but would be a visible perf/UX regression if re-run on
 * every keystroke in the search box - a documented tradeoff, not an
 * oversight. */
function refreshFilteredEventsChart() {
  const container = document.querySelector('[data-chart="events-over-time"]');
  if (!container || !currentReport) return;
  const events = filterEvents(currentReport.dashboard?.events_over_time ?? [], filterState);
  const title = isFilterActive(filterState) ? 'Events over time (filtered)' : 'Events over time';
  container.innerHTML = renderChartFigure(title, eventsOverTimeSvg(events), eventsOverTimeTable(events));
}

// ---------------------------------------------------------------------------
// Filter bar + cross-filtering (phase timeline, MITRE matrix cells)
// ---------------------------------------------------------------------------

function applyFilters() {
  if (!currentReport) return;

  const filtered = filterFindings(currentReport.findings ?? [], filterState, currentReport)
    .filter((f) => !activeTechnique || (f.mitre_techniques ?? []).includes(activeTechnique));
  const visibleIds = new Set(filtered.map((f) => f.id));

  for (const card of document.querySelectorAll('.finding-card')) {
    card.hidden = !visibleIds.has(card.dataset.findingId);
  }

  for (const item of document.querySelectorAll('.phase-item')) {
    item.classList.toggle('is-active', filterState.phase !== '' && item.dataset.phaseOrder === filterState.phase);
  }
  for (const desc of document.querySelectorAll('.phase-description')) {
    desc.classList.toggle('is-active', filterState.phase !== '' && desc.dataset.phaseOrder === filterState.phase);
  }
  for (const cell of document.querySelectorAll('.mitre-cell')) {
    cell.classList.toggle('is-active', activeTechnique !== '' && cell.dataset.technique === activeTechnique);
  }

  refreshFilteredEventsChart();

  const indicator = document.getElementById('filter-active-indicator');
  if (indicator) indicator.hidden = !(isFilterActive(filterState) || activeTechnique !== '');
}

function isoToLocalInputValue(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function syncFilterFormFromState() {
  const qInput = document.getElementById('filter-q');
  const sevSelect = document.getElementById('filter-sev');
  const hostInput = document.getElementById('filter-host');
  const t0Input = document.getElementById('filter-t0');
  const t1Input = document.getElementById('filter-t1');

  if (qInput) qInput.value = filterState.q || '';
  if (sevSelect) {
    for (const opt of sevSelect.options) opt.selected = (filterState.severity || []).includes(opt.value);
  }
  if (hostInput) hostInput.value = (filterState.host || []).join(', ');
  if (t0Input) t0Input.value = filterState.t0 ? isoToLocalInputValue(filterState.t0) : '';
  if (t1Input) t1Input.value = filterState.t1 ? isoToLocalInputValue(filterState.t1) : '';
}

/** filters.js's own parse/serializeFilterState() handle q/sev/host/src/t0/
 * t1/phase; the local `tech` param (see activeTechnique's comment above) is
 * layered on top here so both dimensions still round-trip through one hash. */
function parseCombinedHash(hash) {
  const state = parseFilterHash(hash);
  const params = new URLSearchParams((hash || '').replace(/^#/, ''));
  activeTechnique = params.get('tech') || '';
  return state;
}

function syncHash() {
  const base = serializeFilterState(filterState).replace(/^#/, '');
  const params = new URLSearchParams(base);
  if (activeTechnique) params.set('tech', activeTechnique);
  else params.delete('tech');
  const qs = params.toString();
  const next = qs ? `#${qs}` : '';
  // replaceState (not pushState / a hash assignment) so filtering as-you-type
  // doesn't flood browser history with an entry per keystroke, while the
  // current state remains fully present in location.hash - shareable/
  // deep-linkable per requirement C6.11 either way.
  if (`#${location.hash.replace(/^#/, '')}` !== `#${next.replace(/^#/, '')}` || (!location.hash && next)) {
    history.replaceState(null, '', next || location.pathname + location.search);
  }
}

function initFilterBar() {
  const form = document.getElementById('report-filter-bar');
  const qInput = document.getElementById('filter-q');
  const sevSelect = document.getElementById('filter-sev');
  const hostInput = document.getElementById('filter-host');
  const t0Input = document.getElementById('filter-t0');
  const t1Input = document.getElementById('filter-t1');
  const clearBtn = document.getElementById('filter-clear-btn');
  if (!form) return;

  const commit = () => {
    filterState = {
      ...filterState,
      q: qInput.value.trim(),
      severity: [...sevSelect.selectedOptions].map((o) => o.value),
      host: hostInput.value.split(',').map((h) => h.trim()).filter(Boolean),
      t0: t0Input.value ? new Date(t0Input.value).toISOString() : '',
      t1: t1Input.value ? new Date(t1Input.value).toISOString() : '',
    };
    syncHash();
    applyFilters();
  };

  qInput.addEventListener('input', commit);
  sevSelect.addEventListener('change', commit);
  hostInput.addEventListener('input', commit);
  t0Input.addEventListener('change', commit);
  t1Input.addEventListener('change', commit);
  clearBtn.addEventListener('click', () => {
    filterState = { ...EMPTY_FILTER_STATE };
    activeTechnique = '';
    syncFilterFormFromState();
    syncHash();
    applyFilters();
  });
  form.addEventListener('submit', (e) => e.preventDefault());

  window.addEventListener('hashchange', () => {
    if (!currentReport) return;
    filterState = parseCombinedHash(location.hash);
    syncFilterFormFromState();
    applyFilters();
  });
}

// ---------------------------------------------------------------------------
// Delegated clicks inside #report-root: phase timeline, MITRE matrix cells,
// entity-graph nodes, IOC copy/export. One listener, since #report-root's
// contents are wholesale replaced on every report load/re-render.
// ---------------------------------------------------------------------------

function dispatchSyntheticClick(el) {
  el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
}

function handleRootClick(e) {
  const phaseBtn = e.target.closest('.phase-item');
  if (phaseBtn) {
    const order = phaseBtn.dataset.phaseOrder;
    filterState = { ...filterState, phase: filterState.phase === order ? '' : order };
    syncHash();
    applyFilters();
    return;
  }

  const mitreCell = e.target.closest('.mitre-cell');
  if (mitreCell) {
    const tech = mitreCell.dataset.technique;
    activeTechnique = activeTechnique === tech ? '' : tech;
    syncHash();
    applyFilters();
    return;
  }

  const entityNode = e.target.closest('.entity-node-group');
  if (entityNode) {
    entityNode.classList.toggle('is-active');
    // Only "host" nodes map cleanly onto filters.js's existing host
    // dimension; other entity kinds (process/file/account/...) get a visual
    // highlight only - a full per-kind cross-filter would need filters.js
    // extended with several new dimensions, out of scope for this pass (see
    // the C7 handback's "deviations" section).
    if (entityNode.dataset.kind === 'host') {
      // Node ids are always "<kind>:<value>" (see entity-graph.js); findings'
      // affected_hosts/evidence[].host store the bare value, so strip the
      // "host:" prefix rather than filtering by the graph-internal id.
      const hostValue = entityNode.dataset.nodeId.slice('host:'.length);
      filterState = { ...filterState, host: [hostValue] };
      syncFilterFormFromState();
      syncHash();
      applyFilters();
    }
    return;
  }

  const copyBtn = e.target.closest('[data-ioc-copy]');
  if (copyBtn) { handleIocCopy(copyBtn); return; }

  const exportBtn = e.target.closest('[data-ioc-export]');
  if (exportBtn) { handleIocExport(exportBtn); return; }
}

function handleRootKeydown(e) {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const target = e.target.closest?.('.mitre-cell, .entity-node-group');
  if (target && target.getAttribute('role') === 'button') {
    e.preventDefault();
    dispatchSyntheticClick(target);
  }
}

function initRootDelegatedEvents() {
  const root = document.getElementById('report-root');
  if (!root) return;
  root.addEventListener('click', handleRootClick);
  root.addEventListener('keydown', handleRootKeydown);
}

// ---------------------------------------------------------------------------
// IOC copy / export - reads straight from currentReport.iocs (the source of
// truth), not scraped from the rendered <table>, so escaped HTML entities or
// a truncated cell never corrupt the exported data.
// ---------------------------------------------------------------------------

function downloadBlob(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function toCsvValue(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

function caseIdSlug() {
  return (currentReport?.meta?.engagement?.case_id || 'report').replace(/[^a-zA-Z0-9._-]+/g, '_');
}

async function handleIocCopy(btn) {
  const type = btn.dataset.iocCopy;
  const rows = currentReport?.iocs?.[type] ?? [];
  const text = rows.map((r) => r.value).join('\n');
  try {
    await navigator.clipboard.writeText(text);
    setStatus(`Copied ${rows.length} ${type} value(s) to the clipboard.`, 'success');
  } catch (err) {
    setStatus(`Could not copy to clipboard: ${err.message}`, 'error');
    console.error(err);
  }
}

function handleIocExport(btn) {
  const type = btn.dataset.iocType;
  const format = btn.dataset.iocExport;
  const rows = currentReport?.iocs?.[type] ?? [];
  const slug = caseIdSlug();
  if (format === 'csv') {
    const header = ['value', 'context', 'occurrences', 'verdict', 'confidence'];
    const lines = [header.join(','), ...rows.map((r) => header.map((k) => toCsvValue(r[k])).join(','))];
    downloadBlob(`${slug}-${type}.csv`, new Blob([lines.join('\n')], { type: 'text/csv' }));
  } else {
    downloadBlob(`${slug}-${type}.json`, new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' }));
  }
  setStatus(`Exported ${rows.length} ${type} value(s) as ${format.toUpperCase()}.`, 'success');
}

// ---------------------------------------------------------------------------
// PDF export (path 2 of C7) + browser print (path 1, via print.css)
// ---------------------------------------------------------------------------

function initExportButtons() {
  document.getElementById('export-pdf-btn')?.addEventListener('click', async () => {
    if (!currentReport) return;
    setStatus('Building PDF…');
    try {
      const blob = await generateReportPdf(currentReport);
      downloadBlob(`${caseIdSlug()}-forensic-report.pdf`, blob);
      setStatus('PDF exported.', 'success');
    } catch (err) {
      console.error(err);
      setStatus(`PDF export failed: ${err.message}`, 'error');
    }
  });

  document.getElementById('print-btn')?.addEventListener('click', () => {
    window.print();
  });
}

function escapeXml(v) {
  return String(v ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

/** Build a small tiled SVG (as a data: URI) containing the rotated
 * watermark text, consumed by print.css's .print-watermark-layer
 * background-image (see that file's header comment). No raster asset, no
 * external request, no vendored dependency - just an inline SVG string,
 * same hand-written-markup approach as charts.js/entity-graph.js. */
function buildWatermarkDataUri(text) {
  const safe = escapeXml(text);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200">`
    + `<text x="160" y="100" transform="rotate(-35 160 100)" text-anchor="middle" `
    + `font-family="sans-serif" font-size="22" fill="#8a1414" fill-opacity="0.55">${safe}</text></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/** Wire up both print-time mechanisms: the tiled background watermark and
 * the fixed-position running header/footer text (case id + classification +
 * generated timestamp). Uses resolveWatermarkText() from pdf.js so the
 * print path and the from-scratch PDF path can never disagree about what
 * the watermark says or its UNCLASSIFIED fallback. All report-supplied text
 * is set via textContent, never innerHTML/template strings, even though
 * this only ever renders in a print preview. */
function applyPrintWatermark(report) {
  const text = resolveWatermarkText(report);
  document.documentElement.style.setProperty('--print-watermark-image', buildWatermarkDataUri(text));

  const caseId = report?.meta?.engagement?.case_id || 'unassigned';
  const generated = report?.meta?.generated_utc || '';

  const header = document.querySelector('.print-running-header');
  if (header) {
    header.replaceChildren();
    const left = document.createElement('span');
    left.textContent = `Case ${caseId} — ${text}`;
    const right = document.createElement('span');
    right.textContent = generated ? `Generated ${generated}` : '';
    header.append(left, right);
  }

  const footer = document.querySelector('.print-running-footer');
  if (footer) {
    footer.replaceChildren();
    const left = document.createElement('span');
    left.textContent = 'IR Triage Suite — forensic report';
    const right = document.createElement('span');
    right.textContent = text;
    footer.append(left, right);
  }
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

function initSourceControls() {
  document.getElementById('load-sample-btn')?.addEventListener('click', () => {
    loadFromUrl(SAMPLE_REPORT_URL).catch((err) => {
      setStatus(`Could not load the sample report: ${err.message}`, 'error');
      console.error(err);
    });
  });
  document.getElementById('report-file-input')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) loadFromFile(file);
    e.target.value = '';
  });
}

function installErrorBoundary() {
  window.addEventListener('error', (event) => {
    setStatus(`Unexpected error: ${event.error?.message || event.message}`, 'error');
  });
  window.addEventListener('unhandledrejection', (event) => {
    setStatus(`Unexpected error: ${event.reason?.message || event.reason}`, 'error');
  });
}

function boot() {
  installErrorBoundary();
  initTheme();
  initFilterBar();
  initRootDelegatedEvents();
  initExportButtons();
  initSourceControls();

  const params = new URLSearchParams(location.search);
  const src = params.get('src');
  if (src) {
    loadFromUrl(src).catch((err) => {
      setStatus(`Could not load ${src}: ${err.message}`, 'error');
      console.error(err);
    });
    return;
  }

  try {
    const stashed = sessionStorage.getItem(SESSION_HANDOFF_KEY);
    if (stashed) {
      applyReport(JSON.parse(stashed), 'session handoff');
      return;
    }
  } catch {
    // sessionStorage unavailable, or not valid JSON - fall through to the
    // empty state; either way this must never block the page from loading.
  }

  setStatus('No report loaded.');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
