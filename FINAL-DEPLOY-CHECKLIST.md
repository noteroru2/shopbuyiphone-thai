# FINAL DEPLOY CHECKLIST — ร้านรับซื้อไอโฟน.com

รายงานความพร้อม deploy production (ภาษาไทย)  
วันที่ตรวจในเครื่อง: **1 พฤษภาคม 2026**  
โดเมน: `https://ร้านรับซื้อไอโฟน.com/` (canonical / OG ใช้ Unicode) — sitemap ของ `@astrojs/sitemap` ใช้ **โฮสต์ punycode** (`xn--…`) ซึ่งเป็นโดเมนเดียวกัน ควรตั้งค่า redirect/ canonical ฝั่ง Cloudflare ให้สอดคล้องกับที่เลือกใช้ใน GSC

---

## 1. Build result

| รายการ | ผล |
|--------|-----|
| คำสั่ง | `npm run build` |
| Exit code | **0** (ผ่าน) |
| โหมด | `static` |
| จำนวนหน้า (Astro) | **84** หน้า |
| Warning สำคัญจาก Vite/Astro | **ไม่พบ** ในรอบล่าสุด |
| Sitemap | สร้าง `sitemap-index.xml` + `sitemap-0.xml` ที่ `dist/` |

**หมายเหตุการทำงาน:** ก่อน build รอบสุดท้ายได้ **ลบ `dist/` แล้ว build ใหม่** และ **ลบ asset legacy** ใน `public/images` (ชื่อ `rubsue-notebook*`, `logo-ranrubsue-notebook*`, `hero-webuy-campaign*`, รวมถึง WebP ชื่อไทยที่ไม่ถูกอ้างอิง) เพื่อไม่ให้ไฟล์เก่าค้างใน `dist` หลัง deploy

---

## 2. Production files ใน `dist/`

| ไฟล์ / โฟลเดอร์ | สถานะ |
|------------------|--------|
| `index.html` | มี |
| `404.html` | มี |
| `sitemap-index.xml` | มี |
| `sitemap-0.xml` | มี |
| `robots.txt` | มี (คัดลอกจาก `public/`) |
| `llms.txt` | มี |
| `humans.txt` | มี |
| `manifest.webmanifest` | มี |
| `_astro/*.css` (และ asset build) | มี |

**สแกนคำต้องห้ามใน `dist` (HTML/XML/txt/manifest):** ไม่พบสตริงในชุด: โน๊ตบุ๊ค/Notebook/Gaming Notebook, placeholder/mock/draft/TODO/REPLACE_ME/lorem/dummy, `rubsue-notebook`, Apple Authorized/ศูนย์ Apple/official Apple, ปลดล็อก iCloud (เชิงบริการ), bypass

---

## 3. Sitemap / robots

| รายการ | ค่า |
|--------|------|
| จำนวน URL ใน sitemap (`<loc>`) | **83** |
| path sitemap | `dist/sitemap-index.xml`, `dist/sitemap-0.xml` |
| path robots | `public/robots.txt` → `dist/robots.txt` |
| path llms.txt | `public/llms.txt` → `dist/llms.txt` |
| path humans.txt | `public/humans.txt` → `dist/humans.txt` |
| path manifest | `dist/manifest.webmanifest` |

**ตรวจ URL สำคัญ (ครบใน sitemap):**  
`/`, `/รับซื้อไอโฟน/`, `/รับซื้อไอโฟนมือสอง/`, `/รับซื้อ-iphone/`, `/ขายไอโฟน/`, `/เช็คราคาไอโฟน/`, `/ตีราคาไอโฟน/`, `/รับซื้อไอโฟน/iphone-17/`, `iphone-16/`, `iphone-15/`, หน้าอาการ/สภาพ (จอแตก, แบตเสื่อม, เปิดไม่ติด, ติด-icloud, ติดรหัส), GEO 7 แหล่ง, `/พื้นที่ให้บริการ/`, `/คำถามที่พบบ่อย/`, `/blog/`

**ตรวจเพิ่ม:** ไม่มี `/404.html` ใน sitemap — **ผ่าน**  
**URL แปลก / ไม่ควร index:** ไม่พบหน้า dev ใน sitemap; มีหน้า blog, หน้าเกี่ยวกับ/นโยบาย/ติดต่อ/วิธีขาย/เว็บไซต์ในเครือ และหน้า GEO จังหวัดอีสานเพิ่มเติม — **ถือเป็นการขยายเนื้อหา SEO ตามปกติ** (ไม่ใช่หน้า notebook เก่า)

