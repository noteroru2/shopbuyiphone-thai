# รายงาน Polish หน้าแรก — Black Gold Premium

โปรเจกต์: **ร้านรับซื้อไอโฟน.com**  
วันที่: 2026-05-01  
เป้าหมาย: ยกระดับความพรีเมี่ยม เน้น LINE CTA ลด decoration ที่หนาเกิน การ์ดแนว luxury mobile shop คง SEO/AEO/GEO ครบ

---

## 1. Hero (`src/components/Hero.astro`)

- เพิ่ม **halo สีทองฝั่งขวา** (radial + blur) และชั้น gradient ด้านล่างภาพ ให้ฝั่งขวาอ่านเป็น **campaign card**
- ห่อภาพด้วย **gradient frame บาง 1px** + กรอบ `border-gold-border/50` + **inset highlight** + shadow หลายชั้น + `drop-shadow` บนรูป
- ลด opacity ของ noise พื้นหลังเล็กน้อย
- **H1** ยังเน้นคำว่า **รับซื้อไอโฟน** (รับซื้อ + ไอโฟน gradient) ตามเดิม
- **Microcopy** ใต้ CTA ย่อเป็นประโยคเดียว: ส่งรูป 3–5 รูป ผ่านไลน์ — ประเมินเบื้องต้น — ไม่ต้องกรอกฟอร์ม (ตัดข้อความยาวที่ซ้ำกับ desktop chips)
- แถบจุดเด่น (desktop) บางลง เส้นคั่นโปร่งขึ้น; ลบบรรทัด micro แยกบนมือถือที่ซ้ำกับประโยคหลัก

---

## 2. CTA Bar ระหว่าง Section (`src/components/LineCtaStrip.astro`)

- **ความสูงลดลง**: `min-h-[42px]` / `py-2` แทนแถบสูงเดิม
- **ขอบบน–ล่าง** `border-gold-border/12` + พื้นหลังดำโปร่งขึ้น
- ปุ่ม LINE: **เงาเขียวอ่อน** + ขนาดตัวอักษร responsive; ข้อความเต็มตามสเปก
- **Desktop**: โทรเป็น **pill ขอบทอง** พร้อมข้อความ `โทร 0642579353`
- **Mobile**: ลิงก์โทรเป็น **pill เลขเบอร์** (ประหยัดพื้นที่) + `aria-label` ครบ; ไม่บัง sticky เพราะแถบเตี้ยลง

---

## 3. Divider / Decoration

- **ProcessSteps**: เส้นแนวนอน desktop บางลง (`via-gold-border/30`); เส้นต่อขั้นมือถือเป็น gradient แทนทึบ
- **PremiumLineCtaSection**: `border-y` จาก `/25` → **`/12`**
- **HomeAeoAnswerBlocks**: `border-t` บางลง; หัวข้อ `border-l-2`; accent ล่างการ์ดเป็น **h-px gradient** แทนแถบทองหนา
- **HomeEditorial / Blog**: ใช้ `border-gold-border/10`–`/20` และเงาเบาของกล่องแทนเส้นหนา

---

## 4. Model cards (`src/components/ModelGrid.astro`)

- พื้นการ์ด **off-white** `#faf9f6` แนว cream luxury
- **เส้น accent บนสุดบาง** (gradient gold) แทนแถบหนา
- **Hover**: shadow นุ่ม + border ทองชัดขึ้น; `min-h-[200px]` + **`mt-auto`** บน “ดูรายละเอียด” ให้การ์ดสูงเท่ากัน
- **iPhone 17**: badge **รุ่นใหม่** | **iPhone 16**: badge **ประเมินฟรี** + ข้อความ blurb สั้นลง
- ยังครบ 8 ซีรีส์: 17, 16, 15, 14, 13, 12, 11, SE + ลิงก์รุ่นอื่นด้านล่าง

---

## 5. Condition cards (`src/components/ConditionGrid.astro`)

