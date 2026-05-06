export function updateCurrentState(deps) {
  const {
    currentState,
    GameState,
    updateMap,
    updateTalk,
    updateShop,
    updateBattle,
    updateEquip,
  } = deps;

  if (currentState === GameState.TITLE) {
    return;
  }

  if (currentState === GameState.PROLOGUE) {
    return;
  }

  if (currentState === GameState.MAP) {
    updateMap();
    return;
  }

  if (currentState === GameState.TALK) {
    updateTalk();
    return;
  }

  if (currentState === GameState.SHOP) {
    updateShop();
    return;
  }

  if (currentState === GameState.BATTLE) {
    updateBattle();
    return;
  }

  if (currentState === GameState.EQUIP) {
    updateEquip();
  }
}

export function drawCurrentState(deps) {
  const {
    currentState,
    GameState,
    renderTitle,
    renderPrologue,
    renderMap,
    drawTalk,
    drawShop,
    drawBattle,
    drawEquip,
    renderWin,
    renderLose,
    renderEnding,
  } = deps;

  if (currentState === GameState.TITLE) {
    renderTitle();
    return;
  }

  if (currentState === GameState.PROLOGUE) {
    renderPrologue();
    return;
  }

  if (currentState === GameState.MAP) {
    renderMap();
    return;
  }

  if (currentState === GameState.TALK) {
    drawTalk();
    return;
  }

  if (currentState === GameState.SHOP) {
    drawShop();
    return;
  }

  if (currentState === GameState.BATTLE) {
    drawBattle();
    return;
  }

  if (currentState === GameState.EQUIP) {
    drawEquip();
    return;
  }

  if (currentState === GameState.WIN) {
    renderWin();
    return;
  }

  if (currentState === GameState.LOSE) {
    renderLose();
    return;
  }

  if (currentState === GameState.ENDING) {
    renderEnding();
  }
}