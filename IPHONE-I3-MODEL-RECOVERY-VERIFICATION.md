# IPHONE I3 — Model Recovery Verification

Date: 2026-09-09 (Asia/Bangkok)
Base: `839230e337a8254046b778ede7f9b4bcc7082845` (I2)
Latest finalized GSC date: `2026-09-06`

## Verdict

`VERIFY_PASS / MODEL_OWNER_CORRECT / LOW_VISIBILITY / NO_REWRITE`

## GSC query ownership

Visible model-intent queries are already owned by the expected model landing pages:

- `รับซื้อ iphone 11` → `/รับซื้อไอโฟน/iphone-11/` — 4 impressions / position 34.75
- `รับซื้อ iphone 12` → `/รับซื้อไอโฟน/iphone-12/` — 6 impressions / position 41.67
- `รับซื้อ iphone 13` → `/รับซื้อไอโฟน/iphone-13/` — 4 impressions / position 31.00
- `รับซื้อ iphone 14` → `/รับซื้อไอโฟน/iphone-14/` — 8 impressions / position 42.00
- `รับซื้อ iphone 15` → `/รับซื้อไอโฟน/iphone-15/` — 5 impressions / position 31.20
- `รับซื้อ iphone 16` → `/รับซื้อไอโฟน/iphone-16/` — 8 impressions / position 46.25

The only adjacent visible model query is `รับซื้อ iphone 11 pro max`, correctly owned by `/รับซื้อไอโฟน/pro-max/`.

## Interpretation

The model family is not suffering from confirmed destructive cannibalization. Google is selecting the intended commercial model URLs, but those URLs currently have weak visibility and very low exposed query volume.

This is different from an ownership failure. Rewriting titles/H1/content for six model hubs now would add risk without enough evidence that content mismatch is the cause.

## Decision

- iPhone 11: `HOLD_LOW_VISIBILITY`
- iPhone 12: `HOLD_LOW_VISIBILITY`
- iPhone 13: `HOLD_LOW_VISIBILITY`
- iPhone 14: `HOLD_LOW_VISIBILITY`
- iPhone 15: `HOLD_LOW_VISIBILITY`
- iPhone 16: `HOLD_LOW_VISIBILITY`
- Pro / Pro Max family: `OWNER_CORRECT / HOLD`

## Guardrails

- No model-page rewrite in I3.
- No redirects or canonical consolidation.
- Do not move model intent to blog pages.
- Do not merge model URLs into the main iPhone hub.
- Re-evaluate only when GSC exposes more demand or a model page reaches a practical push zone around positions 11–25 with meaningful impressions.

## Next action

Proceed to I4 schema / legacy hygiene while preserving model ownership. I5 production verification should freeze the final I1–I4 source and keep the original I0 GSC baseline for observation.
