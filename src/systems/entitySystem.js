export function makeChestEntity(x, y, options = {}, deps) {
  const {
    tileToPx,
    TILE_RENDER,
    DEFAULT_CHEST_DRAW_SIZE,
    centeredBottomHitbox,
    chestFlagKey,
    flags,
    grantChestRewards,
    showNotice,
    drawChestEntity,
  } = deps;

  const id = options.id || `chest_${x}_${y}`;
  const flagKey = options.flagKey || chestFlagKey(id);

  return {
    type: 'chest',
    id,
    item: options.item,
    amount: options.amount,
    rewards: options.rewards,
    spriteKey: options.spriteKey || 'chest',
    drawW: options.drawW || Math.round(DEFAULT_CHEST_DRAW_SIZE * (options.scale || 1)),
    drawH: options.drawH || Math.round(DEFAULT_CHEST_DRAW_SIZE * (options.scale || 1)),
    x: tileToPx(x),
    y: tileToPx(y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.5, 0.35),
    flagKey,
    blocking: options.blocking !== false,
    update() {},
    draw() {
      drawChestEntity(this);
    },
    interact() {
      if (flags[flagKey]) {
        showNotice('宝箱は空っぽだ');
        return;
      }

      flags[flagKey] = true;

      const rewardMessages = grantChestRewards(this);
      showNotice(['宝箱を開けた！', ...rewardMessages].join(' '));
    },
  };
}

export function makeSignEntity(x, y, lines, flagKey = null, options = {}, deps) {
  const {
    tileToPx,
    TILE_RENDER,
    DEFAULT_SIGN_DRAW_SIZE,
    centeredBottomHitbox,
    resolveEntityDrawSize,
    openSignRead,
  } = deps;

  const drawSize = resolveEntityDrawSize(options, DEFAULT_SIGN_DRAW_SIZE);

  return {
    type: 'sign',
    x: tileToPx(x),
    y: tileToPx(y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    drawW: drawSize.w,
    drawH: drawSize.h,
    lines,
    flagKey,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.5, 0.35),
    blocking: false,
    update() {},
    interact() {
      openSignRead(this);
    },
  };
}

export function makeHouseEntity(x, y, spriteKey = 'house', width = 256, height = 240, options = {}, deps) {
  const {
    tileToPx,
    TILE_RENDER,
    makeHouseHitbox,
    drawHouseEntity,
  } = deps;

  return {
    type: 'house',
    spriteKey,
    variant: options.variant || 'house',
    x: tileToPx(x),
    y: tileToPx(y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    drawW: width,
    drawH: height,
    offsetX: options.offsetX || 0,
    offsetY: options.offsetY || 0,
    hitbox: options.hitbox || makeHouseHitbox(width, height),
    blocking: true,
    update() {},
    draw() {
      drawHouseEntity(this);
    },
  };
}

export function makeNpcEntity(npc, deps) {
  const {
    tileToPx,
    TILE_RENDER,
    DEFAULT_NPC_DRAW_W,
    DEFAULT_NPC_DRAW_H,
    NPC_SC,
    VIEW_W,
    VIEW_H,
    renderCamera,
    resolveEntityDrawSize,
    centeredBottomHitbox,
    drawNPC,
    getNpcRole,
    openShop,
    openDialogue,
  } = deps;

  const npcDrawSize = resolveEntityDrawSize(npc, DEFAULT_NPC_DRAW_W, DEFAULT_NPC_DRAW_H);

  return {
    type: 'npc',
    source: npc,
    x: tileToPx(npc.x) + (npc.offsetX || 0),
    y: tileToPx(npc.y) + (npc.offsetY || 0),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER),
    blocking: true,
    drawW: npcDrawSize.w,
    drawH: npcDrawSize.h,
    update() {},
    draw() {
      const camCol = renderCamera.col;
      const camRow = renderCamera.row;
      const npcSX = Math.round(this.x - camCol * TILE_RENDER);
      const npcSY = Math.round(this.y - camRow * TILE_RENDER);
      const drawW = this.drawW;
      const drawH = this.drawH;

      if (npcSX < -drawW || npcSX > VIEW_W || npcSY < -drawH || npcSY > VIEW_H) return;

      const drawX = npcSX + Math.round((TILE_RENDER - drawW) / 2);
      const drawY = npcSY + TILE_RENDER - drawH;

      drawNPC(drawX, drawY, NPC_SC, npc.bodyCol, npc.hairCol, npc.spriteKey, drawW, drawH);
    },
    interact() {
      if (getNpcRole(npc) === 'shop') {
        openShop(npc);
      } else {
        openDialogue(npc);
      }
    },
  };
}

