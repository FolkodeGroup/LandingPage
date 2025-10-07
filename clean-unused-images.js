// clean-all-duplicates.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) continue;
  const images = getAllImages(dir);
  images.forEach(img => {
    const webp = img.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    if (fs.existsSync(webp)) {
      fs.unlinkSync(img);
      console.log(`🗑️ Eliminada: ${img}`);
    }
  });
}
console.log('Limpieza de duplicados completada.');