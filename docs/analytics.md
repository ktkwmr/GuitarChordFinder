# 利用状況の計測（Cloudflare Zaraz + Google Analytics 4）

ページの滞在時間・ボタンのタップ・設定の変更・主な機能の結果を、Cloudflare Zaraz 経由で GA4 に送る（ベースライン §17）。
**同意バナーで「すべて同意」を選んだ人だけ**が GA4 に送られる。閲覧数は今までどおり Cloudflare Web Analytics（Cookie なし）でも数える。
同意の Cookie（`zaraz-consent`）は ktkwmr.com のすべてのアプリで共通。

## しくみ

- `index.html`・記事のページ（`scripts/pages/layout.mjs`）・`public/404.html` の `<head>` で `/cdn-cgi/zaraz/i.js`（Zaraz）と `/guitarchordfinder/usage-events.js` を読む。
  Zaraz の「Auto-inject script」は切ってあるので、Zaraz が動くのはこのタグを書いたページだけ。
- `usage-events.js`（ベースラインの `templates/public/__slug__/usage-events.js` のコピー。違うのは `PREFIX` だけ）: すべてのボタン・リンクのタップ（`gcf_tap`）、設定の変更（`gcf_change`）、ページが見えていた時間（`gcf_engaged`）を送る。`window.usage.track(name, params)`（→ `gcf_<name>`）をアプリに渡す。フッターの「Cookie の設定」（`.cookie-settings`）で `zaraz.showConsentModal()` を開く。
- アプリの主な機能のイベントは `index.html` の `renderResults()`・`renderRev()`・コードの再生。チップには `data-track`（`root:G`・`qual:m7`・`preset:<名前>` など）（`track()` → `window.usage.track`）。
- Zaraz がないとき（`wrangler dev`、workers.dev のプレビュー、ブラウザがブロック）は何も送らない。`i.js` が 404 になるだけで、アプリは動く。
- 同じオリジン（`/cdn-cgi/zaraz/…`）なので CSP・COEP は変えていない。Zaraz が GA4 に送るのは Cloudflare のサーバーからで、ブラウザは Google に直接つながない。
- `sw.js` は `/cdn-cgi/` をキャッシュしない（Zaraz のスクリプトはリクエストごとに作られる）。

**チューニング・コード名・数より詳しいことは送らない（利用者が入力する文字はない）。** イベントを足すときもこれを守り、プライバシーの説明（`scripts/pages/privacy.mjs`、`index.html` の `privacy.body`、README）に書いた範囲に収める。範囲を広げるときは説明も同じ PR で直す。
利用者が名前を付けたもの（曲・セット・トラックなど）が選択肢になる `<select>` には `data-track-value="off"` を付ける（変えたことだけを送り、値は送らない）。文字の入力欄の中身は送らない。

## イベント

すべてのイベントに `ui_lang`（`en` / `ja`）が付く。

| イベント | パラメーター | いつ |
|---|---|---|
| `gcf_tap` | `button` | ボタン・リンク・タブを押したとき。名前は `data-track`、要素の `id`、`data-i18n`（`data-i18n-attr`）のキー（上にある id を `id:キー` の形で前に付ける）、リンクは `link:/guitarchordfinder/guide/` や `link:github.com`、「Cookie の設定」は `cookie-settings`、それ以外は「上にある id:クラス名」。アプリが自分で起こすクリック（ダウンロードなど）は数えない |
| `gcf_change` | `control`, `value`, `files` | セレクト・スライダー（離したとき）・数値・チェックボックス（`on`/`off`）・ラジオを変えたとき。ファイルを選んだときは `value` が拡張子（複数は `+`）・`files` が数。名前の付け方は `gcf_tap` と同じ |
| `gcf_engaged` | `seconds` | ページが隠れたとき・閉じたとき。前回から、ページが見えていた秒数 |
| `gcf_find` | `tuning`（音名を空白でつなぐ）, `chord`, `shapes`, `regions` | 探すコードかチューニングを変えて結果が出たとき（同じ条件では 1 回） |
| `gcf_identify` | `tuning`, `chord`（判定できないときは none）, `strings`（鳴らす弦の数） | 「押さえ方から探す」で押さえ方を変えて 2 秒止まったとき |
| `gcf_goFind` | `chord` | 判定したコードを「コードから探す」で開いたとき |
| `gcf_play` | `from`（card / rev）, `region`, `mode`, `chord`, `strings` | 押さえ方を鳴らしたとき |

イベント名を足すときは `gcf_` で始める（GA4 はドメインで 1 つなので、アプリで分けるため）。パラメーターの名前はほかのアプリと同じものを使い回す（GA4 のカスタム定義はディメンション・指標それぞれ 50 個まで）。

## 設定（Cloudflare・GA4）

ドメインで 1 回だけの設定（GA4 のプロパティ `ktkwmr.com`・測定 ID `G-HM6P805V7F`、Zaraz のツール・同意バナー）は Sheet Music Player の `docs/analytics.md` とベースライン §17-1〜17-6。
全アプリに入れたので、Zaraz を一部のページで止めていた Configuration Rule は消す（2026-11-28 の計画。消したかどうかは `docs/baseline-status.md` の 17-13）。

## GA4 で登録するカスタム定義

GA4 → 管理 → カスタム定義。登録しないとレポートに出ない（さかのぼっても出ない）。ほかのアプリで登録済みの名前は登録し直さなくてよい（同じ名前のパラメーターは共通）。

| 種類 | 名前（パラメーター） | 範囲・単位 |
|---|---|---|
| カスタムディメンション | `button`, `control`, `value`, `ui_lang`, `tuning`, `chord`, `region`, `from`, `mode` | イベント |
| カスタム指標 | `seconds` | イベント・秒 |
| カスタム指標 | `files` | イベント・標準 |
| カスタム指標 | `shapes` | イベント・標準 |
| カスタム指標 | `regions` | イベント・標準 |
| カスタム指標 | `strings` | イベント・標準 |

## 確かめ方

- ローカル: Playwright の `context.route("**/cdn-cgi/zaraz/i.js")` に `window.zaraz = { track() {…}, showConsentModal() {…} }` の代わりを返させ、送られるイベントを見る（ベースライン §17-12）。Playwright の `selectOption` などは `isTrusted` でないイベントを起こすので数えられない。キーボード（`focus` → `ArrowDown`）かクリックで操作する。
- 本番: ブラウザのコンソールで `zaraz.debug("<Debug key>")` を実行して再読み込みすると、Zaraz の送信内容が表示される。GA4 の「リアルタイム」・DebugView にも出る。
