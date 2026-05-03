# รายงานตรวจสอบ SEO / AEO / GEO / Technical / Performance / Content  
**โปรเจกต์:** ร้านรับซื้อไอโฟน.com  
**วันที่ตรวจ:** 2026-05-01  
**ผู้ตรวจ (บทบาทจำลอง):** Senior Technical SEO Auditor + AEO/GEO Specialist + Astro Performance Engineer  
**ขอบเขต:** อ่าน source + `dist/` หลัง build + `KEYWORD-MAP.md` + `public/` (robots, llms, manifest) — **ไม่แก้ไขโค้ด production ในรอบนี้**

---

## 1) ผลการรัน `npm run build`

| รายการ | ผลลัพธ์ |
|--------|---------|
| **สถานะ** | **ผ่าน (exit code 0)** |
| **Error / Warning จาก CLI** | ไม่พบ error หรือ warning จาก Astro/Vite ในบันทึกการ build รอบนี้ |
| **จำนวนหน้า (routes)** | **84 หน้า** สร้าง static HTML สำเร็จ |
| **Route ที่ fail** | **ไม่มี** (ทุก route ใน log สร้างสำเร็จ) |
| **Sitemap** | `@astrojs/sitemap` สร้าง `sitemap-index.xml` + `sitemap-0.xml` ใน `dist/` |
| **หมายเหตุโดเมนใน sitemap** | `sitemap-index.xml` ชี้ `loc` เป็น **Punycode** (`xn--...`) ซึ่งเป็นเรื่องปกติของ IDN — ควรตรงกับโดเมนที่ลงทะเบียนใน Search Console |

---

## 2) คะแนนรวม (เต็ม 100 ต่อหมวด)

| หมวด | คะแนน | สรุปสั้น |
|--------|--------|-----------|
| **SEO Overall Score** | **84** | โครงสร้าง keyword / URL / on-page แข็งแรง มีจุดปรับ title/ความซ้ำเล็กน้อย |
| **AEO Score** | **82** | FAQ + โครงคำตอบชัด มี `llms.txt` — บางหน้ายังไม่มี Answer box |
| **GEO / Local SEO Score** | **78** | หน้า GEO จำนวนมากและมีเนื้อหาเฉพาะที่ — `areaServed` ใน schema กว้างมาก (เสี่ยง over-geo) |
| **Technical SEO Score** | **88** | canonical, trailing slash, robots+sitemap, 404 noindex ครบ |
| **Performance Readiness Score** | **74** | Hero มี WebP + dimension + fetchpriority — แต่มี **ไฟล์รูปชื่อ legacy ขนาดใหญ่** ใน `dist/images` ที่ไม่ถูกอ้างใน HTML (ของเสียต่อแบนด์วิดท์) |
| **Content Quality Score** | **83** | ไม่พบคำต้องห้ามหลักใน `src` — มีคำนำเชิงการตลาดอ่อน และหัวข้อภาษาอังกฤษบางจุด |
| **Internal Linking Score** | **84** | Hub + service + pillar แข็ง — มีหัวข้อ "Internal links" เป็นภาษาอังกฤษบนหน้า `ตีราคาไอโฟน` |
| **Schema Score** | **80** | ครบหลายชนิด — ทุกหน้า BaseLayout ยิง Organization+LocalBusiness+WebSite+WebPage ซ้ำ (ไม่ผิดแต่ควรทราบผลต่อ validator/ความซ้ำ) |
| **Conversion / LINE CTA Score** | **90** | LINE `@webuy` + `tel:0642579353` สม่ำเสมอ มี sticky mobile CTA |

### คำตอบคำถามเชิงธุรกิจ

