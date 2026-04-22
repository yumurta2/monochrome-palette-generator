export function bindInputs({ hueInput, satInput, countInput }, callback) {
  hueInput.addEventListener('input', callback)
  satInput.addEventListener('input', callback)
  countInput.addEventListener('input', callback)
}
