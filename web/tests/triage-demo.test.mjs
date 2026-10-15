// Triage -> business context -> dashboard: the demo workflow's data path.
//
// The three demo stories (add a high-risk data source, mitigate an existing
// asset, change the SLOs) all run through context-edit.js and the BIA engine.
// These tests assert the numbers move the way the demo narrates, that edits
// never mutate the pristine ACME.Corp module (so "Reset demo" is exact), and
// that the views and the tour are actually wired to these functions.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { context } from '../demo/acme/context.js';
import { computeBia, assetImpact, rootCausePath } from '../assets/js/business/bia.js';
import { addDataSource, removeDataSource, updateSlo, updatePolicyWeight, DEMO_DATA_SOURCE, DEMO_SLO_CHANGES, POSTURE_CHECKS, DATA_SOURCE_TYPES } from '../assets/js/business/context-edit.js';
import { brandMark, frameworkBrand } from '../assets/js/business/brands.js';
import { BRAND_ICONS, SIMPLE_ICONS_VERSION } from '../assets/vendor/simple-icons/brands.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const read = (...p) => readFile(path.join(HERE, '..', ...p), 'utf8');
const slo = (bia, id) => bia.slos.find((s) => s.id === id);
const pristine = JSON.stringify(context);

describe('triage data sources in the ACME.Corp dataset', () => {
  test('cover every category the Triage tab lists, including darknet, APIs and audit logs', () => {
    for (const cls of ['endpoint', 'server', 'cloud_resource', 'saas', 'api', 'network_device', 'peripheral_iot', 'security_control', 'cicd', 'ai_system', 'darknet', 'audit_log']) {
      assert.ok(context.assets.some((a) => a.class === cls), `no ${cls}`);
    }
  });

  test('every brand on an asset renders as a vendored logo or a labelled badge', () => {
    const keys = new Set(context.assets.map((a) => a.brand).filter(Boolean));
    assert.ok(keys.size >= 25, `only ${keys.size} brands`);
    for (const k of keys) assert.match(brandMark(k), /class="brand /, `brand ${k} renders nothing`);
  });

  test('the vendored Simple Icons module is pinned and records upstream hashes', () => {
    assert.match(SIMPLE_ICONS_VERSION, /^\d+\.\d+\.\d+$/);
    for (const [slug, i] of Object.entries(BRAND_ICONS)) {
      assert.match(i.sha256, /^[0-9a-f]{64}$/, slug);
      assert.match(i.hex, /^#[0-9A-F]{6}$/i, slug);
      assert.ok(i.path.length > 20, slug);
    }
  });

  test('findings carry real framework references (MITRE ATT&CK / ATLAS, OWASP) with official links', () => {
    for (const r of context.cyber_risks.filter((x) => x.mitre_techniques.length)) {
      for (const t of r.mitre_techniques) {
        const ref = r.references.find((x) => x.id === t);
        assert.ok(ref, `${r.id} lacks a reference for ${t}`);
        assert.match(ref.url, t.startsWith('AML.') ? /^https:\/\/atlas\.mitre\.org\// : /^https:\/\/attack\.mitre\.org\/techniques\//);
        assert.notEqual(ref.name, t, `${t} has no technique name`);
      }
    }
    const owasp = context.cyber_risks.flatMap((r) => r.references).filter((x) => x.framework.startsWith('OWASP'));
    assert.ok(owasp.length >= 30);
    for (const x of owasp) assert.match(x.url, /^https:\/\/(owasp\.org|genai\.owasp\.org)\//);
    assert.ok(context.controls.every((c) => c.framework_refs.some((r) => r.framework === 'NIST SP 800-53 Rev. 5')), 'every control maps to NIST 800-53');
    assert.ok(context.controls.some((c) => c.framework_refs.some((r) => r.framework === 'FedRAMP Moderate')));
    for (const f of context.framework_catalog) assert.match(f.url, /^https:\/\//);
    assert.equal(frameworkBrand('MITRE ATT&CK'), 'mitre');
  });
});

describe('demo story 1: a new high-risk data source', () => {
  test('raises the shortfall, becomes the top root cause, and can be removed exactly', async () => {
    const before = computeBia(context);
    const { ctx, asset, findings } = await addDataSource(context, DEMO_DATA_SOURCE);
    assert.equal(JSON.stringify(context), pristine, 'addDataSource mutated the pristine context');
    assert.equal(findings.length, DEMO_DATA_SOURCE.posture.length);
    for (const f of findings) {
      assert.ok(f.references.length, `${f.id} has no framework reference`);
      assert.ok(ctx.evidence.some((e) => e.finding_ids.includes(f.id) && /^[0-9a-f]{64}$/.test(e.sha256)), `${f.id} has no evidence`);
    }
    const after = computeBia(ctx);
    for (const r of after.slos) assert.ok(r.loss_usd >= slo(before, r.id).loss_usd, `${r.id} shortfall went down`);
    assert.ok(slo(after, 'SLO-ARR').loss_usd > slo(before, 'SLO-ARR').loss_usd * 1.1, 'the new source must visibly move ARR');
    assert.equal(slo(after, 'SLO-ARR').by_asset[0].id, asset.id, 'the new gateway is the top ARR root cause');
    assert.ok(assetImpact(after, asset.id).length >= 6, 'it traces into most SLOs');
    const p = rootCausePath(after, ctx, findings[0].id);
    assert.equal(p.asset_id, asset.id);
    for (const k of ['scenario_id', 'component_id', 'process_id', 'policy_id', 'slo_id']) assert.ok(p[k], `root-cause path lacks ${k}`);
    const removed = removeDataSource(ctx, asset.id);
    assert.deepEqual(computeBia(removed).slos.map((r) => r.loss_usd), before.slos.map((r) => r.loss_usd), 'removing it restores the figures exactly');
  });

  test('every posture check maps to known scenarios, controls and a data-source type', () => {
    const scen = new Set(context.risk_scenarios.map((s) => s.id));
    const ctl = new Set(context.controls.map((c) => c.id));
    for (const p of POSTURE_CHECKS) {
      for (const s of p.scenarios) assert.ok(scen.has(s), `${p.id}: ${s}`);
      for (const c of p.controls) assert.ok(ctl.has(c), `${p.id}: ${c}`);
    }
    assert.ok(DATA_SOURCE_TYPES.some((t) => t.id === DEMO_DATA_SOURCE.type));
  });
});

describe('demo story 2: mitigating an existing asset', () => {
  test('MIT-05 on the identity provider lowers its root-cause share and the ARR shortfall', () => {
    const base = computeBia(context);
    const fixed = computeBia(context, { mitigations: ['MIT-05'] });
    assert.ok(slo(fixed, 'SLO-ARR').loss_usd < slo(base, 'SLO-ARR').loss_usd);
    const before = assetImpact(base, 'SAAS-IDP').reduce((s, x) => s + x.loss_usd, 0);
    const after = assetImpact(fixed, 'SAAS-IDP').reduce((s, x) => s + x.loss_usd, 0);
    assert.ok(after < before / 2, `identity root cause ${before} -> ${after}`);
  });
});

describe('demo story 3: changing the business context', () => {
  test('SLO edits are immutable and move scores the way the tour says', () => {
    let ctx = context;
    for (const ch of DEMO_SLO_CHANGES) ctx = updateSlo(ctx, ch.slo_id, ch.patch);
    assert.equal(JSON.stringify(context), pristine);
    const base = computeBia(context);
    const after = computeBia(ctx);
    assert.ok(slo(after, 'SLO-ARR').score < slo(base, 'SLO-ARR').score, 'a larger ARR plan leaves more headroom');
    assert.equal(slo(after, 'SLO-ARR').status, 'on_track');
    assert.ok(slo(after, 'SLO-SLA').score > slo(base, 'SLO-SLA').score, 'a tighter SLA target leaves less headroom');
    const w = updatePolicyWeight(context, 'POL-B03', 'SLO-ARR', 0);
    assert.ok(slo(computeBia(w), 'SLO-ARR').loss_usd < slo(base, 'SLO-ARR').loss_usd);
    assert.ok((ctx.revision || 0) > 0, 'edits bump the revision so view caches invalidate');
  });
});

describe('the demo workflow is wired into the app', () => {
  test('Triage drives add / root cause / mitigation; Business context drives SLO edits', async () => {
    const triage = await read('assets', 'js', 'views', 'triage.js');
    for (const fn of ['addDataSource(', 'removeDataSource(', 'assetImpact(', 'rootCausePath(', 'mitigationImpacts(', 'ensureBusinessContext(store)']) assert.ok(triage.includes(fn), `triage.js must call ${fn}`);
    const ctxView = await read('assets', 'js', 'views', 'context.js');
    for (const fn of ['updateSlo(', 'updatePolicyWeight(', 'updateAppetite(']) assert.ok(ctxView.includes(fn), `context.js must call ${fn}`);
    const dash = await read('assets', 'js', 'views', 'bia.js');
    assert.match(dash, /<h1>Dashboard<\/h1>/);
    assert.match(dash, /href: '#\/report'/, 'the Export menu replaces the Reports tab');
    assert.match(dash, /by_asset/);
  });

  test('the demo tour is installed and every event it sends has a listener', async () => {
    const app = await read('assets', 'js', 'app.js');
    assert.match(app, /installDemoTour\(appStore\)/);
    const tour = await read('assets', 'js', 'ui', 'demo-tour.js');
    const views = (await Promise.all(['triage.js', 'context.js', 'bia.js'].map((f) => read('assets', 'js', 'views', f)))).join('\n');
    const sent = new Set([...tour.matchAll(/emit\('([a-z-]+)'/g)].map((m) => m[1]));
    assert.ok(sent.size >= 6, `only ${sent.size} demo actions`);
    for (const a of sent) assert.ok(views.includes(`'${a}'`), `no view handles demo action ${a}`);
    const html = await read('index.html');
    assert.match(html, /href="assets\/css\/theme\.css"/);
  });
});
