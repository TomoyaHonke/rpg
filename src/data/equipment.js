export const WEAPONS = {
    woodSword:    { id: 'woodSword',    name: '木の剣',     attack: 1,  description: '初期装備の木製の剣。',                   price: 0,  obtainMethod: '初期装備', allowedUsers: ['hero'] },
    ironSword:    { id: 'ironSword',    name: '鉄の剣',     attack: 5,  description: '洞窟の宝箱に眠る鉄の剣。',               price: 0,  obtainMethod: '洞窟・宝箱', allowedUsers: ['hero'] },
    steelSword:   { id: 'steelSword',   name: '鋼の剣',     attack: 10, description: 'カゲのまちで買える業物。',               price: 130, obtainMethod: 'カゲのまちの道具屋', allowedUsers: ['hero'] },
    magicSword:   { id: 'magicSword',   name: '魔法の剣',   attack: 18, description: '旅人の集落の老鍛冶屋が鍛えた魔剣。',     price: 0,  obtainMethod: '旅人の集落・老鍛冶屋の依頼', allowedUsers: ['hero'] },
    wooden_staff: { id: 'wooden_staff', name: '木の杖',     attack: 2,  description: 'リーファの初期装備。魔力を通しやすい木の杖。', price: 0,  obtainMethod: '初期装備', allowedUsers: ['leafa'] },
    mage_staff:   { id: 'mage_staff',   name: '魔法の杖',   attack: 6,  description: 'リーファ向けの魔導の杖。',               price: 150, obtainMethod: 'カゲのまちの道具屋', allowedUsers: ['leafa'] },
    forest_staff: { id: 'forest_staff', name: '森の杖',     attack: 10, description: '森の宝箱で見つかる古木の杖。',           price: 0,  obtainMethod: '呪われた森の宝箱', allowedUsers: ['leafa'] },
    spirit_staff: { id: 'spirit_staff', name: '精霊の杖',   attack: 14, description: '精霊の力を宿した神秘の杖。',             price: 0,  obtainMethod: '魔王城・宝箱', allowedUsers: ['leafa'] },
  };
  
export const ARMORS = {
    travelerClothes: { id: 'travelerClothes', name: '旅人の服',     defense: 2,  description: '初期装備の軽装。',               price: 0,  obtainMethod: '初期装備', allowedUsers: ['hero'] },
    leatherArmor:    { id: 'leatherArmor',    name: '革よろい',     defense: 5,  description: '軽くて動きやすい革の鎧。',       price: 30, obtainMethod: 'ヒカリのまちの道具屋', allowedUsers: ['hero'] },
    ironArmor:       { id: 'ironArmor',       name: '鉄のよろい',   defense: 9,  description: 'カゲのまちの道具屋で売られる鉄鎧。', price: 200, obtainMethod: 'カゲのまちの道具屋', allowedUsers: ['hero'] },
    knightArmor:     { id: 'knightArmor',     name: '騎士のよろい', defense: 14, description: '魔王城の奥に眠る重鎧。',        price: 0,  obtainMethod: '魔王城・宝箱', allowedUsers: ['hero'] },
    cloth_robe:      { id: 'cloth_robe',      name: '布のローブ',   defense: 1,  description: 'リーファの初期装備。動きやすい布製のローブ。', price: 0, obtainMethod: '初期装備', allowedUsers: ['leafa'] },
    green_robe:      { id: 'green_robe',      name: '森のローブ',   defense: 6,  description: '森の恵みを織り込んだ軽いローブ。',  price: 200, obtainMethod: 'カゲのまちの道具屋', allowedUsers: ['leafa'] },
    mystic_robe:     { id: 'mystic_robe',     name: '精霊のローブ', defense: 10, description: '精霊の加護を宿す秘術のローブ。',   price: 0,  obtainMethod: '呪われた森の宝箱', allowedUsers: ['leafa'] },
    wise_robe:       { id: 'wise_robe',       name: '賢者のローブ', defense: 13, description: '古代の賢者が纏ったとされる至高のローブ。', price: 0, obtainMethod: '魔王城・宝箱', allowedUsers: ['leafa'] },
  };