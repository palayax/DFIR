// Guards against the defect class that a 254-test green suite completely missed:
// a fully-implemented, fully-tested ENGINE that no part of the UI can reach.
//
// What actually happened: assets/js/views/analyze.js and views/report.js shipped
// as 22- and 20-line stubs reading "Analysis tools are not yet available in this
// build" / "Report generation is not yet available in this build", while
// analysis/pipeline.js, analysis/reduce.js and report/pdf.js were complete and
// carried dozens of passing tests each. Every one of those tests imports the
// module directly, so none of them could tell that clicking through the app got
// an operator to a dead end. Separately, providers/index.js exported mockProvider
// but left it out of the `providers` array that Settings builds its dropdown
// from, so the zero-cost dry-run path the docs recommend could not be selected.
//
// These tests are intentionally structural (source text + module shape) rather
// than DOM-driven: the app has no build step and no test-time DOM, and a
// structural assertion is enough to make "the UI cannot reach the engine" a
// build failure instead of something a human has to notice by clicking.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const VIEWS_DIR = path.join(HERE, '..', 'assets', 'js', 'views');

/** Remove /* *\/ blocks and // line comments so an assertion about CODE is not
 * satisfied (or broken) by prose in a comment. Good enough for these files: they
 * contain no regex literals or strings that would be mangled by it. */
function stripComments(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(^|[^:])\/\/.*$/gm, '$1');
}

async function viewFiles() {
  const names = await readdir(VIEWS_DIR);
  return names.filter((n) => n.endsWith('.js')).sort();
}

