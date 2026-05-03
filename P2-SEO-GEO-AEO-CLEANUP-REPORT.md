# P2 SEO / GEO / AEO Cleanup Report — ร้านรับซื้อไอโฟน.com

รอบนี้ทำหลังส่ง Google Search Console เพื่อเสริมความปลอดภัยของข้อความ GEO/AEO อัปเดตสคริปต์ legacy ลิงก์ภายในบล็อก และกล่องคำตอบสั้น (AnswerBox) โดยไม่ redesign และไม่เปลี่ยนธีม Black Gold Premium

---

## 1. หน้า GEO ที่แก้ / ปรับข้อความ

| รายการ | การเปลี่ยนแปลง |
|--------|------------------|
| `src/content/locations/ภาคอีสาน.md` | ปรับ `meetingOptions` ให้ไม่ claim จุดบริการถึงที่ทุกพื้นที่ (ใช้คำว่าสอบถามพื้นที่ให้บริการก่อน) — สถานะนี้มีอยู่แล้วจากรอบก่อน |
| `src/content/locations/ภาคอีสาน.md` — `highlights` | แทนที่บรรทัดที่ใช้คำว่า “ครอบคลุม…ทุกจังหวัด…” ด้วยข้อความที่อิงเฉพาะ “หน้ารายละเอียดจังหวัดด้านล่าง + ส่งรูปผ่านไลน์ @webuy” |
| `scripts/isan-provinces-data.mjs` | ล้างเศษสำนวนจากโปรเจกต์เก่า (GPU / เกมมิ่ง / การ์ดจอ / “สเปก” ในบริบทโน้ตบุ๊ค) ให้เป็นภาษา iPhone — แก้ highlight โคราช, FAQ โคราช/อุดร/ขอนแก่น และข้อความ “รองรับ Pro” ให้สอดคล้องมือถือ |
| `public/images/locations/*.svg` | รัน `node scripts/gen-isan-location-svgs.mjs` ใหม่ — ข้อความบน SVG เป็น “รับซื้อไอโฟน…” และ “ร้านรับซื้อไอโฟน.com” กราฟิกเป็น silhouette มือถือ แทน laptop |

---

## 2. Script legacy ที่แก้

| ไฟล์ | สรุป |
|------|--------|
| `scripts/convert-trust-images.mjs` | ชื่อ output: `webuy-iphone-trust-*` |
| `scripts/convert-user-product-images.mjs` | output reviews และ photo-guide เป็น `webuy-iphone-*` |
| `scripts/convert-assets-to-webp.mjs` | output: `webuy-iphone-*-legacy.webp` + alt ไม่มี Notebook/โน๊ตบุ๊ค; เขียน manifest เป็น `image-manifest-convert-assets-legacy.json` เพื่อไม่ทับ `image-manifest.json` ใน public |
| `scripts/make-logo-transparent.mjs` | output: `logo-webuy-iphone-transparent*.webp` |
| `scripts/gen-isan-location-svgs.mjs` | ข้อความ iPhone + โทรศัพท์ silhouette |
| `scripts/wordcount-blog.mjs` | อ่านรายการ `.md` ใน `src/content/blog/` แบบ dynamic แทน path โน๊ตบุ๊คเก่า |
| `scripts/wordcount-keyword-pages.mjs` | ชี้ไปหน้า iPhone จริงในโปรเจกต์ (มือสอง / ขาย / เช็คราคา / ฯลฯ) |

สคริปต์ที่แก้ข้อมูลจังหวัด: `scripts/isan-provinces-data.mjs` (ใช้คู่กับ `isan-build.mjs` เมื่อรีเจนเนื้อหาในอนาคต)

---

## 3. SITE.description ใหม่ และความสอดคล้องหน้าแรก

ใน `src/config/site.ts` ใช้ข้อความตามที่กำหนด:

> ร้านรับซื้อไอโฟน.com ให้บริการประเมินราคา iPhone มือสองตามรุ่น ความจุ และสภาพจริง ลูกค้าสามารถส่งรูปผ่านไลน์ @webuy เพื่อเช็คราคาเบื้องต้นก่อนตัดสินใจขาย หรือโทร 0642579353

`src/pages/index.astro` ใช้ `const description = SITE.description` เพื่อให้ meta description หน้าแรกตรงกับ `SITE.description`

---

## 4. AnswerBox ที่เพิ่ม / ปรับ

