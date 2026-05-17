import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROVINCES } from './isan-provinces-data.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const blogOutDir = path.join(root, 'src', 'content', 'blog', 'seo-longtail');
const districtOutDir = path.join(root, 'src', 'content', 'locations', 'seo-geo-districts');
const locationsRoot = path.join(root, 'src', 'content', 'locations');

const PRODUCT_GALLERY = [
  {
    src: '/images/gallery/real-phones/iphone15-black-front.webp',
    alt: 'ตัวอย่าง iPhone หน้าจอเปิดใช้งานสำหรับประกอบเนื้อหารับซื้อไอโฟน',
  },
  {
    src: '/images/gallery/real-phones/iphone15-black-back.webp',
    alt: 'ตัวอย่าง iPhone ด้านหลังสีดำสำหรับประกอบเนื้อหารับซื้อไอโฟน',
  },
  {
    src: '/images/gallery/real-phones/iphone-orange-front.webp',
    alt: 'ตัวอย่าง iPhone สีส้มพร้อมหน้าจอเปิดใช้งานสำหรับประกอบเนื้อหา',
  },
  {
    src: '/images/gallery/real-phones/iphone-orange-back.webp',
    alt: 'ตัวอย่าง iPhone สีส้มด้านหลังสำหรับประกอบเนื้อหา',
  },
  {
    src: '/images/gallery/real-phones/iphone-orange-box.webp',
    alt: 'ตัวอย่าง iPhone สีส้มพร้อมกล่องสำหรับประกอบเนื้อหา',
  },
];

const BANNERS = [
  {
    src: '/images/gallery/banners/banner-premium-line.webp',
    alt: 'แบนเนอร์รับซื้อไอโฟนพร้อมช่องทางติดต่อ LINE และโทรศัพท์',
  },
  {
    src: '/images/gallery/banners/banner-counter-showcase.webp',
    alt: 'แบนเนอร์หน้าร้านรับซื้อไอโฟนพร้อมโชว์สินค้า',
  },
  {
    src: '/images/gallery/banners/banner-hero-gold.webp',
    alt: 'แบนเนอร์โทนทองสำหรับหน้าคอนเทนต์รับซื้อไอโฟน',
  },
];

const MODELS = [
  { slug: 'iphone-11', name: 'iPhone 11', transactionSlug: 'iphone-11' },
  { slug: 'iphone-12', name: 'iPhone 12', transactionSlug: 'iphone-12' },
  { slug: 'iphone-13', name: 'iPhone 13', transactionSlug: 'iphone-13' },
  { slug: 'iphone-14', name: 'iPhone 14', transactionSlug: 'iphone-14' },
  { slug: 'iphone-15', name: 'iPhone 15', transactionSlug: 'iphone-15' },
  { slug: 'iphone-15-plus', name: 'iPhone 15 Plus', transactionSlug: 'iphone-15' },
  { slug: 'iphone-15-pro', name: 'iPhone 15 Pro', transactionSlug: 'pro-max' },
  { slug: 'iphone-15-pro-max', name: 'iPhone 15 Pro Max', transactionSlug: 'pro-max' },
  { slug: 'iphone-16', name: 'iPhone 16', transactionSlug: 'iphone-16' },
  { slug: 'iphone-16-plus', name: 'iPhone 16 Plus', transactionSlug: 'iphone-16' },
  { slug: 'iphone-16-pro', name: 'iPhone 16 Pro', transactionSlug: 'pro-max' },
  { slug: 'iphone-16-pro-max', name: 'iPhone 16 Pro Max', transactionSlug: 'pro-max' },
  { slug: 'iphone-se', name: 'iPhone SE', transactionSlug: 'iphone-se' },
];

