export function drawEquipMenuFrame(ctx, txt) {
  ctx.fillStyle = 'rgba(5, 5, 20, 0.88)';
  ctx.fillRect(44, 38, 424, 308);
  ctx.strokeStyle = '#5555aa';
  ctx.lineWidth = 2;
  ctx.strokeRect(44, 38, 424, 308);

  txt('メニュー', 64, 68, '#ffd700', 18);
  txt('Esc/X: もどる   Enter/Z: 決定', 64, 92, '#aaaacc', 12);
}

export function drawEquipMainMenu(ctx, txt, equipCursor) {
  const labels = ['キャラ', '道具'];

  labels.forEach((label, i) => {
    const y = 146 + i * 44;

    if (equipCursor === i) {
      ctx.fillStyle = '#333366';
      ctx.fillRect(86, y - 24, 340, 34);
    }

    txt(
      `${equipCursor === i ? '>' : ' '} ${label}`,
      108,
      y,
      i === 0 ? '#aaffaa' : '#ffddaa',
      18
    );
  });
}

export function drawItemList(ctx, txt, itemList, itemCursor, isSelectingItem, getItemCount) {
  itemList.forEach((item, i) => {
    const y = 162 + i * 28;
    const selected = isSelectingItem && itemCursor === i;

    if (selected) {
      ctx.fillStyle = '#333366';
      ctx.fillRect(76, y - 18, 360, 24);
    }

    const count = getItemCount(item.id);
    txt(
      `${selected ? '>' : ' '} ${item.name} × ${count}`,
      92,
      y,
      count > 0 ? '#ffffff' : '#888888',
      15
    );
  });
}

export function drawItemTargetList(ctx, txt, usingItem, members, itemUseId, itemTargetIndex) {
  txt(`${usingItem.name}の使用対象`, 64, 230, '#aaddff', 15);

  members.forEach((member, i) => {
    const x = 92 + i * 160;

    if (itemTargetIndex === i) {
      ctx.fillStyle = '#333366';
      ctx.fillRect(x - 10, 242, 142, 58);
    }

    txt(
      `${itemTargetIndex === i ? '>' : ' '} ${member.name}`,
      x,
      262,
      '#ffffff',
      14
    );

    if (itemUseId === 'ether') {
      txt(
        `MP ${member.actor.mp}/${member.actor.maxMp}`,
        x + 14,
        284,
        member.actor.mp >= member.actor.maxMp ? '#888888' : '#aaaaff',
        12
      );
    } else if (itemUseId === 'elixir') {
      txt(
        `HP ${member.actor.hp}/${member.actor.maxHp}`,
        x + 14,
        276,
        member.actor.hp >= member.actor.maxHp ? '#888888' : '#ffaaaa',
        11
      );
      txt(
        `MP ${member.actor.mp}/${member.actor.maxMp}`,
        x + 14,
        290,
        member.actor.mp >= member.actor.maxMp ? '#888888' : '#aaaaff',
        11
      );
    } else {
      txt(
        `HP ${member.actor.hp}/${member.actor.maxHp}`,
        x + 14,
        284,
        member.actor.hp >= member.actor.maxHp ? '#888888' : '#ffaaaa',
        12
      );
    }
  });
}

export function drawItemHelpText(txt, selectedItem, getItemCount) {
  const canUse = getItemCount(selectedItem.id) > 0;

  txt(
    '↑↓: えらぶ   Enter: 使う',
    92,
    238,
    canUse ? '#aaaacc' : '#777777',
    13
  );
}

export function drawCharacterHeader(ctx, txt, selectedMemberName, memberCount, charaTabIndex) {
  const arrowL = memberCount > 1 ? '←' : ' ';
  const arrowR = memberCount > 1 ? '→' : ' ';

  txt(`${arrowL} 【${selectedMemberName}】 ${arrowR}`, 64, 118, '#ffd700', 16);
  txt('←→: キャラ切替', 310, 118, '#aaaacc', 10);

  const tabLabels = ['装備', 'スキル'];

  tabLabels.forEach((tab, i) => {
    const tx = 74 + i * 82;
    const isActive = charaTabIndex === i;

    if (isActive) {
      ctx.fillStyle = '#333366';
      ctx.fillRect(tx - 4, 126, 74, 20);
    }

    txt(tab, tx, 141, isActive ? '#ffffff' : '#777799', 12);
  });

  txt('↑↓: タブ切替', 260, 141, '#aaaacc', 10);

  ctx.strokeStyle = '#445566';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(64, 150);
  ctx.lineTo(450, 150);
  ctx.stroke();
}

