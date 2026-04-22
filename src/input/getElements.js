export function getElements() {
  return {
    hueInput: document.getElementById('hue'),
    satInput: document.getElementById('saturation'),
    countInput: document.getElementById('count'),
    hueValue: document.getElementById('hue-value'),
    satValue: document.getElementById('sat-value'),
    countValue: document.getElementById('count-value'),
    colorsContainer: document.getElementById('colors'),
    exportBtn: document.getElementById('export'),
  }
}
