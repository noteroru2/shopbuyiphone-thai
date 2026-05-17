import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const removeSourceFiles = process.argv.includes('--delete-source');

const rasterFiles = [
  'public/images/gallery/banners/banner-counter-showcase.png',
  'public/images/gallery/banners/banner-hero-gold.png',
  'public/images/gallery/banners/banner-premium-line.png',
  'public/images/gallery/real-phones/iphone-orange-back.jpg',
  'public/images/gallery/real-phones/iphone-orange-box.jpg',
  'public/images/gallery/real-phones/iphone-orange-front.jpg',
  'public/images/gallery/real-phones/iphone15-black-back.jpg',
  'public/images/gallery/real-phones/iphone15-black-front.jpg',
  'public/images/hero-webuy-campaign.png',
];

const textRoots = ['src', 'public'];

const replacements = new Map(
  rasterFiles.map((relativePath) => {
    const normalized = relativePath.replaceAll('\\', '/');
    const publicPath = normalized.replace(/^public/, '');
    const webpPublicPath = publicPath.replace(/\.(png|jpe?g)$/i, '.webp');
    return [publicPath, webpPublicPath];
  }),
);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

async function convertOne(relativePath) {
  const sourcePath = path.join(root, relativePath);
  const targetPath = sourcePath.replace(/\.(png|jpe?g)$/i, '.webp');

  if (!fs.existsSync(sourcePath)) {
    return {
      sourcePath,
      targetPath,
      skipped: fs.existsSync(targetPath),
    };
  }

  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const pipeline = image.rotate();

  if ((metadata.width ?? 0) >= 1800 || (metadata.height ?? 0) >= 1800) {
    pipeline.resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await pipeline.webp({ quality: 78, effort: 6 }).toFile(targetPath);

  const before = fs.statSync(sourcePath).size;
  const after = fs.statSync(targetPath).size;

  if (removeSourceFiles) {
    fs.unlinkSync(sourcePath);
  }

  return {
    sourcePath,
    targetPath,
    before,
    after,
    skipped: false,
  };
}

function updateTextReferences() {
  const files = textRoots
    .map((dir) => path.join(root, dir))
    .filter((dir) => fs.existsSync(dir))
    .flatMap((dir) => walk(dir))
    .filter((file) => /\.(astro|md|mdx|ts|tsx|js|mjs|json|txt|xml|yml|yaml|webmanifest)$/i.test(file));

  let changedFiles = 0;

  for (const file of files) {
    const original = fs.readFileSync(file, 'utf8');
    let next = original;

    for (const [from, to] of replacements) {
      next = next.split(from).join(to);
    }

    if (next !== original) {
      fs.writeFileSync(file, next, 'utf8');
      changedFiles += 1;
    }
  }

  return changedFiles;
}

async function run() {
  const conversions = [];

  for (const file of rasterFiles) {
    conversions.push(await convertOne(file));
  }

  const changedFiles = updateTextReferences();

  console.log(
    JSON.stringify(
      {
        removeSourceFiles,
        changedFiles,
        converted: conversions.map(({ sourcePath, targetPath, before, after, skipped }) => ({
          sourcePath: sourcePath.replaceAll('\\', '/'),
          targetPath: targetPath.replaceAll('\\', '/'),
          before: before ?? null,
          after: after ?? null,
          skipped,
        })),
      },
      null,
      2,
    ),
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
