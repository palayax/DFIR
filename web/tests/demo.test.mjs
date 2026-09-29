// Guards for the published proof-of-value demo incident (web/demo/, generated
// by scripts/gen-demo-dataset.mjs and loaded by web/assets/js/demo/).
//
// Three separate jobs here, all mechanical:
//
//  1. The payload is VALID: every row conforms to docs/timeline_schema.json
//     (the contract's source of truth, not the vendored copy), every row_hash
//     is the real SHA-256 of its canonical form, and hashes are unique so the
//     merge stage cannot silently collapse the demo.
//
//  2. The payload is COHERENT: a demo whose entities do not cross-reference is
//     worse than no demo, because the first analyst who reads it stops trusting
//     the tool. Parent processes must have been observed, internal IPs must
//     belong to declared assets, the narrative must cite row_hash values that
//     actually exist, and a file name must carry one SHA-256 everywhere.
//
//  3. The payload is REACHABLE and PUBLISHABLE: the Ingest view must wire the
//     button (this repo's recurring defect is a complete engine no UI path can
//     reach), the demo must flow through the real ingest module rather than a
//     shortcut, no path may be absolute-root (GitHub Pages serves from /DFIR/),
//     and no real-looking identifier may leak into a public repository.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { computeRowHash } from '../assets/js/lib/hash.js';
import { validateAgainst } from '../assets/js/lib/validate-schema.js';
import { severityMaxOfDetections } from '../assets/js/lib/severity.js';
import { detectIngestModule } from '../assets/js/ingest/index.js';
import { manifest } from '../demo/manifest.js';
import {
  buildDemoPayloads, demoFiles, loadDemoManifest, loadDemoRows, rowsToJsonl,
} from '../assets/js/demo/index.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const WEB = path.join(HERE, '..');
const REPO = path.join(WEB, '..');
const DEMO_DIR = path.join(WEB, 'demo');

// docs/timeline_schema.json is the CONTRACT. schema.test.mjs asserts the
// vendored web/assets/schema copy stays byte-identical to it; validating the
// demo against docs/ directly means this test still means what it says even if
// that other assertion is ever relaxed.
const schema = JSON.parse(await readFile(path.join(REPO, 'docs', 'timeline_schema.json'), 'utf8'));

/** All rows, keyed by host, loaded once for the whole suite. */
const rowsByHost = new Map();
for (const entry of manifest.files) {
  rowsByHost.set(entry.host, await loadDemoRows(entry));
}
const allRows = [...rowsByHost.values()].flat();

describe('demo payload: structure', () => {
  test('the manifest declares synthetic data and at least three collected hosts', () => {
    assert.equal(manifest.synthetic, true, 'manifest.synthetic must be true — it is what marks the payload safe to publish');
    assert.match(manifest.synthetic_notice, /SYNTHETIC DATA ONLY/);
    assert.equal(manifest.schema_version, '1.0.0');
    assert.equal(manifest.platform, 'windows', 'the product collects Windows hosts only; the demo must not imply otherwise');
    assert.ok(manifest.files.length >= 3, `expected >= 3 host files, got ${manifest.files.length}`);
    assert.ok(Array.isArray(manifest.narrative) && manifest.narrative.length >= 5);
  });

  test('every declared host module exists, loads, and matches its declared row count', async () => {
    for (const entry of manifest.files) {
      assert.match(entry.module, /^\.\/host-[a-z0-9-]+\.js$/, `${entry.host}: module must be a relative sibling path`);
      const rows = rowsByHost.get(entry.host);
      assert.equal(rows.length, entry.row_count, `${entry.host}: manifest row_count disagrees with the module`);
      assert.ok(rows.length > 0);
      for (const row of rows) {
        assert.equal(row.host, entry.host, `${entry.host}: module contains a row for a different host (${row.host})`);
        assert.equal(row.host_id, entry.host_id, `${entry.host}: host_id mismatch`);
      }
      assert.equal(entry.detection_row_count, rows.filter((r) => r.detection_count > 0).length);
    }
    assert.equal(manifest.row_count, allRows.length, 'manifest.row_count must equal the total rows shipped');
  });

  test('the payload is a few thousand rows and small enough to load instantly', async () => {
    assert.ok(allRows.length >= 1500, `too small to be an interesting triage exercise: ${allRows.length} rows`);
    assert.ok(allRows.length <= 8000, `too large for a one-click demo over Pages: ${allRows.length} rows`);
    let bytes = 0;
    for (const name of await readdir(DEMO_DIR)) {
      bytes += (await stat(path.join(DEMO_DIR, name))).size;
    }
    assert.ok(bytes < 6 * 1024 * 1024, `web/demo is ${(bytes / 1048576).toFixed(1)} MB; keep the one-click payload under 6 MB`);
  });

  test('the file names do not collide with .gitignore\'s collection-output globs', () => {
    // The repo excludes `*_timeline.jsonl`, `timeline.jsonl` and `*_timeline.csv`
    // so a real collection can never be committed. A demo file matching one of
    // those globs would be silently absent from the repo yet present in the
    // publish tar — i.e. it would work locally and 404 for everyone else.
    for (const entry of manifest.files) {
      assert.doesNotMatch(entry.file_name, /(^|_)timeline\.(jsonl|csv)$/, `${entry.file_name} matches a gitignored glob`);
    }
    assert.doesNotMatch(JSON.stringify(manifest.files.map((f) => f.module)), /timeline\.(jsonl|csv)/);
  });
});

