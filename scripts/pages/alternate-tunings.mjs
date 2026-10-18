// Introduction to alternate tunings. The tuning table is computed from the app's presets (chords.mjs).
import { GCF, noteNames, retune, openChord } from "./chords.mjs";
import { wideTable } from "./layout.mjs";

// Articles for some presets
const LINKS = { DADGAD: "dadgad-chords", "Open G": "open-g-chords", "Drop D": "open-d-and-drop-d-chords", "Open D": "open-d-and-drop-d-chords" };

const NOTES = {
  en: {
    Standard: "The usual tuning",
    DADGAD: "Neither major nor minor; Celtic, folk, fingerstyle",
    "Drop D": "Only the 6th string changes; low D for rock and songs in D",
    DGDGAD: "DADGAD with the 5th string lowered to G; suspended sound for G and D",
    "Open D": "Open strings make D; slide, folk",
    "Open G": "Open strings make G; slide, blues, rock rhythm",
    "Open C": "Open strings make C; very low and wide",
    "Open E": "Same shapes as Open D, a step higher; raises three strings",
    DADGBD: "Double drop D: the 6th and 1st strings both at D",
    CGDGBD: "Open G with a low C on the 6th string",
  },
  ja: {
    Standard: "ふつうのチューニング",
    DADGAD: "メジャーでもマイナーでもない響き。ケルト・フォーク・フィンガースタイル",
    "Drop D": "6 弦だけ変える。低い D でロックやキー D の曲に",
    DGDGAD: "DADGAD の 5 弦を G に下げたもの。G や D のキーに合う sus の響き",
    "Open D": "開放弦が D。スライド、フォーク",
    "Open G": "開放弦が G。スライド、ブルース、ロックのリズム",
    "Open C": "開放弦が C。とても低く広がりのある響き",
    "Open E": "オープン D と同じ形で全音高い。3 本の弦を上げる",
    DADGBD: "ダブルドロップ D。6 弦と 1 弦の両方を D に",
    CGDGBD: "オープン G の 6 弦を低い C にしたもの",
  },
};

function tuningTable(lang) {
  const H = lang === "ja"
    ? ["チューニング", "6 弦 → 1 弦", "スタンダードから変える弦", "開放弦の響き", "特徴"]
    : ["Tuning", "6th → 1st string", "Strings to change from standard", "Open strings", "Character"];
  const rows = GCF.PRESETS.map((p) => {
    const changes = retune(p.notes);
    const ch = changes.length
      ? changes.map((x) => `${x.string}${lang === "ja" ? "弦" : ""} ${x.semitones > 0 ? "+" : "−"}${Math.abs(x.semitones)}`).join(", ")
      : "—";
    const name = LINKS[p.name] ? `<a href="../${LINKS[p.name]}/">${p.name}</a>` : p.name;
    return `      <tr><th scope="row">${name}</th><td class="num">${noteNames(p.notes)}</td><td class="num">${ch}</td><td class="chord">${openChord(p.notes) || "—"}</td><td>${NOTES[lang][p.name]}</td></tr>`;
  }).join("\n");
  return wideTable(lang, `<table class="text">
    <thead><tr>${H.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>`);
}

