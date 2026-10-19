// DADGAD chord chart. Diagrams and tables are computed from the app's logic (chords.mjs).
import { chordGrid, shapeTable, tuningOf, retuneList, noteNames, openChord } from "./chords.mjs";

const T = tuningOf("DADGAD");
const GRID = ["D5", "Dsus4", "D", "Em7", "G/D", "G", "A", "A7sus4", "Bm", "Bm7"];
const TABLE = ["D5", "Dsus4", "D", "Dm", "Em7", "F#m", "G", "G/D", "Gmaj7", "A", "Asus4", "A7sus4", "Bm", "Bm7", "Cadd9"];

export default {
  slug: "dadgad-chords",
  en: {
    title: "DADGAD Chords: Chart with Diagrams",
    heading: "DADGAD chord chart",
    nav: "DADGAD chords",
    description:
      `Chord shapes for DADGAD tuning with diagrams: D5, Dsus4, D, Em7, G, A, A7sus4, Bm, and more, in low, middle, and high positions. How to tune to DADGAD from standard tuning.`,
    body: () => `
<p class="lead">DADGAD (“dad-gad”) is one of the most popular alternate tunings for acoustic guitar. The open strings ring as a ${openChord(T)} chord, so simple shapes sound open and full. This page shows the chord shapes to start with.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#tune">How to tune to DADGAD</a></li>
  <li><a href="#sound">What DADGAD sounds like</a></li>
  <li><a href="#chords">Basic chords</a></li>
  <li><a href="#table">More shapes in every position</a></li>
  <li><a href="#tips">Tips</a></li>
</ol></nav>

<h2 id="tune">How to tune to DADGAD</h2>
<p>From standard tuning (E A D G B E), lower three strings. The 5th, 4th, and 3rd strings stay the same.</p>
${retuneList("en", T)}
<p>The result, from the 6th string, is <b>${noteNames(T)}</b>. Use a tuner, and tune each lowered string up to the note from below, so the strings stay in tune.</p>

<h2 id="sound">What DADGAD sounds like</h2>
<p>The open strings make a ${openChord(T)} chord: there is no third (F# or F), so the sound is neither major nor minor. That is why DADGAD fits Celtic and folk music, fingerstyle playing, and songs in D or G. Shapes that leave some strings open let those open strings ring under the melody.</p>

<h2 id="chords">Basic chords</h2>
<p>These are the first shapes the app finds for each chord, mostly up to the 4th fret. The black dot is the lowest note; the letters in the dots are the intervals (R is the root). “x” means do not play that string.</p>
${chordGrid("en", T, GRID)}
<p>In the key of D, the most used chords are D (or D5 and Dsus4), G, A (or A7sus4), Bm, and Em7. Major G has no shape up to the 4th fret in DADGAD. Around the 5th fret, play <code>x x 5 4 5 5</code>, or let the open 4th string ring with <code>5 5 0 4 5 x</code> (in the app, tap “Other shape”). G/D and Gmaj7 also work in its place.</p>

<h2 id="table">More shapes in every position</h2>
<p>The same chords in the low (up to fret 4, often with open strings), middle (starting at frets 3–6), and high (fret 7 and up) positions. Numbers are frets from the 6th string to the 1st; “—” means the app found no natural shape there.</p>
${shapeTable("en", T, TABLE)}

<h2 id="tips">Tips</h2>
<ul>
  <li><b>Let strings ring.</b> Many DADGAD shapes keep the 1st, 2nd, or 5th string open. Do not mute them; the ringing open strings are the sound of the tuning.</li>
  <li><b>Use a capo for other keys.</b> With a capo at the 2nd fret, the same shapes play in E; at the 5th fret, in G.</li>
  <li><b>Find any chord.</b> In the app, choose DADGAD and any chord to see more shapes, hear them, or name a shape you found yourself.</li>
</ul>
<p>See also: <a href="../alternate-tunings/">alternate tunings explained</a>, <a href="../open-d-and-drop-d-chords/">Open D and Drop D chords</a>.</p>
`,
  },
  ja: {
    title: "DADGAD のコード表（ダイアグラム付き）",
    heading: "DADGAD のコード表",
    nav: "DADGAD のコード",
    description:
      "DADGAD チューニングのコードの押さえ方をダイアグラム付きで紹介。D5・Dsus4・D・Em7・G・A・A7sus4・Bm などを、ロー・ミドル・ハイのポジションごとに。スタンダードからの合わせ方も。",
    body: () => `
<p class="lead">DADGAD（ダドガド）は、アコースティックギターで特によく使われる変則チューニングです。開放弦を鳴らすと ${openChord(T)} の響きになり、簡単な押さえ方でも広がりのある音が出ます。このページでは、まず覚えたいコードの押さえ方を紹介します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#tune">DADGAD への合わせ方</a></li>
  <li><a href="#sound">DADGAD の響き</a></li>
  <li><a href="#chords">基本のコード</a></li>
  <li><a href="#table">ポジション別の押さえ方</a></li>
  <li><a href="#tips">弾くときのコツ</a></li>
</ol></nav>

<h2 id="tune">DADGAD への合わせ方</h2>
<p>スタンダードチューニング（E A D G B E）から、3 本の弦を下げます。5 弦・4 弦・3 弦はそのままです。</p>
${retuneList("ja", T)}
<p>6 弦から順に <b>${noteNames(T)}</b> になります。チューナーを使い、下げた弦は一度少し下げすぎてから目的の音まで上げると、チューニングが狂いにくくなります。</p>

<h2 id="sound">DADGAD の響き</h2>
<p>開放弦は ${openChord(T)} の和音です。3 度の音（F# や F）がないので、メジャーともマイナーともつかない響きになります。そのため、ケルト音楽やフォーク、フィンガースタイル、キーが D や G の曲によく合います。開放弦を残した押さえ方なら、メロディーの下で開放弦が鳴り続けます。</p>

<h2 id="chords">基本のコード</h2>
<p>アプリが最初に見つける押さえ方です（多くは 4 フレットまでのロー）。黒い丸は最低音、丸の中の文字は度数（R がルート）です。「x」の弦は鳴らしません。</p>
${chordGrid("ja", T, GRID)}
<p>キー D でよく使うのは、D（または D5・Dsus4）、G、A（または A7sus4）、Bm、Em7 です。G のメジャーコードは、DADGAD では 4 フレットまでの形がありません。5 フレット付近の <code>x x 5 4 5 5</code> か、開放の 4 弦を響かせる <code>5 5 0 4 5 x</code>（アプリでは「別の形」で表示）で弾きます。G/D や Gmaj7 で代わりに弾くこともできます。</p>

<h2 id="table">ポジション別の押さえ方</h2>
<p>同じコードを、ロー（4 フレットまで。開放弦を使うことが多い）・ミドル（3〜6 フレットから）・ハイ（7 フレット以上）のポジションごとにまとめました。数字は 6 弦から 1 弦までのフレット、「—」はアプリが自然な押さえ方を見つけられなかったところです。</p>
${shapeTable("ja", T, TABLE)}

<h2 id="tips">弾くときのコツ</h2>
<ul>
  <li><b>開放弦を響かせる。</b>DADGAD の押さえ方の多くは 1 弦・2 弦・5 弦を開放のまま使います。ミュートせずに鳴らすのが、このチューニングらしい音です。</li>
  <li><b>ほかのキーはカポで。</b>2 フレットにカポを付ければ同じ押さえ方でキー E、5 フレットならキー G になります。</li>
  <li><b>どんなコードでも探せる。</b>アプリで DADGAD とコードを選ぶと、ほかの押さえ方を見たり、音を聞いたり、自分で見つけた押さえ方のコード名を調べたりできます。</li>
</ul>
<p>あわせて読みたい: <a href="../alternate-tunings/">変則チューニング入門</a>、<a href="../open-d-and-drop-d-chords/">オープン D とドロップ D のコード表</a></p>
`,
  },
};
