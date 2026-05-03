# Black Gold Final Polish — รายงานสรุป (ร้านรับซื้อไอโฟน.com)

รอบนี้ปรับ **UI/UX, hierarchy สีพื้น/section, CTA, spacing, editorial blocks, footer** และตรวจคีย์เวิร์ดหลักในโค้ด `src` ให้สอดคล้องกับเป้าหมาย **แอดไลน์ @webuy เป็นหลัก** โดยไม่ลดทอน SEO สำคัญ

---

## 1. ปรับ Hero อะไรบ้าง

- จัดเลย์เอาต์แบบ **48% / 52%** โดยใช้ `lg:grid-cols-[minmax(0,12fr)_minmax(0,13fr)]` ให้ฝั่งภาพกว้างขึ้นเล็กน้อย
- เพิ่ม **glow ทอง + เงาแคมเปญ** รอบการ์ดภาพ และย่อสเกลภาพเล็กน้อยบนจอใหญ่ให้ดูเป็น premium banner
- ใส่ **radial gold อ่อน** หลังบล็อกหัวข้อ (ไม่ทับตัวหนังสือ)
- H1 คงข้อความ **รับซื้อไอโฟน / ให้ราคาดี จ่ายเงินไว** — ปรับคลาส `text-gradient-gold` ใน `global.css` ให้นุ่มลง ไม่แวววาวเกิน
- Subheading หน้าแรก **สั้นลง** (ประมาณ 2 บรรทัดบนเดสก์ท็อป)
- Micro trust: เดสก์ท็อปแสดง **4 ข้อแยกด้วยเส้นแบ่งบาง**; มือถือแสดง **บรรทัดเดียวย่อ**
- CTA: ลิงก์ tertiary **ตัวเล็กลง** (`tertiaryCompact` ใน `CTAButtons.astro`)

---

## 2. ปรับ CTA LINE อะไรบ้าง

- `LineCtaStrip.astro`: แถบ **ดำบาง** สูงไม่เกิน ~52px, ปุ่ม LINE เขียวชิดขวา, โทรเป็น **ลิงก์ทอง** (ซ่อนบนมือถือเล็กเพื่อไม่ให้แออัด — ยังมี Sticky bar โทรอยู่)
- `CTAButtons.astro`: โหมด `lg` ปุ่ม LINE **ใหญ่และมีเงาเขียวอ่อน**; ปุ่มโทร **เล็กลงเล็กน้อย** เพื่อ hierarchy
- `PremiumLineCtaSection.astro`: checklist เป็น **✓ สีทอง**, ปุ่ม LINE เน้นใหญ่กว่าโทร, microcopy รวมเรื่อง **3–5 รูป** และคิว

---

## 3. ปรับ section ไหนให้ดู premium ขึ้น

- **`global.css`**: เพิ่ม token **Warm Cream / Soft Cream / Slate muted**, ปรับ `--color-dark-card` เป็น `#1B1B1F`, utility `bg-section-warm` / `bg-section-cream`
- **`TrustBadges`**: รายการตามสเปก (ประเมินฟรี / ส่งรูป LINE / หลายรุ่น / จ่ายเงินไว), คำอธิบายสั้น สี `text-slate-muted`, เส้นแบ่ง `divide` บาง
- **`ProcessSteps`**: timeline ทองไล่ระดับ, ระยะ step กว้างขึ้น, CTA ล่างเป็น **แอดไลน์ … เพื่อเริ่มประเมินราคา**
- **`ModelGrid`**: พื้น **warm cream**, การ์ด **ขาวทั้งหมด** + เส้น accent ทองด้านบน, iPhone 17/16 มี **สอง badge** (รุ่นใหม่ / ประเมินฟรี)
- **`ConditionGrid`**: grid **สูงเท่ากัน** (`auto-rows-fr` + `h-full`)
- **`PriceFactors` / `HomeEditorial` / `HomeBlogGuides` / `FAQ` / `ServiceAreas`**: สลับพื้น **cream / warm** ลดความรู้สึก “ดำยาวต่อเนื่อง”
- **`HomeBlogGuides`**: เหลือ **3 การ์ด**, การ์ดใหญ่ขึ้น, พื้นภาพเป็น **dark + gold + ข้อความ iPhone** (ไม่ใช้คำว่า placeholder)
- **`HomeHubLinks`**: ย้ายมาพื้น **warm + การ์ดขาว** แทนแถบดำกลางหน้า
- **`FAQ`**: `max-width: 900px`, accordion **เรียบ** ลดกรอบซ้อน
- **`FinalCtaBanner`**: คอลัมน์ขวา **กว้างขึ้นเล็กน้อย**, glow หลังแบนเนอร์, ตัดคำบรรยายใต้รูปให้สั้น

---

## 4. เพิ่ม/ตรวจ iPhone 16 และ iPhone 17 แล้วหรือยัง

- **มีอยู่แล้ว**: `src/content/models/iphone-16.md`, `iphone-17.md` และ route `/รับซื้อไอโฟน/iphone-16/`, `/รับซื้อไอโฟน/iphone-17/` (build ผ่าน)
- **`ModelGrid`**: ลำดับและลิงก์ตรงตามสเปก พร้อม badge สำหรับ 17/16
- **`Footer`**: เพิ่มลิงก์ **iPhone 11 / iPhone SE** และรวมคอลัมน์เป็น **พื้นที่ / ติดต่อ** คอลัมน์เดียว

---

## 5. ลบฟอร์มหรือยังไม่มีฟอร์มหน้าแรกใช่ไหม

- **หน้าแรก (`index.astro`) ไม่มีฟอร์ม** — ยังคงเน้น LINE / โทรตามเดิม (ตรงตามข้อกำหนด “ห้ามมี input form ในหน้าแรก”)

---

## 6. ล้างคำเก่าอะไรออก

- ค้นใน **`src` ทั้งหมด** (รูปแบบเดียวกับที่ระบุ: โน๊ตบุ๊ค, Notebook, placeholder, TODO, lorem, dummy ฯลฯ): **ไม่พบ**ในโค้ด production
- หมายเหตุ: ไฟล์เอกสารเก่าใน repo (เช่น `README.md`) อาจยังมีคำประวัติโปรเจกต์ — **ไม่ถูก build เป็นหน้าเว็บ**

---

## 7. ผล `npm run build`

- รัน **`npm run build`** สำเร็จ (ไม่มี error), สร้าง **83 หน้า** static + sitemap

---

## 8. จุดที่เจ้าของเว็บควรใส่รูปจริงเพิ่ม (ถ้าต้องการ)

- **Hero WebP** — ถ้ามีภาพแคมเปญใหม่ความละเอียดสูง จะยิ่งดู flagship
- **Final CTA WebP** — แบนเนอร์ conversion ควรอัปเดตเป็นไฟล์ล่าสุดจากทีมดีไซน์
- **บทความใน `HomeBlogGuides`** — ตอนนี้ใช้ fallback แบบ dark/gold + ข้อความ iPhone; ถ้ามี `featuredImage` ใน frontmatter ของบทความสามารถต่อยอดให้ดึงรูปจริงได้ในรอบถัดไป

---

*อัปเดตล่าสุด: ตามงาน Black Gold Final Polish — เน้น LINE @webuy เป็นช่องทางหลัก — สมดุลพื้นสว่าง/มืดและ readability*
