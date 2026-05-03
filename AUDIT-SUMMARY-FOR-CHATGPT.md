# สรุป Audit สำหรับส่งให้ ChatGPT ประเมินต่อ — ร้านรับซื้อไอโฟน.com

**วันที่:** 2026-05-01 · **รอบ:** audit only (ไม่แก้โค้ด) · **รายงานเต็ม:** `SEO-AEO-GEO-AUDIT-SCORE.md`

---

## 1) คะแนนรวม (เต็ม 100)

| หมวด | คะแนน |
|------|--------|
| SEO Overall | 84 |
| AEO | 82 |
| GEO / Local | 78 |
| Technical SEO | 88 |
| Performance readiness | 74 |
| Content quality | 83 |
| Internal linking | 84 |
| Schema | 80 |
| Conversion / LINE CTA | 90 |
| Mobile UX (โครง source) | 82 |

---

## 2) npm run build

- **ผ่าน** (exit 0) · **84 หน้า** · **ไม่มี route fail** · **ไม่มี error/warning สำคัญจาก CLI**  
- Sitemap: `sitemap-index.xml` → `sitemap-0.xml` (host เป็น punycode ตาม IDN)

---

## 3) P0 / P1 ที่สำคัญที่สุด

**P0 (trust / local accuracy)**  
- `LocalBusiness` / `Service` ใช้ `areaServed` เป็น array จังหวัดจำนวนมาก — ถ้าบริการจริงไม่ครอบคลุมทุกจังหวัดใน list อาจถือเป็น **ข้อมูลท้องถิ่นเกินจริง**  

**P1 (สะอาดแบรนด์ + on-page)**  
- ใน `dist/images` มีไฟล์ **`rubsue-notebook-*.webp`** ขนาดใหญ่ **ไม่ถูกอ้างใน HTML** (ซากโปรเจกต์เก่า) — ควรลบจาก `public/`  
- Title หน้าแรก **ยาวมาก**  
- H1 หน้าแรกไม่มีคำว่า “รับซื้อไอโฟน” แบบตรง ๆ (ใช้ “ไอโฟน” + คำนำ)  
- หน้า `ตีราคาไอโฟน` มีหัวข้อ **"Internal links"** เป็นภาษาอังกฤษ  

---

## 4) หน้า / keyword ที่ “ไม่มี” หรือ “ไม่ตรง URL เดี่ยว”

- **ไม่มีหน้าแยก slug:** `ประเมินราคาไอโฟน` — ใน `KEYWORD-MAP.md` ชี้ไปคู่ **`/เช็คราคาไอโฟน/` + `/ตีราคาไอโฟน/`** (รับได้ แต่ต้องรับความเสี่ยง SERP)  
- **ขายไอโฟนมือสอง:** รวมที่ **`/ขายไอโฟน/`** ตามแผน  

**หน้าที่ผู้ใช้ระบุ:** ตรวจจาก build log — **มีครบ** (รวม model 11–17, SE, condition, location ที่ระบุ, `/blog/`, `/คำถามที่พบบ่อย/`, `/พื้นที่ให้บริการ/`)

---

## 5) Schema

- มี Organization, LocalBusiness, WebSite, WebPage, BreadcrumbList, Service, FAQPage (+ BlogPosting ใน blog)  
- **ไม่พบ** review/rating/price ปลอมใน JSON-LD ตัวอย่าง  
- **ประเด็น:** ยิง Organization+LocalBusiness **ทุกหน้า** — redundancy / ขนาด HTML ใหญ่ขึ้น  

---

## 6) Performance (จาก dist)

- Hero มี WebP + width/height + fetchpriority — ดี  
- มี PNG ~170KB และ **ไฟล์ webp ชื่อ notebook ที่ไม่ถูกใช้** — ลดคะแนน  

---

## 7) Internal links / trust scan

- `src` **ไม่มี** โน๊ตบุ๊ค / Notebook / placeholder / TODO / lorem ตามที่สแกน  
- **เอกสาร .md เก่าใน repo** (ไม่ใช่หน้า production) ยังมีคำโน๊ตบุ๊ค — เก็บเป็นประวัติโปรเจกต์  

---

## 8) คำถามที่อยากให้ ChatGPT ช่วยตัดสินใจต่อ

1. **`areaServed` ควรเหลือเฉพาะจังหวัดที่รับจริง** หรือใช้ระดับภาค + disclaimer อย่างเดียวเพื่อลดความเสี่ยง spam/geo?  
2. ควร **แยก title/H1** ระหว่าง `/` และ `/รับซื้อไอโฟน/` อย่างไรให้ลด cannibalization แต่ไม่เสีย CTR?  
3. ควรสร้าง **หน้าเดี่ยว “ประเมินราคาไอโฟน”** หรือใช้ canonical จากหน้าเช็คราคาไปตีราคา?  
4. **ลบรูป legacy ชื่อ notebook** จาก CDN/repo มีผลต่อ SEO/trust หรือไม่ (แม้ไม่อ้างใน HTML)?  
5. จากข้อมูลนี้ **ควร submit GSC แบบ URL prefix ไทยหรือ punycode** property ใดเป็นหลัก?  

---

## 9) คำสั่งสั้น ๆ ให้ ChatGPT

> ช่วยอ่านไฟล์ `SEO-AEO-GEO-AUDIT-SCORE.md` คู่กับสรุปนี้ แล้วให้ (ก) ลำดับความสำคัญแก้ไข (ข) ความเสี่ยงด้าน Google Search / Spam / Misrepresentation (ค) แผน 30 วันสำหรับ EEAT + GBP + CWV โดยอิงข้อมูลจริงของธุรกิจ
