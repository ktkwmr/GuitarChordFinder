# ベースラインの実施状況（Guitar Chord Finder）

基準: WEBAPP_BASELINE.md（最終更新 2026-10-18 版）
状態: ✅ 実装済み / ⚠️ 一部 / ❌ 未実装 / 👤 待ち（人間の作業） / — 対象外

## 0. 変数

| 変数 | 値 |
|---|---|
| アプリ名 | Guitar Chord Finder |
| スラッグ | `guitarchordfinder` |
| ドメイン | `ktkwmr.com`（2 つ目のアプリ。§0 の **A**: 別 Worker + Route `ktkwmr.com/guitarchordfinder*`） |
| リポジトリ | `ktkwmr/GuitarChordFinder`（公開） |
| 運営者・問い合わせ | ktkwmr / GitHub Issues |
| 言語 | en（既定）+ ja（`/ja/`） |
| Web Analytics token | ChordTransposer と同じ |

## 1. アカウント

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 1-1〜1-3, 1-5 | アカウント類 | ✅ | ChordTransposer で実施済み |
| 1-4 | Claude の GitHub App にリポジトリを許可 | 👤 待ち | 「All repositories」なら不要 |

## 2. 土台とホスティング

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 2-1 | wrangler.jsonc | ✅ | `routes` と `workers_dev: false` を追加（§0 の A） |
| 2-2 | `/` → `/<slug>/` の転送 | — | ドメイン直下は ChordTransposer 側。このアプリでは `_redirects` を置かない |
| 2-3 | 404.html | ✅ | `/guitarchordfinder/` 以下の不明な URL に使われる |
| 2-4 | .gitignore | ✅ | |
| 2-5 | .gitattributes（LF） | ✅ | |
| 2-6 | 生成スクリプトの `--check` | ✅ | |
| 2-7 | README（英日） | ✅ | |
| 2-8 | LICENSE | ✅ | |
| 2-9 | CLAUDE.md | ✅ | |
| 2-10 | バージョン番号なし・キャッシュ名固定 | ✅ | |
| 2-11 | Cloudflare に接続・ルート設定 | 👤 待ち | |
| 2-12 | キャッシュ | ✅ | |

## 3. PWA

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 3-1 | manifest.json | ✅ | |
| 3-2 | アイコン一式 | ✅ | `scripts/render-icons.mjs` で icon.svg から生成 |
| 3-3 | PWA/iOS の meta | ✅ | |
| 3-4 | sw.js | ✅ | キャッシュ接頭辞 `guitarchordfinder-` |
| 3-5 | SW 登録 | ✅ | |
| 3-6 | `file://` 不可の注意 | ✅ | README |
| 3-7 | インストール案内 | ❌ | 任意 |

## 4. 多言語

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 4-1 | I18N と data-i18n | ✅ | JS で作る文言（ポジション名・ボタン・指板）も `t()` で英日 |
| 4-2 | 言語の決め方 | ✅ | |
| 4-3 | `/ja/` の自動生成 | ✅ | |
| 4-4 | 日本語の検索用タイトル・説明 | 🤝 確認待ち | `scripts/build-ja.mjs` 冒頭。案を入れてある |
| 4-5 | 和文の lang 固定 | — | 和文を表示する部分なし |
| 4-6 | 3 言語目 | — | |

## 5. SEO

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 5-1 | title / description | ✅ | |
| 5-2 | canonical / hreflang | ✅ | |
| 5-3 | OGP | ✅ | |
| 5-4 | og-image.png | ✅ | `scripts/og-image.html` |
| 5-5 | JSON-LD | ✅ | |
| 5-6 | robots.txt / sitemap.xml | ⚠️ | sitemap は `/guitarchordfinder/sitemap.xml` に生成。ChordTransposer の `robots.txt` に Sitemap 行を足す必要あり（下の作業 3） |
| 5-7 | `<h1>` | ✅ | ツールバーのアプリ名 |
| 5-8 | 画面に見える説明文 | ✅ | 冒頭の説明（無料・登録不要・オフライン） |
| 5-9 | リダイレクト | ✅ | |

## 6. セキュリティヘッダー

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 6-1〜6-3 | `_headers` と CSP | ✅ | 外部ホストは Cloudflare Web Analytics だけ |
| 6-4 | CSP 違反 0 件 | ✅ | `wrangler dev` で確認（日英・PC・390px） |
| 6-5 | Permissions-Policy の個別許可 | — | Web Audio は許可不要 |

## 7. プライバシー・法務

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 7-1 | アプリ内のプライバシー | ✅ | |
| 7-2 | プライバシーポリシー（日英） | ✅ | 広告なし・Cookie なしの内容。AdSense を入れるときは改定 |
| 7-3 | 運営者情報（日英） | ✅ | |
| 7-4 | 問い合わせ窓口 | ⚠️ | GitHub Issues のみ（メール未設置） |
| 7-5 | 外部サービスの変更時の同時修正 | ✅ | CLAUDE.md にルール |
| 7-6 | 例のコンテンツ | — | 歌詞などなし |
| 7-7 | ポリシー内の外部リンク確認 | 👤 待ち | |