- **พร้อม deploy จริงหรือยัง:** **พร้อม** (build ผ่าน โครง SEO พื้นฐานครบ)  
- **พร้อมส่ง Google Search Console หรือยัง:** **พร้อม** — แนะนำยืนยันโดเมน + ส่ง sitemap + ตรวจ URL ภาษาไทย / punycode ให้ตรง property  
- **จุดเสี่ยงอันดับตก:** ความใกล้เคียงของ intent ระหว่าง `/` กับ `/รับซื้อไอโฟน/` และ blog กับหน้า condition/model (จัดการด้วย title/H1 + internal link ตาม KEYWORD-MAP ต่อไป)  
- **ควรแก้ก่อน index (P0/P1):** ลดความเสี่ยง **over-claim GEO** ใน `areaServed`, ทบทวนคำนำ **"ให้ราคาดี"**, ลบ/ย้าย **รูป `rubsue-notebook-*`** ออกจาก `public/` ถ้าไม่ใช้ (ไม่ใช่ข้อความโน๊ตบุ๊คใน UI แต่ชื่อไฟล์ยังสื่อโปรเจกต์เก่า)  
- **แก้ภายหลัง (P2/P3):** Field data CWV, รีวิวจริง/GBP, รูปโลโก้เฉพาะแทน SVG hero เป็น logo ใน schema หากต้องการความเข้มข้นของแบรนด์

---

## 3) ตารางคะแนนละเอียด + Priority

| Category | Score /100 | Status | Main Issues | Priority |
|----------|------------|--------|-------------|----------|
| SEO Keyword Coverage | 86 | Good | intent "ประเมินราคาไอโฟน" ไม่มี URL เดี่ยว — ใช้คู่เช็คราคา/ตีราคา | P2 |
| Technical SEO | 88 | Excellent | sitemap ใช้ punycode — ต้องจับคู่ GSC ให้ถูก property | P2 |
| On-page SEO | 83 | Good | title หน้าแรกยาวมาก; H1 หน้าแรกไม่มีคำว่า "รับซื้อไอโฟน" ตรง ๆ (ใช้คำว่า "ไอโฟน" + gradient) | P1 |
| Internal Linking | 84 | Good | หัวข้อภาษาอังกฤษบนหน้า `ตีราคาไอโฟน` | P2 |
| Content Quality | 83 | Good | "ให้ราคาดี" / "ดีที่สุด" (บริบท) — ไม่พบอ้าง Apple เป็นศูนย์ทางการ | P1–P2 |
| AEO Readiness | 82 | Good | AnswerBox มีบางหน้า — ขยายไปหน้า service อื่นได้ | P2 |
| GEO / Local SEO | 78 | Needs Improvement | เนื้อหา GEO ดี แต่ schema `areaServed` กว้างเกินพฤติกรรม “รับถึงที่ทุกที่” ถ้าไม่เป็นจริง | P0–P1 |
| Schema | 80 | Good | Organization+LocalBusiness ซ้ำทุกหน้า; ไม่พบ review/aggregateRating ปลอม | P2 |
| Performance | 74 | Needs Improvement | ไฟล์ `rubsue-notebook-*.webp` ใหญ่ใน dist แต่ไม่ถูกอ้างใน HTML | P1 |
| Mobile UX | 82 | Good | `pb-32` + sticky CTA — โครงสร้างรองรับมือถือ; ต้องทดสอบจริงบนอุปกรณ์ | P2 |
| Conversion / LINE CTA | 90 | Excellent | CTA ชัด มี microcopy ส่งรูป | P3 |
| Trust / Safety | 88 | Good | ข้อความ iCloud/ติดรหัส เน้นตรวจเจ้าของ ไม่สอน bypass (จากตัวอย่างหน้าแรก) | P2 |

**Status คำอธิบาย:** Excellent ≥85 · Good 75–84 · Needs Improvement 65–74 · Critical &lt;65 (ไม่มีหมวด Critical ในรอบนี้)

---

## 4) ตรวจ SEO Keyword Coverage

อ้างอิง **`KEYWORD-MAP.md`** และโครง `src/pages` + build output  

**เกณฑ์ในตาราง:**  
- **Page Exists:** มี HTML ใน `dist` จาก build ล่าสุด  
- **Title / H1:** สุ่มตรวจจาก `dist` / source pattern — หน้าหลักใช้ title ยาวและ H1 แบบ branding  

### ตาราง Keyword → URL (สรุปหลัก)

