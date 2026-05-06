export function handleTitleInput(event, deps) {
  const {
    TITLE_MENU_ITEMS,
    getTitleMenuIndex,
    setTitleMenuIndex,
    isConfirmKey,
    startTitleMenuAction,
  } = deps;

  if (
    event.key === 'ArrowUp' ||
    event.key === 'ArrowDown' ||
    event.key === 'w' ||
    event.key === 's'
  ) {
    event.preventDefault();

    const delta = event.key === 'ArrowUp' || event.key === 'w' ? -1 : 1;
    const currentIndex = getTitleMenuIndex();
    const nextIndex =
      (currentIndex + delta + TITLE_MENU_ITEMS.length) % TITLE_MENU_ITEMS.length;

    setTitleMenuIndex(nextIndex);
    return;
  }

  if (isConfirmKey(event)) {
    event.preventDefault();

    const selectedItem = TITLE_MENU_ITEMS[getTitleMenuIndex()];

    if (selectedItem) {
      startTitleMenuAction(selectedItem.action);
    }
  }
}

export function startTitleMenuAction(action, deps) {
  const {
    TitleAction,
    resetGame,
    startPrologue,
  } = deps;

  if (action === TitleAction.NEW_GAME) {
    resetGame();
    startPrologue();
  }
}