# アーキテクチャ概要

2D HTML/JavaScript RPG のソースコード構成と、モジュール分割の現在地をまとめたドキュメントです。
最終更新: 2026-05-06

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
    ├── utils/        # ユーティリティ（color / position / random）
    └── main.js       # グローバル状態・初期化・接着層・ゲーム起動
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

---

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
| `heroFrames.js` | ヒーローアニメーションフレーム定義 |
| `equipment.js` | 武器 `WEAPONS`・防具 `ARMORS` の定義 |
| `items.js` | アイテム定義 `ITEMS` |
| `shopItems.js` | ショップ商品定義 `SHOP_ITEMS` |
| `battleCommands.js` | バトルコマンド定義 |
| `skills.js` | スキル定義 |
| `flags.js` | ストーリーフラグ初期値定義 |
| `initialState.js` | 初期状態定義 |
| `prologue.js` | プロローグテキスト定義 `PROLOGUE_LINES` |

---

### `src/systems/`
ゲームロジック本体。副作用は引数経由で受け取り、描画は行わない。

#### 既存（分割済み・安定）

| ファイル | 役割 |
|---|---|
| `encounters.js` | エンカウントテーブル生成（マップ別） |
| `equipmentSystem.js` | 装備変更・攻撃力/防御力計算・所持装備チェック |
| `inventorySystem.js` | アイテム所持数管理（`getItemCount` / `changeItemCount` など） |
| `itemSystem.js` | ポーション・エーテル・エリクサーの使用効果 |
| `shopSystem.js` | ショップ購入・カーソル操作・選択処理（`openShop` / `moveShopCursor` / `confirmShopChoice` / `buyPotion` など） |
| `levelSystem.js` | 経験値・レベルアップ計算（`gainHeroExp` / `gainAllyExp` など） |
| `dialogueSystem.js` | 会話進行ロジック（NPC 台詞取得・看板読み取り・ショップ挨拶） |
| `heroSystem.js` | ヒーロー向き変更・歩行アニメーション更新 |
| `saveSystem.js` | `saveGame` / `loadGame` 本体（`core/save.js` を活用） |
| `chestSystem.js` | 宝箱インタラクション（開封判定・アイテム付与・フラグ管理） |
| `npcEventSystem.js` | NPC 接触・会話開始・ストーリーフラグ変更ロジック |
| `encounterSystem.js` | エンカウント発生判定・テーブル選択の統合 |
| `audioSystem.js` | SE/BGM 再生管理（`assets/audio/se/` と `assets/audio/bgm/` のロード、共通音量、ミュート、イベント再生）。BGM は現在、ゲーム状態とマップに応じて切り替える |

#### 最近分割された（重要）

| ファイル | 主なエクスポート | 役割 |
|---|---|---|
| `inputSystem.js` | `isConfirmKey` / `isCancelKey` / `isMoveUpKey` / `isMoveDownKey` / `isMoveLeftKey` / `isMoveRightKey` / `updateMoveKeyDown` / `updateMoveKeyUp` / `handleSaveLoadShortcut` / `handlePrologueInput` / `handleMapInput` / `handleBattleInput` / `handleShopInput` / `handleTalkInput` / `handleKeyDown` / `handleKeyUp` | 全シーンのキー入力ハンドラ |
| `titleSystem.js` | `handleTitleInput` | タイトル画面の入力処理 |
| `prologueSystem.js` | `startPrologue` | プロローグ開始ロジック |
| `gameLoopSystem.js` | `updateCurrentState` / `drawCurrentState` | メインループの状態更新・描画ディスパッチ |
| `gameStateSystem.js` | `continueAfterGameOver` / `resetBattleAndUiState` / `resetProgressUiStateForNewGame` / `resetFlagsForNewGame` / `resetRuntimeStateForNewGame` / `resetHeroForNewGame` / `resetGame` | ゲーム状態リセット・ゲームオーバー後処理 |
| `mapSystem.js` | `getMapDefById` / `getMapTilesById` / `getCurrentMapDef` / `resolveEncounterTable` / `resolveValue` / `getTransitionDef` / `getCurrentMapId` / `resolveTransitionAttempt` / `resolveTransitionDestination` / `applyTransitionRuntimeState` / `getTileRenderMeta` / `calculateRenderCamera` | マップ定義取得・遷移実行・タイルメタ取得・カメラ計算 |
| `movementSystem.js` | `tileAt` / `isBlockedTile` / `canPlaceHeroAt` / `updateHeroVelocityFromKeys` / `applyHeroVelocity` / `tickHeroJustExited` / `syncHeroDrawPosition` | ヒーロー移動・衝突判定（タイルレベル） |
| `collisionSystem.js` | `isColliding` / `centeredBottomHitbox` / `entranceHitbox` / `getCollisionBox` | AABB 衝突判定・ヒットボックス生成 |
| `interactionSystem.js` | `getEventEntityForBox` / `getEntityKey` / `getCollidingEntity` / `getBlockingEntityForBox` / `setupHeroEntity` | エンティティ接触判定・インタラクション選択 |
| `entitySystem.js` | `makeChestEntity` / `makeSignEntity` / `makeHouseEntity` / `makeNpcEntity` / `makeEnemyNpcEntity` / `makeBossEntity` / `makeForestBossEntity` / `makeDemonGeneralEntity` / `makeDemonLordEntity` / `makeLeafaForestEntranceEntity` / `makeLeafaRescueEntity` / `addDecorEntities` / `addHouseEntities` / `addEntranceEntities` / `addNpcEntities` / `addSignEntities` / `addChestEntities` / `addSpecialEventEntities` / `updateEntities` / `drawEntities` / `syncEntities` など | エンティティ生成・更新・描画の一括管理 |
| `equipSystem.js` | `moveEquipCursor` / `moveEquipHorizontal` / `cancelEquipMenu` / `confirmEquipMenu` / `handleEquipInput` | 装備メニューカーソル操作・入力処理 |
| `uiSystem.js` | `refreshStatusBar` / `showShopBtns` | HTMLステータスバー更新・ショップボタン制御 |

