// Hand-rolled force-directed layout + SVG renderer for
// dashboard.entity_graph (C6.7). No d3, no graph library - a small
// Fruchterman-Reingold-style simulation (repulsion between all node pairs,
// spring attraction along edges, mild centering force) run for a fixed
// number of iterations with a seeded PRNG so layout is reproducible given
// the same input.
//
// Kind -> shape is a fixed, documented mapping so node *kind* is legible
// without colour; severity is the only thing colour encodes (via CSS
// classes against --sev-* tokens, same convention as charts.js).

/** Beyond this many nodes the force simulation (and the resulting SVG) stop
 * being usable in a browser tab - render a ranked list instead of hanging
 * the layout or producing an unreadable hairball. Documented threshold, not
 * a magic number: O(n^2) repulsion at ~300 nodes x default iterations is
 * still sub-second; well beyond that it is not. */
export const ENTITY_GRAPH_NODE_THRESHOLD = 300;

const KIND_SHAPE = {
  host: 'rect', process: 'circle', file: 'diamond', account: 'triangle',
  ip: 'hexagon', domain: 'square', registry: 'cross', service: 'circle-ring',
  task: 'triangle-outline',
};

function esc(v) {
  return String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Run the force simulation. Returns a Map<nodeId, {x,y}>. Pure/deterministic
 * for a given (nodes, edges, opts) - same seed, same output. */
export function layoutEntityGraph(nodes, edges, opts = {}) {
  const width = opts.width ?? 800;
  const height = opts.height ?? 600;
  const iterations = opts.iterations ?? 150;
  const rng = mulberry32(opts.seed ?? 1);
  const cx = width / 2;
  const cy = height / 2;

  const pos = new Map();
  const vel = new Map();
  nodes.forEach((n) => {
    const angle = rng() * Math.PI * 2;
    const r = Math.min(width, height) * 0.35 * Math.sqrt(rng());
    pos.set(n.id, { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) });
    vel.set(n.id, { x: 0, y: 0 });
  });

  const k = Math.sqrt((width * height) / Math.max(1, nodes.length)); // ideal spacing
  const repulsionStrength = k * k;
  const springLength = k * 0.9;
  const springStrength = 0.02;
  const centerStrength = 0.005;
  const damping = 0.85;

  for (let iter = 0; iter < iterations; iter++) {
    const disp = new Map(nodes.map((n) => [n.id, { x: 0, y: 0 }]));

    // Repulsion, all pairs.
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      const pa = pos.get(a.id);
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const pb = pos.get(b.id);
        let dx = pa.x - pb.x;
        let dy = pa.y - pb.y;
        let dist2 = dx * dx + dy * dy;
        if (dist2 < 0.01) { dx = (rng() - 0.5); dy = (rng() - 0.5); dist2 = 0.01; }
        const dist = Math.sqrt(dist2);
        const force = repulsionStrength / dist2;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        const da = disp.get(a.id); da.x += fx; da.y += fy;
        const db = disp.get(b.id); db.x -= fx; db.y -= fy;
      }
    }

    // Spring attraction along edges.
    for (const e of edges) {
      const pa = pos.get(e.source);
      const pb = pos.get(e.target);
      if (!pa || !pb) continue;
      const dx = pb.x - pa.x;
      const dy = pb.y - pa.y;
      const dist = Math.max(0.01, Math.sqrt(dx * dx + dy * dy));
      const force = springStrength * (dist - springLength) * Math.log2(2 + (e.weight ?? 1));
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      const da = disp.get(e.source); if (da) { da.x += fx; da.y += fy; }
      const db = disp.get(e.target); if (db) { db.x -= fx; db.y -= fy; }
    }

    // Apply, with centering pull and damping, clamped to canvas.
    for (const n of nodes) {
      const p = pos.get(n.id);
      const d = disp.get(n.id);
      const v = vel.get(n.id);
      v.x = (v.x + d.x - (p.x - cx) * centerStrength) * damping;
      v.y = (v.y + d.y - (p.y - cy) * centerStrength) * damping;
      p.x = Math.max(20, Math.min(width - 20, p.x + v.x));
      p.y = Math.max(20, Math.min(height - 20, p.y + v.y));
    }
  }

  return pos;
}

