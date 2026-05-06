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
  openShop as openShopSystem,
  moveShopCursor as moveShopCursorSystem,
  confirmShopChoice as confirmShopChoiceSystem,
  closeShop as closeShopSystem,
  getShopAction as getShopActionSystem,
  getShopOptions as getShopOptionsSystem,
  buyPotion as buyPotionSystem,
  buyEther as buyEtherSystem,
  buyElixir as buyElixirSystem,
  buySteelSword as buySteelSwordSystem,
  buyIronArmor as buyIronArmorSystem,
  buyLeatherArmor as buyLeatherArmorSystem,
  buyMageStaff as buyMageStaffSystem,
  buyGreenRobe as buyGreenRobeSystem,
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
  openDialogue as openDialogueSystem,
  openSignRead as openSignReadSystem,
  advanceDialogue as advanceDialogueSystem,
  handleNpcEvent as handleNpcEventSystem,
handleDialogueComplete as handleDialogueCompleteSystem,
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
  drawHeroEntity as drawHeroEntityUI,
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
  placeHeroOutsideDoor as placeHeroOutsideDoorSystem,
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
  resolveTransitionAttempt as resolveTransitionAttemptSystem,
  resolveTransitionDestination as resolveTransitionDestinationSystem,
  applyTransitionRuntimeState as applyTransitionRuntimeStateSystem,
  getTileRenderMeta as getTileRenderMetaSystem,
  calculateRenderCamera as calculateRenderCameraSystem,
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

import {
  getEventEntityForBox as getEventEntityForBoxSystem,
  getEntityKey as getEntityKeySystem,
  getCollidingEntity as getCollidingEntitySystem,
  getBlockingEntityForBox as getBlockingEntityForBoxSystem,
  setupHeroEntity as setupHeroEntitySystem,
} from './systems/interactionSystem.js';

import {
  isColliding as isCollidingSystem,
  centeredBottomHitbox as centeredBottomHitboxSystem,
  entranceHitbox as entranceHitboxSystem,
  getCollisionBox as getCollisionBoxSystem,
} from './systems/collisionSystem.js';

import {
  tileAt as tileAtSystem,
  isBlockedTile as isBlockedTileSystem,
  canPlaceHeroAt as canPlaceHeroAtSystem,
  updateHeroVelocityFromKeys as updateHeroVelocityFromKeysSystem,
  applyHeroVelocity as applyHeroVelocitySystem,
  tickHeroJustExited as tickHeroJustExitedSystem,
  syncHeroDrawPosition as syncHeroDrawPositionSystem,
} from './systems/movementSystem.js';

import {
  makeChestEntity as makeChestEntitySystem,
  makeSignEntity as makeSignEntitySystem,
  makeHouseEntity as makeHouseEntitySystem,
  makeNpcEntity as makeNpcEntitySystem,
  makeEnemyNpcEntity as makeEnemyNpcEntitySystem,
  makeBossEntity as makeBossEntitySystem,
  makeForestBossEntity as makeForestBossEntitySystem,
  makeDemonGeneralEntity as makeDemonGeneralEntitySystem,
  makeDemonLordEntity as makeDemonLordEntitySystem,
  makeLeafaForestEntranceEntity as makeLeafaForestEntranceEntitySystem,
  makeLeafaRescueEntity as makeLeafaRescueEntitySystem,
  addDecorEntities as addDecorEntitiesSystem,
  addHouseEntities as addHouseEntitiesSystem,
  addEntranceEntities as addEntranceEntitiesSystem,
  makeDecorEntity as makeDecorEntitySystem,
  getDecorDrawSize as getDecorDrawSizeSystem,
  getGroundedTileDrawRect as getGroundedTileDrawRectSystem,
  resolveEntityDrawSize as resolveEntityDrawSizeSystem,
  makeEntranceEntity as makeEntranceEntitySystem,
  makeEntranceFromDef as makeEntranceFromDefSystem,  
  findHouseDefById as findHouseDefByIdSystem,
  makeHouseEntranceEntity as makeHouseEntranceEntitySystem,
  makeHouseDoorRect as makeHouseDoorRectSystem, 
  addNpcEntities as addNpcEntitiesSystem,
  addSignEntities as addSignEntitiesSystem,
  addChestEntities as addChestEntitiesSystem,
  addSpecialEventEntities as addSpecialEventEntitiesSystem,
  updateEntities as updateEntitiesSystem,
  drawEntities as drawEntitiesSystem,
  syncEntities as syncEntitiesSystem,
} from './systems/entitySystem.js';

import {
  drawSignEntity as drawSignEntityUI,
  genericTileFallback,
  drawTileFallback as drawTileFallbackUI,
  drawVisibleTiles as drawVisibleTilesUI,
  drawMapOverlay as drawMapOverlayUI,
  renderMap as renderMapUI,
} from './ui/mapUI.js';

import {
  renderTitle as renderTitleUI,
} from './ui/titleUI.js';

import {
  handleTitleInput as handleTitleInputSystem,
  startTitleMenuAction as startTitleMenuActionSystem,
} from './systems/titleSystem.js';