---

### `src/ui/`
キャンバス描画とDOM操作のみ。状態は引数・deps injection で受け取る。

#### 既存（分割済み・安定）

| ファイル | 役割 |
|---|---|
| `statusUI.js` | HTMLステータスバー（HP/MP/名前/場所）の更新 |
| `textwindowUI.js` | 会話ウィンドウ・ポートレート枠・ショップウィンドウの描画 |
| `equipmentUI.js` | 装備メニュー・アイテム一覧・キャラクターステータスパネルの描画 |
| `battleBgUI.js` | バトル背景キー解決ロジックと背景描画（フィールド・洞窟・ボス） |
| `battleEffectsUI.js` | 戦闘エフェクト描画（ヒットバースト・斬撃・炎・葉） |
| `buttonsUI.js` | バトルボタンの表示/非表示制御 |
| `noticeUI.js` | 画面上部の通知テキスト表示 |
| `gaugeUI.js` | HP/MP ゲージ描画 |
| `textUI.js` | テキスト描画ユーティリティ |
| `debugUI.js` | デバッグ情報表示 |
| `battleUI.js` | バトル画面の統合描画 |

#### 最近分割された（重要）

| ファイル | 主なエクスポート | 役割 |
|---|---|---|
| `titleUI.js` | `renderTitle` | タイトル画面描画 |
| `prologueUI.js` | `renderPrologueUI` | プロローグ画面描画（星・テキスト・ヒント） |
| `mapUI.js` | `genericTileFallback` / `drawTileFallback` / `drawSignEntity` / `drawVisibleTiles` / `drawMapOverlay` / `renderMap` | マップタイル・オーバーレイ・サイン描画 |
| `dialogueUI.js` | `renderTalkWindow` / `drawTalk` | 会話ウィンドウ描画 |
| `equipUI.js` | `renderEquipMenu` | 装備メニュー画面描画 |
| `resultUI.js` | `renderLose` / `renderEnding` | ゲームオーバー・エンディング画面描画 |
| `heroUI.js` | `getHeroSpriteInfo` / `drawHeroAtFoot` / `drawHeroEntity` | ヒーロースプライト情報取得・ヒーロー描画 |
| `mapEntityUI.js` | NPC・オブジェクトのマップ上描画 |

---

### `src/utils/`

| ファイル | 役割 |
|---|---|
| `color.js` | カラーユーティリティ（`shadeHex` など） |
| `position.js` | 座標ユーティリティ（将来拡張用） |
| `random.js` | 乱数ユーティリティ（`rng` など） |

---

## 3. main.js の現在の役割

**行数: 約 6,310 行**（分割進行中）

