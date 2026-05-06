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

export function getShopAction(itemId, deps) {
  const {
    buyPotion,
    buyEther,
    buyElixir,
    buyLeatherArmor,
    buySteelSword,
    buyIronArmor,
    buyMageStaff,
    buyGreenRobe,
    closeShop,
  } = deps;

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

export function getShopOptions(deps) {
  const {
    talkNpc,
    SHOP_ITEMS,
    getShopAction,
  } = deps;

  const shopType = talkNpc && talkNpc.npcId === 'shadow_shop_gray'
    ? 'shadow'
    : 'normal';

  return SHOP_ITEMS[shopType].map(item => ({
    ...item,
    action: getShopAction(item.id),
  }));
}

export function buyPotion(deps) {
  const {
    isShopAvailable,
    buyConsumable,
    hero,
    changeItemCount,
    getItemCount,
    setShopState,
  } = deps;

  if (!isShopAvailable()) return false;

  const result = buyConsumable({
    hero,
    price: 10,
    itemId: 'potion',
    itemName: 'ポーション',
    amount: 1,
    changeItemCount,
    getItemCount,
  });

  setShopState({ shopMsg: result.message });
  return result.ok;
}

export function buyEther(deps) {
  const {
    isShopAvailable,
    buyConsumable,
    hero,
    changeItemCount,
    getItemCount,
    setShopState,
  } = deps;

  if (!isShopAvailable()) return false;

  const result = buyConsumable({
    hero,
    price: 15,
    itemId: 'ether',
    itemName: 'エーテル',
    amount: 1,
    changeItemCount,
    getItemCount,
  });

  setShopState({ shopMsg: result.message });
  return result.ok;
}

export function buyElixir(deps) {
  const {
    isShopAvailable,
    buyConsumable,
    hero,
    changeItemCount,
    getItemCount,
    setShopState,
  } = deps;

  if (!isShopAvailable()) return false;

  const result = buyConsumable({
    hero,
    price: 100,
    itemId: 'elixir',
    itemName: 'エリクサー',
    amount: 1,
    changeItemCount,
    getItemCount,
  });

  setShopState({ shopMsg: result.message });
  return result.ok;
}

export function buySteelSword(deps) {
  const {
    isShopAvailable,
    buyHeroWeaponOnce,
    hero,
    setShopState,
  } = deps;

  if (!isShopAvailable()) return false;

  const result = buyHeroWeaponOnce({
    hero,
    itemId: 'steelSword',
    price: 130,
    alreadyMessage: '鋼の剣は　もう持っている！',
    successMessage: '鋼の剣を買った！',
  });

  setShopState({ shopMsg: result.message });
  return result.ok;
}

export function buyIronArmor(deps) {
  const {
    isShopAvailable,
    buyHeroArmorOnce,
    hero,
    setShopState,
  } = deps;

  if (!isShopAvailable()) return false;

  const result = buyHeroArmorOnce({
    hero,
    itemId: 'ironArmor',
    price: 200,
    alreadyMessage: '鉄のよろいは　もう持っている！',
    successMessage: '鉄のよろいを買った！',
  });

  setShopState({ shopMsg: result.message });
  return result.ok;
}

export function buyLeatherArmor(deps) {
  const {
    isShopAvailable,
    buyHeroArmorOnce,
    hero,
    setShopState,
  } = deps;

  if (!isShopAvailable()) return false;

  const result = buyHeroArmorOnce({
    hero,
    itemId: 'leatherArmor',
    price: 30,
    alreadyMessage: '革よろいは　もう持っている！',
    successMessage: '革よろいを買った！',
  });

  setShopState({ shopMsg: result.message });
  return result.ok;
}

export function buyMageStaff(deps) {
  const {
    isShopAvailable,
    buyAllyWeaponOnce,
    hero,
    allies,
    setShopState,
  } = deps;

  if (!isShopAvailable()) return false;

  const result = buyAllyWeaponOnce({
    hero,
    allies,
    allyId: 'leafa',
    itemId: 'mage_staff',
    price: 150,
    noAllyMessage: 'リーファがいない！',
    alreadyMessage: '魔法の杖は　もう持っている！',
    successMessage: '魔法の杖を買った！',
  });

  setShopState({ shopMsg: result.message });
  return result.ok;
}

export function buyGreenRobe(deps) {
  const {
    isShopAvailable,
    buyAllyArmorOnce,
    hero,
    allies,
    setShopState,
  } = deps;

  if (!isShopAvailable()) return false;

  const result = buyAllyArmorOnce({
    hero,
    allies,
    allyId: 'leafa',
    itemId: 'green_robe',
    price: 200,
    noAllyMessage: 'リーファがいない！',
    alreadyMessage: '草色のローブは　もう持っている！',
    successMessage: '草色のローブを買った！',
  });

  setShopState({ shopMsg: result.message });
  return result.ok;
}