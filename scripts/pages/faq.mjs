// Questions and answers. The answers are HTML; build-pages.mjs also puts a plain-text
// copy in the FAQPage structured data.
const EN = [
  {
    q: "Is Guitar Chord Finder free?",
    a: "Yes. It is free to use, with no sign-up or account.",
  },
  {
    q: "Is anything sent to a server?",
    a: 'No. The chord search, the chord names, and the sound all run in your browser. Your settings are saved only in your browser. See the <a href="../privacy/">privacy policy</a>.',
  },
  {
    q: "Which tunings can I use?",
    a: 'Any tuning. Choose one of the presets (Standard, DADGAD, Drop D, DGDGAD, Open D, Open G, Open C, Open E, DADGBD, CGDGBD) or choose Custom and set each string. The app assumes each string is within about half an octave of standard tuning when it plays the sound. See <a href="../alternate-tunings/">alternate tunings explained</a>.',
  },
  {
    q: "Which chords can it find?",
    a: "Major, m, 5, sus2, sus4, add9, m(add9), 6, 7, maj7, m7, 7sus4, m7♭5, dim, dim7, and aug, on any root, and slash chords with any bass note. When you name a shape on the fretboard, the app also recognizes 9th, 11th, and 13th chords and a few others.",
  },
  {
    q: "What do low, middle, and high mean?",
    a: "They are positions on the neck. Low is shapes up to the 4th fret (often with open strings), middle is shapes starting at frets 3 to 6, and high is fret 7 and up. The app shows up to six natural shapes in each; tap “Other shape” to see the next one.",
  },
  {
    q: "Why is a chord missing in one position?",
    a: "The app shows only shapes that are natural to play: four fingers or fewer (a barre counts as one), no fret stretch of more than four frets, the strings you play next to each other, and the root (or the slash-chord bass) as the lowest note. If no shape meets these rules in a position, that position is empty. Try another position, a slash chord, or a capo.",
  },
  {
    q: "How do I read the diagrams?",
    a: "Strings run from the 6th (left) to the 1st (right). The black dot is the lowest note, and the letters in the dots are the intervals of the chord (R is the root). A circle above the nut is an open string, and × means do not play that string. A number at the left shows the starting fret. Under the diagram, the shape is written as frets from the 6th string, such as x 3 2 0 1 0.",
  },
  {
    q: "Can I find the name of a chord I am playing?",
    a: "Yes. Switch to “Shape → chord”, choose the tuning, and press the frets on the fretboard. The app shows the chord name and other possible names. The buttons at the left switch each string between open and muted.",
  },
  {
    q: "There is no sound.",
    a: "Check that your device is not muted. On an iPhone, sound may not play when the silent switch is on. The first sound plays only after you tap a diagram or the Play button.",
  },
  {
    q: "Does it work offline?",
    a: "Yes. After you open the app once, it works without a connection. You can also add it to your home screen: on iPhone or iPad, tap Share and then Add to Home Screen; on Android, use the browser menu.",
  },
  {
    q: "A shape or chord name looks wrong.",
    a: 'Please tell us on <a href="https://github.com/ktkwmr/GuitarChordFinder/issues" rel="noopener">GitHub Issues</a> with the tuning, the chord, and the shape (for example <code>x 0 2 2 2 0</code>).',
  },
];

