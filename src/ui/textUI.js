export function drawText(ctx, s, x, y, col = '#fff', sz = 14) {
  ctx.font = `${sz}px "Courier New", monospace`;
  ctx.fillStyle = '#000';
  ctx.fillText(s, x + 1, y + 1);
  ctx.fillStyle = col;
  ctx.fillText(s, x, y);
}

export function wrapTextLines(ctx, text, maxWidth, maxLines, fontSize = 10) {
  const source = String(text || '');
  const lines = [];
  const chars = Array.from(source);
  let line = '';

  ctx.save();
  ctx.font = `${fontSize}px "Courier New", monospace`;

  for (const ch of chars) {
    const test = line + ch;

    if (line && ctx.measureText(test).width > maxWidth) {
      lines.push(line);
      line = ch;

      if (lines.length >= maxLines) break;
    } else {
      line = test;
    }
  }

  if (lines.length < maxLines && line) {
    lines.push(line);
  }

  ctx.restore();

  return lines.slice(0, maxLines);
}