| หน้า | รายละเอียด |
|------|-------------|
| `/รับซื้อไอโฟนมือสอง/` | `<AnswerBox>` หลังย่อหน้าเปิด — คำถาม/คำตอบเรื่องเริ่มประเมินผ่านไลน์ + CTA ไป `/เช็คราคาไอโฟน/` |
| `/รับซื้อ-iphone/` | AnswerBox เรื่องข้อมูลที่ส่งในไลน์ + CTA ไป `/รับซื้อไอโฟน/` |
| `/ขายไอโฟน/` | AnswerBox เริ่มขายมือสอง + CTA `/เช็คราคาไอโฟน/` |
| `/ตีราคาไอโฟน/` | AnswerBox ตีราคา vs เช็คราคา + CTA `/เช็คราคาไอโฟน/` |
| Dynamic `src/pages/รับซื้อไอโฟน/[slug].astro` | ปรับ `aeoBySlug['ติด-icloud']` ให้เน้นตรวจความเป็นเจ้าของ, ออก Apple ID / ปิด Find My, ไม่สนับสนุนการปลดล็อกผิดกฎหมาย; เพิ่ม `locationAeoBySlug` สำหรับ **อุบลราชธานี, ขอนแก่น, อุดรธานี, นครราชสีมา** (นอกจาก กรุงเทพ / ปริมณฑล / ภาคอีสาน เดิม) |

หน้า `/เช็คราคาไอโฟน/` และ hub `/รับซื้อไอโฟน/` มี AnswerBox อยู่แล้วจากรอบก่อน

---

## 5. Internal links จาก blog ที่เพิ่ม / ขยาย

- เพิ่มหรือขยายบล็อก: `รับซื้อไอโฟนกรุงเทพภาคอีสาน`, `รับซื้อไอโฟนจอแตกแบตเสื่อม`, `เช็คราคาไอโฟนก่อนขาย`, `ส่งรูปประเมินราคาไอโฟนผ่านไลน์`, `ก่อนขายไอโฟนต้องล้างข้อมูลอย่างไร`
- อัปเดตบรรทัดลิงก์ท้ายบทความให้มีลิงก์ไป `/`, `/รับซื้อไอโฟน/`, `/เช็คราคาไอโฟน/`, `/ขายไอโฟน/`, `/รับซื้อ-iphone/`, `/รับซื้อไอโฟนมือสอง/`, `/ตีราคาไอโฟน/` และหน้าสภาพ/รุ่นตามบริบท (เช่น จอแตก, แบตเสื่อม, ติด iCloud, เปิดไม่ติด)

---

## 6. Asset / performance ที่ตรวจ

- **grep `dist` (HTML):** ไม่พบ `rubsue-notebook`, `โน๊ตบุ๊ค`, `Notebook`, `Gaming Notebook`
- **`public/images` และ `dist/images`:** ไม่พบไฟล์ขนาดเกิน **300 KB** ในการสแกนด้วย PowerShell (`Get-ChildItem … Where Length -gt 300KB`) — ไม่มีรายการต้องลดขนาดในรอบนี้
- **SVG จังหวัด:** รีเจนแล้ว ไม่มีข้อความโน๊ตบุ๊คบน OG/featured SVG

หมายเหตุ: ถ้าในเครื่องยังมีไฟล์รูปชื่อเก่าในโฟลเดอร์อื่น ให้ลบด้วยมือ — ใน repo ปัจจุบัน build ไม่ดึงสตริง `rubsue-notebook` ไปที่ HTML

---

## 7. Build

- คำสั่ง: `npm run build`
- ผล: **ผ่าน** — สร้าง **84 หน้า** static
- **sitemap:** `dist/sitemap-0.xml` มี `<loc>` **83** รายการ (หน้า static ที่ build รายงาน **84** รวมทั้ง `/404.html` ซึ่งมักไม่ถูกใส่ใน sitemap — ถือว่าครบตามที่คาด)
- **`src/config/site.ts` — `areaServed`:** ยังเป็น **7 รายการ** (กรุงเทพมหานคร, ปริมณฑล, ภาคอีสาน, อุบลราชธานี, ขอนแก่น, อุดรธานี, นครราชสีมา) — ไม่ได้ขยาย claim

---

## 8. สิ่งที่ควรทำต่อหลัง GSC เริ่มมีข้อมูล

1. ดู **Coverage / Page indexing** ว่ามีหน้าใดถูกเลือกเป็น “Discovered – currently not indexed” แล้วปรับ internal link หรือเนื้อหาเฉพาะหน้านั้น  
2. เปรียบเทียบ **Queries vs landing page** — ถ้ามี query สภาพเครื่องหรือ GEO ชัด ให้เสริม FAQ หรือ AnswerBox เฉพาะ slug นั้น (ไม่ต้องขยาย claim พื้นที่)  
3. ตรวจ **Core Web Vitals** บน URL จริง (LCP จาก hero) — ถ้า LCP ช้า ค่อยพิจารณา resize `hero-webuy-campaign` หรือ preload เฉพาะหน้าแรก  
4. เก็บ snapshot ราคา/สอบถามจากลูกค้าใน LINE เพื่อปรับ FAQ ให้ตรงคำถามจริง (AEO) แบบ iterative  

---

*สร้างรายงานอัตโนมัติหลังรัน build สำเร็จ — พ.ศ./ค.ศ. อ้างอิงจากวันที่ build ในเครื่องพัฒนา*
