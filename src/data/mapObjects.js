import {
  TILE_RENDER,
} from '../core/constants.js';

import {
  TOWN_HOUSES,
  SHADOW_TOWN_HOUSES,
} from './maps.js';

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

export const HOUSE_EXIT_ENTRANCES = [
    {
      type: 'houseExit',
      x: 3,
      y: 5,
      w: TILE_RENDER * 2,
      h: TILE_RENDER,
      exitDir: 'down',
      transitionId: 'exitHouse',
      options: { hitbox: { x: 0, y: 0, w: TILE_RENDER * 2, h: TILE_RENDER } },
    },
  ];

export const MAP_OBJECTS = {
  field: {
    decorations: [
      { kind: 'flower', x: 8, y: 1, size: 36 },
      { kind: 'flower', x: 12, y: 1, size: 36 },
      { kind: 'flower', x: 9, y: 3, size: 36 },
      { kind: 'flower', x: 12, y: 3, size: 36 },
      { kind: 'flower', x: 4, y: 2, size: 38 },
      { kind: 'flower', x: 5, y: 3, size: 36 },
      { kind: 'root', x: 2, y: 3, size: 40 },
      { kind: 'flower', x: 2, y: 2, size: 30 },
      { kind: 'small_rock', x: 2, y: 4, size: 42 },
      { kind: 'small_rock', x: 4, y: 4, size: 42 },
      { kind: 'small_rock', x: 11, y: 6, size: 44 },
      { kind: 'small_rock', x: 11, y: 7, size: 42 },
      { kind: 'small_rock', x: 14, y: 9, size: 44 },
      { kind: 'root', x: 1, y: 6, size: 44 },
      { kind: 'root', x: 2, y: 7, size: 44 },
      { kind: 'root', x: 4, y: 10, size: 44 },
      { kind: 'campfire_ash', x: 4, y: 8, size: 56 },
    ],

    houses: [],

    chests: [
      { x: 5, y: 2, options: { id: 'fieldPondChest', item: 'potion', amount: 1, spriteKey: 'chest' } },
      { x: 11, y: 8, options: { id: 'fieldRockChest', item: 'gold', amount: 20, spriteKey: 'chest' } },
    ],

    signs: [
      { x: 9, y: 2, lines: ['南東の道は　くらやみの洞窟へ続く。', '草むらを外れて　道を歩けば　敵に会いにくい。'] },
      { x: 3, y: 10, lines: ['西の荒野へ。', '強敵を倒した者だけが　進める。'] },
      { x: 3, y: 1, lines: ['← 北西の森の入口', '何かが息づいているようだ…'] },
    ],

    entrances: [
      { type: 'townEntrance', x: 10, y: 2, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'down', transitionId: 'enterTown' },
      { type: 'dungeonEntrance', x: 13, y: 8, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'up', transitionId: 'enterDungeon' },
      { type: 'field2Entrance', x: 2, y: 10, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'up', transitionId: 'enterField2' },
    ],
    },
  town: {
    decorations: [
        { kind: 'flower', x:  1, y: 1, size: 34 },
        { kind: 'flower', x:  4, y: 1, size: 34 },
        { kind: 'flower', x: 10, y: 1, size: 34 },
        { kind: 'flower', x: 12, y: 2, size: 34 },
        { kind: 'barrel', x:  1, y: 3, size: 42 },
        { kind: 'crate',  x:  4, y: 3, size: 42 },
        { kind: 'barrel', x: 10, y: 3, size: 42 },
        { kind: 'crate',  x: 12, y: 4, size: 42 },
        { kind: 'flower', x:  1, y: 6, size: 34 },
        { kind: 'small_rock', x: 1, y: 5, size: 34 },
        { kind: 'small_rock', x: 12, y: 6, size: 34 },
    ],

    houses: TOWN_HOUSES,

    chests: [],

    signs: [
        { x: 7, y: 3, lines: ['道具屋はこちら', 'ポーションと防具を扱っています'] },
    ],

    entrances: [
        { type: 'townExit', x: 6, y: 9, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'down', transitionId: 'exitTown' },
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
    { type: 'forestEntrance', x: 3, y: 10, w: TILE_RENDER, h: TILE_RENDER, exitDir: 'up', transitionId: 'enterCursedForest' },
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
    { kind: 'flower', x: 2, y: 1, size: 32 },
    { kind: 'flower', x: 7, y: 1, size: 32 },
    { kind: 'flower', x: 3, y: 3, size: 30 },
    { kind: 'flower', x: 6, y: 3, size: 30 },
    { kind: 'root', x: 2, y: 4, size: 40 },
    { kind: 'root', x: 7, y: 4, size: 40 },
    { kind: 'root', x: 3, y: 5, size: 38 },
    { kind: 'root', x: 6, y: 5, size: 38 },
    { kind: 'small_rock', x: 3, y: 7, size: 36 },
    { kind: 'small_rock', x: 6, y: 7, size: 36 },
  ],

  houses: [],

  npcs: [],

  chests: [],

  signs: [
    { x: 3, y: 8, lines: ['魔物の気配がする。'] },
  ],

  entrances: [
    {
      type: 'leafaForestExit',
      x: 4,
      y: 9,
      w: TILE_RENDER * 2,
      h: TILE_RENDER,
      exitDir: 'down',
      transitionId: 'exitLeafaForest',
    },
  ],
},

house: {
  decorations: [],
  houses: [],
  chests: [],
  signs: [],
  entrances: HOUSE_EXIT_ENTRANCES,
},

};