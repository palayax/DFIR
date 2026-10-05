// Tiny observable store. No framework, no build step.
//
// Usage:
//   const store = createStore({ files: [], superTimeline: null });
//   const unsubscribe = store.subscribe((state, prevState) => { ... });
//   store.set((state) => ({ ...state, files: [...state.files, newFile] }));
//
// Design:
// - `set` takes either a partial-state object or an updater function
//   `(state) => partialOrFullState`. The result is shallow-merged onto the
//   current state, producing a NEW state object every time (immutable
//   update) so consumers can cheaply reference-compare old vs. new.
// - `subscribe` returns an unsubscribe function. Listeners are called
//   synchronously, in registration order, after every `set` that actually
//   changes something (Object.is on the whole state is skipped - state is
//   always a new object on `set`, so listeners run on every set() call;
//   callers that need to skip no-op updates should compare specific slices
//   themselves via `select`).
// - `select(fn)` returns the result of `fn(state)` for one-off reads without
//   subscribing.
// - Errors thrown by a listener are caught and reported via
//   `onListenerError` (defaults to console.error) so one broken subscriber
//   can never break another, and never breaks the store itself.

export function createStore(initialState = {}, { onListenerError } = {}) {
  let state = { ...initialState };
  const listeners = new Set();
  const reportError = onListenerError || ((err) => console.error('[store] listener error', err));

  function getState() {
    return state;
  }

  function select(fn) {
    return fn(state);
  }

  function set(updater) {
    const prevState = state;
    const patch = typeof updater === 'function' ? updater(prevState) : updater;
    if (patch == null) return prevState;
    state = { ...prevState, ...patch };
    for (const listener of listeners) {
      try {
        listener(state, prevState);
      } catch (err) {
        reportError(err);
      }
    }
    return state;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  /** Subscribe but only fire when `selectFn(state)` changes by reference. */
  function subscribeSelector(selectFn, listener) {
    let prev = selectFn(state);
    return subscribe((next) => {
      const cur = selectFn(next);
      if (!Object.is(cur, prev)) {
        const old = prev;
        prev = cur;
        listener(cur, old);
      }
    });
  }

  return { getState, select, set, subscribe, subscribeSelector };
}

// Single app-wide store instance. Shape is intentionally loose (this is a
// small app); views/components read what they need and write back through
// `set`.
export const appStore = createStore({
  engagementId: '',
  engagementLabel: '',
  theme: 'auto', // 'auto' | 'light' | 'dark'
  files: [], // [{ id, name, size, kind, status: 'pending'|'parsing'|'parsed'|'error', error?, recordCount?, records? }]
  superTimeline: null, // { records, stats } once merge.js has run
  report: null, // LLM-generated report, once produced
  businessContext: null, // BusinessContext (layer 1 business data + layer 2 risk register), e.g. the ACME.Corp demo
  whatIf: [], // cyber-risk ids marked remediated in the What-if panel (layer 3)
  settings: {
    llmProviderId: null,
    llmModelId: null,
    storageProviderId: null,
  },
});