main.js は現在「グローバル状態・初期化・ラッパー・ゲーム起動の接着層」として機能している。
各システムモジュールへの deps（依存注入オブジェクト）を組み立てて橋渡しするのが主な仕事。

### main.js に残っている関数の分類

---

#### A. deps injection ファクトリー（分離済みモジュールへのブリッジ）
すでに各システム/UIに処理が移っており、main.js 側はグローバル変数を収集して渡すだけ。

| 関数群 | 委譲先 |
|---|---|
| `getInputSystemDeps()` | `inputSystem.js` |
| `getTitleSystemDeps()` / `getTitleUIDeps()` | `titleSystem.js` / `titleUI.js` |
| `getPrologueSystemDeps()` | `prologueSystem.js` / `prologueUI.js` |
| `getGameLoopSystemDeps()` | `gameLoopSystem.js` |
| `getGameStateSystemDeps()` | `gameStateSystem.js` |
| `getMapSystemDeps()` / `getTileRenderMetaDeps()` / `getRenderCameraDeps()` / `getRenderMapDeps()` | `mapSystem.js` / `mapUI.js` |
| `getTransitionDestinationDeps()` / `getTransitionRuntimeStateDeps()` | `mapSystem.js` |
| `getDialogueSystemDeps()` / `getDialogueUIDeps()` | `dialogueSystem.js` / `dialogueUI.js` |
| `getShopSystemDeps()` | `shopSystem.js` |
| `getEquipSystemDeps()` | `equipSystem.js` |
| `getEquipmentSystemDeps()` | `equipmentSystem.js` |
| `getItemSystemDeps()` | `itemSystem.js` |
| `getResultUIDeps()` | `resultUI.js` |
| `getUISystemDeps()` | `uiSystem.js` |
| `getHeroSystemDeps()` / `getHeroUIDeps()` | `heroSystem.js` / `heroUI.js` |
| `getEnemyViewUIDeps()` | `battleEffectsUI.js` 等 |
| `getSaveSystemDeps()` / `getRestoreQuestAndFlagsDeps()` / `getRestoreHeroDeps()` / `getRestoreReturnPointsDeps()` / `getRestoreCurrentMapDeps()` / `getRestoreAlliesDeps()` | `saveSystem.js` |

---

#### B. グローバル状態アクセサ・座標ユーティリティ（接着層として残す）

| 関数 | 概要 |
|---|---|
| `tileToPx(n)` / `pxToTile(n)` | タイル⇔ピクセル変換 |
| `heroTileX()` / `heroTileY()` / `heroFootTileX()` / `heroFootTileY()` | ヒーローのタイル座標取得 |
| `setHeroTile(x, y)` | ヒーローのタイル位置設定 |
| `setStartPosition()` | マップ開始位置のセット |
| `normalizeSavedPoint(point, fallback)` | セーブポイント正規化 |
| `getCurrentMapId()` | 現在のマップ ID 取得 |
| `getMapDefById(mapId)` | マップ定義取得ラッパー |
| `getMapTilesById(mapId)` | マップタイル取得ラッパー |
| `getCurrentMapDef()` | 現在マップ定義取得ラッパー |
| `resolveValue(value, ...args)` | 関数/値の統一解決 |
| `getTransitionDef(transitionId)` | 遷移定義取得ラッパー |
| `resolveEncounterTable(mapDef)` | エンカウントテーブル解決ラッパー |
| `mapCols(map)` / `mapRows(map)` | マップサイズ取得 |

---

#### C. 描画ユーティリティ（接着層として残す）

| 関数 | 概要 |
|---|---|
| `txt(s, x, y, col, sz)` | テキスト描画ショートハンド |
| `wrapTextLines(text, maxWidth, maxLines, fontSize)` | テキスト折り返し |
| `drawBar(x, y, w, cur, max, col)` | HPバーなどのバー描画 |
| `drawThinBar(x, y, w, cur, max, col)` | 細バー描画 |
| `drawVisibleTiles(camCol, camRow)` | タイル描画ラッパー（→ mapUI） |
| `drawMapOverlay()` | マップオーバーレイラッパー（→ mapUI） |
| `getTileContextKey()` | タイルコンテキストキー取得 |
| `getTileRenderMeta(tile, map)` | タイルレンダリングメタ取得ラッパー |
| `getTileImageKey(col, row)` | タイル画像キー取得 |
| `drawHero(px, py, sc, dir)` | ヒーロー描画ラッパー（→ heroUI） |
| `drawHeroAtFoot(footX, footY, dir)` | ヒーロー足元描画ラッパー（→ heroUI） |

