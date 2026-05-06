# ドット絵RPG — コード解説

`index.html` をブラウザで開くだけで遊べます。インストール不要！

---

## 操作方法
index.htmlを確認してください。

drawSlime のみ修正してください。

条件:
- 床影の不透明度を rgba(0,0,0,0.28) に変更する
- 目の色を #000 から #1a1a1a に変更する
- 目のハイライト #ffffff の 2×2 は維持する
- drawSlime 以外の関数やゲームロジックは変更しない
- 変更内容を説明してから実装してください
| キー | 動作 |
|------|------|
| ↑ ↓ ← → または W A S D | 主人公の移動 |
| ⚔ こうげき ボタン | 敵に通常攻撃 |
| ✨ ファイア ボタン | 魔法攻撃（MP2消費・威力2倍） |
| 💨 にげる ボタン | 60% の確率で逃走 |
| 何かキー / クリック | 勝利・ゲームオーバー画面を進む |

草むらや花の上を歩くと **15% の確率** でスライムが出現します。

---

## ファイル構成

```
rpg/
└── index.html  ← ゲームのすべてが入った1ファイル
```

HTML・CSS・JavaScript をまとめて1ファイルにしてあります。

---

## コードの構造（index.html の中身）

```
<style>    … 見た目（色・ボタンのデザイン）
<canvas>   … ゲーム画面を描くキャンバス
<div>      … バトルボタンを表示する場所
<script>   … ゲームのプログラム本体
```

`<script>` の中はセクションごとに分かれています。順番に説明します。

---

### 1. 定数・設定

```javascript
const TILE     = 32;    // 1タイル = 32ピクセル
const COLS     = 16;    // マップの横幅（タイル数）
const ROWS     = 12;    // マップの縦幅（タイル数）
const ENC_RATE = 0.15;  // エンカウント確率（15%）
```

ゲーム全体で使う「変わらない数字」をまとめています。  
`ENC_RATE` を `0.5` にすると半歩ごとに敵が出る激戦区になります。

---

### 2. マップデータ

```javascript
const MAP = [
  [1,1,1,1, ... ],
  [1,0,0,0, ... ],
  ...
];
```

マップを「数字の2次元配列」で表現しています。

| 数字 | タイルの種類 |
|------|------------|
| 0 | 草（歩ける） |
| 1 | 木（壁・通れない） |
| 2 | 水（通れない） |
| 3 | 花（歩ける） |

`MAP[行][列]` でそのタイルの種類を調べます。  
例：`MAP[1][1]` = 0 → 草タイル。

---

### 3. プレイヤーデータ

```javascript
const hero = {
  x: 1, y: 1,          // マップ上の位置（タイル単位）
  hp: 30, maxHp: 30,   // ヒットポイント
  mp: 12, maxMp: 12,   // マジックポイント
  atk: 8,  def: 3,     // 攻撃力・防御力
  level: 1, exp: 0,    // レベル・経験値
};
```

`hero.x = 3` はマップの左から4番目のタイルを意味します（0から数えるため）。  
ピクセル座標は `hero.x * TILE`（= 3 × 32 = 96px）で計算します。

---

### 4. ゲーム状態

```javascript
const S = { MAP: 'map', BATTLE: 'battle', WIN: 'win', LOSE: 'lose' };
let state = S.MAP; // 今どの画面か
```

ゲームは常に「4つの状態」のどれかにあります。

```
MAP（マップ移動）
  ↓ エンカウント
BATTLE（バトル中）
  ↓ 勝ち           ↓ 負け
WIN（勝利画面）   LOSE（ゲームオーバー）
  ↓ キー入力         ↓ キー入力
MAP へ戻る        最初からやりなおし
```

---

### 5. スプライト描画（ドット絵）

```javascript
function drawHero(px, py, sc = 1) {
  ctx.save();
  ctx.translate(px, py);  // 描く位置に移動
  ctx.scale(sc, sc);      // 拡大率を設定
  // ... ctx.fillRect() で色を塗る
  ctx.restore();
}
```

