#!/usr/bin/env node
// Generate the ACME.Corp business-risk mock dataset -> web/demo/acme/context.js
//
//   node scripts/gen-acme-dataset.mjs           # (re)write the committed payload
//   node scripts/gen-acme-dataset.mjs --check   # exit 1 if the committed payload is stale
//
// ACME.Corp is a FICTIONAL 500-employee cybersecurity company (MDR, threat-intel
// SaaS, professional services) with multi-cloud infrastructure, a mature CI/CD
// pipeline and BI stack, four sites and global GRC obligations. The dataset
// drives every layer of the web app's mockup: ingested triage inventory and
// business context (layer 1), the cyber-risk register (layer 2) and the
// executive business-risk dashboard (layer 3), which COMPUTES its figures from
// this data in web/assets/js/business/engine.js rather than reading them.
//
// SYNTHETIC DATA ONLY: names use the RFC 2606 .example TLD, public addresses
// come from the RFC 5737 documentation ranges, internal ones from RFC 1918.
// Vulnerability identifiers are fictional (ACME-VULN-*), never real CVE ids.
//
// Cyber risks are deliberately REGISTER-LEVEL (as a GRC / vulnerability /
// CSPM tool lists them, with ATT&CK technique ids as labels). This dataset
// contains no attack telemetry or procedures.

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { makeRng, rngTools, sortKeysDeep, parseGeneratorArgs, emitOutputs } from './lib/demo-common.mjs';

const SCRIPT = 'gen-acme-dataset.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(HERE, '..', 'web', 'demo', 'acme');

const SCHEMA_VERSION = '1.2.0';
const AS_OF = '2026-09-30';
// 12 monthly KPI points, oldest first, ending at AS_OF's month.
const MONTHS = ['2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09'];

const T = rngTools(makeRng(0xac3e0001));

// ---------------------------------------------------------------------------
// Organisation
// ---------------------------------------------------------------------------

const SITES = [
  { id: 'BOS', name: 'Headquarters', city: 'Boston, US', region: 'NA', employees: 200, role: 'HQ, SOC (NA), Sales, Finance', subnet: '10.10' },
  { id: 'DUB', name: 'EU Hub', city: 'Dublin, IE', region: 'EU', employees: 110, role: 'SOC (EU), EU data residency, Professional Services', subnet: '10.20' },
  { id: 'SIN', name: 'APAC Hub', city: 'Singapore, SG', region: 'APAC', employees: 60, role: 'SOC (APAC follow-the-sun), Sales', subnet: '10.30' },
  { id: 'TLV', name: 'R&D Center', city: 'Tel Aviv, IL', region: 'EMEA', employees: 90, role: 'Product engineering, Threat research, CI/CD', subnet: '10.40' },
  { id: 'REM', name: 'Remote workforce', city: 'Distributed', region: 'Global', employees: 40, role: 'Remote consultants and sales', subnet: '10.50' },
];

const ORGANIZATION = {
  name: 'ACME.Corp',
  legal_name: 'ACME Corporation (fictional)',
  domain: 'acme.example',
  industry: 'Cybersecurity — managed detection & response, threat-intelligence SaaS, professional services',
  employees: 500,
  annual_revenue_usd: 120000000,
  customers: 340,
  fiscal_year: 'FY2027 (Oct 2026 – Sep 2027)',
  sites: SITES.map(({ subnet, ...s }) => s),
  cloud_providers: ['AWS', 'Azure', 'GCP'],
  frameworks: ['ISO 27001:2022', 'SOC 2 Type II', 'NIST CSF 2.0', 'NIST SP 800-53 Rev. 5', 'FedRAMP Moderate', 'CIS Controls v8', 'GDPR', 'NIS2', 'PCI DSS 4.0'],
  risk_appetite: {
    statement: 'ACME accepts LOW risk to customer-facing service availability and customer data confidentiality, and MODERATE risk to internal operations, in pursuit of growth.',
    annual_value_at_risk_usd: 6000000,
    max_service_likelihood: 0.35,
    min_compliance_posture: 0.8,
    max_kpis_breached: 2,
    approved_by: 'Board of Directors',
    approved_on: '2026-06-18',
  },
  executives: [
    { role: 'CEO', name: 'Jordan Reyes' },
    { role: 'CFO', name: 'Priya Natarajan' },
    { role: 'COO', name: 'Marcus Feld' },
    { role: 'CTO', name: 'Noa Ben-Ami' },
    { role: 'CISO', name: 'Elena Kowalski' },
    { role: 'CRO (Revenue)', name: 'Sam Okafor' },
    { role: 'General Counsel', name: 'Hannah Lindqvist' },
  ],
};

const BUSINESS_GOALS = [
  { id: 'G1', title: 'Grow ARR 25% to $150M', owner: 'CEO', horizon: 'FY2027', kpi_ids: ['MDR-NRR', 'TIP-ARR', 'CRM-PIPE', 'CRM-WIN'] },
  { id: 'G2', title: 'Retain at least 95% of gross revenue', owner: 'CRO (Revenue)', horizon: 'FY2027', kpi_ids: ['CRM-CHURN', 'MDR-CSAT', 'POR-AVAIL', 'MDR-MTTD'] },
  { id: 'G3', title: 'Meet every contractual SLA for MDR and Portal customers', owner: 'COO', horizon: 'Continuous', kpi_ids: ['MDR-MTTD', 'MDR-MTTR', 'MDR-ESC', 'POR-AVAIL', 'TIP-AVAIL'] },
  { id: 'G4', title: 'Ship the EU sovereign MDR region (NIS2-ready) by Q2', owner: 'CTO', horizon: 'FY2027 Q2', kpi_ids: ['CI-DF', 'CI-LT', 'CI-CFR', 'CI-SBOM'] },
  { id: 'G5', title: 'Zero major non-conformities in ISO 27001 / SOC 2 / PCI audits', owner: 'CISO', horizon: 'FY2027', kpi_ids: ['FIN-PCI', 'IT-PATCH', 'IT-EDR', 'IAM-MFA', 'IAM-PRIV'] },
  { id: 'G6', title: 'Hold operating margin at or above 18%', owner: 'CFO', horizon: 'FY2027', kpi_ids: ['PS-UTIL', 'FIN-DSO', 'FIN-CLOSE'] },
];

// ---------------------------------------------------------------------------
// Business services (BIA)
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    id: 'SVC-MDR', name: 'Managed Detection & Response (MDR)', owner: 'COO', tier: 1,
    description: '24x7 follow-the-sun SOC monitoring customer environments; the largest revenue line.',
    rto_hours: 1, rpo_hours: 0.25, mtpd_hours: 4, annual_revenue_usd: 48000000, cost_of_downtime_per_hour_usd: 5500, customers: 210,
    data_classification: 'customer_confidential', depends_on: ['SVC-IAM'],
    sla: { contract: 'MDR Master Services Agreement v4', terms: 'MTTD within 15 min, MTTR within 60 min, platform 99.9%', penalty_usd: 900000, credit: '10% of monthly fee per breached month' },
    impact: { expected_outage_hours: 12, regulatory_usd: 1500000, recovery_usd: 400000, reputation_usd: 3000000 },
  },
  {
    id: 'SVC-TIP', name: 'Threat-Intelligence Platform (SaaS)', owner: 'CTO', tier: 1,
    description: 'Multi-tenant SaaS delivering curated threat intelligence via portal and API.',
    rto_hours: 4, rpo_hours: 1, mtpd_hours: 24, annual_revenue_usd: 22000000, cost_of_downtime_per_hour_usd: 2500, customers: 180,
    data_classification: 'customer_confidential', depends_on: ['SVC-IAM'],
    sla: { contract: 'TIP Subscription Terms v2', terms: 'API 99.95%, feed freshness within 30 min', penalty_usd: 350000, credit: '5% of annual fee per breached quarter' },
    impact: { expected_outage_hours: 16, regulatory_usd: 500000, recovery_usd: 250000, reputation_usd: 1500000 },
  },
  {
    id: 'SVC-PORTAL', name: 'Customer Portal & API', owner: 'CTO', tier: 1,
    description: 'Single customer entry point for MDR cases, reports, TIP access and billing; holds customer PII.',
    rto_hours: 2, rpo_hours: 0.5, mtpd_hours: 8, annual_revenue_usd: 15000000, cost_of_downtime_per_hour_usd: 3200, customers: 340,
    data_classification: 'customer_pii', depends_on: ['SVC-IAM'],
    sla: { contract: 'Customer Portal SLA (all contracts)', terms: 'Availability 99.95% monthly', penalty_usd: 600000, credit: 'Tiered service credits up to 25%' },
    impact: { expected_outage_hours: 10, regulatory_usd: 2500000, recovery_usd: 300000, reputation_usd: 2000000 },
  },
  {
    id: 'SVC-CICD', name: 'Product Build & Release (CI/CD)', owner: 'CTO', tier: 2,
    description: 'Source, build, test, sign and deploy pipeline for every ACME product; supply-chain integrity critical.',
    rto_hours: 8, rpo_hours: 4, mtpd_hours: 72, annual_revenue_usd: 0, cost_of_downtime_per_hour_usd: 1800, customers: 0,
    data_classification: 'source_code', depends_on: ['SVC-IAM'],
    sla: null,
    impact: { expected_outage_hours: 24, regulatory_usd: 0, recovery_usd: 350000, reputation_usd: 2500000 },
  },
  {
    id: 'SVC-PS', name: 'Professional Services (IR & Assessments)', owner: 'COO', tier: 2,
    description: 'Incident-response retainers, penetration testing and compliance assessments.',
    rto_hours: 24, rpo_hours: 8, mtpd_hours: 120, annual_revenue_usd: 18000000, cost_of_downtime_per_hour_usd: 2100, customers: 95,
    data_classification: 'customer_confidential', depends_on: ['SVC-IAM', 'SVC-IT'],
    sla: { contract: 'IR Retainer Agreement', terms: 'Responder engaged within 2 h', penalty_usd: 200000, credit: 'Retainer hours credited' },
    impact: { expected_outage_hours: 24, regulatory_usd: 400000, recovery_usd: 100000, reputation_usd: 800000 },
  },
  {
    id: 'SVC-CRM', name: 'Sales & CRM', owner: 'CRO (Revenue)', tier: 2,
    description: 'Pipeline, quoting and renewals across all regions, fed by the corporate website (lead generation).',
    rto_hours: 24, rpo_hours: 4, mtpd_hours: 72, annual_revenue_usd: 0, cost_of_downtime_per_hour_usd: 2500, customers: 0,
    data_classification: 'internal_confidential', depends_on: ['SVC-IAM'],
    sla: null,
    impact: { expected_outage_hours: 24, regulatory_usd: 150000, recovery_usd: 80000, reputation_usd: 300000 },
  },
  {
    id: 'SVC-FIN', name: 'Finance & Billing', owner: 'CFO', tier: 2,
    description: 'Invoicing, card payments, revenue recognition and close; PCI DSS scope.',
    rto_hours: 12, rpo_hours: 1, mtpd_hours: 72, annual_revenue_usd: 0, cost_of_downtime_per_hour_usd: 3000, customers: 0,
    data_classification: 'cardholder_financial', depends_on: ['SVC-IAM'],
    sla: null,
    impact: { expected_outage_hours: 20, regulatory_usd: 1200000, recovery_usd: 150000, reputation_usd: 500000 },
  },
  {
    id: 'SVC-BI', name: 'BI & Decision Support', owner: 'CFO', tier: 3,
    description: 'Data warehouse and executive dashboards feeding board reporting and pricing decisions.',
    rto_hours: 48, rpo_hours: 24, mtpd_hours: 168, annual_revenue_usd: 0, cost_of_downtime_per_hour_usd: 600, customers: 0,
    data_classification: 'employee_pii', depends_on: ['SVC-IAM'],
    sla: null,
    impact: { expected_outage_hours: 48, regulatory_usd: 400000, recovery_usd: 80000, reputation_usd: 200000 },
  },
  {
    id: 'SVC-IAM', name: 'Identity & Access (SSO, Directory, HR)', owner: 'CISO', tier: 1,
    description: 'Workforce identity, SSO, directory and HR system of record; every other service depends on it.',
    rto_hours: 2, rpo_hours: 1, mtpd_hours: 8, annual_revenue_usd: 0, cost_of_downtime_per_hour_usd: 9000, customers: 0,
    data_classification: 'employee_pii', depends_on: [],
    sla: null,
    impact: { expected_outage_hours: 8, regulatory_usd: 600000, recovery_usd: 300000, reputation_usd: 1000000 },
  },
  {
    id: 'SVC-IT', name: 'Corporate IT & Collaboration', owner: 'COO', tier: 3,
    description: 'Endpoints, email, collaboration, networks and facilities systems at every site.',
    rto_hours: 8, rpo_hours: 24, mtpd_hours: 72, annual_revenue_usd: 0, cost_of_downtime_per_hour_usd: 2500, customers: 0,
    data_classification: 'internal_confidential', depends_on: ['SVC-IAM'],
    sla: null,
    impact: { expected_outage_hours: 16, regulatory_usd: 100000, recovery_usd: 120000, reputation_usd: 200000 },
  },
];

// ---------------------------------------------------------------------------
// KPIs / SLOs / SLAs
// columns: id, service, name, kind, unit, direction(+1 higher-better, -1 lower-better),
//          target, warning, current, start(12 months ago), decimals, degradation(at P=1),
//          sensitivity {dim: weight}, source type, source system
// ---------------------------------------------------------------------------

const A = 'availability', I = 'integrity', C = 'confidentiality', D = 'delivery', K = 'compliance';

const KPI_ROWS = [
  ['MDR-MTTD', 'SVC-MDR', 'Mean time to detect (P1)', 'sla', 'min', -1, 15, 12, 11.4, 13.1, 1, 9, { [A]: 1, [I]: 0.6 }, 'bi', 'Power BI — SOC Performance'],
  ['MDR-MTTR', 'SVC-MDR', 'Mean time to respond (P1)', 'sla', 'min', -1, 60, 50, 47, 55, 0, 35, { [A]: 1, [I]: 0.5 }, 'bi', 'Power BI — SOC Performance'],
  ['MDR-AVAIL', 'SVC-MDR', 'SOC platform availability', 'slo', '%', 1, 99.9, 99.93, 99.95, 99.92, 2, 0.35, { [A]: 1 }, 'bi', 'Power BI — SRE'],
  ['MDR-ESC', 'SVC-MDR', 'P1 escalations within 15 min', 'sla', '%', 1, 98, 98.5, 98.6, 97.9, 1, 5, { [A]: 0.8, [I]: 0.4 }, 'contract', 'MDR MSA v4 §6.2'],
  ['MDR-NRR', 'SVC-MDR', 'MDR net revenue retention', 'kpi', '%', 1, 110, 112, 113, 108, 0, 9, { [C]: 1, [A]: 0.6 }, 'business_owner', 'COO quarterly business review'],
  ['MDR-CSAT', 'SVC-MDR', 'Customer satisfaction', 'kpi', '/5', 1, 4.5, 4.55, 4.62, 4.48, 2, 0.45, { [A]: 0.6, [C]: 0.8 }, 'bi', 'Power BI — Customer Success'],
  ['TIP-AVAIL', 'SVC-TIP', 'API availability', 'sla', '%', 1, 99.95, 99.96, 99.97, 99.95, 2, 0.28, { [A]: 1 }, 'contract', 'TIP Subscription Terms v2'],
  ['TIP-LAT', 'SVC-TIP', 'API p95 latency', 'slo', 'ms', -1, 400, 350, 310, 360, 0, 220, { [A]: 0.8 }, 'bi', 'Power BI — SRE'],
  ['TIP-FRESH', 'SVC-TIP', 'Intel feed freshness', 'sla', 'min', -1, 30, 25, 21, 27, 0, 22, { [A]: 0.7, [I]: 0.8 }, 'contract', 'TIP Subscription Terms v2'],
  ['TIP-ARR', 'SVC-TIP', 'TIP annual recurring revenue', 'kpi', '$M', 1, 22, 21, 21.6, 18.9, 1, 2.6, { [C]: 1, [I]: 0.5 }, 'bi', 'Power BI — Revenue'],
  ['POR-AVAIL', 'SVC-PORTAL', 'Portal availability (monthly)', 'sla', '%', 1, 99.95, 99.96, 99.962, 99.97, 3, 0.32, { [A]: 1 }, 'contract', 'Customer Portal SLA'],
  ['POR-ERR', 'SVC-PORTAL', 'API error rate (5xx)', 'slo', '%', -1, 0.5, 0.4, 0.31, 0.28, 2, 0.7, { [A]: 0.8, [I]: 0.5 }, 'bi', 'Power BI — SRE'],
  ['POR-LOGIN', 'SVC-PORTAL', 'Customer login success', 'slo', '%', 1, 99, 99.2, 99.4, 99.5, 1, 2.8, { [A]: 0.9, [C]: 0.4 }, 'bi', 'Power BI — SRE'],
  ['POR-DATA', 'SVC-PORTAL', 'Customer-data exposure incidents', 'kpi', 'count', -1, 0, 0, 0, 0, 0, 2, { [C]: 1 }, 'business_owner', 'Privacy Office register'],
  ['CI-DF', 'SVC-CICD', 'Deployment frequency', 'kpi', '/week', 1, 40, 42, 46, 31, 0, 28, { [D]: 1, [I]: 0.5 }, 'bi', 'Power BI — Engineering (DORA)'],
  ['CI-LT', 'SVC-CICD', 'Lead time for changes', 'kpi', 'h', -1, 24, 20, 18, 29, 0, 26, { [D]: 1 }, 'bi', 'Power BI — Engineering (DORA)'],
  ['CI-CFR', 'SVC-CICD', 'Change failure rate', 'kpi', '%', -1, 15, 13, 11, 14, 0, 9, { [D]: 0.7, [I]: 1 }, 'bi', 'Power BI — Engineering (DORA)'],
  ['CI-REC', 'SVC-CICD', 'Failed deployment recovery time', 'kpi', 'h', -1, 1, 0.8, 0.7, 1.2, 1, 2.5, { [D]: 1, [A]: 0.4 }, 'bi', 'Power BI — Engineering (DORA)'],
  ['CI-SBOM', 'SVC-CICD', 'Releases signed with SBOM', 'slo', '%', 1, 100, 99, 96, 88, 0, 25, { [I]: 1, [K]: 0.8 }, 'bi', 'Power BI — Engineering'],
  ['PS-UTIL', 'SVC-PS', 'Billable utilisation', 'kpi', '%', 1, 75, 76, 78, 72, 0, 9, { [A]: 0.6, [C]: 0.5 }, 'bi', 'Power BI — Services'],
  ['PS-BACKLOG', 'SVC-PS', 'Contracted backlog', 'kpi', '$M', 1, 8, 8.5, 9.2, 7.1, 1, 1.8, { [C]: 0.8 }, 'bi', 'Power BI — Services'],
  ['PS-RESP', 'SVC-PS', 'IR retainer responder engaged within 2 h', 'sla', '%', 1, 95, 96, 97, 94, 0, 8, { [A]: 1 }, 'contract', 'IR Retainer Agreement'],
  ['CRM-PIPE', 'SVC-CRM', 'Pipeline coverage', 'kpi', 'x', 1, 3, 3.2, 3.4, 2.8, 1, 0.6, { [A]: 0.6, [C]: 0.7 }, 'bi', 'Power BI — Revenue'],
  ['CRM-WIN', 'SVC-CRM', 'Win rate', 'kpi', '%', 1, 28, 29, 29.5, 26, 1, 4.5, { [C]: 0.9 }, 'bi', 'Power BI — Revenue'],
  ['CRM-CHURN', 'SVC-CRM', 'Gross logo churn (trailing 12m)', 'kpi', '%', -1, 8, 7.5, 6.9, 8.6, 1, 3.8, { [C]: 1, [A]: 0.5 }, 'bi', 'Power BI — Revenue'],
  ['FIN-DSO', 'SVC-FIN', 'Days sales outstanding', 'kpi', 'days', -1, 45, 42, 41, 47, 0, 11, { [A]: 1, [I]: 0.5 }, 'bi', 'Power BI — Finance'],
  ['FIN-CLOSE', 'SVC-FIN', 'Month-end close cycle', 'kpi', 'days', -1, 6, 5.5, 5, 7, 1, 3.5, { [A]: 0.8, [I]: 0.8 }, 'business_owner', 'CFO close calendar'],
  ['FIN-PCI', 'SVC-FIN', 'PCI DSS requirements in place', 'kpi', '%', 1, 100, 100, 100, 100, 0, 9, { [K]: 1, [C]: 0.6 }, 'business_owner', 'QSA readiness tracker'],
  ['FIN-BILL', 'SVC-FIN', 'Billing accuracy', 'kpi', '%', 1, 99.5, 99.6, 99.7, 99.4, 1, 1.4, { [I]: 1 }, 'bi', 'Power BI — Finance'],
  ['IT-PATCH', 'SVC-IT', 'Critical patches applied within 14 days', 'slo', '%', 1, 95, 96, 88, 93, 0, 12, { [K]: 1, [A]: 0.5 }, 'bi', 'Power BI — IT Operations'],
  ['IT-EDR', 'SVC-IT', 'EDR coverage (managed endpoints)', 'slo', '%', 1, 99, 99.3, 96.6, 98.8, 1, 4, { [K]: 1, [I]: 0.7 }, 'bi', 'Power BI — Security Operations'],
  ['IT-PHISH', 'SVC-IT', 'Phishing simulation click rate', 'kpi', '%', -1, 3, 2.7, 2.4, 3.8, 1, 2.5, { [C]: 0.7 }, 'bi', 'Power BI — Awareness'],
  ['IT-DESK', 'SVC-IT', 'Service desk resolution within SLA', 'sla', '%', 1, 90, 91, 92, 89, 0, 9, { [A]: 1 }, 'bi', 'Power BI — IT Operations'],
];

// Services with NO KPIs supplied by the business. The mockup shows KPIs the AI
// layer proposed from the business context (BIA, policies, architecture), each
// carrying its rationale. Deterministic, pre-authored for the mockup.
const GENERATED_KPI_ROWS = [
  ['BI-FRESH', 'SVC-BI', 'Executive dashboard data freshness', 'slo', 'h', -1, 24, 18, 14, 16, 0, 30, { [A]: 1, [I]: 0.6 }, 'Board pack and pricing decisions read the warehouse daily; BIA RPO is 24 h.'],
  ['BI-ACC', 'SVC-BI', 'Report reconciliation accuracy', 'kpi', '%', 1, 99.5, 99.6, 99.7, 99.5, 1, 1.5, { [I]: 1 }, 'Finance policy FP-07 requires board figures to reconcile to the ledger.'],
  ['BI-PII', 'SVC-BI', 'Warehouse datasets with HR/PII access trimmed', 'slo', '%', 1, 100, 98, 81, 74, 0, 15, { [C]: 1, [K]: 0.8 }, 'BIA classifies the warehouse as employee-PII; GDPR Art. 5(1)(c) data minimisation.'],
  ['IAM-MFA', 'SVC-IAM', 'Workforce accounts with phishing-resistant MFA', 'slo', '%', 1, 100, 99, 97.1, 91, 1, 6, { [C]: 1, [K]: 1 }, 'Every tier-1 service depends on IAM; ISO A.8.5 and NIS2 Art. 21(2)(j) require MFA.'],
  ['IAM-JML', 'SVC-IAM', 'Leaver access removed within 24 h', 'sla', '%', 1, 98, 98.5, 93.5, 95, 1, 9, { [C]: 1, [K]: 0.8 }, 'HR policy HR-12 and SOC 2 CC6.2; leavers retain customer-data access otherwise.'],
  ['IAM-PRIV', 'SVC-IAM', 'Privileged access reviewed this quarter', 'kpi', '%', 1, 100, 95, 89, 100, 0, 20, { [C]: 0.8, [I]: 1, [K]: 1 }, 'ISO A.8.2 / PCI 7.2.4 quarterly review; MDR operators hold customer-environment access.'],
];

