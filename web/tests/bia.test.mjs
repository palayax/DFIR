// BIA explorer (layer 3): the seven-level ACME.Corp hierarchy, the scoring
// engine, focus/pivot navigation, the PDF, and the wiring that makes it all
// reachable from the app (see views-wired.test.mjs for why the last part
// matters in this repo).

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { context } from '../demo/acme/context.js';
import {
  computeBia, connectedSet, directLinks, mitigationImpacts, mitigationFindingIds, sloScoreTrend, pivot, nameIndex,
  sloSentence, bandOf, LEVELS, BIA_MODEL, formatSloValue,
} from '../assets/js/business/bia.js';
import { riskLikelihood, indexContext } from '../assets/js/business/engine.js';
import { sloWaterfallSvg, impactBarsSvg, scoreTrendSvg, timelineSvg } from '../assets/js/business/bia-charts.js';
import { buildBiaBlocks, generateBiaPdf } from '../assets/js/business/bia-pdf.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const base = computeBia(context);
const close = (a, b, tol) => Math.abs(a - b) <= tol;

describe('ACME.Corp BIA hierarchy', () => {
  test('has all seven levels', () => {
    assert.ok(context.slos.length >= 6, 'L1 SLOs');
    assert.ok(context.bia_policies.length >= 10, 'L2 policies');
    assert.ok(context.business_processes.length >= 10, 'L3 processes');
    assert.ok(context.bp_components.length >= 40, 'L4 components');
    for (const cat of ['people', 'process', 'data', 'system']) assert.ok(context.bp_components.some((c) => c.category === cat), `L4 ${cat}`);
    assert.ok(context.risk_scenarios.length >= 8, 'L5 scenarios');
    assert.ok(context.hunts.length >= 8 && context.cyber_risks.length > 100, 'L6 hunts and findings');
    assert.ok(context.evidence.length > 150, 'L7 evidence');
    assert.ok(context.mitigations.length >= 10, 'proposed mitigations');
  });

  test('is genuinely many-to-many (the CISO and denial of service examples)', () => {
    const cisoProcs = context.business_processes.filter((p) => p.components.some((c) => c.id === 'PPL-CISO'));
    assert.ok(cisoProcs.length >= 5, `CISO is in ${cisoProcs.length} processes`);
    const dos = context.risk_scenarios.find((s) => s.id === 'RS-DOS');
    for (const c of ['SYS-WEB', 'SYS-PORTAL', 'SYS-TIP']) assert.ok(dos.component_ids.includes(c), `DoS applies to ${c}`);
    assert.ok(context.bia_policies.some((p) => p.slo_links.length >= 3), 'a policy protects several SLOs');
    assert.ok(context.cyber_risks.some((r) => r.scenario_ids.length >= 2), 'a finding enables several scenarios');
  });

  test('every open finding reaches the explorer (has a scenario and a component)', () => {
    const inGraph = new Set(base.levels.finding.map((n) => n.id));
    for (const r of context.cyber_risks) assert.ok(inGraph.has(r.id), `${r.id} is unreachable in the BIA graph`);
  });

  test('evidence stays at defender level: no real CVE ids, documentation-range addresses only', () => {
    const text = JSON.stringify([context.evidence, context.hunts]);
    assert.doesNotMatch(text, /CVE-\d{4}-\d+/);
    for (const ip of text.match(/\b\d{1,3}(?:\.\d{1,3}){3}\b/g) || []) {
      // 0.0.0.0 appears only as the "any address" in a security-group finding title.
      assert.match(ip, /^(0\.0\.0\.0$|10\.|192\.0\.2\.|198\.51\.100\.|203\.0\.113\.)/, ip);
    }
    for (const e of context.evidence) assert.match(e.sha256, /^[0-9a-f]{64}$/);
  });
});

