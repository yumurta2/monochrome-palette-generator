const HUE_STOPS = [0, 60, 120, 180, 240, 300, 360]

function hueGradient(mode) {
  const stops = mode === 'oklch'
    ? HUE_STOPS.map((h) => `oklch(70% 0.2 ${h})`)
    : HUE_STOPS.map((h) => `hsl(${h}, 100%, 50%)`)
  return `linear-gradient(to right, ${stops.join(', ')})`
}

function satGradient(mode, h) {
  return mode === 'oklch'
    ? `linear-gradient(to right, oklch(70% 0 ${h}), oklch(70% 0.37 ${h}))`
    : `linear-gradient(to right, hsl(${h}, 0%, 50%), hsl(${h}, 100%, 50%))`
}

export function updateInputDisplay({ hueInput, hueValue, satValue, countValue, satInput }, h, s, count, mode) {
  hueValue.textContent = h
  satValue.textContent = s
  countValue.textContent = count
  hueInput.style.background = hueGradient(mode)
  satInput.style.background = satGradient(mode, h)
}
