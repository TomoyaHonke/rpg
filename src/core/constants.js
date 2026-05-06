export const TILE        = 32;
export const TILE_RENDER = 128;
export const SCALE       = TILE_RENDER / TILE;
export const VIEW_W      = TILE_RENDER * 8;
export const VIEW_H      = TILE_RENDER * 6;
export const VIEW_COLS   = VIEW_W / TILE_RENDER;
export const VIEW_ROWS   = VIEW_H / TILE_RENDER;
export const COLS        = 16;
export const ROWS        = 12;
export const ENC_RATE    = 0.15;
export const SAVE_KEY    = 'dotRpgSave';
export const DEBUG_HITBOX = false;

export const HERO_SC   = 2.5;
export const NPC_SC    = 2.0;
export const BOSS_SC   = 3.5;
export const BOSS_BATTLE_SC = 1.2;

export const HERO_OFF = {
  x: Math.round((TILE_RENDER - HERO_SC * 32) / 2),
  y: Math.round(TILE_RENDER - HERO_SC * 32 - 4),
};

export const NPC_OFF = {
  x: Math.round((TILE_RENDER - NPC_SC * 32) / 2),
  y: Math.round(TILE_RENDER - NPC_SC * 32 - 4),
};

export const BOSS_OFF = {
  x: Math.round((TILE_RENDER - BOSS_SC * 32) / 2),
  y: Math.round(TILE_RENDER - BOSS_SC * 32),
};

export const DEFAULT_NPC_DRAW_SIZE = Math.round(NPC_SC * 32);
export const DEFAULT_NPC_DRAW_W = 56;
export const DEFAULT_NPC_DRAW_H = 56;
export const DEFAULT_CHEST_DRAW_SIZE = 84;
export const DEFAULT_SIGN_DRAW_SIZE = 73;

export const MOVE_SPEED  = 4;
export const HERO_WALK_TICK = 8;
export const HERO_WALK_FRAME_COUNT = 3;
export const HERO_WALK_IDLE_FRAME = 1;
export const HERO_WALK_SEQUENCE = [0, 1, 2, 1];
export const HERO_WALK_DRAW_SCALE = 0.75;

export const HERO_WALK_DRAW_W = Math.round(HERO_SC * 32 * HERO_WALK_DRAW_SCALE);
export const HERO_WALK_DRAW_H = Math.round(HERO_SC * 32 * HERO_WALK_DRAW_SCALE);

export const HERO_WALK_ROWS = ['down', 'left', 'right', 'up'];

export const FOOT_HITBOX = { wRatio: 0.5, hRatio: 0.4 };
export const ENTRANCE_HITBOX = { wRatio: 0.72, hRatio: 0.35 };
export const TILE_IMAGE_EDGE_CROP = 2;