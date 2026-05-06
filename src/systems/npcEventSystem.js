export function createNpcDialogues(deps) {
  const {
    flags,
    getSlimeKills,
    getQuestRewardMsg,
  } = deps;

  return {
    elder: () => {
      if (flags.defeatedDemonLord) return [
        '魔王を倒したか…　よくぞやった！',
        '世界に光が戻ったぞ。お前は真の勇者じゃ。',
      ];
      if (flags.gotDemonKey) return [
        '魔王の鍵を持っているのか！',
        '荒野の北東に　魔王の城への門がある。',
        '全力で戦うのじゃ！',
      ];
      if (flags.gotSeal2) return [
        '二つの封印石を砕いたか…',
        '魔王の城の扉は　魔王の鍵でのみ　開く。',
        'お前ならできる。行くのじゃ！',
      ];
      if (flags.defeatedDarkKnight) return [
        'ダークナイトを倒したか。よくやった！',
        '封印石・壱を持って　西の荒野へ向かえ。',
        'カゲのまちの　鍛冶屋を　訪ねるのじゃ。',
      ];
      if (flags.leafaJoined) return [
        'リーファが共にいるとは　頼もしいぞ！',
        '南東のダンジョンに　強い敵がいる。',
        '準備を整えてから　挑むのじゃ。',
      ];
      if (flags.heardLeafaRumor) return [
        '北西の森に　誰かが困っているようじゃ。',
        '急いで助けに行ってやれ！',
      ];
      if (flags.talkedToElder) return [
        'スライムには　気をつけるのじゃ。',
        '見張りの男に　何か聞いてみるといい。',
        '北西の森にも　気になるものがあるぞ。',
      ];
      return [
        'おお、旅人よ。よくぞ　ヒカリのまちへ。',
        'このあたりの　草むらには　スライムが出る。',
        '南東の　ダンジョンへ　行けるくらい強くなれ！',
      ];
    },

    town_watchman: () => {
      if (flags.leafaJoined) return ['あの子、無事だったんだな。よかった。'];
      if (flags.heardLeafaRumor) return [
        '北西の森には　気をつけろ。',
        '早く助けに行ってやれ。',
      ];
      return [
        '北西の森で、誰かが魔物に追われていたらしい。',
        'もし行くなら　気をつけてくれ。',
      ];
    },

    child: () => {
      if (getSlimeKills() >= 3) return [getQuestRewardMsg() || 'ありがとう！'];
      return ['スライムを3匹倒してきて'];
    },

    castle_guard: () => {
      if (flags.defeatedDemonLord) return ['魔王を倒したのか…', 'もはや　俺には止める理由もない。'];
      return ['ここは魔王ヴァルドールの居城。', '命が惜しければ引き返せ！'];
    },

    shadow_smith: () => {
      if (flags.defeatedDemonLord) return ['魔王を倒したとは…', 'お前は本物の勇者だ。'];
      if (flags.gotDemonKey) return ['魔王の鍵か…　荒野の北東に向かえ。', '城の門が見えるはずだ。'];
      if (flags.gotSeal2) return ['魔王の城への鍵を　手に入れたのか。', '奴を倒せるのは　お前だけだ。気をつけろ。'];
      if (flags.defeatedForestBoss) return ['樹霊を倒したか…　大したものだ。', '封印石・弐が　砕けたはずだ。'];
      if (flags.gotForestPass) return ['森は危険だ。気をつけて行け。', 'この町を出て　南へ進め。森の入口がある。'];
      if (flags.gotSeal1) return [
        'おお…　封印石を砕いたのか。なかなかやるな。',
        'ならばこれを持っていけ。',
        '「呪われた森への通行証」だ。',
        'この町の南に　森の入口がある。',
      ];
      return ['ここ　カゲのまちへ　よく来たな。', 'まずは　洞窟の　ダークナイトを　倒すことだ。'];
    },

    field_healer: () => [
      '焚き火跡で　少し休んでいけ。',
      '南東の岩場の先に　洞窟がある。',
      '西の枯れ草の道は　荒野へ続く。今は無理をするな。',
      'HPとMPが回復した！',
    ],

    old_blacksmith: () => {
      if (!flags.talkedToOldBlacksmith) return [
        'おお、旅の者か。わしは鍛冶屋のグルドじゃ。',
        'この荒野で、古い金属片を探しておる。',
        '壊れた橋を直すためにも　どうしても必要でな。',
      ];
      if (flags.outpostQuestDone) return [
        '魔法の剣は大切に使うのじゃ。',
        'いつか壊れた橋も直せると　いいんだがな…',
      ];
      if (flags.gotOldFragment) return [
        'おお、それは古い金属片！　持ってきてくれたのか！',
        'これは…　古代の金属片だ。この素材があれば　壊れた橋を直せるかもしれない！',
        '礼に　魔法の剣を受け取ってくれ。',
      ];
      return [
        '古い金属片を見つけたら、わしのところへ持ってきてくれ。',
      ];
    },

    outpost_traveler: () => {
      if (flags.outpostQuestDone) return ['老鍛冶屋が　嬉しそうだったぞ。', 'お前のおかげだな。'];
      if (flags.gotOldFragment) return ['おお、それが古い金属片か！', '老鍛冶屋に渡してやれ！'];
      return [
        'この集落は荒野の端にある　小さな宿場だ。',
        '老鍛冶屋は橋を直そうと　材料を集めているんだ。',
        '荒野の奥に　古い金属片があると聞いたが…',
      ];
    },
  };
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