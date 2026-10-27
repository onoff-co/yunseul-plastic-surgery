export function clampComparison(value) {
  return Number.isFinite(value)
    ? Math.round(Math.max(0, Math.min(100, value)))
    : 50;
}
export function comparisonPosition(clientX, { left, width }) {
  return width > 0 ? clampComparison(((clientX - left) / width) * 100) : 50;
}