import {
  isConfirmKey as isConfirmKeySystem,
  isCancelKey as isCancelKeySystem,
  isMoveUpKey as isMoveUpKeySystem,
  isMoveDownKey as isMoveDownKeySystem,
  updateMoveKeyDown as updateMoveKeyDownSystem,
  updateMoveKeyUp as updateMoveKeyUpSystem,
  handleSaveLoadShortcut as handleSaveLoadShortcutSystem,
  handlePrologueInput as handlePrologueInputSystem,
  handleMapInput as handleMapInputSystem,
  handleBattleInput as handleBattleInputSystem,
  handleShopInput as handleShopInputSystem,
  handleTalkInput as handleTalkInputSystem,
  handleKeyDown as handleKeyDownSystem,
  handleKeyUp as handleKeyUpSystem,
} from './systems/inputSystem.js';

import {
  updateCurrentState as updateCurrentStateSystem,
  drawCurrentState as drawCurrentStateSystem,
} from './systems/gameLoopSystem.js';

import {
  moveEquipCursor as moveEquipCursorSystem,
  moveEquipHorizontal as moveEquipHorizontalSystem,
  cancelEquipMenu as cancelEquipMenuSystem,
  confirmEquipMenu as confirmEquipMenuSystem,
  handleEquipInput as handleEquipInputSystem,
} from './systems/equipSystem.js';

import {
  renderEquipMenu as renderEquipMenuUI,
} from './ui/equipUI.js';

import {
  renderTalkWindow as renderTalkWindowUI,
  drawTalk as drawTalkUI,
} from './ui/dialogueUI.js';

import {
  renderLose as renderLoseUI,
  renderEnding as renderEndingUI,
} from './ui/resultUI.js';

import {
  continueAfterGameOver as continueAfterGameOverSystem,
  resetBattleAndUiState as resetBattleAndUiStateSystem,
  resetHeroForNewGame as resetHeroForNewGameSystem,
  resetProgressUiStateForNewGame as resetProgressUiStateForNewGameSystem,
  resetFlagsForNewGame as resetFlagsForNewGameSystem,
  resetRuntimeStateForNewGame as resetRuntimeStateForNewGameSystem,
  resetGame as resetGameSystem,
} from './systems/gameStateSystem.js';

import {
  startPrologue as startPrologueSystem,
  advancePrologueLine as advancePrologueLineSystem,
  finishPrologue as finishPrologueSystem,
  skipPrologue as skipPrologueSystem,
} from './systems/prologueSystem.js';

import {
  refreshStatusBar as refreshStatusBarSystem,
  showShopBtns as showShopBtnsSystem,
} from './systems/uiSystem.js';

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

