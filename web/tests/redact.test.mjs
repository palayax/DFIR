// Browser-side redaction must enforce the SAME policy as the client, from the
// same file. If the client redacts an archive one way and the web app publishes a
// report another way, the governed register is worthless.
//
// These tests deliberately mirror client/internal/redact/redact_test.go case for
// case where the behaviour is meant to be identical, so a divergence shows up as a
// failing test on one side rather than as a leak in a published report.

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Redactor, loadCatalog, profileIds, resolveKey, compileCatalogRegex } from '../assets/js/redact/index.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CATALOG_PATH = path.join(HERE, '..', 'assets', 'data', 'sensitive-data.json');

let CATALOG;

// loadCatalog() uses fetch() against a module-relative URL, which needs no server
// in Node 18+ for file: URLs... except it does. Read the file directly and build
// Redactor from it, which is also what keeps these tests hermetic.
before(async () => {
  CATALOG = JSON.parse(await readFile(CATALOG_PATH, 'utf8'));
});

const KEY = new Uint8Array(32).fill(7);

function mk(profile) {
  return new Redactor(CATALOG, profile, KEY, 'explicit');
}

describe('redaction catalogue (browser side)', () => {
  test('the compiled catalogue is present, versioned and complete', () => {
    assert.equal(CATALOG.version, 1);
    assert.ok((CATALOG.components || []).length > 10, 'catalogue has too few components');
    assert.ok((CATALOG.patterns || []).length > 10, 'catalogue has too few patterns');
    for (const want of ['none', 'internal', 'publish']) {
      assert.ok(profileIds(CATALOG).includes(want), `missing profile ${want}`);
    }
  });

  test('every catalogue pattern compiles in this JS engine', () => {
    // The regexes are authored for Go's RE2. JS accepts a superset for these
    // constructs, but a pattern that fails here is silently skipped at runtime,
    // which would mean the browser enforces less than the client.
    const broken = [];
    for (const p of CATALOG.patterns) {
      try {
        compileCatalogRegex(p.regex);
      } catch (err) {
        broken.push(`${p.id}: ${err.message}`);
      }
    }
    assert.deepEqual(broken, [], `pattern(s) do not compile in JS, so the browser would enforce less than the client:\n  ${broken.join('\n  ')}`);
  });

  test('unknown profile is rejected with the valid list', () => {
    assert.throws(() => mk('not-a-profile'), /available:/);
  });
});

describe('none profile is a genuine no-op', () => {
  test('nothing is altered', async () => {
    const r = mk('none');
    assert.equal(r.enabled, false);
    assert.equal(r.excludeRawFiles, false);

    const cases = [
      ['timeline.host', 'WKS-CORP-01'],
      ['timeline.user', 'DOMAIN\\alice'],
      ['timeline.process_command_line', 'psexec -p Sup3rS3cret'],
      ['timeline.network_dst_ip', '10.1.2.3'],
    ];
    for (const [comp, val] of cases) {
      assert.equal(await r.field(comp, val), val, `${comp} was altered under the none profile`);
    }
    assert.equal(r.text('password=hunter2 AKIAIOSFODNN7EXAMPLE'), 'password=hunter2 AKIAIOSFODNN7EXAMPLE');
  });
});

