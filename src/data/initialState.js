export function createInitialPrologueState() {
  return {
    active: false,
    index: -1,
    lineStartTime: 0,
    cooldown: false,
  };
}

export function createInitialBattleIntro() {
  return {
    active: false,
    lines: [],
    index: 0,
    timer: null,
    flashUntil: 0,
  };
}

export function createInitialBattleVictory() {
  return {
    active: false,
    pending: false,
    messages: [],
    index: 0,
    playedJingle: false,
  };
}

export function createInitialKeys() {
  return {
    up: false,
    down: false,
    left: false,
    right: false,
  };
}
