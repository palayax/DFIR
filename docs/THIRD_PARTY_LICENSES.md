# Third-Party Components and Licences

> **Generated file** — produced by `scripts/gen-third-party-licenses.py` from
> `build/assets.lock.json`. Do not edit by hand; bump the version in
> `build/sources.json`, re-run `build/fetch-assets.ps1`, then regenerate.

Generated from lockfile dated `2026-09-26T13:42:18Z`.

`IRTriage.exe` embeds and redistributes the components below. Each is downloaded from its official source over HTTPS and pinned by SHA-256; none is modified, except that non-compiling YARA rule files and remote-scanning Nuclei template categories are **removed** at build time (noted per component).

## Component inventory

| Component | Version | Licence | Size | SHA-256 |
|---|---|---|---:|---|
| `hayabusa` | v4.1.0 | AGPL-3.0 | 7,204,649 B | `2f386b38310ccbaa…` |
| `hayabusa-rules` | main@2026-09-26 | AGPL-3.0 | 3,609,852 B | `69638a8ae691fd51…` |
| `nuclei-binary` | v3.11.1 | MIT | 46,067,128 B | `bb6cb9ff8939b753…` |
| `nuclei-templates` | v10.4.9 | MIT | 19,015,442 B | `1c70b9c6797a9cdc…` |
| `sigma-all` | r2026-07-01 | DRL-1.1 | 3,172,748 B | `5725c91b5813587a…` |
| `sigma-core-plusplus` | r2026-07-01 | DRL-1.1 | 2,728,028 B | `469d83e1d1bbdb4d…` |
| `sigma-emerging-threats` | r2026-07-01 | DRL-1.1 | 444,938 B | `3f38ea7c174c7cef…` |
| `velo-exchange` | gh-pages@2026-09-26 | Apache-2.0 (mixed, per-artifact) | 1,614,379 B | `5750a5ebad3cee9b…` |
| `velociraptor` | v0.77.2 | AGPL-3.0 | 70,499,832 B | `686e4f5888fdd66d…` |
| `yara-reversinglabs` | develop@2026-09-26 | MIT | 455,877 B | `c48eb00ef8de0d62…` |
| `yara-signature-base` | master@2026-09-26 | DRL-1.1 | 1,872,103 B | `a722557abb11c65d…` |
| **Total** | | | **156,684,976 B** | |

## Licence obligations

### AGPL-3.0

Applies to: `hayabusa`, `hayabusa-rules`, `velociraptor`

Strong copyleft. The binary is **redistributed unmodified** and invoked as a separate process, not linked, so IRTriage's own source is not derived from it. Ship this notice and a copy of the licence; if you modify the upstream binary you must publish those modifications.

### Apache-2.0

Applies to: `velo-exchange`

Permissive. Retain notices and state significant changes.

### DRL-1.1

Applies to: `sigma-all`, `sigma-core-plusplus`, `sigma-emerging-threats`, `yara-signature-base`

Detection Rule Licence 1.1. Permits redistribution **with attribution**; commercial redistribution as a standalone rule-selling product is restricted. Individual rules may override the pack licence in their own `meta` block -- preserve rule metadata, never strip it.

### MIT

Applies to: `nuclei-binary`, `nuclei-templates`, `yara-reversinglabs`

Permissive. Retain the copyright notice and licence text.

## Canonical sources

- **hayabusa** (v4.1.0) — <https://github.com/Yamato-Security/hayabusa/releases/download/v4.1.0/hayabusa-4.1.0-win-x64-live-response.zip>
- **hayabusa-rules** (main@2026-09-26) — <https://codeload.github.com/Yamato-Security/hayabusa-rules/tar.gz/refs/heads/main>
- **nuclei-binary** (v3.11.1) — <https://github.com/projectdiscovery/nuclei/releases/download/v3.11.1/nuclei_3.11.1_windows_amd64.zip>
- **nuclei-templates** (v10.4.9) — <https://github.com/projectdiscovery/nuclei-templates/archive/refs/tags/v10.4.9.zip>
- **sigma-all** (r2026-07-01) — <https://github.com/SigmaHQ/sigma/releases/download/r2026-07-01/sigma_all_rules.zip>
- **sigma-core-plusplus** (r2026-07-01) — <https://github.com/SigmaHQ/sigma/releases/download/r2026-07-01/sigma_core%2B%2B.zip>
- **sigma-emerging-threats** (r2026-07-01) — <https://github.com/SigmaHQ/sigma/releases/download/r2026-07-01/sigma_emerging_threats_addon.zip>
- **velo-exchange** (gh-pages@2026-09-26) — <https://github.com/Velocidex/velociraptor-docs/raw/gh-pages/exchange/artifact_exchange_v2.zip>
- **velociraptor** (v0.77.2) — <https://github.com/Velocidex/velociraptor/releases/download/v0.77.2/velociraptor-v0.77.2-windows-amd64.exe>
- **yara-reversinglabs** (develop@2026-09-26) — <https://codeload.github.com/reversinglabs/reversinglabs-yara-rules/tar.gz/refs/heads/develop>
- **yara-signature-base** (master@2026-09-26) — <https://codeload.github.com/Neo23x0/signature-base/tar.gz/refs/heads/master>

## Build-time modifications to redistributed content

- **`yara-signature-base`** — the 13 rule files listed in that project's own `yara/external-variable-rules.txt` are **deleted** before embedding. They reference YARA external variables that are not supplied, so leaving them in would abort compilation of the entire corpus. Any further files that fail the build's compile pre-flight are also dropped and recorded in `BUILD_MANIFEST.json`.
- **`nuclei-templates`** — only the `file/` and `code/` categories are embedded. `http/`, `dast/`, `network/`, `ssl/`, `dns/` and `headless/` are remote-scanning templates with no host-triage value; excluding them keeps the tool from being pointed at third-party infrastructure during an incident.
- **`velociraptor`** — embedded gzip-compressed and inflated at runtime. The binary itself is bit-identical to the published release (verify against the pinned SHA-256 above).

## Reporting

If you believe a component is mis-attributed here, open an issue with the component id and the correct licence reference. Attribution errors in a redistributed forensic tool are treated as defects, not paperwork.
