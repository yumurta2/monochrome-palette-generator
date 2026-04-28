export function bindInputs({ hueInput, satInput, stepsInput, rangeInput, shiftInput, curveInputs, lightCurveInputs, hueShiftInputs }, callback) {
  hueInput.addEventListener('input', callback)
  satInput.addEventListener('input', callback)
  stepsInput.addEventListener('input', callback)
  shiftInput.addEventListener('input', callback)
  rangeInput.addEventListener('input', callback)
  curveInputs.forEach((input) => input.addEventListener('change', callback))
  lightCurveInputs.forEach((input) => input.addEventListener('change', callback))
  hueShiftInputs.forEach((input) => input.addEventListener('change', callback))
}
