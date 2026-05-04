# Encoding fix — `robots.txt` & `llms.txt` (UTF-8 + punycode)

**โปรเจกต์:** ร้านรับซื้อไอโฟน.com  
**วันที่:** 2026-05-04  

---

## 1. แก้ `public/robots.txt` อย่างไร

- แทนที่เนื้อหาให้ตรงกับสเปก production: `User-agent: *`, `Allow: /`, บรรทัดว่างหนึ่งบรรทัด แล้ว `Sitemap:` ชี้ไปที่ **`https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com/sitemap-index.xml`**
- ลบโดเมนภาษาไทยออกจากบรรทัด Sitemap (เดิมใช้ `https://ร้านรับซื้อไอโฟน.com/...` ซึ่งเมื่อถูกเสิร์ฟหรือแก้ไฟล์ด้วย encoding ผิด จะกลายเป็น mojibake ได้ง่าย)
- ไม่มี `Disallow: /`
- ไฟล์เป็น **UTF-8 แบบไม่มี BOM** (ตรวจด้วย Node: byte แรกไม่ใช่ `EF BB BF`)

---

## 2. แก้ `public/llms.txt` อย่างไร

- เขียนใหม่ทั้งไฟล์ตาม brief ล่าสุด: หัวข้อ, คีย์เวิร์ด, ติดต่อ (LINE `https://line.me/R/ti/p/@webuy`, โทร `0642579353`), พื้นที่ให้บริการ, หน้าสำคัญ, วิธีประเมิน, ข้อควรทราบ
- ลบ URL แบบโฮสต์ภาษาไทย (`https://ร้านรับซื้อไอโฟน.com/...`) ออกจากส่วนลิงก์ — ใช้เฉพาะโฮสต์ **punycode** ในบรรทัด URL
- เก็บ path ภาษาไทยใน URL เป็น **อักขระ UTF-8 จริง** (ไม่ใช่โฮสต์ไทย) เพื่อให้ลิงก์ตรงกับโครงสร้างเว็บและอ่านได้ใน editor/terminal เมื่อไฟล์เป็น UTF-8

---

## 3. ใช้ punycode URL ตรงไหน

| ตำแหน่ง | รายละเอียด |
|----------|-------------|
| `public/robots.txt` | บรรทัด `Sitemap:` — โฮสต์ `xn--c3c1abc0aub6fa0bi9d0h0a0eh.com` |
| `public/llms.txt` | ทุกบรรทัดลิงก์ภายใต้ `## หน้าสำคัญ` — โฮสต์ punycode เดียวกัน; path เช่น `/รับซื้อไอโฟน/` เป็น UTF-8 ปกติ |

**หมายเหตุ (ไม่ได้แก้ในรอบนี้):** `astro.config.mjs` ยังใช้ `site: 'https://ร้านรับซื้อไอโฟน.com/'` ดังนั้น `dist/sitemap-*.xml` อาจแสดง `<loc>` ด้วยโฮสต์ Unicode — โดเมนเดียวกับ punycode ตามมาตรฐาน IDNA; หากต้องการให้ sitemap กับ `robots.txt` ใช้รูปแบบโฮสต์ byte เดียวกันทั้งระบบ สามารถเปลี่ยน `site` เป็น punycode ในขั้นถัดไป

---

## 4. ตรวจ mojibake แล้วไม่พบหรือยัง

- สแกนคำรูปแบบที่พบบ่อยเมื่อ UTF-8 ถูกอ่านเป็น Latin-1/Windows-1252: `เน`, `เน`, `เน€`, อักขระ replacement (U+FFFD) — **ไม่พบ** ใน `public/` และ `dist/` สำหรับ `robots.txt` และ `llms.txt`
- `robots.txt`: **ไม่มี** สตริงโฮสต์ภาษาไทย
- `llms.txt`: ไม่มี URL ที่ขึ้นต้นด้วย `https://ร้าน...` — โฮสต์เป็น punycode เท่านั้น

---

## 5. Build ผ่านไหม

- รัน `npm run build` — **ผ่าน (exit code 0)** หลังแก้ไฟล์และหลัง revert การทดลองเปลี่ยน `site` ใน config
- `dist/robots.txt` กับ `dist/llms.txt` เป็น **สำเนา byte-identical** ของ `public/robots.txt` และ `public/llms.txt` (Astro คัดลอก `public/` ไป `dist/`)

---

## 6. สิ่งที่ต้องทำหลัง deploy

1. **Purge Cloudflare cache** (หรือแคช CDN/โฮสต์ที่ใช้) สำหรับ `/robots.txt` และ `/llms.txt` เพื่อไม่ให้เสิร์ฟไฟล์เก่าที่ cache ไว้
2. เปิด **`/robots.txt`** ในเบราว์เซอร์ — ตรวจว่า Sitemap เป็น punycode และไม่มีอักขระแปลก
3. เปิด **`/llms.txt`** — ตรวจว่าภาษาไทยอ่านได้และลิงก์ถูกต้อง
4. **Google Search Console:** ถ้าเคยส่ง sitemap ด้วย URL รูปแบบเก่าและต้องการให้สอดคล้องกับ `robots.txt` ใหม่ ให้ยืนยัน property / ส่ง sitemap `https://xn--c3c1abc0aub6fa0bi9d0h0a0eh.com/sitemap-index.xml` ตามนโยบาย GSC ของคุณ (โดยทั่วไปโฮสต์ punycode กับ Unicode ถือเป็น origin เดียวกัน แต่การ purge และตรวจด้วยตาแนะนำเสมอหลังแก้ crawler-facing ไฟล์)

---

## สรุปไฟล์ที่แตะ

| ไฟล์ | การกระทำ |
|------|-----------|
| `public/robots.txt` | แทนที่เนื้อหาใหม่ทั้งหมด |
| `public/llms.txt` | เขียนใหม่ทั้งหมด (UTF-8) |
| `ENCODING-FIX-ROBOTS-LLMS-REPORT.md` | รายงานนี้ |
