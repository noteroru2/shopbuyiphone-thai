# IPHONE SEO Coverage Report — ร้านรับซื้อไอโฟน.com

วันที่อัปเดต: 2026-05-01  
Build: `npm run build` **ผ่าน** (static, **81 หน้า**, sitemap สร้างอัตโนมัติ)

---

## 1. Keyword หลัก → URL

| Keyword | URL |
|---------|-----|
| รับซื้อไอโฟน / ร้านรับซื้อไอโฟน | `/` (`index.astro` — title/meta ตามสเปก money page) |
| รับซื้อ iPhone ทุกรุ่น / hub บริการ | `/รับซื้อไอโฟน/` |

---

## 2. Keyword รอง → URL

| กลุ่ม | URL |
|--------|-----|
| รับซื้อไอโฟนมือสอง | `/รับซื้อไอโฟนมือสอง/` |
| รับซื้อ iPhone | `/รับซื้อ-iphone/` |
| ขายไอโฟน / ขายไอโฟนมือสอง | `/ขายไอโฟน/` |
| เช็คราคาไอโฟน / ประเมินราคาไอโฟน | `/เช็คราคาไอโฟน/` |
| ตีราคาไอโฟน | `/ตีราคาไอโฟน/` |
| รุ่น 11–15, SE, XS/XR, Pro/Pro Max | `/รับซื้อไอโฟน/{slug}/` — slug หลักรวม **`pro-max`** (แทน `iphone-pro-pro-max`) |
| สภาพหลัก | `/รับซื้อไอโฟน/จอแตก/` … `/เครื่องศูนย์ไทย/` (ดู KEYWORD-MAP.md) |
| กรุงเทพ / ภาคอีสาน / จังหวัดตัวอย่าง | `/รับซื้อไอโฟน/กรุงเทพ/` `/ภาคอีสาน/` `/อุบลราชธานี/` `/ขอนแก่น/` `/อุดรธานี/` `/นครราชสีมา/` |
| พื้นที่รวม | `/พื้นที่ให้บริการ/` |
| FAQ | `/คำถามที่พบบ่อย/` |
| Blog / AEO | `/blog/...` (รายการใน KEYWORD-MAP.md) |

---

## 3. หน้าที่สร้างใหม่ / เส้นทางใหม่

- **`/รับซื้อไอโฟน/pro-max/`** — แทนเส้นทางเดิม `iphone-pro-pro-max` (อัปเดตลิงก์ทั้ง `src` และคอนเทนต์ location)
- **`/blog/ก่อนขายไอโฟนต้องล้างข้อมูลอย่างไร/`** — slug ใหม่ตามแผน AEO (ลบไฟล์ slug เก่า)
- **คอมโพเนนต์** `HubBuyIphoneMain.astro`, `HomeMoneyPageLinks.astro` — รองรับ hub + internal linking หน้าแรก

---

## 4. หน้าที่แก้ไขหลัก

- **`KEYWORD-MAP.md`** — แมป keyword → URL ครบตามสเปกโปรเจกต์
- **`src/pages/index.astro`** — title/description ตาม money page, เพิ่ม `HomeMoneyPageLinks`, `LeadEstimateForm`
- **`src/pages/รับซื้อไอโฟน/index.astro`** — hub: title/description/H1, `Service` + `FAQPage` schema, FAQ 8 ข้อตามสเปก, เนื้อหา hub ผ่าน `HubBuyIphoneMain`
- **`src/content.config.ts`** — เพิ่ม `seoTitle`, `h1` ใน collections `models` และ `conditions`
- **`src/pages/รับซื้อไอโฟน/[slug].astro`** — ใช้ `seoTitle` / `h1` จาก frontmatter สำหรับ model & condition
- **Model MD** — เพิ่ม `seoTitle` + `h1` (รูปแบบ “รับซื้อ iPhone XX มือสอง ประเมินฟรี”)
- **Condition MD** — เพิ่ม `seoTitle`, `h1`, ปรับ meta description ให้ตรง intent และแก้คำผิดใน Face ID
- **`src/content/models/pro-max.md`** — แทน `iphone-pro-pro-max.md`
- **`src/content/locations/กรุงเทพ.md`**, **`ภาคอีสาน.md`** — H1/description (แก้คำซ้ำในอีสาน)
- **`src/pages/รับซื้อไอโฟนมือสอง.astro`**, **`รับซื้อ-iphone.astro`** — title/description/H1 ปรับให้สอดคล้องแผน
- **`src/data/seo-keywords.ts`** — ขยาย keyword รองให้สอดคล้องแผน
- **`src/components/Footer.astro`** — เพิ่มลิงก์ Pro/Pro Max → `pro-max`
- **`scripts/seed-iphone-content.mjs`** — slug `pro-max` ให้สอดคล้องโปรดักชัน

