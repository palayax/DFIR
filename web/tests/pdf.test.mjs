import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';

import { buildReportPdfBytes, generateReportPdf, resolveWatermarkText } from '../assets/js/report/pdf.js';
import { escapePdfLiteral, toWinAnsiBinaryString, NON_ENCODABLE_FALLBACK_CHAR_CODE } from '../assets/js/report/pdf-fonts.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FULL_FIXTURE_PATH = path.join(HERE, '..', 'fixtures', 'report', 'full-report.json');
const MINIMAL_FIXTURE_PATH = path.join(HERE, '..', 'fixtures', 'report', 'minimal-report.json');

async function loadFixture(p) {
  return JSON.parse(await readFile(p, 'utf8'));
}

// ---------------------------------------------------------------------------
// Byte-level helpers for parsing the generated PDF back out, enough to
// assert real structure rather than just "the blob is non-empty". This
// mirrors pdf.js's own bytesToBinaryString technique (one JS char == one
// output byte) so string offsets found here line up exactly with byte
// offsets in the original Uint8Array - needed to correctly slice out and
// decompress each page's raw FlateDecode stream.
// ---------------------------------------------------------------------------

function bytesToBinaryString(bytes) {
  let s = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    s += String.fromCharCode(...bytes.subarray(i, Math.min(i + chunk, bytes.length)));
  }
  return s;
}

/** Find every page object's content-stream object id, in document order, by
 * scanning for `/Type /Page ... /Contents N 0 R` (page objects are written
 * one per line by pdf.js, so no dotall/multiline gymnastics are needed). */
function findPageContentIds(binStr) {
  const re = /<<\s*\/Type \/Page\s\/Parent 2 0 R[^\n]*?\/Contents (\d+) 0 R\s*>>/g;
  const ids = [];
  let m;
  while ((m = re.exec(binStr)) !== null) ids.push(Number(m[1]));
  return ids;
}

/** Extract and Flate-inflate the stream body of object `id` (assumed to be a
 * `<< /Length .. /Filter /FlateDecode >> stream ... endstream` object),
 * returning the decompressed content as a latin1-decoded string (1 byte ==
 * 1 char, same "binary string" convention pdf.js itself uses before
 * compression - so the watermark/text literals can be found with a plain
 * substring search). */
function extractDecompressedStream(binStr, bytes, id) {
  const objMarker = `${id} 0 obj`;
  const objStart = binStr.indexOf(objMarker);
  assert.ok(objStart !== -1, `object ${id} not found`);
  const streamKeywordIdx = binStr.indexOf('stream\n', objStart);
  assert.ok(streamKeywordIdx !== -1, `no 'stream' keyword found for object ${id}`);
  const dataStart = streamKeywordIdx + 'stream\n'.length;
  const dataEnd = binStr.indexOf('\nendstream', dataStart);
  assert.ok(dataEnd !== -1, `no 'endstream' found for object ${id}`);
  const compressed = bytes.subarray(dataStart, dataEnd);
  const inflated = zlib.inflateSync(Buffer.from(compressed));
  return inflated.toString('latin1');
}

// ---------------------------------------------------------------------------
// Overall file structure
// ---------------------------------------------------------------------------

test('buildReportPdfBytes produces a byte stream starting with the PDF 1.7 header and ending with %%EOF', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const { bytes } = await buildReportPdfBytes(fixture);
  const binStr = bytesToBinaryString(bytes);
  assert.ok(binStr.startsWith('%PDF-1.7'), 'missing %PDF-1.7 header');
  assert.ok(binStr.endsWith('%%EOF'), 'missing trailing %%EOF');
});

test('the generated PDF contains a classic xref table and a trailer referencing the Catalog', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const { bytes } = await buildReportPdfBytes(fixture);
  const binStr = bytesToBinaryString(bytes);
  assert.ok(/\nxref\n/.test(binStr) || binStr.startsWith('xref\n'), 'missing xref section');
  assert.ok(/trailer\n<<[^>]*\/Root 1 0 R/.test(binStr), 'trailer missing /Root reference');
  assert.ok(/\/Size \d+/.test(binStr), 'trailer missing /Size');
  assert.ok(/startxref\n\d+/.test(binStr), 'missing startxref offset');
});

