import './style.css'
import { getElements, readInputs, updateInputDisplay, bindInputs, bindExport } from './inputs.js'
import { renderPalette, downloadBlob } from './renders.js'
import { generatePalette, paletteToPng } from './logics.js'

const elements = getElements()

const update = () => {
  const { h, s, count } = readInputs(elements)
  updateInputDisplay(elements, h, s, count)
  const palette = generatePalette(h, s, count)
  renderPalette(elements.colorsContainer, palette)
}

const onExport = async () => {
  const { h, s, count } = readInputs(elements)
  const palette = generatePalette(h, s, count)
  const hexes = palette.map((p) => p.hex)
  const blob = await paletteToPng(hexes)
  downloadBlob(blob, `palette-h${h}-s${s}-n${count}.png`)
}

bindInputs(elements, update)
bindExport(elements, onExport)
update()
