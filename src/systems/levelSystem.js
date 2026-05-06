export function getNextExp(level) {
  return level * 30;
}

export function getAllyNextExp(ally) {
  return getNextExp(ally.level);
}

export function gainAllyExp(ally, amount) {
  ally.exp += amount;

  let leveled = false;
  let hpRecovered = 0;

  while (ally.exp >= getAllyNextExp(ally)) {
    ally.exp -= getAllyNextExp(ally);
    ally.level++;
    ally.maxHp += 4;
    ally.maxMp += 3;
    ally.baseAtk += 1;

    const beforeHp = ally.hp;
    ally.hp = Math.min(ally.maxHp, ally.hp + Math.floor(ally.maxHp * 0.5));
    hpRecovered += ally.hp - beforeHp;

    leveled = true;
  }

  return {
    leveled,
    hpRecovered,
  };
}

export function gainHeroExp(hero, amount) {
  hero.exp += amount;

  let leveled = false;
  let hpRecovered = 0;

  while (hero.exp >= getNextExp(hero.level)) {
    hero.exp -= getNextExp(hero.level);
    hero.level++;
    hero.maxHp += 5;
    hero.maxMp += 2;
    hero.atk += 1;

    const beforeHp = hero.hp;
    hero.hp = Math.min(hero.maxHp, hero.hp + Math.floor(hero.maxHp * 0.5));
    hpRecovered += hero.hp - beforeHp;

    leveled = true;
  }

  return {
    leveled,
    hpRecovered,
  };
}