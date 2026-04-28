export function getElements() {
  return {
    hueInput: document.getElementById('hue'),
    satInput: document.getElementById('saturation'),
    stepsInput: document.getElementById('steps'),
    rangeInput: document.getElementById('range'),
    shiftInput: document.getElementById('shift'),
    hueValue: document.getElementById('hue-value'),
    satValue: document.getElementById('sat-value'),
    stepsValue: document.getElementById('steps-value'),
    rangeValue: document.getElementById('range-value'),
    shiftValue: document.getElementById('shift-value'),
    colorsContainer: document.getElementById('colors'),
    exportBtn: document.getElementById('export'),
    modeBtn: document.getElementById('mode'),
    curveInputs: document.querySelectorAll('input[name="curve"]'),
    lightCurveInputs: document.querySelectorAll('input[name="lightCurve"]'),
  }
}
