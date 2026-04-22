import { getContrastColor } from '../logics.js'

export function createColorCard(l, hex) {
  const textColor = getContrastColor(l)
  const lLabel = Math.round(l)

  const card = document.createElement('div')
  card.className = 'color-card'
  card.style.backgroundColor = hex
  card.style.color = textColor

  const setContent = (hexText) => {
    card.innerHTML = `
      <span class="lightness">L: ${lLabel}%</span>
      <span class="hex">${hexText}</span>
    `
  }

  setContent(hex.toUpperCase())

  card.addEventListener('click', () => {
    navigator.clipboard.writeText(hex.toUpperCase())
    setContent('Copied!')
    setTimeout(() => setContent(hex.toUpperCase()), 800)
  })

  return card
}
