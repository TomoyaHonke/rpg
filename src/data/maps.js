import { T } from './tiles.js';

export const LEAFA_RESCUE_POS = { x: 4, y: 1 }; // leafaForestMap内のリーファ遭遇位置
export const LEAFA_RESCUE_ENEMY_NPCS = [
    { x: 3, y: 1, offsetX: +90, offsetY: -10, spriteKey: 'goblin' },
    { x: 5, y: 1, offsetX: 0, offsetY: +10, spriteKey: 'tree_minion' },
    { x: 4, y: 1, offsetX: -20, offsetY: +10, spriteKey: 'tree_minion' },
  ];
export const fieldMap = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,0,0,0,0,0,T.DIRT_PATH,T.DIRT_PATH,T.DIRT_PATH,0,0,0,1],  // col1=木、col2=森入口、col3=木
    [1,0,0,0,0,0,0,0,T.DIRT_PATH,T.DIRT_PATH,7,T.DIRT_PATH,0,0,0,1],  // row 2：col1=木、col2=森前、col3=木　街入口(col10)
    [1,0,0,0,0,0,0,0,0,T.DIRT_PATH,T.DIRT_PATH,T.DIRT_PATH,0,0,0,1],  // col1=木、col2=森前、col3=木
    [1,0,0,0,0,0,0,0,0,0,T.DIRT_PATH,T.DIRT_PATH,T.DIRT_PATH,0,0,1],
    [1,0,0,0,0,1,1,0,0,0,0,T.DIRT_PATH,T.DIRT_PATH,0,0,1],
    [1,T.DEAD_GRASS,0,0,0,1,1,0,0,0,0,0,T.DIRT_PATH,T.DIRT_PATH,0,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,0,0,0,0,0,0,0,0,0,T.MOUNTAIN,T.MOUNTAIN,T.MOUNTAIN,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,0,0,2,2,2,0,0,0,T.MOUNTAIN,8,T.MOUNTAIN,1],  // row 8：col13=ダンジョン入口
    [T.MOUNTAIN,T.MOUNTAIN,T.MOUNTAIN,T.DEAD_GRASS,0,0,2,2,2,0,0,0,1,T.DIRT_PATH,T.DIRT_PATH,1],
    [T.MOUNTAIN,T.MOUNTAIN,8,T.DIRT_PATH,T.DIRT_PATH,0,0,0,0,0,0,0,0,T.DIRT_PATH,T.DIRT_PATH,1],  // row 10：col2=荒野ゲート
    [T.MOUNTAIN,T.MOUNTAIN,T.MOUNTAIN,1,1,1,1,1,1,1,1,1,1,1,1,1],
  ];
  // リーファの森（10×11）— field1北西の森入口から続く専用マップ
  // 南の入口ゲート(col4-5,row9)からプレイヤーが入り、北の広場でリーファに遭遇する
 export const leafaForestMap = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,1,0,1,0,0,1,0,1,1],                                                       // row 1: 深い森
    [1,1,0,0,0,0,0,0,1,1],                                                       // row 2: 広場手前
    [1,1,0,0,0,0,0,0,1,1],                                                       // row 3: 出会い広場 (4,3)
    [1,1,0,0,0,0,0,0,1,1],                                                       // row 4: 広場続き
    [1,1,1,0,T.DIRT_PATH,T.DIRT_PATH,0,1,1,1],                                  // row 5: 道が広場に続く
    [1,1,1,0,T.DIRT_PATH,T.DIRT_PATH,0,1,1,1],                                  // row 6
    [1,1,1,0,T.DIRT_PATH,T.DIRT_PATH,0,1,1,1],                                  // row 7
    [1,1,1,0,T.DIRT_PATH,T.DIRT_PATH,0,1,1,1],                                  // row 8: スポーン付近
    [1,1,1,1,T.DIRT_PATH,T.DIRT_PATH,1,1,1,1],                                  // row 9: 出口ゲート (col4-5)
    [1,1,1,1,T.DIRT_PATH,T.DIRT_PATH,1,1,1,1],
  ];
  // ヒカリのまち（14×10）中央集約型
  // 南入口から中央広場を通り、住宅・道具屋・宿屋へ道が伸びる
  // 内部床は stone、主要導線は town_road で統一する
  export const townMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  // row0 外壁
    [1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1],  // row1 家並み奥
    [1, 4,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD, 4, 4, 1],  // row2 家並み前
    [1, 4, 4, 4, 4, 4, 4, T.TOWN_ROAD, 4, 4, 4, 4, 4, 1],  // row3 北側路地
    [1, 4, 4, 4, 4, 4, 4, T.TOWN_ROAD, 4, 4, 4, 4, 4, 1],  // row4 中央横道
    [1, 4, T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD,4, 4, 4, 4, 4, 1],  // row5 小広場
    [1, 4, 4, 4, 4,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD, 4, 4, 4, 4, 4, 1],  // row6 宿屋・家前
    [1, 1, 1, 1, 1,T.TOWN_ROAD,T.TOWN_ROAD,T.TOWN_ROAD, 1, 1, 1, 1, 1, 1],  // row7 ゲート壁
    [1, 1, 1, 1, 1, 1,T.TOWN_ROAD, 1, 1, 1, 1, 1, 1, 1],  // row8 出口
    [1, 1, 1, 1, 1, 1,T.TOWN_ROAD, 1, 1, 1, 1, 1, 1, 1],  // row9 外壁
  ];
  export const dungeonMap = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,4,4,4,1,1],
    [1,1,1,1,1,1,1,1,1,4,4,11,4,4,2,1],
    [1,1,1,1,1,1,1,1,1,4,16,3,1,3,2,1],
    [1,1,1,1,4,4,4,4,4,11,1,1,1,1,1,1],
    [1,1,1,4,4,15,1,1,1,4,16,1,1,4,1,1],
    [1,4,4,4,1,1,4,4,4,4,4,4,3,4,2,1],
    [1,4,15,1,1,1,4,1,1,1,1,1,16,4,1,1],
    [1,4,4,4,4,4,4,4,11,4,4,4,4,4,4,1],
    [1,1,1,1,1,16,4,4,4,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,4,4,4,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1],
  ];

 export const field2Map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,7,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.CURSED_FLOOR,T.CURSED_FLOOR,T.CURSED_FLOOR,T.DEAD_GRASS,1],  // col3=カゲのまち入口 col12=魔王城入口
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DIRT_PATH,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,1,T.DEAD_GRASS,T.CURSED_FLOOR,T.CURSED_FLOOR,T.CURSED_FLOOR,T.DEAD_GRASS,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DIRT_PATH,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,1,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DIRT_PATH,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DIRT_PATH,T.DEAD_GRASS,1,1,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,7,T.DEAD_GRASS,T.DEAD_GRASS,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DIRT_PATH,T.DEAD_GRASS,1,1,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DIRT_PATH,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DIRT_PATH,T.DEAD_GRASS,T.DEAD_GRASS,2,2,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,1],
    [1,T.DEAD_GRASS,T.DEAD_GRASS,T.DIRT_PATH,T.DEAD_GRASS,T.DEAD_GRASS,2,2,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.MOUNTAIN,T.MOUNTAIN,T.MOUNTAIN],
    [1,T.DEAD_GRASS,1,8,1,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,T.DEAD_GRASS,8,T.MOUNTAIN,T.MOUNTAIN],  // col3=呪われた森入口, col13=field1へ戻る
    [1,1,1,1,1,1,1,1,1,1,1,1,1,T.MOUNTAIN,T.MOUNTAIN,T.MOUNTAIN],
  ];
  // カゲのまち（14×10）— 形はヒカリのまちと同じにする
