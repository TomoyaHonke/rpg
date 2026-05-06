export function drawChestFallback(ctx, px, py, drawW, drawH, opened) {
  const base = Math.min(drawW, drawH);
  const x = px + Math.round((drawW - base) / 2);
  const y = py + Math.round(drawH - base);
  const p = n => Math.max(1, Math.round(n * base / 32));

  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(x + p(7), y + p(27), p(18), p(3));

  if (opened) {
    ctx.fillStyle = '#3a2418';
    ctx.fillRect(x + p(7), y + p(17), p(18), p(9));
    ctx.fillStyle = '#1f120c';
    ctx.fillRect(x + p(9), y + p(20), p(14), p(4));
    ctx.fillStyle = '#9b6a38';
    ctx.fillRect(x + p(8), y + p(13), p(16), p(5));
    ctx.fillStyle = '#d0a040';
    ctx.fillRect(x + p(15), y + p(17), p(3), p(4));
    return;
  }

  ctx.fillStyle = '#5c2f18';
  ctx.fillRect(x + p(7), y + p(13), p(18), p(13));
  ctx.fillStyle = '#8b4a20';
  ctx.fillRect(x + p(8), y + p(14), p(16), p(11));
  ctx.fillStyle = '#b86a28';
  ctx.fillRect(x + p(8), y + p(10), p(16), p(6));
  ctx.fillStyle = '#d88a3a';
  ctx.fillRect(x + p(9), y + p(11), p(6), p(2));
  ctx.fillStyle = '#5c2f18';
  ctx.fillRect(x + p(7), y + p(17), p(18), p(2));
  ctx.fillRect(x + p(7), y + p(24), p(18), p(2));
  ctx.fillStyle = '#e0b84a';
  ctx.fillRect(x + p(15), y + p(17), p(3), p(5));
}

export function drawChestEntity(ctx, chest, deps) {
  const {
    DEFAULT_CHEST_DRAW_SIZE,
    getGroundedTileDrawRect,
    VIEW_W,
    VIEW_H,
    flags,
    objectImgs,
    chestImageKey,
  } = deps;

  const drawW = chest.drawW || DEFAULT_CHEST_DRAW_SIZE;
  const drawH = chest.drawH || DEFAULT_CHEST_DRAW_SIZE;
  const { x: drawX, y: drawY } = getGroundedTileDrawRect(chest, drawW, drawH);

  if (drawX + drawW < 0 || drawX > VIEW_W || drawY + drawH < 0 || drawY > VIEW_H) {
    return;
  }

  const opened = !!flags[chest.flagKey];
  const img = objectImgs[chestImageKey(chest)];

  if (img && img._ready) {
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    return;
  }

  drawChestFallback(ctx, drawX, drawY, drawW, drawH, opened);
}