---

#### D. 装備・ステータス計算ラッパー（接着層として残す）

| 関数 | 概要 |
|---|---|
| `getCurrentWeapon()` / `getCurrentArmor()` | 主人公の装備中武器/防具取得 |
| `getHeroAttack()` / `getHeroDefense()` | 主人公の攻撃力/防御力 |
| `getAllyWeapon(ally)` / `getAllyArmor(ally)` | 仲間の装備取得 |
| `getAllyAttack(ally)` / `getAllyDefense(ally)` / `getAllySpeed(ally)` | 仲間ステータス |
| `getActorKey(actor)` | アクターキー（主人公/仲間識別） |
| `isItemAllowedForActor(item, actorKey)` | アイテム使用可否チェック |
| `getOwnedWeaponIds(actor)` / `getOwnedArmorIds(actor)` | 所持装備IDリスト |
| `getActorEquippedWeapon(actor)` / `getActorEquippedArmor(actor)` | 装備中アイテム取得 |
| `getNextExp(level)` / `getAllyNextExp(ally)` | 必要経験値 |
| `gainAllyExp(ally, amount)` | 仲間の経験値付与ラッパー |
| `cycleActorEquipment(actor, slot, delta)` | 装備サイクルラッパー |
| `gainExp(amount)` | 主人公経験値付与 |

---

#### E. インベントリ・アイテムラッパー（接着層として残す）

| 関数 | 概要 |
|---|---|
| `getEquipItems()` | 装備可能アイテム一覧 |
| `ensureInventory()` | インベントリ初期化確保 |
| `getItemCount(itemId)` / `setItemCount(itemId, count)` / `changeItemCount(itemId, delta)` | アイテム数管理 |
| `getUsableItems()` | 使用可能アイテム一覧 |
| `getPartyMembers(options)` / `getPartyMemberById(id, options)` | パーティメンバー取得 |
| `getTargetDisplayName(target)` | ターゲット表示名取得 |
| `usePotionOnTarget(target)` / `usePotion()` / `useEther(target)` / `useElixir(target)` | アイテム使用ラッパー |
| `fullRecoverParty()` | パーティ全回復 |

---

#### F. NPC・ダイアログ・ショップのラッパー群

| 関数 | 概要 |
|---|---|
| `getNpcRole(npc)` / `getNpcLines(npc)` | NPC役割・台詞取得（→ dialogueSystem） |
| `handleNpcEvent(npc)` / `handleDialogueComplete(npc)` | NPC イベント処理 |
| `openDialogue(npc)` / `advanceDialogue()` | 会話開始・進行ラッパー |
| `drawTalk()` / `renderTalkWindow()` / `updateTalk()` | 会話描画ラッパー（→ dialogueUI） |
| `openSignRead(sign)` / `getSignReadLines(sign)` / `renderSignReadWindow()` | 看板読み取り処理 |
| `getShopIntroLine(npc)` / `drawShopList(options)` / `drawShopTextWindow(...)` | ショップ描画（→ textwindowUI 等） |
| `openShop(npc)` / `moveShopCursor(delta)` / `confirmShopChoice()` / `closeShop()` | ショップ操作ラッパー（→ shopSystem） |
| `getShopAction(itemId)` / `getShopOptions()` | ショップアクション取得ラッパー（→ shopSystem） |
| `buyPotion()` ～ `buyGreenRobe()` | 購入ラッパー8種（→ shopSystem） |
| `showShopBtns()` | ショップボタン表示ラッパー（→ uiSystem） |
| `updateShop()` / `drawShop()` | ショップ状態ループラッパー |

---

#### G. プロローグ・タイトルラッパー

| 関数 | 概要 |
|---|---|
| `startPrologue()` / `advancePrologueLine()` / `finishPrologue()` / `skipPrologue()` | プロローグ進行ラッパー（→ prologueSystem） |
| `renderPrologue()` | プロローグ描画ラッパー（→ prologueUI） |
| `renderTitle()` | タイトル描画ラッパー（→ titleUI） |
| `startTitleMenuAction(action)` | タイトルメニューアクション（→ titleSystem） |

---

#### H. 入力ハンドララッパー

