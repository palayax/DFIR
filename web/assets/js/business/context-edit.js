// Immutable edits to a BusinessContext: adding a triage data source, changing
// SLOs / policy weights / risk appetite. Every function returns a NEW context
// (shallow copies of whatever changed) and never mutates its input, so the
// pristine ACME.Corp module object can always be restored ("Reset demo").
//
// A new data source is "triaged" from a posture checklist. Each ticked item
// becomes a register-level finding (the same shape the generator emits), with
// MITRE ATT&CK / OWASP references and an evidence record, so the new asset
// flows through the BIA engine exactly like the seeded estate.

export const DATA_SOURCE_TYPES = [
  { id: 'endpoint', label: 'Endpoint', cls: 'endpoint', icon: 'endpoint', connector: 'IRTriage.exe collection', site: true },
  { id: 'server', label: 'Server', cls: 'server', icon: 'server', connector: 'IRTriage.exe collection', site: true },
  { id: 'cloud', label: 'Cloud service', cls: 'cloud_resource', icon: 'cloud', connector: 'Cloud provider API', site: false },
  { id: 'saas', label: 'SaaS application', cls: 'saas', icon: 'system', connector: 'SaaS admin API', site: false },
  { id: 'api', label: 'API', cls: 'api', icon: 'api', connector: 'OpenAPI / gateway import', site: false },
  { id: 'network', label: 'Network device', cls: 'network_device', icon: 'network', connector: 'Config export', site: true },
  { id: 'iot', label: 'Peripheral / IoT device', cls: 'peripheral_iot', icon: 'iot', connector: 'Network discovery', site: true },
  { id: 'security', label: 'Security control', cls: 'security_control', icon: 'shield', connector: 'Vendor API', site: false },
  { id: 'darknet', label: 'Darknet monitoring', cls: 'darknet', icon: 'darknet', connector: 'Threat-intel feed', site: false },
  { id: 'audit', label: 'Operational / security audit log', cls: 'audit_log', icon: 'log', connector: 'Log pipeline', site: false },
];

