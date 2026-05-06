# アーキテクチャ概要

2D HTML/JavaScript RPG のソースコード構成と、モジュール分割の現在地をまとめたドキュメントです。

---

## 1. プロジェクト全体の構成

```
rpg/
├── index.html
├── README.md
├── sprites/          # スプライト画像
├── tiles/            # タイル画像
├── backup/           # バックアップ
├── docs/
│   └── ARCHITECTURE.md  ← このファイル
└── src/
    ├── core/         # 定数・状態定義・アセットロード
    ├── data/         # ゲームデータ（マップ・敵・装備など）
    ├── systems/      # ゲームロジック
    ├── ui/           # 描画・UI部品
    ├── utils/        # ユーティリティ（現在ほぼ空）
    └── main.js       # ゲームループ・状態接続・統合処理
```

---

## 2. 各フォルダの役割

### `src/core/`
ゲーム全体で共有する定数、状態定義、アセット辞書を置く場所。副作用の少ない純粋な定義が中心。

| ファイル | 役割 |
|---|---|
| `constants.js` | タイルサイズ・スケール・移動速度・描画パラメータなどの定数 |
| `state.js` | `GameState`（シーン列挙）・`TitleAction`・`TITLE_MENU_ITEMS` |
| `runtimeState.js` | 実行時フラグ（`runtimeState` オブジェクト） |
| `assets.js` | 画像辞書オブジェクト（`tileImgs` / `spriteImgs` / `enemyImgs` / `battleBgImgs` など）と `loadTileImages` / `loadSpriteImages` |
| `save.js` | 現在空ファイル（将来のセーブ分離用） |

### `src/data/`
変更頻度の高いゲームコンテンツデータ。ロジックは持たず、定数・配列・オブジェクト定義のみ。

| ファイル | 役割 |
|---|---|
| `tiles.js` | タイル ID 定数 `T`・`TILE_META`・`TILE_CONTEXT_META` |
| `images.js` | 画像パス定義（`TILE_IMAGES` / `SPRITE_IMAGES` / `ENEMY_SPRITE_IMAGES` / `BATTLE_BG_IMAGES` など） |
| `maps.js` | フィールド・町・ダンジョンなどの2Dマップ配列と開始位置 |
| `mapObjects.js` | 各マップに配置するオブジェクト定義（`MAP_OBJECTS`）と建物遷移ID |
| `mapTransitions.js` | マップ遷移定義（`HOUSE_MAP_TRANSITIONS`）と遷移生成関数 |
| `npcs.js` | NPC 定義（`NPCS` ＋ 各マップ別グループ定数） |
| `enemies.js` | 敵ステータス定義 `ENEMY_DEFS` |
| `allies.js` | 仲間キャラクター定義 `ALLY_DEFS` |
| `hero.js` | 主人公の初期ステータスオブジェクト `hero` |
| `equipment.js` | 武器 `WEAPONS`・防具 `ARMORS` の定義 |
| `items.js` | アイテム定義 `ITEMS` |
| `shopItems.js` | ショップ商品定義 `SHOP_ITEMS` |

### `src/systems/`
ゲームロジック本体。副作用は引数経由で受け取り、描画は行わない。

| ファイル | 役割 |
|---|---|
| `encounters.js` | エンカウントテーブル生成（マップ別） |
| `equipmentSystem.js` | 装備変更・攻撃力/防御力計算・所持装備チェック |
| `inventorySystem.js` | アイテム所持数管理（`getItemCount` / `changeItemCount` など） |
| `itemSystem.js` | ポーション・エーテル・エリクサーの使用効果 |
| `shopSystem.js` | ショップ購入処理（消耗品・武器・防具・仲間装備） |
| `levelSystem.js` | 経験値・レベルアップ計算（`gainHeroExp` / `gainAllyExp` など） |
| `dialogueSystem.js` | 会話進行ロジック（NPC 台詞取得・看板読み取り・ショップ挨拶） |

### `src/ui/`
キャンバス描画とDOM操作のみ。状態は引数・deps injection で受け取る。

| ファイル | 役割 |
|---|---|
| `prologueUI.js` | プロローグ画面の描画（星・テキスト・ヒント） |
| `statusUI.js` | HTMLステータスバー（HP/MP/名前/場所）の更新 |
| `textwindowUI.js` | 会話ウィンドウ・ポートレート枠・ショップウィンドウの描画 |
| `equipmentUI.js` | 装備メニュー・アイテム一覧・キャラクターステータスパネルの描画 |
| `battleBgUI.js` | バトル背景キー解決ロジックと背景描画（フィールド・洞窟・ボス） |
| `battleEffectsUI.js` | 戦闘エフェクト描画（ヒットバースト・斬撃・炎・葉） |
| `buttonsUI.js` | バトルボタンの表示/非表示制御 |
| `noticeUI.js` | 画面上部の通知テキスト表示 |