const BLOG_TOPICS = [
  {
    key: 'check-price-before-selling',
    category: 'เช็คราคา',
    title: (model) => `เช็คราคา ${model.name} ก่อนขาย ต้องดูอะไรบ้าง`,
    description: (model) =>
      `คู่มือเช็คราคา ${model.name} ก่อนขายแบบไม่เดาราคา ดูรุ่น ความจุ แบต สภาพเครื่อง และวิธีส่งรูปประเมินผ่าน LINE @webuy ให้คุยงานง่ายขึ้น`,
    summary: (model) =>
      `${model.name} จะประเมินได้แม่นขึ้นเมื่อแจ้งรุ่น ความจุ สุขภาพแบต และส่งรูปหลายมุมให้ครบก่อนคุยเรื่องนัดหรือการส่งเครื่อง`,
    question: (model) => `${model.name} เช็คราคาก่อนขายยังไง`,
    answer: (model) =>
      `เริ่มจากแจ้งรุ่น ความจุ สุขภาพแบต สภาพจอ กรอบ ฝาหลัง และส่งรูปหลายมุมของ ${model.name} ผ่าน LINE @webuy เพื่อรับกรอบประเมินเบื้องต้นก่อนตัดสินใจ`,
  },
  {
    key: 'sell-guide',
    category: 'ขายไอโฟน',
    title: (model) => `ขาย ${model.name} มือสอง ต้องเตรียมอะไรให้คุยง่ายและปลอดภัย`,
    description: (model) =>
      `สรุปขั้นตอนขาย ${model.name} มือสอง ตั้งแต่สำรองข้อมูล ออกจาก Apple ID ปิด Find My และส่งรูปประเมินให้ครบก่อนขาย`,
    summary: (model) =>
      `ถ้าจะขาย ${model.name} ให้เร็วและลดการถามซ้ำ ควรเตรียมข้อมูลเครื่อง บัญชีผู้ใช้ และรูปสินค้าให้ครบตั้งแต่แรก`,
    question: (model) => `ขาย ${model.name} มือสองต้องเตรียมอะไร`,
    answer: (model) =>
      `ควรสำรองข้อมูล ออกจาก Apple ID ปิด Find My ถอดซิม และส่งรูป ${model.name} หลายมุมพร้อมแจ้งอาการหรือรอยใช้งานให้ครบ`,
  },
  {
    key: 'battery-health',
    category: 'แบตเตอรี่',
    title: (model) => `${model.name} แบตเสื่อม ขายได้ไหม และควรแจ้งอะไรตอนประเมิน`,
    description: (model) =>
      `อธิบายกรณี ${model.name} แบตเสื่อม แบตหมดไว หรือสุขภาพแบตลดลง ควรแจ้งข้อมูลอะไรบ้างเพื่อประเมินราคาได้ใกล้เคียงขึ้น`,
    summary: (model) =>
      `${model.name} ที่แบตเสื่อมยังประเมินได้ แต่ควรแจ้ง Battery Health อาการเครื่องร้อน และการใช้งานจริงให้ครบ`,
    question: (model) => `${model.name} แบตเสื่อมยังขายได้ไหม`,
    answer: (model) =>
      `ขายได้ในหลายกรณี โดยควรแจ้งสุขภาพแบต อาการหมดไว เครื่องร้อน หรือดับเองของ ${model.name} พร้อมส่งรูปเมนูแบตประกอบ`,
  },
  {
    key: 'cracked-screen',
    category: 'จอแตก',
    title: (model) => `${model.name} จอแตกหรือจอร้าว ขายได้ไหม ต้องส่งรูปแบบไหน`,
    description: (model) =>
      `สรุปการประเมิน ${model.name} จอแตก จอร้าว หรือทัชมีปัญหา พร้อมวิธีถ่ายรูปให้เห็นความเสียหายจริงก่อนส่งประเมิน`,
    summary: (model) =>
      `${model.name} จอแตกยังคุยประเมินได้ ถ้าส่งรูปหลายมุมและแจ้งว่าทัชใช้งานได้แค่ไหนหรือมีเส้น/จอดำร่วมด้วยหรือไม่`,
    question: (model) => `${model.name} จอแตกต้องแจ้งอะไรบ้าง`,
    answer: (model) =>
      `ควรส่งรูปหน้าจอเปิดติด รูปรอยร้าวหลายมุม คลิปสั้นให้เห็นการทัช และแจ้งว่ากล้องหน้า Face ID หรือขอบเครื่องของ ${model.name} กระทบด้วยหรือไม่`,
  },
  {
    key: 'icloud-locked',
    category: 'บัญชีผู้ใช้',
    title: (model) => `${model.name} ติด iCloud หรือยังออกจาก Apple ID ไม่ได้ ทำยังไงก่อนขาย`,
    description: (model) =>
      `แนวทางเตรียม ${model.name} ที่ยังติดบัญชีผู้ใช้ Apple ID หรือยังปิด Find My ไม่ได้ เพื่อให้คุยงานก่อนขายได้ชัดเจนและปลอดภัย`,
    summary: (model) =>
      `ก่อนขาย ${model.name} ควรออกจาก Apple ID และปิด Find My ให้เรียบร้อย เพราะสถานะบัญชีมีผลต่อการรับประเมินและการโอนเครื่อง`,
    question: (model) => `${model.name} ติด iCloud ยังประเมินได้ไหม`,
    answer: (model) =>
      `ประเมินแนวทางได้บางส่วน แต่ก่อนโอนเครื่องควรออกจาก Apple ID และปิด Find My ของ ${model.name} ให้เรียบร้อยตามขั้นตอนของระบบ`,
  },
  {
    key: 'face-id-issue',
    category: 'อาการเครื่อง',
    title: (model) => `${model.name} Face ID เสีย ยังรับประเมินได้ไหม`,
    description: (model) =>
      `สรุปกรณี ${model.name} Face ID ใช้งานไม่ได้ สแกนหน้าไม่ผ่าน หรือเคยซ่อมจอมาแล้ว ควรแจ้งอะไรตอนส่งรูปประเมิน`,
    summary: (model) =>
      `${model.name} ที่ Face ID มีปัญหายังส่งรูปประเมินได้ แต่ควรแจ้งประวัติซ่อมและอาการให้ตรงไปตรงมา`,
    question: (model) => `${model.name} Face ID เสียต้องบอกอะไร`,
    answer: (model) =>
      `ควรแจ้งว่า ${model.name} เคยเปลี่ยนจอหรือไม่ กล้องหน้าทำงานครบไหม และส่งคลิปให้เห็นข้อความแจ้งเตือนหรือการทดสอบจริง`,
  },
  {
    key: 'thai-vs-import',
    category: 'เครื่องศูนย์ไทย',
    title: (model) => `${model.name} เครื่องศูนย์ไทยกับเครื่องนอก ตอนขายต่างกันยังไง`,
    description: (model) =>
      `เปรียบเทียบการแจ้งข้อมูล ${model.name} เครื่องศูนย์ไทยและเครื่องนอกตอนขาย ว่าควรบอกโมเดล เลขเครื่อง และการใช้งานเครือข่ายอย่างไร`,
    summary: (model) =>
      `เวลาขาย ${model.name} ควรแจ้งให้ชัดว่าเป็นเครื่องศูนย์ไทยหรือเครื่องนอก เพราะมีผลต่อการอธิบายรุ่นและการใช้งานบางส่วน`,
    question: (model) => `${model.name} เครื่องศูนย์ไทยกับเครื่องนอกต้องแจ้งยังไง`,
    answer: (model) =>
      `ควรแจ้งว่า ${model.name} เป็นเครื่องศูนย์ไทยหรือเครื่องนอก พร้อมแนบรูปหน้า About และการใช้งานซิม/เครือข่ายเพื่อช่วยประเมินได้ตรงขึ้น`,
  },
  {
    key: 'photo-estimate',
    category: 'ส่งรูปประเมิน',
    title: (model) => `ส่งรูป ${model.name} ประเมินราคาแบบไหน ให้คุยจบไวขึ้น`,
    description: (model) =>
      `วิธีถ่ายรูป ${model.name} เพื่อส่งประเมินราคาให้เห็นรุ่น สภาพ และอุปกรณ์ชัด ลดคำถามซ้ำ และช่วยให้ประเมินเบื้องต้นได้ไวขึ้น`,
    summary: (model) =>
      `ภาพที่ดีสำหรับประเมิน ${model.name} ควรมีทั้งหน้าจอ About ด้านหน้า ด้านหลัง ขอบเครื่อง กล้อง และอุปกรณ์ที่มี`,
    question: (model) => `ส่งรูป ${model.name} ประเมินควรถ่ายอะไรบ้าง`,
    answer: (model) =>
      `ควรถ่ายหน้า About ของ ${model.name} หน้าจอเปิดติด ด้านหลัง ขอบเครื่อง กล้อง รอยใช้งาน และอุปกรณ์ที่มีให้เห็นครบในชุดเดียว`,
  },
];

