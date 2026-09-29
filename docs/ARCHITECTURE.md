# Architecture

Two deliverables joined by one data contract.

```
┌─────────────────────────── D1: IRTriage.exe (Go, static) ───────────────────────────┐
│                                                                                     │
│  irtriage.yaml  ──▶  config  ──▶  plan (resolved profile)                           │
│                                      │                                              │
│        embedded payloads ──▶ extract to %TEMP%\irtriage-<runid>\                     │
│                                      │                                              │
│              ┌───────────────────────┼────────────────────────┐                     │
│              ▼                       ▼                        ▼                     │
│      acquisition                 detection                native / LOTL             │
│   (Velociraptor artifacts,   (Sigma, YARA, Nuclei,      (direct Win32:              │
│    one per invocation)         Hayabusa)                 raw volume, EvtQuery,      │
│              │                       │                   registry, processes)       │
│              └───────────────┬───────┴────────────────────────┘                     │
│                              ▼                                                      │
│                   timeline builder (DETERMINISTIC)                                  │
│                    normalize → expand MACB → join detections                        │
│                    → dedupe → total sort → CSV + JSONL                              │
│                              ▼                                                      │
│              IRTriage_<HOST>_<TS>.zip                                               │
│                ├─ raw/         full acquisition (per-artifact results + uploads)     │
│                ├─ timeline.csv / timeline.jsonl                                     │
│                ├─ detections.jsonl                                                  │
│                ├─ manifest.json  (run metadata, hashes, errors, coverage)            │
│                └─ run.log                                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘
                                      │
                      docs/timeline_schema.json  (the contract)
                                      │
┌────────────────────── D2: web/ (static, GitHub Pages, no backend) ──────────────────┐
│  upload N zips/timelines ──▶ ingest (Web Worker) ──▶ SuperTimeline (merge+dedupe)    │
│                                          │                                          │
│               evidence-pack reduction (token-budgeted) ──▶ LLM (7 providers)         │
│                                          ▼                                          │
│                      structured report JSON ──▶ interactive dashboard                │
│                                               └▶ watermarked PDF                     │
│  credentials: in-memory, opt-in AES-GCM localStorage. Storage: Azure/S3/GCS/local.   │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Why a Go launcher wraps Velociraptor

The spec demands **one EXE, zero dependencies**, yet Velociraptor is a 70 MB binary and the rule
corpora are another 80 MB. The options were:

| Approach | Verdict |
|---|---|
| PowerShell script + `ps2exe` | Rejected — needs .NET Framework + PowerShell execution policy; not dependency-free; no `go:embed` equivalent. |
| .NET single-file | Rejected — no .NET SDK available, and self-contained .NET still unpacks a runtime. |
| Python + PyInstaller | Rejected — interpreter bundling, AV-hostile, large. |
| Velociraptor's own `collector` | Rejected — an offline collector bakes its config **into** the binary, so the spec's "config file beside the EXE" is impossible; and `--args` cannot carry megabyte rule corpora. |
| **Go with `go:embed`** | **Chosen** — `CGO_ENABLED=0` yields a truly static PE with no runtime, no DLLs, no framework. `go:embed` carries every payload. |

`CGO_ENABLED=0` is not a preference — it is the property that makes the artefact dependency-free.

## Embedded payload layout

Staged by `build/build.ps1` into `client/embedded/`, then compiled in via `go:embed`.
Go's `embed` does **not** compress, so anything compressible is stored pre-compressed and inflated
at runtime.

```
client/embedded/
├── manifest.json                     # what is embedded: id, version, sha256, size, licence
├── velociraptor.exe.gz               # 70.5 MB → ~25 MB
├── tools/
│   ├── nuclei.zip                    # 46 MB, already compressed, embedded verbatim
│   └── hayabusa.zip                  # 7 MB  (live-response variant)
├── rules/
│   ├── sigma-core++.zip              # 2.7 MB  (default)
│   ├── sigma-all.zip                 # 3.2 MB  (full profile / opt-in)
│   ├── sigma-emerging-threats.zip    # 0.4 MB
│   ├── yara-reversinglabs.tar.gz     # 0.5 MB  (MIT, primary)
│   ├── yara-signature-base.tar.gz    # 1.9 MB  (13 non-compiling files REMOVED at build time)
│   └── nuclei-templates-local.zip    # 19 MB stripped to file/ + code/ only
├── exchange/artifact_exchange_v2.zip # 1.6 MB
└── artifacts/                        # our own Custom.IRTriage.* YAML (embedded as a directory)
```

**Approximate EXE size: ~95–110 MB.** Dominated by nuclei (46 MB) and Velociraptor (25 MB
compressed). `build.ps1 -Minimal` drops nuclei + Hayabusa + `sigma-all` for a ~45 MB build.

Three build-time reductions matter:
- **nuclei-templates stripped to `file/` + `code/`.** `http/`, `dast/`, `network/`, `ssl/`, `dns/`,
  `headless/` are remote-scanning templates with no host-triage value, and shipping them invites
  misuse on a live incident host.
- **signature-base's 13 external-variable rule files deleted**, because they cannot compile without
  YARA externals and would abort the whole corpus. A compile pre-flight drops any further failures
  and records them in the build manifest.
- **Velociraptor gzipped**, recovering ~45 MB.

## Runtime flow

1. **Elevation.** The PE manifest is `requireAdministrator`. A non-elevated launch re-execs itself
   elevated (or fails with a clear message when `run.require_admin` is set and elevation is refused).
   Because the parent is already elevated, the embedded Velociraptor's own `highestAvailable`
   manifest never produces a second UAC prompt.
2. **Config discovery** — `--config` → `irtriage.yaml` beside the EXE → `irtriage.yml` → CWD → defaults.
3. **Extraction** to `%TEMP%\irtriage-<runid>\`: payloads inflated, SHA-256 verified against the
   embedded manifest, rule corpora unpacked, custom artifacts written to a `definitions/` dir.
   Wiped on exit unless `run.keep_temp`.
4. **Acquisition** — for each artifact in the resolved profile, a separate
   `velociraptor --definitions <dir> artifacts collect <one> --output <zip> --args ...`
   invocation (one per artifact: parameter isolation, error containment, per-artifact timing).
   Failures are recorded and execution continues (`run.continue_on_error`).
5. **Native/LOTL collectors** run in parallel for things Velociraptor either can't reach or where a
   direct Win32 call is cheaper and more reliable.
6. **Detection** — Sigma over EVTX, YARA over files and process memory, Nuclei over collected files,
   optionally Hayabusa as a second Sigma engine. Each normalizes to the same `Detection` record.
7. **Timeline build** — see below.
8. **Packaging** — one ZIP, streamed, with a manifest carrying per-file hashes, per-artifact status,
   coverage, and all errors.

## The determinism contract

This is the requirement most easily broken, so it is enforced structurally rather than by intent.

- **Total sort order** `(timestamp_utc, source, artifact, row_hash)`. Nothing depends on map
  iteration, filesystem walk order, goroutine completion order, or Velociraptor's explicitly
  non-deterministic artifact ordering.
- `row_hash` = SHA-256 over `[timestamp_utc, timestamp_desc, source, artifact, message, target,
  host, user]` joined with `0x1F`. Tiebreaker **and** dedupe key.
- Timestamps: RFC 3339, exactly **7** fractional digits, always `Z`. 7 digits matches Windows
  FILETIME's 100 ns resolution, and makes lexicographic order equal chronological order.
  Unknown times use the sentinel `0001-01-01T00:00:00.0000000Z`, which sorts first.
- **Every nondeterministic value lives in `manifest.json`, never in a timeline row**: run id,
  start/end time, durations, tool versions, operator name.
- `message` is rendered from a **fixed per-source template table**. No locale, no LLM, no scoring.
- A test runs the builder 3× over a fixture and asserts **identical output bytes**.

The timeline deliberately **over-collects**: benign rows and false positives are expected, because
the spec assigns refinement to the analysis phase (D2). A deterministic, complete, unopinionated
timeline is the product here — not a pre-judged one.

## Detection→timeline join

Detections attach to the timeline rows they concern rather than living in a separate silo:

- **Sigma** matches carry the source event, so they join on `(channel, event_record_id)`.
- **YARA** matches join on file path (and MFT entry where available).
- **Nuclei** matches join on the matched file path.
- A detection that cannot be joined to any acquisition row still becomes its own timeline row with
  `source: detection`, so nothing is ever dropped.
- `severity_max` and `detection_count` are denormalized onto the row so the CSV sorts usefully
  without parsing nested arrays.

Normalized severity across engines: Sigma `level` maps 1:1; YARA reads `meta.severity` and defaults
to `medium`; Nuclei `info` → `informational`; Hayabusa `level` maps 1:1.

## Security posture

- **Read-only on the target host.** Handles open `GENERIC_READ` with full share mode. No writes
  outside the output directory and temp workdir. No process termination, no quarantine, no
  remediation — an IR collector that mutates the scene destroys evidence.
- **Air-gapped by construction.** No `tools:` blocks (which can trigger HTTP), nuclei forced to
  `-duc -ni`, no telemetry, no auto-update. The tool works with the NIC unplugged.
- **No network scanning.** Nuclei targets the local filesystem only; `rules.nuclei.allow_network`
  defaults to false and is documented as generating outbound traffic.
- **Supply chain.** Every payload pinned by SHA-256 in `build/assets.lock.json`; a mismatch fails
  the build unless explicitly re-pinned. Velociraptor's `.sig` files have no published verification
  scheme, so HTTPS + hash pinning is the control — no theatrical signature check.
- **Web app.** No backend means no server-side key custody. Keys stay in memory; persistence is
  opt-in and AES-GCM encrypted (PBKDF2-SHA256, ≥210k iterations). Keys are sent only to the
  provider endpoint the user selected. Evidence never leaves the browser except in the LLM request
  the user explicitly approves, and the app shows exactly what will be sent, with a cost estimate,
  beforehand.
