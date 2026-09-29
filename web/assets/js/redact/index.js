// Browser-side enforcement of the sensitive-data policy in
// config/sensitive-data.yaml.
//
// SAME POLICY, SAME FILE. This module loads web/assets/data/sensitive-data.json,
// which scripts/gen-sensitive-data.py compiles from the YAML and build/build.ps1
// gates with --check. There is no second policy here: if the client redacts an
// archive one way and the web app publishes a report another way, the whole
// register is worthless, so the two consume one source.
//
// Why the web app needs this at all: the client can only redact what it collects.
// A report is assembled in the browser from a merged SuperTimeline plus
// model-authored prose, and the model was given real evidence — so it will quote
// real hostnames, usernames and paths back into its narrative. Redacting the
// timeline and then publishing an un-redacted narrative achieves nothing.
//
// Limits are the same as the Go side and are stated in the catalogue itself:
// structural exclusions are reliable, pattern-based redaction of free text is a
// reduction in exposure, not a guarantee. A human must review before publishing.

const CATALOG_URL = new URL('../../data/sensitive-data.json', import.meta.url);

/** Actions that cannot be overridden by a profile's class_actions. Mirrors
 * internal/redact's isStickyAction — see the precedence note in the catalogue. */
const STICKY_ACTIONS = new Set(['exclude', 'rewrite', 'review']);

let cachedCatalog = null;

/** Load and cache the compiled catalogue. */
export async function loadCatalog() {
  if (cachedCatalog) return cachedCatalog;
  const res = await fetch(CATALOG_URL);
  if (!res.ok) throw new Error(`redact: could not load the sensitive-data catalogue (HTTP ${res.status})`);
  const cat = await res.json();
  if (cat.version !== 1) {
    throw new Error(`redact: unsupported catalogue version ${cat.version} (this build understands 1)`);
  }
  cachedCatalog = cat;
  return cat;
}

/** Profile ids, for populating a selector. */
export function profileIds(cat) {
  return (cat.profiles || []).map((p) => p.id);
}

// ---------------------------------------------------------------------------
// pseudonymisation
// ---------------------------------------------------------------------------

/**
 * HMAC-SHA256 pseudonym, truncated to 12 hex chars — byte-for-byte the same
 * construction as internal/redact's pseudo(), so a timeline redacted by the
 * client and a report redacted here produce the SAME pseudonym for the same input
 * under the same key. Without that, a published report's "pseudo:47d1…" would not
 * match the published timeline's, and the report's citations would be unusable.
 *
 * A bare SHA-256 would be trivially reversible for a value like a hostname, which
 * is why this is keyed.
 */
async function hmacPseudonym(key, value) {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(value.toLowerCase()));
  const hex = [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
  return `pseudo:${hex.slice(0, 12)}`;
}

/** Parse a hex key, or generate a random one. Returns {key, source}. */
export async function resolveKey(hexKey) {
  if (hexKey) {
    const clean = hexKey.trim().replace(/\s+/g, '');
    if (!/^[0-9a-fA-F]+$/.test(clean) || clean.length < 32) {
      throw new Error('redact: key must be hex and at least 32 characters (16 bytes)');
    }
    const bytes = new Uint8Array(clean.length / 2);
    for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(clean.substr(i * 2, 2), 16);
    return { key: bytes, source: 'explicit' };
  }
  return { key: crypto.getRandomValues(new Uint8Array(32)), source: 'random-per-run' };
}

// ---------------------------------------------------------------------------
// the redactor
// ---------------------------------------------------------------------------

export class Redactor {
  #cat;
  #profile;
  #key;
  #keySource;
  #actions = new Map();     // component id -> effective action
  #components = new Map();  // component id -> component
  #patterns = [];           // {id, re, replacement, preserve:Set|null}
  #pseudonyms = new Map();  // original(lowercased) -> pseudonym
  #seeded = [];             // {re, replacement, length}
  #counts = new Map();
  #review = new Map();

