// Chord diagrams and tables for the articles, computed with the app's own logic
// (public/guitarchordfinder/chords.js), so the pages always match what the app shows.
import { createRequire } from "node:module";
import { wideTable, escapeHtml } from "./layout.mjs";

const GCF = createRequire(import.meta.url)("../../public/guitarchordfinder/chords.js");
export { GCF };

const NOTE_PC = { C: 0, "C#": 1, Db: 1, D: 2, "D#": 3, Eb: 3, E: 4, F: 5, "F#": 6, Gb: 6, G: 7, "G#": 8, Ab: 8, A: 9, "A#": 10, Bb: 10, B: 11 };
const pc = (note) => {
  if (!(note in NOTE_PC)) throw new Error("bad note " + note);
  return NOTE_PC[note];
};

// A chord name such as "Bm7", "A7sus4", or "G/D" → { root, qual, slash }
export function parseChord(name) {
  const m = name.match(/^([A-G][#b]?)(.*?)(?:\/([A-G][#b]?))?$/);
  if (!m) throw new Error("bad chord " + name);
  const qual = m[2] === "add9" || m[2] === "m(add9)" || m[2] === "m7♭5" ? { add9: "add9", "m(add9)": "madd9", "m7♭5": "m7b5" }[m[2]] : m[2];
  if (!GCF.QUALS.some((q) => q.id === qual)) throw new Error(`chord type "${m[2]}" is not in the app (${name})`);
  return { root: pc(m[1]), qual, slash: m[3] ? pc(m[3]) : null };
}

export const tuningOf = (preset) => {
  const p = GCF.PRESETS.find((x) => x.name === preset);
  if (!p) throw new Error("unknown preset " + preset);
  return p.notes;
};

// Best shape per position: { low, mid, high } (each { sh, barre } or null)
export function shapes(tuning, chord) {
  const c = parseChord(chord);
  const r = GCF.search({ tuning, ...c });
  const pick = (k) => r.byRegion[k][0] || null;
  return { q: r.q, root: c.root, low: pick("low"), mid: pick("mid"), high: pick("high") };
}

// First available shape, preferring the low (open) position
const firstShape = (s) => s.low || s.mid || s.high;

// Grid of chord diagrams (one shape per chord, the low position when there is one)
export function chordGrid(lang, tuning, chords) {
  const figs = chords.map((name) => {
    const s = shapes(tuning, name);
    const shape = firstShape(s);
    if (!shape) throw new Error(`no shape for ${name} in ${tuning}`);
    const tab = GCF.fmtTab(shape.sh);
    const svg = GCF.diagram(shape.sh, shape.barre, s.q, s.root, tuning).replace(
      /aria-label="[^"]*"/,
      `aria-label="${escapeHtml(name)} ${lang === "ja" ? "の押さえ方" : "chord diagram"}: ${tab}"`
    );
    return `  <figure class="chord">${svg}<figcaption><b>${escapeHtml(name)}</b><code>${tab}</code></figcaption></figure>`;
  });
  return `<div class="chords">\n${figs.join("\n")}\n</div>`;
}

// Table of shapes in all three positions
export function shapeTable(lang, tuning, chords) {
  const H = lang === "ja"
    ? ["コード", "ロー（開放弦）", "ミドル（3〜6 フレット）", "ハイ（7 フレット以上）"]
    : ["Chord", "Low (open)", "Middle (frets 3–6)", "High (fret 7+)"];
  const cell = (x) => (x ? `<td class="num">${GCF.fmtTab(x.sh)}</td>` : `<td class="dim">—</td>`);
  const rows = chords
    .map((name) => {
      const s = shapes(tuning, name);
      return `      <tr><th scope="row">${escapeHtml(name)}</th>${cell(s.low)}${cell(s.mid)}${cell(s.high)}</tr>`;
    })
    .join("\n");
  return wideTable(lang, `<table>
    <thead><tr>${H.map((h) => `<th scope="col">${h}</th>`).join("")}</tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>`);
}

// Strings from the 6th: "D A D G A D"
export const noteNames = (tuning) => tuning.map((p) => GCF.SHARP[p]).join(" ");

// How to retune from standard, one entry per changed string: [{ string: 6, from: "E", to: "D", semitones: -2 }]
export function retune(tuning) {
  const off = GCF.offsets(tuning);
  const STD = [4, 9, 2, 7, 11, 4];
  return off
    .map((d, i) => ({ string: 6 - i, from: GCF.SHARP[STD[i]], to: GCF.SHARP[tuning[i]], semitones: d }))
    .filter((x) => x.semitones !== 0);
}

export function retuneList(lang, tuning) {
  const items = retune(tuning).map((x) => {
    const n = Math.abs(x.semitones);
    if (lang === "ja") {
      const dir = x.semitones < 0 ? "下げる" : "上げる";
      return `<li>${x.string}弦: ${x.from} → <b>${x.to}</b>（半音 ${n} つ${dir}）</li>`;
    }
    const ord = { 1: "1st", 2: "2nd", 3: "3rd" }[x.string] || `${x.string}th`;
    return `<li>${ord} string: ${x.from} → <b>${x.to}</b> (${x.semitones < 0 ? "down" : "up"} ${n} semitone${n > 1 ? "s" : ""})</li>`;
  });
  return `<ul>\n  ${items.join("\n  ")}\n</ul>`;
}

// Name of the chord the open strings make (the app's first answer)
export function openChord(tuning) {
  const c = GCF.identify(tuning, tuning[0]);
  return c.length ? c[0].n : null;
}
