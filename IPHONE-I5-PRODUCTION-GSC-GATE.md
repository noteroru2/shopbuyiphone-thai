# IPHONE I5 — Production Verification + GSC Observation Gate

Date: 2026-09-09 (Asia/Bangkok)
Base behavior source: `3ccbb0b886394098cd1e13c1c888cf2abaffa0e7` (I4)

## Verdict before live verification

`SOURCE_PASS / GATE_INSTALLED / BASELINE_FROZEN / OBSERVATION_INACTIVE / WAIT_FOR_PRODUCTION_PASS`

## Frozen GSC baseline

Latest finalized date: `2026-09-06`

Current 28d (2026-08-10 → 2026-09-06):
- clicks: 72
- impressions: 1,808
- CTR: 3.98%
- average position: 10.77

Previous 28d (2026-07-13 → 2026-08-09):
- clicks: 32
- impressions: 1,297
- CTR: 2.47%
- average position: 11.45

I5 keeps the I0 baseline immutable. I1-I4 do not reset it.

## Production gate

`npm run verify:i5-production`

The verifier requires:

1. `/iphone-i5-recovery-gate.json` is live and matches behavior source `3ccbb0b886394098cd1e13c1c888cf2abaffa0e7`.
2. Ubon Ratchathani owner contains `data-iphone-i1="PAGE_ONE_PUSH"`.
3. I2 CTR title text is live on `/blog/iphone-14-thai-vs-import/`.
4. `FAQPage` JSON-LD is absent on representative Blog and Local pages.
5. canonical markup remains present on the Local owner.
6. robots allows crawling and references `sitemap-index.xml`.
7. `sitemap-index.xml` returns successfully.

A merge to `main` alone is not a production PASS.

## Observation gate

`npm run audit:i5-observation -- --latest-finalized-date=YYYY-MM-DD`

Initial production state deliberately has:

- `productionPassDate: null`
- `observationClockActive: false`

After a confirmed production PASS, the production state should be activated using the actual Thailand production-pass date. The first 7-day review is reached when the latest finalized GSC date is at least 7 calendar days after the production-pass date; the primary 14-day review is reached at 14 days.

## Freeze policy after production PASS

Until the 7-day review, avoid non-critical changes to:

- I1 Local/Condition target ownership and support blocks
- I2 CTR winner snippet overrides
- iPhone 11–16 model ownership
- I4 structured-data output

Production-critical defects are exempt.

## Decision framework

At the 7-day review compare sitewide movement plus I1/I2 target URLs against the frozen I0 baseline and classify:

- `READY_FOR_7D_REVIEW`: enough finalized post-pass data exists.
- `HOLD`: data exists but movement is mixed/insufficient for another source change.
- `NO_GO`: production/indexability/runtime defect or broad material regression is confirmed.

Do not count pre-production finalized days as post-deploy observation.