const JA = [
  {
    q: "無料で使えますか？",
    a: "はい。無料で、登録やアカウントも不要です。",
  },
  {
    q: "何かサーバーに送られますか？",
    a: 'いいえ。押さえ方の検索、コード名の判定、音の再生はすべてブラウザ内で行います。設定もブラウザ内にだけ保存します。詳しくは<a href="../privacy/">プライバシーポリシー</a>をご覧ください。',
  },
  {
    q: "どんなチューニングに対応していますか？",
    a: 'どんなチューニングでも使えます。プリセット（Standard、DADGAD、Drop D、DGDGAD、Open D、Open G、Open C、Open E、DADGBD、CGDGBD）から選ぶか、Custom で弦ごとに音を設定します。音を鳴らすときは、各弦がスタンダードから半オクターブ程度の範囲にあるものとして計算します。<a href="../alternate-tunings/">変則チューニング入門</a>もどうぞ。',
  },
  {
    q: "どんなコードを探せますか？",
    a: "メジャー、m、5、sus2、sus4、add9、m(add9)、6、7、maj7、m7、7sus4、m7♭5、dim、dim7、aug を、すべてのルートで探せます。分数コードはベースの音を選べます。押さえ方からコード名を調べるときは、9th・11th・13th などのコードも判定します。",
  },
  {
    q: "ロー・ミドル・ハイとは何ですか？",
    a: "ネックの上の位置（ポジション）です。ローは 4 フレットまでの形（開放弦を使うことが多い）、ミドルは 3〜6 フレットから始まる形、ハイは 7 フレット以上です。それぞれ自然な押さえ方を最大 6 つ表示し、「別の形」で次の候補を見られます。",
  },
  {
    q: "あるポジションにコードが表示されないのはなぜですか？",
    a: "アプリは、自然に弾ける形だけを表示します。押さえる指は 4 本まで（セーハは 1 本と数えます）、フレットの幅は 4 フレット以内、鳴らす弦は隣り合っていること、最低音がルート（分数コードではベースの音）であることが条件です。この条件に合う形がないポジションは空になります。別のポジション、分数コード、カポを試してください。",
  },
  {
    q: "ダイアグラムの見方を教えてください。",
    a: "弦は左が 6 弦、右が 1 弦です。黒い丸は最低音、丸の中の文字はコードの度数（R がルート）です。ナットの上の丸は開放弦、× はその弦を鳴らさないことを表します。左の数字は始まりのフレットです。ダイアグラムの下には、6 弦から順にフレットを x 3 2 0 1 0 のように書いています。",
  },
  {
    q: "弾いているコードの名前を調べられますか？",
    a: "はい。「押さえ方 → コード」に切り替え、チューニングを選んで指板のマスを押すと、コード名と別の解釈が表示されます。左端のボタンで、弦ごとに開放とミュートを切り替えられます。",
  },
  {
    q: "音が鳴りません。",
    a: "端末の消音や音量を確認してください。iPhone では、消音スイッチがオンだと鳴らないことがあります。最初の音は、ダイアグラムか再生ボタンを押してから鳴ります。",
  },
  {
    q: "オフラインでも使えますか？",
    a: "はい。一度開けば、インターネットに接続していなくても使えます。ホーム画面に追加することもできます。iPhone・iPad では共有ボタン →「ホーム画面に追加」、Android ではブラウザのメニューから追加します。",
  },
  {
    q: "押さえ方やコード名がおかしいときは？",
    a: '<a href="https://github.com/ktkwmr/GuitarChordFinder/issues" rel="noopener">GitHub の Issues</a> で、チューニング・コード・押さえ方（例: <code>x 0 2 2 2 0</code>）を添えてお知らせください。',
  },
];

const list = (items) => `<dl class="faq">\n${items.map((x) => `  <dt>${x.q}</dt>\n  <dd>${x.a}</dd>`).join("\n")}\n</dl>`;

export default {
  slug: "faq",
  faq: true,
  en: {
    title: "Guitar Chord Finder FAQ",
    heading: "Frequently asked questions",
    nav: "FAQ",
    description:
      "Answers to common questions about Guitar Chord Finder: supported tunings and chords, positions, missing shapes, reading the diagrams, naming a chord, sound, offline use, and privacy.",
    faq: EN,
    body: () => `<p class="lead">Short answers to common questions. For step-by-step instructions, see the <a href="../guide/">guide</a>.</p>\n${list(EN)}`,
  },
  ja: {
    title: "よくある質問（FAQ）",
    heading: "よくある質問",
    nav: "よくある質問",
    description:
      "Guitar Chord Finder についてのよくある質問。対応チューニングとコード、ポジション、押さえ方が表示されない理由、ダイアグラムの見方、コード名の調べ方、音、オフライン、プライバシーについて。",
    faq: JA,
    body: () => `<p class="lead">よくある質問への短い回答です。詳しい手順は<a href="../guide/">使い方ガイド</a>をご覧ください。</p>\n${list(JA)}`,
  },
};
