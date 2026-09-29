# DFIR — Backend-less Forensic Timeline Analysis

A static web app for incident responders. Drop in one or more host-triage
timelines, merge them into a single cross-host **SuperTimeline**, hand that to an
LLM of your choosing, and get back an interactive forensic report plus a
watermarked PDF.

**Live app: https://palayax.github.io/DFIR/**

There is no backend. No server-side runtime, no account, no build step, no
bundler, and no npm dependencies (`web/package.json` declares an empty
`dependencies` object, and CI fails the build if a lockfile or `node_modules`
ever appears). Your evidence and your API keys stay in your browser.

---

## Why backend-less

An incident is exactly the wrong time to upload a victim host's forensic
evidence to somebody else's service. This app is built so you never have to:

- **Everything runs client-side.** Parsing, unzipping, hashing, merging,
  deduplication, chart aggregation and PDF generation all happen in the browser,
  using native platform APIs (`DecompressionStream`, `CompressionStream`,
  `WebCrypto`) rather than vendored libraries.
- **Egress is explicit and scoped.** The app talks to exactly two things, and
  only when you ask it to: the LLM provider you configured (when you press
  Analyze) and the storage provider you configured (when you press Export). With
  no provider configured — or with the built-in mock provider and local-download
  storage — it makes **zero** network requests after the page loads.
- **It works air-gapped.** Clone the repo and open `web/index.html` from disk.
  The whole ingest → merge → report → PDF path works with no server and no
  network. Only LLM analysis needs egress, by definition.
- **Your keys are yours.** Credentials live in memory. Persistence is opt-in and
  encrypted (AES-GCM, PBKDF2-HMAC-SHA256, 210,000 iterations, random salt+IV).
  There is no proxy, no relay, and no telemetry endpoint anywhere in this
  codebase — a key is only ever sent to the provider it belongs to.

## Quickstart

Use the hosted app above, or run it yourself:

```bash
git clone https://github.com/palayax/DFIR.git
cd DFIR/web
python -m http.server 8000
# open http://localhost:8000/
```

Or open `web/index.html` straight from disk. A file server is only needed for
`fetch()`-based sample loading; the pipeline itself does not require one.

No dependencies to install. To run the test suite (Node 20+, uses only
`node:test`):

```bash
cd web && npm test
```

## What it does

**1. Ingest** — drop in any of:

| Input | Detected as |
|---|---|
| `timeline.jsonl` from an IRTriage collection | `irtriage-jsonl` |
| `timeline.csv` from an IRTriage collection | `irtriage-csv` |
| A whole collection ZIP (unzipped in-browser) | `velociraptor-zip` |
| Arbitrary JSON/JSONL + a field mapping you supply | `generic-json` |
| Arbitrary CSV + a field mapping you supply | `generic-csv` |

Detectors are tried in a fixed priority order; a detector that throws is treated
as "not my format," not as an error, so later ones still get a chance.

**2. Merge** — every source is normalised to
[`docs/timeline_schema.json`](docs/timeline_schema.json) and merged into one
SuperTimeline: deduplicated on `row_hash`, sorted by the total order
`(timestamp_utc, source, artifact, row_hash)`. Fully deterministic — the same
inputs always produce the same SuperTimeline, byte for byte. No network, no
model, no heuristics in this stage.

**3. Analyze** — the timeline is reduced to token-budgeted *evidence packs* by a
deterministic 4-tier selection (every detection row first, then ±300 s of
context around each, then priority sources, then a time-stratified background
sample so quiet periods are represented too). Packs go out in a bounded-
concurrency map phase, then a reduce phase merges the partials, then the result
is validated against [`docs/report_schema.json`](docs/report_schema.json) with a
bounded self-repair loop.

**4. Report** — an interactive dashboard: filterable evidence table (every row
traceable by `row_hash`), severity/source distributions, an hourly activity
heatmap, an entity graph, a MITRE ATT&CK coverage matrix, an IOC panel, and two
first-class sections most tools bury — `analytic_gaps[]` (what the data could
*not* show) and `dismissed_detections[]` (what the model considered and ruled
out, with reasoning).

**5. Export** — JSON, or a watermarked PDF produced by a hand-rolled PDF 1.7
writer (no jsPDF): Base-14 fonts, FlateDecode via the browser's native
`CompressionStream`, and a diagonal translucent watermark on every page.

## Trust properties

