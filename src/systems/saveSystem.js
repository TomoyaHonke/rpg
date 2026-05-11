export function createSaveData(deps) {
  const {
    hero,
    flags,
    runtimeState,
    allies,
    slimeKills,
    questDone,
    questRewardMsg,
    getCurrentMapId,
  } = deps;

  return {
    hero: {
      x: hero.x,
      y: hero.y,
      vx: hero.vx,
      vy: hero.vy,
      hp: hero.hp,
      maxHp: hero.maxHp,
      mp: hero.mp,
      maxMp: hero.maxMp,
      atk: hero.atk,
      def: hero.def,
      speed: hero.speed,
      weapon: hero.weapon,
      armor: hero.armor,
      weaponsOwned: hero.weaponsOwned,
      armorsOwned: hero.armorsOwned,
      level: hero.level,
      exp: hero.exp,
      gold: hero.gold,
      potions: hero.potions,
      inventory: { ...hero.inventory },
      dir: hero.dir,
      direction: hero.direction,
    },

    coordVersion: 2,

    quest: {
      slimeKills,
      questDone,
      questRewardMsg,
    },

    flags: { ...flags },

    returns: {
      town: runtimeState.townReturn,
      dungeon: runtimeState.dungeonReturn,
      house: runtimeState.houseReturn,
      field2: runtimeState.field2Return,
      shadowTown: runtimeState.shadowTownReturn,
      cursedForest: runtimeState.cursedForestReturn,
      outpost: runtimeState.outpostReturn,
      castle: runtimeState.castleReturn,
      westTown: runtimeState.westTownReturn,
    },

    houseId: runtimeState.currentHouseId,
    map: getCurrentMapId(),

    allies: allies.map(a => ({
      id: a.id,
      hp: a.hp,
      maxHp: a.maxHp,
      mp: a.mp,
      maxMp: a.maxMp,
      level: a.level,
      exp: a.exp,
      baseAtk: a.baseAtk,
      baseDef: a.baseDef,
      baseSpeed: a.baseSpeed,
      weaponsOwned: Array.isArray(a.weaponsOwned) ? [...a.weaponsOwned] : [],
      armorsOwned: Array.isArray(a.armorsOwned) ? [...a.armorsOwned] : [],
      equippedWeapon: a.equippedWeapon,
      equippedArmor: a.equippedArmor,
      flags: { ...a.flags },
    })),
  };
}

export function readSaveData(storage, saveKey) {
  const raw = storage.getItem(saveKey);

  if (!raw) {
    return {
      ok: false,
      reason: 'empty',
      data: null,
      error: null,
    };
  }

  try {
    return {
      ok: true,
      reason: null,
      data: JSON.parse(raw),
      error: null,
    };
  } catch (error) {
    return {
      ok: false,
      reason: 'parse_error',
      data: null,
      error,
    };
  }
}

export function restoreHeroFromSave(data, deps) {
  const {
    hero,
    WEAPONS,
    ARMORS,
    HERO_WALK_IDLE_FRAME,
    ensureInventory,
    normalizeSavedPoint,
    tileToPx,
    isItemAllowedForActor,
    setHeroDirection,
  } = deps;

  if (data.hero) {
    Object.assign(hero, data.hero);
  }

  hero.speed = hero.speed ?? 10;
  hero.potions = hero.potions ?? 0;
  ensureInventory();

  if (data.coordVersion !== 2) {
    const p = normalizeSavedPoint(
      { x: hero.x, y: hero.y },
      { x: tileToPx(1), y: tileToPx(1) }
    );
    hero.x = p.x;
    hero.y = p.y;
  }

  if (!WEAPONS[hero.weapon]) hero.weapon = 'woodSword';
  if (!ARMORS[hero.armor]) hero.armor = 'travelerClothes';

  if (!isItemAllowedForActor(WEAPONS[hero.weapon], 'hero')) {
    hero.weapon = 'woodSword';
  }

  if (!isItemAllowedForActor(ARMORS[hero.armor], 'hero')) {
    hero.armor = 'travelerClothes';
  }

  hero.weaponsOwned = Array.isArray(hero.weaponsOwned)
    ? hero.weaponsOwned.filter(id => WEAPONS[id])
    : ['woodSword'];

  hero.armorsOwned = Array.isArray(hero.armorsOwned)
    ? hero.armorsOwned.filter(id => ARMORS[id])
    : ['travelerClothes'];

  if (!hero.weaponsOwned.includes('woodSword')) {
    hero.weaponsOwned.unshift('woodSword');
  }

  if (!hero.armorsOwned.includes('travelerClothes')) {
    hero.armorsOwned.unshift('travelerClothes');
  }

  if (!hero.weaponsOwned.includes(hero.weapon)) {
    hero.weaponsOwned.push(hero.weapon);
  }

  if (!hero.armorsOwned.includes(hero.armor)) {
    hero.armorsOwned.push(hero.armor);
  }

  setHeroDirection(hero.direction || hero.dir || 'down');

  hero.walkFrame = HERO_WALK_IDLE_FRAME;
  hero.walkTimer = 0;
  hero.vx = 0;
  hero.vy = 0;
}