---

## 5. Blog posts

- **ใหม่ / ย้าย slug:** `ก่อนขายไอโฟนต้องล้างข้อมูลอย่างไร.md` (แทน `ก่อนขายไอโฟนล้างข้อมูล.md`) พร้อม FAQ + relatedLinks + เนื้อหาเสริม
- **บทความชุดเดิม** ยังครบในหมวดที่กำหนด (ขายที่ไหนดี, Battery Health, iCloud, ฯลฯ) — อัปเดตลิงก์ภายในที่ชี้ไปบทความล้างข้อมูลให้เป็น URL ใหม่

---

## 6. Internal linking structure

- **หน้าแรก:** `HomeMoneyPageLinks` → hub, service, รุ่น 15–13, สภาพหลัก, พื้นที่, FAQ, blog  
- **Hub:** `HubBuyIphoneMain` + `RelatedLinks` สามบล็อก (บริการ / รุ่น / สภาพ+พื้นที่)  
- **Footer:** เมนูรุ่นรวม **Pro/Pro Max → `/รับซื้อไอโฟน/pro-max/`**  
- **รายละเอียด:** ดู `KEYWORD-MAP.md` หมวด internal linking

---

## 7. Schema

- **Hub** `/รับซื้อไอโฟน/`: `BreadcrumbList` + `Service` + `FAQPage` (FAQ ตรงกับที่แสดง)
- **หน้า dynamic** `[slug].astro`: เดิมมี `Service` + `FAQPage` ผ่าน `BrandLayout` / `LocationLayout` เมื่อมี `faqs`
- **หน้าแรก:** `FAQPage` จาก FAQ เดิมใน `index.astro`

---

## 8. คำเก่าที่ล้าง / QA

- **grep** ใน `src` และ `dist`: ไม่พบ `โน๊ตบุ๊ค`, `Notebook`, `Gaming Notebook`, `iphone-pro-pro-max`, slug blog เก่าใน production HTML
- **แก้เนื้อหา:** คำผิด/ซ้ำใน `ภาคอีสาน.md` description, คำติดกันใน `face-id-เสีย` keywords

---

## 9. Build result

- `npm run build` **สำเร็จ**
- **81 หน้า** (จำนวนเท่าเดิม — สลับ slug ไม่เพิ่มจำนหน้ารวม)
- Sitemap / RSS สร้างจากคอลเลกชันล่าสุด

---

## 10. สิ่งที่เจ้าของเว็บควรเติมเอง

- **รูปถ่าย iPhone จริงของร้าน** แทน/เสริม SVG ตัวอย่าง  
- **โลโก้แบรนด์ + OG รูปแรสเตอร์** (WebP/JPG) แทน placeholder ใน `SITE.logo` / `SITE.ogImage` ถ้าต้องการ social preview สมบูรณ์  
- **รีวิวลูกค้าจริง** (ห้ามรีวิวปลอม — ตอนนี้การ์ดเป็นแนวทางประเมิน)  
- **Google Search Console / Analytics** และตรวจ canonical บนโดเมนจริง  
- **ทดสอบ mobile / internal link crawl** บน staging ก่อน deploy  

---

## หมายเหตุ (ขอบเขตงาน)

- หน้า **service** บางหน้ามีเนื้อหายาวอยู่แล้ว — รอบนี้โฟกัส meta/H1/hub/keyword map/slug หลัก + schema hub  
- เป้าหมายความยาว “1,200–2,500 คำ” ต่อหน้า: บางหน้าอาจยังไม่ถึงเพดาน — เจ้าของสามารถเติมเคสจริง/FAQ เฉพาะท้องถิ่นเพิ่มได้โดยไม่ซ้ำทั้งหน้า  
- **`/คำถามที่พบบ่อย/`** มีโครงเดิม + FAQ schema จากชุด `faqs.ts` — หากต้องการหมวด H2 ครบ 7 หมวดแบบละเอียดเพิ่ม สามารถขยายในรอบถัดไป
