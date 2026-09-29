# Configuration Reference — `irtriage.yaml`

Every key in the shipped `config/irtriage.yaml`, its default, valid values, and what it actually does. The file itself is exhaustively commented; this document is the same information in table form for quick lookup, plus worked example configs.

**Strict parsing**: unknown top-level or nested keys are a hard configuration error, not a warning. A typo in a key name fails `--validate-config` and every real run.

## Config discovery

`irtriage.yaml` is resolved in this order, first match wins:

1. `--config <path>` (explicit CLI override)
2. `irtriage.yaml` beside the executable
3. `irtriage.yml` beside the executable
4. `irtriage.yaml` in the current working directory
5. built-in defaults (no file needed — every key below has a default)

---

## `meta` — case metadata

Recorded verbatim into `manifest.json`. **Never** written into the timeline itself — this is deliberate, to keep the timeline's row set independent of what case metadata happens to be set, which matters for the determinism contract (byte-identical timeline output for byte-identical evidence, regardless of case_id/examiner).

| Key | Default | Notes |
|---|---|---|
| `case_id` | `""` | Overridable via `--case-id` |
| `examiner` | `""` | Overridable via `--examiner` |
| `organization` | `""` | Free text |
| `description` | `""` | Free text |
| `tags` | `[]` | List of free-text strings |
| `classification` | `""` | Free text (e.g. `"TLP:RED"`) |

## `run` — execution parameters

| Key | Default | Valid values | Notes |
|---|---|---|---|
| `profile` | `"basic"` | `basic`\|`full`\|`custom` | Overridable via `--profile` |
| `output_dir` | `"."` | any path | Supports `%HOSTNAME%`, `%TIMESTAMP%`, `%CASEID%`, `%USERNAME%`, `%ENV:NAME%` tokens |
| `output_name` | `"IRTriage_%HOSTNAME%_%TIMESTAMP%"` | any string with tokens | Base filename, extension added automatically (`.zip` or `.zip.aes`) |
| `temp_dir` | `""` | any path, empty = OS temp | Working scratch space; not included in the output |
| `keep_temp` | `false` | bool | Leave the temp workspace on disk after a run (debugging) |
| `max_runtime_minutes` | `180` | integer | Hard wall-clock ceiling for the whole run |
| `cpu_limit_percent` | `70` | 1-100 | Forwarded to Velociraptor as a soft CPU throttle |
| `memory_limit_mb` | `2048` | integer | **No effect** — see the callout below |
| `continue_on_error` | `true` | bool | If false, the first per-collector error aborts the whole run. Default true because "a triage tool that aborts halfway is worse than one that reports partial coverage" |
| `progress` | `"auto"` | `auto`\|`always`\|`never` | Progress output verbosity |

> **`memory_limit_mb` is accepted but currently has NO effect.** The config comment states this verbatim: *"CURRENTLY NOT APPLIED — upstream bug in Velociraptor v0.77.2"*. Forwarding it as Velociraptor's `--hard_memory_limit` triggers a nil-pointer panic in Velociraptor's own `executor/nanny.go:92` (reached via `bin/artifacts.go:302`), crashing the collection with exit code 2 — reproduced empirically against the pinned v0.77.2 binary (baseline run, plus `--timeout`/`--cpu_limit`/`--progress_timeout` alone, are all fine; adding `--hard_memory_limit` alone crashes). This build therefore never emits that flag to Velociraptor, regardless of what you set here. A guard test (`TestBuildArgs_NeverEmitsHardMemoryLimit`) prevents a future regression from re-introducing it. The key is still validated for forward-compatibility (e.g. once the upstream bug is fixed) and changing it from the default logs a warning.

## `timeline` — SuperTimeline builder

