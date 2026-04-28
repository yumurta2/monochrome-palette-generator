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

const CURVE_ABBR = { linear: 'lin', parabolic: 'par', bell: 'bel', asymmetric: 'asy' }
const LIGHT_CURVE_ABBR = { linear: 'lin', easeOut: 'eo', easeIn: 'ei', smooth: 'sm' }

const update = () => {
  const { h, s, steps, range, shift, mode, curve, lightCurve, hueShift } = readInputs(elements)
  updateInputDisplay(elements, h, s, steps, range, shift, mode, hueShift)
  const palette = generatePalette(h, s, steps, range, shift, mode, curve, lightCurve, hueShift)
  renderPalette(elements.colorsContainer, palette)
}

const onExport = async () => {
  const { h, s, steps, range, shift, mode, curve, lightCurve, hueShift } = readInputs(elements)
  const palette = generatePalette(h, s, steps, range, shift, mode, curve, lightCurve, hueShift)
  const hexes = palette.map((p) => p.hex)
  const blob = await paletteToPng(hexes)
  downloadBlob(blob, `palette-${mode}-h${h}-s${s}-n${steps}-r${range}-o${shift}-c${CURVE_ABBR[curve]}-l${LIGHT_CURVE_ABBR[lightCurve]}-x${hueShift}.png`)
}

bindInputs(elements, update)
bindExport(elements, onExport)
bindModeToggle(elements, update)
update()