const EXTRA_BLOGS = [
  {
    slug: 'geo-guide-isan-iphone-selling',
    title: 'รับซื้อไอโฟนภาคอีสาน ส่งรูปประเมินยังไงให้คุยง่ายทุกจังหวัด',
    description:
      'คู่มือ GEO สำหรับคนที่อยู่ภาคอีสาน อยากเช็คราคาไอโฟนก่อนขาย ว่าควรแจ้งจังหวัด อำเภอ และข้อมูลเครื่องแบบไหนให้ประเมินได้เร็วขึ้น',
    summary:
      'ถ้าอยู่ภาคอีสานและอยากขายไอโฟน ควรเริ่มจากส่งรูปพร้อมแจ้งจังหวัด อำเภอ รุ่น ความจุ และอาการเครื่องให้ครบก่อนคุยเรื่องนัดหรือส่งเครื่อง',
    category: 'GEO / ภาคอีสาน',
    date: '2026-05-15',
  },
  {
    slug: 'main-secondary-keywords-iphone-buying-guide',
    title: 'คีย์หลัก คีย์รอง รับซื้อไอโฟน: เช็คราคา ตีราคา ขายไอโฟน ต้องแยกหน้าแบบไหน',
    description:
      'สรุป intent ของคีย์หลักและคีย์รองเกี่ยวกับรับซื้อไอโฟน ตั้งแต่รับซื้อไอโฟน เช็คราคา ตีราคา ขายไอโฟน ไปจนถึงคีย์สภาพเครื่องและคีย์พื้นที่',
    summary:
      'คีย์รับซื้อไอโฟนควรแยกตาม intent ชัดเจน: transactional, comparison, pain point และ geo เพื่อให้ทั้ง SEO และ AEO ครอบคลุมมากขึ้น',
    category: 'SEO / AEO',
    date: '2026-05-16',
  },
];

const CONDITION_LINKS = [
  { label: 'จอแตก', href: '/รับซื้อไอโฟน/จอแตก/' },
  { label: 'แบตเสื่อม', href: '/รับซื้อไอโฟน/แบตเสื่อม/' },
  { label: 'ติด iCloud', href: '/รับซื้อไอโฟน/ติด-icloud/' },
  { label: 'Face ID เสีย', href: '/รับซื้อไอโฟน/face-id-เสีย/' },
  { label: 'เปิดไม่ติด', href: '/รับซื้อไอโฟน/เปิดไม่ติด/' },
];

const baseDate = new Date('2026-01-01T00:00:00.000Z');

function ensureCleanDir(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
}

function quote(value) {
  return JSON.stringify(value);
}

function yamlStringList(items, indent = 2) {
  return items.map((item) => `${' '.repeat(indent)}- ${quote(item)}`).join('\n');
}

function yamlFaqs(items) {
  return items
    .map((item) => `  - question: ${quote(item.question)}\n    answer: ${quote(item.answer)}`)
    .join('\n');
}

function yamlGalleryImages(items) {
  return items.map((item) => `  - src: ${quote(item.src)}\n    alt: ${quote(item.alt)}`).join('\n');
}

function yamlRelatedLinks(items) {
  return items
    .map((item) => {
      const desc = item.description ? `\n    description: ${quote(item.description)}` : '';
      return `  - label: ${quote(item.label)}\n    href: ${quote(item.href)}${desc}`;
    })
    .join('\n');
}

function pickBanner(index) {
  return BANNERS[index % BANNERS.length];
}

function rotateGallery(offset = 0, size = 3) {
  return Array.from({ length: size }, (_, i) => PRODUCT_GALLERY[(offset + i) % PRODUCT_GALLERY.length]);
}

function modelFeaturedImage(model, topicIndex) {
  if (model.slug.startsWith('iphone-15') && topicIndex % 2 === 0) return PRODUCT_GALLERY[0];
  if (model.slug.startsWith('iphone-15') && topicIndex % 2 === 1) return PRODUCT_GALLERY[1];
  return pickBanner(topicIndex + model.slug.length);
}

function blogDate(index) {
  const date = new Date(baseDate);
  date.setUTCDate(date.getUTCDate() + index);
  return date.toISOString().slice(0, 10);
}

function writeFile(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}

function nearbyDistricts(province, district) {
  return province.districts.filter((name) => name !== district).slice(0, 4);
}

function provinceFaqs(province) {
  return [
    {
      question: `อยู่${province.title} ส่งรูปประเมินก่อนได้ไหม`,
      answer: `ได้ครับ แจ้งจังหวัด ${province.title} รุ่น ความจุ และสภาพเครื่องพร้อมรูปหลายมุมผ่าน LINE @webuy เพื่อรับกรอบประเมินเบื้องต้นก่อนคุยเรื่องนัดหรือการส่งเครื่อง`,
    },
    {
      question: `ขายไอโฟนเครื่องมีรอยใน${province.title} ได้ไหม`,
      answer: `ได้ในหลายกรณี แต่ควรแจ้งรอยใช้งานจริงของเครื่องอย่างตรงไปตรงมา เพราะรายละเอียดสภาพมีผลต่อการประเมิน`,
    },
    {
      question: `ก่อนขายไอโฟนใน${province.title} ต้องทำอะไรกับ Apple ID`,
      answer: `ควรสำรองข้อมูล ออกจาก Apple ID และปิด Find My ให้เรียบร้อยตามขั้นตอนของระบบก่อนส่งมอบเครื่อง`,
    },
    {
      question: `ถ้าอยู่ต่างอำเภอใน${province.title} ยังเช็คราคาได้ไหม`,
      answer: `ได้ครับ เริ่มจากส่งรูปและแจ้งอำเภอคร่าว ๆ ก่อน จากนั้นค่อยคุยวิธีส่งหรือนัดที่เหมาะกับพื้นที่ของคุณ`,
    },
  ];
}

function districtFaqs(province, district) {
  return [
    {
      question: `อยู่${district} ส่งรูปประเมินราคาไอโฟนก่อนได้ไหม`,
      answer: `ได้ครับ แจ้งว่าอยู่${district} จังหวัด${province.title} พร้อมส่งรูปเครื่อง รุ่น ความจุ และอาการให้ครบก่อนคุยเรื่องนัดหรือการส่งเครื่อง`,
    },
    {
      question: `ขายไอโฟนจอแตกใน${district} ได้ไหม`,
      answer: `ได้ในหลายกรณี หากส่งรูปจอ รอยร้าว และคลิปสั้นให้เห็นการใช้งานจริง จะช่วยให้ประเมินเบื้องต้นได้ชัดขึ้น`,
    },
    {
      question: `ถ้าแบตเสื่อมและอยู่${district} ยังรับประเมินไหม`,
      answer: `รับประเมินได้ครับ ควรแนบรูป Battery Health และอธิบายอาการหมดไวหรือเครื่องร้อนของเครื่องให้ครบ`,
    },
    {
      question: `ก่อนขายไอโฟนจาก${district} ต้องเตรียมอะไร`,
      answer: `แนะนำสำรองข้อมูล ออกจาก Apple ID ปิด Find My ถ่ายรูปเครื่องหลายมุม และแจ้งรุ่น ความจุ อุปกรณ์ที่มีให้ครบ`,
    },
  ];
}

