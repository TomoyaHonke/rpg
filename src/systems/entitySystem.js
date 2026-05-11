export function makeChestEntity(x, y, options = {}, deps) {
  const {
    tileToPx,
    TILE_RENDER,
    DEFAULT_CHEST_DRAW_SIZE,
    OBJECT_SCALE,
    CHEST_HITBOX_WIDTH,
    CHEST_HITBOX_HEIGHT,
    CHEST_HITBOX_OFFSET_X,
    CHEST_HITBOX_OFFSET_Y,
    chestFlagKey,
    flags,
    grantChestRewards,
    showNotice,
    drawChestEntity,
    playSE = () => {},
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
    drawW: options.drawW || Math.round(DEFAULT_CHEST_DRAW_SIZE * (options.scale || OBJECT_SCALE)),
    drawH: options.drawH || Math.round(DEFAULT_CHEST_DRAW_SIZE * (options.scale || OBJECT_SCALE)),
    x: tileToPx(x),
    y: tileToPx(y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: resolveConfigurableHitbox(options, {
      x: CHEST_HITBOX_OFFSET_X,
      y: CHEST_HITBOX_OFFSET_Y,
      w: CHEST_HITBOX_WIDTH,
      h: CHEST_HITBOX_HEIGHT,
    }),
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
      playSE('open_chest');
      if (rewardMessages.length > 0) playSE('item_get');
      showNotice(['宝箱を開けた！', ...rewardMessages].join(' '));
    },
  };
}

