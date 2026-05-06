export function drawDialogueBox(ctx) {
  ctx.fillStyle = 'rgba(4,4,28,0.95)';
  ctx.fillRect(8, 246, 496, 130);
  ctx.strokeStyle = '#8888cc';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 246, 496, 130);
}

export function drawPortraitBox(ctx) {
  ctx.fillStyle = 'rgba(4,4,28,0.95)';
  ctx.fillRect(4, 150, 90, 100);
  ctx.strokeStyle = '#5a8a44';
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 150, 90, 100);
}

export function drawShopTextWindow(ctx, txt, wrapTextLines, text, selectedDetail, gold) {
  const textX = 52;
  const textY = 338;
  const textW = 396;
  const textH = 28;

  ctx.fillStyle = 'rgba(4,4,28,0.98)';
  ctx.fillRect(textX, textY, textW, textH);
  ctx.strokeStyle = '#8888cc';
  ctx.lineWidth = 1;
  ctx.strokeRect(textX, textY, textW, textH);

  const messageLines = wrapTextLines(text, textW - 16, 2, 10);
  messageLines.forEach((line, i) => {
    txt(line, textX + 8, textY + 12 + i * 11, '#ffffff', 10);
  });

  if (!text) {
    txt(selectedDetail || '', textX + 8, textY + 23, '#88aaff', 10);
  }

  txt(`G ${gold}`, 428, 366, '#ffd700', 12);
}

export function drawShopList(ctx, txt, options, shopCursor) {
  const listX = 52;
  const listY = 286;
  const listW = 396;
  const listH = 48;
  const maxVisible = 3;
  const rowH = 14;

  const scrollTop = Math.min(
    Math.max(0, shopCursor - (maxVisible - 1)),
    Math.max(0, options.length - maxVisible)
  );

  ctx.fillStyle = 'rgba(10,10,34,0.95)';
  ctx.fillRect(listX, listY, listW, listH);
  ctx.strokeStyle = '#6666aa';
  ctx.lineWidth = 1;
  ctx.strokeRect(listX, listY, listW, listH);

  ctx.save();
  ctx.beginPath();
  ctx.rect(listX + 4, listY + 4, listW - 8, listH - 8);
  ctx.clip();

  options.slice(scrollTop, scrollTop + maxVisible).forEach((opt, i) => {
    const index = scrollTop + i;
    const y = listY + 16 + i * rowH;
    const selected = index === shopCursor;
    const priceText = opt.price ? `${opt.price}G` : '';
    const label = `${selected ? '▶' : ' '} ${opt.label} ${priceText}`.trim();

    txt(label, listX + 8, y, selected ? '#ffd700' : '#ffffff', 10);
  });

  ctx.restore();
}