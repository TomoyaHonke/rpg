 import {
  TILE,
  TILE_RENDER,
  SCALE,
  VIEW_W,
  VIEW_H,
  VIEW_COLS,
  VIEW_ROWS,
  COLS,
  ROWS,
  ENC_RATE,
  SAVE_KEY,
  DEBUG_HITBOX,
  HERO_SC,
  NPC_SC,
  BOSS_SC,
  BOSS_BATTLE_SC,
  HERO_OFF,
  NPC_OFF,
  BOSS_OFF,
  DEFAULT_NPC_DRAW_SIZE,
  DEFAULT_NPC_DRAW_W,
  DEFAULT_NPC_DRAW_H,
  DEFAULT_CHEST_DRAW_SIZE,
  DEFAULT_SIGN_DRAW_SIZE,
  MOVE_SPEED,
  HERO_WALK_TICK,
  HERO_WALK_FRAME_COUNT,
  HERO_WALK_IDLE_FRAME,
  HERO_WALK_SEQUENCE,
  HERO_WALK_DRAW_SCALE,
  HERO_WALK_DRAW_W,
  HERO_WALK_DRAW_H,
  HERO_WALK_ROWS,
  FOOT_HITBOX,
  ENTRANCE_HITBOX,
  TILE_IMAGE_EDGE_CROP,
} from './core/constants.js';

import {
  GameState,
  TitleAction,
  TITLE_MENU_ITEMS,
} from './core/state.js';



import {
  TILE_IMAGES,
  SPRITE_IMAGES,
  NPC_SPRITE_IMAGES,
  ENEMY_SPRITE_IMAGES,
  UI_IMAGE_SOURCES,
  BATTLE_BG_IMAGES,
  SIGN_IMAGE_SOURCE,
  OBJECT_IMAGE_SOURCES,
} from './data/images.js';

import {
  T,
  TILE_META,
  TILE_CONTEXT_META,
} from './data/tiles.js';

import {
  WEAPONS,
  ARMORS,
} from './data/equipment.js';

import {
  ITEMS,
} from './data/items.js';

import {
  ALLY_DEFS,
} from './data/allies.js';

import {
  ENEMY_DEFS,
} from './data/enemies.js';

import {
  LEAFA_RESCUE_POS,
  LEAFA_RESCUE_ENEMY_NPCS,
  fieldMap,
  leafaForestMap,
  townMap,
  dungeonMap,
  field2Map,
  shadowTownMap,
  outpostMap,
  cursedForestMap,
  FOREST_BOSS_POS,
  castleMap,
  CASTLE_BOSS_POS,
  DEMON_GENERAL_POS,
  houseMaps,
  TOWN_HOUSES,
  SHADOW_TOWN_HOUSES,
  START_MAP,
  START_POS,
} from './data/maps.js';

import {
  hero,
} from './data/hero.js';

import {
  runtimeState,
} from './core/runtimeState.js';

import {
  tileImgs,
  spriteImgs,
  npcImgs,
  enemyImgs,
  uiImgs,
  battleBgImgs,
  signImgs,
  objectImgs,
  loadTileImages,
  loadSpriteImages,
} from './core/assets.js';

import {
  showNotice,
} from './ui/noticeUI.js';

import {
  hideBtns,
} from './ui/buttonsUI.js';

import {
  updateStatusBar,
} from './ui/statusUI.js';

import {
  drawDialogueBox,
  drawPortraitBox,
  drawShopTextWindow as drawShopTextWindowUI,
  drawShopList as drawShopListUI,
} from './ui/textwindowUI.js';

import {
  SHOP_ITEMS,
} from './data/shopItems.js';

import {
  NPCS,
  EAST_HOUSE_NPCS,
  INN_NPCS,
  SOUTH_HOUSE_NPCS,
  SHOP_NPCS,
  SHADOW_TOWN_NPCS,
  SHADOW_INN_NPCS,
  SHADOW_SHOP_NPCS,
  FIELD_NPCS,
  OUTPOST_NPCS,
  CASTLE_NPCS,
} from './data/npcs.js';

import {
  MAP_OBJECTS,
  HOUSE_TRANSITION_IDS,
  HOUSE_EXIT_ENTRANCES,
} from './data/mapObjects.js';

import {
  HOUSE_MAP_TRANSITIONS,
  createBasicMapTransitions,
  createField2MapTransitions,
  createLeafaForestTransitions,
  createHouseExitTransition,
} from './data/mapTransitions.js';

import {
  getFieldEncounterTable,
  getDungeonEncounterTable,
  getField2EncounterTable,
  getCursedForestEncounterTable,
  getCastleEncounterTable,
  getLeafaForestEncounterTable,
} from './systems/encounters.js';

import {
  drawEquipMenuFrame,
  drawEquipMainMenu,
  drawItemList,
  drawItemTargetList,
  drawItemHelpText,
  drawCharacterHeader,
  drawCharacterStatusPanel,
  drawEquipmentTab,
  drawSkillTab,
} from './ui/equipmentUI.js';

import {
  usePotionOnTarget as usePotionOnTargetSystem,
  usePotion as usePotionSystem,
  useEther as useEtherSystem,
  useElixir as useElixirSystem,
} from './systems/itemSystem.js';

import {
  buyConsumable as buyConsumableSystem,
  buyHeroWeaponOnce as buyHeroWeaponOnceSystem,
  buyHeroArmorOnce as buyHeroArmorOnceSystem,
  buyAllyWeaponOnce as buyAllyWeaponOnceSystem,
  buyAllyArmorOnce as buyAllyArmorOnceSystem,
} from './systems/shopSystem.js';

import {
  cycleActorEquipment as cycleActorEquipmentSystem,
  getCurrentWeapon as getCurrentWeaponSystem,
  getHeroAttack as getHeroAttackSystem,
  getCurrentArmor as getCurrentArmorSystem,
  getHeroDefense as getHeroDefenseSystem,
  getAllyWeapon as getAllyWeaponSystem,
  getAllyArmor as getAllyArmorSystem,
  getAllyAttack as getAllyAttackSystem,
  getAllyDefense as getAllyDefenseSystem,
  getAllySpeed as getAllySpeedSystem,
  getActorKey as getActorKeySystem,

  isItemAllowedForActor as isItemAllowedForActorSystem,
  getOwnedWeaponIds as getOwnedWeaponIdsSystem,
  getOwnedArmorIds as getOwnedArmorIdsSystem,
  getActorEquippedWeapon as getActorEquippedWeaponSystem,
  getActorEquippedArmor as getActorEquippedArmorSystem,
} from './systems/equipmentSystem.js';

import {
  getNextExp as getNextExpSystem,
  getAllyNextExp as getAllyNextExpSystem,
  gainAllyExp as gainAllyExpSystem,
  gainHeroExp as gainHeroExpSystem,
} from './systems/levelSystem.js';

import {
  ensureInventory as ensureInventorySystem,
  getItemCount as getItemCountSystem,
  setItemCount as setItemCountSystem,
  changeItemCount as changeItemCountSystem,
  getUsableItems as getUsableItemsSystem,
} from './systems/inventorySystem.js';

import {
  advanceSignReadState,
  advanceNpcTalkState,
  getNpcLines as getNpcLinesSystem,
  getSignReadLines as getSignReadLinesSystem,
  getShopIntroLine as getShopIntroLineSystem,
  getNpcRole as getNpcRoleSystem,
  getDialogueCompleteAction,
  shouldOpenUnreadSign,
} from './systems/dialogueSystem.js';

import {
  renderPrologueUI,
} from './ui/prologueUI.js';

import {
  getMapBattleBgKeyUI,
  getBattleBgFallbackKeyUI,
  resolveBattleBgKeyUI,
  resolveBattleStartBgKeyUI,
  drawBattleBackgroundUI,
} from './ui/battleBgUI.js';

import {
  spawnHitBurstOnEnemyUI,
  updateHitEffectsUI,
  drawHitEffectsUI,
  clearHitEffectsUI,
  spawnSlashEffectOnEnemyUI,
  updateSlashEffectsUI,
  drawSlashEffectsUI,
  clearSlashEffectsUI,
  spawnFireEffectOnEnemyUI,
  updateFireEffectsUI,
  drawFireEffectsUI,
  clearFireEffectsUI,
  spawnLeafStormEffectOnEnemyUI,
  updateLeafEffectsUI,
  drawLeafEffectsUI,
  clearLeafEffectsUI,
} from './ui/battleEffectsUI.js';

import {
  chestFlagKey as chestFlagKeySystem,
  chestImageKey as chestImageKeySystem,
  grantChestReward as grantChestRewardSystem,
  normalizeChestItemId as normalizeChestItemIdSystem,
  grantChestRewards as grantChestRewardsSystem,
} from './systems/chestSystem.js';

import {
  createNpcDialogues,
  createNpcEvents,
} from './systems/npcEventSystem.js';

import {
  drawBattleIntroOverlay,
  drawBattleMessageWindow,
  drawBattlePartyStatusFrame,
  drawActorPanel as drawActorPanelUI,
  getEnemyViewCenters as getEnemyViewCentersUI,
  makeEnemyViews as makeEnemyViewsUI,
  drawEnemyView as drawEnemyViewUI,
  drawEnemyViews as drawEnemyViewsUI,
} from './ui/battleUI.js';

import {
  drawDebugRect as drawDebugRectUI,
  drawDebugHitboxes as drawDebugHitboxesUI,
} from './ui/debugUI.js';

import {
  drawChestFallback as drawChestFallbackUI,
  drawChestEntity as drawChestEntityUI,
  drawHouseFallback as drawHouseFallbackUI,
  drawHouseEntity as drawHouseEntityUI,
  drawDecorFallback as drawDecorFallbackUI,
  drawCustomObject as drawCustomObjectUI,
  drawObject as drawObjectUI,
  drawDecorEntity as drawDecorEntityUI,
  drawNPC as drawNPCUI,
} from './ui/mapEntityUI.js';

import {
  SKILL_DEFS,
} from './data/skills.js';

import {
  HERO_BATTLE_COMMANDS,
} from './data/battleCommands.js';

import {
  PROLOGUE_LINES,
} from './data/prologue.js';

import {
  HERO_WALK_FRAMES,
} from './data/heroFrames.js';

import {
  createInitialFlags,
} from './data/flags.js';

import {
  createInitialPrologueState,
  createInitialBattleIntro,
  createInitialBattleVictory,
  createInitialKeys,
} from './data/initialState.js';

import {
  getHeroSpriteInfo as getHeroSpriteInfoUI,
  drawHeroAtFoot as drawHeroAtFootUI,
} from './ui/heroUI.js';

import {
  setHeroDirection as setHeroDirectionSystem,
  updateHeroWalkAnimation as updateHeroWalkAnimationSystem,
  heroTileX as heroTileXSystem,
  heroTileY as heroTileYSystem,
  heroFootTileX as heroFootTileXSystem,
  heroFootTileY as heroFootTileYSystem,
  setHeroTilePosition as setHeroTilePositionSystem,
  setHeroStartPosition as setHeroStartPositionSystem,
} from './systems/heroSystem.js';

import {
  tileToPx as tileToPxUtil,
  pxToTile as pxToTileUtil,
  normalizeSavedPoint as normalizeSavedPointUtil,
  mapCols as mapColsUtil,
  mapRows as mapRowsUtil,
} from './utils/position.js';

import {
  getMapDefById as getMapDefByIdSystem,
  getMapTilesById as getMapTilesByIdSystem,
  getCurrentMapDef as getCurrentMapDefSystem,
  resolveEncounterTable as resolveEncounterTableSystem,
  resolveValue as resolveValueSystem,
  getTransitionDef as getTransitionDefSystem,
  getCurrentMapId as getCurrentMapIdSystem,
} from './systems/mapSystem.js';

import {
  rng as rngUtil,
} from './utils/random.js';

import {
  shadeHex as shadeHexUtil,
} from './utils/color.js';

import {
  drawText as drawTextUI,
  wrapTextLines as wrapTextLinesUI,
} from './ui/textUI.js';

import {
  drawBar as drawBarUI,
  drawThinBar as drawThinBarUI,
} from './ui/gaugeUI.js';

import {
  createSaveData,
  readSaveData,
  restoreHeroFromSave,
  restoreQuestAndFlagsFromSave,
  restoreReturnPointsFromSave,
  restoreCurrentMapFromSave,
  restoreAlliesFromSave,
} from './systems/saveSystem.js';

import {
  shouldStartEncounter,
  createEncounterTerrainKey,
  tileHasEncounter as tileHasEncounterSystem,
} from './systems/encounterSystem.js';

  function joinAlly(id) {
    if (allies.find(a => a.id === id)) return;
    const def = ALLY_DEFS[id];
    if (!def) return;
    allies.push({
      ...def,
      weaponsOwned: Array.isArray(def.weaponsOwned) ? [...def.weaponsOwned] : [],
      armorsOwned: Array.isArray(def.armorsOwned) ? [...def.armorsOwned] : [],
      flags: { hasAlly: true },
    });
  }

  // ============================================================
  // 敵データのひな形（バトルのたびにコピーして使う）
  // ============================================================
  
  const SLIME_BASE = ENEMY_DEFS.slime;
  const BAT_BASE = ENEMY_DEFS.bat;
  const GOBLIN_BASE = ENEMY_DEFS.goblin;
  const SNAKE_BASE = ENEMY_DEFS.snake;
  const OWL_BASE = ENEMY_DEFS.owl;
  const TREE_MINION_BASE = ENEMY_DEFS.tree_minion;
  const WILD_RAT_BASE = ENEMY_DEFS.wild_rat;
  const HORNET_BASE = ENEMY_DEFS.hornet;
  const WANDERING_MUSHROOM_BASE = ENEMY_DEFS.wandering_mushroom;
  const CAVE_SPIDER_BASE = ENEMY_DEFS.cave_spider;
  const SKELETON_BASE = ENEMY_DEFS.skeleton;
  const DARK_SOLDIER_BASE = ENEMY_DEFS.dark_soldier;
  const DARK_MAGE_BASE = ENEMY_DEFS.dark_mage;
  const DARK_KNIGHT_BASE = ENEMY_DEFS.darkKnight;
  const SCRAP_BEAST_BASE = ENEMY_DEFS.scrap_beast;
  const BOSS_POS = { x: 12, y: 1 };

  // ============================================================
  // NPC データ（位置・見た目・セリフ）
  //   x, y     = マップ上のタイル座標
  //   bodyCol  = 体の色
  //   hairCol  = 髪の色
  //   lines    = セリフの配列（1要素 = 1ページ）
  // ============================================================
  const flags = createInitialFlags();


    function getHouseEntrancePoint(houseId) {
    const house = findHouseDefById(houseId);
    if (house) return makeHouseDoorRect(house);
    return { ...runtimeState.houseReturn, exitDir: runtimeState.houseReturn.exitDir || 'down' };
  }

  const BASIC_MAP_TRANSITIONS = createBasicMapTransitions(flags);
  const FIELD2_MAP_TRANSITIONS = createField2MapTransitions(flags);
  const LEAFA_FOREST_TRANSITIONS = createLeafaForestTransitions(flags);

  const HOUSE_EXIT_TRANSITION = createHouseExitTransition(getHouseEntrancePoint);

  const MAP_TRANSITIONS = {
    ...BASIC_MAP_TRANSITIONS,
    ...HOUSE_MAP_TRANSITIONS,
    ...FIELD2_MAP_TRANSITIONS,
    ...LEAFA_FOREST_TRANSITIONS,
    ...HOUSE_EXIT_TRANSITION,
  };



const ENCOUNTER_ENEMIES = {
  SLIME_BASE,
  WILD_RAT_BASE,
  HORNET_BASE,
  WANDERING_MUSHROOM_BASE,
  BAT_BASE,
  SNAKE_BASE,

  CAVE_SPIDER_BASE,
  SKELETON_BASE,
  GOBLIN_BASE,
  DARK_SOLDIER_BASE,
  DARK_MAGE_BASE,
  
  field2_snake: ENEMY_DEFS.field2_snake,
  field2_owl: ENEMY_DEFS.field2_owl,
  SCRAP_BEAST_BASE,

  forest_snake: ENEMY_DEFS.forest_snake,
  forest_owl: ENEMY_DEFS.forest_owl,
  cursed_tree_minion: ENEMY_DEFS.cursed_tree_minion,

  castle_dark_soldier: ENEMY_DEFS.castle_dark_soldier,
  castle_dark_mage: ENEMY_DEFS.castle_dark_mage,
  castle_skeleton: ENEMY_DEFS.castle_skeleton,
  dark_knight_elite: ENEMY_DEFS.dark_knight_elite,
  demon_sorceress: ENEMY_DEFS.demon_sorceress,

  tree_minion: ENEMY_DEFS.tree_minion,
  goblin: ENEMY_DEFS.goblin,
};

  const MAP_DEFS = {
    field: {
        tiles: fieldMap,
        ...MAP_OBJECTS.field,
        npcs: FIELD_NPCS,
        encounterTable: () => getFieldEncounterTable(
            heroTileX,
            heroTileY,
            ENCOUNTER_ENEMIES
        ),
        },
        town: {
        tiles: townMap,
        ...MAP_OBJECTS.town,
        npcs: NPCS,
        encounterTable: [],
        },
    dungeon: {
      tiles: dungeonMap,
      battleBg: 'cave',
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
      encounterTable: () => getDungeonEncounterTable(
        isDeepCaveEncounter,
        ENCOUNTER_ENEMIES
        ),
    },
    field2: {
        tiles: field2Map,
        battleBg: 'dead_grass_bg',
        ...MAP_OBJECTS.field2,
        encounterTable: () => getField2EncounterTable(ENCOUNTER_ENEMIES),
        },
    shadowTown: {
        tiles: shadowTownMap,
        ...MAP_OBJECTS.shadowTown,
        npcs: SHADOW_TOWN_NPCS,
        encounterTable: [],
        },
    cursedForest: {
        tiles: cursedForestMap,
        battleBg: 'cursed_forest_bg',
        ...MAP_OBJECTS.cursedForest,
        encounterTable: () => getCursedForestEncounterTable(ENCOUNTER_ENEMIES),
},
    castle: {
        tiles: castleMap,
        battleBg: 'castle_bg',
        ...MAP_OBJECTS.castle,
        npcs: CASTLE_NPCS,
        encounterTable: () => getCastleEncounterTable(ENCOUNTER_ENEMIES),
        },
    'house:west': {
    tiles: houseMaps.west,
    ...MAP_OBJECTS.house,
    npcs: [],
    encounterTable: [],
    },

    'house:east': {
    tiles: houseMaps.east,
    ...MAP_OBJECTS.house,
    npcs: EAST_HOUSE_NPCS,
    encounterTable: [],
    },

    'house:north': {
    tiles: houseMaps.north,
    ...MAP_OBJECTS.house,
    npcs: [],
    encounterTable: [],
    },

    'house:south': {
    tiles: houseMaps.south,
    ...MAP_OBJECTS.house,
    npcs: SOUTH_HOUSE_NPCS,
    encounterTable: [],
    },

    'house:inn': {
    tiles: houseMaps.inn,
    ...MAP_OBJECTS.house,
    npcs: INN_NPCS,
    encounterTable: [],
    },

    'house:shop': {
    tiles: houseMaps.shop,
    ...MAP_OBJECTS.house,
    npcs: SHOP_NPCS,
    encounterTable: [],
    },

    'house:shadow_inn': {
    tiles: houseMaps.shadow_inn,
    ...MAP_OBJECTS.house,
    npcs: SHADOW_INN_NPCS,
    encounterTable: [],
    },

    'house:shadow_shop': {
    tiles: houseMaps.shadow_shop,
    ...MAP_OBJECTS.house,
    npcs: SHADOW_SHOP_NPCS,
    encounterTable: [],
    },
    outpost: {
        tiles: outpostMap,
        ...MAP_OBJECTS.outpost,
        npcs: OUTPOST_NPCS,
        encounterTable: [],
        },
    leafaForest: {
        tiles: leafaForestMap,
        battleBg: 'forest_event',
        ...MAP_OBJECTS.leafaForest,
        encounterTable: () => getLeafaForestEncounterTable(ENCOUNTER_ENEMIES),
        },
  };

  // ============================================================
  // ゲーム変数
  // ============================================================
  let currentState = GameState.TITLE;  // 現在のゲーム状態
let prologueState = createInitialPrologueState();
  let titleMenuIndex = 0;
  let foe      = null;   // 戦闘中の敵オブジェクト
  let battleEnemies = [];
  let battleTurnQueue = [];
  let battleTargetMode = null;
  let selectedTargetIndex = 0;
  let battleCommandIndex = 0;
  let battleIntro = createInitialBattleIntro();
  let battleEnemySeq = 0;
  let msg      = '';     // バトルメッセージ
  let battleMessageQueue = [];
  let battleMessageTimer = null;
  let heroTurn = true;   // プレイヤーのターンかどうか（仲間コマンド選択中も true）
  let winMsg   = '';     // 勝利時のメッセージ
  let battleVictory = createInitialBattleVictory();
  let moveAnim = { active: false }; // 旧セーブ互換のため残す。現在の移動は速度ベース。

  // ── パーティ・2人戦闘システム ────────────────────────────
  let allies = [];                  // 仲間配列
  let battleCommandActor = null;    // 現在コマンド選択中のキャラ { type:'hero'|'ally', actor }
  let battlePartyQueue   = [];      // このラウンドでコマンドを選ぶ順番
  let pendingPartyActions = [];     // 収集済みアクション { type, actor, speed, action, targetIndex }
  let talkNpc  = null;   // 会話中のNPC（nullなら会話していない）
  let talkPage = 0;      // 現在表示しているセリフのページ番号
  let activeSign = null;  // 読み取り中の看板（NPC会話とは別管理）
  let readPage = 0;       // 看板メッセージのページ番号
  let slimeKills = 0;    // スライムを倒した数
  let questDone  = false; // クエスト報酬を受け取ったかどうか
  let questRewardMsg = ''; // クエスト報酬メッセージ
  let shopMsg = '';      // 道具屋メッセージ
 
  let currentBattleBgKey = 'field'; // 戦闘に入った場所の背景種別
  let leafaRescueBattle = false;    // リーファ救出イベント戦闘中フラグ
  let equipCursor = 0;    // メインメニューの選択位置
  let equipMenuMode = 'main';
  let equipCharacterIndex = 0;
  let charaTabIndex = 0;  // キャラメニュータブ: 0=装備 1=スキル
  let equipSlotCursor = 0;
  let itemCursor = 0;
  let itemUseId = 'potion';
  let itemTargetIndex = 0;
  let shopCursor = 0;
  let entities = [];
  let renderCamera = { col: 0, row: 0 };
  let lastEventEntityKey = null;
  let lastEncounterTerrainKey = null;
  let encounterTimer = null;
  const keys = createInitialKeys();

  // ============================================================
  // Canvas の取得
  // ============================================================
  const canvas  = document.getElementById('c');
  const ctx     = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false; // ピクセルアートを拡大時にぼかさない
  const btnArea = document.getElementById('btnArea');

  // ============================================================
  // ユーティリティ
  // ============================================================
function shadeHex(hex, amount) {
  return shadeHexUtil(hex, amount);
}

  // min〜max のランダム整数を返す
function rng(min, max) {
  return rngUtil(min, max);
}

  function tileToPx(n) {
  return tileToPxUtil(n, TILE_RENDER);
}

function pxToTile(n) {
  return pxToTileUtil(n, TILE_RENDER);
}

function heroTileX() {
  return heroTileXSystem(hero, pxToTile);
}

function heroTileY() {
  return heroTileYSystem(hero, pxToTile);
}

function heroFootTileX() {
  return heroFootTileXSystem(hero, pxToTile, TILE_RENDER);
}

function heroFootTileY() {
  return heroFootTileYSystem(hero, pxToTile, TILE_RENDER);
}

function setHeroTile(x, y) {
  setHeroTilePositionSystem(hero, x, y, tileToPx);
  snapDrawPos();
  lastEventEntityKey = null;
  lastEncounterTerrainKey = null;
}

  function setStartPosition() {
  runtimeState.currentMap = START_MAP;
  runtimeState.currentHouseId = null;
  setHeroStartPositionSystem(hero, START_POS, tileToPx);
  setHeroDirection('down');
  hero.justExited = 90;
  snapDrawPos();
}

  function normalizeSavedPoint(point, fallback) {
  return normalizeSavedPointUtil(point, fallback, {
    COLS,
    ROWS,
    tileToPx,
  });
}

function getMapSystemDeps() {
  return {
    runtimeState,
    townMap,
    dungeonMap,
    field2Map,
    shadowTownMap,
    cursedForestMap,
    outpostMap,
    castleMap,
    leafaForestMap,
    isHouseMap,
  };
}

function getCurrentMapId() {
  return getCurrentMapIdSystem(getMapSystemDeps());
}

  function getMapDefById(mapId) {
  return getMapDefByIdSystem(mapId, MAP_DEFS);
}

function getMapTilesById(mapId) {
  return getMapTilesByIdSystem(mapId, MAP_DEFS);
}

function resolveValue(value, ...args) {
  return resolveValueSystem(value, ...args);
}

function getTransitionDef(transitionId) {
  return getTransitionDefSystem(transitionId, MAP_TRANSITIONS);
}

function getCurrentMapDef() {
  return getCurrentMapDefSystem(getCurrentMapId, getMapDefById);
}

function resolveEncounterTable(mapDef = getCurrentMapDef()) {
  return resolveEncounterTableSystem(mapDef);
}

function mapCols(map = runtimeState.currentMap) {
  return mapColsUtil(map, COLS);
}

function mapRows(map = runtimeState.currentMap) {
  return mapRowsUtil(map, ROWS);
}

  // シャドウ付きテキストを描画する
function txt(s, x, y, col = '#fff', sz = 14) {
  drawTextUI(ctx, s, x, y, col, sz);
}

function wrapTextLines(text, maxWidth, maxLines, fontSize = 10) {
  return wrapTextLinesUI(ctx, text, maxWidth, maxLines, fontSize);
}

  // HPバー（横長のゲージ）を描画する
function drawBar(x, y, w, cur, max, col) {
  drawBarUI(ctx, x, y, w, cur, max, col);
}

function drawThinBar(x, y, w, cur, max, col) {
  drawThinBarUI(ctx, x, y, w, cur, max, col);
}

  function getCurrentWeapon() {
  return getCurrentWeaponSystem(hero, WEAPONS);
}

function getHeroAttack() {
  return getHeroAttackSystem(hero, WEAPONS);
}

function getCurrentArmor() {
  return getCurrentArmorSystem(hero, ARMORS);
}

function getHeroDefense() {
  return getHeroDefenseSystem(hero, ARMORS);
}

// ── 仲間ステータス計算 ───────────────────────────────────────
function getAllyWeapon(ally) {
  return getAllyWeaponSystem(ally, getActorEquippedWeapon);
}

function getAllyArmor(ally) {
  return getAllyArmorSystem(ally, getActorEquippedArmor);
}

function getAllyAttack(ally) {
  return getAllyAttackSystem(ally, getActorEquippedWeapon);
}

function getAllyDefense(ally) {
  return getAllyDefenseSystem(ally, getActorEquippedArmor);
}

function getAllySpeed(ally) {
  return getAllySpeedSystem(ally);
}

function getActorKey(actor) {
  return getActorKeySystem(actor, hero);
}

  function isItemAllowedForActor(item, actorKey) {
    if (!item) return false;
    if (!Array.isArray(item.allowedUsers) || item.allowedUsers.length === 0) return true;
    return actorKey ? item.allowedUsers.includes(actorKey) : false;
  }
  function getOwnedWeaponIds(actor) {
    const actorKey = getActorKey(actor);
    const owned = Array.isArray(actor?.weaponsOwned) ? actor.weaponsOwned : [];
    return owned.filter(id => WEAPONS[id] && isItemAllowedForActor(WEAPONS[id], actorKey));
  }
  function getOwnedArmorIds(actor) {
    const actorKey = getActorKey(actor);
    const owned = Array.isArray(actor?.armorsOwned) ? actor.armorsOwned : [];
    return owned.filter(id => ARMORS[id] && isItemAllowedForActor(ARMORS[id], actorKey));
  }
  function getActorEquippedWeapon(actor) {
    const actorKey = getActorKey(actor);
    const itemId = actor === hero ? hero.weapon : actor?.equippedWeapon;
    const owned = getOwnedWeaponIds(actor);
    if (itemId && WEAPONS[itemId] && isItemAllowedForActor(WEAPONS[itemId], actorKey)) return WEAPONS[itemId];
    return WEAPONS[owned[0]] || { attack: 0 };
  }
  function getActorEquippedArmor(actor) {
    const actorKey = getActorKey(actor);
    const itemId = actor === hero ? hero.armor : actor?.equippedArmor;
    const owned = getOwnedArmorIds(actor);
    if (itemId && ARMORS[itemId] && isItemAllowedForActor(ARMORS[itemId], actorKey)) return ARMORS[itemId];
    return ARMORS[owned[0]] || { defense: 0 };
  }
  function getNextExp(level) {
  return getNextExpSystem(level);
}

function getAllyNextExp(ally) {
  return getAllyNextExpSystem(ally);
}

function gainAllyExp(ally, amount) {
  return gainAllyExpSystem(ally, amount);
}

  function getEquipItems() {
    const weaponItems = getOwnedWeaponIds(hero)
      .map(id => ({ type: 'weapon', id, item: WEAPONS[id] }));
    const armorItems = getOwnedArmorIds(hero)
      .map(id => ({ type: 'armor', id, item: ARMORS[id] }));
    const itemItems = getUsableItems().map(item => ({
      type: 'item',
      id: item.id,
      item: { name: `${item.name} × ${getItemCount(item.id)}` },
    }));
    return [...weaponItems, ...armorItems, ...itemItems];
  }

  function ensureInventory() {
  return ensureInventorySystem(hero);
}

function getItemCount(itemId) {
  return getItemCountSystem(hero, itemId);
}

function setItemCount(itemId, count) {
  return setItemCountSystem(hero, itemId, count);
}

function changeItemCount(itemId, delta) {
  return changeItemCountSystem(hero, itemId, delta);
}

function getUsableItems() {
  return getUsableItemsSystem(ITEMS);
}

  function getPartyMembers({ aliveOnly = false } = {}) {
    const members = [{ type: 'hero', id: 'hero', name: '勇者', actor: hero }];
    for (const ally of allies) {
      if (ally.flags && ally.flags.hasAlly) {
        members.push({ type: 'ally', id: ally.id, name: ally.name, actor: ally });
      }
    }
    return aliveOnly ? members.filter(member => member.actor.hp > 0) : members;
  }

  function getPartyMemberById(id, { aliveOnly = false } = {}) {
    return getPartyMembers({ aliveOnly }).find(member => member.id === id) || null;
  }

  function getTargetDisplayName(target) {
    return target === hero ? 'ゆうしゃ' : target.name;
  }

