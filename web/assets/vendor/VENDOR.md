# Vendored dependencies

One data-only exception (below). No code is vendored: this app deliberately
ships no third-party JavaScript.

Everything it needs is covered by standard browser APIs already available in
current Chromium/Firefox/Safari and in Node.js (for the test suite):

- **ZIP reading/inflating**: `DecompressionStream('deflate-raw')` /
  `CompressionStream('deflate-raw')` (see `../js/lib/unzip.js`) instead of a
  vendored zip library (e.g. JSZip, fflate).
- **Hashing**: `crypto.subtle.digest('SHA-256', ...)` (WebCrypto) instead of a
  vendored SHA-256 implementation.
- **JSON Schema validation**: a small hand-rolled validator scoped to exactly
  the subset of JSON Schema that `docs/timeline_schema.json` uses (see
  `../js/lib/validate-schema.js`), instead of vendoring ajv or a similar
  general-purpose library.
- **CSV parsing**: a small hand-rolled RFC 4180-ish parser (see
  `../js/lib/csv.js`) instead of a vendored CSV library.
- **UI**: plain DOM APIs, no framework, no virtual DOM, no bundler.

If a future subtask genuinely needs something the browser/Node standard
library cannot reasonably provide (e.g. a PDF renderer for the Report view),
add it here as its own subdirectory with:

- the exact version vendored,
- the upstream URL it was fetched from,
- the license text or a link to it,
- why a standard-library-only implementation wasn't feasible.

Treat adding a dependency here as a deliberate, justified exception, not a default.

## simple-icons/ — brand marks for the demo (data only)

- **What:** `simple-icons/brands.js`, an ES module holding the SVG path, title and
  brand colour of 31 icons (Okta, GitHub, Splunk, Cloudflare, Palo Alto Networks,
  Cisco, Qualys, Veeam, Google Cloud, Kubernetes, Claude, OWASP, ...). No code.
- **Version:** Simple Icons 16.32.0 (published 2026-09-20), fetched from
  `https://cdn.jsdelivr.net/npm/simple-icons@16.32.0/icons/<slug>.svg` and
  `.../data/simple-icons.json`.
- **Integrity:** every entry records the SHA-256 of the exact upstream SVG file.
  Regenerate or verify with `node scripts/vendor-brand-icons.mjs` /
  `--check` (both need network, so they are not build gates; the committed module
  is what ships).
- **License:** CC0-1.0 (https://github.com/simple-icons/simple-icons/blob/develop/LICENSE.md).
  The marks themselves are trademarks of their respective owners; the demo uses
  them only to depict a fictional company's technology stack, with no affiliation
  implied. Brands Simple Icons does not carry (Microsoft, AWS, Salesforce, Slack,
  CrowdStrike, ...) are shown as text badges in `web/assets/js/business/brands.js`,
  not as copies of their logos.
- **Why not standard library:** these are third-party artwork; there is nothing
  to implement, only to reference. Runtime must stay CDN-free (air-gapped), so the
  paths are committed rather than fetched.
