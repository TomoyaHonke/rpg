export function renderLose(ctx, deps) {
  const {
    VIEW_W,
    VIEW_H,
    txt,
  } = deps;

  ctx.save();
  ctx.scale(VIEW_W / 512, VIEW_H / 384);

  ctx.fillStyle = '#150000';
  ctx.fillRect(0, 0, 512, 384);

  txt('GAME  OVER', 128, 182, '#ff2222', 42);
  txt('ちからつきた…', 172, 248, '#cccccc', 20);
  txt('なにかキーを押してやりなおす', 112, 314, '#888888', 15);

  ctx.restore();
}

export function renderEnding(ctx, deps) {
  const {
    VIEW_W,
    VIEW_H,
    txt,
    drawHero,
  } = deps;

  ctx.save();
  ctx.scale(VIEW_W / 512, VIEW_H / 384);

  ctx.fillStyle = '#000814';
  ctx.fillRect(0, 0, 512, 384);

  const t = Date.now() / 1400;

  for (let i = 0; i < 60; i++) {
    const sx = ((Math.sin(i * 3.7 + t * 0.2) * 0.5 + 0.5) * 512) | 0;
    const sy = ((Math.cos(i * 2.3 + t * 0.15) * 0.5 + 0.5) * 200) | 0;
    const alpha = 0.5 + 0.5 * Math.sin(i * 1.3 + t);

    ctx.fillStyle = `rgba(255, 240, 180, ${alpha.toFixed(2)})`;
    ctx.fillRect(sx, sy, 2, 2);
  }

  const grad = ctx.createLinearGradient(0, 384, 0, 200);
  grad.addColorStop(0, 'rgba(20, 40, 100, 0.55)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 200, 512, 184);

  txt('★  THE  END  ★', 108, 68, '#ffd700', 34);
  txt('魔王ヴァルドールを　倒した！', 92, 130, '#ffffff', 18);
  txt('世界を覆っていた闇が　消えていく…', 62, 162, '#aaddff', 15);
  txt('ゆうしゃは　伝説となった。', 106, 202, '#ffdd88', 16);

  drawHero(226, 286, 2.6);

  txt('おわり', 210, 336, '#ffffaa', 20);

  ctx.restore();
}