export function makeSignEntity(x, y, lines, flagKey = null, options = {}, deps) {
  const {
    tileToPx,
    TILE_RENDER,
    DEFAULT_SIGN_DRAW_SIZE,
    SIGN_HITBOX_WIDTH,
    SIGN_HITBOX_HEIGHT,
    SIGN_HITBOX_OFFSET_X,
    SIGN_HITBOX_OFFSET_Y,
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
    hitbox: resolveConfigurableHitbox(options, {
      x: SIGN_HITBOX_OFFSET_X,
      y: SIGN_HITBOX_OFFSET_Y,
      w: SIGN_HITBOX_WIDTH,
      h: SIGN_HITBOX_HEIGHT,
    }),
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
  const drawW = toTileRenderSize(width, TILE_RENDER);
  const drawH = toTileRenderSize(height, TILE_RENDER);
  const offsetX = scaleLegacyPixel(options.offsetX || 0, TILE_RENDER);
  const offsetY = scaleLegacyPixel(options.offsetY || 0, TILE_RENDER);

  return {
    type: 'house',
    spriteKey,
    variant: options.variant || 'house',
    x: tileToPx(x),
    y: tileToPx(y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    drawW,
    drawH,
    offsetX,
    offsetY,
    hitbox: options.hitbox || makeHouseHitbox(drawW, drawH, offsetY),
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
    NPC_HITBOX_WIDTH,
    NPC_HITBOX_HEIGHT,
    NPC_HITBOX_OFFSET_X,
    NPC_HITBOX_OFFSET_Y,
    NPC_SC,
    VIEW_W,
    VIEW_H,
    renderCamera,
    resolveEntityDrawSize,
    drawNPC,
    getNpcRole,
    openShop,
    openDialogue,
  } = deps;

  const npcDrawSize = resolveEntityDrawSize(npc, DEFAULT_NPC_DRAW_W, DEFAULT_NPC_DRAW_H, TILE_RENDER);

  return {
    type: 'npc',
    source: npc,
    x: tileToPx(npc.x) + (npc.offsetX || 0),
    y: tileToPx(npc.y) + (npc.offsetY || 0),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: resolveConfigurableHitbox(npc, {
      x: NPC_HITBOX_OFFSET_X,
      y: NPC_HITBOX_OFFSET_Y,
      w: NPC_HITBOX_WIDTH,
      h: NPC_HITBOX_HEIGHT,
    }),
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
    BASE_SPRITE_SIZE,
    NPC_HITBOX_WIDTH,
    NPC_HITBOX_HEIGHT,
    NPC_HITBOX_OFFSET_X,
    NPC_HITBOX_OFFSET_Y,
    VIEW_W,
    VIEW_H,
    renderCamera,
    resolveEntityDrawSize,
    drawEnemy,
  } = deps;

  const enemyDrawSize = resolveEntityDrawSize(enemyNpc, TILE_RENDER, TILE_RENDER, TILE_RENDER);

  return {
    type: 'enemy_npc',
    source: enemyNpc,
    x: tileToPx(enemyNpc.x) + scaleLegacyPixel(enemyNpc.offsetX || 0, TILE_RENDER),
    y: tileToPx(enemyNpc.y) + scaleLegacyPixel(enemyNpc.offsetY || 0, TILE_RENDER),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: resolveConfigurableHitbox(enemyNpc, {
      x: NPC_HITBOX_OFFSET_X,
      y: NPC_HITBOX_OFFSET_Y,
      w: NPC_HITBOX_WIDTH,
      h: NPC_HITBOX_HEIGHT,
    }),
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

      const drawX = sx + Math.round((TILE_RENDER - drawW) / 2);
      const drawY = sy + TILE_RENDER - drawH + (enemyNpc.drawOffsetY || 0);

      drawEnemy(
        {
          spriteKey: enemyNpc.spriteKey,
          fallbackSprite: enemyNpc.fallbackSprite || enemyNpc.spriteKey,
          drawW,
          drawH,
        },
        drawX,
        drawY,
        drawW / BASE_SPRITE_SIZE
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
    BOSS_SC,
    BOSS_HITBOX_WIDTH_RATIO,
    BOSS_HITBOX_HEIGHT_RATIO,
    centeredBottomHitbox,
    drawEnemy,
    startBossBattle,
  } = deps;

  return {
    type: 'boss',
    x: tileToPx(BOSS_POS.x),
    y: tileToPx(BOSS_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, BOSS_HITBOX_WIDTH_RATIO, BOSS_HITBOX_HEIGHT_RATIO),
    blocking: true,
    update() {},
    draw() {
      const view = isOnScreenTileSprite(this.x, this.y, deps);
      if (view.visible) {
        drawEnemy({ spriteKey: 'dark_knight' }, view.sx + BOSS_OFF.x, view.sy + BOSS_OFF.y, BOSS_SC);
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
    BOSS_SC,
    BOSS_HITBOX_WIDTH_RATIO,
    BOSS_HITBOX_HEIGHT_RATIO,
    centeredBottomHitbox,
    drawEnemy,
    startForestBossBattle,
  } = deps;

  return {
    type: 'boss',
    x: tileToPx(FOREST_BOSS_POS.x),
    y: tileToPx(FOREST_BOSS_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, BOSS_HITBOX_WIDTH_RATIO, BOSS_HITBOX_HEIGHT_RATIO),
    blocking: true,
    update() {},
    draw() {
      const view = isOnScreenTileSprite(this.x, this.y, deps);
      if (view.visible) {
        drawEnemy({ spriteKey: 'jurei' }, view.sx + BOSS_OFF.x, view.sy + BOSS_OFF.y, BOSS_SC);
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
    BOSS_SC,
    BOSS_HITBOX_WIDTH_RATIO,
    BOSS_HITBOX_HEIGHT_RATIO,
    centeredBottomHitbox,
    drawEnemy,
    startDemonGeneralBattle,
  } = deps;

  return {
    type: 'boss',
    x: tileToPx(DEMON_GENERAL_POS.x),
    y: tileToPx(DEMON_GENERAL_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, BOSS_HITBOX_WIDTH_RATIO, BOSS_HITBOX_HEIGHT_RATIO),
    blocking: true,
    update() {},
    draw() {
      const view = isOnScreenTileSprite(this.x, this.y, deps);
      if (view.visible) {
        drawEnemy({ spriteKey: 'demon_general' }, view.sx + BOSS_OFF.x, view.sy + BOSS_OFF.y, BOSS_SC);
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
    BOSS_SC,
    BOSS_HITBOX_WIDTH_RATIO,
    BOSS_HITBOX_HEIGHT_RATIO,
    centeredBottomHitbox,
    drawEnemy,
    startDemonLordBattle,
  } = deps;

  return {
    type: 'boss',
    x: tileToPx(CASTLE_BOSS_POS.x),
    y: tileToPx(CASTLE_BOSS_POS.y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, BOSS_HITBOX_WIDTH_RATIO, BOSS_HITBOX_HEIGHT_RATIO),
    blocking: true,
    update() {},
    draw() {
      const view = isOnScreenTileSprite(this.x, this.y, deps);
      if (view.visible) {
        drawEnemy({ spriteKey: 'demon_lord' }, view.sx + BOSS_OFF.x, view.sy + BOSS_OFF.y, BOSS_SC);
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
    entranceHitbox,
    hero,
    executeMapTransition,
  } = deps;

  return {
    type: 'leafaForestEntrance',
    x: tileToPx(24.5),
    y: tileToPx(7),
    w: TILE_RENDER * 2,
    h: TILE_RENDER,
    exitDir: 'up',
    transitionId: 'enterLeafaForest',
    isEntrance: true,
    hitbox: entranceHitbox(TILE_RENDER, TILE_RENDER),
    blocking: false,
    update() {},
    draw() {
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
    LEAFA_RESCUE_POS,
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
    drawW: TILE_RENDER * 3,
    drawH: TILE_RENDER * 3,
    offsetX: 0,
    offsetY: -12,
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
    hitbox: {
      x: -Math.round(TILE_RENDER * 0.38),
      y: Math.round(TILE_RENDER * 0.1),
      w: Math.round(TILE_RENDER * 1.75),
      h: TILE_RENDER,
    },
    blocking: true,
    update() {},
    draw() {
      const bx = Math.round(this.x - renderCamera.col * TILE_RENDER);
      const by = Math.round(this.y - renderCamera.row * TILE_RENDER);

      if (bx > -TILE_RENDER && bx < VIEW_W && by > -TILE_RENDER && by < VIEW_H) {
        const drawX = bx + Math.round((TILE_RENDER - preBattleNpc.drawW) / 2) + (preBattleNpc.offsetX || 0);
        const drawY = by + TILE_RENDER - preBattleNpc.drawH + (preBattleNpc.offsetY || 0);

        drawNPC(
          drawX,
          drawY,
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
    makeEntranceEntity,
    DECOR_DRAW_SIZES,
  } = deps;

  const add = (kind, x, y, size = 48, options = {}) => {
    const normalizedOptions = { ...options };
    let normalizedKind = kind;

    if (normalizedKind === 'tree_large') {
      normalizedKind = 'tree';
      normalizedOptions.scale = normalizedOptions.scale || 1.2;
    } else if (normalizedKind === 'tree_small') {
      normalizedKind = 'tree';
      normalizedOptions.scale = normalizedOptions.scale || 0.85;
    }

    if (normalizedKind === 'tree' || normalizedKind === 'tree_dark') {
      const base = DECOR_DRAW_SIZES?.[normalizedKind] || DECOR_DRAW_SIZES?.tree || { w: 64, h: 96 };
      const scale = Number.isFinite(normalizedOptions.scale) ? normalizedOptions.scale : 1;
      normalizedOptions.scale = scale;
      normalizedOptions.drawW = normalizedOptions.drawW || Math.round(base.w * scale);
      normalizedOptions.drawH = normalizedOptions.drawH || Math.round(base.h * scale);
      normalizedOptions.hitboxScale = scale;
    }

    const entity = makeDecorEntity(normalizedKind, x, y, size, normalizedOptions);
    entities.push(entity);

    if (options.entrance) {
      const entrance = options.entrance;
      entities.push(
        makeEntranceEntity(
          entrance.type || 'objectEntrance',
          entity.x + entity.drawOriginOffsetX + entrance.x,
          entity.y + entity.drawOriginOffsetY + entrance.y,
          entrance.w,
          entrance.h,
          entrance.exitDir || 'up',
          null,
          {
            transitionId: entrance.transitionId,
            hitbox: { x: 0, y: 0, w: entrance.w, h: entrance.h },
            allowedEntrySides: entrance.allowedEntrySides,
          }
        )
      );
    }
  };

  for (const decor of getCurrentMapDef().decorations || []) {
    add(decor.kind, decor.x, decor.y, decor.size, {
      ...(decor.options || {}),
      scale: Number.isFinite(decor.scale) ? decor.scale : decor.options?.scale,
      flipX: decor.flipX ?? decor.options?.flipX,
    });
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

  const drawW = options.drawW || null;
  const drawH = options.drawH || null;
  const offsetX = options.offsetX || 0;
  const offsetY = options.offsetY || 0;
  const drawOriginOffsetX = drawW ? Math.round((TILE_RENDER - drawW) / 2) + offsetX : 0;
  const drawOriginOffsetY = drawH ? TILE_RENDER - drawH + offsetY : 0;
  const hitboxScale = Number.isFinite(options.hitboxScale) ? options.hitboxScale : 1;
  const toDrawRelativeHitbox = hitbox => {
    const scaledX = Math.round(hitbox.x * hitboxScale);
    const scaledY = Math.round(hitbox.y * hitboxScale);
    const scaledW = Math.round(hitbox.w * hitboxScale);
    const scaledH = Math.round(hitbox.h * hitboxScale);
    const flippedX = drawW - Math.round((hitbox.x + hitbox.w) * hitboxScale);

    return {
      x: drawOriginOffsetX + (options.flipX === true && drawW ? flippedX : scaledX),
      y: drawOriginOffsetY + scaledY,
      w: scaledW,
      h: scaledH,
    };
  };

  return {
    type: 'decor',
    kind,
    x: tileToPx(x),
    y: tileToPx(y),
    w: TILE_RENDER,
    h: TILE_RENDER,
    size,
    drawW,
    drawH,
    scale: options.scale || null,
    flipX: options.flipX === true,
    offsetX,
    offsetY,
    drawOriginOffsetX,
    drawOriginOffsetY,
    hitbox: options.hitbox ? toDrawRelativeHitbox(options.hitbox) : resolveConfigurableHitbox(options, {
      x: 0,
      y: 0,
      w: TILE_RENDER,
      h: TILE_RENDER,
    }),
    hitboxes: options.hitboxes ? options.hitboxes.map(toDrawRelativeHitbox) : null,
    blocking: options.blocking === true,
    walkable: options.walkable === true,
    walkbox: options.walkbox ? toDrawRelativeHitbox(options.walkbox) : null,
    ySortWithActors: options.ySortWithActors === true,
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

function toTileRenderSize(value, TILE_RENDER) {
  return Math.max(1, Math.round(value * TILE_RENDER / 128));
}

function scaleLegacyPixel(value, TILE_RENDER) {
  return Math.round(value * TILE_RENDER / 128);
}

function resolveConfigurableHitbox(config = {}, fallback) {
  return {
    x: Number.isFinite(config.hitboxOffsetX) ? config.hitboxOffsetX : fallback.x,
    y: Number.isFinite(config.hitboxOffsetY) ? config.hitboxOffsetY : fallback.y,
    w: Number.isFinite(config.hitboxW) ? config.hitboxW : fallback.w,
    h: Number.isFinite(config.hitboxH) ? config.hitboxH : fallback.h,
  };
}

export function resolveEntityDrawSize(entityDef, defaultW, defaultH = defaultW, TILE_RENDER = 128) {
  const scale = Number.isFinite(entityDef.scale) ? entityDef.scale : 1;
  const explicitW = Number.isFinite(entityDef.drawW)
    ? toTileRenderSize(entityDef.drawW, TILE_RENDER)
    : null;
  const explicitH = Number.isFinite(entityDef.drawH)
    ? toTileRenderSize(entityDef.drawH, TILE_RENDER)
    : null;

  return {
    w: explicitW ? Math.max(defaultW, explicitW) : Math.round(defaultW * scale),
    h: explicitH ? Math.max(defaultH, explicitH) : Math.round(defaultH * scale),
  };
}

export function makeEntranceEntity(type, x, y, w, h, exitDir, interact, options = {}, deps) {
  const {
    hero,
    entranceHitbox,
    executeMapTransition,
    getCollisionBox,
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
    townExitSide: options.townExitSide || null,
    westTownExitSide: options.westTownExitSide || null,
    allowedEntrySides: options.allowedEntrySides || null,
    isEntrance: true,
    hitbox: options.hitbox || resolveConfigurableHitbox(options, entranceHitbox(w, h)),
    blocking: false,
    update() {},
    draw() {},
    interact() {
      if (hero.justExited > 0) return;

      if (this.transitionId) {
        const shouldResolveEntrySide = (
          this.allowedEntrySides ||
          this.transitionId === 'enterTown' ||
          this.transitionId === 'enterWestTown'
        );

        if (shouldResolveEntrySide) {
          const entrySide = getEntranceContactSide(hero, this, getCollisionBox);
          this.entrySide = entrySide;
          if (this.transitionId === 'enterTown') this.townEntrySide = entrySide;
          if (this.transitionId === 'enterWestTown') this.westTownEntrySide = entrySide;
          if (this.allowedEntrySides && !this.allowedEntrySides.includes(entrySide)) return;
        }
        executeMapTransition(this.transitionId, this);
        return;
      }

      if (typeof interact === 'function') {
        interact();
      }
    },
  };
}

function getEntranceContactSide(hero, entranceEntity, getCollisionBox) {
  const heroBox = getCollisionBox(hero);
  const entranceBox = getCollisionBox(entranceEntity);
  const heroCenterX = heroBox.x + heroBox.w / 2;
  const heroCenterY = heroBox.y + heroBox.h / 2;
  const entranceCenterX = entranceBox.x + entranceBox.w / 2;
  const entranceCenterY = entranceBox.y + entranceBox.h / 2;
  const dx = heroCenterX - entranceCenterX;
  const dy = heroCenterY - entranceCenterY;

  if (Math.abs(dx) > Math.abs(dy)) {
    return dx < 0 ? 'left' : 'right';
  }

  return dy < 0 ? 'up' : 'down';
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

export function findHouseDefById(houseId, deps) {
  const {
    TOWN_HOUSES,
    SHADOW_TOWN_HOUSES,
  } = deps;

  return [...TOWN_HOUSES, ...SHADOW_TOWN_HOUSES].find(
    house => house.houseId === houseId
  ) || null;
}

export function makeHouseEntranceEntity(house, transitionId = null, deps) {
  const {
    makeHouseDoorRectFn,
    makeEntranceEntityFn,
    HOUSE_TRANSITION_IDS,
  } = deps;

  const rect = makeHouseDoorRectFn(house);
  const houseId = house.houseId;

  return makeEntranceEntityFn(
    'houseEntrance',
    rect.x,
    rect.y,
    rect.w,
    rect.h,
    rect.exitDir,
    null,
    {
      hitbox: { x: 0, y: 0, w: rect.w, h: rect.h },
      transitionId: transitionId || HOUSE_TRANSITION_IDS[houseId],
    }
  );
}

export function makeHouseDoorRect(house, deps) {
  const {
    TILE_RENDER,
    HOUSE_DOOR_HITBOX_WIDTH,
    HOUSE_DOOR_HITBOX_HEIGHT,
    tileToPx,
  } = deps;

  const w = HOUSE_DOOR_HITBOX_WIDTH;
  const h = HOUSE_DOOR_HITBOX_HEIGHT;
  const drawW = toTileRenderSize(house.drawW || house.width, TILE_RENDER);
  const drawH = toTileRenderSize(house.drawH || house.height, TILE_RENDER);

  const tileX = house.drawW ? house.x : tileToPx(house.x);
  const tileY = house.drawH ? house.y : tileToPx(house.y);
  const houseX = tileX + Math.round((TILE_RENDER - drawW) / 2);
  const houseY = tileY - drawH;
  const doorX = houseX + drawW / 2;
  const doorY = houseY + drawH;

  return {
    x: Math.round(doorX - w / 2),
    y: Math.round(doorY - h),
    w,
    h,
    exitDir: 'down',
  };
}

export function addNpcEntities(deps) {
  const {
    entities,
    getCurrentMapDef,
    makeNpcEntityFn,
  } = deps;

  for (const npc of getCurrentMapDef().npcs || []) {
    entities.push(makeNpcEntityFn(npc));
  }
}

export function addSignEntities(deps) {
  const {
    entities,
    getCurrentMapDef,
    makeSignEntityFn,
  } = deps;

  for (const sign of getCurrentMapDef().signs || []) {
    entities.push(
      makeSignEntityFn(
        sign.x,
        sign.y,
        sign.lines,
        sign.flagKey,
        sign.options || {}
      )
    );
  }
}

export function addChestEntities(deps) {
  const {
    entities,
    getCurrentMapDef,
    makeChestEntityFn,
  } = deps;

  for (const chest of getCurrentMapDef().chests || []) {
    entities.push(
      makeChestEntityFn(
        chest.x,
        chest.y,
        chest.options || {}
      )
    );
  }
}

export function addSpecialEventEntities(deps) {
  const {
    entities,
    runtimeState,
    flags,

    fieldMap,
    dungeonMap,
    cursedForestMap,
    castleMap,
    leafaForestMap,

    LEAFA_RESCUE_ENEMY_NPCS,

    isLeafaRescueAmbushActive,
    makeLeafaForestEntranceEntityFn,
    makeEnemyNpcEntityFn,
    makeLeafaRescueEntityFn,
    makeBossEntityFn,
    makeForestBossEntityFn,
    makeDemonGeneralEntityFn,
    makeDemonLordEntityFn,
  } = deps;

  if (runtimeState.currentMap === fieldMap) {
    entities.push(makeLeafaForestEntranceEntityFn());
  }

  if (runtimeState.currentMap === leafaForestMap) {
    if (isLeafaRescueAmbushActive()) {
      for (const enemyNpc of LEAFA_RESCUE_ENEMY_NPCS) {
        entities.push(makeEnemyNpcEntityFn(enemyNpc));
      }

      entities.push(makeLeafaRescueEntityFn());
    } else if (flags.heardLeafaRumor && !flags.leafaRescueDone) {
      entities.push(makeLeafaRescueEntityFn());
    }
  }

  if (runtimeState.currentMap === dungeonMap && !flags.defeatedDarkKnight) {
    entities.push(makeBossEntityFn());
  }

  if (runtimeState.currentMap === cursedForestMap && !flags.defeatedForestBoss) {
    entities.push(makeForestBossEntityFn());
  }

  if (runtimeState.currentMap === castleMap) {
    if (!flags.defeatedDemonGeneral) {
      entities.push(makeDemonGeneralEntityFn());
    }

    if (!flags.defeatedDemonLord) {
      entities.push(makeDemonLordEntityFn());
    }
  }
}

export function updateEntities(deps) {
  const {
    syncEntities,
    entities,
  } = deps;

  syncEntities();

  for (const entity of entities) {
    if (typeof entity.update === 'function') {
      entity.update();
    }
  }
}

export function drawEntities(deps) {
  const {
    syncEntities,
    entities,
    getCollisionBox,
    drawDecorEntity,
    drawSignEntity,
  } = deps;

  syncEntities();

  const sorted = entities
    .slice()
    .sort((a, b) => getCollisionBox(a).y - getCollisionBox(b).y);

  for (const entity of sorted) {
    if (entity.type === 'house' && typeof entity.draw === 'function') {
      entity.draw();
    }
  }

  for (const entity of sorted) {
    if (entity.type === 'decor' && entity.ySortWithActors !== true) {
      drawDecorEntity(entity);
    }
  }

  for (const entity of sorted) {
    if (entity.type === 'sign') {
      drawSignEntity(entity);
    }
  }

  for (const entity of sorted) {
    if (entity.type === 'chest' && typeof entity.draw === 'function') {
      entity.draw();
    }
  }

  for (const entity of sorted) {
    if ((entity.type === 'decor' && entity.ySortWithActors !== true) || entity.type === 'house' || entity.type === 'chest') {
      continue;
    }

    if (entity.type === 'sign') {
      continue;
    }

    if (entity.type === 'decor') {
      drawDecorEntity(entity);
      continue;
    }

    if (typeof entity.draw === 'function') {
      entity.draw();
    }
  }
}

export function syncEntities(deps) {
  const {
    hero,
    setupHeroEntity,
    setEntities,

    addHouseEntities,
    addDecorEntities,
    addNpcEntities,
    addSignEntities,
    addChestEntities,
    addSpecialEventEntities,
    addEntranceEntities,
  } = deps;

  setupHeroEntity(hero);
  setEntities([hero]);

  addHouseEntities();
  addDecorEntities();
  addNpcEntities();
  addSignEntities();
  addChestEntities();
  addSpecialEventEntities();
  addEntranceEntities();
}