describe('BIA engine', () => {
  test('is deterministic', () => {
    assert.equal(JSON.stringify(computeBia(context).slos), JSON.stringify(base.slos));
  });

  test('every score is 0..100 and bands follow the score', () => {
    for (const l of LEVELS) {
      for (const n of base.levels[l.key]) {
        assert.ok(n.score >= 0 && n.score <= 100, `${n.id} ${n.score}`);
        assert.equal(n.band, bandOf(n.score).id);
      }
    }
  });

  test('dollar attribution is exact: policies, scenarios and findings each add up to the SLO shortfall', () => {
    for (const r of base.slos) {
      const byPolicy = r.by_policy.reduce((s, p) => s + p.loss_usd, 0);
      const byScenario = r.by_scenario.reduce((s, p) => s + p.loss_usd, 0);
      assert.ok(close(byPolicy, r.loss_usd, r.by_policy.length), `${r.id} policies ${byPolicy} vs ${r.loss_usd}`);
      assert.ok(close(byScenario, r.loss_usd, r.by_scenario.length), `${r.id} scenarios ${byScenario} vs ${r.loss_usd}`);
      const byFinding = r.by_finding.reduce((s, p) => s + p.loss_usd, 0);
      assert.ok(byFinding <= r.loss_usd + r.by_finding.length, `${r.id} findings exceed total`);
    }
  });

  test('the cyber-adjusted projection moves the plan by shortfall × metric-per-dollar', () => {
    for (const r of base.slos) {
      const sign = r.slo.direction === 'higher_is_better' ? -1 : 1;
      const expected = r.slo.forecast + sign * r.loss_usd * r.slo.metric_per_usd;
      assert.ok(close(r.projected, expected, 10 ** -(r.slo.decimals ?? 1)), `${r.id} ${r.projected} vs ${expected}`);
    }
  });

  test('the mockup tells a story: some SLOs projected to miss, some on track, a spread of bands', () => {
    const statuses = new Set(base.slos.map((s) => s.status));
    assert.ok(statuses.has('breach_projected') && statuses.has('on_track'));
    assert.ok(new Set(base.slos.map((s) => s.band)).size >= 3);
    const arr = base.slos.find((s) => s.id === 'SLO-ARR');
    assert.ok(arr.loss_pct_of_basis > 0.01 && arr.loss_pct_of_basis < 0.08, `ARR shortfall ${arr.loss_pct_of_basis}`);
  });

  test('mitigations never make any SLO worse, and the dashboard sees the same finding fixes', () => {
    const all = context.mitigations.map((m) => m.id);
    const fixed = computeBia(context, { mitigations: all });
    for (const r of fixed.slos) {
      const b = base.slos.find((x) => x.id === r.id);
      assert.ok(r.loss_usd <= b.loss_usd, `${r.id} got worse`);
    }
    assert.ok(fixed.slos.find((s) => s.id === 'SLO-ARR').loss_usd < base.slos.find((s) => s.id === 'SLO-ARR').loss_usd);
    assert.deepEqual(mitigationFindingIds(context, ['MIT-01']), context.mitigations.find((m) => m.id === 'MIT-01').finding_ids);
    const impacts = mitigationImpacts(context, {}, 'SLO-ARR');
    assert.equal(impacts.length, context.mitigations.length);
    for (const m of impacts) assert.ok(m.reduction_usd >= 0, `${m.mitigation.id} increases risk`);
  });

  test('a scenario factor lowers that scenario only through its base rate', () => {
    const dos = computeBia(context, { mitigations: ['MIT-01'] }).levels.scenario.find((n) => n.id === 'RS-DOS');
    const before = base.levels.scenario.find((n) => n.id === 'RS-DOS');
    assert.ok(dos.score < before.score);
    assert.equal(dos.factor, 0.4);
  });

  test('known answer on a one-finding context', () => {
    const tiny = {
      as_of: '2026-01-31', months: ['2026-01'],
      organization: { name: 'Tiny' }, business_services: [{ id: 'S', name: 'S', depends_on: [] }],
      assets: [{ id: 'A', criticality: 'critical', internet_facing: false, site: 'X', service_ids: ['S'] }],
      controls: [], kpis: [],
      cyber_risks: [{ id: 'F', type: 'vulnerability', severity: 'critical', exploitability: 'poc', asset_ids: ['A'], status: 'open', first_seen: '2026-01-01', scenario_ids: ['SC'], component_ids: [] }],
      slos: [{ id: 'O', name: 'O', unit: '$M', direction: 'higher_is_better', target: 10, warning: 11, forecast: 12, decimals: 2, basis_usd: 1e6, basis_label: 'basis', metric_per_usd: 1e-6 }],
      bia_policies: [{ id: 'P', title: 'P', slo_links: [{ slo_id: 'O', weight: 0.5 }] }],
      business_processes: [{ id: 'R', name: 'R', service_ids: ['S'], policy_ids: ['P'], components: [{ id: 'C', role: 'essential' }] }],
      bp_components: [{ id: 'C', name: 'C', category: 'system', asset_ids: ['A'] }],
      risk_scenarios: [{ id: 'SC', name: 'SC', dimensions: ['availability'], base_rate: 0, impact_factor: 1, component_ids: [] }],
      hunts: [], evidence: [], mitigations: [],
    };
    const l = riskLikelihood(tiny.cyber_risks[0], indexContext(tiny));
    const pProc = l * BIA_MODEL.processDisruption;
    const pPol = pProc * BIA_MODEL.policyFailure;
    const v = computeBia(tiny);
    assert.ok(close(v.slos[0].loss_usd, 0.5 * 1e6 * pPol, 1), `${v.slos[0].loss_usd} vs ${0.5e6 * pPol}`);
    assert.equal(v.slos[0].by_finding[0].id, 'F');
  });

  test('the 12-month score trend has one point per month and ends at today’s score', () => {
    const trend = sloScoreTrend(context);
    for (const r of base.slos) {
      const t = trend.get(r.id);
      assert.equal(t.length, context.months.length);
      assert.equal(t.at(-1).score, r.score);
    }
  });
});