function provinceMarkdown(province, index) {
  const gallery = [pickBanner(index), ...rotateGallery(index, 3)];
  const faqs = provinceFaqs(province);
  const relatedDistricts = province.districts.slice(0, 5).map((district) => ({
    label: `รับซื้อไอโฟน${district}`,
    href: `/รับซื้อไอโฟน/${province.slug}-${district}/`,
    description: `คอนเทนต์ย่อยสำหรับพื้นที่ ${district} จังหวัด${province.title}`,
  }));

  return `---
kind: "location"
title: ${quote(province.title)}
slug: ${quote(province.slug)}
region: "ภาคอีสาน"
seoTitle: ${quote(`รับซื้อไอโฟน${province.title} ประเมินไว ส่งรูปเช็คราคาฟรี | ร้านรับซื้อไอโฟน.com`)}
h1: ${quote(`รับซื้อไอโฟน${province.title} เช็คราคาเบื้องต้นฟรี`)}
description: ${quote(`รับซื้อไอโฟน${province.title} สำหรับคนที่อยากเช็คราคาไอโฟนก่อนขาย ส่งรูปประเมินผ่าน LINE @webuy ได้ฟรี ดูรุ่น ความจุ แบต และสภาพเครื่องก่อนคุยเรื่องนัดหรือการส่งเครื่อง`)}
featuredImage: ${quote(pickBanner(index).src)}
featuredImageAlt: ${quote(pickBanner(index).alt)}
galleryImages:
${yamlGalleryImages(gallery)}
subAreas:
${yamlStringList(province.districts)}
meetingOptions:
${yamlStringList([
  `เริ่มจากส่งรูปและข้อมูลเครื่องจากจังหวัด${province.title} ผ่าน LINE @webuy ก่อน เพื่อรับกรอบประเมินเบื้องต้น`,
  `หลังประเมินแล้วค่อยคุยเรื่องพื้นที่นัดหรือวิธีส่งเครื่องตามความสะดวกของคนใน${province.title}`,
  `หากอยู่ต่างอำเภอ ให้แจ้งอำเภอคร่าว ๆ เพื่อวางแนวทางการส่งหรือนัดที่เหมาะกับพื้นที่`,
])}
highlights:
${yamlStringList([
  `ครอบคลุม intent คีย์ “รับซื้อไอโฟน${province.title}”, “ขายไอโฟน${province.title}” และ “เช็คราคาไอโฟน${province.title}”`,
  `รองรับทั้งเครื่องใช้งานปกติ เครื่องเก่า เครื่องมีรอย และเครื่องมีอาการบางส่วนโดยยึดข้อมูลจริงเป็นหลัก`,
  `เหมาะกับคนที่ต้องการเช็กราคาก่อนขาย โดยไม่ต้องประกาศราคาตายตัวบนหน้าเว็บ`,
])}
keywords:
${yamlStringList([
  `รับซื้อไอโฟน${province.title}`,
  `รับซื้อ iPhone ${province.title}`,
  `เช็คราคาไอโฟน${province.title}`,
  `ขายไอโฟน${province.title}`,
  `รับซื้อไอโฟนมือสอง${province.title}`,
])}
faqs:
${yamlFaqs(faqs)}
ctaText: "แอดไลน์ @webuy ส่งรูปประเมินจาก${province.title}"
---

## รับซื้อไอโฟน${province.title} เริ่มจากอะไร

ถ้าคุณอยู่จังหวัด${province.title} และอยากเช็คราคาไอโฟนก่อนขาย วิธีที่คุยงานง่ายที่สุดคือส่งรูปหลายมุมของเครื่อง พร้อมแจ้งรุ่น ความจุ สุขภาพแบต อุปกรณ์ที่มี และอาการใช้งานจริงผ่าน LINE @webuy ก่อนเสมอ วิธีนี้ช่วยลดการถามซ้ำ และทำให้ได้กรอบประเมินเบื้องต้นก่อนคุยเรื่องนัดหรือการส่งเครื่อง

## คนใน${province.title} มักมีคำถามอะไรตอนขายไอโฟน

คำถามที่พบบ่อยคือ “รุ่นนี้ยังขายได้ไหม”, “จอมีรอยหรือแบตเสื่อมจะมีผลแค่ไหน”, “ถ้าอยู่ต่างอำเภอจะเริ่มยังไง” และ “ต้องออกจาก Apple ID ก่อนหรือไม่” หน้านี้ตั้งใจตอบ intent หลักเหล่านี้โดยไม่อ้างราคาตายตัว เพราะราคามือสองขึ้นกับรุ่น สภาพ และข้อมูลที่ส่งมาจริง

## ปัจจัยที่มีผลต่อการประเมินใน${province.title}

- รุ่นและความจุของ iPhone
- สุขภาพแบตและการใช้งานจริง
- สภาพจอ กรอบ ฝาหลัง กล้อง และ Face ID
- เครื่องศูนย์ไทยหรือเครื่องนอก
- อุปกรณ์ที่มี เช่น กล่องหรือสายชาร์จ
- ความครบของข้อมูลและรูปที่ส่งมา

## ถ่ายรูปยังไงให้ประเมินง่ายขึ้น

แนะนำให้ส่งรูปหน้าจอ About ที่เห็นรุ่นและความจุ รูปหน้าจอเปิดติด ด้านหลังเครื่อง ขอบเครื่อง กล้อง และจุดที่มีรอยชัด ๆ หากเครื่องมีอาการ เช่น แบตหมดไว จอร้าว หรือ Face ID มีปัญหา ควรแจ้งอาการด้วยข้อความสั้น ๆ และแนบคลิปประกอบเมื่อจำเป็น

## อำเภอสำคัญในจังหวัด${province.title}

${province.districts.map((district) => `- ${district}`).join('\n')}

## พื้นที่ย่อยสำหรับจังหวัด${province.title}

${relatedDistricts.map((item) => `- [${item.label}](${item.href})`).join('\n')}

## ก่อนขายไอโฟนควรเตรียมอะไร

1. สำรองข้อมูลสำคัญ
2. ออกจาก Apple ID และปิด Find My
3. ถอดซิมและรีเซ็ตข้อมูลส่วนตัวเมื่อพร้อมขาย
4. ถ่ายรูปเครื่องหลายมุมให้ครบ
5. แจ้งรุ่น ความจุ สุขภาพแบต และอาการจริงให้ตรงไปตรงมา

## ลิงก์เกี่ยวข้องสำหรับคนที่อยู่${province.title}

- [รับซื้อไอโฟนมือสอง](/รับซื้อไอโฟนมือสอง/)
- [เช็คราคาไอโฟน](/เช็คราคาไอโฟน/)
- [ตีราคาไอโฟน](/ตีราคาไอโฟน/)
- [รับซื้อไอโฟนภาคอีสาน](/รับซื้อไอโฟน/ภาคอีสาน/)
`;
}

