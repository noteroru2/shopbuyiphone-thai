# รายงาน Redesign Black Gold Premium — ร้านรับซื้อไอโฟน.com

## 1. ปรับ theme เป็น Black Gold อย่างไร

- กำหนด palette ใน `src/styles/global.css` ภายใต้ `@theme`: พื้นดำ (`black`, `near-black`, `charcoal`, `graphite`, `dark-card`), ทอง (`gold`, `gold-soft`, `gold-deep`, `premium-gold`, `gold-border`, `gold-bg`), ข้อความ (`off-white`, `muted-light`, `text-dark`, `text-muted`), CTA LINE (`line-green`, `line-green-dark`), และ `glass-white` / `glass-border`
- เพิ่ม utility `.text-gradient-gold` สำหรับไฮไลต์หัวข้อแบบ metallic
- เพิ่ม `.bg-hero-noise` เป็น noise SVG เบา ๆ บน Hero
- `body` ใช้พื้น `near-black` และตัวอักษร `off-white` เพื่อให้โครงหน้าหลักเข้าธีมร้านพรีเมียมโดยไม่ทำให้พื้นหลังกลืนทุก section (section เนื้อหายาวยังใช้ `soft-white` / พื้นขาวใน card)

## 2. แก้ component ไหนบ้าง

| พื้นที่ | ไฟล์หลัก |
|--------|----------|
| Theme / base | `src/styles/global.css`, `src/layouts/BaseLayout.astro` |
| นำทาง | `src/components/Header.astro`, `src/components/Breadcrumbs.astro` |
| หน้าแรก | `src/pages/index.astro` |
| Hero / CTA | `src/components/Hero.astro`, `src/components/CTAButtons.astro` |
| Section | `TrustBadges`, `ProcessSteps`, `ModelGrid`, `ConditionGrid`, `PriceFactors`, `HomeEditorialSeoSection`, `HomeBlogGuides`, `HomeHubLinks`, `PremiumLineCtaSection`, `LineCtaStrip`, `FAQ`, `ServiceAreasSection`, `FinalCtaBanner`, `Footer`, `StickyMobileCTA` |
| เครือข่าย | `src/components/PartnerSites.astro` (โหมด footer ให้ contrast บนพื้นดำ) |

## 3. ปรับ Hero อย่างไร

- Hero รับ props เฉพาะ `subtitle`, `imageSrc`, `imageAlt` (H1 อยู่ใน component เพื่อรักษา H1 เดียวและ keyword **รับซื้อไอโฟน**)
- พื้นหลัง: ดำ + gradient + radial glow ทอง + noise เบา
- ซ้าย: eyebrow แบบ pill กรอบทอง, H1 สองบรรทัดพร้อม gradient ที่คำว่า «ไอโฟน» และ «จ่ายเงินไว», ย่อหน้าตามสเปก, CTA จาก `CTAButtons` (LINE เขียวใหญ่, โทรขอบทอง, ลิงก์เช็คราคา), trust chips
- ขวา: card มืดกรอบทอง + รูป hero จาก `public/images`
- `index.astro`: ลบการส่ง `title` / `titleHtml` ที่ทำให้ build ไม่ตรงกับ interface

## 4. ปรับ CTA LINE อย่างไร

- `CTAButtons`: ปุ่มหลักสี `#06C755` / hover `#05A948`, โหมด `tone="dark"` + `size="lg"` ใน Hero และ Final CTA
- `PremiumLineCtaSection`: section ดำทองเต็มรูปแบบ แยกซ้าย checklist / ขวา LINE card เน้น `@webuy` และข้อความส่งรูป 3–5 รูป
- `LineCtaStrip`: พื้น `dark-card` กรอบทองอ่อน ปุ่ม LINE เด่นชัด
- `StickyMobileCTA`: พื้น near-black กรอบทอง, คอลัมน์ LINE กว้างกว่าเล็กน้อยเพื่อให้ปุ่มเขียวเด่นสุด

## 5. เพิ่ม/แก้รุ่น iPhone 16/17 หรือไม่

- โครง `ModelGrid` เดิมรองรับ iPhone 17 / 16 พร้อม badge «รุ่นใหม่» และบรรทัดรุ่นย่อยอยู่แล้ว — ไม่เปลี่ยนสเปกเชิงลึก ใช้ข้อความกลาง «ประเมินตามรุ่น ความจุ และสภาพจริง»
- FAQ: รวมคำตอบเรื่องรุ่นที่รับซื้อให้ครอบคลุม iPhone 17/16 ในข้อแรก แล้วลบคำถามซ้ำ «รับซื้อ iPhone 16 และ iPhone 17 ไหม?» เพื่อให้ชุด FAQ ตรงบรีฟ (9 ข้อ) และไม่ keyword ซ้ำเกินไป

## 6. ล้างคำเก่าอะไรออก

- ค้นใน `src` ด้วยคีย์เวิร์ดต้องห้าม (โน๊ตบุ๊ค, Notebook, placeholder, lorem, dummy, TODO, mock, draft ฯลฯ) — **ไม่พบ**ในโค้ดที่ใช้ production
- ปรับคำถาม FAQ «เครื่องศูนย์ไทยกับเครื่องนอก**ประเมินต่างกันไหม**» เป็น «**ต่างกันไหม**» ให้ตรงกับบรีฟ
- ลบ FAQ เรื่องขายได้เมื่อไม่มีกล่อง/อุปกรณ์ไม่ครบออกจากหน้าแรก เพื่อให้เหลือ 9 ข้อตามสเปก (เนื้อหา SEO หลักยังอยู่ในบทความ/หน้าอื่นได้)

## 7. ผล `npm run build`

- รันสำเร็จ (exit code 0) — Astro static build + sitemap สร้างครบ **83 หน้า** โดยไม่มี error

## 8. จุดที่เจ้าของเว็บควรใส่รูปจริงเพิ่มเติม

- **Hero & Final CTA**: ปัจจุบันใช้ `/images/hero-rubsue-iphone-webuy-premium.webp` — หากมีภาพร้านจริง / มุมสินค้าที่ต้องการแบรนด์มากขึ้น แนะนำแยกไฟล์ Final CTA เพื่อไม่ซ้ำกับ Hero
- **บทความใน `HomeBlogGuides`**: การ์ดใช้พื้น gradient + ข้อความ «iPhone» เป็น fallback — ใส่ thumbnail จริงจาก frontmatter หรือรูปใน `public/` จะดูพรีเมียมขึ้นมาก
- **รุ่นใน ModelGrid**: ไม่บังคับรูป แต่ถ้ามีภาพซีรีส์คุมโทนดำทองจะเสริมความรู้สึกร้าน flagship
