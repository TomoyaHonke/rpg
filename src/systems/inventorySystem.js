export function ensureInventory(hero) {
  if (!hero.inventory || typeof hero.inventory !== 'object') {
    hero.inventory = {};
  }

  hero.inventory.ether = hero.inventory.ether ?? 0;
  hero.inventory.elixir = hero.inventory.elixir ?? 0;
}

export function getItemCount(hero, itemId) {
  ensureInventory(hero);

  if (itemId === 'potion') return hero.potions || 0;
  if (itemId === 'ether') return hero.inventory.ether || 0;
  if (itemId === 'elixir') return hero.inventory.elixir || 0;

  return 0;
}

export function setItemCount(hero, itemId, count) {
  ensureInventory(hero);

  if (itemId === 'potion') hero.potions = count;
  if (itemId === 'ether') hero.inventory.ether = count;
  if (itemId === 'elixir') hero.inventory.elixir = count;
}

export function changeItemCount(hero, itemId, delta) {
  setItemCount(
    hero,
    itemId,
    Math.max(0, getItemCount(hero, itemId) + delta)
  );
}

export function getUsableItems(ITEMS) {
  return [
    ITEMS.potion,
    ITEMS.ether,
    ITEMS.elixir,
  ];
}