### `src/utils/`
現在は `position.js` のみで中身は空。将来の汎用ユーティリティ置き場。

### `src/main.js`
7,300行超の統合ファイル。以下の責務がまだ残っている（詳細はセクション6）。

---

## 3. 分離済みの主な処理

| 処理 | 分離先 |
|---|---|
| マップ配列 | `src/data/maps.js` |
| マップオブジェクト | `src/data/mapObjects.js` |
| マップ遷移 | `src/data/mapTransitions.js` |
| NPCデータ | `src/data/npcs.js` |
| ショップ商品 | `src/data/shopItems.js` |
| エンカウントテーブル | `src/systems/encounters.js` |
| アイテム使用 | `src/systems/itemSystem.js` |
| ショップ購入 | `src/systems/shopSystem.js` |
| 装備処理 | `src/systems/equipmentSystem.js` |
| レベル処理 | `src/systems/levelSystem.js` |
| インベントリ | `src/systems/inventorySystem.js` |
| 会話進行 | `src/systems/dialogueSystem.js` |
| プロローグ描画 | `src/ui/prologueUI.js` |
| バトル背景 | `src/ui/battleBgUI.js` |
| 戦闘エフェクト（4種） | `src/ui/battleEffectsUI.js` |
| 装備メニューUI | `src/ui/equipmentUI.js` |
| ステータスUI（HTML） | `src/ui/statusUI.js` |
| 会話ウィンドウUI | `src/ui/textwindowUI.js` |
| ボタンUI | `src/ui/buttonsUI.js` |
| 通知UI | `src/ui/noticeUI.js` |

---

## 4. 主要ファイルの詳細

### `src/ui/battleEffectsUI.js`（238行）
4種類の戦闘エフェクトをモジュール内 `let` 配列で管理。
- **ヒットバースト**（`spawnHitBurstOnEnemyUI` / `updateHitEffectsUI` / `drawHitEffectsUI` / `clearHitEffectsUI`）
- **斬撃**（`spawnSlashEffectOnEnemyUI` / `updateSlashEffectsUI` / `drawSlashEffectsUI` / `clearSlashEffectsUI`）
- **炎**（`spawnFireEffectOnEnemyUI` / `updateFireEffectsUI` / `drawFireEffectsUI` / `clearFireEffectsUI`）
- **葉ストーム**（`spawnLeafStormEffectOnEnemyUI` / `updateLeafEffectsUI` / `drawLeafEffectsUI` / `clearLeafEffectsUI`）

main.js 側ラッパーが `getEnemyView(enemy)` で座標を計算し、UI関数に `(cx, cy, drawW, drawH, rng)` の形で渡す。

### `src/ui/battleBgUI.js`（139行）
deps injection パターン採用。`ctx` / `battleBgImgs` / `resolveBattleBgKey` などを引数で受け取る。
- `getMapBattleBgKeyUI` — マップキーから背景キーへ
- `resolveBattleBgKeyUI` — 優先キーが使えない場合のフォールバック
- `drawBattleBackgroundUI` — フィールド・洞窟・ボス背景の描画本体

### `src/data/mapTransitions.js`（363行）
フィールド/フィールド2/リーファ森/建物出入りの遷移定義を関数として提供。`flags`（ストーリー進行フラグ）を引数で受け取り、通過可否を制御する。

### `src/systems/equipmentSystem.js`（145行）
主人公・仲間それぞれの装備変更・ステータス計算を網羅。`WEAPONS` / `ARMORS` オブジェクトへの依存は引数経由。

---

## 5. 新機能追加時に触る場所

