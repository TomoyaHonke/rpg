
export const NPCS = [
    {
      x: 4, y: 6,
      npcId: 'elder',
      role: 'talk',
      name: '長老',
      spriteKey: 'old_villager',
      drawW: 80, drawH: 80,
      bodyCol: '#778877', hairCol: '#cccccc',
      lines: [
        'おお、旅人よ。よくぞ　ヒカリのまちへ。',
        'このあたりの　草むらには',
        'スライムが　出るから　気をつけるのじゃ！',
      ],
    },
    {
      x: 8, y: 5,
      npcId: 'child',
      role: 'event',
      name: 'こども',
      spriteKey: 'town_child',
      drawW: 100, drawH: 100,
      quest: true,
      bodyCol: '#ddbb22', hairCol: '#994400',
      lines: [
        'ねえねえ！　スライムって　かわいいよね？',
        'でも　たたかったら　こわかった…',
        'ゆうしゃさんって　つよいね！',
      ],
    },
    {
      x: 2, y: 6,
      npcId: 'town_gardener',
      role: 'talk',
      name: '花好きの住人',
      spriteKey: 'town_resident',
      drawW: 130, drawH: 130,
      bodyCol: '#66aa66', hairCol: '#553322',
      lines: [
        '道のそばに花を植えているんだ。',
        '旅人が迷わないようにね。',
      ],
    },
    {
      x: 11, y: 6,
      npcId: 'town_traveler',
      role: 'talk',
      name: '旅の男',
      spriteKey: 'town_resident',
      drawW: 130, drawH: 130,
      bodyCol: '#777799', hairCol: '#332211',
      lines: [
        '町の外では　道を外れると魔物に会いやすい。',
        'まずは装備とポーションを整えるといい。',
      ],
    },
    {
      x: 11, y: 3,
      npcId: 'town_storyteller',
      role: 'talk',
      name: '語り部',
      spriteKey: 'lore_npc',
      drawW: 130, drawH: 130,
      bodyCol: '#886666', hairCol: '#ddddcc',
      lines: [
        '昔、この地にも大きな城があったそうじゃ。',
        '今は闇の力が　西の荒野に集まっておる。',
      ],
    },
  ];
 export const EAST_HOUSE_NPCS = [
    {
      x: 5, y: 4,
      npcId: 'town_watchman',
      role: 'talk',
      name: '見張りの男',
      spriteKey: 'town_resident',
      drawW: 130, drawH: 130,
      bodyCol: '#556677', hairCol: '#332211',
      lines: [
        '北西の森で、誰かが魔物に追われていたらしい。',
        'もし行くなら　気をつけてくれ。',
      ],
    },
  ];
 export const INN_NPCS = [
    {
      x: 4, y: 3,
      npcId: 'inn_mario',
      role: 'inn',
      name: '宿屋　マリオ',
      spriteKey: 'innkeeper',
      drawW: 100, drawH: 100,
      inn: true,
      bodyCol: '#cc3311', hairCol: '#221100',
      lines: [
        'いらっしゃい！　旅人さん。',
        'ゆっくり　休んでいってくださいね。',
      ],
    },
  ];
 export const SOUTH_HOUSE_NPCS = [
    {
      x: 4, y: 3,
      npcId: 'town_anxious_resident',
      role: 'talk',
      name: '不安げな住人',
      spriteKey: 'lore_npc',
      drawW: 130, drawH: 130,
      bodyCol: '#665566', hairCol: '#cccccc',
      lines: [
        '最近…空気が重いんだ。',
        '森の奥には近づかない方がいい。',
        '魔王城に行った者は帰ってこないらしい。',
      ],
    },
  ];
 export const SHOP_NPCS = [
    {
      x: 4, y: 3,
      npcId: 'shop_mario',
      role: 'shop',
      name: '商人　マリオ',
      spriteKey: 'merchant',
      drawW: 100, drawH: 100,
      shop: true,
      bodyCol: '#cc3311', hairCol: '#221100',
      lines: [
        '毎度あり。',
      ],
    },
  ];

  // カゲのまち NPC
  export const SHADOW_TOWN_NPCS = [
    {
      x: 5, y: 6,
      npcId: 'shadow_smith',
      role: 'talk',
      name: '鍛冶屋 ドワン',
      spriteKey: 'kajiya',
      drawW: 110, drawH: 110,
      bodyCol: '#445566', hairCol: '#332211',
      lines: ['ここ　カゲのまちへ　よく来たな。', '洞窟を抜けてきたのか？　なかなかやるな。'],
    },
    {
      x: 8, y: 4,
      npcId: 'shadow_traveler',
      role: 'talk',
      name: 'かげの旅人',
      spriteKey: 'town_resident',
      drawW: 130, drawH: 130,
      bodyCol: '#334455', hairCol: '#223344',
      lines: [
        'ここは　カゲのまち。',
        '光の届かぬ　闇の里だ。',
        'この町の南に　呪われた森があるという…',
      ],
    },
  ];
  export const SHADOW_INN_NPCS = [
    {
      x: 4, y: 3,
      npcId: 'shadow_inn_beatrice',
      role: 'inn',
      name: '宿屋 ベアトリス',
      spriteKey: 'innkeeper',
      drawW: 100, drawH: 100,
      inn: true,
      bodyCol: '#223344', hairCol: '#111122',
      lines: ['いらっしゃい。休んでいきな。ここは安全だ。'],
    },
  ];
  export const SHADOW_SHOP_NPCS = [
    {
      x: 4, y: 3,
      npcId: 'shadow_shop_gray',
      role: 'shop',
      name: '商人 グレイ',
      spriteKey: 'merchant',
      drawW: 100, drawH: 100,
      shop: true,
      bodyCol: '#334455', hairCol: '#221100',
      lines: ['毎度あり。'],
    },
  ];

  export const FIELD_NPCS = [
    {
      x: 4, y: 7,
      npcId: 'field_healer',
      role: 'inn',
      name: '旅の休憩者',
      spriteKey: 'lore_npc',
      drawW: 130, drawH: 130,
      bodyCol: '#6a5533', hairCol: '#ddddcc',
      lines: ['焚き火跡で　少し休んでいけ。'],
    },
  ];

  // 旅人の集落 NPC
  export const OUTPOST_NPCS = [
    {
      x: 5, y: 4,
      npcId: 'old_blacksmith',
      role: 'event',
      name: '老鍛冶屋 グルド',
      spriteKey: 'old_blacksmith',
      drawW: 110, drawH: 110,
      bodyCol: '#665544', hairCol: '#aaaaaa',
      lines: ['この集落へよく来たな。'],
    },
    {
      x: 7, y: 5,
      npcId: 'outpost_traveler',
      role: 'talk',
      name: '旅の商人',
      spriteKey: 'merchant',
      drawW: 100, drawH: 100,
      bodyCol: '#557755', hairCol: '#cc9933',
      lines: ['この先の橋は壊れていてな。', '老鍛冶屋が修理を試みているんだが…', '何か素材が必要だと言っていたぞ。'],
    },
  ];

  // 魔王城 NPC（番兵）
  export const CASTLE_NPCS = [
    {
      x: 7, y: 9,
      npcId: 'castle_guard',
      role: 'talk',
      name: '魔王の番兵',
      spriteKey: 'castle_guard',
      drawW: 130, drawH: 130,
      bodyCol: '#1a2a3a', hairCol: '#111111',
      lines: ['ここは魔王ヴァルドールの居城だ。', '命が惜しければ引き返せ！'],
    },
  ];