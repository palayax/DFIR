# Usage

Operator workflow for the client (`IRTriage.exe`) and analyst workflow for the web app. Every CLI flag/exit-code claim below is read directly from `client/main.go` (the flag definitions in `newFlagSet`, the `usageText` constant, and the exit-code dispatch in `mainExitCode`) — not guessed.

---

## 1. Client — running a collection

### 1.1 Minimum steps

1. Put `IRTriage.exe` and `irtriage.yaml` in the same folder (config discovery order is documented in full in [`CONFIG_REFERENCE.md`](CONFIG_REFERENCE.md#config-discovery)).
2. Right-click `IRTriage.exe` → **Run as Administrator** (the EXE carries an embedded `requireAdministrator` PE manifest; a plain double-click from a non-elevated shell fails before `main()` even runs).
3. Collect the output ZIP, named `IRTriage_<HOSTNAME>_<TIMESTAMP>.zip` by default, written beside the EXE unless `run.output_dir`/`--out` says otherwise.

### 1.2 Full CLI reference

```
IRTriage.exe [flags]
```

**Common flags**

| Flag | Argument | Effect |
|---|---|---|
| `--config` | `<path>` | Path to `irtriage.yaml` (default: beside the executable, then built-in defaults) |
| `--profile` | `<name>` | Override `run.profile` (`basic`\|`full`\|`custom`) |
| `--out` | `<path>` | Override the output archive path or filename |
| `--case-id` | `<id>` | Override `meta.case_id` |
| `--examiner` | `<name>` | Override `meta.examiner` |
| `--log-level` | `<level>` | `debug`\|`info`\|`warn`\|`error` |
| `--no-timeline` | — | Skip building the timeline entirely, even if `timeline.enabled` is true |
| `--timeline-only` | — | Omit raw per-artifact evidence from the output archive; keep only the timeline/detections |
| `--allow-unelevated` | — | Proceed without administrator rights instead of requesting a UAC relaunch (reduced coverage — privileged collectors are skipped with a warning, not an error) |

`--no-timeline` and `--timeline-only` together is a configuration error (exit code 2): they are contradictory and at most one may be given.

**Informational modes** (none of these collect anything or write an archive)

| Flag | Effect |
|---|---|
| `--dry-run` | Show the full pre-flight plan (artifacts/native collectors/engines) and exit, without touching the host |
| `--list-artifacts` | Show the Velociraptor artifact plan the resolved profile would run, and exit |
| `--list-collectors` | Show every native collector this build contains, and exit |
| `--validate-config` | Validate the resolved configuration and exit |
| `--version` | Print version information and exit |
| `--help`, `-h` | Print usage text and exit |

**Post-hoc archive operations** (do not run any collection)

| Flag | Argument | Effect |
|---|---|---|
| `--verify` | `<path>` | Verify a finished output archive's `SHA256SUMS` and exit |
| `--decrypt` | `<path>` | Decrypt a `.zip.aes` archive produced by `output.zip_password`. Requires `--password`; writes beside the input (`.aes` suffix stripped) unless `--out` is given |
| `--password` | `<pw>` | Passphrase for `--decrypt` |

`--password` is a deliberate deviation from the plan's originally-enumerated flag list: `--decrypt` needs a passphrase from somewhere, and there is no other source for one. This is documented in `main.go`'s own comments and called out explicitly in section 3 below.

### 1.3 Exit codes

| Code | Meaning |
|---:|---|
| 0 | Success (or an informational mode printed what was asked) |
| 1 | Generic/internal error |
| 2 | Configuration error |
| 3 | Elevation required and not obtained |
| 4 | Run completed but something failed — see `manifest.json` in the archive |
| 5 | Packaging error |
| 6 | `--verify` or `--decrypt` failed |
| 130 | Interrupted (Ctrl-C) |

Dispatch order when multiple mode flags are somehow set at once: `--list-collectors` → `--verify` → `--decrypt` → `--list-artifacts` → `--validate-config` → `--dry-run` → a real run.

### 1.4 Worked command lines

```bash
IRTriage.exe --help
```

```bash
IRTriage.exe --version
```

```bash
# Full pre-flight plan without touching the host
IRTriage.exe --dry-run
```

```bash
# Validate irtriage.yaml (and any --config override) without running anything
IRTriage.exe --validate-config
```

```bash
# See exactly which Velociraptor artifacts the resolved profile would invoke
IRTriage.exe --list-artifacts
```

```bash
# See every native (non-Velociraptor) collector this build understands
IRTriage.exe --list-collectors
```

```bash
# A real collection, full profile, with case metadata
IRTriage.exe --profile full --case-id CASE-2026-0917 --examiner "J. Analyst"
```

```bash
# Timeline only -- drop raw per-artifact evidence from the ZIP
IRTriage.exe --timeline-only
```

```bash
# Custom output location and filename base
IRTriage.exe --out "D:\evidence\CASE-2026-0917.zip"
```

```bash
# Verify a finished archive's hashes (chain of custody)
IRTriage.exe --verify "IRTriage_HOST01_20260926T120000Z.zip"
```

```bash
# Decrypt an AES-256-GCM-encrypted archive (see output.zip_password in
# CONFIG_REFERENCE.md) -- outputs beside the input with the .aes suffix
# stripped unless --out is given
IRTriage.exe --decrypt "IRTriage_HOST01_20260926T120000Z.zip.aes" --password "correct-horse-battery-staple"
```

### 1.5 Encryption, decryption, and verification (chain of custody)

- **Encryption at collection time**: set `output.zip_password` in `irtriage.yaml` (non-empty enables it). The finished ZIP is sealed as a whole into a separate `<name>.zip.aes` container — **not** ZIP-native ZipCrypto or WinZip AES (both were deliberately rejected: ZipCrypto is cryptographically broken, and WinZip AES needs tooling this project's build environment doesn't have). The container is `IRTAESV1`: AES-256-GCM in 1 MiB chunks, each with a fresh random 12-byte nonce and 5-byte positional AAD (chunk index + finality flag), key derived via **PBKDF2-HMAC-SHA256 with an iteration count that is always ≥ 600,000** and a fresh random 16-byte salt per encryption. This is a distinct KDF parameterization from the web app's own key-persistence PBKDF2 (210,000 iterations — see [`WEB_APP.md`](WEB_APP.md)); the two are unrelated and must not be conflated.
- **Decryption**: `--decrypt <path> --password <pw> [--out <path>]`. A wrong password fails GCM authentication on the very first chunk — no plaintext is ever written before that check passes. Reordered, truncated, or tampered chunks are rejected the same way (see `client/internal/pack/encrypt.go`'s header comment for the full authenticated-chunk design). Decryption writes to a temp file and renames it into place only on full success; a failed decrypt leaves no partial output at the destination path.
- **Verification**: `--verify <path>` recomputes SHA-256 for every file the archive's own `SHA256SUMS` lists and reports `MISSING`/`MISMATCH` entries, exiting 6 if anything fails or 0 if everything checks out. This is distinct from the internal `assets.Verify()` that runs automatically at the start of every real invocation (which checks the running EXE's own embedded build-time payloads, not a past run's output).
- **manifest.json** inside the output ZIP carries run metadata, tool versions, per-collector errors, and the configured hash algorithm(s) (`output.hash_algorithms`, default `["sha256"]`) for every file — this is the chain-of-custody record.

### 1.6 Profiles

Three profiles, selected via `run.profile` or `--profile`:

| Profile | Velociraptor artifacts | Native collectors | Rule engines on | Typical duration |
|---|---:|---|---|---|
| `basic` | 11 (host info, MFT, NTUser hive, Prefetch, AppCompatCache, Amcache, EvtxHunter, Pslist, Services, Netstat, SRUM) | `native.process` | Sigma only | Minutes |
| `full` | 31 (basic's set plus browser history, shellbags, jump lists, LNK, WMI persistence, scheduled tasks, handles, enriched network, recycle bin, etc.) | `native.process`, `native.eventlog`, `native.registry`, `native.services`, `native.rawvolume` | Sigma, YARA, Nuclei, Hayabusa | Tens of minutes to a few hours |
| `custom` | none by default — **you** list every artifact/native collector/file target | none by default | inherits the global `rules:` block unless overridden | depends entirely on what you list |

`custom` with an empty `velociraptor_artifacts` and an empty `native_collectors` is a hard configuration error when `run.profile: custom` — a forensics tool must never silently collect nothing because a profile was left blank. See `config/irtriage.yaml`'s `profiles.custom` block for a ready-to-uncomment example.

Running `full` or `custom` with privileged native collectors (`native.tasks`, `native.rawvolume`) or the Security event-log channel while unelevated (`--allow-unelevated`) does not error — those specific collectors are skipped with a logged warning, and the rest of the run proceeds.

---

## 2. Web app — analyst workflow

The web app is a static site under `web/`; see the README's Quickstart for how to serve it. There is no login and no backend: everything happens in your browser tab, and nothing leaves your machine unless you explicitly export to a configured storage provider or run an LLM analysis against a configured provider.

### 2.1 Ingest

Drop one or more files onto the ingest view. Supported formats are auto-detected in this priority order (`web/assets/js/ingest/index.js`):

1. IRTriage timeline JSONL (`timeline.jsonl` from a client output ZIP)
2. IRTriage timeline CSV (`timeline.csv`)
3. A full Velociraptor/IRTriage acquisition ZIP (unzipped in-browser; timeline + raw artifacts extracted)
4. Generic JSON/JSONL (needs a field mapping you supply)
5. Generic CSV (needs a field mapping you supply)

Multiple files/runs can be ingested in the same session — this is exactly what "merge" (next step) is for.

### 2.2 Merge → SuperTimeline

All ingested rows are merged into a single SuperTimeline: deduplicated by `row_hash`, clock-skew-corrected where detectable (the original timestamp is preserved in `extra.original_timestamp_utc`), and sorted by the same total order the client uses (`timestamp_utc`, `source`, `artifact`, `row_hash`). This step never calls an LLM and never leaves your browser.

### 2.3 Analyze

Choose an LLM provider (see [`WEB_APP.md`](WEB_APP.md) for the full list, required credentials, and cost/token-budget preview) or use the built-in **mock provider** for a zero-cost, zero-network dry run (also what the test suite runs against). Before sending anything, the app shows you:

- exactly which rows were selected into evidence packs, and why (deterministic selection — see `web/assets/js/analysis/reduce.js`),
- an estimated token count and cost,
- the number of packs and the map-reduce plan.

The pipeline is: deterministic dashboard/scope computation (no model) → deterministic evidence-pack reduction (no model) → one model call per pack ("map") → one model call merging every map result ("reduce") → deterministic reassembly (dashboard/scope/mitre_coverage are always the deterministic values, never the model's) → schema validation, with up to 2 repair round-trips if the model's JSON doesn't validate.

### 2.4 Report

The finished report renders as an interactive dashboard (`web/report.html`): filterable evidence table, severity/source distributions, hourly heatmap, entity graph, MITRE ATT&CK coverage, IOC panel, analytic gaps, and dismissed-detections list. Every finding cites at least one `row_hash`; click through to see the underlying timeline row.

### 2.5 Export

- **PDF**: a hand-rolled client-side PDF 1.7 writer (no vendored PDF library — see `web/assets/js/report/pdf.js`'s header comment for the rationale) with a diagonal watermark repeated on every page, or the browser's own print-to-PDF using the print stylesheet as a fallback path.
- **JSON**: the raw report matching [`report_schema.json`](report_schema.json), for archival or re-import.
- **Upload to storage**: any configured storage provider (Azure Blob SAS, AWS S3, Google Cloud Storage, or local download — see [`WEB_APP.md`](WEB_APP.md)).

### 2.6 Settings / engagement key management

Per-engagement LLM and storage credentials are held in memory by default and never touch disk unless you explicitly opt in to encrypted `localStorage` persistence (AES-GCM, PBKDF2-SHA256-derived key, ≥210,000 iterations, random salt/IV — see [`WEB_APP.md`](WEB_APP.md)). Credential objects refuse to be `JSON.stringify()`'d directly as a secret-logging guard.
