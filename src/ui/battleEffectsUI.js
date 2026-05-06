let hitEffects = [];

export function spawnHitBurstOnEnemyUI(cx, cy, rng) {
  // 放射スパーク
  const count = rng(8, 12);
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
    const speed = 2.8 + Math.random() * 3.0;
    hitEffects.push({
      type: 'spark',
      x:    cx + rng(-8, 8),
      y:    cy + rng(-8, 8),
      vx:   Math.cos(angle) * speed,
      vy:   Math.sin(angle) * speed,
      life: 16 + rng(0, 6),
      maxLife: 22,
      size: 6 + Math.random() * 6,
    });
  }
  // 衝撃リング
  hitEffects.push({
    type: 'ring',
    x: cx, y: cy,
    r: 5,
    maxR: 32 + rng(0, 14),
    life: 12, maxLife: 12,
  });
}

export function updateHitEffectsUI() {
  for (const p of hitEffects) {
    if (p.type === 'spark') {
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.82;
      p.vy *= 0.82;
    } else {
      p.r = p.maxR * (1 - p.life / p.maxLife);
    }
    p.life--;
  }
  hitEffects = hitEffects.filter(p => p.life > 0);
}

export function drawHitEffectsUI(ctx) {
  ctx.save();
  for (const p of hitEffects) {
    const t = Math.max(0, p.life / p.maxLife);
    const alpha = t;
    if (p.type === 'spark') {
      const r = Math.max(1, p.size * t);
      ctx.globalAlpha = alpha * 0.9;
      ctx.fillStyle = `rgba(255, ${Math.round(160 + 80 * t)}, 80, 1)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.globalAlpha = alpha * 0.7;
      ctx.strokeStyle = `rgba(255, 220, 120, 1)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.stroke();
    }
  }
  ctx.restore();
}

export function clearHitEffectsUI() {
  hitEffects = [];
}

// ── 斬撃エフェクト ──────────────────────────────────
let slashEffects = [];

export function spawnSlashEffectOnEnemyUI(cx, cy, drawW, drawH, rng) {
  const angles = [-60, -38, -16].map(deg => deg * Math.PI / 180);
  for (let i = 0; i < angles.length; i++) {
    slashEffects.push({
      x:       cx + rng(-Math.round(drawW * 0.18), Math.round(drawW * 0.18)),
      y:       cy + rng(-Math.round(drawH * 0.15), Math.round(drawH * 0.15)),
      angle:   angles[i],
      len:     40 + rng(0, 24),
      width:   3 + Math.random() * 2,
      life:    16 + i * 2,
      maxLife: 16 + i * 2,
    });
  }
}

export function updateSlashEffectsUI() {
  for (const p of slashEffects) p.life--;
  slashEffects = slashEffects.filter(p => p.life > 0);
}

export function drawSlashEffectsUI(ctx) {
  ctx.save();
  ctx.lineCap = 'round';
  for (const p of slashEffects) {
    const t = Math.max(0, p.life / p.maxLife);
    const alpha = t * 0.9;
    const halfLen = p.len / 2;
    const cos = Math.cos(p.angle);
    const sin = Math.sin(p.angle);
    const x1 = p.x - cos * halfLen;
    const y1 = p.y - sin * halfLen;
    const x2 = p.x + cos * halfLen;
    const y2 = p.y + sin * halfLen;
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = `rgba(255, 255, 220, 1)`;
    ctx.lineWidth = p.width * (0.5 + t * 0.5);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    // 白コア
    ctx.strokeStyle = `rgba(255, 255, 255, 1)`;
    ctx.lineWidth = p.width * 0.4;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.restore();
}

export function clearSlashEffectsUI() {
  slashEffects = [];
}

// ── ファイアエフェクト ──────────────────────────────────
let fireEffects = [];

export function spawnFireEffectOnEnemyUI(centerX, centerY, drawW, drawH, rng) {
  const count = rng(12, 18);
  for (let i = 0; i < count; i++) {
    fireEffects.push({
      x: centerX + rng(-Math.round(drawW * 0.22), Math.round(drawW * 0.22)),
      y: centerY + rng(-Math.round(drawH * 0.18), Math.round(drawH * 0.18)),
      vx: (Math.random() - 0.5) * 2.2,
      vy: -1.5 - Math.random() * 2.2,
      life: 18 + rng(0, 12),
      maxLife: 30,
      size: 8 + Math.random() * 12,
    });
  }
}

export function updateFireEffectsUI() {
  for (const p of fireEffects) {
    p.x += p.vx + Math.sin(p.life * 0.55) * 0.25;
    p.y += p.vy;
    p.vy -= 0.03;
    p.life--;
  }
  fireEffects = fireEffects.filter(p => p.life > 0);
}

export function drawFireEffectsUI(ctx) {
  for (const p of fireEffects) {
    const t = Math.max(0, p.life / p.maxLife);
    const r = Math.max(1, p.size * t);
    const alpha = 0.65 * t;
    const red = 255;
    const green = Math.round(60 + 110 * t);
    ctx.fillStyle = `rgba(${red},${green},0,${alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function clearFireEffectsUI() {
  fireEffects = [];
}

// ── リーフ（葉）エフェクト ──────────────────────────────────
let leafEffects = [];

export function spawnLeafStormEffectOnEnemyUI(centerX, centerY, drawW, drawH, rng) {
  const count = rng(10, 16);
  const colors = ['#44cc44', '#33aa33', '#66dd55', '#22bb44', '#88ee66'];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.2 + Math.random() * 2.0;
    leafEffects.push({
      x:     centerX + rng(-Math.round(drawW * 0.3), Math.round(drawW * 0.3)),
      y:     centerY + rng(-Math.round(drawH * 0.25), Math.round(drawH * 0.25)),
      vx:    Math.cos(angle) * speed + (Math.random() - 0.5) * 1.5,
      vy:    Math.sin(angle) * speed - 1.0 - Math.random() * 1.2,
      spin:  (Math.random() - 0.5) * 0.28,
      rot:   Math.random() * Math.PI * 2,
      life:  22 + rng(0, 14),
      maxLife: 36,
      w:     5 + Math.random() * 6,
      h:     2.5 + Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
}

export function updateLeafEffectsUI() {
  for (const p of leafEffects) {
    p.x  += p.vx;
    p.y  += p.vy;
    p.vx += Math.sin(p.rot * 1.4) * 0.12;
    p.vy += 0.05;
    p.rot += p.spin;
    p.life--;
  }
  leafEffects = leafEffects.filter(p => p.life > 0);
}

export function drawLeafEffectsUI(ctx) {
  for (const p of leafEffects) {
    const t = Math.max(0, p.life / p.maxLife);
    const alpha = 0.85 * t;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(0, 0, p.w * t, p.h * t, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(20,80,20,${alpha * 0.5})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(-p.w * t, 0);
    ctx.lineTo(p.w * t, 0);
    ctx.stroke();
    ctx.restore();
  }
}

export function clearLeafEffectsUI() {
  leafEffects = [];
}
