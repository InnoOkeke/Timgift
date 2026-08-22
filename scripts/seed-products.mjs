/**
 * Product Seed Script
 * Run with: node scripts/seed-products.mjs
 *
 * Uploads images to Cloudinary and inserts 4 products into the database.
 * Uses existing local images from public/images/categories/ as product media.
 */

import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync, unlinkSync, createWriteStream } from "fs";
import https from "https";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

// ── Cloudinary config ─────────────────────────────────────────────────────────
cloudinary.config({
  cloud_name: "dmltyy3sx",
  api_key: "884455866461163",
  api_secret: "Pa1t7QTnBt441v6hnMQz4HSlOpI",
});

const prisma = new PrismaClient();

// ── Helpers ───────────────────────────────────────────────────────────────────

async function uploadLocalImage(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "timgift_products",
    public_id: publicId,
    overwrite: true,
    resource_type: "image",
  });
  return result.secure_url;
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    }).on("error", (err) => {
      file.close();
      try { unlinkSync(dest); } catch {}
      reject(err);
    });
  });
}

async function uploadRemoteImage(remoteUrl, publicId) {
  const tmpPath = path.join(__dirname, `_tmp_${publicId}.jpg`);
  await downloadFile(remoteUrl, tmpPath);
  const url = await uploadLocalImage(tmpPath, publicId);
  try { unlinkSync(tmpPath); } catch {}
  return url;
}

function slugify(name) {
  return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "") + "-" + Date.now();
}

// ── Product definitions ───────────────────────────────────────────────────────
// For each product:
// - localImages: files that exist in public/images/categories/
// - remoteImages: extra images fetched from the web (optional, skipped if unreachable)

