// Shared deterministic helpers for the committed demo-data generators.
//
// Both demo payloads under web/demo/ are GENERATED and COMMITTED (the published
// app has no build step), which is exactly the combination that goes stale
// silently. Every generator therefore:
//   - draws all randomness from a seeded PRNG (never Math.random / Date.now),
//   - emits objects with sorted keys,
//   - collects every output in memory and then either writes it or compares it
//     (--check), so the two modes share one code path,
//   - refuses unknown arguments (exit 2) instead of silently ignoring a typo.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

/** mulberry32: tiny, fast, fully deterministic PRNG. */
export function makeRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Helpers bound to one rng so call sites stay short. */
export function rngTools(rng) {
  return {
    rng,
    int: (lo, hi) => lo + Math.floor(rng() * (hi - lo + 1)),
    pick: (arr) => arr[Math.floor(rng() * arr.length)],
    chance: (p) => rng() < p,
    /** n distinct elements, stable for a given rng state. */
    sample: (arr, n) => {
      const copy = arr.slice();
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy.slice(0, Math.min(n, copy.length));
    },
    round: (v, digits = 2) => Math.round(v * 10 ** digits) / 10 ** digits,
  };
}

/** Recursively sort object keys so serialisation is byte-stable. */
export function sortKeysDeep(value) {
  if (Array.isArray(value)) return value.map(sortKeysDeep);
  if (value && typeof value === 'object') {
    const out = {};
    for (const k of Object.keys(value).sort()) out[k] = sortKeysDeep(value[k]);
    return out;
  }
  return value;
}

/**
 * Parse argv for a generator: only `--check` is accepted.
 * @returns {{check: boolean}}
 */
export function parseGeneratorArgs(argv, scriptName) {
  const args = argv.slice(2);
  const unknown = args.filter((a) => a !== '--check');
  if (unknown.length) {
    process.stderr.write(`${scriptName}: unknown argument(s): ${unknown.join(' ')}\nusage: node ${scriptName} [--check]\n`);
    process.exit(2);
  }
  return { check: args.includes('--check') };
}

/**
 * Write every {name, source} under outDir, or (check mode) compare without
 * writing. CRLF is normalised on compare because core.autocrlf can leave the
 * working tree with CRLF while the generator emits LF.
 * @returns {Promise<number>} process exit code
 */
export async function emitOutputs(outputs, outDir, { check, scriptName }) {
  if (!check) {
    await mkdir(outDir, { recursive: true });
    for (const o of outputs) await writeFile(path.join(outDir, o.name), o.source, 'utf8');
    process.stdout.write(`${scriptName}: wrote ${outputs.length} file(s) to ${outDir}\n`);
    return 0;
  }
  let stale = 0;
  for (const o of outputs) {
    const file = path.join(outDir, o.name);
    let current;
    try {
      current = await readFile(file, 'utf8');
    } catch {
      process.stdout.write(`MISSING ${file}\n`);
      stale++;
      continue;
    }
    if (current.replace(/\r\n/g, '\n') !== o.source) {
      process.stdout.write(`STALE   ${file}\n`);
      stale++;
    }
  }
  if (stale) {
    process.stdout.write(`${scriptName} --check: ${stale} file(s) out of date; run: node scripts/${scriptName}\n`);
    return 1;
  }
  process.stdout.write(`${scriptName} --check: ${outputs.length} file(s) up to date\n`);
  return 0;
}
