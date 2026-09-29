// Analyze view: turn the merged SuperTimeline into a forensic report by driving
// the map-reduce analysis pipeline (assets/js/analysis/pipeline.js).
//
// This view was previously a stub reading "Analysis tools are not yet available
// in this build", even though analysis/{reduce,pipeline,dashboard,validate-report}.js
// were complete and covered by the test suite. The tests import those modules
// directly, so a green suite said nothing about whether the UI could reach them --
// and it could not. Everything below is wiring; no analysis logic lives here.
//
// Two deliberate properties:
//
//   1. NOTHING IS SENT UNTIL THE OPERATOR HAS SEEN THE PLAN. previewPlan() is
//      deterministic and free (no model call), so the pack count, the rows
//      included vs. omitted, the token estimate and the cost estimate are all on
//      screen before the Run button does anything. During an incident, an
//      accidental six-figure-token spend on the wrong timeline is a real risk.
//   2. The run is ABORTABLE. A map phase over 12 packs against a slow provider
//      can take minutes; a view that offers no way out but closing the tab is
//      not usable under pressure.

import { previewPlan } from '../analysis/reduce.js';
import { analyze, PipelineError } from '../analysis/pipeline.js';
import { getProvider, defaultProviderId, defaultModelId } from '../providers/index.js';
import { showToast, showError } from '../ui/toast.js';
import { createProgress } from '../ui/progress.js';

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

function fmtInt(n) {
  return Number(n || 0).toLocaleString('en-US');
}

