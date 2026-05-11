export const TILE        = 32;
export const TILE_RENDER = 32;
export const SCALE       = TILE_RENDER / TILE;
export const VIEW_W      = TILE_RENDER * 32;
export const VIEW_H      = TILE_RENDER * 24;
export const VIEW_COLS   = VIEW_W / TILE_RENDER;
export const VIEW_ROWS   = VIEW_H / TILE_RENDER;
export const COLS        = 16;
export const ROWS        = 12;
export const ENC_RATE    = 0.15;
export const SAVE_KEY    = 'dotRpgSave';
export const DEBUG_HITBOX = true;
export const DEBUG_DISABLE_ENCOUNTERS = true;

export const BASE_SPRITE_SIZE = TILE;

// 主人公の表示サイズ
export const PLAYER_RENDER_WIDTH = Math.round(TILE_RENDER * 2.0);
export const PLAYER_RENDER_HEIGHT = Math.round(TILE_RENDER * 2.0);

// 主人公画像の描画位置補正
export const PLAYER_DRAW_OFFSET_X = 0;
export const PLAYER_DRAW_OFFSET_Y = 0;

// 主人公の当たり判定
export const PLAYER_HITBOX_WIDTH = Math.round(TILE_RENDER );
export const PLAYER_HITBOX_HEIGHT = Math.round(TILE_RENDER );
export const PLAYER_HITBOX_OFFSET_X = Math.round((TILE_RENDER - PLAYER_HITBOX_WIDTH) / 2);
export const PLAYER_HITBOX_OFFSET_Y = Math.round(TILE_RENDER * 0.75);

// NPCの表示サイズ
export const NPC_RENDER_WIDTH = TILE_RENDER;
export const NPC_RENDER_HEIGHT = Math.round(TILE_RENDER * 1.5);

// NPCの当たり判定
export const NPC_HITBOX_WIDTH = Math.round(TILE_RENDER * 0.75);
export const NPC_HITBOX_HEIGHT = Math.round(TILE_RENDER * 1.0);
export const NPC_HITBOX_OFFSET_X = Math.round((TILE_RENDER - NPC_HITBOX_WIDTH) / 2);
export const NPC_HITBOX_OFFSET_Y = Math.round(TILE_RENDER * 0.4);

// オブジェクトの表示倍率
export const OBJECT_SCALE = 1.0;
export const CHEST_HITBOX_WIDTH = Math.round(TILE_RENDER * 0.75);
export const CHEST_HITBOX_HEIGHT = Math.round(TILE_RENDER * 0.5);
export const CHEST_HITBOX_OFFSET_X = Math.round((TILE_RENDER - CHEST_HITBOX_WIDTH) / 2);
export const CHEST_HITBOX_OFFSET_Y = TILE_RENDER - CHEST_HITBOX_HEIGHT;
export const SIGN_HITBOX_WIDTH = Math.round(TILE_RENDER * 0.75);
export const SIGN_HITBOX_HEIGHT = Math.round(TILE_RENDER * 0.5);
export const SIGN_HITBOX_OFFSET_X = Math.round((TILE_RENDER - SIGN_HITBOX_WIDTH) / 2);
export const SIGN_HITBOX_OFFSET_Y = TILE_RENDER - SIGN_HITBOX_HEIGHT;
export const BOSS_HITBOX_WIDTH_RATIO = 0.58;
export const BOSS_HITBOX_HEIGHT_RATIO = 0.42;
export const HOUSE_HITBOX_WIDTH_RATIO = 0.70;
export const HOUSE_HITBOX_HEIGHT_RATIO = 0.7;
export const HOUSE_HITBOX_EXTRA_HEIGHT = Math.round(TILE_RENDER * 0.55);
export const HOUSE_HITBOX_BOTTOM_INSET = 0;
export const HOUSE_DOOR_CLEARANCE = Math.round(TILE_RENDER * 0.16);
export const HOUSE_DOOR_HITBOX_WIDTH = TILE_RENDER * 2;
export const HOUSE_DOOR_HITBOX_HEIGHT = TILE_RENDER;
export const FOREST_ENTRANCE_RENDER_WIDTH = TILE_RENDER *3;
export const FOREST_ENTRANCE_RENDER_HEIGHT = TILE_RENDER *4;

export const HERO_SC   = 1.0;
export const NPC_SC    = 1.0;
export const BOSS_SC   = 1.8;
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

export const DEFAULT_NPC_DRAW_SIZE = NPC_RENDER_WIDTH;
export const DEFAULT_NPC_DRAW_W = NPC_RENDER_WIDTH;
export const DEFAULT_NPC_DRAW_H = NPC_RENDER_HEIGHT;
export const DEFAULT_CHEST_DRAW_SIZE = Math.round(TILE_RENDER * 2);
export const DEFAULT_SIGN_DRAW_SIZE = Math.round(TILE_RENDER * 3);

export const MOVE_SPEED  = 5;
export const HERO_WALK_TICK = 8;
export const HERO_WALK_FRAME_COUNT = 3;
export const HERO_WALK_IDLE_FRAME = 1;
export const HERO_WALK_SEQUENCE = [0, 1, 2, 1];
export const HERO_WALK_DRAW_SCALE = 1.0;

export const HERO_WALK_DRAW_W = PLAYER_RENDER_WIDTH;
export const HERO_WALK_DRAW_H = PLAYER_RENDER_HEIGHT;

export const HERO_WALK_ROWS = ['down', 'left', 'right', 'up'];

export const FOOT_HITBOX = { wRatio: 0.5, hRatio: 0.4 };
export const ENTRANCE_HITBOX = { wRatio: 0.72, hRatio: 0.35 };
export const TILE_IMAGE_EDGE_CROP = 2;
