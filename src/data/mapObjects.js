import {
  TILE_RENDER,
} from '../core/constants.js';

import {
  TOWN_HOUSES,
  SHADOW_TOWN_HOUSES,
  leafaForestMap,
  ruinedCityMap,
  townMap,
  westTownMap,
} from './maps.js';

import { WEST_TOWN_NPCS } from './npcs.js';

export const HOUSE_TRANSITION_IDS = {
  west: 'enterHouseWest',
  east: 'enterHouseEast',
  north: 'enterHouseNorth',
  south: 'enterHouseSouth',
  inn: 'enterHouseInn',
  shop: 'enterHouseShop',
  shadow_inn: 'enterShadowInn',
  shadow_shop: 'enterShadowShop',
};

function createTownOuterExitEntrances() {
  const rows = townMap.length;
  const cols = townMap[0]?.length || 0;
  const entrances = [];
  const makeTownExit = (x, y, townExitSide) => ({
    type: 'townExit',
    x,
    y,
    w: TILE_RENDER,
    h: TILE_RENDER,
    exitDir: townExitSide,
    transitionId: 'exitTown',
    options: { townExitSide },
  });

  for (let x = 0; x < cols; x++) {
    entrances.push(makeTownExit(x, 0, 'up'));
    entrances.push(makeTownExit(x, rows - 1, 'down'));
  }

  for (let y = 1; y < rows - 1; y++) {
    entrances.push(makeTownExit(0, y, 'left'));
    entrances.push(makeTownExit(cols - 1, y, 'right'));
  }

  return entrances;
}

function createWestTownOuterExitEntrances() {
  const rows = westTownMap.length;
  const cols = westTownMap[0]?.length || 0;
  const entrances = [];
  const makeWestTownExit = (x, y, westTownExitSide) => ({
    type: 'westTownExit',
    x,
    y,
    w: TILE_RENDER,
    h: TILE_RENDER,
    exitDir: westTownExitSide,
    transitionId: 'exitWestTown',
    options: { westTownExitSide },
  });

  for (let x = 0; x < cols; x++) {
    entrances.push(makeWestTownExit(x, 0, 'up'));
    entrances.push(makeWestTownExit(x, rows - 1, 'down'));
  }

  for (let y = 1; y < rows - 1; y++) {
    entrances.push(makeWestTownExit(cols - 1, y, 'right'));
  }

  return entrances;
}

function createLeafaForestBorderTrees() {
  const rows = leafaForestMap.length;
  const cols = leafaForestMap[0]?.length || 0;
  const trees = [];
  const seen = new Set();
  const exitGapStart = 18;
  const exitGapEnd = 21;
  const treeOptions = {
    blocking: true,
    hitbox: { x: 18, y: 64, w: 28, h: 28 },
  };
  const addTree = (x, y) => {
    if (y >= rows - 2 && x >= exitGapStart && x <= exitGapEnd) return;

    const key = `${x},${y}`;
    if (seen.has(key)) return;
    seen.add(key);

    trees.push({
      kind: 'tree',
      x,
      y,
      scale: (x + y) % 3 === 0 ? 1.05 : ((x + y) % 3 === 1 ? 0.95 : 1),
      flipX: (x + y) % 2 === 0,
      options: treeOptions,
    });
  };

  for (let x = 0; x < cols; x++) {
    addTree(x, 0);
    addTree(x, 1);
    addTree(x, rows - 2);
    addTree(x, rows - 1);
  }

  for (let y = 2; y < rows - 2; y++) {
    addTree(0, y);
    addTree(1, y);
    addTree(cols - 2, y);
    addTree(cols - 1, y);
  }

  return trees;
}

