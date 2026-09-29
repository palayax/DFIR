// Programmatic PDF export (C7.2): a minimal, hand-rolled PDF 1.7 writer.
//
// Why hand-rolled (see web/assets/vendor/VENDOR.md's justification
// checklist): CLAUDE.md requires zero vendored deps and a fully air-gapped
// app. A real PDF library (pdf-lib, jsPDF, ...) would be the very first
// entry in VENDOR.md and would pull in either a bundler-friendly build (this
// app has no build step) or a large single file of unaudited code for a
// forensics tool. Text-only, Base-14-font PDF generation is small enough
// (this file) to write and audit directly, so that trade wins here. If a
// future subtask needs embedded fonts/images/vector graphics beyond what
// this writer does, THAT is the point where vendoring becomes justified.
//
// Scope of what this writer supports (deliberately minimal, sufficient for
// a forensic report export):
//   - Objects, xref table (classic, not xref streams), trailer.
//   - FlateDecode-compressed content streams via CompressionStream('deflate')
//     (RFC 1950 zlib format, which is what /FilterFlateDecode expects).
//   - Base-14 fonts only (Helvetica, Helvetica-Bold) - see pdf-fonts.js.
//   - WinAnsiEncoding with a documented '?' fallback for non-encodable text.
//   - A page tree + one content stream object per page.
//   - A diagonal, repeating, translucent watermark (via an ExtGState alpha)
//     painted identically on every page.
//   - Simple flowed text layout (headings/paragraphs/key-value pairs/tables)
//     with automatic pagination - a section too long to fit one page spills
//     onto the next; nothing is silently truncated. One documented
//     simplification: a table that spans a page break does not repeat its
//     header row on the continuation page (all rows still render, just
//     without the repeated header) - see the "Deviations" note in this
//     subtask's handback report.

import {
  toWinAnsiBinaryString, escapePdfLiteral, wrapWinAnsiText, textWidthPt,
} from './pdf-fonts.js';
import { citationRate, reductionRatio, isSampled, isUncited } from './metrics.js';

// --- Page geometry ---------------------------------------------------------
const PAGE_W = 612; // US Letter, points
const PAGE_H = 792;
const MARGIN = 54;
const HEADER_H = 22;
const FOOTER_H = 20;
const CONTENT_W = PAGE_W - 2 * MARGIN;
const CONTENT_H = PAGE_H - 2 * MARGIN - HEADER_H - FOOTER_H;
const CONTENT_TOP = PAGE_H - MARGIN - HEADER_H; // PDF y of the top of the content area

// --- Text encoding helper ---------------------------------------------------
function enc(text) {
  return toWinAnsiBinaryString(String(text ?? ''));
}

// ---------------------------------------------------------------------------
// Block model: the whole document is flattened into a linear list of blocks
// with precomputed line-wrapping (content width never changes, so wrapping
// can happen once at build time instead of during layout/measurement).
// ---------------------------------------------------------------------------

function h(level, text) {
  const size = level === 1 ? 20 : level === 2 ? 14.5 : 11.5;
  const lh = level === 1 ? 24 : level === 2 ? 18 : 15;
  const lines = wrapWinAnsiText(enc(text), size, CONTENT_W);
  return { type: 'heading', level, lines, size, lh, mb: level === 1 ? 14 : 8, height: lines.length * lh + (level === 1 ? 14 : 8) };
}

function body(text, opts = {}) {
  const size = opts.size ?? 10;
  const lh = opts.lh ?? 13;
  const mb = opts.mb ?? 6;
  const lines = wrapWinAnsiText(enc(text), size, CONTENT_W);
  return { type: 'body', lines, size, lh, mb, color: opts.color, height: lines.length * lh + mb };
}

function kv(label, value) {
  return body(`${label}:  ${value ?? '—'}`, { size: 9.5, lh: 12, mb: 4 });
}

function rule() {
  return { type: 'rule', height: 12 };
}