function districtMarkdown(province, district, index) {
  const slug = `${province.slug}-${district}`;
  const gallery = rotateGallery(index, 3);
  const faqs = districtFaqs(province, district);
  const siblings = nearbyDistricts(province, district);

  return `---
kind: "location"
title: ${quote(district)}
slug: ${quote(slug)}
region: "ภาคอีสาน"
seoTitle: ${quote(`รับซื้อไอโฟน${district} จังหวัด${province.title} ประเมินไว | ร้านรับซื้อไอโฟน.com`)}
h1: ${quote(`รับซื้อไอโฟน${district} จังหวัด${province.title} ส่งรูปเช็คราคาได้ฟรี`)}
description: ${quote(`รับซื้อไอโฟน${district} จังหวัด${province.title} สำหรับคนที่อยากเช็คราคาไอโฟนก่อนขาย ส่งรูปประเมินผ่าน LINE @webuy ได้ฟรี พร้อมแจ้งรุ่น ความจุ แบต และสภาพเครื่องให้ครบ`)}
featuredImage: ${quote(gallery[0].src)}
featuredImageAlt: ${quote(`ภาพสินค้าจริงสำหรับหน้ารับซื้อไอโฟน${district} จังหวัด${province.title}`)}
galleryImages:
${yamlGalleryImages(gallery)}
subAreas:
${yamlStringList(siblings)}
meetingOptions:
${yamlStringList([
  `เริ่มจากส่งรูปและข้อมูลเครื่องจาก ${district} จังหวัด${province.title} ผ่าน LINE @webuy`,
  `หลังประเมินเบื้องต้นแล้วค่อยคุยเรื่องพื้นที่นัดหรือวิธีส่งเครื่องตามความสะดวก`,
  `หากอยู่โซนรอบนอก ${district} ให้แจ้งอำเภอหรือจุดหลักใกล้เคียงเพื่ออธิบายแนวทางได้ชัดขึ้น`,
])}
highlights:
${yamlStringList([
  `โฟกัสคีย์ long-tail สำหรับพื้นที่ ${district} จังหวัด${province.title}`,
  `ตอบ intent คนที่อยากเช็คราคาไอโฟนก่อนขายจากพื้นที่ย่อยในอีสาน`,
  `เหมาะกับทั้งเครื่องใช้งานปกติและเครื่องมีอาการบางส่วน โดยยึดข้อมูลจริงเป็นหลัก`,
])}
keywords:
${yamlStringList([
  `รับซื้อไอโฟน${district}`,
  `รับซื้อไอโฟน${district} ${province.title}`,
  `เช็คราคาไอโฟน${district}`,
  `ขายไอโฟน${district}`,
  `รับซื้อ iPhone ${district}`,
])}
faqs:
${yamlFaqs(faqs)}
ctaText: "แอดไลน์ @webuy ส่งรูปประเมินจาก${district}"
---

## รับซื้อไอโฟน${district} จังหวัด${province.title}

คนที่อยู่${district} จังหวัด${province.title} หากอยากเช็คราคาไอโฟนก่อนขาย ควรเริ่มจากส่งรูปและข้อมูลเครื่องให้ครบก่อนเสมอ โดยเฉพาะรุ่น ความจุ สุขภาพแบต สภาพจอ กรอบ ฝาหลัง กล้อง และอาการเครื่อง จุดนี้ช่วยให้คุยงานได้ง่ายกว่าการถามแบบกว้าง ๆ ว่า “เครื่องนี้ขายได้เท่าไร”

## ส่งรูปอะไรบ้างจาก${district}

- รูปหน้า About ที่เห็นรุ่นและความจุ
- รูปหน้าจอเปิดติด
- รูปด้านหลังและขอบเครื่อง
- รูปจุดที่มีรอยหรืออาการผิดปกติ
- รูปอุปกรณ์ที่มี เช่น กล่องหรือสายชาร์จ

## ปัจจัยที่ทำให้การประเมินใน${district} ชัดขึ้น

การแจ้งข้อมูลตรงไปตรงมาช่วยให้ประเมินง่ายขึ้นมาก ไม่ว่าจะเป็นเรื่องแบตหมดไว จอร้าว กล้องไม่ชัด หรือยังออกจาก Apple ID ไม่ได้ ข้อมูลเหล่านี้ควรบอกตั้งแต่แรก เพื่อให้วางแนวทางต่อได้อย่างปลอดภัย

## พื้นที่ใกล้เคียงกับ${district}

${siblings.map((name) => `- ${name}`).join('\n')}

## ก่อนขายไอโฟนจาก${district} ควรเตรียมอะไร

1. สำรองข้อมูลและลบข้อมูลส่วนตัวเมื่อพร้อมขาย
2. ออกจาก Apple ID และปิด Find My
3. ถอดซิมและตรวจอุปกรณ์ที่มี
4. ส่งรูปหลายมุมพร้อมอธิบายอาการจริงของเครื่อง

## ลิงก์เกี่ยวข้องสำหรับคนใน${district}

- [รับซื้อไอโฟน${province.title}](/รับซื้อไอโฟน/${province.slug}/)
- [รับซื้อไอโฟนภาคอีสาน](/รับซื้อไอโฟน/ภาคอีสาน/)
- [เช็คราคาไอโฟน](/เช็คราคาไอโฟน/)
- [ขายไอโฟน](/ขายไอโฟน/)
`;
}

