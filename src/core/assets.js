import {
  TILE_IMAGES,
  SPRITE_IMAGES,
  NPC_SPRITE_IMAGES,
  ENEMY_SPRITE_IMAGES,
  UI_IMAGE_SOURCES,
  BATTLE_BG_IMAGES,
  SIGN_IMAGE_SOURCE,
  OBJECT_IMAGE_SOURCES,
} from '../data/images.js';

export const tileImgs = {};
export const spriteImgs = {};
export const npcImgs = {};
export const enemyImgs = {};
export const uiImgs = {};
export const battleBgImgs = {};
export const signImgs = {};
export const objectImgs = {};

 export function loadTileImages() {
    for (const [key, src] of Object.entries(TILE_IMAGES)) {
      const img    = new Image();
      img._ready   = false;
      img.onload   = () => { img._ready = true; };
      img.onerror  = () => {
        console.warn(`[tile image] failed to load spriteKey="${key}" path="${src}"`);
      };
      img.src      = src;
      tileImgs[key] = img;
    }
  }

 export function loadSpriteImages() {
    const loadInto = (target, sources) => {
      for (const [key, src] of Object.entries(sources)) {
        const img   = new Image();
        img._ready  = false;
        img.onload  = () => { img._ready = true; };
        img.onerror = () => { /* ファイルなし → fillRect フォールバック */ };
        img.src     = src;
        target[key] = img;
      }
    };
    const loadFirstAvailable = (target, key, sources) => {
      let index = 0;
      const tryLoad = () => {
        const img = new Image();
        img._ready = false;
        img.onload = () => { img._ready = true; };
        img.onerror = () => {
          index++;
          if (index < sources.length) tryLoad();
        };
        img.src = sources[index];
        target[key] = img;
      };
      tryLoad();
    };
    loadInto(spriteImgs, SPRITE_IMAGES);
    loadInto(npcImgs, NPC_SPRITE_IMAGES);
    loadInto(enemyImgs, ENEMY_SPRITE_IMAGES);
    loadInto(battleBgImgs, BATTLE_BG_IMAGES);
    for (const [key, sources] of Object.entries(OBJECT_IMAGE_SOURCES)) {
      loadFirstAvailable(objectImgs, key, sources);
    }
    for (const [key, sources] of Object.entries(UI_IMAGE_SOURCES)) {
      loadFirstAvailable(uiImgs, key, sources);
    }
    loadFirstAvailable(signImgs, 'sign', [SIGN_IMAGE_SOURCE]);
  }