function createLeafaForestMazeTrees() {
  const treeOptions = {
    blocking: true,
    hitbox: { x: 18, y: 64, w: 28, h: 28 },
  };
  const trees = [];
  const seen = new Set();
  const protectedTiles = new Set([
    '20,4',
    '20,3',
    '22,4',
    '18,4',
    '20,40',
    '18,41',
    '19,41',
    '20,41',
    '21,41',
  ]);
  const isClearing = (x, y) => x >= 16 && x <= 24 && y >= 2 && y <= 8;
  const addTree = (x, y) => {
    if (isClearing(x, y) || protectedTiles.has(`${x},${y}`)) return;

    const key = `${x},${y}`;
    if (seen.has(key)) return;
    seen.add(key);

    trees.push({
      kind: 'tree',
      x,
      y,
      scale: (x * 2 + y) % 4 === 0 ? 1.05 : ((x + y) % 4 === 0 ? 0.95 : 1),
      flipX: (x + y) % 2 === 1,
      options: treeOptions,
    });
  };
  const addH = (y, x1, x2, gaps = []) => {
    for (let x = x1; x <= x2; x++) {
      if (gaps.some(([from, to]) => x >= from && x <= to)) continue;
      addTree(x, y);
    }
  };
  const addV = (x, y1, y2, gaps = []) => {
    for (let y = y1; y <= y2; y++) {
      if (gaps.some(([from, to]) => y >= from && y <= to)) continue;
      addTree(x, y);
    }
  };

  addH(38, 4, 35, [[19, 22], [6, 8]]);
  addV(12, 31, 38, [[35, 36]]);
  addV(28, 31, 38, [[33, 34]]);
  addH(32, 5, 34, [[11, 13], [27, 29]]);
  addH(28, 2, 27, [[7, 9], [20, 22]]);
  addV(7, 22, 31, [[27, 28]]);
  addV(32, 21, 32, [[25, 26]]);
  addH(22, 7, 36, [[17, 20], [30, 32]]);
  addV(18, 15, 23, [[18, 19]]);
  addV(25, 13, 23, [[20, 21]]);
  addH(14, 4, 31, [[12, 15], [19, 22]]);
  addH(10, 2, 16, [[10, 12]]);
  addH(10, 24, 37, [[30, 32]]);
  addV(10, 7, 14, [[11, 12]]);
  addV(30, 7, 14, [[10, 11]]);

  addH(34, 4, 11, [[7, 8]]);
  addV(34, 24, 30, [[27, 28]]);
  addH(26, 12, 18, [[15, 16]]);
  addH(18, 3, 12, [[5, 6]]);
  addH(36, 14, 22, [[18, 19]]);
  addV(14, 34, 37, [[35, 35]]);
  addV(22, 34, 37, [[35, 35]]);
  addH(24, 20, 29, [[23, 24]]);
  addV(20, 23, 27, [[25, 25]]);
  addV(29, 23, 27, [[25, 25]]);
  addH(18, 28, 35, [[31, 32]]);
  addV(28, 16, 20, [[18, 18]]);
  addV(35, 16, 20, [[18, 18]]);
  [
    [22, 38],
    [11, 37],
    [13, 37],
    [15, 37],
    [21, 37],
    [23, 37],
    [27, 37],
    [29, 37],
    [11, 33],
    [6, 31],
    [8, 31],
    [31, 31],
    [33, 31],
    [6, 29],
    [7, 28],
    [20, 28],
    [19, 27],
    [8, 23],
    [21, 23],
    [24, 23],
    [26, 23],
    [28, 23],
    [33, 23],
    [20, 22],
    [33, 21],
    [29, 19],
    [34, 19],
    [29, 17],
    [34, 17],
    [17, 15],
  ].forEach(([x, y]) => addTree(x, y));

  return trees;
}

export const HOUSE_EXIT_ENTRANCES = [
    {
      type: 'houseExit',
      x: 15,
      y: 21,
      w: TILE_RENDER * 3,
      h: TILE_RENDER,
      exitDir: 'down',
      transitionId: 'exitHouse',
      options: { hitbox: { x: 0, y: 0, w: TILE_RENDER * 3, h: TILE_RENDER } },
    },
  ];

