export function renderEquipMenu(ctx, deps) {
  const {
    VIEW_W,
    VIEW_H,
    txt,

    equipMenuMode,
    equipCursor,
    equipCharacterIndex,
    charaTabIndex,
    equipSlotCursor,
    itemCursor,
    itemUseId,
    itemTargetIndex,

    ITEMS,
    SKILL_DEFS,
    hero,

    getUsableItems,
    getItemCount,
    getPartyMembers,
    getCurrentWeapon,
    getCurrentArmor,
    getAllyWeapon,
    getAllyArmor,
    getAllySpeed,
    getFaceSprite,

    drawEquipMenuFrame,
    drawEquipMainMenu,
    drawItemList,
    drawItemTargetList,
    drawItemHelpText,
    drawCharacterHeader,
    drawCharacterStatusPanel,
    drawEquipmentTab,
    drawSkillTab,

    setEquipState,
  } = deps;

  ctx.save();
  ctx.scale(VIEW_W / 512, VIEW_H / 384);

  drawEquipMenuFrame(ctx, txt);

  if (equipMenuMode === 'main') {
    drawEquipMainMenu(ctx, txt, equipCursor);
    ctx.restore();
    return;
  }

  if (equipMenuMode === 'items' || equipMenuMode === 'itemTarget') {
    txt('道具', 64, 124, '#ffddaa', 16);

    const itemList = getUsableItems();

    drawItemList(
      ctx,
      txt,
      itemList,
      itemCursor,
      equipMenuMode === 'items',
      getItemCount
    );

    if (equipMenuMode === 'itemTarget') {
      const usingItem = ITEMS[itemUseId] || ITEMS.potion;
      const members = getPartyMembers({ aliveOnly: true });

      drawItemTargetList(
        ctx,
        txt,
        usingItem,
        members,
        itemUseId,
        itemTargetIndex
      );
    } else {
      const selectedItem = itemList[itemCursor] || ITEMS.potion;
      drawItemHelpText(txt, selectedItem, getItemCount);
    }

    ctx.restore();
    return;
  }

  const members = getPartyMembers();

  if (equipCharacterIndex >= members.length) {
    setEquipState({
      equipCharacterIndex: Math.max(0, members.length - 1),
    });
  }

  const safeEquipCharacterIndex = Math.min(
    equipCharacterIndex,
    Math.max(0, members.length - 1)
  );

  const selectedMember = members[safeEquipCharacterIndex] || members[0];
  if (!selectedMember) {
    ctx.restore();
    return;
  }

  const actor = selectedMember.actor;
  const isHero = selectedMember.type === 'hero';

  drawCharacterHeader(
    ctx,
    txt,
    selectedMember.name,
    members.length,
    charaTabIndex
  );

  const weapon = isHero ? getCurrentWeapon() : getAllyWeapon(actor);
  const armor = isHero ? getCurrentArmor() : getAllyArmor(actor);
  const baseAtk = isHero ? hero.atk : (actor.baseAtk || 0);
  const baseDef = isHero ? hero.def : (actor.baseDef || 0);
  const speed = isHero ? hero.speed : getAllySpeed(actor);
  const weaponAtk = weapon.attack ?? weapon.attackBonus ?? 0;
  const armorDef = armor.defense ?? armor.defenseBonus ?? 0;

  drawCharacterStatusPanel(
    ctx,
    txt,
    actor,
    isHero,
    getFaceSprite(actor),
    {
      attack: baseAtk + weaponAtk,
      defense: baseDef + armorDef,
      speed,
    }
  );

  if (charaTabIndex === 0) {
    drawEquipmentTab(ctx, txt, {
      weapon,
      armor,
      weaponAtk,
      armorDef,
      baseAtk,
      baseDef,
      equipMenuMode,
      equipSlotCursor,
    });
  } else {
    const skills = isHero ? (hero.skills || []) : (actor.skills || []);
    drawSkillTab(txt, skills, SKILL_DEFS);
  }

  ctx.restore();
}