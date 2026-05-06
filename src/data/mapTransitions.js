import {
  TILE_RENDER,
} from '../core/constants.js';

import {
  runtimeState,
} from '../core/runtimeState.js';

function tileToPx(n) {
  return n * TILE_RENDER;
}

function pxToTile(px) {
  return Math.floor(px / TILE_RENDER);
}

export const HOUSE_MAP_TRANSITIONS = {
  enterHouseWest: {
    fromMap: 'town',
    transitionId: 'enterHouseWest',
    toMap: 'house:west',
    spawnX: 3,
    spawnY: 4,
    exitDir: 'down',
    houseId: 'west',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseEast: {
    fromMap: 'town',
    transitionId: 'enterHouseEast',
    toMap: 'house:east',
    spawnX: 3,
    spawnY: 4,
    exitDir: 'down',
    houseId: 'east',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseNorth: {
    fromMap: 'town',
    transitionId: 'enterHouseNorth',
    toMap: 'house:north',
    spawnX: 3,
    spawnY: 4,
    exitDir: 'down',
    houseId: 'north',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseSouth: {
    fromMap: 'town',
    transitionId: 'enterHouseSouth',
    toMap: 'house:south',
    spawnX: 3,
    spawnY: 4,
    exitDir: 'down',
    houseId: 'south',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseInn: {
    fromMap: 'town',
    transitionId: 'enterHouseInn',
    toMap: 'house:inn',
    spawnX: 3,
    spawnY: 4,
    exitDir: 'down',
    houseId: 'inn',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterHouseShop: {
    fromMap: 'town',
    transitionId: 'enterHouseShop',
    toMap: 'house:shop',
    spawnX: 3,
    spawnY: 4,
    exitDir: 'down',
    houseId: 'shop',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterShadowInn: {
    fromMap: 'shadowTown',
    transitionId: 'enterShadowInn',
    toMap: 'house:shadow_inn',
    spawnX: 3,
    spawnY: 4,
    exitDir: 'down',
    houseId: 'shadow_inn',
    storeHouseReturn: true,
    useExitCooldown: true,
  },

  enterShadowShop: {
    fromMap: 'shadowTown',
    transitionId: 'enterShadowShop',
    toMap: 'house:shadow_shop',
    spawnX: 3,
    spawnY: 4,
    exitDir: 'down',
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
      spawnX: 6,
      spawnY: 7,
      exitDir: 'down',
      onBefore() {
        runtimeState.townReturn = { x: tileToPx(10), y: tileToPx(2), exitDir: 'down' };
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
        runtimeState.dungeonReturn = { x: tileToPx(13), y: tileToPx(8), exitDir: 'up' };
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
        runtimeState.field2Return = { x: tileToPx(2), y: tileToPx(10), exitDir: 'up' };
      },
    },

    exitTown: {
      fromMap: 'town',
      transitionId: 'exitTown',
      toMap: 'field',
      spawnX: () => runtimeState.townReturn.x,
      spawnY: () => runtimeState.townReturn.y,
      exitDir: () => runtimeState.townReturn.exitDir || 'down',
      placement: 'outsideDoor',
      useExitCooldown: true,
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
      spawnX: 4,
      spawnY: 8,
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
      spawnX: 2,
      spawnY: 1,
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