export function drawCharacterStatusPanel(ctx, txt, actor, isHero, faceImg, stats) {
  const FACE_SIZE = 58;
  const faceX = 72;
  const faceY = 158;

  if (faceImg) {
    ctx.drawImage(faceImg, faceX, faceY, FACE_SIZE, FACE_SIZE);
  } else {
    ctx.fillStyle = isHero ? '#384f88' : '#7a5478';
    ctx.fillRect(faceX, faceY, FACE_SIZE, FACE_SIZE);

    ctx.fillStyle = '#f0d0b0';
    ctx.fillRect(faceX + 18, faceY + 8, 18, 18);

    ctx.fillStyle = isHero ? '#4b70c8' : '#d5b0d8';
    ctx.fillRect(faceX + 10, faceY + 30, 34, 18);
  }

  ctx.strokeStyle = '#7777cc';
  ctx.lineWidth = 1;
  ctx.strokeRect(faceX, faceY, FACE_SIZE, FACE_SIZE);

  const infoX = faceX + FACE_SIZE + 12;
  txt(`Lv.${actor.level}`, infoX, 170, '#ffffff', 12);
  txt(`HP ${actor.hp}/${actor.maxHp}`, infoX, 188, '#ffaaaa', 12);
  txt(`MP ${actor.mp}/${actor.maxMp}`, infoX, 206, '#aaaaff', 12);

  const statX = 250;
  txt(`攻撃  ${stats.attack}`, statX, 170, '#ffffff', 12);
  txt(`防御  ${stats.defense}`, statX, 188, '#ffffff', 12);
  txt(`素早さ ${stats.speed}`, statX, 206, '#ffffff', 12);

  ctx.strokeStyle = '#334455';
  ctx.beginPath();
  ctx.moveTo(64, 224);
  ctx.lineTo(450, 224);
  ctx.stroke();
}

export function drawEquipmentTab(ctx, txt, params) {
  const {
    weapon,
    armor,
    weaponAtk,
    armorDef,
    baseAtk,
    baseDef,
    equipMenuMode,
    equipSlotCursor,
  } = params;

  const equipRows = [
    { label: '武器', text: `${weapon.name}（攻撃 +${weaponAtk}）` },
    { label: '防具', text: `${armor.name}（防御 +${armorDef}）` },
  ];

  equipRows.forEach((row, i) => {
    const y = 244 + i * 24;
    const isSlot = equipMenuMode === 'equip_slot' && equipSlotCursor === i;

    if (isSlot) {
      ctx.fillStyle = '#333366';
      ctx.fillRect(64, y - 14, 372, 19);
    }

    txt(`${isSlot ? '>' : ' '} ${row.label}：${row.text}`, 74, y, '#ffffff', 12);
  });

  const atkTotal = baseAtk + weaponAtk;
  const defTotal = baseDef + armorDef;

  txt(
    `装備補正：攻撃 ${baseAtk}+${weaponAtk}=${atkTotal}  防御 ${baseDef}+${armorDef}=${defTotal}`,
    74,
    298,
    '#aaaaaa',
    11
  );

  if (equipMenuMode === 'equip_slot') {
    txt('↑↓: 欄選択   Enter: 変更   X: もどる', 74, 330, '#aaaacc', 10);
  } else {
    txt('Enter: 装備変更へ', 74, 330, '#aaaacc', 10);
  }
}

export function drawSkillTab(txt, skills, skillDefs) {
  if (skills.length === 0) {
    txt('スキルがない', 80, 254, '#666688', 13);
  } else {
    skills.forEach((skillId, i) => {
      const def = skillDefs[skillId];
      if (!def) return;

      const y = 242 + i * 28;
      txt(def.name, 80, y, '#aaddff', 13);

      const mpStr = def.mp > 0 ? `MP${def.mp}` : '─';
      txt(mpStr, 200, y, def.mp > 0 ? '#aaaaff' : '#556677', 11);

      txt(def.desc, 250, y, '#cccccc', 11);
    });
  }

  txt('X: もどる', 74, 330, '#aaaacc', 10);
}