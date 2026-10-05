// Business-risk layer: the ACME.Corp mock dataset, the correlation engine, the
// executive PDF, and the UI wiring that makes all of it reachable.
//
// Same lesson as views-wired.test.mjs: an engine with green unit tests that no
// view calls is the recurring defect in this repo, so the wiring is asserted
// here alongside the engine.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

import { context } from '../demo/acme/context.js';
import { computeBusinessRisk, remediationPriorities, riskLikelihood, indexContext } from '../assets/js/business/engine.js';
import { checkBusinessContext } from '../assets/js/business/data.js';
import { buildExecutiveBlocks, generateExecutivePdf } from '../assets/js/business/pdf.js';
import { heatmapSvg, trendSvg, riskMatrixSvg, sparklineSvg, complianceSvg, varBarsSvg, kpiHealthSvg } from '../assets/js/business/charts.js';
import { DIMENSIONS } from '../assets/js/business/engine.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(HERE, '..', '..');

describe('ACME.Corp mock dataset', () => {
  test('matches the requested scenario: 500 employees, multi-cloud, multiple sites, global GRC', () => {
    assert.equal(context.organization.employees, 500);
    assert.equal(context.assets.filter((a) => a.class === 'endpoint').length, 500, 'one endpoint per employee');
    assert.deepEqual([...new Set(context.assets.map((a) => a.cloud).filter(Boolean))].sort(), ['aws', 'azure', 'gcp']);
    assert.ok(context.organization.sites.length >= 4);
    assert.ok(context.organization.frameworks.length >= 5);
    for (const cls of ['endpoint', 'server', 'cloud_resource', 'saas', 'cicd', 'network_device', 'peripheral_iot', 'security_control', 'ai_system']) {
      assert.ok(context.assets.some((a) => a.class === cls), `asset class ${cls} missing`);
    }
    for (const t of ['vulnerability', 'misconfiguration', 'exposure', 'ioc', 'ioa', 'incident_finding']) {
      assert.ok(context.cyber_risks.some((r) => r.type === t), `cyber-risk type ${t} missing`);
    }
  });

  test('referential integrity holds (every id resolves)', () => {
    assert.deepEqual(checkBusinessContext(context), []);
    const controls = new Set(context.controls.map((c) => c.id));
    for (const r of context.cyber_risks) for (const c of r.control_ids || []) assert.ok(controls.has(c), `${r.id} -> ${c}`);
  });

  test('two services have no business-supplied KPIs and get AI-proposed ones instead', () => {
    const supplied = new Set(context.kpis.filter((k) => k.source.type !== 'generated').map((k) => k.service_id));
    const missing = context.business_services.filter((s) => !supplied.has(s.id)).map((s) => s.id).sort();
    assert.deepEqual(missing, ['SVC-BI', 'SVC-IAM']);
    for (const id of missing) {
      const gen = context.kpis.filter((k) => k.service_id === id && k.source.type === 'generated');
      assert.ok(gen.length >= 2, `${id} needs generated KPIs`);
      for (const k of gen) assert.ok(k.generation?.rationale, `${k.id} must explain why it was proposed`);
    }
  });

  test('is synthetic and publish-safe', () => {
    assert.equal(context.synthetic, true);
    const text = JSON.stringify(context);
    // Every ACME DNS name uses the RFC 2606 reserved .example TLD.
    for (const host of text.match(/\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.acme\.[a-z]+\b/g) || []) {
      assert.match(host, /\.acme\.example$/, `hostname must use the reserved .example TLD: ${host}`);
    }
    assert.doesNotMatch(text, /acme\.(com|net|org|io)\b/i);
    // Public addresses only from RFC 5737 documentation ranges.
    for (const ip of text.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) || []) {
      // 0.0.0.0 appears only as the "any address" in a security-group finding.
      const ok = ip === '0.0.0.0' || /^(10\.|192\.0\.2\.|198\.51\.100\.|203\.0\.113\.)/.test(ip);
      assert.ok(ok, `non-documentation public IP in mock data: ${ip}`);
    }
    assert.doesNotMatch(text, /CVE-\d{4}-\d+/, 'vulnerability ids must be fictional, never real CVE ids');
  });

  test('the committed payload is what the generator produces (--check)', () => {
    const out = execFileSync(process.execPath, [path.join(ROOT, 'scripts', 'gen-acme-dataset.mjs'), '--check'], { encoding: 'utf8' });
    assert.match(out, /up to date/);
  });
});