function shapeMarkup(shape, x, y, r, cls) {
  switch (shape) {
    case 'rect':
      return `<rect x="${(x - r).toFixed(1)}" y="${(y - r * 0.7).toFixed(1)}" width="${(r * 2).toFixed(1)}" height="${(r * 1.4).toFixed(1)}" class="${cls}"></rect>`;
    case 'diamond':
      return `<polygon points="${x},${(y - r).toFixed(1)} ${(x + r).toFixed(1)},${y} ${x},${(y + r).toFixed(1)} ${(x - r).toFixed(1)},${y}" class="${cls}"></polygon>`;
    case 'triangle':
      return `<polygon points="${x},${(y - r).toFixed(1)} ${(x + r).toFixed(1)},${(y + r).toFixed(1)} ${(x - r).toFixed(1)},${(y + r).toFixed(1)}" class="${cls}"></polygon>`;
    case 'triangle-outline':
      return `<polygon points="${x},${(y - r).toFixed(1)} ${(x + r).toFixed(1)},${(y + r).toFixed(1)} ${(x - r).toFixed(1)},${(y + r).toFixed(1)}" class="${cls}" fill="none"></polygon>`;
    case 'square':
      return `<rect x="${(x - r * 0.8).toFixed(1)}" y="${(y - r * 0.8).toFixed(1)}" width="${(r * 1.6).toFixed(1)}" height="${(r * 1.6).toFixed(1)}" transform="rotate(45 ${x} ${y})" class="${cls}"></rect>`;
    case 'hexagon': {
      const pts = [0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return `${(x + r * Math.cos(rad)).toFixed(1)},${(y + r * Math.sin(rad)).toFixed(1)}`;
      }).join(' ');
      return `<polygon points="${pts}" class="${cls}"></polygon>`;
    }
    case 'cross':
      return `<path d="M ${(x - r).toFixed(1)} ${y} L ${(x + r).toFixed(1)} ${y} M ${x} ${(y - r).toFixed(1)} L ${x} ${(y + r).toFixed(1)}" class="${cls}" stroke-width="3"></path>`;
    case 'circle-ring':
      return `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}" fill="none"></circle>`;
    case 'circle':
    default:
      return `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"></circle>`;
  }
}

/** Render dashboard.entity_graph. Returns an HTML string: either an <svg>
 * force-directed view (<= ENTITY_GRAPH_NODE_THRESHOLD nodes) or a ranked
 * fallback list (larger graphs), per the documented degrade policy. */
