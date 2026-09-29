// Minimal JSON-Schema validator for docs/timeline_schema.json.
//
// This is deliberately NOT a general-purpose JSON Schema engine: it supports
// exactly the subset of draft-2020-12 keywords the timeline schema actually
// uses (type, const, enum, pattern, minimum, items, properties, required,
// additionalProperties). That keeps it small enough to ship with zero
// vendored dependencies while still giving useful, path-qualified error
// messages for malformed records.
//
// The schema itself is vendored at web/assets/schema/timeline_schema.json so
// the app works fully offline/air-gapped; web/tests/schema.test.mjs asserts
// that copy stays byte-identical to docs/timeline_schema.json (the contract's
// source of truth) so the two can never silently drift.

const SCHEMA_URL = new URL('../../schema/timeline_schema.json', import.meta.url);

let cachedSchema = null;

export async function loadSchema() {
  if (cachedSchema) return cachedSchema;
  const isNode = typeof process !== 'undefined' && !!process.versions?.node;
  let text;
  if (isNode) {
    const { readFile } = await import('node:fs/promises');
    text = await readFile(SCHEMA_URL, 'utf8');
  } else {
    const res = await fetch(SCHEMA_URL);
    text = await res.text();
  }
  cachedSchema = JSON.parse(text);
  return cachedSchema;
}

function describe(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function typeMatches(type, value) {
  switch (type) {
    case 'object': return value !== null && typeof value === 'object' && !Array.isArray(value);
    case 'array': return Array.isArray(value);
    case 'string': return typeof value === 'string';
    case 'integer': return typeof value === 'number' && Number.isInteger(value);
    case 'number': return typeof value === 'number' && Number.isFinite(value);
    case 'boolean': return typeof value === 'boolean';
    default: return true;
  }
}

/** Validate `value` against a (sub)schema node, returning an array of
 * { path, message } errors. Empty array means valid. */
export function validateAgainst(schema, value, path = '$') {
  const errors = [];

  if (schema.const !== undefined && value !== schema.const) {
    errors.push({ path, message: `expected constant ${JSON.stringify(schema.const)}, got ${JSON.stringify(value)}` });
  }
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push({ path, message: `value ${JSON.stringify(value)} is not one of [${schema.enum.join(', ')}]` });
  }

  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((t) => typeMatches(t, value))) {
      errors.push({ path, message: `expected type ${types.join(' | ')}, got ${describe(value)} (${JSON.stringify(value)})` });
      return errors; // further structural checks would be meaningless
    }
  }

  if (typeof value === 'string' && schema.pattern) {
    if (!new RegExp(schema.pattern).test(value)) {
      errors.push({ path, message: `value "${value}" does not match pattern ${schema.pattern}` });
    }
  }

  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) {
      errors.push({ path, message: `value ${value} is below minimum ${schema.minimum}` });
    }
  }

  if (Array.isArray(value) && schema.items) {
    value.forEach((item, i) => {
      errors.push(...validateAgainst(schema.items, item, `${path}[${i}]`));
    });
  }

  if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
    for (const req of schema.required || []) {
      if (!(req in value)) {
        errors.push({ path, message: `missing required property "${req}"` });
      }
    }
    const props = schema.properties || {};
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!(key in props)) {
          errors.push({ path: `${path}.${key}`, message: `additional property "${key}" is not allowed here` });
        }
      }
    }
    for (const [key, subschema] of Object.entries(props)) {
      if (key in value) {
        errors.push(...validateAgainst(subschema, value[key], `${path}.${key}`));
      }
    }
  }

  return errors;
}

/** Validate a full timeline record against the vendored schema. */
export async function validateRecord(record) {
  const schema = await loadSchema();
  const errors = validateAgainst(schema, record, '$');
  return { valid: errors.length === 0, errors };
}

/** Human-readable formatting for a validation error list. */
export function formatErrors(errors) {
  return errors.map((e) => `${e.path}: ${e.message}`).join('\n');
}
