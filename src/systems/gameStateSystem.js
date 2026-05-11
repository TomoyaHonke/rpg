export function continueAfterGameOver(deps) {
  const {
    hero,
    allies,
    GameState,

    recoverActorAfterGameOver,
    setStartPosition,
    setGameState,
    resetBattleAndUiState,
    showNotice,
  } = deps;

  recoverActorAfterGameOver(hero);

  for (const ally of allies) {
    if (ally && ally.flags && ally.flags.hasAlly) {
      recoverActorAfterGameOver(ally);
    }
  }

  setStartPosition();
  setGameState(GameState.MAP);

  resetBattleAndUiState();

  showNotice('ヒカリのまちへ戻された…');

  return true;
}

export function resetBattleAndUiState(deps) {
  const {
    setBattleState,
    setDialogueState,
    clearBattleIntro,
    clearFireEffectsUI,
    clearLeafEffectsUI,
    clearSlashEffectsUI,
    clearHitEffectsUI,
    hideBtns,
  } = deps;

  setBattleState({
    foe: null,
    battleEnemies: [],
    battleTurnQueue: [],
    battleTargetMode: null,
    selectedTargetIndex: 0,
    heroTurn: true,
    currentBattleBgKey: 'field',
    winMsg: '',
    battleVictory: {
      active: false,
      pending: false,
      messages: [],
      index: 0,
      playedJingle: false,
    },
  });

  clearBattleIntro();

  setDialogueState({
    talkNpc: null,
    talkPage: 0,
    activeSign: null,
    readPage: 0,
  });

  clearFireEffectsUI();
  clearLeafEffectsUI();
  clearSlashEffectsUI();
  clearHitEffectsUI();

  hideBtns();
}

export function resetProgressUiStateForNewGame(deps) {
  const {
    setItemState,
    setShopState,
    setQuestState,
  } = deps;

  setItemState({
    itemCursor: 0,
    itemUseId: 'potion',
    itemTargetIndex: 0,
  });

  setShopState({
    shopCursor: 0,
    shopMsg: '',
  });

  setQuestState({
    slimeKills: 0,
    questDone: false,
    questRewardMsg: '',
  });
}

export function resetFlagsForNewGame(flags) {
  for (const key of Object.keys(flags)) {
    flags[key] = false;
  }
}

export function resetRuntimeStateForNewGame(deps) {
  const {
    runtimeState,
    tileToPx,
  } = deps;

  runtimeState.townReturn = {
    x: tileToPx(17),
    y: tileToPx(11),
    exitDir: 'down',
  };

  runtimeState.dungeonReturn = {
    x: tileToPx(52),
    y: tileToPx(32),
    exitDir: 'up',
  };

  runtimeState.field2Return = {
    x: tileToPx(8),
    y: tileToPx(40),
    exitDir: 'up',
  };

  runtimeState.shadowTownReturn = {
    x: tileToPx(3),
    y: tileToPx(1),
    exitDir: 'down',
  };

  runtimeState.cursedForestReturn = {
    x: tileToPx(3),
    y: tileToPx(10),
    exitDir: 'up',
  };

  runtimeState.outpostReturn = {
    x: tileToPx(12),
    y: tileToPx(5),
    exitDir: 'right',
  };

  runtimeState.houseReturn = {
    x: tileToPx(6),
    y: tileToPx(5),
  };

  runtimeState.castleReturn = {
    x: tileToPx(12),
    y: tileToPx(1),
    exitDir: 'down',
  };

  runtimeState.westTownReturn = {
    x: tileToPx(6),
    y: tileToPx(25),
    exitDir: 'down',
  };
}

export function resetHeroForNewGame(hero) {
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
}

export function resetGame(deps) {
  const {
    hero,
    flags,

    resetHeroForNewGame,
    resetProgressUiStateForNewGame,
    resetFlagsForNewGame,
    resetRuntimeStateForNewGame,
    setStartPosition,
    resetBattleAndUiState,
  } = deps;

  resetHeroForNewGame(hero);
  resetProgressUiStateForNewGame();
  resetFlagsForNewGame(flags);
  resetRuntimeStateForNewGame();

  setStartPosition();
  resetBattleAndUiState();

  return true;
}