export function drawHouseFallback(ctx, house, px, py, drawW, drawH) {
  const p = n => Math.max(1, Math.round(n * drawW / 64));
  const isShadow = String(house.variant || '').startsWith('shadow');
  const isInn = house.variant === 'inn' || house.variant === 'shadowInn';
  const isShop = house.variant === 'shop' || house.variant === 'shadowShop';
  const roof = isShadow ? '#36284a' : isInn ? '#7a2b38' : isShop ? '#3b5f45' : '#8f2730';
  const roofHi = isShadow ? '#5c4a78' : isInn ? '#b64655' : isShop ? '#5d9868' : '#c83a43';
  const wall = isShadow ? '#6f6680' : '#c79a63';
  const wallHi = isShadow ? '#8d839b' : '#e0bd82';
  const trim = isShadow ? '#2c2438' : '#62432a';
  const baseY = py + drawH;

  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.fillRect(px + p(9), baseY - p(6), drawW - p(18), p(6));

  ctx.fillStyle = trim;
  ctx.fillRect(px + p(8), py + p(24), drawW - p(16), p(15));
  ctx.fillStyle = roof;
  ctx.fillRect(px + p(5), py + p(31), drawW - p(10), p(26));
  ctx.fillRect(px + p(13), py + p(16), drawW - p(26), p(22));
  ctx.fillStyle = roofHi;
  ctx.fillRect(px + p(9), py + p(34), drawW - p(18), p(8));
  ctx.fillRect(px + p(17), py + p(20), drawW - p(34), p(6));

  ctx.fillStyle = wall;
  ctx.fillRect(px + p(10), py + p(54), drawW - p(20), drawH - p(58));
  ctx.fillStyle = wallHi;
  ctx.fillRect(px + p(14), py + p(58), drawW - p(28), p(13));
  ctx.fillStyle = trim;
  ctx.fillRect(px + p(10), baseY - p(13), drawW - p(20), p(9));

  ctx.fillStyle = '#5b351e';
  ctx.fillRect(px + Math.round(drawW / 2) - p(7), baseY - p(42), p(14), p(38));
  ctx.fillStyle = '#7b4a28';
  ctx.fillRect(px + Math.round(drawW / 2) - p(5), baseY - p(39), p(10), p(35));
  ctx.fillStyle = '#e4b84a';
  ctx.fillRect(px + Math.round(drawW / 2) + p(3), baseY - p(23), p(2), p(2));

  ctx.fillStyle = '#26384d';
  ctx.fillRect(px + p(17), baseY - p(41), p(12), p(11));
  ctx.fillRect(px + drawW - p(29), baseY - p(41), p(12), p(11));
  ctx.fillStyle = '#9fd3ff';
  ctx.fillRect(px + p(19), baseY - p(39), p(8), p(7));
  ctx.fillRect(px + drawW - p(27), baseY - p(39), p(8), p(7));

  if (isInn || isShop) {
    ctx.fillStyle = '#2b1a0c';
    ctx.fillRect(px + Math.round(drawW / 2) - p(15), py + p(43), p(30), p(16));
    ctx.fillStyle = isInn ? '#f0f4ff' : '#e0b84a';
    ctx.fillRect(px + Math.round(drawW / 2) - p(12), py + p(45), p(24), p(11));
    ctx.fillStyle = isInn ? '#557799' : '#7a4a20';
    ctx.fillRect(px + Math.round(drawW / 2) - p(7), py + p(49), p(14), p(3));
  }
}

