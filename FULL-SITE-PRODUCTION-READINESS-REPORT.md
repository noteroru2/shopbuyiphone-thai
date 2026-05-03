# รายงานความพร้อม Production — ร้านรับซื้อไอโฟน.com

วันที่อ้างอิง: 1 พฤษภาคม 2026  
ขอบเขต: ตรวจและปรับในรอบล่าสุด + สถานะรวมจากโครงสร้างโปรเจกต์

---

## 1. หน้าแรกพร้อมใช้จริงหรือยัง

**โดยรวม: ใช้งาน production ได้** — มี H1 เดียวที่มีคำว่า «รับซื้อ» + «ไอโฟน» ติดกันในลำดับข้อความ, Hero ชัด, CTA LINE หลัก / โทรรอง / ลิงก์เช็คราคาเป็น tertiary, ไม่มีฟอร์มยาว, มี model grid (รวม iPhone 17 / 16), section สภาพ, ปัจจัยราคา, SEO editorial, LINE CTA, FAQ, GEO, final CTA, footer

**ปรับในรอบนี้:** microcopy ใต้ CTA ตรงตามที่กำหนดว่า *ส่งรูป iPhone 3–5 รูปผ่านไลน์ @webuy เพื่อประเมินราคาเบื้องต้น ไม่ต้องกรอกฟอร์ม*; ลดแถบ `LineCtaStrip` จาก 4 แถบเหลือ 2 แถบและลดความสูงแถบ; ปุ่ม LINE/โทรในท้ายหน้าใช้ `href` ชัดจาก `SITE`

---

## 2. ปรับหน้าแรกอะไรบ้าง (รอบล่าสุด)

- `Hero.astro`: ข้อความ microcopy ตามบรรทัดเดียวที่ brief; เพิ่ม `primaryHref` / `secondaryHref` ให้ปุ่ม LINE และโทร  
- `index.astro`: ลด `LineCtaStrip` เหลือ 2 จุด (หลัง ModelGrid และหลัง PriceFactors); `FinalCtaBanner` ใช้ลิงก์ LINE/โทรจาก config  
- `LineCtaStrip.astro`: ความสูง/padding เล็กลงเพื่อไม่รบกวนเนื้อหาบนมือถือ

---

## 3. ปรับหน้า service อะไรบ้าง

| หน้า | สถานะ |
|------|--------|
| `/เช็คราคาไอโฟน/` | **ปรับแล้วในรอบนี้:** `PageHero` (H1 เดียว), microcopy, `AnswerBox` (AEO), `LineCTA` แบบ compact, `RelatedLinks`, `FinalCtaBanner` ก่อน FAQ/ปัจจัยราคา — เนื้อหาเดิมส่วนใหญ่คงไว้ |
| `/รับซื้อไอโฟน/`, `/รับซื้อไอโฟนมือสอง/`, `/รับซื้อ-iphone/`, `/ขายไอโฟน/`, `/ตีราคาไอโฟน/` | **ยังไม่ได้ยกระดับให้เท่า `/เช็คราคาไอโฟน/`** (ยังไม่มี `PageHero` + `AnswerBox` + บล็อกท้ายแบบเดียวกัน) — แนะนำทำซ้ำแพทเทิร์นเดียวกับหน้าเช็คราคา |

---

## 4. ปรับหน้า model อะไรบ้าง

- หน้า model อยู่ภายใต้ `รับซื้อไอโฟน/[slug].astro` — มี `PageHero`, FAQ, related links ตามระบบเดิม  
- **รอบนี้ไม่ได้แก้เนื้อหา model แยกรายไฟล์** — `PageHero` รองรับ `primaryCtaHref` / `secondaryCtaHref` / `microcopy` แล้ว หากต้องการ microcopy เดียวกันทุก model สามารถส่ง prop เพิ่มใน `[slug].astro` ได้ในขั้นถัดไป

---

## 5. ปรับหน้า condition อะไรบ้าง

- ใช้ dynamic `[slug].astro` เดียวกับ model/condition — **รอบนี้ไม่ได้เปลี่ยน logic เงื่อนไข**  
- หากต้องการ `AnswerBox` แยกจากบล็อก AEO ปัจจุบัน สามารถ refactor เป็นคอมโพเนนต์เดียวกับหน้า service ได้

---

## 6. ปรับหน้า location / GEO อะไรบ้าง

