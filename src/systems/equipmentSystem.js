export function cycleActorEquipment(actor, slot, delta = 1, deps) {
  const {
    hero,
    getOwnedWeaponIds,
    getOwnedArmorIds,
  } = deps;

  const owned = slot === 'weapon'
    ? getOwnedWeaponIds(actor)
    : getOwnedArmorIds(actor);

  if (!owned.length) return false;

  const currentId = slot === 'weapon'
    ? (actor === hero ? hero.weapon : actor.equippedWeapon)
    : (actor === hero ? hero.armor : actor.equippedArmor);

  const currentIndex = Math.max(0, owned.indexOf(currentId));
  const nextId = owned[(currentIndex + owned.length + delta) % owned.length];

  if (actor === hero) {
    if (slot === 'weapon') hero.weapon = nextId;
    else hero.armor = nextId;
  } else {
    if (slot === 'weapon') actor.equippedWeapon = nextId;
    else actor.equippedArmor = nextId;
  }

  return true;
}

export function getCurrentWeapon(hero, WEAPONS) {
  return WEAPONS[hero.weapon] || WEAPONS.woodSword;
}

export function getHeroAttack(hero, WEAPONS) {
  const weapon = getCurrentWeapon(hero, WEAPONS);
  return hero.atk + (weapon.attack ?? weapon.attackBonus ?? 0);
}

export function getCurrentArmor(hero, ARMORS) {
  return ARMORS[hero.armor] || ARMORS.travelerClothes;
}

export function getHeroDefense(hero, ARMORS) {
  const armor = getCurrentArmor(hero, ARMORS);
  return hero.def + (armor.defense ?? armor.defenseBonus ?? 0);
}

export function getAllyWeapon(ally, getActorEquippedWeapon) {
  return getActorEquippedWeapon(ally);
}

export function getAllyArmor(ally, getActorEquippedArmor) {
  return getActorEquippedArmor(ally);
}

export function getAllyAttack(ally, getActorEquippedWeapon) {
  const weapon = getAllyWeapon(ally, getActorEquippedWeapon);
  return (ally.baseAtk || 0) + (weapon.attack ?? weapon.attackBonus ?? 0);
}

export function getAllyDefense(ally, getActorEquippedArmor) {
  const armor = getAllyArmor(ally, getActorEquippedArmor);
  return (ally.baseDef || 0) + (armor.defense ?? armor.defenseBonus ?? 0);
}

export function getAllySpeed(ally) {
  return ally.baseSpeed ?? ally.speed ?? 0;
}

export function getActorKey(actor, hero) {
  return actor === hero ? 'hero' : actor?.id || null;
}

export function isItemAllowedForActor(item, actorKey) {
  if (!item) return false;
  if (!Array.isArray(item.allowedUsers) || item.allowedUsers.length === 0) return true;
  return actorKey ? item.allowedUsers.includes(actorKey) : false;
}

export function getOwnedWeaponIds(actor, deps) {
  const {
    WEAPONS,
    getActorKey,
  } = deps;

  const actorKey = getActorKey(actor);
  const owned = Array.isArray(actor?.weaponsOwned) ? actor.weaponsOwned : [];

  return owned.filter(id =>
    WEAPONS[id] && isItemAllowedForActor(WEAPONS[id], actorKey)
  );
}

export function getOwnedArmorIds(actor, deps) {
  const {
    ARMORS,
    getActorKey,
  } = deps;

  const actorKey = getActorKey(actor);
  const owned = Array.isArray(actor?.armorsOwned) ? actor.armorsOwned : [];

  return owned.filter(id =>
    ARMORS[id] && isItemAllowedForActor(ARMORS[id], actorKey)
  );
}

export function getActorEquippedWeapon(actor, deps) {
  const {
    hero,
    WEAPONS,
    getActorKey,
    getOwnedWeaponIds,
  } = deps;

  const actorKey = getActorKey(actor);
  const itemId = actor === hero ? hero.weapon : actor?.equippedWeapon;
  const owned = getOwnedWeaponIds(actor);

  if (itemId && WEAPONS[itemId] && isItemAllowedForActor(WEAPONS[itemId], actorKey)) {
    return WEAPONS[itemId];
  }

  return WEAPONS[owned[0]] || { attack: 0 };
}

export function getActorEquippedArmor(actor, deps) {
  const {
    hero,
    ARMORS,
    getActorKey,
    getOwnedArmorIds,
  } = deps;

  const actorKey = getActorKey(actor);
  const itemId = actor === hero ? hero.armor : actor?.equippedArmor;
  const owned = getOwnedArmorIds(actor);

  if (itemId && ARMORS[itemId] && isItemAllowedForActor(ARMORS[itemId], actorKey)) {
    return ARMORS[itemId];
  }

  return ARMORS[owned[0]] || { defense: 0 };
}