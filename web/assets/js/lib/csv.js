// A small, dependency-free CSV engine: delimiter sniffing, BOM handling,
// CRLF/LF, quoted fields with embedded commas/newlines, escaped quotes.
// The parser is incremental (feed()/end()) so callers can stream arbitrarily
// large files chunk-by-chunk without buffering the whole text.

export function stripBOM(text) {
  return text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
}

function countUnquoted(line, ch) {
  let count = 0;
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') inQuotes = !inQuotes;
    else if (c === ch && !inQuotes) count++;
  }
  return count;
}

/** Guess the field delimiter from the first few lines of a CSV sample. */
export function sniffDelimiter(sampleText, candidates = [',', ';', '\t', '|']) {
  const lines = sampleText.split(/\r\n|\r|\n/).slice(0, 5).filter((l) => l.length > 0);
  let best = candidates[0];
  let bestScore = -1;
  for (const d of candidates) {
    if (lines.length === 0) continue;
    const counts = lines.map((l) => countUnquoted(l, d));
    const consistent = counts.every((c) => c === counts[0]) && counts[0] > 0;
    const score = (consistent ? 1000 : 0) + counts[0];
    if (score > bestScore) {
      bestScore = score;
      best = d;
    }
  }
  return best;
}

/** Incremental RFC4180-ish CSV parser. Feed it text chunks in order; it
 * returns complete rows found so far. Call end() after the last chunk to
 * flush a final row that wasn't newline-terminated. */
export class CsvParser {
  constructor({ delimiter = ',' } = {}) {
    this.delimiter = delimiter;
    this.field = '';
    this.row = [];
    this.inQuotes = false;
    this.rows = [];
    this.touchedRow = false;
    this.pendingCR = false;
  }

  feed(chunk) {
    for (let i = 0; i < chunk.length; i++) {
      const c = chunk[i];
      if (this.pendingCR) {
        this.pendingCR = false;
        if (c === '\n') continue; // second half of a CRLF already handled
      }
      if (this.inQuotes) {
        if (c === '"') {
          if (chunk[i + 1] === '"') {
            this.field += '"';
            i++;
          } else {
            this.inQuotes = false;
          }
        } else {
          this.field += c;
        }
        continue;
      }
      if (c === '"') {
        this.inQuotes = true;
        this.touchedRow = true;
        continue;
      }
      if (c === this.delimiter) {
        this.row.push(this.field);
        this.field = '';
        this.touchedRow = true;
        continue;
      }
      if (c === '\r') {
        this.pendingCR = true;
        this._endRow();
        continue;
      }
      if (c === '\n') {
        this._endRow();
        continue;
      }
      this.field += c;
      this.touchedRow = true;
    }
    return this._take();
  }

  _endRow() {
    this.row.push(this.field);
    this.rows.push(this.row);
    this.field = '';
    this.row = [];
    this.touchedRow = false;
  }

  _take() {
    const out = this.rows;
    this.rows = [];
    return out;
  }

  end() {
    if (this.touchedRow || this.field.length > 0 || this.row.length > 0) {
      this.row.push(this.field);
      this.rows.push(this.row);
      this.row = [];
      this.field = '';
      this.touchedRow = false;
    }
    return this._take();
  }
}

/** Convenience wrapper for small in-memory CSV text (fixtures, sniffing). */
export function parseCsvSync(text, { delimiter } = {}) {
  const clean = stripBOM(text);
  const d = delimiter || sniffDelimiter(clean);
  const parser = new CsvParser({ delimiter: d });
  const rows = parser.feed(clean);
  rows.push(...parser.end());
  return { delimiter: d, rows };
}

export function needsQuoting(field, delimiter) {
  return field.includes('"') || field.includes('\n') || field.includes('\r') || field.includes(delimiter);
}

export function stringifyCsvField(field, delimiter) {
  const s = field == null ? '' : String(field);
  return needsQuoting(s, delimiter) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function stringifyCsvRow(fields, delimiter = ',') {
  return fields.map((f) => stringifyCsvField(f, delimiter)).join(delimiter);
}