function kpiHistory(start, current, decimals, amplitude) {
  const out = [];
  for (let i = 0; i < MONTHS.length; i++) {
    let v;
    if (i === MONTHS.length - 1) v = current;
    else {
      const base = start + ((current - start) * i) / (MONTHS.length - 1);
      v = base + (T.rng() - 0.5) * amplitude;
    }
    out.push({ month: MONTHS[i], value: T.round(v, decimals) });
  }
  return out;
}

// KPIs the built-in story threatens keep their full degradation; the rest are
// damped so the dashboard separates "the SLAs in trouble" from background noise.
const STORY_KPIS = new Set(['MDR-MTTD', 'MDR-MTTR', 'MDR-AVAIL', 'MDR-NRR', 'POR-AVAIL', 'POR-DATA', 'POR-LOGIN', 'CI-CFR', 'CI-DF', 'CI-LT', 'TIP-AVAIL', 'FIN-PCI']);

function buildKpis() {
  const kpis = [];
  for (const [id, svc, name, kind, unit, dir, target, warning, current, start, decimals, rawDegradation, sensitivity, srcType, srcSystem] of KPI_ROWS) {
    const degradation = STORY_KPIS.has(id) ? rawDegradation : T.round(rawDegradation * 0.5, 3);
    const amp = Math.abs(current - start) * 0.35 + Math.abs(target) * 0.0015;
    kpis.push({
      id, service_id: svc, name, kind, unit, direction: dir > 0 ? 'higher_is_better' : 'lower_is_better',
      target, warning, current, decimals, degradation_at_full_risk: degradation, sensitivity,
      history: kpiHistory(start, current, decimals, amp),
      source: { type: srcType, system: srcSystem },
    });
  }
  for (const [id, svc, name, kind, unit, dir, target, warning, current, start, decimals, degradation, sensitivity, rationale] of GENERATED_KPI_ROWS) {
    const amp = Math.abs(current - start) * 0.35 + Math.abs(target) * 0.0015;
    kpis.push({
      id, service_id: svc, name, kind, unit, direction: dir > 0 ? 'higher_is_better' : 'lower_is_better',
      target, warning, current, decimals, degradation_at_full_risk: degradation, sensitivity,
      history: kpiHistory(start, current, decimals, amp),
      source: { type: 'generated', system: 'AI KPI generator (mock)' },
      generation: {
        reason: 'No KPI was supplied for this service by the business owner.',
        rationale,
        inputs: ['BIA 2026', 'Information Security Policy', 'Asset inventory'],
        confidence: 'moderate',
        status: 'proposed — awaiting owner approval',
      },
    });
  }
  return kpis;
}

// ---------------------------------------------------------------------------
// Assets (triage inventory)
// ---------------------------------------------------------------------------

const assets = [];
const byId = new Map();
let publicIpSeq = 10;

function publicIp() {
  // RFC 5737 TEST-NET-3 for ACME's internet-facing endpoints.
  publicIpSeq += 1;
  return `203.0.113.${publicIpSeq}`;
}

function triageFor(cls) {
  if (cls === 'endpoint' || cls === 'server') {
    const r = T.rng();
    const status = r < 0.9 ? 'collected' : r < 0.96 ? 'stale' : 'not_collected';
    const day = status === 'collected' ? T.int(20, 30) : T.int(1, 19);
    return { status, collector: 'IRTriage.exe (basic profile)', last_collected: status === 'not_collected' ? null : `2026-09-${String(day).padStart(2, '0')}` };
  }
  if (cls === 'cloud_resource') return { status: 'collected', collector: 'Cloud API (mock)', last_collected: '2026-09-30' };
  if (cls === 'saas' || cls === 'ai_system' || cls === 'security_control' || cls === 'cicd') return { status: 'collected', collector: 'API connector (mock)', last_collected: '2026-09-30' };
  if (cls === 'network_device') return { status: 'collected', collector: 'Config export (mock)', last_collected: '2026-09-28' };
  if (cls === 'api') return { status: 'collected', collector: 'API schema & gateway import (mock)', last_collected: '2026-09-30' };
  if (cls === 'darknet') return { status: 'collected', collector: 'Threat-intel feed (mock)', last_collected: '2026-09-30' };
  if (cls === 'audit_log') return { status: 'collected', collector: 'Log pipeline (mock)', last_collected: '2026-09-30' };
  return { status: T.chance(0.7) ? 'collected' : 'not_collected', collector: 'Network discovery (mock)', last_collected: '2026-09-27' };
}

function addAsset(a) {
  if (byId.has(a.id)) throw new Error(`duplicate asset id ${a.id}`);
  const full = {
    environment: 'corp', cloud: null, internet_facing: false, criticality: 'medium', edr: null,
    ...a,
  };
  if (full.internet_facing && !full.ip) full.ip = publicIp();
  full.triage = triageFor(full.class);
  assets.push(full);
  byId.set(full.id, full);
  return full;
}

function siteSubnet(site) {
  return SITES.find((s) => s.id === site).subnet;
}

function buildAssets() {
  // --- servers ---
  const srv = (id, name, site, svcs, crit, extra = {}) =>
    addAsset({ id, name, class: 'server', site, service_ids: svcs, criticality: crit, platform: 'Windows Server 2022', ip: `${siteSubnet(site)}.1.${T.int(10, 250)}`, edr: true, owner: 'IT Infrastructure', ...extra });
  srv('SRV-BOS-DC01', 'dc01.acme.example', 'BOS', ['SVC-IAM', 'SVC-IT'], 'critical');
  srv('SRV-BOS-DC02', 'dc02.acme.example', 'BOS', ['SVC-IAM', 'SVC-IT'], 'critical');
  srv('SRV-DUB-DC01', 'dc-dub01.acme.example', 'DUB', ['SVC-IAM', 'SVC-IT'], 'critical');
  srv('SRV-SIN-DC01', 'dc-sin01.acme.example', 'SIN', ['SVC-IAM', 'SVC-IT'], 'critical');
  srv('SRV-TLV-DC01', 'dc-tlv01.acme.example', 'TLV', ['SVC-IAM', 'SVC-IT'], 'critical');
  srv('SRV-BOS-JMP01', 'soc-jump01.acme.example', 'BOS', ['SVC-MDR'], 'critical', { owner: 'SOC Engineering' });
  srv('SRV-DUB-JMP01', 'soc-jump-dub01.acme.example', 'DUB', ['SVC-MDR'], 'critical', { owner: 'SOC Engineering' });
  srv('SRV-SIN-JMP01', 'soc-jump-sin01.acme.example', 'SIN', ['SVC-MDR'], 'critical', { owner: 'SOC Engineering' });
  srv('SRV-BOS-SOAR01', 'soar01.acme.example', 'BOS', ['SVC-MDR'], 'critical', { platform: 'Ubuntu 22.04', owner: 'SOC Engineering' });
  for (let i = 1; i <= 4; i++) srv(`SRV-TLV-BLD0${i}`, `build0${i}.rnd.acme.example`, 'TLV', ['SVC-CICD'], 'high', { platform: 'Ubuntu 22.04', owner: 'Platform Engineering' });
  srv('SRV-BOS-FS01', 'fs01.acme.example', 'BOS', ['SVC-IT'], 'medium');
  srv('SRV-DUB-FS01', 'fs-dub01.acme.example', 'DUB', ['SVC-IT', 'SVC-PS'], 'high');
  srv('SRV-BOS-PRN01', 'print01.acme.example', 'BOS', ['SVC-IT'], 'low', { platform: 'Windows Server 2016' });
  srv('SRV-DUB-SQL01', 'finsql-dub01.acme.example', 'DUB', ['SVC-FIN'], 'critical', { owner: 'Finance Systems' });
  srv('SRV-BOS-BKP01', 'backup01.acme.example', 'BOS', ['SVC-IT', 'SVC-FIN', 'SVC-IAM'], 'critical');
  srv('SRV-BOS-HR01', 'hris-sync01.acme.example', 'BOS', ['SVC-IAM'], 'high', { owner: 'HR Systems' });
  srv('SRV-BOS-PKI01', 'pki01.acme.example', 'BOS', ['SVC-IAM', 'SVC-CICD'], 'critical');
  srv('SRV-DUB-PS01', 'ps-tools-dub01.acme.example', 'DUB', ['SVC-PS'], 'high', { platform: 'Ubuntu 22.04', owner: 'Professional Services' });
  srv('SRV-BOS-LEGACY01', 'legacy-erp01.acme.example', 'BOS', ['SVC-FIN'], 'medium', { platform: 'Windows Server 2012 R2' });
  srv('SRV-SIN-FS01', 'fs-sin01.acme.example', 'SIN', ['SVC-IT'], 'medium', { platform: 'Windows Server 2016' });
  const utilSites = ['BOS', 'BOS', 'DUB', 'SIN', 'TLV'];
  for (let i = 1; i <= 22; i++) {
    const site = utilSites[i % utilSites.length];
    srv(`SRV-${site}-UTL${String(i).padStart(2, '0')}`, `util${String(i).padStart(2, '0')}.${site.toLowerCase()}.acme.example`, site, ['SVC-IT'], T.pick(['low', 'medium', 'medium']), {
      platform: T.pick(['Windows Server 2022', 'Windows Server 2019', 'Ubuntu 22.04', 'Ubuntu 20.04', 'RHEL 9']),
      edr: T.chance(0.93),
    });
  }

  // --- cloud ---
  const cloud = (id, name, cloudName, subtype, svcs, crit, extra = {}) =>
    addAsset({ id, name, class: 'cloud_resource', subtype, cloud: cloudName, site: 'CLOUD', environment: 'prod', service_ids: svcs, criticality: crit, owner: 'Cloud Platform', ...extra });
  cloud('AWS-ACCT-MDR', 'aws: mdr-prod (account)', 'aws', 'account', ['SVC-MDR'], 'critical');
  cloud('AWS-EKS-MDR', 'aws: mdr-ingest (EKS)', 'aws', 'kubernetes', ['SVC-MDR'], 'critical', { region: 'us-east-1' });
  cloud('AWS-MSK-MDR', 'aws: mdr-stream (MSK)', 'aws', 'streaming', ['SVC-MDR'], 'critical', { region: 'us-east-1' });
  cloud('AWS-S3-MDR-TEL', 'aws: s3://acme-mdr-telemetry', 'aws', 'object_storage', ['SVC-MDR'], 'critical', { region: 'us-east-1' });
  cloud('AWS-EKS-MDR-EU', 'aws: mdr-ingest-eu (EKS)', 'aws', 'kubernetes', ['SVC-MDR'], 'critical', { region: 'eu-west-1' });
  cloud('AWS-ACCT-TIP', 'aws: tip-prod (account)', 'aws', 'account', ['SVC-TIP'], 'critical');
  cloud('AWS-EKS-TIP', 'aws: tip-api (EKS)', 'aws', 'kubernetes', ['SVC-TIP'], 'critical', { region: 'us-east-1' });
  cloud('AWS-APIGW-TIP', 'aws: api.tip.acme.example (API Gateway)', 'aws', 'api_gateway', ['SVC-TIP'], 'critical', { internet_facing: true });
  cloud('AWS-RDS-TIP', 'aws: tip-db (RDS PostgreSQL)', 'aws', 'database', ['SVC-TIP'], 'critical');
  cloud('AWS-ACCT-PORTAL', 'aws: portal-prod (account)', 'aws', 'account', ['SVC-PORTAL'], 'critical');
  cloud('AWS-ALB-PORTAL', 'aws: portal.acme.example (ALB)', 'aws', 'load_balancer', ['SVC-PORTAL'], 'critical', { internet_facing: true });
  cloud('AWS-ECS-PORTAL-API', 'aws: portal-api (ECS)', 'aws', 'container_service', ['SVC-PORTAL'], 'critical');
  cloud('AWS-RDS-PORTAL', 'aws: portal-db (RDS)', 'aws', 'database', ['SVC-PORTAL'], 'critical');
  cloud('AWS-S3-PORTAL-EXP', 'aws: s3://acme-portal-exports', 'aws', 'object_storage', ['SVC-PORTAL'], 'high');
  cloud('AWS-ACCT-SHARED', 'aws: shared-services (account)', 'aws', 'account', ['SVC-IT', 'SVC-CICD'], 'high');
  cloud('AWS-S3-LOGS', 'aws: s3://acme-central-logs', 'aws', 'object_storage', ['SVC-MDR', 'SVC-IT'], 'high');
  cloud('AWS-ECR', 'aws: container registry (ECR)', 'aws', 'registry', ['SVC-CICD'], 'high');
  cloud('AZ-SUB-CORP', 'azure: corp (subscription)', 'azure', 'subscription', ['SVC-IT'], 'high');
  cloud('AZ-SUB-BI', 'azure: analytics (subscription)', 'azure', 'subscription', ['SVC-BI'], 'high');
  cloud('AZ-SYN-BI', 'azure: acme-dw (Synapse)', 'azure', 'data_warehouse', ['SVC-BI'], 'high');
  cloud('AZ-STG-BI', 'azure: acmebilake (Storage)', 'azure', 'object_storage', ['SVC-BI'], 'high');
  cloud('AZ-SQL-FIN', 'azure: fin-billing (Azure SQL)', 'azure', 'database', ['SVC-FIN'], 'critical');
  cloud('AZ-APP-BILLING', 'azure: pay.acme.example (App Service)', 'azure', 'web_app', ['SVC-FIN'], 'critical', { internet_facing: true });
  cloud('AZ-AKS-PS', 'azure: ps-tooling (AKS)', 'azure', 'kubernetes', ['SVC-PS'], 'medium');
  cloud('AZ-KV-CORP', 'azure: kv-corp (Key Vault)', 'azure', 'secrets', ['SVC-IT', 'SVC-FIN'], 'high');
  cloud('AZ-APPGW-PORTAL-EU', 'azure: eu.portal.acme.example (App Gateway + WAF)', 'azure', 'load_balancer', ['SVC-PORTAL'], 'critical', { internet_facing: true });
  cloud('GCP-PRJ-TIP', 'gcp: tip-analytics (project)', 'gcp', 'project', ['SVC-TIP'], 'high');
  cloud('GCP-BQ-TIP', 'gcp: tip_intel (BigQuery)', 'gcp', 'data_warehouse', ['SVC-TIP'], 'high');
  cloud('GCP-GKE-TIP-ML', 'gcp: tip-ml (GKE)', 'gcp', 'kubernetes', ['SVC-TIP'], 'high');
  cloud('GCP-GCS-TIP-FEEDS', 'gcp: gs://acme-tip-feeds', 'gcp', 'object_storage', ['SVC-TIP'], 'high');
  cloud('WEB-CDN', 'aws: www.acme.example (CDN distribution)', 'aws', 'cdn', ['SVC-CRM'], 'high', { internet_facing: true, owner: 'Marketing Technology' });
  cloud('WEB-ORIGIN', 'aws: www-origin (marketing CMS origin)', 'aws', 'vm', ['SVC-CRM'], 'medium', { internet_facing: true, owner: 'Marketing Technology' });

  // --- SaaS ---
  const saas = (id, name, svcs, crit) => addAsset({ id, name, class: 'saas', site: 'SAAS', service_ids: svcs, criticality: crit, owner: 'IT Applications', internet_facing: false });
  saas('SAAS-IDP', 'Workforce identity provider (SSO)', ['SVC-IAM'], 'critical');
  saas('SAAS-HRIS', 'HR information system', ['SVC-IAM'], 'high');
  saas('SAAS-CODE', 'Source-code hosting (enterprise)', ['SVC-CICD'], 'critical');
  saas('SAAS-CRM', 'CRM platform', ['SVC-CRM'], 'high');
  saas('SAAS-COLLAB', 'Email & collaboration suite', ['SVC-IT'], 'high');
  saas('SAAS-BI', 'BI & dashboards (Power BI)', ['SVC-BI'], 'medium');
  saas('SAAS-ITSM', 'ITSM & GRC (ServiceNow)', ['SVC-IT'], 'medium');
  saas('SAAS-PAY', 'Payment processor', ['SVC-FIN'], 'critical');
  saas('SAAS-CHAT', 'Team chat', ['SVC-IT', 'SVC-MDR'], 'medium');
  saas('SAAS-TRACK', 'Issue tracking (Jira)', ['SVC-CICD', 'SVC-IT'], 'medium');

  // --- CI/CD ---
  const ci = (id, name, crit, extra = {}) => addAsset({ id, name, class: 'cicd', site: 'TLV', service_ids: ['SVC-CICD'], criticality: crit, owner: 'Platform Engineering', ...extra });
  for (let i = 1; i <= 6; i++) ci(`CICD-RUNNER-0${i}`, `self-hosted runner ${i}`, 'high', { platform: 'Ubuntu 22.04' });
  ci('CICD-ARTIFACTS', 'Artifact repository', 'critical');
  ci('CICD-VAULT', 'Secrets manager (Vault)', 'critical', { service_ids: ['SVC-CICD', 'SVC-MDR', 'SVC-TIP'] });
  ci('CICD-ARGO', 'GitOps deployer (Argo CD)', 'critical', { service_ids: ['SVC-CICD', 'SVC-TIP', 'SVC-PORTAL'] });
  ci('CICD-SIGN', 'Code-signing service', 'critical');

  // --- network ---
  const net = (id, name, site, crit, extra = {}) => addAsset({ id, name, class: 'network_device', site, service_ids: ['SVC-IT'], criticality: crit, owner: 'Network Engineering', ...extra });
  for (const s of ['BOS', 'DUB', 'SIN', 'TLV']) {
    net(`NET-${s}-FW01`, `fw01.${s.toLowerCase()} (next-gen firewall)`, s, 'critical', { ip: `${siteSubnet(s)}.0.1` });
    net(`NET-${s}-CORE01`, `core01.${s.toLowerCase()} (core switch)`, s, 'high', { ip: `${siteSubnet(s)}.0.2` });
    net(`NET-${s}-WLC01`, `wlc01.${s.toLowerCase()} (wireless controller)`, s, 'medium', { ip: `${siteSubnet(s)}.0.3` });
  }
  net('NET-BOS-VPN01', 'vpn.acme.example (remote-access VPN, NA)', 'BOS', 'critical', { internet_facing: true, service_ids: ['SVC-IT', 'SVC-MDR', 'SVC-PS'] });
  net('NET-DUB-VPN01', 'vpn-eu.acme.example (remote-access VPN, EU)', 'DUB', 'critical', { internet_facing: true, service_ids: ['SVC-IT', 'SVC-MDR', 'SVC-PS'] });
  net('NET-SIN-FWMGMT', 'fw-mgmt.sin (firewall management interface)', 'SIN', 'high', { internet_facing: true });
  net('NET-SDWAN', 'SD-WAN orchestrator', 'BOS', 'high');

  // --- peripherals / IoT ---
  const iot = (id, name, site, subtype, crit = 'low', svcs = ['SVC-IT']) => addAsset({ id, name, class: 'peripheral_iot', subtype, site, service_ids: svcs, criticality: crit, owner: 'Facilities', ip: `${siteSubnet(site)}.8.${T.int(10, 250)}` });
  for (let i = 1; i <= 8; i++) iot(`IOT-BOS-BADGE${String(i).padStart(2, '0')}`, `badge reader HQ-${i}`, 'BOS', 'badge_reader', 'medium');
  for (let i = 1; i <= 4; i++) iot(`IOT-DUB-BADGE${String(i).padStart(2, '0')}`, `badge reader EU-${i}`, 'DUB', 'badge_reader', 'medium');
  for (const s of ['BOS', 'DUB', 'SIN', 'TLV']) {
    for (let i = 1; i <= 3; i++) iot(`IOT-${s}-PRN${String(i).padStart(2, '0')}`, `printer ${s}-${i}`, s, 'printer');
    for (let i = 1; i <= 2; i++) iot(`IOT-${s}-CONF${String(i).padStart(2, '0')}`, `conference room system ${s}-${i}`, s, 'conference_system');
  }
  iot('IOT-BOS-NVR01', 'CCTV recorder HQ', 'BOS', 'cctv', 'medium');
  iot('IOT-SIN-NVR01', 'CCTV recorder APAC', 'SIN', 'cctv', 'medium');

  // --- security controls ---
  const sec = (id, name, svcs, crit = 'critical') => addAsset({ id, name, class: 'security_control', site: 'SAAS', service_ids: svcs, criticality: crit, owner: 'Security Engineering' });
  sec('SEC-EDR', 'EDR platform', ['SVC-IT', 'SVC-MDR']);
  sec('SEC-SIEM', 'Internal SIEM', ['SVC-IT', 'SVC-MDR']);
  sec('SEC-SOAR', 'SOAR / automation', ['SVC-MDR']);
  sec('SEC-MAILGW', 'Email security gateway', ['SVC-IT']);
  sec('SEC-WAF', 'Web application firewall (portal)', ['SVC-PORTAL']);
  sec('SEC-CASB', 'Cloud access security broker', ['SVC-IT'], 'high');
  sec('SEC-PAM', 'Privileged access management', ['SVC-IAM']);
  sec('SEC-DLP', 'Data loss prevention', ['SVC-IT'], 'high');
  sec('SEC-VULN', 'Vulnerability scanner', ['SVC-IT'], 'high');
  sec('SEC-BACKUP', 'Backup & recovery platform', ['SVC-IT', 'SVC-FIN', 'SVC-IAM']);
  sec('SEC-IRTRIAGE', 'IRTriage collectors (portable triage)', ['SVC-PS', 'SVC-MDR'], 'high');

  // --- AI systems ---
  const ai = (id, name, svcs, crit, desc) => addAsset({ id, name, class: 'ai_system', site: 'CLOUD', service_ids: svcs, criticality: crit, owner: 'AI Platform', description: desc });
  ai('AI-ASSIST', 'Internal LLM assistant ("Ask ACME")', ['SVC-IT', 'SVC-BI'], 'high', 'Retrieval-augmented assistant over wiki, contracts and HR knowledge base.');
  ai('AI-TRIAGE', 'MDR alert-triage model', ['SVC-MDR'], 'critical', 'Ranks and summarises customer alerts for SOC analysts; processes customer email and tickets.');
  ai('AI-TIP-ENRICH', 'TIP enrichment LLM pipeline', ['SVC-TIP'], 'high', 'Summarises and tags intelligence before publication to customers.');
  ai('AI-SALES', 'Sales copilot (browser extension)', ['SVC-CRM'], 'medium', 'Drafts proposals from CRM data.');
  ai('AI-CODE', 'Code assistant integration', ['SVC-CICD'], 'medium', 'IDE assistant with repository context.');

  // --- APIs, darknet monitoring, audit & log sources (data sources, not hosts) ---
  const ds = (id, name, cls, svcs, crit, extra = {}) => addAsset({ id, name, class: cls, site: 'SAAS', service_ids: svcs, criticality: crit, owner: 'Security Operations', ...extra });
  ds('API-PORTAL', 'Customer Portal REST API v3', 'api', ['SVC-PORTAL'], 'critical', { site: 'CLOUD', owner: 'Portal Engineering', internet_facing: true, subtype: 'rest_api' });
  ds('API-TIP', 'Threat-intel REST API v2', 'api', ['SVC-TIP'], 'critical', { site: 'CLOUD', owner: 'Threat Research', internet_facing: true, subtype: 'rest_api' });
  ds('API-PARTNER', 'Partner integration API (MDR connectors)', 'api', ['SVC-MDR'], 'high', { site: 'CLOUD', owner: 'SOC Engineering', subtype: 'rest_api' });
  ds('DN-CREDS', 'Dark-web credential-leak monitoring', 'darknet', ['SVC-IT', 'SVC-IAM'], 'medium', { subtype: 'credential_monitoring' });
  ds('DN-BRAND', 'Brand, domain & leaked-data monitoring', 'darknet', ['SVC-IT'], 'medium', { subtype: 'brand_monitoring' });
  ds('LOG-CLOUDTRAIL', 'AWS CloudTrail (organization trail)', 'audit_log', ['SVC-MDR', 'SVC-IT'], 'high', { subtype: 'cloud_audit' });
  ds('LOG-ENTRA', 'Microsoft Entra ID sign-in & audit logs', 'audit_log', ['SVC-IAM'], 'high', { subtype: 'identity_audit' });
  ds('LOG-OKTA', 'Okta System Log', 'audit_log', ['SVC-IAM'], 'high', { subtype: 'identity_audit' });
  ds('LOG-GITHUB', 'GitHub Enterprise audit log', 'audit_log', ['SVC-CICD'], 'high', { subtype: 'scm_audit' });
  ds('LOG-WINSEC', 'Windows Security event logs (domain controllers)', 'audit_log', ['SVC-IAM', 'SVC-IT'], 'high', { subtype: 'os_audit' });
  ds('LOG-PANOS', 'Firewall traffic & threat logs', 'audit_log', ['SVC-IT'], 'medium', { subtype: 'network_logs' });
  ds('LOG-K8S', 'Kubernetes audit logs (EKS / GKE)', 'audit_log', ['SVC-MDR', 'SVC-TIP'], 'medium', { subtype: 'k8s_audit' });

  // --- endpoints (one per employee) ---
  const DEPTS = [
    { dept: 'SOC Operations', svc: 'SVC-MDR', sites: { BOS: 40, DUB: 30, SIN: 22 }, os: ['Windows 11'] },
    { dept: 'Engineering', svc: 'SVC-CICD', sites: { TLV: 70, BOS: 25, DUB: 15, REM: 6 }, os: ['macOS 15', 'macOS 15', 'Ubuntu 24.04', 'Windows 11'] },
    { dept: 'Threat Research', svc: 'SVC-TIP', sites: { TLV: 18, DUB: 6 }, os: ['macOS 15', 'Ubuntu 24.04'] },
    { dept: 'Professional Services', svc: 'SVC-PS', sites: { BOS: 22, DUB: 24, REM: 18 }, os: ['Windows 11', 'macOS 15'] },
    { dept: 'Sales', svc: 'SVC-CRM', sites: { BOS: 36, DUB: 14, SIN: 26, REM: 14 }, os: ['macOS 15', 'Windows 11'] },
    { dept: 'Finance', svc: 'SVC-FIN', sites: { BOS: 18, DUB: 6 }, os: ['Windows 11'] },
    { dept: 'People & HR', svc: 'SVC-IAM', sites: { BOS: 10, DUB: 3 }, os: ['Windows 11'] },
    { dept: 'IT & Security', svc: 'SVC-IT', sites: { BOS: 22, DUB: 7, SIN: 6, TLV: 2 }, os: ['Windows 11', 'macOS 15'] },
    { dept: 'Executive & G&A', svc: 'SVC-IT', sites: { BOS: 27, DUB: 5, SIN: 6, REM: 2 }, os: ['macOS 15', 'Windows 11'] },
  ];
  let n = 0;
  for (const d of DEPTS) {
    for (const [site, count] of Object.entries(d.sites)) {
      for (let i = 0; i < count; i++) {
        n++;
        const id = `EP-${site}-${String(n).padStart(4, '0')}`;
        // EDR gaps are concentrated in APAC (story: IT-EDR SLO breached).
        const edr = site === 'SIN' ? T.chance(0.8) : T.chance(0.99);
        addAsset({
          id, name: `${site.toLowerCase()}-lt-${String(n).padStart(4, '0')}.acme.example`, class: 'endpoint', subtype: 'laptop', site,
          department: d.dept, service_ids: [...new Set(['SVC-IT', d.svc])],
          criticality: d.svc === 'SVC-MDR' || d.svc === 'SVC-FIN' || d.dept === 'IT & Security' ? 'high' : 'medium',
          platform: T.pick(d.os), edr, owner: d.dept, ip: `${siteSubnet(site)}.${T.int(20, 60)}.${T.int(2, 250)}`,
        });
      }
    }
  }
  if (n !== 500) throw new Error(`expected 500 endpoints (one per employee), built ${n}`);
}

