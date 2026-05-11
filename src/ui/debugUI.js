export function drawDebugRect(ctx, rect, color, camX, camY) {
  ctx.save();
  ctx.fillStyle = color.fill;
  ctx.strokeStyle = color.stroke;
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.fillRect(
    Math.round(rect.x - camX),
    Math.round(rect.y - camY),
    Math.round(rect.w),
    Math.round(rect.h)
  );
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
    const isEntrance = entity.isEntrance === true
      || entity.type === 'houseEntrance'
      || entity.type === 'forgeEntrance'
      || entity.type === 'houseExit'
      || entity.type === 'exit';
    if (!isEntrance && !entity.blocking && !entity.walkbox) continue;

    if (entity.walkbox) {
      drawDebugRect(ctx, {
        x: entity.x + entity.walkbox.x,
        y: entity.y + entity.walkbox.y,
        w: entity.walkbox.w,
        h: entity.walkbox.h,
      }, { fill: 'rgba(80, 220, 140, 0.18)', stroke: 'rgba(80, 220, 140, 0.85)' }, camX, camY);

      if (!isEntrance && !entity.blocking) continue;
    }

    const color = isEntrance
      ? { fill: 'rgba(80, 160, 255, 0.22)', stroke: 'rgba(80, 160, 255, 0.85)' }
      : { fill: 'rgba(255, 80, 80, 0.18)', stroke: 'rgba(255, 80, 80, 0.85)' };

    if (Array.isArray(entity.hitboxes)) {
      for (const hitbox of entity.hitboxes) {
        drawDebugRect(ctx, {
          x: entity.x + hitbox.x,
          y: entity.y + hitbox.y,
          w: hitbox.w,
          h: hitbox.h,
        }, color, camX, camY);
      }
      continue;
    }

    drawDebugRect(ctx, entity.rect || getCollisionBox(entity), color, camX, camY);
  }

  drawDebugRect(
    ctx,
    getCollisionBox(hero),
    { fill: 'rgba(255, 240, 80, 0.24)', stroke: 'rgba(255, 240, 80, 0.9)' },
    camX,
    camY
  );
}
