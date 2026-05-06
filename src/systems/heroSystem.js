export function setHeroDirection(hero, direction, HERO_WALK_ROWS) {
  if (!HERO_WALK_ROWS.includes(direction)) {
    direction = 'down';
  }

  hero.direction = direction;
  hero.dir = direction;
}

export function updateHeroWalkAnimation(hero, isMoving, deps) {
  const {
    HERO_WALK_IDLE_FRAME,
    HERO_WALK_TICK,
    HERO_WALK_SEQUENCE,
  } = deps;

  if (!isMoving) {
    hero.walkTimer = 0;
    hero.walkFrame = HERO_WALK_IDLE_FRAME;
    return;
  }

  hero.walkTimer = (hero.walkTimer || 0) + 1;

  const sequenceIndex =
    Math.floor(hero.walkTimer / HERO_WALK_TICK) % HERO_WALK_SEQUENCE.length;

  hero.walkFrame = HERO_WALK_SEQUENCE[sequenceIndex];
}

export function heroTileX(hero, pxToTile) {
  return pxToTile(hero.x);
}

export function heroTileY(hero, pxToTile) {
  return pxToTile(hero.y);
}

export function heroFootTileX(hero, pxToTile, TILE_RENDER) {
  return pxToTile(hero.x + TILE_RENDER / 2);
}

export function heroFootTileY(hero, pxToTile, TILE_RENDER) {
  return pxToTile(hero.y + TILE_RENDER - 4);
}

export function setHeroTilePosition(hero, x, y, tileToPx) {
  hero.x = tileToPx(x);
  hero.y = tileToPx(y);
}

export function setHeroStartPosition(hero, START_POS, tileToPx) {
  hero.x = tileToPx(START_POS.x);
  hero.y = tileToPx(START_POS.y);
}

export function placeHeroOutsideDoor(hero, doorEntity, exitDir = 'down', deps) {
  const {
    centeredBottomHitbox,
    getCollisionBox,
    setHeroDirection,
    snapDrawPos,
  } = deps;

  const heroHitbox = hero.hitbox || centeredBottomHitbox(hero.w, hero.h);
  const doorBox = getCollisionBox(doorEntity);
  const gap = 6;

  if (exitDir === 'up') {
    hero.x = doorBox.x + doorBox.w / 2 - heroHitbox.x - heroHitbox.w / 2;
    hero.y = doorBox.y - gap - heroHitbox.y - heroHitbox.h;
    setHeroDirection('down');
  } else if (exitDir === 'left') {
    hero.x = doorBox.x - gap - heroHitbox.x - heroHitbox.w;
    hero.y = doorBox.y + doorBox.h / 2 - heroHitbox.y - heroHitbox.h / 2;
    setHeroDirection('right');
  } else if (exitDir === 'right') {
    hero.x = doorBox.x + doorBox.w + gap - heroHitbox.x;
    hero.y = doorBox.y + doorBox.h / 2 - heroHitbox.y - heroHitbox.h / 2;
    setHeroDirection('left');
  } else {
    hero.x = doorBox.x + doorBox.w / 2 - heroHitbox.x - heroHitbox.w / 2;
    hero.y = doorBox.y + doorBox.h + gap - heroHitbox.y;
    setHeroDirection('up');
  }

  snapDrawPos();
}