| Keyword | Target URL (ตาม KEYWORD-MAP) | Page Exists | Title มี Keyword | H1 มี Keyword | Internal Links (โครงรวม) | Score | Notes |
|---------|------------------------------|-------------|-------------------|----------------|---------------------------|-------|-------|
| รับซื้อไอโฟน | `/` | ✅ | ✅ (ใน title) | ⚠️ บางส่วน (H1 เน้น "ไอโฟน") | มาก (เมนู+บอดี้) | 84 | Money page หลักตามแผน |
| รับซื้อไอโฟนทุกรุ่น | `/รับซื้อไอโฟน/` | ✅ | ✅ | ✅ | มาก | 88 | Hub ชัด |
| รับซื้อไอโฟนมือสอง | `/รับซื้อไอโฟนมือสอง/` | ✅ | ✅ | ✅ | มาก | 88 | |
| รับซื้อ iPhone | `/รับซื้อ-iphone/` | ✅ | ✅ | ✅ | มาก | 87 | |
| ขายไอโฟน | `/ขายไอโฟน/` | ✅ | ✅ | ✅ | มาก | 86 | |
| ขายไอโฟนมือสอง | `/ขายไอโฟน/` | ✅ | รวม intent | รวม intent | มี | 82 | ไม่แยก URL — ตั้งใจตาม KEYWORD-MAP |
| เช็คราคาไอโฟน | `/เช็คราคาไอโฟน/` | ✅ | ✅ | ✅ | มาก | 88 | มี AnswerBox |
| ตีราคาไอโฟน | `/ตีราคาไอโฟน/` | ✅ | ✅ | ✅ | มาก | 85 | มีบล็อก internal links ภาษาอังกฤษ |
| ประเมินราคาไอโฟน | `/เช็คราคาไอโฟน/` + `/ตีราคาไอโฟน/` | ✅ (คู่) | ✅ | ✅ | มี cross-link | 78 | **ไม่มีหน้า slug เดี่ยว** — ใช้สอง intent |
| รับซื้อ iPhone 17–11, SE | `/รับซื้อไอโฟน/iphone-*` | ✅ | ✅ | ✅ | จาก hub + หน้าแรก | 88 | รวม pro-max, xs-xr เสริม |
| รับซื้อไอโฟนจอแตก / แบตเสื่อม / เปิดไม่ติด / ติด iCloud / ติดรหัส / Face ID / ฝาหลังแตก / เครื่องนอก / ศูนย์ไทย | `/รับซื้อไอโฟน/{slug}/` | ✅ | ✅ | ✅ | มาก | 88 | slug ตรง KEYWORD-MAP |
| รับซื้อไอโฟนกรุงเทพ / ปริมณฑล / ภาคอีสาน / อุบล / ขอนแก่น / อุดร / โคราช | `/รับซื้อไอโฟน/{slug}/` | ✅ | ✅ | ✅ | เชื่อม hub พื้นที่ | 86 | จังหวัดอื่นในโฟลเดอร์มีเพิ่มจาก template |

**สรุป coverage**

- **มีหน้าแล้ว:** keyword หลัก/รองในตารางผู้ใช้ **ครบเกือบทั้งหมด** ตามแผน KEYWORD-MAP  
- **ยังไม่มีหน้าเฉพาะ:** **"ประเมินราคาไอโฟน"** เป็น URL เดี่ยว — ใช้คู่หน้าเช็คราคา/ตีราคาแทน (ไม่ผิด แต่ต้องรับความเสี่ยงค้นหา generic)  
- **เนื้อหาบาง (เทียบ pillar):** บางหน้ารองอาจบางกว่า money pillar — ไม่ได้วัดทุกไฟล์ในรอบนี้  
- **Cannibalization:** ดูส่วน 5  
- **ควรเพิ่ม internal link:** หน้า blog รอง → money/service ตาม KEYWORD-MAP (ตรวจเป็นชุดใน P2)

---

## 5) ตรวจหน้าเป้าหมาย (สรุปเป็นตารางกลุ่ม + ตัวอย่างลึก)

เนื่องจากมี 84 หน้า — รายงานนี้ยืนยัน **ทุก URL ที่ผู้ใช้ระบุมีใน build log** และสุ่มอ่าน `dist/index.html`, `dist/รับซื้อไอโฟน/อุบลราชธานี/index.html` เพื่อยืนยัน meta + schema + H1

### ตารางสรุปกลุ่มหน้า

