export function updateInputDisplay({ hueValue, satValue, satInput }, h, s) {
  hueValue.textContent = h
  satValue.textContent = s
  satInput.style.background = `linear-gradient(to right, hsl(${h}, 0%, 50%), hsl(${h}, 100%, 50%))`
}
