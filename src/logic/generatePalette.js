import { hslToHex } from './hslToHex.js'
import { oklchToHex } from './oklchToHex.js'

const CURVES = {
  linear: () => 1,
  parabolic: (l) => l <= 0.5 ? 1 : 1 - 4 * Math.pow(l - 0.5, 2),
  bell: (l) => l <= 0.5 ? 1 : Math.sin(Math.PI * l),
  asymmetric: (l) => l <= 0.5 ? 1 : 1 - 16 * Math.pow(l - 0.5, 4),
}

const LIGHTNESS_CURVES = {
  linear: (t) => t,
  easeOut: (t) => 0.1 + 0.9 * (1 - Math.pow(1 - t, 1.5)),
  easeIn: (t) => 0.9 * Math.pow(t, 1.5),
  smooth: (t) => 0.05 + 0.9 * (0.5 - 0.5 * Math.cos(Math.PI * t)),
}

export function generatePalette(h, s, steps, range, shift, mode, curve = 'bell', lightCurve = 'linear') {
  const toHex = mode === 'oklch' ? oklchToHex : hslToHex
  const curveFn = CURVES[curve] ?? CURVES.bell
  const lightFn = LIGHTNESS_CURVES[lightCurve] ?? LIGHTNESS_CURVES.linear
  return Array.from({ length: steps }, (_, i) => {
    const t = steps === 1 ? 0 : i / (steps - 1)
    const raw = shift + lightFn(t) * range
    const l = Math.max(0, Math.min(100, raw))
    const sEffective = s * curveFn(l / 100)
    return { l, hex: toHex(h, sEffective, l) }
  })
}