function hubMarkdown() {
  const provinceNames = PROVINCES.map((province) => province.title);
  const faqs = [
    {
      question: 'ภาคอีสานเช็คราคาไอโฟนก่อนขายได้ไหม',
      answer: 'ได้ครับ เริ่มจากส่งรูป รุ่น ความจุ แบต และข้อมูลพื้นที่คร่าว ๆ ผ่าน LINE @webuy เพื่อรับกรอบประเมินเบื้องต้นก่อน',
    },
    {
      question: 'ถ้าอยู่ต่างจังหวัดในภาคอีสานต้องเริ่มยังไง',
      answer: 'ให้เริ่มจากส่งรูปประเมินก่อน แล้วค่อยคุยเรื่องอำเภอ จังหวัด และวิธีส่งหรือนัดตามความสะดวกของพื้นที่',
    },
    {
      question: 'ภาคอีสานรองรับทั้งเครื่องปกติและเครื่องมีอาการไหม',
      answer: 'รองรับการประเมินหลายกรณี โดยยึดข้อมูลจริงของรุ่น สภาพ แบต จอ กล้อง และสถานะบัญชีผู้ใช้เป็นหลัก',
    },
  ];

  return `---
kind: "location"
title: "ภาคอีสาน"
slug: "ภาคอีสาน"
region: "ภาคอีสาน"
seoTitle: "รับซื้อไอโฟนภาคอีสาน เช็คราคาได้ทุกจังหวัด | ร้านรับซื้อไอโฟน.com"
h1: "รับซื้อไอโฟนภาคอีสาน ส่งรูปเช็คราคาได้ทุกจังหวัด"
description: "ฮับรวมคอนเทนต์รับซื้อไอโฟนภาคอีสาน ครอบคลุมคีย์จังหวัดและอำเภอสำหรับคนที่อยากเช็คราคาไอโฟนก่อนขาย ส่งรูปประเมินผ่าน LINE @webuy ได้ฟรี"
featuredImage: ${quote(BANNERS[0].src)}
featuredImageAlt: ${quote(BANNERS[0].alt)}
galleryImages:
${yamlGalleryImages([BANNERS[0], BANNERS[1], ...rotateGallery(0, 3)])}
subAreas:
${yamlStringList(provinceNames)}
meetingOptions:
${yamlStringList([
  'เริ่มจากส่งรูปและข้อมูลเครื่องก่อนทุกจังหวัดในภาคอีสาน',
  'หลังประเมินเบื้องต้นแล้วค่อยคุยเรื่องอำเภอ จังหวัด และวิธีส่งหรือจุดนัดที่เหมาะกับพื้นที่',
  'ไม่ประกาศราคาตายตัวบนหน้าเว็บ เพราะการประเมินต้องยึดรุ่นและสภาพจริงของเครื่อง',
])}
highlights:
${yamlStringList([
  'ครอบคลุม GEO keyword ระดับภาค จังหวัด และอำเภอในภาคอีสาน',
  'รองรับทั้งคีย์รับซื้อไอโฟน เช็คราคาไอโฟน ตีราคาไอโฟน และขายไอโฟน',
  'เชื่อมลิงก์ไปยังหน้าพื้นที่ย่อยเพื่อให้ค้นหา intent ได้ละเอียดขึ้น',
])}
keywords:
${yamlStringList([
  'รับซื้อไอโฟนภาคอีสาน',
  'เช็คราคาไอโฟนภาคอีสาน',
  'ขายไอโฟนอีสาน',
  'รับซื้อ iPhone ภาคอีสาน',
  'รับซื้อไอโฟนมือสองภาคอีสาน',
])}
faqs:
${yamlFaqs(faqs)}
ctaText: "แอดไลน์ @webuy ส่งรูปประเมินจากภาคอีสาน"
---

## ฮับรับซื้อไอโฟนภาคอีสาน

หน้านี้เป็นฮับรวมคอนเทนต์ GEO สำหรับภาคอีสาน ใช้เชื่อมทั้งคีย์ระดับภาค ระดับจังหวัด และระดับอำเภอ เพื่อให้คนที่อยากขายไอโฟนสามารถเริ่มจากหน้า intent ที่ใกล้กับพื้นที่ของตัวเองมากที่สุด แล้วค่อยส่งรูปประเมินผ่าน LINE @webuy

## จังหวัดในภาคอีสานที่มีคอนเทนต์แยกหน้า

${PROVINCES.map((province) => `- [รับซื้อไอโฟน${province.title}](/รับซื้อไอโฟน/${province.slug}/)`).join('\n')}

## ควรส่งข้อมูลอะไรเมื่ออยู่ภาคอีสาน

- รุ่นและความจุ
- สุขภาพแบตหรืออาการที่พบ
- รูปหน้าจอ ด้านหลัง ขอบ และกล้อง
- จังหวัดและอำเภอคร่าว ๆ
- อุปกรณ์ที่มี

## ลิงก์สำคัญ

- [รับซื้อไอโฟนมือสอง](/รับซื้อไอโฟนมือสอง/)
- [เช็คราคาไอโฟน](/เช็คราคาไอโฟน/)
- [ตีราคาไอโฟน](/ตีราคาไอโฟน/)
- [ขายไอโฟน](/ขายไอโฟน/)
`;
}

function blogFrontmatter({ title, description, slug, date, category, summary, featuredImage, featuredImageAlt, galleryImages, keywords, faqs, relatedLinks, ctaText }) {
  return `---
title: ${quote(title)}
description: ${quote(description)}
slug: ${quote(slug)}
date: ${quote(date)}
dateModified: ${quote(date)}
category: ${quote(category)}
featuredImage: ${quote(featuredImage)}
featuredImageAlt: ${quote(featuredImageAlt)}
galleryImages:
${yamlGalleryImages(galleryImages)}
keywords:
${yamlStringList(keywords)}
summary: ${quote(summary)}
faqs:
${yamlFaqs(faqs)}
relatedLinks:
${yamlRelatedLinks(relatedLinks)}
ctaText: ${quote(ctaText)}
---
`;
}

