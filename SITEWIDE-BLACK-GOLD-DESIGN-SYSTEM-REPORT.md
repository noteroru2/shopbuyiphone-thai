# รายงาน Black Gold Premium — Sitewide Design System

อัปเดตล่าสุด: 1 พ.ค. 2026

## 1. Layout / component กลางที่มีอยู่และถูกใช้งาน

| รายการ | สถานะ |
|--------|--------|
| `layouts/BaseLayout.astro` | ฐาน SEO + schema |
| `layouts/BrandLayout.astro` | Breadcrumb + schema (ใช้เป็นหลัก) |
| `layouts/LocationLayout.astro` | โครงเทียบเท่า BrandLayout (หน้า dynamic ไม่ใช้แล้ว — ลดซ้ำ) |
| `components/PageHero.astro` | Hero มาตรฐาน (dark/cream, CTA ผ่าน `CTAButtons`) |
| `components/LineCTA.astro` | CTA LINE + โทร (dark / compact / inline) |
| `components/FAQSection.astro` | FAQ accordion โทน cream/white + ทอง |
| `components/FAQ.astro` | wrapper ไป `FAQSection` เพื่อ backward compatibility |
| `components/ContentProse.astro` | prose เนื้อหา markdown บนพื้นขาว/cream |
| `components/RelatedLinks.astro` | ปรับเป็น pill links บนพื้นขาว/cream + hover ทอง |
| `components/FinalCtaBanner.astro` + `ProcessSteps` + `PriceFactors` | ใช้ต่อท้ายหน้า dynamic |

**จุดสำคัญรอบนี้:** หน้า `รับซื้อไอโฟน/[slug].astro` (model / condition / location ทั้งหมด) รวมเป็น **เลย์เอาต์เดียว** ผ่าน `BrandLayout` — ไม่แยก `LocationLayout` อีกต่อไป — พร้อม `PageHero` (dark), บอดี้ `bg-section-warm`, `LineCTA`, `ContentProse`, `ProcessSteps`, `PriceFactors`, `FAQSection` (ถ้ามี FAQ ใน frontmatter), `RelatedLinks`, `FinalCtaBanner`

## 2. หน้า service ที่เกี่ยวข้อง

หน้าเส้นทางคงที่ เช่น `/รับซื้อไอโฟนมือสอง/`, `/รับซื้อ-iphone/`, `/เช็คราคาไอโฟน/`, `/ตีราคาไอโฟน/` ฯลฯ — **ยังไม่ได้ refactor ในรอบ commit นี้** (หากยังมีคลาส `slate-*` ควรย้ายเป็นโทน `text-text-dark`, `border-gold-border`, `bg-section-warm` ตามดีไซน์ระบบ)

## 3. หน้า model ที่ถูกปรับ

ทุกหน้าที่มาจาก `src/content/models/` และเรนเดอร์ผ่าน **`/รับซื้อไอโฟน/[slug]/`** รวมถึง `iphone-17`, `iphone-16`, `iphone-15`, …, `iphone-se`, `iphone-xs-xr`, `pro-max` — ใช้โครงเดียวกัน: summary card โทน dark-card, checklist เตรียมขาย, ลิงก์สภาพใน `RelatedLinks`, CTA LINE

## 4. หน้า condition ที่ถูกปรับ

ทุก slug ใต้ `/รับซื้อไอโฟน/` จาก `src/content/conditions/` เช่น จอแตก, แบตเสื่อม, ติด-icloud, ติดรหัส, face-id-เสีย ฯลฯ

- **AEO:** กล่องคำถาม–คำตอบสั้นตาม `aeoBySlug` (มีตัวอย่าง “จอแตก” ตามสเปก)
- **ความปลอดภัย:** หน้า `ติด-icloud` และ `ติดรหัส` มีบล็อกเตือนเรื่องเจ้าของเครื่อง / ไม่สนับสนุนปลดล็อกผิดกฎหมาย / แนะนำออก Apple ID และปิด Find My

## 5. หน้า location ที่ถูกปรับ

ทุกจังหวัด/โซนที่มาจาก `src/content/locations/` ผ่าน `[slug].astro` เดียวกัน

- **GEO intro** เป็นส่วน H2 บนพื้นขาว
- **พื้นที่ย่อย** แสดงเป็น pill
- **ลิงก์ใกล้เคียง:** มี `neighborBySlug` สำหรับ กรุงเทพ, ขอนแก่น, อุบลราชธานี, อุดรธานี, นครราชสีมา, ภาคอีสาน + ลิงก์ hub ภาคอีสาน/กรุงเทพ (ไม่ชนกับหน้าตัวเอง)
- **FAQ:** หัวข้อ/คำนำแยกโทน “พื้นที่นี้” เมื่อมี `faqs` ใน frontmatter

## 6. Blog / FAQ hub

- **Blog:** ไม่ได้แก้ในรอบนี้
- **FAQ hub** (`/คำถามที่พบบ่อย/`): ไม่ได้แก้ในรอบนี้ — ยังมีโอกาสใช้ `PageHero` + `FAQSection` + `LineCTA` ให้สอดคล้องหน้าแรก

## 7. ตรวจ CTA LINE ทุกหน้า

หน้า dynamic ใต้ `/รับซื้อไอโฟน/[slug]/` มี **PageHero** (ปุ่มผ่าน `CTAButtons` ค่าเริ่มต้น LINE + โทร), **LineCTA** แบบ `compact` ในแถวคำแนะ + **LineCTA** แบบ `dark` กลางหน้า, และ **FinalCtaBanner** ท้ายหน้า

## 8. ตรวจ iPhone 16 / 17

- ใน `MODEL_RELATED` และการ build: มี route `/รับซื้อไอโฟน/iphone-17/` และ `/รับซื้อไอโฟน/iphone-16/` (build ผ่าน, สร้าง static ครบ)

## 9. ล้างคำเก่า / dev

สแกน `src/` ด้วยคีย์เวิร์ดต้องห้าม (โน๊ตบุ๊ค, Notebook, placeholder, TODO, lorem ฯลฯ) — **ไม่พบ** ในโค้ดที่สแกน

## 10. ผล `npm run build`

รันคำสั่ง `npm run build` สำเร็จ (Astro static, sitemap สร้างครบ, 83 หน้า)

---

## งานที่แนะนำต่อ (backlog สั้น)

- ย้ายหน้า service คงที่และ FAQ hub จาก `slate-*` ไปโทน design token เดียวกับหน้าแรก
- พิจารณาลบหรือรวม `LocationLayout.astro` ถ้าไม่มีที่อ้างอิงแล้ว เพื่อลดความซ้ำซ้อน
