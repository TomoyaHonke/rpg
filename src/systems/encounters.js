export function getFieldEncounterTable(heroTileX, heroTileY, enemies) {
  const x = heroTileX();
  const y = heroTileY();

  if (x >= 10 && y >= 7) {
    return [
      enemies.HORNET_BASE,
      enemies.WANDERING_MUSHROOM_BASE,
      enemies.BAT_BASE,
    ];
  }

  if (x <= 4 && y >= 7) {
    return [
      enemies.WILD_RAT_BASE,
      enemies.HORNET_BASE,
      enemies.SNAKE_BASE,
    ];
  }

  return [
    enemies.SLIME_BASE,
    enemies.WILD_RAT_BASE,
    enemies.HORNET_BASE,
  ];
}

export function getDungeonEncounterTable(isDeepCaveEncounter, enemies) {
  return isDeepCaveEncounter()
    ? [
        enemies.SKELETON_BASE,
        enemies.GOBLIN_BASE,
        enemies.DARK_SOLDIER_BASE,
        enemies.DARK_MAGE_BASE,
      ]
    : [
        enemies.BAT_BASE,
        enemies.CAVE_SPIDER_BASE,
        enemies.SKELETON_BASE,
        enemies.GOBLIN_BASE,
      ];
}

export function getField2EncounterTable(enemies) {
  return [
    enemies.field2_snake,
    enemies.field2_owl,
    enemies.SCRAP_BEAST_BASE,
  ];
}

export function getCursedForestEncounterTable(enemies) {
  return [
    enemies.forest_snake,
    enemies.forest_owl,
    enemies.cursed_tree_minion,
  ];
}

export function getCastleEncounterTable(enemies) {
  return [
    enemies.castle_dark_soldier,
    enemies.castle_dark_mage,
    enemies.castle_skeleton,
    enemies.dark_knight_elite,
    enemies.demon_sorceress,
  ];
}

export function getLeafaForestEncounterTable(enemies) {
  return [
    enemies.tree_minion,
    enemies.goblin,
    enemies.tree_minion,
  ];
}