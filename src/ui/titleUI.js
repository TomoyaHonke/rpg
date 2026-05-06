export function renderTitle(ctx, deps) {
  const {
    VIEW_W,
    VIEW_H,
    uiImgs,
    txt,
    TITLE_MENU_ITEMS,
    titleMenuIndex,
  } = deps;

  ctx.save();
  ctx.scale(VIEW_W / 512, VIEW_H / 384);

  const bgImg = uiImgs.title_bg;

  if (bgImg && bgImg._ready) {
    ctx.drawImage(bgImg, 0, 0, 512, 384);
  } else {
    const grad = ctx.createLinearGradient(0, 0, 0, 384);
    grad.addColorStop(0, '#060318');
    grad.addColorStop(1, '#1a1245');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 384);

    const t = Date.now() / 1200;

    for (let i = 0; i < 60; i++) {
      const sx = ((Math.sin(i * 3.1 + t * 0.09) * 0.5 + 0.5) * 512) | 0;
      const sy = ((Math.cos(i * 2.7 + t * 0.07) * 0.5 + 0.5) * 240) | 0;
      const alpha = 0.3 + 0.7 * Math.sin(i * 1.7 + t);

      ctx.fillStyle = `rgba(210, 200, 255, ${alpha.toFixed(2)})`;
      ctx.fillRect(sx, sy, 2, 2);
    }
  }

  txt('AI  RPG', 98, 118, '#ffd700', 54);
  txt('〜 勇者と仲間たちの物語 〜', 96, 180, '#aaddff', 16);

  const selectedItem = TITLE_MENU_ITEMS[titleMenuIndex];

  if (selectedItem) {
    txt(`> ${selectedItem.label}`, 190, 252, '#ffffff', 18);
  }

  if (Math.floor(Date.now() / 600) % 2 === 0) {
    txt('Enter / Space / Z  でスタート', 78, 300, '#88aaff', 16);
  }

  ctx.restore();
}