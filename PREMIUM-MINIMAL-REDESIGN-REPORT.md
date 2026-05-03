# รายงาน Premium Minimal Redesign — ร้านรับซื้อไอโฟน.com

วันที่: 1 พฤษภาคม 2026

## 1. ปรับดีไซน์อะไรบ้าง

- **ทิศทางภาพรวม:** โทน **Premium Minimal** เน้นพื้นขาว/ออฟไวต์ (`#FAFAF8`), เทา (`#6B7280`), ตัวอักษรเข้ม (`#111`, `#18181B`), **ทองเป็นจุดเน้นน้อย** (`#B9975B`, พื้นทองอ่อน `#F7F1E6`, เส้นทอง `#E6D6B8`), **เขียว LINE เฉพาะปุ่ม LINE**
- **ลดความรก:** ลดจำนวน section บนหน้าแรก ย้ายเนื้อหา SEO ยาวไปรวมใน **บล็อกบทความแนว editorial** แทนการซ้อนหลายกล่องสี
- **ระยะหายใจ:** เพิ่ม `padding` ระหว่าง section (`pt-16`–`pt-20`), ลด shadow/gradient หนัก, ลดขอบซ้อน
- **Typography:** หัวข้อใช้ `font-semibold` มากขึ้น ลดความหนาแบบ extrabold ในส่วนรอง
- **Mobile:** เพิ่ม `pb-28` ใน `<main>` และ `safe-area` บน sticky CTA ล่าง เพื่อไม่ให้บังฟอร์ม/เนื้อหาท้ายหน้า

## 2. เปลี่ยน component ไหนบ้าง

| Component | การเปลี่ยนแปลงหลัก |
|-----------|---------------------|
| `global.css` | ปรับ palette ตามสเปก (border, gold, charcoal, soft black), พื้น body เรียบ |
| `Header.astro` | ความสูง ~64px / desktop ~72px, nav เล็กลง, เมนู **บริการ** แบบ dropdown, CTA LINE ขวา, ลิงก์โทรแบบขอบบาง |
| `Hero.astro` | Hero 2 คอลัมน์, eyebrow pill, H1 + underline ทองที่คำว่า “ไอโฟน”, sub 18px / max-width 560px, วิชวลขวาเป็น **การ์ดเข้มแบบร้านพรีเมียม** + แท็กลอย |
| `TrustBadges.astro` | เหลือ **4 จุด** แถบเดียว (charcoal) ไม่มีการ์ดย่อยหลายใบ |
| `ProcessSteps.astro` | **Timeline** แนวนอน (desktop) / แนวตั้ง (mobile), ลดกรอบทองหนา |
| `ModelGrid.astro` | เหลือ **6 การ์ดซีรีส์** + ลิงก์รุ่นอื่นเป็นข้อความด้านล่าง (ไม่ดึงจาก CMS ทั้งหมด) |
| `ConditionGrid.astro` | **8 การ์ดหลัก** + ลิงก์รอง (กล้องเสีย / ฝาหลังแตก / จอเป็นเส้น), ไอคอนเส้นมินิมอล, ข้อความ iCloud/รหัสตามที่กำหนด |
| `PriceFactors.astro` | เลย์เอาต์ **ซ้าย: คำอธิบาย / ขวา: checklist 2 คอลัมน์** |
| `FAQ.astro` | Accordion เต็มความกว้างจำกัด, เส้น `border-b` ไม่ห่อกล่องหนา |
| `FinalCtaBanner.astro` | CTA มืดหรู เส้นทองบาง, ลด glow เขียว, ข้อความตามสเปก |
| `LeadEstimateForm.astro` | 2 คอลัมน์: ซ้าย benefit / ขวา form, input สูง ~48px, select สำหรับฟิลด์ละเอียด, ลดกรอบ gradient รอบฟอร์ม |
| `Footer.astro` | Footer 4 คอลัมน์ ข้อความเล็กลง ลดกล่องซ้อน |
| `ServiceAreasSection.astro` | แสดง **8 พื้นที่** + ลิงก์ไปหน้ารวม |
| `HomeEditorialSeoSection.astro` | **ใหม่** — รวมเนื้อหา SEO แบบ editorial 4 บล็อก |
| `HomeBlogGuides.astro` | **ใหม่** — บทความ 3 เรื่องที่กำหนด พร้อม fallback ภาพ gradient |
| `HomeHubLinks.astro` | **ใหม่** — แถบลิงก์ข้อความแทนการ์ดบริการจำนวนมาก |
| `CTAButtons.astro` | ปุ่ม LINE ใหญ่ขึ้น, ปุ่มโทรขาวขอบเทา, ลิงก์เช็คราคาแบบ underline |
| `StickyMobileCTA.astro` | รองรับ safe-area inset ล่าง |

