import { hslToHex } from './hslToHex.js'
import { oklchToHex } from './oklchToHex.js'

export function generatePalette(h, s, steps, range, shift, mode) {
  const toHex = mode === 'oklch' ? oklchToHex : hslToHex
  const lightness = Array.from({ length: steps }, (_, i) =>
    steps === 1 ? shift : shift + (i * range) / (steps - 1),
  )
  return lightness.map((l) => ({ l, hex: toHex(h, s, l) }))
}
