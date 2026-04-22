export function bindInputs({ hueInput, satInput, stepsInput, rangeInput, shiftInput }, callback) {
  hueInput.addEventListener('input', callback)
  satInput.addEventListener('input', callback)
  stepsInput.addEventListener('input', callback)
  shiftInput.addEventListener('input', callback)

  rangeInput.addEventListener('input', () => {
    const maxShift = 100 - parseInt(rangeInput.value)
    if (parseInt(shiftInput.value) > maxShift) {
      shiftInput.value = String(maxShift)
    }
    callback()
  })
}