function getDialogueSystemDeps() {
  return {
    GameState,

    activeSign,
    readPage,
    talkNpc,
    talkPage,
    flags,

    NPC_EVENTS,

    getNpcRole,
    fullRecoverParty,
    getNpcLines,
    getSignReadLines,
    isShopAvailable,

    handleNpcEvent,
    handleDialogueComplete,
    getDialogueCompleteAction,
    startLeafaRescueBattle,

    advanceSignReadState,
    advanceNpcTalkState,

    setGameState,

    setDialogueState: nextState => {
      if ('talkNpc' in nextState) talkNpc = nextState.talkNpc;
      if ('talkPage' in nextState) talkPage = nextState.talkPage;
      if ('activeSign' in nextState) activeSign = nextState.activeSign;
      if ('readPage' in nextState) readPage = nextState.readPage;
    },
  };
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

function getTileRenderMetaDeps() {
  return {
    T,
    TILE_META,
    TILE_CONTEXT_META,
    getTileContextKey,
  };
}

function getRenderCameraDeps() {
  return {
    currentMap: runtimeState.currentMap,
    hero,
    TILE_RENDER,
    VIEW_COLS,
    VIEW_ROWS,
    isHouseMap,
    mapCols,
    mapRows,
  };
}

function drawVisibleTiles(camCol, camRow) {
  drawVisibleTilesUI({
    camCol,
    camRow,
    VIEW_COLS,
    VIEW_ROWS,
    mapCols,
    mapRows,
    drawTile,
  });
}

function drawMapOverlay() {
  drawMapOverlayUI(ctx, {
    currentMap: runtimeState.currentMap,
    dungeonMap,
    field2Map,
    shadowTownMap,
    VIEW_W,
    VIEW_H,
  });
}

function getRenderMapDeps() {
  return {
    calculateRenderCamera: () => calculateRenderCameraSystem(getRenderCameraDeps()),

    setRenderCamera: nextRenderCamera => {
      renderCamera = nextRenderCamera;
    },

    drawVisibleTiles,
    drawMapOverlay,
    drawEntities,
    drawDebugHitboxes,
    TILE_RENDER,
  };
}

function getTitleUIDeps() {
  return {
    VIEW_W,
    VIEW_H,
    uiImgs,
    txt,
    TITLE_MENU_ITEMS,
    titleMenuIndex,
  };
}

function getTitleSystemDeps() {
  return {
    TITLE_MENU_ITEMS,
    getTitleMenuIndex: () => titleMenuIndex,
    setTitleMenuIndex: nextIndex => {
      titleMenuIndex = nextIndex;
    },
    isConfirmKey,
    startTitleMenuAction,

    TitleAction,
    resetGame,
    startPrologue,
  };
}

function getTransitionDestinationDeps() {
  return {
    resolveValue,
    getMapTilesById,
  };
}

function getTransitionRuntimeStateDeps() {
  return {
    runtimeState,
  };
}

function getInputSystemDeps() {
  return {
    saveGame,
    loadGame,

    isCancelKey,
    isConfirmKey,

    prologueState,
    skipPrologue,
    advancePrologueLine,

    updateMoveKeyDown,
    openEquipMenu,
    getAdjacentInteractable,
    getAdjacentBoss,

    battleIntro,
    skipBattleIntro,

    battleTargetMode,
    moveTargetSelection,
    confirmTargetSelection,
    cancelTargetSelection,

    battleVictory,
    advanceBattleVictory,

    heroTurn,
    moveBattleCommand,
    confirmBattleCommand,

    moveShopCursor,
    confirmShopChoice,
    closeShop,

    advanceDialogue,
    currentState,
    GameState,

    handleSaveLoadShortcut,
    handleTitleInput,
    handlePrologueInput,
    handleMapInput,
    handleEquipInput,
    handleBattleInput,
    handleShopInput,
    handleTalkInput,

    backToMap,
    continueAfterGameOver,
    resetGame,
    updateMoveKeyUp,
  };
}

function getEquipSystemDeps() {
  return {
    equipMenuMode,
    equipCursor,
    equipCharacterIndex,
    charaTabIndex,
    equipSlotCursor,
    itemCursor,
    itemUseId,
    itemTargetIndex,

    ITEMS,

    getUsableItems,
    getPartyMembers,
    getItemCount,
    cycleActorEquipment,
    useEther,
    useElixir,
    usePotionOnTarget,

    showNotice,
    refreshStatusBar,

    setEquipState: nextState => {
      if ('equipMenuMode' in nextState) equipMenuMode = nextState.equipMenuMode;
      if ('equipCursor' in nextState) equipCursor = nextState.equipCursor;
      if ('equipCharacterIndex' in nextState) equipCharacterIndex = nextState.equipCharacterIndex;
      if ('charaTabIndex' in nextState) charaTabIndex = nextState.charaTabIndex;
      if ('equipSlotCursor' in nextState) equipSlotCursor = nextState.equipSlotCursor;
      if ('itemCursor' in nextState) itemCursor = nextState.itemCursor;
      if ('itemUseId' in nextState) itemUseId = nextState.itemUseId;
      if ('itemTargetIndex' in nextState) itemTargetIndex = nextState.itemTargetIndex;
    },

    closeEquipMenu: () => {
      setGameState(GameState.MAP);
    },
    isCancelKey,
    isConfirmKey,

    cancelEquipMenu: () => cancelEquipMenuSystem(getEquipSystemDeps()),
    moveEquipCursor: direction => moveEquipCursorSystem(direction, getEquipSystemDeps()),
    moveEquipHorizontal: delta => moveEquipHorizontalSystem(delta, getEquipSystemDeps()),
    confirmEquipMenu: () => confirmEquipMenuSystem(getEquipSystemDeps()),

  };
}

function getShopSystemDeps() {
  return {
    GameState,

    shopCursor,
    talkNpc,
    hero,
    allies,

    SHOP_ITEMS,

    getShopOptions,
    getShopAction,

    buyPotion,
    buyEther,
    buyElixir,
    buyLeatherArmor,
    buySteelSword,
    buyIronArmor,
    buyMageStaff,
    buyGreenRobe,

    buyConsumable: buyConsumableSystem,
    buyHeroWeaponOnce: buyHeroWeaponOnceSystem,
    buyHeroArmorOnce: buyHeroArmorOnceSystem,
    buyAllyWeaponOnce: buyAllyWeaponOnceSystem,
    buyAllyArmorOnce: buyAllyArmorOnceSystem,

    getNpcRole,
    handleDialogueComplete,

    isShopAvailable,
    changeItemCount,
    getItemCount,

    setGameState,
    showShopBtns,
    hideBtns,
    closeShop,

    setShopState: nextState => {
      if ('shopMsg' in nextState) shopMsg = nextState.shopMsg;
      if ('shopCursor' in nextState) shopCursor = nextState.shopCursor;
    },

    setTalkState: nextState => {
      if ('talkNpc' in nextState) talkNpc = nextState.talkNpc;
      if ('talkPage' in nextState) talkPage = nextState.talkPage;
    },

    setSignState: nextState => {
      if ('activeSign' in nextState) activeSign = nextState.activeSign;
      if ('readPage' in nextState) readPage = nextState.readPage;
    },
  };
}

function getDialogueUIDeps() {
  return {
    VIEW_W,
    VIEW_H,
    talkNpc,
    talkPage,
    shopCursor,
    shopMsg,
    hero,
    uiImgs,
    txt,

    drawDialogueBox,
    drawPortraitBox,
    drawNPC,
    isShopAvailable,
    getShopOptions,
    drawShopList,
    drawShopTextWindow,
    getShopIntroLine,
    getNpcLines,

    renderMap,
    activeSign,
    renderSignReadWindow,

    renderTalkWindow,

    setShopState: nextState => {
      if ('shopCursor' in nextState) shopCursor = nextState.shopCursor;
      if ('shopMsg' in nextState) shopMsg = nextState.shopMsg;
    },
  };
}

function getResultUIDeps() {
  return {
    VIEW_W,
    VIEW_H,
    txt,
    drawHero,
  };
}

function getGameStateSystemDeps() {
  return {
    hero,
    allies,
    GameState,

    recoverActorAfterGameOver,
    setStartPosition,
    setGameState,
    resetBattleAndUiState,
    showNotice,

    clearBattleIntro,
    clearFireEffectsUI,
    clearLeafEffectsUI,
    clearSlashEffectsUI,
    clearHitEffectsUI,
    hideBtns,

    setBattleState: nextState => {
      if ('foe' in nextState) foe = nextState.foe;
      if ('battleEnemies' in nextState) battleEnemies = nextState.battleEnemies;
      if ('battleTurnQueue' in nextState) battleTurnQueue = nextState.battleTurnQueue;
      if ('battleTargetMode' in nextState) battleTargetMode = nextState.battleTargetMode;
      if ('selectedTargetIndex' in nextState) selectedTargetIndex = nextState.selectedTargetIndex;
      if ('heroTurn' in nextState) heroTurn = nextState.heroTurn;
      if ('currentBattleBgKey' in nextState) currentBattleBgKey = nextState.currentBattleBgKey;
      if ('winMsg' in nextState) winMsg = nextState.winMsg;
      if ('battleVictory' in nextState) battleVictory = nextState.battleVictory;
    },

    setDialogueState: nextState => {
      if ('talkNpc' in nextState) talkNpc = nextState.talkNpc;
      if ('talkPage' in nextState) talkPage = nextState.talkPage;
      if ('activeSign' in nextState) activeSign = nextState.activeSign;
      if ('readPage' in nextState) readPage = nextState.readPage;
    },
    setItemState: nextState => {
  if ('itemCursor' in nextState) itemCursor = nextState.itemCursor;
  if ('itemUseId' in nextState) itemUseId = nextState.itemUseId;
  if ('itemTargetIndex' in nextState) itemTargetIndex = nextState.itemTargetIndex;
},

    setShopState: nextState => {
    if ('shopCursor' in nextState) shopCursor = nextState.shopCursor;
    if ('shopMsg' in nextState) shopMsg = nextState.shopMsg;
    },

    setQuestState: nextState => {
    if ('slimeKills' in nextState) slimeKills = nextState.slimeKills;
    if ('questDone' in nextState) questDone = nextState.questDone;
    if ('questRewardMsg' in nextState) questRewardMsg = nextState.questRewardMsg;
    },
    runtimeState,
    tileToPx,
    resetHeroForNewGame: heroArg => resetHeroForNewGameSystem(heroArg),
    resetProgressUiStateForNewGame: () =>
    resetProgressUiStateForNewGameSystem(getGameStateSystemDeps()),
    resetFlagsForNewGame: flagsArg => resetFlagsForNewGameSystem(flagsArg),
    resetRuntimeStateForNewGame: () =>
    resetRuntimeStateForNewGameSystem(getGameStateSystemDeps()),
    resetBattleAndUiState,
    flags,
  };
}

function getPrologueSystemDeps() {
  return {
    GameState,
    PROLOGUE_LINES,
    prologueState,

    hideBtns,
    createInitialPrologueState,
    setGameState,

    getPrologueState: () => prologueState,

    setCurrentState: nextState => {
      currentState = nextState;
    },

    setPrologueState: nextState => {
      prologueState = {
        ...prologueState,
        ...nextState,
      };
    },

    advancePrologueLine,
    finishPrologue,
  };
}

function getUISystemDeps() {
  return {
    hero,
    getCurrentWeapon,
    getCurrentArmor,
    getLocationName,
    updateStatusBar,

    btnArea,
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

    renderCamera,
    TILE_RENDER,
    drawHeroAtFoot,
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
  // 敵フォールバック描画：共通簡易描画
  // ============================================================
  function genericEnemyFallback(ctx, x, y, scale, options = {}) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
    ctx.fillRect(5, 27, 22, 4);
    ctx.fillStyle = options.bodyCol || '#241331';
    ctx.fillRect(6, 13, 20, 13);
    ctx.fillRect(9, 8, 14, 18);
    ctx.fillStyle = options.edgeCol || '#3b2054';
    ctx.fillRect(8, 11, 16, 3);
    ctx.fillRect(6, 20, 20, 4);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1;
    ctx.strokeRect(7.5, 10.5, 17, 15);
    ctx.fillStyle = options.eyeCol || '#ff3333';
    ctx.fillRect(11, 15, 3, 3);
    ctx.fillRect(18, 15, 3, 3);
    ctx.fillStyle = '#ffaaaa';
    ctx.fillRect(11, 15, 1, 1);
    ctx.fillRect(18, 15, 1, 1);

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

    genericEnemyFallback(ctx, px, py, sc);
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
  return getTileRenderMetaSystem(
    tile,
    map,
    getTileRenderMetaDeps()
  );
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
 

  function drawCustomTile(drawType, fallbackDrawer, tileContext = {}) {
    drawTileFallback(fallbackDrawer, tileContext);
  }

  function drawTile(col, row, camCol = 0, camRow = 0) {
    const x = Math.round((col - camCol) * TILE_RENDER);
    const y = Math.round((row - camRow) * TILE_RENDER);
    const t = runtimeState.currentMap[row][col];
    const renderMeta = getTileRenderMeta(t);
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

    drawCustomTile(renderMeta.drawType, (tileContext) => {
      genericTileFallback(ctx, tileContext);
    }, {
      col,
      row,
      x,
      y,
      tile: t,
      drawType: renderMeta.drawType,
      spriteKey: renderMeta.spriteKey,
      TILE_RENDER,
    });

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
  return isCollidingSystem(a, b);
}

function centeredBottomHitbox(
  w,
  h,
  wRatio = FOOT_HITBOX.wRatio,
  hRatio = FOOT_HITBOX.hRatio
) {
  return centeredBottomHitboxSystem(w, h, wRatio, hRatio);
}

function entranceHitbox(w, h) {
  return entranceHitboxSystem(w, h, ENTRANCE_HITBOX);
}

function getCollisionBox(entity, x = entity.x, y = entity.y) {
  return getCollisionBoxSystem(entity, x, y);
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

  function getMapUIDeps() {
  return {
    renderCamera,
    TILE_RENDER,
    DEFAULT_SIGN_DRAW_SIZE,
    VIEW_W,
    VIEW_H,
    drawSign,
  };
}

  function drawSignEntity(sign) {
  drawSignEntityUI(sign, getMapUIDeps());
}

    function drawTileFallback(fallbackDrawer, tileContext) {
    drawTileFallbackUI(fallbackDrawer, tileContext);
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
  drawHeroEntityUI(ctx, getHeroUIDeps());
}


  function makeNpcEntity(npc) {
  return makeNpcEntitySystem(npc, getEntitySystemDeps());
}

  function makeEnemyNpcEntity(enemyNpc) {
  return makeEnemyNpcEntitySystem(enemyNpc, getEntitySystemDeps());
}

  function makeHouseEntity(x, y, spriteKey = 'house', width = 256, height = 240, options = {}) {
  return makeHouseEntitySystem(
    x,
    y,
    spriteKey,
    width,
    height,
    options,
    getEntitySystemDeps()
  );
}

function getEntitySystemDeps() {
  return {
    tileToPx,
    TILE_RENDER,
    DEFAULT_CHEST_DRAW_SIZE,
    DEFAULT_SIGN_DRAW_SIZE,
    DEFAULT_NPC_DRAW_W,
    DEFAULT_NPC_DRAW_H,
    NPC_SC,
    VIEW_W,
    VIEW_H,

    renderCamera,
    entities,
    getCurrentMapDef,

    centeredBottomHitbox,
    entranceHitbox,
    chestFlagKey,
    flags,
    hero,
    grantChestRewards,
    showNotice,
    drawChestEntity,
    resolveEntityDrawSize,
    openSignRead,

    makeHouseHitbox,
    drawHouseEntity,

    makeDecorEntity,
    makeEntranceFromDef,
    makeHouseEntityFn: makeHouseEntity,

    drawNPC,
    drawEnemy,
    drawObject,
    getNpcRole,
    openShop,
    openDialogue,
    executeMapTransition,

    BOSS_POS,
    FOREST_BOSS_POS,
    DEMON_GENERAL_POS,
    CASTLE_BOSS_POS,
    LEAFA_RESCUE_POS,
    BOSS_OFF,
    NPC_OFF,

    startBossBattle,
    startForestBossBattle,
    startDemonGeneralBattle,
    startDemonLordBattle,
    DECOR_DRAW_SIZES,
    findHouseDefById,
    makeHouseEntranceEntity,
    makeEntranceEntity,
    TOWN_HOUSES,
    SHADOW_TOWN_HOUSES,
    HOUSE_TRANSITION_IDS,
    makeHouseDoorRectFn: makeHouseDoorRect,
    makeEntranceEntityFn: makeEntranceEntity,
    makeNpcEntityFn: makeNpcEntity,
    makeSignEntityFn: makeSignEntity,
    makeChestEntityFn: makeChestEntity,
    runtimeState,

    fieldMap,
    dungeonMap,
    cursedForestMap,
    castleMap,
    leafaForestMap,

    LEAFA_RESCUE_ENEMY_NPCS,

    isLeafaRescueAmbushActive,

    makeLeafaForestEntranceEntityFn: makeLeafaForestEntranceEntity,
    makeEnemyNpcEntityFn: makeEnemyNpcEntity,
    makeLeafaRescueEntityFn: makeLeafaRescueEntity,
    makeBossEntityFn: makeBossEntity,
    makeForestBossEntityFn: makeForestBossEntity,
    makeDemonGeneralEntityFn: makeDemonGeneralEntity,
    makeDemonLordEntityFn: makeDemonLordEntity,
    syncEntities,
    getCollisionBox,
    drawDecorEntity,
    drawSignEntity,
    setupHeroEntity: heroArg => setupHeroEntitySystem(heroArg, getHeroEntityDeps()),

    setEntities: nextEntities => {
    entities = nextEntities;
    },

    addHouseEntities,
    addDecorEntities,
    addNpcEntities,
    addSignEntities,
    addChestEntities,
    addSpecialEventEntities,
    addEntranceEntities,
  };
}

function getPlaceHeroOutsideDoorDeps() {
  return {
    centeredBottomHitbox,
    getCollisionBox,
    setHeroDirection,
    snapDrawPos,
  };
}

  function makeChestEntity(x, y, options = {}) {
  return makeChestEntitySystem(x, y, options, getEntitySystemDeps());
}

  function makeSignEntity(x, y, lines, flagKey = null, options = {}) {
  return makeSignEntitySystem(x, y, lines, flagKey, options, getEntitySystemDeps());
}


function makeDecorEntity(kind, x, y, size = 48, options = {}) {
  return makeDecorEntitySystem(kind, x, y, size, options, getEntitySystemDeps());
}

function getDecorDrawSize(kind, decor = {}) {
  return getDecorDrawSizeSystem(kind, decor, DECOR_DRAW_SIZES);
}

function getGroundedTileDrawRect(entity, drawW, drawH) {
  return getGroundedTileDrawRectSystem(entity, drawW, drawH, getEntitySystemDeps());
}

function resolveEntityDrawSize(entityDef, defaultW, defaultH = defaultW) {
  return resolveEntityDrawSizeSystem(entityDef, defaultW, defaultH);
}

  function addDecorEntities() {
  addDecorEntitiesSystem(getEntitySystemDeps());
}

function addHouseEntities() {
  addHouseEntitiesSystem(getEntitySystemDeps());
}

function addEntranceEntities() {
  addEntranceEntitiesSystem(getEntitySystemDeps());
}

  function getHouseDefsForMap(map) {
    const mapDef = Object.values(MAP_DEFS).find(def => def.tiles === map);
    return mapDef ? mapDef.houses || [] : [];
  }

  function findHouseDefById(houseId) {
  return findHouseDefByIdSystem(houseId, getEntitySystemDeps());
}



  function makeHouseDoorRect(house) {
  return makeHouseDoorRectSystem(house, getEntitySystemDeps());
}

function getTransitionAttemptDeps() {
  return {
    getTransitionDef,
    flags,
  };
}

function finishMapTransition(transition, entranceEntity) {
  if (typeof transition.onAfter === 'function') {
    transition.onAfter(entranceEntity);
  }

  if (transition.useExitCooldown) {
    startExitCooldown();
  }
}

function placeHeroForTransition(transition, entranceEntity, spawnX, spawnY, exitDir) {
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
    return;
  }

  setHeroTile(spawnX, spawnY);
  setHeroDirection(exitDir);
}

  function executeMapTransition(transitionId, entranceEntity = null) {
    const attempt = resolveTransitionAttemptSystem(
        transitionId,
        getTransitionAttemptDeps()
    );

    if (!attempt.ok) {
        if (attempt.message) showNotice(attempt.message);
        return;
    }

    const transition = attempt.transition;


    if (typeof transition.onBefore === 'function') transition.onBefore(entranceEntity);

    applyTransitionRuntimeStateSystem(
    transition,
    entranceEntity,
    getTransitionRuntimeStateDeps()
    );

        const destination = resolveTransitionDestinationSystem(
        transition,
        entranceEntity,
        getTransitionDestinationDeps()
        );

        runtimeState.currentMap = destination.toMap;

        const { spawnX, spawnY, exitDir } = destination;

    placeHeroForTransition(transition, entranceEntity, spawnX, spawnY, exitDir);
    finishMapTransition(transition, entranceEntity);
  }

  function addSpecialEventEntities() {
  addSpecialEventEntitiesSystem(getEntitySystemDeps());
}

  function makeHouseEntranceEntity(house, transitionId = null) {
  return makeHouseEntranceEntitySystem(
    house,
    transitionId,
    getEntitySystemDeps()
  );
}

function addNpcEntities() {
  addNpcEntitiesSystem(getEntitySystemDeps());
}

function addSignEntities() {
  addSignEntitiesSystem(getEntitySystemDeps());
}

function addChestEntities() {
  addChestEntitiesSystem(getEntitySystemDeps());
}

  function makeBossEntity() {
  return makeBossEntitySystem(getEntitySystemDeps());
}

  function makeForestBossEntity() {
  return makeForestBossEntitySystem(getEntitySystemDeps());
}

  function makeDemonGeneralEntity() {
  return makeDemonGeneralEntitySystem(getEntitySystemDeps());
}

  function makeDemonLordEntity() {
  return makeDemonLordEntitySystem(getEntitySystemDeps());
}

  function makeEntranceEntity(type, x, y, w, h, exitDir, interact, options = {}) {
  return makeEntranceEntitySystem(
    type,
    x,
    y,
    w,
    h,
    exitDir,
    interact,
    options,
    getEntitySystemDeps()
  );
}

function makeEntranceFromDef(def) {
  return makeEntranceFromDefSystem(def, getEntitySystemDeps());
}

  function getHeroEntityDeps() {
  return {
    centeredBottomHitbox,
    updateMove,
    drawHeroEntity,
  };
}

function updateEntities() {
  updateEntitiesSystem(getEntitySystemDeps());
}

  function syncEntities() {
  syncEntitiesSystem(getEntitySystemDeps());
}

  function drawEntities() {
  drawEntitiesSystem(getEntitySystemDeps());
}

  function getCollidingEntity(box, type = null) {
  return getCollidingEntitySystem(box, type, getInteractionSystemDeps());
}

function getBlockingEntityForBox(box) {
  return getBlockingEntityForBoxSystem(box, getInteractionSystemDeps());
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

  function getInteractionSystemDeps() {
  return {
    hero,
    heroFootTileX,
    heroFootTileY,
    syncEntities,
    entities,
    pxToTile,
    TILE_RENDER,
    isColliding,
    getCollisionBox,
  };
}

  function getEventEntityForBox(box) {
  return getEventEntityForBoxSystem(box, getInteractionSystemDeps());
}

  function getEntityKey(entity) {
  return getEntityKeySystem(entity);
}

  function startExitCooldown(frames = 24) {
    hero.justExited = frames;
    lastEventEntityKey = null;
  }

  function placeHeroOutsideDoor(doorEntity, exitDir = 'down') {
  placeHeroOutsideDoorSystem(
    hero,
    doorEntity,
    exitDir,
    getPlaceHeroOutsideDoorDeps()
  );
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

  function getMovementSystemDeps() {
  return {
    currentMap: runtimeState.currentMap,
    mapCols,
    mapRows,
    TILE_META,

    hero,
    getCollisionBox,
    pxToTile,
    isBlockedTile,
    getBlockingEntityForBox,

    keys,
    currentState,
    mapState: GameState.MAP,
    moveSpeed: MOVE_SPEED,
    setHeroDirection,
  };
}

function tileAt(x, y) {
  return tileAtSystem(runtimeState.currentMap, x, y);
}

function isBlockedTile(x, y) {
  return isBlockedTileSystem(x, y, getMovementSystemDeps());
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
  return canPlaceHeroAtSystem(px, py, getMovementSystemDeps());
}

  function updateHeroVelocityFromKeys() {
  updateHeroVelocityFromKeysSystem(getMovementSystemDeps());
}

function tickHeroJustExited() {
  tickHeroJustExitedSystem(hero);
}

function syncHeroDrawPosition() {
  syncHeroDrawPositionSystem(hero);
}

function applyHeroVelocity() {
  return applyHeroVelocitySystem(hero, canPlaceHeroAt);
}

function updateMove() {
  tickHeroJustExited();

  updateHeroVelocityFromKeys();

  const moveResult = applyHeroVelocity();

  updateHeroWalkAnimation(moveResult.moved);

  syncHeroDrawPosition();

  if (currentState === GameState.MAP) {
    checkTileEvents();
  }
}


  function renderMap() {
  renderMapUI(getRenderMapDeps());
}
function getEquipUIDeps() {
  return {
    VIEW_W,
    VIEW_H,
    txt,

    equipMenuMode,
    equipCursor,
    equipCharacterIndex,
    charaTabIndex,
    equipSlotCursor,
    itemCursor,
    itemUseId,
    itemTargetIndex,

    ITEMS,
    SKILL_DEFS,
    hero,

    getUsableItems,
    getItemCount,
    getPartyMembers,
    getCurrentWeapon,
    getCurrentArmor,
    getAllyWeapon,
    getAllyArmor,
    getAllySpeed,
    getFaceSprite,

    drawEquipMenuFrame,
    drawEquipMainMenu,
    drawItemList,
    drawItemTargetList,
    drawItemHelpText,
    drawCharacterHeader,
    drawCharacterStatusPanel,
    drawEquipmentTab,
    drawSkillTab,

    setEquipState: nextState => {
      if ('equipCharacterIndex' in nextState) {
        equipCharacterIndex = nextState.equipCharacterIndex;
      }
    },
  };
}

  function renderEquipMenu() {
  renderEquipMenuUI(ctx, getEquipUIDeps());
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



function renderLose() {
  renderLoseUI(ctx, getResultUIDeps());
}
function renderEnding() {
  renderEndingUI(ctx, getResultUIDeps());
}

  // ============================================================
  // タイトル画面を描画する
  // ============================================================
  function renderTitle() {
  renderTitleUI(ctx, getTitleUIDeps());
}

  // ============================================================
  // プロローグ
  // ============================================================
 

  function startPrologue() {
  return startPrologueSystem(getPrologueSystemDeps());
}

function advancePrologueLine() {
  return advancePrologueLineSystem(getPrologueSystemDeps());
}

function finishPrologue() {
  return finishPrologueSystem(getPrologueSystemDeps());
}

function skipPrologue() {
  return skipPrologueSystem(getPrologueSystemDeps());
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
  refreshStatusBarSystem(getUISystemDeps());
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
  return isConfirmKeySystem(e);
}

function isCancelKey(e) {
  return isCancelKeySystem(e);
}

function isMoveUpKey(e) {
  return isMoveUpKeySystem(e);
}

function isMoveDownKey(e) {
  return isMoveDownKeySystem(e);
}

function updateMoveKeyDown(e) {
  return updateMoveKeyDownSystem(e, keys);
}

function updateMoveKeyUp(e) {
  return updateMoveKeyUpSystem(e, keys);
}

  function startTitleMenuAction(action) {
  startTitleMenuActionSystem(action, getTitleSystemDeps());
}

    function handleTitleInput(e) {
    handleTitleInputSystem(e, getTitleSystemDeps());
    }
    function updateMap() {
        updateEntities();
    }

  function updateTalk() {}

function drawTalk() {
  drawTalkUI(getDialogueUIDeps());
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

  function getGameLoopSystemDeps() {
  return {
    currentState,
    GameState,

    updateMap,
    updateTalk,
    updateShop,
    updateBattle,
    updateEquip,

    renderTitle,
    renderPrologue,
    renderMap,
    drawTalk,
    drawShop,
    drawBattle,
    drawEquip,
    renderLose,
    renderEnding,
  };
}

function updateCurrentState() {
  updateCurrentStateSystem(getGameLoopSystemDeps());
}

function drawCurrentState() {
  drawCurrentStateSystem(getGameLoopSystemDeps());
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
  return getShopActionSystem(itemId, getShopSystemDeps());
}

function getShopOptions() {
  return getShopOptionsSystem(getShopSystemDeps());
}

function buyPotion() {
  return buyPotionSystem(getShopSystemDeps());
}

function buyEther() {
  return buyEtherSystem(getShopSystemDeps());
}

function buyElixir() {
  return buyElixirSystem(getShopSystemDeps());
}

function buySteelSword() {
  return buySteelSwordSystem(getShopSystemDeps());
}

function buyIronArmor() {
  return buyIronArmorSystem(getShopSystemDeps());
}

function buyLeatherArmor() {
  return buyLeatherArmorSystem(getShopSystemDeps());
}

function buyMageStaff() {
  return buyMageStaffSystem(getShopSystemDeps());
}

function buyGreenRobe() {
  return buyGreenRobeSystem(getShopSystemDeps());
}


  function showShopBtns() {
  showShopBtnsSystem(getUISystemDeps());
}

  // ============================================================
  // 会話（トーク）システム
  // ============================================================

  // 会話を開始する
  function openDialogue(npc) {
  openDialogueSystem(npc, getDialogueSystemDeps());
}

  function openShop(npc) {
  openShopSystem(npc, getShopSystemDeps());
}

function moveShopCursor(delta) {
  moveShopCursorSystem(delta, getShopSystemDeps());
}

function confirmShopChoice() {
  confirmShopChoiceSystem(getShopSystemDeps());
}

function closeShop() {
  closeShopSystem(getShopSystemDeps());
}

  // セリフを1ページ進める（最終ページなら会話終了）
  function advanceDialogue() {
  return advanceDialogueSystem(getDialogueSystemDeps());
}

  function getSignReadLines(sign) {
  return getSignReadLinesSystem(sign);
}

function openSignRead(sign) {
  openSignReadSystem(sign, getDialogueSystemDeps());
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

  function renderTalkWindow() {
  renderTalkWindowUI(ctx, getDialogueUIDeps());
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
  return makeLeafaForestEntranceEntitySystem(getEntitySystemDeps());
}

  function makeLeafaRescueEntity() {
  return makeLeafaRescueEntitySystem(getEntitySystemDeps());
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

function handleNpcEvent(npc) {
  handleNpcEventSystem(npc, getDialogueSystemDeps());
}

function handleDialogueComplete(npc) {
  handleDialogueCompleteSystem(npc, getDialogueSystemDeps());
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
  return handleEquipInputSystem(e, getEquipSystemDeps());
}


  // ============================================================
  // キーボード入力
  // ============================================================
function handleSaveLoadShortcut(e) {
  return handleSaveLoadShortcutSystem(e, getInputSystemDeps());
}

function handleMapInput(e) {
  return handleMapInputSystem(e, getInputSystemDeps());
}

function handlePrologueInput(e) {
  return handlePrologueInputSystem(e, getInputSystemDeps());
}

function clearMoveKeys() {
  keys.up = false;
  keys.down = false;
  keys.left = false;
  keys.right = false;

  hero.vx = 0;
  hero.vy = 0;
}

function handleKeyUp(e) {
  handleKeyUpSystem(e, getInputSystemDeps());

  if (currentState !== GameState.MAP) {
    clearMoveKeys();
  }
}

function handleKeyDown(e) {
  handleKeyDownSystem(e, getInputSystemDeps());
}

function handleBattleInput(e) {
  return handleBattleInputSystem(e, getInputSystemDeps());
}

function handleShopInput(e) {
  return handleShopInputSystem(e, getInputSystemDeps());
}

function handleTalkInput(e) {
  return handleTalkInputSystem(e, getInputSystemDeps());
}

    document.addEventListener('keydown', handleKeyDown);

    document.addEventListener('keyup', handleKeyUp);

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

 function continueAfterGameOver() {
  return continueAfterGameOverSystem(getGameStateSystemDeps());
}

  // ゲームをリセット（最初から）
  function resetGame() {
  return resetGameSystem(getGameStateSystemDeps());
}

  function resetBattleAndUiState() {
  resetBattleAndUiStateSystem(getGameStateSystemDeps());
}

  // ============================================================
  // ゲーム開始！
  // ============================================================
  loadTileImages();   // tiles/ フォルダの画像を非同期ロード開始
  loadSpriteImages(); // sprites/ フォルダの画像を非同期ロード開始
  loop();   