describe('views are wired to their engines', () => {
  test('every view module exports a mount() function', async () => {
    const files = await viewFiles();
    assert.ok(files.length >= 5, `expected at least 5 views, found ${files.length}`);
    for (const f of files) {
      // pathToFileURL is mandatory, not cosmetic: on Windows a bare absolute
      // path like C:\...\ingest.js makes the ESM loader read "c:" as a URL
      // scheme and throw ERR_UNSUPPORTED_ESM_URL_SCHEME. A dynamic import() of
      // a computed absolute path must always go through pathToFileURL().
      const mod = await import(pathToFileURL(path.join(VIEWS_DIR, f)).href);
      assert.equal(
        typeof mod.mount,
        'function',
        `${f} must export mount(container, ctx) — the router calls it unconditionally`,
      );
    }
  });

  test('no view still advertises itself as unimplemented', async () => {
    // These exact phrases were the stubs' user-visible text. Any of them
    // reaching a release means a nav entry leads nowhere.
    const banned = [
      'not yet available in this build',
      'Coming soon',
      'is a later subtask',
    ];
    const offenders = [];
    for (const f of await viewFiles()) {
      const src = await readFile(path.join(VIEWS_DIR, f), 'utf8');
      for (const phrase of banned) {
        if (src.includes(phrase)) offenders.push(`${f}: "${phrase}"`);
      }
    }
    assert.deepEqual(
      offenders,
      [],
      `view(s) still contain placeholder text, so the nav leads to a dead end:\n  ${offenders.join('\n  ')}`,
    );
  });

  test('analyze view actually imports the analysis pipeline', async () => {
    const src = await readFile(path.join(VIEWS_DIR, 'analyze.js'), 'utf8');
    // The whole point of the Analyze view is to call analyze()/previewPlan().
    // Importing them is the minimum structural proof that it can.
    assert.match(src, /from '\.\.\/analysis\/pipeline\.js'/, 'analyze.js must import ../analysis/pipeline.js');
    assert.match(src, /from '\.\.\/analysis\/reduce\.js'/, 'analyze.js must import ../analysis/reduce.js for previewPlan()');
    assert.match(src, /\banalyze\s*\(/, 'analyze.js must call analyze()');
    assert.match(src, /\bpreviewPlan\s*\(/, 'analyze.js must call previewPlan() so nothing is sent before the operator sees the plan and cost');
  });

  test('report view actually imports the PDF generator and can hand off to report.html', async () => {
    const src = await readFile(path.join(VIEWS_DIR, 'report.js'), 'utf8');
    assert.match(src, /from '\.\.\/report\/pdf\.js'/, 'report.js must import ../report/pdf.js');
    assert.match(src, /generateReportPdf\s*\(/, 'report.js must call generateReportPdf()');
    // The handoff key is a contract shared with report/main.js. If one side
    // renames it, the interactive report silently opens empty.
    assert.match(src, /irtriage\.report\.json/, 'report.js must use the sessionStorage handoff key report/main.js reads');
    const mainSrc = await readFile(path.join(HERE, '..', 'assets', 'js', 'report', 'main.js'), 'utf8');
    assert.match(mainSrc, /irtriage\.report\.json/, 'report/main.js must still read the same handoff key');
  });

  test('ingest view falls back to main-thread parsing when the worker cannot start', async () => {
    // The Web Worker is a performance optimisation, not a functional requirement,
    // and `new Worker(...)` genuinely throws in contexts this app documents as
    // supported: `file://` (Chrome refuses a module worker from an opaque origin --
    // and README/docs/WEB_APP.md both tell analysts to open index.html from disk for
    // air-gapped work) and any document where the worker URL resolves cross-origin.
    //
    // The old code set `worker = null` and then marked every single file
    // `error: 'ingest worker unavailable'`. The page rendered perfectly, so the app
    // looked healthy while being totally unusable: nothing ingests, so nothing
    // merges, analyses or reports. Found by running the real hosted app.
    const src = await readFile(path.join(VIEWS_DIR, 'ingest.js'), 'utf8');
    // Strip comments before asserting absence: this file now DOCUMENTS the old
    // failure string in a comment explaining why the fallback exists, and a naive
    // doesNotMatch over the raw source fails on that comment rather than on code.
    const code = stripComments(src);
    assert.doesNotMatch(
      code,
      /error:\s*['"]ingest worker unavailable['"]/,
      'a missing worker must no longer be a terminal error for the file',
    );
    assert.match(src, /ingestOnMainThread/, 'ingest.js must define a main-thread fallback');
    assert.match(
      src,
      /if\s*\(\s*!worker\s*\)\s*\{\s*\n\s*ingestOnMainThread\(/,
      'ingestOne() must route to the main-thread fallback when there is no worker',
    );
    // The fallback must do real parsing, not just report a nicer error.
    assert.match(src, /for await \(const record of entry\.module\.parse\(/, 'the fallback must actually parse the file');
    assert.match(src, /detectIngestModule\(file\)/, 'the fallback must run format detection');
  });

  test('report view passes storage credentials under the key the providers read', async () => {
    // s3/azure/gcs read opts.creds. Passing `credentials:` instead does not
    // throw -- it fails later inside request signing with an unrelated-looking
    // error, and the local provider ignores opts entirely so it looks fine.
    const src = await readFile(path.join(VIEWS_DIR, 'report.js'), 'utf8');
    assert.match(src, /\.put\([^)]*\{[^}]*\bcreds\b/s, 'report.js must call provider.put(path, blob, { creds, ... })');
    assert.doesNotMatch(src, /\bcredentials:\s*creds\b/, 'report.js must not pass storage creds as `credentials:` — providers read `creds`');
  });
});

describe('provider registry is reachable from the UI', () => {
  test('the mock provider is registered, not just exported', async () => {
    const { providers, getProvider } = await import('../assets/js/providers/index.js');
    const ids = providers.map((p) => p.id);
    assert.ok(
      ids.includes('mock'),
      `the mock provider must appear in the providers[] array that the Settings view builds its dropdown from, ` +
        `otherwise the zero-cost/zero-network dry run documented in docs/WEB_APP.md cannot be selected. Got: ${ids.join(', ')}`,
    );
    assert.ok(getProvider('mock'), 'getProvider("mock") must resolve');
  });

  test('every registered provider satisfies the LLMProvider shape the pipeline requires', async () => {
    const { providers } = await import('../assets/js/providers/index.js');
    for (const p of providers) {
      assert.equal(typeof p.id, 'string', 'provider.id must be a string');
      assert.ok(p.id.length > 0, 'provider.id must be non-empty');
      assert.equal(typeof p.label, 'string', `${p.id}: label must be a string`);
      assert.equal(typeof p.send, 'function', `${p.id}: must implement send() — pipeline.js rejects a provider without it`);
      assert.ok(Array.isArray(p.models), `${p.id}: models must be an array (Settings iterates it)`);
      assert.ok(Array.isArray(p.requiredCredentials), `${p.id}: requiredCredentials must be an array (Settings iterates it)`);
    }
  });

  test('the default provider/model the app boots with actually resolves', async () => {
    const { getProvider, defaultProviderId, defaultModelId } = await import('../assets/js/providers/index.js');
    const p = getProvider(defaultProviderId);
    assert.ok(p, `defaultProviderId ${defaultProviderId} must resolve to a registered provider`);
    assert.ok(
      p.models.some((m) => m.id === defaultModelId),
      `defaultModelId ${defaultModelId} must be one of ${defaultProviderId}'s models (got ${p.models.map((m) => m.id).join(', ')})`,
    );
  });
});
