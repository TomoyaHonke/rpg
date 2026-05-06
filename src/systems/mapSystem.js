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

  if (isHouseMap(runtimeState.currentMap)) {
    return `house:${runtimeState.currentHouseId || 'unknown'}`;
  }

  return 'field';
}