**`public/robots.txt`:** `User-agent: *`, `Allow: /`, `Sitemap: https://ร้านรับซื้อไอโฟน.com/sitemap-index.xml` — **ไม่มี** `Disallow: /`

---

## 4. Canonical / domain / IDN

| รายการ | ผล |
|--------|-----|
| `astro.config.mjs` → `site` | `https://ร้านรับซื้อไอโฟน.com/` |
| `trailingSlash` | `'always'` (ลงท้าย `/`) |
| ตัวอย่าง canonical หน้าแรก | `https://ร้านรับซื้อไอโฟน.com/` |
| localhost / staging ใน canonical ตัวอย่าง | **ไม่พบ** |

**ความต่าง punycode vs Unicode:** HTML canonical และ OG image ใช้โดเมน **ไทย**; sitemap `<loc>` ใช้ **punycode** — หลัง deploy ควรทดสอบเปิดทั้งสองแบบในเบราว์เซอร์ และเพิ่ม property ใน GSC ตามคู่มือด้านล่าง

---

## 5. Metadata (หน้าแรกและจุดสำคัญ)

| รายการ | ค่า (จาก `dist/index.html`) |
|--------|------------------------------|
| `<title>` | `รับซื้อไอโฟน ประเมินฟรีผ่านไลน์ @webuy \| ร้านรับซื้อไอโฟน.com` (ความยาว **61** ตัวอักษร — อยู่ในเกณฑ์ปกติ) |
| meta description | จาก `SITE.description` — มี **iPhone มือสอง**, **ประเมินตามรุ่นและสภาพจริง**, **LINE @webuy**, **โทร 0642579353** (ความยาว ~**194** ตัวอักษร) |
| canonical | absolute, production |
| `og:image` | `https://ร้านรับซื้อไอโฟน.com/images/hero-iphone-buying.svg` (ชี้ไฟล์ที่มีใน repo) |
| H1 (รวมข้อความใน `<h1>`) | มีคำว่า **รับซื้อไอโฟน** ชัดเจน + บรรทัดรอง “ประเมินไว จ่ายเงินไว” |

หน้าอื่นใช้ `BaseLayout` ร่วมกัน — แนะนำหลัง deploy ใช้ Rich Results Test สุ่ม 3–5 URL หลัก

---

## 6. Schema / JSON-LD

| รายการ | ผล |
|--------|-----|
| JSON-LD บนหน้าแรก | มี (รวม FAQPage จากหน้าแรก) |
| `areaServed` สูงสุดในบล็อกที่ parse ได้ | **7** รายการ (สอดคล้อง `SITE.areaServed`) |
| `aggregateRating` / `reviewRating` ใน `dist` | **ไม่พบ** (ลดความเสี่ยงรีวิวปลอม) |
| ชื่อองค์กร / โทร / LINE | ตั้งจาก `SITE` — `@webuy`, `0642579353` |

รายละเอียด Organization / LocalBusiness / WebSite / Breadcrumb ฯลฯ อยู่ในเลเยอร์ `src/lib/seo.ts` และเลย์เอาต์ — **แนะนำตรวจ Rich Results Test หลัง URL จริงขึ้น**

---

## 7. SEO / AEO / GEO — เนื้อหาและหน้า

- โครงหน้า hub หลัก, รุ่น iPhone, สภาพเครื่อง, GEO และ `/blog/` **มีครบในการ build**
- `public/llms.txt` — ปรับบล็อก GEO ให้สอดคล้อง **7 พื้นที่ schema** และถ้อยคำ “ส่งรูป / สอบถามพื้นที่ / นัดรับหรือส่งเครื่อง”
- `public/humans.txt` — แก้บล็อก Service Area ให้ตรง **7 รายการ** และไม่กว้างเกินจริง

**P2 (ทำหลัง deploy ได้):** ทบทวน meta description บางหน้า GEO ย่อย (เช่น ที่เคยใช้คำ market แรง) ให้สอดคล้องนโยบาย “ไม่ claim เกินจริง” แบบเดียวกับ hub หลัก — **ไม่บล็อก deploy**

