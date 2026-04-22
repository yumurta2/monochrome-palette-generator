import { hslToHex } from './hslToHex.js'
import { oklchToHex } from './oklchToHex.js'

export function generatePalette(h, s, count, mode) {
  const toHex = mode === 'oklch' ? oklchToHex : hslToHex
  const steps = Array.from({ length: count }, (_, i) => (i * 100) / (count - 1))
  return steps.map((l) => ({ l, hex: toHex(h, s, l) }))
}
