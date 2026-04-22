export function readInputs({ hueInput, satInput }) {
  return {
    h: parseInt(hueInput.value),
    s: parseInt(satInput.value),
  }
}