// ---------------------------------------------------------------------------
// Controls (crosswalk) and policies
// ---------------------------------------------------------------------------

const CONTROL_ROWS = [
  // id, title, domain, status, effectiveness, owner, refs {framework: ref}
  ['CTL-01', 'Asset inventory & ownership', 'Identify', 'implemented', 0.85, 'IT Operations', { ISO: 'A.5.9', SOC2: 'CC6.1', CSF: 'ID.AM-01', NIS2: 'Art.21(2)(i)', PCI: '12.5.1' }],
  ['CTL-02', 'Vulnerability management', 'Protect', 'partial', 0.55, 'Security Engineering', { ISO: 'A.8.8', SOC2: 'CC7.1', CSF: 'ID.RA-01', NIS2: 'Art.21(2)(e)', PCI: '6.3.1' }],
  ['CTL-03', 'Patch management (endpoints & servers)', 'Protect', 'partial', 0.5, 'IT Operations', { ISO: 'A.8.8', SOC2: 'CC7.1', CSF: 'PR.PS-02', NIS2: 'Art.21(2)(e)', PCI: '6.3.3' }],
  ['CTL-04', 'Secure configuration baselines', 'Protect', 'partial', 0.6, 'IT Operations', { ISO: 'A.8.9', SOC2: 'CC7.1', CSF: 'PR.PS-01', PCI: '2.2.1' }],
  ['CTL-05', 'Cloud security posture management', 'Protect', 'implemented', 0.7, 'Cloud Platform', { ISO: 'A.5.23', SOC2: 'CC6.6', CSF: 'PR.PS-01', NIS2: 'Art.21(2)(d)' }],
  ['CTL-06', 'Multi-factor authentication', 'Protect', 'partial', 0.6, 'Identity Team', { ISO: 'A.8.5', SOC2: 'CC6.1', CSF: 'PR.AA-03', NIS2: 'Art.21(2)(j)', PCI: '8.4.2' }],
  ['CTL-07', 'Privileged access management', 'Protect', 'partial', 0.55, 'Identity Team', { ISO: 'A.8.2', SOC2: 'CC6.3', CSF: 'PR.AA-05', PCI: '7.2.1' }],
  ['CTL-08', 'Joiner / mover / leaver process', 'Protect', 'partial', 0.5, 'People & HR', { ISO: 'A.5.18', SOC2: 'CC6.2', CSF: 'PR.AA-01', GDPR: 'Art.32' }],
  ['CTL-09', 'Periodic access reviews', 'Protect', 'implemented', 0.7, 'Identity Team', { ISO: 'A.5.18', SOC2: 'CC6.3', CSF: 'PR.AA-05', PCI: '7.2.4' }],
  ['CTL-10', 'Endpoint detection & response coverage', 'Detect', 'implemented', 0.8, 'Security Operations', { ISO: 'A.8.7', SOC2: 'CC6.8', CSF: 'DE.CM-09', NIS2: 'Art.21(2)(b)', PCI: '5.2.1' }],
  ['CTL-11', 'Centralised logging & SIEM', 'Detect', 'implemented', 0.8, 'Security Operations', { ISO: 'A.8.15', SOC2: 'CC7.2', CSF: 'DE.CM-01', PCI: '10.2.1' }],
  ['CTL-12', '24x7 security monitoring', 'Detect', 'implemented', 0.85, 'Security Operations', { ISO: 'A.8.16', SOC2: 'CC7.2', CSF: 'DE.AE-02', NIS2: 'Art.21(2)(b)' }],
  ['CTL-13', 'Incident response plan & exercises', 'Respond', 'implemented', 0.75, 'CISO Office', { ISO: 'A.5.24', SOC2: 'CC7.4', CSF: 'RS.MA-01', NIS2: 'Art.23', GDPR: 'Art.33', PCI: '12.10.1' }],
  ['CTL-14', 'Immutable backups & recovery testing', 'Recover', 'partial', 0.5, 'IT Operations', { ISO: 'A.8.13', SOC2: 'A1.2', CSF: 'RC.RP-01', NIS2: 'Art.21(2)(c)' }],
  ['CTL-15', 'Business continuity & disaster recovery', 'Recover', 'implemented', 0.7, 'COO Office', { ISO: 'A.5.30', SOC2: 'A1.3', CSF: 'RC.RP-02', NIS2: 'Art.21(2)(c)' }],
  ['CTL-16', 'Network segmentation', 'Protect', 'partial', 0.55, 'Network Engineering', { ISO: 'A.8.22', SOC2: 'CC6.6', CSF: 'PR.IR-01', PCI: '1.3.1' }],
  ['CTL-17', 'Web application firewall (blocking mode)', 'Protect', 'partial', 0.45, 'Security Engineering', { ISO: 'A.8.20', SOC2: 'CC6.6', CSF: 'PR.IR-01', PCI: '6.4.2' }],
  ['CTL-18', 'TLS & certificate lifecycle', 'Protect', 'implemented', 0.7, 'Security Engineering', { ISO: 'A.8.24', SOC2: 'CC6.7', CSF: 'PR.DS-02', PCI: '4.2.1' }],
  ['CTL-19', 'Encryption at rest', 'Protect', 'implemented', 0.85, 'Cloud Platform', { ISO: 'A.8.24', SOC2: 'CC6.1', CSF: 'PR.DS-01', GDPR: 'Art.32', PCI: '3.5.1' }],
  ['CTL-20', 'Data classification & DLP', 'Protect', 'partial', 0.45, 'Privacy Office', { ISO: 'A.5.12', SOC2: 'C1.1', CSF: 'PR.DS-01', GDPR: 'Art.5' }],
  ['CTL-21', 'Secrets management', 'Protect', 'partial', 0.5, 'Platform Engineering', { ISO: 'A.5.17', SOC2: 'CC6.1', CSF: 'PR.DS-01', PCI: '8.3.2' }],
  ['CTL-22', 'Secure SDLC & code review', 'Protect', 'implemented', 0.75, 'Engineering', { ISO: 'A.8.25', SOC2: 'CC8.1', CSF: 'PR.PS-06', NIS2: 'Art.21(2)(e)', PCI: '6.2.1' }],
  ['CTL-23', 'Software supply-chain integrity (signing, SBOM)', 'Protect', 'partial', 0.5, 'Platform Engineering', { ISO: 'A.5.21', SOC2: 'CC8.1', CSF: 'GV.SC-01', NIS2: 'Art.21(2)(d)' }],
  ['CTL-24', 'CI/CD pipeline hardening', 'Protect', 'partial', 0.45, 'Platform Engineering', { ISO: 'A.8.31', SOC2: 'CC8.1', CSF: 'PR.PS-06' }],
  ['CTL-25', 'Third-party & supplier risk', 'Govern', 'implemented', 0.65, 'Procurement', { ISO: 'A.5.19', SOC2: 'CC9.2', CSF: 'GV.SC-07', NIS2: 'Art.21(2)(d)', GDPR: 'Art.28' }],
  ['CTL-26', 'Security awareness training', 'Protect', 'implemented', 0.8, 'CISO Office', { ISO: 'A.6.3', SOC2: 'CC2.2', CSF: 'PR.AT-01', NIS2: 'Art.21(2)(g)', PCI: '12.6.1' }],
  ['CTL-27', 'Email security & phishing protection', 'Protect', 'implemented', 0.8, 'Security Engineering', { ISO: 'A.8.23', SOC2: 'CC6.8', CSF: 'DE.CM-09', PCI: '5.4.1' }],
  ['CTL-28', 'Payment-page script integrity', 'Protect', 'not_implemented', 0.1, 'Finance Systems', { PCI: '6.4.3', ISO: 'A.8.26' }],
  ['CTL-29', 'IoT / facilities device management', 'Identify', 'planned', 0.2, 'Facilities', { ISO: 'A.8.1', SOC2: 'CC6.8', CSF: 'ID.AM-01' }],
  ['CTL-30', 'AI system governance & data access', 'Govern', 'partial', 0.35, 'AI Platform', { ISO: 'A.5.12', CSF: 'GV.OC-03', GDPR: 'Art.35' }],
  ['CTL-31', 'Data protection impact assessments', 'Govern', 'implemented', 0.7, 'Privacy Office', { GDPR: 'Art.35', ISO: 'A.5.34' }],
  ['CTL-32', 'Breach notification procedure', 'Respond', 'implemented', 0.8, 'General Counsel', { GDPR: 'Art.33', NIS2: 'Art.23', ISO: 'A.5.26' }],
  ['CTL-33', 'Enterprise risk management', 'Govern', 'implemented', 0.75, 'CISO Office', { ISO: 'Cl.6.1', SOC2: 'CC3.1', CSF: 'GV.RM-01', NIS2: 'Art.21(1)' }],
  ['CTL-34', 'Board cyber oversight', 'Govern', 'implemented', 0.7, 'CEO Office', { ISO: 'Cl.5.1', SOC2: 'CC1.2', CSF: 'GV.RR-01', NIS2: 'Art.20' }],
  ['CTL-35', 'Physical access control', 'Protect', 'implemented', 0.75, 'Facilities', { ISO: 'A.7.2', SOC2: 'CC6.4', CSF: 'PR.AA-06', PCI: '9.2.1' }],
  ['CTL-36', 'Removable media & peripherals', 'Protect', 'partial', 0.5, 'IT Operations', { ISO: 'A.7.10', SOC2: 'CC6.7', CSF: 'PR.DS-01' }],
  ['CTL-37', 'Remote access security', 'Protect', 'partial', 0.5, 'Network Engineering', { ISO: 'A.6.7', SOC2: 'CC6.6', CSF: 'PR.AA-03', NIS2: 'Art.21(2)(j)', PCI: '8.4.3' }],
  ['CTL-38', 'Log retention for regulators', 'Detect', 'implemented', 0.8, 'Security Operations', { ISO: 'A.8.15', SOC2: 'CC7.2', NIS2: 'Art.21(2)(b)', PCI: '10.5.1' }],
  ['CTL-39', 'Penetration testing programme', 'Identify', 'implemented', 0.8, 'Professional Services', { ISO: 'A.8.29', SOC2: 'CC4.1', CSF: 'ID.RA-01', PCI: '11.4.1' }],
  ['CTL-40', 'Change management', 'Protect', 'implemented', 0.75, 'IT Operations', { ISO: 'A.8.32', SOC2: 'CC8.1', CSF: 'PR.PS-01', PCI: '6.5.1' }],
];

const FRAMEWORK_NAMES = {
  ISO: 'ISO 27001:2022', SOC2: 'SOC 2 Type II', CSF: 'NIST CSF 2.0', NIST53: 'NIST SP 800-53 Rev. 5', FEDRAMP: 'FedRAMP Moderate',
  CIS: 'CIS Controls v8', GDPR: 'GDPR', NIS2: 'NIS2', PCI: 'PCI DSS 4.0',
};

// NIST SP 800-53 Rev. 5 control and CIS Controls v8 safeguard for each control.
// FedRAMP Moderate is an 800-53 baseline, so it reuses the 800-53 id.
const CONTROL_XWALK = {
  'CTL-01': ['CM-8', '1.1'], 'CTL-02': ['RA-5', '7.1'], 'CTL-03': ['SI-2', '7.3'], 'CTL-04': ['CM-6', '4.1'], 'CTL-05': ['CA-7', '4.1'],
  'CTL-06': ['IA-2(1)', '6.3'], 'CTL-07': ['AC-6', '5.4'], 'CTL-08': ['AC-2', '5.3'], 'CTL-09': ['AC-2', '6.2'], 'CTL-10': ['SI-3', '10.1'],
  'CTL-11': ['AU-6', '8.2'], 'CTL-12': ['SI-4', '13.1'], 'CTL-13': ['IR-8', '17.4'], 'CTL-14': ['CP-9', '11.3'], 'CTL-15': ['CP-2', '11.1'],
  'CTL-16': ['SC-7', '12.2'], 'CTL-17': ['SC-7', '13.10'], 'CTL-18': ['SC-8', '3.10'], 'CTL-19': ['SC-28', '3.11'], 'CTL-20': ['RA-2', '3.7'],
  'CTL-21': ['IA-5', '5.2'], 'CTL-22': ['SA-11', '16.1'], 'CTL-23': ['SR-3', '16.4'], 'CTL-24': ['CM-7', '16.7'], 'CTL-25': ['SR-6', '15.1'],
  'CTL-26': ['AT-2', '14.1'], 'CTL-27': ['SI-8', '9.7'], 'CTL-28': ['SI-7', null], 'CTL-29': ['CM-8', '1.1'], 'CTL-30': ['RA-3', null],
  'CTL-31': ['RA-8', null], 'CTL-32': ['IR-6', '17.2'], 'CTL-33': ['PM-9', null], 'CTL-34': ['PM-2', null], 'CTL-35': ['PE-3', null],
  'CTL-36': ['MP-7', '10.3'], 'CTL-37': ['AC-17', '12.7'], 'CTL-38': ['AU-11', '8.10'], 'CTL-39': ['CA-8', '18.1'], 'CTL-40': ['CM-3', null],
};

