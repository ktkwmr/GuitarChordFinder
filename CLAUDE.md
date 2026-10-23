# Guitar Chord Finder

ギターの変則チューニングでのコードの押さえ方を探す Web アプリ。公開 URL: https://ktkwmr.com/guitarchordfinder/ （日本語: /guitarchordfinder/ja/）
構成・開発・デプロイの詳細は README.md を参照。

## 共通ベースライン
- 独自機能以外の共通項目は ktkwmr/webapp-baseline（非公開）の WEBAPP_BASELINE.md に従う。
  セッションに無ければ add_repo（read。更新するときは push）で追加して読む。
- 各項目の状態は docs/baseline-status.md に記録する。
- どのアプリにも当てはまる新しい作業・設定・落とし穴が出てきたら、作業の最後に
  ベースラインへの追記案を出す（ユーザーが了承したらベースラインのリポジトリに PR）。
- 共通部分のファイル（`wrangler.jsonc`、`public/_headers`、`sw.js`、workflows など）を直したら、`webapp-baseline/templates/` の同じファイルも直す案を出す。
- 独自機能（押さえ方の探索・コード名の判定・音・ダイアグラム）の変更だけなら追記は不要。

## このアプリの値
- スラッグ: `guitarchordfinder` / ドメイン: `ktkwmr.com` / 言語: en（既定）+ ja（`/ja/`）
- 運営者: ktkwmr / 問い合わせ: GitHub Issues
- Cloudflare Web Analytics token: `5c53079cb9a64d819d1ca53e8533ca63`（ChordTransposer と同じサイト）
- ホスティング: Cloudflare Workers 静的アセット。ドメインの 2 つ目のアプリなので、別 Worker に Route `ktkwmr.com/guitarchordfinder*` だけを割り当てる（ベースライン §0 の A）。
  ドメイン直下（`/` のトップページ＝アプリ一覧、`robots.txt`、ルートの `sitemap.xml`、`_redirects`、ルートの 404）は別リポジトリ `ktkwmr/ktkwmr.com`（Worker `ktkwmr-home`、ルート `ktkwmr.com/*`）にある。ほかのアプリには依存しない。このアプリの sitemap は `/guitarchordfinder/sitemap.xml`。

## ルール
- 手で編集するのはアプリ本体 `public/guitarchordfinder/index.html` と `scripts/`。生成ファイル（`public/guitarchordfinder/ja/index.html`、記事・情報ページ `<slug>/` とその `ja/`、`public/guitarchordfinder/sitemap.xml`）は編集せず、`node scripts/build-ja.mjs` と `node scripts/build-pages.mjs` で作り直す（`--check` で確認）。
- 画面の文言は `index.html` の `I18N`（en / ja）に書き、要素には `data-i18n` / `data-i18n-html` / `data-i18n-attr` を付ける（`build-ja.mjs` が日本語ページの本文を置き換える）。JS で作る文言は `t()` を使う。
- コードの計算（探索・コード名・ダイアグラム）は `public/guitarchordfinder/chords.js` にあり、アプリと記事（`scripts/pages/chords.mjs`）が共用する。記事のコード表は手で書かず、これで計算する。
- 記事を追加・変更したら、PR のプレビューで人間が内容を確認してからマージする（ベースライン §10-7）。確認してほしい点を `docs/article-review.md` に書き、PR 本文にも載せる。見た目を変えたら `node scripts/render-guide-images.mjs` で画面写真を撮り直す。
- 外部ホストを足したら `public/_headers` の CSP と、プライバシーの説明（`scripts/pages/privacy.mjs`、アプリ内の `privacy.body`、README）を同じ PR で直す。
- トップページ（https://ktkwmr.com/）のアプリ一覧に、このアプリの名前・説明・特徴・ガイド記事の一覧を載せている（`ktkwmr/ktkwmr.com` の `scripts/pages/home.mjs` の `APPS`。アイコンは `ICON`。`public/robots.txt` の `Sitemap:` 行も）。ガイド記事を追加・改名・削除したとき、アプリ名・説明・アイコンを変えたときは、`ktkwmr/ktkwmr.com` に `home.mjs` を直す PR を別に出す（ベースライン §2-16）。
- 作業はブランチ → PR → Cloudflare のプレビュービルド確認 → squash マージ。
- 本番サイト・Cloudflare 管理画面・外部 CDN にはこの環境から届かないことが多い。確かめられなかったことは「未確認」と書き、ユーザーに確認手順を伝える。
