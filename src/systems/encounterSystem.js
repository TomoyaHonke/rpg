export function shouldStartEncounter(deps) {
  const {
    heroJustExited,
    encounterTimer,
    terrainKey,
    lastEncounterTerrainKey,
    encounterTable,
    tile,
    tileHasEncounter,
    encounterRate,
    random,
  } = deps;

  if (heroJustExited > 0) {
    return {
      shouldStart: false,
      nextLastEncounterTerrainKey: lastEncounterTerrainKey,
    };
  }

  if (encounterTimer) {
    return {
      shouldStart: false,
      nextLastEncounterTerrainKey: lastEncounterTerrainKey,
    };
  }

  if (terrainKey === lastEncounterTerrainKey) {
    return {
      shouldStart: false,
      nextLastEncounterTerrainKey: lastEncounterTerrainKey,
    };
  }

  const nextLastEncounterTerrainKey = terrainKey;

  const shouldStart =
    encounterTable.length > 0 &&
    tileHasEncounter(tile) &&
    random() < encounterRate;

  return {
    shouldStart,
    nextLastEncounterTerrainKey,
  };
}

export function createEncounterTerrainKey(mapId, tx, ty) {
  return `${mapId}:${tx},${ty}`;
}

export function tileHasEncounter(tile, deps) {
  const {
    currentMap,
    dungeonMap,
    T,
    TILE_META,
  } = deps;

  if (currentMap === dungeonMap && tile === T.STONE) {
    return true;
  }

  return !!(TILE_META[tile] && TILE_META[tile].encounter);
}