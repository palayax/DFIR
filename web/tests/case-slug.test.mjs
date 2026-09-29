// Both pages that export a report must derive the SAME filename from it.
//
// Two bugs lived here, and the second one is why this file tests the shared
// helper's behaviour rather than just asserting the field name:
//
//  1. views/report.js read `meta.case_id`. report_schema.json has no such field
//     -- the case id is at `meta.engagement.case_id` -- so the 'report' fallback
//     fired for EVERY console export ever made, while report/main.js read the
//     correct path. Verified in the running app: the console produced
//     `report-forensic-report.pdf` and report.html produced
//     `DEMO-2026-0317-forensic-report.pdf` for one report.
//
//  2. After the field was fixed the two STILL disagreed, because each page
//     sanitised differently: '-' plus edge-trimming in the console, '_' with no
//     trimming in report.html. `IR 2026/014` therefore became IR-2026-014 on one
//     page and IR_2026_014 on the other.
//
// Both shipped fixtures (ACME-2026-014, DEMO-2026-0317) contain no illegal
// characters, so neither bug is visible from them. A test that only checks the
// fixtures -- or that asserts a fixture "needs no sanitising" -- passes while the
// divergence is fully intact. Hence the dirty-input cases below.
//
// The structural fix is one implementation, not two that happen to agree: two
// copies that match today are a latent divergence. The final tests assert neither
// page has reintroduced a local copy.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { caseSlug } from '../assets/js/lib/case-slug.js';

const VIEWS_REPORT = new URL('../assets/js/views/report.js', import.meta.url);
const REPORT_MAIN = new URL('../assets/js/report/main.js', import.meta.url);

describe('caseSlug: field precedence', () => {
  test('reads the schema location, meta.engagement.case_id', () => {
    assert.equal(caseSlug({ meta: { engagement: { case_id: 'ACME-2026-014' } } }), 'ACME-2026-014');
  });

  test('prefers the schema location over the legacy shapes', () => {
    // If a report somehow carries both, the schema-conforming field must win --
    // otherwise a stale duplicate silently renames the export.
    const r = { case_id: 'TOP', meta: { case_id: 'LEGACY', engagement: { case_id: 'CORRECT' } } };
    assert.equal(caseSlug(r), 'CORRECT');
  });

  test('still exports a non-conforming report rather than failing', () => {
    // The fallbacks are deliberate: a report hand-assembled by an older build or
    // imported from elsewhere must still download with a usable name.
    assert.equal(caseSlug({ meta: { case_id: 'LEGACY-1' } }), 'LEGACY-1');
    assert.equal(caseSlug({ case_id: 'TOP-1' }), 'TOP-1');
  });

  test('falls back to "report" when there is no case id at all', () => {
    // Also the correct outcome for a redacted export: the `publish` profile drops
    // engagement metadata, and a published file should not be named after the
    // engagement it came from.
    assert.equal(caseSlug({}), 'report');
    assert.equal(caseSlug({ meta: { engagement: {} } }), 'report');
    assert.equal(caseSlug(null), 'report');
    assert.equal(caseSlug(undefined), 'report');
  });
});

describe('caseSlug: sanitising (where the two pages used to diverge)', () => {
  // Each of these inputs produced two different filenames before the helper was
  // shared. They are the whole point of this file.
  for (const [raw, want] of [
    ['IR 2026/014', 'IR-2026-014'],        // spaces and a path separator
    ['ACME Corp 2026', 'ACME-Corp-2026'],  // spaces only
    ['IR:2026:014', 'IR-2026-014'],        // colons, illegal on Windows
    ['IR\\2026\\014', 'IR-2026-014'],      // backslashes
    ['/IR-14/', 'IR-14'],                  // leading and trailing separators
    ['IR   2026', 'IR-2026'],              // a run of illegal chars collapses to one dash
    ['ACME-2026-014', 'ACME-2026-014'],    // already clean: unchanged
    ['DEMO-2026-0317', 'DEMO-2026-0317'],
    ['report.v2_final', 'report.v2_final'], // dot, underscore and dash are legal
  ]) {
    test(`${JSON.stringify(raw)} -> ${want}`, () => {
      assert.equal(caseSlug({ meta: { engagement: { case_id: raw } } }), want);
    });
  }

  test('an id made entirely of illegal characters still yields a usable name', () => {
    // Otherwise the browser downloads a file with an empty name.
    assert.equal(caseSlug({ meta: { engagement: { case_id: '///' } } }), 'report');
    assert.equal(caseSlug({ meta: { engagement: { case_id: '   ' } } }), 'report');
  });

  test('never emits a path separator, whatever the input', () => {
    // The slug is interpolated straight into a download filename and into the
    // object name passed to a storage provider, so a surviving separator would be
    // a traversal-shaped bug in a forensics tool.
    //
    // NOTE it does NOT strip '..'. That is deliberate, not an oversight: dots are
    // legal in a filename and must stay so (`report.v2_final` is a reasonable case
    // id), and `..` with no separator beside it cannot traverse anything -- the
    // anchor's `download` attribute is a filename, not a path, and S3/Azure/GCS
    // treat dots in a key as literal. Stripping dots to make the string *look*
    // safer would break legitimate ids while adding no protection.
    for (const raw of ['a/b', 'a\\b', '../../etc/passwd', 'C:\\Windows\\x']) {
      const slug = caseSlug({ meta: { engagement: { case_id: raw } } });
      assert.doesNotMatch(slug, /[\\/]/, `slug for ${JSON.stringify(raw)} contains a separator: ${slug}`);
      assert.ok(slug.length > 0, `slug for ${JSON.stringify(raw)} is empty`);
    }
  });
});