export const shadowTownMap = townMap.map(row => row.slice());

  // 旅人の集落（outpost）— field2の東端に位置する小さな石畳の集落
  // 入口: col4-5 row6(TOWN_GATE)  鍛冶屋NPC: col6 row3  宝箱: col7 row2
 export const outpostMap = [
    [1,1,1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,4,4,1],
    [1,1,1,1,10,10,1,1,1,1],
    [1,1,1,1,10,10,1,1,1,1],
  ];

  // 呪われた森ダンジョン（第3段階）
  // 入口: col7-8 row11(TOWN_GATE)  ボス: col7 row1  宝箱: col2/col12 row7
export const cursedForestMap = [
    // row 0: 上端壁
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    // row 1: 退場ゲート（上から出るとフィールド2へ）
    [1,1,1,1,1,1,20,20,1,1,1,1,1,1,1,1],
    // row 2: 入口エリア（プレイヤー出現位置）
    [1,1,1,1,1,20,20,20,20,1,1,1,1,1,1,1],
    // row 3: 少し狭まる（左寄り）
    [1,1,1,1,1,20,21,21,1,1,1,1,1,1,1,1],
    // row 4: 根で左を圧迫、右を閉じる
    [1,1,1,1,19,22,21,1,1,1,1,1,1,1,1,1],
    // row 5: 根で両側を絞る
    [1,1,1,1,19,22,22,19,1,1,1,1,1,1,1,1],
    // row 6: 左に呪われた草、右に毒沼
    [1,1,1,1,20,21,22,19,19,1,1,1,1,1,1,1],
    // row 7: 分岐①（左枝 col3 開通）
    [1,1,1,20,20,21,21,20,1,1,1,1,1,1,1,1],
    // row 8: 左枝（col3）と中央路（col6-7）に分かれる
    [1,1,1,20,1,1,21,20,1,1,1,1,1,1,1,1],
    // row 9: 左枝は宝箱で行き止まり（chest1: col3,row9）、中央継続
    [1,1,1,20,1,1,21,1,1,1,1,1,1,1,1,1],
    // row 10: 左枝を下へ伸ばす
    [1,1,1,21,1,1,21,22,19,19,1,1,1,1,1,1],
    // row 11: 看板エリア（sign: col8,row11）
    [1,1,1,21,1,20,21,20,22,1,1,1,1,1,1,1],
    // row 12: 左枝をさらに下へ、中央は毒沼の帯
    [1,1,1,21,19,19,22,20,22,19,1,1,1,1,1,1],
    // row 13: 左枝を下へ、中央は右へシフト
    [1,1,1,21,1,1,20,21,21,20,1,1,1,1,1,1],
    // row 14: 左枝を下へ、右枝の開始点は維持
    [1,1,1,21,1,1,20,21,1,20,20,1,1,1,1,1],
    // row 15: 左枝を下へ、右下の宝箱ルートへつなぐ
    [1,1,1,21,1,1,21,1,1,1,20,1,1,1,1,1],
    // row 16: 左宝箱と右宝箱の行き止まり
    [1,1,21,21,1,1,21,1,1,1,20,1,21,1,1,1],
    // row 17: 再合流しつつ右へ枝分かれ
    [1,1,1,1,1,20,21,21,21,20,20,21,21,1,1,1],
    // row 18: ボス前広場（広め）
    [1,1,1,1,20,20,21,21,21,20,20,20,1,1,1,1],
    // row 19: ボスエリア（boss: col7,row19）
    [1,1,1,1,1,20,20,21,21,20,1,1,1,1,1,1],
  ];