export function makeEnemyNpcEntity(enemyNpc, deps) {
  const {
    tileToPx,
    TILE_RENDER,
    VIEW_W,
    VIEW_H,
    renderCamera,
    resolveEntityDrawSize,
    centeredBottomHitbox,
    drawEnemy,
  } = deps;

  const enemyDrawSize = resolveEntityDrawSize(enemyNpc, 130, 130);

  return {
    type: 'enemy_npc',
    source: enemyNpc,
    x: tileToPx(enemyNpc.x) + (enemyNpc.offsetX || 0),
    y: tileToPx(enemyNpc.y) + (enemyNpc.offsetY || 0),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER),
    blocking: true,
    drawW: enemyDrawSize.w,
    drawH: enemyDrawSize.h,
    update() {},
    draw() {
      const camCol = renderCamera.col;
      const camRow = renderCamera.row;
      const sx = Math.round(this.x - camCol * TILE_RENDER);
      const sy = Math.round(this.y - camRow * TILE_RENDER);
      const drawW = this.drawW;
      const drawH = this.drawH;

      if (sx < -drawW || sx > VIEW_W || sy < -drawH || sy > VIEW_H) return;

      const drawX = sx + Math.round((TILE_RENDER - drawW) / 2) + (enemyNpc.offsetX || 0);
      const drawY = sy + TILE_RENDER - drawH + (enemyNpc.offsetY || 0);

      drawEnemy(
        {
          spriteKey: enemyNpc.spriteKey,
          fallbackSprite: enemyNpc.fallbackSprite || enemyNpc.spriteKey,
          drawW,
          drawH,
        },
        drawX,
        drawY,
        drawW / 32
      );
    },
  };
}

function isOnScreenTileSprite(x, y, deps) {
  const {
    renderCamera,
    TILE_RENDER,
    VIEW_W,
    VIEW_H,
  } = deps;

  const sx = Math.round(x - renderCamera.col * TILE_RENDER);
  const sy = Math.round(y - renderCamera.row * TILE_RENDER);

  return {
    sx,
    sy,
    visible: sx > -TILE_RENDER && sx < VIEW_W && sy > -TILE_RENDER && sy < VIEW_H,
  };
}

export function makeBossEntity(deps) {
  const {
    tileToPx,
    TILE_RENDER,
    BOSS_POS,
    BOSS_OFF,
    centeredBottomHitbox,
    drawDarkKnight,
    startBossBattle,
  } = deps;

  return {
    type: 'boss',
    x: tileToPx(BOSS_POS.x),
    y: tileToPx(BOSS_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.58, 0.42),
    blocking: true,
    update() {},
    draw() {
      const view = isOnScreenTileSprite(this.x, this.y, deps);
      if (view.visible) {
        drawDarkKnight(view.sx + BOSS_OFF.x, view.sy + BOSS_OFF.y, 5);
      }
    },
    interact() {
      startBossBattle();
    },
  };
}

export function makeForestBossEntity(deps) {
  const {
    tileToPx,
    TILE_RENDER,
    FOREST_BOSS_POS,
    BOSS_OFF,
    centeredBottomHitbox,
    drawJurei,
    startForestBossBattle,
  } = deps;

  return {
    type: 'boss',
    x: tileToPx(FOREST_BOSS_POS.x),
    y: tileToPx(FOREST_BOSS_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.58, 0.42),
    blocking: true,
    update() {},
    draw() {
      const view = isOnScreenTileSprite(this.x, this.y, deps);
      if (view.visible) {
        drawJurei(view.sx + BOSS_OFF.x, view.sy + BOSS_OFF.y, 5);
      }
    },
    interact() {
      startForestBossBattle();
    },
  };
}

export function makeDemonGeneralEntity(deps) {
  const {
    tileToPx,
    TILE_RENDER,
    DEMON_GENERAL_POS,
    BOSS_OFF,
    centeredBottomHitbox,
    drawDemonGeneral,
    startDemonGeneralBattle,
  } = deps;

  return {
    type: 'boss',
    x: tileToPx(DEMON_GENERAL_POS.x),
    y: tileToPx(DEMON_GENERAL_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.58, 0.42),
    blocking: true,
    update() {},
    draw() {
      const view = isOnScreenTileSprite(this.x, this.y, deps);
      if (view.visible) {
        drawDemonGeneral(view.sx + BOSS_OFF.x - 30, view.sy + BOSS_OFF.y, 5);
      }
    },
    interact() {
      startDemonGeneralBattle();
    },
  };
}

