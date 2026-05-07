const SE_DEFS = {
  cursor: 'assets/audio/se/cursor.mp3',
  confirm: 'assets/audio/se/confirm.mp3',
  cancel: 'assets/audio/se/cancel.mp3',
  talk_next: 'assets/audio/se/talk_next.mp3',
  open_chest: 'assets/audio/se/open_chest.mp3',
  item_get: 'assets/audio/se/item_get.mp3',
  buy: 'assets/audio/se/buy.mp3',
  error: 'assets/audio/se/error.mp3',
  heal: 'assets/audio/se/heal.mp3',
  level_up: 'assets/audio/se/level_up.mp3',
  open_door: 'assets/audio/se/open_door.mp3',
  attack_hit: 'assets/audio/se/attack_hit.mp3',
  attack_slash: 'assets/audio/se/attack_slash.mp3',
};

const BGM_DEFS = {
  title_theme: ['assets/audio/bgm/title_theme.mp3', 'assets/audio/bgm/title_theme_candidate_01.mp3'],
  field_theme: ['assets/audio/bgm/field_theme.mp3', 'assets/audio/bgm/field_theme_candidate_01.mp3'],
  town_theme: ['assets/audio/bgm/town_theme.mp3', 'assets/audio/bgm/town_theme_candidate_01.mp3'],
  dungeon_theme: ['assets/audio/bgm/dungeon_theme.mp3', 'assets/audio/bgm/dungeon_theme_candidate_01.mp3'],
  normal_battle: ['assets/audio/bgm/normal_battle.mp3', 'assets/audio/bgm/normal_battle_candidate_01.mp3'],
  boss_battle: ['assets/audio/bgm/boss_battle.mp3', 'assets/audio/bgm/boss_battle_candidate_01.mp3'],
  final_boss_battle: ['assets/audio/bgm/final_boss_battle.mp3', 'assets/audio/bgm/final_boss_battle_candidate_01.mp3'],
};

const seBank = {};
const bgmBank = {};
let seVolume = 1;
let seMuted = false;
let bgmVolume = 1;
let bgmMuted = false;
let currentBGMKey = null;
let currentBGM = null;
let bgmRetryAt = 0;

function loadFirstAvailableAudio(target, key, sources) {
  const list = Array.isArray(sources) ? sources.filter(Boolean) : [sources].filter(Boolean);

  if (!list.length) return;

  let index = 0;

  const tryLoad = () => {
    const audio = new Audio(list[index]);
    audio.preload = 'auto';
    audio.onerror = () => {
      index += 1;
      if (index < list.length) {
        tryLoad();
      }
    };
    target[key] = audio;
  };

  tryLoad();
}

export function loadSE() {
  if (typeof Audio === 'undefined') return;

  for (const [key, src] of Object.entries(SE_DEFS)) {
    const audio = new Audio(src);
    audio.preload = 'auto';
    seBank[key] = audio;
  }
}

export function loadBGM() {
  if (typeof Audio === 'undefined') return;

  for (const [key, src] of Object.entries(BGM_DEFS)) {
    loadFirstAvailableAudio(bgmBank, key, src);
  }
}

export function playSE(key) {
  const audio = seBank[key];

  if (!audio || seMuted) return;

  try {
    const sound = audio.cloneNode();
    sound.volume = seVolume;
    const result = sound.play();

    if (result && typeof result.catch === 'function') {
      result.catch(() => {});
    }
  } catch (e) {
    // ブラウザの自動再生制限やロード失敗ではゲーム進行を止めない。
  }
}

export function playBGM(key) {
  const audio = bgmBank[key];

  if (!audio || bgmMuted) return;

  const now = Date.now();
  const sameTrack = currentBGMKey === key;
  const isPlaying = currentBGM && !currentBGM.paused && !currentBGM.ended;

    if (sameTrack && isPlaying) return;
  if (sameTrack && now < bgmRetryAt) return;

  if (sameTrack && currentBGM && (currentBGM.paused || currentBGM.ended)) {
    try {
      currentBGM.loop = true;
      currentBGM.volume = bgmVolume;
      currentBGM.currentTime = currentBGM.ended ? 0 : currentBGM.currentTime;
      currentBGM.play().catch(() => {
        bgmRetryAt = Date.now() + 1000;
      });
    } catch (e) {
      bgmRetryAt = Date.now() + 1000;
    }
    return;
  }

  if (!sameTrack && currentBGM) {
    try {
      currentBGM.pause();
      currentBGM.currentTime = 0;
    } catch (e) {
      // 切り替え時に古いトラックの巻き戻しに失敗しても無視する。
    }
  }

  currentBGMKey = key;
  currentBGM = audio;
  currentBGM.loop = true;
  currentBGM.volume = bgmVolume;

  try {
    const result = currentBGM.play();

    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        bgmRetryAt = Date.now() + 1000;
      });
    }
  } catch (e) {
    bgmRetryAt = Date.now() + 1000;
  }
}

export function stopBGM() {
  if (currentBGM) {
    try {
      currentBGM.pause();
      currentBGM.currentTime = 0;
    } catch (e) {
      // stop に失敗してもゲーム進行は継続する。
    }
  }

  currentBGM = null;
  currentBGMKey = null;
  bgmRetryAt = 0;
}

export function setSEVolume(value) {
  const nextVolume = Number(value);

  if (!Number.isFinite(nextVolume)) return;

  seVolume = Math.max(0, Math.min(1, nextVolume));
}

export function muteSE() {
  seMuted = true;
}

export function unmuteSE() {
  seMuted = false;
}

export function setBGMVolume(value) {
  const nextVolume = Number(value);

  if (!Number.isFinite(nextVolume)) return;

  bgmVolume = Math.max(0, Math.min(1, nextVolume));

  if (currentBGM) {
    currentBGM.volume = bgmVolume;
  }
}

export function muteBGM() {
  bgmMuted = true;

  if (currentBGM) {
    try {
      currentBGM.pause();
    } catch (e) {
      // mute に失敗しても継続する。
    }
  }
}

export function unmuteBGM() {
  bgmMuted = false;
  bgmRetryAt = 0;

  if (currentBGMKey) {
    playBGM(currentBGMKey);
  }
}

export function getCurrentBGMKey() {
  return currentBGMKey;
}
