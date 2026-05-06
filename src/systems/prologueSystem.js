export function startPrologue(deps) {
  const {
    GameState,
    hideBtns,
    advancePrologueLine,
    setPrologueState,
    setCurrentState,
  } = deps;

  setPrologueState({
    active: true,
    index: -1,
    lineStartTime: 0,
    cooldown: false,
  });

  setCurrentState(GameState.PROLOGUE);
  hideBtns();
  advancePrologueLine();

  return true;
}

export function advancePrologueLine(deps) {
  const {
    prologueState,
    PROLOGUE_LINES,
    finishPrologue,
    setPrologueState,
  } = deps;

  if (!prologueState.active) return false;

  let nextIndex = prologueState.index + 1;

  while (
    nextIndex < PROLOGUE_LINES.length &&
    PROLOGUE_LINES[nextIndex] === ''
  ) {
    nextIndex++;
  }

  if (nextIndex >= PROLOGUE_LINES.length) {
    finishPrologue();
    return true;
  }

  setPrologueState({
    index: nextIndex,
    lineStartTime: Date.now(),
    cooldown: true,
  });

  setTimeout(() => {
    if (deps.getPrologueState().active) {
      setPrologueState({ cooldown: false });
    }
  }, 150);

  return true;
}

export function finishPrologue(deps) {
  const {
    GameState,
    createInitialPrologueState,
    setPrologueState,
    setGameState,
  } = deps;

  setPrologueState(createInitialPrologueState());
  setGameState(GameState.MAP);

  return true;
}

export function skipPrologue(deps) {
  const {
    prologueState,
    finishPrologue,
  } = deps;

  if (!prologueState.active) return false;

  finishPrologue();
  return true;
}