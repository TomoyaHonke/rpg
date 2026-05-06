export function renderPrologueUI(ctx, VIEW_W, VIEW_H, prologueState, PROLOGUE_LINES) {
  ctx.save();
  ctx.scale(VIEW_W / 512, VIEW_H / 384);

  // 背景
  ctx.fillStyle = '#040210';
  ctx.fillRect(0, 0, 512, 384);

  // 星のアニメーション（薄暗め）
  const t = Date.now() / 1400;
  for (let i = 0; i < 80; i++) {
    const sx = ((Math.sin(i * 3.7 + t * 0.06) * 0.5 + 0.5) * 512) | 0;
    const sy = ((Math.cos(i * 2.3 + t * 0.05) * 0.5 + 0.5) * 300) | 0;
    const alpha = (0.08 + 0.18 * Math.abs(Math.sin(i * 1.9 + t * 0.4))).toFixed(2);
    ctx.fillStyle = `rgba(180, 170, 240, ${alpha})`;
    ctx.fillRect(sx, sy, 1, 1);
  }

  ctx.textAlign = 'center';
  ctx.font = '14px "Courier New", monospace';

  // テキスト
  if (prologueState.index >= 0 && prologueState.index < PROLOGUE_LINES.length) {
    const line = PROLOGUE_LINES[prologueState.index];
    const elapsed = Date.now() - prologueState.lineStartTime;
    const alpha = Math.min(1, elapsed / 350);
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#111';
    ctx.fillText(line, 257, 211);
    ctx.fillStyle = '#ddeeff';
    ctx.fillText(line, 256, 210);
    ctx.globalAlpha = 1;
  }

  // 操作ヒント
  ctx.font = '11px "Courier New", monospace';
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = '#667799';
  const lastVisibleIndex = PROLOGUE_LINES.length - 1 - [...PROLOGUE_LINES].reverse().findIndex(l => l !== '');
  const hint = prologueState.index >= lastVisibleIndex
    ? 'Enter / Space：ゲームへ'
    : 'Enter / Space：次へ　　　X / Esc：スキップ';
  ctx.fillText(hint, 256, 355);
  ctx.globalAlpha = 1;

  ctx.textAlign = 'left';
  ctx.restore();
}
