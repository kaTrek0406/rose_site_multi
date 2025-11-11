import sharp from 'sharp';
import { optimize } from 'svgo';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_DIR = path.join(__dirname, 'src/assets');
const OUTPUT_DIR = path.join(__dirname, 'public/assets');

// Configuration
const WEBP_QUALITY = 80;
const MAX_WIDTH = 1920;
const TARGET_SIZE = 200 * 1024; // 200KB target

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function getImageDimensions(filePath) {
  const metadata = await sharp(filePath).metadata();
  return { width: metadata.width, height: metadata.height };
}

async function optimizeImage(inputPath, outputPath, filename) {
  const ext = path.extname(filename).toLowerCase();

  try {
    if (ext === '.svg') {
      // Optimize SVG
      const svgBuffer = await fs.readFile(inputPath);
      const result = optimize(svgBuffer, {
        multipass: true,
        plugins: [
          'preset-default',
          'removeDoctype',
          'removeComments',
          'removeMetadata',
          'removeEditorsNSData',
          'cleanupAttrs',
          'mergeStyles',
          'inlineStyles',
          'minifyStyles',
          'removeUselessDefs',
          'cleanupNumericValues',
          'convertColors',
          'removeUnknownsAndDefaults',
          'removeNonInheritableGroupAttrs',
          'removeUselessStrokeAndFill',
          'cleanupEnableBackground',
          'removeHiddenElems',
          'removeEmptyText',
          'convertPathData',
          'convertTransform',
          'removeEmptyAttrs',
          'removeEmptyContainers',
          'mergePaths',
          'removeUnusedNS',
          'sortAttrs',
          'removeTitle',
          'removeDesc'
        ]
      });

      await fs.writeFile(outputPath, result.data);
      const originalSize = svgBuffer.length;
      const optimizedSize = Buffer.from(result.data).length;
      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

      console.log(`✓ ${filename} (SVG): ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% savings)`);

    } else if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      // Convert to WebP with optimization
      const originalSize = (await fs.stat(inputPath)).size;
      const outputWebP = outputPath.replace(ext, '.webp');

      let quality = WEBP_QUALITY;
      let resizeWidth = null;

      // Get original dimensions
      const { width } = await getImageDimensions(inputPath);

      // Resize if too large
      if (width > MAX_WIDTH) {
        resizeWidth = MAX_WIDTH;
      }

      // First attempt with default quality
      let sharpInstance = sharp(inputPath);

      if (resizeWidth) {
        sharpInstance = sharpInstance.resize(resizeWidth, null, {
          fit: 'inside',
          withoutEnlargement: true
        });
      }

      await sharpInstance
        .webp({ quality })
        .toFile(outputWebP);

      let optimizedSize = (await fs.stat(outputWebP)).size;

      // Reduce quality if still too large
      if (optimizedSize > TARGET_SIZE) {
        quality = 70;
        sharpInstance = sharp(inputPath);

        if (resizeWidth) {
          sharpInstance = sharpInstance.resize(resizeWidth, null, {
            fit: 'inside',
            withoutEnlargement: true
          });
        }

        await sharpInstance
          .webp({ quality })
          .toFile(outputWebP);

        optimizedSize = (await fs.stat(outputWebP)).size;
      }

      // If still too large, reduce further
      if (optimizedSize > TARGET_SIZE) {
        quality = 60;
        const targetWidth = resizeWidth || width;
        const reducedWidth = Math.floor(targetWidth * 0.8);

        await sharp(inputPath)
          .resize(reducedWidth, null, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality })
          .toFile(outputWebP);

        optimizedSize = (await fs.stat(outputWebP)).size;
      }

      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      const sizeOk = optimizedSize <= TARGET_SIZE ? '✓' : '⚠';

      console.log(`${sizeOk} ${filename} → ${path.basename(outputWebP)}: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${savings}% savings, q=${quality})`);

    } else {
      // Just copy other files
      await fs.copyFile(inputPath, outputPath);
      console.log(`→ ${filename} (copied)`);
    }
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
  }
}

async function processDirectory(sourceDir, outputDir) {
  await ensureDir(outputDir);

  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const outputPath = path.join(outputDir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(sourcePath, outputPath);
    } else if (entry.isFile()) {
      await optimizeImage(sourcePath, outputPath, entry.name);
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

async function main() {
  console.log('🚀 Starting image optimization...\n');
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  const startTime = Date.now();

  await processDirectory(SOURCE_DIR, OUTPUT_DIR);

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n✅ Optimization complete in ${duration}s`);

  // Calculate total savings
  try {
    const getSize = async (dir) => {
      let totalSize = 0;
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          totalSize += await getSize(fullPath);
        } else if (entry.isFile()) {
          const stats = await fs.stat(fullPath);
          totalSize += stats.size;
        }
      }
      return totalSize;
    };

    const originalSize = await getSize(SOURCE_DIR);
    const optimizedSize = await getSize(OUTPUT_DIR);
    const totalSavings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);

    console.log(`\n📊 Total: ${formatBytes(originalSize)} → ${formatBytes(optimizedSize)} (${totalSavings}% reduction)`);
  } catch (err) {
    console.error('Could not calculate total savings:', err.message);
  }
}

main().catch(console.error);
