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

  fieldReturn: { x: tileToPx(9), y: tileToPx(2) },
  townReturn: { x: tileToPx(10), y: tileToPx(2), exitDir: 'down' },
  dungeonReturn: { x: tileToPx(13), y: tileToPx(8), exitDir: 'up' },
  field2Return: { x: tileToPx(2), y: tileToPx(10), exitDir: 'up' },
  shadowTownReturn: { x: tileToPx(3), y: tileToPx(1), exitDir: 'down' },
  cursedForestReturn: { x: tileToPx(3), y: tileToPx(10), exitDir: 'up' },
  outpostReturn: { x: tileToPx(12), y: tileToPx(5), exitDir: 'right' },
  castleReturn: { x: tileToPx(12), y: tileToPx(1), exitDir: 'down' },
  houseReturn: { x: tileToPx(6), y: tileToPx(5) },

  currentHouseId: null,
};