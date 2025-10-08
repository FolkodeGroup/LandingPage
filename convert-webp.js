// convert-webp.js
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exts = ['.png', '.jpg', '.jpeg'];
const targetDirs = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'src', 'assets'),
];

function getAllImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else if (exts.includes(path.extname(file).toLowerCase())) {
      results.push(filePath);
    }
  });
  return results;
}

async function convertToWebp(file) {
  const outFile = file.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  try {
    await sharp(file)
      .webp({ quality: 80 })
      .toFile(outFile);
    console.log(`✅ ${file} → ${outFile}`);
  } catch (err) {
    console.error(`❌ Error con ${file}:`, err);
  }
}

(async () => {
  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) continue;
    const images = getAllImages(dir);
    for (const img of images) {
      await convertToWebp(img);
    }
  }
})();