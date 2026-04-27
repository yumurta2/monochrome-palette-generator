import { hslToHex } from './hslToHex.js'
import { oklchToHex } from './oklchToHex.js'

const CURVES = {
  linear: () => 1,
  parabolic: (l) => 4 * l * (1 - l),
  bell: (l) => Math.sin(Math.PI * l),
  asymmetric: (l) => 1 - Math.pow(2 * l - 1, 4),
}

export function generatePalette(h, s, steps, range, shift, mode, curve = 'bell') {
  const toHex = mode === 'oklch' ? oklchToHex : hslToHex
  const curveFn = CURVES[curve] ?? CURVES.bell
  return Array.from({ length: steps }, (_, i) => {
    const raw = steps === 1 ? shift : shift + (i * range) / (steps - 1)
    const l = Math.max(0, Math.min(100, raw))
    const sEffective = s * curveFn(l / 100)
    return { l, hex: toHex(h, sEffective, l) }
  })
}
