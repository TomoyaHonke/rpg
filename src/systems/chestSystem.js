export function chestFlagKey(id) {
  return `${id}Opened`;
}

export function chestImageKey(chest, flags) {
  const baseKey = chest.spriteKey || 'chest';
  return flags[chest.flagKey] ? `${baseKey}_open` : baseKey;
}

export function grantChestReward(reward, deps) {
  const {
    hero,
    flags,
    WEAPONS,
    ARMORS,
    changeItemCount,
    grantEquipmentToActor,
    normalizeChestItemId,
  } = deps;

  const item = normalizeChestItemId(reward.item);
  const amount = reward.amount || 1;

  if (item === 'potions') {
    hero.potions += amount;
    return `ポーションを${amount}つ手に入れた！`;
  }

  if (item === 'ether') {
    changeItemCount('ether', amount);
    return `エーテルを${amount}つ手に入れた！`;
  }

  if (item === 'gold') {
    hero.gold += amount;
    return `${amount}Gを手に入れた！`;
  }

  if (item === 'old_fragment') {
    flags.gotOldFragment = true;
    return '古い金属片を手に入れた！　老鍛冶屋に渡せるかもしれない。';
  }

  if (WEAPONS[item]) {
    grantEquipmentToActor(item, 'weapon');
    return `${WEAPONS[item].name}を手に入れた！`;
  }

  if (ARMORS[item]) {
    grantEquipmentToActor(item, 'armor');
    return `${ARMORS[item].name}を手に入れた！`;
  }

  return '';
}

export function normalizeChestItemId(item) {
  if (item === 'iron_sword') return 'ironSword';
  if (item === 'steel_sword') return 'steelSword';
  if (item === 'magic_sword') return 'magicSword';
  if (item === 'leather_armor') return 'leatherArmor';
  if (item === 'knight_armor') return 'knightArmor';
  if (item === 'potion') return 'potions';
  if (item === 'ether') return 'ether';
  return item;
}

export function grantChestRewards(chest, grantChestReward) {
  const rewards = Array.isArray(chest.rewards)
    ? chest.rewards
    : [{ item: chest.item, amount: chest.amount }];

  return rewards
    .map(grantChestReward)
    .filter(Boolean);
}

export function createNpcEvents(deps) {
  const {
    flags,
    getSlimeKills,
    isQuestDone,
    setQuestDone,
    setQuestRewardMsg,
    gainExp,
    hero,
    showNotice,
  } = deps;

  return {
    elder: () => {
      if (!flags.talkedToElder) {
        flags.talkedToElder = true;
      }
    },

    town_watchman: () => {
      if (!flags.leafaRescueDone && !flags.heardLeafaRumor) {
        flags.heardLeafaRumor = true;
      }
    },

    shadow_smith: () => {
      if (flags.gotSeal1 && !flags.gotForestPass) {
        flags.gotForestPass = true;
        showNotice('森の通行証を手に入れた！');
      }
    },

    child: () => {
      if (getSlimeKills() >= 3 && !isQuestDone()) {
        const levelResult = gainExp(5);
        setQuestDone(true);
        setQuestRewardMsg(
          levelResult.leveled
            ? 'ありがとう！ 経験値を5獲得した！ レベルアップ！ 体力が少し回復した…'
            : 'ありがとう！ 経験値を5獲得した！'
        );
      }
    },

    old_blacksmith: () => {
      if (flags.talkedToOldBlacksmith && flags.gotOldFragment && !flags.outpostQuestDone) {
        flags.outpostQuestDone = true;

        if (!hero.weaponsOwned.includes('magicSword')) {
          hero.weaponsOwned.push('magicSword');
        }

        showNotice('魔法の剣を手に入れた！');
      }
    },
  };
}