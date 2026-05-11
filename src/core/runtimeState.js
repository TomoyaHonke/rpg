import {
  TILE_RENDER,
} from './constants.js';

import {
  townMap,
} from '../data/maps.js';

function tileToPx(n) {
  return n * TILE_RENDER;
}

export const runtimeState = {
  currentMap: townMap,

  fieldReturn: { x: tileToPx(36), y: tileToPx(8) },
  townReturn: { x: tileToPx(17), y: tileToPx(11), exitDir: 'down' },
  dungeonReturn: { x: tileToPx(52), y: tileToPx(32), exitDir: 'up' },
  field2Return: { x: tileToPx(8), y: tileToPx(40), exitDir: 'up' },
  shadowTownReturn: { x: tileToPx(3), y: tileToPx(1), exitDir: 'down' },
  cursedForestReturn: { x: tileToPx(3), y: tileToPx(10), exitDir: 'up' },
  outpostReturn: { x: tileToPx(12), y: tileToPx(5), exitDir: 'right' },
  castleReturn: { x: tileToPx(12), y: tileToPx(1), exitDir: 'down' },
  westTownReturn: { x: tileToPx(6), y: tileToPx(25), exitDir: 'down' },
  houseReturn: { x: tileToPx(6), y: tileToPx(5) },

  currentHouseId: null,
};