// Real frameworks and regulations in scope, with their official references.
const FRAMEWORK_CATALOG = [
  { id: 'iso27001', name: 'ISO/IEC 27001:2022', kind: 'standard', issuer: 'ISO/IEC', url: 'https://www.iso.org/standard/27001' },
  { id: 'soc2', name: 'SOC 2 Type II', kind: 'attestation', issuer: 'AICPA', url: 'https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2' },
  { id: 'nistcsf', name: 'NIST CSF 2.0', kind: 'framework', issuer: 'NIST', url: 'https://www.nist.gov/cyberframework' },
  { id: 'nist80053', name: 'NIST SP 800-53 Rev. 5', kind: 'control catalog', issuer: 'NIST', url: 'https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final' },
  { id: 'fedramp', name: 'FedRAMP Moderate', kind: 'authorization', issuer: 'GSA FedRAMP PMO', url: 'https://www.fedramp.gov/' },
  { id: 'cis', name: 'CIS Controls v8', kind: 'framework', issuer: 'Center for Internet Security', url: 'https://www.cisecurity.org/controls/v8' },
  { id: 'gdpr', name: 'GDPR', kind: 'regulation', issuer: 'European Union', url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' },
  { id: 'nis2', name: 'NIS2 Directive', kind: 'regulation', issuer: 'European Union', url: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj' },
  { id: 'pcidss', name: 'PCI DSS 4.0', kind: 'standard', issuer: 'PCI SSC', url: 'https://www.pcisecuritystandards.org/' },
  { id: 'attack', name: 'MITRE ATT&CK', kind: 'threat model', issuer: 'MITRE', url: 'https://attack.mitre.org/' },
  { id: 'atlas', name: 'MITRE ATLAS', kind: 'threat model', issuer: 'MITRE', url: 'https://atlas.mitre.org/' },
  { id: 'owasp', name: 'OWASP Top 10 (2021)', kind: 'risk list', issuer: 'OWASP Foundation', url: 'https://owasp.org/Top10/' },
  { id: 'owaspapi', name: 'OWASP API Security Top 10 (2023)', kind: 'risk list', issuer: 'OWASP Foundation', url: 'https://owasp.org/API-Security/editions/2023/en/0x11-t10/' },
  { id: 'owaspllm', name: 'OWASP Top 10 for LLM Applications (2025)', kind: 'risk list', issuer: 'OWASP Foundation', url: 'https://genai.owasp.org/llm-top-10/' },
];

function buildControls() {
  return CONTROL_ROWS.map(([id, title, domain, status, effectiveness, owner, baseRefs]) => {
    const [nist, cis] = CONTROL_XWALK[id];
    const refs = { ...baseRefs, NIST53: nist, FEDRAMP: nist, ...(cis ? { CIS: cis } : {}) };
    return {
    id, title, domain, status, effectiveness, owner,
    framework_refs: Object.entries(refs).map(([fw, ref]) => ({ framework: FRAMEWORK_NAMES[fw], ref })),
    last_tested: `2026-${String(T.int(3, 9)).padStart(2, '0')}-${String(T.int(1, 28)).padStart(2, '0')}`,
    };
  });
}

const POLICIES = [
  ['POL-01', 'Information Security Policy', 'CISO', 'approved', '2026-02-10', 0],
  ['POL-02', 'Acceptable Use Policy', 'CISO', 'approved', '2026-02-10', 1],
  ['POL-03', 'Access Control Policy', 'CISO', 'approved', '2025-11-04', 4],
  ['POL-04', 'Cloud Security Standard', 'CTO', 'approved', '2026-05-22', 2],
  ['POL-05', 'Secure Development Standard', 'CTO', 'under_review', '2025-09-15', 1],
  ['POL-06', 'Vulnerability & Patch Management Standard', 'CISO', 'approved', '2026-01-30', 6],
  ['POL-07', 'Incident Response Policy', 'CISO', 'approved', '2026-04-02', 0],
  ['POL-08', 'Business Continuity Policy', 'COO', 'approved', '2026-03-12', 0],
  ['POL-09', 'Data Classification & Handling Policy', 'General Counsel', 'approved', '2025-10-20', 3],
  ['POL-10', 'Privacy Policy (GDPR)', 'General Counsel', 'approved', '2026-05-01', 0],
  ['POL-11', 'Third-Party Risk Policy', 'CFO', 'approved', '2026-01-18', 2],
  ['POL-12', 'Payment Card Security Policy (PCI)', 'CFO', 'approved', '2026-06-30', 1],
  ['POL-13', 'AI Acceptable Use & Governance Policy', 'CTO', 'draft', '2026-08-28', 0],
  ['POL-14', 'Physical Security Policy', 'COO', 'overdue_review', '2024-08-01', 0],
  ['POL-15', 'Risk Management Policy', 'CEO', 'approved', '2026-06-18', 0],
];

function buildPolicies() {
  return POLICIES.map(([id, title, owner, status, lastReview, exceptions]) => ({
    id, title, owner, status, last_review: lastReview, open_exceptions: exceptions,
  }));
}

// ---------------------------------------------------------------------------
// Cyber-risk register
// ---------------------------------------------------------------------------

const risks = [];

function addRisk(r) {
  for (const a of r.asset_ids) if (!byId.has(a)) throw new Error(`risk ${r.id}: unknown asset ${a}`);
  for (const c of r.control_ids || []) if (!CONTROL_ROWS.some((row) => row[0] === c)) throw new Error(`risk ${r.id}: unknown control ${c}`);
  risks.push({ status: 'open', closed_on: null, mitre_techniques: [], ...r });
}

const DIM = {
  vulnerability: [A, I, C],
  misconfiguration: [C, I],
  exposure: [C],
  ioc: [C, I],
  ioa: [C, I],
  incident_finding: [C, I, A],
};

/** Story risks: authored, register-level findings that give the dashboard its narrative. */
function storyRisks() {
  const S = [
    // --- Customer Portal cluster (threatens POR-AVAIL SLA and customer PII) ---
    { id: 'CR-001', type: 'vulnerability', title: 'Critical deserialization flaw in portal API framework', severity: 'critical', cvss: 9.8, epss: 0.71, exploitability: 'known_exploited', vuln_id: 'ACME-VULN-2026-0412', asset_ids: ['AWS-ECS-PORTAL-API', 'AWS-ALB-PORTAL'], control_ids: ['CTL-02', 'CTL-17'], mitre_techniques: ['T1190'], first_seen: '2026-09-08', source: 'Vulnerability scanner', owner: 'Portal Engineering', dimensions: [A, I, C], remediation: { action: 'Upgrade API framework to fixed release and redeploy', effort: 'medium', cost_usd: 40000, eta_days: 10 } },
    { id: 'CR-002', type: 'misconfiguration', title: 'Portal WAF running in detection-only mode', severity: 'high', exploitability: 'poc', asset_ids: ['SEC-WAF', 'AWS-ALB-PORTAL'], control_ids: ['CTL-17'], mitre_techniques: ['T1190'], first_seen: '2026-07-14', source: 'CSPM', owner: 'Security Engineering', dimensions: [A, I], remediation: { action: 'Switch managed rule sets to blocking after 7-day tuning', effort: 'low', cost_usd: 8000, eta_days: 7 } },
    { id: 'CR-003', type: 'exposure', title: 'Portal export bucket allows public object listing', severity: 'critical', exploitability: 'known_exploited', asset_ids: ['AWS-S3-PORTAL-EXP'], control_ids: ['CTL-05', 'CTL-20'], mitre_techniques: ['T1530'], first_seen: '2026-09-19', source: 'CSPM', owner: 'Cloud Platform', dimensions: [C], remediation: { action: 'Enable Block Public Access; rotate pre-signed URL keys; review access logs', effort: 'low', cost_usd: 5000, eta_days: 1 } },
    { id: 'CR-004', type: 'exposure', title: 'Portal database admin endpoint reachable from the internet', severity: 'high', exploitability: 'poc', asset_ids: ['AWS-RDS-PORTAL'], control_ids: ['CTL-16', 'CTL-05'], mitre_techniques: ['T1133'], first_seen: '2026-08-02', source: 'CSPM', owner: 'Cloud Platform', dimensions: [C, A], remediation: { action: 'Restrict security group to bastion; enforce IAM auth', effort: 'low', cost_usd: 6000, eta_days: 3 } },
    { id: 'CR-005', type: 'misconfiguration', title: 'EU portal gateway allows legacy TLS 1.0/1.1', severity: 'medium', exploitability: 'theoretical', asset_ids: ['AZ-APPGW-PORTAL-EU'], control_ids: ['CTL-18'], mitre_techniques: ['T1557'], first_seen: '2026-05-11', source: 'Vulnerability scanner', owner: 'Cloud Platform', dimensions: [C], remediation: { action: 'Apply TLS 1.2+ policy', effort: 'low', cost_usd: 2000, eta_days: 2 } },
    // --- MDR cluster (threatens MTTD/MTTR SLA, customer telemetry) ---
    { id: 'CR-010', type: 'misconfiguration', title: 'MDR ingestion cluster deployed in a single availability zone', severity: 'high', exploitability: 'theoretical', asset_ids: ['AWS-EKS-MDR', 'AWS-MSK-MDR'], control_ids: ['CTL-15'], mitre_techniques: [], first_seen: '2026-06-03', source: 'Architecture review', owner: 'SOC Engineering', dimensions: [A], remediation: { action: 'Re-deploy node groups and brokers across three AZs', effort: 'high', cost_usd: 120000, eta_days: 45 } },
    { id: 'CR-011', type: 'misconfiguration', title: 'SOAR service account holds domain-admin privileges', severity: 'critical', exploitability: 'poc', asset_ids: ['SRV-BOS-SOAR01', 'SRV-BOS-DC01'], control_ids: ['CTL-07'], mitre_techniques: ['T1078.002'], first_seen: '2026-07-21', source: 'Identity posture scan', owner: 'SOC Engineering', dimensions: [C, I, A], remediation: { action: 'Replace with scoped gMSA and just-in-time elevation', effort: 'medium', cost_usd: 25000, eta_days: 21 } },
    { id: 'CR-012', type: 'misconfiguration', title: 'EDR tamper protection disabled on SOC jump hosts', severity: 'high', exploitability: 'poc', asset_ids: ['SRV-BOS-JMP01', 'SRV-DUB-JMP01', 'SRV-SIN-JMP01'], control_ids: ['CTL-10'], mitre_techniques: ['T1562.001'], first_seen: '2026-08-26', source: 'EDR console', owner: 'Security Operations', dimensions: [I, C], remediation: { action: 'Re-enable tamper protection via policy; alert on change', effort: 'low', cost_usd: 3000, eta_days: 2 } },
    { id: 'CR-013', type: 'ioa', title: 'Unverified OAuth application granted mailbox read consent', severity: 'high', exploitability: 'known_exploited', asset_ids: ['SAAS-COLLAB', 'SAAS-IDP'], control_ids: ['CTL-06', 'CTL-30'], mitre_techniques: ['T1528'], first_seen: '2026-09-24', source: 'SOC alert (CASB)', owner: 'Security Operations', dimensions: [C], remediation: { action: 'Revoke grant, restrict user consent to verified publishers, review mailbox access logs', effort: 'low', cost_usd: 4000, eta_days: 1 } },
    { id: 'CR-014', type: 'ioc', title: 'SOC jump host contacted infrastructure on a threat-intel blocklist', severity: 'high', exploitability: 'known_exploited', asset_ids: ['SRV-SIN-JMP01'], control_ids: ['CTL-12', 'CTL-16'], mitre_techniques: ['T1071.001'], first_seen: '2026-09-27', source: 'SOC alert (network)', owner: 'Security Operations', indicator: '198.51.100.23', dimensions: [C, I], remediation: { action: 'Isolate host, run IRTriage full collection, re-image after review', effort: 'medium', cost_usd: 15000, eta_days: 3 } },
    { id: 'CR-015', type: 'vulnerability', title: 'Remote-access VPN appliance missing vendor hotfix', severity: 'critical', cvss: 9.6, epss: 0.84, exploitability: 'known_exploited', vuln_id: 'ACME-VULN-2026-0388', asset_ids: ['NET-DUB-VPN01'], control_ids: ['CTL-02', 'CTL-37'], mitre_techniques: ['T1133', 'T1190'], first_seen: '2026-09-12', source: 'Vulnerability scanner', owner: 'Network Engineering', dimensions: [C, I, A], remediation: { action: 'Apply hotfix in emergency change window; rotate VPN certificates', effort: 'low', cost_usd: 10000, eta_days: 2 } },
    { id: 'CR-016', type: 'misconfiguration', title: 'Alert-triage model processes customer email without prompt-injection filtering', severity: 'high', exploitability: 'poc', asset_ids: ['AI-TRIAGE'], control_ids: ['CTL-30'], mitre_techniques: ['AML.T0051'], first_seen: '2026-08-14', source: 'AI red-team review', owner: 'AI Platform', dimensions: [I, C], remediation: { action: 'Add input isolation and output policy checks; keep analyst-in-the-loop for actions', effort: 'medium', cost_usd: 30000, eta_days: 30 } },
    // --- CI/CD cluster (threatens release KPIs & supply-chain integrity) ---
    { id: 'CR-020', type: 'misconfiguration', title: 'CI token with organisation-admin scope used by release workflows', severity: 'critical', exploitability: 'poc', asset_ids: ['SAAS-CODE', 'CICD-RUNNER-01', 'CICD-RUNNER-02'], control_ids: ['CTL-21', 'CTL-24'], mitre_techniques: ['T1552.001'], first_seen: '2026-07-30', source: 'Code-hosting audit', owner: 'Platform Engineering', dimensions: [I, D, C], remediation: { action: 'Move to short-lived OIDC credentials with least-privilege scopes', effort: 'medium', cost_usd: 20000, eta_days: 14 } },
    { id: 'CR-021', type: 'misconfiguration', title: 'Self-hosted runners shared between public and private repositories', severity: 'high', exploitability: 'poc', asset_ids: ['CICD-RUNNER-03', 'CICD-RUNNER-04', 'CICD-RUNNER-05', 'CICD-RUNNER-06'], control_ids: ['CTL-24'], mitre_techniques: ['T1195.002'], first_seen: '2026-06-17', source: 'Code-hosting audit', owner: 'Platform Engineering', dimensions: [I, D], remediation: { action: 'Separate runner groups; use ephemeral runners for public repos', effort: 'medium', cost_usd: 18000, eta_days: 14 } },
    { id: 'CR-022', type: 'misconfiguration', title: 'Deploy pipeline accepts unsigned artifacts', severity: 'high', exploitability: 'theoretical', asset_ids: ['CICD-ARGO', 'CICD-ARTIFACTS'], control_ids: ['CTL-23'], mitre_techniques: ['T1195.002'], first_seen: '2026-05-06', source: 'Architecture review', owner: 'Platform Engineering', dimensions: [I, K, D], remediation: { action: 'Enforce signature verification admission policy', effort: 'medium', cost_usd: 22000, eta_days: 21 } },
    { id: 'CR-023', type: 'exposure', title: 'Credentials present in repository history', severity: 'high', exploitability: 'known_exploited', asset_ids: ['SAAS-CODE', 'CICD-VAULT'], control_ids: ['CTL-21'], mitre_techniques: ['T1552.001'], first_seen: '2026-09-03', source: 'Secret scanning', owner: 'Platform Engineering', dimensions: [C, I], remediation: { action: 'Rotate the 14 exposed secrets; enable push protection', effort: 'low', cost_usd: 6000, eta_days: 3 } },
    { id: 'CR-024', type: 'vulnerability', title: 'Critical vulnerability in build-time dependency of TIP release', severity: 'high', cvss: 8.8, epss: 0.22, exploitability: 'poc', vuln_id: 'ACME-VULN-2026-0397', asset_ids: ['SRV-TLV-BLD01', 'SRV-TLV-BLD02', 'AWS-EKS-TIP'], control_ids: ['CTL-02', 'CTL-22'], mitre_techniques: ['T1195.001'], first_seen: '2026-08-21', source: 'SCA scan', owner: 'Engineering', dimensions: [I, A], remediation: { action: 'Bump dependency and rebuild affected images', effort: 'low', cost_usd: 7000, eta_days: 5 } },
    // --- Identity cluster ---
    { id: 'CR-030', type: 'misconfiguration', title: 'MFA not enforced for 11 privileged accounts', severity: 'critical', exploitability: 'known_exploited', asset_ids: ['SAAS-IDP', 'SEC-PAM'], control_ids: ['CTL-06', 'CTL-07'], mitre_techniques: ['T1078'], first_seen: '2026-06-25', source: 'Identity posture scan', owner: 'Identity Team', dimensions: [C, I, K], remediation: { action: 'Enforce phishing-resistant MFA conditional access for admin roles', effort: 'low', cost_usd: 9000, eta_days: 5 } },
    { id: 'CR-031', type: 'misconfiguration', title: '23 leaver accounts still enabled beyond 24 h', severity: 'high', exploitability: 'poc', asset_ids: ['SAAS-IDP', 'SAAS-HRIS', 'SRV-BOS-HR01'], control_ids: ['CTL-08'], mitre_techniques: ['T1078'], first_seen: '2026-07-09', source: 'Access review', owner: 'People & HR', dimensions: [C, K], remediation: { action: 'Automate HRIS-to-IdP deprovisioning; disable stale accounts', effort: 'medium', cost_usd: 15000, eta_days: 14 } },
    { id: 'CR-032', type: 'ioa', title: 'Impossible-travel sign-in for a finance administrator', severity: 'medium', exploitability: 'known_exploited', asset_ids: ['SAAS-IDP', 'AZ-SQL-FIN'], control_ids: ['CTL-06', 'CTL-12'], mitre_techniques: ['T1078.004'], first_seen: '2026-09-22', source: 'SOC alert (identity)', owner: 'Security Operations', dimensions: [C, I], remediation: { action: 'Reset credentials and sessions; confirm with user; review finance DB audit', effort: 'low', cost_usd: 2000, eta_days: 1 } },
    { id: 'CR-033', type: 'vulnerability', title: 'Domain controllers missing cumulative security update', severity: 'high', cvss: 8.1, epss: 0.35, exploitability: 'poc', vuln_id: 'ACME-VULN-2026-0351', asset_ids: ['SRV-BOS-DC01', 'SRV-BOS-DC02', 'SRV-DUB-DC01', 'SRV-SIN-DC01', 'SRV-TLV-DC01'], control_ids: ['CTL-03'], mitre_techniques: ['T1210'], first_seen: '2026-08-12', source: 'Vulnerability scanner', owner: 'IT Operations', dimensions: [A, I, C], remediation: { action: 'Patch DCs in rolling maintenance', effort: 'low', cost_usd: 6000, eta_days: 7 } },
    // --- Finance / PCI ---
    { id: 'CR-040', type: 'misconfiguration', title: 'Payment page loads third-party scripts without integrity controls', severity: 'high', exploitability: 'known_exploited', asset_ids: ['AZ-APP-BILLING', 'SAAS-PAY'], control_ids: ['CTL-28'], mitre_techniques: ['T1185'], first_seen: '2026-04-15', source: 'PCI readiness assessment', owner: 'Finance Systems', dimensions: [C, K], remediation: { action: 'Script inventory, SRI/CSP and change-detection per PCI 6.4.3 / 11.6.1', effort: 'medium', cost_usd: 35000, eta_days: 30 } },
    { id: 'CR-041', type: 'misconfiguration', title: 'Finance database backups are not immutable', severity: 'high', exploitability: 'theoretical', asset_ids: ['SRV-DUB-SQL01', 'SEC-BACKUP', 'SRV-BOS-BKP01'], control_ids: ['CTL-14'], mitre_techniques: ['T1490'], first_seen: '2026-03-03', source: 'BCP review', owner: 'IT Operations', dimensions: [A, I], remediation: { action: 'Enable object-lock vault copies; quarterly restore test', effort: 'medium', cost_usd: 28000, eta_days: 30 } },
    { id: 'CR-042', type: 'vulnerability', title: 'Legacy ERP server on end-of-support operating system', severity: 'medium', cvss: 7.5, epss: 0.08, exploitability: 'theoretical', vuln_id: 'ACME-VULN-EOS-2012R2', asset_ids: ['SRV-BOS-LEGACY01'], control_ids: ['CTL-03'], mitre_techniques: ['T1210'], first_seen: '2025-10-10', source: 'Asset inventory', owner: 'Finance Systems', dimensions: [A, I], remediation: { action: 'Migrate to supported platform (approved FY27 project)', effort: 'high', cost_usd: 140000, eta_days: 120 } },
    // --- BI / data ---
    { id: 'CR-050', type: 'exposure', title: 'BI service principal can read all HR datasets', severity: 'high', exploitability: 'poc', asset_ids: ['AZ-SYN-BI', 'SAAS-BI'], control_ids: ['CTL-20', 'CTL-07'], mitre_techniques: ['T1078.004'], first_seen: '2026-06-09', source: 'Data access review', owner: 'Data Platform', dimensions: [C, K], remediation: { action: 'Row-level security and scoped service principals', effort: 'medium', cost_usd: 16000, eta_days: 21 } },
    { id: 'CR-051', type: 'misconfiguration', title: 'Data-lake storage account allows public network access', severity: 'medium', exploitability: 'poc', asset_ids: ['AZ-STG-BI'], control_ids: ['CTL-05', 'CTL-16'], mitre_techniques: ['T1530'], first_seen: '2026-07-01', source: 'CSPM', owner: 'Data Platform', dimensions: [C], remediation: { action: 'Private endpoints only', effort: 'low', cost_usd: 4000, eta_days: 5 } },
    { id: 'CR-052', type: 'exposure', title: 'LLM assistant retrieval index includes HR records and customer contracts without access trimming', severity: 'high', exploitability: 'poc', asset_ids: ['AI-ASSIST'], control_ids: ['CTL-30', 'CTL-20'], mitre_techniques: ['AML.T0057'], first_seen: '2026-08-05', source: 'AI governance review', owner: 'AI Platform', dimensions: [C, K], remediation: { action: 'Permission-aware retrieval; remove HR corpus pending DPIA', effort: 'medium', cost_usd: 24000, eta_days: 21 } },
    { id: 'CR-053', type: 'exposure', title: 'Sales copilot extension embeds a long-lived model API key', severity: 'medium', exploitability: 'poc', asset_ids: ['AI-SALES', 'SAAS-CRM'], control_ids: ['CTL-21', 'CTL-30'], mitre_techniques: ['T1552.001'], first_seen: '2026-09-10', source: 'Secret scanning', owner: 'AI Platform', dimensions: [C], remediation: { action: 'Proxy calls through backend with per-user tokens; rotate key', effort: 'low', cost_usd: 8000, eta_days: 7 } },
    // --- Endpoint / IT / IoT ---
    { id: 'CR-060', type: 'misconfiguration', title: 'EDR agent missing on APAC endpoints', severity: 'high', exploitability: 'poc', asset_ids: [], control_ids: ['CTL-10'], mitre_techniques: ['T1562.001'], first_seen: '2026-08-18', source: 'IRTriage inventory vs EDR console', owner: 'IT Operations', dimensions: [I, K], remediation: { action: 'Deploy agent via MDM; block network access for unmanaged devices', effort: 'low', cost_usd: 5000, eta_days: 7 } },
    { id: 'CR-061', type: 'misconfiguration', title: 'Local administrator rights on developer laptops', severity: 'medium', exploitability: 'poc', asset_ids: [], control_ids: ['CTL-07', 'CTL-04'], mitre_techniques: ['T1078.003'], first_seen: '2025-11-20', source: 'Endpoint posture', owner: 'IT Operations', dimensions: [I], remediation: { action: 'Just-in-time elevation tool', effort: 'medium', cost_usd: 20000, eta_days: 45 } },
    { id: 'CR-062', type: 'vulnerability', title: 'HQ badge-reader controllers on end-of-life firmware', severity: 'medium', cvss: 7.2, epss: 0.05, exploitability: 'theoretical', vuln_id: 'ACME-VULN-IOT-0022', asset_ids: ['IOT-BOS-BADGE01', 'IOT-BOS-BADGE02', 'IOT-BOS-BADGE03', 'IOT-BOS-BADGE04', 'IOT-BOS-BADGE05', 'IOT-BOS-BADGE06', 'IOT-BOS-BADGE07', 'IOT-BOS-BADGE08'], control_ids: ['CTL-29', 'CTL-35'], mitre_techniques: [], first_seen: '2026-02-14', source: 'Network discovery', owner: 'Facilities', dimensions: [A, K], remediation: { action: 'Replace controllers (capex approved)', effort: 'high', cost_usd: 60000, eta_days: 90 } },
    { id: 'CR-063', type: 'misconfiguration', title: 'Conference-room systems use vendor default credentials', severity: 'medium', exploitability: 'poc', asset_ids: ['IOT-BOS-CONF01', 'IOT-BOS-CONF02', 'IOT-DUB-CONF01', 'IOT-SIN-CONF01', 'IOT-TLV-CONF01'], control_ids: ['CTL-29', 'CTL-04'], mitre_techniques: ['T1078.001'], first_seen: '2026-05-27', source: 'Network discovery', owner: 'Facilities', dimensions: [C], remediation: { action: 'Rotate credentials; move to IoT VLAN', effort: 'low', cost_usd: 3000, eta_days: 7 } },
    { id: 'CR-064', type: 'exposure', title: 'APAC firewall management interface exposed to the internet', severity: 'high', exploitability: 'poc', asset_ids: ['NET-SIN-FWMGMT', 'NET-SIN-FW01'], control_ids: ['CTL-16', 'CTL-37'], mitre_techniques: ['T1133'], first_seen: '2026-09-15', source: 'Attack-surface scan', owner: 'Network Engineering', dimensions: [A, I, C], remediation: { action: 'Restrict management plane to admin VPN', effort: 'low', cost_usd: 2000, eta_days: 1 } },
    { id: 'CR-065', type: 'incident_finding', title: 'Unapproved remote-access tool found on two consultant laptops', severity: 'medium', exploitability: 'known_exploited', asset_ids: [], control_ids: ['CTL-04', 'CTL-10'], mitre_techniques: ['T1219'], first_seen: '2026-09-18', source: 'IRTriage triage (Professional Services laptops)', owner: 'Security Operations', dimensions: [C, I], remediation: { action: 'Remove tool, collect triage, confirm no customer data accessed', effort: 'low', cost_usd: 4000, eta_days: 2 } },
    { id: 'CR-066', type: 'misconfiguration', title: 'TIP feed bucket grants write access to a decommissioned partner account', severity: 'high', exploitability: 'poc', asset_ids: ['GCP-GCS-TIP-FEEDS'], control_ids: ['CTL-25', 'CTL-05'], mitre_techniques: ['T1565.001'], first_seen: '2026-08-29', source: 'CSPM', owner: 'Threat Research', dimensions: [I, A], remediation: { action: 'Remove binding; require signed feed manifests', effort: 'low', cost_usd: 3000, eta_days: 2 } },
    // --- Denial-of-service cluster (website, portal, TIP API): availability SLAs ---
    { id: 'CR-070', type: 'misconfiguration', title: 'No volumetric DDoS protection on customer-facing edges (portal, TIP API, website)', severity: 'high', exploitability: 'poc', asset_ids: ['AWS-ALB-PORTAL', 'AWS-APIGW-TIP', 'WEB-CDN'], control_ids: ['CTL-17', 'CTL-15'], mitre_techniques: ['T1498'], first_seen: '2026-06-20', source: 'Architecture review', owner: 'Security Engineering', dimensions: [A], remediation: { action: 'Enrol all edges in managed DDoS protection with always-on detection and a response runbook', effort: 'medium', cost_usd: 90000, eta_days: 30 } },
    { id: 'CR-071', type: 'exposure', title: 'Corporate website origin reachable directly, bypassing the CDN', severity: 'medium', exploitability: 'poc', asset_ids: ['WEB-ORIGIN'], control_ids: ['CTL-16', 'CTL-17'], mitre_techniques: ['T1499'], first_seen: '2026-08-11', source: 'Attack-surface scan', owner: 'Marketing Technology', dimensions: [A], remediation: { action: 'Accept origin traffic from the CDN only; add origin authentication header', effort: 'low', cost_usd: 4000, eta_days: 5 } },
    { id: 'CR-072', type: 'misconfiguration', title: 'No per-client rate limiting on the TIP public API', severity: 'high', exploitability: 'poc', asset_ids: ['AWS-APIGW-TIP'], control_ids: ['CTL-17'], mitre_techniques: ['T1499'], first_seen: '2026-07-02', source: 'API gateway review', owner: 'Platform Engineering', dimensions: [A], remediation: { action: 'Usage plans with per-key throttling and burst limits', effort: 'low', cost_usd: 9000, eta_days: 10 } },
    { id: 'CR-073', type: 'ioa', title: 'Recurring request-rate anomalies against the customer portal login (3 episodes in September)', severity: 'medium', exploitability: 'known_exploited', asset_ids: ['AWS-ALB-PORTAL', 'SEC-WAF'], control_ids: ['CTL-12', 'CTL-17'], mitre_techniques: ['T1499'], first_seen: '2026-09-06', source: 'SOC alert (edge)', owner: 'Security Operations', dimensions: [A], remediation: { action: 'Tune WAF rate rules, enable bot management, confirm no account-guessing component', effort: 'low', cost_usd: 6000, eta_days: 3 } },
    { id: 'CR-074', type: 'exposure', title: 'Staff credentials present in third-party breach data (12 accounts, 2 in finance)', severity: 'high', exploitability: 'known_exploited', asset_ids: ['SAAS-IDP'], control_ids: ['CTL-06', 'CTL-26'], mitre_techniques: ['T1078'], first_seen: '2026-09-16', source: 'Threat-intel monitoring', owner: 'Security Operations', dimensions: [C], component_ids: ['PPL-FIN', 'PPL-EXEC', 'PPL-SALES'], remediation: { action: 'Force password resets, confirm MFA enrolment, watch sign-ins for 30 days', effort: 'low', cost_usd: 3000, eta_days: 2 } },
  ];
  // Endpoint-population story risks get their assets from the inventory.
  const ep = assets.filter((a) => a.class === 'endpoint');
  S.find((r) => r.id === 'CR-060').asset_ids = ep.filter((a) => a.site === 'SIN' && !a.edr).map((a) => a.id);
  S.find((r) => r.id === 'CR-061').asset_ids = ep.filter((a) => a.department === 'Engineering').slice(0, 64).map((a) => a.id);
  S.find((r) => r.id === 'CR-065').asset_ids = ep.filter((a) => a.department === 'Professional Services' && a.site === 'REM').slice(0, 2).map((a) => a.id);
  for (const r of S) addRisk(r);
}

/** Breadth: templated register entries spread across the estate. */
function templatedRisks() {
  let seq = 100;
  const nextId = () => `CR-${String(seq++).padStart(3, '0')}`;
  const firstSeen = () => `${T.pick(MONTHS.slice(0, 11))}-${String(T.int(1, 28)).padStart(2, '0')}`;
  const sevPick = () => T.pick(['medium', 'medium', 'low', 'low', 'high']);

  const ep = assets.filter((a) => a.class === 'endpoint');
  for (const site of ['BOS', 'DUB', 'SIN', 'TLV', 'REM']) {
    const pool = ep.filter((a) => a.site === site);
    const missing = T.sample(pool, Math.max(4, Math.round(pool.length * (site === 'SIN' ? 0.22 : 0.1))));
    addRisk({ id: nextId(), type: 'vulnerability', title: `Critical OS updates > 30 days overdue on ${missing.length} endpoints (${site})`, severity: site === 'SIN' ? 'high' : 'medium', cvss: 8.1, epss: 0.18, exploitability: 'poc', vuln_id: `ACME-VULN-OSCU-${site}`, asset_ids: missing.map((a) => a.id), control_ids: ['CTL-03'], mitre_techniques: ['T1203'], first_seen: firstSeen(), source: 'Patch management', owner: 'IT Operations', dimensions: [I, A, K], remediation: { action: 'Force-install via MDM with deadline', effort: 'low', cost_usd: 2000, eta_days: 7 } });
    const browser = T.sample(pool, Math.max(3, Math.round(pool.length * 0.06)));
    addRisk({ id: nextId(), type: 'vulnerability', title: `Browser with known-exploited flaw on ${browser.length} endpoints (${site})`, severity: 'high', cvss: 8.8, epss: 0.62, exploitability: 'known_exploited', vuln_id: `ACME-VULN-BRW-${site}`, asset_ids: browser.map((a) => a.id), control_ids: ['CTL-03'], mitre_techniques: ['T1189'], first_seen: `2026-09-${String(T.int(1, 25)).padStart(2, '0')}`, source: 'Vulnerability scanner', owner: 'IT Operations', dimensions: [I, C], remediation: { action: 'Auto-update browsers; restart enforcement', effort: 'low', cost_usd: 1000, eta_days: 3 } });
  }

  const servers = assets.filter((a) => a.class === 'server');
  const SERVER_TEMPLATES = [
    ['misconfiguration', 'SMB signing not required', ['CTL-04'], ['T1557.001'], [I, C]],
    ['misconfiguration', 'Local admin password not rotated (no LAPS)', ['CTL-07'], ['T1078.003'], [I]],
    ['misconfiguration', 'Audit policy below logging baseline', ['CTL-11'], ['T1562.002'], [K]],
    ['vulnerability', 'Weak TLS cipher suites enabled', ['CTL-18'], ['T1557'], [C]],
    ['vulnerability', 'Outdated management agent with known flaw', ['CTL-02'], ['T1068'], [I, A]],
    ['misconfiguration', 'Host firewall disabled', ['CTL-04', 'CTL-16'], ['T1562.004'], [I, C]],
    ['vulnerability', 'OpenSSH version with known vulnerability', ['CTL-02'], ['T1210'], [I]],
  ];
  for (let i = 0; i < 24; i++) {
    const [type, title, ctl, mitre, dims] = T.pick(SERVER_TEMPLATES);
    const targets = T.sample(servers, T.int(1, 4));
    const sev = sevPick();
    addRisk({ id: nextId(), type, title: `${title} on ${targets.length} server${targets.length > 1 ? 's' : ''}`, severity: sev, ...(type === 'vulnerability' ? { cvss: T.round(4 + T.rng() * 4.5, 1), epss: T.round(T.rng() * 0.3, 2), vuln_id: `ACME-VULN-SRV-${String(i + 1).padStart(3, '0')}` } : {}), exploitability: T.pick(['theoretical', 'poc', 'poc']), asset_ids: targets.map((a) => a.id), control_ids: ctl, mitre_techniques: mitre, first_seen: firstSeen(), source: T.pick(['Vulnerability scanner', 'Configuration audit', 'IRTriage collection']), owner: 'IT Operations', dimensions: dims, remediation: { action: 'Apply hardening baseline / update', effort: T.pick(['low', 'low', 'medium']), cost_usd: T.int(1, 8) * 1000, eta_days: T.int(3, 30) } });
  }

  const cloudAssets = assets.filter((a) => a.class === 'cloud_resource');
  const CLOUD_TEMPLATES = [
    ['misconfiguration', 'Access logging disabled', ['CTL-11', 'CTL-05'], [], [K]],
    ['misconfiguration', 'Encryption key rotation overdue', ['CTL-19'], [], [C, K]],
    ['misconfiguration', 'Unencrypted snapshot retained', ['CTL-19'], ['T1530'], [C]],
    ['misconfiguration', 'Over-permissive IAM role (wildcard actions)', ['CTL-07', 'CTL-05'], ['T1098'], [C, I]],
    ['misconfiguration', 'Deletion protection disabled', ['CTL-14'], ['T1485'], [A]],
    ['exposure', 'Management port open to 0.0.0.0/0 in non-production security group', ['CTL-16'], ['T1133'], [C, I]],
    ['misconfiguration', 'Kubernetes audit logs not exported to SIEM', ['CTL-11'], ['T1562.008'], [K]],
    ['misconfiguration', 'Container images run as root', ['CTL-04'], ['T1611'], [I]],
  ];
  for (let i = 0; i < 26; i++) {
    const [type, title, ctl, mitre, dims] = T.pick(CLOUD_TEMPLATES);
    const target = T.pick(cloudAssets);
    addRisk({ id: nextId(), type, title: `${title} — ${target.name}`, severity: T.pick(['medium', 'low', 'low', 'medium', 'high']), exploitability: T.pick(['theoretical', 'theoretical', 'poc']), asset_ids: [target.id], control_ids: ctl, mitre_techniques: mitre, first_seen: firstSeen(), source: 'CSPM', owner: 'Cloud Platform', dimensions: dims, remediation: { action: 'Apply CSPM recommended fix via IaC', effort: 'low', cost_usd: T.int(1, 5) * 1000, eta_days: T.int(2, 21) } });
  }

  const SAAS_TEMPLATES = [
    ['SAAS-COLLAB', 'misconfiguration', 'Anonymous link sharing enabled for 312 documents', ['CTL-20'], ['T1567'], [C]],
    ['SAAS-CRM', 'exposure', 'Stale integration tokens with full CRM API access', ['CTL-21'], ['T1550.001'], [C]],
    ['SAAS-CHAT', 'misconfiguration', 'External guests in 18 internal channels', ['CTL-20'], [], [C]],
    ['SAAS-ITSM', 'misconfiguration', 'ITSM admin role assigned to 9 non-IT users', ['CTL-07'], ['T1078'], [I]],
    ['SAAS-TRACK', 'exposure', 'Public issue board exposes internal project names', ['CTL-20'], [], [C]],
    ['SAAS-BI', 'misconfiguration', 'Dashboards published to web without authentication', ['CTL-20'], ['T1530'], [C]],
  ];
  for (const [asset, type, title, ctl, mitre, dims] of SAAS_TEMPLATES) {
    addRisk({ id: nextId(), type, title, severity: T.pick(['medium', 'low', 'medium']), exploitability: 'poc', asset_ids: [asset], control_ids: ctl, mitre_techniques: mitre, first_seen: firstSeen(), source: 'SaaS posture (CASB)', owner: 'IT Applications', dimensions: dims, remediation: { action: 'Tighten tenant policy', effort: 'low', cost_usd: 1000, eta_days: 5 } });
  }

  const printers = assets.filter((a) => a.subtype === 'printer');
  for (const site of ['BOS', 'DUB', 'SIN', 'TLV']) {
    const pool = printers.filter((a) => a.site === site);
    addRisk({ id: nextId(), type: 'misconfiguration', title: `Printers expose legacy SMBv1 and unauthenticated web admin (${site})`, severity: 'low', exploitability: 'theoretical', asset_ids: pool.map((a) => a.id), control_ids: ['CTL-29', 'CTL-04'], mitre_techniques: [], first_seen: firstSeen(), source: 'Network discovery', owner: 'Facilities', dimensions: [C], remediation: { action: 'Disable SMBv1, set admin password, move to IoT VLAN', effort: 'low', cost_usd: 500, eta_days: 5 } });
  }

  // Historical, already-mitigated risks (they make the 12-month trend honest).
  for (let i = 0; i < 16; i++) {
    const target = T.pick(assets.filter((a) => a.class !== 'endpoint'));
    const opened = T.int(0, 7);
    const closed = Math.min(11, opened + T.int(1, 3));
    addRisk({ id: nextId(), type: T.pick(['vulnerability', 'misconfiguration', 'exposure']), title: `${T.pick(['Unpatched service', 'Public exposure', 'Weak configuration', 'Excessive permissions'])} on ${target.name} (remediated)`, severity: T.pick(['high', 'medium', 'medium', 'critical']), exploitability: T.pick(['poc', 'theoretical', 'known_exploited']), asset_ids: [target.id], control_ids: ['CTL-02'], mitre_techniques: [], first_seen: `${MONTHS[opened]}-${String(T.int(1, 28)).padStart(2, '0')}`, status: 'mitigated', closed_on: `${MONTHS[closed]}-${String(T.int(1, 28)).padStart(2, '0')}`, source: 'Vulnerability scanner', owner: target.owner || 'IT Operations', dimensions: [A, I, C], remediation: { action: 'Remediated', effort: 'low', cost_usd: 0, eta_days: 0 } });
  }
  // A couple of formally accepted risks.
  risks.find((r) => r.id === 'CR-042').status = 'accepted';
  risks.find((r) => r.id === 'CR-061').status = 'in_progress';
}

// ---------------------------------------------------------------------------
// Ingested documents & data-source connectors (mocked)
// ---------------------------------------------------------------------------

const DOCUMENTS = [
  { id: 'DOC-01', title: 'Business Impact Analysis 2026', format: 'docx', category: 'BIA', source: 'SharePoint — Risk Office', pages: 46, ingested_on: '2026-09-29', extraction: { method: 'AI extraction (mock)', confidence: 'high', extracted: ['10 business services', 'RTO/RPO/MTPD per service', 'downtime cost per hour', 'service dependencies'] } },
  { id: 'DOC-02', title: 'MDR Master Services Agreement v4 (template)', format: 'pdf', category: 'SLA contract', source: 'Contract repository', pages: 38, ingested_on: '2026-09-29', extraction: { method: 'AI extraction (mock)', confidence: 'high', extracted: ['MTTD/MTTR SLAs', 'availability 99.9%', 'service-credit schedule'] } },
  { id: 'DOC-03', title: 'Customer Portal SLA', format: 'pdf', category: 'SLA contract', source: 'Contract repository', pages: 9, ingested_on: '2026-09-29', extraction: { method: 'AI extraction (mock)', confidence: 'high', extracted: ['availability 99.95%', 'tiered credits up to 25%'] } },
  { id: 'DOC-04', title: 'TIP Subscription Terms v2', format: 'pdf', category: 'SLA contract', source: 'Contract repository', pages: 14, ingested_on: '2026-09-29', extraction: { method: 'AI extraction (mock)', confidence: 'moderate', extracted: ['API availability 99.95%', 'feed freshness 30 min'] } },
  { id: 'DOC-05', title: 'Information Security Policy', format: 'pdf', category: 'GRC policy', source: 'ServiceNow GRC', pages: 22, ingested_on: '2026-09-28', extraction: { method: 'Structured import', confidence: 'high', extracted: ['15 policies', 'policy owners', 'review dates'] } },
  { id: 'DOC-06', title: 'ISO 27001 Statement of Applicability', format: 'xlsx', category: 'GRC', source: 'ServiceNow GRC', pages: null, ingested_on: '2026-09-28', extraction: { method: 'Structured import', confidence: 'high', extracted: ['93 Annex A controls', 'applicability', 'implementation status'] } },
  { id: 'DOC-07', title: 'SOC 2 Type II report (FY2026)', format: 'pdf', category: 'Audit report', source: 'Auditor portal', pages: 112, ingested_on: '2026-09-27', extraction: { method: 'AI extraction (mock)', confidence: 'moderate', extracted: ['3 exceptions noted', 'CC6.1 / CC6.2 / CC8.1'] } },
  { id: 'DOC-08', title: 'Board Risk Appetite Statement', format: 'docx', category: 'Governance', source: 'Board portal', pages: 4, ingested_on: '2026-09-29', extraction: { method: 'AI extraction (mock)', confidence: 'high', extracted: ['annual value-at-risk tolerance $6M', 'service likelihood ceiling 35%', 'compliance floor 80%'] } },
  { id: 'DOC-09', title: 'FY2027 Corporate Goals', format: 'pptx', category: 'Strategy', source: 'Business owner upload', pages: 12, ingested_on: '2026-09-30', extraction: { method: 'AI extraction (mock)', confidence: 'moderate', extracted: ['6 corporate goals', 'goal owners', 'linked KPIs'] } },
  { id: 'DOC-11', title: 'Q3 FY26 Board of Directors cyber-risk report', format: 'pptx', category: 'Board report', source: 'Board portal', pages: 18, ingested_on: '2026-09-30', extraction: { method: 'AI extraction (mock)', confidence: 'high', extracted: ['8 business SLOs with FY27 targets', 'risk-appetite reaffirmed', 'CISO top-5 cyber risks'] } },
  { id: 'DOC-12', title: 'Management note: FY27 plan forecast and SLO targets (CFO)', format: 'docx', category: 'Management note', source: 'Business owner upload', pages: 3, ingested_on: '2026-09-30', extraction: { method: 'AI extraction (mock)', confidence: 'high', extracted: ['plan forecast per SLO', 'financial basis per SLO', 'warning thresholds'] } },
  { id: 'DOC-10', title: 'Cloud architecture overview', format: 'pdf', category: 'Architecture', source: 'Confluence export', pages: 31, ingested_on: '2026-09-26', extraction: { method: 'AI extraction (mock)', confidence: 'moderate', extracted: ['AWS/Azure/GCP accounts', 'service-to-resource mapping'] } },
];

const CONNECTORS = [
  { id: 'CON-PBI', name: 'Power BI (KPIs & SLO metrics)', kind: 'api', category: 'BI / DSS', status: 'connected', last_sync: '2026-09-30T06:00:00Z', records: 37, schedule: 'hourly' },
  { id: 'CON-SNOW', name: 'ServiceNow GRC (controls, policies, risks)', kind: 'api', category: 'GRC', status: 'connected', last_sync: '2026-09-30T05:30:00Z', records: 55, schedule: 'daily' },
  { id: 'CON-AWS', name: 'AWS Security Hub', kind: 'api', category: 'Cloud posture', status: 'connected', last_sync: '2026-09-30T07:15:00Z', records: 41, schedule: 'hourly' },
  { id: 'CON-AZ', name: 'Microsoft Defender for Cloud', kind: 'api', category: 'Cloud posture', status: 'connected', last_sync: '2026-09-30T07:10:00Z', records: 17, schedule: 'hourly' },
  { id: 'CON-GCP', name: 'Google Security Command Center', kind: 'api', category: 'Cloud posture', status: 'degraded', last_sync: '2026-09-29T22:40:00Z', records: 9, schedule: 'hourly', note: 'API quota exceeded on last two runs' },
  { id: 'CON-VULN', name: 'Vulnerability scanner', kind: 'api', category: 'Vulnerabilities', status: 'connected', last_sync: '2026-09-30T04:00:00Z', records: 63, schedule: 'daily' },
  { id: 'CON-EDR', name: 'EDR console (coverage & alerts)', kind: 'api', category: 'Security controls', status: 'connected', last_sync: '2026-09-30T07:20:00Z', records: 512, schedule: '15 min' },
  { id: 'CON-JIRA', name: 'Jira (remediation tickets)', kind: 'api', category: 'Workflow', status: 'connected', last_sync: '2026-09-30T07:00:00Z', records: 88, schedule: 'hourly' },
  { id: 'CON-MCP-BI', name: 'acme-bi MCP server (Streamable HTTP)', kind: 'mcp', category: 'BI / DSS', status: 'connected', last_sync: '2026-09-30T07:22:00Z', records: 12, schedule: 'on demand', note: 'Tools: query_kpi, list_services, get_bia' },
  { id: 'CON-MCP-GRC', name: 'grc-evidence MCP server', kind: 'mcp', category: 'GRC', status: 'not_configured', last_sync: null, records: 0, schedule: 'on demand' },
  { id: 'CON-IRT', name: 'IRTriage collections (ZIP upload)', kind: 'file', category: 'Triage', status: 'connected', last_sync: '2026-09-30T03:12:00Z', records: 543, schedule: 'manual' },
];

// ---------------------------------------------------------------------------
// Real-world products and framework references (presentation realism)
//
// Brand keys resolve to icons/badges in web/assets/js/business/brands.js. The
// vulnerability ids stay fictional (ACME-VULN-*): no finding here is a claim
// about a real product. Assets that carry a fictional product FLAW are left
// unbranded on purpose.
// ---------------------------------------------------------------------------

const ASSET_BRANDS = {
  'SAAS-IDP': ['okta', 'Okta Workforce Identity'], 'SAAS-HRIS': ['workday', 'Workday HCM'], 'SAAS-CODE': ['github', 'GitHub Enterprise Cloud'],
  'SAAS-CRM': ['salesforce', 'Salesforce Sales Cloud'], 'SAAS-COLLAB': ['microsoft365', 'Microsoft 365'], 'SAAS-BI': ['powerbi', 'Microsoft Power BI'],
  'SAAS-ITSM': ['servicenow', 'ServiceNow ITSM & GRC'], 'SAAS-PAY': ['stripe', 'Stripe Payments'], 'SAAS-CHAT': ['slack', 'Slack Enterprise Grid'],
  'SAAS-TRACK': ['jira', 'Jira Software'],
  'CICD-ARTIFACTS': ['jfrog', 'JFrog Artifactory'], 'CICD-VAULT': ['vault', 'HashiCorp Vault'], 'CICD-ARGO': ['argo', 'Argo CD'], 'CICD-SIGN': ['sigstore', 'Sigstore cosign'],
  'SEC-EDR': ['crowdstrike', 'CrowdStrike Falcon Insight'], 'SEC-SIEM': ['splunk', 'Splunk Enterprise Security'], 'SEC-SOAR': ['splunk', 'Splunk SOAR'],
  'SEC-MAILGW': ['proofpoint', 'Proofpoint Email Protection'], 'SEC-WAF': ['cloudflare', 'Cloudflare WAF'], 'SEC-CASB': ['netskope', 'Netskope CASB'],
  'SEC-PAM': ['cyberark', 'CyberArk Privilege Cloud'], 'SEC-DLP': ['microsoft', 'Microsoft Purview DLP'], 'SEC-VULN': ['qualys', 'Qualys VMDR'],
  'SEC-BACKUP': ['veeam', 'Veeam Backup & Replication'], 'SEC-IRTRIAGE': ['irtriage', 'IRTriage'],
  'AI-TRIAGE': ['claude', 'Claude (Amazon Bedrock)'], 'AI-ASSIST': ['openai', 'ChatGPT Enterprise'], 'AI-TIP-ENRICH': ['anthropic', 'Claude API'],
  'AI-SALES': ['salesforce', 'Salesforce Einstein'], 'AI-CODE': ['githubcopilot', 'GitHub Copilot Business'],
  'NET-SDWAN': ['cisco', 'Cisco Catalyst SD-WAN'], 'WEB-CDN': ['cloudflare', 'Cloudflare CDN'],
  'AWS-EKS-MDR': ['kubernetes', 'Amazon EKS'], 'AWS-EKS-MDR-EU': ['kubernetes', 'Amazon EKS'], 'AWS-EKS-TIP': ['kubernetes', 'Amazon EKS'],
  'GCP-GKE-TIP-ML': ['kubernetes', 'Google Kubernetes Engine'], 'AZ-AKS-PS': ['kubernetes', 'Azure Kubernetes Service'],
  'AWS-RDS-TIP': ['postgresql', 'Amazon RDS for PostgreSQL'], 'GCP-BQ-TIP': ['googlebigquery', 'Google BigQuery'],
  'API-PORTAL': ['openapi', 'OpenAPI 3.1 (AWS API Gateway)'], 'API-TIP': ['openapi', 'OpenAPI 3.1 (AWS API Gateway)'], 'API-PARTNER': ['openapi', 'OpenAPI 3.1'],
  'DN-CREDS': ['recordedfuture', 'Recorded Future Identity Intelligence'], 'DN-BRAND': ['flashpoint', 'Flashpoint Ignite'],
  'LOG-CLOUDTRAIL': ['aws', 'AWS CloudTrail'], 'LOG-ENTRA': ['microsoft', 'Microsoft Entra ID'], 'LOG-OKTA': ['okta', 'Okta System Log'],
  'LOG-GITHUB': ['github', 'GitHub audit log streaming'], 'LOG-WINSEC': ['windows', 'Windows Event Forwarding'], 'LOG-PANOS': ['paloaltonetworks', 'Palo Alto Networks Strata Logging'],
  'LOG-K8S': ['kubernetes', 'Kubernetes audit'],
};

function brandFor(a) {
  if (ASSET_BRANDS[a.id]) return ASSET_BRANDS[a.id];
  if (a.class === 'network_device' && /-FW01$/.test(a.id)) return ['paloaltonetworks', 'Palo Alto Networks PA-Series'];
  if (a.class === 'network_device' && /CORE|WLC/.test(a.id)) return ['cisco', /WLC/.test(a.id) ? 'Cisco Meraki wireless' : 'Cisco Catalyst 9500'];
  if (a.subtype === 'conference_system') return ['zoom', 'Zoom Rooms'];
  if (a.class === 'cicd' && /RUNNER/.test(a.id)) return ['githubactions', 'GitHub Actions self-hosted runner'];
  if (a.cloud === 'aws') return ['aws', 'Amazon Web Services'];
  if (a.cloud === 'azure') return ['azure', 'Microsoft Azure'];
  if (a.cloud === 'gcp') return ['googlecloud', 'Google Cloud'];
  const p = a.platform || '';
  if (/^macOS/.test(p)) return ['apple', p];
  if (/^Ubuntu/.test(p)) return ['ubuntu', p];
  if (/^RHEL/.test(p)) return ['redhat', `Red Hat Enterprise Linux ${p.split(' ')[1] || ''}`.trim()];
  if (/^Windows/.test(p)) return ['windows', p];
  return null;
}

function applyBrands() {
  for (const a of assets) {
    const b = brandFor(a);
    if (b) { a.brand = b[0]; a.product = b[1]; }
  }
  // Data sources are wired into the components that consume them.
  const comp = (id) => COMPONENTS.find((c) => c.id === id);
  comp('SYS-PORTAL').asset_ids.push('API-PORTAL');
  comp('SYS-TIP').asset_ids.push('API-TIP');
  comp('SYS-MDR').asset_ids.push('API-PARTNER');
  comp('SYS-SIEM').asset_ids.push('DN-CREDS', 'DN-BRAND', 'LOG-CLOUDTRAIL', 'LOG-ENTRA', 'LOG-OKTA', 'LOG-GITHUB', 'LOG-WINSEC', 'LOG-PANOS', 'LOG-K8S');
}

// MITRE ATT&CK / ATLAS technique names (as published) for the ids the register uses.
const TECHNIQUE_NAMES = {
  T1190: 'Exploit Public-Facing Application', T1133: 'External Remote Services', T1189: 'Drive-by Compromise',
  'T1195.001': 'Compromise Software Dependencies and Development Tools', 'T1195.002': 'Compromise Software Supply Chain',
  T1078: 'Valid Accounts', 'T1078.001': 'Default Accounts', 'T1078.002': 'Domain Accounts', 'T1078.003': 'Local Accounts', 'T1078.004': 'Cloud Accounts',
  T1203: 'Exploitation for Client Execution', T1098: 'Account Manipulation', T1068: 'Exploitation for Privilege Escalation', T1611: 'Escape to Host',
  'T1562.001': 'Disable or Modify Tools', 'T1562.002': 'Disable Windows Event Logging', 'T1562.004': 'Disable or Modify System Firewall',
  'T1562.008': 'Disable or Modify Cloud Logs', 'T1550.001': 'Application Access Token', T1528: 'Steal Application Access Token',
  'T1552.001': 'Credentials In Files', T1557: 'Adversary-in-the-Middle', 'T1557.001': 'LLMNR/NBT-NS Poisoning and SMB Relay',
  T1210: 'Exploitation of Remote Services', T1530: 'Data from Cloud Storage', T1185: 'Browser Session Hijacking', 'T1071.001': 'Web Protocols',
  T1219: 'Remote Access Software', T1567: 'Exfiltration Over Web Service', T1490: 'Inhibit System Recovery', T1485: 'Data Destruction',
  'T1565.001': 'Stored Data Manipulation', T1498: 'Network Denial of Service', T1499: 'Endpoint Denial of Service',
  'AML.T0051': 'LLM Prompt Injection', 'AML.T0057': 'LLM Data Leakage',
};

const OWASP = {
  A01: ['A01:2021', 'Broken Access Control', 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/'],
  A02: ['A02:2021', 'Cryptographic Failures', 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/'],
  A05: ['A05:2021', 'Security Misconfiguration', 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/'],
  A06: ['A06:2021', 'Vulnerable and Outdated Components', 'https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/'],
  A07: ['A07:2021', 'Identification and Authentication Failures', 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/'],
  A08: ['A08:2021', 'Software and Data Integrity Failures', 'https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/'],
  A09: ['A09:2021', 'Security Logging and Monitoring Failures', 'https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/'],
  API2: ['API2:2023', 'Broken Authentication', 'https://owasp.org/API-Security/editions/2023/en/0xa2-broken-authentication/'],
  API4: ['API4:2023', 'Unrestricted Resource Consumption', 'https://owasp.org/API-Security/editions/2023/en/0xa4-unrestricted-resource-consumption/'],
  LLM01: ['LLM01:2025', 'Prompt Injection', 'https://genai.owasp.org/llmrisk/llm01-prompt-injection/'],
  LLM02: ['LLM02:2025', 'Sensitive Information Disclosure', 'https://genai.owasp.org/llmrisk/llm022025-sensitive-information-disclosure/'],
};
const OWASP_STORY = {
  'CR-001': 'A08', 'CR-002': 'A05', 'CR-003': 'A01', 'CR-004': 'A05', 'CR-005': 'A02', 'CR-013': 'A07', 'CR-016': 'LLM01', 'CR-023': 'A07',
  'CR-024': 'A06', 'CR-040': 'A08', 'CR-052': 'LLM02', 'CR-053': 'API2', 'CR-070': 'API4', 'CR-071': 'A05', 'CR-072': 'API4', 'CR-073': 'API4', 'CR-074': 'A07',
};
function owaspFor(r) {
  if (OWASP_STORY[r.id]) return OWASP_STORY[r.id];
  const t = r.title;
  if (/TLS cipher|key rotation|Unencrypted snapshot/.test(t)) return 'A02';
  if (/OpenSSH|management agent|OS updates|Browser with/.test(t)) return 'A06';
  if (/link sharing|published to web|issue board|IAM role/.test(t)) return 'A01';
  if (/logging disabled|audit logs not exported|Audit policy/.test(t)) return 'A09';
  if (/run as root|SMB signing|Host firewall|Management port/.test(t)) return 'A05';
  return null;
}
const techniqueUrl = (t) => (t.startsWith('AML.') ? `https://atlas.mitre.org/techniques/${t}` : `https://attack.mitre.org/techniques/${t.replace('.', '/')}/`);

function applyReferences() {
  for (const r of risks) {
    const refs = (r.mitre_techniques || []).map((t) => ({ framework: t.startsWith('AML.') ? 'MITRE ATLAS' : 'MITRE ATT&CK', id: t, name: TECHNIQUE_NAMES[t] || t, url: techniqueUrl(t) }));
    const o = owaspFor(r);
    if (o) {
      const [id, name, url] = OWASP[o];
      refs.push({ framework: o.startsWith('API') ? 'OWASP API Top 10 (2023)' : o.startsWith('LLM') ? 'OWASP LLM Top 10 (2025)' : 'OWASP Top 10 (2021)', id, name, url });
    }
    r.references = refs;
  }
  // Data sources that produced findings: the darknet feed found the leaked credentials,
  // and the APIs carry the API-layer findings.
  risks.find((r) => r.id === 'CR-074').asset_ids.push('DN-CREDS');
  risks.find((r) => r.id === 'CR-072').asset_ids.push('API-TIP');
  risks.find((r) => r.id === 'CR-073').asset_ids.push('API-PORTAL');
}

// ---------------------------------------------------------------------------
// BIA hierarchy (7 levels, many-to-many)
//
//   L1 SLOs                 business objectives with a financial basis (ARR, retention, margin ...)
//   L2 Policies             what must happen, and when, for each SLO to hold
//   L3 Business processes   the procedures that implement the policies
//   L4 BP components        the people, procedures, data and systems a process is made of
//   L5 Cyber-risk scenarios what can go wrong with a component (denial of service, ransomware ...)
//   L6 Hunts & findings     the posture findings and IOC/IOA hunts each scenario is derived from
//   L7 Evidence             the raw records behind every finding and hunt
//
// Every link is many-to-many: the CISO is a component of six processes, and
// "Denial of service" applies to the website, the portal, the TIP API and more.
// Nothing below carries a computed score: web/assets/js/business/bia.js derives
// every score and dollar figure from these links and the cyber-risk register.
//
// Uses its OWN rng stream, so adding BIA content never shifts the values of the
// sections above.
// ---------------------------------------------------------------------------

const T2 = rngTools(makeRng(0xac3e0002));

const SLOS = [
  // id, name, metric unit, direction, target, warning, plan forecast, decimals, basis usd, basis label, metric per usd, owner, kpi ids, description
  ['SLO-ARR', 'Annual recurring revenue (FY27 exit)', '$M', 1, 150, 152, 152.5, 1, 150e6, 'FY27 ARR target', 1e-6, 'CEO', ['MDR-NRR', 'TIP-ARR', 'CRM-PIPE', 'CRM-WIN'], 'Board-approved growth plan: grow ARR 25% to $150M.'],
  ['SLO-NEWARR', 'Net new ARR (FY27)', '$M', 1, 30, 31, 31.8, 1, 30e6, 'FY27 new-business bookings', 1e-6, 'CRO (Revenue)', ['CRM-PIPE', 'CRM-WIN', 'CI-DF'], 'New logos and expansions closed in the fiscal year.'],
  ['SLO-GRR', 'Gross revenue retention', '%', 1, 95, 95.5, 96.1, 1, 96e6, 'Renewal book (FY27)', 100 / 96e6, 'CRO (Revenue)', ['CRM-CHURN', 'MDR-CSAT', 'POR-AVAIL'], 'Share of last year’s recurring revenue kept, before expansion.'],
  ['SLO-NRR', 'Net revenue retention', '%', 1, 110, 111, 112.4, 1, 96e6, 'Renewal book incl. expansion', 100 / 96e6, 'CRO (Revenue)', ['MDR-NRR', 'PS-BACKLOG'], 'Retention including upsell; drives the MDR expansion plan.'],
  ['SLO-MARGIN', 'Operating margin', '%', 1, 18, 18.5, 18.9, 1, 120e6, 'FY27 revenue', 100 / 120e6, 'CFO', ['PS-UTIL', 'FIN-DSO', 'FIN-CLOSE'], 'Operating income over revenue; every unplanned dollar of incident cost lands here.'],
  ['SLO-SLA', 'Customer SLA attainment', '%', 1, 99.5, 99.7, 99.8, 2, 2.05e6, 'Contractual penalties and credits', 7.8 / 2.05e6, 'COO', ['MDR-MTTD', 'MDR-MTTR', 'MDR-ESC', 'POR-AVAIL', 'TIP-AVAIL', 'TIP-FRESH', 'PS-RESP'], 'Customer-months in which every contracted SLA was met.'],
  ['SLO-NPS', 'Net promoter score', 'pts', 1, 45, 47, 49, 0, 18e6, 'Advocacy-driven expansion pipeline', 25 / 18e6, 'COO', ['MDR-CSAT'], 'Relationship NPS from the quarterly customer survey.'],
  ['SLO-TRUST', 'Major audit non-conformities (ISO 27001, SOC 2, PCI DSS)', 'count', -1, 1, 0.5, 0, 1, 42e6, 'Revenue from customers that contractually require certification', 1 / 3e6, 'CISO', ['FIN-PCI', 'IT-PATCH', 'IT-EDR', 'IAM-MFA', 'IAM-PRIV'], 'Certifications are a procurement prerequisite for 40% of ACME’s customers.'],
];

const BIA_POLICIES = [
  // id, title, statement (what must happen, and when), cadence / deadline, owner, [slo, weight] — weight = share of the
  // SLO's financial basis lost if the policy fails (e.g. a customer-data breach costs 2% of ARR through churn and lost deals)
  ['POL-B01', 'Meet MDR contractual SLAs every month', 'Detect P1 threats within 15 min and respond within 60 min for every MDR customer, every month.', 'Monthly, continuous', 'COO', [['SLO-SLA', 0.052], ['SLO-GRR', 0.0053], ['SLO-NRR', 0.0084], ['SLO-NPS', 0.0528], ['SLO-ARR', 0.0102]]],
  ['POL-B02', 'Keep customer-facing platforms available', 'Portal, TIP API and website available at least 99.95% each month; degradations communicated within 30 min.', 'Monthly', 'CTO', [['SLO-SLA', 0.039], ['SLO-GRR', 0.0027], ['SLO-NPS', 0.036], ['SLO-ARR', 0.0068], ['SLO-NEWARR', 0.0152]]],
  ['POL-B03', 'Renew at least 95% of contracts at term', 'Hold a QBR at least 60 days before every renewal; resolve open security and service issues before the renewal date.', 'Per renewal, quarterly review', 'CRO (Revenue)', [['SLO-GRR', 0.0159], ['SLO-NRR', 0.0308], ['SLO-ARR', 0.0272]]],
  ['POL-B04', 'Generate 3x pipeline coverage every quarter', 'Keep pipeline at three times the quarterly bookings target; website and CRM must be available for lead capture.', 'Quarterly', 'CRO (Revenue)', [['SLO-NEWARR', 0.133], ['SLO-ARR', 0.0204]]],
  ['POL-B05', 'Protect customer data', 'Zero reportable customer-data breaches; any suspected breach assessed within 24 h and notified within 72 h (GDPR Art. 33).', 'Continuous', 'General Counsel', [['SLO-GRR', 0.0085], ['SLO-NRR', 0.014], ['SLO-ARR', 0.0204], ['SLO-TRUST', 0.075], ['SLO-NPS', 0.0432], ['SLO-NEWARR', 0.0304]]],
  ['POL-B06', 'Ship signed, attested releases every week', 'Every production release is signed and carries an SBOM; EU sovereign MDR region generally available by end of Q2 FY27.', 'Weekly; Q2 milestone', 'CTO', [['SLO-NEWARR', 0.0684], ['SLO-ARR', 0.0102], ['SLO-TRUST', 0.03]]],
  ['POL-B07', 'Bill accurately and collect within 45 days', 'Invoices issued within 2 days of period end at 99.5% accuracy; DSO at or below 45 days.', 'Monthly', 'CFO', [['SLO-MARGIN', 0.006]]],
  ['POL-B08', 'Close the books in 6 days; keep payments PCI compliant', 'Month-end close within 6 business days; card payments only through PCI DSS 4.0 compliant flows.', 'Monthly; annual QSA audit', 'CFO', [['SLO-MARGIN', 0.003], ['SLO-TRUST', 0.05]]],
  ['POL-B09', 'Least-privilege access, leavers removed within 24 h', 'Access granted by role, privileged access reviewed quarterly, leaver access removed within 24 h.', 'Daily; quarterly review', 'CISO', [['SLO-TRUST', 0.0625], ['SLO-MARGIN', 0.0012]]],
  ['POL-B10', 'Engage an IR responder within 2 h', 'For every retainer customer, a qualified responder engages within 2 h of the call, 24x7.', 'Per engagement', 'COO', [['SLO-SLA', 0.0156], ['SLO-NRR', 0.0084], ['SLO-NPS', 0.0192]]],
  ['POL-B11', 'Publish validated intelligence within 30 min', 'Curated intelligence reaches TIP customers within 30 min of validation, with integrity checks on every feed.', 'Continuous', 'CTO', [['SLO-SLA', 0.0104], ['SLO-NRR', 0.0084], ['SLO-ARR', 0.0068]]],
  ['POL-B12', 'Keep utilisation at 75% and costs within plan', 'Billable utilisation at least 75%; unplanned operating cost (including incidents) within 1% of plan.', 'Monthly', 'CFO', [['SLO-MARGIN', 0.0072]]],
  ['POL-B13', 'Recover every tier-1 service within its RTO', 'Tier-1 services restored within RTO from immutable backups; recovery tested every quarter.', 'Quarterly test; on incident', 'COO', [['SLO-SLA', 0.013], ['SLO-MARGIN', 0.0024], ['SLO-GRR', 0.0021]]],
];

// L4 components. asset_ids and/or asset_query link a component to the estate, so
// findings on those assets connect to it automatically.
const COMPONENTS = [
  // --- people ---
  { id: 'PPL-CISO', name: 'CISO & security leadership', category: 'people', owner: 'CISO', headcount: 4, asset_ids: ['SEC-PAM', 'SEC-SIEM'] },
  { id: 'PPL-SOC', name: 'SOC analysts (tiers 1–3)', category: 'people', owner: 'COO', headcount: 92, asset_query: { class: 'endpoint', department: 'SOC Operations' } },
  { id: 'PPL-SRE', name: 'SRE on-call engineers', category: 'people', owner: 'CTO', headcount: 14, asset_ids: ['CICD-ARGO', 'AWS-ACCT-SHARED'] },
  { id: 'PPL-ENG', name: 'Software engineers', category: 'people', owner: 'CTO', headcount: 116, asset_query: { class: 'endpoint', department: 'Engineering' } },
  { id: 'PPL-RES', name: 'Threat researchers', category: 'people', owner: 'CTO', headcount: 24, asset_query: { class: 'endpoint', department: 'Threat Research' } },
  { id: 'PPL-IR', name: 'IR consultants', category: 'people', owner: 'COO', headcount: 64, asset_query: { class: 'endpoint', department: 'Professional Services' } },
  { id: 'PPL-SALES', name: 'Account executives & customer success', category: 'people', owner: 'CRO (Revenue)', headcount: 90, asset_query: { class: 'endpoint', department: 'Sales' } },
  { id: 'PPL-FIN', name: 'Finance & billing team', category: 'people', owner: 'CFO', headcount: 24, asset_query: { class: 'endpoint', department: 'Finance' } },
  { id: 'PPL-HR', name: 'HR operations', category: 'people', owner: 'COO', headcount: 13, asset_query: { class: 'endpoint', department: 'People & HR' } },
  { id: 'PPL-IDADM', name: 'Identity & IT administrators', category: 'people', owner: 'CISO', headcount: 37, asset_query: { class: 'endpoint', department: 'IT & Security' } },
  { id: 'PPL-EXEC', name: 'Executives & board', category: 'people', owner: 'CEO', headcount: 40, asset_query: { class: 'endpoint', department: 'Executive & G&A' } },
  // --- procedures ---
  { id: 'PRC-ESC', name: 'P1 escalation runbook', category: 'process', owner: 'COO', asset_ids: ['SEC-SOAR', 'SAAS-CHAT'] },
  { id: 'PRC-CAB', name: 'Change approval (CAB)', category: 'process', owner: 'CTO', asset_ids: ['SAAS-ITSM', 'SAAS-TRACK'] },
  { id: 'PRC-SIGN', name: 'Release signing & attestation', category: 'process', owner: 'CTO', asset_ids: ['CICD-SIGN', 'SRV-BOS-PKI01'] },
  { id: 'PRC-ACR', name: 'Quarterly access review', category: 'process', owner: 'CISO', asset_ids: ['SEC-PAM', 'SAAS-ITSM'] },
  { id: 'PRC-RESTORE', name: 'Backup restore testing', category: 'process', owner: 'COO', asset_ids: ['SEC-BACKUP'] },
  { id: 'PRC-FEEDVAL', name: 'Feed validation & publishing workflow', category: 'process', owner: 'CTO', asset_ids: ['AI-TIP-ENRICH', 'GCP-GCS-TIP-FEEDS'] },
  { id: 'PRC-RECON', name: 'Payment reconciliation', category: 'process', owner: 'CFO', asset_ids: ['SAAS-PAY'] },
  { id: 'PRC-QBR', name: 'Quarterly business review', category: 'process', owner: 'CRO (Revenue)', asset_ids: ['SAAS-CRM', 'SAAS-BI'] },
  { id: 'PRC-DEPROV', name: 'Leaver deprovisioning', category: 'process', owner: 'CISO', asset_ids: ['SAAS-HRIS', 'SRV-BOS-HR01'] },
  // --- data ---
  { id: 'DATA-TEL', name: 'Customer security telemetry', category: 'data', owner: 'COO', classification: 'customer_confidential', asset_ids: ['AWS-S3-MDR-TEL', 'AWS-MSK-MDR', 'AWS-S3-LOGS'] },
  { id: 'DATA-PII', name: 'Customer account PII', category: 'data', owner: 'General Counsel', classification: 'customer_pii', asset_ids: ['AWS-RDS-PORTAL', 'AWS-S3-PORTAL-EXP'] },
  { id: 'DATA-INTEL', name: 'Threat-intel corpus & feeds', category: 'data', owner: 'CTO', classification: 'customer_confidential', asset_ids: ['GCP-BQ-TIP', 'GCP-GCS-TIP-FEEDS', 'AWS-RDS-TIP'] },
  { id: 'DATA-CODE', name: 'Source code & build artifacts', category: 'data', owner: 'CTO', classification: 'source_code', asset_ids: ['SAAS-CODE', 'CICD-ARTIFACTS', 'AWS-ECR'] },
  { id: 'DATA-CARD', name: 'Cardholder data', category: 'data', owner: 'CFO', classification: 'cardholder_financial', asset_ids: ['SAAS-PAY', 'AZ-APP-BILLING', 'AZ-SQL-FIN'] },
  { id: 'DATA-HR', name: 'Employee records', category: 'data', owner: 'COO', classification: 'employee_pii', asset_ids: ['SAAS-HRIS', 'SRV-BOS-HR01', 'AZ-SYN-BI'] },
  { id: 'DATA-CONTRACT', name: 'Contracts & pricing', category: 'data', owner: 'General Counsel', classification: 'internal_confidential', asset_ids: ['SAAS-CRM', 'SAAS-COLLAB', 'AI-ASSIST'] },
  { id: 'DATA-LEDGER', name: 'Financial ledger', category: 'data', owner: 'CFO', classification: 'cardholder_financial', asset_ids: ['SRV-DUB-SQL01', 'AZ-SQL-FIN', 'SRV-BOS-LEGACY01'] },
  { id: 'DATA-KEYS', name: 'Signing keys & secrets', category: 'data', owner: 'CISO', classification: 'secret', asset_ids: ['CICD-VAULT', 'CICD-SIGN', 'SRV-BOS-PKI01', 'AZ-KV-CORP'] },
  // --- systems / services ---
  { id: 'SYS-WEB', name: 'Company website (www)', category: 'system', owner: 'CRO (Revenue)', asset_ids: ['WEB-CDN', 'WEB-ORIGIN'] },
  { id: 'SYS-PORTAL', name: 'Customer Portal & API', category: 'system', owner: 'CTO', asset_ids: ['AWS-ALB-PORTAL', 'AWS-ECS-PORTAL-API', 'AZ-APPGW-PORTAL-EU', 'SEC-WAF', 'AWS-ACCT-PORTAL'] },
  { id: 'SYS-TIP', name: 'TIP SaaS platform & API', category: 'system', owner: 'CTO', asset_ids: ['AWS-APIGW-TIP', 'AWS-EKS-TIP', 'GCP-GKE-TIP-ML', 'AWS-ACCT-TIP', 'GCP-PRJ-TIP'] },
  { id: 'SYS-MDR', name: 'MDR ingestion & analytics platform', category: 'system', owner: 'COO', asset_ids: ['AWS-EKS-MDR', 'AWS-MSK-MDR', 'AWS-EKS-MDR-EU', 'AWS-ACCT-MDR'] },
  { id: 'SYS-SOAR', name: 'SOAR & SOC jump hosts', category: 'system', owner: 'COO', asset_ids: ['SRV-BOS-SOAR01', 'SRV-BOS-JMP01', 'SRV-DUB-JMP01', 'SRV-SIN-JMP01', 'SEC-SOAR'] },
  { id: 'SYS-SIEM', name: 'SIEM, EDR & security tooling', category: 'system', owner: 'CISO', asset_ids: ['SEC-SIEM', 'SEC-EDR', 'SEC-VULN', 'SEC-CASB', 'SEC-DLP', 'SEC-IRTRIAGE', 'SEC-MAILGW'] },
  { id: 'SYS-CICD', name: 'CI/CD pipeline', category: 'system', owner: 'CTO', asset_ids: ['CICD-RUNNER-01', 'CICD-RUNNER-02', 'CICD-RUNNER-03', 'CICD-RUNNER-04', 'CICD-RUNNER-05', 'CICD-RUNNER-06', 'CICD-ARGO', 'SRV-TLV-BLD01', 'SRV-TLV-BLD02', 'SRV-TLV-BLD03', 'SRV-TLV-BLD04', 'AI-CODE'] },
  { id: 'SYS-IDP', name: 'Identity provider & directory', category: 'system', owner: 'CISO', asset_ids: ['SAAS-IDP', 'SRV-BOS-DC01', 'SRV-BOS-DC02', 'SRV-DUB-DC01', 'SRV-SIN-DC01', 'SRV-TLV-DC01', 'SEC-PAM'] },
  { id: 'SYS-CRM', name: 'CRM & sales tooling', category: 'system', owner: 'CRO (Revenue)', asset_ids: ['SAAS-CRM', 'AI-SALES'] },
  { id: 'SYS-ERP', name: 'Finance & ERP systems', category: 'system', owner: 'CFO', asset_ids: ['SRV-DUB-SQL01', 'SRV-BOS-LEGACY01', 'AZ-SQL-FIN'] },
  { id: 'SYS-PAY', name: 'Payment page & processor', category: 'system', owner: 'CFO', asset_ids: ['AZ-APP-BILLING', 'SAAS-PAY'] },
  { id: 'SYS-BI', name: 'Data warehouse & BI', category: 'system', owner: 'CFO', asset_ids: ['AZ-SYN-BI', 'AZ-STG-BI', 'SAAS-BI', 'AZ-SUB-BI'] },
  { id: 'SYS-BACKUP', name: 'Backup & recovery platform', category: 'system', owner: 'COO', asset_ids: ['SEC-BACKUP', 'SRV-BOS-BKP01'] },
  { id: 'SYS-VPN', name: 'Remote-access VPN', category: 'system', owner: 'COO', asset_ids: ['NET-BOS-VPN01', 'NET-DUB-VPN01'] },
  { id: 'SYS-COLLAB', name: 'Email & collaboration', category: 'system', owner: 'COO', asset_ids: ['SAAS-COLLAB', 'SAAS-CHAT', 'SAAS-TRACK', 'SAAS-ITSM'] },
  { id: 'SYS-AI', name: 'AI models (alert triage, assistant, enrichment)', category: 'system', owner: 'CTO', asset_ids: ['AI-TRIAGE', 'AI-ASSIST', 'AI-TIP-ENRICH'] },
  { id: 'SYS-NET', name: 'Site networks & firewalls', category: 'system', owner: 'COO', asset_query: { class: 'network_device' } },
  { id: 'SYS-SRV', name: 'Corporate servers (file, print, utility)', category: 'system', owner: 'COO', asset_query: { class: 'server' } },
  { id: 'SYS-CLOUD', name: 'Cloud landing zones & shared services', category: 'system', owner: 'CTO', asset_ids: ['AWS-ACCT-SHARED', 'AWS-S3-LOGS', 'AWS-ECR', 'AZ-SUB-CORP', 'AZ-KV-CORP', 'AZ-AKS-PS'] },
  { id: 'SYS-ENDPOINT', name: 'Workforce endpoints', category: 'system', owner: 'COO', asset_query: { class: 'endpoint' } },
  { id: 'SYS-FAC', name: 'Facilities (badge, CCTV, meeting rooms, printers)', category: 'system', owner: 'COO', asset_query: { class: 'peripheral_iot' } },
];

const PROCESSES = [
  // id, name, owner, services, policies, frequency, rto hours, components [[id, essential?]]
  ['PR-TRIAGE', '24x7 alert triage & escalation', 'COO', ['SVC-MDR'], ['POL-B01', 'POL-B13'], 'Continuous', 1, [['PPL-SOC', 1], ['PRC-ESC', 1], ['DATA-TEL', 1], ['SYS-MDR', 1], ['SYS-SOAR', 1], ['SYS-IDP', 1], ['SYS-SIEM', 0], ['SYS-AI', 0], ['SYS-VPN', 0], ['PPL-CISO', 0]]],
  ['PR-ONBOARD', 'Customer onboarding & telemetry integration', 'COO', ['SVC-MDR', 'SVC-PORTAL'], ['POL-B01', 'POL-B03'], 'Per customer', 24, [['PPL-SRE', 1], ['SYS-PORTAL', 1], ['SYS-MDR', 1], ['DATA-PII', 1], ['DATA-TEL', 1], ['PPL-SALES', 0], ['PRC-CAB', 0]]],
  ['PR-INTEL', 'Threat-intel curation & publishing', 'CTO', ['SVC-TIP'], ['POL-B11', 'POL-B02'], 'Continuous', 4, [['PPL-RES', 1], ['PRC-FEEDVAL', 1], ['DATA-INTEL', 1], ['SYS-TIP', 1], ['SYS-AI', 0], ['SYS-CICD', 0]]],
  ['PR-PORTAL', 'Customer self-service (cases, reports, API)', 'CTO', ['SVC-PORTAL'], ['POL-B02', 'POL-B05'], 'Continuous', 2, [['SYS-PORTAL', 1], ['DATA-PII', 1], ['SYS-IDP', 1], ['SYS-WEB', 0], ['PPL-SRE', 0]]],
  ['PR-RENEW', 'Contract renewal & QBR', 'CRO (Revenue)', ['SVC-CRM'], ['POL-B03'], 'Quarterly', 72, [['PPL-SALES', 1], ['PRC-QBR', 1], ['SYS-CRM', 1], ['DATA-CONTRACT', 1], ['PPL-CISO', 0], ['SYS-COLLAB', 0], ['SYS-PORTAL', 0]]],
  ['PR-LEADGEN', 'Lead generation & pipeline management', 'CRO (Revenue)', ['SVC-CRM'], ['POL-B04'], 'Continuous', 24, [['SYS-WEB', 1], ['SYS-CRM', 1], ['PPL-SALES', 1], ['DATA-CONTRACT', 0], ['SYS-COLLAB', 0]]],
  ['PR-RELEASE', 'Build, sign & release', 'CTO', ['SVC-CICD'], ['POL-B06', 'POL-B02'], 'Weekly', 8, [['PPL-ENG', 1], ['PRC-SIGN', 1], ['SYS-CICD', 1], ['DATA-CODE', 1], ['DATA-KEYS', 1], ['PRC-CAB', 0], ['SYS-IDP', 0], ['PPL-CISO', 0], ['SYS-CLOUD', 0]]],
  ['PR-IRENG', 'Incident-response engagement', 'COO', ['SVC-PS'], ['POL-B10', 'POL-B12'], 'Per engagement', 2, [['PPL-IR', 1], ['SYS-ENDPOINT', 1], ['SYS-VPN', 1], ['PPL-CISO', 0], ['SYS-COLLAB', 0], ['DATA-CONTRACT', 0]]],
  ['PR-BILL', 'Invoicing & collections', 'CFO', ['SVC-FIN'], ['POL-B07'], 'Monthly', 24, [['PPL-FIN', 1], ['SYS-ERP', 1], ['DATA-LEDGER', 1], ['SYS-CRM', 0], ['PRC-RECON', 0], ['SYS-COLLAB', 0]]],
  ['PR-PAY', 'Card payment processing', 'CFO', ['SVC-FIN'], ['POL-B07', 'POL-B08'], 'Continuous', 12, [['SYS-PAY', 1], ['DATA-CARD', 1], ['PRC-RECON', 1], ['PPL-FIN', 0]]],
  ['PR-CLOSE', 'Month-end close & board reporting', 'CFO', ['SVC-FIN', 'SVC-BI'], ['POL-B08', 'POL-B12'], 'Monthly', 48, [['PPL-FIN', 1], ['SYS-ERP', 1], ['SYS-BI', 1], ['DATA-LEDGER', 1], ['PPL-EXEC', 0], ['DATA-HR', 0]]],
  ['PR-JML', 'Joiner / mover / leaver', 'CISO', ['SVC-IAM'], ['POL-B09', 'POL-B05'], 'Daily', 24, [['PPL-HR', 1], ['PPL-IDADM', 1], ['PRC-DEPROV', 1], ['SYS-IDP', 1], ['DATA-HR', 1], ['PRC-ACR', 0], ['PPL-CISO', 0]]],
  ['PR-DR', 'Backup & disaster recovery', 'COO', ['SVC-IT'], ['POL-B13'], 'Quarterly test', 2, [['PPL-IDADM', 1], ['PRC-RESTORE', 1], ['SYS-BACKUP', 1], ['SYS-SRV', 0], ['SYS-NET', 0], ['SYS-CLOUD', 0], ['PPL-CISO', 0], ['SYS-FAC', 0]]],
  ['PR-PLAN', 'Resource planning & utilisation', 'CFO', ['SVC-PS', 'SVC-BI'], ['POL-B12'], 'Weekly', 72, [['SYS-BI', 1], ['SYS-COLLAB', 1], ['PPL-EXEC', 0], ['SYS-CRM', 0], ['SYS-ENDPOINT', 0]]],
];

const SCENARIOS = [
  // id, name, description, dimensions, annual base rate (threat prior per exposed component), impact factor, ATT&CK tactics, components the scenario applies to regardless of findings
  ['RS-DOS', 'Denial of service', 'Volumetric or application-layer floods that make customer-facing services unavailable.', [A], 0.15, 0.8, ['Impact'], ['SYS-WEB', 'SYS-PORTAL', 'SYS-TIP', 'SYS-VPN', 'SYS-MDR']],
  ['RS-RANSOM', 'Ransomware & destructive attack', 'Encryption or destruction of systems and backups, halting operations until recovery.', [A, I], 0.03, 1, ['Impact', 'Lateral Movement'], ['SYS-ERP', 'SYS-SRV', 'SYS-BACKUP', 'SYS-ENDPOINT', 'SYS-IDP']],
  ['RS-ATO', 'Account takeover', 'Use of stolen or weak credentials to act as a legitimate user or administrator.', [C, I], 0.04, 0.6, ['Initial Access', 'Credential Access'], ['SYS-IDP', 'SYS-VPN', 'SYS-COLLAB']],
  ['RS-EXFIL', 'Data breach & exposure', 'Unauthorised access to, or publication of, customer or company data.', [C], 0.03, 0.8, ['Exfiltration', 'Collection'], ['DATA-PII', 'DATA-TEL', 'DATA-CONTRACT', 'DATA-INTEL']],
  ['RS-SUPPLY', 'Software supply-chain compromise', 'Tampering with ACME’s build, dependencies or signing so customers receive altered software.', [I], 0.02, 0.9, ['Initial Access', 'Persistence'], ['SYS-CICD', 'DATA-CODE', 'PRC-SIGN']],
  ['RS-INSIDER', 'Insider misuse & excessive access', 'Employees, leavers or service accounts using access beyond their role.', [C, I], 0.02, 0.5, ['Collection'], ['DATA-HR', 'PRC-ACR', 'PRC-DEPROV']],
  ['RS-FRAUD', 'Payment fraud & skimming', 'Manipulation of the payment page or billing flows to divert payments or capture card data.', [C, K], 0.02, 0.7, ['Collection', 'Impact'], ['SYS-PAY', 'DATA-CARD']],
  ['RS-AI', 'AI manipulation & leakage', 'Prompt injection, poisoned inputs or over-broad retrieval causing wrong actions or disclosure.', [I, C], 0.03, 0.4, ['ML Attack Staging'], ['SYS-AI']],
  ['RS-OUTAGE', 'Resilience failure', 'A cloud zone, region or platform failure without adequate redundancy (cyber-adjacent).', [A], 0.06, 0.6, [], ['SYS-MDR', 'SYS-PORTAL', 'SYS-TIP']],
  ['RS-THIRD', 'Third-party compromise', 'A supplier, partner or dependency is compromised and used against ACME.', [C, I], 0.02, 0.5, ['Initial Access'], ['DATA-INTEL', 'SYS-PAY']],
  ['RS-PHISH', 'Phishing & social engineering', 'Staff deceived into disclosing credentials, approving consent or paying fraudulent invoices.', [C], 0.06, 0.4, ['Initial Access'], ['PPL-FIN', 'PPL-EXEC', 'PPL-SALES', 'PPL-HR']],
];

// Story findings: which scenarios each one feeds, plus people/procedure components
// that are not reachable through the asset inventory.
const STORY_SCENARIOS = {
  'CR-001': ['RS-EXFIL', 'RS-DOS'], 'CR-002': ['RS-DOS', 'RS-EXFIL'], 'CR-003': ['RS-EXFIL'], 'CR-004': ['RS-EXFIL', 'RS-RANSOM'], 'CR-005': ['RS-EXFIL'],
  'CR-010': ['RS-OUTAGE', 'RS-DOS'], 'CR-011': ['RS-RANSOM', 'RS-ATO'], 'CR-012': ['RS-RANSOM'], 'CR-013': ['RS-ATO', 'RS-EXFIL', 'RS-PHISH'], 'CR-014': ['RS-RANSOM', 'RS-EXFIL'],
  'CR-015': ['RS-RANSOM', 'RS-ATO', 'RS-DOS'], 'CR-016': ['RS-AI'],
  'CR-020': ['RS-SUPPLY'], 'CR-021': ['RS-SUPPLY'], 'CR-022': ['RS-SUPPLY'], 'CR-023': ['RS-SUPPLY', 'RS-ATO'], 'CR-024': ['RS-SUPPLY', 'RS-THIRD'],
  'CR-030': ['RS-ATO', 'RS-RANSOM'], 'CR-031': ['RS-INSIDER', 'RS-ATO'], 'CR-032': ['RS-ATO', 'RS-FRAUD'], 'CR-033': ['RS-RANSOM'],
  'CR-040': ['RS-FRAUD', 'RS-THIRD'], 'CR-041': ['RS-RANSOM'], 'CR-042': ['RS-RANSOM'],
  'CR-050': ['RS-INSIDER', 'RS-EXFIL'], 'CR-051': ['RS-EXFIL'], 'CR-052': ['RS-AI', 'RS-INSIDER'], 'CR-053': ['RS-AI', 'RS-THIRD'],
  'CR-060': ['RS-RANSOM'], 'CR-061': ['RS-RANSOM', 'RS-SUPPLY'], 'CR-062': ['RS-INSIDER'], 'CR-063': ['RS-EXFIL'], 'CR-064': ['RS-RANSOM', 'RS-DOS'], 'CR-065': ['RS-EXFIL', 'RS-INSIDER'], 'CR-066': ['RS-THIRD', 'RS-SUPPLY'],
  'CR-070': ['RS-DOS'], 'CR-071': ['RS-DOS'], 'CR-072': ['RS-DOS'], 'CR-073': ['RS-DOS'], 'CR-074': ['RS-ATO', 'RS-PHISH'],
};
const STORY_COMPONENTS = {
  'CR-011': ['PPL-SOC'], 'CR-013': ['PPL-SALES', 'PPL-EXEC'], 'CR-016': ['PPL-SOC'], 'CR-020': ['PPL-ENG', 'PRC-SIGN'], 'CR-022': ['PRC-SIGN', 'PRC-CAB'],
  'CR-030': ['PPL-IDADM', 'PRC-ACR'], 'CR-031': ['PPL-HR', 'PRC-DEPROV'], 'CR-032': ['PPL-FIN'], 'CR-041': ['PRC-RESTORE'], 'CR-050': ['PRC-ACR'],
  'CR-052': ['PPL-EXEC', 'DATA-HR', 'DATA-CONTRACT'], 'CR-066': ['PRC-FEEDVAL'], 'CR-040': ['PRC-RECON'], 'CR-012': ['PPL-SOC'], 'CR-014': ['PPL-SOC'],
};

/** Scenario mapping for templated register entries, by title. */
function templatedScenarios(r) {
  const t = r.title;
  const rules = [
    [/Critical OS updates/, ['RS-RANSOM', 'RS-EXFIL']],
    [/Browser with known-exploited/, ['RS-ATO', 'RS-RANSOM']],
    [/SMB signing/, ['RS-ATO']],
    [/LAPS/, ['RS-RANSOM', 'RS-ATO']],
    [/Audit policy/, ['RS-RANSOM', 'RS-INSIDER']],
    [/TLS cipher/, ['RS-EXFIL']],
    [/management agent/, ['RS-RANSOM']],
    [/Host firewall/, ['RS-RANSOM']],
    [/OpenSSH/, ['RS-RANSOM', 'RS-EXFIL']],
    [/Access logging/, ['RS-EXFIL']],
    [/key rotation|Unencrypted snapshot/, ['RS-EXFIL']],
    [/IAM role/, ['RS-ATO', 'RS-EXFIL']],
    [/Deletion protection/, ['RS-RANSOM', 'RS-OUTAGE']],
    [/Management port/, ['RS-ATO', 'RS-RANSOM']],
    [/Kubernetes audit/, ['RS-INSIDER']],
    [/run as root/, ['RS-SUPPLY']],
    [/ITSM admin/, ['RS-INSIDER']],
    [/integration tokens/, ['RS-THIRD', 'RS-EXFIL']],
    [/Printers/, ['RS-EXFIL']],
    [/link sharing|External guests|issue board|published to web/, ['RS-EXFIL']],
  ];
  for (const [re, s] of rules) if (re.test(t)) return s;
  if (r.status === 'mitigated') return r.type === 'exposure' ? ['RS-EXFIL'] : ['RS-RANSOM'];
  throw new Error(`no scenario mapping for ${r.id}: ${t}`);
}

const HUNTS = [
  // id, name, hypothesis, detection logic (summary), data sources, scenarios, findings it produced, cadence, status
  ['HUNT-01', 'Request-rate anomalies at internet edges', 'Edges are being flooded or probed at rates that threaten availability.', 'Requests per source network above 6x the 14-day baseline for 5+ minutes, per edge.', ['CDN logs', 'ALB access logs', 'WAF logs'], ['RS-DOS'], ['CR-073'], 'daily', 'active'],
  ['HUNT-02', 'Edges without volumetric protection', 'Some internet-facing endpoints are not covered by DDoS protection or rate limits.', 'Attack-surface inventory joined with DDoS-protection and API usage-plan coverage.', ['Attack-surface scan', 'AWS Security Hub'], ['RS-DOS'], ['CR-070', 'CR-071', 'CR-072', 'CR-002'], 'weekly', 'active'],
  ['HUNT-03', 'Sign-ins from impossible travel or anonymising networks', 'A workforce account is being used by someone other than its owner.', 'Consecutive sign-ins whose distance/time exceeds 900 km/h, or from anonymiser address ranges.', ['IdP sign-in logs'], ['RS-ATO', 'RS-FRAUD'], ['CR-032'], 'hourly', 'active'],
  ['HUNT-04', 'Privileged hosts contacting threat-intel-listed destinations', 'A privileged or SOC host is communicating with known-bad infrastructure.', 'Outbound connections from tier-0/SOC hosts matched against the ACME TIP blocklist.', ['Firewall logs', 'EDR network events', 'ACME TIP'], ['RS-RANSOM', 'RS-EXFIL'], ['CR-014'], 'hourly', 'active'],
  ['HUNT-05', 'Consent grants to unverified applications', 'Users are approving third-party apps that can read company mail or files.', 'New OAuth grants with mail/file scopes to publishers outside the verified list.', ['IdP audit log', 'CASB'], ['RS-ATO', 'RS-PHISH'], ['CR-013'], 'daily', 'active'],
  ['HUNT-06', 'Unapproved remote-access software on endpoints', 'Remote-access tools outside the approved list are installed on endpoints that hold customer data.', 'Installed-software inventory from IRTriage collections and EDR, compared with the approved list.', ['IRTriage collections', 'EDR inventory'], ['RS-EXFIL', 'RS-INSIDER'], ['CR-065'], 'weekly', 'active'],
  ['HUNT-07', 'Secrets in code, CI logs and extensions', 'Credentials are stored where people outside their owners can read them.', 'Secret-scanning results across repositories, CI logs and browser-extension packages.', ['Secret scanning', 'Code hosting audit log'], ['RS-SUPPLY', 'RS-ATO', 'RS-AI'], ['CR-023', 'CR-053', 'CR-020'], 'daily', 'active'],
  ['HUNT-08', 'Public exposure of storage and management planes', 'Storage or management interfaces are reachable from the internet.', 'CSPM and attack-surface findings for public buckets, databases and management ports.', ['AWS Security Hub', 'Defender for Cloud', 'Google SCC', 'Attack-surface scan'], ['RS-EXFIL', 'RS-RANSOM', 'RS-DOS'], ['CR-003', 'CR-004', 'CR-051', 'CR-064'], 'daily', 'active'],
  ['HUNT-09', 'Security-tool tampering and coverage gaps', 'Endpoints or servers are running without working security tooling.', 'Asset inventory (IRTriage) compared with EDR console enrolment and tamper-protection state.', ['IRTriage inventory', 'EDR console'], ['RS-RANSOM'], ['CR-012', 'CR-060'], 'daily', 'active'],
  ['HUNT-10', 'Unsigned or unattested artifacts reaching production', 'Production is running builds that did not pass signing and attestation.', 'Deployed image digests compared with the signing service’s attestation log.', ['GitOps deployer', 'Code-signing service'], ['RS-SUPPLY'], ['CR-022', 'CR-021'], 'daily', 'active'],
  ['HUNT-11', 'Mass file changes on file servers', 'Ransomware-like encryption activity is starting on file servers.', 'Files modified per host per 10 min above 20x baseline, with a high share of high-entropy writes.', ['EDR file telemetry', 'File-server audit logs'], ['RS-RANSOM'], [], 'hourly', 'active'],
  ['HUNT-12', 'Policy-violating content in AI model inputs and outputs', 'Model inputs carry instructions that try to change the model’s behaviour, or outputs disclose restricted data.', 'Classifier over sampled prompts/outputs for instruction-like content and restricted-data labels.', ['AI gateway logs'], ['RS-AI'], ['CR-016', 'CR-052'], 'daily', 'active'],
];

const MITIGATIONS = [
  // id, title, description, cost usd, eta days, owner, findings remediated, scenario likelihood factors
  ['MIT-01', 'Managed DDoS protection for every customer-facing edge', 'Always-on volumetric protection, CDN in front of the website origin, tested response runbook.', 90000, 30, 'CTO', ['CR-070', 'CR-071'], { 'RS-DOS': 0.4 }],
  ['MIT-02', 'WAF blocking mode and API rate limiting', 'Switch portal WAF to blocking after tuning; per-client throttling on the TIP API; bot management.', 23000, 14, 'CISO', ['CR-002', 'CR-072', 'CR-073'], { 'RS-DOS': 0.8 }],
  ['MIT-03', 'Emergency patching: portal API framework and VPN hotfix', 'Emergency change to remove the two known-exploited critical vulnerabilities on internet edges.', 50000, 10, 'CTO', ['CR-001', 'CR-015'], {}],
  ['MIT-04', 'Close public cloud exposure', 'Block public access on buckets and the data lake; private-only database and firewall management planes.', 17000, 5, 'CTO', ['CR-003', 'CR-004', 'CR-051', 'CR-064'], {}],
  ['MIT-05', 'Phishing-resistant MFA for every account', 'FIDO2 for all staff, conditional access for admin roles, forced resets for breached credentials.', 60000, 30, 'CISO', ['CR-030', 'CR-074', 'CR-032', 'CR-013'], { 'RS-ATO': 0.6, 'RS-PHISH': 0.6 }],
  ['MIT-06', 'HR-driven deprovisioning and access trimming', 'Automate leaver removal from the HRIS; scope BI service principals; quarterly certification.', 31000, 21, 'CISO', ['CR-031', 'CR-050'], { 'RS-INSIDER': 0.8 }],
  ['MIT-07', 'CI/CD hardening', 'Short-lived OIDC credentials, isolated runner groups, signature enforcement at deploy, secret rotation.', 66000, 21, 'CTO', ['CR-020', 'CR-021', 'CR-022', 'CR-023'], { 'RS-SUPPLY': 0.7 }],
  ['MIT-08', 'Multi-AZ MDR ingestion', 'Re-deploy the ingestion cluster and streaming brokers across three availability zones.', 120000, 45, 'COO', ['CR-010'], { 'RS-OUTAGE': 0.5 }],
  ['MIT-09', 'Immutable backups and quarterly restore tests', 'Object-locked vault copies for finance and identity systems; restore tested every quarter.', 28000, 30, 'COO', ['CR-041'], { 'RS-RANSOM': 0.6 }],
  ['MIT-10', 'Payment-page script integrity (PCI DSS 6.4.3 / 11.6.1)', 'Script inventory, SRI and CSP, and change detection on the payment page.', 35000, 30, 'CFO', ['CR-040'], { 'RS-FRAUD': 0.5 }],
  ['MIT-11', 'AI guardrails', 'Input isolation for the triage model, permission-aware retrieval for the assistant, backend-proxied model keys.', 62000, 30, 'CTO', ['CR-016', 'CR-052', 'CR-053'], { 'RS-AI': 0.6 }],
  ['MIT-12', 'SOC privileged-access clean-up', 'Scoped SOAR service identity, jump-host tamper protection, isolate and re-image the flagged host.', 43000, 21, 'CISO', ['CR-011', 'CR-012', 'CR-014'], {}],
  ['MIT-13', 'Endpoint hygiene sprint', 'EDR on every APAC endpoint, forced OS and browser updates across all sites.', 40000, 14, 'COO', [], {}], // findings filled in below
];

function sloHistory(forecast, decimals) {
  // Monthly plan forecast over the last 12 months, converging on today's forecast.
  const out = [];
  let v = forecast * (1 + (T2.rng() - 0.6) * 0.04);
  for (let i = 0; i < MONTHS.length; i++) {
    if (i === MONTHS.length - 1) v = forecast;
    else v = v + (forecast - v) * 0.25 + (T2.rng() - 0.5) * Math.abs(forecast) * 0.006;
    out.push({ month: MONTHS[i], value: T2.round(v, decimals) });
  }
  return out;
}

function shortHash(obj) {
  return createHash('sha256').update(JSON.stringify(sortKeysDeep(obj))).digest('hex');
}

function addDays(iso, days) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function minIso(a, b) {
  return a < b ? a : b;
}

/** L7: raw records behind each finding — what the source system actually returned. */
function buildEvidence(findings, hunts) {
  const ev = [];
  let seq = 1;
  const nextId = () => `EV-${String(seq++).padStart(4, '0')}`;
  const time = (date) => `${date}T${String(T2.int(0, 23)).padStart(2, '0')}:${String(T2.int(0, 59)).padStart(2, '0')}:${String(T2.int(0, 59)).padStart(2, '0')}Z`;
  const huntOf = new Map();
  for (const h of hunts) for (const f of h.finding_ids) huntOf.set(f, h.id);

  const push = (finding, kind, source, date, summary, raw, extra = {}) => {
    ev.push({ id: nextId(), kind, source, collected_at: time(minIso(date, AS_OF)), finding_ids: [finding.id], hunt_id: huntOf.get(finding.id) || null, asset_id: extra.asset_id ?? finding.asset_ids[0], summary, raw, sha256: shortHash(raw) });
  };

  for (const f of findings) {
    const a = byId.get(f.asset_ids[0]);
    const many = f.asset_ids.length > 3;
    const until = f.status === 'mitigated' ? f.closed_on : AS_OF;
    if (f.type === 'vulnerability') {
      push(f, 'scanner_result', f.source, f.first_seen, `Scanner detected ${f.vuln_id} on ${many ? `${f.asset_ids.length} assets` : a.name}`, {
        scanner: 'ACME vulnerability scanner (mock)', plugin_id: f.vuln_id, cvss: f.cvss ?? null, epss: f.epss ?? null,
        assets: f.asset_ids.slice(0, 5).map((id) => byId.get(id).name), affected_total: f.asset_ids.length,
        detection: 'Installed version is below the vendor-fixed version', first_detected: f.first_seen, last_detected: until,
      });
      if (f.status !== 'mitigated') push(f, 'scanner_result', f.source, addDays(f.first_seen, T2.int(7, 20)), `Re-scan: ${f.vuln_id} still present`, { scanner: 'ACME vulnerability scanner (mock)', plugin_id: f.vuln_id, rescan: true, still_vulnerable: f.asset_ids.length });
    } else if (f.type === 'misconfiguration') {
      push(f, 'config_snapshot', f.source, f.first_seen, `Configuration check failed on ${many ? `${f.asset_ids.length} assets` : a.name}`, {
        resource: a.name, resource_id: a.id, check: f.title, expected: 'Compliant with ACME baseline', observed: 'Non-compliant',
        control: f.control_ids[0], evaluated_at: f.first_seen, affected_total: f.asset_ids.length,
      });
    } else if (f.type === 'exposure') {
      push(f, 'exposure_record', f.source, f.first_seen, `Exposure observed on ${a.name}`, {
        resource: a.name, resource_id: a.id, exposure: f.title, reachable_from: a.internet_facing ? 'internet' : 'broad internal / third party', observed_at: f.first_seen, confirmed: true,
      });
    } else {
      push(f, 'alert', f.source, f.first_seen, `SOC alert raised: ${f.title}`, {
        alert_id: `ALR-${f.id.slice(3)}-${T2.int(1000, 9999)}`, rule: f.title, severity: f.severity, techniques: f.mitre_techniques,
        entities: f.asset_ids.slice(0, 3).map((id) => byId.get(id).name), first_seen: f.first_seen, occurrences: T2.int(1, 14), disposition: 'true positive — under remediation',
      });
    }
    if (f.status === 'in_progress' || f.status === 'accepted' || (f.status === 'open' && f.severity !== 'low' && T2.chance(0.6))) {
      push(f, 'ticket', 'Jira (remediation)', addDays(f.first_seen, T2.int(1, 4)), `Remediation ticket opened`, {
        key: `SEC-${2000 + seq}`, status: f.status === 'accepted' ? 'Risk accepted' : f.status === 'in_progress' ? 'In progress' : 'To do', owner_team: f.owner,
        due: addDays(f.first_seen, f.remediation?.eta_days || 14), action: f.remediation?.action || '',
      });
    }
    if (f.status === 'mitigated') {
      push(f, 'ticket', 'Jira (remediation)', f.closed_on, 'Remediation verified and closed', { key: `SEC-${2000 + seq}`, status: 'Done', verified_by: 'Re-scan', closed_on: f.closed_on });
    }
  }

  // Authored detail for the story findings that executives will drill into.
  const story = (fid, kind, source, date, summary, raw, assetId) => push(findings.find((x) => x.id === fid), kind, source, date, summary, raw, assetId ? { asset_id: assetId } : {});
  for (const [date, peak] of [['2026-09-06', 41], ['2026-09-17', 63], ['2026-09-26', 88]]) {
    story('CR-073', 'metric_series', 'CDN / ALB metrics', date, `Portal login request rate peaked at ${peak}x baseline`, {
      metric: 'portal_login_requests_per_min', baseline_p50: 1200, peak: 1200 * peak, peak_multiple: peak, duration_min: T2.int(18, 55), error_rate_5xx_peak_pct: T2.round(peak / 20, 1),
      top_source_networks: ['198.51.100.0/24', '203.0.113.0/24'], waf_action: 'count (detection-only)',
    });
  }
  story('CR-070', 'architecture_note', 'Architecture review', '2026-06-20', 'Edges without DDoS protection plan', { edges: ['portal.acme.example', 'api.tip.acme.example', 'www.acme.example'], ddos_protection: 'standard (no advanced tier)', runbook: 'none', reviewed_by: 'Security architecture board' });
  story('CR-014', 'network_flow', 'Firewall logs', '2026-09-27', 'Outbound flows from SOC jump host to a blocklisted address', { src_host: 'soc-jump-sin01.acme.example', dst: '198.51.100.23', dst_port: 443, flows: 14, bytes_out: 18233, first: '2026-09-27T02:14:00Z', last: '2026-09-27T05:41:00Z', ti_feed: 'ACME TIP blocklist' }, 'SRV-SIN-JMP01');
  const pslaptops = findings.find((x) => x.id === 'CR-065').asset_ids;
  for (const ep of pslaptops) {
    story('CR-065', 'triage_artifact', 'IRTriage collection (basic profile)', '2026-09-18', `Installed-programs row on ${byId.get(ep).name}`, { collection: 'IRTriage.exe basic profile', artifact: 'Installed programs', host: byId.get(ep).name, program: 'Unapproved remote-access tool', approved_list_match: false, install_date: '2026-08-30' }, ep);
  }
  story('CR-003', 'config_snapshot', 'AWS Security Hub', '2026-09-19', 'Bucket public-access settings', { bucket: 's3://acme-portal-exports', block_public_acls: false, block_public_policy: false, policy_allows_list: true, object_count: 18412, encryption: 'SSE-S3' });

  // Hunts that ran but found nothing still leave a record: that is evidence too.
  for (const h of hunts.filter((x) => !x.finding_ids.length)) {
    for (const run of h.runs.filter((_, i) => i % 4 === 0)) {
      ev.push({ id: nextId(), kind: 'hunt_result', source: h.data_sources[0], collected_at: `${run.date}T06:00:00Z`, finding_ids: [], hunt_id: h.id, asset_id: null, summary: `${h.name}: ${run.hits} matches`, raw: { hunt: h.id, window_end: run.date, hosts_evaluated: 41, matches: run.hits }, sha256: shortHash({ hunt: h.id, d: run.date }) });
    }
  }
  return ev;
}

function buildBia() {
  const findings = risks;
  for (const r of findings) {
    r.scenario_ids = STORY_SCENARIOS[r.id] || templatedScenarios(r);
    r.component_ids = [...new Set([...(r.component_ids || []), ...(STORY_COMPONENTS[r.id] || [])])];
  }

  const slos = SLOS.map(([id, name, unit, dir, target, warning, forecast, decimals, basis, basisLabel, mpu, owner, kpiIds, description]) => ({
    id, name, unit, direction: dir > 0 ? 'higher_is_better' : 'lower_is_better', target, warning, forecast, decimals,
    basis_usd: basis, basis_label: basisLabel, metric_per_usd: mpu, owner, kpi_ids: kpiIds, description,
    history: sloHistory(forecast, decimals), source: { type: 'bi', system: 'Power BI — Board pack' },
  }));
  const policies = BIA_POLICIES.map(([id, title, statement, cadence, owner, links]) => ({ id, title, statement, cadence, owner, slo_links: links.map(([slo_id, weight]) => ({ slo_id, weight })) }));
  const processes = PROCESSES.map(([id, name, owner, svcs, pols, frequency, rto, comps]) => ({
    id, name, owner, service_ids: svcs, policy_ids: pols, frequency, rto_hours: rto,
    components: comps.map(([cid, ess]) => ({ id: cid, role: ess ? 'essential' : 'supporting' })),
  }));
  const scenarios = SCENARIOS.map(([id, name, description, dims, base, impact, tactics, comps]) => ({ id, name, description, dimensions: dims, base_rate: base, impact_factor: impact, attack_tactics: tactics, component_ids: comps }));

  const hunts = HUNTS.map(([id, name, hypothesis, logic, sources, scen, fids, cadence, status]) => {
    const hitDates = new Set(fids.map((f) => findings.find((x) => x.id === f).first_seen));
    const runs = [];
    for (let d = '2026-07-01'; d <= AS_OF; d = addDays(d, 7)) {
      const weekEnd = addDays(d, 6);
      const real = [...hitDates].filter((x) => x >= d && x <= weekEnd).length;
      runs.push({ date: minIso(weekEnd, AS_OF), hits: real ? real * T2.int(2, 9) : (fids.length && T2.chance(0.15) ? 1 : 0) });
    }
    return { id, name, hypothesis, logic, data_sources: sources, scenario_ids: scen, finding_ids: fids, cadence, status, owner: 'Security Operations', runs, last_run: AS_OF };
  });

  const mitigations = MITIGATIONS.map(([id, title, description, cost, eta, owner, fids, factors]) => ({ id, title, description, cost_usd: cost, eta_days: eta, owner, finding_ids: fids, scenario_factors: factors, status: 'proposed' }));
  const hygiene = mitigations.find((m) => m.id === 'MIT-13');
  hygiene.finding_ids = ['CR-060', ...findings.filter((r) => /^ACME-VULN-(OSCU|BRW)-/.test(r.vuln_id || '')).map((r) => r.id)];

  const evidence = buildEvidence(findings, hunts);
  return { slos, bia_policies: policies, business_processes: processes, bp_components: COMPONENTS, risk_scenarios: scenarios, hunts, evidence, mitigations };
}

function checkBia(ctx) {
  const ids = (arr) => new Set(arr.map((x) => x.id));
  const slo = ids(ctx.slos), pol = ids(ctx.bia_policies), comp = ids(ctx.bp_components), scen = ids(ctx.risk_scenarios), risk = ids(ctx.cyber_risks), svc = ids(ctx.business_services), hunt = ids(ctx.hunts);
  const assetIds = ids(ctx.assets);
  const need = (set, id, where) => { if (!set.has(id)) throw new Error(`${where}: unknown id ${id}`); };
  for (const p of ctx.bia_policies) for (const l of p.slo_links) need(slo, l.slo_id, p.id);
  for (const p of ctx.business_processes) {
    for (const x of p.policy_ids) need(pol, x, p.id);
    for (const x of p.service_ids) need(svc, x, p.id);
    for (const c of p.components) need(comp, c.id, p.id);
  }
  for (const c of ctx.bp_components) for (const a of c.asset_ids || []) need(assetIds, a, c.id);
  for (const s of ctx.risk_scenarios) for (const c of s.component_ids) need(comp, c, s.id);
  for (const r of ctx.cyber_risks) {
    if (!r.scenario_ids.length) throw new Error(`${r.id} has no scenario`);
    for (const s of r.scenario_ids) need(scen, s, r.id);
    for (const c of r.component_ids) need(comp, c, r.id);
  }
  for (const h of ctx.hunts) { for (const s of h.scenario_ids) need(scen, s, h.id); for (const f of h.finding_ids) need(risk, f, h.id); }
  for (const m of ctx.mitigations) { for (const f of m.finding_ids) need(risk, f, m.id); for (const s of Object.keys(m.scenario_factors)) need(scen, s, m.id); }
  for (const e of ctx.evidence) { for (const f of e.finding_ids) need(risk, f, e.id); if (e.hunt_id) need(hunt, e.hunt_id, e.id); }
  // Every policy is implemented by a process, every SLO has a policy, every component is used.
  for (const p of ctx.bia_policies) if (!ctx.business_processes.some((x) => x.policy_ids.includes(p.id))) throw new Error(`policy ${p.id} has no process`);
  for (const s of ctx.slos) if (!ctx.bia_policies.some((p) => p.slo_links.some((l) => l.slo_id === s.id))) throw new Error(`SLO ${s.id} has no policy`);
  for (const c of ctx.bp_components) if (!ctx.business_processes.some((p) => p.components.some((x) => x.id === c.id))) throw new Error(`component ${c.id} is in no process`);
  // Every open finding must land on at least one component, or it would be invisible in the BIA explorer.
  const compAssets = new Map(ctx.bp_components.map((c) => [c.id, new Set(c.asset_ids || [])]));
  for (const c of ctx.bp_components) {
    if (!c.asset_query) continue;
    for (const a of ctx.assets) if (Object.entries(c.asset_query).every(([k, v]) => a[k] === v)) compAssets.get(c.id).add(a.id);
  }
  for (const r of ctx.cyber_risks) {
    const hit = r.component_ids.length || [...compAssets.values()].some((set) => r.asset_ids.some((a) => set.has(a)));
    if (!hit) throw new Error(`finding ${r.id} reaches no BIA component (assets ${r.asset_ids.slice(0, 3).join(', ')})`);
  }
}

// ---------------------------------------------------------------------------
// assemble, check, emit
// ---------------------------------------------------------------------------

function checkIntegrity(ctx) {
  const svc = new Set(ctx.business_services.map((s) => s.id));
  const kpi = new Set(ctx.kpis.map((k) => k.id));
  for (const a of ctx.assets) for (const s of a.service_ids) if (!svc.has(s)) throw new Error(`asset ${a.id}: unknown service ${s}`);
  for (const k of ctx.kpis) if (!svc.has(k.service_id)) throw new Error(`kpi ${k.id}: unknown service`);
  for (const g of ctx.business_goals) for (const k of g.kpi_ids) if (!kpi.has(k)) throw new Error(`goal ${g.id}: unknown kpi ${k}`);
  for (const s of ctx.business_services) for (const d of s.depends_on) if (!svc.has(d)) throw new Error(`service ${s.id}: unknown dependency ${d}`);
  for (const r of ctx.cyber_risks) if (!r.asset_ids.length) throw new Error(`risk ${r.id} has no assets`);
  const withKpi = new Set(ctx.kpis.filter((k) => k.source.type !== 'generated').map((k) => k.service_id));
  const noKpi = ctx.business_services.filter((s) => !withKpi.has(s.id)).map((s) => s.id);
  if (noKpi.join() !== 'SVC-BI,SVC-IAM') throw new Error(`expected exactly SVC-BI and SVC-IAM to lack business KPIs, got ${noKpi}`);
}

function main() {
  const { check } = parseGeneratorArgs(process.argv, SCRIPT);
  buildAssets();
  storyRisks();
  templatedRisks();
  applyBrands();
  applyReferences();
  const bia = buildBia();

  const context = {
    schema_version: SCHEMA_VERSION,
    id: 'acme-corp-business-context-2026-09',
    synthetic: true,
    synthetic_notice:
      'SYNTHETIC DATA ONLY. ACME.Corp is fictional. Generated by scripts/gen-acme-dataset.mjs. Names use the RFC 2606 .example TLD, public addresses the RFC 5737 documentation ranges; vulnerability ids are fictional (ACME-VULN-*).',
    generated_by: 'scripts/gen-acme-dataset.mjs',
    as_of: AS_OF,
    months: MONTHS,
    organization: ORGANIZATION,
    business_goals: BUSINESS_GOALS,
    business_services: SERVICES,
    kpis: buildKpis(),
    assets,
    controls: buildControls(),
    policies: buildPolicies(),
    cyber_risks: risks,
    documents: DOCUMENTS,
    connectors: CONNECTORS,
    framework_catalog: FRAMEWORK_CATALOG,
    ...bia,
  };
  checkIntegrity(context);
  checkBia(context);

  const header = `// GENERATED FILE -- do not edit by hand.
// ACME.Corp business-risk mock dataset (${assets.length} assets, ${risks.length} cyber risks, ${context.kpis.length} KPIs,
// ${bia.slos.length} SLOs, ${bia.business_processes.length} processes, ${bia.bp_components.length} components, ${bia.evidence.length} evidence records).
// Regenerate with:  node scripts/gen-acme-dataset.mjs
//
// SYNTHETIC DATA ONLY. ACME.Corp is a fictional company; see docs/ACME_DEMO.md.
`;
  const source = `${header}\nexport const context = ${JSON.stringify(sortKeysDeep(context), null, 1)};\n`;
  emitOutputs([{ name: 'context.js', source }], OUT_DIR, { check, scriptName: SCRIPT }).then((code) => process.exit(code));
}

main();
