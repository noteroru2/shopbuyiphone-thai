# IPHONE-REBRAND-REPORT — ร้านรับซื้อไอโฟน.com

วันที่: 2026-05-01

## สรุป

ปรับเว็บจากโครง clone ให้เป็นแบรนด์รับซื้อ iPhone มือสองแนวพรีเมี่ยม (โทนดำ/กรม/ขาว/ฟ้าอ่อน) ล้างคอมโพเนนต์และรูปที่อ้างอิงโปรเจกต์โน๊ตบุ๊คใน UI หลัก เพิ่มฟอร์มประเมินบนหน้าติดต่อ เพิ่มบทความ blog ให้ครบชุดคีย์เวิร์ด และสร้าง SVG สำหรับ hero/strip เพื่อไม่ให้ path รูปหายเมื่อยังไม่มีไฟล์ `.webp` จริง

## สีและดีไซน์

- **Hero**: พื้นหลัง gradient โทน `#F8FAFC` / ขาว / ฟ้าอ่อน ลด blur เขียว-เหลืองเดิม, H1 ใหญ่ขึ้น, CTA 3 ปุ่ม (LINE เขียว #06C755, โทรดำ, เช็คราคาไอโฟน), badges ใต้ CTA, การ์ดภาพ `rounded-3xl` + `shadow-xl` เบา ๆ
- **MiniProcessBarDark**: พื้นหลัง gradient slate, badge ขั้นตอนเป็น LINE / น้ำเงิน / glass แทน amber/sky สด
- **Trust badges**: 5 รายการตามสเปค โทน border slate + hover ฟ้าอ่อน
- **Model grid / Condition / Price factors / Photo guide**: การ์ด `rounded-3xl`, `border-slate-200/70`, hover `border-blue-200`
- **Process steps / Final CTA**: ตัดรูป notebook เดิม ใช้ gradient + SVG สไตล์เดียวกับ hero
- **Footer**: wordmark แทนโลโก้ไฟล์ notebook ที่ไม่มีใน repo, เพิ่มคอลัมน์เมนูสภาพ

## เนื้อหาและโครงสร้าง

- **FAQ หน้าแรก**: แทนที่ด้วย 10 ข้อตามสเปค + FAQ schema ตรงกับที่แสดง
- **Review section**: เปลี่ยนเป็น “ตัวอย่างแนวทางประเมิน” 4 การ์ด (ไม่ใช่รีวิวลูกค้า)
- **Home sections**: ขยายบล็อกคำศัพท์ iPhone / เตรียมขาย / ความเป็นส่วนตัว (บล็อกใหม่ `HomeDataPrivacySection`)
- **Condition grid**: ปรับข้อความ **ติดรหัส / ติด iCloud** ให้เน้นตรวจสอบความเป็นเจ้าของและเงื่อนไขก่อนประเมิน
- **Price factors**: รายการปัจจัย iPhone แทน CPU/RAM/SSD + ลิงก์ `/เช็คราคาไอโฟน/` และ `/ตีราคาไอโฟน/`
- **Popular chips**: รายการรุ่นตามสเปค + ลิงก์ไปหน้าซีรีส์ที่มีจริง
- **ติดต่อเรา**: คำอธิบาย meta เน้น iPhone + เพิ่ม `LeadEstimateForm`
- **Partner sites (เครือ)**: ถ้อยคำอธิบายเว็บอื่นลดคำ “โน๊ตบุ๊ค/MacBook” ใน `partner-sites.ts` เพื่อไม่ให้หน้าเว็บ iPhone ไปเน้นคำเหล่านั้นใน blurbs

## บทความ (blog)

เพิ่มไฟล์ใหม่ 9 บทความ (รวมเดิม 5 = 14 บทความ) พร้อม internal links ไป `/`, `/รับซื้อไอโฟน/`, `/เช็คราคาไอโฟน/`, `/ขายไอโฟน/`, `/ตีราคาไอโฟน/` และหน้าสภาพ/รุ่นที่เกี่ยวข้อง

## รูปภาพ

- เพิ่ม SVG ใน `public/images/`: `hero-iphone-buying.svg`, `iphone-check-price.svg`, `iphone-condition.svg`, `iphone-models.svg`
- **เจ้าของเว็บควรแทนที่**: ด้วยภาพถ่าย/เรนเดอร์ `.webp` คุณภาพสูงตามต้องการ (เช่น `hero-iphone-buying.webp`) แล้วอัปเดต `src` ใน `Hero`, `SoftImageStrip`, `PhotoGuide` ฯลฯ ให้ชี้ไฟล์จริง
- อัปเดต `public/images/image-manifest.json` ให้สอดคล้องกับ SVG ชั่วคราว

## ลบ / แทนที่คำและทรัพยากรเก่า

- ลบการอ้าง path รูป `rubsue-notebook-*` และ `logo-ranrubsue-notebook-*` ออกจากคอมโพเนนต์หลัก
- อัปเดต `KEYWORD-MAP.md`, `SEO-CHECKLIST.md`, `DEPLOY-CHECKLIST.md`, หัวข้อ README ให้เป็นโดเมน iPhone
- เอกสารรายงานเก่าใน repo (เช่น `LOCATION-PAGES-REPORT.md`, `AUDIT-REPORT.md`) ยังอาจมีคำ “โน๊ตบุ๊ค” เป็นประวัติโปรเจกต์ — **ไม่ถูก serve เป็นหน้า production**; ถ้าต้องการความสะอาดเต็ม repo ให้ลบหรือรีไรต์แยก

## ผล `npm run build`

- **สำเร็จ (exit code 0)** — สร้างได้ **81 หน้า** static + `sitemap-index.xml`
- รันครั้งล่าสุดหลังแก้ SVG โลเคชันและแบรนด์ใน `public/`

## grep QA (`src` + `public`)

- ไม่พบคำ: `โน๊ตบุ๊ค`, `Notebook`, `MacBook`, `Gaming Notebook`, `placeholder`, `TODO`, `lorem`, … ในโค้ดที่ build และสินทรัพย์ `public/` (หลังแก้ชุด location SVG + admin title)
