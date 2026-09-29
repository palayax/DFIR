// Ingest module for an IRTriage/Velociraptor acquisition ZIP.
//
// Fast path: if the zip already contains the client-produced timeline.jsonl
// or timeline.csv, delegate straight to those ingest modules (this is the
// common case for a ZIP produced by IRTriage.exe itself).
//
// Fallback path: no prebuilt timeline (e.g. a raw `velociraptor artifacts
// collect ... --output=x.zip` someone ran by hand) — locate results/*.json
// and map each known artifact's rows onto timeline records via the
// declarative table in artifact-mappings.js, falling back to a heuristic
// mapper for anything not in that table so nothing is silently skipped.
//
// Unzipping runs through lib/unzip.js (DecompressionStream('deflate-raw'),
// no vendored zip library) and is meant to be driven from
// workers/ingest.worker.js so a large ZIP never blocks the UI thread.

import { openZip } from '../lib/unzip.js';
import { computeRowHash } from '../lib/hash.js';
import { normalizeTimestamp, UNKNOWN_TS } from '../lib/timestamp.js';
import { mapArtifactRow, unmappedFallback } from './artifact-mappings.js';
import * as jsonlIngest from './irtriage-jsonl.js';
import * as csvIngest from './irtriage-csv.js';

function findEntry(entries, re) {
  return entries.find((e) => !e.isDirectory && re.test(e.name));
}

async function entryToFile(zip, entry) {
  const bytes = await zip.getEntryBytes(entry);
  return new File([bytes], entry.name.split('/').pop());
}

function decodeArtifactNameFromResultPath(path) {
  const base = path.replace(/^.*?results\//i, '').replace(/\.json$/i, '');
  let decoded;
  try {
    decoded = decodeURIComponent(base);
  } catch {
    decoded = base;
  }
  const idx = decoded.indexOf('/');
  return idx === -1 ? decoded : decoded.slice(0, idx);
}

function parseVelociraptorResultJson(text) {
  const trimmed = text.trim();
  if (!trimmed) return [];
  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return trimmed.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => JSON.parse(l));
  }
}

async function resolveHost(zip, opts) {
  if (opts.hostOverride) return { host: opts.hostOverride, hostId: opts.hostId };
  const ciEntry = findEntry(zip.entries, /(^|\/)client_info\.json$/i);
  if (ciEntry) {
    try {
      const obj = JSON.parse(await zip.getEntryText(ciEntry));
      const first = Array.isArray(obj) ? obj[0] : obj;
      const host = first?.Hostname || first?.hostname;
      if (host) return { host, hostId: opts.hostId || first?.ClientId || first?.client_id };
    } catch {
      // fall through to filename-derived host
    }
  }
  return { host: undefined, hostId: opts.hostId };
}

export async function detect(file) {
  const name = (file.name || '').toLowerCase();
  if (!name.endsWith('.zip')) return false;
  try {
    const zip = await openZip(file);
    return zip.entries.some((e) =>
      /^(.*\/)?results\/.*\.json$/i.test(e.name) ||
      /(^|\/)timeline\.(jsonl|csv)$/i.test(e.name) ||
      /(^|\/)manifest\.json$/i.test(e.name)
    );
  } catch {
    return false;
  }
}

/**
 * @param {File} file
 * @param {{ hostOverride?: string, hostId?: string, forceRebuildFromArtifacts?: boolean, onWarning?: (m:string)=>void, onProgress?: (p:{done:number,total:number})=>void }} [opts]
 */
export async function* parse(file, opts = {}) {
  const zip = await openZip(file);

  const timelineJsonl = findEntry(zip.entries, /(^|\/)timeline\.jsonl$/i);
  const timelineCsv = findEntry(zip.entries, /(^|\/)timeline\.csv$/i);

  if (timelineJsonl && !opts.forceRebuildFromArtifacts) {
    const asFile = await entryToFile(zip, timelineJsonl);
    yield* jsonlIngest.parse(asFile, opts);
    return;
  }
  if (timelineCsv && !opts.forceRebuildFromArtifacts) {
    const asFile = await entryToFile(zip, timelineCsv);
    yield* csvIngest.parse(asFile, opts);
    return;
  }

  const { host, hostId } = await resolveHost(zip, opts);
  const effectiveHost = host || file.name.replace(/\.zip$/i, '');

  const resultEntries = zip.entries.filter((e) => !e.isDirectory && /^(.*\/)?results\/.*\.json$/i.test(e.name));
  let done = 0;
  for (const entry of resultEntries) {
    const artifactName = decodeArtifactNameFromResultPath(entry.name);
    const text = await zip.getEntryText(entry);
    let rows;
    try {
      rows = parseVelociraptorResultJson(text);
    } catch (err) {
      opts.onWarning?.(`velociraptor-zip: could not parse "${entry.name}" as JSON: ${err.message}`);
      done++;
      continue;
    }

    let rowIndex = 0;
    for (const row of rows) {
      const ctx = { host: effectiveHost, hostId, rawFile: entry.name, rawRow: rowIndex++ };
      const skeletons = mapArtifactRow(artifactName, row, ctx) || unmappedFallback(artifactName, row, ctx);
      for (const rec of skeletons) {
        const rawTs = rec.__rawTimestampValue;
        delete rec.__rawTimestampValue;
        rec.timestamp_utc = normalizeTimestamp(rawTs) || UNKNOWN_TS;
        rec.row_hash = await computeRowHash(rec);
        yield rec;
      }
    }
    done++;
    opts.onProgress?.({ done, total: resultEntries.length });
  }
}