// Posture checks offered when a data source is added. Fictional ids only.
export const POSTURE_CHECKS = [
  {
    id: 'kev', label: 'Known-exploited critical vulnerability (unpatched)', type: 'vulnerability', severity: 'critical', exploitability: 'known_exploited',
    title: (n) => `Known-exploited critical vulnerability on ${n} (ACME-VULN-2026-0450)`, vuln_id: 'ACME-VULN-2026-0450', cvss: 9.8, epss: 0.91,
    scenarios: ['RS-EXFIL', 'RS-RANSOM'], controls: ['CTL-02', 'CTL-03'], mitre: ['T1190'], owasp: ['A06:2021', 'Vulnerable and Outdated Components', 'https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/'],
    dims: ['availability', 'integrity', 'confidentiality'], action: 'Apply the vendor fix in an emergency change; rotate credentials it stored', cost: 12000, eta: 3, source: 'Vulnerability scanner',
  },
  {
    id: 'admin', label: 'Admin interface reachable from the internet', type: 'exposure', severity: 'high', exploitability: 'poc',
    title: (n) => `Administrative interface of ${n} reachable from the internet`, scenarios: ['RS-ATO', 'RS-RANSOM'], controls: ['CTL-16', 'CTL-37'],
    mitre: ['T1133'], owasp: ['A05:2021', 'Security Misconfiguration', 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/'],
    dims: ['confidentiality', 'integrity'], action: 'Restrict the management plane to the admin VPN', cost: 3000, eta: 2, source: 'Attack-surface scan',
  },
  {
    id: 'mfa', label: 'Shared admin account without MFA', type: 'misconfiguration', severity: 'critical', exploitability: 'known_exploited',
    title: (n) => `Shared administrator account on ${n} without MFA`, scenarios: ['RS-ATO'], controls: ['CTL-06', 'CTL-07'],
    mitre: ['T1078'], owasp: ['A07:2021', 'Identification and Authentication Failures', 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/'],
    dims: ['confidentiality', 'integrity'], action: 'Named accounts behind SSO with phishing-resistant MFA', cost: 6000, eta: 7, source: 'Identity posture scan',
  },
  {
    id: 'darknet', label: 'Credentials offered on a darknet market', type: 'ioc', severity: 'high', exploitability: 'known_exploited',
    title: (n) => `Credentials for ${n} offered on a dark-web market`, scenarios: ['RS-ATO', 'RS-EXFIL'], controls: ['CTL-06', 'CTL-12'],
    mitre: ['T1078'], owasp: ['A07:2021', 'Identification and Authentication Failures', 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/'],
    dims: ['confidentiality'], action: 'Rotate the credentials, invalidate sessions, hunt for their use', cost: 4000, eta: 1, source: 'Dark-web credential-leak monitoring',
  },
  {
    id: 'edr', label: 'Not covered by EDR', type: 'misconfiguration', severity: 'high', exploitability: 'poc',
    title: (n) => `${n} is not covered by EDR`, scenarios: ['RS-RANSOM'], controls: ['CTL-10'], mitre: ['T1562.001'], owasp: null,
    dims: ['integrity'], action: 'Deploy the EDR sensor and enable tamper protection', cost: 1500, eta: 2, source: 'IRTriage inventory vs EDR console',
  },
  {
    id: 'logging', label: 'Audit logs not forwarded to the SIEM', type: 'misconfiguration', severity: 'medium', exploitability: 'theoretical',
    title: (n) => `Audit logs of ${n} are not forwarded to the SIEM`, scenarios: ['RS-RANSOM', 'RS-INSIDER'], controls: ['CTL-11'], mitre: ['T1562.008'],
    owasp: ['A09:2021', 'Security Logging and Monitoring Failures', 'https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/'],
    dims: ['compliance'], action: 'Onboard the log source to the SIEM pipeline', cost: 2000, eta: 5, source: 'Log pipeline coverage check',
  },
  {
    id: 'public', label: 'Customer files readable publicly', type: 'exposure', severity: 'critical', exploitability: 'known_exploited',
    title: (n) => `Customer files on ${n} are publicly readable`, scenarios: ['RS-EXFIL'], controls: ['CTL-05', 'CTL-20'], mitre: ['T1530'],
    owasp: ['A01:2021', 'Broken Access Control', 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/'],
    dims: ['confidentiality'], action: 'Remove public access, review access logs, assess GDPR notification', cost: 5000, eta: 1, source: 'CSPM',
  },
];

const TECHNIQUE = {
  T1190: 'Exploit Public-Facing Application', T1133: 'External Remote Services', T1078: 'Valid Accounts',
  'T1562.001': 'Disable or Modify Tools', 'T1562.008': 'Disable or Modify Cloud Logs', T1530: 'Data from Cloud Storage',
};

/** The demo's high-risk data source: a partner file-transfer gateway. */
export const DEMO_DATA_SOURCE = {
  type: 'server',
  name: 'mft-gw01.acme.example (partner file-transfer gateway)',
  site: 'DUB',
  owner: 'Finance Systems',
  product: 'Managed file-transfer appliance',
  criticality: 'critical',
  internet_facing: true,
  service_ids: ['SVC-PORTAL', 'SVC-FIN'],
  component_ids: ['DATA-PII', 'SYS-PORTAL', 'SYS-ERP'],
  posture: ['kev', 'admin', 'mfa', 'darknet', 'edr'],
};

/** Demo business-context change: the board raises the bar. */
export const DEMO_SLO_CHANGES = [
  { slo_id: 'SLO-ARR', patch: { forecast: 157 }, note: 'A $4.5M expansion closes: the CRO raises the FY27 ARR plan forecast from $152.5M to $157M' },
  { slo_id: 'SLO-SLA', patch: { target: 99.7, warning: 99.8 }, note: 'New enterprise contracts tighten the SLA attainment target from 99.5% to 99.7%' },
];

async function sha256Hex(obj) {
  const bytes = new TextEncoder().encode(JSON.stringify(obj));
  const digest = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function nextId(existing, prefix, start) {
  let n = start;
  const ids = new Set(existing);
  while (ids.has(`${prefix}${n}`)) n++;
  return `${prefix}${n}`;
}

const bump = (ctx) => ({ ...ctx, revision: (ctx.revision || 0) + 1 });

/**
 * Add a data source and the findings its triage produced.
 * @returns {Promise<{ctx: object, asset: object, findings: object[]}>}
 */
export async function addDataSource(ctx, spec) {
  const type = DATA_SOURCE_TYPES.find((t) => t.id === spec.type) || DATA_SOURCE_TYPES[1];
  const assetId = nextId(ctx.assets.map((a) => a.id), 'NEW-', 1);
  const asOf = ctx.as_of;
  const asset = {
    id: assetId,
    name: spec.name || `${type.label} ${assetId}`,
    class: type.cls,
    site: type.site ? spec.site || 'BOS' : spec.cloud ? 'CLOUD' : 'SAAS',
    cloud: spec.cloud || null,
    environment: 'prod',
    owner: spec.owner || 'IT Operations',
    criticality: spec.criticality || 'high',
    internet_facing: !!spec.internet_facing,
    service_ids: spec.service_ids?.length ? [...spec.service_ids] : ['SVC-IT'],
    edr: type.cls === 'endpoint' || type.cls === 'server' ? !(spec.posture || []).includes('edr') : null,
    brand: spec.brand || null,
    product: spec.product || null,
    triage: { status: 'collected', collector: `${type.connector} (demo)`, last_collected: asOf },
    added: { by: 'Triage — add data source', on: asOf },
  };
  if (asset.internet_facing) asset.ip = '203.0.113.200';

  const riskIds = ctx.cyber_risks.map((r) => r.id);
  const findings = [];
  const evidence = [];
  let evSeq = ctx.evidence.length + 1;
  for (const checkId of spec.posture || []) {
    const c = POSTURE_CHECKS.find((x) => x.id === checkId);
    if (!c) continue;
    const id = nextId([...riskIds, ...findings.map((f) => f.id)], 'CR-', 900);
    const refs = c.mitre.map((t) => ({ framework: 'MITRE ATT&CK', id: t, name: TECHNIQUE[t] || t, url: `https://attack.mitre.org/techniques/${t.replace('.', '/')}/` }));
    if (c.owasp) refs.push({ framework: 'OWASP Top 10 (2021)', id: c.owasp[0], name: c.owasp[1], url: c.owasp[2] });
    const finding = {
      id, type: c.type, title: c.title(asset.name.split(' (')[0]), severity: c.severity, exploitability: c.exploitability,
      ...(c.vuln_id ? { vuln_id: c.vuln_id, cvss: c.cvss, epss: c.epss } : {}),
      asset_ids: [assetId], control_ids: [...c.controls], mitre_techniques: [...c.mitre], references: refs,
      first_seen: asOf, status: 'open', closed_on: null, source: c.source, owner: asset.owner, dimensions: [...c.dims],
      scenario_ids: [...c.scenarios], component_ids: [],
      remediation: { action: c.action, effort: 'low', cost_usd: c.cost, eta_days: c.eta },
    };
    findings.push(finding);
    const raw = { data_source: asset.name, check: c.label, result: 'fail', observed_at: `${asOf}T09:00:00Z`, connector: type.connector };
    evidence.push({
      id: `EV-${String(evSeq++).padStart(4, '0')}`, kind: c.type === 'ioc' ? 'alert' : c.type === 'vulnerability' ? 'scanner_result' : 'config_snapshot',
      source: c.source, collected_at: `${asOf}T09:00:00Z`, finding_ids: [id], hunt_id: null, asset_id: assetId,
      summary: `${c.label}: ${asset.name.split(' (')[0]}`, raw, sha256: await sha256Hex(raw),
    });
  }

  const comps = new Set(spec.component_ids || []);
  const next = {
    ...ctx,
    assets: [...ctx.assets, asset],
    cyber_risks: [...ctx.cyber_risks, ...findings],
    evidence: [...ctx.evidence, ...evidence],
    bp_components: ctx.bp_components.map((c) => (comps.has(c.id) ? { ...c, asset_ids: [...(c.asset_ids || []), assetId] } : c)),
    // Mitigation that would fix everything the new source brought in.
    mitigations: findings.length ? [...(ctx.mitigations || []), {
      id: nextId((ctx.mitigations || []).map((m) => m.id), 'MIT-', 90), title: `Harden ${asset.name.split(' (')[0]}`,
      description: `Remediate the ${findings.length} findings triage raised on the new data source.`,
      cost_usd: findings.reduce((s, f) => s + f.remediation.cost_usd, 0), eta_days: Math.max(...findings.map((f) => f.remediation.eta_days)),
      owner: asset.owner, finding_ids: findings.map((f) => f.id), scenario_factors: {}, status: 'proposed',
    }] : ctx.mitigations,
  };
  return { ctx: bump(next), asset, findings };
}

/** Remove a data source added in the session (and everything it brought). */
export function removeDataSource(ctx, assetId) {
  const fids = new Set(ctx.cyber_risks.filter((r) => r.asset_ids.length === 1 && r.asset_ids[0] === assetId).map((r) => r.id));
  return bump({
    ...ctx,
    assets: ctx.assets.filter((a) => a.id !== assetId),
    cyber_risks: ctx.cyber_risks.filter((r) => !fids.has(r.id)),
    evidence: ctx.evidence.filter((e) => !e.finding_ids.some((f) => fids.has(f))),
    bp_components: ctx.bp_components.map((c) => (c.asset_ids?.includes(assetId) ? { ...c, asset_ids: c.asset_ids.filter((x) => x !== assetId) } : c)),
    mitigations: (ctx.mitigations || []).filter((m) => !m.finding_ids.length || !m.finding_ids.every((f) => fids.has(f))),
  });
}

/** Patch one SLO (target, warning, plan forecast, financial basis, ...). */
export function updateSlo(ctx, sloId, patch) {
  return bump({ ...ctx, slos: ctx.slos.map((s) => (s.id === sloId ? { ...s, ...patch } : s)) });
}

/** Set the weight of one policy → SLO link (share of the SLO basis lost if the policy fails). */
export function updatePolicyWeight(ctx, policyId, sloId, weight) {
  return bump({
    ...ctx,
    bia_policies: ctx.bia_policies.map((p) => (p.id !== policyId ? p : {
      ...p, slo_links: p.slo_links.map((l) => (l.slo_id === sloId ? { ...l, weight } : l)),
    })),
  });
}

/** Patch the board's risk appetite. */
export function updateAppetite(ctx, patch) {
  return bump({ ...ctx, organization: { ...ctx.organization, risk_appetite: { ...ctx.organization.risk_appetite, ...patch } } });
}

/** Assets added during the session (for "new" badges and the demo). */
export function addedAssets(ctx) {
  return ctx.assets.filter((a) => a.added);
}
