export function shadeHex(hex, amount) {
  const raw = hex.replace('#', '');
  const num = parseInt(raw, 16);

  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (num & 255) + amount));

  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`;
}