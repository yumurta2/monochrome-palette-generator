export function bindModeToggle({ modeBtn }, callback) {
  modeBtn.addEventListener('click', () => {
    const next = modeBtn.dataset.mode === 'hsl' ? 'oklch' : 'hsl'
    modeBtn.dataset.mode = next
    modeBtn.textContent = next.toUpperCase()
    callback()
  })
}