export function makeDemonLordEntity(deps) {
  const {
    tileToPx,
    TILE_RENDER,
    CASTLE_BOSS_POS,
    BOSS_OFF,
    centeredBottomHitbox,
    drawDemonLord,
    startDemonLordBattle,
  } = deps;

  return {
    type: 'boss',
    x: tileToPx(CASTLE_BOSS_POS.x),
    y: tileToPx(CASTLE_BOSS_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.58, 0.42),
    blocking: true,
    update() {},
    draw() {
      const view = isOnScreenTileSprite(this.x, this.y, deps);
      if (view.visible) {
        drawDemonLord(view.sx + BOSS_OFF.x - 30, view.sy + BOSS_OFF.y, 5);
      }
    },
    interact() {
      startDemonLordBattle();
    },
  };
}

export function makeLeafaForestEntranceEntity(deps) {
  const {
    tileToPx,
    TILE_RENDER,
    VIEW_W,
    VIEW_H,
    renderCamera,
    entranceHitbox,
    drawObject,
    hero,
    executeMapTransition,
  } = deps;

  return {
    type: 'leafaForestEntrance',
    x: tileToPx(2),
    y: tileToPx(1),
    w: TILE_RENDER,
    h: TILE_RENDER,
    exitDir: 'up',
    transitionId: 'enterLeafaForest',
    hitbox: entranceHitbox(TILE_RENDER, TILE_RENDER),
    blocking: false,
    update() {},
    draw() {
      const bx = Math.round(this.x - renderCamera.col * TILE_RENDER);
      const by = Math.round(this.y - renderCamera.row * TILE_RENDER);

      if (bx <= -TILE_RENDER || bx >= VIEW_W || by <= -TILE_RENDER || by >= VIEW_H) return;

      const drawW = 256;
      const drawH = 320;
      const drawX = bx + Math.round((TILE_RENDER - drawW) / 2);
      const drawY = by + TILE_RENDER - drawH;

      drawObject('forest_entrance', drawX, drawY, drawW, drawH, this);
    },
    interact() {
      if (hero.justExited > 0) return;
      executeMapTransition('enterLeafaForest', this);
    },
  };
}

