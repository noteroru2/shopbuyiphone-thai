# IPHONE I1 — Local + Condition Page-One Push

Date: 2026-09-09 (Asia/Bangkok)
Base: `81407c44a15d70ad55488de666b81e9934a3553a` (I0)

## Verdict

`SOURCE_PASS / TARGETED_PUSH_ONLY / READY_FOR_MAIN`

## GSC evidence from I0

Latest finalized GSC date: 2026-09-06.

Target owners:
- Ubon Ratchathani: 4 clicks / 31 impressions / position 11.81
- Nonthaburi: 3 / 27 / position 10.15
- Udon Thani: 4 / 34 / position 7.44
- Khon Kaen: 1 / 22 / position 14.45
- Face ID condition: 4 / 49 / position 9.73
- Imported-device condition: 2 / 26 / position 8.08
- Cracked-screen condition: condition and supporting cracked-screen article form a proven page-one/near-page-one cluster

## Change strategy

I1 deliberately does not rewrite the target content entries. Instead it:

1. Adds a customer-facing support block only when `RelatedLinks.astro` renders on exact I1 target URLs.
2. Adds contextual links among Local and Condition owners using seller-intent language.
3. Strengthens inbound internal links from `/รับซื้อไอโฟน/` to Ubon Ratchathani, Udon Thani, Khon Kaen, Nonthaburi, Face ID, imported-device, and cracked-screen pages.
4. Includes a support mapping for `/blog/ไอโฟนจอแตกขายได้ไหม/` when that page renders `RelatedLinks`.
5. Adds `data-iphone-i1="PAGE_ONE_PUSH"` to the targeted support block for production verification.

## Guardrails preserved

- No target URL changes.
- No canonical changes.
- No redirect changes.
- No target H1 changes.
- No target title changes.
- No schema changes.
- No robots or sitemap changes.
- No mass rewrite of province/district/model pages.
- No model-hub push in I1.

## Public-copy policy

The added copy is customer-facing only. It explains what information sellers should provide, how condition affects evaluation, and which related pages are useful. No SEO/audit/internal terminology is visible to users.

## Expected effect

- Improve contextual relevance for local commercial intent already ranking around positions 7–14.
- Strengthen topical relationship between local owners and high-performing condition pages.
- Improve internal link discovery from the iPhone hub to I1 owners without sitewide keyword stuffing.
- Preserve current winners while giving near-page-one URLs a small push toward positions 3–10.

## Validation notes

- Thai path matching uses `decodeURIComponent(Astro.url.pathname)` with a safe fallback, so exact target mappings work when production paths are percent-encoded.
- Source scope is limited to `src/components/RelatedLinks.astro`, `src/pages/รับซื้อไอโฟน/index.astro`, and this report.
- Repository has no GitHub Actions workflow available for branch build verification; production/build verification must be performed in the later I5 gate. This report does not claim a full build or deployment pass.
