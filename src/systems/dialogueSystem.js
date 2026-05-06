export function advanceSignReadState({ activeSign, readPage, readLines }) {
  const nextReadPage = readPage + 1;

  if (nextReadPage >= readLines.length) {
    return {
      done: true,
      nextReadPage: 0,
      flagKey: activeSign?.flagKey || null,
    };
  }

  return {
    done: false,
    nextReadPage,
    flagKey: null,
  };
}

export function advanceNpcTalkState({ talkPage, lineCount }) {
  const nextTalkPage = talkPage + 1;

  if (nextTalkPage >= lineCount) {
    return {
      done: true,
      nextTalkPage: 0,
    };
  }

  return {
    done: false,
    nextTalkPage,
  };
}

export function getNpcLines(npc, deps) {
  const {
    NPC_DIALOGUES,
    getNpcRole,
  } = deps;
  if (npc.npcId && NPC_DIALOGUES[npc.npcId]) {
    return NPC_DIALOGUES[npc.npcId]();
  }
  if (getNpcRole(npc) === 'inn') {
    return ['HPとMPが回復した！'];
  }
  return npc.lines;
}

export function getSignReadLines(sign) {
  return [...(sign.lines || []), '……と書かれている'];
}

export function getShopIntroLine(npc, getNpcLines) {
  const lines = npc ? getNpcLines(npc) : [];

  if (Array.isArray(lines) && lines.length > 0) {
    return lines[0];
  }

  if (npc && npc.npcId === 'shadow_shop_gray') {
    return '鋼の剣、鉄のよろい、魔法の杖、草色のローブが買える。';
  }

  return 'ポーションは10G、革よろいは20Gだよ。';
}

export function getNpcRole(npc) {
  if (npc.role) return npc.role;
  if (npc.shop) return 'shop';
  if (npc.inn) return 'inn';
  if (npc.quest) return 'event';
  return 'talk';
}

export function getDialogueCompleteAction(npc) {
  if (!npc || !npc.npcId) {
    return { type: 'none' };
  }

  if (npc.npcId === 'old_blacksmith') {
    return {
      type: 'setFlag',
      flagKey: 'talkedToOldBlacksmith',
      value: true,
    };
  }

  if (npc.npcId === 'leafa_rescue_pre') {
    return {
      type: 'startLeafaRescueBattle',
      delay: 300,
    };
  }

  return { type: 'none' };
}

export function shouldOpenUnreadSign(sign, flags) {
  return !!(sign && sign.flagKey && !flags[sign.flagKey]);
}

export function openDialogue(npc, deps) {
  const {
    GameState,
    getNpcRole,
    fullRecoverParty,
    getNpcLines,
    handleNpcEvent,
    setDialogueState,
    setGameState,
  } = deps;

  const role = getNpcRole(npc);

  if (role === 'inn') {
    fullRecoverParty();
  }

  const nextNpc = {
    ...npc,
    _lines: getNpcLines(npc),
  };

  setDialogueState({
    activeSign: null,
    readPage: 0,
    talkNpc: nextNpc,
    talkPage: 0,
  });

  handleNpcEvent(npc);

  setGameState(GameState.TALK);
}

export function openSignRead(sign, deps) {
  const {
    GameState,
    setDialogueState,
    setGameState,
  } = deps;

  setDialogueState({
    talkNpc: null,
    talkPage: 0,
    activeSign: sign,
    readPage: 0,
  });

  setGameState(GameState.TALK);
}

export function advanceDialogue(deps) {
  const {
    GameState,

    activeSign,
    readPage,
    talkNpc,
    talkPage,
    flags,

    getSignReadLines,
    getNpcLines,
    isShopAvailable,
    advanceSignReadState,
    advanceNpcTalkState,
    handleDialogueComplete,

    setDialogueState,
    setGameState,
  } = deps;

  if (activeSign) {
    const readLines = getSignReadLines(activeSign);

    const result = advanceSignReadState({
      activeSign,
      readPage,
      readLines,
    });

    if (result.done) {
      if (result.flagKey) {
        flags[result.flagKey] = true;
      }

      setDialogueState({
        activeSign: null,
        readPage: 0,
      });

      setGameState(GameState.MAP);
    } else {
      setDialogueState({
        readPage: result.nextReadPage,
      });
    }

    return true;
  }

  if (!talkNpc) return false;

  const lineCount = isShopAvailable()
    ? 1
    : (talkNpc._lines || getNpcLines(talkNpc)).length;

  const result = advanceNpcTalkState({
    talkPage,
    lineCount,
  });

  if (result.done) {
    handleDialogueComplete(talkNpc);

    setDialogueState({
      talkNpc: null,
      talkPage: 0,
    });

    setGameState(GameState.MAP);
  } else {
    setDialogueState({
      talkPage: result.nextTalkPage,
    });
  }

  return true;
}

export function handleNpcEvent(npc, deps) {
  const {
    NPC_EVENTS,
  } = deps;

  if (npc.npcId && NPC_EVENTS[npc.npcId]) {
    NPC_EVENTS[npc.npcId]();
  }
}

export function handleDialogueComplete(npc, deps) {
  const {
    flags,
    getDialogueCompleteAction,
    startLeafaRescueBattle,
  } = deps;

  const action = getDialogueCompleteAction(npc);

  if (action.type === 'setFlag') {
    flags[action.flagKey] = action.value;
    return;
  }

  if (action.type === 'startLeafaRescueBattle') {
    setTimeout(startLeafaRescueBattle, action.delay);
  }
}