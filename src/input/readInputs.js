export function readInputs({ hueInput, satInput, stepsInput, rangeInput, shiftInput, modeBtn }) {
  return {
    h: parseInt(hueInput.value),
    s: parseInt(satInput.value),
    steps: parseInt(stepsInput.value),
    range: parseInt(rangeInput.value),
    shift: parseInt(shiftInput.value),
    mode: modeBtn.dataset.mode,
  }
}
