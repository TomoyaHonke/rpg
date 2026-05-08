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
  map_transition_step: 'assets/audio/se/map_transition_step.mp3',
  dungeon_transition_step: 'assets/audio/se/dungeon_transition_step.mp3',
  magic_fire: 'assets/audio/se/magic_fire.mp3',
  leaf_storm: 'assets/audio/se/leaf_storm.mp3',
  victory_jingle: 'assets/audio/se/victory_jingle.mp3',
};

const BGM_DEFS = {
  title_theme: ['assets/audio/bgm/title_theme.mp3', 'assets/audio/bgm/title_theme_candidate_01.mp3'],
  field_theme: ['assets/audio/bgm/field_theme.mp3', 'assets/audio/bgm/field_theme_candidate_01.mp3'],
  town_theme: ['assets/audio/bgm/town_theme.mp3', 'assets/audio/bgm/town_theme_candidate_01.mp3'],
  dungeon_theme: ['assets/audio/bgm/dungeon_theme.mp3', 'assets/audio/bgm/dungeon_theme_candidate_01.mp3'],
  shadow_town_theme: ['assets/audio/bgm/shadow_town_theme.mp3', 'assets/audio/bgm/Shadow_town_theme.mp3'],
  cursed_forest_theme: ['assets/audio/bgm/forest_theme.mp3'],
  castle_theme: ['assets/audio/bgm/castle_theme.mp3'],
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
let fadeInterval = null;
let fadeTimer = null;
let fadeGeneration = 0;
let fadingToBGMKey = null;
let fadingOutBGM = null;

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

  const sameTrack = currentBGMKey === key;
  const isPlaying = currentBGM && !currentBGM.paused && !currentBGM.ended;

  if (sameTrack && isPlaying) return;

  clearFadeTimers();

  if (sameTrack && currentBGM && (currentBGM.paused || currentBGM.ended)) {
    try {
      currentBGM.loop = true;
      currentBGM.volume = bgmVolume;
      currentBGM.currentTime = currentBGM.ended ? 0 : currentBGM.currentTime;
      playAudioSafely(currentBGM);
    } catch (e) {
      // 再開に失敗してもゲーム進行は継続する。
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

  playAudioSafely(currentBGM);
}

function clearFadeTimers() {
  fadeGeneration++;

  if (fadeInterval !== null) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }

  if (fadeTimer !== null) {
    clearTimeout(fadeTimer);
    fadeTimer = null;
  }

  fadingToBGMKey = null;
  fadingOutBGM = null;
}

function resetBGMTrack(audio) {
  if (!audio) return;

  try {
    audio.pause();
    audio.currentTime = 0;
  } catch (e) {
    // 停止や巻き戻しに失敗してもゲーム進行は止めない。
  }
}

function playAudioSafely(audio, onRejected) {
  try {
    const result = audio.play();

    if (result && typeof result.catch === 'function') {
      result.catch(() => {
        if (typeof onRejected === 'function') onRejected();
      });
    }
  } catch (e) {
    if (typeof onRejected === 'function') onRejected();
  }
}

function fadeVolume(audio, fromVolume, toVolume, duration, generation, onDone) {
  if (!audio) return;

  if (fadeInterval !== null) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }

  const safeDuration = Math.max(0, Number(duration) || 0);
  const startVolume = Math.max(0, Math.min(1, fromVolume));
  const endVolume = Math.max(0, Math.min(1, toVolume));

  if (safeDuration <= 0) {
    audio.volume = endVolume;
    if (generation === fadeGeneration && typeof onDone === 'function') onDone();
    return;
  }

  const startedAt = Date.now();
  audio.volume = startVolume;
  fadeInterval = setInterval(() => {
    if (generation !== fadeGeneration) {
      clearInterval(fadeInterval);
      fadeInterval = null;
      return;
    }

    const elapsed = Date.now() - startedAt;
    const progress = Math.min(1, elapsed / safeDuration);
    audio.volume = startVolume + (endVolume - startVolume) * progress;

    if (progress >= 1) {
      clearInterval(fadeInterval);
      fadeInterval = null;
      if (typeof onDone === 'function') onDone();
    }
  }, 16);
}

export function fadeToBGM(key, duration = 800) {
  const nextBGM = bgmBank[key];

  if (!nextBGM || bgmMuted) return;

  const sameTrack = currentBGMKey === key && currentBGM === nextBGM;
  const isPlaying = currentBGM && !currentBGM.paused && !currentBGM.ended;

  if (sameTrack && isPlaying) return;
  if (fadingToBGMKey === key) return;

  if (sameTrack && currentBGM && (currentBGM.paused || currentBGM.ended)) {
    clearFadeTimers();
    try {
      currentBGM.loop = true;
      currentBGM.volume = bgmVolume;
      if (currentBGM.ended) currentBGM.currentTime = 0;
      playAudioSafely(currentBGM);
    } catch (e) {
      // 再開に失敗してもゲーム進行は継続する。
    }
    return;
  }

  clearFadeTimers();

  const generation = fadeGeneration;
  const fadeDuration = Math.max(0, Number(duration) || 0);
  const halfDuration = fadeDuration / 2;
  const previousBGM = currentBGM;
  const previousBGMKey = currentBGMKey;

  fadingToBGMKey = key;

  const startNextBGM = () => {
    if (generation !== fadeGeneration) return;

    currentBGM = nextBGM;
    currentBGMKey = key;
    nextBGM.loop = true;
    nextBGM.volume = 0;

    if (nextBGM.ended) {
      try {
        nextBGM.currentTime = 0;
      } catch (e) {
        // 巻き戻しに失敗しても再生試行は続ける。
      }
    }

    playAudioSafely(nextBGM);

    fadeVolume(nextBGM, 0, bgmVolume, previousBGM ? halfDuration : fadeDuration, generation, () => {
      if (generation !== fadeGeneration) return;
      fadingToBGMKey = null;
    });
  };

  if (!previousBGM || previousBGMKey === key) {
    startNextBGM();
    return;
  }

  fadeVolume(previousBGM, previousBGM.volume, 0, halfDuration, generation, () => {
    if (generation !== fadeGeneration) return;
    resetBGMTrack(previousBGM);
    startNextBGM();
  });
}

export function fadeOutBGM(duration = 600) {
  if (!currentBGM) return;
  if (fadingOutBGM === currentBGM && !fadingToBGMKey) return;

  clearFadeTimers();

  const generation = fadeGeneration;
  const targetBGM = currentBGM;
  fadingOutBGM = targetBGM;

  fadeVolume(targetBGM, targetBGM.volume, 0, duration, generation, () => {
    if (generation !== fadeGeneration || currentBGM !== targetBGM) return;

    resetBGMTrack(targetBGM);
    currentBGM = null;
    currentBGMKey = null;
    fadingOutBGM = null;
  });
}

export function stopBGM() {
  clearFadeTimers();

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

  if (currentBGMKey) {
    playBGM(currentBGMKey);
  }
}

export function getCurrentBGMKey() {
  return currentBGMKey;
}
