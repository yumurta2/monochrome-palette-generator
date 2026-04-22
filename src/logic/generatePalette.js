import { hslToHex } from './hslToHex.js'

export const LIGHTNESS_STEPS = Array.from({ length: 21 }, (_, i) => i * 5)

export function generatePalette(h, s) {
  return LIGHTNESS_STEPS.map((l) => hslToHex(h, s, l))
}
