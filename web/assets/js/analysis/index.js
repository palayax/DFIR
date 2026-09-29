// web/assets/js/analysis/index.js
//
// Public surface of the C5 analysis pipeline. Other agents (C6 dashboard, C7
// PDF export, the app shell) should import from here rather than reaching
// into individual files in this directory.

export {
  computeDashboard,
  computeMitreCoverage,
  chooseBucketSize,
  BUCKET_SPAN_THRESHOLDS_MS,
  DEFAULT_TOP_N,
  FINDING_SEVERITY_ORDER,
} from './dashboard.js';

export {
  buildEvidencePacks,
  previewPlan,
  rankRows,
  renderRow,
  DEFAULT_TOKEN_BUDGET,
  DEFAULT_MAX_PACKS,
  DEFAULT_CONTEXT_WINDOW_SECONDS,
  DEFAULT_STRATA_COUNT,
  DEFAULT_PRIORITY_SOURCES,
  CALL_OVERHEAD_TOKENS,
} from './reduce.js';

export {
  PROMPT_VERSION,
  buildSystemPrompt,
  buildMapPrompt,
  buildReducePrompt,
  buildRepairPrompt,
} from './prompts.js';

export {
  validateReport,
  loadReportSchema,
  formatReportErrors,
} from './validate-report.js';

export {
  analyze,
  PipelineError,
  DEFAULT_CONCURRENCY,
  DEFAULT_MAX_REPAIR_ATTEMPTS,
  DEFAULT_CALL_MAX_ATTEMPTS,
  DEFAULT_MAX_OUTPUT_TOKENS,
} from './pipeline.js';

export { analyze as default } from './pipeline.js';