describe('business-risk engine', () => {
  test('is deterministic', () => {
    const a = JSON.stringify(computeBusinessRisk(context));
    const b = JSON.stringify(computeBusinessRisk(context));
    assert.equal(a, b);
  });

  test('produces bounded, internally consistent figures', () => {
    const v = computeBusinessRisk(context);
    for (const s of v.services) {
      assert.ok(s.probability >= 0 && s.probability <= 1);
      assert.equal(s.value_at_risk_usd, Math.round(s.probability * s.impact.total_usd));
      for (const d of DIMENSIONS) assert.ok(s.dimensions[d] <= s.probability + 1e-9, `${s.service.id} ${d} cannot exceed overall likelihood`);
    }
    assert.equal(v.headline.value_at_risk_usd, v.services.reduce((x, s) => x + s.value_at_risk_usd, 0));
    assert.equal(v.headline.kpis_total, context.kpis.length);
    for (const c of v.compliance) assert.ok(c.posture >= 0 && c.posture <= 1);
    assert.equal(v.trend.length, 12);
  });

  test('remediation never increases risk, and remediating everything removes all value at risk', () => {
    const base = computeBusinessRisk(context);
    const top = remediationPriorities(context).slice(0, 5).map((p) => p.risk.id);
    const fixed = computeBusinessRisk(context, { remediated: top });
    assert.ok(fixed.headline.value_at_risk_usd < base.headline.value_at_risk_usd);
    for (const s of fixed.services) {
      const b = base.services.find((x) => x.service.id === s.service.id);
      assert.ok(s.probability <= b.probability + 1e-12, `${s.service.id} got riskier after remediation`);
    }
    const all = context.cyber_risks.filter((r) => ['open', 'in_progress', 'accepted'].includes(r.status)).map((r) => r.id);
    assert.equal(computeBusinessRisk(context, { remediated: all }).headline.value_at_risk_usd, 0);
  });

  test('a KPI already below target is "breached" regardless of cyber risk', () => {
    const all = context.cyber_risks.map((r) => r.id);
    const v = computeBusinessRisk(context, { remediated: all });
    for (const k of v.kpis) {
      const fails = k.kpi.direction === 'higher_is_better' ? k.kpi.current < k.kpi.target : k.kpi.current > k.kpi.target;
      assert.equal(k.status === 'breached', fails, `${k.kpi.id}`);
    }
  });

  test('known-answer: one critical internet-facing known-exploited risk on a tiny context', () => {
    const tiny = {
      as_of: '2026-01-31', months: ['2026-01'],
      organization: { name: 'Tiny', sites: [], risk_appetite: { max_service_likelihood: 0.35 } },
      business_goals: [],
      business_services: [{ id: 'S', name: 'Svc', tier: 1, depends_on: [], cost_of_downtime_per_hour_usd: 1000, sla: { penalty_usd: 0 }, impact: { expected_outage_hours: 10, regulatory_usd: 0, recovery_usd: 0, reputation_usd: 0 } }],
      kpis: [],
      assets: [{ id: 'A', service_ids: ['S'], criticality: 'critical', internet_facing: true, site: 'X' }],
      controls: [],
      cyber_risks: [{ id: 'R', type: 'vulnerability', severity: 'critical', exploitability: 'known_exploited', asset_ids: ['A'], status: 'open', first_seen: '2026-01-01', dimensions: ['availability'] }],
    };
    const l = riskLikelihood(tiny.cyber_risks[0], indexContext(tiny));
    assert.ok(Math.abs(l - 0.11 * 1.5 * 1.35) < 1e-9, `likelihood ${l}`);
    const v = computeBusinessRisk(tiny);
    assert.equal(v.services[0].value_at_risk_usd, Math.round(l * 10000));
  });
});

describe('executive outputs', () => {
  test('charts are well-formed SVG with hover titles', () => {
    const v = computeBusinessRisk(context);
    const svgs = [
      heatmapSvg(v.heatmap, DIMENSIONS), trendSvg(v.trend, 6e6), riskMatrixSvg(v.services, 0.35),
      sparklineSvg(context.kpis[0], 1), complianceSvg(v.compliance, 0.8),
      varBarsSvg(v.services.map((s) => ({ id: s.service.id, label: s.service.name, value: s.value_at_risk_usd, probability: s.probability }))),
      kpiHealthSvg({ breached: 1, breach_projected: 2, at_risk: 3, on_track: 4 }),
    ];
    for (const s of svgs) {
      assert.match(s, /^<svg[\s\S]*<\/svg>$/);
      assert.match(s, /role="img"/);
      assert.doesNotMatch(s, /NaN|undefined/);
    }
  });

  test('the executive PDF is a real, watermarked PDF', async () => {
    const v = computeBusinessRisk(context);
    const blocks = buildExecutiveBlocks(context, v, { priorities: remediationPriorities(context) });
    assert.ok(blocks.length > 20);
    const { blob, pageCount } = await generateExecutivePdf(context, v, { priorities: remediationPriorities(context) });
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const head = new TextDecoder('latin1').decode(bytes.slice(0, 8));
    assert.equal(head, '%PDF-1.7');
    assert.ok(pageCount >= 2);
    const tail = new TextDecoder('latin1').decode(bytes.slice(-200));
    assert.match(tail, /%%EOF$/);
    assert.match(new TextDecoder('latin1').decode(bytes), new RegExp(`/Count ${pageCount}`));
  });
});

describe('business layer is reachable from the UI', () => {
  const VIEWS = path.join(HERE, '..', 'assets', 'js', 'views');

  test('the router lists every layer view and lands on the executive dashboard', async () => {
    const app = await readFile(path.join(HERE, '..', 'assets', 'js', 'app.js'), 'utf8');
    for (const id of ['inventory', 'context', 'cyber', 'business']) {
      assert.match(app, new RegExp(`\\{ id: '${id}'`), `ROUTES must contain ${id}`);
      assert.match(app, new RegExp(`${id}: \\(\\) => import\\('\\./views/${id}\\.js'\\)`), `viewLoaders must load ${id}`);
    }
    assert.match(app, /const DEFAULT_ROUTE = 'business'/);
  });

  test('the dashboard computes, exports and auto-loads the demo', async () => {
    const src = await readFile(path.join(VIEWS, 'business.js'), 'utf8');
    assert.match(src, /computeBusinessRisk\(/);
    assert.match(src, /remediationPriorities\(/);
    assert.match(src, /generateExecutivePdf\(/);
    assert.match(src, /ensureBusinessContext\(store\)/);
  });

  test('every layer view loads the context the same way', async () => {
    for (const f of ['inventory.js', 'context.js', 'cyber.js', 'business.js']) {
      const src = await readFile(path.join(VIEWS, f), 'utf8');
      assert.match(src, /ensureBusinessContext\(store\)/, `${f} must load the business context`);
    }
  });

  test('index.html loads the business stylesheet', async () => {
    const html = await readFile(path.join(HERE, '..', 'index.html'), 'utf8');
    assert.match(html, /href="assets\/css\/business\.css"/);
  });
});
