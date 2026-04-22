import { createColorCard } from './createColorCard.js'
import { LIGHTNESS_STEPS } from '../logics.js'

export function renderPalette(colorsContainer, h, s) {
  colorsContainer.innerHTML = ''

  for (const l of LIGHTNESS_STEPS) {
    colorsContainer.appendChild(createColorCard(h, s, l))
  }
}
