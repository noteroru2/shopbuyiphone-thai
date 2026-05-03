import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/content');

const models = [
  { slug: 'iphone-15', title: 'iPhone 15', pm: ['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max'] },
  { slug: 'iphone-14', title: 'iPhone 14', pm: ['iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max'] },
  { slug: 'iphone-13', title: 'iPhone 13', pm: ['iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max'] },
  { slug: 'iphone-12', title: 'iPhone 12', pm: ['iPhone 12 mini', 'iPhone 12', 'iPhone 12 Pro', 'iPhone 12 Pro Max'] },
  { slug: 'iphone-11', title: 'iPhone 11', pm: ['iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max'] },
  { slug: 'iphone-xs-xr', title: 'iPhone XS / XR', pm: ['iPhone XS', 'iPhone XS Max', 'iPhone XR'] },
  { slug: 'iphone-se', title: 'iPhone SE', pm: ['iPhone SE รุ่นที่วางจำหน่ายต่าง ๆ'] },
  {
    slug: 'pro-max',
    title: 'iPhone Pro / Pro Max',
    pm: ['iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Pro Max'],
  },
];

for (const m of models) {
  const fm = `---
kind: model
title: ${m.title}
description: รับซื้อ ${m.title} มือสอง ประเมินจากรุ่น ความจุ สภาพ และอุปกรณ์ ส่งรูปเช็คราคาไอโฟนฟรีผ่านไลน์ @webuy
slug: ${m.slug}
featuredImage: /images/iphone-models.webp
popularModels:
${m.pm.map((x) => `  - ${x}`).join('\n')}
keywords:
  - รับซื้อ ${m.title}
  - รับซื้อ iPhone
faqs: []
---

## รับซื้อ ${m.title}

เรารับประเมิน ${m.title} มือสองจากรูปและข้อมูลรุ่น ความจุ สภาพ และอุปกรณ์ แนะนำส่งรูปหน้าจอ About ด้านข้าง ฝาหลัง และอุปกรณ์ที่มี ผ่าน LINE @webuy
`;
  fs.writeFileSync(path.join(root, 'models', `${m.slug}.md`), fm, 'utf8');
}

const conds = [
  { slug: 'ใช้งานปกติ', title: 'ใช้งานปกติ', wwb: ['เครื่องเปิดใช้งานได้ครบ', 'จอและทัชตอบสนองปกติ', 'แบตใช้งานได้ตามสภาพ'] },
  { slug: 'จอแตก', title: 'จอแตก', wwb: ['จอร้าวแต่ยังแสดงภาพได้บางกรณี', 'ทัชเสียบางส่วน', 'แนบรูปมุมมองหลายแสง'] },
  { slug: 'จอเป็นเส้น', title: 'จอเป็นเส้น', wwb: ['เส้นตั้งหรือนอน', 'จอดำบางส่วน', 'แจ้งว่าเคยเปลี่ยนจอหรือไม่'] },
  { slug: 'แบตเสื่อม', title: 'แบตเสื่อม', wwb: ['แบตหมดไว', 'ชาร์จไม่เข้า', 'แจ้งเปอร์เซ็นต์สุขภาพแบตถ้าเห็น'] },
  { slug: 'face-id-เสีย', title: 'Face ID เสีย', wwb: ['สแกนใบหน้าไม่ได้', 'แจ้งหลังซ่อมหรือน้ำเข้า'] },
  { slug: 'กล้องเสีย', title: 'กล้องเสีย', wwb: ['กล้องหน้า/หลังโฟกัสไม่ได้', 'ภาพฝ้า จุดดำ'] },
  { slug: 'เปิดไม่ติด', title: 'เปิดไม่ติด', wwb: ['จอดำไม่ติดบูต', 'ชาร์จไม่เข้า', 'ค้างโลโก้'] },
  { slug: 'ติดรหัส', title: 'ติดรหัส', wwb: ['ลืมรหัสหน้าจอ', 'ต้องปลดล็อกได้ก่อนรับซื้อ'] },
  { slug: 'ติด-icloud', title: 'ติด iCloud', wwb: ['ยังล็อกบัญชีผู้ใช้', 'ต้องออกจากบัญชีได้ก่อนโอน'] },
  { slug: 'เครื่องนอก', title: 'เครื่องนอก', wwb: ['โมเดลต่างประเทศ', 'แจ้งการใช้งานซิมและเครือข่าย'] },
  { slug: 'เครื่องศูนย์ไทย', title: 'เครื่องศูนย์ไทย', wwb: ['โมเดลไทย', 'อุปกรณ์ครบช่วยตรวจสอบ'] },
  { slug: 'ฝาหลังแตก', title: 'ฝาหลังแตก', wwb: ['รอยแตกด้านหลัง', 'อาจกระทบแบตหรือไวไลน์ชาร์จ'] },
];

for (const c of conds) {
  const fm = `---
kind: condition
title: ${c.title}
description: รับซื้อไอโฟน${c.title} ประเมินจากรูปและข้อมูลจริง ไม่มีราคาตายตัวบนหน้าเว็บ
slug: ${c.slug}
featuredImage: /images/iphone-condition.webp
whatWeBuy:
${c.wwb.map((x) => `  - ${x}`).join('\n')}
keywords:
  - รับซื้อไอโฟน${c.title}
  - รับซื้อ iPhone
faqs: []
---

## รับซื้อไอโฟน${c.title}

แจ้งรุ่น ความจุ และอาการพร้อมส่งรูป iPhone หลายมุมเพื่อประเมินเบื้องต้นฟรี ผ่าน LINE @webuy
`;
  fs.writeFileSync(path.join(root, 'conditions', `${c.slug}.md`), fm, 'utf8');
}

console.log('seeded models + conditions');