export function makeLeafaRescueEntity(deps) {
  const {
    tileToPx,
    TILE_RENDER,
    VIEW_W,
    VIEW_H,
    renderCamera,
    centeredBottomHitbox,
    LEAFA_RESCUE_POS,
    NPC_OFF,
    NPC_SC,
    drawNPC,
    flags,
    openDialogue,
  } = deps;

  const preBattleNpc = {
    npcId: 'leafa_rescue_pre',
    name: 'リーファ',
    spriteKey: 'leafa_style',
    styleKey: 'leafa_style',
    drawW: 100,
    drawH: 100,
    offsetX: +30,
    offsetY: -20,
    bodyCol: '#44aa66',
    hairCol: '#99dd55',
    lines: [
      '……来ないで！　危ない……！',
      'でも……もう、ひとりじゃ……　限界で……',
    ],
  };

  return {
    type: 'boss',
    x: tileToPx(LEAFA_RESCUE_POS.x),
    y: tileToPx(LEAFA_RESCUE_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(
      TILE_RENDER,
      TILE_RENDER,
      0.55,
      0.40,
      preBattleNpc.offsetX || 0,
      preBattleNpc.offsetY || 0
    ),
    blocking: true,
    update() {},
    draw() {
      const bx = Math.round(this.x - renderCamera.col * TILE_RENDER);
      const by = Math.round(this.y - renderCamera.row * TILE_RENDER);

      if (bx > -TILE_RENDER && bx < VIEW_W && by > -TILE_RENDER && by < VIEW_H) {
        drawNPC(
          bx + NPC_OFF.x + (preBattleNpc.offsetX || 0),
          by + NPC_OFF.y + (preBattleNpc.offsetY || 0),
          NPC_SC,
          '#44aa66',
          '#99dd55',
          'leafa_style',
          preBattleNpc.drawW,
          preBattleNpc.drawH
        );
      }
    },
    interact() {
      if (!flags.heardLeafaRumor || flags.leafaRescueDone) return;
      openDialogue(preBattleNpc);
    },
  };
}

export function addDecorEntities(deps) {
  const {
    entities,
    getCurrentMapDef,
    makeDecorEntity,
  } = deps;

  const add = (kind, x, y, size = 48, options = {}) => {
    entities.push(makeDecorEntity(kind, x, y, size, options));
  };

  for (const decor of getCurrentMapDef().decorations || []) {
    add(decor.kind, decor.x, decor.y, decor.size, decor.options || {});
  }
}

export function addHouseEntities(deps) {
  const {
    entities,
    getCurrentMapDef,
    makeHouseEntityFn,
  } = deps;

  const houseDefs = getCurrentMapDef().houses || [];

  for (const house of houseDefs) {
    entities.push(
      makeHouseEntityFn(
        house.x,
        house.y,
        house.spriteKey,
        house.width,
        house.height,
        {
          variant: house.variant,
          offsetX: house.offsetX,
          offsetY: house.offsetY,
          hitbox: house.hitbox,
        }
      )
    );
  }
}

export function addEntranceEntities(deps) {
  const {
    entities,
    getCurrentMapDef,
    makeEntranceFromDef,
  } = deps;

  for (const entrance of getCurrentMapDef().entrances || []) {
    const entity = makeEntranceFromDef(entrance);
    if (entity) entities.push(entity);
  }
}

export function makeDecorEntity(kind, x, y, size = 48, options = {}, deps) {
  const {
    tileToPx,
    TILE_RENDER,
  } = deps;

  return {
    type: 'decor',
    kind,
    x: tileToPx(x),
    y: tileToPx(y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    size,
    drawW: options.drawW || null,
    drawH: options.drawH || null,
    scale: options.scale || null,
    offsetX: options.offsetX || 0,
    offsetY: options.offsetY || 0,
    blocking: options.blocking === true,
    update() {},
    draw() {},
  };
}

export function getDecorDrawSize(kind, decor = {}, DECOR_DRAW_SIZES) {
  const fallback = DECOR_DRAW_SIZES[kind] || {
    w: decor.size || 72,
    h: decor.size || 72,
  };

  const scale = Number.isFinite(decor.scale) ? decor.scale : 1;

  return {
    w: decor.drawW || Math.round(fallback.w * scale),
    h: decor.drawH || Math.round(fallback.h * scale),
  };
}

export function getGroundedTileDrawRect(entity, drawW, drawH, deps) {
  const {
    renderCamera,
    TILE_RENDER,
  } = deps;

  const camX = renderCamera.col * TILE_RENDER;
  const camY = renderCamera.row * TILE_RENDER;
  const tileSX = Math.round(entity.x - camX);
  const tileSY = Math.round(entity.y - camY);

  return {
    tileSX,
    tileSY,
    x: tileSX + Math.round((TILE_RENDER - drawW) / 2) + (entity.offsetX || 0),
    y: tileSY + TILE_RENDER - drawH + (entity.offsetY || 0),
  };
}

export function resolveEntityDrawSize(entityDef, defaultW, defaultH = defaultW) {
  const scale = Number.isFinite(entityDef.scale) ? entityDef.scale : 1;

  return {
    w: entityDef.drawW || Math.round(defaultW * scale),
    h: entityDef.drawH || Math.round(defaultH * scale),
  };
}

export function makeEntranceEntity(type, x, y, w, h, exitDir, interact, options = {}, deps) {
  const {
    hero,
    entranceHitbox,
    executeMapTransition,
  } = deps;

  const transitionId = options.transitionId || null;

  return {
    type,
    x,
    y,
    w,
    h,
    rect: { x, y, w, h },
    exitDir,
    transitionId,
    hitbox: options.hitbox || entranceHitbox(w, h),
    blocking: false,
    update() {},
    draw() {},
    interact() {
      if (hero.justExited > 0) return;

      if (this.transitionId) {
        executeMapTransition(this.transitionId, this);
        return;
      }

      if (typeof interact === 'function') {
        interact();
      }
    },
  };
}

export function makeEntranceFromDef(def, deps) {
  const {
    tileToPx,
    findHouseDefById,
    makeHouseEntranceEntity,
    makeEntranceEntity,
  } = deps;

  if (def.type === 'houseEntrance') {
    const house = findHouseDefById(def.houseId);
    return house ? makeHouseEntranceEntity(house, def.transitionId) : null;
  }

  return makeEntranceEntity(
    def.type,
    tileToPx(def.x),
    tileToPx(def.y),
    def.w,
    def.h,
    def.exitDir,
    null,
    {
      ...(def.options || {}),
      transitionId: def.transitionId,
    }
  );
}