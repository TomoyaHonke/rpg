export function getMapBattleBgKeyUI(mapKey, { getMapDefById }) {
  const mapDef = getMapDefById(mapKey);
  if (mapDef && mapDef.battleBg) return mapDef.battleBg;
  if (mapKey === 'dungeon') return 'cave';
  if (mapKey === 'field2') return 'dead_grass_bg';
  if (mapKey === 'cursedForest' || mapKey === 'forestMap') return 'cursed_forest_bg';
  if (mapKey === 'castle') return 'castle_bg';
  if (mapKey === 'leafaForest') return 'field';
  return 'field';
}

export function getBattleBgFallbackKeyUI(bgKey, { getMapBattleBgKey, battleBgImgs }) {
  if (bgKey === 'forest_event') return 'field';
  if (bgKey === 'boss' || bgKey === 'dark_knight' || bgKey === 'forest_boss' || bgKey === 'demon_king') {
    return getMapBattleBgKey();
  }
  if (bgKey === 'castle_bg') return battleBgImgs.cave && battleBgImgs.cave._ready ? 'cave' : 'field';
  if (bgKey === 'dead_grass_bg') return 'field';
  if (bgKey === 'cursed_forest_bg') return battleBgImgs.cave && battleBgImgs.cave._ready ? 'cave' : 'field';
  if (bgKey === 'cave' || bgKey === 'field') return bgKey;
  return getMapBattleBgKey();
}

export function resolveBattleBgKeyUI(preferredKey, { getMapBattleBgKey, getBattleBgFallbackKey, battleBgImgs }) {
  const key = preferredKey || getMapBattleBgKey();
  const img = battleBgImgs[key];
  if (img && img._ready) return key;
  return getBattleBgFallbackKey(key);
}

export function getEnemyBattleBgKeyUI(enemy, { getMapBattleBgKey }) {
  if (enemy && enemy.battleBgKey) return enemy.battleBgKey;
  return getMapBattleBgKey();
}

export function resolveBattleStartBgKeyUI(options, { getCurrentMapDef, getMapBattleBgKey }) {
  const explicitBgKey = options.bg ?? options.battleBg ?? options.battleBgKey ?? null;
  const mapBgKey = getCurrentMapDef()?.battleBg ?? getMapBattleBgKey();
  const enemyBgKey = options.enemy?.battleBgKey || null;
  return explicitBgKey || mapBgKey || enemyBgKey || 'field';
}

export function drawBattleBgImageUI(ctx, battleBgImgs, bgKey) {
  const bgImg = battleBgImgs[bgKey];
  if (!bgImg || !bgImg._ready) return;
  ctx.drawImage(bgImg, 0, 0, 512, 256);
}

export function drawBattleBackgroundUI(type, { ctx, resolveBattleBgKey, battleBgImgs }) {
  const bgKey = resolveBattleBgKey(type === 'dungeon' ? 'cave' : type);
  const fallbackKey = bgKey;
  if (fallbackKey === 'boss') {
    // 不気味な洞窟奥
    ctx.fillStyle = '#08070b';
    ctx.fillRect(0, 0, 512, 384);
    ctx.fillStyle = '#151018';
    ctx.fillRect(0, 0, 512, 72);
    ctx.fillStyle = '#211522';
    ctx.fillRect(0, 42, 512, 32);
    ctx.fillStyle = '#0d0a10';
    ctx.fillRect(0, 74, 512, 96);
    ctx.fillStyle = '#241428';
    ctx.fillRect(34, 46, 60, 18);
    ctx.fillRect(180, 24, 90, 22);
    ctx.fillRect(358, 58, 80, 16);
    ctx.fillStyle = '#3a1638';
    ctx.fillRect(58, 102, 32, 4);
    ctx.fillRect(256, 128, 46, 4);
    ctx.fillRect(390, 94, 28, 4);
    ctx.fillStyle = '#160d18';
    ctx.fillRect(0, 170, 512, 86);
    ctx.fillStyle = '#2a1828';
    ctx.fillRect(0, 216, 512, 6);
    ctx.fillRect(50, 236, 96, 6);
    ctx.fillRect(318, 226, 120, 6);
    ctx.fillStyle = '#05050c';
    ctx.fillRect(0, 256, 512, 128);
    ctx.fillStyle = 'rgba(120, 0, 80, 0.22)';
    ctx.fillRect(144, 74, 224, 142);
    drawBattleBgImageUI(ctx, battleBgImgs, bgKey);
    return;
  }

  if (fallbackKey === 'cave') {
    // 暗い洞窟
    ctx.fillStyle = '#111111';
    ctx.fillRect(0, 0, 512, 384);
    ctx.fillStyle = '#24211f';
    ctx.fillRect(0, 0, 512, 74);
    ctx.fillStyle = '#181614';
    ctx.fillRect(0, 74, 512, 96);
    ctx.fillStyle = '#302c28';
    ctx.fillRect(26, 24, 72, 20);
    ctx.fillRect(158, 48, 92, 18);
    ctx.fillRect(336, 30, 120, 24);
    ctx.fillStyle = '#3b3530';
    ctx.fillRect(48, 28, 28, 4);
    ctx.fillRect(186, 52, 36, 4);
    ctx.fillRect(374, 36, 44, 4);
    ctx.fillStyle = '#1b1815';
    ctx.fillRect(0, 170, 512, 86);
    ctx.fillStyle = '#2b2620';
    ctx.fillRect(0, 216, 512, 5);
    ctx.fillRect(22, 236, 112, 5);
    ctx.fillRect(214, 228, 82, 5);
    ctx.fillRect(362, 244, 108, 5);
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 256, 512, 128);
    drawBattleBgImageUI(ctx, battleBgImgs, bgKey);
    return;
  }

  // 草原
  ctx.fillStyle = '#78b7e8';
  ctx.fillRect(0, 0, 512, 104);
  ctx.fillStyle = '#b9e6ff';
  ctx.fillRect(0, 104, 512, 46);
  ctx.fillStyle = '#eef7ff';
  ctx.fillRect(62, 44, 56, 12);
  ctx.fillRect(92, 34, 64, 14);
  ctx.fillRect(300, 58, 84, 14);
  ctx.fillRect(344, 48, 58, 12);
  ctx.fillStyle = '#4f963f';
  ctx.fillRect(0, 150, 512, 106);
  ctx.fillStyle = '#39722f';
  ctx.fillRect(0, 216, 512, 5);
  ctx.fillRect(32, 236, 80, 4);
  ctx.fillRect(172, 228, 96, 4);
  ctx.fillRect(354, 246, 104, 4);
  ctx.fillStyle = '#69b85a';
  ctx.fillRect(28, 180, 18, 3);
  ctx.fillRect(138, 198, 24, 3);
  ctx.fillRect(250, 232, 20, 3);
  ctx.fillRect(420, 188, 26, 3);
  ctx.fillStyle = '#050510';
  ctx.fillRect(0, 256, 512, 128);

  drawBattleBgImageUI(ctx, battleBgImgs, bgKey);
}