export function drawHouseEntity(ctx, house, deps) {
  const {
    getHouseDrawRect,
    VIEW_W,
    VIEW_H,
    objectImgs,
  } = deps;

  const { x: drawX, y: drawY } = getHouseDrawRect(house);

  if (drawX + house.drawW < 0 || drawX > VIEW_W || drawY + house.drawH < 0 || drawY > VIEW_H) {
    return;
  }

  const img = objectImgs[house.spriteKey];

  if (img && img._ready) {
    ctx.drawImage(img, drawX, drawY, house.drawW, house.drawH);
    return;
  }

  drawHouseFallback(ctx, house, drawX, drawY, house.drawW, house.drawH);
}

 export function drawDecorFallback(kind, px, py, drawW, drawH) {
    const base = Math.min(drawW, drawH);
    const ox = Math.round((drawW - base) / 2);
    const oy = Math.round(drawH - base);
    const x = px + ox;
    const y = py + oy;
    const p = n => Math.max(1, Math.round(n * base / 32));
    if (kind === 'flower' || kind === 'flower_red') {
      ctx.fillStyle = '#3a6e30';
      ctx.fillRect(x + p(15), y + p(16), p(2), p(8));
      ctx.fillStyle = kind === 'flower_red' ? '#d93636' : '#ff66aa';
      ctx.fillRect(x + p(12), y + p(12), p(4), p(4));
      ctx.fillRect(x + p(17), y + p(12), p(4), p(4));
      ctx.fillRect(x + p(14), y + p(9), p(4), p(4));
      ctx.fillStyle = '#ffee00';
      ctx.fillRect(x + p(15), y + p(13), p(3), p(3));
    } else if (kind === 'small_rock' || kind === 'rock_cluster') {
      ctx.fillStyle = '#5d5d58';
      ctx.fillRect(x + p(8), y + p(15), p(16), p(8));
      ctx.fillStyle = '#8b8b82';
      ctx.fillRect(x + p(10), y + p(12), p(11), p(6));
      ctx.fillStyle = '#44443f';
      ctx.fillRect(x + p(17), y + p(20), p(6), p(3));
      if (kind === 'rock_cluster') {
        ctx.fillStyle = '#6f6f68';
        ctx.fillRect(x + p(3), y + p(18), p(8), p(6));
        ctx.fillRect(x + p(21), y + p(16), p(7), p(7));
      }
    } else if (kind === 'barrel') {
      ctx.fillStyle = '#4a2a16';
      ctx.fillRect(x + p(9), y + p(7), p(14), p(22));
      ctx.fillStyle = '#8a4d24';
      ctx.fillRect(x + p(11), y + p(6), p(10), p(22));
      ctx.fillStyle = '#2d1a0d';
      ctx.fillRect(x + p(9), y + p(11), p(14), p(2));
      ctx.fillRect(x + p(9), y + p(22), p(14), p(2));
    } else if (kind === 'crate') {
      ctx.fillStyle = '#5a351b';
      ctx.fillRect(x + p(6), y + p(8), p(20), p(20));
      ctx.fillStyle = '#9a6330';
      ctx.fillRect(x + p(8), y + p(10), p(16), p(16));
      ctx.fillStyle = '#4a2a15';
      ctx.fillRect(x + p(15), y + p(10), p(2), p(16));
      ctx.fillRect(x + p(8), y + p(17), p(16), p(2));
    } else if (kind === 'root') {
      ctx.fillStyle = '#4a2d18';
      ctx.fillRect(x + p(3), y + p(17), p(13), p(3));
      ctx.fillRect(x + p(14), y + p(18), p(11), p(2));
      ctx.fillRect(x + p(21), y + p(14), p(6), p(2));
      ctx.fillStyle = '#6a4324';
      ctx.fillRect(x + p(6), y + p(17), p(8), p(1));
    } else if (kind === 'campfire_ash') {
      ctx.fillStyle = '#2f2f2c';
      ctx.fillRect(x + p(9), y + p(20), p(14), p(4));
      ctx.fillStyle = '#5b5148';
      ctx.fillRect(x + p(7), y + p(22), p(5), p(3));
      ctx.fillRect(x + p(20), y + p(21), p(5), p(3));
      ctx.fillStyle = '#3d281b';
      ctx.fillRect(x + p(10), y + p(15), p(12), p(3));
      ctx.fillRect(x + p(13), y + p(12), p(3), p(10));
      ctx.fillStyle = '#8a3020';
      ctx.fillRect(x + p(16), y + p(18), p(3), p(2));
    } else if (kind === 'dead_tree' || kind === 'dead_tree_dark') {
      const dark = kind === 'dead_tree_dark';
      ctx.fillStyle = dark ? '#21191a' : '#3a2a1e';
      ctx.fillRect(x + p(14), y + p(8), p(5), p(22));
      ctx.fillRect(x + p(8), y + p(12), p(10), p(3));
      ctx.fillRect(x + p(17), y + p(15), p(9), p(3));
      ctx.fillStyle = dark ? '#39242a' : '#5a3b25';
      ctx.fillRect(x + p(15), y + p(9), p(2), p(18));
      if (dark) {
        ctx.fillStyle = '#151113';
        ctx.fillRect(x + p(6), y + p(10), p(8), p(2));
        ctx.fillRect(x + p(20), y + p(13), p(7), p(2));
        ctx.fillStyle = '#5b2436';
        ctx.fillRect(x + p(16), y + p(8), p(1), p(7));
      }
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(x + p(8), y + p(29), p(18), p(2));
    } else if (kind === 'throne') {
      ctx.fillStyle = '#4a0a0a';
      ctx.fillRect(x + p(6), y + p(4), p(20), p(24));
      ctx.fillStyle = '#7a1a1a';
      ctx.fillRect(x + p(8), y + p(6), p(16), p(20));
      ctx.fillStyle = '#c8a020';
      ctx.fillRect(x + p(6), y + p(4), p(20), p(2));
      ctx.fillRect(x + p(6), y + p(4), p(2), p(24));
      ctx.fillRect(x + p(24), y + p(4), p(2), p(24));
      ctx.fillStyle = '#2a1a0a';
      ctx.fillRect(x + p(8), y + p(24), p(16), p(6));
    } else if (kind === 'dark_crystal') {
      ctx.fillStyle = '#1a0a2a';
      ctx.fillRect(x + p(13), y + p(18), p(6), p(12));
      ctx.fillStyle = '#5a10a0';
      ctx.fillRect(x + p(11), y + p(8), p(10), p(14));
      ctx.fillStyle = '#8a20d0';
      ctx.fillRect(x + p(13), y + p(6), p(6), p(10));
      ctx.fillStyle = 'rgba(180,80,255,0.4)';
      ctx.fillRect(x + p(14), y + p(7), p(3), p(8));
    } else if (kind === 'dark_pillar') {
      ctx.fillStyle = '#1c1828';
      ctx.fillRect(x + p(10), y + p(2), p(12), p(28));
      ctx.fillStyle = '#2e2840';
      ctx.fillRect(x + p(11), y + p(3), p(10), p(26));
      ctx.fillStyle = '#3e3450';
      ctx.fillRect(x + p(12), y + p(4), p(4), p(24));
      ctx.fillStyle = '#120e1e';
      ctx.fillRect(x + p(8), y + p(2), p(16), p(3));
      ctx.fillRect(x + p(8), y + p(27), p(16), p(3));
    } else if (kind === 'iron_door') {
      ctx.fillStyle = '#1a1a22';
      ctx.fillRect(x + p(6), y + p(2), p(20), p(28));
      ctx.fillStyle = '#2a2a36';
      ctx.fillRect(x + p(7), y + p(3), p(18), p(26));
      ctx.fillStyle = '#0e0e16';
      ctx.fillRect(x + p(15), y + p(2), p(2), p(28));
      ctx.fillStyle = '#5a4a10';
      ctx.fillRect(x + p(8), y + p(14), p(5), p(3));
      ctx.fillRect(x + p(19), y + p(14), p(5), p(3));
    } else if (kind === 'demon_altar') {
      ctx.fillStyle = '#1a0a0a';
      ctx.fillRect(x + p(4), y + p(16), p(24), p(12));
      ctx.fillStyle = '#2e1212';
      ctx.fillRect(x + p(6), y + p(12), p(20), p(8));
      ctx.fillStyle = '#8a0000';
      ctx.fillRect(x + p(10), y + p(8), p(12), p(8));
      ctx.fillStyle = 'rgba(255,60,0,0.5)';
      ctx.fillRect(x + p(13), y + p(6), p(6), p(6));
      ctx.fillStyle = '#c8a020';
      ctx.fillRect(x + p(4), y + p(12), p(24), p(2));
    } else if (kind === 'forest_entrance') {
      // 森の入口：緑の木製アーチ（フォールバック）
      ctx.fillStyle = '#2a4a1c';
      ctx.fillRect(x + p(4),  y + p(8),  p(5), p(24));  // 左柱
      ctx.fillRect(x + p(23), y + p(8),  p(5), p(24));  // 右柱
      ctx.fillStyle = '#1e3a12';
      ctx.fillRect(x + p(4),  y + p(7),  p(24), p(4));  // 上梁
      ctx.fillStyle = '#3d7a28';
      ctx.fillRect(x + p(6),  y + p(3),  p(20), p(5));  // 葉：下段
      ctx.fillStyle = '#4d9a32';
      ctx.fillRect(x + p(9),  y + p(1),  p(14), p(4));  // 葉：上段
      ctx.fillStyle = '#66bb44';
      ctx.fillRect(x + p(12), y,          p(8),  p(3));  // 葉：天頂
      ctx.fillStyle = '#99ee66';
      ctx.fillRect(x + p(14), y + p(1),   p(2),  p(2));  // 光の点
      ctx.fillRect(x + p(9),  y + p(4),   p(2),  p(2));
      ctx.fillRect(x + p(20), y + p(3),   p(2),  p(2));
    } else if (kind === 'dark_castle_object') {
      ctx.fillStyle = 'rgba(0,0,0,0.32)';
      ctx.fillRect(x + p(3), y + p(29), p(26), p(3));
      ctx.fillStyle = '#120b18';
      ctx.fillRect(x + p(6), y + p(11), p(20), p(18));
      ctx.fillStyle = '#21152a';
      ctx.fillRect(x + p(8), y + p(8), p(16), p(21));
      ctx.fillStyle = '#0a0710';
      ctx.fillRect(x + p(5), y + p(14), p(4), p(15));
      ctx.fillRect(x + p(23), y + p(14), p(4), p(15));
      ctx.fillStyle = '#2f1d3e';
      ctx.fillRect(x + p(7), y + p(6), p(5), p(8));
      ctx.fillRect(x + p(20), y + p(6), p(5), p(8));
      ctx.fillStyle = '#4b164f';
      ctx.fillRect(x + p(14), y + p(17), p(4), p(12));
      ctx.fillStyle = '#8a20d0';
      ctx.fillRect(x + p(15), y + p(18), p(2), p(8));
    }
  }

  export function drawCustomObject(ctx, kind, px, py, drawW, drawH, object = {}) {
  if (kind === 'torch') return;
  drawDecorFallback(ctx, kind, px, py, drawW, drawH, object);
}

