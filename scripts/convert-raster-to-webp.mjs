import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();

const rasterFiles = [
  'public/images/gallery/banners/banner-counter-showcase.webp',
  'public/images/gallery/banners/banner-hero-gold.webp',
  'public/images/gallery/banners/banner-premium-line.webp',
  'public/images/gallery/real-phones/iphone-orange-back.webp',
  'public/images/gallery/real-phones/iphone-orange-box.webp',
  'public/images/gallery/real-phones/iphone-orange-front.webp',
  'public/images/gallery/real-phones/iphone15-black-back.webp',
  'public/images/gallery/real-phones/iphone15-black-front.webp',
  'public/images/hero-webuy-campaign.webp',
];

const textRoots = ['src', 'public', 'scripts'];

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

  const image = sharp(sourcePath);
  const metadata = await image.metadata();
  const target = image.rotate();

  if ((metadata.width ?? 0) >= 1800 || (metadata.height ?? 0) >= 1800) {
    target.resize({
      width: 1600,
      height: 1600,
      fit: 'inside',
      withoutEnlargement: true,
    });
  }

  await target.webp({ quality: 78, effort: 6 }).toFile(targetPath);

  const before = fs.statSync(sourcePath).size;
  const after = fs.statSync(targetPath).size;
  return {
    sourcePath,
    targetPath,
    before,
    after,
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

  for (const { sourcePath } of conversions) {
    fs.unlinkSync(sourcePath);
  }

  console.log(
    JSON.stringify(
      {
        converted: conversions.map(({ sourcePath, targetPath, before, after }) => ({
          sourcePath: sourcePath.replaceAll('\\', '/'),
          targetPath: targetPath.replaceAll('\\', '/'),
          before,
          after,
        })),
        changedFiles,
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
