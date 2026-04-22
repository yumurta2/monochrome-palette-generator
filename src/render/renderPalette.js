import { createColorCard } from './createColorCard.js'

export function renderPalette(colorsContainer, palette) {
  colorsContainer.style.gridTemplateColumns = `repeat(${palette.length}, 1fr)`
  colorsContainer.innerHTML = ''

  for (const { l, hex } of palette) {
    colorsContainer.appendChild(createColorCard(l, hex))
  }
}
