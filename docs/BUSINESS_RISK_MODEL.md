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

## BIA explorer: cyber-risk score factor per SLO

`web/assets/js/business/bia.js` scores a seven-level graph (SLO → policy →
process → component → scenario → hunt/finding → evidence). Like the engine above,
it is pure and deterministic, and no score in it is authored.

1. **Finding likelihood** `L_f` uses the same function as above (`riskLikelihood`).
   Finding score = 100 × min(1, L_f / 0.25).
2. **Scenario on component:**
   `P(s,c) = 1 − (1 − base_s × factor_s) × Π (1 − L_f × w)`.
   - The product runs over findings mapped to scenario *s* that touch component
     *c*, either through its assets or by an explicit component link.
   - *w* is the criticality of the touched assets (0.8 for an explicit link).
   - The threat base rate applies only where the scenario lists the component.
   - `factor_s` comes from simulated mitigations.
3. **Component:** `P(c) = 1 − Π_s (1 − P(s,c) × impact_s)`.
4. **Process:** `P(p) = 1 − Π_c (1 − P(c) × essentiality × 0.35)`.
   Essentiality is 1 for essential components and 0.3 for supporting ones.
5. **Policy:** `P(pol) = 1 − Π_p (1 − P(p) × 0.6)`. A policy fails when any of its processes does.
6. **SLO shortfall:** `Σ weight × basis × P(pol)` over the policies that protect the SLO.
   - *weight* is the share of the SLO's financial basis lost if that policy fails.
   - The cyber-adjusted projection is `plan forecast ∓ shortfall × metric_per_usd`.
   - Status uses target and warning thresholds, like the KPI projection.
7. **Cyber-risk score factor** = `100 × (1 − e^(−shortfall / headroom))`.
   - Headroom is the gap between plan forecast and target, in dollars.
   - 63 means cyber risk is expected to consume exactly the headroom.
   - Bands: critical 60+, high 40+, medium 20+, low.
   - Scenario score = `1 − Π_c (1 − P(s,c) × impact_s × 0.35)`: the chance it disrupts at least one process.
8. **Attribution.** Each probability is split by hazard, −ln(1 − p). Under
   1 − Π(1 − p) independent hazards add exactly, so the "$ by scenario" and
   "$ by finding" breakdowns sum to the SLO shortfall at every level.
9. **Simulation.** A proposed mitigation remediates its findings and multiplies
   its scenarios' base rates. The explorer recomputes everything live and ranks
   mitigations by shortfall removed on a chosen SLO, and by ROI. The executive
   dashboard also treats a simulated mitigation's findings as fixed.
10. **Trend.** Each SLO's score over 12 months is recomputed from finding first-seen and closure dates.

The calibration constants (0.35 process disruption, 0.6 policy failure, policy
weights) are mockup values chosen so the ACME.Corp picture is plausible: ARR is
about 3% at risk and some SLOs are on track. Tune them per organisation.

## What is mocked in this build

- The AI-proposed KPIs for the two services with no business-supplied KPIs are
  pre-authored in the dataset. They carry their rationale and are flagged
  `AI-proposed`; an LLM provider will generate them from the BIA and policies.
- Document extraction and the API/MCP connectors show realistic status, but they
  serve the ACME.Corp dataset and make no network request.