export function renderEntityGraph(entityGraph, opts = {}) {
  const nodes = entityGraph?.nodes ?? [];
  const edges = entityGraph?.edges ?? [];
  if (nodes.length === 0) {
    return '<p class="empty-state">No entity relationships were extracted for this report.</p>';
  }

  if (nodes.length > ENTITY_GRAPH_NODE_THRESHOLD) {
    return renderRankedFallback(nodes, edges);
  }

  const width = opts.width ?? 800;
  const height = opts.height ?? 600;
  const pos = layoutEntityGraph(nodes, edges, { width, height, seed: opts.seed ?? 1, iterations: opts.iterations });

  const edgeLines = edges.map((e) => {
    const pa = pos.get(e.source);
    const pb = pos.get(e.target);
    if (!pa || !pb) return '';
    const w = Math.min(4, 0.5 + Math.log2(2 + (e.weight ?? 1)));
    return `<line x1="${pa.x.toFixed(1)}" y1="${pa.y.toFixed(1)}" x2="${pb.x.toFixed(1)}" y2="${pb.y.toFixed(1)}" class="entity-edge" stroke-width="${w.toFixed(2)}"><title>${esc(e.kind) || 'related'} (weight ${e.weight ?? 1})</title></line>`;
  }).join('\n');

  const nodeMarks = nodes.map((n) => {
    const p = pos.get(n.id);
    if (!p) return '';
    const shape = KIND_SHAPE[n.kind] || 'circle';
    const sev = n.severity || 'none';
    const r = 6 + Math.min(10, Math.log2(2 + (n.event_count ?? 1)));
    const cls = `entity-node sev-${esc(sev)}`;
    const mark = shapeMarkup(shape, p.x, p.y, r, cls);
    return `<g class="entity-node-group" data-node-id="${esc(n.id)}" data-kind="${esc(n.kind)}" tabindex="0" role="button" aria-label="${esc(n.kind)} ${esc(n.label || n.id)}, severity ${esc(sev)}, ${n.event_count ?? 0} events">
      ${mark}
      <title>${esc(n.label || n.id)} (${esc(n.kind)}) - ${n.event_count ?? 0} events</title>
      <text x="${p.x.toFixed(1)}" y="${(p.y + r + 10).toFixed(1)}" class="entity-node-label" text-anchor="middle">${esc(truncateLabel(n.label || n.id))}</text>
    </g>`;
  }).join('\n');

  const legend = Object.entries(KIND_SHAPE).map(([kind, shape]) => `<span class="entity-legend-item"><svg width="16" height="16" viewBox="-8 -8 16 16" aria-hidden="true">${shapeMarkup(shape, 0, 0, 5, 'entity-node sev-none')}</svg> ${esc(kind)}</span>`).join('');

  return `<div class="entity-graph-wrap">
    <svg viewBox="0 0 ${width} ${height}" class="chart-svg entity-graph-svg" role="img" aria-label="Entity relationship graph, ${nodes.length} nodes, ${edges.length} relationships">
      <title>Entity relationship graph (process/file/network/account relationships)</title>
      <g class="entity-edges">${edgeLines}</g>
      <g class="entity-nodes">${nodeMarks}</g>
    </svg>
    <div class="entity-legend" aria-hidden="true">${legend}</div>
    <details class="chart-data-table"><summary>Node list</summary>${renderNodeTable(nodes)}</details>
  </div>`;
}

function truncateLabel(label, max = 18) {
  const s = String(label ?? '');
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

function renderNodeTable(nodes) {
  const rows = nodes.map((n) => `<tr><td>${esc(n.label || n.id)}</td><td>${esc(n.kind)}</td><td>${esc(n.severity) || ''}</td><td class="num">${n.event_count ?? 0}</td></tr>`).join('');
  return `<table><thead><tr><th>Label</th><th>Kind</th><th>Severity</th><th>Events</th></tr></thead><tbody>${rows}</tbody></table>`;
}

function renderRankedFallback(nodes, edges) {
  const degree = new Map();
  for (const e of edges) {
    degree.set(e.source, (degree.get(e.source) ?? 0) + 1);
    degree.set(e.target, (degree.get(e.target) ?? 0) + 1);
  }
  const ranked = [...nodes].sort((a, b) => (degree.get(b.id) ?? 0) - (degree.get(a.id) ?? 0)).slice(0, 100);
  const rows = ranked.map((n) => `<tr><td>${esc(n.label || n.id)}</td><td>${esc(n.kind)}</td><td>${esc(n.severity) || ''}</td><td class="num">${n.event_count ?? 0}</td><td class="num">${degree.get(n.id) ?? 0}</td></tr>`).join('');
  return `<div class="entity-graph-fallback">
    <p class="callout-flag">This report has ${nodes.length} entities, beyond the ${ENTITY_GRAPH_NODE_THRESHOLD}-node threshold for an interactive force layout. Showing the top 100 by relationship count instead.</p>
    <table><thead><tr><th>Label</th><th>Kind</th><th>Severity</th><th>Events</th><th>Relationships</th></tr></thead><tbody>${rows}</tbody></table>
  </div>`;
}
