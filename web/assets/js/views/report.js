// Report view stub. LLM-generated report drafting is a later subtask; this
// stub keeps the nav functional without ever throwing.

export async function mount(container) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <h1>Report</h1>
      <div class="view-subtitle">Coming soon: generate a draft IR report from the SuperTimeline.</div>
    </div>`;
  container.appendChild(header);

  const panel = document.createElement('div');
  panel.className = 'panel empty-state';
  panel.textContent = 'Report generation is not yet available in this build.';
  container.appendChild(panel);

  return { unmount() {} };
}
