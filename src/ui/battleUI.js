export function drawBattleIntroOverlay(ctx, battleIntro) {
  if (!battleIntro.active) return;

  ctx.fillStyle = 'rgba(0,0,0,0.34)';
  ctx.fillRect(0, 0, 512, 256);

  if (Date.now() < battleIntro.flashUntil) {
    ctx.fillStyle = 'rgba(160,0,220,0.22)';
    ctx.fillRect(0, 0, 512, 384);
  }
}

export function drawBattleMessageWindow(ctx, txt, message) {
  ctx.fillStyle = 'rgba(5,5,20,0.92)';
  ctx.fillRect(8, 256, 496, 52);

  ctx.strokeStyle = '#5555aa';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 256, 496, 52);

  txt(message, 18, 282, '#ffffff', 14);
}

export function drawBattlePartyStatusFrame(ctx, hasActiveAlly) {
  const panelW = hasActiveAlly ? 496 : 292;

  ctx.fillStyle = 'rgba(5,5,20,0.92)';
  ctx.fillRect(8, 314, panelW, 64);

  ctx.strokeStyle = '#5555aa';
  ctx.lineWidth = 2;
  ctx.strokeRect(8, 314, panelW, 64);
}

export function drawActorPanel(ctx, txt, panelX, actor, isActive, isHero, deps) {
  const {
    drawBar,
    drawBattleHeroFace,
    getFaceSprite,
    drawNPC,
    getItemCount,
    battleTargetMode,
    getPartyMembers,
    selectedTargetIndex,
  } = deps;

  const FACE_SIZE = 64;
  const shakeFrames = actor.uiHitFrames || 0;
  const shakeX = shakeFrames > 0 ? (shakeFrames % 4 < 2 ? -4 : 4) : 0;
  const faceX = panelX + 12;
  const textX = faceX + FACE_SIZE + 8;
  const barX = textX + 22;
  const nameCol = isActive ? '#ffe066' : (isHero ? '#ffd700' : '#aaddff');
  const panelOffsetX = shakeX;

  if (isHero) {
    drawBattleHeroFace(faceX + panelOffsetX, 319);
  } else {
    const faceImg = getFaceSprite(actor);

    if (faceImg) {
      ctx.drawImage(faceImg, faceX + panelOffsetX, 314, FACE_SIZE, FACE_SIZE);
    } else {
      drawNPC(faceX + 4 + panelOffsetX, 319, 1, '#886666', '#ddddcc', actor.spriteKey, 56, 56);
    }
  }

  txt(`Lv.${actor.level}  ${isHero ? 'ゆうしゃ' : actor.name}`, textX + panelOffsetX, 330, nameCol, 13);

  txt('HP', textX + panelOffsetX, 348, '#ff6666', 12);
  drawBar(barX + panelOffsetX, 337, 142, actor.hp, actor.maxHp, '#dd3333');

  if (shakeFrames > 0) {
    const flash = Math.max(0, shakeFrames / 16);
    ctx.fillStyle = `rgba(255, 80, 80, ${0.18 + flash * 0.22})`;
    ctx.fillRect(barX + panelOffsetX, 337, 142, 10);
  }

  txt(`${actor.hp}/${actor.maxHp}`, barX + 2 + panelOffsetX, 348, '#fff', 11);

  txt('MP', textX + panelOffsetX, 368, '#6699ff', 12);
  drawBar(barX + panelOffsetX, 357, 142, actor.mp, actor.maxMp, '#3366cc');
  txt(`${actor.mp}/${actor.maxMp}`, barX + 2 + panelOffsetX, 368, '#fff', 11);

  if (isHero) {
    txt(`PT:${actor.potions || 0} ET:${getItemCount('ether')}`, barX + 72 + panelOffsetX, 368, '#ffddaa', 11);
  }

  if ((actor.uiDamageFrames || 0) > 0 && (actor.uiDamageAmount || 0) > 0) {
    const damageMax = actor.uiDamageMax || 18;
    const damageT = Math.max(0, (actor.uiDamageFrames || 0) / damageMax);
    const rise = Math.round((1 - damageT) * 14);
    const alpha = 0.35 + damageT * 0.65;
    const damageText = `-${actor.uiDamageAmount}`;

    txt(damageText, panelX + 182 + panelOffsetX, 326 - rise, `rgba(255, 96, 96, ${alpha})`, 16);
  }

  if ((actor.uiHealFrames || 0) > 0) {
    const healMax = actor.uiHealMax || 22;
    const healT = Math.max(0, (actor.uiHealFrames || 0) / healMax);
    const rise = Math.round((1 - healT) * 20);
    const alpha = 0.4 + healT * 0.6;
    const hasHp = (actor.uiHealHp || 0) > 0;
    const hasMp = (actor.uiHealMp || 0) > 0;

    if (hasHp) {
      txt(`+${actor.uiHealHp}`, panelX + 148 + panelOffsetX, 326 - rise, `rgba(80, 255, 120, ${alpha})`, 16);
    }

    if (hasMp) {
      const mpY = hasHp ? 342 - rise : 326 - rise;
      txt(`MP+${actor.uiHealMp}`, panelX + 148 + panelOffsetX, mpY, `rgba(100, 180, 255, ${alpha})`, 15);
    }
  }

  if (battleTargetMode && battleTargetMode.targetType === 'party') {
    const partyTargets = getPartyMembers({ aliveOnly: true });
    const selected = partyTargets[selectedTargetIndex];

    if (selected && selected.actor === actor) {
      ctx.save();
      const pulse = 0.55 + Math.sin(Date.now() / 120) * 0.25;
      ctx.strokeStyle = `rgba(255,230,80,${pulse})`;
      ctx.lineWidth = 3;
      ctx.strokeRect(panelX + 4, 318, 238, 58);
      ctx.restore();
    }
  }
}

