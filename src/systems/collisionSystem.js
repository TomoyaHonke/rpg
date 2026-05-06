export function isColliding(a, b) {
  return a.x < b.x + b.w
    && a.x + a.w > b.x
    && a.y < b.y + b.h
    && a.y + a.h > b.y;
}

export function centeredBottomHitbox(w, h, wRatio, hRatio) {
  const hitW = Math.round(w * wRatio);
  const hitH = Math.round(h * hRatio);

  return {
    x: Math.round((w - hitW) / 2),
    y: h - hitH,
    w: hitW,
    h: hitH,
  };
}

export function entranceHitbox(w, h, ENTRANCE_HITBOX) {
  const hitW = Math.round(w * ENTRANCE_HITBOX.wRatio);
  const hitH = Math.round(h * ENTRANCE_HITBOX.hRatio);

  return {
    x: Math.round((w - hitW) / 2),
    y: h - hitH,
    w: hitW,
    h: hitH,
  };
}

export function getCollisionBox(entity, x = entity.x, y = entity.y) {
  const hitbox = entity.hitbox || {
    x: 0,
    y: 0,
    w: entity.w,
    h: entity.h,
  };

  return {
    x: x + hitbox.x,
    y: y + hitbox.y,
    w: hitbox.w,
    h: hitbox.h,
  };
}