test('the Pages object /Count matches the actual number of page objects produced', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const { bytes, pageCount } = await buildReportPdfBytes(fixture);
  const binStr = bytesToBinaryString(bytes);
  const countMatch = binStr.match(/\/Type \/Pages \/Kids \[([^\]]*)\] \/Count (\d+)/);
  assert.ok(countMatch, 'Pages object not found in expected form');
  const declaredCount = Number(countMatch[2]);
  const kidsCount = countMatch[1].trim().split(/\s+/).filter((t) => t === 'R').length;
  assert.equal(declaredCount, pageCount);
  assert.equal(kidsCount, pageCount);
  assert.equal(findPageContentIds(binStr).length, pageCount);
});

test('a full 12-finding report paginates across multiple pages rather than truncating', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const { pageCount } = await buildReportPdfBytes(fixture);
  assert.ok(pageCount > 3, `expected a multi-page document for this much content, got ${pageCount} page(s)`);
});

test('a minimal/empty report still produces at least one valid page (never zero pages)', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const { bytes, pageCount } = await buildReportPdfBytes(fixture);
  assert.ok(pageCount >= 1);
  const binStr = bytesToBinaryString(bytes);
  assert.ok(binStr.startsWith('%PDF-1.7'));
  assert.ok(binStr.endsWith('%%EOF'));
});

// ---------------------------------------------------------------------------
// Watermark: present on EVERY page, drawn via an ExtGState alpha + rotated Tm
// ---------------------------------------------------------------------------

test('an /ExtGState with fill and stroke alpha is defined and referenced by every page\'s /Resources', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const { bytes, pageCount } = await buildReportPdfBytes(fixture);
  const binStr = bytesToBinaryString(bytes);
  assert.ok(/\/Type \/ExtGState \/ca [\d.]+ \/CA [\d.]+/.test(binStr), 'no ExtGState with /ca and /CA alpha found');
  // Page objects are written as a single line each (see findPageContentIds'
  // comment) with a nested /Resources dict, e.g.:
  //   << /Type /Page /Parent 2 0 R ... /Resources << /Font << ... >> /ExtGState << /GS1 5 0 R >> >> /Contents N 0 R >>
  // A naive "/Resources <<[^>]*>>" regex stops at the first inner ">>"
  // (the nested /Font dict's own close) and misses /ExtGState entirely, so
  // match the whole page object line instead.
  const pageObjectLines = binStr.match(/<< \/Type \/Page \/Parent 2 0 R[^\n]*\/Contents \d+ 0 R >>/g) ?? [];
  assert.equal(pageObjectLines.length, pageCount, 'did not find one page-object line per page');
  for (const line of pageObjectLines) {
    assert.ok(line.includes('/ExtGState << /GS1 5 0 R >>'), `page object missing /GS1 ExtGState reference: ${line}`);
  }
});

test('the watermark text (from meta.engagement.classification) is painted on every single page, verified by decompressing each page\'s content stream', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const { bytes, pageCount, watermarkText } = await buildReportPdfBytes(fixture);
  assert.equal(watermarkText, fixture.meta.engagement.classification);
  const binStr = bytesToBinaryString(bytes);
  const contentIds = findPageContentIds(binStr);
  assert.equal(contentIds.length, pageCount);

  const watermarkBinary = toWinAnsiBinaryString(watermarkText);
  const watermarkLiteral = `(${escapePdfLiteral(watermarkBinary)}) Tj`;

  for (const [i, contentId] of contentIds.entries()) {
    const decompressed = extractDecompressedStream(binStr, bytes, contentId);
    // The writer paints the watermark 3 times per page (three diagonal
    // repeats) inside a "q ... /GS1 gs ... Q" alpha block.
    assert.ok(decompressed.includes('/GS1 gs'), `page ${i + 1}: watermark graphics state not applied`);
    const occurrences = decompressed.split(watermarkLiteral).length - 1;
    assert.ok(occurrences >= 3, `page ${i + 1}: expected the watermark text painted at least 3 times, found ${occurrences}`);
  }
});