// An estimate of $0 is meaningful (it is what the mock provider costs, and what
// a model with no published pricing yields), so it must not render as a blank or
// as "unknown". An estimate that is genuinely absent renders as "n/a".
function fmtUsd(n) {
  if (n === null || n === undefined || Number.isNaN(Number(n))) return 'n/a';
  const v = Number(n);
  if (v === 0) return '$0.00';
  if (v < 0.01) return '<$0.01';
  return `$${v.toFixed(2)}`;
}

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <h1>Analyze</h1>
      <div class="view-subtitle">Reduce the SuperTimeline to evidence packs and generate a forensic report.</div>
    </div>`;

  const actions = document.createElement('div');
  actions.className = 'view-actions';
  const previewBtn = document.createElement('button');
  previewBtn.className = 'btn';
  previewBtn.textContent = 'Preview plan';
  const runBtn = document.createElement('button');
  runBtn.className = 'btn btn-primary';
  runBtn.textContent = 'Run analysis';
  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.hidden = true;
  actions.append(previewBtn, runBtn, cancelBtn);
  header.appendChild(actions);
  container.appendChild(header);

  const providerPanel = document.createElement('div');
  providerPanel.className = 'panel';
  container.appendChild(providerPanel);

  const progressHost = document.createElement('div');
  container.appendChild(progressHost);

  const planPanel = document.createElement('div');
  planPanel.className = 'panel';
  planPanel.hidden = true;
  container.appendChild(planPanel);

  const logPanel = document.createElement('div');
  logPanel.className = 'panel';
  logPanel.hidden = true;
  container.appendChild(logPanel);

  let controller = null;

  function currentSelection() {
    const s = store.getState().settings || {};
    const providerId = s.llmProviderId || defaultProviderId;
    const provider = getProvider(providerId);
    const modelId = s.llmModelId || (provider?.models?.[0]?.id) || defaultModelId;
    const model = (provider?.models || []).find((m) => m.id === modelId) || { id: modelId };
    return { providerId, provider, modelId, model, creds: s.llmCreds || {} };
  }

  function renderProviderPanel() {
    providerPanel.replaceChildren();
    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Analysis target';
    providerPanel.appendChild(title);

    const { provider, modelId, creds } = currentSelection();
    const st = store.getState().superTimeline;

    const body = document.createElement('div');
    body.className = 'stat-grid';
    body.append(
      stat('Provider', provider ? provider.label : 'not configured'),
      stat('Model', modelId || '—'),
      stat('Timeline rows', st ? fmtInt(st.records.length) : 0),
      stat('Detections', st ? fmtInt(st.stats.totalDetections) : 0),
    );
    providerPanel.appendChild(body);

    const notes = [];
    if (!st || st.records.length === 0) {
      notes.push('No SuperTimeline yet — build one on the Merge view first.');
    }
    // Missing credentials are reported here rather than at send time: finding out
    // after a 40-second pack build that an API key was never entered is a poor
    // trade when the check costs nothing.
    if (provider) {
      const check = provider.validateCredentials?.(creds) ?? { ok: true, errors: [] };
      if (!check.ok || (check.errors || []).length) {
        notes.push(`${provider.label} needs credentials: ${(check.errors || []).join('; ')}. Enter them on Settings, or pick the Mock provider for a zero-cost, zero-network dry run.`);
      }
    } else {
      notes.push('No LLM provider selected — choose one on the Settings view.');
    }
    for (const n of notes) {
      const p = document.createElement('div');
      p.className = 'field-hint';
      p.textContent = n;
      providerPanel.appendChild(p);
    }

    const ready = Boolean(st && st.records.length > 0);
    previewBtn.disabled = !ready;
    runBtn.disabled = !ready;
  }

  function renderPlan(plan) {
    planPanel.hidden = false;
    planPanel.replaceChildren();
    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Plan (deterministic — no model call was made to produce this)';
    planPanel.appendChild(title);

    const grid = document.createElement('div');
    grid.className = 'stat-grid';
    grid.append(
      stat('Evidence packs', plan.packs.length),
      stat('Rows analysed', fmtInt(plan.rowsIncluded)),
      stat('Rows omitted', fmtInt(plan.rowsOmitted)),
      stat('Reduction', `${(plan.reductionRatio * 100).toFixed(1)}%`),
      stat('Est. input tokens', fmtInt(plan.estimatedInputTokens)),
      stat('Est. output tokens', fmtInt(plan.estimatedOutputTokens)),
      stat('Est. cost', fmtUsd(plan.estimatedCostUsd)),
      stat('Model calls', plan.packs.length + 1),
    );
    planPanel.appendChild(grid);

    const hint = document.createElement('div');
    hint.className = 'field-hint';
    hint.textContent = `Strategy: ${plan.strategy}. Model calls = one per pack (map) plus one synthesis call (reduce); a schema-repair retry can add up to 2 more. Digest ${String(plan.digest).slice(0, 16)}… identifies this exact pack set.`;
    planPanel.appendChild(hint);

    const list = document.createElement('div');
    list.className = 'field-hint';
    list.style.whiteSpace = 'pre-wrap';
    list.textContent = plan.packs
      .map((p) => `pack ${p.index}: ${fmtInt(p.rowCount)} rows, ~${fmtInt(p.estimatedTokens)} tok, ${p.selectionStrategy}`)
      .join('\n');
    planPanel.appendChild(list);
  }

  function logLine(text) {
    logPanel.hidden = false;
    const line = document.createElement('div');
    line.className = 'field-hint';
    line.textContent = text;
    logPanel.appendChild(line);
    logPanel.scrollTop = logPanel.scrollHeight;
  }

  async function doPreview() {
    const st = store.getState().superTimeline;
    if (!st) return;
    previewBtn.disabled = true;
    try {
      const { model } = currentSelection();
      const plan = await previewPlan(st.records, { model });
      renderPlan(plan);
      showToast({ type: 'info', title: `${plan.packs.length} evidence pack(s) planned`, detail: `${fmtInt(plan.rowsIncluded)} of ${fmtInt(plan.totalRows)} rows, est. ${fmtUsd(plan.estimatedCostUsd)}`, timeoutMs: 6000 });
    } catch (err) {
      showError('Could not build a plan', err);
    } finally {
      previewBtn.disabled = false;
      renderProviderPanel();
    }
  }

  async function doRun() {
    const state = store.getState();
    const st = state.superTimeline;
    if (!st || st.records.length === 0) {
      showToast({ type: 'info', title: 'Nothing to analyse', detail: 'Build a SuperTimeline on the Merge view first.' });
      return;
    }
    const { provider, model, creds } = currentSelection();
    if (!provider) {
      showError('No LLM provider selected', 'Choose a provider on the Settings view.');
      return;
    }
    const check = provider.validateCredentials?.(creds) ?? { ok: true, errors: [] };
    if (!check.ok || (check.errors || []).length) {
      showError(`${provider.label} is not fully configured`, (check.errors || []).join('; '));
      return;
    }

    controller = new AbortController();
    runBtn.disabled = true;
    previewBtn.disabled = true;
    cancelBtn.hidden = false;
    logPanel.replaceChildren();
    progressHost.replaceChildren();
    const progress = createProgress(progressHost, { label: 'Starting analysis…', ratio: null });

    try {
      const report = await analyze(st.records, {
        provider,
        model,
        creds,
        signal: controller.signal,
        engagement: {
          id: state.engagementId,
          label: state.engagementLabel,
        },
        onProgress: (e) => {
          progress.set(null, { label: e.message || e.phase });
          logLine(`[${e.phase}] ${e.message || ''}`);
        },
      });
      store.set({ report });
      logLine('Report stored. Opening the Report view.');
      showToast({ type: 'success', title: 'Analysis complete', detail: `${(report.findings || []).length} finding(s)`, timeoutMs: 5000 });
      location.hash = '#/report';
    } catch (err) {
      if (err && (err.name === 'AbortError' || err.code === 'aborted')) {
        showToast({ type: 'info', title: 'Analysis cancelled' });
        logLine('Cancelled by operator.');
      } else if (err instanceof PipelineError) {
        // PipelineError carries a machine-readable code; surfacing it saves an
        // operator from guessing whether the failure was theirs or the model's.
        showError(`Analysis failed (${err.code || 'pipeline_error'})`, err);
        logLine(`FAILED: ${err.message}`);
      } else {
        showError('Analysis failed', err);
        logLine(`FAILED: ${err && err.message ? err.message : String(err)}`);
      }
    } finally {
      progress.destroy();
      controller = null;
      cancelBtn.hidden = true;
      runBtn.disabled = false;
      previewBtn.disabled = false;
      renderProviderPanel();
    }
  }

  previewBtn.addEventListener('click', doPreview);
  runBtn.addEventListener('click', doRun);
  cancelBtn.addEventListener('click', () => {
    if (controller) controller.abort();
  });

  renderProviderPanel();

  return {
    unmount() {
      if (controller) controller.abort();
    },
  };
}
