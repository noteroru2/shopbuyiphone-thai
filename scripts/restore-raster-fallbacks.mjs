import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

const files = [
  {
    target: 'public/images/gallery/banners/banner-counter-showcase.png',
    source: 'public/images/gallery/banners/banner-counter-showcase.webp',
    format: 'png',
  },
  {
    target: 'public/images/gallery/banners/banner-hero-gold.png',
    source: 'public/images/gallery/banners/banner-hero-gold.webp',
    format: 'png',
  },
  {
    target: 'public/images/gallery/banners/banner-premium-line.png',
    source: 'public/images/gallery/banners/banner-premium-line.webp',
    format: 'png',
  },
  {
    target: 'public/images/gallery/real-phones/iphone-orange-back.jpg',
    source: 'public/images/gallery/real-phones/iphone-orange-back.webp',
    format: 'jpeg',
  },
  {
    target: 'public/images/gallery/real-phones/iphone-orange-box.jpg',
    source: 'public/images/gallery/real-phones/iphone-orange-box.webp',
    format: 'jpeg',
  },
  {
    target: 'public/images/gallery/real-phones/iphone-orange-front.jpg',
    source: 'public/images/gallery/real-phones/iphone-orange-front.webp',
    format: 'jpeg',
  },
  {
    target: 'public/images/gallery/real-phones/iphone15-black-back.jpg',
    source: 'public/images/gallery/real-phones/iphone15-black-back.webp',
    format: 'jpeg',
  },
  {
    target: 'public/images/gallery/real-phones/iphone15-black-front.jpg',
    source: 'public/images/gallery/real-phones/iphone15-black-front.webp',
    format: 'jpeg',
  },
  {
    target: 'public/images/hero-webuy-campaign.png',
    source: 'public/images/hero-webuy-campaign.webp',
    format: 'png',
  },
];

async function restoreOne(file) {
  const source = path.join(root, file.source);
  const target = path.join(root, file.target);

  if (!fs.existsSync(source)) {
    throw new Error(`Missing source file: ${file.source}`);
  }

  const image = sharp(source).rotate();

  if (file.format === 'png') {
    await image.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(target);
  } else {
    await image.jpeg({ quality: 82, mozjpeg: true }).toFile(target);
  }

  return {
    source: file.source,
    target: file.target,
    bytes: fs.statSync(target).size,
  };
}

async function run() {
  const restored = [];

  for (const file of files) {
    restored.push(await restoreOne(file));
  }

  console.log(JSON.stringify({ restored }, null, 2));
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
