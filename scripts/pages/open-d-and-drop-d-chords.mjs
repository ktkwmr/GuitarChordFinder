// Open D and Drop D chord charts. Diagrams and tables are computed from the app's logic (chords.mjs).
import { chordGrid, shapeTable, tuningOf, retuneList, noteNames, openChord } from "./chords.mjs";

const DROP = tuningOf("Drop D");
const OPEN = tuningOf("Open D");
const DROP_GRID = ["D5", "D", "Dm", "D7", "G", "A", "A7", "Bm", "Em", "C"];
const DROP_TABLE = ["D5", "D", "Dm", "D7", "E5", "Em", "F", "G", "G5", "A", "A5", "A7", "Bm", "C"];
const OPEN_GRID = ["D", "D5", "Dsus4", "G", "A", "A7", "Bm", "Em", "F#m", "Dm"];
const OPEN_TABLE = ["D", "D5", "Dsus4", "Dm", "Em", "F#m", "G", "Gmaj7", "A", "Asus4", "A7", "Bm"];

export default {
  slug: "open-d-and-drop-d-chords",
  en: {
    title: "Drop D and Open D Chords: Charts with Diagrams",
    heading: "Drop D and Open D chord charts",
    nav: "Drop D and Open D chords",
    description:
      "Chord shapes for Drop D (D A D G B E) and Open D (D A D F# A D) tunings with diagrams, in low, middle, and high positions, and how to tune to each from standard tuning.",
    body: () => `
<p class="lead">Drop D and Open D both lower the 6th string to D, so chords in the key of D get a deep low root. Drop D changes only one string, so most standard shapes still work. Open D changes four strings, so the open strings ring as a D major chord.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#drop">Drop D (D A D G B E)</a></li>
  <li><a href="#drop-chords">Drop D chords</a></li>
  <li><a href="#open">Open D (D A D F# A D)</a></li>
  <li><a href="#open-chords">Open D chords</a></li>
  <li><a href="#which">Which one should I use?</a></li>
</ol></nav>

<h2 id="drop">Drop D (${noteNames(DROP)})</h2>
<p>Lower only the 6th string:</p>
${retuneList("en", DROP)}
<p>A quick check: the 6th string at the 7th fret should sound the same as the open 5th string (A). Chord shapes on the top five strings are the same as in standard tuning; only chords that use the 6th string change. The open 6th, 5th, and 4th strings make a D5 power chord, so one finger across those strings at any fret plays a power chord.</p>

<h2 id="drop-chords">Drop D chords</h2>
<p>The first shapes the app finds for each chord. The black dot is the lowest note; the letters in the dots are the intervals (R is the root). “x” means do not play that string.</p>
${chordGrid("en", DROP, DROP_GRID)}
<p>All positions (numbers are frets from the 6th string to the 1st; “—” means no natural shape was found there):</p>
${shapeTable("en", DROP, DROP_TABLE)}

<h2 id="open">Open D (${noteNames(OPEN)})</h2>
<p>From standard tuning, change four strings. The 5th and 4th strings stay the same.</p>
${retuneList("en", OPEN)}
<p>The open strings ring as ${openChord(OPEN)}. As in Open G, one finger (or a slide) across all strings at a fret plays a major chord: the 5th fret is G and the 7th fret is A, the I, IV, and V chords of D.</p>

<h2 id="open-chords">Open D chords</h2>
${chordGrid("en", OPEN, OPEN_GRID)}
<p>All positions:</p>
${shapeTable("en", OPEN, OPEN_TABLE)}

<h2 id="which">Which one should I use?</h2>
<ul>
  <li><b>Drop D</b> if you want a heavier low end but still play mostly standard shapes — common in rock and for songs in D.</li>
  <li><b>Open D</b> for slide guitar and for ringing open-string sounds in folk and fingerstyle. Minor chords take more effort, because the open strings are major.</li>
  <li><b>DADGAD</b> sits in between: it is Open D with the 3rd string at G instead of F#. See <a href="../dadgad-chords/">DADGAD chords</a>.</li>
</ul>
<p>See also: <a href="../alternate-tunings/">alternate tunings explained</a>.</p>
`,
  },
  ja: {
    title: "ドロップ D とオープン D のコード表（ダイアグラム付き）",
    heading: "ドロップ D とオープン D のコード表",
    nav: "ドロップ D・オープン D のコード",
    description:
      "ドロップ D（D A D G B E）とオープン D（D A D F# A D）のコードの押さえ方をダイアグラム付きで紹介。ロー・ミドル・ハイのポジションごとの押さえ方と、スタンダードからの合わせ方。",
    body: () => `
<p class="lead">ドロップ D とオープン D は、どちらも 6 弦を D に下げるチューニングで、キー D の曲で低い D のルートが鳴らせます。ドロップ D は変える弦が 1 本だけなので、ほとんどの押さえ方がスタンダードと同じです。オープン D は 4 本の弦を変え、開放弦が D メジャーのコードになります。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#drop">ドロップ D（D A D G B E）</a></li>
  <li><a href="#drop-chords">ドロップ D のコード</a></li>
  <li><a href="#open">オープン D（D A D F# A D）</a></li>
  <li><a href="#open-chords">オープン D のコード</a></li>
  <li><a href="#which">どちらを使えばいい？</a></li>
</ol></nav>

<h2 id="drop">ドロップ D（${noteNames(DROP)}）</h2>
<p>6 弦だけを下げます。</p>
${retuneList("ja", DROP)}
<p>確かめ方：6 弦の 7 フレットと 5 弦の開放（A）が同じ音になれば合っています。5 弦から 1 弦までの押さえ方はスタンダードと同じで、6 弦を使うコードだけが変わります。6 弦・5 弦・4 弦の開放は D5 のパワーコードになるので、この 3 本を指 1 本で押さえれば、どのフレットでもパワーコードが弾けます。</p>

<h2 id="drop-chords">ドロップ D のコード</h2>
<p>アプリが最初に見つける押さえ方です。黒い丸は最低音、丸の中の文字は度数（R がルート）です。「x」の弦は鳴らしません。</p>
${chordGrid("ja", DROP, DROP_GRID)}
<p>ポジション別の押さえ方（数字は 6 弦から 1 弦までのフレット、「—」は自然な押さえ方が見つからなかったところ）：</p>
${shapeTable("ja", DROP, DROP_TABLE)}

<h2 id="open">オープン D（${noteNames(OPEN)}）</h2>
<p>スタンダードチューニングから 4 本の弦を変えます。5 弦と 4 弦はそのままです。</p>
${retuneList("ja", OPEN)}
<p>開放弦は ${openChord(OPEN)} の響きです。オープン G と同じく、指 1 本（またはスライドバー）で全部の弦を押さえるとメジャーコードになります。5 フレットなら G、7 フレットなら A で、キー D の I・IV・V がそろいます。</p>

<h2 id="open-chords">オープン D のコード</h2>
${chordGrid("ja", OPEN, OPEN_GRID)}
<p>ポジション別の押さえ方：</p>
${shapeTable("ja", OPEN, OPEN_TABLE)}

<h2 id="which">どちらを使えばいい？</h2>
<ul>
  <li><b>ドロップ D</b>：押さえ方はほぼスタンダードのまま、低音を太くしたいとき。ロックや、キー D の曲でよく使われます。</li>
  <li><b>オープン D</b>：スライドギターや、開放弦を響かせるフォーク・フィンガースタイルに。開放弦がメジャーなので、マイナーコードは少し押さえにくくなります。</li>
  <li><b>DADGAD</b> はその中間で、オープン D の 3 弦を F# ではなく G にしたものです。<a href="../dadgad-chords/">DADGAD のコード表</a>もどうぞ。</li>
</ul>
<p>あわせて読みたい: <a href="../alternate-tunings/">変則チューニング入門</a></p>
`,
  },
};
