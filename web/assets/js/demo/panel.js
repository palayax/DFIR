// The demo incident's UI entry point, mounted on the Ingest view.
//
// This exists because of the defect class CLAUDE.md calls out: this repo has
// repeatedly shipped complete, fully-tested engines that no UI path could
// reach (the analysis pipeline, the PDF writer, the mock provider). A demo
// dataset with no button is the same mistake. The button below is the ONLY
// thing that makes the payload reachable for a first-time visitor, so it is
// wired into the Ingest view's DOM and asserted structurally by
// web/tests/demo.test.mjs.
//
// It uses only CSS classes that already exist in web/assets/css.

import { loadDemoManifest, demoFiles, loadDemoReport, loadDemoReportIntoStore } from './index.js';
import { showError, showToast } from '../ui/toast.js';

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function stat(label, value) {
  const wrap = el('div', 'stat');
  wrap.append(el('div', 'stat-value', String(value)), el('div', 'stat-label', label));
  return wrap;
}

function renderNarrative(manifest) {
  const details = document.createElement('details');
  details.dataset.testid = 'demo-narrative';
  const summary = document.createElement('summary');
  summary.textContent = `Incident narrative — ${manifest.narrative.length} phases, ${manifest.narrative.reduce((n, p) => n + p.evidence.length, 0)} cited evidence rows`;
  details.appendChild(summary);

  const list = el('ol', 'phase-timeline');
  for (const phase of manifest.narrative) {
    const item = el('li', 'phase-item');
    const head = el('div', null);
    head.append(el('strong', null, `${phase.tactic}: ${phase.title}`));
    const meta = el('div', 'text-faint', `${phase.start_utc.slice(0, 19).replace('T', ' ')}Z — ${phase.hosts.join(', ')}`);
    const body = el('div', 'phase-description', phase.summary);
    const chips = el('div', 'mitre-chips');
    for (const technique of phase.techniques) chips.appendChild(el('span', 'chip chip-mitre', technique));
    item.append(head, meta, body, chips);
    list.appendChild(item);
  }
  details.appendChild(list);
  return details;
}

/**
 * @param {HTMLElement} container a .panel element already in the document
 * @param {{ onFiles: (files: File[]) => void, onReport?: (report: object) => void }} ctx
 *        onFiles is the Ingest view's addFiles(): the EVIDENCE goes through the
 *        SAME path as a dropped file, never around it.
 *        onReport is optional. A finished report has no ingest path to bypass --
 *        no parser, no merge, no detection stage -- so when the host view does
 *        not supply a handler the panel falls back to the loader's own
 *        store write, which is the same entry point the analysis pipeline uses.
 */
export function mountDemoPanel(container, { onFiles, onReport }) {
  container.appendChild(el('div', 'panel-title', 'Proof-of-value demo incident'));

  const intro = el('div', 'view-subtitle',
    'No evidence of your own to hand? Load a synthetic Windows-domain intrusion and run the full pipeline: merge, analyse, report.');
  container.appendChild(intro);

  const notice = el('div', 'callout');
  container.appendChild(notice);

  const stats = el('div', 'stat-grid');
  container.appendChild(stats);

  const actions = el('div', 'view-actions');
  const loadBtn = el('button', 'btn btn-primary', 'Load demo incident');
  loadBtn.dataset.testid = 'load-demo-incident';
  loadBtn.type = 'button';
  loadBtn.disabled = true;
  actions.appendChild(loadBtn);

  // Second entry point: the pre-authored FINISHED report over the same rows.
  // Without it the only route to a rendered report is an analysis run, and the
  // zero-cost mock provider deliberately returns an empty report -- so a
  // first-time evaluator would reach the Report view and find nothing to look
  // at. This button is what makes the dashboard, the charts, the entity graph
  // and the PDF export reachable offline with no API key.
  const reportBtn = el('button', 'btn', 'Load demo report');
  reportBtn.dataset.testid = 'load-demo-report';
  reportBtn.type = 'button';
  reportBtn.disabled = true;
  actions.appendChild(reportBtn);
  container.appendChild(actions);

  const reportHint = el('div', 'field-hint',
    'Load demo report puts a pre-authored, schema-valid report for this same incident straight onto the Report '
    + 'view — no API key, no network, no analysis run. It is authored, not model-generated, and says so in its '
    + 'own provenance.');
  container.appendChild(reportHint);

  const narrativeHost = el('div', null);
  container.appendChild(narrativeHost);

  let manifest = null;
  let cancelled = false;

  loadDemoManifest().then(
    (m) => {
      if (cancelled) return;
      manifest = m;
      notice.textContent = m.synthetic_notice;
      stats.replaceChildren(
        stat('hosts', m.files.length),
        stat('timeline rows', m.row_count.toLocaleString('en-US')),
        stat('rows with detections', m.detection_row_count),
        stat('attack phases', m.narrative.length),
      );
      narrativeHost.replaceChildren(renderNarrative(m));
      loadBtn.disabled = false;
      reportBtn.disabled = false;
    },
    (err) => {
      if (cancelled) return;
      notice.textContent =
        `The demo payload could not be loaded here (${err?.message || err}). ` +
        'This happens when the app is opened from disk in a browser that refuses to import sibling ' +
        'modules; serve web/ over HTTP (scripts/e2e-server.py) or use the hosted build. Dropping ' +
        'your own IRTriage export below still works.';
      loadBtn.disabled = true;
      reportBtn.disabled = true;
    },
  );

  async function load() {
    loadBtn.disabled = true;
    const original = loadBtn.textContent;
    loadBtn.textContent = 'Loading demo…';
    try {
      const files = await demoFiles();
      // Straight into the Ingest view's own addFiles(): format detection, the
      // ingest worker (or its main-thread fallback) and then Merge.
      onFiles(files);
      showToast({
        type: 'success',
        title: `Demo incident loaded (${files.length} hosts)`,
        detail: manifest
          ? `${manifest.title}. Continue to Merge to build the SuperTimeline, then Analyze — the mock provider needs no API key.`
          : 'Continue to Merge to build the SuperTimeline.',
        timeoutMs: 9000,
      });
    } catch (err) {
      showError('Could not load the demo incident', err);
    } finally {
      loadBtn.textContent = original;
      loadBtn.disabled = false;
    }
  }

  async function loadReport() {
    reportBtn.disabled = true;
    const original = reportBtn.textContent;
    reportBtn.textContent = 'Loading report…';
    try {
      // Either the host view's own handler, or the loader's store write. Both
      // end at the same place: state.report, which the Report view renders.
      const report = await loadDemoReport();
      if (onReport) onReport(report);
      else await loadDemoReportIntoStore();
      const findings = Array.isArray(report?.findings) ? report.findings.length : 0;
      showToast({
        type: 'success',
        title: `Demo forensic report loaded (${findings} findings)`,
        detail: 'Open the Report view to review it, then "Open interactive report" for the dashboard, charts and '
          + 'entity graph, or export it as a watermarked PDF.',
        timeoutMs: 9000,
      });
    } catch (err) {
      showError('Could not load the demo report', err);
    } finally {
      reportBtn.textContent = original;
      reportBtn.disabled = false;
    }
  }

  loadBtn.addEventListener('click', load);
  reportBtn.addEventListener('click', loadReport);

  return {
    destroy() {
      cancelled = true;
      loadBtn.removeEventListener('click', load);
      reportBtn.removeEventListener('click', loadReport);
    },
  };
}