function spacer(height) {
  return { type: 'spacer', height };
}

function pagebreak() {
  return { type: 'pagebreak', height: 0 };
}

/** headers: string[]; rows: string[][]; colFractions: number[] summing ~1.
 * Expanded into an independent header block + one block per row so the
 * generic paginator (which only ever sees a flat block list) can break
 * between rows without any special-casing. */
function table(headers, rows, colFractions) {
  const widths = colFractions.map((f) => f * CONTENT_W);
  const buildRow = (cells, size, bold) => {
    const wrapped = cells.map((c, i) => wrapWinAnsiText(enc(c ?? ''), size, Math.max(20, widths[i] - 6)));
    const lineCount = Math.max(1, ...wrapped.map((w) => w.length));
    const lh = size + 3;
    return { type: 'table-row', cells: wrapped, widths, size, lh, bold: !!bold, height: lineCount * lh + 4 };
  };
  const blocks = [buildRow(headers, 9, true)];
  for (const r of rows) blocks.push(buildRow(r, 9, false));
  return blocks;
}

// ---------------------------------------------------------------------------
// Document model: report JSON -> flat block list
// ---------------------------------------------------------------------------

export function resolveWatermarkText(report, opts = {}) {
  const classification = report?.meta?.engagement?.classification;
  const trimmed = classification && String(classification).trim();
  return trimmed || opts.fallbackWatermark || 'UNCLASSIFIED';
}

function fmtPct(ratio) {
  return typeof ratio === 'number' ? `${(ratio * 100).toFixed(0)}%` : 'unknown';
}