export function getEnemyViewCenters(count) {
  if (count === 1) return [256];
  if (count === 2) return [168, 344];
  return [96, 256, 416].slice(0, count);
}

export function makeEnemyViews(enemies) {
  const centers = getEnemyViewCenters(enemies.length);
  const enemyBaseY = 228;

  return enemies.map((enemy, index) => {
    const drawW = enemy.drawW || (enemy.boss ? 220 : 144);
    const drawH = enemy.drawH || (enemy.boss ? 220 : 144);
    const centerX = centers[index] || 256;
    const x = Math.round(centerX - drawW / 2);
    const y = Math.round(enemyBaseY - drawH);
    const hpW = Math.min(132, Math.max(88, drawW - 18));
    const hpX = Math.round(centerX - hpW / 2);
    const hpY = Math.max(24, y - 22);

    return {
      enemy,
      x,
      y,
      drawW,
      drawH,
      drawX: centerX,
      centerX,
      baseY: enemyBaseY,
      shadowX: centerX,
      shadowY: enemyBaseY + 4,
      shadowW: Math.round(Math.min(enemy.boss ? 120 : 60, Math.max(enemy.boss ? 80 : 40, drawW * 0.55))),
      shadowH: Math.round(Math.min(enemy.boss ? 26 : 16, Math.max(enemy.boss ? 18 : 10, drawH * 0.1))),
      hpX,
      hpY,
      hpW,
      nameX: hpX,
      nameY: hpY - 8,
    };
  });
}

export function drawEnemyView(ctx, txt, view, deps) {
  const {
    drawEnemy,
    drawThinBar,
    battleTargetMode,
    battleEnemies,
    selectedTargetIndex,
  } = deps;

  const enemy = view.enemy;
  const hitFrames = enemy.hitFlashFrames || 0;
  const shakePower = hitFrames ? Math.ceil(hitFrames / 3) : 0;
  const shakeX = hitFrames ? (hitFrames % 4 < 2 ? -shakePower : shakePower) : 0;
  const deathDuration = enemy.deathDuration || 1;
  const deathRatio = enemy.isDying ? Math.max(0, (enemy.deathTimer || 0) / deathDuration) : 1;
  const deathLift = enemy.isDying ? Math.round((1 - deathRatio) * 22) : 0;
  const deathScale = enemy.isDying ? 0.82 + deathRatio * 0.18 : 1;

  ctx.save();
  ctx.globalAlpha = enemy.isDying ? 0.25 * deathRatio : 1;
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.filter = 'blur(2px)';
  ctx.beginPath();
  ctx.ellipse(view.drawX, view.shadowY, view.shadowW / 2, view.shadowH / 2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const drawW = Math.round(view.drawW * deathScale);
  const drawH = Math.round(view.drawH * deathScale);
  const drawX = Math.round(view.centerX - drawW / 2);
  const drawY = Math.round(view.baseY - drawH - deathLift);
  const drawableEnemy = { ...enemy, drawW, drawH };

  ctx.save();
  ctx.globalAlpha = enemy.isDying ? deathRatio : 1;
  drawEnemy(drawableEnemy, drawX + shakeX, drawY, drawW / 32);
  ctx.restore();

  if (hitFrames > 0 && hitFrames % 2 === 0) {
    ctx.save();
    ctx.globalAlpha = (enemy.isDying ? deathRatio : 1) * 0.7;
    ctx.filter = 'brightness(4) saturate(0)';
    drawEnemy(drawableEnemy, drawX + shakeX, drawY, drawW / 32);
    ctx.restore();
  }

  if (battleTargetMode && battleTargetMode.targetType !== 'party' && !enemy.isDying && enemy.hp > 0) {
    const selectedEnemy = battleEnemies[selectedTargetIndex];

    if (selectedEnemy === enemy) {
      const pulse = 0.55 + Math.sin(Date.now() / 120) * 0.25;
      ctx.save();
      ctx.strokeStyle = `rgba(255,230,80,${pulse})`;
      ctx.lineWidth = 4;
      ctx.filter = 'brightness(1.25)';
      ctx.strokeRect(view.x - 8, view.y - 8, view.drawW + 16, view.drawH + 16);
      ctx.restore();
    }
  }

  if (enemy.isDying) return;

  txt(enemy.name, view.nameX, view.nameY, '#aaffaa', enemy.boss ? 16 : 14);
  txt('HP', view.hpX, view.hpY + 7, '#ff6666', 10);
  drawThinBar(view.hpX + 22, view.hpY, view.hpW - 22, enemy.hp, enemy.maxHp, '#dd3333');
  txt(`${enemy.hp}/${enemy.maxHp}`, view.hpX + 24, view.hpY + 7, '#fff', 9);
}

export function drawEnemyViews(ctx, txt, enemies, deps) {
  for (const view of makeEnemyViews(enemies)) {
    drawEnemyView(ctx, txt, view, deps);
  }
}