export const forestMap = cursedForestMap;
export const FOREST_BOSS_POS = { x: 7, y: 19 };

  const _CF = T.CASTLE_FLOOR; 
  const _CW = T.CASTLE_WALL; 
  const _CG = T.CASTLE_GATE;
  const _TF = T.THRONE_FLOOR; 

export const castleMap = [
    // row 0: 上端壁
    [_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW],
    // row 1: 玉座間（boss at col7, row1）
    [_CW,_CW,_CW,_CW,_CW,_CW,_TF,_TF,_TF,_CW,_CW,_CW,_CW,_CW,_CW,_CW],
    // row 2: ボス前広場
    [_CW,_CW,_CW,_CW,_CW,_CF,_TF,_TF,_TF,_CF,_CW,_CW,_CW,_CW,_CW,_CW],
    // row 3: 将軍の間（col7のみ通行可 — 将軍エンティティで完全封鎖）
    [_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CF,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW],
    // row 4: 上層側室
    [_CW,_CW,_CF,_CF,_CF,_CW,_CW,_CF,_CF,_CW,_CW,_CF,_CF,_CF,_CW,_CW],
    // row 5: 中層通路
    [_CW,_CW,_CF,_CW,_CW,_CW,_CF,_CF,_CF,_CF,_CW,_CW,_CW,_CF,_CW,_CW],
    // row 6: 中央大広間（宝箱 col2, col13）
    [_CW,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CW],
    // row 7: 下層側室
    [_CW,_CF,_CW,_CW,_CF,_CW,_CW,_CF,_CF,_CW,_CW,_CF,_CW,_CW,_CF,_CW],
    // row 8: 下層廊下
    [_CW,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CW],
    // row 9: 入口前広間（NPC col3, 看板 col12）
    [_CW,_CW,_CW,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CF,_CW,_CW,_CW],
    // row 10: 入口通路（プレイヤー出現位置 col7）
    [_CW,_CW,_CW,_CW,_CW,_CW,_CF,_CF,_CF,_CF,_CW,_CW,_CW,_CW,_CW,_CW],
    // row 11: 入口ゲート
    [_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CG,_CW,_CW,_CW,_CW,_CW,_CW,_CW,_CW],
  ];
