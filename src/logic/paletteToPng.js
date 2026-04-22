import { Jimp } from 'jimp'

export async function paletteToPng(hexes) {
  const image = new Jimp({ width: hexes.length, height: 1, color: 0x00000000 })

  hexes.forEach((hex, i) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const rgba = ((r << 24) | (g << 16) | (b << 8) | 0xff) >>> 0
    image.setPixelColor(rgba, i, 0)
  })

  const buffer = await image.getBuffer('image/png')
  return new Blob([buffer], { type: 'image/png' })
}
