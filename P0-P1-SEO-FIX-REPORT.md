# P0 / P1 SEO Fix Report — ร้านรับซื้อไอโฟน.com

รายงานหลังปรับตาม audit ก่อนส่ง **Google Search Console** (วันที่ build: พฤษภาคม 2026)

---

## สรุปสิ่งที่แก้

| หัวข้อ | การดำเนินการ |
|--------|----------------|
| **Schema `areaServed`** | จำกัดใน `SITE.areaServed` เหลือ 7 รายการตามที่กำหนด (กทม., ปริมณฑล, ภาคอีสาน, อุบลฯ, ขอนแก่น, อุดรฯ, โคราช) — ใช้ใน JSON-LD เดิมผ่าน `seo.ts` |
| **HTML vs schema** | หน้า `/พื้นที่ให้บริการ/` ยังใช้ `serviceAreaGroups` จาก `service-areas.ts` สำหรับรายละเอียดจังหวัด — ไม่ใส่จังหวัดอื่นใน `areaServed` ของ LocalBusiness/Service |
| **ทิปในหน้าแรก** | เปลี่ยนจากการอ้างรายชื่อจาก `areaServed` เป็นแนว **สอบถามพื้นที่ให้บริการทางไลน์** สำหรับพื้นที่นอกโซนหลัก |
| **H1 หน้าแรก** | บรรทัดแรกยังมีคำว่า **รับซื้อไอโฟน** (รับซื้อ + ไอโฟนแบบ gold); บรรทัดสองเป็น **ประเมินไว จ่ายเงินไว** (Black Gold เดิม) |
| **`<title>` หน้าแรก** | ย่อเป็น: `รับซื้อไอโฟน ประเมินฟรีผ่านไลน์ @webuy \| ร้านรับซื้อไอโฟน.com` |
| **Meta description หน้าแรก** | ครอบคลุม iPhone มือสอง, จอแตก, แบตเสื่อม, เปิดไม่ติด, ส่งรูปไลน์ @webuy, โทร 0642579353 และใช้ถ้อยคำ **ประเมินตามรุ่นและสภาพจริง** |
| **คำเคลม “ให้ราคาดี”** | ลบออกจาก H1 ใน `Hero.astro` |
| **หัวข้อภาษาอังกฤษ** | แก้ `Internal links` → หัวข้อภาษาไทยในหน้า `ตีราคาไอโฟน` และ `รับซื้อไอโฟนมือสอง`; แก้ H2 **ดีที่สุด** ในหน้า `เช็คราคาไอโฟน` เป็น **เหมาะกับคุณ** |
| **รูป legacy `rubsue-notebook-*`** | ใน `public/images` **ไม่พบไฟล์** ชุดนี้ใน workspace ปัจจุบัน — หลัง `npm run build` **ไม่มี** สตริง `rubsue-notebook` ใน `dist/` |
| **สคริปต์อ้าง path เก่า** | `scripts/isan-build.mjs` เปลี่ยน `OG_FALLBACK` เป็น `/images/hero-webuy-campaign.webp` |
| **Alt ใน manifest** | `public/images/image-manifest.json` ลบคำว่า **ราคาสูง** ใน alt ของโลโก้ hero SVG |

---

## ไฟล์ที่แก้

- `src/config/site.ts` — `areaServed` แคบลง; ลบการ flatten จังหวัดทั้งหมดเข้า schema
- `src/components/Hero.astro` — H1 บรรทัดที่สอง
- `src/pages/index.astro` — `title`, `description`
- `src/components/HomeConditionPricingSection.astro` — ทิปพื้นที่
- `src/pages/ตีราคาไอโฟน.astro` — H2
- `src/pages/รับซื้อไอโฟนมือสอง.astro` — H2
- `src/pages/เช็คราคาไอโฟน.astro` — H2
- `scripts/isan-build.mjs` — `OG_FALLBACK`
- `public/images/image-manifest.json` — alt หนึ่งรายการ

---

## Build

- **`npm run build`** — **ผ่าน** (84 หน้า, `sitemap-index.xml` สร้างที่ `dist/`)

---

## การตรวจซ้ำ (checklist)

| รายการ | ผล |
|--------|-----|
| Sitemap | `dist/sitemap-index.xml` → `sitemap-0.xml` (โดเมน punycode ตาม Astro) |
| JSON-LD `areaServed` | ใน `dist/index.html` เป็น array ความยาว **7** ตรงกับรายการที่กำหนด |
| `rubsue-notebook-*` ใน `dist` | **ไม่พบ** (grep ทั้งโฟลเดอร์ `dist`) |
| H1 มี “รับซื้อไอโฟน” | **มี** (ใน `#hero-heading`) |
| Title ไม่ยาวเกินไป | สั้นกว่าเวอร์ชันก่อน audit ชัดเจน (~50–60 ตัวอักษรไทยรวมสัญลักษณ์) |
| `areaServed` ไม่กว้างเกินจริง | **จำกัดแล้ว** — หน้า GEO อื่นยังมี URL จังหวัดได้ แต่ schema ไม่ claim ทุกจังหวัด |

---

## ยังควรทำก่อน / หลัง submit GSC (แนะนำ)

1. **Property & URL** — ยืนยันโดเมนไทย / punycode ใน GSC ให้ตรงกับ canonical จริง
2. **Coverage** — ส่ง sitemap แล้วดู “Discovered / Indexed” หลัง 1–2 สัปดาห์
3. **Rich results** — ทดสอบ URL หน้าแรกด้วย [Rich Results Test](https://search.google.com/test/rich-results) สำหรับ FAQ (ถ้ามี) + LocalBusiness
4. **เนื้อหา GEO** — หน้า `/รับซื้อไอโฟน/{จังหวัด}/` ยังมีอยู่เพื่อ SEO ท้องถิ่น; ควรให้เนื้อหาแต่ละหน้าสอดคล้องกับข้อความ “สอบถามพื้นที่ให้บริการ” และไม่ขัดกับ schema (ทำต่อเป็น P2 ได้)
5. **สคริปต์ legacy** — `scripts/convert-trust-images.mjs`, `convert-assets-to-webp.mjs` ฯลฯ ยังอ้างชื่อไฟล์ `rubsue-notebook-*` สำหรับการแปลงรูป — ไม่กระทบ build แต่ถ้าจะรันสคริปต์ควรอัปเดตชื่อ output ให้สอดคล้องแบรนด์ iPhone
6. **SITE.description ใน `site.ts`** — ยังเป็นข้อความกว้าง; ถ้าต้องการความสอดคล้องกับหน้าแรกทุกจุด อาจปรับให้สั้นและเน้น “ประเมินฟรี / สอบถามพื้นที่” ในรอบถัดไป

---

*รายงานนี้สร้างควบคู่กับการแก้โค้ดในโปรเจกต์เดียวกัน*
