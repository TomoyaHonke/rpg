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
    return isColliding(box, getCollisionBox(entity));
  }) || null;
}

export function setupHeroEntity(hero, deps) {
  const {
    centeredBottomHitbox,
    updateMove,
    drawHeroEntity,
  } = deps;

  hero.type = 'hero';
  hero.hitbox = centeredBottomHitbox(hero.w, hero.h);
  hero.update = updateMove;
  hero.draw = drawHeroEntity;
  hero.interact = function() {};
}