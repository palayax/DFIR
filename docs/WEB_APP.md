# Web App Reference

The web app (`web/`) is a static, backend-less ES-module site. This document covers hosting, the full ingest→merge→analyze→report→export pipeline, every LLM and storage provider with its exact required credentials, the token-budgeting/map-reduce mechanics, the security model, and the report's trust features.

---

## 1. Hosting

No build step, no server-side runtime, no npm dependencies (`web/package.json` declares none). Three ways to run it:

```bash
# 1. Any static file server
cd web
python -m http.server 8000
# open http://localhost:8000/index.html
```

```bash
# 2. GitHub Pages (see .github/workflows/pages.yml) -- deploys web/ as-is on push
```

```bash
# 3. Directly from disk, fully air-gapped
# open web/index.html in a browser -- no server needed for
# ingest/merge/analyze/report/export. Only fetch()-based sample-data loading
# needs either a server or the page's ?src= query parameter.
```

Air-gapped operation: with no LLM provider configured (or the mock provider selected) and local-download storage, the app makes **zero** network requests after the page itself loads. This makes it usable inside a fully isolated analysis environment.

---

## 2. Pipeline

### 2.1 Ingest

`web/assets/js/ingest/index.js` defines `INGEST_MODULES`, tried in this fixed priority order — first module whose `detect()` returns true (and doesn't throw) wins:

1. `irtriage-jsonl` — a client output's `timeline.jsonl`
2. `irtriage-csv` — a client output's `timeline.csv`
3. `velociraptor-zip` — a full client output ZIP (unzipped in-browser)
4. `generic-json` — arbitrary JSON/JSONL, with a user-supplied field mapping
5. `generic-csv` — arbitrary CSV, with a user-supplied field mapping

A detector that throws is treated as "not a match for this format," not as an error — later modules still get a chance.

### 2.2 Merge

Every ingested source is normalized to the schema in [`timeline_schema.json`](timeline_schema.json) and merged into one SuperTimeline: deduplicated on `row_hash`, sorted with the client's own total order (`timestamp_utc`, `source`, `artifact`, `row_hash`). Purely deterministic — no network, no LLM.

### 2.3 Analyze

See section 4 (providers) and section 5 (token budgeting / map-reduce) below.

### 2.4 Report

Renders `web/report.html`: evidence table (filterable/sortable, every row backed by a `row_hash`), dashboard (severity/source distribution, hourly heatmap), entity graph, MITRE ATT&CK coverage matrix, IOC panel, analytic gaps list, dismissed-detections list. See section 6 for what parts of this are model-authored vs. deterministic.

### 2.5 Export

- **PDF** — a hand-rolled client-side PDF 1.7 writer (`web/assets/js/report/pdf.js`), explicitly not a vendored library such as jsPDF: Base-14 fonts only (Helvetica/Helvetica-Bold, WinAnsiEncoding, `?` fallback for unencodable glyphs), FlateDecode compression via the browser's native `CompressionStream('deflate')`, a diagonal repeating translucent watermark on every page (ExtGState alpha), automatic pagination. One documented simplification: a table that spans a page break does not repeat its header row on the continuation page.
- **JSON** — the raw report matching [`report_schema.json`](report_schema.json).
- **Upload to storage** — any configured storage provider, or a local download (see section 4.2).

---

## 3. Analysis pipeline internals (map-reduce)

`web/assets/js/analysis/pipeline.js`'s `analyze(records, opts)` runs, in order:

1. **computeDashboard** (deterministic, no model) — severity/source counts, time-range scope, MITRE technique coverage.
2. **buildEvidencePacks** (deterministic, no model) — see section 5.
3. **Map** — one `provider.send()` call per evidence pack, bounded concurrency (`DEFAULT_CONCURRENCY = 3`), via a hand-rolled bounded-concurrency pool (`runPool`), not a vendored async library. Each call retries up to `DEFAULT_CALL_MAX_ATTEMPTS = 3` times and requests at most `DEFAULT_MAX_OUTPUT_TOKENS = 4096` output tokens.
4. **Reduce** — one further model call merging every map-phase partial result into a draft report.
5. **Assemble** — `dashboard`, `scope`, and `mitre_coverage` in the draft are **unconditionally overwritten** with the deterministic values from step 1; whatever the model produced for those specific keys is discarded and never read. Everything else in the report (findings, narrative, analytic_gaps, dismissed_detections, recommendations) is model-authored.
6. **Validate → repair** — the assembled report is checked against [`report_schema.json`](report_schema.json). If it fails, the pipeline sends the validation errors back to the model asking it to repair its own output, up to `DEFAULT_MAX_REPAIR_ATTEMPTS = 2` times, before giving up.

Before any call goes out, the UI shows the evidence-pack selection, the estimated token count/cost, and the pack/map-reduce plan, so nothing is sent silently.

`PROMPT_VERSION = '1.0.0'` (from `web/assets/js/analysis/prompts.js`) is recorded into every report's `meta.model.prompt_version`, so a report can always be traced back to the exact prompt contract that produced it. The system prompt enforces citation discipline with hard rules, including "every finding must cite at least one real `row_hash` from the supplied evidence" and "output strict JSON only, no markdown code fences."

---

## 4. Providers

### 4.1 LLM providers

All 7 adapters plus a built-in mock implement the same `LLMProvider` interface (`send(messages, opts) -> response`). Exact required credential fields, read from each adapter's `requiredCredentials`:

| Provider | File | Required credentials | Notes |
|---|---|---|---|
| Anthropic | `providers/anthropic.js` | `apiKey` (secret), `baseUrl` (advanced, optional) | |
| OpenAI | `providers/openai.js` | `apiKey` (secret), `baseUrl` (advanced, optional) | |
| Azure OpenAI | `providers/azure-openai.js` | `endpoint`, `deployment`, `apiKey` (secret), `apiVersion` (optional, defaults if blank) | `requiredKeys: ['apiKey','endpoint','deployment']` |
| AWS Bedrock | `providers/bedrock.js` | `accessKeyId` (secret), `secretAccessKey` (secret), `sessionToken` (secret, optional — STS only), `region` | Requests are signed with SigV4. **Streaming is not implemented** — every call is a single non-streaming request/response |
| Google Gemini/Vertex | `providers/google.js` | `mode` (`gemini`\|`vertex`); Gemini mode: `apiKey` (secret); Vertex mode: `accessToken` (secret, OAuth bearer), `project`, `location` | The app does not implement an OAuth refresh flow — you are responsible for supplying a live `accessToken` for Vertex mode |
| OpenRouter | `providers/openrouter.js` | `apiKey` (secret), `referer` (optional, sent as `HTTP-Referer`), `appTitle` (optional, sent as `X-Title`) | |
| OpenCode | `providers/opencode.js` | `baseUrl` (**required** — no hosted default is assumed), `apiKey` (secret), `model` (free text, no fixed catalogue) | `requiredKeys: ['apiKey','baseUrl']` |
| Mock | `providers/mock.js` | none | Deterministic, zero-cost, zero-network. Used by the automated test suite and recommended for a first dry run of any new engagement config |

### 4.2 Storage providers

All 4 adapters implement `StorageProvider` (`put`, and optionally `get`/`list`/`delete`/`presignedUrl`):

| Provider | File | Required credentials | Notes |
|---|---|---|---|
| Azure Blob | `providers/storage/azure-blob.js` | `containerUrl` (secret) | A full container-level SAS URL — the SAS query string is the entire auth mechanism; no separate account key is ever entered |
| AWS S3 | `providers/storage/s3.js` | `accessKeyId` (secret), `secretAccessKey` (secret), `sessionToken` (secret, optional STS), `region`, `bucket`, `endpoint` (optional — MinIO/R2/any S3-compatible endpoint), `forcePathStyle` (optional bool) | SigV4-signed requests |
| Google Cloud Storage | `providers/storage/gcs.js` | `accessToken` (secret, OAuth bearer — Storage Object Admin or equivalent), `bucket` | **No `presignedUrl()` support.** V4 signed URLs require RSA private-key signing tied to a service account — a different crypto flow than the OAuth bearer token this adapter uses — so the method is omitted entirely (`presignedUrl` is optional on the interface) rather than faked |
| Local | `providers/storage/local.js` | none (`requiredCredentials: []`) | Uses the File System Access API (`showSaveFilePicker`) where available, falling back to a synthetic `<a download>` click. It is a one-way download sink: `get()`/`list()`/`delete()` all throw a clear non-retryable `ProviderError` — do not treat it as a queryable store |

---

## 5. Token budgeting / evidence-pack reduction

Constants from `web/assets/js/analysis/reduce.js`:

| Constant | Value | Meaning |
|---|---:|---|
| `DEFAULT_TOKEN_BUDGET` | 20,000 | **Per evidence pack**, not a single flat total |
| `DEFAULT_MAX_PACKS` | 12 | Ceiling on pack count — so up to roughly 240,000 tokens of evidence text can be sent across all map-phase calls combined |
| `DEFAULT_CONTEXT_WINDOW_SECONDS` | 300 | ± window around each detection row pulled in as context |
| `DEFAULT_STRATA_COUNT` | 24 | Number of uniform time buckets for the background sample |
| `DEFAULT_PRIORITY_SOURCES` | `execution`, `persistence`, `account`, `network` | Source categories favored in Tier 3 |
| `MESSAGE_MAX_CHARS` | 240 | Per-row text truncation |
| `CALL_OVERHEAD_TOKENS` | 300 | Fixed overhead reserved per call for the system prompt/schema instructions |

Row selection into a pack is a deterministic 4-tier process (same input timeline always produces the same packs):

1. **Tier 1** — every detection row, ordered by severity descending.
2. **Tier 2** — context-window rows within ±300 s (default) of each Tier-1 row.
3. **Tier 3** — rows from priority sources (`execution`/`persistence`/`account`/`network`) not already included.
4. **Tier 4** — a uniform time-stratified round-robin sample across 24 (default) strata, to guarantee coverage of quiet periods too, not just where detections already fired.

Rows are rendered TAB-separated (not JSON) specifically to reduce BPE-tokenizer punctuation overhead relative to a JSON encoding of the same data. `row_hash` is always emitted in full (64 lowercase hex characters) so every model-cited row can be traced back exactly.

> This is a more granular/accurate framing than `RUN_PLAN.md`'s assumption A9, which describes "a configurable budget, default ~180k tokens" as if it were one flat ceiling. The actual shipped constants are per-pack (20,000) × a pack-count ceiling (12), i.e. up to ~240k tokens of evidence text, not a single ~180k number. Both describe the same mechanism; the plan's figure was a looser approximation made before the constants were finalized in code.

---

## 6. Security model

- **Credentials are in-memory by default.** Nothing touches disk unless you explicitly opt in to persistence.
- **Opt-in encrypted persistence**: `web/assets/js/providers/credentials.js` — AES-GCM key derived via WebCrypto PBKDF2-HMAC-SHA256, `PBKDF2_ITERATIONS = 210000`, 16-byte random salt, 12-byte random IV, stored under `localStorage` key `ir-triage:credentials:v1`. **This is a separate, unrelated key-derivation parameterization from the client's own output-ZIP encryption** (≥600,000 PBKDF2 iterations, `IRTAESV1` container — see [`USAGE.md`](USAGE.md#15-encryption-decryption-and-verification-chain-of-custody)); do not conflate the two figures.
- **Anti-logging guard**: the `SecretCredentials` class throws if you call `toJSON()` or pass it to `JSON.stringify()` — callers must read individual fields deliberately, which makes an accidental `console.log(credentials)` or a careless serialization fail loudly instead of leaking a secret into a log.
- **Network egress is explicit and scoped**: the app calls out only to (a) the LLM provider you configured, only when you run an analysis, and (b) the storage provider you configured, only when you export there. No provider configured, or mock provider + local storage, means no egress at all.
- **Secrets never leave the browser except to the provider they belong to** — there is no proxy, relay, or telemetry endpoint anywhere in this app.

## 7. Report trust features

- **Citation discipline**: every finding in the report must cite at least one real `row_hash` present in the supplied evidence; this is enforced both by the system prompt's hard rules and by schema validation (with the repair loop retrying on a model response that fails this).
- **Deterministic fields are never model-authored**: `dashboard.*`, `scope.*`, and `mitre_coverage` are always the values computed in the pipeline's deterministic `computeDashboard` step — the assemble stage overwrites whatever the model produced for those specific keys unconditionally, every time, with no exception.
- **`analytic_gaps[]`** — a first-class report section for detection/visibility gaps the model identified (e.g., "no process-creation logging observed for this host") rather than burying that in narrative prose.
- **`dismissed_detections[]`** — a first-class section for raw detections the model considered and explicitly assessed as false positives, with its reasoning, rather than silently dropping them from the report.
- **`meta.model.prompt_version`** — every report records the exact prompt contract version (`PROMPT_VERSION`) it was produced under, so results remain reproducible/auditable across prompt revisions.
- **Strict JSON-only model output** — no markdown code fences accepted; the pipeline strips fences defensively before parsing, but a model that wraps its JSON in prose is still expected to fail validation and go through the repair loop.