describe('publish profile', () => {
  test('identity is pseudonymised, stably and distinctly', async () => {
    const r = mk('publish');
    const a = await r.field('timeline.host', 'WKS-CORP-01');
    const again = await r.field('timeline.host', 'WKS-CORP-01');
    const other = await r.field('timeline.host', 'WKS-CORP-02');

    assert.notEqual(a, 'WKS-CORP-01', 'hostname was not pseudonymised');
    assert.match(a, /^pseudo:[0-9a-f]{12}$/, 'pseudonym shape must match the client so citations line up');
    assert.equal(a, again, 'same host produced two pseudonyms; cross-referencing a published report would break');
    assert.notEqual(a, other, 'two different hosts collapsed to one pseudonym');
  });

  test('well-known service accounts survive', async () => {
    const r = mk('publish');
    for (const acct of ['SYSTEM', 'NT AUTHORITY\\SYSTEM', 'LOCAL SERVICE']) {
      assert.equal(await r.field('timeline.user', acct), acct, `${acct} should not be redacted`);
    }
    const real = await r.field('timeline.user', 'DOMAIN\\alice');
    assert.ok(!real.toLowerCase().includes('alice'), `real account survived: ${real}`);
  });

  test('private IPs are masked and public IPs are kept as indicators', async () => {
    const r = mk('publish');
    for (const ip of ['10.1.2.3', '192.168.0.5', '172.16.4.4', '127.0.0.1', '169.254.1.1', '100.64.0.1']) {
      assert.notEqual(await r.field('timeline.network_dst_ip', ip), ip, `private IP ${ip} survived`);
    }
    for (const ip of ['8.8.8.8', '140.82.112.26', '1.1.1.1']) {
      assert.equal(await r.field('timeline.network_dst_ip', ip), ip,
        `public IP ${ip} was redacted; a C2 address is the most valuable line in a published report`);
    }
  });

  test('secrets in free text are removed but diagnostic shape survives', async () => {
    const r = mk('publish');
    const out = await r.field('timeline.process_command_line', 'psexec \\\\host -u admin -p Sup3rS3cret cmd.exe');
    assert.ok(!out.includes('Sup3rS3cret'), `password survived: ${out}`);
    assert.ok(out.includes('-p'), `flag name was destroyed, losing the finding "they used -p": ${out}`);
  });

  test('user paths keep their shape', async () => {
    const r = mk('publish');
    const out = await r.field('timeline.target', 'C:\\Users\\alice\\AppData\\Local\\Temp\\evil.exe');
    assert.ok(!out.includes('alice'), `username survived: ${out}`);
    for (const keep of ['AppData', 'Temp', 'evil.exe']) {
      assert.ok(out.includes(keep), `path lost diagnostic component ${keep}: ${out}`);
    }
    const pub = await r.field('timeline.target', 'C:\\Users\\Public\\Documents\\x.txt');
    assert.ok(pub.includes('Public'), `C:\\Users\\Public was redacted unnecessarily: ${pub}`);
  });

  test('indicators are preserved', async () => {
    const r = mk('publish');
    const keep = {
      'timeline.hashes': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      'timeline.detection_metadata': 'Suspicious PowerShell Download',
      'timeline.process_name': 'powershell.exe',
      'timeline.network_dst_port': '443',
    };
    for (const [comp, val] of Object.entries(keep)) {
      assert.equal(await r.field(comp, val), val, `indicator ${comp} was altered`);
    }
  });

  test('raw files are excluded and a report is produced', () => {
    const r = mk('publish');
    assert.equal(r.excludeRawFiles, true);
    const rep = r.buildReport();
    assert.equal(rep.profile, 'publish');
    assert.equal(rep.catalog_version, 1);
    // Never null: a consumer should not have to special-case it (the Go side's
    // report did emit null here once, and crashed a reader).
    assert.ok(Array.isArray(rep.components) && Array.isArray(rep.patterns)
      && Array.isArray(rep.needs_human_review) && Array.isArray(rep.warnings));
    assert.ok(rep.warnings.join(' ').includes('best-effort'),
      'the honest-limits caveat is mandatory; a report must not read as a guarantee');
  });
});

describe('internal profile relaxes identity but not secrets', () => {
  test('host is kept, password is not', async () => {
    const r = mk('internal');
    assert.equal(await r.field('timeline.host', 'WKS-CORP-01'), 'WKS-CORP-01',
      'internal responders need to know which machine');
    assert.equal(r.excludeRawFiles, false, 'internal profile must keep raw evidence');
    const out = await r.field('timeline.process_command_line', 'sqlcmd /U sa /P TopSecret123');
    assert.ok(!out.includes('TopSecret123'), `internal profile leaked a password: ${out}`);
  });
});