- **รอบนี้ไม่ได้แก้ไฟล์ location โดยตรง** — หน้า GEO ยังถูก generate จาก `[slug].astro`  
- หน้าแรกและบล็อก GEO (`HomeGeoSection` ฯลฯ) ตรวจจากงานก่อนหน้าแล้วว่ามีกรุงเทพ ภาคอีสาน อุบล ขอนแก่น อุดร โคราช และลิงก์ `/พื้นที่ให้บริการ/`

---

## 7. ปรับ blog / FAQ อะไรบ้าง

- `blog/[slug].astro`: `Breadcrumbs` ใช้ `variant="light"` เพื่ออ่านง่ายบนพื้น cream  
- **รอบนี้ไม่ได้แก้ `blog/index` หรือ `/คำถามที่พบบ่อย/` โครงสร้างใหม่** — หากต้องการ `PageHero` เหมือนหน้า service ให้เพิ่มในขั้นถัดไป

---

## 8. CTA LINE ครบทุกหน้าหรือไม่

- หน้าแรก, dynamic slug, `LineCTA`, `FinalCtaBanner`, footer/sticky (ตามที่มีในโปรเจกต์) — **ครอบคลุมเชิง conversion**  
- หน้า service ที่ยังเป็นเลย์เอาต์เก่า: ยังมี `CTAButtons` แทรกในเนื้อหา — แนะนำเพิ่ม `LineCTA` กลาง/ท้ายให้สม่ำเสมอ

---

## 9. iPhone 16 / 17 ครบทุกจุดหรือไม่

- หน้าแรก title/description และ `ModelGrid` รองรับ iPhone 17 / 16  
- Footer (ตามงานก่อนหน้า) มีลิงก์รุ่น — **แนะนำตรวจซ้ำทุกครั้งที่เพิ่มหน้าใหม่**

---

## 10. ล้างคำเก่าอะไรออก

- สแกน `src` สำหรับคำต้องห้ามประเภทโน๊ตบุ๊ค / Notebook / `href="#"` ในรอบนี้ — **ไม่พบ**  
- คำว่า *ตัวอย่างข้อความที่ส่งเช็คราคา* ในหน้าเช็คราคาเป็น **เทมเพลตให้ลูกค้าคัดลอก** ไม่ใช่คำ dev ประเภท placeholder/mock

---

## 11. ตรวจ SEO / AEO / GEO แล้วหรือไม่

- **ServiceLayout** ยังใส่ breadcrumb + service + FAQ schema ตาม `faqs` ที่ส่งมา  
- หน้า `/เช็คราคาไอโฟน/`: FAQ ชุดเดิมคงไว้ — คำถามใน schema ต้องตรงกับ FAQ ที่แสดง (ตรวจแล้วชุดเดิมตรงกัน)  
- **llms.txt / robots / manifest / KEYWORD-MAP** — รอบนี้ไม่ได้แก้ไฟล์; แนะนำให้เจ้าของเว็บ review ให้ตรงแคมเปญล่าสุด

---

## 12. ผล `npm run build`

- **ผ่าน (exit code 0)** — สร้าง static ครบ 83 หน้า (ตาม log ล่าสุด), sitemap สร้างที่ `dist`

---

## 13. จุดที่เจ้าของเว็บควรเติมเอง

- รูปจริงเพิ่มเติม (ถ้าต้องการลดการพึ่ง fallback / hero เดิม)  
- รีวิวจริงจากลูกค้า (ห้ามรีวิวปลอม — ถ้ามีให้ใส่พร้อมแหล่งที่มา)  
- Google Business Profile, Search Console, แบ็กลิงก์คุณภาพ  
- ทำซ้ำแพทเทิร์น `/เช็คราคาไอโฟน/` ไปยัง service อื่น ๆ และ hub FAQ/Blog ให้สมบูรณ์ตาม brief  
- ตรวจ `public/llms.txt`, `robots.txt`, `KEYWORD-MAP.md` ให้มีคีย์ iPhone 17/16 และไม่มีบริการนอกขอบเขต

---

## สรุปคอมโพเนนต์ที่เพิ่ม/ขยายในรอบนี้

- `AnswerBox.astro` — กล่องคำตอบสั้น AEO  
- `PageHero.astro` — รองรับ `primaryCtaHref`, `secondaryCtaHref`, `microcopy`, ปุ่มโทรแบบรอง (`secondaryCompact`)  
- `CTAButtons.astro` — `primaryHref`, `secondaryHref`  
- `Breadcrumbs.astro` — `variant="light"` สำหรับพื้นสว่าง
