import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const assetsDir = path.resolve(
  process.env.USERPROFILE ?? root,
  '.cursor',
  'projects',
  'c-Users-User-Desktop-project',
  'assets'
);

const outDir = path.resolve(root, 'public', 'images');
await fs.mkdir(outDir, { recursive: true });

const mapping = [
  {
    inputBasenameContains: '14_27_07',
    output: 'webuy-iphone-hero-legacy.webp',
    alt: 'รับซื้อไอโฟนมือสอง ประเมินผ่านไลน์ @webuy',
    width: 1200,
  },
  {
    inputBasenameContains: '14_22_58',
    output: 'webuy-iphone-banner-legacy.webp',
    alt: 'รับซื้อ iPhone มือสอง ส่งรูปประเมินก่อนตัดสินใจ',
    width: 1200,
  },
  {
    inputBasenameContains: '14_31_00',
    output: 'webuy-iphone-delivery-legacy.webp',
    alt: 'สอบถามวิธีนัดรับหรือส่งเครื่องผ่านไลน์ @webuy',
    width: 1200,
  },
  {
    inputBasenameContains: '14_25_09',
    output: 'webuy-iphone-logo-banner-legacy.webp',
    alt: 'ร้านรับซื้อไอโฟน.com',
    width: 1200,
  },
  {
    inputBasenameContains: '14_16_39',
    output: 'webuy-iphone-og-legacy.webp',
    alt: 'รับซื้อไอโฟน ประเมินตามสภาพจริง ผ่านไลน์ @webuy',
    width: 1200,
  },
];

async function listPngFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...(await listPngFiles(p)));
    else if (e.isFile() && p.toLowerCase().endsWith('.png')) files.push(p);
  }
  return files;
}

const pngFiles = await listPngFiles(assetsDir);

const outputs = [];
for (const m of mapping) {
  const src = pngFiles.find((p) => path.basename(p).includes(m.inputBasenameContains));
  if (!src) {
    console.warn(`[skip] Not found for key: ${m.inputBasenameContains}`);
    continue;
  }

  const dest = path.join(outDir, m.output);
  await sharp(src)
    .resize({ width: m.width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);

  outputs.push({ file: `/images/${m.output}`, alt: m.alt });
  console.log(`[ok] ${path.basename(src)} -> ${dest}`);
}

// Avoid overwriting curated public/images/image-manifest.json — write sidecar for this script only.
await fs.writeFile(
  path.join(outDir, 'image-manifest-convert-assets-legacy.json'),
  JSON.stringify(outputs, null, 2),
  'utf8'
);
console.log('[done] Wrote /public/images/image-manifest-convert-assets-legacy.json');

