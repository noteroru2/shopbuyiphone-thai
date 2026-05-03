/**
 * นับคำภาษาไทยแบบประมาณด้วย Intl.Segmenter (granularity: word)
 * ใช้: node scripts/count-thai-words.mjs <path>
 */
import fs from 'node:fs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/count-thai-words.mjs <file>');
  process.exit(1);
}

let text = fs.readFileSync(file, 'utf8');
// ตัด frontmatter MD/MDX
if (text.startsWith('---')) {
  const end = text.indexOf('\n---\n', 3);
  if (end !== -1) text = text.slice(end + 5);
}
// ตัด markdown syntax หยาบ ๆ เพื่อให้นับใกล้เคียง “คำในเนื้อหา”
text = text.replace(/```[\s\S]*?```/g, ' ');
text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
text = text.replace(/[#>*_\-`]/g, ' ');

const seg = new Intl.Segmenter('th', { granularity: 'word' });
let words = 0;
for (const s of seg.segment(text)) {
  if (s.isWordLike) words += 1;
}
console.log(JSON.stringify({ file, thWordsApprox: words, chars: text.length }, null, 0));
