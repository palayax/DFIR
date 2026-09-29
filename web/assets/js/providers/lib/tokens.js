// web/assets/js/providers/lib/tokens.js
//
// estimateTokens(text) is a heuristic, NOT a real tokenizer. It exists so the
// app can show a token/cost estimate before spending real money, per
// RUN_PLAN.md assumption A9. It is deliberately dependency-free (no vendored
// tiktoken/BPE tables) — this is a static, backend-less, air-gap-friendly app.
//
// Heuristic, in order of precedence:
//   - CJK characters (Han/Hiragana/Katakana/Hangul) tokenize densely in every
//     major BPE vocabulary — budgeted at ~1 token/char.
//   - Punctuation tends to split into its own token more often than prose —
//     budgeted at ~1 token per 1.5 chars.
//   - Whitespace is nearly free (it usually folds into the following token) —
//     budgeted at ~1 token per 8 chars.
//   - Everything else (plain prose) uses the common ~4 chars/token rule of
//     thumb for English text.
//
// This will not match any provider's real token count exactly; it is only
// meant to be in the right ballpark for a pre-flight cost estimate.

const CJK_PATTERN = /[぀-ヿ㐀-䶿一-鿿豈-﫿가-힣]/gu;
const PUNCT_PATTERN = /[.,!?;:'"()[\]{}\-_/\\<>@#$%^&*+=|~`]/g;
const WHITESPACE_PATTERN = /\s/g;

/**
 * @param {string} text
 * @returns {number} estimated token count (>= 0; >= 1 for any non-empty input)
 */
export function estimateTokens(text) {
  if (text === null || text === undefined) return 0;
  const str = typeof text === 'string' ? text : String(text);
  if (str.length === 0) return 0;

  const cjkMatches = str.match(CJK_PATTERN) || [];
  const cjkCount = cjkMatches.length;
  const nonCjk = str.replace(CJK_PATTERN, '');

  const whitespaceCount = (nonCjk.match(WHITESPACE_PATTERN) || []).length;
  const withoutWhitespace = nonCjk.replace(WHITESPACE_PATTERN, '');
  const punctCount = (withoutWhitespace.match(PUNCT_PATTERN) || []).length;
  const plainCount = withoutWhitespace.length - punctCount;

  const total = plainCount / 4 + punctCount / 1.5 + whitespaceCount / 8 + cjkCount / 1;

  return Math.max(1, Math.ceil(total));
}

/**
 * @param {{inputCostPerMTok?: number, outputCostPerMTok?: number}} [model]
 * @param {number} inputTokens
 * @param {number} outputTokens
 * @returns {{inputCost: number, outputCost: number, totalCost: number}}
 */
export function estimateCost(model, inputTokens = 0, outputTokens = 0) {
  const inRate = typeof model?.inputCostPerMTok === 'number' ? model.inputCostPerMTok : 0;
  const outRate = typeof model?.outputCostPerMTok === 'number' ? model.outputCostPerMTok : 0;
  const inputCost = (Math.max(0, inputTokens) / 1_000_000) * inRate;
  const outputCost = (Math.max(0, outputTokens) / 1_000_000) * outRate;
  return { inputCost, outputCost, totalCost: inputCost + outputCost };
}
