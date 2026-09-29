// web/assets/js/providers/storage/index.js
//
// Storage provider registry. Same pattern as ../index.js for LLM providers:
// pipeline/export code should only ever depend on the shared StorageProvider
// interface (types.js), never import a specific adapter directly.

import localProvider from './local.js';
import s3Provider from './s3.js';
import azureBlobProvider from './azure-blob.js';
import gcsProvider from './gcs.js';

export const storageProviders = [localProvider, s3Provider, azureBlobProvider, gcsProvider];

export const storageProviderRegistry = new Map(storageProviders.map((p) => [p.id, p]));

/** @returns {import('../types.js').StorageProvider|null} */
export function getStorageProvider(id) {
  return storageProviderRegistry.get(id) || null;
}

// No credentials required, works everywhere -> safest default.
export const defaultStorageProviderId = 'local';

export { localProvider, s3Provider, azureBlobProvider, gcsProvider };

export default storageProviders;
