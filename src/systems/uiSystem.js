export function refreshStatusBar(deps) {
  const {
    hero,
    getCurrentWeapon,
    getCurrentArmor,
    getLocationName,
    updateStatusBar,
  } = deps;

  updateStatusBar(
    hero,
    getCurrentWeapon().name,
    getCurrentArmor().name,
    getLocationName()
  );
}

export function showShopBtns(deps) {
  const {
    btnArea,
  } = deps;

  btnArea.classList.add('noPointer');
  btnArea.style.flexDirection = '';
  btnArea.innerHTML = '';
}