const PRODUCTS = [
  // ── 1. Apple Watch Ultra 2 ──────────────────────────────────────────────────
  {
    name: "Apple Watch Ultra 2",
    category: "SMARTWATCHES",
    price: 525000,
    stockQuantity: 6,
    status: "IN_STOCK",
    featured: true,
    limitedTimeDeal: false,
    description: `The Apple Watch Ultra 2 is Apple's most capable and rugged smartwatch, engineered for athletes, divers, and adventurers who demand the very best.

Key Features:
• 49mm titanium case — available in natural and black titanium finish, diamond-like carbon coating for scratch resistance
• Precision dual-frequency GPS (L1 + L5) — the most accurate location tracking in any sports watch
• Brightest Apple Watch display ever at 3,000 nits — perfectly readable in direct sunlight
• Up to 36 hours battery life in normal use; up to 72 hours in Low Power Mode
• Depth gauge and water temperature sensor — certified water resistant to 100 metres
• Customisable Action button for instant control of workouts, waypoints, or custom shortcuts
• Advanced health sensors: Blood Oxygen (SpO2), ECG, continuous heart rate, sleep tracking, crash detection, and Emergency SOS
• Certified to EN13319 — the international diving accessories standard
• S9 SiP chip with 64-bit dual-core processor and neural engine for fast on-device Siri
• Modular Ultra watch face — designed exclusively for Ultra 2
• Runs watchOS 10 with Smart Stack, redesigned apps, and advanced outdoor + cycling features
• Compatible with all 49mm Apple Watch bands (Alpine Loop, Trail Loop, Ocean Band)

Built for extremes. Whether you're running ultramarathons, high-altitude hiking, or deep-sea diving — the Ultra 2 keeps up.`,
    localImages: [
      path.join(ROOT, "public/images/apple-watch-2-ultra.jpeg"),
      path.join(ROOT, "public/images/categories/watch.jpg"),
    ],
  },

  // ── 2. Apple Watch Series 6 ─────────────────────────────────────────────────
  {
    name: "Apple Watch Series 6",
    category: "SMARTWATCHES",
    price: 150000,
    stockQuantity: 10,
    status: "IN_STOCK",
    featured: false,
    limitedTimeDeal: false,
    description: `The Apple Watch Series 6 delivers powerful health monitoring and fitness tracking in a sleek, lightweight design — an excellent gateway into Apple's health ecosystem.

Key Features:
• Always-On Retina LTPO OLED display — 1,000 nits brightness, always visible on your wrist
• Blood Oxygen (SpO2) sensor — measure your oxygen saturation anytime with a 15-second reading
• Electrical heart sensor — take an ECG reading directly from your wrist via the ECG app
• Third-generation optical heart sensor — continuous heart rate monitoring day and night
• Always-on Altimeter — tracks your real-time elevation throughout the day
• S6 SiP chip with 64-bit dual-core processor — 20% faster than Series 5
• Up to 18 hours battery life per charge
• Water resistant to 50 metres — safe for pool swimming and ocean activities
• Built-in GPS; GPS + Cellular option for calls and data without your iPhone nearby
• 32GB onboard storage
• Wi-Fi 802.11b/g/n (2.4GHz & 5GHz) and Bluetooth 5.0
• Ceramic and sapphire crystal back for comfort and signal clarity
• Emergency SOS, fall detection, and international emergency calling
• Space Grey Aluminium case with Black Sport Band
• Compatible with all Apple Watch bands (38/40mm)`,
    localImages: [
      path.join(ROOT, "public/images/apple-watch-series-6.jpeg"),
      path.join(ROOT, "public/images/categories/watch.jpg"),
    ],
  },

  // ── 3. Google Pixel 8 128GB ─────────────────────────────────────────────────
  {
    name: "Google Pixel 8 128GB",
    category: "ANDROID",
    price: 275000,
    stockQuantity: 10,
    status: "IN_STOCK",
    featured: true,
    limitedTimeDeal: false,
    description: `The Google Pixel 8 is Google's smartest phone ever — powered by the custom Tensor G3 chip with on-device AI that transforms how you take photos, manage calls, and interact with your phone.

Key Features:
• 6.2-inch Actua OLED display — 1080 × 2400 resolution, 120Hz adaptive refresh rate, 2,000 nits peak brightness
• Google Tensor G3 chip — custom silicon engineered for advanced AI and machine learning on-device
• 50MP main camera with optical image stabilisation + 12MP ultrawide lens
• 10.5MP front camera for sharp, detailed selfies
• AI camera tools: Magic Eraser, Best Take, Photo Unblur, and Audio Magic Eraser
• Call Screen and Direct My Call — screen and manage calls with AI automatically
• 128GB storage / 8GB LPDDR5 RAM — smooth multitasking
• 4575mAh battery — all-day use with 27W wired fast charging and wireless charging
• IP68 dust and water resistance — rated for submersion up to 1.5m for 30 minutes
• Android 14 out of the box — guaranteed 7 years of OS upgrades and security patches
• 5G (Sub-6GHz + mmWave) for fast downloads and low-latency streaming
• Titan M2 security chip — hardware-level protection for your data
• Dimensions: 150.5 × 70.8 × 8.9mm | Weight: 187g
• Available in Obsidian (deep black)

The Pixel 8 is the phone that thinks with you — made by Google for people who love great cameras and smart software.`,
    localImages: [
      path.join(ROOT, "public/images/google-pixel-8.jpeg"),
      path.join(ROOT, "public/images/categories/android.jpg"),
    ],
  },

  // ── 4. Samsung Galaxy S22 128GB ─────────────────────────────────────────────
  {
    name: "Samsung Galaxy S22 128GB",
    category: "ANDROID",
    price: 255000,
    stockQuantity: 10,
    status: "IN_STOCK",
    featured: false,
    limitedTimeDeal: true,
    description: `The Samsung Galaxy S22 is Samsung's flagship compact smartphone — a refined powerhouse that delivers pro-grade performance in a slim, premium design.

Key Features:
• 6.1-inch Dynamic AMOLED 2X display — 120Hz adaptive refresh, 2340 × 1080 (FHD+), up to 1,750 nits
• Vision Booster — screen stays vivid and readable even in direct outdoor sunlight
• Snapdragon 8 Gen 1 processor — powerful, efficient performance for gaming, streaming, and multitasking
• Triple rear cameras: 50MP Wide (f/1.8, OIS) + 12MP Ultra Wide + 10MP Telephoto (3× optical zoom, 30× Space Zoom)
• 10MP front camera with autofocus — crisp, flattering selfies and video calls
• 128GB internal storage / 8GB RAM
• 3700mAh battery — 25W super fast charging, 15W wireless charging, and 4.5W reverse wireless charging
• IP68 rated — dust and water resistant up to 1.5m for 30 minutes
• Armour Aluminium frame — lightweight at just 167g, 7.6mm slim profile
• Android 12 with One UI 4.1, upgradeable to Android 14 — 4 years of OS support
• 5G connectivity for fast mobile data and downloads
• Samsung Knox security for enterprise-grade data protection
• Dimensions: 146 × 70.6 × 7.6mm
• Phantom Black finish — sleek monochromatic design

The Galaxy S22 is the ultimate compact flagship — everything you need, nothing you don't.`,
    localImages: [
      path.join(ROOT, "public/images/samsung-galaxy-s22.jpeg"),
      path.join(ROOT, "public/images/categories/android.png"),
    ],
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Starting product seed...\n");

  for (const product of PRODUCTS) {
    console.log(`📦 Processing: ${product.name}`);

    const mediaItems = [];

    for (let i = 0; i < product.localImages.length; i++) {
      const imgPath = product.localImages[i];
      if (existsSync(imgPath)) {
        const pubId = `${product.name.toLowerCase().replace(/[\s()]+/g, "-")}-${i}`;
        try {
          console.log(`   ↑ Uploading: ${path.basename(imgPath)}`);
          const url = await uploadLocalImage(imgPath, pubId);
          mediaItems.push({ type: "image", url });
          console.log(`   ✓ ${url}`);
        } catch (e) {
          console.warn(`   ⚠ Upload failed for ${path.basename(imgPath)}:`, e.message);
        }
      } else {
        console.warn(`   ⚠ File not found: ${imgPath}`);
      }
    }

    if (mediaItems.length === 0) {
      // fallback placeholder
      mediaItems.push({
        type: "image",
        url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=800&fit=crop",
      });
      console.log("   ℹ Using placeholder image");
    }

    try {
      const created = await prisma.product.create({
        data: {
          name: product.name,
          slug: slugify(product.name),
          description: product.description,
          price: product.price,
          category: product.category,
          status: product.status,
          media: JSON.stringify(mediaItems),
          stockQuantity: product.stockQuantity,
          featured: product.featured,
          limitedTimeDeal: product.limitedTimeDeal,
        },
      });
      console.log(`   ✅ Created → ID ${created.id}: ${created.name}\n`);
    } catch (e) {
      console.error(`   ❌ DB insert failed for ${product.name}:`, e.message, "\n");
    }
  }

  console.log("🎉 All done! Products are live in the database.");
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error("Fatal error:", e);
  await prisma.$disconnect();
  process.exit(1);
});