| Key | Default | Valid values | Notes |
|---|---|---|---|
| `enabled` | `true` | bool | Overridable via `--no-timeline` |
| `formats` | `["csv","jsonl"]` | subset of `csv`,`jsonl` | Output format(s) written into the ZIP |
| `expand_macb` | `true` | bool | Expand MACB (Modified/Accessed/Changed/Born) timestamps each into their own row |
| `include_zero_timestamps` | `false` | bool | Whether rows with an all-zero/epoch timestamp are kept |
| `dedupe` | `true` | bool | Drop duplicate rows by `row_hash` |
| `time_range` | `{start: "", end: ""}` | RFC3339 or empty | Optional inclusive filter window |
| `sources_include` | `[]` | list of source names, empty = all | Allow-list filter |
| `sources_exclude` | `[]` | list of source names | Deny-list filter, applied after include |
| `max_rows` | `0` | integer, 0 = unlimited | Hard cap on timeline row count |
| `join_detections` | `true` | bool | Attach matching Sigma/YARA/Nuclei/Hayabusa detections onto their timeline rows |
| `csv_bom` | `true` | bool | Write a UTF-8 BOM at the start of `timeline.csv` (Excel compatibility) |
| `csv_crlf` | `true` | bool | Use CRLF line endings in `timeline.csv` |
| `sort_check` | `true` | bool | Re-verify the total sort order before writing (defense in depth) |

## `profiles` — artifact/collector selection

### `profiles.basic` (default profile)

| Sub-key | Value |
|---|---|
| `velociraptor_artifacts` | `Generic.Client.Info`, `Windows.NTFS.MFT`, `Windows.Registry.NTUser`, `Windows.Forensics.Prefetch`, `Windows.Registry.AppCompatCache`, `Windows.Forensics.Amcache`, `Windows.EventLogs.EvtxHunter`, `Windows.System.Pslist`, `Windows.System.Services`, `Windows.Network.Netstat`, `Windows.Forensics.SRUM` (11 total) |
| `native_collectors` | `["native.process"]` |
| `file_collection` | enabled=true, root=`C:`, accessor=`auto`, max=100 MB, target_sets=`["quick_triage"]` |
| `rules` overrides | `sigma_enabled=true`; `yara`/`nuclei`/`hayabusa`=`false` |
| `memory` | all collection flags `false` |

### `profiles.full`

| Sub-key | Value |
|---|---|
| `velociraptor_artifacts` | basic's 11 plus ~20 more, incl. `Windows.NTFS.I30`, `Windows.Forensics.Bam`, `Windows.Registry.UserAssist`, `Windows.Forensics.RecentApps`, `Windows.Forensics.UserAccessLogs`, `Windows.Registry.Shellbags`, `Windows.Forensics.JumpLists`, `Windows.Forensics.Lnk`, `Windows.Registry.RecentDocs`, `Windows.Forensics.RecycleBin`, `Windows.EventLogs.PowershellScriptblock`, `Windows.System.ScheduledTasks`, `Windows.System.TaskScheduler`, `Windows.System.Handles`, `Windows.Network.NetstatEnriched`, `Windows.Network.ListeningPorts`, `Windows.Persistence.PermanentWMIEvents`, `Windows.Applications.Chrome/Edge/Firefox.History`, `Windows.Sys.Users`, `Windows.Sys.StartupItems` (~31 total) |
| `native_collectors` | `native.process`, `native.eventlog`, `native.registry`, `native.services`, `native.rawvolume` (5 total) |
| `file_collection` | accessor=`ntfs`, max=500 MB, target_sets = 3 sets |
| `rules` overrides | `sigma_enabled=true`, `yara_enabled=true`, `nuclei_enabled=true`, `hayabusa_enabled=true` |
| `memory` | `process_dump_enabled=true`, `process_names=["lsass.exe"]` |

### `profiles.custom`

Empty by design (`velociraptor_artifacts: []`, `native_collectors: []`). If `run.profile: custom` and both lists are still empty, config validation **fails** — a forensics tool must never silently collect nothing because a profile was left blank. The file includes a ready-to-uncomment example block.

**Native collector ID catalogue** (all 8 IDs this build understands, whichever profile references them):

| ID | Requires admin | What it collects |
|---|---|---|
| `native.process` | no | Running process list, command lines, hashes |
| `native.network` | no | Active TCP/UDP connections |
| `native.system` | no | OS/host inventory |
| `native.services` | no | Service configuration |
| `native.registry` | no | Commonly-queried registry keys |
| `native.tasks` | **yes** | Scheduled tasks |
| `native.eventlog` | **yes** (Security channel only; other channels do not require it) | Windows Event Log channels |
| `native.rawvolume` | **yes** | Raw NTFS volume access |

