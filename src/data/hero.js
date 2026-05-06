import {
  TILE_RENDER,
  HERO_WALK_IDLE_FRAME,
} from '../core/constants.js';

function tileToPx(n) {
  return n * TILE_RENDER;
}

export const hero = {
  x: tileToPx(6),
  y: tileToPx(7),
  w: TILE_RENDER,
  h: TILE_RENDER,
  drawX: tileToPx(6),
  drawY: tileToPx(7),
  vx: 0,
  vy: 0,
  justExited: 90,
  hp: 30,
  maxHp: 30,
  mp: 12,
  maxMp: 12,
  atk: 7,
  def: 0,
  speed: 10,
  weapon: 'woodSword',
  armor: 'travelerClothes',
  weaponsOwned: ['woodSword'],
  armorsOwned: ['travelerClothes'],
  level: 1,
  exp: 0,
  gold: 0,
  potions: 0,
  inventory: { ether: 0, elixir: 0 },
  skills: ['attack', 'fire'],
  face_normal: 'hero_face',
  face_tired: 'hero_face_tired',
  dir: 'down',
  direction: 'down',
  walkFrame: HERO_WALK_IDLE_FRAME,
  walkTimer: 0,
};