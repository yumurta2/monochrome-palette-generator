import { hslToHex } from './hslToHex.js'
import { oklchToHex } from './oklchToHex.js'

const CURVES = {
  linear: () => 1,
  parabolic: (l) => l <= 0.5 ? 1 : 1 - 4 * Math.pow(l - 0.5, 2),
  bell: (l) => l <= 0.5 ? 1 : Math.sin(Math.PI * l),
  asymmetric: (l) => l <= 0.5 ? 1 : 1 - 16 * Math.pow(l - 0.5, 4),
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
