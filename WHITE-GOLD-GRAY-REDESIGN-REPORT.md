# White / Gold / Gray Premium Redesign — รายงาน

โปรเจกต์: **ร้านรับซื้อไอโฟน.com** (Astro + Tailwind v4)  
วันที่อัปเดต: พฤษภาคม 2026

---

## 1. เปลี่ยน theme อะไรบ้าง

- กำหนด **design tokens** ผ่าน `@theme` ใน `src/styles/global.css` ให้ใช้ชุดสีขาว–เทา–ทองตามสเปก (soft-white, light-gray, gray-border, text-dark, text-muted, gold / gold-soft / gold-deep / gold-bg, charcoal, dark-slate, line-green)
- พื้น `body` ปรับเป็น **โทนขาวอุ่น** พร้อม radial gradient ทองอ่อนแบบจาง ๆ แทนโทน slate/emerald เดิม
- `:focus-visible` ใช้วงแหวน **ทองอ่อน** แทนสีเขียวเดิม
- `BaseLayout`: `body` ใช้ `bg-soft-white text-text-dark antialiased`, `theme-color` เป็น charcoal (`#1f2937`)
- `public/manifest.webmanifest`: `background_color` → `#fafaf8`, `theme_color` → `#1f2937`

---

## 2. เปลี่ยนสีอะไรบ้าง (สรุป)

| เดิม (โดยประมาณ) | ใหม่ |
|------------------|--------|
| ลิงก์หลักสีน้ำเงิน `#2563EB` | ทองเข้ม `text-gold-deep` + hover `text-gold` |
| พื้นการ์ด/เซกชัน sky/emerald | `gold-bg`, `light-gray`, `soft-white`, gradient ทอง–ขาว |
| ปุ่มโทรใน Hero/CTA พื้นเข้ม slate | ปุ่ม **ขาว + ขอบทอง** (ตามสเปกพรีเมี่ยม) |
| Mini process / badges สีน้ำเงิน | **ทอง / เขียว LINE** บนพื้น charcoal |
| Sticky mobile / header | ขอบ `gray-border`, ปุ่มโทรขอบทอง |

---

## 3. Component ไหนถูกปรับ

- `Header.astro` — โลโก้โทน charcoal + ขอบทอง, nav active `gold-bg`, CTA โทรขอบทอง
- `Footer.astro` — โครงสร้างพรีเมี่ยม, ลิงก์ทอง, กล่องข้อมูล soft-white / gold-bg
- `Hero.astro` — พื้นหลัง gradient ทองอ่อน, badges, การ์ดภาพ ring ทอง
- `CTAButtons.astro` — LINE เขียวเดิม, โทรขาวขอบทอง, tertiary ขอบเทา hover ทอง
- `MiniProcessBarDark.astro` — ลบโทนน้ำเงิน, step 2 ใช้ badge ทอง
- `ProcessSteps.astro` — wrapper `gold-bg`, การ์ดขาว, คอลัมน์ขวา charcoal + ไอคอนทอง
- `FinalCtaBanner.astro` — เส้น accent ทองด้านบน, blur ทอง/เขียว
- `TrustBadges.astro`, `RelatedLinks.astro`, `SeoCTA.astro` — โทนขาว–ทอง–charcoal
- `FAQ.astro` — หัวข้อคำถามวงกลมทอง, hover พื้น `gold-bg`
- `StickyMobileCTA.astro` — โทรขอบทอง
- `ModelGrid.astro` — **ลำดับรุ่นคงที่** (15→14→…→XS/XR) + การ์ดทอง
- `ConditionGrid.astro` — การ์ดขาวเอกรูป, chip “ตรวจเจ้าของก่อน” สำหรับ iCloud/รหัส, คำเตือนตามนโยบาย
- `LeadEstimateForm.astro` — กรอบนอกทองอ่อน, focus ring ทอง, **ลบ `placeholder`**, ปุ่ม submit `ส่งข้อมูลประเมินราคา`, ปุ่ม LINE สำรอง
- `ReviewCards`, `PhotoGuide`, `PriceFactors`, `PopularModelChips`, `HomeIphoneTerminologySection`, `HomeDataPrivacySection` — สลับจากน้ำเงิน/ฟ้าเป็นโทนทอง
- `ServiceAreasSection.astro`, `SafetySection.astro` — gradient ทอง–เทา แทน sky/emerald
- `src/pages/blog/[slug].astro` — blockquote border ทอง
- `src/pages/ติดต่อเรา.astro` — ปุ่มเสริมจาก emerald เป็น gold

