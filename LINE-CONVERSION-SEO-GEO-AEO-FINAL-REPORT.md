# LINE Conversion + SEO / GEO / AEO — รายงานสรุป (ร้านรับซื้อไอโฟน.com)

งานรอบนี้เน้น **แอดไลน์ @webuy** เป็นหลัก เสริมคีย์เวิร์ด **รับซื้อไอโฟน** / GEO กรุงเทพ–อีสาน / AEO คำตอบสั้น โดยคงธีม Black Gold Premium และ `npm run build` ผ่าน

---

## 1. เพิ่ม CTA LINE อะไรบ้าง

- **Hero (`Hero.astro`)**: ข้อความ microcopy ใต้ปุ่ม CTA — ส่งรูป 3–5 รูป ผ่านไลน์ @webuy ประเมินฟรี ไม่กรอกฟอร์ม / หัวข้อย่อยหน้าแรกขึ้นต้นด้วย **รับซื้อไอโฟน**
- **`PremiumLineCtaSection.astro`**: ข้อความซ้ายชัดเรื่อง **ไม่ต้องกรอกฟอร์ม**, ส่งรูป 3–5 รูป, รอทีมงานประเมิน — การ์ดขวา microcopy **ส่งรูปครบ ประเมินได้เร็วขึ้น**
- **`Footer.astro`**: ข้อความสั้น “ส่งรูป iPhone เพื่อเช็คราคาได้ฟรีผ่านไลน์” + ปุ่มหลักเต็ม **แอดไลน์ @webuy ส่งรูปประเมินราคา**
- **`HomeGeoSection.astro`**: CTA LINE + โทร ใต้บล็อก GEO

---

## 2. เพิ่ม Sticky mobile CTA หรือไม่

- **ปรับ `StickyMobileCTA.astro`** (เฉพาะ `sm:hidden`):
  - แถบบน: ข้อความ **แอดไลน์ @webuy เช็คราคาไอโฟน**
  - ปุ่ม 1: **แอดไลน์** → `https://line.me/R/ti/p/@webuy` (ผ่าน `SITE.lineUrl`)
  - ปุ่ม 2: **โทร** → `tel:0642579353`
  - พื้น charcoal / border ทองบน
- **`BaseLayout.astro`**: เพิ่ม `pb-32` ให้ `<main>` บนมือถือ เพื่อไม่ให้เนื้อหาถูกบังโดยแถบล่าง

---

## 3. เพิ่ม GEO block หรือไม่

- **เพิ่ม `HomeGeoSection.astro`** บนหน้าแรก หลัง `PremiumLineCtaSection` ก่อน AEO/FAQ
- H2: **รับซื้อไอโฟน กรุงเทพ ปริมณฑล และภาคอีสาน** + เนื้อหาตามสเปก + ลิงก์ไป  
  `/รับซื้อไอโฟน/กรุงเทพ/`, `/ภาคอีสาน/`, `/อุบลราชธานี/`, `/ขอนแก่น/`, `/อุดรธานี/`, `/นครราชสีมา/`, `/พื้นที่ให้บริการ/`
- อัปเดต **`public/llms.txt`**: เพิ่มส่วน GEO + URL เมืองหลัก

---

## 4. เพิ่ม AEO answer blocks อะไร

- **ไฟล์ `src/data/home-faqs.ts`**: แยก `homeQuickAeo` (4 ข้อคำตอบสั้นตามสเปก) + `homeExtendedFaq` (accordion ละเอียด) + `homeAllFaqsForSchema` (รวมทั้งหมด)
- **`HomeAeoAnswerBlocks.astro`**: แสดง 4 การ์ด (หัวข้อชัด + คำตอบสั้น + accent ทอง)
- **`index.astro`**: `faqPageSchema(homeAllFaqsForSchema)` — schema ครอบคลุมทั้งการ์ด AEO และ FAQ ใน accordion ให้สอดคล้องเนื้อหาที่แสดง
- **`FAQ.astro`**: รองรับ prop `lead` สำหรับคำบรรยายใต้หัวข้อ (หน้าแรกใช้หัวข้อ “คำถามเพิ่มเติม”)

---

## 5. iPhone 16 / 17 ครบทุกจุดไหม

- **`ModelGrid.astro`**: iPhone 17 — badge **รุ่นใหม่**, blurb ตามสเปก; iPhone 16 — badge **รุ่นยอดนิยม**, blurb **ส่งรูปเช็คราคาได้ฟรีผ่านไลน์ @webuy**
- หน้า `/รับซื้อไอโฟน/iphone-17/` และ `/iphone-16/` มีอยู่แล้วใน content collection (build รวม route อยู่แล้ว)

---

## 6. หน้า SEO / GEO / AEO สำคัญครบไหม

- หน้า hub / service / model / condition / location หลักยังถูก generate จากเดิม (build 83 หน้า)
- หน้าแรกเสริม **title/meta** ด้วยคีย์เวิร์ด GEO (กรุงเทพ ภาคอีสาน) และ **ประเมินราคาไอโฟน**

---

## 7. ล้างคำเก่าอะไรออก

- **grep ใน `src`** กับคีย์เวิร์ดต้องห้ามชุดที่ระบุ: **ไม่พบ**
- โฟลเดอร์ `public/admin`, รูป brands เก่า ฯลฯ **ไม่ได้แก้** (ไม่ใช่หน้า production หลักของเว็บ iPhone)

---

## 8. ผล `npm run build`

- **`npm run build` ผ่าน** หลังรวมคอมโพเนนต์และ data ใหม่

---

## 9. สิ่งที่เจ้าของเว็บควรใส่เพิ่ม

- **รูป iPhone จริง** สำหรับ Hero / Final CTA และบทความ (ตอนนี้ blog cards ใช้ fallback dark/gold + outline + ข้อความ **iPhone Guide**)
- **รีวิวจริง** (ห้ามปลอม — ถ้ามีลูกค้ายินยอมให้ใช้คำพูด/ชื่อ ค่อยเพิ่มส่วนรีวิวแยก)
- **Google Business Profile** + ยืนยันข้อมูลให้ตรงกับ `humans.txt` / LocalBusiness schema
- **Google Search Console**: ส่ง sitemap, ตรวจ coverage หลัง deploy

---

อัปเดตล่าสุด: แยก FAQ schema = การ์ด AEO 4 ข้อ + FAQ ต่อท้าย — Sticky mobile สั้น ชัด — GEO block บนหน้าแรก