describe('sticky actions survive class overrides', () => {
  test('raw-file excludes are not downgraded to scan by publish', () => {
    const r = mk('publish');
    const byId = new Map(r.buildReport().components.map((c) => [c.id, c]));
    const wrong = [];
    for (const comp of CATALOG.components) {
      if (comp.kind !== 'raw_file' || comp.action !== 'exclude') continue;
      if (byId.get(comp.id)?.action !== 'exclude') wrong.push(`${comp.id} -> ${byId.get(comp.id)?.action}`);
    }
    assert.deepEqual(wrong, [],
      `publish's "content: scan" must not override a raw-file exclude — that would grep 12 GB of customer files and publish them anyway:\n  ${wrong.join('\n  ')}`);
    assert.equal(byId.get('archive.sha256sums')?.action, 'rewrite');
    assert.equal(byId.get('timeline.row_hash')?.action, 'review');
  });
});

describe('seeded identifiers', () => {
  test('known hostnames and case ids are scrubbed from free text', async () => {
    const r = mk('publish');
    await r.seed('manifest.host', 'WKS-CORP-07');
    await r.seed('manifest.engagement', 'CASE-ACME-001');

    const out = r.text('Run on WKS-CORP-07 for CASE-ACME-001; also wks-corp-07 lowercase');
    for (const leaked of ['WKS-CORP-07', 'wks-corp-07', 'CASE-ACME-001']) {
      assert.ok(!out.includes(leaked), `seeded identifier ${leaked} survived: ${out}`);
    }
    assert.ok(out.includes('pseudo:'), `hostname should become a stable pseudonym: ${out}`);
  });

  test('word boundaries stop a generic account name corrupting artifact names', async () => {
    const r = mk('publish');
    await r.seed('manifest.host', 'User');
    const out = r.text('C:\\Users\\User\\NTUSER.DAT and UserAssist and Users');
    for (const keep of ['NTUSER.DAT', 'UserAssist', 'Users']) {
      assert.ok(out.includes(keep), `seeding "User" corrupted ${keep}: ${out}`);
    }
  });

  test('too-short identifiers are refused', async () => {
    const r = mk('publish');
    await r.seed('manifest.host', 'PC1');
    const input = 'PC1 and PC12 and APC1';
    assert.equal(r.text(input), input, 'a 3-character identifier was seeded and corrupted the text');
  });
});

describe('key handling', () => {
  test('an explicit key is deterministic and different keys diverge', async () => {
    const a = new Redactor(CATALOG, 'publish', new Uint8Array(32).fill(1), 'explicit');
    const b = new Redactor(CATALOG, 'publish', new Uint8Array(32).fill(1), 'explicit');
    const c = new Redactor(CATALOG, 'publish', new Uint8Array(32).fill(2), 'explicit');

    const ha = await a.field('timeline.host', 'WKS-CORP-01');
    const hb = await b.field('timeline.host', 'WKS-CORP-01');
    const hc = await c.field('timeline.host', 'WKS-CORP-01');

    assert.equal(ha, hb, 'same key must give the same pseudonym, or a report cannot cross-reference its timeline');
    assert.notEqual(ha, hc, 'different keys must diverge, or separate publications become correlatable');
  });

  test('a short or non-hex key is rejected', async () => {
    await assert.rejects(() => resolveKey('xyz'), /hex/);
    await assert.rejects(() => resolveKey('abcd'), /at least 32/);
    const ok = await resolveKey('9f2c41ab7d0e5386bc14fa9027d6e5b1');
    assert.equal(ok.source, 'explicit');
    assert.equal(ok.key.length, 16);
  });

  test('no key yields a random one, recorded as such', async () => {
    const { key, source } = await resolveKey('');
    assert.equal(source, 'random-per-run');
    assert.equal(key.length, 32);
  });
});
