import './style.css'
import {
  getElements,
  readInputs,
  updateInputDisplay,
  bindInputs,
  bindExport,
  bindModeToggle,
} from './inputs.js'
import { renderPalette, downloadBlob } from './renders.js'
import { generatePalette, paletteToPng } from './logics.js'

const elements = getElements()

const update = () => {
  const { h, s, count, mode } = readInputs(elements)
  updateInputDisplay(elements, h, s, count, mode)
  const palette = generatePalette(h, s, count, mode)
  renderPalette(elements.colorsContainer, palette)
}

const onExport = async () => {
  const { h, s, count, mode } = readInputs(elements)
  const palette = generatePalette(h, s, count, mode)
  const hexes = palette.map((p) => p.hex)
  const blob = await paletteToPng(hexes)
  downloadBlob(blob, `palette-${mode}-h${h}-s${s}-n${count}.png`)
}

bindInputs(elements, update)
bindExport(elements, onExport)
bindModeToggle(elements, update)
update()
