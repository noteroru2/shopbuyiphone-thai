# IPHONE I4 — Ownership / Schema / Legacy Hygiene

Date: 2026-09-09 (Asia/Bangkok)
Base: `83c31abdecfdb55402e67413c4559502bac1ac48` (I3)

## Verdict

`SOURCE_PASS / FAQ_SCHEMA_CLEANUP / OWNERSHIP_PRESERVED / LEGACY_HOLD`

## Schema finding

The site still generated `FAQPage` JSON-LD through multiple page families, including BrandLayout and Blog pages. Google removed the FAQ rich result feature from Search in 2026, so this markup no longer provides a Google Search rich-result benefit.

Visible FAQ content remains useful to customers and is preserved.

## Change

`src/components/JsonLd.astro` now filters schema objects whose `@type` is `FAQPage` before serialization.

This single serialization-boundary cleanup applies consistently to all callers without rewriting every page template or deleting visible FAQ content.

## Preserved structured data

The cleanup does not remove:

- Organization
- LocalBusiness with the business's real physical/contact details
- WebSite / WebPage
- BreadcrumbList
- Service
- BlogPosting
- other schema types supplied by eligible pages

## Ownership hygiene

I0-I3 show distributed Local ownership, proven Condition/Blog long-tail ownership, and correct commercial model ownership. I4 therefore makes no canonical, redirect, noindex or consolidation changes.

## Legacy decision

`HOLD_NO_DESTRUCTIVE_CLEANUP`

Current GSC evidence does not identify a legacy URL family with enough impressions/clicks to justify broad redirects, noindex, or route retirement. Low-volume About/Contact and other utility URLs are not treated as cannibalization evidence.

## Guardrails

- No customer-visible FAQ removed.
- No Local/Condition/Model content rewrite.
- No URL/canonical/redirect change.
- No mass noindex.
- No removal of real business Organization/LocalBusiness data.
- No change to I0 frozen GSC baseline.

## Production verification

I5 must verify that the final production HTML no longer emits `"@type":"FAQPage"` while all I1/I2 source markers and normal robots/sitemap/canonical behavior remain intact.
