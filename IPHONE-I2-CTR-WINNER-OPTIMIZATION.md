# IPHONE I2 — CTR Winner Optimization

Date: 2026-09-09 (Asia/Bangkok)
Base: `5e04b0b174ab704409244f0ee8e81c5c198451b6` (I1)
Latest finalized GSC date: `2026-09-06`

## Verdict

`SOURCE_PASS / CTR_TARGETED_ONLY / READY_FOR_MAIN`

## Evidence

I0 identified blog pages already ranking on page one but under-clicking their visibility:

- `iphone-14-thai-vs-import`: 64 impressions / position 7.59 / 0 clicks
- `iphone-15-pro-max-thai-vs-import`: 57 impressions / position 5.86 / 1 click
- `iphone-16-battery-health`: 45 impressions / position 7.58 / 0 clicks
- `iphone-16-pro-max-battery-health`: 42 impressions / position 6.02 / 0 clicks

These are CTR opportunities, not ranking-recovery pages.

## Change

`src/pages/blog/[slug].astro` now applies exact-slug SEO title/description overrides only to the four GSC-proven CTR winners.

The visible article H1, article body, URL, canonical, breadcrumbs and content-entry ownership remain unchanged. The override is used for the HTML title/meta description and the BlogPosting description so the snippet message is consistent.

## Guardrails

- No mass title rewrite.
- No model-page edits.
- No local-page edits.
- No canonical or redirect changes.
- No URL changes.
- No H1 changes.
- No claim of guaranteed price or ranking.
- No change to I0 baseline.

## Expected effect

Improve search-result relevance and click appeal for pages already around positions 6–8 without destabilizing their existing content ownership.

## Validation note

Repository does not expose a GitHub Actions branch build for this change. Full production verification is deferred to I5; this report does not claim a deployment pass.
