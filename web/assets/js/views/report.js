// Report view: review the generated forensic report, open the interactive
// dashboard, and export it as JSON or a watermarked PDF.
//
// This view was previously a stub ("Report generation is not yet available in
// this build") even though report.html + report/{main,render,charts,pdf}.js were
// complete. The consequence was that a report produced by the pipeline had no
// route to the renderer at all from inside the app.
//
// The interactive dashboard deliberately lives in a SEPARATE PAGE (report.html)
// rather than being inlined here: it is the artifact an analyst shares, prints,
// and archives, so it has to stand alone with no dependency on the console's
// in-memory state. This view's job is to hand a report over to it and to expose
// the same exports.

import { generateReportPdf, resolveWatermarkText } from '../report/pdf.js';
import { loadDemoReport } from '../demo/index.js';
import { redactReport, REDACT_PROFILES } from '../redact/report.js';
import { citationRate, sortFindings } from '../report/metrics.js';
import { caseSlug } from '../lib/case-slug.js';
import { getStorageProvider, defaultStorageProviderId } from '../providers/storage/index.js';
import { showToast, showError } from '../ui/toast.js';

// Must match report/main.js's SESSION_HANDOFF_KEY exactly -- it is the contract
// between the two pages.
const SESSION_HANDOFF_KEY = 'irtriage.report.json';