  constructor(cat, profileId, key, keySource) {
    this.#cat = cat;
    this.#key = key;
    this.#keySource = keySource;
    this.#profile = (cat.profiles || []).find((p) => p.id === profileId);
    if (!this.#profile) {
      throw new Error(`redact: unknown profile "${profileId}" (available: ${profileIds(cat).join(', ')})`);
    }

    const classById = new Map((cat.classes || []).map((c) => [c.id, c]));
    for (const comp of cat.components || []) {
      this.#components.set(comp.id, comp);
      let act = comp.action || classById.get(comp.classes[0])?.default_action;
      const classActions = this.#profile.class_actions || {};
      if (!STICKY_ACTIONS.has(act) && classActions[comp.classes[0]]) {
        act = classActions[comp.classes[0]];
      }
      this.#actions.set(comp.id, act);
    }

    if (!this.enabled) return;

    for (const p of cat.patterns || []) {
      try {
        this.#patterns.push({
          id: p.id,
          re: compileCatalogRegex(p.regex),
          replacement: p.replacement,
          preserve: p.preserve_values ? new Set(p.preserve_values.map((v) => v.toLowerCase())) : null,
        });
      } catch (err) {
        // A skipped pattern means the browser silently enforces LESS than the
        // client, so this must be loud. web/tests/redact.test.mjs asserts every
        // catalogue pattern compiles here, so a regression fails the build rather
        // than quietly weakening a published report.
        console.error(`redact: pattern ${p.id} did not compile, so it will NOT be applied:`, err.message);
      }
    }
  }

  static async create(profileId, hexKey) {
    const cat = await loadCatalog();
    const { key, source } = await resolveKey(hexKey);
    return new Redactor(cat, profileId, key, source);
  }

  get enabled() {
    if (this.#profile.enabled !== undefined && this.#profile.enabled !== null) return Boolean(this.#profile.enabled);
    return this.#profile.id !== 'none';
  }

  get profileId() { return this.#profile.id; }
  get keySource() { return this.#keySource; }
  get excludeRawFiles() { return this.enabled && Boolean(this.#profile.options?.exclude_raw_files); }

  /**
   * Register a known customer-specific identifier for substitution in free text.
   *
   * Patterns recognise shapes; nothing about "WKS-CORP-07" marks it as a hostname.
   * On the client this omission leaked a hostname into 20 timeline rows while the
   * dedicated host column was correctly pseudonymised, so the browser side has the
   * same mechanism — seeded from the SuperTimeline's own host/user values before
   * any export runs.
   *
   * Word-boundary anchored: substring-replacing a generic account name like
   * "User" would rewrite "NTUSER.DAT" and "UserAssist", corrupting the artifact
   * names an analyst needs while protecting nothing.
   */
  async seed(componentId, value) {
    if (!this.enabled) return;
    const v = String(value ?? '').trim();
    if (v.length < 4) return;
    const replacement = await this.field(componentId, v);
    if (replacement === v) return;
    this.#seeded.push({
      re: new RegExp(`\\b${v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'),
      replacement,
      length: v.length,
    });
    this.#seeded.sort((a, b) => b.length - a.length);
  }

  async #pseudonym(value) {
    const k = value.toLowerCase();
    if (this.#pseudonyms.has(k)) return this.#pseudonyms.get(k);
    const p = await hmacPseudonym(this.#key, k);
    this.#pseudonyms.set(k, p);
    return p;
  }

  #bump(id) { this.#counts.set(id, (this.#counts.get(id) || 0) + 1); }

  /** Apply the policy registered for componentId. */
  async field(componentId, value) {
    const comp = this.#components.get(componentId);
    if (!comp) {
      throw new Error(`redact: no catalogue component "${componentId}" — add it to config/sensitive-data.yaml`);
    }
    const v = String(value ?? '');
    if (!this.enabled || v === '') return v;

    for (const pv of comp.preserve_values || []) {
      if (pv.toLowerCase() === v.toLowerCase()) return v;
    }

    switch (this.#actions.get(comp.id)) {
      case 'keep':
        return v;
      case 'review':
        this.#review.set(comp.id, (this.#review.get(comp.id) || 0) + 1);
        return v;
      case 'drop':
        this.#bump(comp.id);
        return '';
      case 'hash':
        this.#bump(comp.id);
        return this.#pseudonym(v);
      case 'mask':
        return this.#mask(comp, v);
      case 'partial':
        this.#bump(comp.id);
        return partialMask(v);
      case 'scan':
        return this.text(v, comp.id);
      default:
        return v;
    }
  }

  #mask(comp, v) {
    const trimmed = v.trim();
    if (isIPAddress(trimmed)) {
      // A public address is an INDICATOR, not victim topology: an attacker's C2
      // address is the most valuable line a published report can carry.
      if ((this.#profile.options?.public_ip_is_indicator ?? true) && !isPrivateIP(trimmed)) return v;
      this.#bump(comp.id);
      return trimmed.includes(':') ? '[REDACTED-PRIVATE-IPV6]' : '[REDACTED-PRIVATE-IP]';
    }
    this.#bump(comp.id);
    return `[REDACTED-${comp.classes[0].toUpperCase()}]`;
  }

  /** Pattern scan plus seeded identifiers. `attributeTo` credits a component. */
  text(value, attributeTo = null) {
    if (!this.enabled || !value) return value;
    let out = String(value);

    for (const p of this.#patterns) {
      p.re.lastIndex = 0;
      const replaced = p.preserve
        ? out.replace(p.re, (...args) => {
            const groups = args.slice(1, -2);
            for (const g of groups) {
              if (typeof g === 'string' && p.preserve.has(g.toLowerCase())) return args[0];
            }
            return expandReplacement(p.replacement, groups);
          })
        : out.replace(p.re, p.replacement.replace(/\$(\d)/g, '$$$1'));
      if (replaced !== out) { out = replaced; this.#bump(p.id); }
    }

    for (const s of this.#seeded) {
      s.re.lastIndex = 0;
      const replaced = out.replace(s.re, s.replacement);
      if (replaced !== out) { out = replaced; this.#bump('seeded-identifier'); }
    }

    if (attributeTo && out !== value) this.#bump(attributeTo);
    return out;
  }

  /** Machine-readable record of what was done. Mirrors internal/redact's Report. */
  buildReport() {
    const components = (this.#cat.components || []).map((c) => ({
      id: c.id, kind: c.kind, action: this.#actions.get(c.id),
      classes: c.classes, location: c.location,
      applied: this.#counts.get(c.id) || 0, description: c.description,
    })).sort((a, b) => a.id.localeCompare(b.id));

    const patterns = (this.#cat.patterns || [])
      .filter((p) => this.#counts.get(p.id))
      .map((p) => ({ id: p.id, kind: 'pattern', action: 'redact', classes: p.classes,
                     applied: this.#counts.get(p.id), description: p.description }))
      .sort((a, b) => a.id.localeCompare(b.id));

    const needsReview = [...this.#review.entries()].map(([id, n]) => {
      const c = this.#components.get(id);
      return { id, kind: c?.kind, action: 'review', classes: c?.classes,
               location: c?.location, applied: n, description: c?.description };
    });

    const warnings = [];
    if (this.#keySource === 'random-per-run') {
      warnings.push('Pseudonyms used a random per-run key, so they will NOT match a timeline redacted separately. '
        + 'Supply the same explicit key used for the client-side redaction if the report must cross-reference it.');
    }
    if (this.enabled) {
      warnings.push('Redaction is best-effort. Structural exclusions are reliable; pattern-based redaction of free '
        + 'text is a reduction in exposure, not a guarantee. A human must review this before publication.');
    }

    return {
      catalog_version: this.#cat.version,
      profile: this.#profile.id,
      profile_name: this.#profile.name,
      pseudonym_key_source: this.#keySource,
      row_hash_recomputed: Boolean(this.#profile.options?.recompute_row_hash),
      raw_files_excluded: this.excludeRawFiles,
      components, patterns, needs_human_review: needsReview, warnings,
    };
  }
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

/**
 * Translate a catalogue regex from Go's RE2 dialect to a JS RegExp.
 *
 * The catalogue is authored for Go, where case-insensitivity is written as an
 * inline `(?i)` group at the start of the pattern. **JavaScript has no inline
 * flag syntax** — it rejects `(?i)` with "Invalid group" — so the prefix must be
 * stripped and translated into the `i` flag. Leaving it in silently killed four
 * patterns, including `pattern.user_profile_path` and
 * `pattern.password_argument`: the two that remove usernames from paths and
 * passwords from command lines. The browser would have enforced strictly less
 * than the client while reporting success.
 *
 * Everything else the catalogue uses (non-capturing groups, lazy quantifiers,
 * character classes, `\b`) is common to both engines. Neither uses lookbehind or
 * backreferences, which is where the dialects genuinely diverge.
 */
export function compileCatalogRegex(source) {
  let flags = 'g';
  let body = source;
  const inline = /^\(\?([ims]+)\)/.exec(body);
  if (inline) {
    body = body.slice(inline[0].length);
    if (inline[1].includes('i')) flags += 'i';
    if (inline[1].includes('s')) flags += 's';
    if (inline[1].includes('m')) flags += 'm';
  }
  return new RegExp(body, flags);
}

/** Expand $1..$9 in a catalogue replacement against captured groups. */
function expandReplacement(replacement, groups) {
  return replacement.replace(/\$(\d)/g, (_, d) => groups[Number(d) - 1] ?? '');
}

function partialMask(v) {
  const at = v.indexOf('@');
  if (at > 0) {
    const local = v.slice(0, at);
    let domain = v.slice(at + 1);
    let tld = '';
    const dot = domain.lastIndexOf('.');
    if (dot >= 0) { tld = domain.slice(dot); domain = domain.slice(0, dot); }
    return `${local[0] ?? ''}***@${domain[0] ?? ''}***${tld}`;
  }
  if (v.length <= 2) return '***';
  return `${v[0]}***${v[v.length - 1]}`;
}

function isIPAddress(s) {
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(s) || (s.includes(':') && /^[0-9a-fA-F:.]+$/.test(s));
}

/** Mirrors internal/redact's isPrivateIP, including the non-RFC1918 ranges that
 * are equally non-routable in practice (CGNAT, benchmarking). */
function isPrivateIP(s) {
  if (s.includes(':')) {
    const l = s.toLowerCase();
    return l.startsWith('fc') || l.startsWith('fd') || l.startsWith('fe80') || l === '::1' || l === '::';
  }
  const o = s.split('.').map(Number);
  if (o.length !== 4 || o.some((n) => Number.isNaN(n))) return false;
  if (o[0] === 10 || o[0] === 127 || o[0] === 0) return true;
  if (o[0] === 192 && o[1] === 168) return true;
  if (o[0] === 172 && o[1] >= 16 && o[1] <= 31) return true;
  if (o[0] === 169 && o[1] === 254) return true;
  if (o[0] === 100 && o[1] >= 64 && o[1] <= 127) return true; // CGNAT
  if (o[0] === 198 && (o[1] === 18 || o[1] === 19)) return true; // benchmarking
  return false;
}

export default Redactor;