## `rules` — detection engines

### `rules.sigma`

| Key | Default | Notes |
|---|---|---|
| `package` | `"core++"` | `core`\|`core+`\|`core++`\|`all` — SigmaHQ rule package tier |
| `include_emerging_threats` | `true` | bool |
| `min_level` | `"medium"` | `informational`\|`low`\|`medium`\|`high`\|`critical` |
| `rule_ids_exclude` / `rule_ids_include` | `[]` | regex lists |
| `log_sources` / `field_mapping_overrides` | `{}` | advanced maps, rarely needed |
| `timeout_seconds` | `120` | per-collection timeout |

### `rules.yara`

| Key | Default | Notes |
|---|---|---|
| `sources` | `["reversinglabs"]` | which embedded YARA rule sets to load |
| `custom_rules_dir` | `""` | optional extra rules directory |
| `targets` | 3 default globs | file globs to scan |
| `scan_processes` | `false` | bool; `process_names` filters which if enabled |
| `max_file_size_mb` | `100` | per-file scan size cap |
| `number_of_hits` | `1` | **must stay `1`** — see the callout below |
| `context_bytes` | `64` | bytes of context captured around a match |
| `exclude_paths` | `[]` | glob exclusions |

> **`number_of_hits` must stay `1`.** The config comment is explicit: *"DO NOT CHANGE WITHOUT READING THIS"*. `number_of_hits=1` produces one output row per matching rule (i.e. full coverage: if 3 rules match a file, you get 3 rows). Any other value (`3`, `5`, `50`, ...) collapses to **one row total per file** — only the first matching rule, silently discarding the rest. This is a semantic of Velociraptor's `yara()` VQL plugin itself, not a bug in this tool, and it is easy to misread the option name as "cap the number of hits reported" rather than what it actually does.

### `rules.nuclei`

| Key | Default | Notes |
|---|---|---|
| `template_categories` | build-embedded `file/*` set | which template categories to load |
| `severity_min` | `"low"` | `info`\|`low`\|`medium`\|`high`\|`critical` |
| `targets` | `[]` | file paths/globs to scan |
| `allow_network` | `false` | **has no effect on this artifact regardless of value** — see below |
| `extra_args` | `["-duc","-ni"]` | passed through to the embedded nuclei binary |
| `timeout_seconds` | `300` | per-collection timeout |

> **`allow_network: true` does not enable network scanning.** The yaml comment describes what the setting is *intended* to do — switch on `http`/`network`/`dns`/`ssl`/`dast` template categories and stop passing `-ni` — with a prominent warning about the risk (*"can emit OUTBOUND SCAN/PROBE TRAFFIC... defeats this tool's normal air-gapped, read-only guarantee"*). Reading the comment alone could suggest that risk is live today. It is not: `Custom.IRTriage.Nuclei.Files`'s own VQL hardcodes `-pt file -file` unconditionally, and `client/internal/rules/nuclei.go`'s `nucleiFileCategories()` structurally keeps only categories that are exactly `file` or start with `file/` — every other category is refused before nuclei ever runs, and the non-file categories are not even staged into the embedded binary at build time. Setting `allow_network: true` with disallowed categories configured logs: *"rules.nuclei.allow_network=true, but [...] — allow_network has NO effect on this artifact; network scanning from this tool is not implemented."* Treat the yaml comment as documentation of the setting's *design intent/history*, not its *current, enforced behavior*.

### `rules.hayabusa`

| Key | Default | Notes |
|---|---|---|
| `enabled` | `false` (auto-enabled by `full` profile) | bool |
| `min_level` | inherits `rules.sigma.min_level` unless set | severity floor |
| `evtx_dir` | `""` | optional extra EVTX source directory |
| `extra_args` | `[]` | passed through to the embedded hayabusa binary |

## `output`