- **ความสูงเท่ากัน** `min-h-[188px]`; border โปร่ง (`white/[0.08]`)
- **Hover glow** ทองบาง (`0_0_36px` แรงต่ำ)
- ย่อ **description** หลายการ์ด; **ติดรหัส / ติด iCloud** นำหน้าด้วย **“ต้องตรวจสอบความเป็นเจ้าของก่อนประเมิน”** และ chip “ตรวจเจ้าของก่อน”

---

## 6. SEO Editorial (`src/components/HomeEditorialSeoSection.astro`)

- หัว **ใหญ่ขึ้น** (`sm:text-[1.85rem]`) + **`border-l-2`** ทอง
- **prose** `leading-[1.75]`; กล่องขาวเงาเบา + ขอบบาง
- **บล็อกที่ 2**: ลิงก์ 3 แห่งรวมเป็น **กล่อง “ลิงก์ที่เกี่ยวข้อง”** บรรทัดเดียว (คง URL และ anchor เดิม)
- **บล็อกที่ 1**: เพิ่ม **ปุ่ม LINE** หลังเนื้อหา (จุดเดียว) — บล็อกอื่นคง CTA ตามเดิมที่เหมาะสม
- Aside: **ring ทองบาง** + shadow ลึกเล็กน้อย ให้อ่านเป็น premium summary

---

## 7. Blog cards (`src/components/HomeBlogGuides.astro`)

- พื้นภาพ: gradient ทอง–ดำหนักขึ้น + noise เบา
- **ป้าย “คู่มือ”** มุมซ้ายบนบนรูป
- ลบข้อความ “iPhone Guide” กลางรูป เหลือไอคอน + label เล็ก
- **หัวข้อ** `text-lg`–`xl` ชัดขึ้น; excerpt **line-clamp-2**; 3 การ์ด + ลิงก์ `/blog/`

---

## 8. Final CTA (`src/components/FinalCtaBanner.astro` + `index.astro`)

- การ์ดนอก: **gradient stroke** + glow ทองรอบกล่อง
- ภาพ: **กรอบ gradient 1px** + `ring` ทองบาง + drop-shadow บนรูป
- **Subtitle สั้นลง** (ส่งจาก `index.astro`)
- **`CTAButtons`**: prop ใหม่ **`secondaryCompact`** — ปุ่มโทรเล็กกว่าปุ่ม LINE (`src/components/CTAButtons.astro`)
- ข้อความรองล่างสุดเหลือ “แนะนำส่งรูป 3–5 รูป”
- บรรทัดย่อย H2 ใช้ `{SITE.lineHandle}`

---

## 9. Mobile QA

- **Horizontal scroll**: ยังอาศัย `overflow-x: hidden` ใน `global.css` (งานก่อนหน้า)
- **Sticky CTA**: `main` มี `pb-32` ใน `BaseLayout` — แถบระหว่าง section เตี้ยลงช่วยไม่ให้รู้สึกอึด
- ปุ่ม LINE ในแถบและ Hero ยัง **แตะง่าย** (min-height เดิมใน Hero CTAs)

---

## 10. ผล `npm run build`

```text
✓ Completed — 83 page(s) built
Exit code: 0
```

---

## ไฟล์ที่แก้หลัก

| ไฟล์ |
|------|
| `src/components/Hero.astro` |
| `src/components/LineCtaStrip.astro` |
| `src/components/ProcessSteps.astro` |
| `src/components/ModelGrid.astro` |
| `src/components/ConditionGrid.astro` |
| `src/components/HomeEditorialSeoSection.astro` |
| `src/components/HomeBlogGuides.astro` |
| `src/components/HomeAeoAnswerBlocks.astro` |
| `src/components/FinalCtaBanner.astro` |
| `src/components/PremiumLineCtaSection.astro` |
| `src/components/CTAButtons.astro` |
| `src/pages/index.astro` |

---

## ข้อจำกัดที่ปฏิบัติตาม

- ไม่ลบเนื้อหา SEO สำคัญ / ไม่เพิ่มฟอร์มยาวหน้าแรก / ไม่ใช้โลโก้ Apple official / ไม่แอบอ้างศูนย์ Apple  
- ไม่เพิ่มคำต้องห้าม (โน๊ตบุ๊ค, placeholder, ฯลฯ) ในโค้ดที่แก้
