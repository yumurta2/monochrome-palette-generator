import { clampChroma, formatHex } from 'culori'

export function oklchToHex(h, s, l) {
  const chroma = (s / 100) * 0.37
  const color = clampChroma(
    { mode: 'oklch', l: l / 100, c: chroma, h },
    'oklch',
    'rgb',
  )
  return formatHex(color)
}
