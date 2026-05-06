export function renderTalkWindow(ctx, deps) {
  const {
    VIEW_W,
    VIEW_H,
    talkNpc,
    talkPage,
    shopCursor,
    shopMsg,
    hero,
    uiImgs,
    txt,

    drawDialogueBox,
    drawPortraitBox,
    drawNPC,
    isShopAvailable,
    getShopOptions,
    setShopState,
    drawShopList,
    drawShopTextWindow,
    getShopIntroLine,
    getNpcLines,
  } = deps;

  if (!talkNpc) return;

  ctx.save();
  ctx.scale(VIEW_W / 512, VIEW_H / 384);

  drawDialogueBox(ctx);

  const styleImg = talkNpc.styleKey && uiImgs[talkNpc.styleKey];
  const hasPortrait = styleImg && styleImg._ready;

  if (hasPortrait) {
    drawPortraitBox(ctx);
    ctx.drawImage(styleImg, 6, 152, 86, 96);
  } else {
    drawNPC(
      16,
      254,
      1,
      talkNpc.bodyCol,
      talkNpc.hairCol,
      talkNpc.spriteKey,
      32,
      32
    );
  }

  const nameX = hasPortrait ? 100 : 60;
  txt(talkNpc.name, nameX, 272, '#ffd700', 14);

  if (isShopAvailable()) {
    const options = getShopOptions();

    if (shopCursor >= options.length) {
      setShopState({
        shopCursor: Math.max(0, options.length - 1),
      });
    }

    ctx.fillStyle = '#4444aa';
    ctx.fillRect(60, 276, 430, 1);

    const safeShopCursor = Math.min(shopCursor, Math.max(0, options.length - 1));
    const selected = options[safeShopCursor] || options[0];

    drawShopList(options);

    const messageText = shopMsg || selected?.detail || getShopIntroLine(talkNpc);

    drawShopTextWindow(
      messageText,
      selected?.detail || '',
      hero.gold
    );

    ctx.restore();
    return;
  }

  const talkLines = talkNpc._lines || getNpcLines(talkNpc);

  const textStartX = hasPortrait ? 100 : 60;
  const textAreaW = hasPortrait ? 390 : 430;

  txt(`${talkPage + 1}/${talkLines.length}`, 466, 272, '#666688', 11);

  ctx.fillStyle = '#4444aa';
  ctx.fillRect(textStartX, 276, textAreaW, 1);

  txt(talkLines[talkPage], textStartX, 306, '#ffffff', 14);

  if (Math.floor(Date.now() / 450) % 2) {
    const isLast = talkPage >= talkLines.length - 1;
    txt(isLast ? '[ とじる ]' : '[ つぎへ  ]', 376, 368, '#88aaff', 12);
  }

  ctx.restore();
}

export function drawTalk(deps) {
  const {
    renderMap,
    activeSign,
    renderSignReadWindow,
    renderTalkWindow,
  } = deps;

  renderMap();

  if (activeSign) {
    renderSignReadWindow();
  } else {
    renderTalkWindow();
  }
}

