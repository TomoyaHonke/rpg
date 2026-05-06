export function usePotionOnTarget(target, deps) {
  const {
    getItemCount,
    changeItemCount,
    ITEMS,
    getTargetDisplayName,
  } = deps;

  if (getItemCount('potion') <= 0) {
    return { ok: false, message: 'ポーションを持っていない！' };
  }

  if (!target || target.hp <= 0) {
    return { ok: false, message: 'その対象には使えない！' };
  }

  if (target.hp >= target.maxHp) {
    return { ok: false, message: 'HPは満タンだ' };
  }

  changeItemCount('potion', -1);

  const beforeHp = target.hp;
  target.hp = Math.min(target.maxHp, target.hp + ITEMS.potion.value);
  const healed = target.hp - beforeHp;

  return {
    ok: true,
    healed,
    message: `${getTargetDisplayName(target)}にポーションを使った！ HPが ${healed} 回復した！`,
  };
}

export function usePotion(hero, deps) {
  return usePotionOnTarget(hero, deps);
}

export function useEther(target, deps) {
  const {
    getItemCount,
    changeItemCount,
    ITEMS,
    getTargetDisplayName,
  } = deps;

  if (getItemCount('ether') <= 0) {
    return { ok: false, message: 'エーテルを持っていない！' };
  }

  if (!target || target.hp <= 0) {
    return { ok: false, message: 'その対象には使えない！' };
  }

  if (target.mp >= target.maxMp) {
    return { ok: false, message: 'MPは満タンだ' };
  }

  changeItemCount('ether', -1);

  const beforeMp = target.mp;
  target.mp = Math.min(target.maxMp, target.mp + ITEMS.ether.value);
  const recovered = target.mp - beforeMp;

  return {
    ok: true,
    recovered,
    message: `${getTargetDisplayName(target)}のMPが${recovered}回復した！`,
  };
}

export function useElixir(target, deps) {
  const {
    getItemCount,
    changeItemCount,
    ITEMS,
    getTargetDisplayName,
  } = deps;

  if (getItemCount('elixir') <= 0) {
    return { ok: false, message: 'エリクサーを持っていない！' };
  }

  if (!target || target.hp <= 0) {
    return { ok: false, message: 'その対象には使えない！' };
  }

  if (target.hp >= target.maxHp && target.mp >= target.maxMp) {
    return { ok: false, message: 'HPもMPも満タンだ' };
  }

  changeItemCount('elixir', -1);

  const beforeHp = target.hp;
  const beforeMp = target.mp;

  target.hp = Math.min(target.maxHp, target.hp + ITEMS.elixir.hpValue);
  target.mp = Math.min(target.maxMp, target.mp + ITEMS.elixir.mpValue);

  const healedHp = target.hp - beforeHp;
  const healedMp = target.mp - beforeMp;

  return {
    ok: true,
    healedHp,
    healedMp,
    message: `${getTargetDisplayName(target)}のHPが${healedHp}、MPが${healedMp}回復した！`,
  };
}