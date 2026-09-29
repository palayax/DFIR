# Vendored dependencies

Zero. This app deliberately vendors nothing.

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

Until then, this file stays empty of actual entries by design — treat adding
a dependency here as a deliberate, justified exception, not a default.