export function drawObject(ctx, kind, px, py, drawW, drawH, object = {}, deps) {
  const {
    tileImgs,
    objectImgs,
    getDecorImageKey,
  } = deps;

  const imgKey = getDecorImageKey(kind);
  const img = tileImgs[imgKey];

  if (img && img._ready) {
    ctx.drawImage(img, px, py, drawW, drawH);
    return;
  }

  const objectImg = objectImgs[imgKey];

  if (objectImg && objectImg._ready) {
    ctx.drawImage(objectImg, px, py, drawW, drawH);
    return;
  }

  drawCustomObject(ctx, kind, px, py, drawW, drawH, object);
}

export function drawDecorEntity(ctx, decor, deps) {
  const {
    getDecorDrawSize,
    getGroundedTileDrawRect,
    VIEW_W,
    VIEW_H,
  } = deps;

  const { w: drawW, h: drawH } = getDecorDrawSize(decor.kind, decor);
  const { x: drawX, y: drawY } = getGroundedTileDrawRect(decor, drawW, drawH);

  if (drawX + drawW < 0 || drawX > VIEW_W || drawY + drawH < 0 || drawY > VIEW_H) {
    return;
  }

  drawObject(ctx, decor.kind, drawX, drawY, drawW, drawH, decor, deps);
}

