export function getEventEntityForBox(box, deps) {
  const {
    hero,
    heroFootTileX,
    heroFootTileY,
    syncEntities,
    entities,
    pxToTile,
    TILE_RENDER,
    isColliding,
    getCollisionBox,
  } = deps;

  const eventTypes = [
    'townEntrance',
    'townExit',
    'dungeonEntrance',
    'dungeonExit',
    'houseEntrance',
    'houseExit',
    'field2Entrance',
    'field1Return',
    'shadowTownEntrance',
    'shadowTownExit',
    'forestEntrance',
    'forestExit',
    'outpostEntrance',
    'outpostExit',
    'castleEntrance',
    'castleExit',
    'leafaForestEntrance',
    'leafaForestExit',
    'ruinsExit',
    'westTownExit',
    'objectEntrance',
  ];

  const tileBasedEventTypes = [
    'townEntrance',
    'townExit',
    'dungeonEntrance',
    'dungeonExit',
    'field2Entrance',
    'field1Return',
    'shadowTownEntrance',
    'shadowTownExit',
    'forestEntrance',
    'forestExit',
    'outpostEntrance',
    'outpostExit',
    'castleEntrance',
    'castleExit',
    'leafaForestEntrance',
    'leafaForestExit',
    'ruinsExit',
    'westTownExit',
  ];

  const directionalEntranceTypes = ['dungeonEntrance'];

  const footTileX = heroFootTileX();
  const footTileY = heroFootTileY();

  syncEntities();

  return entities.find(entity => {
    if (!eventTypes.includes(entity.type)) return false;

    if (tileBasedEventTypes.includes(entity.type)) {
      const ex = pxToTile(entity.x);
      const ey = pxToTile(entity.y);

      if (directionalEntranceTypes.includes(entity.type)) {
        return hero.dir === entity.exitDir && footTileX === ex && footTileY === ey + 1;
      }

      const ew = Math.max(1, Math.ceil(entity.w / TILE_RENDER));
      const eh = Math.max(1, Math.ceil(entity.h / TILE_RENDER));

      return footTileX >= ex && footTileX < ex + ew && footTileY >= ey && footTileY < ey + eh;
    }

    return isColliding(box, getCollisionBox(entity));
  }) || null;
}

export function getEntityKey(entity) {
  return `${entity.type}:${entity.x},${entity.y},${entity.w},${entity.h}`;
}

export function getCollidingEntity(box, type = null, deps) {
  const {
    syncEntities,
    entities,
    isColliding,
    getCollisionBox,
  } = deps;

  syncEntities();

  return entities.find(entity => {
    if (entity.type === 'hero') return false;
    if (type && entity.type !== type) return false;
    return isColliding(box, getCollisionBox(entity));
  }) || null;
}

export function getBlockingEntityForBox(box, deps) {
  const {
    syncEntities,
    entities,
    isColliding,
    getCollisionBox,
  } = deps;

  syncEntities();

  return entities.find(entity => {
    if (entity.type === 'hero' || !entity.blocking) return false;
    if (Array.isArray(entity.hitboxes)) {
      return entity.hitboxes.some(hitbox => isColliding(box, {
        x: entity.x + hitbox.x,
        y: entity.y + hitbox.y,
        w: hitbox.w,
        h: hitbox.h,
      }));
    }
    return isColliding(box, getCollisionBox(entity));
  }) || null;
}

export function setupHeroEntity(hero, deps) {
  const {
    PLAYER_HITBOX_WIDTH,
    PLAYER_HITBOX_HEIGHT,
    PLAYER_HITBOX_OFFSET_X,
    PLAYER_HITBOX_OFFSET_Y,
    updateMove,
    drawHeroEntity,
  } = deps;

  hero.type = 'hero';
  hero.hitbox = {
    x: PLAYER_HITBOX_OFFSET_X,
    y: PLAYER_HITBOX_OFFSET_Y,
    w: PLAYER_HITBOX_WIDTH,
    h: PLAYER_HITBOX_HEIGHT,
  };
  hero.update = updateMove;
  hero.draw = drawHeroEntity;
  hero.interact = function() {};
}