function getItemSystemDeps() {
  return {
    getItemCount,
    changeItemCount,
    ITEMS,
    getTargetDisplayName,
  };
}

function usePotionOnTarget(target) {
  return usePotionOnTargetSystem(target, getItemSystemDeps());
}

function usePotion() {
  return usePotionSystem(hero, getItemSystemDeps());
}

function useEther(target) {
  return useEtherSystem(target, getItemSystemDeps());
}

function useElixir(target) {
  return useElixirSystem(target, getItemSystemDeps());
}

  function fullRecoverParty() {
    for (const member of getPartyMembers()) {
      member.actor.hp = member.actor.maxHp;
      member.actor.mp = member.actor.maxMp;
    }
  }

  function getEquipmentSystemDeps() {
  return {
    hero,
    WEAPONS,
    ARMORS,
    getActorKey,
    getOwnedWeaponIds,
    getOwnedArmorIds,
  };
}

  function cycleActorEquipment(actor, slot, delta = 1) {
  return cycleActorEquipmentSystem(
    actor,
    slot,
    delta,
    getEquipmentSystemDeps()
  );
}

  // 経験値を加算し、一定値に達したらレベルアップする
  function gainExp(amount) {
  return gainHeroExpSystem(hero, amount);
}

  // ============================================================
  // スプライト描画：主人公
  //   px, py = 描画するピクセル座標（左上）
  //   sc     = 拡大率（1=普通, 2=2倍, ...）
  // ============================================================

  function getHeroSystemDeps() {
  return {
    HERO_WALK_IDLE_FRAME,
    HERO_WALK_TICK,
    HERO_WALK_SEQUENCE,
  };
}

  function setHeroDirection(direction) {
  return setHeroDirectionSystem(hero, direction, HERO_WALK_ROWS);
}

  function updateHeroWalkAnimation(isMoving) {
  return updateHeroWalkAnimationSystem(
    hero,
    isMoving,
    getHeroSystemDeps()
  );
}

  // hero.png（2×2スプライトシート）から向きに対応するコマ位置を返す。
  // 戻り値: { img, sx, sy, frameW, frameH } または null（未ロード時 → fillRect フォールバック）

  function getHeroUIDeps() {
  return {
    spriteImgs,
    hero,
    HERO_WALK_FRAME_COUNT,
    HERO_WALK_IDLE_FRAME,
    HERO_WALK_FRAMES,
    HERO_WALK_DRAW_W,
    HERO_WALK_DRAW_H,
    HERO_SC,
    getHeroSpriteInfo,
    drawHero,
  };
}

  function getHeroSpriteInfo(dir) {
  return getHeroSpriteInfoUI(dir, getHeroUIDeps());
}

  function drawHero(px, py, sc = 1, dir = hero.direction || hero.dir || 'down') {
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sc, sc);

    // ── 画像ベース描画（スプライトシートから向きに応じたコマを切り出す） ──
    const si = getHeroSpriteInfo(dir);
    if (si) {
      ctx.drawImage(si.img, si.sx, si.sy, si.frameW, si.frameH, 0, 0, 32, 32);
      ctx.restore();
      return;
    }

    const shadow = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(8, 29, 16, 2);
    };
    const boots = () => {
      ctx.fillStyle = '#6b3b1f';
      ctx.fillRect(9, 25, 5, 5);
      ctx.fillRect(18, 25, 5, 5);
      ctx.fillRect(8, 29, 7, 2);
      ctx.fillRect(17, 29, 7, 2);
      ctx.fillStyle = '#3a2418';
      ctx.fillRect(9, 28, 5, 2);
      ctx.fillRect(18, 28, 5, 2);
      ctx.fillRect(8, 30, 7, 1);
      ctx.fillRect(17, 30, 7, 1);
      ctx.fillStyle = '#9a6235';
      ctx.fillRect(10, 25, 3, 1);
      ctx.fillRect(19, 25, 3, 1);
      ctx.fillRect(9, 29, 3, 1);
      ctx.fillRect(18, 29, 3, 1);
    };
    const frontBody = () => {
      ctx.fillStyle = '#9a2434';
      ctx.fillRect(8, 13, 16, 3);
      ctx.fillRect(7, 16, 18, 5);
      ctx.fillRect(8, 21, 16, 5);
      ctx.fillStyle = '#d64a5a';
      ctx.fillRect(8, 13, 12, 1);
      ctx.fillRect(7, 16, 4, 3);
      ctx.fillRect(9, 14, 9, 2);
      ctx.fillRect(9, 21, 3, 4);
      ctx.fillStyle = '#7a1d2b';
      ctx.fillRect(20, 14, 4, 2);
      ctx.fillRect(21, 16, 4, 5);
      ctx.fillRect(20, 21, 4, 5);
      ctx.fillRect(8, 25, 16, 1);
      ctx.fillStyle = '#245fd1';
      ctx.fillRect(6, 15, 4, 7);
      ctx.fillRect(22, 15, 4, 7);
      ctx.fillStyle = '#f0b884';
      ctx.fillRect(5, 21, 4, 4);
      ctx.fillRect(23, 21, 4, 4);
      ctx.fillStyle = '#153f91';
      ctx.fillRect(10, 14, 12, 10);
      ctx.fillStyle = '#245fd1';
      ctx.fillRect(11, 15, 10, 7);
      ctx.fillStyle = '#8fb8ff';
      ctx.fillRect(13, 15, 2, 7);
      ctx.fillRect(17, 15, 2, 7);
      ctx.fillStyle = '#f1d36b';
      ctx.fillRect(10, 21, 12, 2);
      ctx.fillStyle = '#6b3b1f';
      ctx.fillRect(9, 23, 14, 2);
      ctx.fillStyle = '#ffd85c';
      ctx.fillRect(15, 22, 2, 3);
    };
    const swordRight = () => {
      // 刃 — 3px幅・青白い鋼
      ctx.fillStyle = '#e8f0ff';
      ctx.fillRect(26, 4, 3, 16);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(26, 4, 1, 15);   // 光沢ライン
      ctx.fillStyle = '#8ab0d0';
      ctx.fillRect(28, 5, 1, 15);   // 刃の影側
      // ガード — 金色・幅8px
      ctx.fillStyle = '#f5d000';
      ctx.fillRect(23, 18, 8, 3);
      ctx.fillStyle = '#b09800';
      ctx.fillRect(23, 20, 8, 1);   // ガード下影
      // グリップ
      ctx.fillStyle = '#6b3b1f';
      ctx.fillRect(26, 21, 3, 6);
      ctx.fillStyle = '#3a2418';
      ctx.fillRect(26, 22, 3, 1);   // 巻き革1
      ctx.fillRect(26, 24, 3, 1);   // 巻き革2
      // ポンメル — 金
      ctx.fillStyle = '#f5d000';
      ctx.fillRect(25, 27, 4, 2);
    };
    const faceFront = () => {
      // 頭全体を2px上にシフト (y-2) → 2.5頭身に近づける
      ctx.fillStyle = '#d7905c';
      ctx.fillRect(14, 10, 4, 3);
      ctx.fillStyle = '#f0b884';
      ctx.fillRect(10, 4, 12, 8);
      ctx.fillRect(11, 11, 10, 2);
      ctx.fillStyle = '#ffd0a0';
      ctx.fillRect(12, 5, 8, 5);
      ctx.fillStyle = '#6f3416';
      ctx.fillRect(9, 2, 14, 4);
      ctx.fillRect(8, 5, 4, 5);
      ctx.fillRect(20, 5, 4, 5);
      ctx.fillStyle = '#5b2a12';
      ctx.fillRect(19, 2, 4, 4);
      ctx.fillRect(8, 8, 4, 2);
      ctx.fillRect(20, 7, 4, 3);
      ctx.fillStyle = '#b56a2a';
      ctx.fillRect(10, 2, 6, 1);
      ctx.fillRect(11, 3, 5, 1);
      ctx.fillRect(9, 5, 3, 1);
      ctx.fillRect(12, 5, 3, 2);
      // 眉毛
      ctx.fillStyle = '#3a1a06';
      ctx.fillRect(11, 7, 3, 1);
      ctx.fillRect(18, 7, 3, 1);
      // 目 — 2x3px に拡大
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(12, 8, 2, 3);
      ctx.fillRect(18, 8, 2, 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(12, 8, 1, 1);
      ctx.fillRect(18, 8, 1, 1);
      ctx.fillStyle = '#8c4d32';
      ctx.fillRect(15, 10, 2, 1);
    };
    const drawDown = () => {
      shadow();
      boots();
      frontBody();
      swordRight();   // body の上に重ねて剣を目立たせる
      faceFront();
    };
    const drawUp = () => {
      shadow();
      ctx.fillStyle = '#d7e0ea';
      ctx.fillRect(4, 9, 2, 14);
      ctx.fillStyle = '#8a5a25';
      ctx.fillRect(3, 22, 5, 2);
      boots();
      ctx.fillStyle = '#7a1d2b';
      ctx.fillRect(7, 13, 18, 13);
      ctx.fillStyle = '#b83244';
      ctx.fillRect(8, 13, 12, 2);
      ctx.fillRect(8, 15, 4, 6);
      ctx.fillRect(10, 22, 9, 3);
      ctx.fillStyle = '#5e1722';
      ctx.fillRect(21, 14, 4, 10);
      ctx.fillRect(8, 24, 16, 2);
      ctx.fillStyle = '#153f91';
      ctx.fillRect(10, 15, 12, 9);
      ctx.fillStyle = '#1f4fb3';
      ctx.fillRect(11, 15, 8, 2);
      ctx.fillRect(11, 17, 5, 6);
      ctx.fillStyle = '#6fa0ff';
      ctx.fillRect(11, 15, 4, 1);
      ctx.fillRect(11, 16, 2, 5);
      ctx.fillStyle = '#0f347f';
      ctx.fillRect(19, 17, 3, 7);
      ctx.fillRect(14, 22, 8, 2);
      ctx.fillStyle = '#6b3b1f';
      ctx.fillRect(9, 23, 14, 2);
      ctx.fillStyle = '#9a6235';
      ctx.fillRect(9, 23, 5, 1);
      ctx.fillStyle = '#3a2418';
      ctx.fillRect(18, 24, 5, 1);
      ctx.fillStyle = '#6f3416';
      ctx.fillRect(9, 5, 14, 8);
      ctx.fillRect(8, 9, 16, 4);
      ctx.fillStyle = '#5b2a12';
      ctx.fillRect(20, 5, 3, 8);
      ctx.fillRect(8, 11, 16, 2);
      ctx.fillStyle = '#b56a2a';
      ctx.fillRect(10, 5, 6, 1);
      ctx.fillRect(11, 6, 5, 1);
      ctx.fillRect(9, 9, 5, 1);
      ctx.fillRect(10, 10, 4, 1);
    };
    const drawRight = () => {
      shadow();
      ctx.fillStyle = '#7a1d2b';
      ctx.fillRect(8, 14, 14, 12);
      ctx.fillStyle = '#b83244';
      ctx.fillRect(10, 15, 10, 3);
      swordRight();
      boots();
      ctx.fillStyle = '#153f91';
      ctx.fillRect(11, 14, 11, 10);
      ctx.fillStyle = '#245fd1';
      ctx.fillRect(14, 15, 7, 7);
      ctx.fillStyle = '#8fb8ff';
      ctx.fillRect(18, 15, 2, 7);
      ctx.fillStyle = '#6b3b1f';
      ctx.fillRect(10, 23, 13, 2);
      ctx.fillStyle = '#245fd1';
      ctx.fillRect(22, 16, 4, 6);
      ctx.fillStyle = '#f0b884';
      ctx.fillRect(24, 21, 4, 4);
      ctx.fillRect(12, 7, 10, 7);
      ctx.fillRect(13, 13, 8, 2);
      ctx.fillStyle = '#ffd0a0';
      ctx.fillRect(16, 8, 5, 4);
      ctx.fillStyle = '#6f3416';
      ctx.fillRect(10, 4, 12, 4);
      ctx.fillRect(9, 7, 5, 6);
      ctx.fillRect(18, 7, 5, 4);
      ctx.fillStyle = '#5b2a12';
      ctx.fillRect(19, 4, 3, 4);
      ctx.fillRect(9, 10, 5, 3);
      ctx.fillRect(18, 9, 5, 2);
      ctx.fillStyle = '#b56a2a';
      ctx.fillRect(11, 4, 5, 1);
      ctx.fillRect(12, 5, 4, 1);
      ctx.fillRect(10, 7, 3, 1);
      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(19, 10, 2, 2);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(19, 10, 1, 1);
      ctx.fillStyle = '#8c4d32';
      ctx.fillRect(19, 12, 2, 1);
    };

    if (dir === 'up') {
      drawUp();
    } else if (dir === 'left') {
      ctx.save();
      ctx.translate(32, 0);
      ctx.scale(-1, 1);
      drawRight();
      ctx.restore();
    } else if (dir === 'right') {
      drawRight();
    } else {
      drawDown();
    }

    ctx.restore();
  }

  function drawHeroAtFoot(footX, footY, dir = hero.direction || hero.dir || 'down') {
  drawHeroAtFootUI(
    ctx,
    footX,
    footY,
    dir,
    getHeroUIDeps()
  );
}

  // ============================================================
  // スプライト描画：スライム
  // ============================================================
  function drawSlime(px, py, sc = 1) {
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sc, sc);

    // 影
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(6, 26, 20, 4);

    // 体（明るい緑）
    ctx.fillStyle = '#44cc44';
    ctx.fillRect(4, 14, 24, 12);
    ctx.fillRect(8, 10, 16, 16);
    ctx.fillRect(6, 12, 20, 14);

    // ハイライト（光沢）
    ctx.fillStyle = '#77ee77';
    ctx.fillRect(10, 12, 6, 4);

    // 暗い部分（底）
    ctx.fillStyle = '#228822';
    ctx.fillRect(4, 22, 24, 4);

    // 目
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(10, 17, 4, 4);
    ctx.fillRect(18, 17, 4, 4);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, 17, 2, 2);
    ctx.fillRect(18, 17, 2, 2);

    // 口
    ctx.fillStyle = '#004400';
    ctx.fillRect(12, 22, 8, 2);

    ctx.restore();
  }

  function drawBat(px, py, sc = 1) {
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sc, sc);

    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(7, 27, 18, 3);

    ctx.fillStyle = '#2b2240';
    ctx.fillRect(4, 12, 8, 4);
    ctx.fillRect(20, 12, 8, 4);
    ctx.fillRect(2, 16, 10, 4);
    ctx.fillRect(20, 16, 10, 4);
    ctx.fillRect(5, 20, 5, 3);
    ctx.fillRect(22, 20, 5, 3);
    ctx.fillStyle = '#4a3a66';
    ctx.fillRect(9, 14, 14, 10);
    ctx.fillRect(11, 10, 10, 8);
    ctx.fillStyle = '#6a5a88';
    ctx.fillRect(13, 12, 6, 3);
    ctx.fillStyle = '#1a1428';
    ctx.fillRect(12, 22, 8, 3);

    ctx.fillStyle = '#dd3333';
    ctx.fillRect(12, 16, 3, 3);
    ctx.fillRect(18, 16, 3, 3);
    ctx.fillStyle = '#ff9999';
    ctx.fillRect(12, 16, 1, 1);
    ctx.fillRect(18, 16, 1, 1);
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(13, 20, 2, 3);
    ctx.fillRect(18, 20, 2, 3);

    ctx.restore();
  }

  function drawGoblin(px, py, sc = 1) {
    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sc, sc);

    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.fillRect(7, 27, 18, 3);

    ctx.fillStyle = '#2a1810';
    ctx.fillRect(8, 25, 6, 5);
    ctx.fillRect(18, 25, 6, 5);
    ctx.fillStyle = '#3a2418';
    ctx.fillRect(8, 25, 5, 4);
    ctx.fillRect(18, 25, 5, 4);
    ctx.fillStyle = '#5c3828';
    ctx.fillRect(8, 25, 3, 1);
    ctx.fillRect(18, 25, 3, 1);
    ctx.fillStyle = '#6b3b1f';
    ctx.fillRect(9, 16, 14, 10);
    ctx.fillStyle = '#8a5a25';
    ctx.fillRect(10, 17, 12, 3);
    ctx.fillStyle = '#3f7a2d';
    ctx.fillRect(7, 14, 5, 8);
    ctx.fillRect(21, 14, 5, 8);
    ctx.fillStyle = '#4f9a38';
    ctx.fillRect(10, 6, 12, 9);
    ctx.fillRect(8, 9, 16, 5);
    ctx.fillStyle = '#6fbd47';
    ctx.fillRect(12, 7, 8, 4);
    ctx.fillStyle = '#2e5c20';
    ctx.fillRect(7, 8, 4, 2);
    ctx.fillRect(21, 8, 4, 2);

    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(12, 11, 3, 2);
    ctx.fillRect(18, 11, 3, 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(12, 11, 1, 1);
    ctx.fillRect(18, 11, 1, 1);
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(15, 14, 2, 3);
    ctx.fillRect(18, 14, 2, 3);
    ctx.fillStyle = '#5c2c1f';
    ctx.fillRect(13, 21, 6, 2);

    ctx.fillStyle = '#777';
    ctx.fillRect(26, 12, 2, 11);
    ctx.fillStyle = '#aaaaaa';
    ctx.fillRect(25, 10, 4, 4);
    ctx.fillStyle = '#5c4033';
    ctx.fillRect(24, 21, 5, 2);

    ctx.restore();
  }

  function drawDarkKnight(px, py, sc = 1) {
    if (drawEnemySpriteOrFallback('dark_knight', 'dark_knight', px, py, sc)) return;

    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sc, sc);

    ctx.fillStyle = 'rgba(0,0,0,0.32)';
    ctx.fillRect(6, 28, 20, 3);

    ctx.fillStyle = '#161625';
    ctx.fillRect(8, 13, 16, 14);
    ctx.fillStyle = '#2a2a44';
    ctx.fillRect(10, 14, 12, 11);
    ctx.fillStyle = '#50506c';
    ctx.fillRect(12, 15, 3, 10);
    ctx.fillRect(17, 15, 3, 10);
    ctx.fillStyle = '#3e1520';
    ctx.fillRect(7, 17, 4, 9);
    ctx.fillRect(21, 17, 4, 9);
    ctx.fillStyle = '#5b1f2f';
    ctx.fillRect(8, 18, 2, 7);
    ctx.fillRect(22, 18, 2, 7);

    ctx.fillStyle = '#11111a';
    ctx.fillRect(10, 5, 12, 9);
    ctx.fillRect(8, 8, 16, 5);
    ctx.fillStyle = '#3f3f5a';
    ctx.fillRect(11, 6, 10, 3);
    ctx.fillStyle = '#5a5a7c';
    ctx.fillRect(11, 6, 4, 1);
    ctx.fillRect(9, 8, 3, 1);
    ctx.fillStyle = '#dd3333';
    ctx.fillRect(12, 10, 3, 2);
    ctx.fillRect(18, 10, 3, 2);
    ctx.fillStyle = '#ff9999';
    ctx.fillRect(12, 10, 1, 1);
    ctx.fillRect(18, 10, 1, 1);
    ctx.fillStyle = '#d7e0ea';
    ctx.fillRect(15, 4, 2, 5);
    ctx.fillRect(13, 5, 6, 1);

    ctx.fillStyle = '#161628';
    ctx.fillRect(8, 25, 6, 5);
    ctx.fillRect(18, 25, 6, 5);
    ctx.fillStyle = '#242438';
    ctx.fillRect(8, 25, 5, 4);
    ctx.fillRect(18, 25, 5, 4);
    ctx.fillStyle = '#3a3a52';
    ctx.fillRect(8, 25, 3, 1);
    ctx.fillRect(18, 25, 3, 1);
    ctx.fillStyle = '#777';
    ctx.fillRect(27, 8, 2, 17);
    ctx.fillStyle = '#d7e0ea';
    ctx.fillRect(26, 6, 4, 5);
    ctx.fillStyle = '#8a5a25';
    ctx.fillRect(25, 22, 6, 2);

    ctx.restore();
  }

  function drawJurei(px, py, sc = 1) {
    if (drawEnemySpriteOrFallback('jurei', 'jurei', px, py, sc)) return;

    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sc, sc);

    // 影
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(6, 28, 20, 3);

    // 根（足部分）
    ctx.fillStyle = '#3a2510';
    ctx.fillRect(8, 24, 4, 6);
    ctx.fillRect(20, 24, 4, 6);
    ctx.fillRect(10, 26, 3, 3);
    ctx.fillRect(19, 26, 3, 3);

    // 幹（体）
    ctx.fillStyle = '#2d4a1e';
    ctx.fillRect(10, 8, 12, 18);
    ctx.fillStyle = '#3e6828';
    ctx.fillRect(11, 9, 8, 14);
    ctx.fillStyle = '#1e3414';
    ctx.fillRect(18, 10, 4, 16);

    // 枝（腕）
    ctx.fillStyle = '#3a2510';
    ctx.fillRect(3, 10, 8, 3);
    ctx.fillRect(21, 10, 8, 3);
    ctx.fillRect(2, 8, 5, 3);
    ctx.fillRect(25, 8, 5, 3);

    // 葉（頭）
    ctx.fillStyle = '#1a4a0a';
    ctx.fillRect(6, 2, 20, 8);
    ctx.fillRect(4, 4, 24, 6);
    ctx.fillStyle = '#2a6a14';
    ctx.fillRect(8, 2, 12, 4);
    ctx.fillRect(6, 4, 16, 4);
    ctx.fillStyle = '#3a8a1e';
    ctx.fillRect(10, 3, 8, 2);

    // 目（呪いの光）
    ctx.fillStyle = '#cc6600';
    ctx.fillRect(12, 13, 3, 3);
    ctx.fillRect(17, 13, 3, 3);
    ctx.fillStyle = '#ff9900';
    ctx.fillRect(12, 13, 2, 2);
    ctx.fillRect(17, 13, 2, 2);

    // 口（裂け目）
    ctx.fillStyle = '#1a0a00';
    ctx.fillRect(13, 18, 6, 2);
    ctx.fillRect(14, 17, 4, 1);

    ctx.restore();
  }

  function drawDemonGeneral(px, py, sc = 1) {
    if (drawEnemySpriteOrFallback('demon_general', 'demon_general', px, py, sc)) return;

    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sc, sc);
    // 影
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(5, 29, 22, 3);
    // 脚部
    ctx.fillStyle = '#1a1a28';
    ctx.fillRect(10, 22, 5, 9);
    ctx.fillRect(17, 22, 5, 9);
    ctx.fillStyle = '#2e2e40';
    ctx.fillRect(10, 22, 4, 7);
    ctx.fillRect(17, 22, 4, 7);
    // 胴体鎧
    ctx.fillStyle = '#1e1e30';
    ctx.fillRect(8, 12, 16, 12);
    ctx.fillStyle = '#30304a';
    ctx.fillRect(9, 13, 14, 9);
    ctx.fillStyle = '#464660';
    ctx.fillRect(10, 14, 5, 7);
    ctx.fillRect(17, 14, 5, 7);
    // 胸紋章（赤十字）
    ctx.fillStyle = '#cc4400';
    ctx.fillRect(13, 15, 6, 5);
    ctx.fillStyle = '#ff6600';
    ctx.fillRect(15, 15, 2, 5);
    ctx.fillRect(13, 17, 6, 2);
    // 肩当て＋スパイク
    ctx.fillStyle = '#2a2a40';
    ctx.fillRect(4, 10, 6, 8);
    ctx.fillRect(22, 10, 6, 8);
    ctx.fillStyle = '#44445e';
    ctx.fillRect(4, 10, 4, 6);
    ctx.fillRect(22, 10, 4, 6);
    ctx.fillStyle = '#181820';
    ctx.fillRect(5, 7, 3, 5);
    ctx.fillRect(24, 7, 3, 5);
    // 腕
    ctx.fillStyle = '#242438';
    ctx.fillRect(4, 16, 5, 8);
    ctx.fillRect(23, 16, 5, 8);
    // 頭（兜）
    ctx.fillStyle = '#1a1a28';
    ctx.fillRect(10, 4, 12, 9);
    ctx.fillStyle = '#2c2c42';
    ctx.fillRect(11, 5, 10, 7);
    // 兜の角（二本）
    ctx.fillStyle = '#181820';
    ctx.fillRect(9, 2, 3, 5);
    ctx.fillRect(20, 2, 3, 5);
    ctx.fillStyle = '#2a2a3e';
    ctx.fillRect(10, 2, 1, 4);
    ctx.fillRect(21, 2, 1, 4);
    // 目（橙色）
    ctx.fillStyle = '#cc5500';
    ctx.fillRect(12, 8, 3, 2);
    ctx.fillRect(17, 8, 3, 2);
    ctx.fillStyle = '#ff8800';
    ctx.fillRect(12, 8, 2, 1);
    ctx.fillRect(17, 8, 2, 1);
    // 大剣（右手）
    ctx.fillStyle = '#555570';
    ctx.fillRect(26, 3, 3, 23);
    ctx.fillStyle = '#888899';
    ctx.fillRect(26, 3, 2, 21);
    ctx.fillStyle = '#9a5500';
    ctx.fillRect(24, 13, 7, 3);
    ctx.fillStyle = '#777790';
    ctx.fillRect(27, 1, 1, 4);
    ctx.restore();
  }

  function drawDemonLord(px, py, sc = 1) {
    if (drawEnemySpriteOrFallback('demon_lord', 'demon_lord', px, py, sc)) return;

    ctx.save();
    ctx.translate(px, py);
    ctx.scale(sc, sc);
    // 影
    ctx.fillStyle = 'rgba(0,0,0,0.38)';
    ctx.fillRect(5, 29, 22, 3);
    // マント（暗紫）
    ctx.fillStyle = '#2a0f3a';
    ctx.fillRect(4, 10, 24, 20);
    ctx.fillStyle = '#4a1a6a';
    ctx.fillRect(6, 11, 14, 4);
    ctx.fillStyle = '#1a0828';
    ctx.fillRect(20, 12, 8, 18);
    ctx.fillRect(5, 26, 22, 4);
    // 鎧ボディ
    ctx.fillStyle = '#221133';
    ctx.fillRect(9, 12, 14, 14);
    ctx.fillStyle = '#3a1a55';
    ctx.fillRect(10, 13, 8, 5);
    // 腕
    ctx.fillStyle = '#2a1040';
    ctx.fillRect(3, 11, 6, 12);
    ctx.fillRect(23, 11, 6, 12);
    ctx.fillStyle = '#4a1a6a';
    ctx.fillRect(3, 11, 4, 3);
    ctx.fillRect(23, 11, 4, 3);
    // 頭
    ctx.fillStyle = '#100818';
    ctx.fillRect(10, 3, 12, 10);
    ctx.fillStyle = '#1a1028';
    ctx.fillRect(11, 4, 10, 8);
    // 王冠（金）
    ctx.fillStyle = '#b89600';
    ctx.fillRect(10, 1, 12, 4);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(10, 0, 3, 3);
    ctx.fillRect(14, 0, 4, 2);
    ctx.fillRect(19, 0, 3, 3);
    ctx.fillStyle = '#d4a800';
    ctx.fillRect(10, 1, 12, 1);
    // 目（赤く輝く）
    ctx.fillStyle = '#ff1111';
    ctx.fillRect(12, 7, 3, 3);
    ctx.fillRect(17, 7, 3, 3);
    ctx.fillStyle = '#ff8888';
    ctx.fillRect(12, 7, 2, 2);
    ctx.fillRect(17, 7, 2, 2);
    // 闇オーラ
    ctx.fillStyle = 'rgba(80, 0, 120, 0.22)';
    ctx.fillRect(0, 0, 8, 32);
    ctx.fillRect(24, 0, 8, 32);
    ctx.restore();
  }

  function drawEnemy(enemy, px, py, sc = 1) {
    const img = enemyImgs[enemy.spriteKey];
    if (img && img._ready) {
      const drawW = enemy.drawW || Math.round(32 * sc);
      const drawH = enemy.drawH || Math.round(32 * sc);
      ctx.drawImage(img, px, py, drawW, drawH);
      return;
    }

    const fallbackSprite = enemy.fallbackSprite || enemy.spriteKey || enemy.sprite;
    if (fallbackSprite === 'bat') {
      drawBat(px, py, sc);
    } else if (fallbackSprite === 'goblin') {
      drawGoblin(px, py, sc);
    } else if (fallbackSprite === 'darkKnight' || fallbackSprite === 'dark_knight') {
      drawDarkKnight(px, py, sc);
    } else if (fallbackSprite === 'snake') {
      drawSlime(px, py + Math.round(8 * sc), sc);
    } else if (fallbackSprite === 'owl') {
      drawBat(px, py, sc);
    } else if (fallbackSprite === 'tree_minion') {
      drawGoblin(px, py, sc);
    } else if (fallbackSprite === 'wild_rat') {
      drawSlime(px, py + Math.round(10 * sc), sc);
    } else if (fallbackSprite === 'hornet') {
      drawBat(px, py, sc);
    } else if (fallbackSprite === 'wandering_mushroom') {
      drawSlime(px, py, sc);
    } else if (fallbackSprite === 'cave_spider') {
      drawBat(px, py + Math.round(8 * sc), sc);
    } else if (fallbackSprite === 'skeleton' || fallbackSprite === 'dark_soldier' || fallbackSprite === 'dark_mage') {
      drawGoblin(px, py, sc);
    } else if (fallbackSprite === 'dark_knight_elite') {
      drawDarkKnight(px, py, sc);
    } else if (fallbackSprite === 'demon_sorceress') {
      drawGoblin(px, py, sc);
    } else if (fallbackSprite === 'scrap_beast') {
      drawGoblin(px, py, sc);
    } else if (fallbackSprite === 'jurei') {
      drawJurei(px, py, sc);
    } else if (fallbackSprite === 'demon_general') {
      drawDemonGeneral(px, py, sc);
    } else if (fallbackSprite === 'demon_lord') {
      drawDemonLord(px, py, sc);
    } else {
      drawSlime(px, py, sc);
    }
  }

  function drawEnemySpriteOrFallback(spriteKey, fallbackSprite, px, py, sc, fallbackDrawer) {
    const img = enemyImgs[spriteKey];
    if (img && img._ready) {
      ctx.save();
      ctx.translate(px, py);
      ctx.scale(sc, sc);
      ctx.drawImage(img, 0, 0, 32, 32);
      ctx.restore();
      return true;
    }

    if (typeof fallbackDrawer === 'function') {
      fallbackDrawer();
      return false;
    }
    return false;
  }

  // ============================================================
  // スプライト描画：NPC
  //   bodyCol = 体の色、hairCol = 髪の色（NPCごとに異なる）
  // ============================================================
  function drawNPC(px, py, sc, bodyCol, hairCol, spriteKey = null, drawW = null, drawH = null) {
  drawNPCUI(
    ctx,
    px,
    py,
    sc,
    bodyCol,
    hairCol,
    spriteKey,
    drawW,
    drawH,
    getMapEntityUIDeps()
  );
}

  // ============================================================
  // タイル1枚を描画する
  // ============================================================
  // ============================================================
  // タイル描画メタ解決
  //   すべてのタイル描画は TILE_META を基点にし、マップ文脈だけをここで上書きする。
  // ============================================================
  function getTileContextKey(map = runtimeState.currentMap) {
    if (isHouseMap(map)) return 'house';
    if (map === dungeonMap) return 'dungeon';
    if (map === cursedForestMap) return 'cursedForest';
    if (map === castleMap) return 'castle';
    return 'field';
  }

  function getTileRenderMeta(tile, map = runtimeState.currentMap) {
    const baseMeta = TILE_META[tile] || TILE_META[T.GRASS];
    const contextMeta = TILE_CONTEXT_META[getTileContextKey(map)]?.[tile] || {};
    return { ...baseMeta, ...contextMeta };
  }

  function getTileImageKey(col, row) {
    return getTileRenderMeta(runtimeState.currentMap[row][col]).spriteKey || null;
  }

  // ============================================================
  // タイル画像の事前ロード（ゲーム開始時に一度だけ呼び出す）
  //   onload で ._ready = true になったものだけ drawImage で使用。
  //   ファイルが存在しない場合は onerror になるが、._ready は false のまま
  //   なので自動的に fillRect フォールバックが使われる。
  // ============================================================


  // ============================================================
  // スプライト画像の事前ロード（ゲーム開始時に一度だけ呼び出す）
  //   loadTileImages() と同じ仕組み。._ready が true になったものだけ drawImage 使用。
  // ============================================================
 

  const CUSTOM_TILE_DRAWERS = {};

  function drawTileFallback(fallbackDrawer, tileContext) {
    fallbackDrawer(tileContext);
  }

  function drawGrassTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawTreeTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawWaterTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawFlowerTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawStoneTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawChestTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawTownGateTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawDungeonGateTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawSmallRockTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawDirtPathTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCrackedFloorTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawBarrelTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCrateTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCaveRockTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCaveWallEdgeTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawDeadGrassTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawRootTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawPoisonSwampTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCursedEdgeTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCaveFloorTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCaveWallTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCaveWaterTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCaveCrystalTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawMountainTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawHouseFloorTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawHouseWallTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawHouseExitTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawHouseFurnitureTile(tileContext, fallbackDrawer) { drawTileFallback(fallbackDrawer, tileContext); }
  function drawCastleFloorTile(tileContext, fallbackDrawer) {
    const { x, y } = tileContext;
    ctx.fillStyle = '#2a2035';
    ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
    ctx.fillStyle = '#1d1826';
    const s = Math.round(TILE_RENDER / 4);
    ctx.fillRect(x, y + s * 2, TILE_RENDER, 2);
    ctx.fillRect(x + s * 2, y, 2, TILE_RENDER);
    ctx.fillStyle = '#3a2e4a';
    ctx.fillRect(x + 4, y + 4, s - 6, s - 6);
    ctx.fillRect(x + s * 2 + 4, y + s * 2 + 4, s - 6, s - 6);
  }
  function drawCastleWallTile(tileContext, fallbackDrawer) {
    const { x, y } = tileContext;
    ctx.fillStyle = '#1c1828';
    ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
    ctx.fillStyle = '#2a243a';
    const bh = Math.round(TILE_RENDER / 5);
    const bw = Math.round(TILE_RENDER / 3);
    for (let row = 0; row < 5; row++) {
      const offset = (row % 2 === 0) ? 0 : Math.round(bw / 2);
      for (let col = -1; col < 4; col++) {
        ctx.fillRect(x + col * bw + offset + 1, y + row * bh + 1, bw - 2, bh - 2);
      }
    }
  }
  function drawCastleWallEdgeTile(tileContext, fallbackDrawer) {
    const { x, y } = tileContext;
    ctx.fillStyle = '#1c1828';
    ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
    ctx.fillStyle = '#2a243a';
    ctx.fillRect(x, y, Math.round(TILE_RENDER * 0.35), TILE_RENDER);
    ctx.fillStyle = '#3a304e';
    ctx.fillRect(x + Math.round(TILE_RENDER * 0.35) - 2, y, 4, TILE_RENDER);
  }
  function drawCastleGateTile(tileContext, fallbackDrawer) {
    const { x, y } = tileContext;
    ctx.fillStyle = '#2a2035';
    ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
    const gw = Math.round(TILE_RENDER * 0.6);
    const gh = Math.round(TILE_RENDER * 0.75);
    const gx = x + Math.round((TILE_RENDER - gw) / 2);
    const gy = y + TILE_RENDER - gh;
    ctx.fillStyle = '#0d0a14';
    ctx.fillRect(gx, gy, gw, gh);
    const aw = gw; const ah = Math.round(gw / 2);
    ctx.beginPath();
    ctx.ellipse(gx + aw / 2, gy, aw / 2, ah / 2, 0, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#5a3a8a';
    ctx.fillRect(gx - 4, gy, 4, gh);
    ctx.fillRect(gx + gw, gy, 4, gh);
  }
  function drawThroneFloorTile(tileContext, fallbackDrawer) {
    const { x, y } = tileContext;
    ctx.fillStyle = '#1e1430';
    ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
    ctx.fillStyle = '#7a2020';
    const carpet = Math.round(TILE_RENDER * 0.15);
    ctx.fillRect(x + carpet, y + carpet, TILE_RENDER - carpet * 2, TILE_RENDER - carpet * 2);
    ctx.fillStyle = '#9a3030';
    ctx.fillRect(x + carpet * 2, y + carpet * 2, TILE_RENDER - carpet * 4, TILE_RENDER - carpet * 4);
    ctx.fillStyle = '#c8a020';
    ctx.fillRect(x + carpet, y + carpet, TILE_RENDER - carpet * 2, 2);
    ctx.fillRect(x + carpet, y + TILE_RENDER - carpet - 2, TILE_RENDER - carpet * 2, 2);
    ctx.fillRect(x + carpet, y + carpet, 2, TILE_RENDER - carpet * 2);
    ctx.fillRect(x + TILE_RENDER - carpet - 2, y + carpet, 2, TILE_RENDER - carpet * 2);
  }

  function drawTownRoadTile(tileContext, fallbackDrawer) {
    const { x, y } = tileContext;
    ctx.fillStyle = '#62666f';
    ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
    const p = n => Math.max(1, Math.round(n * TILE_RENDER / 32));
    ctx.fillStyle = '#747984';
    ctx.fillRect(x, y + p(2), TILE_RENDER, p(5));
    ctx.fillRect(x, y + p(14), TILE_RENDER, p(5));
    ctx.fillRect(x, y + p(26), TILE_RENDER, p(4));
    ctx.fillStyle = '#4f535c';
    ctx.fillRect(x + p(4), y + p(8), p(9), p(2));
    ctx.fillRect(x + p(18), y + p(20), p(10), p(2));
    ctx.fillRect(x + p(8), y + p(30), p(8), p(1));
  }

  function drawCustomTile(drawType, fallbackDrawer, tileContext = {}) {
    const drawer = CUSTOM_TILE_DRAWERS[drawType];
    if (typeof drawer === 'function') {
      drawer(tileContext, fallbackDrawer);
      return;
    }

    switch (drawType) {
      case 'grass': drawGrassTile(tileContext, fallbackDrawer); break;
      case 'tree': drawTreeTile(tileContext, fallbackDrawer); break;
      case 'water': drawWaterTile(tileContext, fallbackDrawer); break;
      case 'flower': drawFlowerTile(tileContext, fallbackDrawer); break;
      case 'stone': drawStoneTile(tileContext, fallbackDrawer); break;
      case 'town_road': drawTownRoadTile(tileContext, fallbackDrawer); break;
      case 'chest': drawChestTile(tileContext, fallbackDrawer); break;
      case 'town_gate': drawTownGateTile(tileContext, fallbackDrawer); break;
      case 'dungeon_gate': drawDungeonGateTile(tileContext, fallbackDrawer); break;
      case 'small_rock': drawSmallRockTile(tileContext, fallbackDrawer); break;
      case 'dirt_path': drawDirtPathTile(tileContext, fallbackDrawer); break;
      case 'cracked_floor': drawCrackedFloorTile(tileContext, fallbackDrawer); break;
      case 'barrel': drawBarrelTile(tileContext, fallbackDrawer); break;
      case 'crate': drawCrateTile(tileContext, fallbackDrawer); break;
      case 'cave_rock': drawCaveRockTile(tileContext, fallbackDrawer); break;
      case 'cave_wall_edge': drawCaveWallEdgeTile(tileContext, fallbackDrawer); break;
      case 'dead_grass': drawDeadGrassTile(tileContext, fallbackDrawer); break;
      case 'root': drawRootTile(tileContext, fallbackDrawer); break;
      case 'poison_swamp': drawPoisonSwampTile(tileContext, fallbackDrawer); break;
      case 'cursed_edge': drawCursedEdgeTile(tileContext, fallbackDrawer); break;
      case 'cave_floor': drawCaveFloorTile(tileContext, fallbackDrawer); break;
      case 'cave_wall': drawCaveWallTile(tileContext, fallbackDrawer); break;
      case 'cave_water': drawCaveWaterTile(tileContext, fallbackDrawer); break;
      case 'cave_crystal': drawCaveCrystalTile(tileContext, fallbackDrawer); break;
      case 'mountain': drawMountainTile(tileContext, fallbackDrawer); break;
      case 'house_floor': drawHouseFloorTile(tileContext, fallbackDrawer); break;
      case 'house_wall': drawHouseWallTile(tileContext, fallbackDrawer); break;
      case 'house_exit': drawHouseExitTile(tileContext, fallbackDrawer); break;
      case 'house_furniture': drawHouseFurnitureTile(tileContext, fallbackDrawer); break;
      case 'castle_floor':    drawCastleFloorTile(tileContext, fallbackDrawer); break;
      case 'castle_wall':     drawCastleWallTile(tileContext, fallbackDrawer); break;
      case 'castle_wall_edge':drawCastleWallEdgeTile(tileContext, fallbackDrawer); break;
      case 'castle_gate':     drawCastleGateTile(tileContext, fallbackDrawer); break;
      case 'throne_floor':    drawThroneFloorTile(tileContext, fallbackDrawer); break;
      default: drawTileFallback(fallbackDrawer, tileContext); break;
    }
  }

  function drawTile(col, row, camCol = 0, camRow = 0) {
    const x = Math.round((col - camCol) * TILE_RENDER);
    const y = Math.round((row - camRow) * TILE_RENDER);
    const t = runtimeState.currentMap[row][col];
    const renderMeta = getTileRenderMeta(t);
    const drawType = renderMeta.drawType;
    const useImage = renderMeta.useImage !== false;

    // ── 画像ベース描画（読み込み済みなら drawImage を優先） ────────────
    const imgKey = renderMeta.spriteKey;
    if (useImage && imgKey && tileImgs[imgKey] && tileImgs[imgKey]._ready) {
      const img = tileImgs[imgKey];
      const crop = TILE_IMAGE_EDGE_CROP;
      if (img.width > crop * 2 && img.height > crop * 2) {
        ctx.drawImage(img, crop, crop, img.width - crop * 2, img.height - crop * 2, x, y, TILE_RENDER, TILE_RENDER);
      } else {
        ctx.drawImage(img, x, y, TILE_RENDER, TILE_RENDER);
      }
      return;
    }

    drawCustomTile(renderMeta.drawType, () => {
    // ── フォールバック: 自作描画（画像が未ロード・未配置の場合） ──
    const p = n => Math.max(1, Math.round(n * TILE_RENDER / 32)); // 描画スケール関数
    const dot = (dx, dy, col) => {
      ctx.fillStyle = col;
      ctx.fillRect(x + p(dx), y + p(dy), p(1), p(1));
    };
    const isDungeon = runtimeState.currentMap === dungeonMap;
    const isHouse = isHouseMap(runtimeState.currentMap);

    const grassBase = () => {
      ctx.fillStyle = '#4f963f'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#69b85a';
      ctx.fillRect(x + p(3),  y + p(4),  p(3), p(1));
      ctx.fillRect(x + p(10), y + p(12), p(3), p(1));
      ctx.fillRect(x + p(19), y + p(5),  p(2), p(2));
      ctx.fillRect(x + p(7),  y + p(25), p(3), p(1));
      ctx.fillStyle = '#39722f';
      ctx.fillRect(x + p(18), y + p(18), p(2), p(1));
      ctx.fillRect(x + p(24), y + p(21), p(3), p(1));
      ctx.fillRect(x + p(13), y + p(27), p(2), p(1));
      ctx.fillRect(x + p(27), y + p(27), p(3), p(1));
      for (let i = 0; i < 18; i++) {
        const seed = (col * 73 + row * 97 + i * 53) & 255;
        const dx = (seed * 17 + i * 11) % 30 + 1;
        const dy = (seed * 29 + i * 7) % 30 + 1;
        const shade = dx + dy > 42 && seed % 3 !== 0 ? '#2f6429' : seed % 2 === 0 ? '#69b85a' : '#4f963f';
        dot(dx, dy, shade);
      }
    };

    // ============================================================
    // 洞窟専用タイル描画
    // ============================================================
    const caveFloor = () => {
      // 暗い岩床（通路・歩けるエリア）
      ctx.fillStyle = '#2a2824'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#353028';
      ctx.fillRect(x + p(2),   y + p(2),   p(12), p(12));
      ctx.fillRect(x + p(18),  y + p(18),  p(12), p(12));
      ctx.fillStyle = '#3f3a34';
      ctx.fillRect(x + p(3),   y + p(3),   p(4),  p(1));
      ctx.fillRect(x + p(20),  y + p(19),  p(4),  p(1));
      const s = (col * 71 + row * 89) & 255;
      if (s % 5 === 0) { ctx.fillStyle = '#221f1d'; ctx.fillRect(x + p(8),  y + p(10), p(3), p(1)); }
      if (s % 7 === 1) { ctx.fillStyle = '#1e1c1a'; ctx.fillRect(x + p(20), y + p(8),  p(2), p(2)); }
    };

    const caveWall = () => {
      // 岩壁（通れないエリア）
      ctx.fillStyle = '#1a1816'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#141210';
      ctx.fillRect(x,          y + p(20), TILE_RENDER,  p(12));
      ctx.fillStyle = '#252220';
      ctx.fillRect(x + p(3),   y + p(2),  p(26), p(18));
      ctx.fillStyle = '#2e2a28';
      ctx.fillRect(x + p(6),   y + p(4),  p(20), p(12));
      // 岩肌テクスチャ・ひび
      ctx.fillStyle = '#3a3530';
      ctx.fillRect(x + p(7),   y + p(5),  p(5),  p(2));
      ctx.fillRect(x + p(18),  y + p(10), p(6),  p(2));
      ctx.fillRect(x + p(10),  y + p(15), p(4),  p(3));
      ctx.fillStyle = '#1a1816';
      ctx.fillRect(x + p(8),   y + p(6),  p(2),  p(8));
      ctx.fillRect(x + p(20),  y + p(4),  p(2),  p(6));
      ctx.fillStyle = '#403c38';
      ctx.fillRect(x + p(9),   y + p(4),  p(3),  p(1));
      ctx.fillRect(x + p(19),  y + p(9),  p(4),  p(1));
      // 苔（暗緑）
      ctx.fillStyle = '#1c2518';
      ctx.fillRect(x + p(4),   y + p(16), p(4),  p(3));
      ctx.fillRect(x + p(22),  y + p(20), p(5),  p(3));
      dot(14, 8, '#2e2a28'); dot(24, 14, '#403c38'); dot(6, 24, '#141210');
    };

    const caveWater = () => {
      // 地下水（暗く静かな水面）
      ctx.fillStyle = '#0d1520'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#0a1018';
      ctx.fillRect(x,          y + p(24), TILE_RENDER,  p(8));
      ctx.fillStyle = '#111a28';
      ctx.fillRect(x,          y + p(2),  TILE_RENDER,  p(3));
      ctx.fillStyle = '#162030';
      ctx.fillRect(x + p(3),   y + p(7),  p(10), p(2));
      ctx.fillRect(x + p(16),  y + p(19), p(10), p(2));
      ctx.fillRect(x + p(6),   y + p(24), p(7),  p(1));
      ctx.fillStyle = '#1e2e40';
      ctx.fillRect(x + p(5),   y + p(14), p(8),  p(2));
      ctx.fillRect(x + p(18),  y + p(5),  p(5),  p(1));
      // うっすらした水面の反射
      ctx.fillStyle = '#1a3050';
      ctx.fillRect(x + p(7),   y + p(7),  p(3),  p(1));
      ctx.fillRect(x + p(20),  y + p(19), p(3),  p(1));
      dot(26, 26, '#080e16'); dot(3, 21, '#080e16'); dot(14, 13, '#1e3050');
    };

    const caveCrystal = () => {
      // 石床＋結晶クラスター
      caveFloor();
      ctx.fillStyle = '#3a4a6a';
      ctx.fillRect(x + p(12), y + p(16), p(8),  p(12));
      ctx.fillStyle = '#4a5a88';
      ctx.fillRect(x + p(13), y + p(14), p(4),  p(5));
      ctx.fillRect(x + p(19), y + p(16), p(3),  p(4));
      ctx.fillStyle = '#6070aa';
      ctx.fillRect(x + p(14), y + p(11), p(3),  p(5));
      ctx.fillRect(x + p(18), y + p(13), p(2),  p(5));
      ctx.fillStyle = '#8090cc';
      ctx.fillRect(x + p(15), y + p(9),  p(2),  p(4));
      // 結晶ハイライト
      ctx.fillStyle = '#aab8ee';
      ctx.fillRect(x + p(15), y + p(9),  p(1),  p(2));
      ctx.fillRect(x + p(18), y + p(13), p(1),  p(1));
      // 小石
      ctx.fillStyle = '#4a4540';
      ctx.fillRect(x + p(4),  y + p(20), p(3),  p(2));
      ctx.fillRect(x + p(24), y + p(22), p(3),  p(2));
      ctx.fillStyle = '#5a5550';
      ctx.fillRect(x + p(4),  y + p(20), p(2),  p(1));
    };

    const houseFloor = () => {
      ctx.fillStyle = '#6a4a28'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#7a5630';
      ctx.fillRect(x, y + p(15), TILE_RENDER, p(1));
      ctx.fillStyle = '#4a321d';
      ctx.fillRect(x + p(15), y, p(1), TILE_RENDER);
    };

    const houseWall = () => {
      ctx.fillStyle = '#3a2418'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#5a3520';
      ctx.fillRect(x + p(2), y + p(2), p(28), p(28));
      ctx.fillStyle = '#2a1810';
      ctx.fillRect(x, y + p(24), TILE_RENDER, p(8));
      ctx.fillStyle = '#7a4a2a';
      ctx.fillRect(x + p(4), y + p(5), p(24), p(3));
      ctx.fillRect(x + p(4), y + p(14), p(24), p(3));
    };

    const houseExit = () => {
      houseFloor();
      ctx.fillStyle = '#2b1a0c';
      ctx.fillRect(x + p(7), y + p(8), p(18), p(22));
      ctx.fillStyle = '#553311';
      ctx.fillRect(x + p(8), y + p(9), p(16), p(21));
      ctx.fillStyle = '#7a4a20';
      ctx.fillRect(x + p(9), y + p(10), p(6), p(3));
      ctx.fillStyle = '#e0b84a';
      ctx.fillRect(x + p(20), y + p(19), p(2), p(2));
    };

    const stoneBase = () => {
      if (isHouse) {
        houseFloor();
      } else if (isDungeon) {
        caveFloor();
      } else {
        ctx.fillStyle = '#8a8070'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
        ctx.fillStyle = '#9e9080';
        ctx.fillRect(x + p(2), y + p(2), p(12), p(12));
        ctx.fillRect(x + p(18), y + p(18), p(12), p(12));
        ctx.fillStyle = '#7c7268';
        ctx.fillRect(x + p(3), y + p(13), p(10), p(1));
        ctx.fillRect(x + p(19), y + p(29), p(8), p(1));
        ctx.fillRect(x + p(29), y + p(19), p(1), p(9));
        ctx.fillStyle = '#b0a090';
        ctx.fillRect(x + p(4), y + p(3), p(5), p(1));
        ctx.fillRect(x + p(20), y + p(19), p(5), p(1));
      }
    };

    const dirtPath = () => {
      ctx.fillStyle = '#8a6f3e'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#a1844d';
      ctx.fillRect(x + p(2), y + p(2), p(28), p(28));
      ctx.fillStyle = '#6f5732';
      ctx.fillRect(x + p(4), y + p(9), p(9), p(2));
      ctx.fillRect(x + p(18), y + p(21), p(8), p(2));
      ctx.fillStyle = '#b8965a';
      ctx.fillRect(x + p(8), y + p(4), p(4), p(1));
      ctx.fillRect(x + p(22), y + p(14), p(5), p(1));
    };

    const smallRock = () => {
      grassBase();
      ctx.fillStyle = '#5d5d58';
      ctx.fillRect(x + p(12), y + p(17), p(9), p(6));
      ctx.fillStyle = '#77776f';
      ctx.fillRect(x + p(13), y + p(15), p(7), p(5));
      ctx.fillStyle = '#9a9a90';
      ctx.fillRect(x + p(14), y + p(16), p(3), p(1));
      ctx.fillStyle = '#44443f';
      ctx.fillRect(x + p(17), y + p(21), p(4), p(2));
    };

    const crackedFloor = () => {
      caveFloor();
      ctx.fillStyle = '#171513';
      ctx.fillRect(x + p(8), y + p(9), p(7), p(1));
      ctx.fillRect(x + p(14), y + p(10), p(1), p(6));
      ctx.fillRect(x + p(15), y + p(15), p(8), p(1));
      ctx.fillRect(x + p(22), y + p(16), p(1), p(5));
      ctx.fillStyle = '#4a443e';
      ctx.fillRect(x + p(6), y + p(24), p(5), p(1));
    };

    const barrel = () => {
      stoneBase();
      ctx.fillStyle = '#4a2a16';
      ctx.fillRect(x + p(10), y + p(11), p(12), p(16));
      ctx.fillStyle = '#7a4720';
      ctx.fillRect(x + p(11), y + p(9), p(10), p(18));
      ctx.fillStyle = '#a0602a';
      ctx.fillRect(x + p(13), y + p(10), p(5), p(16));
      ctx.fillStyle = '#2d1a0d';
      ctx.fillRect(x + p(10), y + p(13), p(12), p(2));
      ctx.fillRect(x + p(10), y + p(22), p(12), p(2));
    };

    const crate = () => {
      stoneBase();
      ctx.fillStyle = '#5a351b';
      ctx.fillRect(x + p(8), y + p(11), p(16), p(16));
      ctx.fillStyle = '#8a5628';
      ctx.fillRect(x + p(9), y + p(12), p(14), p(14));
      ctx.fillStyle = '#b27a3a';
      ctx.fillRect(x + p(10), y + p(13), p(12), p(2));
      ctx.fillStyle = '#4a2a15';
      ctx.fillRect(x + p(15), y + p(12), p(2), p(14));
      ctx.fillRect(x + p(9), y + p(19), p(14), p(2));
    };

    const caveRock = () => {
      caveWall();
      ctx.fillStyle = '#201d1a';
      ctx.fillRect(x + p(5), y + p(15), p(22), p(12));
      ctx.fillStyle = '#34302c';
      ctx.fillRect(x + p(7), y + p(10), p(18), p(14));
      ctx.fillStyle = '#4a433d';
      ctx.fillRect(x + p(10), y + p(11), p(7), p(2));
      ctx.fillRect(x + p(18), y + p(17), p(5), p(2));
    };

    const caveWallEdge = () => {
      caveWall();
      ctx.fillStyle = '#403a34';
      ctx.fillRect(x + p(3), y + p(24), p(26), p(4));
      ctx.fillStyle = '#211e1b';
      ctx.fillRect(x + p(6), y + p(27), p(20), p(3));
    };

    const deadGrass = () => {
      ctx.fillStyle = '#5f6a35'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#7b7740';
      ctx.fillRect(x + p(4), y + p(8), p(5), p(1));
      ctx.fillRect(x + p(16), y + p(14), p(4), p(1));
      ctx.fillRect(x + p(22), y + p(24), p(5), p(1));
      ctx.fillStyle = '#3f4b28';
      ctx.fillRect(x + p(9), y + p(22), p(4), p(1));
    };

    const root = () => {
      deadGrass();
      ctx.fillStyle = '#4a2d18';
      ctx.fillRect(x + p(4), y + p(17), p(12), p(3));
      ctx.fillRect(x + p(14), y + p(18), p(10), p(2));
      ctx.fillRect(x + p(20), y + p(15), p(6), p(2));
      ctx.fillStyle = '#6a4324';
      ctx.fillRect(x + p(6), y + p(17), p(8), p(1));
    };

    const poisonSwamp = () => {
      ctx.fillStyle = '#26351f'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#394d25';
      ctx.fillRect(x + p(2), y + p(6), p(28), p(19));
      ctx.fillStyle = '#5f7f2b';
      ctx.fillRect(x + p(5), y + p(10), p(8), p(2));
      ctx.fillRect(x + p(18), y + p(18), p(7), p(2));
      ctx.fillStyle = '#9fca44';
      ctx.fillRect(x + p(11), y + p(14), p(2), p(2));
      ctx.fillRect(x + p(24), y + p(9), p(2), p(2));
    };

    const cursedEdge = () => {
      ctx.fillStyle = '#30351f'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#222818';
      ctx.fillRect(x, y + p(22), TILE_RENDER, p(10));
      ctx.fillStyle = '#485229';
      ctx.fillRect(x + p(3), y + p(5), p(26), p(18));
      ctx.fillStyle = '#5f7f2b';
      ctx.fillRect(x + p(5), y + p(18), p(9), p(2));
      ctx.fillRect(x + p(19), y + p(9), p(7), p(2));
      ctx.fillStyle = '#1b2115';
      ctx.fillRect(x + p(4), y + p(23), p(24), p(3));
      ctx.fillRect(x + p(8), y + p(14), p(4), p(1));
      ctx.fillRect(x + p(21), y + p(20), p(5), p(1));
      ctx.fillStyle = '#8fb43c';
      ctx.fillRect(x + p(12), y + p(10), p(2), p(2));
      ctx.fillRect(x + p(24), y + p(15), p(1), p(1));
    };

    const mountain = () => {
      ctx.fillStyle = '#3f4a3c'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
      ctx.fillStyle = '#2f382f';
      ctx.fillRect(x, y + p(24), TILE_RENDER, p(8));
      ctx.fillStyle = '#59624f';
      ctx.fillRect(x + p(2),  y + p(18), p(28), p(9));
      ctx.fillRect(x + p(6),  y + p(11), p(20), p(10));
      ctx.fillRect(x + p(11), y + p(5),  p(10), p(9));
      ctx.fillStyle = '#737b67';
      ctx.fillRect(x + p(8),  y + p(12), p(6), p(3));
      ctx.fillRect(x + p(13), y + p(6),  p(4), p(2));
      ctx.fillStyle = '#263026';
      ctx.fillRect(x + p(4),  y + p(25), p(9), p(2));
      ctx.fillRect(x + p(18), y + p(22), p(8), p(3));
    };

    if (drawType === 'small_rock') {
      smallRock();
    } else if (drawType === 'dirt_path') {
      dirtPath();
    } else if (drawType === 'cracked_floor') {
      crackedFloor();
    } else if (drawType === 'barrel') {
      barrel();
    } else if (drawType === 'crate') {
      crate();
    } else if (drawType === 'cave_rock') {
      caveRock();
    } else if (drawType === 'cave_wall_edge') {
      caveWallEdge();
    } else if (drawType === 'dead_grass') {
      deadGrass();
    } else if (drawType === 'root') {
      root();
    } else if (drawType === 'poison_swamp') {
      poisonSwamp();
    } else if (drawType === 'cursed_edge') {
      cursedEdge();
    } else if (drawType === 'mountain') {
      mountain();
    } else if (drawType === 'tree' || drawType === 'house_wall' || drawType === 'cave_wall') {
      if (drawType === 'house_wall') {
        houseWall();
      } else if (drawType === 'cave_wall') {
        caveWall();
      } else {
        grassBase();
        ctx.fillStyle = '#5c4033'; ctx.fillRect(x + p(13), y + p(19), p(6), p(13));
        ctx.fillStyle = '#7a543d'; ctx.fillRect(x + p(15), y + p(20), p(2), p(10));
        ctx.fillStyle = '#3b261d'; ctx.fillRect(x + p(13), y + p(24), p(1), p(6));
        ctx.fillStyle = '#2d5a1b'; ctx.fillRect(x + p(6),  y + p(14), p(20), p(12));
        ctx.fillStyle = '#3a7222'; ctx.fillRect(x + p(8),  y + p(8),  p(16), p(11));
        ctx.fillStyle = '#4a8c2a'; ctx.fillRect(x + p(11), y + p(4),  p(10), p(8));
        ctx.fillStyle = '#1f4315';
        ctx.fillRect(x + p(7),  y + p(20), p(4), p(2));
        ctx.fillRect(x + p(20), y + p(18), p(4), p(2));
        ctx.fillRect(x + p(10), y + p(11), p(3), p(2));
        ctx.fillStyle = '#5ca83a';
        ctx.fillRect(x + p(12), y + p(6),  p(3), p(2));
        ctx.fillRect(x + p(16), y + p(10), p(4), p(2));
        ctx.fillRect(x + p(9),  y + p(16), p(5), p(2));
        dot(23, 13, '#5ca83a'); dot(18, 5, '#6fbd47'); dot(14, 23, '#244f18');
      }

    } else if (drawType === 'water' || drawType === 'cave_water') {
      if (drawType === 'cave_water') {
        caveWater();
      } else {
        ctx.fillStyle = '#1a4488'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
        ctx.fillStyle = '#173a75';
        ctx.fillRect(x, y + p(26), TILE_RENDER, p(6));
        ctx.fillStyle = '#1f4f9d';
        ctx.fillRect(x, y + p(3), TILE_RENDER, p(3));
        ctx.fillStyle = '#2255aa';
        ctx.fillRect(x + p(2),  y + p(8),  p(13), p(2));
        ctx.fillRect(x + p(16), y + p(20), p(12), p(2));
        ctx.fillRect(x + p(5),  y + p(25), p(9),  p(1));
        ctx.fillRect(x + p(22), y + p(12), p(7),  p(1));
        ctx.fillStyle = '#3377cc';
        ctx.fillRect(x + p(4),  y + p(16), p(9), p(2));
        ctx.fillRect(x + p(18), y + p(6),  p(6), p(1));
        ctx.fillRect(x + p(10), y + p(29), p(8), p(1));
        ctx.fillStyle = '#6aa7e8';
        ctx.fillRect(x + p(6),  y + p(8),  p(4), p(1));
        ctx.fillRect(x + p(20), y + p(20), p(4), p(1));
        dot(27, 27, '#0f2f66'); dot(2, 22, '#0f2f66'); dot(14, 14, '#6aa7e8');
      }

    } else if (drawType === 'flower' || drawType === 'cave_crystal') {
      if (drawType === 'cave_crystal') {
        caveCrystal();
      } else {
        grassBase();
        ctx.fillStyle = '#5aa84e';
        ctx.fillRect(x + p(4),  y + p(6),  p(2), p(2));
        ctx.fillRect(x + p(20), y + p(20), p(2), p(2));
        ctx.fillStyle = '#3a6e30'; ctx.fillRect(x + p(15), y + p(18), p(2), p(8));
        ctx.fillStyle = '#c93f82';
        ctx.fillRect(x + p(11), y + p(12), p(4), p(4));
        ctx.fillRect(x + p(17), y + p(12), p(4), p(4));
        ctx.fillRect(x + p(14), y + p(9),  p(4), p(4));
        ctx.fillRect(x + p(14), y + p(15), p(4), p(4));
        ctx.fillStyle = '#ff66aa';
        ctx.fillRect(x + p(11), y + p(12), p(3), p(3));
        ctx.fillRect(x + p(17), y + p(12), p(3), p(3));
        ctx.fillRect(x + p(14), y + p(9),  p(3), p(3));
        ctx.fillRect(x + p(14), y + p(15), p(3), p(3));
        ctx.fillStyle = '#ff99c8';
        ctx.fillRect(x + p(11), y + p(12), p(2), p(1));
        ctx.fillRect(x + p(17), y + p(12), p(2), p(1));
        ctx.fillRect(x + p(14), y + p(9),  p(2), p(1));
        ctx.fillRect(x + p(14), y + p(15), p(2), p(1));
        ctx.fillStyle = '#d6b800'; ctx.fillRect(x + p(14), y + p(12), p(4), p(4));
        ctx.fillStyle = '#ffee00'; ctx.fillRect(x + p(14), y + p(12), p(3), p(2));
      }

    } else if (drawType === 'stone' || drawType === 'house_floor' || drawType === 'cave_floor') {
      if (drawType === 'house_floor') {
        houseFloor();
      } else if (drawType === 'cave_floor') {
        caveFloor();
      } else {
        // 石畳（街の床）
        ctx.fillStyle = '#8a8070'; ctx.fillRect(x, y, TILE_RENDER, TILE_RENDER);
        ctx.fillStyle = '#9e9080';
        ctx.fillRect(x + p(2),   y + p(2),   p(12), p(12));
        ctx.fillRect(x + p(18),  y + p(18),  p(12), p(12));
        ctx.fillStyle = '#7c7268';
        ctx.fillRect(x + p(3),   y + p(13),  p(10), p(1));
        ctx.fillRect(x + p(19),  y + p(29),  p(8),  p(1));
        ctx.fillRect(x + p(29),  y + p(19),  p(1),  p(9));
        ctx.fillStyle = '#b0a090';
        ctx.fillRect(x + p(4),   y + p(3),   p(5),  p(1));
        ctx.fillRect(x + p(20),  y + p(19),  p(5),  p(1));
        dot(12, 5, '#b0a090'); dot(25, 24, '#6a6058'); dot(6, 24, '#6a6058');
      }

    } else if (drawType === 'town_gate' || drawType === 'house_exit') {
      if (drawType === 'house_exit') {
        houseExit();
      } else {
        // 街入口（変更なし）
        grassBase();
        ctx.fillStyle = '#8a8070';
        ctx.fillRect(x + p(4),  y + p(11), p(24), p(17));
        ctx.fillStyle = '#6a6058';
        ctx.fillRect(x + p(4),  y + p(10), p(24), p(3));
        ctx.fillRect(x + p(6),  y + p(8),  p(5),  p(5));
        ctx.fillRect(x + p(21), y + p(8),  p(5),  p(5));
        ctx.fillStyle = '#9e9080';
        ctx.fillRect(x + p(7),  y + p(12), p(4),  p(4));
        ctx.fillRect(x + p(21), y + p(12), p(4),  p(4));
        ctx.fillStyle = '#2b1a0c';
        ctx.fillRect(x + p(12), y + p(17), p(8),  p(11));
        ctx.fillStyle = '#553311';
        ctx.fillRect(x + p(12), y + p(17), p(7),  p(10));
        ctx.fillStyle = '#7a4a20';
        ctx.fillRect(x + p(12), y + p(17), p(3),  p(2));
        ctx.fillStyle = '#2b1a0c';
        ctx.fillRect(x + p(15), y + p(17), p(2),  p(11));
        ctx.fillRect(x + p(18), y + p(24), p(2),  p(4));
        ctx.fillStyle = '#ffd700';
        ctx.fillRect(x + p(18), y + p(21), p(1),  p(2));
      }

    } else if (drawType === 'dungeon_gate') {
      // ダンジョン入口（変更なし）
      grassBase();
      ctx.fillStyle = '#4b4b52';
      ctx.fillRect(x + p(5),  y + p(12), p(22), p(15));
      ctx.fillStyle = '#33333a';
      ctx.fillRect(x + p(8),  y + p(9),  p(16), p(8));
      ctx.fillStyle = '#16161d';
      ctx.fillRect(x + p(9),  y + p(14), p(14), p(14));
      ctx.fillRect(x + p(11), y + p(11), p(10), p(5));
      ctx.fillStyle = '#66666e';
      ctx.fillRect(x + p(6),  y + p(13), p(5),  p(3));
      ctx.fillRect(x + p(21), y + p(13), p(5),  p(3));
      ctx.fillRect(x + p(7),  y + p(23), p(4),  p(2));
      ctx.fillStyle = '#24242b';
      ctx.fillRect(x + p(13), y + p(19), p(6),  p(9));
      ctx.fillStyle = '#2a2438';
      ctx.fillRect(x + p(11), y + p(15), p(10), p(3));
      ctx.fillRect(x + p(14), y + p(20), p(4),  p(5));

    } else if (drawType === 'house_furniture') {
      houseFloor();
      ctx.fillStyle = '#3a2418';
      ctx.fillRect(x + p(3), y + p(9), p(26), p(14));
      ctx.fillStyle = '#704820';
      ctx.fillRect(x + p(4), y + p(8), p(24), p(12));
      ctx.fillStyle = '#9a6a35';
      ctx.fillRect(x + p(5), y + p(9), p(22), p(3));
      ctx.fillStyle = '#2a1810';
      ctx.fillRect(x + p(6), y + p(21), p(4), p(8));
      ctx.fillRect(x + p(22), y + p(21), p(4), p(8));

    } else {
      // 草（GRASS） — ダンジョンでは暗い石床
      if (isHouse) {
        houseFloor();
      } else if (isDungeon) {
        caveFloor();
      } else {
        grassBase();
      }
    }

    }, { col, row, x, y, tile: t, drawType: renderMeta.drawType, spriteKey: renderMeta.spriteKey });

  }

  // ============================================================
  // NPC ユーティリティ
  // ============================================================
  function getCurrentNpcs() {
    return getCurrentMapDef().npcs || [];
  }

  function isShopAvailable() {
    return currentState === GameState.SHOP && !!talkNpc && getNpcRole(talkNpc) === 'shop';
  }

  // ============================================================
  // エンティティ管理
  // ============================================================
  function isColliding(a, b) {
    return a.x < b.x + b.w
      && a.x + a.w > b.x
      && a.y < b.y + b.h
      && a.y + a.h > b.y;
  }

  function centeredBottomHitbox(w, h, wRatio = FOOT_HITBOX.wRatio, hRatio = FOOT_HITBOX.hRatio) {
    const hitW = Math.round(w * wRatio);
    const hitH = Math.round(h * hRatio);
    return {
      x: Math.round((w - hitW) / 2),
      y: h - hitH,
      w: hitW,
      h: hitH,
    };
  }

  function entranceHitbox(w, h) {
    const hitW = Math.round(w * ENTRANCE_HITBOX.wRatio);
    const hitH = Math.round(h * ENTRANCE_HITBOX.hRatio);
    return {
      x: Math.round((w - hitW) / 2),
      y: h - hitH,
      w: hitW,
      h: hitH,
    };
  }

  function getCollisionBox(entity, x = entity.x, y = entity.y) {
    const hitbox = entity.hitbox || { x: 0, y: 0, w: entity.w, h: entity.h };
    return {
      x: x + hitbox.x,
      y: y + hitbox.y,
      w: hitbox.w,
      h: hitbox.h,
    };
  }

  function heroInteractionBox() {
    const box = getCollisionBox(hero);
    const reach = 16;
    if (hero.dir === 'up')    return { x: box.x, y: box.y - reach, w: box.w, h: box.h + reach };
    if (hero.dir === 'down')  return { x: box.x, y: box.y, w: box.w, h: box.h + reach };
    if (hero.dir === 'left')  return { x: box.x - reach, y: box.y, w: box.w + reach, h: box.h };
    if (hero.dir === 'right') return { x: box.x, y: box.y, w: box.w + reach, h: box.h };
    return box;
  }

  function drawNpcAlert(npcSX, npcSY) {
    const bs = NPC_SC;
    const bx = npcSX + NPC_OFF.x + Math.round(12 * bs);
    const by = npcSY + NPC_OFF.y  - Math.round(8  * bs);
    ctx.fillStyle = '#ffffcc';
    ctx.fillRect(bx - 2 * bs, by - 2 * bs, 10 * bs, 11 * bs);
    ctx.fillStyle = '#884400';
    ctx.fillRect(bx,          by,           6 * bs, 4 * bs);
    ctx.fillRect(bx,          by + 5 * bs,  6 * bs, 2 * bs);
    ctx.fillRect(bx,          by + 8 * bs,  6 * bs, 2 * bs);
  }

  function drawSign(px, py, size = 56) {
    const img = signImgs.sign;
    if (img && img._ready) {
      ctx.drawImage(img, px, py, size, size);
      return;
    }

    const p = n => Math.max(1, Math.round(n * size / 32));
    ctx.fillStyle = '#4d2b15';
    ctx.fillRect(px + p(14), py + p(18), p(4), p(10));
    ctx.fillRect(px + p(11), py + p(26), p(10), p(3));

    ctx.fillStyle = '#6f3f1d';
    ctx.fillRect(px + p(5), py + p(7), p(22), p(13));
    ctx.fillStyle = '#9a6332';
    ctx.fillRect(px + p(6), py + p(8), p(20), p(11));
    ctx.fillStyle = '#c58b4a';
    ctx.fillRect(px + p(8), py + p(10), p(16), p(2));
    ctx.fillRect(px + p(9), py + p(14), p(14), p(2));
    ctx.fillStyle = '#3a2110';
    ctx.fillRect(px + p(5), py + p(7), p(22), p(2));
    ctx.fillRect(px + p(5), py + p(18), p(22), p(2));
  }

  function drawSignEntity(sign) {
    const camX = renderCamera.col * TILE_RENDER;
    const camY = renderCamera.row * TILE_RENDER;
    const screenX = Math.round(sign.x - camX);
    const screenY = Math.round(sign.y - camY);
    const signSize = sign.drawW || sign.drawH || DEFAULT_SIGN_DRAW_SIZE;
    if (screenX < -signSize || screenX > VIEW_W || screenY < -signSize || screenY > VIEW_H) return;

    const drawX = screenX + Math.round((TILE_RENDER - signSize) / 2);
    const drawY = screenY + TILE_RENDER - signSize;
    drawSign(drawX, drawY, signSize);
  }

  function getDecorImageKey(kind) {
    const keyMap = {
      flower: 'flower',
      flower_red: 'flower_red',
      small_rock: 'small_rock',
      rock_cluster: 'rock_cluster',
      barrel: 'barrel',
      crate: 'crate',
      torch: 'torch',
      root: 'root',
      dead_tree: 'dead_tree',
      dead_tree_dark: 'dead_tree_dark',
      campfire_ash: 'campfire_ash',
      throne:       'throne',
      dark_crystal: 'dark_crystal',
      dark_pillar:  'dark_pillar',
      iron_door:    'iron_door',
      demon_altar:  'demon_altar',
      forest_entrance: 'forest_entrance',
    };
    return keyMap[kind] || kind;
  }

  const DECOR_DRAW_SIZES = {
    flower:     { w: 72,  h: 72 },
    small_rock: { w: 88,  h: 76 },
    barrel:     { w: 104, h: 116 },
    crate:      { w: 108, h: 108 },
    torch:      { w: 96,  h: 112 },
    root:       { w: 88,  h: 64 },
    campfire_ash: { w: 72, h: 48 },
    rock_cluster: { w: 104, h: 84 },
    dead_tree: { w: 112, h: 132 },
    dead_tree_dark: { w: 112, h: 132 },
    flower_red:   { w: 72,  h: 72 },
    throne:       { w: 128, h: 160 },
    dark_crystal: { w: 80,  h: 112 },
    dark_pillar:  { w: 72,  h: 160 },
    iron_door:    { w: 96,  h: 128 },
    demon_altar:  { w: 112, h: 96 },
    forest_entrance: { w: 256, h: 320 },
  };

  function getDecorDrawSize(kind, decor = {}) {
    const fallback = DECOR_DRAW_SIZES[kind] || { w: decor.size || 72, h: decor.size || 72 };
    const scale = Number.isFinite(decor.scale) ? decor.scale : 1;
    return {
      w: decor.drawW || Math.round(fallback.w * scale),
      h: decor.drawH || Math.round(fallback.h * scale),
    };
  }

  function getGroundedTileDrawRect(entity, drawW, drawH) {
    const camX = renderCamera.col * TILE_RENDER;
    const camY = renderCamera.row * TILE_RENDER;
    const tileSX = Math.round(entity.x - camX);
    const tileSY = Math.round(entity.y - camY);
    return {
      tileSX,
      tileSY,
      x: tileSX + Math.round((TILE_RENDER - drawW) / 2) + (entity.offsetX || 0),
      y: tileSY + TILE_RENDER - drawH + (entity.offsetY || 0),
    };
  }

function drawDecorFallback(kind, px, py, drawW, drawH) {
  drawDecorFallbackUI(ctx, kind, px, py, drawW, drawH);
}

function drawDecorEntity(decor) {
  drawDecorEntityUI(ctx, decor, getMapEntityUIDeps());
}

function drawCustomObject(kind, px, py, drawW, drawH, object = {}) {
  drawCustomObjectUI(ctx, kind, px, py, drawW, drawH, object);
}

function drawObject(kind, px, py, drawW, drawH, object = {}) {
  drawObjectUI(ctx, kind, px, py, drawW, drawH, object, getMapEntityUIDeps());
}

  function getHouseDrawRect(house) {
    const camX = renderCamera.col * TILE_RENDER;
    const camY = renderCamera.row * TILE_RENDER;
    const tileSX = Math.round(house.x - camX);
    const tileSY = Math.round(house.y - camY);
    return {
      tileSX,
      tileSY,
      x: tileSX + Math.round((TILE_RENDER - house.drawW) / 2) + (house.offsetX || 0),
      y: tileSY - house.drawH + (house.offsetY || 0),
    };
  }

  function makeHouseHitbox(drawW, drawH) {
    const hitW = Math.round(drawW * 0.60);
    const hitH = Math.round(drawH * 0.35) + 100;
    const doorClearance = Math.round(TILE_RENDER * 0.16);
    return {
      x: Math.round((TILE_RENDER - hitW) / 2),
      y: -hitH - doorClearance,
      w: hitW,
      h: hitH,
    };
  }

 function drawHouseFallback(house, px, py, drawW, drawH) {
  drawHouseFallbackUI(ctx, house, px, py, drawW, drawH);
}

function drawHouseEntity(house) {
  drawHouseEntityUI(ctx, house, getMapEntityUIDeps());
}

 function drawDebugRect(rect, color, camX, camY) {
  drawDebugRectUI(ctx, rect, color, camX, camY);
}

function drawDebugHitboxes(camX, camY) {
  drawDebugHitboxesUI(ctx, {
    DEBUG_HITBOX,
    entities,
    hero,
    getCollisionBox,
    camX,
    camY,
  });
}

function chestFlagKey(id) {
  return chestFlagKeySystem(id);
}

function chestImageKey(chest) {
  return chestImageKeySystem(chest, flags);
}

function getMapEntityUIDeps() {
  return {
    DEFAULT_CHEST_DRAW_SIZE,
    getGroundedTileDrawRect,
    getHouseDrawRect,
    getDecorDrawSize,
    VIEW_W,
    VIEW_H,
    flags,
    objectImgs,
    tileImgs,
    npcImgs,
    spriteImgs,
    chestImageKey,
    getDecorImageKey,
    shadeHex,
  };
}

  function drawChestFallback(px, py, drawW, drawH, opened) {
  drawChestFallbackUI(ctx, px, py, drawW, drawH, opened);
}

function drawChestEntity(chest) {
  drawChestEntityUI(ctx, chest, getMapEntityUIDeps());
}

  function normalizeChestItemId(item) {
  return normalizeChestItemIdSystem(item);
}

  function getChestSystemDeps() {
  return {
    hero,
    flags,
    WEAPONS,
    ARMORS,
    changeItemCount,
    grantEquipmentToActor,
    normalizeChestItemId,
  };
}

function grantChestReward(reward) {
  return grantChestRewardSystem(reward, getChestSystemDeps());
}
   

  function getLeafaAlly() {
    return allies.find(a => a.id === 'leafa' && a.flags && a.flags.hasAlly) || null;
  }

  function grantEquipmentToActor(itemId, kind) {
    const item = kind === 'weapon' ? WEAPONS[itemId] : ARMORS[itemId];
    if (!item) return false;
    const ownerKey = item.allowedUsers && item.allowedUsers.includes('leafa') && !item.allowedUsers.includes('hero')
      ? 'leafa'
      : 'hero';
    if (ownerKey === 'leafa') {
      const leafa = getLeafaAlly();
      if (!leafa) return false;
      if (kind === 'weapon') {
        if (!Array.isArray(leafa.weaponsOwned)) leafa.weaponsOwned = [];
        if (!leafa.weaponsOwned.includes(itemId)) leafa.weaponsOwned.push(itemId);
      } else {
        if (!Array.isArray(leafa.armorsOwned)) leafa.armorsOwned = [];
        if (!leafa.armorsOwned.includes(itemId)) leafa.armorsOwned.push(itemId);
      }
      return true;
    }
    if (kind === 'weapon') {
      if (!hero.weaponsOwned.includes(itemId)) hero.weaponsOwned.push(itemId);
    } else {
      if (!hero.armorsOwned.includes(itemId)) hero.armorsOwned.push(itemId);
    }
    return true;
  }

 function grantChestRewards(chest) {
  return grantChestRewardsSystem(chest, grantChestReward);
}

  function drawHeroEntity() {
    const camCol = renderCamera.col;
    const camRow = renderCamera.row;
    const heroSX = Math.round(hero.drawX - camCol * TILE_RENDER);
    const heroSY = Math.round(hero.drawY - camRow * TILE_RENDER);
    drawHeroAtFoot(heroSX + TILE_RENDER / 2, heroSY + TILE_RENDER - 4);
  }

  function resolveEntityDrawSize(entityDef, defaultW, defaultH = defaultW) {
    const scale = Number.isFinite(entityDef.scale) ? entityDef.scale : 1;
    return {
      w: entityDef.drawW || Math.round(defaultW * scale),
      h: entityDef.drawH || Math.round(defaultH * scale),
    };
  }

  function makeNpcEntity(npc) {
    const npcDrawSize = resolveEntityDrawSize(npc, DEFAULT_NPC_DRAW_W, DEFAULT_NPC_DRAW_H);
    return {
      type: 'npc',
      source: npc,
      x: tileToPx(npc.x) + (npc.offsetX || 0),
      y: tileToPx(npc.y) + (npc.offsetY || 0),
      w: TILE_RENDER,
      h: TILE_RENDER,
      hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER),
      blocking: true,
      drawW: npcDrawSize.w,
      drawH: npcDrawSize.h,
      update() {},
      draw() {
        const camCol = renderCamera.col;
        const camRow = renderCamera.row;
        const npcSX = Math.round(this.x - camCol * TILE_RENDER);
        const npcSY = Math.round(this.y - camRow * TILE_RENDER);
        const drawW = this.drawW;
        const drawH = this.drawH;
        if (npcSX < -drawW || npcSX > VIEW_W || npcSY < -drawH || npcSY > VIEW_H) return;
        const drawX = npcSX + Math.round((TILE_RENDER - drawW) / 2);
        const drawY = npcSY + TILE_RENDER - drawH;
        drawNPC(drawX, drawY, NPC_SC, npc.bodyCol, npc.hairCol, npc.spriteKey, drawW, drawH);
      },
      interact() {
        if (getNpcRole(npc) === 'shop') openShop(npc);
        else openDialogue(npc);
      },
    };
  }

  function makeEnemyNpcEntity(enemyNpc) {
    const enemyDrawSize = resolveEntityDrawSize(enemyNpc, 130, 130);
    return {
      type: 'enemy_npc',
      source: enemyNpc,
      x: tileToPx(enemyNpc.x) + (enemyNpc.offsetX || 0),
      y: tileToPx(enemyNpc.y) + (enemyNpc.offsetY || 0),
      w: TILE_RENDER,
      h: TILE_RENDER,
      hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER),
      blocking: true,
      drawW: enemyDrawSize.w,
      drawH: enemyDrawSize.h,
      update() {},
      draw() {
        const camCol = renderCamera.col;
        const camRow = renderCamera.row;
        const sx = Math.round(this.x - camCol * TILE_RENDER);
        const sy = Math.round(this.y - camRow * TILE_RENDER);
        const drawW = this.drawW;
        const drawH = this.drawH;
        if (sx < -drawW || sx > VIEW_W || sy < -drawH || sy > VIEW_H) return;
        const drawX = sx + Math.round((TILE_RENDER - drawW) / 2) + (enemyNpc.offsetX || 0);
        const drawY = sy + TILE_RENDER - drawH + (enemyNpc.offsetY || 0);
        drawEnemy({
          spriteKey: enemyNpc.spriteKey,
          fallbackSprite: enemyNpc.fallbackSprite || enemyNpc.spriteKey,
          drawW,
          drawH,
        }, drawX, drawY, drawW / 32);
      },
    };
  }

  function makeHouseEntity(x, y, spriteKey = 'house', width = 256, height = 240, options = {}) {
    return {
      type: 'house',
      spriteKey,
      variant: options.variant || 'house',
      x: tileToPx(x),
      y: tileToPx(y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      drawW: width,
      drawH: height,
      offsetX: options.offsetX || 0,
      offsetY: options.offsetY || 0,
      hitbox: options.hitbox || makeHouseHitbox(width, height),
      blocking: true,
      update() {},
      draw() { drawHouseEntity(this); },
    };
  }

  function makeChestEntity(x, y, options = {}) {
    const id = options.id || `chest_${x}_${y}`;
    const flagKey = options.flagKey || chestFlagKey(id);
    return {
      type: 'chest',
      id,
      item: options.item,
      amount: options.amount,
      rewards: options.rewards,
      spriteKey: options.spriteKey || 'chest',
      drawW: options.drawW || Math.round(DEFAULT_CHEST_DRAW_SIZE * (options.scale || 1)),
      drawH: options.drawH || Math.round(DEFAULT_CHEST_DRAW_SIZE * (options.scale || 1)),
      x: tileToPx(x),
      y: tileToPx(y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.5, 0.35),
      flagKey,
      blocking: options.blocking !== false,
      update() {},
      draw() { drawChestEntity(this); },
      interact() {
        if (flags[flagKey]) {
          showNotice('宝箱は空っぽだ');
          return;
        }
        flags[flagKey] = true;
        const rewardMessages = grantChestRewards(this);
        showNotice(['宝箱を開けた！', ...rewardMessages].join(' '));
      },
    };
  }

  function makeSignEntity(x, y, lines, flagKey = null, options = {}) {
    const drawSize = resolveEntityDrawSize(options, DEFAULT_SIGN_DRAW_SIZE);
    return {
      type: 'sign',
      x: tileToPx(x),
      y: tileToPx(y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      drawW: drawSize.w,
      drawH: drawSize.h,
      lines,
      flagKey,
      hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.5, 0.35),
      blocking: false,
      update() {},
      interact() { openSignRead(this); },
    };
  }

  function makeDecorEntity(kind, x, y, size = 48, options = {}) {
    return {
      type: 'decor',
      kind,
      x: tileToPx(x),
      y: tileToPx(y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      size,
      drawW: options.drawW || null,
      drawH: options.drawH || null,
      scale: options.scale || null,
      offsetX: options.offsetX || 0,
      offsetY: options.offsetY || 0,
      blocking: options.blocking === true,
      update() {},
      draw() {},
    };
  }

  function addDecorEntities() {
    const add = (kind, x, y, size = 48, options = {}) => entities.push(makeDecorEntity(kind, x, y, size, options));
    for (const decor of getCurrentMapDef().decorations || []) {
      add(decor.kind, decor.x, decor.y, decor.size, decor.options || {});
    }
  }

  function addHouseEntities() {
    const houseDefs = getCurrentMapDef().houses || [];
    for (const house of houseDefs) {
      entities.push(makeHouseEntity(house.x, house.y, house.spriteKey, house.width, house.height, {
        variant: house.variant,
        offsetX: house.offsetX,
        offsetY: house.offsetY,
        hitbox: house.hitbox,
      }));
    }
  }

  function getHouseDefsForMap(map) {
    const mapDef = Object.values(MAP_DEFS).find(def => def.tiles === map);
    return mapDef ? mapDef.houses || [] : [];
  }

  function findHouseDefById(houseId) {
    return [...TOWN_HOUSES, ...SHADOW_TOWN_HOUSES].find(house => house.houseId === houseId) || null;
  }



  function makeHouseDoorRect(house) {
    const w = Math.round(TILE_RENDER * 0.34);
    const h = Math.round(TILE_RENDER * 0.30);
    const doorOffsetX = 62; // ドアの中心がタイルの中心からどれだけ右にあるか（px）
    const drawW = house.drawW || house.width;
    const drawH = house.drawH || house.height;
    const normalizedHouse = {
      x: house.drawW ? house.x : tileToPx(house.x),
      y: house.drawH ? house.y : tileToPx(house.y) - drawH / 2,
      drawW,
      drawH,
    };
    const doorX = normalizedHouse.x;
    const doorY = normalizedHouse.y + normalizedHouse.drawH / 2;
    return {
      x: Math.round(doorX - w / 2 + doorOffsetX),
      y: Math.round(doorY - h / 2 - 4),
      w,
      h,
      exitDir: 'down',
    };
  }

  function executeMapTransition(transitionId, entranceEntity = null) {
    const transition = getTransitionDef(transitionId);
    if (!transition) return;
    if (transition.requiredFlag && !flags[transition.requiredFlag]) {
      if (transition.blockedMessage) showNotice(transition.blockedMessage);
      return;
    }
    if (typeof transition.blockCondition === 'function') {
      const msg = transition.blockCondition();
      if (msg) { showNotice(msg); return; }
    }

    if (typeof transition.onBefore === 'function') transition.onBefore(entranceEntity);
    if (transition.storeHouseReturn && entranceEntity) {
      runtimeState.houseReturn = {
        x: entranceEntity.x,
        y: entranceEntity.y,
        w: entranceEntity.w,
        h: entranceEntity.h,
        exitDir: entranceEntity.exitDir,
      };
    }
    if (transition.houseId) runtimeState.currentHouseId = transition.houseId;

    const toMapId = resolveValue(transition.toMap, entranceEntity);
    runtimeState.currentMap = getMapTilesById(toMapId);

    const spawnX = resolveValue(transition.spawnX, entranceEntity);
    const spawnY = resolveValue(transition.spawnY, entranceEntity);
    const exitDir = resolveValue(transition.exitDir, entranceEntity) || 'down';

    if (transition.placement === 'outsideDoor') {
      const doorSize = typeof transition.getDoorSize === 'function'
        ? transition.getDoorSize(entranceEntity)
        : { w: TILE_RENDER, h: TILE_RENDER };
      const doorEntity = {
        x: spawnX,
        y: spawnY,
        w: doorSize.w,
        h: doorSize.h,
        hitbox: { x: 0, y: 0, w: doorSize.w, h: doorSize.h },
      };
      placeHeroOutsideDoor(doorEntity, exitDir);
    } else {
      setHeroTile(spawnX, spawnY);
      setHeroDirection(exitDir);
    }
    console.log('transition spawn', getCurrentMapId(), hero.x, hero.y, hero.drawX, hero.drawY);

    if (typeof transition.onAfter === 'function') transition.onAfter(entranceEntity);
    if (transition.useExitCooldown) startExitCooldown();
  }

  function makeHouseEntranceEntity(house, transitionId = null) {
    const rect = makeHouseDoorRect(house);
    const houseId = house.houseId;
    const entrance = makeEntranceEntity('houseEntrance', rect.x, rect.y, rect.w, rect.h, rect.exitDir, null, {
      hitbox: { x: 0, y: 0, w: rect.w, h: rect.h },
      transitionId: transitionId || HOUSE_TRANSITION_IDS[houseId],
    });
    return entrance;
  }

  function makeBossEntity() {
    return {
      type: 'boss',
      x: tileToPx(BOSS_POS.x),
      y: tileToPx(BOSS_POS.y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.58, 0.42),
      blocking: true,
      update() {},
      draw() {
        const camCol = renderCamera.col;
        const camRow = renderCamera.row;
        const bossSX = Math.round(this.x - camCol * TILE_RENDER);
        const bossSY = Math.round(this.y - camRow * TILE_RENDER);
        if (bossSX > -TILE_RENDER && bossSX < VIEW_W && bossSY > -TILE_RENDER && bossSY < VIEW_H) {
          drawDarkKnight(bossSX + BOSS_OFF.x, bossSY + BOSS_OFF.y, 5);
        }
      },
      interact() {
        startBossBattle();
      },
    };
  }

  function makeForestBossEntity() {
    return {
      type: 'boss',
      x: tileToPx(FOREST_BOSS_POS.x),
      y: tileToPx(FOREST_BOSS_POS.y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.58, 0.42),
      blocking: true,
      update() {},
      draw() {
        const camCol = renderCamera.col;
        const camRow = renderCamera.row;
        const bx = Math.round(this.x - camCol * TILE_RENDER);
        const by = Math.round(this.y - camRow * TILE_RENDER);
        if (bx > -TILE_RENDER && bx < VIEW_W && by > -TILE_RENDER && by < VIEW_H) {
          drawJurei(bx + BOSS_OFF.x, by + BOSS_OFF.y, 5);
        }
      },
      interact() {
        startForestBossBattle();
      },
    };
  }

  function makeDemonGeneralEntity() {
    return {
      type: 'boss',
      x: tileToPx(DEMON_GENERAL_POS.x),
      y: tileToPx(DEMON_GENERAL_POS.y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.58, 0.42),
      blocking: true,
      update() {},
      draw() {
        const bx = Math.round(this.x - renderCamera.col * TILE_RENDER);
        const by = Math.round(this.y - renderCamera.row * TILE_RENDER);
        if (bx > -TILE_RENDER && bx < VIEW_W && by > -TILE_RENDER && by < VIEW_H) {
          drawDemonGeneral(bx + BOSS_OFF.x -30, by + BOSS_OFF.y, 5);
        }
      },
      interact() {
        startDemonGeneralBattle();
      },
    };
  }

  function makeDemonLordEntity() {
    return {
      type: 'boss',
      x: tileToPx(CASTLE_BOSS_POS.x),
      y: tileToPx(CASTLE_BOSS_POS.y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      hitbox: centeredBottomHitbox(TILE_RENDER, TILE_RENDER, 0.58, 0.42),
      blocking: true,
      update() {},
      draw() {
        const bx = Math.round(this.x - renderCamera.col * TILE_RENDER);
        const by = Math.round(this.y - renderCamera.row * TILE_RENDER);
        if (bx > -TILE_RENDER && bx < VIEW_W && by > -TILE_RENDER && by < VIEW_H) {
          drawDemonLord(bx + BOSS_OFF.x -30, by + BOSS_OFF.y, 5);
        }
      },
      interact() {
        startDemonLordBattle();
      },
    };
  }

  function makeEntranceEntity(type, x, y, w, h, exitDir, interact, options = {}) {
    const transitionId = options.transitionId || null;
    return {
      type,
      x, y, w, h,
      rect: { x, y, w, h },
      exitDir,
      transitionId,
      hitbox: options.hitbox || entranceHitbox(w, h),
      blocking: false,
      update() {},
      draw() {},
      interact() {
        if (hero.justExited > 0) return;
        if (this.transitionId) {
          executeMapTransition(this.transitionId, this);
          return;
        }
        if (typeof interact === 'function') interact();
      },
    };
  }

  function makeEntranceFromDef(def) {
    if (def.type === 'houseEntrance') {
      const house = findHouseDefById(def.houseId);
      return house ? makeHouseEntranceEntity(house, def.transitionId) : null;
    }
    return makeEntranceEntity(
      def.type,
      tileToPx(def.x),
      tileToPx(def.y),
      def.w,
      def.h,
      def.exitDir,
      null,
      { ...(def.options || {}), transitionId: def.transitionId }
    );
  }

  function addEntranceEntities() {
    for (const entrance of getCurrentMapDef().entrances || []) {
      const entity = makeEntranceFromDef(entrance);
      if (entity) entities.push(entity);
    }
  }

  function syncEntities() {
    hero.type = 'hero';
    hero.hitbox = centeredBottomHitbox(hero.w, hero.h);
    hero.update = updateMove;
    hero.draw = drawHeroEntity;
    hero.interact = function() {};

    const mapDef = getCurrentMapDef();
    entities = [hero];
    addHouseEntities();
    addDecorEntities();
    for (const npc of mapDef.npcs || []) entities.push(makeNpcEntity(npc));
    for (const sign of mapDef.signs || []) entities.push(makeSignEntity(sign.x, sign.y, sign.lines, sign.flagKey, sign.options || {}));
    for (const chest of mapDef.chests || []) entities.push(makeChestEntity(chest.x, chest.y, chest.options || {}));
    if (runtimeState.currentMap === fieldMap) {
      entities.push(makeLeafaForestEntranceEntity());
    }
    if (runtimeState.currentMap === leafaForestMap) {
      if (isLeafaRescueAmbushActive()) {
        for (const enemyNpc of LEAFA_RESCUE_ENEMY_NPCS) {
          entities.push(makeEnemyNpcEntity(enemyNpc));
        }
        entities.push(makeLeafaRescueEntity());
      } else if (flags.heardLeafaRumor && !flags.leafaRescueDone) {
        entities.push(makeLeafaRescueEntity());
      }
    }
    if (runtimeState.currentMap === dungeonMap) {
      if (!flags.defeatedDarkKnight) entities.push(makeBossEntity());
    }
    if (runtimeState.currentMap === cursedForestMap) {
      if (!flags.defeatedForestBoss) entities.push(makeForestBossEntity());
    }
    if (runtimeState.currentMap === castleMap) {
      if (!flags.defeatedDemonGeneral) entities.push(makeDemonGeneralEntity());
      if (!flags.defeatedDemonLord) entities.push(makeDemonLordEntity());
    }
    addEntranceEntities();
  }

  function updateEntities() {
    syncEntities();
    for (const entity of entities) {
      if (typeof entity.update === 'function') entity.update();
    }
  }

  function drawEntities() {
    syncEntities();
    const sorted = entities.slice().sort((a, b) => getCollisionBox(a).y - getCollisionBox(b).y);
    for (const entity of sorted) {
      if (entity.type === 'house' && typeof entity.draw === 'function') entity.draw();
    }
    for (const entity of sorted) {
      if (entity.type === 'decor') drawDecorEntity(entity);
    }
    for (const entity of sorted) {
      if (entity.type === 'sign') drawSignEntity(entity);
    }
    for (const entity of sorted) {
      if (entity.type === 'chest' && typeof entity.draw === 'function') entity.draw();
    }
    for (const entity of sorted) {
      if (entity.type === 'decor' || entity.type === 'house' || entity.type === 'chest') continue;
      if (entity.type === 'sign') {
        continue;
      }
      if (typeof entity.draw === 'function') entity.draw();
    }
  }

  function getCollidingEntity(box, type = null) {
    syncEntities();
    return entities.find(entity => {
      if (entity.type === 'hero') return false;
      if (type && entity.type !== type) return false;
      return isColliding(box, getCollisionBox(entity));
    }) || null;
  }

  function getBlockingEntityForBox(box) {
    syncEntities();
    return entities.find(entity => {
      if (entity.type === 'hero' || !entity.blocking) return false;
      return isColliding(box, getCollisionBox(entity));
    }) || null;
  }

  function getAdjacentEntity(types) {
    const allowed = Array.isArray(types) ? types : [types];
    const box = heroInteractionBox();
    syncEntities();
    return entities.find(entity => {
      if (entity.type === 'hero' || !allowed.includes(entity.type)) return false;
      return isColliding(box, getCollisionBox(entity));
    }) || null;
  }

  function getEventEntityForBox(box) {
    const eventTypes = [
      'townEntrance', 'townExit', 'dungeonEntrance', 'dungeonExit', 'houseEntrance', 'houseExit',
      'field2Entrance', 'field1Return', 'shadowTownEntrance', 'shadowTownExit', 'forestEntrance', 'forestExit',
      'outpostEntrance', 'outpostExit', 'castleEntrance', 'castleExit',
      'leafaForestEntrance', 'leafaForestExit',
    ];
    const tileBasedEventTypes = [
      'townEntrance', 'townExit', 'dungeonEntrance', 'dungeonExit',
      'field2Entrance', 'field1Return', 'shadowTownEntrance', 'shadowTownExit',
      'forestEntrance', 'forestExit', 'outpostEntrance', 'outpostExit',
      'castleEntrance', 'castleExit',
      'leafaForestEntrance', 'leafaForestExit',
    ];
    const directionalEntranceTypes = ['dungeonEntrance'];
    const footTileX = heroFootTileX();
    const footTileY = heroFootTileY();
    syncEntities();
    return entities.find(entity => {
      if (!eventTypes.includes(entity.type)) return false;
      if (tileBasedEventTypes.includes(entity.type)) {
        const ex = pxToTile(entity.x);
        const ey = pxToTile(entity.y);
        if (directionalEntranceTypes.includes(entity.type)) {
          return hero.dir === entity.exitDir && footTileX === ex && footTileY === ey + 1;
        }
        const ew = Math.max(1, Math.ceil(entity.w / TILE_RENDER));
        const eh = Math.max(1, Math.ceil(entity.h / TILE_RENDER));
        return footTileX >= ex && footTileX < ex + ew && footTileY >= ey && footTileY < ey + eh;
      }
      return isColliding(box, getCollisionBox(entity));
    }) || null;
  }

  function getEntityKey(entity) {
    return `${entity.type}:${entity.x},${entity.y},${entity.w},${entity.h}`;
  }

  function startExitCooldown(frames = 24) {
    hero.justExited = frames;
    lastEventEntityKey = null;
  }

  function placeHeroOutsideDoor(doorEntity, exitDir = 'down') {
    const heroHitbox = hero.hitbox || centeredBottomHitbox(hero.w, hero.h);
    const doorBox = getCollisionBox(doorEntity);
    const gap = 6;
    if (exitDir === 'up') {
      hero.x = doorBox.x + doorBox.w / 2 - heroHitbox.x - heroHitbox.w / 2;
      hero.y = doorBox.y - gap - heroHitbox.y - heroHitbox.h;
      setHeroDirection('down');
    } else if (exitDir === 'left') {
      hero.x = doorBox.x - gap - heroHitbox.x - heroHitbox.w;
      hero.y = doorBox.y + doorBox.h / 2 - heroHitbox.y - heroHitbox.h / 2;
      setHeroDirection('right');
    } else if (exitDir === 'right') {
      hero.x = doorBox.x + doorBox.w + gap - heroHitbox.x;
      hero.y = doorBox.y + doorBox.h / 2 - heroHitbox.y - heroHitbox.h / 2;
      setHeroDirection('left');
    } else {
      hero.x = doorBox.x + doorBox.w / 2 - heroHitbox.x - heroHitbox.w / 2;
      hero.y = doorBox.y + doorBox.h + gap - heroHitbox.y;
      setHeroDirection('up');
    }
    snapDrawPos();
  }

  // プレイヤーの隣（上下左右）にいるNPCを返す（いなければ null）
  function getAdjacentNpc() {
    return getAdjacentEntity(['npc', 'sign']);
  }

  function getAdjacentInteractable() {
    const types = ['npc', 'sign', 'chest'];
    for (const type of types) {
      const entity = getAdjacentEntity(type);
      if (entity) return entity;
    }
    return null;
  }

  // ============================================================
  // 描画座標を hero.x/y にスナップ（マップ切り替え時・ロード時に使用）
  // ============================================================
  function snapDrawPos() {
    hero.drawX = hero.x;
    hero.drawY = hero.y;
    hero.vx = 0;
    hero.vy = 0;
    updateHeroWalkAnimation(false);
    moveAnim.active = false;
    lastEventEntityKey = null;
    lastEncounterTerrainKey = null;
  }

  // ============================================================
  // 速度ベースの移動を毎フレーム更新（loop() から呼び出す）
  // ============================================================
  function tileAt(x, y) {
    return runtimeState.currentMap[y] && runtimeState.currentMap[y][x];
  }

  function isBlockedTile(x, y) {
    if (x < 0 || x >= mapCols() || y < 0 || y >= mapRows()) return true;
    const tile = tileAt(x, y);
    return TILE_META[tile] ? !TILE_META[tile].passable : false;
  }

  function getEncounterSystemDeps() {
  return {
    currentMap: runtimeState.currentMap,
    dungeonMap,
    T,
    TILE_META,
  };
}

  function tileHasEncounter(tile) {
    return tileHasEncounterSystem(tile, getEncounterSystemDeps());
  }

  function canPlaceHeroAt(px, py) {
    const heroBox = getCollisionBox(hero, px, py);
    const left = heroBox.x;
    const top = heroBox.y;
    const right = left + heroBox.w - 1;
    const bottom = top + heroBox.h - 1;
    const corners = [
      [pxToTile(left), pxToTile(top)],
      [pxToTile(right), pxToTile(top)],
      [pxToTile(left), pxToTile(bottom)],
      [pxToTile(right), pxToTile(bottom)],
    ];
    for (const [tx, ty] of corners) {
      if (isBlockedTile(tx, ty)) return false;
    }
    if (getBlockingEntityForBox(heroBox)) return false;
    return true;
  }

  function updateHeroVelocityFromKeys() {
    hero.vx = 0;
    hero.vy = 0;
    if (currentState !== GameState.MAP) return;
    if (keys.left)  hero.vx -= MOVE_SPEED;
    if (keys.right) hero.vx += MOVE_SPEED;
    if (keys.up)    hero.vy -= MOVE_SPEED;
    if (keys.down)  hero.vy += MOVE_SPEED;
    if (hero.vx && hero.vy) {
      const d = Math.SQRT1_2;
      hero.vx *= d;
      hero.vy *= d;
    }
    if (Math.abs(hero.vx) > Math.abs(hero.vy)) setHeroDirection(hero.vx < 0 ? 'left' : 'right');
    else if (hero.vy) setHeroDirection(hero.vy < 0 ? 'up' : 'down');
  }

  function updateMove() {
    if (hero.justExited > 0) hero.justExited--;
    updateHeroVelocityFromKeys();
    const prevX = hero.x;
    const prevY = hero.y;
    if (hero.vx && canPlaceHeroAt(hero.x + hero.vx, hero.y)) hero.x += hero.vx;
    if (hero.vy && canPlaceHeroAt(hero.x, hero.y + hero.vy)) hero.y += hero.vy;
    updateHeroWalkAnimation(hero.x !== prevX || hero.y !== prevY);
    hero.drawX = hero.x;
    hero.drawY = hero.y;
    if (currentState === GameState.MAP) checkTileEvents();
  }

  // ============================================================
  // マップ画面を描画する
  // ============================================================
  function renderMap() {
    // ── カメラ計算（hero.drawX/drawY のピクセル座標に追従） ───────────
    const fixedHouseCamera = isHouseMap(runtimeState.currentMap);
    const camCol = fixedHouseCamera ? 0 : Math.max(0, Math.min(mapCols() - VIEW_COLS, (hero.drawX + TILE_RENDER / 2) / TILE_RENDER - VIEW_COLS / 2));
    const camRow = fixedHouseCamera ? 0 : Math.max(0, Math.min(mapRows() - VIEW_ROWS, (hero.drawY + TILE_RENDER / 2) / TILE_RENDER - VIEW_ROWS / 2));
    renderCamera = { col: camCol, row: camRow };

    // ── 可視タイルを描画（サブピクセルカメラ対応で +1 余分に描く） ──────
    const c0 = Math.floor(camCol), r0 = Math.floor(camRow);
    for (let r = r0; r < Math.min(r0 + VIEW_ROWS + 1, mapRows()); r++)
      for (let c = c0; c < Math.min(c0 + VIEW_COLS + 1, mapCols()); c++)
        drawTile(c, r, camCol, camRow);

    // 暗闇・霧オーバーレイ
    if (runtimeState.currentMap === dungeonMap) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
      ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    } else if (runtimeState.currentMap === field2Map) {
      ctx.fillStyle = 'rgba(20, 10, 40, 0.30)';
      ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    } else if (runtimeState.currentMap === shadowTownMap) {
      ctx.fillStyle = 'rgba(10, 5, 30, 0.40)';
      ctx.fillRect(0, 0, VIEW_W, VIEW_H);
    }

    drawEntities();
    drawDebugHitboxes(camCol * TILE_RENDER, camRow * TILE_RENDER);
  }

  function renderEquipMenu() {
    ctx.save();
    ctx.scale(VIEW_W / 512, VIEW_H / 384); // UI は 512×384 座標で記述 → 2倍表示
    drawEquipMenuFrame(ctx, txt);

    if (equipMenuMode === 'main') {
        drawEquipMainMenu(ctx, txt, equipCursor);
        ctx.restore();
        return;
    }

    // ── 道具画面 ────────────────────────────────────────────
    if (equipMenuMode === 'items' || equipMenuMode === 'itemTarget') {
      txt('道具', 64, 124, '#ffddaa', 16);
      const itemList = getUsableItems();
      drawItemList(
        ctx,
        txt,
        itemList,
        itemCursor,
        equipMenuMode === 'items',
        getItemCount
        );
      if (equipMenuMode === 'itemTarget') {
        const usingItem = ITEMS[itemUseId] || ITEMS.potion;
        const members = getPartyMembers({ aliveOnly: true });

        drawItemTargetList(
        ctx,
        txt,
        usingItem,
        members,
        itemUseId,
        itemTargetIndex
        );
      } else {
        const selectedItem = itemList[itemCursor] || ITEMS.potion;
        drawItemHelpText(txt, selectedItem, getItemCount);
      }
      ctx.restore();
      return;
    }

    // ── キャラ画面 (chara / equip_slot) ─────────────────────
    const members = getPartyMembers();
    if (equipCharacterIndex >= members.length) equipCharacterIndex = Math.max(0, members.length - 1);
    const selectedMember = members[equipCharacterIndex] || members[0];
    const actor = selectedMember.actor;
    const isHero = selectedMember.type === 'hero';

    drawCharacterHeader(
        ctx,
        txt,
        selectedMember.name,
        members.length,
        charaTabIndex
    );
    
    const weapon = isHero ? getCurrentWeapon() : getAllyWeapon(actor);
    const armor  = isHero ? getCurrentArmor()  : getAllyArmor(actor);
    const baseAtk  = isHero ? hero.atk : (actor.baseAtk || 0);
    const baseDef  = isHero ? hero.def : (actor.baseDef || 0);
    const speed    = isHero ? hero.speed : getAllySpeed(actor);
    const weaponAtk = weapon.attack ?? weapon.attackBonus ?? 0;
    const armorDef  = armor.defense  ?? armor.defenseBonus  ?? 0;

    drawCharacterStatusPanel(
        ctx,
        txt,
        actor,
        isHero,
        getFaceSprite(actor),
        {
            attack: baseAtk + weaponAtk,
            defense: baseDef + armorDef,
            speed,
        }
    ); 

    if (charaTabIndex === 0) {
        drawEquipmentTab(ctx, txt, {
            weapon,
            armor,
            weaponAtk,
            armorDef,
            baseAtk,
            baseDef,
            equipMenuMode,
            equipSlotCursor,
        });
        } else {
            const skills = isHero ? (hero.skills || []) : (actor.skills || []);
            drawSkillTab(txt, skills, SKILL_DEFS);
        }

    ctx.restore();
  }

  // ============================================================
  // バトル画面を描画する
  // ============================================================
  function getMapBattleBgKey(mapKey = getCurrentMapId()) {
    return getMapBattleBgKeyUI(mapKey, { getMapDefById });
  }

  function getBattleBgFallbackKey(bgKey) {
    return getBattleBgFallbackKeyUI(bgKey, { getMapBattleBgKey, battleBgImgs });
  }

  function resolveBattleBgKey(preferredKey) {
    return resolveBattleBgKeyUI(preferredKey, { getMapBattleBgKey, getBattleBgFallbackKey, battleBgImgs });
  }

  function resolveBattleStartBgKey(options = {}) {
    return resolveBattleStartBgKeyUI(options, { getCurrentMapDef, getMapBattleBgKey });
  }

  function drawBattleBackground(type) {
    drawBattleBackgroundUI(type, {
      ctx,
      resolveBattleBgKey,
      battleBgImgs,
    });
  }

  // HP割合 <= 30% のとき疲れ顔、それ以外は通常顔を返す。
  // 疲れ顔画像が未ロードの場合は通常顔にフォールバック。
  function getFaceSprite(actor) {
    const hpRatio = actor.maxHp > 0 ? actor.hp / actor.maxHp : 1;
    const key = (hpRatio <= 0.3 && actor.face_tired) ? actor.face_tired : actor.face_normal;
    const img = key && uiImgs[key];
    if (img && img._ready) return img;
    const fallback = actor.face_normal && uiImgs[actor.face_normal];
    return (fallback && fallback._ready) ? fallback : null;
  }

  function drawBattleHeroFace(x, y) {
    const img = getFaceSprite(hero);
    if (!img) return;
    ctx.drawImage(img, x, y-5, 64, 64);
  }

    function getBattleUIDeps() {
    return {
        drawBar,
        drawBattleHeroFace,
        getFaceSprite,
        drawNPC,
        getItemCount,
        battleTargetMode,
        getPartyMembers,
        selectedTargetIndex,
    };
    }

  // panelX: パネル左端X。hero=8, ally=256
 function drawActorPanel(panelX, actor, isActive, isHero) {
  drawActorPanelUI(
    ctx,
    txt,
    panelX,
    actor,
    isActive,
    isHero,
    getBattleUIDeps()
  );
}

  function getBattleEnemies() {
    return battleEnemies.filter(enemy => enemy && (enemy.hp > 0 || enemy.isDying));
  }

  function getEnemyView(enemy) {
    return makeEnemyViews(getBattleEnemies()).find(view => view.enemy === enemy) || null;
  }

  function getEnemyViewCenters(count) {
  return getEnemyViewCentersUI(count);
}

  function makeEnemyViews(enemies) {
  return makeEnemyViewsUI(enemies);
}

  function getEnemyViewUIDeps() {
  return {
    drawEnemy,
    drawThinBar,
    battleTargetMode,
    battleEnemies,
    selectedTargetIndex,
  };
}

  function drawEnemyView(view) {
  drawEnemyViewUI(ctx, txt, view, getEnemyViewUIDeps());
}

 function drawEnemyViews(enemies) {
  drawEnemyViewsUI(ctx, txt, enemies, getEnemyViewUIDeps());
}

  function spawnFireEffectOnEnemy(enemy) {
    if (!enemy) return;
    const view = getEnemyView(enemy);
    if (!view) return;
    const centerX = view.x + view.drawW / 2;
    const centerY = view.y + view.drawH * 0.52;
    spawnFireEffectOnEnemyUI(centerX, centerY, view.drawW, view.drawH, rng);
  }

  function updateFireEffects() {
    updateFireEffectsUI();
  }

  function drawFireEffects() {
    drawFireEffectsUI(ctx);
  }

  // ── リーフストームエフェクト ──────────────────────────────────
  function spawnLeafStormEffectOnEnemy(enemy) {
    if (!enemy) return;
    const view = getEnemyView(enemy);
    if (!view) return;
    const centerX = view.x + view.drawW / 2;
    const centerY = view.y + view.drawH * 0.5;
    spawnLeafStormEffectOnEnemyUI(centerX, centerY, view.drawW, view.drawH, rng);
  }

  function updateLeafEffects() { updateLeafEffectsUI(); }

  function drawLeafEffects() {
    drawLeafEffectsUI(ctx);
  }

  // ── 斬撃エフェクト（主人公）──────────────────────────────────
  function spawnSlashEffectOnEnemy(enemy) {
    if (!enemy) return;
    const view = getEnemyView(enemy);
    if (!view) return;
    const cx = view.x + view.drawW / 2;
    const cy = view.y + view.drawH * 0.45;
    spawnSlashEffectOnEnemyUI(cx, cy, view.drawW, view.drawH, rng);
  }

  function updateSlashEffects() {
    updateSlashEffectsUI();
  }

  function drawSlashEffects() {
    drawSlashEffectsUI(ctx);
  }

  // ── 打撃エフェクト（リーファ）──────────────────────────────────
  function spawnHitBurstOnEnemy(enemy) {
    if (!enemy) return;
    const view = getEnemyView(enemy);
    if (!view) return;
    const cx = view.x + view.drawW / 2;
    const cy = view.y + view.drawH * 0.45;
    spawnHitBurstOnEnemyUI(cx, cy, rng);
  }

  function updateHitEffects() {
    updateHitEffectsUI();
  }

  function drawHitEffects() {
    drawHitEffectsUI(ctx);
  }

  function renderBattle() {
  ctx.save();
  ctx.scale(VIEW_W / 512, VIEW_H / 384); // UI は 512×384 座標で記述 → 2倍表示

  drawBattleBackground(currentBattleBgKey);

  // 敵
  drawEnemyViews(getBattleEnemies());
  drawFireEffects();
  drawLeafEffects();
  drawSlashEffects();
  drawHitEffects();

  drawBattleIntroOverlay(ctx, battleIntro);

  drawBattleMessageWindow(ctx, txt, msg);

  // パーティステータス（下段）
  const activeAlly = allies.find(a => a.flags.hasAlly);
  drawBattlePartyStatusFrame(ctx, !!activeAlly);

  // 主人公
  const heroIsActive = !!(battleCommandActor && battleCommandActor.type === 'hero');
  drawActorPanel(8, hero, heroIsActive, true);

  // 仲間
  if (activeAlly) {
    const allyIsActive = !!(battleCommandActor && battleCommandActor.type === 'ally');
    drawActorPanel(256, activeAlly, allyIsActive, false);
  }

  ctx.restore();
}

  // ============================================================
  // 勝利画面を描画する
  // ============================================================
  function renderWin() {
    ctx.save();
    ctx.scale(VIEW_W / 512, VIEW_H / 384); // UI は 512×384 座標で記述 → 2倍表示
    ctx.fillStyle = '#050520';
    ctx.fillRect(0, 0, 512, 384);

    // きらきらエフェクト（時間で動く星）
    const t = Date.now() / 700;
    ctx.fillStyle = '#ffd700';
    for (let i = 0; i < 28; i++) {
      const sx = ((Math.sin(i * 2.4 + t) * 0.5 + 0.5) * 512) | 0;
      const sy = ((Math.cos(i * 1.9 + t * 0.7) * 0.5 + 0.5) * 384) | 0;
      ctx.fillRect(sx, sy, 3, 3);
    }

    txt('★  Victory!  ★', 118, 130, '#ffd700', 36);
    txt('てきを  たおした！', 148, 190, '#ffffff', 20);
    if (Array.isArray(winMsg)) {
      winMsg.forEach((line, i) => txt(line, 120, 218 + i * 22, '#aaffaa', 16));
    } else {
      txt(winMsg, 162, 228, '#aaffaa', 16);
    }
    txt('なにかキーを押してマップへ', 130, 292, '#8888ff', 15);

    drawHero(120, 300, 2);
    const winEnemy = getMainBattleEnemy();
    if (winEnemy) drawEnemy(winEnemy, 340, 300, 2);
    ctx.restore();
  }

  // ============================================================
  // ゲームオーバー画面を描画する
  // ============================================================
  function renderLose() {
    ctx.save();
    ctx.scale(VIEW_W / 512, VIEW_H / 384); // UI は 512×384 座標で記述 → 2倍表示
    ctx.fillStyle = '#150000';
    ctx.fillRect(0, 0, 512, 384);
    txt('GAME  OVER', 128, 182, '#ff2222', 42);
    txt('ちからつきた…', 172, 248, '#cccccc', 20);
    txt('なにかキーを押してやりなおす', 112, 314, '#888888', 15);
    ctx.restore();
  }

  // ============================================================
  // エンディング画面を描画する
  // ============================================================
  function renderEnding() {
    ctx.save();
    ctx.scale(VIEW_W / 512, VIEW_H / 384);
    ctx.fillStyle = '#000814';
    ctx.fillRect(0, 0, 512, 384);

    // 星空
    const t = Date.now() / 1400;
    for (let i = 0; i < 60; i++) {
      const sx = ((Math.sin(i * 3.7 + t * 0.2) * 0.5 + 0.5) * 512) | 0;
      const sy = ((Math.cos(i * 2.3 + t * 0.15) * 0.5 + 0.5) * 200) | 0;
      const alpha = 0.5 + 0.5 * Math.sin(i * 1.3 + t);
      ctx.fillStyle = `rgba(255, 240, 180, ${alpha.toFixed(2)})`;
      ctx.fillRect(sx, sy, 2, 2);
    }

    // 光のグラデーション（下から上へ）
    const grad = ctx.createLinearGradient(0, 384, 0, 200);
    grad.addColorStop(0, 'rgba(20, 40, 100, 0.55)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 200, 512, 184);

    txt('★  THE  END  ★', 108, 68, '#ffd700', 34);
    txt('魔王ヴァルドールを　倒した！', 92, 130, '#ffffff', 18);
    txt('世界を覆っていた闇が　消えていく…', 62, 162, '#aaddff', 15);
    txt('ゆうしゃは　伝説となった。', 106, 202, '#ffdd88', 16);

    // 主人公を中央に大きく描画
    drawHero(226, 286, 2.6);

    txt('おわり', 210, 336, '#ffffaa', 20);
    // txt('なにかキーを押すとタイトルへ戻る', 86, 364, '#556677', 13);
    ctx.restore();
  }

  // ============================================================
  // タイトル画面を描画する
  // ============================================================
  function renderTitle() {
    ctx.save();
    ctx.scale(VIEW_W / 512, VIEW_H / 384);

    const bgImg = uiImgs.title_bg;
    if (bgImg && bgImg._ready) {
      ctx.drawImage(bgImg, 0, 0, 512, 384);
    } else {
      const grad = ctx.createLinearGradient(0, 0, 0, 384);
      grad.addColorStop(0, '#060318');
      grad.addColorStop(1, '#1a1245');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 384);

      const t = Date.now() / 1200;
      for (let i = 0; i < 60; i++) {
        const sx = ((Math.sin(i * 3.1 + t * 0.09) * 0.5 + 0.5) * 512) | 0;
        const sy = ((Math.cos(i * 2.7 + t * 0.07) * 0.5 + 0.5) * 240) | 0;
        const alpha = 0.3 + 0.7 * Math.sin(i * 1.7 + t);
        ctx.fillStyle = `rgba(210, 200, 255, ${alpha.toFixed(2)})`;
        ctx.fillRect(sx, sy, 2, 2);
      }
    }

    txt('AI  RPG', 98, 118, '#ffd700', 54);
    txt('〜 勇者と仲間たちの物語 〜', 96, 180, '#aaddff', 16);

    const selectedItem = TITLE_MENU_ITEMS[titleMenuIndex];
    if (selectedItem) {
      txt(`> ${selectedItem.label}`, 190, 252, '#ffffff', 18);
    }

    if (Math.floor(Date.now() / 600) % 2 === 0) {
      txt('Enter / Space / Z  でスタート', 78, 300, '#88aaff', 16);
    }

    ctx.restore();
  }

  // ============================================================
  // プロローグ
  // ============================================================
 

  function startPrologue() {
    prologueState = { active: true, index: -1, lineStartTime: 0, cooldown: false };
    currentState = GameState.PROLOGUE;
    hideBtns();
    advancePrologueLine();
  }

  function advancePrologueLine() {
    if (!prologueState.active) return;
    prologueState.index++;
    // 空行はスキップ
    while (prologueState.index < PROLOGUE_LINES.length && PROLOGUE_LINES[prologueState.index] === '') {
      prologueState.index++;
    }
    if (prologueState.index >= PROLOGUE_LINES.length) {
      finishPrologue();
      return;
    }
    prologueState.lineStartTime = Date.now();
    prologueState.cooldown = true;
    setTimeout(() => { if (prologueState.active) prologueState.cooldown = false; }, 150);
  }

  function finishPrologue() {
    prologueState = createInitialPrologueState();
    setGameState(GameState.MAP);
  }

  function skipPrologue() {
    if (!prologueState.active) return;
    finishPrologue();
  }

  function renderPrologue() {
    renderPrologueUI(ctx, VIEW_W, VIEW_H, prologueState, PROLOGUE_LINES);
  }

  // ============================================================
  // メインループ（毎フレーム呼ばれる）
  // ============================================================
  // ============================================================
  // HTML ステータスバーを更新する
  // ============================================================
function refreshStatusBar() {
  updateStatusBar(
    hero,
    getCurrentWeapon().name,
    getCurrentArmor().name,
    getLocationName()
  );
}

  function getLocationName() {
    if (runtimeState.currentMap === dungeonMap) return '◆ くらやみの洞窟';
    if (runtimeState.currentMap === townMap) return '★ ヒカリのまち';
    if (runtimeState.currentMap === shadowTownMap) return '★ カゲのまち';
    if (runtimeState.currentMap === field2Map) return '◆ 荒野';
    if (runtimeState.currentMap === cursedForestMap) return '★ 呪われた森';
    if (runtimeState.currentMap === castleMap) return '★ 魔王の城';
    if (runtimeState.currentMap === leafaForestMap) return '◆ 北西の森';
    if (isHouseMap(runtimeState.currentMap)) {
      return runtimeState.currentHouseId && runtimeState.currentHouseId.startsWith('shadow') ? '★ カゲのまち' : '★ ヒカリのまち';
    }
    return '';
  }

  function setGameState(nextState) {
    currentState = nextState;
    if (nextState !== GameState.MAP) {
      keys.up = keys.down = keys.left = keys.right = false;
      hero.vx = 0;
      hero.vy = 0;
      updateHeroWalkAnimation(false);
    }
    if (nextState === GameState.MAP || nextState === GameState.PROLOGUE || nextState === GameState.TALK || nextState === GameState.SHOP || nextState === GameState.EQUIP || nextState === GameState.WIN || nextState === GameState.ENDING) {
      hideBtns();
    }
  }

  function isConfirmKey(e) {
    return e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z';
  }

  function startTitleMenuAction(action) {
    if (action === TitleAction.NEW_GAME) {
      resetGame();
      startPrologue();
    }
  }

  function handleTitleInput(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's') {
      e.preventDefault();
      const delta = e.key === 'ArrowUp' || e.key === 'w' ? -1 : 1;
      titleMenuIndex = (titleMenuIndex + delta + TITLE_MENU_ITEMS.length) % TITLE_MENU_ITEMS.length;
      return;
    }

    if (isConfirmKey(e)) {
      e.preventDefault();
      const selectedItem = TITLE_MENU_ITEMS[titleMenuIndex];
      if (selectedItem) startTitleMenuAction(selectedItem.action);
    }
  }

  function updateMap() {
    updateEntities();
  }

  function drawMap() {
    renderMap();
  }

  function updateTalk() {}

  function drawTalk() {
    renderMap();
    if (activeSign) renderSignReadWindow();
    else renderTalkWindow();
  }

  function updateShop() {}

  function drawShop() {
    renderMap();
    renderTalkWindow();
  }

  function updateBattle() {
    for (const enemy of battleEnemies) {
      if (enemy.hitFlashFrames > 0) enemy.hitFlashFrames--;
      if (enemy.isDying && enemy.deathTimer > 0) enemy.deathTimer--;
    }
    updatePartyHitEffects();
    updateFireEffects();
    updateLeafEffects();
    updateSlashEffects();
    updateHitEffects();
  }

  function triggerPartyHitEffect(target, damage) {
    if (!target) return;
    target.uiHitFrames = 16;
    target.uiDamageFrames = 16;
    target.uiDamageMax = 16;
    target.uiDamageAmount = Math.max(0, damage || 0);
  }

  function spawnHealEffect(target, hp, mp) {
    if (!target) return;
    target.uiHealFrames = 22;
    target.uiHealMax = 22;
    target.uiHealHp = hp || 0;
    target.uiHealMp = mp || 0;
  }

  function updatePartyHitEffects() {
    const members = [hero, ...allies];
    for (const actor of members) {
      if (!actor) continue;
      if ((actor.uiHitFrames || 0) > 0) actor.uiHitFrames--;
      if ((actor.uiDamageFrames || 0) > 0) actor.uiDamageFrames--;
      if ((actor.uiDamageFrames || 0) <= 0) {
        actor.uiDamageFrames = 0;
        actor.uiDamageAmount = 0;
        actor.uiDamageMax = 0;
      }
      if ((actor.uiHealFrames || 0) > 0) actor.uiHealFrames--;
      if ((actor.uiHealFrames || 0) <= 0) {
        actor.uiHealFrames = 0;
        actor.uiHealHp = 0;
        actor.uiHealMp = 0;
      }
    }
  }

  function drawBattle() {
    renderBattle();
  }

  function updateEquip() {}

  function drawEquip() {
    renderMap();
    renderEquipMenu();
  }

  function updateCurrentState() {
    if (currentState === GameState.TITLE) {}
    else if (currentState === GameState.PROLOGUE) {}
    else if (currentState === GameState.MAP) updateMap();
    else if (currentState === GameState.TALK) updateTalk();
    else if (currentState === GameState.SHOP) updateShop();
    else if (currentState === GameState.BATTLE) updateBattle();
    else if (currentState === GameState.EQUIP) updateEquip();
  }

  function drawCurrentState() {
    if (currentState === GameState.TITLE) renderTitle();
    else if (currentState === GameState.PROLOGUE) renderPrologue();
    else if (currentState === GameState.MAP) drawMap();
    else if (currentState === GameState.TALK) drawTalk();
    else if (currentState === GameState.SHOP) drawShop();
    else if (currentState === GameState.BATTLE) drawBattle();
    else if (currentState === GameState.EQUIP) drawEquip();
    else if (currentState === GameState.WIN) renderWin();
    else if (currentState === GameState.LOSE) renderLose();
    else if (currentState === GameState.ENDING) renderEnding();
  }

  function loop() {
    ctx.clearRect(0, 0, VIEW_W, VIEW_H);
    updateCurrentState();
    refreshStatusBar();
    drawCurrentState();
    requestAnimationFrame(loop); // 次のフレームへ
  }



  function getAllyBattleCommands(ally) {
    return (ally.skills || []).map(skill => {
      if (skill === 'attack') return { label: '⚔ こうげき',         actionId: 'attack', enabled: true };
      if (skill === 'fire')   return { label: '✨ ファイア (MP5)',   actionId: 'fire',   enabled: ally.mp >= FIRE_MP_COST };
      if (skill === 'heal')   return { label: '💚 かいふく (MP4)',   actionId: 'heal',   enabled: ally.mp >= HEAL_MP_COST };
      if (skill === 'leafStorm') return { label: '🍃 リーフストーム (MP6)', actionId: 'leafStorm', enabled: ally.mp >= LEAF_STORM_MP_COST };
      return null;
    }).filter(Boolean);
  }

  function getCurrentActorCommands() {
    if (!battleCommandActor || battleCommandActor.type === 'hero') return HERO_BATTLE_COMMANDS;
    return getAllyBattleCommands(battleCommandActor.actor);
  }

  function showBtns(disabled = false) {
    const commands = getCurrentActorCommands();
    const disabledAttr = disabled ? ' disabled' : '';
    btnArea.classList.remove('noPointer');
    btnArea.style.flexDirection = 'column';
    const btnRow = commands.map((cmd, index) => {
      const selected = !disabled && index === battleCommandIndex ? ' selected' : '';
      const commandDisabled = disabled || cmd.enabled === false ? ' disabled' : '';
      return `<button class="btn${selected}"${disabledAttr || commandDisabled}>${selected ? '>' : ''}${cmd.label}</button>`;
    }).join('');
    const selectedCmd = !disabled ? commands[battleCommandIndex] : null;
    const skillDef = selectedCmd ? SKILL_DEFS[selectedCmd.actionId] : null;
    const descText = skillDef ? `${skillDef.name}：${skillDef.desc}${skillDef.mp > 0 ? ' / MP' + skillDef.mp : ''}` : '';
    const descHtml = descText ? `<div style="font-family:'Courier New',monospace;font-size:12px;color:#aaaacc;padding:2px 4px;min-height:18px">${descText}</div>` : '';
    btnArea.innerHTML = `<div style="display:flex;flex-direction:row;gap:8px">${btnRow}</div>${descHtml}`;
  }

  

  function moveBattleCommand(delta) {
    if (!heroTurn || battleTargetMode || battleVictory.active || battleVictory.pending) return;
    const commands = getCurrentActorCommands();
    if (!commands.length) return;
    let nextIndex = battleCommandIndex;
    for (let i = 0; i < commands.length; i++) {
      nextIndex = (nextIndex + commands.length + delta) % commands.length;
      if (commands[nextIndex] && commands[nextIndex].enabled !== false) {
        battleCommandIndex = nextIndex;
        showBtns();
        return;
      }
    }
    showBtns();
  }

  function confirmBattleCommand() {
    if (!heroTurn || battleTargetMode || battleVictory.active || battleVictory.pending) return;
    const commands = getCurrentActorCommands();
    const command = commands[battleCommandIndex];
    if (command && command.enabled !== false) handleActorCommandChoice(command.actionId);
  }



function getShopAction(itemId) {
  const actions = {
    potion: buyPotion,
    ether: buyEther,
    elixir: buyElixir,
    leatherArmor: buyLeatherArmor,
    steelSword: buySteelSword,
    ironArmor: buyIronArmor,
    mage_staff: buyMageStaff,
    green_robe: buyGreenRobe,
    close: closeShop,
  };

  return actions[itemId] || closeShop;
}

function getShopOptions() {
  const shopType = talkNpc && talkNpc.npcId === 'shadow_shop_gray'
    ? 'shadow'
    : 'normal';

  return SHOP_ITEMS[shopType].map(item => ({
    ...item,
    action: getShopAction(item.id),
  }));
}

  function showShopBtns() {
    btnArea.classList.add('noPointer');
    btnArea.style.flexDirection = '';
    btnArea.innerHTML = '';
  }

  function moveShopCursor(delta) {
    const options = getShopOptions();
    if (!options.length) return;
    shopCursor = (shopCursor + options.length + delta) % options.length;
    showShopBtns();
  }

  function confirmShopChoice() {
    const options = getShopOptions();
    const choice = options[shopCursor];
    if (!choice) return;
    choice.action();
    if (choice.id !== 'close') showShopBtns();
  }

  function closeShop() {
    if (talkNpc && getNpcRole(talkNpc) === 'shop') {
      handleDialogueComplete(talkNpc);
    }
    talkNpc = null;
    talkPage = 0;
    shopMsg = '';
    shopCursor = 0;
    setGameState(GameState.MAP);
    hideBtns();
  }


function buyPotion() {
  if (!isShopAvailable()) return;

  const result = buyConsumableSystem({
    hero,
    price: 10,
    itemId: 'potion',
    itemName: 'ポーション',
    amount: 1,
    changeItemCount,
    getItemCount,
  });

  shopMsg = result.message;
}

function buyEther() {
  if (!isShopAvailable()) return;

  const result = buyConsumableSystem({
    hero,
    price: 15,
    itemId: 'ether',
    itemName: 'エーテル',
    amount: 1,
    changeItemCount,
    getItemCount,
  });

  shopMsg = result.message;
}

function buyElixir() {
  if (!isShopAvailable()) return;

  const result = buyConsumableSystem({
    hero,
    price: 100,
    itemId: 'elixir',
    itemName: 'エリクサー',
    amount: 1,
    changeItemCount,
    getItemCount,
  });

  shopMsg = result.message;
}


function buySteelSword() {
  if (!isShopAvailable()) return;

  const result = buyHeroWeaponOnceSystem({
    hero,
    itemId: 'steelSword',
    price: 130,
    alreadyMessage: '鋼の剣は　もう持っている！',
    successMessage: '鋼の剣を買った！',
  });

  shopMsg = result.message;
}

function buyIronArmor() {
  if (!isShopAvailable()) return;

  const result = buyHeroArmorOnceSystem({
    hero,
    itemId: 'ironArmor',
    price: 200,
    alreadyMessage: '鉄のよろいは　もう持っている！',
    successMessage: '鉄のよろいを買った！',
  });

  shopMsg = result.message;
}

function buyLeatherArmor() {
  if (!isShopAvailable()) return;

  const result = buyHeroArmorOnceSystem({
    hero,
    itemId: 'leatherArmor',
    price: 30,
    alreadyMessage: '革よろいは　もう持っている！',
    successMessage: '革よろいを買った！',
  });

  shopMsg = result.message;
}

function buyMageStaff() {
  if (!isShopAvailable()) return;

  const result = buyAllyWeaponOnceSystem({
    hero,
    allies,
    allyId: 'leafa',
    itemId: 'mage_staff',
    price: 150,
    noAllyMessage: 'リーファがいない！',
    alreadyMessage: '魔法の杖は　もう持っている！',
    successMessage: '魔法の杖を買った！',
  });

  shopMsg = result.message;
}

function buyGreenRobe() {
  if (!isShopAvailable()) return;

  const result = buyAllyArmorOnceSystem({
    hero,
    allies,
    allyId: 'leafa',
    itemId: 'green_robe',
    price: 200,
    noAllyMessage: 'リーファがいない！',
    alreadyMessage: '草色のローブは　もう持っている！',
    successMessage: '草色のローブを買った！',
  });

  shopMsg = result.message;
}


  // ============================================================
  // 会話（トーク）システム
  // ============================================================

  // 会話を開始する
  function openDialogue(npc) {
    const role = getNpcRole(npc);
    if (role === 'inn') {
      fullRecoverParty();
    }
    activeSign = null;
    readPage = 0;
    talkNpc  = npc;
    talkNpc._lines = getNpcLines(npc); // イベント発火前にセリフを確定
    handleNpcEvent(npc);               // アイテム付与などはセリフ表示後に発火
    talkPage = 0;
    setGameState(GameState.TALK);
  }

  function openShop(npc) {
    shopMsg = '';
    activeSign = null;
    readPage = 0;
    talkNpc = npc;
    talkPage = 0;
    shopCursor = 0;
    setGameState(GameState.SHOP);
    showShopBtns();
  }

  // セリフを1ページ進める（最終ページなら会話終了）
  function advanceDialogue() {
  if (activeSign) {
    const readLines = getSignReadLines(activeSign);

    const result = advanceSignReadState({
      activeSign,
      readPage,
      readLines,
    });

    if (result.done) {
      if (result.flagKey) flags[result.flagKey] = true;
      activeSign = null;
      readPage = 0;
      setGameState(GameState.MAP);
    } else {
      readPage = result.nextReadPage;
    }

    return;
  }

  if (!talkNpc) return;

  const lineCount = isShopAvailable()
    ? 1
    : (talkNpc._lines || getNpcLines(talkNpc)).length;

  const result = advanceNpcTalkState({
    talkPage,
    lineCount,
  });

  if (result.done) {
    handleDialogueComplete(talkNpc);
    talkNpc = null;
    talkPage = 0;
    setGameState(GameState.MAP);
  } else {
    talkPage = result.nextTalkPage;
  }
}

  function getSignReadLines(sign) {
  return getSignReadLinesSystem(sign);
}

  function openSignRead(sign) {
      talkNpc = null;
    talkPage = 0;
    activeSign = sign;
    readPage = 0;
    setGameState(GameState.TALK);
  }

  function getShopIntroLine(npc) {
  return getShopIntroLineSystem(npc, getNpcLines);
}
  function drawShopList(options) {
    drawShopListUI(ctx, txt, options, shopCursor);
    }

  function drawShopTextWindow(text, selectedDetail, gold) {
    drawShopTextWindowUI(ctx, txt, wrapTextLines, text, selectedDetail, gold);
    }

  // 会話ウィンドウをマップの上に重ねて描画する
  function renderTalkWindow() {
    if (!talkNpc) return;
    ctx.save();
    ctx.scale(VIEW_W / 512, VIEW_H / 384); // UI は 512×384 座標で記述 → 2倍表示

    // 半透明の背景ボックス
    drawDialogueBox(ctx);

    // styleKey がある場合：立ち絵をダイアログボックス左上に表示
    const styleImg = talkNpc.styleKey && uiImgs[talkNpc.styleKey];
    const hasPortrait = styleImg && styleImg._ready;
    if (hasPortrait) {
      // ポートレートフレーム（ダイアログ上に重ねて表示）
      drawPortraitBox(ctx);
      ctx.drawImage(styleImg, 6, 152, 86, 96);
    } else {
      // 立ち絵がない場合は従来の小スプライト
      drawNPC(16, 254, 1, talkNpc.bodyCol, talkNpc.hairCol, talkNpc.spriteKey, 32, 32);
    }

    // NPC 名前（立ち絵あり時は右にずらす）
    const nameX = hasPortrait ? 100 : 60;
    txt(talkNpc.name, nameX, 272, '#ffd700', 14);

    if (isShopAvailable()) {
      const options = getShopOptions();
      if (shopCursor >= options.length) shopCursor = Math.max(0, options.length - 1);
      ctx.fillStyle = '#4444aa';
      ctx.fillRect(60, 276, 430, 1);
      const selected = options[shopCursor] || options[0];
      drawShopList(options);
      const messageText = shopMsg || selected?.detail || getShopIntroLine(talkNpc);
      drawShopTextWindow(messageText, selected?.detail || '', hero.gold);
      ctx.restore();
      return;
    }

    const talkLines = isShopAvailable()
      ? [shopMsg || getShopIntroLine(talkNpc)]
      : (talkNpc._lines || getNpcLines(talkNpc));

    // テキスト開始X（立ち絵あり時は右にずらして重なりを避ける）
    const textStartX = hasPortrait ? 100 : 60;
    const textAreaW = hasPortrait ? 390 : 430;

    // ページ番号
    txt(`${talkPage + 1}/${talkLines.length}`, 466, 272, '#666688', 11);

    // 区切り線
    ctx.fillStyle = '#4444aa';
    ctx.fillRect(textStartX, 276, textAreaW, 1);

    // セリフ（現在ページ）
    txt(talkLines[talkPage], textStartX, 306, '#ffffff', 14);

    // ページ送りプロンプト（点滅）
    if (Math.floor(Date.now() / 450) % 2) {
      const isLast = talkPage >= talkLines.length - 1;
      txt(isLast ? '[ とじる ]' : '[ つぎへ  ]', 376, 368, '#88aaff', 12);
    }
    ctx.restore();
  }

  function renderSignReadWindow() {
    if (!activeSign) return;
    const readLines = getSignReadLines(activeSign);
    ctx.save();
    ctx.scale(VIEW_W / 512, VIEW_H / 384);

    drawDialogueBox(ctx);

    txt('看板', 28, 272, '#ffd700', 14);
    txt(`${readPage + 1}/${readLines.length}`, 466, 272, '#666688', 11);

    ctx.fillStyle = '#4444aa';
    ctx.fillRect(28, 276, 462, 1);

    txt(readLines[readPage], 28, 306, '#ffffff', 14);

    if (Math.floor(Date.now() / 450) % 2) {
      const isLast = readPage >= readLines.length - 1;
      txt(isLast ? '[ とじる ]' : '[ つぎへ  ]', 376, 368, '#88aaff', 12);
    }
    ctx.restore();
  }

  // ============================================================
  // バトル開始
  // ============================================================
  function isDeepCaveEncounter() {
    return runtimeState.currentMap === dungeonMap && heroTileY() <= 5;
  }

  function applyEnemyVariance(enemy) {
    if (enemy.isBoss || enemy.boss) return enemy;

    const vary = (value, rate = 0.1, min = 0) => {
      const factor = 1 + (Math.random() * 2 - 1) * rate;
      return Math.max(min, Math.round(value * factor));
    };

    enemy.maxHp = vary(enemy.maxHp, 0.1, 1);
    enemy.hp = enemy.maxHp;
    enemy.atk = vary(enemy.atk, 0.1, 1);
    enemy.exp = vary(enemy.exp || 0, 0.1, 0);
    enemy.gold = vary(enemy.gold || 0, 0.1, 0);
    return enemy;
  }

  function makeBattleEnemy(def) {
    battleEnemySeq++;
    const enemy = applyEnemyVariance({ ...def });
    const defId = enemy.id || enemy.spriteKey || enemy.name || 'enemy';
    enemy.defId = defId;
    enemy.id = `${defId}_${battleEnemySeq}`;
    enemy.hp = enemy.hp ?? enemy.maxHp;
    enemy.maxHp = enemy.maxHp ?? enemy.hp;
    enemy.speed = enemy.speed ?? 5;
    enemy.isDying = false;
    enemy.deathTimer = 0;
    enemy.hitFlashFrames = 0;
    return enemy;
  }

  function chooseEnemy() {
    const enemies = resolveEncounterTable();
    return enemies[rng(0, enemies.length - 1)];
  }

  function chooseEnemyCount() {
    const roll = Math.random();
    if (roll < 0.5) return 1;
    if (roll < 0.85) return 2;
    return 3;
  }

  function chooseBattleEnemies() {
    const count = chooseEnemyCount();
    return Array.from({ length: count }, () => makeBattleEnemy(chooseEnemy()));
  }

  function liveEnemies() {
    return battleEnemies.filter(enemy => enemy && enemy.hp > 0 && !enemy.isDying);
  }

  function getSelectableEnemyIndexes() {
    return battleEnemies
      .map((enemy, index) => enemy && enemy.hp > 0 && !enemy.isDying ? index : -1)
      .filter(index => index >= 0);
  }

  function hasBossEnemy() {
    return battleEnemies.some(enemy => enemy && enemy.boss);
  }

  function getMainBattleEnemy() {
    return battleEnemies.find(enemy => enemy && enemy.boss) || battleEnemies[0] || null;
  }

  function setBattleEnemies(enemies) {
    battleEnemies = enemies;
    foe = getMainBattleEnemy();
  }

  function getEncounterMessage(enemies, suffix = 'が　あらわれた！') {
    if (enemies.length === 1) return `${enemies[0].name} ${suffix}`;
    return `敵が ${enemies.length}体 ${suffix}`;
  }

  function startBattleWithEnemies(enemies, openingMessage, options = {}) {
    setBattleEnemies(enemies);
    clearFireEffectsUI();
    clearBattleMessageQueue();
    battleVictory       = { active: false, pending: false, messages: [], index: 0 };
    battleTurnQueue     = [];
    pendingPartyActions = [];
    battlePartyQueue    = [];
    battleCommandActor  = null;
    battleTargetMode    = null;
    selectedTargetIndex = 0;
    battleCommandIndex  = 0;
    clearBattleIntro();
    currentBattleBgKey = resolveBattleBgKey(resolveBattleStartBgKey({ ...options, enemy: getMainBattleEnemy() }));
    setGameState(GameState.BATTLE);
    heroTurn = false;
    msg = openingMessage;
    hideBtns();
    const mainEnemy = getMainBattleEnemy();
    const bossIntroKey = mainEnemy?.defId && BOSS_INTRO_MESSAGES[mainEnemy.defId] ? mainEnemy.defId : null;
    if (bossIntroKey) {
      setTimeout(() => startBossIntro(bossIntroKey), 700);
    } else {
      setTimeout(() => {
        if (currentState === GameState.BATTLE && !battleVictory.active && !battleVictory.pending) beginBattleRound();
      }, 700);
    }
  }

  const BOSS_INTRO_MESSAGES = {
    dark_knight: {
      lines: [
        'よくぞここまで来た……',
        '闇の力、思い知るがいい！',
      ],
      finishMsg: 'ダークナイトたちが　立ちはだかった！',
    },
    forest_boss: {
      lines: [
        '森を荒らす者よ……',
        'この根にからめ取られ、朽ちるがいい……！',
      ],
      finishMsg: '呪われた樹霊 ジュレイが　現れた！',
    },
    demon_general: {
      lines: [
        '我を倒さぬ限り',
        '魔王様のもとへは辿り着けぬ！',
      ],
      finishMsg: '将軍 デモルゴンが　立ちはだかった！',
    },
    demon_lord: {
      lines: [
        '……よくここまで来たな',
        'だが、ここがお前の終わりだ',
        '我が名はヴァルドール。闇の王なり',
      ],
      finishMsg: '魔王 ヴァルドールが　降臨した！',
    },
  };

  function clearBattleIntro() {
    if (battleIntro.timer) clearTimeout(battleIntro.timer);
    battleIntro = { active: false, unskippable: false, lines: [], finishMsg: '', index: 0, timer: null, flashUntil: 0 };
  }

  function startBossIntro(bossKey) {
    const config = BOSS_INTRO_MESSAGES[bossKey];
    if (!config) return;
    battleIntro = {
      active: true,
      unskippable: true,
      lines: config.lines,
      finishMsg: config.finishMsg,
      index: -1,
      timer: null,
      flashUntil: 0,
    };
    msg = '';
    battleIntro.timer = setTimeout(showNextBattleIntroLine, 400);
  }

  function showNextBattleIntroLine() {
    if (!battleIntro.active || currentState !== GameState.BATTLE) return;
    battleIntro.index++;
    if (battleIntro.index >= battleIntro.lines.length) {
      finishBattleIntro();
      return;
    }
    msg = battleIntro.lines[battleIntro.index];
    if (battleIntro.index === battleIntro.lines.length - 1) battleIntro.flashUntil = Date.now() + 280;
    battleIntro.timer = setTimeout(showNextBattleIntroLine, battleIntro.index === 0 ? 1200 : 1400);
  }

  function finishBattleIntro() {
    const finishMsg = battleIntro.finishMsg || '';
    clearBattleIntro();
    if (currentState !== GameState.BATTLE || battleVictory.active || battleVictory.pending) return;
    if (finishMsg) msg = finishMsg;
    setTimeout(() => {
      if (currentState === GameState.BATTLE && !battleVictory.active && !battleVictory.pending) beginBattleRound();
    }, 500);
  }

  function skipBattleIntro() {
    if (!battleIntro.active) return false;
    if (battleIntro.unskippable) return false;
    finishBattleIntro();
    return true;
  }

  function startBattle(options = {}) {
    const enemies = chooseBattleEnemies();
    startBattleWithEnemies(enemies, getEncounterMessage(enemies), options);
  }

  function startBossBattle() {
    if (flags.defeatedDarkKnight) return;
    startBattleWithEnemies([
      makeBattleEnemy(ENEMY_DEFS.dark_soldier),
      makeBattleEnemy(DARK_KNIGHT_BASE),
      makeBattleEnemy(ENEMY_DEFS.dark_mage),
    ], '', { bg: 'dark_knight' });
  }

  function startForestBossBattle() {
    if (flags.defeatedForestBoss) return;
    startBattleWithEnemies([
      makeBattleEnemy(ENEMY_DEFS.cursed_tree_minion),
      makeBattleEnemy(ENEMY_DEFS.forest_boss),
      makeBattleEnemy(ENEMY_DEFS.cursed_tree_minion),
    ], '', { bg: 'forest_boss' });
  }

  function startDemonGeneralBattle() {
    if (flags.defeatedDemonGeneral) return;
    const enemies = [makeBattleEnemy(ENEMY_DEFS.demon_general)];
    startBattleWithEnemies(enemies, ``, { bg: 'castle_bg' });
  }

  function startDemonLordBattle() {
    if (flags.defeatedDemonLord) return;
    if (!flags.defeatedDemonGeneral) {
      showNotice('将軍の気配が　行く手を阻んでいる…');
      return;
    }
    const enemies = [makeBattleEnemy(ENEMY_DEFS.demon_lord)];
    startBattleWithEnemies(enemies, ``, { bg: 'demon_king' });
  }

  function startLeafaRescueBattle() {
    if (flags.leafaRescueDone || leafaRescueBattle || currentState === GameState.BATTLE) return;
    leafaRescueBattle = true;
    startBattleWithEnemies([
      makeBattleEnemy(ENEMY_DEFS.tree_minion),
      makeBattleEnemy(ENEMY_DEFS.goblin),
      makeBattleEnemy(ENEMY_DEFS.tree_minion),
    ], '魔物たちが　現れた！', { bg: 'forest_event' });
  }

  function isLeafaRescueAmbushActive() {
    return runtimeState.currentMap === leafaForestMap && flags.heardLeafaRumor && !flags.leafaRescueDone;
  }

  function makeLeafaForestEntranceEntity() {
    return {
      type: 'leafaForestEntrance',
      x: tileToPx(2),
      y: tileToPx(1),
      w: TILE_RENDER,
      h: TILE_RENDER,
      exitDir: 'up',
      transitionId: 'enterLeafaForest',
      hitbox: entranceHitbox(TILE_RENDER, TILE_RENDER),
      blocking: false,
      update() {},
      draw() {
        const bx = Math.round(this.x - renderCamera.col * TILE_RENDER);
        const by = Math.round(this.y - renderCamera.row * TILE_RENDER);
        if (bx <= -TILE_RENDER || bx >= VIEW_W || by <= -TILE_RENDER || by >= VIEW_H) return;
        const drawW = 256;
        const drawH = 320;
        const drawX = bx + Math.round((TILE_RENDER - drawW) / 2);
        const drawY = by + TILE_RENDER - drawH;
        drawObject('forest_entrance', drawX, drawY, drawW, drawH, this);
      },
      interact() {
        if (hero.justExited > 0) return;
        executeMapTransition('enterLeafaForest', this);
      },
    };
  }

  function makeLeafaRescueEntity() {
    const preBattleNpc = {
      npcId: 'leafa_rescue_pre',
      name: 'リーファ',
      spriteKey: 'leafa_style',
      styleKey: 'leafa_style',
      drawW: 100, drawH: 100,
      offsetX: +30,offsetY: -20,
      bodyCol: '#44aa66', hairCol: '#99dd55',
      lines: [
        '……来ないで！　危ない……！',
        'でも……もう、ひとりじゃ……　限界で……',
      ],
    };
    return {
      type: 'boss',
      x: tileToPx(LEAFA_RESCUE_POS.x),
      y: tileToPx(LEAFA_RESCUE_POS.y),
      w: TILE_RENDER,
      h: TILE_RENDER,
      hitbox: centeredBottomHitbox(
        TILE_RENDER,
        TILE_RENDER,
        0.55,
        0.40,
        preBattleNpc.offsetX || 0,
        preBattleNpc.offsetY || 0
      ),
      blocking: true,
      update() {},
      draw() {
        const bx = Math.round(this.x - renderCamera.col * TILE_RENDER);
        const by = Math.round(this.y - renderCamera.row * TILE_RENDER);
        if (bx > -TILE_RENDER && bx < VIEW_W && by > -TILE_RENDER && by < VIEW_H) {
          drawNPC(
              bx + NPC_OFF.x + (preBattleNpc.offsetX || 0),
              by + NPC_OFF.y + (preBattleNpc.offsetY || 0),
              NPC_SC,
              '#44aa66',
              '#99dd55',
              'leafa_style',
              preBattleNpc.drawW,
              preBattleNpc.drawH
            );
        }
      },
      interact() {
        if (!flags.heardLeafaRumor || flags.leafaRescueDone) return;
        openDialogue(preBattleNpc);
      },
    };
  }

  // ============================================================
  // プレイヤーの行動：こうげき
  // ============================================================
  function triggerEnemyHitEffect(enemy) {
    if (!enemy) return;
    enemy.hitFlashFrames = 10;
  }

  function spawnHitEffectOnEnemy(enemy) {
    triggerEnemyHitEffect(enemy);
  }

  function triggerEnemyDeath(enemy) {
    if (!enemy || enemy.isDying) return;
    enemy.isDying = true;
    enemy.deathDuration = enemy.boss ? 40 : 30;
    enemy.deathTimer = enemy.deathDuration;
    enemy.hitFlashFrames = Math.max(enemy.hitFlashFrames || 0, 12);
    if (enemy.lastHitType === 'fire') {
      spawnFireEffectOnEnemy(enemy);
    } else if (enemy.lastHitType === 'leafStorm') {
      spawnLeafStormEffectOnEnemy(enemy);
    } else {
      spawnHitEffectOnEnemy(enemy);
    }
  }

  function buildVictoryMessages(defeatedFoes, levelResult, exp, gold, allyLevelResults = []) {
    const mainFoe = defeatedFoes.find(enemy => enemy.boss) || defeatedFoes[0] || {};
    const defeatedNames = mainFoe.boss || defeatedFoes.length === 1
      ? `${mainFoe.name}を倒した！`
      : `敵を ${defeatedFoes.length}体 倒した！`;
    const messages = [
      defeatedNames,
      `EXP ${exp || 0} を手に入れた！`,
      `G ${gold || 0} を手に入れた！`,
    ];
    if (levelResult && levelResult.leveled) {
      messages.push(`ゆうしゃは レベル${hero.level} に上がった！`);
      if (levelResult.hpRecovered > 0) messages.push('体力が少し回復した…');
    }
    for (const { ally, result } of allyLevelResults) {
      if (result && result.leveled) {
        messages.push(`${ally.name}は レベル${ally.level} に上がった！`);
        if (result.hpRecovered > 0) messages.push(`${ally.name}の体力が回復した…`);
      }
    }
    if (mainFoe.boss && mainFoe.defId === 'demon_lord') {
      messages.push('魔王ヴァルドールを　討ち滅ぼした！');
      messages.push('世界を覆う闇が　晴れていく…！');
    } else if (mainFoe.boss && mainFoe.defId === 'demon_general') {
      messages.push('魔王の間への道が開かれた！');
    } else if (mainFoe.boss && mainFoe.defId === 'forest_boss') {
      messages.push('封印石・弐を手に入れた！');
      messages.push('魔王の城への鍵を手に入れた！');
    } else if (mainFoe.boss) {
      messages.push('封印石・壱を手に入れた！');
    }
    return messages;
  }

  function startBattleVictory(messages) {
    battleVictory = { active: true, pending: false, messages: messages.filter(Boolean), index: 0 };
    heroTurn = false;
    msg = battleVictory.messages[0] || '勝利した！';
    showBtns(true);
  }

  function advanceBattleVictory() {
    if (!battleVictory.active) return;
    battleVictory.index++;
    if (battleVictory.index >= battleVictory.messages.length) {
      if (flags.defeatedDemonLord) {
        battleVictory = createInitialBattleVictory();
        foe = null;
        battleEnemies = [];
        winMsg = '';
        clearFireEffectsUI(); clearLeafEffectsUI(); clearSlashEffectsUI(); clearHitEffectsUI();
        hideBtns();
        setGameState(GameState.ENDING);
      } else {
        backToMap();
      }
      return;
    }
    msg = battleVictory.messages[battleVictory.index];
  }

  // ============================================================
  // コマンド選択フェーズ：入力処理
  // ============================================================
  const FIRE_MP_COST = 5;
  const HEAL_MP_COST = 4;
  const LEAF_STORM_MP_COST = 6;


  function handleActorCommandChoice(actionId) {
    if (!heroTurn || !battleCommandActor || battleVictory.active || battleVictory.pending) return;
    const actorEntry = battleCommandActor;
    const actorObj   = actorEntry.type === 'hero' ? hero : actorEntry.actor;

    if (actionId === 'run')    { doRun(); return; }

    if (actionId === 'fire') {
      if (actorObj.mp < FIRE_MP_COST) { msg = 'MPが　たりない！'; return; }
      collectActorAction(actorEntry, 'fire');
      return;
    }
    if (actionId === 'heal') {
      if (actorObj.mp < HEAL_MP_COST) { msg = `${actorObj.name}の　MPが　たりない！`; return; }
      beginPartyTargetSelectionForActor(actorEntry, 'heal');
      return;
    }
    if (actionId === 'leafStorm') {
      if (actorObj.mp < LEAF_STORM_MP_COST) { msg = `${actorObj.name}の　MPが　たりない！`; return; }
      collectActorAction(actorEntry, 'leafStorm');
      return;
    }
    if (actionId === 'potion') {
      if (getItemCount('potion') <= 0) { msg = 'ポーションを持っていない！'; return; }
      beginPartyTargetSelectionForActor(actorEntry, 'potion');
      return;
    }
    if (actionId === 'ether') {
      if (getItemCount('ether') <= 0) { msg = 'エーテルを持っていない！'; return; }
      beginPartyTargetSelectionForActor(actorEntry, 'ether');
      return;
    }
    if (actionId === 'elixir') {
      if (getItemCount('elixir') <= 0) { msg = 'エリクサーを持っていない！'; return; }
      beginPartyTargetSelectionForActor(actorEntry, 'elixir');
      return;
    }
    if (actionId === 'attack') {
      beginTargetSelectionForActor(actorEntry);
      return;
    }
  }

  function collectActorAction(actorEntry, action, targetIndex = null, targetPartyId = null) {
    pendingPartyActions.push({
      type:        actorEntry.type,
      actor:       actorEntry.actor,
      action,
      targetIndex,
      targetPartyId,
    });
    battleCommandActor = null;
    heroTurn = false;
    hideBtns();
    advancePartyCommandCollection();
  }

  function advancePartyCommandCollection() {
    if (currentState !== GameState.BATTLE || battleVictory.active || battleVictory.pending) return;
    if (battlePartyQueue.length === 0) { executeBattleRound(); return; }
    battleCommandActor = battlePartyQueue.shift();
    heroTurn = true;
    battleCommandIndex = 0;
    const commands = getCurrentActorCommands();
    if (commands.length && commands[0].enabled === false) {
      const firstEnabled = commands.findIndex(cmd => cmd.enabled !== false);
      if (firstEnabled >= 0) battleCommandIndex = firstEnabled;
    }
    const name = battleCommandActor.type === 'hero' ? 'ゆうしゃ' : battleCommandActor.actor.name;
    msg = `${name}は　どうする？`;
    showBtns();
  }

  function beginTargetSelectionForActor(actorEntry) {
    const selectable = getSelectableEnemyIndexes();
    if (selectable.length <= 0) return;
    if (selectable.length === 1) {
      collectActorAction(actorEntry, 'attack', selectable[0]);
      return;
    }
    battleTargetMode = { action: 'attack', actorEntry };
    selectedTargetIndex = selectable.includes(selectedTargetIndex) ? selectedTargetIndex : selectable[0];
    msg = '← →で対象を選び　決定';
    hideBtns();
  }

  function beginPartyTargetSelectionForActor(actorEntry, action) {
    const selectable = getPartyMembers({ aliveOnly: true });
    if (!selectable.length) return;
    battleTargetMode = { action, actorEntry, targetType: 'party' };
    selectedTargetIndex = Math.min(selectedTargetIndex, selectable.length - 1);
    const label = action === 'heal' ? '回復対象'
      : action === 'ether' ? 'エーテルの対象'
        : 'ポーションの対象';
    msg = `← →で${label}を選び　決定`;
    hideBtns();
  }

  function moveTargetSelection(delta) {
    if (!battleTargetMode) return;
    if (battleTargetMode.targetType === 'party') {
      const selectable = getPartyMembers({ aliveOnly: true });
      if (!selectable.length) return;
      selectedTargetIndex = (selectedTargetIndex + selectable.length + delta) % selectable.length;
      return;
    }
    const selectable = getSelectableEnemyIndexes();
    if (!selectable.length) return;
    const currentPos = selectable.includes(selectedTargetIndex) ? selectable.indexOf(selectedTargetIndex) : 0;
    const nextPos = (currentPos + selectable.length + delta) % selectable.length;
    selectedTargetIndex = selectable[nextPos];
  }

  function confirmTargetSelection() {
    if (!battleTargetMode) return;
    if (battleTargetMode.targetType === 'party') {
      const selectable = getPartyMembers({ aliveOnly: true });
      if (!selectable.length) return;
      selectedTargetIndex = Math.min(selectedTargetIndex, selectable.length - 1);
      const targetPartyId = selectable[selectedTargetIndex].id;
      const actorEntry = battleTargetMode.actorEntry;
      const action = battleTargetMode.action;
      battleTargetMode = null;
      selectedTargetIndex = 0;
      if (actorEntry) collectActorAction(actorEntry, action, null, targetPartyId);
      return;
    }
    const selectable = getSelectableEnemyIndexes();
    if (!selectable.includes(selectedTargetIndex)) selectedTargetIndex = selectable[0] ?? 0;
    const targetIndex = selectedTargetIndex;
    const actorEntry  = battleTargetMode.actorEntry;
    battleTargetMode  = null;
    selectedTargetIndex = 0;
    if (actorEntry) collectActorAction(actorEntry, 'attack', targetIndex);
  }

  function cancelTargetSelection() {
    if (!battleTargetMode) return;
    battleTargetMode = null;
    selectedTargetIndex = 0;
    if (battleCommandActor) {
      const name = battleCommandActor.type === 'hero' ? 'ゆうしゃ' : battleCommandActor.actor.name;
      msg = `${name}は　どうする？`;
      heroTurn = true;
      showBtns();
    }
  }

  // ============================================================
  // にげる（コマンド選択フェーズ中に即時試行）
  // ============================================================
  function doRun() {
    if (battleVictory.active || battleVictory.pending || !heroTurn || currentState !== GameState.BATTLE) return;
    if (hasBossEnemy()) {
      const boss = getMainBattleEnemy();
      msg = boss.defId === 'demon_lord'
        ? '魔王からは　にげられない！'
        : boss.defId === 'forest_boss'
        ? 'ジュレイからは　にげられない！'
          : 'ダークナイトからは　にげられない！';
      return;
    }
    hideBtns();
    if (Math.random() < 0.6) {
      msg = 'うまく　にげきった！';
      setTimeout(() => {
        setGameState(GameState.MAP);
        foe = null;
        battleEnemies       = [];
        battleTurnQueue     = [];
        pendingPartyActions = [];
        battlePartyQueue    = [];
        battleCommandActor  = null;
        battleTargetMode    = null;
        selectedTargetIndex = 0;
        clearFireEffectsUI();
      }, 1000);
    } else {
      msg = 'にげられなかった！　すきを見せてしまった！';
      battleCommandActor = null;
      heroTurn = false;
      battleTargetMode = null;
      selectedTargetIndex = 0;
      pendingPartyActions = [];
      battlePartyQueue = [];
      setTimeout(() => {
        if (currentState !== GameState.BATTLE || battleVictory.active || battleVictory.pending) return;
        executeBattleRound();
      }, 700);
    }
  }

  // ============================================================
  // 行動実行フェーズ：speed順にキューを構築して実行
  // ============================================================
  function getActorSpeed(entry) {
    if (entry.type === 'hero')  return hero.speed || 0;
    if (entry.type === 'ally')  return getAllySpeed(entry.actor);
    if (entry.type === 'enemy') return (entry.enemy || entry.actor)?.speed || 0;
    return 0;
  }

  function executeBattleRound() {
    const partyEntries = pendingPartyActions.map(a => ({
      type:        a.type === 'hero' ? 'hero' : 'ally',
      actor:       a.actor,
      action:      a.action,
      targetIndex: a.targetIndex,
      targetPartyId: a.targetPartyId,
    }));
    const enemyEntries = liveEnemies().map(e => ({
      type:  'enemy',
      enemy: e,
      actor: e,
    }));
    battleTurnQueue = [...partyEntries, ...enemyEntries].sort((a, b) => {
      const sa = getActorSpeed(a);
      const sb = getActorSpeed(b);
      if (sb !== sa) return sb - sa;
      if (a.type === 'hero') return -1;
      if (b.type === 'hero') return  1;
      return 0;
    });
    console.log('turn order:', battleTurnQueue.map(e =>
      `${e.type === 'enemy' ? e.enemy.name : (e.actor?.name ?? 'ゆうしゃ')} spd=${getActorSpeed(e)}`
    ));
    pendingPartyActions = [];
    processNextBattleActor();
  }

  function isPartyDefeated() {
    if (hero.hp > 0) return false;
    return !allies.some(a => a.flags.hasAlly && a.hp > 0);
  }

  function getRandomLivePartyMember() {
    const alive = [];
    if (hero.hp > 0) alive.push(hero);
    for (const ally of allies) {
      if (ally.flags.hasAlly && ally.hp > 0) alive.push(ally);
    }
    return alive.length > 0 ? alive[Math.floor(Math.random() * alive.length)] : hero;
  }

  function executePartyAction(actor) {
    const { action, targetIndex, targetPartyId, type } = actor;
    const actorObj = type === 'hero' ? hero : actor.actor;

    let targetEnemy = null;
    if (action === 'attack') {
      if (targetIndex !== null) {
        const e = battleEnemies[targetIndex];
        if (e && e.hp > 0 && !e.isDying) targetEnemy = e;
      }
      if (!targetEnemy) {
        const live = liveEnemies();
        if (live.length > 0) targetEnemy = live[0];
      }
    }

    switch (action) {
      case 'attack': executeActorAttack(actorObj, targetEnemy); break;
      case 'fire':   executeActorFire(actorObj);                break;
      case 'heal':   executeActorHeal(actorObj, targetPartyId); break;
      case 'leafStorm': executeActorLeafStorm(actorObj);       break;
      case 'potion':  executeActorPotion(actorObj, targetPartyId); break;
      case 'ether':   executeActorEther(actorObj, targetPartyId);  break;
      case 'elixir':  executeActorElixir(actorObj, targetPartyId); break;
      default:       setTimeout(processNextBattleActor, 600);
    }
  }

  function executeActorAttack(actorObj, enemy) {
    if (!enemy || enemy.hp <= 0 || enemy.isDying) {
      setTimeout(processNextBattleActor, 600);
      return;
    }
    const atk = actorObj === hero ? getHeroAttack() : getAllyAttack(actorObj);
    const dmg = Math.max(1, atk - enemy.def + rng(0, 1));
    if (actorObj === hero) {
      const recoveredMp = hero.mp < hero.maxMp ? 1 : 0;
      hero.mp = Math.min(hero.maxMp, hero.mp + 1);
      msg = recoveredMp
        ? `ゆうしゃの　こうげき！　${dmg} のダメージ！ MPが1回復！`
        : `ゆうしゃの　こうげき！　${dmg} のダメージ！`;
    } else {
      msg = `${actorObj.name}の　こうげき！　${dmg} のダメージ！`;
    }
    enemy.lastHitType = 'attack';
    // エフェクトを hp デクリメント前に spawn（キルショット時も getEnemyView が確実に view を返すため）
    triggerEnemyHitEffect(enemy);
    if (actorObj === hero) {
      spawnSlashEffectOnEnemy(enemy);
      console.log('[attack] slash');
    } else {
      spawnHitBurstOnEnemy(enemy);
      console.log('[attack] hitburst');
    }
    enemy.hp = Math.max(0, enemy.hp - dmg);
    afterPartyAction([enemy]);
  }

  function executeActorFire(actorObj) {
    actorObj.mp -= FIRE_MP_COST;
    const targets = liveEnemies();
    let totalDmg = 0;
    const atk = actorObj === hero ? getHeroAttack() : getAllyAttack(actorObj);
    for (const enemy of targets) {
      const dmg = Math.max(1, Math.floor(atk * 0.85) - enemy.def + rng(0, 2));
      enemy.lastHitType = 'fire';
      enemy.hp = Math.max(0, enemy.hp - dmg);
      totalDmg += dmg;
      triggerEnemyHitEffect(enemy);
      spawnFireEffectOnEnemy(enemy);
    }
    const casterName = actorObj === hero ? 'ゆうしゃ' : actorObj.name;
    msg = targets.length > 1
      ? `${casterName}の　ファイア！　敵全体に ${totalDmg} のダメージ！`
      : `${casterName}の　ファイア！　${totalDmg} のダメージ！`;
    afterPartyAction(targets);
  }

  function executeActorLeafStorm(actorObj) {
    actorObj.mp -= LEAF_STORM_MP_COST;
    const targets = liveEnemies();
    let totalDmg = 0;
    const atk = actorObj === hero ? getHeroAttack() : getAllyAttack(actorObj);
    const baseDamage = Math.max(1, Math.floor(atk * 0.9));
    for (const enemy of targets) {
      if (!enemy || enemy.hp <= 0 || enemy.isDying) continue;
      const dmg = Math.max(1, baseDamage - enemy.def + rng(0, 2));
      enemy.lastHitType = 'leafStorm';
      enemy.hp = Math.max(0, enemy.hp - dmg);
      totalDmg += dmg;
      triggerEnemyHitEffect(enemy);
      spawnLeafStormEffectOnEnemy(enemy);
    }
    const casterName = actorObj === hero ? 'ゆうしゃ' : actorObj.name;
    msg = `${casterName}は　リーフストームを唱えた！`;
    if (targets.length > 0) {
      msg += ` 敵全体に ${totalDmg} のダメージ！`;
    }
    afterPartyAction(targets);
  }

  function executeActorHeal(actorObj, targetPartyId) {
    actorObj.mp -= HEAL_MP_COST;
    const targetMember = getPartyMemberById(targetPartyId, { aliveOnly: true }) || getPartyMembers({ aliveOnly: true })[0];
    if (!targetMember) {
      msg = '回復できる対象がいない！';
      afterPartyAction([]);
      return;
    }
    const target = targetMember.actor;
    const healAmt = Math.min(target.maxHp - target.hp, Math.floor(target.maxHp * 0.4) + rng(0, 5));
    target.hp += healAmt;
    const targetName = getTargetDisplayName(target);
    msg = `${actorObj.name}の　かいふく！　${targetName}のHPが ${healAmt} 回復！`;
    if (currentState === GameState.BATTLE) spawnHealEffect(target, healAmt, 0);
    afterPartyAction([]);
  }

  function executeActorPotion(actorObj, targetPartyId) {
    const targetMember = getPartyMemberById(targetPartyId, { aliveOnly: true }) || getPartyMembers({ aliveOnly: true })[0];
    const casterName  = actorObj === hero ? 'ゆうしゃ' : actorObj.name;
    if (!targetMember) {
      msg = 'ポーションを使える対象がいない！';
      afterPartyAction([]);
      return;
    }
    const result = usePotionOnTarget(targetMember.actor);
    msg = result.ok
      ? `${casterName}が　ポーションを使った！　${targetMember.name}のHPが ${result.healed} 回復！`
      : result.message;
    if (result.ok && currentState === GameState.BATTLE) spawnHealEffect(targetMember.actor, result.healed, 0);
    afterPartyAction([]);
  }

  function executeActorEther(actorObj, targetPartyId) {
    const targetMember = getPartyMemberById(targetPartyId, { aliveOnly: true }) || getPartyMembers({ aliveOnly: true })[0];
    const casterName  = actorObj === hero ? 'ゆうしゃ' : actorObj.name;
    if (!targetMember) {
      msg = 'エーテルを使える対象がいない！';
      afterPartyAction([]);
      return;
    }
    const result = useEther(targetMember.actor);
    msg = result.ok
      ? `${casterName}が　エーテルを使った！　${targetMember.name}のMPが ${result.recovered} 回復！`
      : result.message;
    if (result.ok && currentState === GameState.BATTLE) spawnHealEffect(targetMember.actor, 0, result.recovered);
    afterPartyAction([]);
  }

  function executeActorElixir(actorObj, targetPartyId) {
    const targetMember = getPartyMemberById(targetPartyId, { aliveOnly: true }) || getPartyMembers({ aliveOnly: true })[0];
    const casterName  = actorObj === hero ? 'ゆうしゃ' : actorObj.name;
    if (!targetMember) {
      msg = 'エリクサーを使える対象がいない！';
      afterPartyAction([]);
      return;
    }
    const result = useElixir(targetMember.actor);
    msg = result.ok
      ? `${casterName}が　エリクサーを使った！　${targetMember.name}のHP+${result.healedHp}、MP+${result.healedMp}回復！`
      : result.message;
    if (result.ok && currentState === GameState.BATTLE) spawnHealEffect(targetMember.actor, result.healedHp, result.healedMp);
    afterPartyAction([]);
  }

  function afterPartyAction(enemyTargets) {
    for (const enemy of enemyTargets) {
      if (enemy && enemy.hp <= 0) triggerEnemyDeath(enemy);
    }
    if (isBattleWon()) { queueBattleVictory(); return; }
    setTimeout(processNextBattleActor, 1300);
  }

  function isBattleWon() {
    return battleEnemies.length > 0 && battleEnemies.every(enemy => enemy.hp <= 0 || enemy.isDying);
  }

  function queueBattleVictory() {
    if (battleVictory.pending || battleVictory.active) return;
    battleVictory.pending = true;
    setTimeout(resolveBattleVictory, 900);
  }

  function resolveBattleVictory() {
    const defeatedFoes = battleEnemies.slice();
    for (const defeatedFoe of defeatedFoes) {
      if (defeatedFoe.name === 'スライム') slimeKills++;
      if (defeatedFoe.boss && defeatedFoe.defId === 'demon_lord') {
        flags.defeatedDemonLord = true;
      } else if (defeatedFoe.boss && defeatedFoe.defId === 'demon_general') {
        flags.defeatedDemonGeneral = true;
      } else if (defeatedFoe.boss && defeatedFoe.defId === 'forest_boss') {
        flags.defeatedForestBoss = true;
        flags.gotSeal2 = true;
        flags.gotDemonKey = true;
      } else if (defeatedFoe.boss) {
        flags.defeatedDarkKnight = true;
        flags.gotSeal1 = true;
      }
    }
    const totalExp = defeatedFoes.reduce((sum, enemy) => sum + (enemy.exp || 0), 0);
    const totalGold = defeatedFoes.reduce((sum, enemy) => sum + (enemy.gold || 0), 0);
    const levelResult = gainExp(totalExp);
    hero.gold += totalGold;
    // 仲間にもEXPを付与
    const allyLevelResults = [];
    for (const ally of allies) {
      if (ally.flags.hasAlly) {
        allyLevelResults.push({ ally, result: gainAllyExp(ally, totalExp) });
      }
    }
    const dropMessages = [];
    for (const defeatedFoe of defeatedFoes) {
      if (defeatedFoe.drop && !flags.gotOldFragment && Math.random() < defeatedFoe.drop.chance) {
        flags.gotOldFragment = true;
        dropMessages.push('古い金属片を手に入れた！');
      }
    }
    winMsg = buildVictoryMessages(defeatedFoes, levelResult, totalExp, totalGold, allyLevelResults);
    winMsg.push(...dropMessages);
    if (leafaRescueBattle) {
      leafaRescueBattle = false;
      flags.leafaRescueDone = true;
      flags.leafaJoined = true;
      joinAlly('leafa');
      winMsg.push('リーファ：「助けてくれたの……？」');
      winMsg.push('リーファ：「ありがとう。私も一緒に行く」');
      winMsg.push('リーファが　なかまに　なった！');
    }
    startBattleVictory(winMsg);
  }

  function beginBattleRound() {
    // コマンド選択キューを構築（生きているパーティメンバー順）
    battlePartyQueue = [];
    if (hero.hp > 0) battlePartyQueue.push({ type: 'hero', actor: hero });
    for (const ally of allies) {
      if (ally.flags.hasAlly && ally.hp > 0) {
        battlePartyQueue.push({ type: 'ally', actor: ally });
      }
    }
    pendingPartyActions = [];
    battleCommandActor  = null;
    advancePartyCommandCollection();
  }

  function processNextBattleActor() {
    if (currentState !== GameState.BATTLE || battleVictory.active || battleVictory.pending) return;
    battleTargetMode    = null;
    selectedTargetIndex = 0;

    if (isPartyDefeated()) {
      setGameState(GameState.LOSE);
      return;
    }
    if (isBattleWon()) {
      queueBattleVictory();
      return;
    }
    while (battleTurnQueue.length > 0) {
      const actor = battleTurnQueue.shift();
      if (actor.type === 'hero') {
        if (hero.hp <= 0) continue;
        heroTurn = false;
        hideBtns();
        executePartyAction(actor);
        return;
      }
      if (actor.type === 'ally') {
        if (!actor.actor || actor.actor.hp <= 0) continue;
        heroTurn = false;
        hideBtns();
        executePartyAction(actor);
        return;
      }
      if (actor.type === 'enemy') {
        if (actor.enemy && actor.enemy.hp > 0 && !actor.enemy.isDying) {
          heroTurn = false;
          hideBtns();
          enemyAct(actor.enemy);
          return;
        }
      }
    }
    beginBattleRound();
  }

  // ============================================================
  // 敵のターン（自動で攻撃してくる）
  // ============================================================
  function getTargetDefense(target) {
    return target === hero ? getHeroDefense() : getAllyDefense(target);
  }

  function getBattlePartyTargets({ aliveOnly = true } = {}) {
    const targets = [];
    if (!aliveOnly || hero.hp > 0) targets.push(hero);
    for (const ally of allies) {
      if (!ally.flags.hasAlly) continue;
      if (!aliveOnly || ally.hp > 0) targets.push(ally);
    }
    return targets;
  }

  function applyPartyDamage(targets, damageByTarget) {
    const hits = [];
    for (const target of targets) {
      if (!target || target.hp <= 0) continue;
      const damage = Math.max(1, damageByTarget(target));
      target.hp = Math.max(0, target.hp - damage);
      triggerPartyHitEffect(target, damage);
      hits.push({ target, damage });
    }
    return hits;
  }

  function clearBattleMessageQueue() {
    battleMessageQueue = [];
    if (battleMessageTimer) {
      clearTimeout(battleMessageTimer);
      battleMessageTimer = null;
    }
  }

  function queueBattleMessages(lines, onDone, interval = 1100) {
    clearBattleMessageQueue();
    const queue = Array.isArray(lines) ? lines.filter(Boolean) : [];
    if (!queue.length) {
      if (typeof onDone === 'function') onDone();
      return;
    }
    battleMessageQueue = queue.slice();
    const step = () => {
      if (currentState !== GameState.BATTLE || battleVictory.active || battleVictory.pending) {
        clearBattleMessageQueue();
        return;
      }
      const line = battleMessageQueue.shift();
      if (line) msg = line;
      if (battleMessageQueue.length === 0) {
        battleMessageTimer = setTimeout(() => {
          battleMessageTimer = null;
          if (typeof onDone === 'function') onDone();
        }, interval);
      } else {
        battleMessageTimer = setTimeout(step, interval);
      }
    };
    step();
  }

  function isMageLikeEnemy(enemy) {
    const key = String(enemy?.defId || enemy?.id || '').toLowerCase();
    const name = String(enemy?.name || '');
    return /mage|sorceress|witch/.test(key) || /魔導士|魔女|魔術|魔法/.test(name);
  }

  function getMageEnemySpellLabel(enemy) {
    const key = String(enemy?.defId || enemy?.id || '').toLowerCase();
    if (key.includes('dark_mage')) return '闇の火球';
    if (key.includes('sorceress')) return '黒い波動';
    if (key.includes('witch')) return '呪いの波動';
    return '魔法弾';
  }

  function mageEnemyAct(enemy) {
    const targets = getBattlePartyTargets({ aliveOnly: true });
    const useAoE = Math.random() < 0.45;
    if (useAoE) {
      const spellName = getMageEnemySpellLabel(enemy);
      const baseDamage = Math.max(1, Math.floor(enemy.atk * 0.7) + rng(0, 2));
      const hits = applyPartyDamage(
        targets,
        target => Math.max(1, baseDamage - getTargetDefense(target))
      );
      const lines = [`${enemy.name}は　${spellName}を唱えた！`];
      for (const hit of hits) {
        lines.push(`${getTargetDisplayName(hit.target)}は ${hit.damage} ダメージを受けた！`);
      }
      queueBattleMessages(lines, () => {
        if (isPartyDefeated()) {
          setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
        } else {
          setTimeout(processNextBattleActor, 1300);
        }
      });
      return;
    } else {
      const target = getRandomLivePartyMember();
      const def = getTargetDefense(target);
      const spellName = getMageEnemySpellLabel(enemy);
      const dmg = Math.max(1, Math.floor(enemy.atk * 0.9) - def + rng(-1, 3));
      target.hp = Math.max(0, target.hp - dmg);
      triggerPartyHitEffect(target, dmg);
      const tName = target === hero ? 'ゆうしゃ' : target.name;
      msg = `${enemy.name}の　${spellName}！　${tName}に ${dmg} のダメージ！`;
    }
    if (isPartyDefeated()) {
      setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
    } else {
      setTimeout(processNextBattleActor, 1300);
    }
  }

  function enemyAct(enemy) {
    if (currentState !== GameState.BATTLE || !enemy || enemy.hp <= 0 || enemy.isDying) {
      processNextBattleActor();
      return;
    }
    if (enemy.defId === 'darkKnight')      { darkKnightAct(enemy);    return; }
    if (enemy.defId === 'demon_lord')     { demonLordAct(enemy);     return; }
    if (enemy.defId === 'forest_boss')    { forestBossAct(enemy);    return; }
    if (enemy.defId === 'demon_general')  { demonGeneralAct(enemy);  return; }
    if (isMageLikeEnemy(enemy))           { mageEnemyAct(enemy);     return; }
    const target = getRandomLivePartyMember();
    const dmg = Math.max(1, enemy.atk - getTargetDefense(target) + rng(-1, 3));
    target.hp  = Math.max(0, target.hp - dmg);
    triggerPartyHitEffect(target, dmg);
    const tName = target === hero ? 'ゆうしゃ' : target.name;
    msg = `${enemy.name}の　こうげき！　${tName}に ${dmg} のダメージ！`;
    if (isPartyDefeated()) {
      setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
    } else {
      setTimeout(processNextBattleActor, 1300);
    }
  }

  function finishEnemyAction() {
    if (isPartyDefeated()) {
      setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
    } else {
      setTimeout(processNextBattleActor, 1300);
    }
  }

  function forestBossAct(enemy) {
    const roll = Math.random();
    if (roll < 0.55) {
      const target = getRandomLivePartyMember();
      const def = getTargetDefense(target);
      const dmg = Math.max(1, enemy.atk - def + rng(-1, 3));
      target.hp = Math.max(0, target.hp - dmg);
      triggerPartyHitEffect(target, dmg);
      msg = `${enemy.name}の　こうげき！　${dmg} のダメージ！`;
      finishEnemyAction();
      return;
    }
    if (roll < 0.85) {
      const target = getRandomLivePartyMember();
      const def = getTargetDefense(target);
      const dmg = Math.max(1, Math.floor(enemy.atk * 1.25) - def + rng(0, 3));
      target.hp = Math.max(0, target.hp - dmg);
      triggerPartyHitEffect(target, dmg);
      msg = `${enemy.name}の　根の一撃！　${dmg} のダメージ！`;
      finishEnemyAction();
      return;
    }
    const targets = getBattlePartyTargets({ aliveOnly: true });
    const baseDamage = Math.max(1, Math.floor(enemy.atk * 0.8) + rng(0, 2));
    const hits = applyPartyDamage(
      targets,
      target => Math.max(1, baseDamage - getTargetDefense(target))
    );
    const lines = [`${enemy.name}は　毒の胞子をまき散らした！`];
    for (const hit of hits) {
      lines.push(`${getTargetDisplayName(hit.target)}は ${hit.damage} ダメージを受けた！`);
    }
    queueBattleMessages(lines, finishEnemyAction);
  }

  function demonGeneralAct(enemy, allowExtraAction = true) {
    const roll = Math.random();
    if (roll < 0.55) {
      const target = getRandomLivePartyMember();
      const def = getTargetDefense(target);
      const dmg = Math.max(1, enemy.atk - def + rng(-1, 3));
      target.hp = Math.max(0, target.hp - dmg);
      triggerPartyHitEffect(target, dmg);
      msg = `${enemy.name}の　こうげき！　${dmg} のダメージ！`;
    } else if (roll < 0.85) {
      const target = getRandomLivePartyMember();
      const def = getTargetDefense(target);
      const dmg = Math.max(1, Math.floor(enemy.atk * 1.45) - def + rng(-1, 3));
      target.hp = Math.max(0, target.hp - dmg);
      triggerPartyHitEffect(target, dmg);
      msg = `${enemy.name}の　大剣の一撃！　${dmg} のダメージ！`;
    } else {
      const targets = getBattlePartyTargets({ aliveOnly: true });
      const baseDamage = Math.max(1, Math.floor(enemy.atk * 0.85) + rng(0, 2));
      const hits = applyPartyDamage(
        targets,
        target => Math.max(1, baseDamage - getTargetDefense(target))
      );
      const lines = [`${enemy.name}は　闇の咆哮を放った！`];
      for (const hit of hits) {
        lines.push(`${getTargetDisplayName(hit.target)}は ${hit.damage} ダメージを受けた！`);
      }
      queueBattleMessages(lines, () => {
        if (isPartyDefeated()) {
          setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
          return;
        }
        if (allowExtraAction && Math.random() < 0.30) {
          setTimeout(() => {
            if (currentState === GameState.BATTLE && !battleVictory.active && !battleVictory.pending && !isPartyDefeated() && enemy.hp > 0 && !enemy.isDying) {
              demonGeneralAct(enemy, false);
            }
          }, 1200);
        } else {
          setTimeout(processNextBattleActor, 1300);
        }
      });
      return;
    }
    if (isPartyDefeated()) {
      setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
      return;
    }
    if (allowExtraAction && Math.random() < 0.30) {
      setTimeout(() => {
        if (currentState === GameState.BATTLE && !battleVictory.active && !battleVictory.pending && !isPartyDefeated() && enemy.hp > 0 && !enemy.isDying) {
          demonGeneralAct(enemy, false);
        }
      }, 1200);
    } else {
      setTimeout(processNextBattleActor, 1300);
    }
  }

  function demonLordAct(enemy, allowExtraAction = true) {
    const target  = getRandomLivePartyMember();
    const def     = getTargetDefense(target);
    const enraged = enemy.hp <= enemy.maxHp * 0.5;
    const roll    = Math.random();
    let action    = 'normal';
    if (enraged) {
      if (roll < 0.45) action = 'normal';
      else if (roll < 0.8) action = 'heavy';
      else action = 'wide';
    } else {
      if (roll < 0.6) action = 'normal';
      else if (roll < 0.85) action = 'heavy';
      else action = 'wide';
    }

    let dmg = 1;
    if (action === 'heavy') {
      dmg = Math.max(1, Math.floor((enemy.atk * 1.5) - def + rng(-1, 3)));
      msg = `${enemy.name}の　暗黒斬！　${dmg} のダメージ！`;
    } else if (action === 'wide') {
      const partyTargets = getBattlePartyTargets({ aliveOnly: true });
      const baseDamage = Math.max(1, Math.floor((enemy.atk * 0.85) + rng(0, 2)));
      const hits = applyPartyDamage(
        partyTargets,
        target => Math.max(1, baseDamage - getTargetDefense(target))
      );
      const lines = [`${enemy.name}の　闇の波動！`];
      for (const hit of hits) {
        lines.push(`${getTargetDisplayName(hit.target)}は ${hit.damage} ダメージを受けた！`);
      }
      queueBattleMessages(lines, () => {
        if (isPartyDefeated()) {
          setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
          return;
        }
        const extraActionChance = enraged ? 0.50 : 0.30;
        if (allowExtraAction && Math.random() < extraActionChance) {
          setTimeout(() => {
            if (currentState === GameState.BATTLE && !battleVictory.active && !battleVictory.pending && !isPartyDefeated() && enemy.hp > 0 && !enemy.isDying) {
              demonLordAct(enemy, false);
            }
          }, 1200);
        } else {
          setTimeout(processNextBattleActor, 1300);
        }
      });
      return;
    } else {
      dmg = Math.max(1, enemy.atk - def + rng(-1, 3));
      msg = `${enemy.name}の　こうげき！　${dmg} のダメージ！`;
    }
    target.hp = Math.max(0, target.hp - dmg);
    triggerPartyHitEffect(target, dmg);
    if (isPartyDefeated()) {
      setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
      return;
    }
    const extraActionChance = enraged ? 0.50 : 0.30;
    if (allowExtraAction && Math.random() < extraActionChance) {
      setTimeout(() => {
        if (currentState === GameState.BATTLE && !battleVictory.active && !battleVictory.pending && !isPartyDefeated() && enemy.hp > 0 && !enemy.isDying) {
          demonLordAct(enemy, false);
        }
      }, 1200);
    } else {
      setTimeout(processNextBattleActor, 1300);
    }
  }

  function darkKnightAct(enemy) {
    const roll = Math.random();
    if (roll < 0.7) {
      const target = getRandomLivePartyMember();
      const def = getTargetDefense(target);
      const dmg = Math.max(1, enemy.atk - def + rng(-1, 3));
      target.hp = Math.max(0, target.hp - dmg);
      triggerPartyHitEffect(target, dmg);
      const tName = target === hero ? 'ゆうしゃ' : target.name;
      msg = `${enemy.name}の　こうげき！　${tName}に ${dmg} のダメージ！`;
    } else {
      const target = getRandomLivePartyMember();
      const def = getTargetDefense(target);
      const dmg = Math.max(1, Math.floor(enemy.atk * 1.25) - def + rng(-1, 3));
      target.hp = Math.max(0, target.hp - dmg);
      triggerPartyHitEffect(target, dmg);
      const tName = target === hero ? 'ゆうしゃ' : target.name;
      msg = `${enemy.name}の　闇の斬撃！　${tName}に ${dmg} のダメージ！`;
    }
    if (isPartyDefeated()) {
      setTimeout(() => { setGameState(GameState.LOSE); }, 1000);
    } else {
      setTimeout(processNextBattleActor, 1300);
    }
  }

  // ============================================================
  // NPC ロール・イベントシステム
  // ============================================================

  function getNpcRole(npc) {
  return getNpcRoleSystem(npc);
}

  // ============================================================
  // NPC 会話テーブル（npcId → flags を見てセリフ配列を返す）
  // 副作用なし。新規NPC追加時はここにエントリを追加するだけでよい。
  // ============================================================
 const NPC_DIALOGUES = createNpcDialogues({
  flags,
  getSlimeKills: () => slimeKills,
  getQuestRewardMsg: () => questRewardMsg,
});

function getNpcLines(npc) {

  return getNpcLinesSystem(npc, {

    NPC_DIALOGUES,

    getNpcRole,

  });

}
  // ============================================================
  // NPC イベントテーブル（会話開始時に一度だけ呼ばれる副作用）
  // ============================================================
  
const NPC_EVENTS = createNpcEvents({
  flags,
  getSlimeKills: () => slimeKills,
  isQuestDone: () => questDone,
  setQuestDone: value => {
    questDone = value;
  },
  setQuestRewardMsg: value => {
    questRewardMsg = value;
  },
  gainExp,
  hero,
  showNotice,
});

  // NPC との会話開始時に呼ばれる個別イベントフック
  function handleNpcEvent(npc) {
    if (npc.npcId && NPC_EVENTS[npc.npcId]) {
      NPC_EVENTS[npc.npcId]();
    }
  }

  function handleDialogueComplete(npc) {
  const action = getDialogueCompleteAction(npc);

  if (action.type === 'setFlag') {
    flags[action.flagKey] = action.value;
    return;
  }

  if (action.type === 'startLeafaRescueBattle') {
    setTimeout(startLeafaRescueBattle, action.delay);
  }
}

  // ============================================================
  // プレイヤーの移動
  // ============================================================
  function isHouseMap(map) {
    return Object.values(houseMaps).includes(map);
  }

  function getAdjacentBoss() {
    return getAdjacentEntity('boss');
  }

  function scheduleEncounterBattle() {
  if (encounterTimer) return;

  encounterTimer = setTimeout(() => {
    encounterTimer = null;
    startBattle();
  }, 80);
}

function handleEventEntityInteraction(heroBox) {
  const eventEntity = getEventEntityForBox(heroBox);

  if (!eventEntity) {
    lastEventEntityKey = null;
    return false;
  }

  const key = getEntityKey(eventEntity);

  if (key !== lastEventEntityKey) {
    lastEventEntityKey = key;
    eventEntity.interact();
  }

  return true;
}

function checkRandomEncounterAtHeroTile() {
  const tx = heroTileX();
  const ty = heroTileY();
  const tile = tileAt(tx, ty);
  const terrainKey = createEncounterTerrainKey(getCurrentMapId(), tx, ty);

  const encounterResult = shouldStartEncounter({
    heroJustExited: hero.justExited,
    encounterTimer,
    terrainKey,
    lastEncounterTerrainKey,
    encounterTable: resolveEncounterTable(),
    tile,
    tileHasEncounter,
    encounterRate: ENC_RATE,
    random: Math.random,
  });

  lastEncounterTerrainKey = encounterResult.nextLastEncounterTerrainKey;

  if (encounterResult.shouldStart) {
    scheduleEncounterBattle();
  }
}

function handleUnreadSignInteraction(heroBox) {
  const unreadSign = getCollidingEntity(heroBox, 'sign');

  if (!shouldOpenUnreadSign(unreadSign, flags)) {
    return false;
  }

  openSignRead(unreadSign);
  return true;
}

  function checkTileEvents() {
    const heroBox = getCollisionBox(hero);
    if (handleEventEntityInteraction(heroBox)) {
        return;
    }
    if (handleUnreadSignInteraction(heroBox)) {
        return;
    }
    checkRandomEncounterAtHeroTile();
}

  function getRestoreQuestAndFlagsDeps() {
  return {
    flags,
    setQuestState: state => {
      slimeKills = state.slimeKills;
      questDone = state.questDone;
      questRewardMsg = state.questRewardMsg;
    },
  };
}

function getRestoreHeroDeps() {
  return {
    hero,
    WEAPONS,
    ARMORS,
    HERO_WALK_IDLE_FRAME,
    ensureInventory,
    normalizeSavedPoint,
    tileToPx,
    isItemAllowedForActor,
    setHeroDirection,
  };
}

  function getSaveSystemDeps() {
  return {
    hero,
    flags,
    runtimeState,
    allies,
    slimeKills,
    questDone,
    questRewardMsg,
    getCurrentMapId,
  };
}

function getRestoreReturnPointsDeps() {
  return {
    runtimeState,
    normalizeSavedPoint,
  };
}

function getRestoreCurrentMapDeps() {
  return {
    runtimeState,
    houseMaps,
    getMapTilesById,
    isHouseMap,
    heroTileX,
    heroTileY,
    mapCols,
    mapRows,
    hero,
    tileToPx,
  };
}

function getRestoreAlliesDeps() {
  return {
    ALLY_DEFS,
    WEAPONS,
    ARMORS,
    isItemAllowedForActor,
    flags,
    setAllies: restoredAllies => {
      allies = restoredAllies;
    },
  };
}

function saveGame() {
  ensureInventory();

  const data = createSaveData(getSaveSystemDeps());

  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  showNotice('セーブしました');
}

function resetStateAfterLoad() {
  setGameState(GameState.MAP);

  foe = null;
  battleEnemies = [];
  battleTurnQueue = [];
  pendingPartyActions = [];
  battlePartyQueue = [];
  battleCommandActor = null;
  battleTargetMode = null;
  selectedTargetIndex = 0;

  clearBattleIntro();

  talkNpc = null;
  talkPage = 0;
  activeSign = null;
  readPage = 0;

  equipCursor = 0;
  equipMenuMode = 'main';
  equipCharacterIndex = 0;
  charaTabIndex = 0;
  equipSlotCursor = 0;
  itemCursor = 0;
  itemUseId = 'potion';
  itemTargetIndex = 0;
  shopCursor = 0;

  snapDrawPos();
  hideBtns();
}

function startNewGameFromLoad() {
  setStartPosition();
  setGameState(GameState.MAP);

  foe = null;
  battleEnemies = [];
  battleTurnQueue = [];
  battleTargetMode = null;
  selectedTargetIndex = 0;

  clearBattleIntro();

  talkNpc = null;
  talkPage = 0;
  activeSign = null;
  readPage = 0;

  equipCursor = 0;
  equipMenuMode = 'main';
  equipCharacterIndex = 0;
  charaTabIndex = 0;
  equipSlotCursor = 0;
  itemCursor = 0;
  itemUseId = 'potion';
  itemTargetIndex = 0;
  shopCursor = 0;

  hideBtns();
}

function restoreGameDataFromSave(data) {
  restoreHeroFromSave(data, getRestoreHeroDeps());
  restoreQuestAndFlagsFromSave(data, getRestoreQuestAndFlagsDeps());
  restoreReturnPointsFromSave(data, getRestoreReturnPointsDeps());
  restoreCurrentMapFromSave(data, getRestoreCurrentMapDeps());
  restoreAlliesFromSave(data, getRestoreAlliesDeps());
}

function loadGame() {
  const saveResult = readSaveData(localStorage, SAVE_KEY);

 if (!saveResult.ok && saveResult.reason === 'empty') {
  startNewGameFromLoad();
  showNotice('セーブデータがありません');
  return;
}

  if (!saveResult.ok) {
    showNotice('ロードに失敗しました');
    return;
  }

  try {
        const data = saveResult.data;

        restoreGameDataFromSave(data);
        resetStateAfterLoad();
        showNotice('ロードしました');
  } catch (e) {
    showNotice('ロードに失敗しました');
  }
}

  function openEquipMenu() {
  equipCursor = 0;
  equipMenuMode = 'main';
  equipCharacterIndex = 0;
  charaTabIndex = 0;
  equipSlotCursor = 0;
  itemCursor = 0;
  itemUseId = 'potion';
  itemTargetIndex = 0;
  setGameState(GameState.EQUIP);
}

function handleEquipInput(e) {
  if (e.key === 'Escape' || e.key === 'x' || e.key === 'X') {
    e.preventDefault();
    if (equipMenuMode === 'equip_slot') {
      equipMenuMode = 'chara';
      return;
    }
    if (equipMenuMode === 'chara' || equipMenuMode === 'items') {
      equipMenuMode = 'main';
      equipCursor = 0;
      return;
    }
    if (equipMenuMode === 'itemTarget') {
      equipMenuMode = 'items';
      return;
    }
    setGameState(GameState.MAP);
    return;
  }

  if (e.key === 'e' || e.key === 'E') {
    e.preventDefault();
    setGameState(GameState.MAP);
    return;
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (equipMenuMode === 'main') {
      equipCursor = (equipCursor + 1) % 2;
    } else if (equipMenuMode === 'chara') {
      charaTabIndex = (charaTabIndex + 1) % 2;
    } else if (equipMenuMode === 'equip_slot') {
      equipSlotCursor = (equipSlotCursor + 1) % 2;
    } else if (equipMenuMode === 'items') {
      const items = getUsableItems();
      itemCursor = items.length ? (itemCursor + items.length - 1) % items.length : 0;
    } else if (equipMenuMode === 'itemTarget') {
      const members = getPartyMembers({ aliveOnly: true });
      itemTargetIndex = members.length ? (itemTargetIndex + members.length - 1) % members.length : 0;
    }
    return;
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (equipMenuMode === 'main') {
      equipCursor = (equipCursor + 1) % 2;
    } else if (equipMenuMode === 'chara') {
      charaTabIndex = (charaTabIndex + 1) % 2;
    } else if (equipMenuMode === 'equip_slot') {
      equipSlotCursor = (equipSlotCursor + 1) % 2;
    } else if (equipMenuMode === 'items') {
      const items = getUsableItems();
      itemCursor = items.length ? (itemCursor + 1) % items.length : 0;
    } else if (equipMenuMode === 'itemTarget') {
      const members = getPartyMembers({ aliveOnly: true });
      itemTargetIndex = members.length ? (itemTargetIndex + 1) % members.length : 0;
    }
    return;
  }

  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    const delta = e.key === 'ArrowLeft' ? -1 : 1;

    if (equipMenuMode === 'chara' || equipMenuMode === 'equip_slot') {
      const members = getPartyMembers();
      equipCharacterIndex = members.length
        ? (equipCharacterIndex + members.length + delta) % members.length
        : 0;

      if (equipMenuMode === 'equip_slot') {
        equipSlotCursor = 0;
      }
    } else if (equipMenuMode === 'itemTarget') {
      const members = getPartyMembers({ aliveOnly: true });
      itemTargetIndex = members.length
        ? (itemTargetIndex + members.length + delta) % members.length
        : 0;
    } else if (equipMenuMode === 'main') {
      equipCursor = (equipCursor + 1) % 2;
    }
    return;
  }

  if (e.key === 'Enter' || e.key === ' ' || e.key === 'z' || e.key === 'Z') {
    e.preventDefault();

    if (equipMenuMode === 'main') {
      if (equipCursor === 0) {
        equipMenuMode = 'chara';
        charaTabIndex = 0;
        equipCharacterIndex = 0;
      } else {
        equipMenuMode = 'items';
        itemCursor = 0;
        itemUseId = 'potion';
        itemTargetIndex = 0;
      }
      return;
    }

    if (equipMenuMode === 'chara') {
      if (charaTabIndex === 0) {
        equipMenuMode = 'equip_slot';
        equipSlotCursor = 0;
      }
      return;
    }

    if (equipMenuMode === 'equip_slot') {
      const member = getPartyMembers()[equipCharacterIndex];

      if (member && member.actor) {
        const changed = cycleActorEquipment(
          member.actor,
          equipSlotCursor === 0 ? 'weapon' : 'armor',
          1
        );

        if (!changed) {
          showNotice('装備できるものがない！');
        }
      } else {
        showNotice('装備できるものがない！');
      }

      refreshStatusBar();
      return;
    }

    if (equipMenuMode === 'items') {
      const selectedItem = getUsableItems()[itemCursor] || ITEMS.potion;

      if (getItemCount(selectedItem.id) <= 0) {
        showNotice(`${selectedItem.name}を持っていない！`);
      } else {
        equipMenuMode = 'itemTarget';
        itemUseId = selectedItem.id;
        itemTargetIndex = 0;
      }
      return;
    }

    if (equipMenuMode === 'itemTarget') {
      const members = getPartyMembers({ aliveOnly: true });
      const member = members[itemTargetIndex];

      const result = itemUseId === 'ether'
        ? useEther(member && member.actor)
        : itemUseId === 'elixir'
          ? useElixir(member && member.actor)
          : usePotionOnTarget(member && member.actor);

      showNotice(result.message);

      if (result.ok || getItemCount(itemUseId) <= 0) {
        equipMenuMode = 'items';
      }

      refreshStatusBar();
      return;
    }
  }
}

  // ============================================================
  // キーボード入力
  // ============================================================
  document.addEventListener('keydown', e => {
    if (e.shiftKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      saveGame();
      return;
    }
    if (e.shiftKey && (e.key === 'l' || e.key === 'L')) {
      e.preventDefault();
      loadGame();
      return;
    }
    if (currentState === GameState.TITLE) {
      handleTitleInput(e);
      return;
    }
    if (currentState === GameState.PROLOGUE) {
      if (e.key === 'Escape' || e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        skipPrologue();
      } else if (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        if (!prologueState.cooldown) advancePrologueLine();
      }
      return;
    }
    if (currentState === GameState.MAP) {
      if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        openEquipMenu();
        return;
        }
      if (e.key === 'ArrowUp'    || e.key === 'w') { e.preventDefault(); keys.up = true; }
      if (e.key === 'ArrowDown'  || e.key === 's') { e.preventDefault(); keys.down = true; }
      if (e.key === 'ArrowLeft'  || e.key === 'a') { e.preventDefault(); keys.left = true; }
      if (e.key === 'ArrowRight' || e.key === 'd') { e.preventDefault(); keys.right = true; }
      // Space・Enter・Z で隣接した対象に話しかける/調べる
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        const adj = getAdjacentInteractable();
        if (adj) {
          adj.interact();
        } else {
          const boss = getAdjacentBoss();
          if (boss) boss.interact();
        }
      }
   
      } else if (currentState === GameState.EQUIP) {
        handleEquipInput(e);
        }
      else if (currentState === GameState.BATTLE) {
      if (battleIntro.active && (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        if (!battleIntro.unskippable) skipBattleIntro();
        return;
      }
      if (battleTargetMode) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          moveTargetSelection(-1);
          return;
        }
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          moveTargetSelection(1);
          return;
        }
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
          e.preventDefault();
          confirmTargetSelection();
          return;
        }
        if (e.key === 'Escape' || e.key === 'x' || e.key === 'X') {
          e.preventDefault();
          cancelTargetSelection();
          return;
        }
      }
      if (battleVictory.active && (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z')) {
        e.preventDefault();
        advanceBattleVictory();
        return;
      }
      if (heroTurn && !battleVictory.active && !battleVictory.pending) {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          moveBattleCommand(-1);
          return;
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          moveBattleCommand(1);
          return;
        }
        if (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
          e.preventDefault();
          confirmBattleCommand();
          return;
        }
      }
    } else if (currentState === GameState.SHOP) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveShopCursor(-1);
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveShopCursor(1);
        return;
      }
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        confirmShopChoice();
        return;
      }
      if (e.key === 'Escape' || e.key === 'x' || e.key === 'X') {
        e.preventDefault();
        closeShop();
        return;
      }
    } else if (currentState === GameState.TALK) {
      // Space・Enter・Z・Escape でセリフを進める／会話を閉じる
      if (e.key === ' ' || e.key === 'Enter' || e.key === 'z' || e.key === 'Z'
          || e.key === 'Escape') {
        e.preventDefault();
        advanceDialogue();
      }
    } else if (currentState === GameState.WIN) {
      backToMap();
    } else if (currentState === GameState.LOSE) {
      continueAfterGameOver();
    } else if (currentState === GameState.ENDING) {
      resetGame();
    }
  });

  document.addEventListener('keyup', e => {
    if (e.key === 'ArrowUp'    || e.key === 'w') keys.up = false;
    if (e.key === 'ArrowDown'  || e.key === 's') keys.down = false;
    if (e.key === 'ArrowLeft'  || e.key === 'a') keys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
  });

  // マップへ戻る
  function backToMap() {
    setGameState(GameState.MAP);
    foe      = null;
    battleEnemies = [];
    battleTurnQueue = [];
    battleTargetMode = null;
    selectedTargetIndex = 0;
    clearBattleIntro();
    winMsg   = '';
    battleVictory = { active: false, pending: false, messages: [], index: 0 };
    clearFireEffectsUI(); clearLeafEffectsUI(); clearSlashEffectsUI(); clearHitEffectsUI();
    clearBattleMessageQueue();
    hideBtns();
  }

  function recoverActorAfterGameOver(actor) {
    if (!actor) return;
    actor.hp = actor.maxHp;
    actor.mp = actor.maxMp;
    if ('isDead' in actor) actor.isDead = false;
    if ('isDying' in actor) actor.isDying = false;
    if ('guard' in actor) actor.guard = false;
    if ('statusEffects' in actor) {
      actor.statusEffects = Array.isArray(actor.statusEffects) ? [] : [];
    }
    if ('status' in actor) actor.status = null;
    if ('tempStatus' in actor) actor.tempStatus = null;
  }

  // ゲームオーバー後の復帰。成長・所持品・進行・宝箱状態は維持する。
  function continueAfterGameOver() {
    recoverActorAfterGameOver(hero);
    for (const ally of allies) {
      if (ally && ally.flags && ally.flags.hasAlly) {
        recoverActorAfterGameOver(ally);
      }
    }
    setStartPosition();
    setGameState(GameState.MAP);
    foe = null;
    battleEnemies = [];
    battleTurnQueue = [];
    battleTargetMode = null;
    selectedTargetIndex = 0;
    clearBattleIntro();
    heroTurn = true;
    currentBattleBgKey = 'field';
    winMsg = '';
    battleVictory = { active: false, pending: false, messages: [], index: 0 };
    talkNpc = null;
    talkPage = 0;
    activeSign = null;
    readPage = 0;
    clearFireEffectsUI(); clearLeafEffectsUI(); clearSlashEffectsUI(); clearHitEffectsUI();
    hideBtns();
    showNotice('ヒカリのまちへ戻された…');
  }

  // ゲームをリセット（最初から）
  function resetGame() {
    hero.level = 1;
    hero.exp = 0;
    hero.maxHp = 30;
    hero.maxMp = 120;
    hero.hp = hero.maxHp;
    hero.mp = hero.maxMp;
    hero.atk = 700;
    hero.def = 0;
    hero.speed = 100;
    hero.weapon = 'woodSword';
    hero.armor = 'travelerClothes';
    hero.weaponsOwned = ['woodSword'];
    hero.armorsOwned = ['travelerClothes'];
    hero.gold = 0;
    hero.potions = 0;
    hero.inventory = { ether: 0 };
    itemCursor = 0;
    itemUseId = 'potion';
    itemTargetIndex = 0;
    shopCursor = 0;
    slimeKills = 0;
    questDone = false;
    questRewardMsg = '';
    shopMsg = '';
    for (const key of Object.keys(flags)) flags[key] = false;
    runtimeState.townReturn = { x: tileToPx(10), y: tileToPx(2), exitDir: 'down' };
    runtimeState.dungeonReturn = { x: tileToPx(13), y: tileToPx(8), exitDir: 'up' };
    runtimeState.field2Return = { x: tileToPx(2), y: tileToPx(10), exitDir: 'up' };
    runtimeState.shadowTownReturn = { x: tileToPx(3), y: tileToPx(1), exitDir: 'down' };
    runtimeState.cursedForestReturn = { x: tileToPx(3), y: tileToPx(10), exitDir: 'up' };
    runtimeState.outpostReturn = { x: tileToPx(12), y: tileToPx(5), exitDir: 'right' };
    runtimeState.houseReturn = { x: tileToPx(6), y: tileToPx(5) };
    runtimeState.castleReturn  = { x: tileToPx(12), y: tileToPx(1), exitDir: 'down' };
    setStartPosition();
    foe     = null;
    battleEnemies = [];
    battleTurnQueue = [];
    battleTargetMode = null;
    selectedTargetIndex = 0;
    clearBattleIntro();
    heroTurn = true;
    currentBattleBgKey = 'field';
    winMsg = '';
    battleVictory = { active: false, pending: false, messages: [], index: 0 };
    talkNpc = null;
    talkPage = 0;
    activeSign = null;
    readPage = 0;
    clearFireEffectsUI(); clearLeafEffectsUI(); clearSlashEffectsUI(); clearHitEffectsUI();
    hideBtns();
  }

  // ============================================================
  // ゲーム開始！
  // ============================================================
  loadTileImages();   // tiles/ フォルダの画像を非同期ロード開始
  loadSpriteImages(); // sprites/ フォルダの画像を非同期ロード開始
  loop();   