function buildDocumentBlocks(report, opts) {
  const blocks = [];
  const meta = report?.meta ?? {};
  const eng = meta.engagement ?? {};
  const scope = report?.scope ?? {};
  const verdict = report?.verdict ?? {};
  const model = meta.model ?? {};
  const { cited, total, rate } = citationRate(report);
  const ratio = reductionRatio(report);

  // --- Title page ---
  blocks.push(h(1, 'Forensic Analysis Report'));
  if (eng.description) blocks.push(body(eng.description));
  blocks.push(spacer(4));
  blocks.push(kv('Case ID', eng.case_id));
  blocks.push(kv('Organization', eng.organization));
  blocks.push(kv('Examiner', eng.examiner));
  blocks.push(kv('Classification', resolveWatermarkText(report, opts)));
  blocks.push(kv('Report generated (UTC)', meta.generated_utc));
  blocks.push(kv('Model', `${model.provider ?? '?'} / ${model.model_id ?? '?'}`));
  blocks.push(rule());
  blocks.push(h(2, 'Scope'));
  const hosts = (scope.hosts ?? []).map((hh) => hh.host || hh.host_id).filter(Boolean).join(', ');
  blocks.push(kv('Hosts', hosts || 'none recorded'));
  blocks.push(kv('Time range (UTC)', `${scope.time_range?.start_utc ?? '?'} to ${scope.time_range?.end_utc ?? '?'}`));
  blocks.push(kv('Rows analysed / total', `${scope.rows_analysed ?? '?'} / ${scope.row_count ?? '?'}`));
  if (isSampled(report)) {
    blocks.push(body(`SAMPLING WARNING: the model analysed ${fmtPct(ratio)} of the collected timeline, not the full dataset. Absence of a finding here is not evidence of absence.`, { color: 'warn' }));
  }
  blocks.push(kv('Citation rate', total ? `${fmtPct(rate)} (${cited} of ${total} findings cite evidence)` : 'no findings'));
  blocks.push(pagebreak());

  // --- Verdict ---
  blocks.push(h(1, 'Verdict'));
  blocks.push(body(`${(verdict.assessment ?? 'not recorded').replaceAll('_', ' ').toUpperCase()} — confidence: ${verdict.confidence ?? 'unknown'}`, { size: 12, lh: 16 }));
  if (verdict.confidence_rationale) blocks.push(body(`Why this confidence: ${verdict.confidence_rationale}`));
  if (verdict.rationale) blocks.push(body(verdict.rationale));
  blocks.push(kv('Earliest suspicious activity (UTC)', verdict.earliest_suspicious_activity_utc));
  blocks.push(kv('Furthest observed attack stage', verdict.attack_stage));
  blocks.push(pagebreak());

  // --- Executive summary ---
  blocks.push(h(1, 'Executive Summary'));
  const summaryText = report?.executive_summary?.text;
  if (summaryText) {
    for (const para of String(summaryText).split(/\n{2,}/)) blocks.push(body(para.trim()));
  } else {
    blocks.push(body('No executive summary was recorded for this report.'));
  }
  for (const b of report?.executive_summary?.bullets ?? []) blocks.push(body(`•  ${b}`));
  blocks.push(pagebreak());

  // --- Findings ---
  const findings = report?.findings ?? [];
  blocks.push(h(1, `Findings (${findings.length})`));
  if (findings.length === 0) blocks.push(body('No findings were recorded for this report.'));
  for (const f of findings) {
    blocks.push(h(2, `${f.id} · ${f.title} [${f.severity}/${f.confidence}]`));
    if (isUncited(f)) blocks.push(body('[!] UNCITED — this finding has no evidence[] rows attached. Treat as an unsupported claim.', { color: 'warn' }));
    blocks.push(body(f.narrative ?? ''));
    if (f.category) blocks.push(kv('Category', f.category));
    if (f.mitre_techniques?.length) blocks.push(kv('MITRE techniques', f.mitre_techniques.join(', ')));
    if (f.affected_hosts?.length) blocks.push(kv('Affected hosts', f.affected_hosts.join(', ')));
    if (f.affected_accounts?.length) blocks.push(kv('Affected accounts', f.affected_accounts.join(', ')));
    if (f.recommendation) blocks.push(body(`Recommendation: ${f.recommendation}`));
    if (f.false_positive_considered) blocks.push(body(`Benign explanation considered: ${f.false_positive_considered}`));
    if (f.detection_rules?.length) {
      blocks.push(...table(['Engine', 'Rule', 'Severity'], f.detection_rules.map((r) => [r.engine, r.rule_name || r.rule_id, r.severity]), [0.25, 0.55, 0.2]));
    }
    if (f.evidence?.length) {
      blocks.push(body('Evidence:', { size: 9.5, lh: 12, mb: 2 }));
      blocks.push(...table(
        ['Timestamp (UTC)', 'Host', 'Row hash', 'Excerpt'],
        f.evidence.map((e) => [e.timestamp_utc, e.host, e.row_hash, e.excerpt]),
        [0.18, 0.14, 0.32, 0.36],
      ));
    }
    blocks.push(rule());
  }
  blocks.push(pagebreak());

  // --- IOCs ---
  const iocs = report?.iocs ?? {};
  const iocTypes = Object.keys(iocs).filter((k) => Array.isArray(iocs[k]) && iocs[k].length);
  blocks.push(h(1, 'Indicators of Compromise'));
  if (iocTypes.length === 0) blocks.push(body('No indicators of compromise were extracted for this report.'));
  for (const t of iocTypes) {
    blocks.push(h(2, t.replaceAll('_', ' ')));
    blocks.push(...table(
      ['Value', 'Context', 'Occ.', 'Verdict', 'Conf.'],
      iocs[t].map((i) => [i.value, i.context, i.occurrences, i.verdict, i.confidence]),
      [0.3, 0.38, 0.08, 0.14, 0.1],
    ));
  }
  blocks.push(pagebreak());

  // --- Analytic gaps ---
  blocks.push(h(1, 'Analytic Gaps'));
  const gaps = report?.analytic_gaps ?? [];
  if (gaps.length === 0) {
    blocks.push(body((scope.row_count ?? 0) > 500
      ? `No analytic gaps were reported despite a ${scope.row_count}-row dataset - verify this was not overlooked.`
      : 'No analytic gaps were reported for this report.'));
  } else {
    for (const g of gaps) {
      blocks.push(body(`• ${g.gap}${g.reason ? ` [${g.reason.replaceAll('_', ' ')}]` : ''}`));
      if (g.detail) blocks.push(body(g.detail, { size: 9, lh: 11 }));
      if (g.how_to_close) blocks.push(body(`How to close: ${g.how_to_close}`, { size: 9, lh: 11 }));
    }
  }
  blocks.push(pagebreak());

  // --- Dismissed detections ---
  blocks.push(h(1, 'Dismissed Detections'));
  const dismissed = report?.dismissed_detections ?? [];
  if (dismissed.length === 0) {
    blocks.push(body('No detections were dismissed as benign in this report.'));
  } else {
    blocks.push(...table(
      ['Rule', 'Engine', 'Occ.', 'Rationale', 'Conf.'],
      dismissed.map((d) => [d.rule_name || d.rule_id, d.engine, d.occurrences, d.rationale, d.confidence]),
      [0.22, 0.13, 0.08, 0.45, 0.12],
    ));
  }
  blocks.push(pagebreak());

  // --- Recommendations ---
  blocks.push(h(1, 'Recommendations'));
  const recs = report?.recommendations ?? {};
  const groups = [['immediate', 'Immediate'], ['short_term', 'Short term'], ['long_term', 'Long term'], ['further_collection', 'Further collection']];
  let anyRecs = false;
  for (const [key, label] of groups) {
    const items = recs[key];
    if (!items?.length) continue;
    anyRecs = true;
    blocks.push(h(2, label));
    blocks.push(...table(
      ['Action', 'Priority', 'Effort', 'Rationale'],
      items.map((r) => [r.action, r.priority, r.effort, r.rationale]),
      [0.32, 0.13, 0.13, 0.42],
    ));
  }
  if (!anyRecs) blocks.push(body('No recommendations were recorded for this report.'));

  return blocks;
}

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

