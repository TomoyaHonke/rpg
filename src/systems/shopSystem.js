export function buyConsumable({ hero, price, itemId, itemName, amount = 1, changeItemCount, getItemCount }) {
  if (hero.gold < price) {
    return { ok: false, message: 'ゴールドが足りない！' };
  }

  hero.gold -= price;

  if (itemId === 'potion') {
    hero.potions += amount;
    return {
      ok: true,
      message: `${itemName}を買った！ 所持数 ${hero.potions}`,
    };
  }

  changeItemCount(itemId, amount);

  return {
    ok: true,
    message: `${itemName}を買った！ 所持数 ${getItemCount(itemId)}`,
  };
}

export function buyHeroWeaponOnce({ hero, itemId, price, alreadyMessage, successMessage }) {
  if (hero.weaponsOwned.includes(itemId)) {
    return { ok: false, message: alreadyMessage };
  }

  if (hero.gold < price) {
    return { ok: false, message: 'ゴールドが足りない！' };
  }

  hero.gold -= price;
  hero.weaponsOwned.push(itemId);

  return { ok: true, message: successMessage };
}

export function buyHeroArmorOnce({ hero, itemId, price, alreadyMessage, successMessage }) {
  if (hero.armorsOwned.includes(itemId)) {
    return { ok: false, message: alreadyMessage };
  }

  if (hero.gold < price) {
    return { ok: false, message: 'ゴールドが足りない！' };
  }

  hero.gold -= price;
  hero.armorsOwned.push(itemId);

  return { ok: true, message: successMessage };
}

export function buyAllyWeaponOnce({ hero, allies, allyId, itemId, price, noAllyMessage, alreadyMessage, successMessage }) {
  const ally = allies.find(a => a.id === allyId);

  if (!ally) {
    return { ok: false, message: noAllyMessage };
  }

  if (ally.weaponsOwned.includes(itemId)) {
    return { ok: false, message: alreadyMessage };
  }

  if (hero.gold < price) {
    return { ok: false, message: 'ゴールドが足りない！' };
  }

  hero.gold -= price;
  ally.weaponsOwned.push(itemId);

  return { ok: true, message: successMessage };
}

export function buyAllyArmorOnce({ hero, allies, allyId, itemId, price, noAllyMessage, alreadyMessage, successMessage }) {
  const ally = allies.find(a => a.id === allyId);

  if (!ally) {
    return { ok: false, message: noAllyMessage };
  }

  if (ally.armorsOwned.includes(itemId)) {
    return { ok: false, message: alreadyMessage };
  }

  if (hero.gold < price) {
    return { ok: false, message: 'ゴールドが足りない！' };
  }

  hero.gold -= price;
  ally.armorsOwned.push(itemId);

  return { ok: true, message: successMessage };
}

export function openShop(npc, deps) {
  const {
    GameState,
    setShopState,
    setTalkState,
    setSignState,
    setGameState,
    showShopBtns,
  } = deps;

  setShopState({
    shopMsg: '',
    shopCursor: 0,
  });

  setSignState({
    activeSign: null,
    readPage: 0,
  });

  setTalkState({
    talkNpc: npc,
    talkPage: 0,
  });

  setGameState(GameState.SHOP);
  showShopBtns();
}

export function moveShopCursor(delta, deps) {
  const {
    shopCursor,
    getShopOptions,
    setShopState,
    showShopBtns,
  } = deps;

  const options = getShopOptions();
  if (!options.length) return false;

  setShopState({
    shopCursor: (shopCursor + options.length + delta) % options.length,
  });

  showShopBtns();
  return true;
}

export function confirmShopChoice(deps) {
  const {
    shopCursor,
    getShopOptions,
    showShopBtns,
  } = deps;

  const options = getShopOptions();
  const choice = options[shopCursor];

  if (!choice) return false;

  choice.action();

  if (choice.id !== 'close') {
    showShopBtns();
  }

  return true;
}

export function closeShop(deps) {
  const {
    GameState,
    talkNpc,
    getNpcRole,
    handleDialogueComplete,
    setTalkState,
    setShopState,
    setGameState,
    hideBtns,
  } = deps;

  if (talkNpc && getNpcRole(talkNpc) === 'shop') {
    handleDialogueComplete(talkNpc);
  }

  setTalkState({
    talkNpc: null,
    talkPage: 0,
  });

  setShopState({
    shopMsg: '',
    shopCursor: 0,
  });

  setGameState(GameState.MAP);
  hideBtns();
}