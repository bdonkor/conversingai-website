const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'images');
const MIN_SIZE = 100 * 1024;

const files = fs.readdirSync(imagesDir);
const results = [];

(async () => {
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) continue;

    const ext = path.extname(file).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
    if (stat.size < MIN_SIZE) continue;

    const beforeKB = Math.round(stat.size / 1024);
    const buffer = fs.readFileSync(filePath);

    try {
      let outBuffer;
      if (ext === '.png') {
        outBuffer = await sharp(buffer)
          .png({ palette: true, quality: 80, compressionLevel: 9, effort: 10 })
          .toBuffer();
      } else {
        outBuffer = await sharp(buffer)
          .jpeg({ quality: 82, mozjpeg: true })
          .toBuffer();
      }

      if (outBuffer.length < stat.size) {
        fs.writeFileSync(filePath, outBuffer);
        const afterKB = Math.round(outBuffer.length / 1024);
        const reduction = Math.round(((stat.size - outBuffer.length) / stat.size) * 100);
        results.push({ file, beforeKB, afterKB, reduction });
      } else {
        results.push({ file, beforeKB, afterKB: beforeKB, reduction: 0, note: 'skipped (no win)' });
      }
    } catch (err) {
      results.push({ file, beforeKB, afterKB: beforeKB, reduction: 0, note: 'error: ' + err.message });
    }
  }

  results.sort((a, b) => b.beforeKB - a.beforeKB);
  console.log('\nFile'.padEnd(50) + 'Before'.padEnd(10) + 'After'.padEnd(10) + 'Saved');
  console.log('-'.repeat(80));
  let totalBefore = 0, totalAfter = 0;
  results.forEach(r => {
    const note = r.note ? `  (${r.note})` : '';
    console.log(
      r.file.padEnd(50) +
      `${r.beforeKB}KB`.padEnd(10) +
      `${r.afterKB}KB`.padEnd(10) +
      `${r.reduction}%${note}`
    );
    totalBefore += r.beforeKB;
    totalAfter += r.afterKB;
  });
  console.log('-'.repeat(80));
  const totalReduction = Math.round(((totalBefore - totalAfter) / totalBefore) * 100);
  console.log(`TOTAL`.padEnd(50) + `${totalBefore}KB`.padEnd(10) + `${totalAfter}KB`.padEnd(10) + `${totalReduction}%`);
})();