export function restoreQuestAndFlagsFromSave(data, deps) {
  const {
    flags,
    setQuestState,
  } = deps;

  if (data.quest) {
    setQuestState({
      slimeKills: data.quest.slimeKills || 0,
      questDone: !!data.quest.questDone,
      questRewardMsg: data.quest.questRewardMsg || '',
    });
  }

  // flags（後方互換: 旧セーブの bossDefeated/chestOpened も読み込む）
  if (data.flags) {
    Object.assign(flags, data.flags);

    if (flags.outpostQuestDone) {
      flags.talkedToOldBlacksmith = true;
    }
  } else {
    flags.defeatedDarkKnight = !!data.bossDefeated;
    flags.chest1Opened = !!data.chestOpened;
  }
}

export function restoreReturnPointsFromSave(data, deps) {
  const {
    runtimeState,
    normalizeSavedPoint,
  } = deps;

  if (data.returns) {
    runtimeState.townReturn = normalizeSavedPoint(data.returns.town, runtimeState.townReturn);
    runtimeState.dungeonReturn = normalizeSavedPoint(data.returns.dungeon, runtimeState.dungeonReturn);
    runtimeState.houseReturn = normalizeSavedPoint(data.returns.house, runtimeState.houseReturn);

    if (data.returns.field2) {
      runtimeState.field2Return = normalizeSavedPoint(data.returns.field2, runtimeState.field2Return);
    }

    if (data.returns.shadowTown) {
      runtimeState.shadowTownReturn = normalizeSavedPoint(data.returns.shadowTown, runtimeState.shadowTownReturn);
    }

    if (data.returns.cursedForest) {
      runtimeState.cursedForestReturn = normalizeSavedPoint(data.returns.cursedForest, runtimeState.cursedForestReturn);
    }

    if (data.returns.outpost) {
      runtimeState.outpostReturn = normalizeSavedPoint(data.returns.outpost, runtimeState.outpostReturn);
    }

    if (data.returns.castle) {
      runtimeState.castleReturn = normalizeSavedPoint(data.returns.castle, runtimeState.castleReturn);
    }

    if (data.returns.westTown) {
      runtimeState.westTownReturn = normalizeSavedPoint(data.returns.westTown, runtimeState.westTownReturn);
    }

    return;
  }

  if (data.runtimeState && data.runtimeState.fieldReturn) {
    runtimeState.townReturn = normalizeSavedPoint(data.runtimeState.fieldReturn, runtimeState.townReturn);
    runtimeState.dungeonReturn = normalizeSavedPoint(data.runtimeState.fieldReturn, runtimeState.dungeonReturn);
  }
}

