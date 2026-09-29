// Small streaming helpers shared by the unzip reader and the ingest parsers.
// Everything here is written to work incrementally so large files never have
// to be buffered whole in memory.

/** Iterate any ReadableStream as an async iterable, even if the runtime's
 * ReadableStream doesn't implement Symbol.asyncIterator natively. */
export async function* streamToAsyncIterable(stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

/** Stream a File/Blob as UTF-8 text lines, without buffering the whole file.
 * Handles both LF and CRLF line endings; the trailing partial line (if the
 * file doesn't end in a newline) is still yielded. */
export async function* readLines(file) {
  const stream = file.stream().pipeThrough(new TextDecoderStream('utf-8'));
  let buffer = '';
  for await (const chunk of streamToAsyncIterable(stream)) {
    buffer += chunk;
    let idx;
    while ((idx = buffer.indexOf('\n')) !== -1) {
      let line = buffer.slice(0, idx);
      if (line.endsWith('\r')) line = line.slice(0, -1);
      yield line;
      buffer = buffer.slice(idx + 1);
    }
  }
  if (buffer.length > 0) {
    yield buffer.endsWith('\r') ? buffer.slice(0, -1) : buffer;
  }
}

/** Read up to `maxBytes` of a File/Blob as text, for sniffing/peeking. */
export async function peekText(file, maxBytes = 65536) {
  const slice = file.slice(0, Math.min(maxBytes, file.size));
  const buf = new Uint8Array(await slice.arrayBuffer());
  return new TextDecoder('utf-8').decode(buf);
}