| 関数 | 概要 |
|---|---|
| `isConfirmKey(e)` / `isCancelKey(e)` / `isMoveUpKey(e)` / `isMoveDownKey(e)` | キー判定ラッパー（→ inputSystem） |
| `updateMoveKeyDown(e)` / `updateMoveKeyUp(e)` | 移動キー更新ラッパー（→ inputSystem） |
| `handleKeyDown(e)` / `handleKeyUp(e)` | イベントリスナー（→ inputSystem） |
| `handleMapInput(e)` / `handlePrologueInput(e)` / `handleBattleInput(e)` / `handleShopInput(e)` / `handleTalkInput(e)` | 各シーン入力ラッパー（→ inputSystem） |
| `handleEquipInput(e)` | 装備入力ラッパー（→ equipSystem） |
| `handleSaveLoadShortcut(e)` | セーブショートカットラッパー（→ inputSystem） |

---

#### I. ゲームループ・状態遷移ラッパー

| 関数 | 概要 |
|---|---|
| `loop()` | `requestAnimationFrame` ベースのメインループ本体 |
| `updateCurrentState()` / `drawCurrentState()` | ループ内の状態更新・描画ディスパッチ（→ gameLoopSystem） |
| `setGameState(nextState)` | シーン状態遷移（→ gameStateSystem） |
| `backToMap()` | マップシーンへ戻る処理 |
| `resetGame()` / `resetBattleAndUiState()` | ゲームリセットラッパー（→ gameStateSystem） |
| `recoverActorAfterGameOver(actor)` | ゲームオーバー後のHP回復 |

---

#### J. セーブ/ロードラッパー

| 関数 | 概要 |
|---|---|
| `saveGame()` / `loadGame()` | セーブ/ロードのエントリーポイント（→ saveSystem） |
| `resetStateAfterLoad()` | ロード後の状態整合化 |
| `startNewGameFromLoad()` | ニューゲーム開始処理 |
| `restoreGameDataFromSave(data)` | セーブデータの復元処理 |

---

#### K. 装備メニュー

| 関数 | 概要 |
|---|---|
| `openEquipMenu()` | 装備メニュー開始 |
| `renderEquipMenu()` | 装備メニュー描画ラッパー（→ equipUI） |
| `updateEquip()` / `drawEquip()` | 装備画面ループラッパー |

---

#### L. エンカウント・マップイベント

| 関数 | 概要 |
|---|---|
| `scheduleEncounterBattle()` / `checkRandomEncounterAtHeroTile()` | エンカウント発生判定 |
| `isHouseMap(map)` / `getAdjacentBoss()` | マップ種別・隣接ボス判定 |
| `handleEventEntityInteraction(heroBox)` / `handleUnreadSignInteraction(heroBox)` / `checkTileEvents()` | タイルイベント・インタラクション処理 |

---

#### M. 敵描画（まだ main.js に残る中規模処理）

| 関数 | 概要 |
|---|---|
| `genericEnemyFallback` | 敵共通の簡易フォールバック描画 |
| `drawEnemy` | 敵描画ディスパッチャー（画像優先、画像がない場合のみ共通フォールバック） |
| `drawNPC` / `genericNpcFallback` | NPC描画（画像優先、画像がない場合のみ共通フォールバック） |

---

#### N. バトル本体（最大の大物・最後に触る）

| 関数群 | 概要 |
|---|---|
| `startBattle` / `startBossIntro` / `startBattleWithEnemies` / `startBattleVictory` | バトル開始・ボスイントロ・勝利処理 |
| `executeBattleRound` / `beginBattleRound` / `processNextBattleActor` | ラウンド進行 |
| `executePartyAction` / `executeActorAttack` / `executeActorFire` など | パーティアクション実行 |
| `handleActorCommandChoice` / `collectActorAction` / `advancePartyCommandCollection` | コマンド収集 |
| `beginTargetSelectionForActor` / `confirmTargetSelection` / `cancelTargetSelection` | ターゲット選択 |
| `mageEnemyAct` / `enemyAct` / `forestBossAct` / `demonGeneralAct` / `demonLordAct` / `darkKnightAct` | 敵AI |
| `applyPartyDamage` / `triggerPartyHitEffect` / `updatePartyHitEffects` | パーティダメージ処理 |
| `buildVictoryMessages` / `advanceBattleVictory` / `resolveBattleVictory` | 勝利メッセージ処理 |
| `queueBattleMessages` / `clearBattleMessageQueue` | メッセージキュー |
| `doRun` / `getActorSpeed` / `isPartyDefeated` / `getRandomLivePartyMember` | 補助ロジック |
| `chooseEnemy` / `chooseBattleEnemies` / `makeBattleEnemy` | エネミー生成 |
| `renderBattle` / `updateBattle` / `drawBattle` | バトル描画統合 |
| `getFaceSprite` / `drawBattleHeroFace` / `drawEnemyView` | バトルキャラ描画 |
| `getEnemyView` / `getEnemyViewCenters` / `makeEnemyViews` | 敵表示位置計算 |
| `spawnFireEffectOnEnemy` ～ `drawHitEffects` | エフェクトラッパー（→ battleEffectsUI） |
| `getMapBattleBgKey` ～ `drawBattleBackground` | 背景ラッパー（→ battleBgUI） |
| `showBtns` / `moveBattleCommand` / `confirmBattleCommand` | バトルUI操作 |
| `joinAlly(id)` | 仲間加入 |
| `renderLose` / `renderEnding` | ゲームオーバー/エンディングラッパー（→ resultUI） |
| `refreshStatusBar` / `getLocationName` | ステータスバーラッパー（→ uiSystem） |

