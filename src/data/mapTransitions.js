import {
  TILE_RENDER,
} from '../core/constants.js';

import {
  runtimeState,
} from '../core/runtimeState.js';

import {
  ruinedCityMap,
  townMap,
  westTownMap,
} from './maps.js';

function tileToPx(n) {
  return n * TILE_RENDER;
}

function pxToTile(px) {
  return Math.floor(px / TILE_RENDER);
}

const TOWN_GATE_FIELD_X = 17;
const TOWN_GATE_FIELD_Y = 10;
const WEST_TOWN_FIELD_X = 5;
const WEST_TOWN_FIELD_Y = 27;
const RUINED_CITY_ENTRANCE_X = 23 * TILE_RENDER + Math.round((TILE_RENDER - TILE_RENDER * 8) / 2) + TILE_RENDER * 2;
const RUINED_CITY_ENTRANCE_Y = 25 * TILE_RENDER + TILE_RENDER - TILE_RENDER * 9 + TILE_RENDER * 4;
const HOUSE_INTERIOR_SPAWN_X = 16;
const HOUSE_INTERIOR_SPAWN_Y = 18;
const HOUSE_INTERIOR_SPAWN_DIR = 'up';

function getTownReturnForExitSide(side = 'down') {
  if (side === 'up') {
    return { x: tileToPx(TOWN_GATE_FIELD_X), y: tileToPx(TOWN_GATE_FIELD_Y - 1), exitDir: 'up' };
  }

  if (side === 'left') {
    return { x: tileToPx(TOWN_GATE_FIELD_X - 1), y: tileToPx(TOWN_GATE_FIELD_Y - 1), exitDir: 'left' };
  }

  if (side === 'right') {
    return { x: tileToPx(TOWN_GATE_FIELD_X), y: tileToPx(TOWN_GATE_FIELD_Y - 1), exitDir: 'right' };
  }

  return { x: tileToPx(TOWN_GATE_FIELD_X), y: tileToPx(TOWN_GATE_FIELD_Y - 1), exitDir: 'down' };
}

function getTownSpawnForEntrySide(side = 'down') {
  const townRows = townMap.length;
  const townCols = townMap[0]?.length || 0;
  const centerX = Math.floor(townCols / 2);
  const centerY = Math.floor(townRows / 2);

  if (side === 'up') {
    return { x: centerX, y: 1, exitDir: 'down' };
  }

  if (side === 'left') {
    return { x: 1, y: centerY, exitDir: 'right' };
  }

  if (side === 'right') {
    return { x: townCols - 2, y: centerY, exitDir: 'left' };
  }

  return { x: centerX - 6, y: townRows - 2, exitDir: 'up' };
}

function getOuterMapSpawnForEntrySide(map, side = 'down') {
  const rows = map.length;
  const cols = map[0]?.length || 0;
  const centerX = Math.floor(cols / 2);
  const centerY = Math.floor(rows / 2);

  if (side === 'up') return { x: centerX, y: 1, exitDir: 'down' };
  if (side === 'left') return { x: 1, y: centerY, exitDir: 'right' };
  if (side === 'right') return { x: cols - 2, y: centerY, exitDir: 'left' };
  return { x: centerX, y: rows - 2, exitDir: 'up' };
}

function getWestTownReturnForExitSide(side = 'down') {
  if (side === 'up') {
    return { x: tileToPx(WEST_TOWN_FIELD_X + 1), y: tileToPx(WEST_TOWN_FIELD_Y - 5), exitDir: 'up' };
  }

  if (side === 'right') {
    return { x: tileToPx(WEST_TOWN_FIELD_X + 3), y: tileToPx(WEST_TOWN_FIELD_Y - 3), exitDir: 'right' };
  }

  return { x: tileToPx(WEST_TOWN_FIELD_X + 1), y: tileToPx(WEST_TOWN_FIELD_Y - 2), exitDir: 'down' };
}

function getWestTownSpawnForEntrySide(side = 'down') {
  const spawn = getOuterMapSpawnForEntrySide(westTownMap, side);
  return spawn;
}

