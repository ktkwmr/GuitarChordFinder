// How to use the app. Screenshots: node scripts/render-guide-images.mjs
import { readFileSync } from "node:fs";

const IMAGES = new URL("../../public/guitarchordfinder/images/guide/", import.meta.url);
const SRC = "/guitarchordfinder/images/guide/";

// Width and height from the PNG header, so the page reserves the right space before the image loads
function size(file) {
  const buf = readFileSync(new URL(file, IMAGES));
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

// A screenshot that opens at full size when tapped. half: a 2x screenshot shown at its real size
const img = (lang, name, alt, { half } = {}) => {
  const file = `${lang}-${name}.png`;
  const { w, h } = size(file);
  const style = half ? ` style="max-width:${w / 2}px"` : "";
  return `<a href="${SRC}${file}"><img src="${SRC}${file}" alt="${alt}" width="${w}" height="${h}" loading="lazy" decoding="async"${style}></a>`;
};

export default {
  slug: "guide",
  en: {
    title: "How to Use Guitar Chord Finder: Complete Guide",
    heading: "How to use Guitar Chord Finder",
    nav: "How to use (guide)",
    description:
      "Step-by-step guide to Guitar Chord Finder: choose a tuning and a chord, read the diagrams, compare low, middle, and high positions, listen to shapes, find slash chords, and name a chord from a shape.",
    body: () => `
<p class="lead">Guitar Chord Finder shows how to play any chord in any guitar tuning. This guide walks through every part of the screen.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#quick">Find a chord in three steps</a></li>
  <li><a href="#screen">The screen at a glance</a></li>
  <li><a href="#diagram">Reading the diagrams</a></li>
  <li><a href="#positions">Low, middle, and high positions</a></li>
  <li><a href="#reverse">Name a chord from a shape</a></li>
  <li><a href="#phone">On a phone</a></li>
  <li><a href="#offline">Install the app and use it offline</a></li>
</ol></nav>

<h2 id="quick">Find a chord in three steps</h2>
<ol>
  <li><b>Choose the tuning.</b> Tap a preset such as DADGAD or Open G, or choose Custom and set each string.</li>
  <li><b>Choose the chord:</b> the root (C to B) and the chord type (major, m, 7, sus4, and so on).</li>
  <li><b>Look and listen.</b> The best shapes appear for the low, middle, and high positions. Tap a diagram to hear it.</li>
</ol>

<h2 id="screen">The screen at a glance</h2>
<figure class="shot">
  ${img("en", "overview", "Guitar Chord Finder on a computer: the settings on the left with DADGAD tuning and the chord D selected, and three D chord diagrams on the right. Numbers 1 to 10 mark the controls.")}
  <figcaption>The numbers match the list below. Tap the image to enlarge it.</figcaption>
</figure>
<ol>
  <li><b>Tuning presets</b> – Standard, DADGAD, Drop D, DGDGAD, Open D, Open G, Open C, Open E, DADGBD, and CGDGBD. Custom keeps your own tuning.</li>
  <li><b>Strings</b> – The note of each string, from the 6th (left) to the 1st. Change any of them to make your own tuning. The number below shows how many semitones it is from standard tuning. Under the settings, “Open strings” shows the chord the open strings make.</li>
  <li><b>Root</b> – The note the chord is built on.</li>
  <li><b>Chord type</b> – 16 types, from major and minor to sus, add9, 7th chords, dim, and aug.</li>
  <li><b>Slash-chord bass (optional)</b> – Choose a bass note to find shapes with that note as the lowest, such as D/F#.</li>
  <li><b>Playback</b> – Note by note then the chord, note by note only, or the chord only.</li>
  <li><b>Mode</b> – “Chord → shapes” finds shapes for a chord; “Shape → chord” names the chord you press (see <a href="#reverse">below</a>).</li>
  <li><b>Chord diagram</b> – Tap it to hear the shape.</li>
  <li><b>Other shape</b> – Shows the next shape in the same position. Up to six shapes are shown, best first.</li>
  <li><b>⚙ Settings</b> – How to use, these guides, privacy, and about.</li>
</ol>
<p>Your tuning, chord, and other settings are saved in your browser, so the app opens where you left off.</p>

<h2 id="diagram">Reading the diagrams</h2>
<ul>
  <li>Strings run from the 6th (left) to the 1st (right). The thick line at the top is the nut; when a shape starts higher up the neck, a number at the left shows the starting fret.</li>
  <li><b>Black dot</b> – the lowest note (the root, or the bass of a slash chord). <b>White dots</b> – other chord tones.</li>
  <li><b>Letters in the dots</b> are intervals: R is the root, 3 the third, 5 the fifth, ♭7 the minor seventh, and so on. They show what each finger adds to the chord.</li>
  <li>A circle above the nut is an open string; <b>×</b> means do not play that string. A grey bar shows a barre.</li>
  <li>Under the diagram: the note of each string, then the shape as frets from the 6th string, such as <code>x 3 2 0 1 0</code>.</li>
</ul>

<h2 id="positions">Low, middle, and high positions</h2>
<p>Shapes are grouped by where they sit on the neck: <b>low</b> is up to the 4th fret (often with open strings), <b>middle</b> starts at frets 3 to 6, and <b>high</b> is the 7th fret and up. Comparing them helps you choose a shape that is close to the next chord in a song.</p>
<p>The app keeps only shapes that are natural to play: four fingers or fewer (a barre counts as one), within four frets, with the strings you play next to each other, and with the root (or the chosen bass note) as the lowest note. When a position has no such shape, it says so — try another position, a slash chord, or a capo.</p>

<h2 id="reverse">Name a chord from a shape</h2>
<figure class="shot">
  ${img("en", "reverse", "Shape → chord mode: frets x 3 2 0 1 0 pressed on the fretboard in standard tuning, and the app shows the chord name C with a diagram.")}
</figure>
<p>Switch to <b>Shape → chord</b> and press frets on the fretboard. The app shows the chord name, other possible names, and the notes. The buttons at the left switch a string between open (○) and muted (×); tap a pressed fret again to go back to open. If the chord is one of the types in the finder, “See other shapes” jumps to all its shapes.</p>

<h2 id="phone">On a phone</h2>
<figure class="shot phone">
  ${img("en", "phone", "Guitar Chord Finder on a phone: D chord diagrams in two columns.", { half: true })}
</figure>
<p>On a phone, the settings are at the top and the shapes below them. Scroll the fretboard in Shape → chord sideways to reach the higher frets.</p>

<h2 id="offline">Install the app and use it offline</h2>
<p>After the first visit, the app works without an internet connection. To add it to your home screen, on iPhone or iPad tap Share and then <b>Add to Home Screen</b>; on Android, choose <b>Install app</b> or <b>Add to Home screen</b> in the browser menu.</p>
<p>Next: <a href="../alternate-tunings/">alternate tunings explained</a>, or the chord charts for <a href="../dadgad-chords/">DADGAD</a>, <a href="../open-g-chords/">Open G</a>, and <a href="../open-d-and-drop-d-chords/">Drop D and Open D</a>.</p>
`,
  },
  ja: {
    title: "Guitar Chord Finder の使い方（完全ガイド）",
    heading: "Guitar Chord Finder の使い方",
    nav: "使い方ガイド",
    description:
      "Guitar Chord Finder の使い方を画面写真付きで解説。チューニングとコードの選び方、ダイアグラムの見方、ロー・ミドル・ハイのポジション、音の確認、分数コード、押さえ方からコード名を調べる方法。",
    body: () => `
<p class="lead">Guitar Chord Finder は、どんなギターのチューニングでも、コードの押さえ方を表示するアプリです。このガイドでは、画面の各部分を順に説明します。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#quick">3 ステップでコードを探す</a></li>
  <li><a href="#screen">画面の見方</a></li>
  <li><a href="#diagram">ダイアグラムの見方</a></li>
  <li><a href="#positions">ロー・ミドル・ハイのポジション</a></li>
  <li><a href="#reverse">押さえ方からコード名を調べる</a></li>
  <li><a href="#phone">スマホで使う</a></li>
  <li><a href="#offline">ホーム画面に追加してオフラインで使う</a></li>
</ol></nav>

<h2 id="quick">3 ステップでコードを探す</h2>
<ol>
  <li><b>チューニングを選ぶ。</b>DADGAD やオープン G などのプリセットを押すか、Custom を選んで弦ごとに音を設定します。</li>
  <li><b>コードを選ぶ。</b>ルート（C〜B）とコードの種類（メジャー、m、7、sus4 など）を選びます。</li>
  <li><b>見て、聞く。</b>ロー・ミドル・ハイのポジションごとに、良い押さえ方が表示されます。ダイアグラムを押すと音が鳴ります。</li>
</ol>

<h2 id="screen">画面の見方</h2>
<figure class="shot">
  ${img("ja", "overview", "パソコンで開いた Guitar Chord Finder：左に DADGAD チューニングと D コードを選んだ設定、右に D コードのダイアグラム 3 つ。1〜10 の番号で各部分を示しています。")}
  <figcaption>番号は下の説明と対応しています。画像を押すと拡大できます。</figcaption>
</figure>
<ol>
  <li><b>チューニングのプリセット</b> – Standard、DADGAD、Drop D、DGDGAD、Open D、Open G、Open C、Open E、DADGBD、CGDGBD。Custom は自分で設定したチューニングです。</li>
  <li><b>各弦の音</b> – 左が 6 弦、右が 1 弦です。どれかを変えると、自分だけのチューニングになります。下の数字は、スタンダードから何半音上げ下げしたかです。設定欄の下の「開放弦の響き」には、開放弦を鳴らしたときのコード名が出ます。</li>
  <li><b>ルート</b> – コードの土台になる音です。</li>
  <li><b>コードの種類</b> – メジャー・マイナーから sus、add9、セブンス系、dim、aug まで 16 種類。</li>
  <li><b>分数コードのベース（任意）</b> – ベースの音を選ぶと、その音を最低音にした押さえ方（例: D/F#）を探します。</li>
  <li><b>再生のしかた</b> – 1 音ずつ鳴らしてから和音、1 音ずつだけ、和音だけ、から選べます。</li>
  <li><b>モード</b> – 「コード → 押さえ方」でコードの押さえ方を探し、「押さえ方 → コード」で押さえた形のコード名を調べます（<a href="#reverse">下記</a>）。</li>
  <li><b>ダイアグラム</b> – 押すと音が鳴ります。</li>
  <li><b>別の形</b> – 同じポジションの次の押さえ方を表示します。良い順に最大 6 つです。</li>
  <li><b>⚙ 設定</b> – 使い方、このガイド、プライバシー、このアプリについて。</li>
</ol>
<p>チューニングやコードなどの設定はブラウザに保存されるので、次に開いたときも続きから使えます。</p>

<h2 id="diagram">ダイアグラムの見方</h2>
<ul>
  <li>弦は左が 6 弦、右が 1 弦です。上の太い線はナットで、ネックの高い位置から始まる形では、左の数字が始まりのフレットを表します。</li>
  <li><b>黒い丸</b> – 最低音（ルート、分数コードではベースの音）。<b>白い丸</b> – そのほかの構成音。</li>
  <li><b>丸の中の文字</b>は度数です。R がルート、3 が 3 度、5 が 5 度、♭7 が短 7 度など。それぞれの指がコードのどの音を担当しているかがわかります。</li>
  <li>ナットの上の丸は開放弦、<b>×</b> はその弦を鳴らさないことを表します。灰色の帯はセーハ（1 本の指で複数の弦を押さえる）です。</li>
  <li>ダイアグラムの下には各弦の音名、その下に 6 弦から順のフレットを <code>x 3 2 0 1 0</code> のように書いています。</li>
</ul>

<h2 id="positions">ロー・ミドル・ハイのポジション</h2>
<p>押さえ方は、ネックのどこで押さえるかでまとめています。<b>ロー</b>は 4 フレットまでの形（開放弦を使うことが多い）、<b>ミドル</b>は 3〜6 フレットから始まる形、<b>ハイ</b>は 7 フレット以上です。比べてみると、曲の中で次のコードに移りやすい形を選べます。</p>
<p>アプリが表示するのは、自然に弾ける形だけです。押さえる指は 4 本まで（セーハは 1 本と数えます）、4 フレットの幅に収まること、鳴らす弦が隣り合っていること、最低音がルート（または選んだベースの音）であることが条件です。条件に合う形がないポジションにはその旨を表示します。別のポジション、分数コード、カポを試してください。</p>

<h2 id="reverse">押さえ方からコード名を調べる</h2>
<figure class="shot">
  ${img("ja", "reverse", "「押さえ方 → コード」モード：スタンダードチューニングの指板で x 3 2 0 1 0 を押さえると、コード名 C とダイアグラムが表示されます。")}
</figure>
<p><b>押さえ方 → コード</b>に切り替え、指板のマスを押します。コード名、別の解釈、鳴っている音が表示されます。左端のボタンで弦を開放（○）とミュート（×）に切り替えられ、押したマスをもう一度押すと開放に戻ります。コード探しで選べる種類のコードなら、「他の押さえ方を見る」でその押さえ方の一覧に移れます。</p>

<h2 id="phone">スマホで使う</h2>
<figure class="shot phone">
  ${img("ja", "phone", "スマホで開いた Guitar Chord Finder：D コードのダイアグラムが 2 列で並んでいます。", { half: true })}
</figure>
<p>スマホでは、上に設定、その下に押さえ方が表示されます。「押さえ方 → コード」の指板は、横にスクロールすると高いフレットまで使えます。</p>

<h2 id="offline">ホーム画面に追加してオフラインで使う</h2>
<p>一度開けば、インターネットに接続していなくても使えます。ホーム画面に追加するには、iPhone・iPad では共有ボタン →「<b>ホーム画面に追加</b>」、Android ではブラウザのメニューから「<b>アプリをインストール</b>」または「<b>ホーム画面に追加</b>」を選びます。</p>
<p>次に読む: <a href="../alternate-tunings/">変則チューニング入門</a>、コード表（<a href="../dadgad-chords/">DADGAD</a>・<a href="../open-g-chords/">オープン G</a>・<a href="../open-d-and-drop-d-chords/">ドロップ D とオープン D</a>）</p>
`,
  },
};
