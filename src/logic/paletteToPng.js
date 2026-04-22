export function paletteToPng(hexes) {
  const canvas = document.createElement('canvas')
  canvas.width = hexes.length
  canvas.height = 1
  const ctx = canvas.getContext('2d')

  hexes.forEach((hex, i) => {
    ctx.fillStyle = hex
    ctx.fillRect(i, 0, 1, 1)
  })

  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}