function paginate(blocks) {
  const pages = [];
  let current = [];
  let cursor = 0;
  const push = () => { if (current.length) pages.push(current); current = []; cursor = 0; };
  for (const block of blocks) {
    if (block.type === 'pagebreak') { push(); continue; }
    if (cursor > 0 && cursor + block.height > CONTENT_H) push();
    current.push({ block, top: cursor });
    cursor += block.height;
  }
  push();
  if (pages.length === 0) pages.push([]);
  return pages;
}

// ---------------------------------------------------------------------------
// Content-stream rendering
// ---------------------------------------------------------------------------

function fmtNum(n) {
  return (Math.round(n * 100) / 100).toString();
}

function textOp(font, size, x, y, binaryString) {
  return `BT\n/${font} ${fmtNum(size)} Tf\n1 0 0 1 ${fmtNum(x)} ${fmtNum(y)} Tm\n(${escapePdfLiteral(binaryString)}) Tj\nET\n`;
}

function renderBlockOps(placed) {
  const { block, top } = placed;
  const ops = [];
  const baseY = () => CONTENT_TOP - top;

  if (block.type === 'heading' || block.type === 'body') {
    const font = block.type === 'heading' ? 'F2' : 'F1';
    if (block.color === 'warn') ops.push('0.72 0.15 0.1 rg\n');
    else ops.push('0.08 0.09 0.11 rg\n');
    block.lines.forEach((line, i) => {
      const y = baseY() - block.size - i * block.lh;
      ops.push(textOp(font, block.size, MARGIN, y, line));
    });
    ops.push('0.08 0.09 0.11 rg\n');
  } else if (block.type === 'rule') {
    ops.push(`0.7 0.71 0.73 RG\n0.75 w\n${fmtNum(MARGIN)} ${fmtNum(baseY() - 4)} m ${fmtNum(MARGIN + CONTENT_W)} ${fmtNum(baseY() - 4)} l S\n`);
  } else if (block.type === 'table-row') {
    if (block.bold) ops.push('0.93 0.94 0.95 rg\n', `${fmtNum(MARGIN)} ${fmtNum(baseY() - block.height + 4)} ${fmtNum(CONTENT_W)} ${fmtNum(block.height)} re\nf\n`, '0.08 0.09 0.11 rg\n');
    let x = MARGIN;
    block.cells.forEach((lines, col) => {
      const font = block.bold ? 'F2' : 'F1';
      lines.forEach((line, li) => {
        const y = baseY() - block.size - li * block.lh;
        ops.push(textOp(font, block.size, x + 2, y, line));
      });
      x += block.widths[col];
    });
  }
  return ops.join('');
}

