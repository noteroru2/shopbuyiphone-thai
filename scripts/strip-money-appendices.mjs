import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dir = path.join(root, 'src', 'components', 'pillars');
const files = [
  'money-buy-iphone-pillar.mdx',
  'money-check-price-pillar.mdx',
  'money-used-iphone-pillar.mdx',
  'money-sell-iphone-pillar.mdx',
  'money-quote-iphone-pillar.mdx',
];

for (const f of files) {
  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');
  if (s.includes('MoneySharedPracticalAppendix')) {
    console.log('skip (already)', f);
    continue;
  }
  const marker = '## ภาคผนวก';
  const i = s.indexOf(marker);
  if (i === -1) {
    console.log('skip (no marker)', f);
    continue;
  }
  const head = s.slice(0, i).trimEnd();
  const fmMatch = head.match(/^---[\s\S]*?---/);
  if (!fmMatch) {
    console.log('skip (no frontmatter)', f);
    continue;
  }
  const endFm = fmMatch[0].length;
  const before = head.slice(0, endFm);
  const after = head.slice(endFm).replace(/^\s+/, '\n\n');
  const out =
    before +
    "\n\nimport MoneySharedPracticalAppendix from './money-shared-practical-appendix.mdx';\n\n" +
    after.trimStart() +
    '\n\n<MoneySharedPracticalAppendix />\n';
  fs.writeFileSync(p, out);
  console.log('ok', f);
}