describe('focus, links and pivot', () => {
  test('focusing a component shows ITS findings, not every finding of its scenarios', () => {
    const c = connectedSet(base, context, 'SYS-WEB');
    assert.ok(c.get('scenario').has('RS-DOS'));
    assert.ok(c.get('finding').has('CR-070') && c.get('finding').has('CR-071'));
    assert.ok(!c.get('finding').has('CR-072'), 'CR-072 is on the TIP API, not the website');
    assert.ok(c.get('slo').size >= 1 && c.get('process').has('PR-LEADGEN'));
  });

  test('focusing a person walks up to every SLO they affect', () => {
    const c = connectedSet(base, context, 'PPL-CISO');
    assert.ok(c.get('process').size >= 5);
    assert.ok(c.get('slo').size >= 6);
  });

  test('focus works from every level, top to bottom', () => {
    for (const id of ['SLO-SLA', 'POL-B02', 'PR-PORTAL', 'RS-DOS', 'CR-073', 'HUNT-01', base.levels.evidence[0].id]) {
      const c = connectedSet(base, context, id);
      const filled = [...c.values()].filter((s) => s.size).length;
      assert.ok(filled >= 5, `${id} connects to only ${filled} levels`);
    }
  });

  test('every drawn link joins two nodes that exist', () => {
    const names = nameIndex(base, context);
    for (const [a, b] of directLinks(base, context)) assert.ok(names.has(a) && names.has(b), `${a} -> ${b}`);
  });

  test('pivot totals count each finding once per row and cells drill through to finding ids', () => {
    const pv = pivot(base, context, 'scenario', 'slo', 'findings');
    assert.ok(pv.rows.length >= 8 && pv.cols.length === context.slos.length);
    for (const r of pv.rows) assert.equal(r.total, new Set(r.finding_ids).size);
    const cell = pv.grid[0][0];
    assert.equal(cell.value, cell.finding_ids.length);
    const bySite = pivot(base, context, 'site', 'category', 'critical_high');
    assert.ok(bySite.rows.some((r) => r.key === 'SIN'));
  });
});

