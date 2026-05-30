/**
 * Generates WebP variants from PNG sources in public/images/luxury/
 * Run: node scripts/optimize-luxury-images.mjs
 */
import { readdir, stat } from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public/images/luxury");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else if (/\.png$/i.test(entry.name)) files.push(full);
  }
  return files;
}

const pngFiles = await walk(ROOT);
let converted = 0;

for (const pngPath of pngFiles) {
  const webpPath = pngPath.replace(/\.png$/i, ".webp");
  await sharp(pngPath)
    .webp({ quality: 82, effort: 4 })
    .toFile(webpPath);
  converted++;
  console.log(`✓ ${path.relative(ROOT, webpPath)}`);
}

console.log(`\nOptimized ${converted} images to WebP`);