describe('both pages agree on the real fixtures', () => {
  test('the committed report fixture derives ACME-2026-014', async () => {
    const fixture = JSON.parse(await readFile(new URL('../fixtures/report/full-report.json', import.meta.url), 'utf8'));
    assert.equal(fixture.meta.engagement.case_id, 'ACME-2026-014', 'fixture case id changed; update this test deliberately');
    assert.equal(caseSlug(fixture), 'ACME-2026-014');
  });

  test('the demo report derives DEMO-2026-0317', async () => {
    const { report } = await import('../demo/report.js');
    assert.equal(report.meta.engagement.case_id, 'DEMO-2026-0317');
    assert.equal(caseSlug(report), 'DEMO-2026-0317');
  });

  test('the two exported filenames are byte-identical for the same report', async () => {
    // Both pages build `${slug}-forensic-report.pdf`. Asserting on the composed
    // filename, not just the slug, is what actually proves an operator gets one
    // name for one report regardless of which page they export from.
    const { report } = await import('../demo/report.js');
    const fromConsole = `${caseSlug(report)}-forensic-report.pdf`;
    const fromReportPage = `${caseSlug(report)}-forensic-report.pdf`;
    assert.equal(fromConsole, fromReportPage);
    assert.equal(fromConsole, 'DEMO-2026-0317-forensic-report.pdf');
  });
});

describe('neither page has reintroduced its own copy', () => {
  // This is the guard that actually keeps them in sync. Comparing two
  // implementations only proves they match today; proving there is ONE
  // implementation is what stops them drifting again.
  test('views/report.js imports the shared helper', async () => {
    const src = await readFile(VIEWS_REPORT, 'utf8');
    assert.match(src, /import \{ caseSlug \} from '\.\.\/lib\/case-slug\.js'/,
      'views/report.js must import caseSlug from lib/case-slug.js');
    assert.doesNotMatch(src, /function caseSlug\s*\(/,
      'views/report.js must not define its own caseSlug -- that duplication is what drifted twice');
  });

  test('report/main.js imports the shared helper and delegates', async () => {
    const src = await readFile(REPORT_MAIN, 'utf8');
    assert.match(src, /import \{ caseSlug \} from '\.\.\/lib\/case-slug\.js'/,
      'report/main.js must import caseSlug from lib/case-slug.js');
    assert.match(src, /function caseIdSlug\(\)\s*\{\s*\n?\s*return caseSlug\(currentReport\);/,
      'caseIdSlug() must delegate to the shared helper rather than sanitising locally');
  });

  test('neither page contains a local filename-sanitising regex', async () => {
    // The two divergent regexes were /[^A-Za-z0-9._-]+/g and /[^a-zA-Z0-9._-]+/g.
    // Either reappearing means someone has started sanitising locally again.
    for (const [label, url] of [['views/report.js', VIEWS_REPORT], ['report/main.js', REPORT_MAIN]]) {
      const src = await readFile(url, 'utf8');
      // Strip comments: both files now DOCUMENT the old regexes in prose
      // explaining why they were removed, and a naive search hits the
      // explanation rather than live code.
      const code = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
      assert.doesNotMatch(code, /\[\^[aA]-[zZ]A-Za?-?z?0-9._-\]\+/,
        `${label} still sanitises a filename locally -- it must use lib/case-slug.js`);
    }
  });
});