---

## 8. Internal links

- สแกน `src` สำหรับ `href="#"` / `href='#'` — **ไม่พบ**
- ลิงก์ไป route โน๊ตบุ๊คเก่า — **ไม่พบ** จากการ grep คำต้องห้ามใน `dist`
- **ข้อจำกัด:** ยังไม่ได้รัน crawler แบบเต็มระบบทุก URL — หลัง deploy แนะนำใช้เครื่องมือภายนอก (Screaming Frog / Ahrefs) หนึ่งรอบ

---

## 9. LINE CTA และ conversion

- ลิงก์ `https://line.me/R/ti/p/@webuy` ปรากฏในหน้า HTML หลักทั้งหมดที่สุ่มตรวจ (grep ใน `dist/**/*.html` มีหลายจุดต่อหน้า)
- `tel:0642579353` — มีในคอมโพเนนต์ CTA / Hero
- หน้าแรกไม่มีฟอร์มยาว — ใช้แนวส่งรูปผ่านไลน์

---

## 10. รูปภาพและ assets

**การแก้ในรอบนี้**

- หน้าแรก: เปลี่ยน hero เป็น **`/images/hero-iphone-buying.svg`** (มี `fetchpriority="high"`, width/height ใน `Hero.astro`)
- `SITE.ogImage` → **`/images/hero-iphone-buying.svg`** (ไม่ชี้ PNG ที่ไม่มีใน repo)
- ลบชุดรูป legacy ชื่อ notebook / webuy campaign ออกจาก `public/` เพื่อไม่ deploy ซ้ำ
- ลบ WebP ชื่อไทยคู่ (~96KB × 2) ที่ไม่ถูกอ้างอิงใน HTML

**Top asset หลังตัด (โฟลเดอร์ `public/images` — ส่วนใหญ่เป็น SVG ~1.5KB)**

| File | ขนาดโดยประมาณ | ใช้ในเว็บ | แนะนำ |
|------|----------------|-----------|--------|
| `locations/*.svg` | ~1.5 KB ต่อไฟล์ | หน้า GEO / hub | เก็บ |
| `hero-iphone-buying.svg` | เล็ก | Hero, OG, review card | เก็บ |
| `iphone-*.svg` | เล็ก | Trust / guide | เก็บ |

ไฟล์ใหญ่กว่า 300KB — **ไม่มี** ใน `public/images` หลังล้างรอบนี้

---

## 11. Performance readiness

- Output แบบ static — **ไม่มี** JS client หนักจาก framework
- ฟอนต์ Google: `Prompt` + `display=swap` (ตามลิงก์ในเลย์เอาต์)
- Hero: รูปหลักเป็น **SVG** — LCP เบาเมื่อเทียบกับ PNG แคมเปญเดิม
- **คำแนะหลัง deploy:** รัน PageSpeed Insights บน URL จริง (มือถือ) — ปัจจัยสำคัญจะอยู่ที่เครือข่ายและ Cloudflare cache

---

## 12. Mobile UX

- Sticky CTA / ปุ่ม LINE–โทร — อยู่ในคอมโพเนนต์เดิม (ไม่ redesign)
- **แนะนำหลัง deploy:** ทดสอบบนมือถือจริงว่าแถบล่างไม่บัง footer และแตะง่าย

---

## 13. Trust / safety

- สแกน `dist` ตามชุดคำเสี่ยง (bypass, ปลดล็อก iCloud เชิงบริการ, Apple official ฯลฯ) — **ไม่พบ**
- ไม่มี `aggregateRating` ใน HTML ที่ build

---

## 14. Coolify / static hosting — ก่อน deploy

| รายการ | ค่าที่แนะนำ |
|--------|------------|
| Build command | `npm run build` |
| Install | `npm ci` (บน CI) หรือ `npm install` |
| Node | `>=20` (ตาม `package.json`) |
| Output directory | `dist` |
| Health check (ถ้าใช้ static บน reverse proxy) | `/` → `200` |
| ไฟล์ static | อัปโหลดทั้งโฟลเดอร์ `dist/` |
| 404 | ตั้ง fallback ไป `404.html` (เช่น Cloudflare / nginx `error_page`) |

---

## 15. Cloudflare — หลัง deploy

