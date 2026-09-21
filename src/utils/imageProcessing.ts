/**
 * High quality in-browser image processing for agency logos:
 * - Automatic background removal (flood-fill from perimeter)
 * - Edge defringing / anti-aliasing
 * - Transparent bounding box trimming
 */

export interface BackgroundRemovalOptions {
  /** Color difference threshold (0 - 100), default 30 */
  tolerance?: number;
  /** Automatically crop empty transparent margins, default true */
  trimMargins?: boolean;
  /** Smooth fringe boundary pixels, default true */
  featherEdges?: boolean;
}

export function removeWhiteBackground(
  imageSrc: string,
  options: BackgroundRemovalOptions = {}
): Promise<string> {
  const {
    tolerance = 30,
    trimMargins = true,
    featherEdges = true
  } = options;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imageSrc);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, width, height);
        const data = imgData.data;

        // Sample corner colors to determine background baseline
        const corners = [
          { x: 0, y: 0 },
          { x: width - 1, y: 0 },
          { x: 0, y: height - 1 },
          { x: width - 1, y: height - 1 }
        ];

        let avgR = 0;
        let avgG = 0;
        let avgB = 0;
        let sampleCount = 0;

        for (const c of corners) {
          const idx = (c.y * width + c.x) * 4;
          if (data[idx + 3] > 10) {
            avgR += data[idx];
            avgG += data[idx + 1];
            avgB += data[idx + 2];
            sampleCount++;
          }
        }

        if (sampleCount > 0) {
          avgR /= sampleCount;
          avgG /= sampleCount;
          avgB /= sampleCount;
        } else {
          avgR = 255;
          avgG = 255;
          avgB = 255;
        }

        // Distance in RGB space allowed for background detection
        const maxDist = Math.max(20, (tolerance / 100) * 255);

        function isBgPixel(idx: number): boolean {
          const a = data[idx * 4 + 3];
          if (a < 15) return true;

          const r = data[idx * 4];
          const g = data[idx * 4 + 1];
          const b = data[idx * 4 + 2];

          // White or off-white background:
          // 1. Either very bright (r>210, g>210, b>210)
          // 2. Or close to sampled corner average color
          const distFromAvg = Math.sqrt(
            Math.pow(r - avgR, 2) + Math.pow(g - avgG, 2) + Math.pow(b - avgB, 2)
          );

          const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
          return brightness > 215 || distFromAvg < maxDist;
        }

        // BFS flood fill starting from all 4 perimeter borders
        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        for (let x = 0; x < width; x++) {
          const topIdx = 0 * width + x;
          if (isBgPixel(topIdx) && !visited[topIdx]) {
            visited[topIdx] = 1;
            queue.push(topIdx);
          }
          const btmIdx = (height - 1) * width + x;
          if (isBgPixel(btmIdx) && !visited[btmIdx]) {
            visited[btmIdx] = 1;
            queue.push(btmIdx);
          }
        }

        for (let y = 0; y < height; y++) {
          const leftIdx = y * width + 0;
          if (isBgPixel(leftIdx) && !visited[leftIdx]) {
            visited[leftIdx] = 1;
            queue.push(leftIdx);
          }
          const rightIdx = y * width + (width - 1);
          if (isBgPixel(rightIdx) && !visited[rightIdx]) {
            visited[rightIdx] = 1;
            queue.push(rightIdx);
          }
        }

        let head = 0;
        while (head < queue.length) {
          const curr = queue[head++];
          const cx = curr % width;
          const cy = Math.floor(curr / width);

          // Clear alpha to 0 (make completely transparent)
          data[curr * 4 + 3] = 0;

          const neighbors = [
            cy > 0 ? (cy - 1) * width + cx : -1,
            cy < height - 1 ? (cy + 1) * width + cx : -1,
            cx > 0 ? cy * width + (cx - 1) : -1,
            cx < width - 1 ? cy * width + (cx + 1) : -1,
          ];

          for (const n of neighbors) {
            if (n !== -1 && !visited[n]) {
              visited[n] = 1;
              if (isBgPixel(n)) {
                queue.push(n);
              }
            }
          }
        }

        // Feather edges to eliminate halo / white fringe
        if (featherEdges) {
          for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
              const idx = y * width + x;
              const a = data[idx * 4 + 3];

              // If this pixel is kept, check if it borders a transparent pixel
              if (a > 0) {
                const adjTransparent = 
                  data[((y - 1) * width + x) * 4 + 3] === 0 ||
                  data[((y + 1) * width + x) * 4 + 3] === 0 ||
                  data[(y * width + (x - 1)) * 4 + 3] === 0 ||
                  data[(y * width + (x + 1)) * 4 + 3] === 0;

                if (adjTransparent) {
                  const r = data[idx * 4];
                  const g = data[idx * 4 + 1];
                  const b = data[idx * 4 + 2];
                  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

                  // If it's a lighter transition pixel at the boundary, blend its alpha
                  if (brightness > 180) {
                    const factor = Math.max(0, (255 - brightness) / 75);
                    data[idx * 4 + 3] = Math.round(a * factor);
                  }
                }
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);

        // Auto-trim empty transparent margins
        if (trimMargins) {
          let minX = width;
          let minY = height;
          let maxX = 0;
          let maxY = 0;
          let foundContent = false;

          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              const a = data[(y * width + x) * 4 + 3];
              if (a > 20) {
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
                foundContent = true;
              }
            }
          }

          if (foundContent && (maxX - minX > 10) && (maxY - minY > 10)) {
            // Add slight padding (e.g. 4px)
            const pad = 6;
            minX = Math.max(0, minX - pad);
            minY = Math.max(0, minY - pad);
            maxX = Math.min(width - 1, maxX + pad);
            maxY = Math.min(height - 1, maxY + pad);

            const croppedWidth = maxX - minX + 1;
            const croppedHeight = maxY - minY + 1;

            const trimmedCanvas = document.createElement('canvas');
            trimmedCanvas.width = croppedWidth;
            trimmedCanvas.height = croppedHeight;
            const trimmedCtx = trimmedCanvas.getContext('2d');

            if (trimmedCtx) {
              trimmedCtx.drawImage(
                canvas,
                minX, minY, croppedWidth, croppedHeight,
                0, 0, croppedWidth, croppedHeight
              );
              resolve(trimmedCanvas.toDataURL('image/png'));
              return;
            }
          }
        }

        resolve(canvas.toDataURL('image/png'));
      } catch (err) {
        console.warn('Background removal error, falling back to original', err);
        resolve(imageSrc);
      }
    };

    img.onerror = () => {
      resolve(imageSrc);
    };

    img.src = imageSrc;
  });
}