function blogBody(model, topic, index) {
  const transactionalLink = `/รับซื้อไอโฟน/${model.transactionSlug}/`;
  const conditionLink = CONDITION_LINKS[index % CONDITION_LINKS.length];
  return `## คำตอบสั้นสำหรับคนที่กำลังจะขาย ${model.name}

${topic.answer(model)}

## ทำไม ${model.name} ถึงควรส่งรูปประเมินก่อนคุยรายละเอียด

การส่งรูปหลายมุมของ ${model.name} ช่วยให้เห็นข้อมูลที่กระทบต่อการประเมินจริง เช่น รุ่น ความจุ สุขภาพแบต รอยใช้งาน กล้อง ฝาหลัง และอาการเครื่อง ทำให้คุยงานได้เร็วขึ้นและลดการถามซ้ำ โดยเฉพาะถ้าคุณต้องการเช็คราคาไอโฟนก่อนขายแต่ยังไม่พร้อมตัดสินใจทันที

## จุดที่ควรตรวจเองก่อนส่งประเมิน

1. ดูรุ่นและความจุจากเมนู About
2. ดู Battery Health ถ้าเครื่องเปิดติด
3. ถ่ายรูปหน้าจอ ด้านหลัง ขอบ และกล้อง
4. แจ้งให้ชัดว่าเป็นเครื่องศูนย์ไทยหรือเครื่องนอก
5. แจ้งอุปกรณ์ที่มี เช่น กล่องหรือสายชาร์จ

## ${model.name} กรณีมีอาการ ต้องบอกอะไรให้ครบ

ถ้า ${model.name} มีอาการ เช่น แบตหมดไว จอแตก Face ID ใช้ไม่ได้ หรือยังออกจาก Apple ID ไม่ได้ ควรบอกให้ชัดตั้งแต่แรก เพราะข้อมูลพวกนี้มีผลต่อแนวทางประเมินและการเตรียมเครื่องก่อนขาย การบอกอาการตรงไปตรงมาช่วยลดปัญหาความเข้าใจไม่ตรงกันภายหลัง

## วิธีส่งรูป ${model.name} ให้คุยงานง่ายขึ้น

- รูปหน้า About ที่เห็นชื่อรุ่นและความจุ
- รูปหน้าจอเปิดติด
- รูปด้านหลังและขอบเครื่อง
- รูปกล้องและจุดที่มีรอย
- คลิปสั้นถ้ามีอาการเฉพาะ เช่น ทัชรวนหรือกล้องสั่น

## ก่อนขาย ${model.name} ควรเตรียมอะไร

แนะนำสำรองข้อมูล ออกจาก Apple ID ปิด Find My ถอดซิม และตรวจว่ารูปหรือไฟล์สำคัญถูกย้ายออกแล้ว จากนั้นค่อยส่งรูปประเมินผ่าน LINE @webuy เพื่อรับกรอบเบื้องต้นก่อนนัดหรือส่งเครื่อง

## ลิงก์เกี่ยวข้อง

- [หน้ารับซื้อ ${model.name}](${transactionalLink})
- [${conditionLink.label}](${conditionLink.href})
- [เช็คราคาไอโฟน](/เช็คราคาไอโฟน/)
- [ขายไอโฟน](/ขายไอโฟน/)
`;
}

function buildBlogPost(model, topic, index) {
  const featured = modelFeaturedImage(model, index);
  const galleryImages = [featured, ...rotateGallery(index + 1, 2)];
  const slug = `${model.slug}-${topic.key}`;
  const title = topic.title(model);
  const description = topic.description(model);
  const summary = topic.summary(model);
  const date = blogDate(index);
  const faqs = [
    { question: topic.question(model), answer: topic.answer(model) },
    {
      question: `ถ้า ${model.name} มีรอยใช้งานยังประเมินได้ไหม`,
      answer: `ประเมินได้ครับ เพียงส่งรูปหลายมุมของ ${model.name} ให้เห็นรอยจริง พร้อมแจ้งว่าใช้งานได้ปกติแค่ไหน`,
    },
    {
      question: `ต้องออกจาก Apple ID ก่อนส่งรูป ${model.name} ไหม`,
      answer: `ไม่จำเป็นต้องออกจากบัญชีก่อนส่งรูป แต่ก่อนโอนเครื่องควรออกจาก Apple ID และปิด Find My ให้เรียบร้อยตามขั้นตอนของระบบ`,
    },
  ];
  const relatedLinks = [
    {
      label: `หน้ารับซื้อ ${model.name}`,
      href: `/รับซื้อไอโฟน/${model.transactionSlug}/`,
      description: `หน้าหลักสำหรับ intent เชิงธุรกรรมของ ${model.name}`,
    },
    {
      label: 'เช็คราคาไอโฟน',
      href: '/เช็คราคาไอโฟน/',
      description: 'แนวทางประเมินราคาไอโฟนก่อนขาย',
    },
    {
      label: 'รับซื้อไอโฟนมือสอง',
      href: '/รับซื้อไอโฟนมือสอง/',
      description: 'ฮับรวมบริการรับซื้อไอโฟนมือสอง',
    },
  ];

  const content = `${blogFrontmatter({
    title,
    description,
    slug,
    date,
    category: topic.category,
    summary,
    featuredImage: featured.src,
    featuredImageAlt: featured.alt,
    galleryImages,
    keywords: [
      `รับซื้อ${model.name}`,
      `เช็คราคา ${model.name}`,
      `ขาย ${model.name} มือสอง`,
      `${model.name} ขายได้ไหม`,
      `ประเมินราคา ${model.name}`,
    ],
    faqs,
    relatedLinks,
    ctaText: `แอดไลน์ @webuy ส่งรูป ${model.name}`,
  })}
${blogBody(model, topic, index)}
`;

  return { slug, content };
}

