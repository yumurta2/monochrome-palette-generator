import './style.css'
import { getElements, readInputs, updateInputDisplay, bindInputs, bindExport } from './inputs.js'
import { renderPalette, downloadBlob } from './renders.js'
import { generatePalette, paletteToPng } from './logics.js'

const elements = getElements()

const update = () => {
  const { h, s } = readInputs(elements)
  updateInputDisplay(elements, h, s)
  renderPalette(elements.colorsContainer, h, s)
}

const onExport = async () => {
  const { h, s } = readInputs(elements)
  const hexes = generatePalette(h, s)
  const blob = await paletteToPng(hexes)
  downloadBlob(blob, `palette-h${h}-s${s}.png`)
}

bindInputs(elements, update)
bindExport(elements, onExport)
update()