describe('demo payload: schema conformance and determinism', () => {
  test('every row validates against docs/timeline_schema.json', () => {
    const failures = [];
    for (const row of allRows) {
      const errors = validateAgainst(schema, row);
      if (errors.length) {
        failures.push(`${row.host} ${row.timestamp_utc} ${row.artifact}: ${errors.map((e) => `${e.path} ${e.message}`).join('; ')}`);
      }
    }
    assert.deepEqual(failures.slice(0, 10), [], `${failures.length} demo row(s) fail the timeline schema`);
  });

  test('every row_hash is the real SHA-256 of its canonical form', async () => {
    const bad = [];
    for (const row of allRows) {
      const expected = await computeRowHash(row);
      if (expected !== row.row_hash) bad.push(`${row.host} ${row.timestamp_utc}: ${row.row_hash} != ${expected}`);
    }
    assert.deepEqual(bad.slice(0, 5), [], `${bad.length} row(s) carry a hand-written or stale row_hash`);
  });

  test('row_hash values are globally unique, so merge dedupe cannot swallow the demo', () => {
    const seen = new Map();
    const dupes = [];
    for (const row of allRows) {
      if (seen.has(row.row_hash)) dupes.push(`${row.row_hash} (${seen.get(row.row_hash)} / ${row.host})`);
      seen.set(row.row_hash, row.host);
    }
    assert.deepEqual(dupes, [], 'duplicate row_hash values would be deduplicated away at merge time');
  });

  test('timestamps are RFC3339 UTC with exactly 7 fractional digits', () => {
    const re = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{7}Z$/;
    for (const row of allRows) {
      assert.match(row.timestamp_utc, re, `${row.host}: bad timestamp ${row.timestamp_utc}`);
    }
  });

  test('unknown timestamps use the documented sentinel and sort first', () => {
    const SENTINEL = '0001-01-01T00:00:00.0000000Z';
    const sentinels = allRows.filter((r) => r.timestamp_utc === SENTINEL);
    assert.ok(sentinels.length >= 2, 'the demo should exercise the unknown-timestamp sentinel at least twice');
    for (const [host, rows] of rowsByHost) {
      const firstReal = rows.findIndex((r) => r.timestamp_utc !== SENTINEL);
      const lastSentinel = rows.reduce((acc, r, i) => (r.timestamp_utc === SENTINEL ? i : acc), -1);
      if (lastSentinel >= 0) {
        assert.ok(lastSentinel < firstReal, `${host}: sentinel rows must sort before real timestamps`);
      }
    }
  });

  test('each host file is in the schema total order (timestamp, source, artifact, row_hash)', () => {
    const key = (r) => [r.timestamp_utc, r.source, r.artifact, r.row_hash].join('\u0000');
    for (const [host, rows] of rowsByHost) {
      for (let i = 1; i < rows.length; i++) {
        assert.ok(key(rows[i - 1]) <= key(rows[i]), `${host}: rows ${i - 1}/${i} are out of the documented total order`);
      }
    }
  });

  test('severity_max and detection_count agree with detections[]', () => {
    for (const row of allRows) {
      assert.equal(row.detection_count, row.detections.length, `${row.host} ${row.row_hash}: detection_count mismatch`);
      assert.equal(row.severity_max, severityMaxOfDetections(row.detections), `${row.host} ${row.row_hash}: severity_max mismatch`);
    }
  });

  test('every row is traceable to raw evidence through provenance', () => {
    for (const row of allRows) {
      assert.ok(row.provenance?.raw_file, `${row.host} ${row.row_hash}: provenance.raw_file is required`);
      assert.match(row.provenance.raw_file, /^raw\//, 'raw_file must be a path inside the acquisition ZIP');
      assert.ok(Number.isInteger(row.provenance.raw_row) && row.provenance.raw_row >= 0);
    }
  });
});

describe('demo payload: the narrative actually cross-references', () => {
  test('every host in the rows is a declared host and vice versa', () => {
    const declared = new Set(manifest.entities.hosts.map((h) => h.name));
    const seen = new Set(allRows.map((r) => r.host));
    assert.deepEqual([...seen].sort().filter((h) => !declared.has(h)), [], 'row(s) reference an undeclared host');
    assert.deepEqual([...declared].sort().filter((h) => !seen.has(h)), [], 'declared host(s) contribute no rows');
  });

  test('every principal in the rows is a declared account', () => {
    const declared = new Set(manifest.entities.users.map((u) => u.name));
    const unknown = [...new Set(allRows.map((r) => r.user).filter(Boolean))].filter((u) => !declared.has(u));
    assert.deepEqual(unknown, [], 'row(s) attribute activity to an account the manifest never introduces');
  });

  test('every parent process was itself observed running on the same host', () => {
    // A row whose process.parent_name appears nowhere on that host is the single
    // most obvious incoherence in a synthetic timeline: the chain the analyst
    // tries to walk simply stops.
    const problems = [];
    for (const [host, rows] of rowsByHost) {
      const names = new Set(rows.map((r) => r.process?.name).filter(Boolean));
      for (const row of rows) {
        const parent = row.process?.parent_name;
        if (parent && !names.has(parent)) problems.push(`${host}: parent "${parent}" never observed (${row.message})`);
      }
    }
    assert.deepEqual([...new Set(problems)], [], 'process ancestry does not resolve');
  });

  test('every internal IP belongs to a declared asset and every external IP to declared attacker infrastructure', () => {
    const assets = new Set(manifest.entities.internal_assets.map((a) => a.ip));
    const attacker = new Set(manifest.entities.attacker_ips.map((a) => a.ip));
    const problems = [];
    for (const row of allRows) {
      for (const ip of [row.network?.src_ip, row.network?.dst_ip]) {
        if (!ip) continue;
        if (ip.startsWith('10.')) {
          if (!assets.has(ip)) problems.push(`internal ${ip} is not a declared asset`);
        } else if (!attacker.has(ip)) {
          problems.push(`external ${ip} is not declared attacker infrastructure`);
        }
      }
    }
    assert.deepEqual([...new Set(problems)], [], 'IP addresses do not resolve to declared entities');
  });

  test('a given file name carries exactly one SHA-256 across every host', () => {
    // The cross-host correlation the demo is meant to teach: the implant on the
    // workstation and upd.exe on the file server share a hash. That only means
    // something if hashes are consistent everywhere else too.
    const byName = new Map();
    const problems = [];
    for (const row of allRows) {
      const name = row.file?.name;
      const sha = row.hashes?.sha256;
      if (!name || !sha) continue;
      if (byName.has(name) && byName.get(name) !== sha) problems.push(`${name} has two SHA-256 values`);
      byName.set(name, sha);
    }
    assert.deepEqual([...new Set(problems)], []);
  });

  test('the implant is present on two hosts under different names with the same hash', () => {
    const implant = manifest.entities.key_files.find((f) => f.key === 'implant');
    assert.ok(implant, 'manifest must declare the implant');
    const hosts = new Set(allRows.filter((r) => r.hashes?.sha256 === implant.sha256).map((r) => r.host));
    assert.ok(hosts.size >= 2, `the implant hash should appear on >= 2 hosts, found ${[...hosts].join(', ') || 'none'}`);
  });

  test('every declared key process and key file actually appears in the rows', () => {
    const processNames = new Set(allRows.map((r) => r.process?.name).filter(Boolean));
    const missingProc = manifest.entities.key_processes.filter((p) => !processNames.has(p));
    assert.deepEqual(missingProc, [], 'manifest advertises processes the rows do not contain');

    const shas = new Set(allRows.map((r) => r.hashes?.sha256).filter(Boolean));
    const missingFiles = manifest.entities.key_files.filter((f) => !shas.has(f.sha256)).map((f) => f.file_name);
    assert.deepEqual(missingFiles, [], 'manifest advertises files the rows do not contain');
  });

  test('all declared attacker infrastructure appears in the rows', () => {
    const ips = new Set(allRows.flatMap((r) => [r.network?.src_ip, r.network?.dst_ip]).filter(Boolean));
    const domains = new Set(allRows.map((r) => r.network?.domain).filter(Boolean));
    assert.deepEqual(manifest.entities.attacker_ips.filter((a) => !ips.has(a.ip)).map((a) => a.ip), []);
    assert.deepEqual(manifest.entities.attacker_domains.filter((d) => !domains.has(d.domain)).map((d) => d.domain), []);
  });

  test('every narrative phase cites row_hash values that resolve to real rows on the hosts it names', () => {
    const byHash = new Map(allRows.map((r) => [r.row_hash, r]));
    const problems = [];
    for (const phase of manifest.narrative) {
      assert.ok(phase.evidence.length > 0, `${phase.id}: a phase with no evidence is a claim with no proof`);
      for (const hash of phase.evidence) {
        const row = byHash.get(hash);
        if (!row) {
          problems.push(`${phase.id} cites ${hash}, which is in no host file`);
          continue;
        }
        if (!phase.hosts.includes(row.host)) {
          problems.push(`${phase.id} lists hosts [${phase.hosts}] but cites a row on ${row.host}`);
        }
      }
    }
    assert.deepEqual(problems, [], 'the narrative points at evidence that does not exist');
  });

  test('every narrative phase is time-ordered and inside the collection window', () => {
    const inWindow = (t) => t >= manifest.collection_window.start_utc && t <= manifest.collection_window.end_utc;
    let previousEnd = '';
    for (const phase of manifest.narrative) {
      assert.ok(phase.start_utc <= phase.end_utc, `${phase.id}: starts after it ends`);
      assert.ok(inWindow(phase.start_utc) && inWindow(phase.end_utc), `${phase.id}: outside the collection window`);
      assert.ok(phase.start_utc >= previousEnd, `${phase.id}: phases must not go backwards in time`);
      previousEnd = phase.end_utc;
    }
  });

  test('every MITRE technique the narrative claims is backed by a detection in the rows', () => {
    const seen = new Set(allRows.flatMap((r) => r.detections.flatMap((d) => d.mitre_techniques || [])));
    const claimed = [...new Set(manifest.narrative.flatMap((p) => p.techniques))];
    assert.deepEqual(claimed.filter((t) => !seen.has(t)), [], 'the narrative claims techniques nothing in the data detects');
    for (const t of claimed) assert.match(t, /^T\d{4}(\.\d{3})?$/);
  });

  test('the demo is mostly benign and spans several detection engines and severities', () => {
    const withDetections = allRows.filter((r) => r.detection_count > 0).length;
    const ratio = withDetections / allRows.length;
    assert.ok(ratio > 0, 'a demo with no detections proves nothing');
    assert.ok(ratio < 0.15, `a timeline that is ${(ratio * 100).toFixed(0)}% flagged is not a realistic triage exercise`);

    const engines = new Set(allRows.flatMap((r) => r.detections.map((d) => d.engine)));
    assert.ok(engines.size >= 3, `expected >= 3 detection engines, got ${[...engines].join(', ')}`);
    const severities = new Set(allRows.flatMap((r) => r.detections.map((d) => d.severity)));
    for (const needed of ['critical', 'high', 'medium', 'low', 'informational']) {
      assert.ok(severities.has(needed), `no ${needed}-severity detection — the dismissible/decisive mix is what triage is about`);
    }
    const sources = new Set(allRows.map((r) => r.source));
    assert.ok(sources.size >= 8, `expected >= 8 distinct schema sources for the dashboard facets, got ${sources.size}`);
  });

  test('the two-domain forest the narrative depends on is declared and evidenced', () => {
    assert.equal(manifest.environment.domains.length, 2, 'the demo models a 1-forest/2-domain environment');
    const dnsNames = manifest.environment.domains.map((d) => d.dns);
    for (const dns of dnsNames) {
      assert.ok(
        allRows.some((r) => JSON.stringify(r).includes(dns)),
        `domain ${dns} is declared but appears in no row`,
      );
    }
    const crossDomain = manifest.narrative.find((p) => p.techniques.includes('T1134.005'));
    assert.ok(crossDomain, 'the cross-domain escalation phase (SID history, T1134.005) must be part of the story');
    assert.ok(crossDomain.hosts.length >= 2, 'the cross-domain phase must span more than one host');
  });
});

describe('demo payload: safe to publish', () => {
  test('no absolute-root module/fetch/asset path anywhere in the demo code or payload', async () => {
    // Mirrors the two gates in scripts/publish-web.sh. GitHub Pages serves this
    // project from /DFIR/, so '/assets/x.js' resolves to the user root and 404s
    // in production while working perfectly on a local server.
    const dirs = [DEMO_DIR, path.join(WEB, 'assets', 'js', 'demo')];
    const offenders = [];
    for (const dir of dirs) {
      for (const name of await readdir(dir)) {
        if (!name.endsWith('.js')) continue;
        const src = await readFile(path.join(dir, name), 'utf8');
        const m = src.match(/(?:from|import|fetch\(|new URL\()\s*['"]\/[^/]/g);
        if (m) offenders.push(`${dir}/${name}: ${m.join(', ')}`);
      }
    }
    assert.deepEqual(offenders, [], 'absolute-root paths will 404 under the Pages subpath');
  });

  test('the demo payload contains no real-looking identifiers', () => {
    const blob = JSON.stringify(allRows) + JSON.stringify(manifest);

    // This machine's own hostname is the exact leak scripts/publish-web.sh gates
    // on, and it has caught a real one before.
    const realHost = os.hostname();
    if (realHost && realHost.length >= 4) {
      assert.ok(
        !blob.toLowerCase().includes(realHost.toLowerCase()),
        `this machine's hostname (${realHost}) appears in the demo payload`,
      );
    }

    for (const host of new Set(allRows.map((r) => r.host))) {
      // WKS-CORP-01 / SRV-CORP-FS02 / DC-CORP-01: the synthetic naming the
      // repo's existing fixtures already use.
      assert.match(host, /^(WKS|SRV|DC)-CORP-[A-Z]{0,3}\d{2}$/, `${host} is not an obviously synthetic hostname`);
    }

    // Externally-routable addresses must come from the RFC 5737 documentation
    // ranges, which can never belong to a real organisation.
    const ips = new Set(allRows.flatMap((r) => [r.network?.src_ip, r.network?.dst_ip]).filter(Boolean));
    for (const ip of ips) {
      assert.ok(
        /^10\./.test(ip) || /^(192\.0\.2|198\.51\.100|203\.0\.113)\./.test(ip),
        `${ip} is neither RFC 1918 internal nor an RFC 5737 documentation address`,
      );
    }

    // Every DNS name must use the RFC 2606 reserved .example TLD.
    const names = new Set([
      ...allRows.map((r) => r.network?.domain).filter(Boolean),
      ...manifest.entities.attacker_domains.map((d) => d.domain),
    ]);
    for (const name of names) {
      assert.match(name, /\.example$/, `${name} does not use the reserved .example TLD`);
    }
    for (const url of allRows.map((r) => r.network?.url).filter(Boolean)) {
      assert.match(new URL(url).hostname, /\.example$/, `${url} points at a non-reserved domain`);
    }
    // Belt and braces: no real TLD should appear in a URL-ish or mail-ish string.
    assert.doesNotMatch(blob, /https?:\/\/[a-z0-9.-]+\.(com|net|org|io|ru|cn|co\.uk)\b/i);
    assert.doesNotMatch(blob, /@[a-z0-9.-]+\.(com|net|org|io|ru|cn|co\.uk)\b/i);
  });

  test('the generated payload declares itself generated, so nobody hand-edits it', async () => {
    for (const name of await readdir(DEMO_DIR)) {
      if (!name.endsWith('.js')) continue;
      const head = (await readFile(path.join(DEMO_DIR, name), 'utf8')).slice(0, 600);
      assert.match(head, /GENERATED FILE/, `${name} must carry the generated-file banner`);
      assert.match(head, /gen-demo-dataset\.mjs/, `${name} must name the generator that produces it`);
      assert.match(head, /SYNTHETIC DATA ONLY/, `${name} must state that the data is synthetic`);
    }
  });
});

describe('demo loader drives the REAL ingest path', () => {
  test('loadDemoManifest() resolves the same manifest the tests read directly', async () => {
    const m = await loadDemoManifest();
    assert.equal(m.id, manifest.id);
    assert.equal(m.files.length, manifest.files.length);
  });

  test('buildDemoPayloads() produces canonical IRTriage JSONL: one record per line', async () => {
    const payloads = await buildDemoPayloads();
    assert.equal(payloads.length, manifest.files.length);
    for (const p of payloads) {
      assert.ok(p.text.endsWith('\n'), `${p.name} must end with a newline`);
      const lines = p.text.split('\n').slice(0, -1);
      assert.equal(lines.length, p.rowCount, `${p.name}: line count must equal row count`);
      const first = JSON.parse(lines[0]);
      assert.equal(first.schema_version, '1.0.0');
      assert.equal(first.host, p.host);
    }
  });

  test('rowsToJsonl() round-trips rows without loss', () => {
    const rows = rowsByHost.get(manifest.files[0].host).slice(0, 50);
    const parsed = rowsToJsonl(rows).trimEnd().split('\n').map((l) => JSON.parse(l));
    assert.deepEqual(parsed, rows);
  });

  test('the app\'s own format detector selects the IRTriage JSONL module for every demo file', async () => {
    // The point of the demo is that it goes through the SAME pipeline as a
    // dropped file. If detection failed, the demo would be a private back door
    // and would prove nothing about the product.
    const files = await demoFiles();
    assert.equal(files.length, manifest.files.length);
    for (const file of files) {
      const entry = await detectIngestModule(file);
      assert.ok(entry, `no ingest module recognised ${file.name}`);
      assert.equal(entry.id, 'irtriage-jsonl', `${file.name} was routed to ${entry?.id}, not the native timeline parser`);
    }
  });

  test('the real ingest parser yields every demo row unchanged, and they still validate', async () => {
    const files = await demoFiles();
    const target = files.find((f) => f.name === manifest.files[0].file_name);
    const entry = await detectIngestModule(target);
    const parsed = [];
    for await (const record of entry.module.parse(target, { validate: true })) parsed.push(record);
    const expected = rowsByHost.get(manifest.files[0].host);
    assert.equal(parsed.length, expected.length);
    assert.deepEqual(parsed[0], expected[0]);
    assert.deepEqual(parsed[parsed.length - 1], expected[expected.length - 1]);
    for (const row of parsed) assert.deepEqual(validateAgainst(schema, row), []);
  });
});

describe('the demo is reachable from the UI', () => {
  // This repo's signature defect is a complete, tested engine that no UI path
  // can reach: views/analyze.js and views/report.js both shipped as stubs over
  // finished engines, and mockProvider was exported but left out of the registry
  // the Settings dropdown reads. A demo dataset nobody can click is the same
  // bug, so assert the wiring structurally (there is no test-time DOM).
  const ingestPath = path.join(WEB, 'assets', 'js', 'views', 'ingest.js');

  test('ingest.js imports the demo panel and mounts it', async () => {
    const src = await readFile(ingestPath, 'utf8');
    assert.match(src, /from '\.\.\/demo\/panel\.js'/, 'ingest.js must import ../demo/panel.js');
    assert.match(src, /mountDemoPanel\(\s*demoPanel\s*,/, 'ingest.js must actually mount the demo panel into a container');
    assert.match(src, /container\.appendChild\(demoPanel\)/, 'the demo panel element must be appended to the view');
  });

  test('the demo panel is fed the view\'s own addFiles(), not a private shortcut', async () => {
    const src = await readFile(ingestPath, 'utf8');
    assert.match(
      src,
      /mountDemoPanel\(demoPanel,\s*\{\s*onFiles:\s*addFiles\s*\}\)/,
      'the demo must be handed to addFiles() so it flows through detection, parsing and merge exactly like a dropped file',
    );
    const panelSrc = await readFile(path.join(WEB, 'assets', 'js', 'demo', 'panel.js'), 'utf8');
    assert.match(panelSrc, /onFiles\(files\)/, 'panel.js must call onFiles() with the File objects');
    assert.doesNotMatch(panelSrc, /store\.set\(/, 'the demo panel must not write records onto the store directly');
  });

  test('the panel renders a clickable, labelled entry point', async () => {
    const panelSrc = await readFile(path.join(WEB, 'assets', 'js', 'demo', 'panel.js'), 'utf8');
    assert.match(panelSrc, /'Load demo incident'/, 'the button must carry visible label text');
    assert.match(panelSrc, /dataset\.testid = 'load-demo-incident'/, 'the button needs a stable test id');
    assert.match(panelSrc, /addEventListener\('click'/, 'the button must be wired to a click handler');
    assert.match(panelSrc, /loadBtn\.disabled = false/, 'the button must become enabled once the manifest loads');
  });

  test('the ingest view keeps its main-thread fallback and existing entry points', async () => {
    // Adding the demo must not disturb the documented worker fallback: `new
    // Worker(...)` genuinely throws from file:// and for cross-origin worker
    // URLs, and a regression there makes the app render perfectly while being
    // unable to ingest anything at all.
    const src = await readFile(ingestPath, 'utf8');
    assert.match(src, /ingestOnMainThread/, 'the main-thread fallback must still exist');
    assert.match(src, /if\s*\(\s*!worker\s*\)\s*\{\s*\n\s*ingestOnMainThread\(/, 'ingestOne() must still route to the fallback');
    assert.match(src, /createDropzone\(dzPanel/, 'the dropzone must still be mounted');
    assert.match(src, /demo\.destroy\(\)/, 'unmount() must tear the demo panel down');
  });

  test('the demo panel only uses CSS classes that already exist', async () => {
    const panelSrc = await readFile(path.join(WEB, 'assets', 'js', 'demo', 'panel.js'), 'utf8');
    let css = '';
    for (const name of await readdir(path.join(WEB, 'assets', 'css'))) {
      css += await readFile(path.join(WEB, 'assets', 'css', name), 'utf8');
    }
    const used = new Set();
    for (const m of panelSrc.matchAll(/el\('[a-z]+',\s*'([^']+)'/g)) {
      for (const cls of m[1].split(/\s+/)) used.add(cls);
    }
    assert.ok(used.size > 0, 'expected the panel to use some classes');
    const missing = [...used].filter((c) => !css.includes(`.${c}`));
    assert.deepEqual(missing, [], 'the demo panel uses CSS classes that no stylesheet defines, so it would render unstyled');
  });
});
