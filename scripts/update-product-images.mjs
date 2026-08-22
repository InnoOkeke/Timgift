/**
 * Update Product Images Script
 * Run with: node scripts/update-product-images.mjs
 *
 * Downloads real product-specific images from the web, uploads them to Cloudinary,
 * and updates each product's media array in the database.
 */

import { readFileSync } from "fs";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import https from "https";

// Manually load .env since we can't use dotenv in a plain mjs script
try {
  const envFile = readFileSync(new URL("../.env", import.meta.url), "utf8");
  for (const line of envFile.split("\n")) {
    const m = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      const val = m[2].trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  }
} catch {}
import http from "http";
import { createWriteStream, existsSync, unlinkSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

cloudinary.config({
  cloud_name: "dmltyy3sx",
  api_key: "884455866461163",
  api_secret: "Pa1t7QTnBt441v6hnMQz4HSlOpI",
});

const prisma = new PrismaClient();

// ── Helpers ───────────────────────────────────────────────────────────────────

function downloadFile(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error("Too many redirects"));
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
      }
    }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        try { unlinkSync(dest); } catch {}
        return downloadFile(res.headers.location, dest, redirects + 1).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const file = createWriteStream(dest);
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
      file.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

async function uploadLocalImage(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "timgift_products",
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  return result.secure_url;
}

async function uploadFromUrl(remoteUrl, publicId) {
  const ext = remoteUrl.split(".").pop().split("?")[0] || "jpg";
  const tmpPath = path.join(__dirname, `_tmp_${publicId}.${ext}`);
  try {
    await downloadFile(remoteUrl, tmpPath);
    const url = await uploadLocalImage(tmpPath, publicId);
    return url;
  } finally {
    try { unlinkSync(tmpPath); } catch {}
  }
}

// ── Product image map ─────────────────────────────────────────────────────────
// productName → { localMain, extraUrls[] }
// localMain: the image file you added in public/images/
// extraUrls: actual product-specific images from the web

const PRODUCT_UPDATES = [
  {
    name: "Apple Watch Ultra 2",
    localMain: path.join(ROOT, "public/images/apple-watch-2-ultra.jpeg"),
    extraUrls: [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-ultra2-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-ultra2-3.jpg",
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-ultra2-black.jpg",
    ],
  },
  {
    name: "Apple Watch Series 6",
    localMain: path.join(ROOT, "public/images/apple-watch-series-6.jpeg"),
    extraUrls: [
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-s6-steel-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-s6-3.jpg",
      "https://fdn2.gsmarena.com/vv/pics/apple/apple-watch-s6-4.jpg",
    ],
  },
  {
    name: "Google Pixel 8 128GB",
    localMain: path.join(ROOT, "public/images/google-pixel-8.jpeg"),
    extraUrls: [
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-1.jpg",
      "https://fdn2.gsmarena.com/vv/pics/google/google-pixel-8-2.jpg",
    ],
  },
  {
    name: "Samsung Galaxy S22 128GB",
    localMain: path.join(ROOT, "public/images/samsung-galaxy-s22.jpeg"),
    extraUrls: [
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-5g-2.jpg",
      "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s22-5g-3.jpg",
    ],
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🖼️  Updating product images...\n");

  for (const update of PRODUCT_UPDATES) {
    console.log(`📦 ${update.name}`);

    // Find the product by name
    const product = await prisma.product.findFirst({
      where: { name: update.name },
    });

    if (!product) {
      console.warn(`   ⚠ Product not found in DB: ${update.name}\n`);
      continue;
    }

    const mediaItems = [];

    // 1. Upload the local main image (your uploaded photo) first
    if (existsSync(update.localMain)) {
      const pubId = `${update.name.toLowerCase().replace(/[\s()]+/g, "-")}-main`;
      try {
        console.log(`   ↑ Main image: ${path.basename(update.localMain)}`);
        const url = await uploadLocalImage(update.localMain, pubId);
        mediaItems.push({ type: "image", url });
        console.log(`   ✓ ${url}`);
      } catch (e) {
        console.warn(`   ⚠ Main upload failed:`, e.message);
      }
    }

    // 2. Download and upload each extra URL
    for (let i = 0; i < update.extraUrls.length; i++) {
      const remoteUrl = update.extraUrls[i];
      const pubId = `${update.name.toLowerCase().replace(/[\s()]+/g, "-")}-extra-${i + 1}`;
      try {
        console.log(`   ↑ Extra image ${i + 1}: ${remoteUrl.split("/").pop()}`);
        const url = await uploadFromUrl(remoteUrl, pubId);
        mediaItems.push({ type: "image", url });
        console.log(`   ✓ ${url}`);
      } catch (e) {
        console.warn(`   ⚠ Extra image ${i + 1} failed:`, e.message);
      }
    }

    if (mediaItems.length === 0) {
      console.warn(`   ⚠ No images uploaded — skipping DB update\n`);
      continue;
    }

    // 3. Update the product in the database
    await prisma.product.update({
      where: { id: product.id },
      data: { media: JSON.stringify(mediaItems) },
    });

    console.log(`   ✅ Updated ID ${product.id} with ${mediaItems.length} images\n`);
  }

  console.log("🎉 All product images updated!");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("Fatal error:", e);
  await prisma.$disconnect();
  process.exit(1);
});
