export function moveEquipCursor(direction, deps) {
  const {
    equipMenuMode,
    equipCursor,
    charaTabIndex,
    equipSlotCursor,
    itemCursor,
    itemTargetIndex,
    getUsableItems,
    getPartyMembers,
    setEquipState,
    playSE = () => {},
  } = deps;

  if (direction === 'up') {
    if (equipMenuMode === 'main') {
      setEquipState({ equipCursor: (equipCursor + 1) % 2 });
    } else if (equipMenuMode === 'chara') {
      setEquipState({ charaTabIndex: (charaTabIndex + 1) % 2 });
    } else if (equipMenuMode === 'equip_slot') {
      setEquipState({ equipSlotCursor: (equipSlotCursor + 1) % 2 });
    } else if (equipMenuMode === 'items') {
      const items = getUsableItems();
      setEquipState({
        itemCursor: items.length ? (itemCursor + items.length - 1) % items.length : 0,
      });
    } else if (equipMenuMode === 'itemTarget') {
      const members = getPartyMembers({ aliveOnly: true });
      setEquipState({
        itemTargetIndex: members.length
          ? (itemTargetIndex + members.length - 1) % members.length
          : 0,
      });
    }

    playSE('cursor');
    return true;
  }

  if (direction === 'down') {
    if (equipMenuMode === 'main') {
      setEquipState({ equipCursor: (equipCursor + 1) % 2 });
    } else if (equipMenuMode === 'chara') {
      setEquipState({ charaTabIndex: (charaTabIndex + 1) % 2 });
    } else if (equipMenuMode === 'equip_slot') {
      setEquipState({ equipSlotCursor: (equipSlotCursor + 1) % 2 });
    } else if (equipMenuMode === 'items') {
      const items = getUsableItems();
      setEquipState({
        itemCursor: items.length ? (itemCursor + 1) % items.length : 0,
      });
    } else if (equipMenuMode === 'itemTarget') {
      const members = getPartyMembers({ aliveOnly: true });
      setEquipState({
        itemTargetIndex: members.length ? (itemTargetIndex + 1) % members.length : 0,
      });
    }

    playSE('cursor');
    return true;
  }

  return false;
}

export function moveEquipHorizontal(delta, deps) {
  const {
    equipMenuMode,
    equipCursor,
    equipCharacterIndex,
    getPartyMembers,
    setEquipState,
    playSE = () => {},
  } = deps;

  if (equipMenuMode === 'chara' || equipMenuMode === 'equip_slot') {
    const members = getPartyMembers();

    setEquipState({
      equipCharacterIndex: members.length
        ? (equipCharacterIndex + members.length + delta) % members.length
        : 0,
      ...(equipMenuMode === 'equip_slot' ? { equipSlotCursor: 0 } : {}),
    });

    playSE('cursor');
    return true;
  }

  if (equipMenuMode === 'itemTarget') {
    const members = getPartyMembers({ aliveOnly: true });

    setEquipState({
      itemTargetIndex: members.length
        ? (itemTargetIndex + members.length + delta) % members.length
        : 0,
    });

    playSE('cursor');
    return true;
  }

  if (equipMenuMode === 'main') {
    setEquipState({
      equipCursor: (equipCursor + 1) % 2,
    });

    playSE('cursor');
    return true;
  }

  return false;
}

export function cancelEquipMenu(deps) {
  const {
    equipMenuMode,
    setEquipState,
    closeEquipMenu,
    playSE = () => {},
  } = deps;

  if (equipMenuMode === 'equip_slot') {
    playSE('cancel');
    setEquipState({ equipMenuMode: 'chara' });
    return true;
  }

  if (equipMenuMode === 'chara' || equipMenuMode === 'items') {
    playSE('cancel');
    setEquipState({
      equipMenuMode: 'main',
      equipCursor: 0,
    });
    return true;
  }

  if (equipMenuMode === 'itemTarget') {
    playSE('cancel');
    setEquipState({ equipMenuMode: 'items' });
    return true;
  }

  playSE('cancel');
  closeEquipMenu();
  return true;
}