---

## 4. 分離済みの処理一覧

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
| キー入力判定・ハンドラ | `src/systems/inputSystem.js` |
| タイトル入力 | `src/systems/titleSystem.js` |
| プロローグ開始 | `src/systems/prologueSystem.js` |
| ゲームループ更新/描画ディスパッチ | `src/systems/gameLoopSystem.js` |
| ゲーム状態リセット | `src/systems/gameStateSystem.js` |
| マップ定義・遷移・タイルメタ・カメラ | `src/systems/mapSystem.js` |
| ヒーロー移動・衝突 | `src/systems/movementSystem.js` |
| AABB 衝突判定 | `src/systems/collisionSystem.js` |
| エンティティ接触・インタラクション | `src/systems/interactionSystem.js` |
| エンティティ生成・管理 | `src/systems/entitySystem.js` |
| 装備メニュー入力 | `src/systems/equipSystem.js` |
| ステータスバー・ショップボタン | `src/systems/uiSystem.js` |
| プロローグ描画 | `src/ui/prologueUI.js` |
| タイトル描画 | `src/ui/titleUI.js` |
| マップタイル・オーバーレイ描画 | `src/ui/mapUI.js` |
| 会話ウィンドウ描画 | `src/ui/dialogueUI.js` |
| 装備メニュー描画 | `src/ui/equipUI.js` |
| ゲームオーバー・エンディング描画 | `src/ui/resultUI.js` |
| ヒーロー描画 | `src/ui/heroUI.js` |
| バトル背景 | `src/ui/battleBgUI.js` |
| 戦闘エフェクト（4種） | `src/ui/battleEffectsUI.js` |
| 装備メニューUI | `src/ui/equipmentUI.js` |
| ステータスUI（HTML） | `src/ui/statusUI.js` |
| 会話ウィンドウUI | `src/ui/textwindowUI.js` |
| ボタンUI | `src/ui/buttonsUI.js` |
| 通知UI | `src/ui/noticeUI.js` |

---

## 5. 今後の方針

### 基本方針

- **main.js は接着層として残す** — グローバル状態・初期化・各システムへの deps injection・ゲーム起動の役割は main.js が担い続ける。無理にゼロにしない。
- **小さいラッパー関数は消さず安定性を優先** — 既存呼び出し元を壊さないため、ラッパーは積極的に削除しない。
- **1セッションで1責務ずつ抽出** — 一気に大規模分割しない。
- **画像素材運用を前提にする** — 敵/NPC/マップタイルのフォールバック描画は共通の簡易描画に統一する。個別敵・個別タイルごとの複雑な手描きフォールバックは削除方針。
- **主人公は画像素材前提** — 主人公についてはフォールバックを追加しない。

### 今後の分割候補（優先度順）

#### 優先度：高（比較的安全に切り出せる）

| 候補ファイル | 切り出し対象 | 難易度 |
|---|---|---|
| `src/main.js`（将来 `src/ui/enemyUI.js` へ分離候補） | `genericEnemyFallback` / `drawEnemy` — 敵共通フォールバックと描画ディスパッチャー | 低〜中（描画のみ） |
| `src/systems/encounterSystem.js`（拡充） | `scheduleEncounterBattle` / `checkRandomEncounterAtHeroTile` / `isDeepCaveEncounter` / `applyEnemyVariance` / `chooseEnemy` / `chooseEnemyCount` / `chooseBattleEnemies` | 中 |