| Key | Default | Notes |
|---|---|---|
| `zip_password` | `""` | non-empty enables AES-256-GCM encryption of the whole archive (see [`USAGE.md`](USAGE.md#15-encryption-decryption-and-verification-chain-of-custody)) |
| `compression_level` | `5` | 0-9 |
| `include_raw` | `true` | include per-artifact raw evidence ZIPs; `--timeline-only` forces this off for that run |
| `hash_algorithms` | `["sha256"]` | algorithms recorded in `SHA256SUMS`/`manifest.json` |
| `split_size_mb` | `0` | 0 = single archive, no splitting |
| `manifest` | `true` | write `manifest.json` (disabling is not recommended) |
| `redact` | `[]` | field-name redaction list applied before writing the timeline |

## `performance`

| Key | Default | Notes |
|---|---|---|
| `parallel_artifacts` | `2` | concurrent Velociraptor artifact invocations |
| `parallel_yara_workers` | `0` | 0 = auto (`GOMAXPROCS`) |
| `io_low_priority` | `true` | best-effort I/O deprioritization |
| `throttle_ms` | `0` | optional artificial delay between artifacts |

## `safety`

| Key | Default | Notes |
|---|---|---|
| `read_only` | `true` | **documentation-only** — `Validate()` accepts any value here; actual read-only enforcement (`GENERIC_READ`-only handles) is unconditional at the Win32 layer and is not gated by this key |
| `exclude_paths` | pagefile/hiberfil/swapfile | paths never opened |
| `abort_on_low_disk_mb` | `2048` | abort threshold |
| `max_output_size_gb` | `50` | run **aborts** (not truncated) if the output would exceed this |

## `advanced`

| Key | Default | Notes |
|---|---|---|
| `velociraptor_extra_flags` | `[]` | raw extra flags forwarded to the embedded Velociraptor binary — use with caution; can reintroduce the `memory_limit_mb` crash class if misused |
| `definitions_dir` | `""` | optional extra Velociraptor artifact-definition directory |
| `artifact_exchange_enabled` | `true` | include the embedded Velociraptor Artifact Exchange pack |
| `verify_embedded_hashes` | `true` | never disable for a real engagement — this is the check that catches a corrupted/tampered embedded payload before it runs |
| `dry_run` | `false` | config-level dry-run flag; equivalent to always passing `--dry-run` |

---

## Worked example configs

### 1. Minimal — accept every default

```yaml
version: "1.0"
```

Every key above already has a usable default; this is a complete, valid, `basic`-profile config.

### 2. Case-tagged full triage

```yaml
version: "1.0"
meta:
  case_id: "CASE-2026-0917"
  examiner: "J. Analyst"
  organization: "Example Corp IR"
  classification: "TLP:AMBER"
run:
  profile: "full"
  output_dir: "D:\\evidence\\%CASEID%"
  output_name: "IRTriage_%HOSTNAME%_%TIMESTAMP%"
```

### 3. Encrypted output, timeline-only, tighter disk safety margin

```yaml
version: "1.0"
run:
  profile: "basic"
output:
  zip_password: "correct-horse-battery-staple"
  include_raw: false
safety:
  abort_on_low_disk_mb: 8192
```

(Equivalent to running with `--timeline-only`, but baked into the config so it applies every time without a CLI flag.)

### 4. Custom profile — event logs and registry only, no file walk

```yaml
version: "1.0"
run:
  profile: "custom"
profiles:
  custom:
    velociraptor_artifacts:
      - "Generic.Client.Info"
      - "Windows.EventLogs.EvtxHunter"
      - "Windows.Registry.NTUser"
      - "Windows.Registry.AppCompatCache"
    native_collectors:
      - "native.registry"
      - "native.eventlog"
    file_collection:
      enabled: false
    rules:
      sigma_enabled: true
      yara_enabled: false
      nuclei_enabled: false
      hayabusa_enabled: false
```

### 5. Conservative resource footprint for a production server

```yaml
version: "1.0"
run:
  profile: "basic"
  cpu_limit_percent: 25
  continue_on_error: true
performance:
  parallel_artifacts: 1
  io_low_priority: true
  throttle_ms: 250
```

(`memory_limit_mb` is intentionally not set here — see the `run` section above; changing it from the default has no effect and only logs a warning.)
