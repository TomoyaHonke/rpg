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