| URL กลุ่ม | Exists | Title+Meta+Canonical | H1 เดียว | FAQ | Schema | CTA LINE+โทร | หมายเหตุ |
|-----------|--------|----------------------|----------|-----|--------|--------------|----------|
| `/` | ✅ | ✅ | ✅ | ✅ (FAQPage ใน JSON-LD) | Organization+Local+Web+WebPage+FAQ | ✅ | Title ยาวมาก |
| `/รับซื้อไอโฟน/` | ✅ | ✅ | ✅ | ✅ | ชุด Base + FAQ/Service ตามหน้า | ✅ | Hub pillar ยาว |
| Service `/รับซื้อไอโฟนมือสอง/` `/รับซื้อ-iphone/` `/ขายไอโฟน/` `/เช็คราคาไอโฟน/` `/ตีราคาไอโฟน/` | ✅ | ✅ | ✅ | ✅ (ส่วนใหญ่) | Service+Breadcrumb+FAQ ตาม layout | ✅ | เช็คราคามี AnswerBox |
| Model `/รับซื้อไอโฟน/iphone-11/` … `iphone-17/`, `iphone-se/` | ✅ | ✅ | ✅ | ตามแต่ละหน้า | ✅ | ✅ | build รวม `iphone-16` `iphone-17` |
| Condition slugs ตามที่ระบุ | ✅ | ✅ | ✅ | ตามหน้า | ✅ | ✅ | รวม `face-id-เสีย` |
| Location ที่ระบุ | ✅ | ✅ | ✅ | ตัวอย่างอุบลมี FAQ ยาว | ✅ | ✅ | เนื้อหาเฉพาะจังหวัด |
| `/พื้นที่ให้บริการ/` `/คำถามที่พบบ่อย/` `/blog/` | ✅ | ✅ | ✅ | บางหน้า | ✅ | ✅ | blog มี RSS |

### ตารางตัวอย่าง “ละเอียด” (โหมด audit — ใช้เกณฑ์เดียวกันทุกหน้า)

| URL | Exists | Title (สรุป) | Meta | H1 | Word Count (โดยประมาณ) | CTA | FAQ | Schema | Internal Links | Score | Issues |
|-----|--------|--------------|------|-----|-------------------------|-----|-----|--------|----------------|-------|--------|
| `/` | ✅ | ยาว มี iPhone 17/16 + GEO | ครบ | แบ่งบรรทัด “ไอโฟน” ไม่มีคำว่า “รับซื้อ” ใน H1 ตรง ๆ | ~สูงมาก (ไฟล์ HTML ~140KB) | ชัดเจน | มี | FAQPage+ชุดมาตรฐาน | มาก | 84 | Title ยาว; soft claim “ให้ราคาดี” |
| `/รับซื้อไอโฟน/อุบลราชธานี/` | ✅ | มี keyword จังหวัด | ครบ | มี “รับซื้อไอโฟนอุบลราชธานี” | ~สูง (เนื้อหา prose ยาว) | ชัด | หลายข้อ | FAQ+Service+Breadcrumb | มีลิงก์ภาค/ฮับ | 88 | `areaServed` ใน Service ยังเป็น array ใหญ่ของทั้งประเทศ |

**หมายเหตุการนับคำ:** Word count ใช้ **ประมาณการจากขนาด HTML + โครงสร้างเนื้อหา** ไม่ได้รัน tokenizer บนทุกหน้าในรอบนี้  

**index / noindex:** `404.html` ใช้ `noindex` ✅  

**รูป alt:** ตัวอย่าง hero หน้าแรกมี `alt` ยาวและมี @webuy + เบอร์ ✅  

**mobile layout risk:** sticky CTA + `pb-32` — ออกแบบมาเพื่อไม่บังเนื้อหา แต่ควรทดสอบ CLS บนมือถือจริง  

---

## 6) Cannibalization

