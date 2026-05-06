export function getHeroSpriteInfo(dir, deps) {
  const {
    spriteImgs,
    hero,
    HERO_WALK_FRAME_COUNT,
    HERO_WALK_IDLE_FRAME,
    HERO_WALK_FRAMES,
  } = deps;

  const walkImg = spriteImgs.heroWalk;

  if (walkImg && walkImg._ready) {
    const frame = Math.max(
      0,
      Math.min(
        HERO_WALK_FRAME_COUNT - 1,
        hero.walkFrame ?? HERO_WALK_IDLE_FRAME
      )
    );

    const rects = HERO_WALK_FRAMES[dir] || HERO_WALK_FRAMES.down;
    const rect = rects[frame] || rects[HERO_WALK_IDLE_FRAME];

    return {
      img: walkImg,
      sx: rect.x,
      sy: rect.y,
      frameW: rect.w,
      frameH: rect.h,
    };
  }

  const img = spriteImgs.hero;
  if (!img || !img._ready) return null;

  const frameW = img.width / 2;
  const frameH = img.height / 2;
  const srcMap = {
    down: [0, 0],
    right: [frameW, 0],
    left: [0, frameH],
    up: [frameW, frameH],
  };

  const [sx, sy] = srcMap[dir] ?? [0, 0];

  return {
    img,
    sx,
    sy,
    frameW,
    frameH,
  };
}

export function drawHeroAtFoot(ctx, footX, footY, dir, deps) {
  const {
    HERO_WALK_DRAW_W,
    HERO_WALK_DRAW_H,
    HERO_SC,
    getHeroSpriteInfo,
    drawHero,
  } = deps;

  const drawW = HERO_WALK_DRAW_W;
  const drawH = HERO_WALK_DRAW_H;
  const dx = Math.round(footX - drawW / 2);
  const dy = Math.round(footY - drawH);

  const si = getHeroSpriteInfo(dir);

  if (si) {
    ctx.drawImage(
      si.img,
      si.sx,
      si.sy,
      si.frameW,
      si.frameH,
      dx,
      dy,
      drawW,
      drawH
    );
    return;
  }

  drawHero(dx, dy, HERO_SC, dir);
}

export function drawHeroEntity(ctx, deps) {
  const {
    hero,
    renderCamera,
    TILE_RENDER,
    drawHeroAtFoot,
  } = deps;

  const camCol = renderCamera.col;
  const camRow = renderCamera.row;
  const heroSX = Math.round(hero.drawX - camCol * TILE_RENDER);
  const heroSY = Math.round(hero.drawY - camRow * TILE_RENDER);

  drawHeroAtFoot(heroSX + TILE_RENDER / 2, heroSY + TILE_RENDER - 4);
}