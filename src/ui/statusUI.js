export function updateStatusBar(hero, weaponName, armorName, locationName) {
  document.getElementById('statusName').textContent =
    `Lv.${hero.level}  ゆうしゃ  ${weaponName}  ${armorName}  EXP ${hero.exp}  G ${hero.gold}`;

  const hpRatio = hero.maxHp > 0 ? hero.hp / hero.maxHp : 0;
  const hpFill = document.getElementById('hpBarFill');
  hpFill.style.width = `${Math.round(hpRatio * 100)}%`;
  hpFill.style.background = hpRatio > 0.5 ? '#44dd44' : hpRatio > 0.25 ? '#dddd44' : '#dd3333';
  document.getElementById('hpText').textContent = `${hero.hp}/${hero.maxHp}`;

  const mpRatio = hero.maxMp > 0 ? hero.mp / hero.maxMp : 0;
  const mpFill = document.getElementById('mpBarFill');
  mpFill.style.width = `${Math.round(mpRatio * 100)}%`;
  document.getElementById('mpText').textContent = `${hero.mp}/${hero.maxMp}`;

  document.getElementById('locationLabel').textContent = locationName;
}