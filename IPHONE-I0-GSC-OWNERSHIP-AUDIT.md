# IPHONE I0 — GSC Winner + Query×Page Ownership Audit

Date: 2026-09-09 (Asia/Bangkok)
Site: ร้านรับซื้อไอโฟน.com
Repo base: `fe1a3bef54dbfed84afbe115ae5322b94ea0b4f6`
Latest finalized GSC date: `2026-09-06`

## Verdict

`AUDIT_PASS / BASELINE_FROZEN / PRODUCTION_UNCHANGED`

I0 is audit-only. No customer-facing page, title, H1, canonical, redirect, schema, robots or sitemap behavior is changed.

## Sitewide momentum

Current 28d (2026-08-10 → 2026-09-06):
- 72 clicks
- 1,808 impressions
- CTR 3.98%
- average position 10.77

Previous 28d (2026-07-13 → 2026-08-09):
- 32 clicks
- 1,297 impressions
- CTR 2.47%
- average position 11.45

Movement:
- clicks: +125%
- impressions: +39.4%
- CTR: +1.51 percentage points
- average position: improved by about 0.69 positions

The site is gaining visibility and clicks. This is not a rebuild situation.

## Ownership finding

### 1. Local family = `DISTRIBUTED_LOCAL_OWNERSHIP`

Google is already selecting many province/district pages directly. Examples in the current 28d window:

- Udon Thani: 4 clicks / 34 impressions / pos 7.44
- Ubon Ratchathani: 4 / 31 / pos 11.81
- Nonthaburi: 3 / 27 / pos 10.15
- Surin–Sangkha: 3 / 16 / pos 9.75
- Sakon Nakhon–Phang Khon: 2 / 21 / pos 6.57
- Kalasin–Khao Wong: 1 / 28 / pos 8.25
- Pathum Thani: 1 / 26 / pos 9.19
- Khon Kaen: 1 / 22 / pos 14.45

There is no evidence to consolidate these local URLs into the homepage or a single generic “near me” page.

### 2. Condition / informational family = `PROVEN_LONGTAIL_OWNERSHIP`

Strong or near-page-one pages include:

- `/รับซื้อไอโฟน/face-id-เสีย/`: 4 clicks / 49 impressions / pos 9.73
- `/รับซื้อไอโฟน/เครื่องนอก/`: 2 / 26 / pos 8.08
- `/blog/iphone-15-cracked-screen/`: 3 / 47 / pos 7.23
- `/blog/ไอโฟนจอแตกขายได้ไหม/`: 2 / 31 / pos 11.97
- `/blog/iphone-15-plus-thai-vs-import/`: 2 / 49 / pos 5.88
- `/blog/iphone-15-pro-max-thai-vs-import/`: 1 / 57 / pos 5.86
- `/blog/iphone-14-thai-vs-import/`: 0 / 64 / pos 7.59
- `/blog/iphone-16-battery-health/`: 0 / 45 / pos 7.58
- `/blog/iphone-16-pro-max-battery-health/`: 0 / 42 / pos 6.02

This family contains the fastest CTR and Top-3/5 opportunities.

### 3. Model hubs = `HOLD_LOW_VISIBILITY`

Current model landing pages remain materially farther from page one:

- iPhone 11: pos 25.29
- iPhone 12: pos 32.89
- iPhone 13: pos 27.06
- iPhone 14: pos 39.40
- iPhone 15: pos 32.78
- iPhone 16: pos 41.42

These should not be the primary I1 scope while local/condition URLs are already at positions 5–14.

### 4. Homepage = `HOLD_GENERIC_OWNER_WEAK`

Homepage current: 1 click / 44 impressions / pos 43.82.
Previous: 0 clicks / 32 impressions / pos 64.78.

It is improving but is not currently the proven ranking owner for the site’s commercial long-tail traffic. Do not force local or condition intent into the homepage.

## Classifications

### PROTECT

- Surin–Sangkha local page
- iPhone 15 Plus Thai vs import article
- high-performing district pages already around positions 4–8

### PROTECT + PUSH

- Udon Thani
- Sakon Nakhon–Phang Khon
- เครื่องนอก
- iPhone 15 cracked screen

### PAGE-ONE PUSH

- Ubon Ratchathani — pos 11.81
- Nonthaburi — pos 10.15
- Khon Kaen — pos 14.45
- ไอโฟนจอแตกขายได้ไหม — pos 11.97
- iPhone 13 check-price-before-selling — pos 12.76, low-volume candidate

### CTR PUSH

Highest-value examples where ranking is already good but clicks lag:

- iPhone 14 Thai vs import — 64 impressions / pos 7.59 / 0 clicks
- iPhone 15 Pro Max Thai vs import — 57 / pos 5.86 / 1 click
- iPhone 16 battery health — 45 / pos 7.58 / 0 clicks
- iPhone 16 Pro Max battery health — 42 / pos 6.02 / 0 clicks
- Sisaket–Mueang Sisaket — 23 / pos 7.26 / 0 clicks
- Nakhon Phanom–Si Songkhram — 20 / pos 6.25 / 0 clicks
- Kalasin–Khao Wong — 28 / pos 8.25 / 1 click
- Pathum Thani — 26 / pos 9.19 / 1 click
- ไอโฟนเปิดไม่ติดขายได้ไหม — 41 / pos 8.49 / 1 click

### HOLD

- iPhone 11–16 model hubs
- homepage generic owner
- low-volume URLs with insufficient query evidence

### CONSOLIDATE

`NONE_CONFIRMED`

GSC query rows are sparse/anonymized. There is not enough evidence in I0 to retire or redirect local/condition URLs.

## Cannibalization result

`NO_CONFIRMED_DESTRUCTIVE_CANNIBALIZATION`

The available query×page data does not show a high-volume query being split across competing landing pages strongly enough to justify redirect/canonical changes. Generic query rows such as `รับซื้อ iphone` and model-specific queries have low visible volume, while clicks are distributed through long-tail local and condition surfaces.

## Recommended execution order

### I1 — Local + Condition Page-One Push

Primary candidates:
1. Ubon Ratchathani
2. Nonthaburi
3. Udon Thani
4. Face ID เสีย
5. เครื่องนอก
6. iPhone cracked-screen commercial intent
7. Khon Kaen

Guardrail: preserve URL, canonical and existing ownership; use small on-page/internal-link changes.

### I2 — CTR Winner Optimization

Primary candidates:
- iPhone 14 Thai vs import
- iPhone 15 Pro Max Thai vs import
- iPhone 16 battery health
- iPhone 16 Pro Max battery health
- Sisaket Mueang / Nakhon Phanom Si Songkhram / Kalasin Khao Wong / Pathum Thani

### I3 — Model Recovery Verification

Only after I1/I2. Diagnose why model hubs sit at positions 25–41 before rewriting them. Check model-intent query ownership against related blog pages first.

### I4 — Ownership / schema / legacy hygiene

Audit template and internal-link ownership without mass consolidation.

### I5 — Production verification + GSC observation gate

Freeze final source and compare post-deploy finalized GSC against this I0 baseline.

## Guardrails

- Do not mass-rewrite model pages during I1.
- Do not consolidate province/district pages into one generic local page.
- Do not change titles/H1/canonicals of proven top-10 winners without query evidence.
- Do not judge performance from sitewide average position alone; use page/query movement.
- Do not use sparse query rows as evidence for destructive cleanup.
