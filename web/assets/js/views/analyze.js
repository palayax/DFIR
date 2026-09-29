// Analyze view stub. The full analysis workflow (filtering/searching the
// SuperTimeline, detection review, LLM-assisted triage) is a later
// subtask; this stub keeps the nav functional and shows what's available
// so far without ever throwing.

export async function mount(container) {
  const header = document.createElement('div');
  header.className = 'view-header';
  header.innerHTML = `
    <div>
      <h1>Analyze</h1>
      <div class="view-subtitle">Coming soon: filter, search, and triage the SuperTimeline.</div>
    </div>`;
  container.appendChild(header);

  const panel = document.createElement('div');
  panel.className = 'panel empty-state';
  panel.textContent = 'Analysis tools are not yet available in this build. Merge your SuperTimeline first.';
  container.appendChild(panel);

  return { unmount() {} };
}