function stat(label, value) {
  const wrap = document.createElement('div');
  wrap.className = 'stat';
  const v = document.createElement('div');
  v.className = 'stat-value';
  v.textContent = String(value);
  const l = document.createElement('div');
  l.className = 'stat-label';
  l.textContent = label;
  wrap.append(v, l);
  return wrap;
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// caseSlug is imported, NOT defined here. This page and report/main.js both name
// exports after the case id, and each used to carry its own copy -- which drifted
// twice over (wrong field here, different sanitiser there), so the same report
// downloaded from the two pages got two different filenames. See
// ../lib/case-slug.js for the full history. Do not reintroduce a local copy.

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <div class="layer-tag">Report &amp; export</div>
      <h1>Reports</h1>
      <div class="view-subtitle">Review, open, and export the generated forensic report — or the executive cyber-to-business risk report.</div>
    </div>`;

  // The executive (layer 3) report is exported from its own dashboard, where the
  // active filters and What-if scenario define what the PDF/JSON/CSV contains.
  const execPanel = document.createElement('div');
  execPanel.className = 'panel';
  execPanel.innerHTML = `
    <h2 class="panel-title">Executive cyber-to-business risk report</h2>
    <p class="view-subtitle">Board-ready summary: value at risk vs appetite, top business risks, KPIs/SLAs under pressure, compliance posture and recommended remediation. Watermarked PDF, JSON and CSV.</p>
    <div class="view-actions"><a class="btn btn-primary" href="#/business">Open executive dashboard &amp; export</a></div>`;

  const actions = document.createElement('div');
  actions.className = 'view-actions';
  const openBtn = document.createElement('button');
  openBtn.className = 'btn btn-primary';
  openBtn.textContent = 'Open interactive report';
  const jsonBtn = document.createElement('button');
  jsonBtn.className = 'btn';
  jsonBtn.textContent = 'Export JSON';
  const pdfBtn = document.createElement('button');
  pdfBtn.className = 'btn';
  pdfBtn.textContent = 'Export PDF';
  const uploadBtn = document.createElement('button');
  uploadBtn.className = 'btn';
  uploadBtn.textContent = 'Upload to storage';
  actions.append(openBtn, jsonBtn, pdfBtn, uploadBtn);
  header.appendChild(actions);
  container.appendChild(header);
  container.appendChild(execPanel);

  const forensicTitle = document.createElement('h2');
  forensicTitle.className = 'panel-title';
  forensicTitle.textContent = 'Forensic analysis report (DFIR)';
  container.appendChild(forensicTitle);

  // --- redaction controls --------------------------------------------------
  // Placed above the summary, before the export buttons are used, because the
  // choice has to be made BEFORE exporting rather than discovered afterwards.
  const redactPanel = document.createElement('div');
  redactPanel.className = 'panel';
  const redactTitle = document.createElement('div');
  redactTitle.className = 'panel-title';
  redactTitle.textContent = 'Redaction (applies to Export JSON / Export PDF / Upload)';
  const redactRow = document.createElement('div');
  redactRow.className = 'two-col';

  const profField = document.createElement('div');
  profField.className = 'field';
  const profLabel = document.createElement('label');
  profLabel.textContent = 'Profile';
  const profSelect = document.createElement('select');
  profSelect.className = 'input';
  for (const p of REDACT_PROFILES) {
    const o = document.createElement('option');
    o.value = p.id;
    o.textContent = p.label;
    profSelect.appendChild(o);
  }
  profSelect.value = 'none';
  profField.append(profLabel, profSelect);

  const keyField = document.createElement('div');
  keyField.className = 'field';
  const keyLabel = document.createElement('label');
  keyLabel.textContent = 'Pseudonym key (hex, optional)';
  const keyInput = document.createElement('input');
  keyInput.className = 'input';
  keyInput.type = 'text';
  keyInput.placeholder = 'blank = fresh random key per export';
  keyInput.autocomplete = 'off';
  keyField.append(keyLabel, keyInput);
  const keyHint = document.createElement('div');
  keyHint.className = 'field-hint';
  keyHint.textContent = 'Use the SAME key the client used (output.redact_key_hex / --redact-key) if this report must '
    + 'cross-reference a redacted timeline — otherwise its pseudonyms will not match.';
  keyField.appendChild(keyHint);

  redactRow.append(profField, keyField);
  const redactHint = document.createElement('div');
  redactHint.className = 'field-hint';
  redactPanel.append(redactTitle, redactRow, redactHint);
  container.appendChild(redactPanel);

  function describeRedaction() {
    if (profSelect.value === 'none') {
      redactHint.textContent = 'Exports will be VERBATIM — they will contain real hostnames, accounts, paths and '
        + 'whatever the model quoted from the evidence. Do not publish this.';
      return;
    }
    if (profSelect.value === 'publish') {
      redactHint.textContent = 'Identifiers are pseudonymised, private addresses masked, engagement metadata dropped, '
        + 'and every free-text field scanned. Public IPs, hashes, rule names and ATT&CK mappings are kept as indicators. '
        + 'Redaction is best-effort — review the redaction record in the exported JSON before publishing.';
      return;
    }
    redactHint.textContent = 'Secrets and credentials are removed; host and account identity are KEPT so internal '
      + 'responders can act on it. Not suitable for publication.';
  }
  profSelect.addEventListener('change', describeRedaction);
  describeRedaction();

  // Applies the selected profile, or returns the report unchanged for "none".
  // Every export path funnels through this, so there is exactly one place where
  // the decision is honoured — a second path that forgot to call it would be a
  // silent leak.
  async function forExport(r) {
    const { report: out, redacted } = await redactReport(r, {
      profile: profSelect.value,
      keyHex: keyInput.value.trim(),
    });
    if (redacted) {
      showToast({
        type: 'info',
        title: `Exported with the "${profSelect.value}" redaction profile`,
        detail: 'The export carries a `redaction` record listing what was changed. Review it before publishing.',
        timeoutMs: 7000,
      });
    }
    return out;
  }

  const summaryPanel = document.createElement('div');
  summaryPanel.className = 'panel';
  container.appendChild(summaryPanel);

  const findingsPanel = document.createElement('div');
  findingsPanel.className = 'panel';
  container.appendChild(findingsPanel);

  function report() {
    return store.getState().report || null;
  }

  /** "Load demo report" for the empty state. It only ever writes
   * `state.report` -- the same slot the analysis pipeline writes -- so every
   * export below still funnels through forExport() and the redaction gate. */
  function demoActions() {
    const wrap = document.createElement('div');
    wrap.className = 'view-actions';
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.type = 'button';
    btn.dataset.testid = 'load-demo-report-view';
    btn.textContent = 'Load demo report';
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      const original = btn.textContent;
      btn.textContent = 'Loading…';
      try {
        store.set({ report: await loadDemoReport() });
        showToast({
          type: 'success',
          title: 'Demo forensic report loaded',
          detail: 'Synthetic incident, pre-authored analysis — no API key or network involved. Every export below '
            + 'still honours the redaction profile.',
          timeoutMs: 8000,
        });
      } catch (err) {
        btn.textContent = original;
        btn.disabled = false;
        showError('Could not load the demo report', err);
      }
    });
    wrap.appendChild(btn);
    const hint = document.createElement('div');
    hint.className = 'field-hint';
    hint.textContent = 'No evidence to hand? Load a finished, schema-valid report for the synthetic demo incident '
      + 'and exercise the dashboard, charts, entity graph and PDF export offline.';
    wrap.appendChild(hint);
    return wrap;
  }

  function setEnabled(on) {
    openBtn.disabled = !on;
    jsonBtn.disabled = !on;
    pdfBtn.disabled = !on;
    uploadBtn.disabled = !on;
  }

  function render() {
    const r = report();
    summaryPanel.replaceChildren();
    findingsPanel.replaceChildren();

    if (!r) {
      setEnabled(false);
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.textContent = 'No report yet. Build a SuperTimeline on the Merge view, then run an analysis on the Analyze view.';
      summaryPanel.appendChild(empty);
      // report.html still works standalone -- say so, so an analyst with a
      // report JSON on disk is not stuck behind an analysis they do not need.
      const hint = document.createElement('div');
      hint.className = 'field-hint';
      hint.textContent = 'Already have a report JSON? Open report.html directly and load it from there.';
      summaryPanel.appendChild(hint);
      // Second escape from the empty state: the pre-authored demo report. An
      // evaluator with no evidence and no API key otherwise has no route to a
      // rendered report at all -- the zero-cost mock provider deliberately
      // produces an empty one. The demo panel on the Ingest view offers the same
      // thing; this button is here because the empty state is where somebody
      // looking for a report actually lands.
      summaryPanel.appendChild(demoActions());
      return;
    }

    setEnabled(true);
    const findings = Array.isArray(r.findings) ? r.findings : [];
    const bySev = findings.reduce((m, f) => ((m[f.severity] = (m[f.severity] || 0) + 1), m), {});
    const cited = citationRate(r);

    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Report summary';
    summaryPanel.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'stat-grid';
    grid.append(
      stat('Findings', findings.length),
      stat('Critical', bySev.critical || 0),
      stat('High', bySev.high || 0),
      stat('Medium', bySev.medium || 0),
      stat('Analytic gaps', (r.analytic_gaps || []).length),
      stat('Dismissed', (r.dismissed_detections || []).length),
      // A citation rate below 100% means the model asserted something it did not
      // tie to a row_hash. Surfacing it here, not just inside the report page,
      // makes it a review gate rather than a detail someone may never scroll to.
      //
      // citationRate() returns {cited,total,rate} with rate === null when there
      // are no findings at all -- deliberately, so a zero-finding report cannot
      // be misread as "100% cited". Render that as n/a, never as a percentage.
      stat('Cited findings', cited.rate === null ? 'n/a' : `${Math.round(cited.rate * 100)}% (${cited.cited}/${cited.total})`),
      stat('Rows analysed', Number(r.scope?.rows_analysed || 0).toLocaleString('en-US')),
    );
    summaryPanel.appendChild(grid);

    const meta = document.createElement('div');
    meta.className = 'field-hint';
    const m = r.meta || {};
    meta.textContent = [
      m.case_id ? `case ${m.case_id}` : null,
      m.model?.provider ? `provider ${m.model.provider}` : null,
      m.model?.id ? `model ${m.model.id}` : null,
      m.model?.prompt_version ? `prompt v${m.model.prompt_version}` : null,
      m.generated_at ? `generated ${m.generated_at}` : null,
    ].filter(Boolean).join(' · ');
    summaryPanel.appendChild(meta);

    if (Array.isArray(r.warnings) && r.warnings.length) {
      const warn = document.createElement('div');
      warn.className = 'field-hint';
      warn.textContent = `Pipeline warnings: ${r.warnings.join('; ')}`;
      summaryPanel.appendChild(warn);
    }

    const fTitle = document.createElement('div');
    fTitle.className = 'panel-title';
    fTitle.textContent = `Findings (${findings.length})`;
    findingsPanel.appendChild(fTitle);

    if (findings.length === 0) {
      const none = document.createElement('div');
      none.className = 'empty-state';
      none.textContent = 'The analysis produced no findings. On a clean host with no detections that is a legitimate result, not an error — check the analytic gaps in the interactive report to see what the data could not show.';
      findingsPanel.appendChild(none);
    } else {
      const list = document.createElement('div');
      for (const f of sortFindings(findings).slice(0, 25)) {
        const row = document.createElement('div');
        row.className = 'field-hint';
        const cites = (f.evidence || f.citations || []).length;
        row.textContent = `[${String(f.severity || '?').toUpperCase()}] ${f.title || '(untitled)'} — ${cites} citation(s)`;
        list.appendChild(row);
      }
      findingsPanel.appendChild(list);
      if (findings.length > 25) {
        const more = document.createElement('div');
        more.className = 'field-hint';
        more.textContent = `… and ${findings.length - 25} more. Open the interactive report for the full set.`;
        findingsPanel.appendChild(more);
      }
    }
  }

  openBtn.addEventListener('click', () => {
    const r = report();
    if (!r) return;
    const json = JSON.stringify(r);
    // Primary path: sessionStorage. A tab opened via window.open inherits a copy
    // of the opener's sessionStorage, and unlike a blob: URL it survives a reload
    // of the report tab.
    try {
      sessionStorage.setItem(SESSION_HANDOFF_KEY, json);
      const w = window.open('report.html', '_blank');
      if (!w) {
        showToast({
          type: 'info',
          title: 'Popup blocked',
          detail: 'The report is staged — open report.html in a new tab yourself and it will load automatically.',
          timeoutMs: 8000,
        });
      }
      return;
    } catch {
      // Quota exceeded (sessionStorage is only a few MB and a large report can
      // exceed it). Fall back to a blob URL via report.html's ?src= path, which
      // has no size limit.
    }
    try {
      const url = URL.createObjectURL(new Blob([json], { type: 'application/json' }));
      const w = window.open(`report.html?src=${encodeURIComponent(url)}`, '_blank');
      if (!w) showToast({ type: 'info', title: 'Popup blocked', detail: 'Allow popups for this page, then try again.' });
    } catch (err) {
      showError('Could not open the report', err);
    }
  });

  jsonBtn.addEventListener('click', async () => {
    const r = report();
    if (!r) return;
    jsonBtn.disabled = true;
    try {
      const out = await forExport(r);
      const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `${caseSlug(out)}-forensic-report.json`);
    } catch (err) {
      showError('Export failed', err);
    } finally {
      jsonBtn.disabled = false;
    }
  });

  pdfBtn.addEventListener('click', async () => {
    const r = report();
    if (!r) return;
    pdfBtn.disabled = true;
    const original = pdfBtn.textContent;
    pdfBtn.textContent = 'Building PDF…';
    try {
      const out = await forExport(r);
      const blob = await generateReportPdf(out);
      downloadBlob(blob, `${caseSlug(out)}-forensic-report.pdf`);
      showToast({ type: 'success', title: 'PDF exported', detail: `Watermark: ${resolveWatermarkText(out)}`, timeoutMs: 5000 });
    } catch (err) {
      showError('PDF export failed', err);
    } finally {
      pdfBtn.textContent = original;
      pdfBtn.disabled = false;
    }
  });

  uploadBtn.addEventListener('click', async () => {
    const r = report();
    if (!r) return;
    const s = store.getState().settings || {};
    const providerId = s.storageProviderId || defaultStorageProviderId;
    const provider = getStorageProvider(providerId);
    if (!provider) {
      showError('No storage provider selected', 'Choose one on the Settings view.');
      return;
    }
    const creds = s.storageCreds || {};
    const check = provider.validateCredentials?.(creds) ?? { ok: true, errors: [] };
    if (!check.ok || (check.errors || []).length) {
      showError(`${provider.label} is not fully configured`, (check.errors || []).join('; '));
      return;
    }
    uploadBtn.disabled = true;
    try {
      const out = await forExport(r);
      const name = `${caseSlug(out)}-forensic-report.json`;
      const blob = new Blob([JSON.stringify(out, null, 2)], { type: 'application/json' });
      // The StorageProvider contract names this option `creds`, not `credentials`
      // (see web/tests/storage.test.mjs). Passing the wrong key does not throw --
      // s3/azure/gcs would read `opts.creds` as undefined and fail deep inside
      // request signing with a confusing error, while the local provider ignores
      // opts entirely and would appear to work.
      await provider.put(name, blob, { creds, contentType: 'application/json' });
      showToast({ type: 'success', title: `Uploaded to ${provider.label}`, detail: name, timeoutMs: 5000 });
    } catch (err) {
      showError('Upload failed', err);
    } finally {
      uploadBtn.disabled = false;
    }
  });

  render();
  const unsubscribe = typeof store.subscribe === 'function' ? store.subscribe(render) : null;

  return {
    unmount() {
      if (typeof unsubscribe === 'function') unsubscribe();
    },
  };
}
