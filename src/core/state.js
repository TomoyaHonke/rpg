export const GameState = {
  TITLE: 'title',
  PROLOGUE: 'prologue',
  MAP: 'map',
  TALK: 'talk',
  BATTLE: 'battle',
  SHOP: 'shop',
  EQUIP: 'equip',
  WIN: 'win',
  LOSE: 'lose',
  ENDING: 'ending',
};

export const S = GameState;

export const TitleAction = {
  NEW_GAME: 'newGame',
};

export const TITLE_MENU_ITEMS = [
  { label: 'はじめから', action: TitleAction.NEW_GAME },
];