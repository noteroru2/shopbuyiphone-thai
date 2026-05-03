import fs from 'node:fs';
import path from 'node:path';

const blogDir = path.join(process.cwd(), 'src', 'content', 'blog');
const files = fs
  .readdirSync(blogDir)
  .filter((n) => n.endsWith('.md'))
  .map((n) => path.join('src', 'content', 'blog', n));

function stripFrontmatter(s) {
  if (!s.startsWith('---')) return s;
  const idx = s.indexOf('\n---', 3);
  if (idx === -1) return s;
  const after = s.indexOf('\n', idx + 4);
  return after === -1 ? '' : s.slice(after + 1);
}

const segmenter = new Intl.Segmenter('th', { granularity: 'word' });

function normalizeBody(raw) {
  return stripFrontmatter(raw)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/\[[^\]]*\]\([^\)]*\)/g, ' ')
    .replace(/[#>*_\-]{1,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function countWords(raw) {
  const body = normalizeBody(raw);
  if (!body) return 0;
  let count = 0;
  for (const seg of segmenter.segment(body)) {
    if (seg.isWordLike) count += 1;
  }
  return count;
}

const cwd = process.cwd();
for (const file of files.sort()) {
  const abs = path.join(cwd, file);
  const raw = fs.readFileSync(abs, 'utf8');
  const wc = countWords(raw);
  // eslint-disable-next-line no-console
  console.log(String(wc).padStart(5, ' '), file);
}