| คู่ที่เสี่ยง | Keyword ที่ชน | Primary ที่แนะนำ | แนวทาง |
|--------------|----------------|------------------|--------|
| `/` vs `/รับซื้อไอโฟน/` | “รับซื้อไอโฟน” / “ทุกรุ่น” | `/` = money หลัก · `/รับซื้อไอโฟน/` = hub รุ่น/สภาพ | คงตาม KEYWORD-MAP — ตรวจ internal link ให้ hub รับลิงก์จาก blog มากกว่าแย่ง H1 เดียวกับ `/` |
| `/เช็คราคาไอโฟน/` vs `/ตีราคาไอโฟน/` | เช็คราคา vs ตีราคา | แยก intent ชัดใน title (ปัจจุบันทำได้ดี) | เพิ่มลิงก์ข้ามแบบสั้นใน intro ทั้งสองฝั่ง |
| `/รับซื้อไอโฟนมือสอง/` vs `/รับซื้อ-iphone/` | มือสอง vs iPhone EN | แยกตามภาษา/กลุ่มผู้ใช้ | คงสองหน้า — หลีกเลี่ยง duplicate ย่อหน้าเปิด |
| Model/Blog | “จอแตกขายได้ไหม” ฯลฯ | **หน้า condition เป็น primary** · blog เป็น support | blog ควรลิงก์ขึ้น condition + เช็คราคา |
| Location hub vs จังหวัด | “ภาคอีสาน” vs จังหวัด | hub ภาค + จังหวัดละหน้า | ลดประโยคที่ฟังเหมือนรับทุกตำบล |

---

## 7) Internal Linking / Hub Structure

**จุดแข็ง**

- เมนูหลัก + mega patterns เชื่อม `/`, `/รับซื้อไอโฟน/`, `/เช็คราคาไอโฟน/`, `/พื้นที่ให้บริการ/`, `/blog/`  
- หน้าแรกมี grid รุ่น + สภาพ + GEO strip  
- `KEYWORD-MAP.md` เป็น “สัญญา” internal linking ที่ดี

**จุดอ่อน / สิ่งที่พบ**

- **ลิงก์เสียจาก pattern `href="#"` / `href=""`:** ไม่พบใน `src` (grep)  
- **ลิงก์ไปโน๊ตบุ๊คใน production UI:** ไม่พบใน `src`  
- **Orphan asset:** รูป `rubsue-notebook-*.webp` อยู่ใน `dist/images` แต่ **ไม่พบการอ้างอิงใน `dist/*.html`** — เป็นภาระ deploy และอาจทำให้ผู้ audit คนอื่นตีความผิด  
- **หัวข้อภาษาอังกฤษ:** `ตีราคาไอโฟน` มี `<h2>Internal links</h2>` — ไม่ใช่ broken link แต่เสียความเป็นไทย/AEO เล็กน้อย  

**Hub strength score:** **84/100**

---

## 8) AEO / Answer Engine

**พบแล้ว**

- `public/llms.txt` — อธิบายบริการ iPhone, LINE, GEO หลัก, หน้าสำคัญ, ข้อควรทราคา (ไม่ใช่ Apple ทางการ) ✅  
- FAQ หลายหน้า + JSON-LD FAQPage บนหน้าแรกและ location ตัวอย่าง ✅  
- `AnswerBox` บน `/เช็คราคาไอโฟน/`, `/รับซื้อไอโฟน/` ✅  
- โครงถาม-ตอบสั้นใน bullet/ขั้นตอน (หน้าแรก + location) ✅  
- คำถาม iCloud/ติดรหัส: ข้อความหน้าแรกเน้นตรวจเจ้าของ ไม่สอน bypass ✅  

**คำถาม AEO ที่ผู้ใช้ระบบ — mapping เบื้องต้น**

| คำถาม | พบในหน้าเว็บ / FAQ / Blog |
|--------|---------------------------|
| รับซื้อไอโฟนรุ่นไหนบ้าง | ✅ หน้าแรก + hub |
| เช็คราคาไอโฟนฟรีไหม | ✅ หลายหน้า |
| ขายไอโฟนต้องเตรียมอะไร | ✅ บทความ + หน้าขาย |
| ไอโฟนจอแตก/แบตเสื่อม/เปิดไม่ติด/ติด iCloud | ✅ condition + blog |
| ออกจาก Apple ID | ✅ FAQ |
| เครื่องศูนย์ไทย vs นอก | ✅ blog + หน้าเครื่อง |
| ส่งรูปผ่านไลน์ | ✅ หลายหน้า + llms.txt |

**คะแนนย่อย AEO:** clarity 84 · FAQ coverage 86 · structured format 82 · llms.txt 88 · safety 90  

---

## 9) GEO / Local SEO

