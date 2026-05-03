# รายงานอัปเดต LINE CTA + iPhone 16/17

โปรเจกต์: ร้านรับซื้อไอโฟน.com (Astro, static)  
วันที่อ้างอิง build: พฤษภาคม 2026

---

## 1. เอาฟอร์มออกจากหน้าไหนบ้าง

- **หน้าแรก** (`src/pages/index.astro`): ไม่มี `LeadEstimateForm` / `<form>` แล้ว — เน้นส่งรูปผ่าน LINE
- **ติดต่อเรา** (`src/pages/ติดต่อเรา.astro`): แทนฟอร์มด้วย `PremiumLineCtaSection` แล้ว

หมายเหตุ: ไฟล์คอมโพเนนต์ `src/components/LeadEstimateForm.astro` **ยังอยู่ใน repo** แต่ **ไม่ถูก import ในหน้าใด** จึงไม่ถูก bundle ลง production HTML

---

## 2. เพิ่ม LINE CTA section ใหม่ตรงไหน

- **`PremiumLineCtaSection.astro`**: section หลัก (H2 + checklist + การ์ดมืด CTA, ไม่มี input) ใช้บนหน้าแรกและหน้าติดต่อเรา
- **`LineCtaStrip.astro`**: strip บาง ๆ หลัง Process / Model / Condition / Editorial บนหน้าแรก
- **`FinalCtaBanner.astro`**: ปรับหัวข้อเป็น 2 บรรทัดตามสเปก (พร้อมขาย… / ส่งรูปเช็คราคา… @webuy) + คำอธิบาย + microcopy 3–5 รูป

การ์ด CTA หลักใช้หัวข้อ **ส่งรูปประเมินผ่าน LINE** ตามที่กำหนด

---

## 3. เพิ่ม iPhone 16 และ iPhone 17 ในจุดไหนบ้าง

- **หน้าแรก**: `ModelGrid` — ลำดับ 17 → 16 → 15 … → SE, badge รุ่นใหม่ / รุ่นยอดนิยม, grid 4 คอลัมน์ desktop
- **Hub** `src/pages/รับซื้อไอโฟน/index.astro`: meta description, FAQ รุ่นทั้งหมด (กล่าวถึง 17/16), FAQ ใหม่ «รับซื้อ iPhone 16 และ iPhone 17 ไหม?», `RelatedLinks` เพิ่มลิงก์ iPhone 17 / 16
- **Footer**: คอลัมน์รุ่น — 17, 16, 15, 14, 13, 12 + **ดูรุ่นทั้งหมด** → `/รับซื้อไอโฟน/`
- **บล็อก**: `ขาย-iphone-15-14-13-มือสอง-ต้องเตรียมอะไร.md` — คำอธิบาย + ลิงก์รุ่นเพิ่ม 17 / 16
- **`KEYWORD-MAP.md`**, **`public/llms.txt`**: keyword และ URL หน้ารุ่นใหม่

---

## 4. สร้างหน้าใหม่อะไร

- ใช้ **content collection** `models` — ไฟล์:
  - `src/content/models/iphone-17.md`
  - `src/content/models/iphone-16.md`
- Route ที่ build ออกมา:
  - `/รับซื้อไอโฟน/iphone-17/`
  - `/รับซื้อไอโฟน/iphone-16/`

(เรนเดอร์ผ่าน `src/pages/รับซื้อไอโฟน/[slug].astro` ตาม slug ใน frontmatter)

---

## 5. อัปเดต keyword map อะไร

ใน `KEYWORD-MAP.md` ตาราง **Model keywords** เพิ่ม mapping สำหรับ:

- รับซื้อ iPhone 17 / Plus / Pro / Pro Max, รับซื้อไอโฟน 17, เช็คราคา iPhone 17 → `/รับซื้อไอโฟน/iphone-17/`
- รับซื้อ iPhone 16 / Plus / Pro / Pro Max, รับซื้อไอโฟน 16, เช็คราคา iPhone 16 → `/รับซื้อไอโฟน/iphone-16/`

บรรทัดท้ายไฟล์: บันทึกว่าเน้น LINE และไม่ใช้คำโน๊ตบุ๊คใน production

---

## 6. อัปเดต sitemap / internal links แล้วหรือไม่

- **Sitemap**: ใช้ `@astrojs/sitemap` — หน้า static ทั้งหมดรวม `/รับซื้อไอโฟน/iphone-16/` และ `/รับซื้อไอโฟน/iphone-17/` ถูก generate อัตโนมัติหลัง build
- **Internal links**: hub, footer, model grid, บล็อกที่แก้, และเนื้อหาใน model markdown (ลิงก์ไป hub / เช็คราคา / ตีราคา / รุ่นใกล้เคียง) ตามแพทเทิร์นเดิมของเว็บ

---

## 7. ผล `npm run build`

- รันคำสั่ง: `npm run build`
- **ผลลัพธ์: สำเร็จ (exit code 0)**  
- ประมาณ **83 หน้า** รวม `/รับซื้อไอโฟน/iphone-16/index.html` และ `/รับซื้อไอโฟน/iphone-17/index.html`

---

## 8. ยังเหลือฟอร์มในหน้าอื่นไหม

- ค้นหา `<form` ใน `src/pages`: **ไม่พบ**
- ค้นหา `<form` ใน `src/components`: พบเฉพาะ **`LeadEstimateForm.astro`** (ไม่ได้ถูกใช้งาน)
- หน้า `/เช็คราคาไอโฟน/`, `/ขายไอโฟน/`: ไม่มีฟอร์ม HTML ยาวในไฟล์หน้า (เน้นข้อความ + CTA)

**คำแนะนำ:** ถ้าไม่ต้องการใช้ฟอร์มอีกเลย อาจลบหรือเก็บไว้นอก `src` เพื่อลดความสับสนใน repo

---

## 9. สิ่งที่เจ้าของเว็บควรทำต่อ

- ใส่ **รูปจริง** iPhone 16 / 17 (หรือภาพประกอบของตัวเองที่ไม่ละเมิดลิขสิทธิ์) ใน hero / model ถ้าต้องการความเฉพาะทางแบรนด์มากขึ้น
- ทดสอบบนมือถือจริง: ความสูงปุ่ม LINE, ระยะ section หลังเอาฟอร์มออก
- ถ้าต้องการลบ `LeadEstimateForm` ออกจาก repo แบบถาวร ให้ลบไฟล์และอัปเดตเอกสารภายในโปรเจกต์ที่อ้างถึง (ถ้ามี)

---

## ไฟล์ที่แตะในรอบสุดท้ายนี้ (สรุป)

- `src/pages/รับซื้อไอโฟน/index.astro` — hub + FAQ + related links  
- `KEYWORD-MAP.md` — mapping 16/17 + Plus  
- `public/llms.txt` — hub + URL รุ่นใหม่  
- `src/components/FinalCtaBanner.astro` — หัวข้อ Final CTA  
- `src/components/PremiumLineCtaSection.astro` — หัวข้อการ์ดขวา  
- `src/content/blog/ขาย-iphone-15-14-13-มือสอง-ต้องเตรียมอะไร.md` — ลิงก์รุ่นใหม่  

รายงานนี้สอดคล้องกับสถานะโค้ดหลัง build ผ่านล่าสุด