export function restoreCurrentMapFromSave(data, deps) {
  const {
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
  } = deps;

  runtimeState.currentHouseId =
    data.houseId && houseMaps[data.houseId]
      ? data.houseId
      : null;

  if (typeof data.map === 'string' && data.map.startsWith('house:')) {
    const savedHouseId = data.map.slice('house:'.length);

    if (houseMaps[savedHouseId]) {
      runtimeState.currentHouseId = savedHouseId;
    }
  }

  if (data.map === 'house' && !runtimeState.currentHouseId) {
    runtimeState.currentHouseId = 'west';
  }

  runtimeState.currentMap =
    typeof data.map === 'string' &&
    data.map.startsWith('house:') &&
    runtimeState.currentHouseId
      ? houseMaps[runtimeState.currentHouseId]
      : data.map === 'house'
      ? houseMaps[runtimeState.currentHouseId]
      : getMapTilesById(data.map);

  if (
    isHouseMap(runtimeState.currentMap) &&
    (
      heroTileX() < 0 ||
      heroTileX() >= mapCols() ||
      heroTileY() < 0 ||
      heroTileY() >= mapRows()
    )
  ) {
    hero.x = tileToPx(3);
    hero.y = tileToPx(4);
  }
}

export function restoreAlliesFromSave(data, deps) {
  const {
    ALLY_DEFS,
    WEAPONS,
    ARMORS,
    isItemAllowedForActor,
    flags,
    setAllies,
  } = deps;

  const restoredAllies = [];

  if (Array.isArray(data.allies)) {
    for (const savedOriginal of data.allies) {
      const saved = { ...savedOriginal };

      // 旧セーブ互換
      if (saved.id === 'mia') {
        saved.id = 'leafa';
      }

      const def = ALLY_DEFS[saved.id];

      if (def) {
        const ally = {
          ...def,
          weaponsOwned: Array.isArray(def.weaponsOwned) ? [...def.weaponsOwned] : [],
          armorsOwned: Array.isArray(def.armorsOwned) ? [...def.armorsOwned] : [],
          flags: { ...def.flags, hasAlly: true },
        };

        if (typeof saved.hp === 'number') ally.hp = saved.hp;
        if (typeof saved.maxHp === 'number') ally.maxHp = saved.maxHp;
        if (typeof saved.mp === 'number') ally.mp = saved.mp;
        if (typeof saved.maxMp === 'number') ally.maxMp = saved.maxMp;
        if (typeof saved.level === 'number') ally.level = saved.level;
        if (typeof saved.exp === 'number') ally.exp = saved.exp;
        if (typeof saved.baseAtk === 'number') ally.baseAtk = saved.baseAtk;
        if (typeof saved.baseDef === 'number') ally.baseDef = saved.baseDef;
        if (typeof saved.baseSpeed === 'number') ally.baseSpeed = saved.baseSpeed;

        if (Array.isArray(saved.weaponsOwned)) {
          ally.weaponsOwned = saved.weaponsOwned.filter(
            id => WEAPONS[id] && isItemAllowedForActor(WEAPONS[id], 'leafa')
          );
        }

        if (Array.isArray(saved.armorsOwned)) {
          ally.armorsOwned = saved.armorsOwned.filter(
            id => ARMORS[id] && isItemAllowedForActor(ARMORS[id], 'leafa')
          );
        }

        if (saved.equippedWeapon && WEAPONS[saved.equippedWeapon]) {
          ally.equippedWeapon = saved.equippedWeapon;
        }

        if (saved.equippedArmor && ARMORS[saved.equippedArmor]) {
          ally.equippedArmor = saved.equippedArmor;
        }

        if (saved.flags) {
          Object.assign(ally.flags, saved.flags);
        }

        if (
          !isItemAllowedForActor(WEAPONS[ally.equippedWeapon], ally.id) &&
          ally.weaponsOwned.length
        ) {
          ally.equippedWeapon = ally.weaponsOwned[0];
        }

        if (
          !isItemAllowedForActor(ARMORS[ally.equippedArmor], ally.id) &&
          ally.armorsOwned.length
        ) {
          ally.equippedArmor = ally.armorsOwned[0];
        }

        restoredAllies.push(ally);
      }
    }
  }

  setAllies(restoredAllies);

  // 旧セーブ互換：仲間にリーファがいれば加入フラグを立てる
  if (restoredAllies.some(a => a.id === 'leafa' && a.flags && a.flags.hasAlly)) {
    flags.leafaJoined = true;
    flags.leafaRescueDone = true;
  }
}