export const CASTLE_BOSS_POS    = { x: 7, y: 1 };
export const DEMON_GENERAL_POS  = { x: 7, y: 3 };
export const houseMaps = {
    west: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,5,4,4,5,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,7,7,1,1,1],
    ],
    east: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,5,5,4,4,1],
      [1,4,5,4,4,5,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,7,7,1,1,1],
    ],
    inn: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,5,5,4,4,5,5,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,7,7,1,1,1],
    ],
    shop: [
      [1,1,1,1,1,1,1,1],
      [1,4,4,4,4,4,4,1],
      [1,4,5,5,5,5,4,1],
      [1,4,4,4,4,4,4,1],
      [1,4,4,4,4,4,4,1],
      [1,1,1,7,7,1,1,1],
    ],
  };
  houseMaps.north = [
    [1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,1],
    [1,4,5,4,4,5,4,1],
    [1,4,4,4,5,4,4,1],
    [1,4,4,4,4,4,4,1],
    [1,1,1,7,7,1,1,1],
  ];
  houseMaps.south = [
    [1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,1],
    [1,4,4,5,4,5,4,1],
    [1,4,5,4,4,4,4,1],
    [1,4,4,4,4,4,4,1],
    [1,1,1,7,7,1,1,1],
  ];
  // カゲのまち用の建物内装（宿屋・ショップ）
  houseMaps.shadow_inn = [
    [1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,1],
    [1,5,5,4,4,5,5,1],
    [1,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,1],
    [1,1,1,7,7,1,1,1],
  ];
  houseMaps.shadow_shop = [
    [1,1,1,1,1,1,1,1],
    [1,4,4,4,4,4,4,1],
    [1,4,5,5,5,5,4,1],
    [1,4,4,4,4,4,4,1],
    [1,4,4,4,4,4,4,1],
    [1,1,1,7,7,1,1,1],
  ];

export const TOWN_HOUSES = [
    { x: 2, y: 2, spriteKey: 'house', width: 256, height: 240, variant: 'west', houseId: 'west' },
    { x: 8, y: 2, spriteKey: 'house', width: 256, height: 240, variant: 'east', houseId: 'east' },
    { x: 2, y: 5, spriteKey: 'house', width: 256, height: 240, variant: 'north', houseId: 'north' },
    { x: 5, y: 5, spriteKey: 'house_inn', width: 256, height: 240, variant: 'inn', houseId: 'inn' },
    { x: 5, y: 2, spriteKey: 'house_shop', width: 256, height: 240, variant: 'shop', houseId: 'shop' },
    { x: 9, y: 5, spriteKey: 'house', width: 256, height: 240, variant: 'south', houseId: 'south' },
  ];
export const SHADOW_TOWN_HOUSES = [
    { x: 2, y: 2, spriteKey: 'shadow_house', width: 256, height: 240, variant: 'shadow' },
    { x: 8, y: 2, spriteKey: 'shadow_house', width: 256, height: 240, variant: 'shadow' },
    { x: 2, y: 5, spriteKey: 'shadow_house', width: 256, height: 240, variant: 'shadow' },
    { x: 5, y: 5, spriteKey: 'shadow_house_inn', width: 256, height: 240, variant: 'shadowInn', houseId: 'shadow_inn' },
    { x: 5, y: 2, spriteKey: 'shadow_house_shop', width: 256, height: 240, variant: 'shadowShop', houseId: 'shadow_shop' },
    { x: 9, y: 5, spriteKey: 'shadow_house', width: 256, height: 240, variant: 'shadow' },
  ];

export const START_MAP = townMap;
export const START_POS = { x: 6, y: 7 };