import { createColorCard } from './createColorCard.js'

const LIGHTNESS_STEPS = Array.from({ length: 21 }, (_, i) => i * 5)

export function renderPalette(colorsContainer, h, s) {
  colorsContainer.innerHTML = ''

  for (const l of LIGHTNESS_STEPS) {
    colorsContainer.appendChild(createColorCard(h, s, l))
  }
}