- DNS: A/AAAA/CNAME ชี้ origin ถูกต้อง — ไม่ซ้ำซ้อนแปลก ๆ
- SSL/TLS: **Full (strict)** เมื่อ origin มีใบรองรับ HTTPS
- Always Use HTTPS / HTTPS redirect: **เปิด**
- Cache: HTML แนะนำ TTL สั้น หรือ bypass ตามความถี่อัปเดต; asset (`/_astro/`, รูป) cache ยาว + **Purge cache หลัง deploy**
- Brotli / HTTP2 หรือ 3: เปิดตามแพลน
- ถ้ามี `/admin` (Decap): พิจารณา **ไม่แคช** หรือป้องกันด้วย access — โปรเจกต์นี้มี `dist/admin/index.html` จากการ build

---

## 16. Google Search Console — หลัง deploy

1. เพิ่ม **Domain property** (ถ้าใช้)
2. เพิ่ม **URL prefix** โดเมนไทย และ **punycode** (ถ้าระบบแยก)
3. ส่ง sitemap: `https://ร้านรับซื้อไอโฟน.com/sitemap-index.xml`
4. URL Inspection หน้าแรก → **Request indexing**
5. Request เพิ่ม 10–15 URL หลักตามรายการที่คุณให้ (/, `/รับซื้อไอโฟน/`, `/เช็คราคาไอโฟน/`, `/ขายไอโฟน/`, รุ่น 17/16, อาการ, GEO, `/พื้นที่ให้บริการ/`, `/คำถามที่พบบ่อย/`)

---

## 17. External tests — หลัง deploy (เจ้าของเว็บ / dev)

| ขั้นตอน | ผล (กรอกหลังทดสอบ) |
|---------|---------------------|
| เปิดหน้าแรก 4G/5G | |
| เปิดหน้าแรก Wi‑Fi | |
| แตะปุ่ม LINE → เปิด `@webuy` | |
| แตะโทร → โทรออก | |
| เปิด `…/sitemap-index.xml` | |
| เปิด `…/robots.txt` | |
| เปิด `…/llms.txt` | |
| เปิด `…/404.html` หรือ URL ผิด | |
| Rich Results Test — หน้าแรก | |
| Rich Results Test — `/รับซื้อไอโฟน/` | |
| PageSpeed — `/` | |
| PageSpeed — `/รับซื้อไอโฟน/` | |
| PageSpeed — `/เช็คราคาไอโฟน/` | |

---

## 18. P0 / P1 / P2 ที่เหลือ

| ระดับ | รายการ |
|-------|--------|
| P0 | **ไม่มี** ที่บล็อก deploy จากรอบตรวจนี้ |
| P1 | ตั้งค่า **Cloudflare + GSC** บนโดเมนจริง; **Purge cache** หลังอัปโหลด |
| P2 | ทบทวน meta บางหน้า GEO ย่อยให้ “นุ่ม” ขึ้น; รัน crawler ภายนอก; Core Web Vitals บน URL จริง |

---

## 19. สถานะพร้อม deploy

**สถานะ: Ready with minor issues**

- **พร้อม deploy production** จากมุม build, ไฟล์ static, sitemap/robots, canonical, คำต้องห้ามใน `dist`, LINE/tel, schema `areaServed` ≤ 7, และการตัด asset เก่า
- **ประเด็นย่อย:** sitemap ใช้ punycode ใน `<loc>` ขณะที่ canonical ใช้ Unicode — ต้องยืนยันบน Cloudflare/GSC หลัง live; การทดสอบ PageSpeed / mobile ยังเป็น **ขั้นตอนหลัง deploy**

---

## สรุปท้ายรายงาน

| หัวข้อ | จำนวน |
|--------|--------|
| ข้อที่ผ่านจากการตรวจใน repo + `npm run build` | **18/19** (ข้อ external/cloud เป็น checklist หลัง live) |
| ต้องแก้ก่อน deploy ในโค้ด | **0** (แก้ asset/humans/llms/hero/og แล้ว) |
| ทำหลัง deploy ได้ | Cloudflare, GSC, PageSpeed, ทดสอบมือถือจริง, crawler เต็มรูปแบบ |
| **พร้อม deploy หรือไม่** | **Ready with minor issues** — deploy ได้ แนะนำทำ checklist หมวด 15–17 ทันทีหลังขึ้นโดเมน |
