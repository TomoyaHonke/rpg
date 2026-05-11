export function getMapDefById(mapId, MAP_DEFS) {
  return MAP_DEFS[mapId] || MAP_DEFS.field;
}

export function getMapTilesById(mapId, MAP_DEFS) {
  return getMapDefById(mapId, MAP_DEFS).tiles;
}

export function getCurrentMapDef(getCurrentMapId, getMapDefById) {
  return getMapDefById(getCurrentMapId());
}

export function resolveEncounterTable(mapDef) {
  const table = mapDef.encounterTable;

  if (typeof table === 'function') {
    return table();
  }

  return Array.isArray(table) ? table : [];
}

export function resolveValue(value, ...args) {
  return typeof value === 'function' ? value(...args) : value;
}

export function getTransitionDef(transitionId, MAP_TRANSITIONS) {
  return MAP_TRANSITIONS[transitionId] || null;
}

export function getCurrentMapId(deps) {
  const {
    runtimeState,
    townMap,
    dungeonMap,
    field2Map,
    shadowTownMap,
    cursedForestMap,
    outpostMap,
    castleMap,
    leafaForestMap,
    ruinedCityMap,
    westTownMap,
    isHouseMap,
  } = deps;

  if (runtimeState.currentMap === townMap) return 'town';
  if (runtimeState.currentMap === dungeonMap) return 'dungeon';
  if (runtimeState.currentMap === field2Map) return 'field2';
  if (runtimeState.currentMap === shadowTownMap) return 'shadowTown';
  if (runtimeState.currentMap === cursedForestMap) return 'cursedForest';
  if (runtimeState.currentMap === outpostMap) return 'outpost';
  if (runtimeState.currentMap === castleMap) return 'castle';
  if (runtimeState.currentMap === leafaForestMap) return 'leafaForest';
  if (runtimeState.currentMap === ruinedCityMap) return 'ruinedCity';
  if (runtimeState.currentMap === westTownMap) return 'westTown';

  if (isHouseMap(runtimeState.currentMap)) {
    return `house:${runtimeState.currentHouseId || 'unknown'}`;
  }

  return 'field';
}

export function resolveTransitionAttempt(transitionId, deps) {
  const {
    getTransitionDef,
    flags,
  } = deps;

  const transition = getTransitionDef(transitionId);

  if (!transition) {
    return {
      ok: false,
      transition: null,
      message: null,
    };
  }

  if (transition.requiredFlag && !flags[transition.requiredFlag]) {
    return {
      ok: false,
      transition,
      message: transition.blockedMessage || null,
    };
  }

  if (typeof transition.blockCondition === 'function') {
    const message = transition.blockCondition();

    if (message) {
      return {
        ok: false,
        transition,
        message,
      };
    }
  }

  return {
    ok: true,
    transition,
    message: null,
  };
}

export function resolveTransitionDestination(transition, entranceEntity, deps) {
  const {
    resolveValue,
    getMapTilesById,
  } = deps;

  const toMapId = resolveValue(transition.toMap, entranceEntity);
  const spawnX = resolveValue(transition.spawnX, entranceEntity);
  const spawnY = resolveValue(transition.spawnY, entranceEntity);
  const exitDir = resolveValue(transition.exitDir, entranceEntity) || 'down';

  return {
    toMapId,
    toMap: getMapTilesById(toMapId),
    spawnX,
    spawnY,
    exitDir,
  };
}

export function applyTransitionRuntimeState(transition, entranceEntity, deps) {
  const {
    runtimeState,
  } = deps;

  if (transition.storeHouseReturn && entranceEntity) {
    runtimeState.houseReturn = {
      x: entranceEntity.x,
      y: entranceEntity.y,
      w: entranceEntity.w,
      h: entranceEntity.h,
      exitDir: entranceEntity.exitDir,
    };
  }

  if (transition.houseId) {
    runtimeState.currentHouseId = transition.houseId;
  }
}

export function getTileRenderMeta(tile, map, deps) {
  const {
    T,
    TILE_META,
    TILE_CONTEXT_META,
    getTileContextKey,
  } = deps;

  const baseMeta = TILE_META[tile] || TILE_META[T.GRASS];
  const contextMeta = TILE_CONTEXT_META[getTileContextKey(map)]?.[tile] || {};

  return {
    ...baseMeta,
    ...contextMeta,
  };
}

export function calculateRenderCamera(deps) {
  const {
    currentMap,
    hero,
    TILE_RENDER,
    VIEW_COLS,
    VIEW_ROWS,
    isHouseMap,
    mapCols,
    mapRows,
  } = deps;

  const fixedHouseCamera = isHouseMap(currentMap);

  const camCol = fixedHouseCamera
    ? 0
    : Math.max(
        0,
        Math.min(
          mapCols() - VIEW_COLS,
          (hero.drawX + TILE_RENDER / 2) / TILE_RENDER - VIEW_COLS / 2
        )
      );

  const camRow = fixedHouseCamera
    ? 0
    : Math.max(
        0,
        Math.min(
          mapRows() - VIEW_ROWS,
          (hero.drawY + TILE_RENDER / 2) / TILE_RENDER - VIEW_ROWS / 2
        )
      );

  return {
    col: camCol,
    row: camRow,
  };
}
