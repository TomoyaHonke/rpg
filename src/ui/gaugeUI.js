export function drawBar(ctx, x, y, w, cur, max, col) {
  ctx.fillStyle = '#111';
  ctx.fillRect(x, y, w, 10);

  ctx.fillStyle = col;
  ctx.fillRect(x, y, Math.round(w * cur / max), 10);

  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, 10);
}

export function drawThinBar(ctx, x, y, w, cur, max, col) {
  ctx.fillStyle = '#111';
  ctx.fillRect(x, y, w, 6);

  ctx.fillStyle = col;
  ctx.fillRect(x, y, Math.round(w * cur / max), 6);

  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, w, 6);
}