## 3. Section ไหนลดความรก

- หน้าแรก **ถอดออก** จากลำดับเดิม: `MiniProcessBarDark`, `SeoIntroSection`, `SoftImageStrip`, `PhotoGuide`, `PopularModelChips`, `IphoneTypesSection`, `HomeConditionPricingSection`, `HomeIphoneTerminologySection`, `HomeSellPrepSection`, `HomeDataPrivacySection`, `TrustGallery`, `ReviewCards`, `SafetySection`, `WhyChooseUs`, `PopularServicesLinks`, `HomeMoneyPageLinks` — เนื้อหา/คีย์เวิร์ดส่วนใหญ่ถูกรวมใน `HomeEditorialSeoSection` + ลิงก์ใน `HomeHubLinks` และบทความ 3 เรื่อง
- **Above the fold:** เหลือ Header → Hero → Trust 4 จุด → แล้วค่อยขั้นตอน/รุ่น/สภาพ

## 4. หน้าไหนถูกแก้

- **`/` (index):** จัดลำดับ section ใหม่ทั้งหมดตามสเปก
- **คอมโพเนนต์ที่ใช้ซ้ำในหน้าอื่น:** `ProcessSteps`, `CTAButtons`, `FinalCtaBanner`, `Header`, `Footer`, `FAQ` (ถ้ามีหน้าอื่น import), `TrustBadges` (หน้าเกี่ยวกับเรา) — รูปลักษณ์สอดคล้องทั้งเว็บ
- **`BaseLayout.astro`:** `theme-color` เป็น `#fafaf8`, `main` padding ล่างมือถือ
- **`public/manifest.webmanifest`:** `theme_color` เป็น `#18181b` (แถบสถานะเข้มขึ้นเล็กน้อย)

## 5. ล้างคำเก่าอะไรออก

- ไม่พบใน `src` (ไฟล์ `.astro`, `.md`, `.ts`, `.css`) คำว่า: โน๊ตบุ๊ค / Notebook / Gaming Notebook / placeholder / REPLACE_ME / TODO / lorem / dummy / mock / draft (การค้นแบบนี้เป็นแนวทาง — ควรรัน grep ซ้ำก่อน deploy จริง)
- ฟอร์มประเมิน: **ไม่ใส่** `placeholder` ในช่อง input เพื่อไม่ชนเงื่อนไข production

## 6. ผล `npm run build`

- **ผ่าน** — สร้างได้ **81 หน้า** + `sitemap-index.xml` (รัน 1 พ.ค. 2026)

## 7. สิ่งที่ยังควรใส่จริง (เจ้าของเว็บ / ทีม)

- **รูปถ่าย iPhone จริง** ใน Hero / การ์ดเคส (แทนหรือเสริม SVG)
- **OG image** ขนาดประมาณ 1200×630 (JPG/WebP) แทน SVG ปัจจุบันเพื่อพรีวิวโซเชียลคมขึ้น
- **รูปปกบทความ** จริง 16:9 แทน gradient fallback ในหน้าแรก
- **โลโก้แบรนด์ร้าน** แทน badge “iP” ใน header/footer
- **รีวิว/เคสจริง** หากต้องการส่วน “ความน่าเชื่อถือ” แบบมีชื่อ-บริบท (ค่อยเพิ่มเป็น section พิเศษได้โดยไม่ทำให้รก)

---

สรุป: โครงสร้าง SEO และ internal links หลักยังคงอยู่ที่หน้า hub / บทความ / footer; หน้าแรกเน้นความโปร่งและลำดับข้อมูลใหม่ให้รู้สึกเหมือนร้านมือถือพรีเมียมมากขึ้น
