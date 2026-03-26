import sharp from "sharp";
import fs from "fs";
import path from "path";

const inputDir = "./public/images";

async function convertImages() {
  const files = fs.readdirSync(inputDir);

  for (const file of files) {
    if (/\.(jpg|jpeg|png)$/i.test(file)) {
      const inputPath = path.join(inputDir, file);
      const outputPath = path.join(
        inputDir,
        file.replace(/\.(jpg|jpeg|png)$/i, ".webp")
      );

      await sharp(inputPath)
        .resize(800)
        .webp({ quality: 70 })
        .toFile(outputPath);

      console.log(`✅ Converted: ${file}`);
    }
  }
}

convertImages();