describe('BIA outputs', () => {
  test('charts are well-formed SVG', () => {
    const scen = new Map(context.risk_scenarios.map((s) => [s.id, s.name]));
    const r = base.slos[0];
    const svgs = [
      sloWaterfallSvg(r, scen),
      impactBarsSvg(r.by_scenario.map((s) => ({ label: s.id, value: s.loss_usd }))),
      scoreTrendSvg(sloScoreTrend(context).get(r.id)),
      timelineSvg([{ id: 'CR-001', label: 'x', kind: 'finding', start: '2026-09-08', end: '2026-09-30', open: true, score: 77, evidence: ['2026-09-10'] }, { id: 'HUNT-01', label: 'h', kind: 'hunt', score: 20, runs: context.hunts[0].runs }], context.months, context.as_of),
    ];
    for (const s of svgs) {
      assert.match(s, /^<svg[\s\S]*<\/svg>$/);
      assert.match(s, /role="img"/);
      assert.doesNotMatch(s, /NaN|undefined/);
    }
    assert.equal(formatSloValue(150, { unit: '$M', decimals: 1 }), '$150.0M');
    assert.match(sloSentence(r, scen), /open cyber risks/);
  });

  test('the PDF is real, watermarked, and uses only characters the Base-14 fonts can print', async () => {
    const impacts = mitigationImpacts(context, {}, 'SLO-ARR');
    const blocks = buildBiaBlocks(context, base, { impacts });
    assert.doesNotMatch(JSON.stringify(blocks), /[−→←≤≥✕▲✓]/, 'non-WinAnsi glyphs would print as "?"');
    const { blob, pageCount } = await generateBiaPdf(context, base, { impacts });
    const bytes = new TextDecoder('latin1').decode(new Uint8Array(await blob.arrayBuffer()));
    assert.ok(bytes.startsWith('%PDF-1.7'));
    assert.ok(pageCount >= context.slos.length + 2);
    assert.match(bytes, /%%EOF$/);
  });
});

describe('BIA explorer is reachable from the UI', () => {
  test('the router lists it and lands on it', async () => {
    const app = await readFile(path.join(HERE, '..', 'assets', 'js', 'app.js'), 'utf8');
    assert.match(app, /\{ id: 'bia'/);
    assert.match(app, /bia: \(\) => import\('\.\/views\/bia\.js'\)/);
    assert.match(app, /const DEFAULT_ROUTE = 'bia'/);
  });

  test('the view drives every engine entry point', async () => {
    const src = await readFile(path.join(HERE, '..', 'assets', 'js', 'views', 'bia.js'), 'utf8');
    for (const fn of ['computeBia(', 'connectedSet(', 'directLinks(', 'mitigationImpacts(', 'sloScoreTrend(', 'pivot(', 'generateBiaPdf(', 'ensureBusinessContext(store)']) {
      assert.ok(src.includes(fn), `views/bia.js must call ${fn}`);
    }
  });

  test('the executive dashboard honours BIA mitigations, and the stylesheet is loaded', async () => {
    const dash = await readFile(path.join(HERE, '..', 'assets', 'js', 'views', 'business.js'), 'utf8');
    assert.match(dash, /mitigationFindingIds\(/);
    const html = await readFile(path.join(HERE, '..', 'index.html'), 'utf8');
    assert.match(html, /href="assets\/css\/bia\.css"/);
    const store = await readFile(path.join(HERE, '..', 'assets', 'js', 'store.js'), 'utf8');
    assert.match(store, /biaMitigations: \[\]/);
  });
});
