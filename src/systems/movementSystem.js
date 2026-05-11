export function tileAt(map, x, y) {
  return map[y] && map[y][x];
}

export function isBlockedTile(x, y, deps) {
  const {
    currentMap,
    mapCols,
    mapRows,
    TILE_META,
    TILE_RENDER,
    syncEntities,
    entities,
  } = deps;

  if (x < 0 || x >= mapCols() || y < 0 || y >= mapRows()) {
    return true;
  }

  const tile = tileAt(currentMap, x, y);

  if (
    TILE_META[tile]
    && !TILE_META[tile].passable
    && hasWalkableObjectAtTile(x, y, { TILE_RENDER, syncEntities, entities })
  ) {
    return false;
  }

  return TILE_META[tile] ? !TILE_META[tile].passable : false;
}

function hasWalkableObjectAtTile(x, y, deps) {
  const {
    TILE_RENDER,
    syncEntities,
    entities,
  } = deps;

  if (!TILE_RENDER || typeof syncEntities !== 'function' || !Array.isArray(entities)) return false;

  syncEntities();

  const tileRect = {
    x: x * TILE_RENDER,
    y: y * TILE_RENDER,
    w: TILE_RENDER,
    h: TILE_RENDER,
  };

  return entities.some(entity => {
    if (entity.type !== 'decor' || !entity.walkable) return false;

    const hitbox = entity.walkbox || entity.hitbox || {
      x: 0,
      y: 0,
      w: entity.w,
      h: entity.h,
    };
    const walkRect = {
      x: entity.x + hitbox.x,
      y: entity.y + hitbox.y,
      w: hitbox.w,
      h: hitbox.h,
    };

    return tileRect.x < walkRect.x + walkRect.w
      && tileRect.x + tileRect.w > walkRect.x
      && tileRect.y < walkRect.y + walkRect.h
      && tileRect.y + tileRect.h > walkRect.y;
  });
}

export function canPlaceHeroAt(px, py, deps) {
  const {
    hero,
    getCollisionBox,
    pxToTile,
    isBlockedTile,
    getBlockingEntityForBox,
  } = deps;

  const heroBox = getCollisionBox(hero, px, py);

  const left = heroBox.x;
  const top = heroBox.y;
  const right = left + heroBox.w - 1;
  const bottom = top + heroBox.h - 1;

  const corners = [
    [pxToTile(left), pxToTile(top)],
    [pxToTile(right), pxToTile(top)],
    [pxToTile(left), pxToTile(bottom)],
    [pxToTile(right), pxToTile(bottom)],
  ];

  for (const [tx, ty] of corners) {
    if (isBlockedTile(tx, ty)) return false;
  }

  if (getBlockingEntityForBox(heroBox)) return false;

  return true;
}

export function updateHeroVelocityFromKeys(deps) {
  const {
    hero,
    keys,
    currentState,
    mapState,
    moveSpeed,
    setHeroDirection,
  } = deps;

  hero.vx = 0;
  hero.vy = 0;

  if (currentState !== mapState) return;

  if (keys.left) hero.vx -= moveSpeed;
  if (keys.right) hero.vx += moveSpeed;
  if (keys.up) hero.vy -= moveSpeed;
  if (keys.down) hero.vy += moveSpeed;

  if (hero.vx && hero.vy) {
    const d = Math.SQRT1_2;
    hero.vx *= d;
    hero.vy *= d;
  }

  if (Math.abs(hero.vx) > Math.abs(hero.vy)) {
    setHeroDirection(hero.vx < 0 ? 'left' : 'right');
  } else if (hero.vy) {
    setHeroDirection(hero.vy < 0 ? 'up' : 'down');
  }
}

export function applyHeroVelocity(hero, canPlaceHeroAt) {
  const prevX = hero.x;
  const prevY = hero.y;

  if (hero.vx && canPlaceHeroAt(hero.x + hero.vx, hero.y)) {
    hero.x += hero.vx;
  }

  if (hero.vy && canPlaceHeroAt(hero.x, hero.y + hero.vy)) {
    hero.y += hero.vy;
  }

  return {
    moved: hero.x !== prevX || hero.y !== prevY,
    prevX,
    prevY,
  };
}

export function tickHeroJustExited(hero) {
  if (hero.justExited > 0) {
    hero.justExited--;
  }
}

export function syncHeroDrawPosition(hero) {
  hero.drawX = hero.x;
  hero.drawY = hero.y;
}
