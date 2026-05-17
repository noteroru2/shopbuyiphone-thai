import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const REAL_GALLERY = [
  {
    src: '/images/gallery/real-phones/iphone15-black-front.webp',
    alt: 'ภาพสินค้าจริง iPhone หน้าจอเปิดใช้งาน',
  },
  {
    src: '/images/gallery/real-phones/iphone15-black-back.webp',
    alt: 'ภาพสินค้าจริง iPhone ด้านหลังสีดำ',
  },
  {
    src: '/images/gallery/real-phones/iphone-orange-front.webp',
    alt: 'ภาพสินค้าจริง iPhone สีส้มหน้าจอเปิดใช้งาน',
  },
  {
    src: '/images/gallery/real-phones/iphone-orange-back.webp',
    alt: 'ภาพสินค้าจริง iPhone สีส้มด้านหลัง',
  },
  {
    src: '/images/gallery/real-phones/iphone-orange-box.webp',
    alt: 'ภาพสินค้าจริง iPhone พร้อมกล่องสินค้า',
  },
];

const CONTENT_DIRS = [
  'src/content/models',
  'src/content/conditions',
  'src/content/locations',
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function hash(value) {
  let acc = 0;
  for (let i = 0; i < value.length; i += 1) {
    acc = (Math.imul(33, acc) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(acc);
}

function rotateGallery(seed, count = 3) {
  return Array.from({ length: count }, (_, index) => REAL_GALLERY[(seed + index) % REAL_GALLERY.length]);
}

function parseFrontmatter(file) {
  const text = fs.readFileSync(file, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return null;
  return {
    original: text,
    frontmatter: match[1],
    body: match[2],
  };
}

function quote(value) {
  return JSON.stringify(value);
}

function galleryYaml(gallery) {
  return gallery
    .map((image) => `  - src: ${quote(image.src)}\n    alt: ${quote(image.alt)}`)
    .join('\n');
}

function extractValue(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match ? match[1].trim() : '';
}

function extractExistingGallery(frontmatter) {
  const match = frontmatter.match(/^galleryImages:\r?\n((?:  - src:.*\r?\n    alt:.*\r?\n?)*)/m);
  if (!match) return [];

  const block = match[1];
  const items = [...block.matchAll(/  - src:\s*"?([^\r\n"]+)"?\r?\n    alt:\s*"?([^\r\n"]+)"?/g)];
  return items.map((item) => ({
    src: item[1],
    alt: item[2],
  }));
}

function buildFeaturedAlt(kind, title) {
  if (kind === 'model') return `ภาพสินค้าจริงสำหรับหน้ารับซื้อ ${title}`;
  if (kind === 'condition') return `ภาพสินค้าจริงสำหรับหน้าไอโฟน${title}`;
  return `ภาพสินค้าจริงสำหรับหน้ารับซื้อไอโฟน${title}`;
}

function updateFrontmatter(file, parsed) {
  let frontmatter = parsed.frontmatter;
  const kind = extractValue(frontmatter, 'kind').replaceAll('"', '') || 'location';
  const title = extractValue(frontmatter, 'title').replaceAll('"', '') || path.basename(file, path.extname(file));
  const slug = extractValue(frontmatter, 'slug').replaceAll('"', '') || title;

  const existingGallery = extractExistingGallery(frontmatter).filter((image) => image.src.endsWith('.webp'));
  const gallery = existingGallery.length ? existingGallery : rotateGallery(hash(slug), 3);
  const featuredImage = gallery[0].src;
  const featuredImageAlt = buildFeaturedAlt(kind, title);

  frontmatter = frontmatter.replace(/^featuredImage:\s*.+$/m, `featuredImage: ${quote(featuredImage)}`);

  if (/^featuredImageAlt:\s*.+$/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(/^featuredImageAlt:\s*.+$/m, `featuredImageAlt: ${quote(featuredImageAlt)}`);
  } else {
    frontmatter = frontmatter.replace(
      /^featuredImage:\s*.+$/m,
      `featuredImage: ${quote(featuredImage)}\nfeaturedImageAlt: ${quote(featuredImageAlt)}`,
    );
  }

  if (/^galleryImages:\s*$/m.test(frontmatter)) {
    frontmatter = frontmatter.replace(/^galleryImages:\r?\n((?:  - src:.*\r?\n    alt:.*\r?\n?)*)/m, `galleryImages:\n${galleryYaml(gallery)}\n`);
  } else {
    const anchorPattern = /^(popularModels|whatWeBuy|subAreas|meetingOptions|highlights|keywords|faqs|ctaText):/m;
    if (anchorPattern.test(frontmatter)) {
      frontmatter = frontmatter.replace(anchorPattern, `galleryImages:\n${galleryYaml(gallery)}\n$1:`);
    } else {
      frontmatter += `\ngalleryImages:\n${galleryYaml(gallery)}`;
    }
  }

  return `---\n${frontmatter}\n---\n${parsed.body}`;
}

function run() {
  const files = CONTENT_DIRS
    .map((dir) => path.join(root, dir))
    .flatMap((dir) => walk(dir))
    .filter((file) => /\.mdx?$/.test(file));

  let updated = 0;

  for (const file of files) {
    const parsed = parseFrontmatter(file);
    if (!parsed) continue;

    const hasSvgFeaturedImage = /^featuredImage:\s*"?[^"\r\n]+\.svg"?$/m.test(parsed.frontmatter);
    const hasGallery = /^galleryImages:\s*$/m.test(parsed.frontmatter);

    if (!hasSvgFeaturedImage && hasGallery) continue;

    const next = updateFrontmatter(file, parsed);
    if (next !== parsed.original) {
      fs.writeFileSync(file, next, 'utf8');
      updated += 1;
    }
  }

  console.log(JSON.stringify({ updated }, null, 2));
}

run();
