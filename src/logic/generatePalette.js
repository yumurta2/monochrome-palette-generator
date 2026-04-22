import { hslToHex } from './hslToHex.js'

export function generatePalette(h, s, count) {
  const steps = Array.from({ length: count }, (_, i) => (i * 100) / (count - 1))
  return steps.map((l) => ({ l, hex: hslToHex(h, s, l) }))
}
