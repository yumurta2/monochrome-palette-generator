export function updateInputDisplay({ hueValue, satValue, countValue, satInput }, h, s, count) {
  hueValue.textContent = h
  satValue.textContent = s
  countValue.textContent = count
  satInput.style.background = `linear-gradient(to right, hsl(${h}, 0%, 50%), hsl(${h}, 100%, 50%))`
}