function buildExtraBlogPost(item, index) {
  const featured = pickBanner(index);
  const galleryImages = [featured, ...rotateGallery(index, 3)];
  const relatedLinks = [
    {
      label: 'รับซื้อไอโฟนภาคอีสาน',
      href: '/รับซื้อไอโฟน/ภาคอีสาน/',
      description: 'ฮับพื้นที่ภาคอีสาน',
    },
    {
      label: 'พื้นที่ให้บริการ',
      href: '/พื้นที่ให้บริการ/',
      description: 'รวมพื้นที่ที่เว็บมีคอนเทนต์รองรับ',
    },
    {
      label: 'เช็คราคาไอโฟน',
      href: '/เช็คราคาไอโฟน/',
      description: 'รวมแนวทางเช็คราคาไอโฟนก่อนขาย',
    },
  ];
  const faqs = [
    {
      question: item.title.includes('ภาคอีสาน') ? 'ภาคอีสานควรเริ่มส่งรูปประเมินยังไง' : 'คีย์หลักคีย์รองรับซื้อไอโฟนต่างกันยังไง',
      answer:
        item.title.includes('ภาคอีสาน')
          ? 'เริ่มจากแจ้งจังหวัด อำเภอ รุ่น ความจุ สภาพเครื่อง และส่งรูปหลายมุมให้ครบก่อนคุยเรื่องนัดหรือการส่งเครื่อง'
          : 'คีย์หลักมักเป็น intent กว้าง เช่น รับซื้อไอโฟนหรือเช็คราคาไอโฟน ส่วนคีย์รองจะเจาะรุ่น สภาพเครื่อง หรือพื้นที่ให้บริการมากขึ้น',
    },
    {
      question: 'ทำไมต้องแยกหน้า intent ให้ชัด',
      answer: 'เพราะ intent ของคนค้นหาแต่ละคำไม่เหมือนกัน การแยกหน้า transactional, informational และ geo ช่วยให้ตอบคำถามผู้ใช้และจัด internal link ได้แม่นขึ้น',
    },
    {
      question: 'บทความแบบนี้ช่วยเรื่อง SEO และ AEO ยังไง',
      answer: 'บทความที่ตอบคำถามสั้นได้ชัด มีหัวข้อ intent ตรง และมีลิงก์เชื่อมไปหน้าธุรกรรม ช่วยให้ครอบคลุมทั้งการค้นหาแบบเว็บและการตอบคำถามแบบ AEO',
    },
  ];

  const body = item.slug === 'geo-guide-isan-iphone-selling'
    ? `## ถ้าอยู่ภาคอีสานและอยากขายไอโฟน ควรเริ่มจากอะไร

ให้เริ่มจากส่งรูปเครื่อง รุ่น ความจุ สุขภาพแบต สภาพจอ และแจ้งจังหวัดหรืออำเภอคร่าว ๆ ก่อนทุกครั้ง วิธีนี้ช่วยให้วางแนวทางต่อได้ง่ายกว่าเริ่มจากถามราคาแบบกว้าง ๆ โดยไม่มีข้อมูลเครื่อง

## ข้อมูลพื้นที่ที่ควรแจ้ง

- จังหวัด
- อำเภอหรือโซนหลักใกล้เคียง
- ความสะดวกในการส่งหรือนัด
- เวลาที่สะดวกคุยหรือรับสาย

## ลิงก์พื้นที่อีสานที่ควรเปิดต่อ

${PROVINCES.slice(0, 10).map((province) => `- [รับซื้อไอโฟน${province.title}](/รับซื้อไอโฟน/${province.slug}/)`).join('\n')}

## รูปแบบคอนเทนต์ที่ตอบ GEO intent ได้ดี

หน้าระดับจังหวัดเหมาะกับคีย์กว้าง ส่วนหน้าระดับอำเภอเหมาะกับคีย์ long-tail ที่ผู้ใช้ต้องการหาพื้นที่ใกล้ตัวมากขึ้น เมื่อเชื่อมกันด้วย internal link จะช่วยให้ค้นหาจากหลายคำเจอเส้นทางที่เหมาะกับตัวเองง่ายขึ้น
`
    : `## คีย์หลักรับซื้อไอโฟนคืออะไร

คีย์หลักมักเป็นคำที่ผู้ใช้มี intent กว้างและมีปริมาณค้นหาสูง เช่น รับซื้อไอโฟน รับซื้อ iPhone เช็คราคาไอโฟน ตีราคาไอโฟน และขายไอโฟน ซึ่งควรมีหน้า hub หรือหน้าบริการที่ชัดเจนรองรับ

## คีย์รองควรแตกออกจากอะไรบ้าง

- รุ่น เช่น iPhone 15, iPhone 15 Pro Max, iPhone SE
- สภาพเครื่อง เช่น จอแตก แบตเสื่อม ติด iCloud เปิดไม่ติด
- พื้นที่ เช่น จังหวัดและอำเภอ
- intent คำถาม เช่น ขายได้ไหม ส่งรูปยังไง ต้องเตรียมอะไร

## ทำไมการแยกหน้าแบบนี้ช่วยทั้ง SEO และ AEO

เพราะแต่ละหน้าโฟกัสคำถามและคำตอบที่เจาะขึ้น ทำให้ทั้งคนอ่านและระบบค้นหาเข้าใจได้ง่ายว่า หน้านี้ถูกสร้างมาเพื่อตอบ intent ไหน และควรเชื่อมไปหน้าธุรกรรมหรือหน้าข้อมูลใดต่อ
`;

  const content = `${blogFrontmatter({
    title: item.title,
    description: item.description,
    slug: item.slug,
    date: item.date,
    category: item.category,
    summary: item.summary,
    featuredImage: featured.src,
    featuredImageAlt: featured.alt,
    galleryImages,
    keywords: item.slug === 'geo-guide-isan-iphone-selling'
      ? ['รับซื้อไอโฟนภาคอีสาน', 'เช็คราคาไอโฟนอีสาน', 'ขายไอโฟนภาคอีสาน', 'รับซื้อ iPhone ภาคอีสาน', 'GEO รับซื้อไอโฟน']
      : ['คีย์หลักรับซื้อไอโฟน', 'คีย์รองรับซื้อไอโฟน', 'SEO รับซื้อไอโฟน', 'AEO รับซื้อไอโฟน', 'เช็คราคาไอโฟน intent'],
    faqs,
    relatedLinks,
    ctaText: 'แอดไลน์ @webuy ส่งรูปประเมินราคา',
  })}
${body}
`;

  return { slug: item.slug, content };
}

function run() {
  ensureCleanDir(blogOutDir);
  ensureCleanDir(districtOutDir);

  let blogCount = 0;
  let districtCount = 0;

  PROVINCES.forEach((province, provinceIndex) => {
    writeFile(path.join(locationsRoot, `${province.slug}.md`), provinceMarkdown(province, provinceIndex));

    province.districts.forEach((district, districtIndex) => {
      const fileName = `${province.slug}-${district}.md`;
      writeFile(path.join(districtOutDir, fileName), districtMarkdown(province, district, provinceIndex * 20 + districtIndex));
      districtCount += 1;
    });
  });

  writeFile(path.join(locationsRoot, 'ภาคอีสาน.md'), hubMarkdown());

  let blogIndex = 0;
  for (const model of MODELS) {
    for (const topic of BLOG_TOPICS) {
      const post = buildBlogPost(model, topic, blogIndex);
      writeFile(path.join(blogOutDir, `${post.slug}.md`), post.content);
      blogCount += 1;
      blogIndex += 1;
    }
  }

  EXTRA_BLOGS.forEach((item, extraIndex) => {
    const post = buildExtraBlogPost(item, blogIndex + extraIndex);
    writeFile(path.join(blogOutDir, `${post.slug}.md`), post.content);
    blogCount += 1;
  });

  const expectedBlogs = MODELS.length * BLOG_TOPICS.length + EXTRA_BLOGS.length;
  if (blogCount !== expectedBlogs) {
    throw new Error(`Expected ${expectedBlogs} blog posts but wrote ${blogCount}`);
  }

  const expectedDistricts = PROVINCES.reduce((sum, province) => sum + province.districts.length, 0);
  if (districtCount !== expectedDistricts) {
    throw new Error(`Expected ${expectedDistricts} district pages but wrote ${districtCount}`);
  }

  console.log(
    JSON.stringify(
      {
        blogCount,
        districtCount,
        overwrittenProvincePages: PROVINCES.length,
        overwrittenHubPages: 1,
      },
      null,
      2,
    ),
  );
}

run();
