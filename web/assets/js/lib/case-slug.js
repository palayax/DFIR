// The single definition of how a report's case id becomes a filename.
//
// WHY THIS MODULE EXISTS. Two pages export the same report, and each had its own
// copy of this logic. They drifted in both possible ways:
//
//   1. WRONG FIELD. views/report.js read `meta.case_id`, which
//      docs/report_schema.json does not define -- the case id lives at
//      `meta.engagement.case_id`. The lookup could therefore never match, so the
//      'report' fallback fired for EVERY report the console ever exported, while
//      report/main.js and report/pdf.js read the correct path. The same report
//      downloaded from the two pages got two different names. Nothing looked
//      broken, because a fallback filename looks deliberate.
//
//   2. DIFFERENT SANITISER. Even after the field was fixed, the two disagreed:
//      views/report.js replaced illegal characters with '-' and trimmed the
//      edges, while report/main.js replaced them with '_' and trimmed nothing. So
//      `IR 2026/014` produced `IR-2026-014` on one page and `IR_2026_014` on the
//      other. Both shipped fixtures (ACME-2026-014, DEMO-2026-0317) happen to
//      contain no illegal characters, which is exactly why this stayed invisible
//      -- and why a test asserting "the fixture needs no sanitising" proves
//      nothing. Real case ids routinely contain spaces and slashes.
//
// Sharing one function is the point. Two implementations that currently agree are
// a latent divergence; one implementation cannot disagree with itself.

/** Characters a filename may keep. Everything else collapses to a single dash. */
const ILLEGAL = /[^A-Za-z0-9._-]+/g;

/**
 * Derive a filesystem-safe slug from a report's engagement case id.
 *
 * Field precedence: the schema's `meta.engagement.case_id` wins. The two legacy
 * shapes are kept as fallbacks rather than removed, because a report
 * hand-assembled by an older build, or imported from a third-party export, may
 * still carry them -- and a filename is never worth failing an export over.
 *
 * Returns 'report' when no case id is present. That is the correct outcome for a
 * redacted export, too: the `publish` redaction profile DROPS engagement
 * metadata, so a published file legitimately should not be named after the
 * engagement it came from.
 *
 * @param {object|null|undefined} report
 * @returns {string} a non-empty slug, never containing a path separator
 */
export function caseSlug(report) {
  const raw = report?.meta?.engagement?.case_id
    || report?.meta?.case_id
    || report?.case_id
    || 'report';
  const slug = String(raw)
    .replace(ILLEGAL, '-')
    // Trim leading/trailing dashes so an id like "/IR-14/" does not become
    // "-IR-14-", and collapse runs the replace above can leave adjacent.
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
  // A case id consisting entirely of illegal characters would otherwise produce
  // an empty filename, which downloads as an unnamed file.
  return slug || 'report';
}

export default caseSlug;
