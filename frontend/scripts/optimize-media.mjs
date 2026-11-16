#!/usr/bin/env node
/**
 * Optimises one photo for the website.
 *
 *   pnpm media:optimize <source> <destination> [maxLongEdgePx=1600] [quality=78]
 *
 * - Applies the EXIF orientation, then removes ALL metadata (camera model, GPS position,
 *   timestamps, embedded thumbnails) so no private information is published.
 * - Resizes so the longest edge is at most `maxLongEdgePx` (never enlarges).
 * - Writes a progressive JPEG (or PNG when the destination ends in .png) and prints the
 *   resulting dimensions so they can be recorded in src/shared/content/media.ts.
 *
 * Use this for every replacement photo listed in docs/frontend-review/NAC-MEDIA-REPLACEMENT-MANIFEST.md.
 */
import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [source, destination, maxEdgeArg = '1600', qualityArg = '78'] = process.argv.slice(2);

if (!source || !destination) {
  console.error('Usage: pnpm media:optimize <source> <destination> [maxLongEdgePx] [quality]');
  process.exit(1);
}

const maxEdge = Number.parseInt(maxEdgeArg, 10);
const quality = Number.parseInt(qualityArg, 10);
if (
  !Number.isInteger(maxEdge) ||
  maxEdge < 64 ||
  !Number.isInteger(quality) ||
  quality < 1 ||
  quality > 100
) {
  console.error('maxLongEdgePx must be an integer >= 64 and quality an integer between 1 and 100.');
  process.exit(1);
}

await mkdir(path.dirname(destination), { recursive: true });

let pipeline = sharp(source, { failOn: 'none' }).rotate(); // .rotate() bakes in EXIF orientation
pipeline = pipeline.resize({
  width: maxEdge,
  height: maxEdge,
  fit: 'inside',
  withoutEnlargement: true,
});

// sharp discards metadata by default (we never call .withMetadata()).
pipeline = destination.toLowerCase().endsWith('.png')
  ? pipeline.png({ compressionLevel: 9, palette: true })
  : pipeline.jpeg({ quality, progressive: true, mozjpeg: true });

const info = await pipeline.toFile(destination);
const { size } = await stat(destination);
process.stdout.write(
  `${destination}  ${info.width}x${info.height}  ${(size / 1024).toFixed(0)} KB\n`,
);
