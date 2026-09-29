// Base-14 font metrics + WinAnsi encoding for the hand-rolled PDF writer
// (pdf.js). No font is embedded: Helvetica and Helvetica-Bold are two of the
// 14 standard fonts every PDF 1.7 consumer must ship, so referencing them by
// name keeps the exporter dependency-free (see VENDOR.md's justification
// checklist - this is the reason a "real" PDF library was not vendored).
//
// Width table: the standard Helvetica AFM advance widths (in 1/1000 em) for
// the printable ASCII range 32-126. These are the same numbers published in
// the PDF 1.7 spec's Appendix H / the Adobe Core 14 AFM files, and are widely
// reproduced (every PDF-writing library bakes in the same constants).
//
// Deliberate simplification (documented, not accidental): characters outside
// 32-126 - the WinAnsi upper range (128-255) and anything non-encodable - all
// use FALLBACK_WIDTH (556, the width of a lowercase 'n'/most digits) rather
// than their exact metric. For the short headings/labels/table cells this
// writer produces that is imperceptible; it avoids hand-transcribing a full
// 256-entry AFM table for a print path whose primary correctness bar is
// "layout doesn't overlap or truncate", not typographic perfection. The same
// table is reused for Helvetica-Bold (a real Bold table runs slightly wider);
// bold is only ever used for short headings in this writer, so the risk of
// visible overlap is low.
const FALLBACK_WIDTH = 556;

const ASCII_WIDTHS = {
  32: 278, 33: 278, 34: 355, 35: 556, 36: 556, 37: 889, 38: 667, 39: 191,
  40: 333, 41: 333, 42: 389, 43: 584, 44: 278, 45: 333, 46: 278, 47: 278,
  48: 556, 49: 556, 50: 556, 51: 556, 52: 556, 53: 556, 54: 556, 55: 556,
  56: 556, 57: 556, 58: 278, 59: 278, 60: 584, 61: 584, 62: 584, 63: 556,
  64: 1015, 65: 667, 66: 667, 67: 722, 68: 722, 69: 667, 70: 611, 71: 778,
  72: 722, 73: 278, 74: 500, 75: 667, 76: 556, 77: 833, 78: 722, 79: 778,
  80: 667, 81: 778, 82: 722, 83: 667, 84: 611, 85: 722, 86: 667, 87: 944,
  88: 667, 89: 667, 90: 611, 91: 278, 92: 278, 93: 278, 94: 469, 95: 556,
  96: 333, 97: 556, 98: 556, 99: 500, 100: 556, 101: 556, 102: 278, 103: 556,
  104: 556, 105: 222, 106: 222, 107: 500, 108: 222, 109: 833, 110: 556,
  111: 556, 112: 556, 113: 556, 114: 333, 115: 500, 116: 278, 117: 556,
  118: 500, 119: 722, 120: 500, 121: 500, 122: 500, 123: 334, 124: 260,
  125: 334, 126: 584,
};

/** Unicode code points that WinAnsi (CP1252) places outside the Latin-1
 * range 0xA0-0xFF, e.g. curly quotes and the em/en dash that forensic prose
 * frequently contains after being pasted from a word processor. Mapped to
 * their WinAnsi single-byte code; anything not in this map and >= 0x100
 * falls back to '?' (0x3F), which is the documented non-encodable fallback. */
const WIN_ANSI_HIGH = new Map([
  [0x20ac, 0x80], [0x201a, 0x82], [0x0192, 0x83], [0x201e, 0x84],
  [0x2026, 0x85], [0x2020, 0x86], [0x2021, 0x87], [0x02c6, 0x88],
  [0x2030, 0x89], [0x0160, 0x8a], [0x2039, 0x8b], [0x0152, 0x8c],
  [0x017d, 0x8e], [0x2018, 0x91], [0x2019, 0x92], [0x201c, 0x93],
  [0x201d, 0x94], [0x2022, 0x95], [0x2013, 0x96], [0x2014, 0x97],
  [0x02dc, 0x98], [0x2122, 0x99], [0x0161, 0x9a], [0x203a, 0x9b],
  [0x0153, 0x9c], [0x017e, 0x9e], [0x0178, 0x9f],
]);

export const NON_ENCODABLE_FALLBACK_CHAR_CODE = 0x3f; // '?'

/** Encode a JS (UTF-16) string into a WinAnsi "binary string" - a JS string
 * whose char codes are each in 0-255, one per output byte. Every code point
 * that WinAnsi cannot represent is replaced with '?' (documented fallback);
 * the caller never has to special-case surrogate pairs, emoji, CJK, etc. -
 * they simply degrade to '?' rather than corrupting the PDF byte stream. */
export function toWinAnsiBinaryString(str) {
  let out = '';
  for (const ch of str) {
    const cp = ch.codePointAt(0);
    if (cp <= 0x7f) {
      out += ch;
    } else if (cp >= 0xa0 && cp <= 0xff) {
      out += ch; // WinAnsi matches Latin-1 in this range
    } else if (WIN_ANSI_HIGH.has(cp)) {
      out += String.fromCharCode(WIN_ANSI_HIGH.get(cp));
    } else if (cp === 0x80) {
      out += String.fromCharCode(0x80); // euro handled above via map; guard
    } else {
      out += String.fromCharCode(NON_ENCODABLE_FALLBACK_CHAR_CODE);
    }
  }
  return out;
}

/** Escape a WinAnsi binary string for use inside a PDF literal string, i.e.
 * between the ( and ) delimiters: backslash-escape backslash and both
 * parens, per PDF 1.7 spec 7.3.4.2. */
export function escapePdfLiteral(binaryString) {
  return binaryString.replace(/([()\\])/g, '\\$1');
}

/** Width of one WinAnsi byte (0-255) in 1/1000 em, for either Base-14 font
 * this writer uses. */
export function glyphWidth(charCode) {
  return ASCII_WIDTHS[charCode] ?? FALLBACK_WIDTH;
}

/** Width of a whole (already WinAnsi-encoded) binary string, in points, at
 * the given font size. */
export function textWidthPt(binaryString, fontSize) {
  let units = 0;
  for (let i = 0; i < binaryString.length; i++) {
    units += glyphWidth(binaryString.charCodeAt(i));
  }
  return (units / 1000) * fontSize;
}

/** Word-wrap an already-WinAnsi-encoded binary string into lines that each
 * fit within maxWidthPt at fontSize. Words longer than the line width alone
 * are hard-broken character by character so a single pathological token
 * (e.g. a 64-char row_hash) never overflows a column or gets silently
 * dropped. */
export function wrapWinAnsiText(binaryString, fontSize, maxWidthPt) {
  if (binaryString === '') return [''];
  const words = binaryString.split(/(\s+)/).filter((w) => w !== '');
  const lines = [];
  let current = '';
  const fits = (s) => textWidthPt(s, fontSize) <= maxWidthPt;

  for (const word of words) {
    if (word.trim() === '' && current === '') continue; // don't start a line with whitespace
    const candidate = current + word;
    if (fits(candidate)) {
      current = candidate;
      continue;
    }
    if (current.trim() !== '') lines.push(current.trimEnd());
    if (fits(word)) {
      current = word.trimStart();
    } else {
      // Hard-break a single overlong token.
      let chunk = '';
      current = '';
      for (const ch of word) {
        if (fits(chunk + ch)) {
          chunk += ch;
        } else {
          if (chunk) lines.push(chunk);
          chunk = ch;
        }
      }
      current = chunk;
    }
  }
  if (current.trim() !== '' || lines.length === 0) lines.push(current.trimEnd());
  return lines;
}
