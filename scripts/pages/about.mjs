// Operator information (site information page, linked from the footer)
const ISSUES = "https://github.com/ktkwmr/GuitarChordFinder/issues";
const REPO = "https://github.com/ktkwmr/GuitarChordFinder";

export default {
  slug: "about",
  schemaType: "AboutPage",
  modified: "2026-10-18",
  en: {
    title: "About This Site",
    heading: "About this site",
    nav: "About this site",
    description: "Operator information for Guitar Chord Finder: who runs the site, how to contact us, disclaimer, and copyright.",
    body: () => `
<div class="table-wrap">
  <table class="text stack">
    <tbody>
      <tr><th scope="row">Site name</th><td>Guitar Chord Finder</td></tr>
      <tr><th scope="row">URL</th><td><a href="/guitarchordfinder/">https://ktkwmr.com/guitarchordfinder/</a></td></tr>
      <tr><th scope="row">Operator</th><td>ktkwmr (individual developer)</td></tr>
      <tr><th scope="row">What we offer</th><td>A free web app that finds guitar chord shapes in any tuning and names a chord from a shape</td></tr>
      <tr><th scope="row">Contact</th><td><a href="${ISSUES}" rel="noopener">GitHub Issues</a></td></tr>
    </tbody>
  </table>
</div>

<h2 id="contact">Contact</h2>
<p>For questions, bug reports, and suggestions, please open an issue on <a href="${ISSUES}" rel="noopener">GitHub Issues</a>. A GitHub account (free) is required.</p>
<p>Issues are public. Do not include personal information. If a shape or a chord name looks wrong, the tuning, the chord, and the shape (for example <code>x 0 2 2 2 0</code>) are enough.</p>

<h2 id="disclaimer">Disclaimer</h2>
<ul>
  <li>We try to make the app accurate, but we do not guarantee that the chord shapes, chord names, or sounds it shows are correct, complete, or the best way to play. Please check them on your instrument.</li>
  <li>We are not responsible for any loss or damage resulting from the use of this site.</li>
  <li>Links to other websites are provided for convenience. We are not responsible for their content.</li>
  <li>The content of this site may be changed or removed, and the service may be stopped, without notice.</li>
</ul>

<h2 id="copyright">Copyright</h2>
<ul>
  <li>The app's source code is published under the <a href="${REPO}/blob/main/LICENSE" rel="noopener">MIT License</a>. Libraries used by the app are listed under Settings → About in the app.</li>
  <li>The text and images on this site are © 2026 ktkwmr.</li>
</ul>

<h2 id="privacy">Privacy</h2>
<p>How this site handles information is described in the <a href="../privacy/">privacy policy</a>.</p>
`,
  },
  ja: {
    title: "運営者情報",
    heading: "運営者情報",
    nav: "運営者情報",
    description: "Guitar Chord Finder の運営者情報。運営者、お問い合わせ先、免責事項、著作権について。",
    body: () => `
<div class="table-wrap">
  <table class="text stack">
    <tbody>
      <tr><th scope="row">サイト名</th><td>Guitar Chord Finder</td></tr>
      <tr><th scope="row">URL</th><td><a href="/guitarchordfinder/ja/">https://ktkwmr.com/guitarchordfinder/ja/</a></td></tr>
      <tr><th scope="row">運営者</th><td>ktkwmr（個人開発者）</td></tr>
      <tr><th scope="row">内容</th><td>ギターの変則チューニングでのコードの押さえ方を探し、押さえ方からコード名を調べられる無料の Web アプリ</td></tr>
      <tr><th scope="row">お問い合わせ</th><td><a href="${ISSUES}" rel="noopener">GitHub の Issues</a></td></tr>
    </tbody>
  </table>
</div>

<h2 id="contact">お問い合わせ</h2>
<p>ご質問・不具合の報告・ご要望は、<a href="${ISSUES}" rel="noopener">GitHub の Issues</a> にお寄せください。投稿には GitHub のアカウント（無料）が必要です。</p>
<p>Issues の内容は公開されます。個人情報は書かないでください。押さえ方やコード名がおかしいときは、チューニング・コード・押さえ方（例: <code>x 0 2 2 2 0</code>）があれば十分です。</p>

<h2 id="disclaimer">免責事項</h2>
<ul>
  <li>アプリの内容はできるだけ正確になるよう努めていますが、表示する押さえ方・コード名・音が正確・完全であること、最適な弾き方であることを保証するものではありません。実際の楽器で確かめてください。</li>
  <li>本サイトの利用によって生じた損害について、運営者は責任を負いません。</li>
  <li>本サイトからリンクしている外部サイトの内容について、運営者は責任を負いません。</li>
  <li>本サイトの内容は、予告なく変更・削除したり、提供を終了したりすることがあります。</li>
</ul>

<h2 id="copyright">著作権</h2>
<ul>
  <li>アプリのソースコードは <a href="${REPO}/blob/main/LICENSE" rel="noopener">MIT ライセンス</a>で公開しています。アプリが使用しているライブラリは、アプリの「設定 → このアプリについて」に掲載しています。</li>
  <li>本サイトの文章と画像の著作権は ktkwmr に帰属します（© 2026 ktkwmr）。</li>
</ul>

<h2 id="privacy">プライバシー</h2>
<p>本サイトでの情報の取り扱いについては<a href="../privacy/">プライバシーポリシー</a>をご覧ください。</p>
`,
  },
};
