// Virtualized data table. Renders only the rows visible in the viewport (+
// a small overscan buffer) regardless of how many rows the dataset has, so
// 100k+ row SuperTimelines stay smooth to scroll - a plain <table> with one
// <tr> per row would create hundreds of thousands of DOM nodes and become
// unusably slow well before that.
//
// Rows are absolutely-positioned divs recycled from a small pool sized to
// the viewport height; on scroll we only update `top` / textContent for the
// rows that are (or become) visible, we never create/destroy nodes per
// scroll frame.

const ROW_HEIGHT = 28; // must match --row-height in tokens.css
const OVERSCAN = 8;

/**
 * @param {HTMLElement} container
 * @param {{
 *   columns: Array<{ key: string, label: string, width: string, render?: (row:any, index:number) => (string|Node) }>,
 *   rowClassName?: (row:any, index:number) => string,
 *   onRowClick?: (row:any, index:number) => void,
 *   emptyMessage?: string,
 * }} opts
 */
export function createTable(container, opts) {
  const { columns, rowClassName, onRowClick, emptyMessage = 'No rows to display.' } = opts;
  let rows = [];

  const root = document.createElement('div');
  root.className = 'data-table';

  const head = document.createElement('div');
  head.className = 'data-table-head';
  head.setAttribute('role', 'row');
  for (const col of columns) {
    const cell = document.createElement('div');
    cell.className = 'col';
    cell.style.width = col.width;
    cell.style.flexBasis = col.width;
    cell.setAttribute('role', 'columnheader');
    cell.textContent = col.label;
    head.appendChild(cell);
  }

  const viewport = document.createElement('div');
  viewport.className = 'data-table-viewport';
  viewport.setAttribute('role', 'rowgroup');
  viewport.tabIndex = 0;

  const spacer = document.createElement('div');
  spacer.className = 'data-table-spacer';

  const empty = document.createElement('div');
  empty.className = 'data-table-empty';
  empty.textContent = emptyMessage;
  empty.hidden = true;

  viewport.appendChild(spacer);
  root.append(head, viewport, empty);
  container.appendChild(root);

  const pool = []; // recycled row elements
  let poolSize = 0;
  let renderStart = -1; // index currently rendered into pool[0]

  function ensurePoolSize() {
    const needed = Math.ceil(viewport.clientHeight / ROW_HEIGHT) + OVERSCAN * 2;
    if (needed <= poolSize) return;
    for (let i = poolSize; i < needed; i++) {
      const rowEl = document.createElement('div');
      rowEl.className = 'data-table-row';
      rowEl.setAttribute('role', 'row');
      rowEl.style.height = `${ROW_HEIGHT}px`;
      for (const col of columns) {
        const cell = document.createElement('div');
        cell.className = 'col';
        cell.style.width = col.width;
        cell.style.flexBasis = col.width;
        cell.setAttribute('role', 'cell');
        rowEl.appendChild(cell);
      }
      rowEl.addEventListener('click', () => {
        const idx = Number(rowEl.dataset.index);
        if (!Number.isNaN(idx) && rows[idx] !== undefined) onRowClick?.(rows[idx], idx);
      });
      spacer.appendChild(rowEl);
      pool.push(rowEl);
    }
    poolSize = pool.length;
    renderStart = -1; // force re-render with new pool size
  }

  function renderCell(cellEl, col, row, index) {
    const value = col.render ? col.render(row, index) : row?.[col.key];
    if (value instanceof Node) {
      cellEl.replaceChildren(value);
    } else {
      cellEl.textContent = value == null ? '' : String(value);
    }
  }

  function renderVisible() {
    const total = rows.length;
    empty.hidden = total !== 0;
    viewport.hidden = total === 0;
    head.style.display = total === 0 ? 'none' : '';
    if (total === 0) return;

    const scrollTop = viewport.scrollTop;
    let start = Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN;
    start = Math.max(0, Math.min(start, Math.max(0, total - poolSize)));

    if (start === renderStart) return;
    renderStart = start;

    for (let i = 0; i < poolSize; i++) {
      const index = start + i;
      const rowEl = pool[i];
      if (index >= total) {
        rowEl.style.display = 'none';
        continue;
      }
      const row = rows[index];
      rowEl.style.display = '';
      rowEl.style.top = `${index * ROW_HEIGHT}px`;
      rowEl.dataset.index = String(index);
      rowEl.className = `data-table-row ${rowClassName ? rowClassName(row, index) || '' : ''}`.trim();
      for (let c = 0; c < columns.length; c++) {
        renderCell(rowEl.children[c], columns[c], row, index);
      }
    }
  }

  function setRows(newRows) {
    rows = newRows || [];
    spacer.style.height = `${rows.length * ROW_HEIGHT}px`;
    renderStart = -1;
    viewport.scrollTop = 0;
    ensurePoolSize();
    renderVisible();
  }

  let scrollScheduled = false;
  viewport.addEventListener('scroll', () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      scrollScheduled = false;
      renderVisible();
    });
  });

  const resizeObserver = new ResizeObserver(() => {
    ensurePoolSize();
    renderStart = -1;
    renderVisible();
  });
  resizeObserver.observe(viewport);

  setRows([]);

  return {
    el: root,
    setRows,
    getRows: () => rows,
    scrollToIndex(index) {
      viewport.scrollTop = Math.max(0, index * ROW_HEIGHT - viewport.clientHeight / 2);
    },
    destroy() {
      resizeObserver.disconnect();
      root.remove();
    },
  };
}