#### 優先度：中（state 結合度が高いため慎重に）

| 候補ファイル | 切り出し対象 | 難易度 |
|---|---|---|
| `src/systems/npcEventSystem.js`（拡充） | `getNpcRole` / `getNpcLines` / `handleNpcEvent` / `handleDialogueComplete` | 中 |
| `src/systems/saveSystem.js`（拡充） | `saveGame` / `loadGame` / `resetStateAfterLoad` / `startNewGameFromLoad` / `restoreGameDataFromSave` | 中（セーブ互換性に注意） |
| `src/ui/battleUI.js`（整理） | `renderBattle` / `drawBattle` / `drawEnemyView` / `getFaceSprite` / `drawBattleHeroFace` | 中 |

#### 優先度：低（最後に慎重に）

| 候補ファイル | 切り出し対象 | 難易度 |
|---|---|---|
| `src/systems/battleSystem.js` | バトル本体全体（ダメージ計算・ターン管理・AI・勝利処理） | **高**（最大の大物・多数の状態変数に依存） |

### 今は触らない方がよい大物処理

| 処理 | 理由 |
|---|---|
| **battleSystem 本体** (`startBattle` / `executeBattleRound` / `enemyAct` 等) | 状態変数への依存が非常に広く、分割のリスクが高い。最後の大物として扱う |
| **`drawTile` / `drawCustomTile` の複雑な個別フォールバック描画** | 画像素材運用へ移行するため、共通簡易フォールバックへ統一し、個別描画は削除方針 |
| **セーブ/ロード周辺** (`restoreGameDataFromSave` 等) | セーブ互換性を壊すとユーザーのセーブデータが破損する。変更は最小限に |
| **`hero` オブジェクトのキー名** | キー名変更はセーブデータ破壊に直結 |

---

## 6. 新機能追加時に触る場所

| 追加したいもの | 主に触るファイル |
|---|---|
| 新しいマップ | `src/data/maps.js`（配列追加）→ `src/data/mapTransitions.js`（遷移追加）→ `src/data/mapObjects.js`（オブジェクト追加）→ main.js（マップ選択ロジックに追記） |
| 新しいNPC | `src/data/npcs.js`（定義追加）→ 必要なら `src/systems/dialogueSystem.js`（特殊台詞） |
| 新しい敵 | `src/data/enemies.js`（`ENEMY_DEFS` に追記）→ `src/systems/encounters.js`（テーブルに追記） |
| 新しい装備 | `src/data/equipment.js`（`WEAPONS` or `ARMORS` に追記） |
| 新しいショップ商品 | `src/data/shopItems.js`（`SHOP_ITEMS` に追記）→ `src/systems/shopSystem.js`（対応ケース追記） |
| 新しい戦闘背景 | `src/data/images.js`（`BATTLE_BG_IMAGES` に画像パス追記）→ `src/ui/battleBgUI.js`（解決ロジックに追記） |
| 新しい戦闘エフェクト | `src/ui/battleEffectsUI.js`（spawn/update/draw/clear の4関数を追記）→ main.js にラッパーと呼び出しを追記 |
| 新しい会話イベント | `src/systems/dialogueSystem.js`（台詞ロジック追記）→ main.js の NPC インタラクション処理に接続 |
| 新しい宝箱 | `src/data/mapObjects.js`（`MAP_OBJECTS` に宝箱定義追記）→ `src/systems/chestSystem.js`（対応ケース追記） |

---

## 7. 開発上の注意事項

- **一気に大規模分割しない** — 1セッションで1責務ずつ抽出する
- **main.js にラッパーを残す** — 既存の呼び出しを壊さないため、UI関数の呼び出しはラッパー経由にする
- **deps injection パターン** — UI モジュールは main.js を import しない。`ctx` / `rng` / `battleBgImgs` などは引数で渡す
- **import 重複に注意** — 同じファイルからの import は1ブロックにまとめる
- **大文字小文字に注意** — ファイルシステムが case-sensitive な場合 `battleBgUI.js` と `battlebgUI.js` は別物
- **既存セーブ互換に注意** — `hero` オブジェクトのキー名を変更するとセーブデータが壊れる
- **戦闘処理は最後に** — `startBattle` 周辺は状態変数の依存が広く、最も慎重な作業が必要
