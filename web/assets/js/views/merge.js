// Merge view: combine every successfully-parsed file into one deduplicated
// SuperTimeline (assets/js/merge/supertimeline.js) and preview it in a
// virtualized table, with JSONL/CSV export.

import { mergeSuperTimeline } from '../merge/supertimeline.js';
import { jsonlBlob, csvBlob } from '../merge/export.js';
import { createTable } from '../ui/table.js';
import { severityChip } from '../ui/chips.js';
import { showError, showToast } from '../ui/toast.js';
import { createProgress } from '../ui/progress.js';

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

export async function mount(container, { store }) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <h1>Merge</h1>
      <div class="view-subtitle">Deduplicate and combine parsed files into one SuperTimeline.</div>
    </div>`;
  const actions = document.createElement('div');
  actions.className = 'view-actions';
  const mergeBtn = document.createElement('button');
  mergeBtn.className = 'btn btn-primary';
  mergeBtn.textContent = 'Build SuperTimeline';
  const exportJsonlBtn = document.createElement('button');
  exportJsonlBtn.className = 'btn';
  exportJsonlBtn.textContent = 'Export JSONL';
  exportJsonlBtn.disabled = true;
  const exportCsvBtn = document.createElement('button');
  exportCsvBtn.className = 'btn';
  exportCsvBtn.textContent = 'Export CSV';
  exportCsvBtn.disabled = true;
  actions.append(mergeBtn, exportJsonlBtn, exportCsvBtn);
  header.appendChild(actions);
  container.appendChild(header);

  const progressHost = document.createElement('div');
  container.appendChild(progressHost);

  const statsPanel = document.createElement('div');
  statsPanel.className = 'panel';
  statsPanel.hidden = true;
  container.appendChild(statsPanel);

  const tablePanel = document.createElement('div');
  tablePanel.className = 'panel';
  tablePanel.style.height = '520px';
  tablePanel.style.display = 'flex';
  tablePanel.style.flexDirection = 'column';
  container.appendChild(tablePanel);

  const table = createTable(tablePanel, {
    emptyMessage: 'No SuperTimeline yet — click "Build SuperTimeline".',
    rowClassName: (row) => (row.severity_max === 'critical' ? 'sev-critical' : row.severity_max === 'high' ? 'sev-high' : ''),
    columns: [
      { key: 'timestamp_utc', label: 'Timestamp (UTC)', width: '230px' },
      { key: 'source', label: 'Source', width: '140px' },
      { key: 'artifact', label: 'Artifact', width: '160px' },
      { key: 'host', label: 'Host', width: '140px' },
      { key: 'user', label: 'User', width: '120px' },
      {
        key: 'severity_max',
        label: 'Severity',
        width: '110px',
        render: (row) => severityChip(row.severity_max),
      },
      { key: 'message', label: 'Message', width: '480px' },
    ],
  });

  function renderStats(stats) {
    statsPanel.hidden = false;
    statsPanel.replaceChildren();
    const title = document.createElement('div');
    title.className = 'panel-title';
    title.textContent = 'Merge statistics';
    const grid = document.createElement('div');
    grid.className = 'stat-grid';
    const items = [
      ['Rows in', stats.totalRowsIn],
      ['Rows out', stats.totalRowsOut],
      ['Duplicates removed', stats.duplicatesRemoved],
      ['Hosts', stats.hostCount],
      ['Artifacts', stats.artifactCount],
      ['Detections', stats.totalDetections],
      ['Critical rows', stats.severityCounts.critical || 0],
      ['High rows', stats.severityCounts.high || 0],
    ];
    for (const [label, value] of items) {
      const stat = document.createElement('div');
      stat.className = 'stat';
      const v = document.createElement('div');
      v.className = 'stat-value';
      v.textContent = String(value);
      const l = document.createElement('div');
      l.className = 'stat-label';
      l.textContent = label;
      stat.append(v, l);
      grid.appendChild(stat);
    }
    statsPanel.append(title, grid);
  }

  async function runMerge() {
    const parsedFiles = store.getState().files.filter((f) => f.status === 'parsed' && f.records);
    if (parsedFiles.length === 0) {
      showToast({ type: 'info', title: 'No parsed files to merge', detail: 'Add files on the Ingest view first.' });
      return;
    }
    mergeBtn.disabled = true;
    progressHost.replaceChildren();
    const progress = createProgress(progressHost, { label: 'Merging…', ratio: null });
    try {
      const sources = parsedFiles.map((f) => ({
        id: f.id,
        label: f.name,
        fileName: f.name,
        records: f.records,
      }));
      const { records, stats } = await mergeSuperTimeline(sources, {
        onProgress: ({ sourceIndex, sourceCount, rowsIn }) => {
          progress.set(null, { label: `Merging file ${sourceIndex + 1} of ${sourceCount}… (${rowsIn} rows)` });
        },
      });
      store.set({ superTimeline: { records, stats } });
      table.setRows(records);
      renderStats(stats);
      exportJsonlBtn.disabled = records.length === 0;
      exportCsvBtn.disabled = records.length === 0;
      showToast({ type: 'success', title: `SuperTimeline built: ${records.length} rows`, timeoutMs: 4000 });
    } catch (err) {
      showError('Merge failed', err);
    } finally {
      progress.destroy();
      mergeBtn.disabled = false;
    }
  }

  mergeBtn.addEventListener('click', runMerge);

  exportJsonlBtn.addEventListener('click', () => {
    const st = store.getState().superTimeline;
    if (!st) return;
    const engagementId = store.getState().engagementLabel || 'engagement';
    const { blob, fileName } = jsonlBlob(st.records, { engagementId });
    downloadBlob(blob, fileName);
  });
  exportCsvBtn.addEventListener('click', () => {
    const st = store.getState().superTimeline;
    if (!st) return;
    const engagementId = store.getState().engagementLabel || 'engagement';
    const { blob, fileName } = csvBlob(st.records, { engagementId });
    downloadBlob(blob, fileName);
  });

  const existing = store.getState().superTimeline;
  if (existing) {
    table.setRows(existing.records);
    renderStats(existing.stats);
    exportJsonlBtn.disabled = existing.records.length === 0;
    exportCsvBtn.disabled = existing.records.length === 0;
  }

  return {
    unmount() {
      table.destroy();
    },
  };
}
