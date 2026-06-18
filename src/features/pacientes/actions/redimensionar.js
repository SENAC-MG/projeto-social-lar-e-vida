import sharp from "sharp";

export async function redimensionar(arquivo) {
  const bytes = await arquivo.arrayBuffer();

  const imagemPng = await sharp(Buffer.from(bytes))
    .rotate()
    .resize(800, 800, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png()
    .toBuffer();

  return imagemPng;
}