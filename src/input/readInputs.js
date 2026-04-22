export function readInputs({ hueInput, satInput, countInput, modeBtn }) {
  return {
    h: parseInt(hueInput.value),
    s: parseInt(satInput.value),
    count: parseInt(countInput.value),
    mode: modeBtn.dataset.mode,
  }
}
