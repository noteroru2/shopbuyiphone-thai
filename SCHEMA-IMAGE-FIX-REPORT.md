# Schema image audit & fix — ร้านรับซื้อไอโฟน.com

**วันที่:** 2026-05-04  

---

## 1. Organization schema — สถานะก่อน / หลัง

| รายการ | ก่อน | หลัง |
|--------|------|--------|
| `logo` | มี (`absoluteUrl(SITE.logo)`) | มี — ใช้ **`schemaAbsoluteUrl(SITE.logo)`** โฮสต์ punycode |
| `image` | **ไม่มี** | **มี** — `https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com/images/logo-webuy-gold-w.svg` (เท่ากับโลโก้ตาม brief) |

โค้ด: `src/lib/schema.ts` — `organizationSchema()`  

ช่วยให้ crawler (รวม Google) เห็นรูปองค์กรชัดขึ้น และ URL โฮสต์เป็น ASCII (punycode) สอดคล้องงาน encoding ก่อนหน้า

---

## 2. LocalBusiness schema — สถานะก่อน / หลัง

| รายการ | ก่อน | หลัง |
|--------|------|--------|
| `image` | `absoluteUrl('/images/hero-webuy-campaign.webp')` ผ่าน `SITE.ogImage` | **`schemaAbsoluteUrl(SITE.ogImage)`** → `https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com/images/hero-iphone-buying.svg` |

**หมายเหตุ:** ใน `public/images/` **ไม่มี** `hero-webuy-campaign.webp` (หรือ `.png`) — การชี้ไปไฟล์นั้นทำให้ schema (และ OG เดิม) อ้าง URL 404  

โค้ด: `src/lib/seo.ts` — `localBusinessSchema()` และ `src/config/site.ts` — `ogImage` เปลี่ยนเป็น `/images/hero-iphone-buying.svg`

---

## 3. ฟังก์ชันและ config ที่เพิ่ม/แก้

| ไฟล์ | การเปลี่ยนแปลง |
|------|------------------|
| `src/config/site.ts` | เพิ่ม `schemaPublicOrigin: 'https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com'`; `ogImage` → `/images/hero-iphone-buying.svg` |
| `src/lib/seo.ts` | เพิ่ม `schemaAbsoluteUrl()`; `localBusinessSchema.image` ใช้ `schemaAbsoluteUrl(SITE.ogImage)` |
| `src/lib/schema.ts` | Organization: `logo` + `image` ด้วย `schemaAbsoluteUrl(SITE.logo)`; `blogPostingSchema` publisher `logo.url` ใช้ `schemaAbsoluteUrl` |
| `src/pages/index.astro` | Hero ใช้ `/images/hero-iphone-buying.svg` แทน path แคมเปญที่ไม่มีไฟล์ |
| `scripts/isan-build.mjs` | `OG_FALLBACK` → `/images/hero-iphone-buying.svg` |

`absoluteUrl()` ยังใช้ `SITE.url` (Unicode) สำหรับ canonical / OG meta ตามเดิม — เฉพาะ URL รูปใน JSON-LD บางจุดใช้ punycode ผ่าน `schemaAbsoluteUrl`

---

## 4. ตรวจไฟล์รูปใน `public/images` และ `dist/images`

| Path | `public/images` | `dist/images` (หลัง `npm run build`) |
|------|-----------------|----------------------------------------|
| `/images/logo-webuy-gold-w.svg` | มี | มี |
| `/images/hero-iphone-buying.svg` | มี | มี |

ตรวจด้วย Node `fs.existsSync` — ทั้งสอง path มีใน `public` และถูกคัดลอกไป `dist` หลัง build

---

## 5. ข้อจำกัดตาม brief

- **ไม่มี `address` / PostalAddress ปลอม** — ไม่ได้เพิ่ม; LocalBusiness ยังใช้ `hasMap` + `telephone` + `areaServed` ตามเดิม  
- **ไม่มี `priceRange`** — ไม่ได้เพิ่ม  

---

## 6. Build

- `npm run build` — **ผ่าน** (84 หน้า)

---

## 7. ตัวอย่าง JSON-LD ใน `dist/index.html` (ย่อ)

- **Organization:** `"logo":"https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com/images/logo-webuy-gold-w.svg"`, `"image":"https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com/images/logo-webuy-gold-w.svg"`  
- **LocalBusiness:** `"image":"https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com/images/hero-iphone-buying.svg"`  

`og:image` / `twitter:image` บนหน้าแรกชี้ `https://ร้านรับซื้อไอโฟน.com/images/hero-iphone-buying.svg` (canonical host + path ที่มีไฟล์จริง)

---

## 8. สิ่งที่อาจทำต่อ (ไม่บังคับ)

- `public/images/image-manifest.json` ยังอ้าง `hero-webuy-campaign.webp` — เป็น manifest เก่า ไม่กระทบ build; อัปเดตได้เมื่อต้องการ sync เอกสารกับ repo จริง
