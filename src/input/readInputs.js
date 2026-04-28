export function readInputs({ hueInput, satInput, stepsInput, rangeInput, shiftInput, modeBtn }) {
  const checkedCurve = document.querySelector('input[name="curve"]:checked')
  const checkedLightCurve = document.querySelector('input[name="lightCurve"]:checked')
  const checkedHueShift = document.querySelector('input[name="hueShift"]:checked')
  return {
    h: parseInt(hueInput.value),
    s: parseInt(satInput.value),
    steps: parseInt(stepsInput.value),
    range: parseInt(rangeInput.value),
    shift: parseInt(shiftInput.value),
    mode: modeBtn.dataset.mode,
    curve: checkedCurve?.value ?? 'bell',
    lightCurve: checkedLightCurve?.value ?? 'linear',
    hueShift: checkedHueShift?.value ?? 'none',
  }
}
