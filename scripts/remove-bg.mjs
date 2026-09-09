import sharp from "sharp";
import fs from "fs";

/**
 * Remove background from studio product photos on light/white background.
 * Uses flood-fill from outer edges + thresholding on outer light pixels,
 * with anti-aliased edge feathering.
 */
export async function removeBackground(inputPath, outputPath, options = {}) {
  const {
    lumThreshold = 225,
    maxColorDiff = 25,
    featherRadius = 1.5,
    clearHoles = true,
  } = options;

  const image = sharp(inputPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const alpha = new Uint8Array(width * height);
  alpha.fill(255);

  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed borders
  for (let x = 0; x < width; x++) {
    queue.push(x, 0);
    queue.push(x, height - 1);
    visited[x] = 1;
    visited[(height - 1) * width + x] = 1;
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
    visited[y * width] = 1;
    visited[y * width + (width - 1)] = 1;
  }

  function isBgPixel(idx) {
    const r = data[idx * channels];
    const g = data[idx * channels + 1];
    const b = data[idx * channels + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const maxDiff = Math.max(Math.abs(r - g), Math.abs(g - b), Math.abs(r - b));
    return (lum > lumThreshold && maxDiff < maxColorDiff) || lum > 245;
  }

  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    const idx = y * width + x;

    if (isBgPixel(idx)) {
      alpha[idx] = 0;

      const neighbors = [
        [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
      ];
      for (const [nx, ny] of neighbors) {
        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
          const nidx = ny * width + nx;
          if (!visited[nidx]) {
            visited[nidx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Clear internal holes if requested (e.g. camera cutouts with pure white background)
  if (clearHoles) {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        if (alpha[idx] !== 0) {
          const r = data[idx * channels];
          const g = data[idx * channels + 1];
          const b = data[idx * channels + 2];
          // Pure white hole
          if (r > 248 && g > 248 && b > 248) {
            alpha[idx] = 0;
          }
        }
      }
    }
  }

  // Edge smoothing / feathering
  const finalAlpha = new Uint8Array(width * height);
  finalAlpha.set(alpha);

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (alpha[idx] > 0) {
        // Count transparent neighbors
        let transNeighbors = 0;
        if (alpha[idx - 1] === 0) transNeighbors++;
        if (alpha[idx + 1] === 0) transNeighbors++;
        if (alpha[idx - width] === 0) transNeighbors++;
        if (alpha[idx + width] === 0) transNeighbors++;

        if (transNeighbors > 0) {
          const r = data[idx * channels];
          const g = data[idx * channels + 1];
          const b = data[idx * channels + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum > 210) {
            finalAlpha[idx] = Math.round(Math.max(0, 255 - (lum - 200) * 4));
          }
        }
      }
    }
  }

  // Assemble RGBA buffer
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = data[i * channels];
    rgba[i * 4 + 1] = data[i * channels + 1];
    rgba[i * 4 + 2] = data[i * channels + 2];
    rgba[i * 4 + 3] = finalAlpha[i];
  }

  await sharp(rgba, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(outputPath);

  return outputPath;
}
