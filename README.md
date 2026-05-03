# ร้านรับซื้อไอโฟน.com — Astro static site

เว็บไซต์รับซื้อ **iPhone / ไอโฟน** มือสองแนว SEO + AEO + GEO ธีม Black Gold Premium (สถิติ HTML คงที่)

## สแตก

- **Astro** + **Tailwind CSS v4**
- คอนเทนต์: `src/content/` (models, conditions, locations, blog)
- คอนฟิกธุรกิจ: `src/config/site.ts` (โดเมน, LINE @webuy, โทร 0642579353)
- แผน keyword → URL: `KEYWORD-MAP.md`

## คำสั่ง

```bash
npm install
npm run dev
npm run build
npm run preview
```

พอร์ต dev/preview ตั้งไว้ที่ **4322** (ดู `package.json`)

## Deploy

- ตั้ง `site` ใน `astro.config.mjs` ให้ตรงโดเมนจริง (Punycode/HTTPS)
- หลัง build ตรวจ `dist/`: sitemap, `robots.txt`, `llms.txt`, `humans.txt`, `manifest.webmanifest`
- เช็กลิสต์: `DEPLOY-CHECKLIST.md`, `SEO-CHECKLIST.md`

## เงื่อนไขเนื้อหา (สรุป)

- โฟกัส **iPhone** — ไม่ใส่คำเกี่ยวกับโน้ตบุ๊คใน production
- ไม่อ้าง Apple / ศูนย์ Apple อย่างเป็นทางการ
- ไม่สอน bypass iCloud / ปลดล็อกผิดกฎหมาย
- ไม่ใส่ราคาตายตัว รีวิวปลอม หรือที่อยู่ปลอม

รายงานสรุปงานล่าสุด: `SEO-GEO-AEO-PERFORMANCE-FINAL-REPORT.md`

# shopbuyiphone-thai
