import fs from 'node:fs';
import path from 'node:path';

const files = [
  'src/pages/รับซื้อไอโฟนมือสอง.astro',
  'src/pages/รับซื้อ-iphone.astro',
  'src/pages/ขายไอโฟน.astro',
  'src/pages/เช็คราคาไอโฟน.astro',
  'src/pages/ตีราคาไอโฟน.astro',
  'src/pages/รับซื้อไอโฟน/index.astro',
  'src/pages/พื้นที่ให้บริการ/index.astro',
  'src/pages/คำถามที่พบบ่อย/index.astro',
];

function stripFrontmatterIfAny(s) {
  if (!s.startsWith('---')) return s;
  const idx = s.indexOf('\n---', 3);
  if (idx === -1) return s;
  const after = s.indexOf('\n', idx + 4);
  return after === -1 ? '' : s.slice(after + 1);
}

function normalizeBody(raw) {
  return stripFrontmatterIfAny(raw)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\{[^}]*\}/g, ' ')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[[^\]]*\]\([^\)]*\)/g, ' ')
    .replace(/[#>*_\-]{1,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const segmenter = new Intl.Segmenter('th', { granularity: 'word' });

function countThaiWords(raw) {
  const body = normalizeBody(raw);
  if (!body) return 0;
  let count = 0;
  for (const seg of segmenter.segment(body)) {
    if (seg.isWordLike) count += 1;
  }
  return count;
}

const cwd = process.cwd();
for (const file of files) {
  const abs = path.join(cwd, file);
  if (!fs.existsSync(abs)) {
    // eslint-disable-next-line no-console
    console.log(' skip', file, '(missing)');
    continue;
  }
  const raw = fs.readFileSync(abs, 'utf8');
  const wc = countThaiWords(raw);
  // eslint-disable-next-line no-console
  console.log(String(wc).padStart(5, ' '), file);
}
