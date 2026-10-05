# Business-risk model

How the executive dashboard (layer 3) turns cyber findings into business impact.
Implemented in `web/assets/js/business/engine.js` as one pure, deterministic
function, `computeBusinessRisk(context, {remediated, filters})`. Nothing on the
dashboard is typed in: every figure is derived from the business context, so the
What-if panel and the filters recompute everything.

The model is deliberately simple. An executive or an auditor can follow it, and
challenge it, without a statistics background.

## Inputs (the BusinessContext)

| Input | Source in production | Source in the mockup |
|---|---|---|
| Business services + BIA (tier, RTO/RPO/MTPD, downtime cost/h, SLA penalties, regulatory/recovery/reputation exposure, dependencies) | BIA document, SLA contracts | `web/demo/acme/context.js` |
| KPIs / SLOs / SLAs (target, warning, 12-month history, sensitivity to risk dimensions, degradation at full risk) | BI/DSS via API or MCP, contracts, business owners; AI-proposed when none exist | same |
| Asset inventory (class, site, cloud, criticality, internet-facing, business services) | IRTriage collections, cloud/SaaS APIs, CMDB | same |
| Controls (status, effectiveness, framework crosswalk) and policies | GRC platform | same |
| Cyber-risk register (vulnerabilities, misconfigurations, exposures, IOC/IOA, incident findings) | scanners, CSPM, EDR/SIEM, IRTriage + AI analysis | same |

## Calculation

1. **Likelihood per cyber risk** (12-month chance it causes a material event):

   `base(severity) × exploitability × exposure × active threat × (1 − 0.5 × control effectiveness)`

   | factor | values |
   |---|---|
   | severity base | critical 0.11 · high 0.05 · medium 0.016 · low 0.005 |
   | exploitability | known-exploited 1.5 · proof-of-concept 1.1 · theoretical 0.75 |
   | internet-facing asset | 1.35 |
   | IOC / IOA / incident finding | 1.5 (someone is already acting) |
   | control effectiveness | mean of mapped controls' effectiveness × status weight (implemented 1, partial 0.55, planned 0.15) |

   The result is capped at 0.95. Mitigated risks, and risks ticked in What-if, count as 0.

2. **Service likelihood** per risk dimension (availability, integrity,
   confidentiality, delivery, compliance):

   `1 − Π (1 − likelihood × asset-criticality weight)`

   This runs over the open risks on the service's assets. Criticality weights are
   critical 1, high 0.8, medium 0.55, low 0.3. A risk also reaches every service
   that *depends on* the affected one, at 35% weight. For example, an identity
   weakness flows into every service that uses SSO.

3. **Impact** if the service is disrupted (from the BIA):

   `downtime cost/hour × expected outage hours + SLA penalty + regulatory + recovery + reputational exposure`

4. **Value at risk** = service likelihood × impact. Summed across services, it is
   compared with the board's appetite.

5. **KPI projection.** The KPI's *pressure* is the highest of
   (service likelihood in a dimension × the KPI's sensitivity to that dimension).
   The projected value is the current value moved by pressure × the KPI's
   degradation at full risk. The status is:
   - **breached**: the current value already misses target;
   - **breach projected**: the projected value misses target;
   - **at risk**: the projected value misses the warning threshold;
   - **on track**: otherwise.

6. **Compliance posture** per framework is the mean over its controls of
   status × (0.6 + 0.4 × effectiveness), minus a small penalty for each open
   cyber risk against those controls.

7. **Business risk index** (0–100) is the tier-weighted mean service likelihood
   (tier 1 = 1, 2 = 0.6, 3 = 0.35).

8. **Trend.** Each of the last 12 months is recomputed from each risk's first-seen
   and closure dates.

9. **Remediation priorities.** For each open risk, the engine recomputes the
   whole model with that risk fixed. The list is ordered by how much value at
   risk disappears, and is shown next to the fix's cost and ETA.

## What is mocked in this build

- The AI-proposed KPIs for the two services with no business-supplied KPIs are
  pre-authored in the dataset. They carry their rationale and are flagged
  `AI-proposed`; an LLM provider will generate them from the BIA and policies.
- Document extraction and the API/MCP connectors show realistic status, but they
  serve the ACME.Corp dataset and make no network request.
