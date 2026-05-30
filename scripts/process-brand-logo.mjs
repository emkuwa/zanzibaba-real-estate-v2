/**
 * Process Zanzibaba Real Estate master logo into transparent PNGs and favicons.
 * Run: node scripts/process-brand-logo.mjs
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const MASTER = path.join(
  ROOT,
  "assets/logos/png-masters/zanzibaba-real-estate-horizontal-master.png"
);
const OUT_LOGOS = path.join(ROOT, "public/brand/logos");
const OUT_FAVICONS = path.join(ROOT, "public/brand/favicons");
const OUT_OG = path.join(ROOT, "public/brand");

function isGoldPixel(r, g, b) {
  return r > 150 && g > 100 && b < 95 && r > g;
}

function isNavyPixel(r, g, b) {
  return !isGoldPixel(r, g, b) && b > r && r < 90 && g < 90;
}

async function makeReverseWordmark(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    if (pixels[i + 3] === 0) continue;
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (isNavyPixel(r, g, b)) {
      pixels[i] = 255;
      pixels[i + 1] = 255;
      pixels[i + 2] = 255;
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png({ compressionLevel: 9 });
}

async function makeTransparent(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    // Remove near-black background while preserving navy/gold
    if (r < 28 && g < 28 && b < 28) {
      pixels[i + 3] = 0;
    }
  }

  return sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  }).png({ compressionLevel: 9 });
}

async function main() {
  if (!fs.existsSync(MASTER)) {
    console.error("Master logo not found:", MASTER);
    process.exit(1);
  }

  fs.mkdirSync(OUT_LOGOS, { recursive: true });
  fs.mkdirSync(OUT_FAVICONS, { recursive: true });

  const masterBuffer = fs.readFileSync(MASTER);
  const meta = await sharp(masterBuffer).metadata();
  const width = meta.width ?? 1024;
  const height = meta.height ?? 341;

  const transparent = await makeTransparent(masterBuffer);

  await transparent
    .clone()
    .png()
    .toFile(path.join(OUT_LOGOS, "zanzibaba-real-estate-horizontal.png"));

  await transparent
    .clone()
    .resize(width * 2, height * 2, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile(path.join(OUT_LOGOS, "zanzibaba-real-estate-horizontal@2x.png"));

  const reverse = await makeReverseWordmark(await transparent.clone().png().toBuffer());
  await reverse
    .clone()
    .png()
    .toFile(path.join(OUT_LOGOS, "zanzibaba-real-estate-reverse.png"));

  await reverse
    .clone()
    .resize(width * 2, height * 2, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile(path.join(OUT_LOGOS, "zanzibaba-real-estate-reverse@2x.png"));

  // Icon crop — left square emblem
  const iconSize = height;
  const iconBuffer = await transparent
    .clone()
    .extract({ left: 0, top: 0, width: iconSize, height: iconSize })
    .png()
    .toBuffer();

  const faviconSizes = [
    { name: "favicon-32.png", size: 32 },
    { name: "favicon-180.png", size: 180 },
    { name: "favicon-512.png", size: 512 },
  ];

  for (const { name, size } of faviconSizes) {
    await sharp(iconBuffer)
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUT_FAVICONS, name));
  }

  // OG / social sharing image — logo on navy brand background
  const logoForOg = await transparent
    .clone()
    .resize(720, Math.round(720 * (height / width)), {
      fit: "inside",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const logoMeta = await sharp(logoForOg).metadata();
  const ogWidth = 1200;
  const ogHeight = 630;
  const logoW = logoMeta.width ?? 720;
  const logoH = logoMeta.height ?? 240;
  const left = Math.round((ogWidth - logoW) / 2);
  const top = Math.round((ogHeight - logoH) / 2);

  await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 4,
      background: { r: 7, g: 36, b: 90, alpha: 1 },
    },
  })
    .composite([{ input: logoForOg, left, top }])
    .png()
    .toFile(path.join(OUT_OG, "og-zanzibaba-real-estate.png"));

  console.log("Brand logo assets generated.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