---

## 4. Section ไหนถูก redesign

- **Hero หน้าแรก** — H1/subtitle ตามทิศทาง SEO + ปุ่ม 3 ปุ่ม + badges ตามรายการ
- **Trust strip** — MiniProcessBarDark (4 ขั้นตอนบนพื้นเข้ม)
- **ProcessSteps** — รายละเอียด 4 ขั้นตอนบนพื้นขาว/ทอง + ภาพประกอบโทนเข้ม
- **Model / Condition grids** — สไตล์ช็อปพรีเมี่ยม
- **Lead form** — ฟอร์มและ microcopy
- **FAQ หน้าแรก** — 10 ข้อเดิม (ตรงกับรายการที่กำหนด)
- **Final CTA** — charcoal + accent ทอง

---

## 5. หน้าไหนถูกสร้างหรือแก้

- **ไม่สร้างหน้าใหม่** — ปรับสไตล์และเนื้อหา SEO บางจุดที่หน้าแรก (`index.astro`)
- **แก้ลิงก์เสีย**: `src/pages/ตีราคาไอโฟน.astro` — ลบลิงก์ไป `/รับซื้อไอโฟน/เครื่องเสีย/` (ไม่มี slug นี้) เปลี่ยนเป็นลิงก์ไป **ฮับ `/รับซื้อไอโฟน/`** และปรับ internal links list
- **Service / พื้นที่ / บล็อก**: ปรับ hover class จาก emerald → gold ในหลายหน้า (chip / การ์ดลิงก์)

---

## 6. คำเก่าที่ถูกล้าง / แก้

- ลบ **`placeholder`** attribute ออกจากฟิลด์ Face ID/Touch ID ใน `LeadEstimateForm.astro` (ใช้ข้อความใต้ช่องแทน)
- แก้คอมเมนต์ใน `src/config/site.ts` ที่มีคำว่า “placeholder” เป็นคำอธิบายภาษาไทยที่ไม่ผิดเงื่อนไข production
- ตรวจ `dist` แบบ `*.html`: **ไม่พบ** โน๊ตบุ๊ค / Notebook / placeholder (ข้อความ)

---

## 7. ผล `npm run build`

- **ผ่าน** — `astro build` สำเร็จ, **81 หน้า** static, sitemap สร้างครบ

---

## 8. ยังขาดรูปจริงหรือ asset จริงตรงไหน

- ยังใช้ **`/images/hero-iphone-buying.svg`** เป็น hero / OG / บางการ์ด — แนะนำแทนด้วย **ภาพถ่าย iPhone จริง** และ **OG 1200×630** เมื่อพร้อม
- โลโก้เว็บใน `site.ts` ยังชี้ไฟล์เดียวกับ hero ชั่วคราว — ควรมี **โลโก้แบรนด์ร้าน** แยกไฟล์

---

## 9. จุดไหนเจ้าของเว็บควรเติมเองภายหลัง

- รูปสินค้า/ร้านจริง, วิดีโอสั้น ๆ ประกอบการประเมิน  
- อัปเดต **รายละเอียดบริการ/โซนรับ** ให้ตรงปฏิบัติการจริง  
- **Google Search Console**, Analytics, แคช CDN  
- ตรวจ **mobile ทุกหน้ายาว** (FAQ, บทความ) บนเครื่องจริง 320–430px  

---

## หมายเหตุทางเทคนิค

- Tailwind v4 ใช้ `@import "tailwindcss"` + `@theme` — คลาสเช่น `bg-gold-bg`, `text-text-muted` มาจาก token ใน `global.css`
- ธีมเน้น **70% ขาว/อ่อน, 20% เทา, 10% ทอง** โดยทองใช้เป็น accent ไม่ล้นทั้ง section
