export function tileToPx(n, tileRender) {
  return n * tileRender;
}

export function pxToTile(n, tileRender) {
  return Math.floor(n / tileRender);
}

export function normalizeSavedPoint(point, fallback, deps) {
  const {
    COLS,
    ROWS,
    tileToPx,
  } = deps;

  const src = point || fallback;
  const x = Number.isFinite(src.x) ? src.x : fallback.x;
  const y = Number.isFinite(src.y) ? src.y : fallback.y;
  const exitDir = src.exitDir || fallback.exitDir;

  if (
    x >= 0 &&
    x < COLS &&
    y >= 0 &&
    y < ROWS &&
    Number.isInteger(x) &&
    Number.isInteger(y)
  ) {
    return {
      x: tileToPx(x),
      y: tileToPx(y),
      exitDir,
    };
  }

  return {
    x,
    y,
    exitDir,
  };
}

export function mapCols(map, fallbackCols) {
  return map[0] ? map[0].length : fallbackCols;
}

export function mapRows(map, fallbackRows) {
  return map.length || fallbackRows;
}