test('resolveWatermarkText falls back to UNCLASSIFIED (or a caller-supplied fallback) when no classification is set', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  assert.equal(resolveWatermarkText(fixture), 'UNCLASSIFIED');
  assert.equal(resolveWatermarkText(fixture, { fallbackWatermark: 'TEST FALLBACK' }), 'TEST FALLBACK');
});

test('the minimal report (no classification) still gets a watermark on its page(s) using the UNCLASSIFIED fallback', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const { bytes, pageCount } = await buildReportPdfBytes(fixture);
  const binStr = bytesToBinaryString(bytes);
  const contentIds = findPageContentIds(binStr);
  const watermarkLiteral = `(${escapePdfLiteral(toWinAnsiBinaryString('UNCLASSIFIED'))}) Tj`;
  for (const contentId of contentIds) {
    const decompressed = extractDecompressedStream(binStr, bytes, contentId);
    assert.ok(decompressed.includes(watermarkLiteral));
  }
  assert.ok(pageCount >= 1);
});

// ---------------------------------------------------------------------------
// generateReportPdf: real Blob
// ---------------------------------------------------------------------------

test('generateReportPdf returns a real application/pdf Blob whose bytes match buildReportPdfBytes', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const blob = await generateReportPdf(fixture);
  assert.ok(blob instanceof Blob);
  assert.equal(blob.type, 'application/pdf');
  assert.ok(blob.size > 0);
  const blobBytes = new Uint8Array(await blob.arrayBuffer());
  const { bytes } = await buildReportPdfBytes(fixture);
  assert.equal(blobBytes.length, bytes.length);
  assert.deepEqual(blobBytes, bytes);
});

// ---------------------------------------------------------------------------
// Content fidelity: findings actually appear somewhere across the pages
// (nothing silently dropped by pagination).
// ---------------------------------------------------------------------------

test('every finding id from the fixture appears in the decompressed content of some page', async () => {
  const fixture = await loadFixture(FULL_FIXTURE_PATH);
  const { bytes } = await buildReportPdfBytes(fixture);
  const binStr = bytesToBinaryString(bytes);
  const contentIds = findPageContentIds(binStr);
  const allText = contentIds.map((id) => extractDecompressedStream(binStr, bytes, id)).join('\n');
  for (const f of fixture.findings) {
    const literalId = `(${escapePdfLiteral(toWinAnsiBinaryString(f.id))}`;
    assert.ok(allText.includes(literalId), `finding ${f.id} not found in any page's content stream`);
  }
});

// ---------------------------------------------------------------------------
// Text escaping: parens/backslashes and non-encodable characters
// ---------------------------------------------------------------------------

test('escapePdfLiteral backslash-escapes parentheses and backslashes', () => {
  assert.equal(escapePdfLiteral('plain text'), 'plain text');
  assert.equal(escapePdfLiteral('a(b)c'), 'a\\(b\\)c');
  assert.equal(escapePdfLiteral('back\\slash'), 'back\\\\slash');
  assert.equal(escapePdfLiteral('(\\)'), '\\(\\\\\\)');
});

test('toWinAnsiBinaryString maps common curly-quote/dash punctuation to their WinAnsi single-byte codes', () => {
  assert.equal(toWinAnsiBinaryString('’').charCodeAt(0), 0x92); // right single quotation mark
  assert.equal(toWinAnsiBinaryString('“').charCodeAt(0), 0x93); // left double quotation mark
  assert.equal(toWinAnsiBinaryString('—').charCodeAt(0), 0x97); // em dash
});