export const HOUSE_MAP_TRANSITIONS = {
  enterHouseWest: {
    fromMap: 'town',
    transitionId: 'enterHouseWest',
    toMap: 'house:west',
    spawnX: HOUSE_INTERIOR_SPAWN_X,
    spawnY: HOUSE_INTERIOR_SPAWN_Y,
    exitDir: HOUSE_INTERIOR_SPAWN_DIR,
    houseId: 'west',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseEast: {
    fromMap: 'town',
    transitionId: 'enterHouseEast',
    toMap: 'house:east',
    spawnX: HOUSE_INTERIOR_SPAWN_X,
    spawnY: HOUSE_INTERIOR_SPAWN_Y,
    exitDir: HOUSE_INTERIOR_SPAWN_DIR,
    houseId: 'east',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseNorth: {
    fromMap: 'town',
    transitionId: 'enterHouseNorth',
    toMap: 'house:north',
    spawnX: HOUSE_INTERIOR_SPAWN_X,
    spawnY: HOUSE_INTERIOR_SPAWN_Y,
    exitDir: HOUSE_INTERIOR_SPAWN_DIR,
    houseId: 'north',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseSouth: {
    fromMap: 'town',
    transitionId: 'enterHouseSouth',
    toMap: 'house:south',
    spawnX: HOUSE_INTERIOR_SPAWN_X,
    spawnY: HOUSE_INTERIOR_SPAWN_Y,
    exitDir: HOUSE_INTERIOR_SPAWN_DIR,
    houseId: 'south',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseInn: {
    fromMap: 'town',
    transitionId: 'enterHouseInn',
    toMap: 'house:inn',
    spawnX: HOUSE_INTERIOR_SPAWN_X,
    spawnY: HOUSE_INTERIOR_SPAWN_Y,
    exitDir: HOUSE_INTERIOR_SPAWN_DIR,
    houseId: 'inn',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseShop: {
    fromMap: 'town',
    transitionId: 'enterHouseShop',
    toMap: 'house:shop',
    spawnX: HOUSE_INTERIOR_SPAWN_X,
    spawnY: HOUSE_INTERIOR_SPAWN_Y,
    exitDir: HOUSE_INTERIOR_SPAWN_DIR,
    houseId: 'shop',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterShadowInn: {
    fromMap: 'shadowTown',
    transitionId: 'enterShadowInn',
    toMap: 'house:shadow_inn',
    spawnX: HOUSE_INTERIOR_SPAWN_X,
    spawnY: HOUSE_INTERIOR_SPAWN_Y,
    exitDir: HOUSE_INTERIOR_SPAWN_DIR,
    houseId: 'shadow_inn',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterShadowShop: {
    fromMap: 'shadowTown',
    transitionId: 'enterShadowShop',
    toMap: 'house:shadow_shop',
    spawnX: HOUSE_INTERIOR_SPAWN_X,
    spawnY: HOUSE_INTERIOR_SPAWN_Y,
    exitDir: HOUSE_INTERIOR_SPAWN_DIR,
    houseId: 'shadow_shop',
    storeHouseReturn: true,
    useExitCooldown: true,
  },
};

export function createBasicMapTransitions(flags) {
  return {
    enterTown: {
      fromMap: 'field',
      transitionId: 'enterTown',
      toMap: 'town',
      spawnX: entranceEntity => getTownSpawnForEntrySide(entranceEntity?.townEntrySide).x,
      spawnY: entranceEntity => getTownSpawnForEntrySide(entranceEntity?.townEntrySide).y,
      exitDir: entranceEntity => getTownSpawnForEntrySide(entranceEntity?.townEntrySide).exitDir,
      onBefore(entranceEntity) {
        runtimeState.townReturn = getTownReturnForExitSide(entranceEntity?.townEntrySide);
      },
    },

    enterWestTown: {
      fromMap: 'field',
      transitionId: 'enterWestTown',
      toMap: 'westTown',
      spawnX: entranceEntity => getWestTownSpawnForEntrySide(entranceEntity?.westTownEntrySide || entranceEntity?.entrySide).x,
      spawnY: entranceEntity => getWestTownSpawnForEntrySide(entranceEntity?.westTownEntrySide || entranceEntity?.entrySide).y,
      exitDir: entranceEntity => getWestTownSpawnForEntrySide(entranceEntity?.westTownEntrySide || entranceEntity?.entrySide).exitDir,
      useExitCooldown: true,
      onBefore(entranceEntity) {
        runtimeState.westTownReturn = getWestTownReturnForExitSide(entranceEntity?.westTownEntrySide || entranceEntity?.entrySide);
      },
    },

    enterDungeon: {
      fromMap: 'field',
      transitionId: 'enterDungeon',
      toMap: 'dungeon',
      spawnX: 7,
      spawnY: 10,
      exitDir: 'up',
      onBefore() {
        runtimeState.dungeonReturn = { x: tileToPx(52), y: tileToPx(32), exitDir: 'up' };
      },
    },

    enterField2: {
      fromMap: 'field',
      transitionId: 'enterField2',
      toMap: 'field2',
      spawnX: 13,
      spawnY: 10,
      exitDir: 'up',
      requiredFlag: 'defeatedDarkKnight',
      blockedMessage: 'この先は危険だ…　今は進めない。',
      useExitCooldown: true,
      onBefore() {
        flags.reachedField2 = true;
        runtimeState.field2Return = { x: tileToPx(8), y: tileToPx(40), exitDir: 'up' };
      },
    },

    enterRuins: {
      fromMap: 'field',
      transitionId: 'enterRuins',
      toMap: 'ruinedCity',
      spawnX: 1,
      spawnY: () => Math.floor(ruinedCityMap.length / 2),
      exitDir: 'right',
      useExitCooldown: true,
    },

    exitTown: {
      fromMap: 'town',
      transitionId: 'exitTown',
      toMap: 'field',
      spawnX: () => runtimeState.townReturn.x,
      spawnY: () => runtimeState.townReturn.y,
      exitDir: () => runtimeState.townReturn.exitDir || 'down',
      placement: 'outsideDoor',
      faceExitDirAfterPlacement: true,
      useExitCooldown: true,
      onBefore(entranceEntity) {
        runtimeState.townReturn = getTownReturnForExitSide(entranceEntity?.townExitSide);
      },
    },

    exitWestTown: {
      fromMap: 'westTown',
      transitionId: 'exitWestTown',
      toMap: 'field',
      spawnX: () => runtimeState.westTownReturn.x,
      spawnY: () => runtimeState.westTownReturn.y,
      exitDir: () => runtimeState.westTownReturn.exitDir || 'down',
      placement: 'outsideDoor',
      faceExitDirAfterPlacement: true,
      useExitCooldown: true,
      onBefore(entranceEntity) {
        runtimeState.westTownReturn = getWestTownReturnForExitSide(entranceEntity?.westTownExitSide);
      },
    },

    exitDungeon: {
      fromMap: 'dungeon',
      transitionId: 'exitDungeon',
      toMap: 'field',
      spawnX: () => pxToTile(runtimeState.dungeonReturn.x),
      spawnY: () => pxToTile(runtimeState.dungeonReturn.y) + 1,
      exitDir: 'down',
      useExitCooldown: true,
    },

    exitRuins: {
      fromMap: 'ruinedCity',
      transitionId: 'exitRuins',
      toMap: 'field',
      spawnX: RUINED_CITY_ENTRANCE_X,
      spawnY: RUINED_CITY_ENTRANCE_Y,
      exitDir: 'left',
      placement: 'outsideDoor',
      useExitCooldown: true,
      getDoorSize() {
        return {
          w: TILE_RENDER,
          h: TILE_RENDER * 2,
        };
      },
    },

    returnField1: {
      fromMap: 'field2',
      transitionId: 'returnField1',
      toMap: 'field',
      spawnX: () => runtimeState.field2Return.x,
      spawnY: () => runtimeState.field2Return.y + TILE_RENDER,
      exitDir: 'up',
      placement: 'outsideDoor',
      useExitCooldown: true,
    },

    enterShadowTown: {
      fromMap: 'field2',
      transitionId: 'enterShadowTown',
      toMap: 'shadowTown',
      spawnX: 6,
      spawnY: 7,
      exitDir: 'down',
      useExitCooldown: true,
      onBefore() {
        flags.reachedShadowTown = true;
        runtimeState.shadowTownReturn = { x: tileToPx(3), y: tileToPx(1), exitDir: 'down' };
      },
    },

    exitShadowTown: {
      fromMap: 'shadowTown',
      transitionId: 'exitShadowTown',
      toMap: 'field2',
      spawnX: () => runtimeState.shadowTownReturn.x,
      spawnY: () => runtimeState.shadowTownReturn.y,
      exitDir: 'down',
      placement: 'outsideDoor',
      useExitCooldown: true,
    },
  };
}

export function createField2MapTransitions(flags) {
  return {
    enterCursedForest: {
      fromMap: 'field2',
      transitionId: 'enterCursedForest',
      toMap: 'cursedForest',
      spawnX: 7,
      spawnY: 2,
      exitDir: 'up',
      requiredFlag: 'gotForestPass',
      blockedMessage: 'この先は呪われた森だ。通行証がないと入れない…',
      useExitCooldown: true,
      onBefore() {
        runtimeState.cursedForestReturn = {
          x: tileToPx(3),
          y: tileToPx(10),
          exitDir: 'up',
        };
      },
    },

    exitCursedForest: {
      fromMap: 'cursedForest',
      transitionId: 'exitCursedForest',
      toMap: 'field2',
      spawnX: () => runtimeState.cursedForestReturn.x,
      spawnY: () => runtimeState.cursedForestReturn.y,
      exitDir: 'up',
      placement: 'outsideDoor',
      useExitCooldown: true,
    },

    enterOutpost: {
      fromMap: 'field2',
      transitionId: 'enterOutpost',
      toMap: 'outpost',
      spawnX: 4,
      spawnY: 5,
      exitDir: 'down',
      useExitCooldown: true,
      onBefore() {
        runtimeState.outpostReturn = {
          x: tileToPx(12),
          y: tileToPx(5),
          exitDir: 'right',
        };
      },
    },

    exitOutpost: {
      fromMap: 'outpost',
      transitionId: 'exitOutpost',
      toMap: 'field2',
      spawnX: () => runtimeState.outpostReturn.x - TILE_RENDER,
      spawnY: () => runtimeState.outpostReturn.y + TILE_RENDER,
      exitDir: 'right',
      placement: 'outsideDoor',
      useExitCooldown: true,
    },

    enterCastle: {
      fromMap: 'field2',
      transitionId: 'enterCastle',
      toMap: 'castle',
      spawnX: 7,
      spawnY: 10,
      exitDir: 'up',
      requiredFlag: 'gotDemonKey',
      blockedMessage: '魔王の城への鍵がない…　入れない。',
      useExitCooldown: true,
      onBefore() {
        runtimeState.castleReturn = {
          x: tileToPx(12),
          y: tileToPx(1),
          exitDir: 'down',
        };
      },
    },

    exitCastle: {
      fromMap: 'castle',
      transitionId: 'exitCastle',
      toMap: 'field2',
      spawnX: () => pxToTile(runtimeState.castleReturn.x),
      spawnY: () => pxToTile(runtimeState.castleReturn.y) + 1,
      exitDir: 'down',
      useExitCooldown: true,
    },
  };
}

export function createLeafaForestTransitions(flags) {
  return {
    enterLeafaForest: {
      fromMap: 'field',
      transitionId: 'enterLeafaForest',
      toMap: 'leafaForest',
      spawnX: 20,
      spawnY: 40,
      exitDir: 'up',
      useExitCooldown: true,
      blockCondition() {
        if (!flags.heardLeafaRumor && !flags.leafaJoined) {
          return '森の奥は静まり返っている…今は入る必要はなさそうだ。';
        }
        return null;
      },
    },

    exitLeafaForest: {
      fromMap: 'leafaForest',
      transitionId: 'exitLeafaForest',
      toMap: 'field',
      spawnX: 24,
      spawnY: 8,
      exitDir: 'down',
      useExitCooldown: true,
    },
  };
}

export function createHouseExitTransition(getHouseEntrancePoint) {
  return {
    exitHouse: {
      fromMap: 'house',
      transitionId: 'exitHouse',
      toMap: () => (
        runtimeState.currentHouseId && runtimeState.currentHouseId.startsWith('shadow')
          ? 'shadowTown'
          : 'town'
      ),
      spawnX: () => getHouseEntrancePoint(runtimeState.currentHouseId).x,
      spawnY: () => getHouseEntrancePoint(runtimeState.currentHouseId).y,
      exitDir: () => getHouseEntrancePoint(runtimeState.currentHouseId).exitDir || 'down',
      placement: 'outsideDoor',
      useExitCooldown: true,
      getDoorSize() {
        const outsidePoint = getHouseEntrancePoint(runtimeState.currentHouseId);
        return {
          w: outsidePoint.w || Math.round(TILE_RENDER * 0.36),
          h: outsidePoint.h || Math.round(TILE_RENDER * 0.36),
        };
      },
      onAfter() {
        runtimeState.currentHouseId = null;
      },
    },
  };
}