| Location Keyword | URL | Exists | Local Content Quality | Nearby Links | CTA | Duplicate Risk | Score |
|-------------------|-----|--------|-------------------------|--------------|-----|----------------|-------|
| กรุงเทพ | `/รับซื้อไอโฟน/กรุงเทพ/` | ✅ | ดี (template + ข้อความเฉพาะบางส่วน) | เชื่อม hub | ✅ | ปานกลาง | 84 |
| ปริมณฑล | `/รับซื้อไอโฟน/ปริมณฑล/` | ✅ | ดี | เชื่อมกทม. | ✅ | ปานกลาง | 84 |
| ภาคอีสาน | `/รับซื้อไอโฟน/ภาคอีสาน/` | ✅ | ดี | ลิงก์จังหวัด | ✅ | ปานกลาง | 83 |
| อุบล / ขอนแก่น / อุดร / โคราช | `/รับซื้อไอโฟน/{slug}/` | ✅ | **ดีมาก** (ตัวอย่างอุบลมี FAQ เฉพาะที่) | มี | ✅ | ต่ำถึงปานกลาง | 88 |

**ประเด็น GEO สำคัญ (P0/P1)**

- **Schema `areaServed`:** ใน `LocalBusiness`/`Service` มีรายชื่อจังหวัดจำนวนมากรวมถึงภาคใต้บางจังหวัด — หากการบริการจริงไม่ครอบคลุม **ทุกจังหวัดใน list** อาจถือเป็น **ข้อมูลท้องถิ่นเกินจริง** ในมุม Google  
- **ข้อความใน FAQ location (อุบล):** มีคำเตือนไม่ให้สรุปเองว่ามีบริการถึงที่ทุกพื้นที่ ✅ (ดีต่อ trust)

**GBP:** มี `googleMapsUrl` + ชื่อร้านจริงใน config — **แนะนำทำ Google Business Profile** แยกจากเว็บ (P2–P3)

---

## 10) Schema / Structured Data

**พบในหน้า (ตัวอย่างหน้าแรก + location)**

- `Organization` (+ `knowsAbout`, `contactPoint`, `publishingPrinciples`)  
- `LocalBusiness` (+ `hasMap`, `image`, `areaServed`, `sameAs`)  
- `WebSite`  
- `WebPage`  
- `FAQPage` (หน้าที่ส่ง faqs / หน้าแรก)  
- `BreadcrumbList`, `Service` (ServiceLayout)  
- `BlogPosting` — ใช้ในบทความ (จากโครงโปรเจกต์เดิม — ไม่ได้แกะทุก blog ในรอบนี้)

**ตรวจความถูกต้อง**

- **เบอร์ / LINE:** ตรงกับที่ผู้ใช้ให้ (`0642579353`, `https://line.me/R/ti/p/@webuy`) ✅  
- **ชื่อองค์กร:** `ร้านรับซื้อไอโฟน.com` + `alternateName` ร้านจริง ✅  
- **Review/Rating/Price ปลอม:** ไม่พบใน JSON-LD ตัวอย่าง ✅  
- **ความเสี่ยง:** ยิง `Organization`+`LocalBusiness` **ซ้ำทุกหน้า** — ไม่ผิดกฎแต่ควรรู้ว่า validator อาจเตือนเรื่อง redundancy  

---

## 11) Technical SEO Files

| ไฟล์ | สถานะ | หมายเหตุ |
|------|--------|-----------|
| `public/robots.txt` | ✅ | `Allow: /` + `Sitemap: https://ร้านรับซื้อไอโฟน.com/sitemap-index.xml` |
| `sitemap-index.xml` | ✅ | ชี้ `sitemap-0.xml` (punycoded host) |
| `sitemap-0.xml` | ✅ | รวมหน้า money, model, location, blog — ตรวจพบ iphone-17 และจังหวัดใน grep |
| `public/llms.txt` | ✅ | เหมาะกับ AEO |
| `public/humans.txt` | ✅ | มีใน repo |
| `public/manifest.webmanifest` | ✅ | อ้างจาก BaseLayout |
| `404.astro` | ✅ | `noindex` + canonical `/404.html` |
| `astro.config.mjs` | ✅ | `site` เป็น URL ไทย + `trailingSlash: 'always'` |
| Canonical | ✅ | ใช้ `absoluteUrl` — ตัวอย่างหน้าเป็น `https://ร้านรับซื้อไอโฟน.com/...` |

