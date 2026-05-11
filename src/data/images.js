export const TILE_IMAGES = {
    // ── フィールド ──────────────────────────────────────────────
    grass:           'sprites/tiles/grass.png',
    grass_dark:      'sprites/tiles/grass_dark.png',
    ruin_stone:      'sprites/tiles/ruin_stone.png',
    ruin_dirt:       'sprites/tiles/ruin_dirt.png',
    tree:            'sprites/tiles/tree.png',
    water:           'sprites/tiles/water.png',
    shallow_water:   'sprites/tiles/shallow_water.png',
    beach_sand:      'sprites/tiles/beach_sand.png',
    stone:           'sprites/tiles/stone.png',        // 街の石畳
    town_road:       'sprites/tiles/town_road.png',    // 街の道（未配置ならフォールバック描画）
    town_gate:       'sprites/tiles/town_gate.png',    // 街入口
    dungeon_gate:    'sprites/tiles/dungeon_gate.png', // ダンジョン入口
    mountain:        'sprites/tiles/mountain.png',
    // ── ダンジョン ──────────────────────────────────────────────
    cave_floor:      'sprites/tiles/cave_floor.png',
    cave_wall:       'sprites/tiles/cave_wall.png',
    cave_water:      'sprites/tiles/cave_water.png',
    cave_crystal:    'sprites/tiles/cave_crystal.png', // 花→結晶
    // ── 建物（外観 2×2 タイル） ─────────────────────────────────
    house_tl:        'sprites/tiles/house_tl.png',     // 左上
    house_tr:        'sprites/tiles/house_tr.png',     // 右上
    house_bl:        'sprites/tiles/house_bl.png',     // 左下（汎用）
    house_br:        'sprites/tiles/house_br.png',     // 右下
    house_inn_bl:    'sprites/tiles/house_inn_bl.png', // 宿屋 左下
    house_shop_bl:   'sprites/tiles/house_shop_bl.png',// 道具屋 左下
    // ── 建物（内装） ────────────────────────────────────────────
    house_floor:     'sprites/tiles/house_floor.png',
    house_wall:      'sprites/tiles/house_wall.png',
    house_furniture: 'sprites/tiles/house_furniture.png', // 家具（HOUSE タイル）
    house_exit:      'sprites/tiles/house_exit.png',   // 出口（TOWN_GATE）
    // ── 装飾・拡張タイル ────────────────────────────────────────
    small_rock:      'sprites/objects/small_rock.png',
    flower:          'sprites/objects/flower.png',
    dirt_path:       'sprites/tiles/dirt_path.png',
    cracked_floor:   'sprites/tiles/cracked_floor.png',
    barrel:          'sprites/objects/barrel.png',
    crate:           'sprites/objects/crate.png',
    cave_rock:       'sprites/tiles/cave_rock.png',
    cave_wall_edge:  'sprites/tiles/cave_wall_edge.png',
    dead_grass:      'sprites/tiles/dead_grass.png',
    root:            'sprites/objects/root.png',
    poison_swamp:    'sprites/tiles/poison_swamp.png',
    cursed_edge:     'sprites/tiles/cursed_edge.png',
    cursed_grass:    'sprites/tiles/cursed_grass.png',
    cursed_floor:    'sprites/tiles/cursed_floor.png',
    // ── 魔王城 ─────────────────────────────────────────────────
    castle_floor:     'sprites/tiles/castle_floor.png',
    castle_wall:      'sprites/tiles/castle_wall.png',
    castle_wall_edge: 'sprites/tiles/castle_wall_edge.png',
    castle_gate:      'sprites/tiles/castle_wall_edge.png',
    throne_floor:     'sprites/tiles/throne_floor.png',
};

export const SPRITE_IMAGES = {
    hero: 'sprites/hero.png', // 主人公スプライトシート（2×2コマ: 左上=下, 右上=右, 左下=左, 右下=上）
    heroWalk: 'sprites/hero_walk.png',
    npc:  'sprites/npc.png',  // NPC（汎用・全NPCで共通使用）
    boss: 'sprites/boss.png', // ボス（ダークナイト）
};

export const NPC_SPRITE_IMAGES = {
    old_man:  'sprites/npc/old_man.png',
    child:    'sprites/npc/child.png',
    lore_npc: 'sprites/npc/lore_npc.png',
    town_resident: 'sprites/npc/town_resident.png',
    old_villager: 'sprites/npc/old_villager.png',
    town_child: 'sprites/npc/town_child.png',
    innkeeper:'sprites/npc/innkeeper.png',
    merchant: 'sprites/npc/merchant.png',
    kajiya:   'sprites/npc/kajiya.png',
    old_blacksmith: 'sprites/npc/old_blacksmith.png',
    castle_guard:   'sprites/npc/castle_guard.png',
    leafa_style:  'sprites/allies/leafa_style.png',
};