export function confirmEquipMenu(deps) {
  const {
    equipMenuMode,
    equipCursor,
    charaTabIndex,
    equipCharacterIndex,
    equipSlotCursor,
    itemCursor,
    itemUseId,

    ITEMS,

    getPartyMembers,
    getUsableItems,
    getItemCount,
    cycleActorEquipment,
    useEther,
    useElixir,
    usePotionOnTarget,

    showNotice,
    refreshStatusBar,
    setEquipState,
    playSE = () => {},
  } = deps;

  if (equipMenuMode === 'main') {
    playSE('confirm');
    if (equipCursor === 0) {
      setEquipState({
        equipMenuMode: 'chara',
        charaTabIndex: 0,
        equipCharacterIndex: 0,
      });
    } else {
      setEquipState({
        equipMenuMode: 'items',
        itemCursor: 0,
        itemUseId: 'potion',
        itemTargetIndex: 0,
      });
    }

    return true;
  }

  if (equipMenuMode === 'chara') {
    playSE('confirm');
    if (charaTabIndex === 0) {
      setEquipState({
        equipMenuMode: 'equip_slot',
        equipSlotCursor: 0,
      });
    }

    return true;
  }

  if (equipMenuMode === 'equip_slot') {
    playSE('confirm');
    const member = getPartyMembers()[equipCharacterIndex];

    if (member && member.actor) {
      const changed = cycleActorEquipment(
        member.actor,
        equipSlotCursor === 0 ? 'weapon' : 'armor',
        1
      );

      if (!changed) {
        playSE('error');
        showNotice('装備できるものがない！');
      }
    } else {
      playSE('error');
      showNotice('装備できるものがない！');
    }

    refreshStatusBar();
    return true;
  }

  if (equipMenuMode === 'items') {
    playSE('confirm');
    const selectedItem = getUsableItems()[itemCursor] || ITEMS.potion;

    if (getItemCount(selectedItem.id) <= 0) {
      playSE('error');
      showNotice(`${selectedItem.name}を持っていない！`);
    } else {
      setEquipState({
        equipMenuMode: 'itemTarget',
        itemUseId: selectedItem.id,
        itemTargetIndex: 0,
      });
    }

    return true;
  }

  if (equipMenuMode === 'itemTarget') {
    const members = getPartyMembers({ aliveOnly: true });
    const member = members[deps.itemTargetIndex];

    const result = itemUseId === 'ether'
      ? useEther(member && member.actor)
      : itemUseId === 'elixir'
        ? useElixir(member && member.actor)
        : usePotionOnTarget(member && member.actor);

    showNotice(result.message);
    playSE(result.ok ? 'heal' : 'error');

    if (result.ok || getItemCount(itemUseId) <= 0) {
      setEquipState({
        equipMenuMode: 'items',
      });
    }

    refreshStatusBar();
    return true;
  }

  return false;
}

export function handleEquipInput(event, deps) {
  const {
    isCancelKey,
    isConfirmKey,
    cancelEquipMenu,
    moveEquipCursor,
    moveEquipHorizontal,
    confirmEquipMenu,
    closeEquipMenu,
  } = deps;

  if (isCancelKey(event)) {
    event.preventDefault();
    cancelEquipMenu();
    return true;
  }

  if (event.key === 'e' || event.key === 'E') {
    event.preventDefault();
    closeEquipMenu();
    return true;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveEquipCursor('up');
    return true;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveEquipCursor('down');
    return true;
  }

  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const delta = event.key === 'ArrowLeft' ? -1 : 1;
    moveEquipHorizontal(delta);
    return true;
  }

  if (isConfirmKey(event)) {
    event.preventDefault();
    confirmEquipMenu();
    return true;
  }

  return false;
}