| 追加したいもの | 主に触るファイル |
|---|---|
| 新しいマップ | `src/data/maps.js`（配列追加）→ `src/data/mapTransitions.js`（遷移追加）→ `src/data/mapObjects.js`（オブジェクト追加）→ main.js（マップ選択ロジックに追記） |
| 新しいNPC | `src/data/npcs.js`（定義追加）→ 必要なら `src/systems/dialogueSystem.js`（特殊台詞）|
| 新しい敵 | `src/data/enemies.js`（`ENEMY_DEFS` に追記）→ `src/systems/encounters.js`（テーブルに追記） |
| 新しい装備 | `src/data/equipment.js`（`WEAPONS` or `ARMORS` に追記） |
| 新しいショップ商品 | `src/data/shopItems.js`（`SHOP_ITEMS` に追記）→ main.js のショップ処理に対応ケース追記 |
| 新しい戦闘背景 | `src/data/images.js`（`BATTLE_BG_IMAGES` に画像パス追記）→ `src/ui/battleBgUI.js`（解決ロジックに追記） |
| 新しい戦闘エフェクト | `src/ui/battleEffectsUI.js`（spawn/update/draw/clear の4関数を追記）→ main.js にラッパーと呼び出しを追記 |
| 新しい会話イベント | `src/systems/dialogueSystem.js`（台詞ロジック追記）→ main.js の NPC インタラクション処理に接続 |
| 新しい宝箱 | `src/data/mapObjects.js`（`MAP_OBJECTS` に宝箱定義追記）→ main.js の宝箱インタラクション処理に対応ケース追記 |

---

## 6. main.js にまだ残っている主な責務

| 責務 | 概要 |
|---|---|
| **ゲームループ** | `requestAnimationFrame` ベースのメインループ・フレーム更新・描画呼び出し |
| **入力イベント統合** | `keydown` / `keyup` ハンドラ・各シーンへの振り分け |
| **戦闘本体** | `startBattle` / `startBattleWithEnemies` / `startBattleVictory`・ダメージ計算・ターン管理・AI |
| **セーブ/ロード** | `saveGame` / `loadGame`・`localStorage` 読み書き |
| **マップ描画の統合** | タイル描画・スプライト描画・NPC描画・主人公描画の呼び出し順序 |
| **エンカウント判定** | 歩行時のエンカウント判定・エンカウントテーブル選択 |
| **NPC/宝箱/看板のインタラクション接続** | 接触判定・会話開始・宝箱開封・看板読み取り |
| **状態遷移の接続** | `GameState` の切り替え（フィールド ↔ バトル ↔ メニュー ↔ ショップ） |
| **マップ切り替え** | 遷移判定・マップデータ切り替え・NPC 再配置 |
| **仲間管理** | `joinAlly` など仲間加入ロジック |
| **プロローグ/タイトル** | プロローグ進行状態管理（描画は `prologueUI.js` に委譲済み） |

---

## 7. 今後の分割候補（優先度順）

以下はすべて「候補」です。着手済みの処理とは混同しないでください。

### 優先度：高（比較的安全に切り出せる）

| 候補ファイル | 切り出し対象 | 難易度 |
|---|---|---|
| `src/ui/battleUI.js` | バトル画面の描画（敵スプライト配置・ヒーローHPバー・スキルメニュー描画） | 低〜中 |
| `src/systems/chestSystem.js` | 宝箱インタラクション（開封判定・アイテム付与・フラグ管理） | 低〜中 |
| `src/systems/npcEventSystem.js` | NPC 接触・会話開始・ストーリーフラグ変更ロジック | 中 |

### 優先度：中（state 結合度が高いため慎重に）

| 候補ファイル | 切り出し対象 | 難易度 |
|---|---|---|
| `src/systems/encounterSystem.js` | エンカウント発生判定・テーブル選択の統合（現在 main.js 内に残る判定部分） | 中 |
| `src/systems/mapSystem.js` | マップ切り替え・遷移実行・NPC 再配置 | 中〜高 |
| `src/systems/saveSystem.js` | `saveGame` / `loadGame` の本体（`core/save.js` を活用） | 中 |

### 優先度：低（最後に慎重に）

| 候補ファイル | 切り出し対象 | 難易度 |
|---|---|---|
| `src/systems/battleSystem.js` | ダメージ計算・ターン管理・バトル AI | 高（多数の状態変数に依存） |
| `src/systems/inputSystem.js` | `keydown` / `keyup` ハンドラの整理 | 中〜高（シーン分岐が複雑） |

---

## 8. 開発上の注意事項

- **一気に大規模分割しない** — 1セッションで1責務ずつ抽出する
- **main.js にラッパーを残す** — 既存の呼び出しを壊さないため、UI関数の呼び出しはラッパー経由にする
- **deps injection パターン** — UI モジュールは main.js を import しない。`ctx` / `rng` / `battleBgImgs` などは引数で渡す
- **import 重複に注意** — 同じファイルからの import は1ブロックにまとめる
- **大文字小文字に注意** — ファイルシステムが case-sensitive な場合 `battleBgUI.js` と `battlebgUI.js` は別物
- **既存セーブ互換に注意** — `hero` オブジェクトのキー名を変更するとセーブデータが壊れる
- **戦闘処理は最後に** — `startBattle` 周辺は状態変数の依存が広く、最も慎重な作業が必要
