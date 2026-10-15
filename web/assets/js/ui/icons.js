// A small set of line icons drawn for this app (24×24, stroke = currentColor).
// Hand-made geometric shapes; no icon library is vendored.

const P = {
  endpoint: '<rect x="4" y="5" width="16" height="11" rx="1.5"/><path d="M2 19h20"/>',
  server: '<rect x="4" y="3" width="16" height="7" rx="1.5"/><rect x="4" y="14" width="16" height="7" rx="1.5"/><path d="M8 6.5h.01M8 17.5h.01"/>',
  cloud: '<path d="M7 18h10a4 4 0 0 0 .6-7.95A6 6 0 0 0 6.2 9.5 4.3 4.3 0 0 0 7 18z"/>',
  api: '<path d="M8 4c-2 0-3 1-3 3v2c0 1.5-1 2.5-2 3 1 .5 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5 1 2.5 2 3-1 .5-2 1.5-2 3v2c0 2-1 3-3 3"/>',
  network: '<rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 17h.01M11 17h.01M12 14V9M8 6a5.5 5.5 0 0 1 8 0M5.5 3.5a9 9 0 0 1 13 0"/>',
  iot: '<rect x="7" y="7" width="10" height="10" rx="1.5"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z"/>',
  cicd: '<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="9" r="2.5"/><path d="M6 8.5v7M18 11.5c0 3-3 4-9 5"/>',
  ai: '<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z"/>',
  darknet: '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/><path d="M4 4l16 16"/>',
  log: '<path d="M7 3h9l4 4v14H7zM16 3v4h4M10 11h7M10 15h7M10 19h4"/><path d="M4 6v15"/>',
  dollar: '<path d="M12 2v20M17 6.5c-1-1.5-2.8-2-5-2-3 0-5 1.4-5 3.6 0 5 10 2.6 10 7.6 0 2.2-2 3.8-5 3.8-2.4 0-4.2-.8-5.3-2.3"/>',
  refresh: '<path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v5h-5"/>',
  percent: '<path d="M19 5L5 19"/><circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="17" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  star: '<path d="M12 3l2.8 5.8 6.2.9-4.5 4.4 1.1 6.2L12 17.4l-5.6 2.9 1.1-6.2L3 9.7l6.2-.9z"/>',
  audit: '<circle cx="12" cy="9" r="6"/><path d="M9.5 9l2 2 3.5-3.5M8.5 14l-1.5 7 5-2.5 5 2.5-1.5-7"/>',
  growth: '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
  people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.5-3.6 3.2-6 6.5-6s6 2.4 6.5 6M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2 .7 3.3 2.8 3.5 5.7"/>',
  process: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/>',
  data: '<ellipse cx="12" cy="5.5" rx="8" ry="3"/><path d="M4 5.5v13c0 1.7 3.6 3 8 3s8-1.3 8-3v-13M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  system: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/>',
  alert: '<path d="M12 3l10 18H2zM12 10v5M12 18h.01"/>',
  hunt: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4M11 7v8M7 11h8"/>',
  evidence: '<path d="M6 3h9l4 4v14H6zM15 3v4h4"/><path d="M9 13l2 2 4-4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
  policy: '<path d="M6 3h12v18H6z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
};

export function icon(name, { cls = '', title = '' } = {}) {
  const body = P[name];
  if (!body) return '';
  return `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${title ? `role="img" aria-label="${title}"><title>${title}</title>` : 'aria-hidden="true">'}${body}</svg>`;
}

export const ICON_NAMES = Object.freeze(Object.keys(P));
