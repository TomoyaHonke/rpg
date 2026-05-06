export function drawSignEntity(sign, deps) {
  const {
    renderCamera,
    TILE_RENDER,
    DEFAULT_SIGN_DRAW_SIZE,
    VIEW_W,
    VIEW_H,
    drawSign,
  } = deps;

  const camX = renderCamera.col * TILE_RENDER;
  const camY = renderCamera.row * TILE_RENDER;
  const screenX = Math.round(sign.x - camX);
  const screenY = Math.round(sign.y - camY);
  const signSize = sign.drawW || sign.drawH || DEFAULT_SIGN_DRAW_SIZE;

  if (
    screenX < -signSize ||
    screenX > VIEW_W ||
    screenY < -signSize ||
    screenY > VIEW_H
  ) {
    return;
  }

  const drawX = screenX + Math.round((TILE_RENDER - signSize) / 2);
  const drawY = screenY + TILE_RENDER - signSize;

  drawSign(drawX, drawY, signSize);
}


export function genericTileFallback(ctx, tileContext) {
  ctx.save();

  const {
    x,
    y,
    TILE_RENDER,
    drawType,
  } = tileContext;
  const p = n => Math.max(1, Math.round(n * TILE_RENDER / 32));
  const palette = {
    water: '#1d4f88',
    cave_water: '#152942',
    tree: '#2f5e35',
    cave_wall: '#272421',
    house_wall: '#4b3020',
    castle_wall: '#242037',
    castle_wall_edge: '#242037',
    mountain: '#4e5549',
    poison_swamp: '#354827',
    dead_grass: '#66713d',
    cave_floor: '#34302b',
    house_floor: '#735231',
    castle_floor: '#332640',
    throne_floor: '#4c2438',
  };
  const baseCol = palette[drawType] || '#6f7f54';

  ctx.fillStyle = baseCol;
  ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.22)';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 0.5, y + 0.5, TILE_RENDER - 1, TILE_RENDER - 1);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.fillRect(x + p(5), y + p(7), p(6), p(1));
  ctx.fillRect(x + p(19), y + p(21), p(5), p(1));
  ctx.fillStyle = 'rgba(0, 0, 0, 0.14)';
  ctx.fillRect(x + p(9), y + p(24), p(4), p(1));
  ctx.fillRect(x + p(23), y + p(10), p(3), p(1));

  ctx.restore();
}

export function drawTileFallback(fallbackDrawer, tileContext) {
  fallbackDrawer(tileContext);
}

export function drawVisibleTiles(deps) {
  const {
    camCol,
    camRow,
    VIEW_COLS,
    VIEW_ROWS,
    mapCols,
    mapRows,
    drawTile,
  } = deps;

  const c0 = Math.floor(camCol);
  const r0 = Math.floor(camRow);

  for (let r = r0; r < Math.min(r0 + VIEW_ROWS + 1, mapRows()); r++) {
    for (let c = c0; c < Math.min(c0 + VIEW_COLS + 1, mapCols()); c++) {
      drawTile(c, r, camCol, camRow);
    }
  }
}

export function drawMapOverlay(ctx, deps) {
  const {
    currentMap,
    dungeonMap,
    field2Map,
    shadowTownMap,
    VIEW_W,
    VIEW_H,
  } = deps;

  if (currentMap === dungeonMap) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  } else if (currentMap === field2Map) {
    ctx.fillStyle = 'rgba(20, 10, 40, 0.30)';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  } else if (currentMap === shadowTownMap) {
    ctx.fillStyle = 'rgba(10, 5, 30, 0.40)';
    ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  }
}

export function renderMap(deps) {
  const {
    calculateRenderCamera,
    setRenderCamera,
    drawVisibleTiles,
    drawMapOverlay,
    drawEntities,
    drawDebugHitboxes,
    TILE_RENDER,
  } = deps;

  const renderCamera = calculateRenderCamera();
  setRenderCamera(renderCamera);

  const camCol = renderCamera.col;
  const camRow = renderCamera.row;

  drawVisibleTiles(camCol, camRow);
  drawMapOverlay();

  drawEntities();
  drawDebugHitboxes(camCol * TILE_RENDER, camRow * TILE_RENDER);
}
