export function bindInputs({ hueInput, satInput, stepsInput, rangeInput, shiftInput }, callback) {
  hueInput.addEventListener('input', callback)
  satInput.addEventListener('input', callback)
  stepsInput.addEventListener('input', callback)
  shiftInput.addEventListener('input', callback)
  rangeInput.addEventListener('input', callback)
}