function watermarkOps(watermarkBinary) {
  const size = 42;
  const positions = [
    { x: 40, y: 620 }, { x: 40, y: 380 }, { x: 40, y: 140 },
  ];
  const cos = Math.cos((35 * Math.PI) / 180);
  const sin = Math.sin((35 * Math.PI) / 180);
  let ops = 'q\n/GS1 gs\n0.55 0.1 0.1 rg\n';
  for (const p of positions) {
    ops += `BT\n/F2 ${size} Tf\n${fmtNum(cos)} ${fmtNum(sin)} ${fmtNum(-sin)} ${fmtNum(cos)} ${fmtNum(p.x)} ${fmtNum(p.y)} Tm\n(${escapePdfLiteral(watermarkBinary)}) Tj\nET\n`;
  }
  ops += 'Q\n';
  return ops;
}

function headerFooterOps(watermarkText, caseId, pageNum, pageCount) {
  const headerY = PAGE_H - MARGIN + 4;
  const footerY = MARGIN - 12;
  let ops = '0.45 0.47 0.5 rg\n';
  ops += textOp('F1', 8, MARGIN, headerY, enc(`Case ${caseId || 'unassigned'}  —  ${toBinaryTruncated(watermarkText, 40)}`));
  ops += textOp('F1', 8, MARGIN, footerY, enc(`IRTriage forensic report export`));
  const pageLabel = enc(`Page ${pageNum} of ${pageCount}`);
  const w = textWidthPt(pageLabel, 8);
  ops += textOp('F1', 8, PAGE_W - MARGIN - w, footerY, pageLabel);
  ops += '0.08 0.09 0.11 rg\n';
  return ops;
}

function toBinaryTruncated(s, max = 40) {
  return s.length > max ? `${s.slice(0, max - 1)}…` : s;
}

// ---------------------------------------------------------------------------
// Byte-level PDF assembly
// ---------------------------------------------------------------------------

function bytesToBinaryString(bytes) {
  let s = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    s += String.fromCharCode(...bytes.subarray(i, Math.min(i + chunk, bytes.length)));
  }
  return s;
}

function binaryStringToBytes(str) {
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) out[i] = str.charCodeAt(i);
  return out;
}

async function deflate(bytes) {
  const cs = new CompressionStream('deflate');
  const writer = cs.writable.getWriter();
  writer.write(bytes);
  writer.close();
  const chunks = [];
  const reader = cs.readable.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  let total = 0;
  for (const c of chunks) total += c.length;
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) { out.set(c, off); off += c.length; }
  return out;
}

class PdfWriter {
  constructor() {
    this.parts = [];
    this.length = 0;
    this.offsets = new Map(); // objId -> byte offset
  }

  write(binaryString) {
    this.parts.push(binaryString);
    this.length += binaryString.length;
  }

  beginObject(id) {
    this.offsets.set(id, this.length);
    this.write(`${id} 0 obj\n`);
  }

  endObject() {
    this.write('endobj\n');
  }

  toBytes() {
    return binaryStringToBytes(this.parts.join(''));
  }
}