export const MAP_OBJECTS = {
  field: {
    decorations: [
      { kind: 'flower', x: 32, y: 4, size: 36 },
      { kind: 'flower', x: 48, y: 4, size: 36 },
      { kind: 'flower', x: 36, y: 12, size: 36 },
      { kind: 'flower', x: 48, y: 12, size: 36 },
      // { kind: 'tree', x: 18, y: 8, scale: 1.0,
      //   options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},
      // },
      { kind: 'tree', x: 21, y: 20, scale: 0.9, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      { kind: 'tree', x: 21, y: 24, scale: 0.9, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},
      },
      {kind: 'tree', x: 22, y: 5, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 5, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 5, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 5, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 21, y: 5, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 6, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 6, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 6, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 6, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 6, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 7, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 7, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 9, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 7, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 7, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 8, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 9, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 8, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 8, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 10, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 11, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 12, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 13, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 14, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 15, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 16, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 19, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 20, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 20, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 21, y: 19, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 21, y: 18, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 21, y: 17, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 19, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 18, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 17, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 18, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 17, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 16, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 19, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 18, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 17, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 19, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 18, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 17, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 19, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 20, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 29, y: 20, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 21, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 29, y: 21, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 19, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 18, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 17, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 19, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 18, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 17, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 20, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 20, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 21, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 22, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 23, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 22, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 23, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 24, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 22, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 23, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 18, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 23, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 30, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 29, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 28, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 27, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 26, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 26, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},

      {kind: 'tree', x: 25, y: 25, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 27, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 25, y: 28, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 27, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 26, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 26, y: 25, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},

      {kind: 'tree', x: 27, y: 25, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 26, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 25, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 27, y: 24, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 23, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 22, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 28, y: 24, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},

      {kind: 'tree', x: 25, y: 24, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 24, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 24, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 24, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 24, y: 25, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 25, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 25, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 22, y: 26, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 26, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 21, y: 25, scale: 0.9,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 21, y: 27, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 21, y: 28, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 21, y: 29, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 19, y: 30, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 21, y: 30, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 20, y: 29, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 20, y: 30, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 18, y: 28, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 17, y: 29, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 16, y: 29, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 18, y: 29, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 19, y: 29, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 18, y: 31, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 18, y: 30, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 17, y: 30, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 16, y: 30, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 19, y: 31, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 17, y: 31, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},

      {kind: 'tree_dark', x: 22, y: 28, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 22, y: 29, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 22, y: 30, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 22, y: 27, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 21, y: 26, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 20, y: 31, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 23, y: 31, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 20, y: 29, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 23, y: 29, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 23, y: 30, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 23, y: 28, scale: 1.0, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree', x: 23, y: 27, scale: 0.95,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},
      {kind: 'tree_dark', x: 17, y: 28, scale: 1.05, flipX: true,
        options: {blocking: true, hitbox: { x: 18, y: 64, w: 28, h: 28 },},},

      { kind: 'flower', x: 17, y: 8, size: 38 },
      { kind: 'flower', x: 20, y: 12, size: 36 },
      { kind: 'flower', x: 11, y: 26, size: 30 },
      { kind: 'small_rock', x: 20, y: 16, size: 42 },
      { kind: 'small_rock', x: 16, y: 16, size: 42 },
      {
        kind: 'west_village',
        x: 5,
        y: 27,
        options: {
          drawW: TILE_RENDER * 11,
          drawH: TILE_RENDER * 9,
          blocking: false,
          entrance: {
            x: TILE_RENDER * 4.5,
            y: TILE_RENDER * 4,
            w: TILE_RENDER * 3,
            h: TILE_RENDER * 2,
            exitDir: 'down',
            transitionId: 'enterWestTown',
            allowedEntrySides: ['up', 'down', 'right'],
          },
        },
      },
      {
        kind: 'mountain',
        x: 30,
        y: 25,
        options: {
          drawW: TILE_RENDER * 27,
          drawH: TILE_RENDER * 24,
          blocking: true,
          hitbox: {
            x: TILE_RENDER * 11,
            y: TILE_RENDER * 4,
            w: TILE_RENDER * 6,
            h: TILE_RENDER * 11,
          },
        },
      },
      {
        kind: 'ruined_city',
        x: 23,
        y: 25,
        options: {
          drawW: TILE_RENDER * 8,
          drawH: TILE_RENDER * 9,
          blocking: false,
          entrance: {
            x: TILE_RENDER * 2,
            y: TILE_RENDER * 4,
            w: TILE_RENDER,
            h: TILE_RENDER * 3.5,
            exitDir: 'right',
            transitionId: 'enterRuins',
            allowedEntrySides: ['left'],
          },
        },
      },
      {
        kind: 'rocky_hill',
        x: 40,
        y: 39,
        options: {
          drawW: TILE_RENDER * 8,
          drawH: TILE_RENDER * 6,
          blocking: true,
          hitbox: {
            x: TILE_RENDER * 2.0,
            y: TILE_RENDER * 2.0,
            w: TILE_RENDER * 4.0,
            h: TILE_RENDER * 3.0,
          },
        },
      },
      { kind: 'small_rock', x: 44, y: 24, size: 44 },
      { kind: 'small_rock', x: 44, y: 28, size: 42 },
      { kind: 'small_rock', x: 56, y: 36, size: 44 },
      // { kind: 'root', x: 4, y: 24, size: 44 },
      // { kind: 'root', x: 8, y: 28, size: 44 },
      // { kind: 'root', x: 16, y: 40, size: 44 },
      { kind: 'campfire_ash', x: 16, y: 32, size: 56 },
      {
        kind: 'town_gate',
        x: 17,
        y: 10,
        options: {
          drawW: TILE_RENDER * 8,
          drawH: TILE_RENDER * 6,
          blocking: false,
          entrance: {
            x: 96,
            y: 100,
            w: 64,
            h: 44,
            exitDir: 'down',
            transitionId: 'enterTown',
          },
        },
      },
      {
        kind: 'cave_entrance',
        x: 54,
        y: 32,
        options: {
          drawW: 192,
          drawH: 160,
          blocking: true,
          hitboxes: [
            { x: 16, y: 88, w: 56, h: 64 },
            { x: 120, y: 88, w: 56, h: 64 },
            { x: 20, y: 56, w: 152, h: 48 },
          ],
          entrance: {
            x: 64,
            y: 124,
            w: 64,
            h: 36,
            exitDir: 'up',
            transitionId: 'enterDungeon',
          },
        },
      },
    ],

    houses: [],

    chests: [
      { x: 40, y: 8, options: { id: 'fieldPondChest', item: 'potion', amount: 1, spriteKey: 'chest' } },
      { x: 44, y: 32, options: { id: 'fieldRockChest', item: 'gold', amount: 20, spriteKey: 'chest' } },
    ],

    signs: [
      { x: 36, y: 8, lines: ['南東の道は　くらやみの洞窟へ続く。', '草むらを外れて　道を歩けば　敵に会いにくい。'] },
      { x: 12, y: 40, lines: ['西の荒野へ。', '強敵を倒した者だけが　進める。'] },
      { x: 23, y: 8, lines: ['→ 北西の森の入口', '何かが息づいているようだ…'] },
    ],

    entrances: [
      { type: 'field2Entrance', x: 8, y: 40, w: TILE_RENDER * 2, h: TILE_RENDER * 2, exitDir: 'up', transitionId: 'enterField2' },
    ],
    },
  town: {
    decorations: [
        { kind: 'flower', x:  4, y: 15, size: 34 },
        { kind: 'flower', x: 16, y: 15, size: 34 },
        { kind: 'flower', x: 40, y: 15, size: 34 },
        { kind: 'flower', x: 48, y: 15, size: 34 },
        { kind: 'flower', x: 10, y: 30, size: 34 },
        { kind: 'flower', x: 26, y: 15, size: 34 },
        { kind: 'flower', x: 38, y: 29, size: 34 },
        { kind: 'barrel', x:  4, y: 12, size: 42 },
        { kind: 'barrel', x: 50, y: 30, size: 42 },
        { kind: 'barrel', x: 26, y: 24, size: 42 },
        { kind: 'barrel', x: 26, y: 21, size: 42 },
        { kind: 'crate',  x: 16, y: 12, size: 42 },
        { kind: 'crate',  x: 48, y: 16, size: 42 },
        { kind: 'small_rock', x: 4, y: 20, size: 34 },
        { kind: 'small_rock', x: 19, y: 26, size: 34 },
        { kind: 'small_rock', x: 4, y: 28, size: 34 },
        { kind: 'small_rock', x: 4, y: 30, size: 34 },
        {
          kind: 'fountain',
          x: 22,
          y: 11,
          options: {
            drawW: 200,
            drawH: 200,
            blocking: true,
            hitbox: { x: 24, y: 64, w: 150, h: 100 },
          },
        },
    ],

    houses: TOWN_HOUSES,

    chests: [],

    signs: [
        { x: 20, y: 35, lines: ['ヒカリのまち'] },
    ],

    entrances: [
        ...createTownOuterExitEntrances(),
        ...TOWN_HOUSES
        .filter(house => house.houseId)
        .map(house => ({
            type: 'houseEntrance',
            houseId: house.houseId,
            transitionId: HOUSE_TRANSITION_IDS[house.houseId],
        })),
    ],
    },

dungeon: {
  decorations: [
    { kind: 'torch', x: 4, y: 1, size: 52 },
    { kind: 'torch', x: 11, y: 1, size: 52 },
    { kind: 'torch', x: 7, y: 3, size: 52 },
    { kind: 'torch', x: 11, y: 5, size: 52 },
    { kind: 'torch', x: 3, y: 7, size: 52 },
    { kind: 'torch', x: 9, y: 7, size: 52 },
    { kind: 'torch', x: 7, y: 9, size: 52 },
    { kind: 'torch', x: 9, y: 10, size: 52 },
  ],

  houses: [],

  npcs: [],

  chests: [
    { x: 2, y: 6, options: { id: 'chest1', item: 'iron_sword', spriteKey: 'chest' } },
    { x: 14, y: 8, options: { id: 'chest2', item: 'potion', amount: 3, spriteKey: 'chest' } },
  ],

  signs: [
    { x: 6, y: 10, lines: ['この先　危険！', '奥に進む者、覚悟せよ。'], flagKey: 'readCaveWarningSign' },
  ],

  entrances: [
    { type: 'dungeonExit', x: 7, y: 11, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'up', transitionId: 'exitDungeon' },
  ],
},

field2: {
  decorations: [
    { kind: 'root', x: 2, y: 2, size: 46 },
    { kind: 'root', x: 9, y: 1, size: 46 },
    { kind: 'dark_castle_object', x: 12, y: 1, options: { drawW: 224, drawH: 192, blocking: false } },
    { kind: 'root', x: 12, y: 3, size: 46 },
    { kind: 'root', x: 8, y: 5, size: 46 },
    { kind: 'root', x: 12, y: 8, size: 46 },
  ],

  houses: [],

  npcs: [],

  chests: [],

  signs: [
    { x: 3, y: 9, lines: ['↓　呪われた森への道', '通行証を持つ者のみ進める'] },
    { x: 11, y: 4, lines: ['→ 旅人の集落', '老鍛冶屋が住んでいるという…'] },
    { x: 11, y: 1, lines: ['→ 魔王の城への門', '魔王の鍵を持つ者のみ　開く…'] },
  ],

  entrances: [
    { type: 'field1Return', x: 13, y: 10, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'up', transitionId: 'returnField1' },
    { type: 'shadowTownEntrance', x: 3, y: 1, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'down', transitionId: 'enterShadowTown' },
    { type: 'forestEntrance', x: 24, y: 10, w: TILE_RENDER * 2, h: TILE_RENDER, exitDir: 'up', transitionId: 'enterCursedForest' },
    { type: 'outpostEntrance', x: 12, y: 5, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'right', transitionId: 'enterOutpost' },
    { type: 'castleEntrance', x: 12, y: 1, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'up', transitionId: 'enterCastle' },
  ],
},

shadowTown: {
  decorations: [
    { kind: 'root',   x:  4, y: 1, size: 42 },
    { kind: 'root',   x:  9, y: 1, size: 42 },
    { kind: 'barrel', x:  3, y: 4, size: 46 },
    { kind: 'crate',  x: 11, y: 4, size: 46 },
    { kind: 'root',   x:  2, y: 6, size: 38 },
    { kind: 'root',   x: 11, y: 6, size: 38 },
  ],

  houses: SHADOW_TOWN_HOUSES,

  chests: [],

  signs: [
    { x: 8, y: 5, lines: ['↑ 影の住宅と道具屋', '↓ 出口'] },
  ],

  entrances: [
    { type: 'shadowTownExit', x: 6, y: 9, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'down', transitionId: 'exitShadowTown' },
    ...SHADOW_TOWN_HOUSES
      .filter(house => house.houseId)
      .map(house => ({
        type: 'houseEntrance',
        houseId: house.houseId,
        transitionId: HOUSE_TRANSITION_IDS[house.houseId],
      })),
  ],
},

cursedForest: {
  decorations: [
    { kind: 'dead_tree_dark', x: 4, y: 2, options: { drawW: 92, drawH: 114 } },
    { kind: 'dead_tree_dark', x: 9, y: 3, options: { drawW: 84, drawH: 104 } },

    { kind: 'root', x: 4, y: 4, size: 56 },
    { kind: 'root', x: 7, y: 5, size: 52 },

    { kind: 'root', x: 5, y: 7, size: 48 },
    { kind: 'dead_tree_dark', x: 2, y: 8, options: { drawW: 80, drawH: 100 } },
    { kind: 'root', x: 7, y: 8, size: 46 },

    { kind: 'root', x: 9, y: 10, size: 48 },
    { kind: 'dead_tree_dark', x: 10, y: 11, options: { drawW: 84, drawH: 104 } },

    { kind: 'root', x: 4, y: 12, size: 50 },
    { kind: 'root', x: 9, y: 12, size: 48 },

    { kind: 'dead_tree_dark', x: 11, y: 14, options: { drawW: 88, drawH: 108 } },
    { kind: 'root', x: 8, y: 15, size: 48 },
    { kind: 'root', x: 6, y: 16, size: 46 },

    { kind: 'dead_tree_dark', x: 3, y: 18, options: { drawW: 100, drawH: 124 } },
    { kind: 'dead_tree_dark', x: 12, y: 18, options: { drawW: 92, drawH: 116 } },
    { kind: 'root', x: 5, y: 18, size: 52 },
    { kind: 'root', x: 10, y: 18, size: 50 },
  ],

  houses: [],

  npcs: [],

  chests: [
    {
      x: 3,
      y: 9,
      options: {
        id: 'forestChest1',
        spriteKey: 'chest',
        rewards: [
          { item: 'potion', amount: 2 },
          { item: 'gold', amount: 30 },
        ],
      },
    },
    { x: 10, y: 16, options: { id: 'forestChest2', item: 'potion', amount: 3, spriteKey: 'chest' } },
    { x: 2, y: 16, options: { id: 'forestChest3', item: 'forest_staff', spriteKey: 'chest' } },
    { x: 12, y: 16, options: { id: 'forestChest4', item: 'mystic_robe', spriteKey: 'chest' } },
  ],

  signs: [
    { x: 8, y: 11, lines: ['この先に　呪われし樹霊が　眠る…', 'ここより奥は　戻れぬと思え。'] },
  ],

  entrances: [
    {
      type: 'forestExit',
      x: 6,
      y: 1,
      w: TILE_RENDER * 2,
      h: TILE_RENDER,
      exitDir: 'up',
      transitionId: 'exitCursedForest',
    },
  ],
},

castle: {
  decorations: [
    { kind: 'throne', x: 7, y: 1, drawW: 128, drawH: 128 },

    { kind: 'demon_altar', x: 5, y: 2, drawW: 96, drawH: 80 },
    { kind: 'demon_altar', x: 9, y: 2, drawW: 96, drawH: 80 },

    { kind: 'dark_pillar', x: 2, y: 8, drawW: 72, drawH: 128 },
    { kind: 'dark_pillar', x: 11, y: 8, drawW: 72, drawH: 128 },

    { kind: 'dark_crystal', x: 4, y: 4, drawW: 72, drawH: 96 },
    { kind: 'dark_crystal', x: 11, y: 4, drawW: 72, drawH: 96 },
    { kind: 'dark_crystal', x: 4, y: 7, drawW: 72, drawH: 96 },
    { kind: 'dark_crystal', x: 11, y: 7, drawW: 72, drawH: 96 },

    { kind: 'torch', x: 5, y: 2, size: 52 },
    { kind: 'torch', x: 9, y: 2, size: 52 },
    { kind: 'torch', x: 3, y: 6, size: 52 },
    { kind: 'torch', x: 11, y: 6, size: 52 },
    { kind: 'torch', x: 5, y: 8, size: 52 },
    { kind: 'torch', x: 9, y: 8, size: 52 },
  ],

  houses: [],

  chests: [
    { x: 2, y: 6, options: { id: 'castleChest1', item: 'potion', amount: 3, spriteKey: 'chest' } },
    { x: 13, y: 6, options: { id: 'castleChest2', item: 'gold', amount: 80, spriteKey: 'chest' } },
    { x: 13, y: 8, options: { id: 'castleChest3', item: 'knight_armor', spriteKey: 'chest' } },
    { x: 2, y: 4, options: { id: 'castleChest4', item: 'spirit_staff', spriteKey: 'chest' } },
  ],

  signs: [
    { x: 12, y: 9, lines: ['この先　魔王ヴァルドールの間。', '勇者よ、覚悟があるなら　進め。'] },
  ],

  entrances: [
    {
      type: 'castleExit',
      x: 7,
      y: 11,
      w: TILE_RENDER,
      h: TILE_RENDER,
      exitDir: 'down',
      transitionId: 'exitCastle',
    },
  ],
},

outpost: {
  decorations: [
    { kind: 'barrel', x: 1, y: 4, size: 46 },
    { kind: 'crate', x: 7, y: 4, size: 46 },
    { kind: 'small_rock', x: 8, y: 1, size: 42 },
    { kind: 'small_rock', x: 8, y: 4, size: 42 },
    { kind: 'flower', x: 1, y: 2, size: 36 },
    { kind: 'flower', x: 6, y: 4, size: 36 },
  ],

  houses: [
    {
      x: 3,
      y: 5,
      spriteKey: 'old_forge',
      width: 256,
      height: 336,
      hitbox: { x: -48, y: -288, w: 224, h: 248 },
    },
  ],

  chests: [],

  signs: [
    {
      x: 4,
      y: 5,
      lines: [
        '旅人の集落　ミナミの鍛冶場',
        '壊れた橋の修理を夢見る老鍛冶屋が住んでいる。',
      ],
    },
  ],

  entrances: [
    {
      type: 'forgeEntrance',
      x: 3.25,
      y: 5.05,
      w: TILE_RENDER * 0.5,
      h: TILE_RENDER * 0.375,
      exitDir: 'up',
      options: {
        hitbox: {
          x: 0,
          y: 0,
          w: TILE_RENDER * 0.5,
          h: TILE_RENDER * 0.375,
        },
      },
    },
    {
      type: 'outpostExit',
      x: 4,
      y: 6,
      w: TILE_RENDER * 2,
      h: TILE_RENDER,
      exitDir: 'down',
      transitionId: 'exitOutpost',
    },
  ],
},

leafaForest: {
  decorations: [
    ...createLeafaForestBorderTrees(),
    ...createLeafaForestMazeTrees(),
    { kind: 'flower', x: 13, y: 8, size: 32 },
    { kind: 'flower', x: 26, y: 8, size: 32 },
    { kind: 'flower', x: 11, y: 31, size: 30 },
    { kind: 'flower', x: 31, y: 35, size: 30 },
    { kind: 'small_rock', x: 12, y: 36, size: 36 },
    { kind: 'small_rock', x: 29, y: 30, size: 36 },
  ],

  houses: [],

  npcs: [],

  chests: [],

  signs: [
    { x: 18, y: 39, lines: ['魔物の気配がする。'] },
  ],

  entrances: [
    {
      type: 'leafaForestExit',
      x: 18,
      y: 41,
      w: TILE_RENDER * 4,
      h: TILE_RENDER,
      exitDir: 'down',
      transitionId: 'exitLeafaForest',
    },
  ],
},

ruinedCity: {
  decorations: [],
  houses: [],
  npcs: [],
  chests: [],
  signs: [],
  entrances: [
    {
      type: 'ruinsExit',
      x: 0,
      y: 0,
      w: TILE_RENDER,
      h: ruinedCityMap.length * TILE_RENDER,
      exitDir: 'left',
      transitionId: 'exitRuins',
    },
  ],
},

westTown: {
  decorations: [
    {
      kind: 'seaside_house',
      x: 10,
      y: 8,
      options: {
        drawW: TILE_RENDER * 10,
        drawH: TILE_RENDER * 8,
        blocking: true,
        hitbox: {
          x: TILE_RENDER * 1.5,
          y: TILE_RENDER * 1.8,
          w: TILE_RENDER * 7,
          h: TILE_RENDER * 5,
        },
      },
    },
    {
      kind: 'seaside_house',
      x: 23,
      y: 23,
      options: {
        drawW: TILE_RENDER * 10,
        drawH: TILE_RENDER * 8,
        blocking: true,
        hitbox: {
          x: TILE_RENDER * 1.5,
          y: TILE_RENDER * 1.8,
          w: TILE_RENDER * 7,
          h: TILE_RENDER * 5,
        },
      },
    },
    {
      kind: 'wooden_pier',
      x: 4,
      y: 17.5,
      options: {
        drawW: TILE_RENDER * 8,
        drawH: TILE_RENDER * 8,
        blocking: false,
        walkable: true,
        walkbox: {
          x: TILE_RENDER * 0.75,
          y: TILE_RENDER * 4 ,
          w: TILE_RENDER * 5.25,
          h: TILE_RENDER * 0.8,
        },
      },
    },
    {
      kind: 'lighthouse',
      x: 16,
      y: 15,
      options: {
        drawW: TILE_RENDER * 8,
        drawH: TILE_RENDER * 10,
        blocking: true,
        ySortWithActors: true,
        hitbox: {
          x: TILE_RENDER * 3,
          y: TILE_RENDER * 8,
          w: TILE_RENDER * 2,
          h: TILE_RENDER,
        },
      },
    },
    {
      kind: 'ship_right',
      x: 2,
      y: 8,
      options: {
        drawW: TILE_RENDER * 6,
        drawH: TILE_RENDER * 5,
        blocking: true,
        hitbox: {
          x: TILE_RENDER * 0.5,
          y: TILE_RENDER * 1.5,
          w: TILE_RENDER * 4,
          h: TILE_RENDER,
        },
      },
    },
    {
      kind: 'ship_right',
      x: 2,
      y: 22,
      options: {
        drawW: TILE_RENDER * 6,
        drawH: TILE_RENDER * 5,
        blocking: true,
        hitbox: {
          x: TILE_RENDER * 0.5,
          y: TILE_RENDER * 1.5,
          w: TILE_RENDER * 4,
          h: TILE_RENDER,
        },
      },
    },
        {
      kind: 'ship_right',
      x: 2,
      y: 25,
      options: {
        drawW: TILE_RENDER * 6,
        drawH: TILE_RENDER * 5,
        blocking: true,
        hitbox: {
          x: TILE_RENDER * 0.5,
          y: TILE_RENDER * 1.5,
          w: TILE_RENDER * 4,
          h: TILE_RENDER,
        },
      },
    },
    { kind: 'crate', x: 29, y: 22, size: 42, options: { blocking: true } },
    { kind: 'crate', x: 27.3, y: 22, size: 42, options: { blocking: true } },
    { kind: 'crate', x: 29, y: 23.6, size: 42, options: { blocking: true } },
    { kind: 'crate', x: 27.3, y: 23.6, size: 42, options: { blocking: true } },
    { kind: 'barrel', x: 8.0, y: 25, size: 42, options: { blocking: true } },
    { kind: 'barrel', x: 10, y: 25, size: 42, options: { blocking: true } },
    { kind: 'crate', x: 8.6, y: 17.1, size: 42, options: { blocking: true } },
    { kind: 'crate', x: 5, y: 5, size: 42, options: { blocking: true } },
  ],
  
  houses: [
    {
      x: 25,
      y: 14,
      spriteKey: 'house_inn',
      width: 1024 * 1.85,
      height: 960 * 1.85,
      variant: 'inn',
    },
  ],
  npcs: WEST_TOWN_NPCS,
  chests: [],
  signs: [],
  entrances: createWestTownOuterExitEntrances(),
},

house: {
  decorations: [],
  houses: [],
  chests: [],
  signs: [],
  entrances: HOUSE_EXIT_ENTRANCES,
},

};