---

## 12) Content Quality (Trust)

- **Keyword stuffing:** ไม่พบรูปแบบรุนแรงใน `src` — title หน้าแรกยาว (เสี่ยงเล็กน้อยด้านความน่าอ่าน)  
- **Duplicate:** pillar แชร์ appendix แบบรวม (`money-shared-practical-appendix.mdx`) ลดซ้ำระหว่างหน้า service — ดี  
- **อ้าง Apple:** พบถ้อยคำแยกแยะ “ไม่ใช่โลโก้ทางการ” ในหน้าแรก ✅  
- **คำเคลม:** “ให้ราคาดี” (หน้าแรก) — แนะนำปรับถ้อยคำหรือมีหลักฐานสนับสนุน (เช่น นโยบายราคาตามสภาพจริง)  
- **“ดีที่สุด”:** พบในบริบท “รูปแบบไหนดีที่สุด” (เช็คราคา) — ความเสี่ยงต่ำ  
- **โน๊ตบุ๊คใน production UI (`src`):** **ไม่พบ**  
- **ไฟล์รูปชื่อ notebook ใน `dist/images`:** **มี** — แนะนำลบออกจาก `public/` เพื่อความสะอาดแบรนด์  

---

## 13) Performance / Core Web Vitals (จาก static output)

**จุดดี**

- Hero: `<picture>` + `webp` + `width`/`height` + `loading="eager"` + `fetchpriority="high"` (หน้าแรก)  
- ฟอนต์: Google Fonts + `display=swap` ✅  
- โครงสร้าง static — JS hydration ไม่หนักจาก Astro static โดยทั่วไป  

**จุดเสี่ยง**

- **ไฟล์ PNG hero ~170KB** — ควรมี WebP หลักสำหรับผู้ใช้ที่รองรับ (มี webp ใน picture แล้ว)  
- **ไฟล์ `rubsue-notebook-*.webp` ~120–150KB หลายไฟล์** — ไม่ถูกใช้ใน HTML = **เสียพื้นที่และอาจถูกสแกนเจอชื่อเก่า**  

### ตารางสินทรัพย์ใหญ่ (จาก `dist/` — 12 อันดับแรก)

| File | Size (ประมาณ) | Type | Recommendation |
|------|----------------|------|----------------|
| `images/hero-webuy-campaign.png` | ~170 KB | PNG | เก็บเป็น fallback; ตรวจสอบว่า WebP ครอบคลุมผู้ใช้หลัก |
| `images/rubsue-notebook-trust-real-shopfront.webp` | ~150 KB | WebP | **ลบจาก public ถ้าไม่ใช้** |
| `images/rubsue-notebook-hero-team.webp` | ~147 KB | WebP | ลบถ้าไม่ใช้ |
| `dist/index.html` | ~139 KB | HTML | ปกติสำหรับ long-form landing |
| `images/rubsue-notebook-trust-team-checking.webp` | ~134 KB | WebP | ลบถ้าไม่ใช้ |
| หน้า HTML บริการยาวอื่น ๆ | ~125–132 KB | HTML | พิจารณา lazy section ภายหลัง |

**คะแนนย่อย:** LCP 80 · CLS 78 · INP 85 (คาดจาก static) · assets 65  

---

## 14) Conversion / LINE CTA

- Hero CTA ตรงกับที่กำหนด: **“แอดไลน์ @webuy ส่งรูปประเมินราคา”** ✅  
- Microcopy “ส่งรูป 3–5 รูป…” ✅  
- Sticky mobile CTA + เบอร์ใน header ✅  
- Footer / header — ตรวจจาก layout รวม ✅  

**หน้าที่ควรตรวจซ้ำด้วยมือ:** หน้าที่ยาวมากด้านล่าง — ให้แน่ใจว่ามี CTA ซ้ำระหว่างทาง (บางหน้ามี LineCTA / FinalCtaBanner แล้ว)

---

## 15) Mobile UX (จาก source pattern)