/** Build the PDF byte stream for `report`. Returns { bytes, pageCount,
 * watermarkText } - `bytes` is a Uint8Array (callers wrap it in a Blob;
 * exposed unwrapped here mainly so pdf.test.mjs can parse it directly
 * without going through Blob.arrayBuffer() everywhere). */
export async function buildReportPdfBytes(report, opts = {}) {
  const watermarkText = resolveWatermarkText(report, opts);
  const watermarkBinary = enc(watermarkText);
  const caseId = report?.meta?.engagement?.case_id;

  const blocks = buildDocumentBlocks(report, opts);
  const pages = paginate(blocks);
  const pageCount = pages.length;

  // Build (uncompressed) content stream text per page, then compress.
  const rawStreams = pages.map((placedBlocks, i) => {
    let s = '';
    for (const p of placedBlocks) s += renderBlockOps(p);
    s += headerFooterOps(watermarkText, caseId, i + 1, pageCount);
    s += watermarkOps(watermarkBinary);
    return s;
  });
  const compressed = await Promise.all(rawStreams.map((s) => deflate(binaryStringToBytes(s))));

  // --- Object numbering plan ---
  // 1 Catalog, 2 Pages, 3 Font F1 (Helvetica), 4 Font F2 (Helvetica-Bold),
  // 5 ExtGState (watermark alpha), 6 Info, then for page k (0-indexed):
  // pageObjId = 7 + 2k, contentObjId = 8 + 2k.
  const pageIds = pages.map((_, k) => 7 + 2 * k);
  const contentIds = pages.map((_, k) => 8 + 2 * k);
  const maxId = 6 + pages.length * 2;

  const w = new PdfWriter();
  w.write('%PDF-1.7\n%âãÏÓ\n'); // binary marker comment, per spec recommendation

  w.beginObject(1);
  w.write('<< /Type /Catalog /Pages 2 0 R >>\n');
  w.endObject();

  w.beginObject(2);
  w.write(`<< /Type /Pages /Kids [ ${pageIds.map((id) => `${id} 0 R`).join(' ')} ] /Count ${pages.length} >>\n`);
  w.endObject();

  w.beginObject(3);
  w.write('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\n');
  w.endObject();

  w.beginObject(4);
  w.write('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\n');
  w.endObject();

  w.beginObject(5);
  w.write('<< /Type /ExtGState /ca 0.16 /CA 0.16 >>\n');
  w.endObject();

  w.beginObject(6);
  w.write(`<< /Producer (${escapePdfLiteral(enc('IRTriage web console (hand-rolled PDF 1.7 writer, no vendored library)'))}) /Title (${escapePdfLiteral(enc(`Forensic Analysis Report - ${caseId || ''}`))}) >>\n`);
  w.endObject();

  pages.forEach((_, k) => {
    const pageId = pageIds[k];
    const contentId = contentIds[k];
    w.beginObject(pageId);
    w.write(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /ExtGState << /GS1 5 0 R >> >> /Contents ${contentId} 0 R >>\n`);
    w.endObject();

    w.beginObject(contentId);
    const bytes = compressed[k];
    w.write(`<< /Length ${bytes.length} /Filter /FlateDecode >>\nstream\n`);
    w.write(bytesToBinaryString(bytes));
    w.write('\nendstream\n');
    w.endObject();
  });

  const xrefOffset = w.length;
  w.write(`xref\n0 ${maxId + 1}\n0000000000 65535 f \n`);
  for (let id = 1; id <= maxId; id++) {
    const off = w.offsets.get(id);
    w.write(`${String(off).padStart(10, '0')} 00000 n \n`);
  }
  w.write(`trailer\n<< /Size ${maxId + 1} /Root 1 0 R /Info 6 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  return { bytes: w.toBytes(), pageCount, watermarkText };
}

/** Generate the exported PDF as a Blob, ready for a download link. */
export async function generateReportPdf(report, opts = {}) {
  const { bytes } = await buildReportPdfBytes(report, opts);
  return new Blob([bytes], { type: 'application/pdf' });
}
