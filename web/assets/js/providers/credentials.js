// web/assets/js/providers/credentials.js
//
// Per-engagement credential store (RUN_PLAN.md A10 / CLAUDE.md "Secrets").
//
//   - In-memory by default. Nothing touches disk unless the analyst opts in.
//   - Opt-in persistence to localStorage, AES-GCM encrypted with a key
//     derived from a user passphrase via PBKDF2-SHA256 (>=210000 iterations,
//     random 16-byte salt, random 12-byte IV — all via WebCrypto).
//   - Credential objects returned by get() throw if anyone tries to
//     JSON.stringify() them directly (secret-logging guard). Callers must
//     read individual fields (creds.apiKey, ...) as every adapter in this
//     directory does — never stringify the whole credentials object.
//
// Deviation from the literal spec list: exportEncrypted()/importEncrypted()
// necessarily take a passphrase argument (encryption without one is
// meaningless); persist() is an additional method beyond the six named in
// the brief, since something has to be the "opt in to persistence" trigger.

const PBKDF2_ITERATIONS = 210000;
const SALT_BYTES = 16;
const IV_BYTES = 12;
const DEFAULT_STORAGE_KEY = 'ir-triage:credentials:v1';

/** A credential bag that refuses to be JSON-serialized directly. */
export class SecretCredentials {
  constructor(providerId, data) {
    Object.defineProperty(this, '__providerId', { value: providerId, enumerable: false });
    Object.assign(this, data);
    Object.defineProperty(this, 'toJSON', {
      value: () => {
        throw new Error(
          `Refusing to JSON.stringify credentials for provider "${providerId}". ` +
            'Read individual fields instead (creds.apiKey, ...) — never stringify the whole object.',
        );
      },
      enumerable: false,
    });
  }
}

function randomBytes(n) {
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  return arr;
}

function toBase64(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function fromBase64(str) {
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

async function deriveKey(passphrase, salt) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptSnapshot(snapshotObj, passphrase) {
  const salt = randomBytes(SALT_BYTES);
  const iv = randomBytes(IV_BYTES);
  const key = await deriveKey(passphrase, salt);
  const plaintext = new TextEncoder().encode(JSON.stringify(snapshotObj));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  return {
    v: 1,
    kdf: 'PBKDF2-SHA256',
    iterations: PBKDF2_ITERATIONS,
    salt: toBase64(salt),
    iv: toBase64(iv),
    ciphertext: toBase64(new Uint8Array(ciphertext)),
  };
}

async function decryptPayload(payload, passphrase) {
  const salt = fromBase64(payload.salt);
  const iv = fromBase64(payload.iv);
  const key = await deriveKey(passphrase, salt);
  let plaintextBuf;
  try {
    plaintextBuf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, fromBase64(payload.ciphertext));
  } catch {
    throw new Error('Incorrect passphrase or corrupted credential store');
  }
  return JSON.parse(new TextDecoder().decode(plaintextBuf));
}

/**
 * @param {{storage?: {getItem, setItem, removeItem}, storageKey?: string}} [options]
 */
export function createCredentialStore(options = {}) {
  const storage = options.storage ?? (typeof localStorage !== 'undefined' ? localStorage : null);
  const storageKey = options.storageKey || DEFAULT_STORAGE_KEY;
  const store = new Map();

  function plainSnapshot() {
    const obj = {};
    for (const [providerId, creds] of store.entries()) {
      const plain = {};
      for (const k of Object.keys(creds)) plain[k] = creds[k];
      obj[providerId] = plain;
    }
    return obj;
  }

  function loadFromSnapshot(data) {
    store.clear();
    for (const [providerId, creds] of Object.entries(data)) {
      store.set(providerId, new SecretCredentials(providerId, creds));
    }
  }

  return {
    /** Set credentials for a provider (in-memory only, until persist() is called). */
    set(providerId, creds) {
      if (!providerId) throw new Error('providerId is required');
      store.set(providerId, new SecretCredentials(providerId, { ...creds }));
    },

    /** @returns {SecretCredentials|null} */
    get(providerId) {
      return store.get(providerId) || null;
    },

    has(providerId) {
      return store.has(providerId);
    },

    listProviderIds() {
      return Array.from(store.keys());
    },

    /** Wipe in-memory secrets. The encrypted blob on disk (if any) is untouched. */
    lock() {
      store.clear();
    },

    /** Decrypt the persisted blob (if any) from storage into memory. Throws on wrong passphrase. */
    async unlock(passphrase) {
      if (!storage) throw new Error('No storage backend available');
      const raw = storage.getItem(storageKey);
      if (!raw) throw new Error('No persisted credentials found');
      const payload = JSON.parse(raw);
      const data = await decryptPayload(payload, passphrase);
      loadFromSnapshot(data);
      return true;
    },

    /** Opt-in: encrypt the current in-memory store and write it to storage. */
    async persist(passphrase) {
      if (!storage) throw new Error('No storage backend available');
      if (!passphrase) throw new Error('passphrase is required to persist credentials');
      const payload = await encryptSnapshot(plainSnapshot(), passphrase);
      storage.setItem(storageKey, JSON.stringify(payload));
      return true;
    },

    /** Clear both in-memory credentials and any persisted blob. */
    clear() {
      store.clear();
      if (storage) storage.removeItem(storageKey);
    },

    isPersisted() {
      return !!(storage && storage.getItem(storageKey));
    },

    /** Export the current in-memory store as a portable encrypted payload (does not touch storage). */
    async exportEncrypted(passphrase) {
      if (!passphrase) throw new Error('passphrase is required to export credentials');
      return encryptSnapshot(plainSnapshot(), passphrase);
    },

    /** Import a portable encrypted payload (from exportEncrypted) into memory. Throws on wrong passphrase. */
    async importEncrypted(payload, passphrase) {
      const data = await decryptPayload(payload, passphrase);
      loadFromSnapshot(data);
      return true;
    },
  };
}

export const credentialStore = createCredentialStore();

export default credentialStore;
