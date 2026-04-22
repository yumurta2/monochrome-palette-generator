export function bindInputs({ hueInput, satInput }, callback) {
  hueInput.addEventListener('input', callback)
  satInput.addEventListener('input', callback)
}
