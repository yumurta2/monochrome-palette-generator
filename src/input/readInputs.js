export function readInputs({ hueInput, satInput, countInput }) {
  return {
    h: parseInt(hueInput.value),
    s: parseInt(satInput.value),
    count: parseInt(countInput.value),
  }
}
