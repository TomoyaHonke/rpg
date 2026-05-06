export function isConfirmKey(event) {
  return (
    event.key === ' ' ||
    event.key === 'Enter' ||
    event.key === 'z' ||
    event.key === 'Z'
  );
}

export function isCancelKey(event) {
  return (
    event.key === 'Escape' ||
    event.key === 'x' ||
    event.key === 'X'
  );
}

export function isMoveUpKey(event) {
  return event.key === 'ArrowUp' || event.key === 'w';
}

export function isMoveDownKey(event) {
  return event.key === 'ArrowDown' || event.key === 's';
}

export function isMoveLeftKey(event) {
  return event.key === 'ArrowLeft' || event.key === 'a';
}

export function isMoveRightKey(event) {
  return event.key === 'ArrowRight' || event.key === 'd';
}

export function updateMoveKeyDown(event, keys) {
  let handled = false;

  if (isMoveUpKey(event)) {
    keys.up = true;
    handled = true;
  }

  if (isMoveDownKey(event)) {
    keys.down = true;
    handled = true;
  }

  if (isMoveLeftKey(event)) {
    keys.left = true;
    handled = true;
  }

  if (isMoveRightKey(event)) {
    keys.right = true;
    handled = true;
  }

  return handled;
}

export function updateMoveKeyUp(event, keys) {
  let handled = false;

  if (isMoveUpKey(event)) {
    keys.up = false;
    handled = true;
  }

  if (isMoveDownKey(event)) {
    keys.down = false;
    handled = true;
  }

  if (isMoveLeftKey(event)) {
    keys.left = false;
    handled = true;
  }

  if (isMoveRightKey(event)) {
    keys.right = false;
    handled = true;
  }

  return handled;
}

export function handleSaveLoadShortcut(event, deps) {
  const {
    saveGame,
    loadGame,
  } = deps;

  if (event.shiftKey && (event.key === 's' || event.key === 'S')) {
    event.preventDefault();
    saveGame();
    return true;
  }

  if (event.shiftKey && (event.key === 'l' || event.key === 'L')) {
    event.preventDefault();
    loadGame();
    return true;
  }

  return false;
}

export function handlePrologueInput(event, deps) {
  const {
    isCancelKey,
    isConfirmKey,
    prologueState,
    skipPrologue,
    advancePrologueLine,
  } = deps;

  if (isCancelKey(event)) {
    event.preventDefault();
    skipPrologue();
    return true;
  }

  if (isConfirmKey(event)) {
    event.preventDefault();

    if (!prologueState.cooldown) {
      advancePrologueLine();
    }

    return true;
  }

  return false;
}

export function handleMapInput(event, deps) {
  const {
    isConfirmKey,
    updateMoveKeyDown,
    openEquipMenu,
    getAdjacentInteractable,
    getAdjacentBoss,
  } = deps;

  if (event.key === 'e' || event.key === 'E') {
    event.preventDefault();
    openEquipMenu();
    return true;
  }

  if (updateMoveKeyDown(event)) {
    event.preventDefault();
    return true;
  }

  if (isConfirmKey(event)) {
    event.preventDefault();

    const adj = getAdjacentInteractable();

    if (adj) {
      adj.interact();
    } else {
      const boss = getAdjacentBoss();
      if (boss) boss.interact();
    }

    return true;
  }

  return false;
}

export function handleBattleInput(event, deps) {
  const {
    isConfirmKey,
    isCancelKey,

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
  } = deps;

  if (battleIntro.active && isConfirmKey(event)) {
    event.preventDefault();

    if (!battleIntro.unskippable) {
      skipBattleIntro();
    }

    return true;
  }

  if (battleTargetMode) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      moveTargetSelection(-1);
      return true;
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      moveTargetSelection(1);
      return true;
    }

    if (isConfirmKey(event)) {
      event.preventDefault();
      confirmTargetSelection();
      return true;
    }

    if (isCancelKey(event)) {
      event.preventDefault();
      cancelTargetSelection();
      return true;
    }

    return false;
  }

  if (battleVictory.active && isConfirmKey(event)) {
    event.preventDefault();
    advanceBattleVictory();
    return true;
  }

  if (heroTurn && !battleVictory.active && !battleVictory.pending) {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      moveBattleCommand(-1);
      return true;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      moveBattleCommand(1);
      return true;
    }

    if (isConfirmKey(event)) {
      event.preventDefault();
      confirmBattleCommand();
      return true;
    }
  }

  return false;
}

export function handleShopInput(event, deps) {
  const {
    isConfirmKey,
    isCancelKey,
    moveShopCursor,
    confirmShopChoice,
    closeShop,
  } = deps;

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveShopCursor(-1);
    return true;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveShopCursor(1);
    return true;
  }

  if (isConfirmKey(event)) {
    event.preventDefault();
    confirmShopChoice();
    return true;
  }

  if (isCancelKey(event)) {
    event.preventDefault();
    closeShop();
    return true;
  }

  return false;
}

export function handleTalkInput(event, deps) {
  const {
    isConfirmKey,
    advanceDialogue,
  } = deps;

  // 元の挙動維持：Space・Enter・Z・Escape で進める
  if (isConfirmKey(event) || event.key === 'Escape') {
    event.preventDefault();
    advanceDialogue();
    return true;
  }

  return false;
}

export function handleKeyDown(event, deps) {
  const {
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
  } = deps;

  if (handleSaveLoadShortcut(event)) return;

  if (currentState === GameState.TITLE) {
    handleTitleInput(event);
    return;
  }

  if (currentState === GameState.PROLOGUE) {
    handlePrologueInput(event);
    return;
  }

  if (currentState === GameState.MAP) {
    handleMapInput(event);
    return;
  }

  if (currentState === GameState.EQUIP) {
    handleEquipInput(event);
    return;
  }

  if (currentState === GameState.BATTLE) {
    handleBattleInput(event);
    return;
  }

  if (currentState === GameState.SHOP) {
    handleShopInput(event);
    return;
  }

  if (currentState === GameState.TALK) {
    handleTalkInput(event);
    return;
  }

  if (currentState === GameState.LOSE) {
    continueAfterGameOver();
    return;
  }

  if (currentState === GameState.ENDING) {
    resetGame();
  }
}

export function handleKeyUp(event, deps) {
  const {
    updateMoveKeyUp,
  } = deps;

  updateMoveKeyUp(event);
}