## 8. サードパーティライセンス

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 8-1 | THIRD_PARTY_LICENSES.md | ✅ | ライブラリなし（その旨を記載） |
| 8-2 | 自動追記スクリプト・Actions | ✅ | |
| 8-3 | About ダイアログで表示 | ✅ | |
| 8-4 | CDN のバージョン固定 | — | CDN 不使用 |

## 9. 共通 UI

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 9-1 | ⚙ 設定メニュー | ⚠️ | 使い方 / プライバシー / このアプリについて。記事（§10）がまだないので「ガイド・記事」は未設置 |
| 9-2 | 使い方ダイアログ | ⚠️ | 詳しいガイドへのリンクは記事ができてから |
| 9-3 | 状態の保存・復元 | ✅ | `guitarchordfinder-state`。値は検証してから復元。危ない状態はなし |
| 9-4 | スマホ対応 | ✅ | スクロール型のレイアウト（固定高さではない）。safe-area 対応、390px で横スクロールなし（指板は枠内で横スクロール） |
| 9-5 | スマホでファイルを開く | — | |
| 9-6 | 印刷 | — | |
| 9-7 | 保存 | — | |
| 9-8 | アクセシビリティ | ✅ | |
| 9-9 | 自動テスト | ❌ | 探索・判定ロジックが index.html 内にある。テストするなら別ファイルに分ける |

## 10. 記事

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 10-1 | 生成の仕組み | ✅ | `build-pages.mjs`（`PAGES` は空、`INFO_PAGES` に about・privacy） |
| 10-2〜10-6 | 記事・画面写真 | ❌ | 人間が「やる」と言ったら。候補: 使い方ガイド、DADGAD のコード表、オープンG のコード表、変則チューニング入門、FAQ |

## 11. アクセス解析

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 11-1 | サイト登録・token | ✅ | ChordTransposer と同じ token |
| 11-2 | beacon と CSP | ✅ | アプリと生成ページ（404 以外） |
| 11-3 | プライバシーの記述 | ✅ | |
| 11-4 | 本番での送信確認 | 👤 待ち | |

## 12. CI

| # | 項目 | 状態 | メモ |
|---|---|---|---|
| 12-1 | Build generated pages | ✅ | |
| 12-2 | Update third-party licenses | ✅ | |
| 12-3 | ブランチ → PR → squash | ✅ | 初回コミットだけ main に直接 push |
| 12-4 | ローカル確認 | ✅ | |
| 12-5 | 生成ファイルを編集しない | ✅ | README・CLAUDE.md |

## 13〜15

13（公開直前）・14（公開後）は 👤 待ち。15（AdSense）は未着手。

## 人間の作業（未完了）

| # | 内容 | 手順 | 終わったかの確かめ方 |
|---|---|---|---|
| 1 | Cloudflare に Worker を作る | https://dash.cloudflare.com → Workers & Pages → Create → Import a repository → `ktkwmr/GuitarChordFinder`。本番ブランチ `main`、Build command は空（`wrangler.jsonc` の `build.command` が使われる） | Deployments が Success。Settings → Domains & Routes に `ktkwmr.com/guitarchordfinder*` が出る（`wrangler.jsonc` の `routes` から自動設定。出なければ Add → Route で同じ値を追加） |
| 2 | 本番の表示確認 | https://ktkwmr.com/guitarchordfinder/ と /ja/ を PC・スマホで開く。ホーム画面に追加して起動、機内モードで開けるか | 画面が出て、音が鳴り、オフラインで開ける |
| 3 | ChordTransposer の robots.txt に sitemap を追加 | ChordTransposer の `public/robots.txt` に `Sitemap: https://ktkwmr.com/guitarchordfinder/sitemap.xml` を 1 行足す（Claude に頼めば PR を出す） | https://ktkwmr.com/robots.txt に 2 行目が出る |
| 4 | Search Console | https://search.google.com/search-console → ktkwmr.com → サイトマップに `https://ktkwmr.com/guitarchordfinder/sitemap.xml` を送信。URL 検査で `/guitarchordfinder/` と `/guitarchordfinder/ja/` のインデックス登録をリクエスト | サイトマップが「成功しました」 |
| 5 | GitHub の About | https://github.com/ktkwmr/GuitarChordFinder の右の ⚙（PC か「デスクトップ用 Web サイトを表示」）。Website: `https://ktkwmr.com/guitarchordfinder/`、Topics: `guitar` `chords` `alternate-tunings` `dadgad` `chord-finder` `pwa` `music` | About に URL と Topics が出る（Description は作成時に設定済み） |
| 6 | 解析の確認 | 本番で DevTools → Network を `cloudflareinsights` で絞る | `beacon.min.js` と `rum` が 200/204 |
| 7 | iPhone 実機 | 音が鳴るか（消音スイッチがオンだと鳴らないことがある）、ホーム画面アプリの見切れ | |
| 8 | 日本語の検索用タイトル・説明の確認 | `scripts/build-ja.mjs` 冒頭の `TITLE` / `DESCRIPTION` | 直したいところを Claude に伝える |
| 9 | X・LINE でカード表示 | URL を貼る | 画像付きカードが出る |
