// Product / vendor marks for the demo's technology stack.
//
// Real logos come from the vendored Simple Icons subset (CC0-1.0, see
// assets/vendor/VENDOR.md). Brands that Simple Icons does not carry (Microsoft,
// AWS, Salesforce, Slack, CrowdStrike, ...) render as a neutral badge in the
// brand's colour with a short text monogram: a label, not a copy of their logo.
// All names and logos are trademarks of their respective owners.

import { BRAND_ICONS } from '../../vendor/simple-icons/brands.js';

const BADGES = {
  aws: ['AWS', 'Amazon Web Services', '#232F3E', '#FF9900'],
  azure: ['Az', 'Microsoft Azure', '#0078D4', '#FFFFFF'],
  microsoft: ['MS', 'Microsoft', '#0078D4', '#FFFFFF'],
  microsoft365: ['365', 'Microsoft 365', '#D83B01', '#FFFFFF'],
  powerbi: ['BI', 'Microsoft Power BI', '#F2C811', '#1F1F1F'],
  windows: ['Win', 'Windows', '#0078D4', '#FFFFFF'],
  salesforce: ['SF', 'Salesforce', '#00A1E0', '#FFFFFF'],
  slack: ['S', 'Slack', '#4A154B', '#FFFFFF'],
  servicenow: ['now', 'ServiceNow', '#293E40', '#62D84E'],
  workday: ['W', 'Workday', '#0875E1', '#FFFFFF'],
  crowdstrike: ['CS', 'CrowdStrike', '#E01F26', '#FFFFFF'],
  proofpoint: ['pp', 'Proofpoint', '#0A4785', '#FFFFFF'],
  netskope: ['N', 'Netskope', '#00205B', '#FFFFFF'],
  cyberark: ['CA', 'CyberArk', '#0E3B76', '#FFFFFF'],
  openai: ['AI', 'OpenAI', '#10A37F', '#FFFFFF'],
  recordedfuture: ['RF', 'Recorded Future', '#0E1E2D', '#FFFFFF'],
  flashpoint: ['FP', 'Flashpoint', '#F05A28', '#FFFFFF'],
  sigstore: ['sig', 'Sigstore', '#2E2F71', '#FFFFFF'],
  openapi: ['API', 'OpenAPI', '#6BA539', '#FFFFFF'],
  irtriage: ['IR', 'IRTriage', '#1D4F91', '#FFFFFF'],
  // Frameworks and regulators (text marks only).
  mitre: ['ATT&CK', 'MITRE ATT&CK', '#C8102E', '#FFFFFF'],
  atlas: ['ATLAS', 'MITRE ATLAS', '#8B0A1E', '#FFFFFF'],
  iso: ['ISO', 'ISO/IEC', '#1D4F91', '#FFFFFF'],
  nist: ['NIST', 'NIST', '#1B3A6B', '#FFFFFF'],
  fedramp: ['FedRAMP', 'FedRAMP', '#0B2A4A', '#FFFFFF'],
  cis: ['CIS', 'Center for Internet Security', '#2E6DA4', '#FFFFFF'],
  aicpa: ['SOC 2', 'AICPA SOC 2', '#3A3F4A', '#FFFFFF'],
  eu: ['EU', 'European Union', '#003399', '#FFCC00'],
  pci: ['PCI', 'PCI Security Standards Council', '#5B6770', '#FFFFFF'],
};

/** Which mark a framework name uses. */
export function frameworkBrand(name = '') {
  if (/ATLAS/.test(name)) return 'atlas';
  if (/ATT&CK|MITRE/.test(name)) return 'mitre';
  if (/OWASP/.test(name)) return 'owasp';
  if (/ISO/.test(name)) return 'iso';
  if (/FedRAMP/.test(name)) return 'fedramp';
  if (/NIST/.test(name)) return 'nist';
  if (/CIS/.test(name)) return 'cis';
  if (/SOC 2/.test(name)) return 'aicpa';
  if (/GDPR|NIS2/.test(name)) return 'eu';
  if (/PCI/.test(name)) return 'pci';
  return null;
}

function esc(v) {
  return String(v ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function isDark(hex) {
  const n = parseInt(hex.slice(1), 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.06;
}

export function brandName(key) {
  return BRAND_ICONS[key]?.title || BADGES[key]?.[1] || key;
}

/**
 * A small brand mark. `title` (e.g. the product name) becomes the tooltip.
 * Near-black logos (GitHub, Apple, ...) follow the text colour so they stay
 * visible in dark mode.
 */
export function brandMark(key, { title = '', size = 'sm', label = false } = {}) {
  if (!key) return '';
  const tip = esc(title || brandName(key));
  const icon = BRAND_ICONS[key];
  const text = label ? `<span class="brand-label">${esc(title || brandName(key))}</span>` : '';
  if (icon) {
    const fill = isDark(icon.hex) ? 'currentColor' : icon.hex;
    return `<span class="brand brand-${size}" title="${tip}"><svg viewBox="0 0 24 24" role="img" aria-label="${tip}"><path fill="${fill}" d="${icon.path}"/></svg>${text}</span>`;
  }
  const b = BADGES[key];
  if (!b) return text ? `<span class="brand brand-${size}" title="${tip}">${text}</span>` : '';
  return `<span class="brand brand-${size}" title="${tip}"><span class="brand-badge" style="background:${b[2]};color:${b[3]}" aria-label="${tip}">${esc(b[0])}</span>${text}</span>`;
}

/** Distinct brands across a list of assets, most frequent first. */
export function topBrands(assets, n = 4) {
  const count = new Map();
  for (const a of assets) if (a.brand) count.set(a.brand, (count.get(a.brand) || 0) + 1);
  return [...count.entries()].sort((x, y) => y[1] - x[1] || x[0].localeCompare(y[0])).slice(0, n).map(([k]) => k);
}
