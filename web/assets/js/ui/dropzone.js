// Drag-and-drop + click-to-browse file picker.

/**
 * @param {HTMLElement} container
 * @param {{ accept?: string, multiple?: boolean, hint?: string, onFiles: (files: File[]) => void }} opts
 */
export function createDropzone(container, opts) {
  const { accept = '', multiple = true, hint = 'Drag and drop files here, or click to browse', onFiles } = opts;

  const zone = document.createElement('div');
  zone.className = 'dropzone';
  zone.setAttribute('role', 'button');
  zone.setAttribute('tabindex', '0');
  zone.setAttribute('aria-label', 'Upload files');

  const text = document.createElement('div');
  text.textContent = 'Drop files to ingest';
  const hintEl = document.createElement('div');
  hintEl.className = 'dropzone-hint';
  hintEl.textContent = hint;

  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = multiple;
  if (accept) input.accept = accept;

  zone.append(text, hintEl, input);
  container.appendChild(zone);

  function emit(fileList) {
    const files = [...fileList];
    if (files.length) onFiles(files);
  }

  zone.addEventListener('click', (e) => {
    if (e.target !== input) input.click();
  });
  zone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });
  input.addEventListener('change', () => {
    emit(input.files);
    input.value = '';
  });

  let dragDepth = 0;
  zone.addEventListener('dragenter', (e) => {
    e.preventDefault();
    dragDepth++;
    zone.classList.add('is-dragover');
  });
  zone.addEventListener('dragover', (e) => e.preventDefault());
  zone.addEventListener('dragleave', () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) zone.classList.remove('is-dragover');
  });
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDepth = 0;
    zone.classList.remove('is-dragover');
    if (e.dataTransfer?.files?.length) emit(e.dataTransfer.files);
  });

  return { el: zone, destroy: () => zone.remove() };
}