- Responsive grid ใช้ทั่วไป  
- `main` มี `pb-32` เพื่อเลี่ยง sticky CTA — ดีต่อ UX แต่ต้องจับตา **พื้นที่ว่างด้านล่าง**  
- ฟอนต์ `Prompt` อ่านง่าย  
- Dark section + gold text — ต้องทดสอบ contrast บนอุปกรณ์จริง  

**คะแนน:** **82/100**

---

## 16) คำเก่า / คำต้องห้าม / Dev text

### Production-facing (`src/`, `public/` ที่ถูก deploy)

| Term | พบหรือไม่ | Severity | Recommendation |
|------|------------|----------|----------------|
| โน๊ตบุ๊ค / Notebook / รับซื้อโน๊ตบุ๊ค (ใน `src`) | **ไม่พบ** | — | ผ่านเกณฑ์ผู้ใช้ |
| placeholder / TODO / lorem / dummy (ใน `src`) | **ไม่พบ** | — | ผ่าน |
| Apple Authorized / ศูนย์ Apple / bypass iCloud | **ไม่พบ** | — | ผ่าน |
| ราคาสูงที่สุด / อันดับ 1 | **ไม่พบ** | — | — |
| **ชื่อไฟล์ `rubsue-notebook-*`** ใน `dist/images` | **พบ** | **Medium** | ลบจาก `public/` — ไม่ใช่ข้อความหน้าเว็บแต่สื่อแบรนด์เก่า |
| **"ให้ราคาดี"** (หน้าแรก H1 บริบท) | พบ | Low–Med | ทบทวนถ้อยคำให้เป็นราคาตามสภาพ |
| **"ดีที่สุด"** | พบในบริบทถ่ายรูป | Low | พอรับได้ หรือเปลี่ยนคำ |

### Docs / dev only (ไม่ถูก deploy เป็นหน้า HTML หลัก)

- ไฟล์รายงานเก่า เช่น `LOCATION-PAGES-REPORT.md`, `PARTNER-LINKING-GUIDE.md`, `AUDIT-REPORT.md` **ยังมีคำว่าโน๊ตบุ๊ค** — อยู่นอก `dist` แต่ถ้า publish repo เป็นสาธารณะอาจทำให้คนอ่านสับสน — **P3** archive/ลบ

---

## 17) Action Plan

### P0 — ต้องพิจารณาก่อน index (ความเสี่ยง trust/GEO)

1. ทบทวน **`areaServed` ใน `SITE` / schema** ให้สอดคล้องกับบริการจริง + ข้อความในหน้า location (ไม่ให้กว้างเกินพฤติกรรมรับซื้อ)  
2. ยืนยันข้อความ **“ไม่มีบริการถึงที่ทุกพื้นที่”** ยังครบทุกหน้า GEO template  

### P1 — ก่อน/หลังส่ง Search Console เร็ว ๆ

1. ลบ **รูป legacy `rubsue-notebook-*`** ออกจาก `public/images` หากไม่ใช้งาน  
2. ทบทวน **title หน้าแรก** (ความยาว + ความซ้ำของคำ)  
3. แก้หัวข้อ **"Internal links"** เป็นภาษาไทยบนหน้า `ตีราคาไอโฟน`  

### P2 — ภายใน 30 วัน

1. ขยาย **AnswerBox** ไปหน้า service อื่นที่สำคัญ  
2. เพิ่ม internal link จาก blog → hub/condition ตามตาราง KEYWORD-MAP  
3. รัน **PageSpeed/Lighthouse** บนโดเมนจริง + แก้ LCP/CLS จาก field data  

### P3 — ระยะยาว

1. GBP + รีวิวจริง (ไม่ปลอม)  
2. Case study / หลักฐานการจ่ายเงิน (ถ้าทำได้ถูกกฎหมายและจริยธรรม)  
3. ทำความสะอาด **markdown รายงานเก่า** ใน repo  

---

## 18) สรุปให้เจ้าของเว็บ

รายงานฉบับเต็มอยู่ที่ไฟล์นี้ **`SEO-AEO-GEO-AUDIT-SCORE.md`**  
สรุปฉบับส่ง **ChatGPT** อยู่ที่ **`AUDIT-SUMMARY-FOR-CHATGPT.md`**

**คำเตือน:** คะแนนเป็นการประเมินจาก static audit — **CWV จริงต้องวัดบน production + ข้อมูลผู้ใช้จริง**
