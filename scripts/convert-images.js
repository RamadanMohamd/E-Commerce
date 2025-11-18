const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/assets/products');
const outputDir = sourceDir;

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PNG files
const files = fs.readdirSync(sourceDir).filter(file => file.endsWith('.png'));

console.log(`Converting ${files.length} images to WebP format...`);

Promise.all(
  files.map(async (file) => {
    const inputPath = path.join(sourceDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      
      console.log(`✓ ${file} → ${file.replace('.png', '.webp')} (${savings}% smaller)`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    }
  })
).then(() => {
  console.log('\n✓ All images converted successfully!');
}).catch(error => {
  console.error('Conversion failed:', error);
});