`ctx.fillRect(x, y, 幅, 高さ)` で四角形を塗るだけ！  
ドット絵はピクセル（小さな四角）の集まりなので、これで作れます。

`ctx.save()` / `ctx.restore()` は「設定を一時保存・元に戻す」命令です。  
これがないと拡大率が重なって狂ってしまいます。

---

### 6. メインループ

```javascript
function loop() {
  ctx.clearRect(0, 0, 512, 384); // 画面を消す
  if (state === S.MAP)    renderMap();
  if (state === S.BATTLE) renderBattle();
  if (state === S.WIN)    renderWin();
  if (state === S.LOSE)   renderLose();
  requestAnimationFrame(loop); // 次のフレームでもう一度呼ぶ
}
loop(); // 最初の1回を呼んでループ開始
```

`requestAnimationFrame` がポイントです。  
「画面を更新するタイミングで loop() をもう1回呼んでね」とブラウザにお願いします。  
これが毎秒60回繰り返され、アニメーションになります。

---

### 7. プレイヤー移動

```javascript
function move(dx, dy) {
  if (moving || state !== S.MAP) return; // 動けない状況はスキップ

  const nx = hero.x + dx; // 移動先の座標
  const ny = hero.y + dy;

  // 範囲外・壁なら移動しない
  if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return;
  const tile = MAP[ny][nx];
  if (tile === T.TREE || tile === T.WATER) return;

  hero.x = nx; // 実際に移動
  hero.y = ny;

  // 15% でバトル開始
  if (Math.random() < ENC_RATE) {
    setTimeout(startBattle, 80);
  }
}
```

`dx, dy` は移動方向を表します。  
- 上 `(0, -1)` / 下 `(0, 1)` / 左 `(-1, 0)` / 右 `(1, 0)`

---

### 8. バトルロジック

```javascript
function doAtk() {
  const dmg = Math.max(1, hero.atk - foe.def + rng(-1, 3));
  foe.hp = Math.max(0, foe.hp - dmg);
  // ...
}
```

ダメージの計算式：

```
ダメージ = 自分の攻撃力 - 相手の防御力 + ランダム（-1〜+3）
```

`Math.max(1, ...)` で最低でも1ダメージは入るようにしています。  
`rng(-1, 3)` はランダムなブレで、毎回同じダメージにならないようにします。

---

## カスタマイズのヒント

### 主人公を強くする

```javascript
const hero = {
  hp: 50, maxHp: 50,  // HP を増やす
  atk: 12,            // 攻撃力アップ
  def: 5,             // 防御力アップ
  // ...
};
```

### エンカウント率を変える

```javascript
const ENC_RATE = 0.05; // 5%（少ない）
const ENC_RATE = 0.40; // 40%（多い）
```

### スライムを強くする

```javascript
const SLIME_BASE = {
  name: 'キングスライム',
  hp: 50, maxHp: 50,  // HP 増加
  atk: 10, def: 3,    // 攻防増加
  exp: 30,            // 経験値も増やす
};
```

### マップを変える

`MAP` 配列の数字を書き換えればOKです。  
- `1` を置くと木（壁）
- `2` を置くと水（壁）
- `0` を置くと草（歩ける）
- `3` を置くと花（歩ける）

---

## 使われている主なWeb技術

| 技術 | 役割 |
|------|------|
| HTML `<canvas>` | 画像を描くための「キャンバス」タグ |
| Canvas 2D API | `ctx.fillRect()` などで図形を描く命令群 |
| `requestAnimationFrame` | なめらかにアニメーションするしくみ |
| `addEventListener` | キーボード入力を受け取るしくみ |
| `setTimeout` | 一定時間後に処理を実行するしくみ |
| スプレッド構文 `{...obj}` | オブジェクトをコピーする書き方 |

---

楽しんでください！コードを改造して、自分だけのRPGを作ってみましょう。