export function genericNpcFallback(ctx, x, y, scale, bodyCol = '#666688', hairCol = '#3a2a1a') {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  const body = bodyCol || '#666688';
  const hair = hairCol || '#3a2a1a';

  ctx.fillStyle = 'rgba(0, 0, 0, 0.24)';
  ctx.fillRect(8, 28, 16, 3);
  ctx.fillStyle = '#333333';
  ctx.fillRect(10, 25, 5, 5);
  ctx.fillRect(17, 25, 5, 5);
  ctx.fillStyle = body;
  ctx.fillRect(9, 14, 14, 12);
  ctx.fillStyle = '#f0b98a';
  ctx.fillRect(12, 7, 8, 7);
  ctx.fillRect(13, 12, 6, 4);
  ctx.fillStyle = hair;
  ctx.fillRect(10, 5, 12, 5);
  ctx.fillRect(9, 8, 3, 5);
  ctx.fillRect(20, 8, 3, 5);
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(12, 10, 2, 2);
  ctx.fillRect(18, 10, 2, 2);

  ctx.restore();
}

export function drawNPC(ctx, px, py, sc, bodyCol, hairCol, spriteKey = null, drawW = null, drawH = null, deps = {}) {
  const {
    npcImgs,
    spriteImgs,
  } = deps;

  ctx.save();

  const resolvedDrawW = drawW || Math.round(32 * sc);
  const resolvedDrawH = drawH || Math.round(32 * sc);
  const img = spriteKey && npcImgs ? npcImgs[spriteKey] : null;

  if (img && img._ready) {
    ctx.drawImage(img, px, py, resolvedDrawW, resolvedDrawH);
    ctx.restore();
    return;
  }

  if (spriteImgs && spriteImgs.npc && spriteImgs.npc._ready) {
    ctx.translate(px, py);
    ctx.scale(resolvedDrawW / 32, resolvedDrawH / 32);
    ctx.drawImage(spriteImgs.npc, 0, 0, 32, 32);
    ctx.restore();
    return;
  }

  ctx.restore();
  genericNpcFallback(ctx, px, py, Math.min(resolvedDrawW, resolvedDrawH) / 32, bodyCol, hairCol);
}
