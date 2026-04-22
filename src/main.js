import './style.css'
import { getElements, readInputs, updateInputDisplay, bindInputs } from './inputs.js'
import { renderPalette } from './renders.js'

const elements = getElements()

const update = () => {
  const { h, s } = readInputs(elements)
  updateInputDisplay(elements, h, s)
  renderPalette(elements.colorsContainer, h, s)
}

bindInputs(elements, update)
update()
