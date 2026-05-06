export function drawDebugRect(ctx, rect, color, camX, camY) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.setLineDash([]);
  ctx.strokeRect(
    Math.round(rect.x - camX),
    Math.round(rect.y - camY),
    Math.round(rect.w),
    Math.round(rect.h)
  );
  ctx.restore();
}

export function drawDebugHitboxes(ctx, deps) {
  const {
    DEBUG_HITBOX,
    entities,
    hero,
    getCollisionBox,
    camX,
    camY,
  } = deps;

  if (DEBUG_HITBOX !== true) return;

  for (const entity of entities) {
    if (entity.type === 'house') {
      drawDebugRect(ctx, getCollisionBox(entity), 'red', camX, camY);
    } else if (entity.type === 'houseEntrance' || entity.type === 'forgeEntrance') {
      drawDebugRect(ctx, entity.rect || getCollisionBox(entity), 'blue', camX, camY);
    } else if (entity.type === 'houseExit' || entity.type === 'exit') {
      drawDebugRect(ctx, entity.rect || getCollisionBox(entity), 'green', camX, camY);
    }
  }

  drawDebugRect(ctx, getCollisionBox(hero), 'yellow', camX, camY);
}