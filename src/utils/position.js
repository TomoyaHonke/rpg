export function tileToPx(n, tileRender) {
  return n * tileRender;
}

export function pxToTile(n, tileRender) {
  return Math.floor(n / tileRender);
}