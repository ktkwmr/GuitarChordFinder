// Open G chord chart. Diagrams and tables are computed from the app's logic (chords.mjs).
import { chordGrid, shapeTable, tuningOf, retuneList, noteNames, openChord } from "./chords.mjs";

const T = tuningOf("Open G");
const GRID = ["G", "G5", "C", "D", "D7", "Em", "Em7", "Am", "Am7", "Bm"];
const TABLE = ["G", "G5", "G7", "C", "Cadd9", "D", "D7", "Em", "Em7", "Am", "Am7", "Bm", "A", "E7"];

export default {
  slug: "open-g-chords",
  en: {
    title: "Open G Tuning Chords: Chart with Diagrams",
    heading: "Open G tuning chord chart",
    nav: "Open G chords",
    description:
      "Chord shapes for Open G tuning (D G D G B D) with diagrams: G, C, D, D7, Em, Am, Bm, and more in low, middle, and high positions. How to tune to Open G from standard tuning.",
    body: () => `
<p class="lead">In Open G tuning (${noteNames(T)}), the open strings already make a G major chord. A barre across one fret gives you a major chord, which is why Open G is loved for slide guitar and for rhythm parts in blues and rock.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#tune">How to tune to Open G</a></li>
  <li><a href="#barre">One-finger major chords</a></li>
  <li><a href="#chords">Basic chords</a></li>
  <li><a href="#table">More shapes in every position</a></li>
  <li><a href="#tips">Tips</a></li>
</ol></nav>

<h2 id="tune">How to tune to Open G</h2>
<p>From standard tuning (E A D G B E), lower three strings by a whole step (2 semitones). The 4th, 3rd, and 2nd strings stay the same.</p>
${retuneList("en", T)}
<p>The open strings ring as ${openChord(T)} (a G chord with D in the bass). If you start a strum from the 5th string, you hear G with G in the bass.</p>

<h2 id="barre">One-finger major chords</h2>
<p>Because the open strings make a major chord, laying one finger (or a slide) across all strings at any fret gives another major chord: the 5th fret is C and the 7th fret is D. With G at the open strings, that is the I, IV, and V chords of the key of G — enough for many songs.</p>

<h2 id="chords">Basic chords</h2>
<p>These are the first shapes the app finds for each chord, mostly in the open position. The black dot is the lowest note; the letters in the dots are the intervals (R is the root). “x” means do not play that string.</p>
${chordGrid("en", T, GRID)}

<h2 id="table">More shapes in every position</h2>
<p>The same chords in the low (open strings), middle (around frets 3–6), and high (fret 7 and up) positions. Numbers are frets from the 6th string to the 1st; “—” means the app found no natural shape there.</p>
${shapeTable("en", T, TABLE)}

<h2 id="tips">Tips</h2>
<ul>
  <li><b>Watch the 6th string.</b> It is tuned to D, not G. For a G chord with G in the bass, start from the 5th string, or play the 6th string only when D in the bass sounds right.</li>
  <li><b>Minor chords need more fingers.</b> The open strings are major, so minor chords such as Em and Am take a shape of their own. The app shows several for each.</li>
  <li><b>Other keys:</b> with a capo at the 2nd fret the same shapes play in A; at the 3rd fret, in Bb.</li>
</ul>
<p>See also: <a href="../alternate-tunings/">alternate tunings explained</a>, <a href="../dadgad-chords/">DADGAD chords</a>.</p>
`,
  },
  ja: {
    title: "オープン G チューニングのコード表（ダイアグラム付き）",
    heading: "オープン G チューニングのコード表",
    nav: "オープン G のコード",
    description:
      "オープン G チューニング（D G D G B D）のコードの押さえ方をダイアグラム付きで紹介。G・C・D・D7・Em・Am・Bm などを、ロー・ミドル・ハイのポジションごとに。スタンダードからの合わせ方も。",
    body: () => `
<p class="lead">オープン G チューニング（${noteNames(T)}）では、開放弦を鳴らすだけで G のメジャーコードになります。1 本の指で全部の弦を押さえるとメジャーコードになるので、スライドギターや、ブルース・ロックのリズムギターでよく使われます。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#tune">オープン G への合わせ方</a></li>
  <li><a href="#barre">指 1 本で弾けるメジャーコード</a></li>
  <li><a href="#chords">基本のコード</a></li>
  <li><a href="#table">ポジション別の押さえ方</a></li>
  <li><a href="#tips">弾くときのコツ</a></li>
</ol></nav>

<h2 id="tune">オープン G への合わせ方</h2>
<p>スタンダードチューニング（E A D G B E）から、3 本の弦を全音（半音 2 つ）下げます。4 弦・3 弦・2 弦はそのままです。</p>
${retuneList("ja", T)}
<p>開放弦は ${openChord(T)}（ベースが D の G コード）の響きです。5 弦から弾き始めると、ベースも G になります。</p>

<h2 id="barre">指 1 本で弾けるメジャーコード</h2>
<p>開放弦がメジャーコードなので、どのフレットでも指 1 本（またはスライドバー）で全部の弦を押さえれば、別のメジャーコードになります。5 フレットなら C、7 フレットなら D です。開放の G と合わせて、キー G の I・IV・V がそろうので、これだけで弾ける曲もたくさんあります。</p>

<h2 id="chords">基本のコード</h2>
<p>アプリが最初に見つける押さえ方です（多くは開放弦ポジション）。黒い丸は最低音、丸の中の文字は度数（R がルート）です。「x」の弦は鳴らしません。</p>
${chordGrid("ja", T, GRID)}

<h2 id="table">ポジション別の押さえ方</h2>
<p>同じコードを、ロー（開放弦）・ミドル（3〜6 フレット付近）・ハイ（7 フレット以上）のポジションごとにまとめました。数字は 6 弦から 1 弦までのフレット、「—」はアプリが自然な押さえ方を見つけられなかったところです。</p>
${shapeTable("ja", T, TABLE)}

<h2 id="tips">弾くときのコツ</h2>
<ul>
  <li><b>6 弦に注意。</b>6 弦は G ではなく D です。ベースを G にしたいときは 5 弦から弾き、6 弦はベースが D でよいときだけ鳴らします。</li>
  <li><b>マイナーコードは別の形で。</b>開放弦がメジャーなので、Em や Am などのマイナーコードは専用の押さえ方が必要です。アプリではそれぞれ複数の形を見られます。</li>
  <li><b>ほかのキーは：</b>2 フレットにカポを付ければ同じ押さえ方でキー A、3 フレットならキー B♭ になります。</li>
</ul>
<p>あわせて読みたい: <a href="../alternate-tunings/">変則チューニング入門</a>、<a href="../dadgad-chords/">DADGAD のコード表</a></p>
`,
  },
};