export const ENEMY_SPRITE_IMAGES = {
    slime:       'sprites/enemies/slime.png',
    bat:         'sprites/enemies/bat.png',
    goblin:      'sprites/enemies/goblin.png',
    dark_knight: 'sprites/enemies/dark_knight.png',
    snake:       'sprites/enemies/snake.png',
    owl:         'sprites/enemies/owl.png',
    tree_minion: 'sprites/enemies/tree_minion.png',
    wild_rat:    'sprites/enemies/wild_rat.png',
    hornet:      'sprites/enemies/hornet.png',
    wandering_mushroom: 'sprites/enemies/wandering_mushroom.png',
    cave_spider: 'sprites/enemies/cave_spider.png',
    skeleton:    'sprites/enemies/skeleton.png',
    dark_soldier:'sprites/enemies/dark_soldier.png',
    dark_mage:   'sprites/enemies/dark_mage.png',
    jurei:       'sprites/enemies/jurei.png',
    scrap_beast:  'sprites/enemies/scrap_beast.png',
    demon_lord:        'sprites/enemies/demon_lord.png',
    demon_general:     'sprites/enemies/demon_general.png',
    dark_knight_elite: 'sprites/enemies/dark_knight_elite.png',
    demon_sorceress:   'sprites/enemies/demon_sorceress.png',
};

export const UI_IMAGE_SOURCES = {
    hero_face:       ['sprites/ui/hero_face.png', 'sprites/hero_face.png'],
    hero_face_tired: ['sprites/ui/hero_face_tired.png', 'sprites/hero_face_tired.png'],
    leafa_face:      ['sprites/allies/leafa_face.png'],
    leafa_face_tired:['sprites/allies/leafa_face_tired.png'],
    title_bg:        ['sprites/ui/title_bg.png'],
};

export const BATTLE_BG_IMAGES = {
    field:       'sprites/battle_bg/field.png',
    cave:        'sprites/battle_bg/cave.png',
    boss:        'sprites/battle_bg/boss.png',
    dark_knight: 'sprites/battle_bg/dark_knight.png',
    forest_boss: 'sprites/battle_bg/forest_boss.png',
    forest_event: 'sprites/battle_bg/forest_event.png',
    demon_king:  'sprites/battle_bg/demon_king.png',
    castle_bg:   'sprites/battle_bg/castle_bg.png',
    dead_grass_bg: 'sprites/battle_bg/dead_grass_bg.png',
    cursed_forest_bg: 'sprites/battle_bg/cursed_forest_bg.png',
};

export const SIGN_IMAGE_SOURCE = 'sprites/objects/sign.png';

export const OBJECT_IMAGE_SOURCES = {
    chest:      ['sprites/objects/chest.png', 'sprites/objects/chest_closed.png'],
    chest_open: ['sprites/objects/chest_open.png', 'sprites/objects/chest_opened.png'],
    torch:      ['sprites/objects/torch.png'],
    house:      ['sprites/objects/house.png'],
    house_inn:  ['sprites/objects/house_inn.png'],
    house_shop: ['sprites/objects/house_shop.png'],
    shadow_house:      ['sprites/objects/shadow_house.png', 'sprites/objects/house.png'],
    shadow_house_inn:  ['sprites/objects/shadow_house_inn.png', 'sprites/objects/house_inn.png'],
    shadow_house_shop: ['sprites/objects/shadow_house_shop.png', 'sprites/objects/house_shop.png'],
    campfire_ash: ['sprites/objects/campfire_ash.png'],
    rock_cluster: ['sprites/objects/rock_cluster.png'],
    dead_tree:    ['sprites/objects/dead_tree.png'],
    dead_tree_dark: ['sprites/objects/dead_tree_dark.png'],
    flower_red:   ['sprites/objects/flower_red.png'],
    old_forge:    ['sprites/objects/old_forge.png'],
    throne:       ['sprites/objects/throne.png'],
    dark_crystal: ['sprites/objects/dark_crystal.png'],
    dark_pillar:  ['sprites/objects/dark_pillar.png'],
    iron_door:    ['sprites/objects/iron_door.png'],
    demon_altar:  ['sprites/objects/demon_altar.png'],
    dark_castle_object: ['sprites/objects/dark_castle.png'],
    forest_entrance:    ['sprites/objects/forest_entrance.png'],
    town_gate:    ['sprites/objects/town_gate.png'],
    cave_entrance:['sprites/objects/cave_entrance.png'],
    fountain:     ['sprites/objects/fountain.png'],
    tree:         ['sprites/objects/tree.png'],
    tree_dark:    ['sprites/objects/tree_dark.png'],
    mountain:     ['sprites/objects/mountain.png'],
    west_village: ['sprites/objects/west_village.png'],
    seaside_house:['sprites/objects/seaside_house.png'],
    wooden_pier:  ['sprites/objects/wooden_pier.png'],
    lighthouse:   ['sprites/objects/lighthouse.png'],
    ship_right:   ['sprites/objects/ship_right.png'],
    ruined_city:  ['sprites/objects/ruined_city.png'],
    rocky_hill:   ['sprites/objects/rocky_hill.png'],
};