These are the design decisions that matter most if you intend to rely on the
output:

- **Charts are not model-authored.** `dashboard.*`, `scope.*` and
  `mitre_coverage` are computed deterministically from the timeline *before* any
  model call, and the assemble stage **overwrites** whatever the model produced
  for those keys, unconditionally, every time. A hallucinated count cannot reach
  a chart. There is a test that feeds the pipeline deliberately bogus model
  output and asserts the numbers are unaffected.
- **Every finding must cite evidence.** A finding has to reference at least one
  real `row_hash` present in the supplied evidence. This is enforced by the
  system prompt *and* by schema validation, with the repair loop retrying a
  response that violates it.
- **Reports are traceable.** Each report records the prompt contract version
  (`meta.model.prompt_version`) and the model id it was produced with.
- **Uncertainty is first-class**, not flattened into confident prose — see
  `analytic_gaps[]` and `dismissed_detections[]` above.

## Providers

You supply your own credentials per engagement; nothing is bundled.

**LLM** (default `claude-opus-5-5`): Anthropic · OpenAI · Azure OpenAI · AWS
Bedrock · Google Gemini/Vertex · OpenRouter · OpenCode · plus a deterministic
zero-cost **Mock** provider — use it to dry-run an engagement's config before
spending anything.

**Storage**: AWS S3 (SigV4, any S3-compatible endpoint incl. MinIO/R2) · Azure
Blob (container SAS URL) · Google Cloud Storage · Local download.

Exact required credential fields per provider, token-budget constants, and the
full security model are in [`docs/WEB_APP.md`](docs/WEB_APP.md).

### Known provider limitations

- **AWS Bedrock streaming is not implemented** — every call is a single
  non-streaming request/response.
- **Google Cloud Storage has no `presignedUrl()`** — V4 signed URLs need RSA
  private-key signing tied to a service account, a different crypto flow from
  the OAuth bearer token this adapter uses. The method is omitted rather than
  faked (it is optional on the `StorageProvider` interface).
- **Vertex mode has no OAuth refresh flow** — you supply a live `accessToken`.

## Where the input comes from

This repo is the **analysis half** of a two-part toolkit. Timelines are produced
by `IRTriage.exe`, a single self-contained Windows executable that performs
read-only host triage (Velociraptor + Sigma/YARA/Nuclei/Hayabusa rule packs, all
embedded, fully air-gapped) and emits a deterministic timeline plus raw
acquisition data. That client is **not** in this repository and is distributed
separately.

The app does not depend on it, though: any CSV or JSON with a timestamp will do,
via the generic ingest path and a field mapping. The docs here describe the
client where it is needed to explain the data contract —
[`docs/USAGE.md`](docs/USAGE.md),
[`docs/CONFIG_REFERENCE.md`](docs/CONFIG_REFERENCE.md),
[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md),
[`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md).

## Repository layout

```
web/
├── index.html, report.html
├── assets/css/                design tokens + layout + print styles
├── assets/js/
│   ├── ingest/                 5 format detectors + field mapping
│   ├── merge/                  SuperTimeline build, dedupe, export
│   ├── analysis/               evidence-pack reduction, map-reduce, validation
│   ├── providers/              7 LLM + 4 storage adapters, credential vault
│   ├── report/                 dashboard, charts, entity graph, PDF writer
│   ├── ui/, views/, workers/    widgets, screens, off-thread ingest
│   └── lib/                     CSV, unzip, hashing, timestamps, schema
├── fixtures/                  synthetic sample data (WKS-CORP-01/02)
└── tests/                     node:test suites, no framework dependency
docs/                          reference docs + the two JSON schemas
.github/workflows/pages.yml    test + deploy to GitHub Pages
```

## Data handling

`web/fixtures/` is **synthetic** — generated by
`web/fixtures/generate-fixtures.mjs` with fabricated hosts (`WKS-CORP-01/02`) and
users (`DOMAIN\alice`, `DOMAIN\bob`). No real forensic data from any host is in
this repository, and `.gitignore` is written to keep it that way: collection
ZIPs, timeline exports, generated reports and any credential-shaped file are all
excluded.

## Licence

Not yet declared — treat as all rights reserved until a `LICENSE` file is added.
Third-party components referenced by the client half are inventoried in
[`docs/THIRD_PARTY_LICENSES.md`](docs/THIRD_PARTY_LICENSES.md).