export default {
  slug: "alternate-tunings",
  en: {
    title: "Alternate Guitar Tunings Explained: Open, Drop, and DADGAD",
    heading: "Alternate guitar tunings explained",
    nav: "Alternate tunings explained",
    description:
      "What alternate tunings are, the common ones (DADGAD, Open G, Open D, Drop D, Open C, Open E, and more) with their notes and sound, how to retune safely, and how to find chord shapes in any tuning.",
    body: () => `
<p class="lead">An alternate tuning tunes one or more guitar strings to different notes from standard tuning (E A D G B E). It changes how chords are played and how the guitar sounds: open strings ring in new ways, and some chords become easier.</p>

<nav class="toc" aria-label="Contents"><b>Contents</b><ol>
  <li><a href="#kinds">Three kinds of alternate tunings</a></li>
  <li><a href="#list">Common tunings at a glance</a></li>
  <li><a href="#retune">Retuning safely</a></li>
  <li><a href="#chords">Finding chords in a new tuning</a></li>
</ol></nav>

<h2 id="kinds">Three kinds of alternate tunings</h2>
<ul>
  <li><b>Drop tunings</b> lower only the 6th string (sometimes also the 1st). Drop D is the best known. Most chord shapes stay the same, and you get a lower bass note.</li>
  <li><b>Open tunings</b> tune the open strings to a major chord, such as Open G, Open D, Open C, and Open E. A single finger or a slide across the strings plays a major chord.</li>
  <li><b>Modal tunings</b> leave out the third of the chord, so the open strings are neither major nor minor. DADGAD is the most common.</li>
</ul>

<h2 id="list">Common tunings at a glance</h2>
<p>These are the presets in the app. “Strings to change” shows how many semitones to raise (+) or lower (−) each string from standard tuning. “Open strings” is the chord name the app gives to all six open strings.</p>
${tuningTable("en")}

<h2 id="retune">Retuning safely</h2>
<ul>
  <li><b>Use a tuner</b>, and tune each string up to the note from slightly below. Strings stay in tune better than when you tune down to a note.</li>
  <li><b>Be careful when raising strings.</b> Tunings such as Open E raise strings above standard pitch and add tension to the strings and the neck. If you use such a tuning often, consider lighter strings, or use the same shapes a step lower (Open D) with a capo at the 2nd fret.</li>
  <li><b>Expect some drift.</b> After a big change, the strings stretch and the guitar goes slightly out of tune for a while. Check the tuning again after a few minutes.</li>
</ul>

<h2 id="chords">Finding chords in a new tuning</h2>
<p>In a new tuning, the chord shapes you know no longer work, and it is hard to work out new ones note by note. <a href="../">Guitar Chord Finder</a> does this for you: choose a tuning (or set each string yourself) and a chord, and it shows natural shapes in the low, middle, and high positions that you can listen to. It also works the other way: press frets on the fretboard to see the name of the chord.</p>
<p>Chord charts: <a href="../dadgad-chords/">DADGAD</a>, <a href="../open-g-chords/">Open G</a>, <a href="../open-d-and-drop-d-chords/">Drop D and Open D</a>.</p>
`,
  },
  ja: {
    title: "ギターの変則チューニング入門：オープン・ドロップ・DADGAD",
    heading: "ギターの変則チューニング入門",
    nav: "変則チューニング入門",
    description:
      "変則チューニングとは何か、よく使われるチューニング（DADGAD・オープン G・オープン D・ドロップ D・オープン C・オープン E など）の音と特徴、安全な合わせ方、どんなチューニングでもコードの押さえ方を探す方法を解説します。",
    body: () => `
<p class="lead">変則チューニングは、ギターの弦の一部をスタンダードチューニング（E A D G B E）とは違う音に合わせることです。コードの押さえ方やギターの響きが変わり、開放弦が新しい響きで鳴ったり、弾きやすくなるコードがあったりします。</p>

<nav class="toc" aria-label="目次"><b>目次</b><ol>
  <li><a href="#kinds">変則チューニングの 3 つの種類</a></li>
  <li><a href="#list">よく使われるチューニングの一覧</a></li>
  <li><a href="#retune">安全な合わせ方</a></li>
  <li><a href="#chords">新しいチューニングでコードを探す</a></li>
</ol></nav>

<h2 id="kinds">変則チューニングの 3 つの種類</h2>
<ul>
  <li><b>ドロップチューニング</b>：6 弦だけ（ときには 1 弦も）を下げます。代表はドロップ D です。押さえ方はほとんど変わらず、低い音が出せます。</li>
  <li><b>オープンチューニング</b>：開放弦をメジャーコードに合わせます。オープン G・オープン D・オープン C・オープン E など。指 1 本やスライドバーで全部の弦を押さえるとメジャーコードになります。</li>
  <li><b>モーダルチューニング</b>：コードの 3 度の音を抜き、開放弦がメジャーでもマイナーでもない響きになります。代表は DADGAD です。</li>
</ul>

<h2 id="list">よく使われるチューニングの一覧</h2>
<p>アプリのプリセットにあるチューニングです。「スタンダードから変える弦」は、各弦を何半音上げる（+）か下げる（−）か、「開放弦の響き」は 6 本の開放弦を鳴らしたときにアプリが表示するコード名です。</p>
${tuningTable("ja")}

<h2 id="retune">安全な合わせ方</h2>
<ul>
  <li><b>チューナーを使い</b>、目的の音より少し下から上げて合わせます。上から下げて合わせるより狂いにくくなります。</li>
  <li><b>弦を上げるときは注意。</b>オープン E のように弦をスタンダードより高く上げるチューニングは、弦とネックに負担がかかります。よく使うなら細めの弦にするか、全音低いオープン D の押さえ方で 2 フレットにカポを付ける方法もあります。</li>
  <li><b>しばらくは狂いやすい。</b>大きく音を変えた直後は弦が伸びて少しずつ音が下がります。数分たったらもう一度合わせ直してください。</li>
</ul>

<h2 id="chords">新しいチューニングでコードを探す</h2>
<p>チューニングを変えると、覚えている押さえ方は使えなくなり、1 音ずつ考えて新しい形を探すのは大変です。<a href="../">Guitar Chord Finder</a> なら、チューニング（弦ごとに自分で設定することもできます）とコードを選ぶだけで、ロー・ミドル・ハイのポジションごとに自然な押さえ方を表示し、音で確かめられます。逆に、指板で押さえ方を指定してコード名を調べることもできます。</p>
<p>コード表：<a href="../dadgad-chords/">DADGAD</a>、<a href="../open-g-chords/">オープン G</a>、<a href="../open-d-and-drop-d-chords/">ドロップ D とオープン D</a></p>
`,
  },
};