test('toWinAnsiBinaryString falls back to the documented "?" code for a non-encodable character', () => {
  const encoded = toWinAnsiBinaryString('emoji test: ★ done'); // BLACK STAR, not in WinAnsi
  assert.equal(encoded.charCodeAt('emoji test: '.length), NON_ENCODABLE_FALLBACK_CHAR_CODE);
  assert.equal(encoded, 'emoji test: ? done');
});

/** Escape-aware extraction of every `(...) Tj` string literal's *decoded*
 * content from a raw (decompressed) PDF content stream. Unlike a blanket
 * string-replace of escape sequences (which desyncs literal boundaries once
 * applied to a whole stream containing many independent literals), this
 * walks char-by-char so each literal is decoded in its own scope - the only
 * escapes pdf-fonts.js's escapePdfLiteral ever emits are \\, \( and \), so
 * decoding just un-escapes those three. If the stream is well-formed, every
 * "(" found is either the start of a literal we can fully decode up to its
 * matching unescaped ")", or it isn't followed by " Tj" and gets skipped
 * (e.g. a "(" inside a dictionary string elsewhere) - a malformed stream
 * (mismatched escaping) would desync and make later literals decode to
 * garbage or fail to reach "Tj", so this doubles as a syntax-validity check. */
function extractTjLiterals(streamText) {
  const literals = [];
  let i = 0;
  while (i < streamText.length) {
    const start = streamText.indexOf('(', i);
    if (start === -1) break;
    let j = start + 1;
    let decoded = '';
    let closed = false;
    while (j < streamText.length) {
      const c = streamText[j];
      if (c === '\\') {
        decoded += streamText[j + 1];
        j += 2;
        continue;
      }
      if (c === ')') { j += 1; closed = true; break; }
      decoded += c;
      j += 1;
    }
    assert.ok(closed, `unterminated PDF string literal starting at index ${start}`);
    let k = j;
    while (streamText[k] === ' ' || streamText[k] === '\n') k += 1;
    if (streamText.slice(k, k + 2) === 'Tj') {
      literals.push(decoded);
      i = k + 2;
    } else {
      i = start + 1;
    }
  }
  return literals;
}

test('extractTjLiterals correctly decodes escaped parens/backslashes (self-check of the test helper)', () => {
  const sample = 'BT\n/F1 10 Tf\n1 0 0 1 0 0 Tm\n(a\\(b\\)c\\\\d) Tj\nET\n';
  assert.deepEqual(extractTjLiterals(sample), ['a(b)c\\d']);
});

test('a finding title containing parentheses, a backslash and a non-encodable character round-trips into a syntactically valid, findable PDF literal', async () => {
  const fixture = await loadFixture(MINIMAL_FIXTURE_PATH);
  const poisoned = structuredClone(fixture);
  const trickyTitle = 'Weird (parens) and \\backslash\\ and a ★ star'; // ★ = BLACK STAR
  poisoned.findings = [{
    id: 'F-001', title: trickyTitle, severity: 'informational', confidence: 'low',
    narrative: 'n/a', evidence: [],
  }];
  const { bytes } = await buildReportPdfBytes(poisoned);
  const binStr = bytesToBinaryString(bytes);
  const contentIds = findPageContentIds(binStr);
  const allLiterals = contentIds.flatMap((id) => extractTjLiterals(extractDecompressedStream(binStr, bytes, id)));

  // toWinAnsiBinaryString + escapePdfLiteral together must downgrade the
  // star to '?' and preserve the literal parens/backslash - confirm the
  // decoded (unescaped) Tj text actually contains the original punctuation
  // intact, split across whatever line-wrapped Tj operators it landed in.
  const joined = allLiterals.join(' ');
  assert.ok(joined.includes('Weird (parens) and'), 'literal parens not preserved intact in decoded Tj text');
  assert.ok(joined.includes('\\backslash\\'), 'literal backslashes not preserved intact in decoded Tj text');
  assert.ok(joined.includes('and a ? star'), 'non-encodable star did not downgrade to the documented ? fallback');
  assert.ok(!joined.includes('★'), 'raw non-WinAnsi character leaked into the PDF content stream uncoverted');
});
