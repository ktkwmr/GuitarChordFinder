#!/usr/bin/env node
// Takes the app screenshots used in the guide page:
//   public/guitarchordfinder/images/guide/{en,ja}-{overview,phone,reverse}.png
// Requires Playwright, as for scripts/render-og-image.mjs:
//   npm install --no-save playwright && npx playwright install chromium
//   (or: npm install --no-save playwright-core, and set PW_CHANNEL=msedge or chrome)
// Then:
//   node scripts/render-guide-images.mjs
// Re-run it when the app's look changes.
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const { chromium } = await import("playwright").catch(() => import("playwright-core"));
const PUBLIC = fileURLToPath(new URL("../public/", import.meta.url));
const OUT = join(PUBLIC, "guitarchordfinder/images/guide/");
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".md": "text/markdown; charset=utf-8" };
const PATH = { en: "/guitarchordfinder/?lang=en", ja: "/guitarchordfinder/ja/" };

// Minimal static server for public/ (the app needs http:// for its absolute paths)
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
  if (path.endsWith("/")) path += "index.html";
  const file = normalize(join(PUBLIC, path));
  if (!file.startsWith(PUBLIC)) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": TYPES[extname(file)] || "application/octet-stream" }).end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

// Numbered markers drawn next to controls, matching the numbered list in the guide.
// side: "left" | "right" | "inside" (top-right corner of the element)
async function addMarkers(page, targets) {
  await page.evaluate((targets) => {
    targets.forEach(([sel, n, side]) => {
      const el = [...document.querySelectorAll(sel)].find((e) => e.getBoundingClientRect().width > 0);
      if (!el) throw new Error("marker target not found: " + sel);
      const r = el.getBoundingClientRect();
      const m = document.createElement("div");
      m.textContent = n;
      const size = 22;
      const x = side === "left" ? r.left - size - 4 : side === "inside" ? r.right - size - 6 : r.right + 4;
      const y = side === "inside" ? r.top + 6 : r.top + r.height / 2 - size / 2;
      Object.assign(m.style, {
        position: "absolute", left: x + scrollX + "px", top: y + scrollY + "px", width: size + "px", height: size + "px", zIndex: 99999,
        borderRadius: "50%", background: "#e11d48", color: "#fff", font: "700 13px/22px system-ui, sans-serif",
        textAlign: "center", boxShadow: "0 0 0 2px #fff", pointerEvents: "none",
      });
      document.body.appendChild(m);
    });
  }, targets);
}

// Example: DADGAD, D, with the first card shown
async function setUp(page, lang, { tuning = "DADGAD", root = "D", qual = 0 } = {}) {
  await page.goto(origin + PATH[lang]);
  await page.evaluate(({ tuning, root, qual }) => {
    const pick = (box, text) => [...document.querySelectorAll(`#${box} .chip`)].find((b) => b.textContent === text).click();
    pick("presets", tuning);
    pick("roots", root);
    document.querySelectorAll("#quals .chip")[qual].click();
  }, { tuning, root, qual });
  await page.waitForTimeout(200);
}

const launch = { channel: process.env.PW_CHANNEL || undefined };
const browser = await chromium.launch(launch);
await mkdir(OUT, { recursive: true });
for (const lang of ["en", "ja"]) {
  // 1. Computer, whole screen with numbered controls
  {
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1, locale: lang });
    const page = await ctx.newPage();
    await setUp(page, lang);
    await addMarkers(page, [
      ["#presets", "1", "right"],
      ["#strings", "2", "right"],
      ["#roots", "3", "right"],
      ["#quals", "4", "right"],
      ["#slashes", "5", "right"],
      ["#playModes", "6", "right"],
      ["#tabFind", "7", "left"],
      ["#grid .card", "8", "inside"],
      ["#grid .chip.next", "9", "right"],
      ["#settingsBtn", "10", "left"],
    ]);
    await page.screenshot({ path: join(OUT, `${lang}-overview.png`), fullPage: true });
    await ctx.close();
  }
  // 2. Phone, results
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 760 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, locale: lang });
    const page = await ctx.newPage();
    await setUp(page, lang);
    await page.evaluate(() => document.querySelector(".panel.out").scrollIntoView());
    await page.waitForTimeout(100);
    await page.screenshot({ path: join(OUT, `${lang}-phone.png`) });
    await ctx.close();
  }
  // 3. Shape → chord (standard tuning, x 3 2 0 1 0)
  {
    const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1, locale: lang });
    const page = await ctx.newPage();
    await setUp(page, lang, { tuning: "Standard", root: "C" });
    await page.click("#tabRev");
    await page.evaluate(() => {
      // Board rows are the 1st string first; each row is the open/mute button then frets 0–14
      // Each press rebuilds the board, so look the row up again every time
      const press = (string, fret) => {
        const row = document.querySelectorAll("#board .sname")[string - 1];
        if (fret < 0) row.querySelector("button").click();
        else {
          let el = row;
          for (let k = 0; k <= fret; k++) el = el.nextElementSibling;
          el.click();
        }
      };
      [[6, -1], [5, 3], [4, 2], [3, 0], [2, 1], [1, 0]].forEach(([s, f]) => press(s, f));
    });
    await page.waitForTimeout(200);
    const el = await page.$(".panel.out");
    await el.screenshot({ path: join(OUT, `${lang}-reverse.png`) });
    await ctx.close();
  }
  console.log(`Wrote the ${lang} screenshots`);
}
await browser.close();
server.close();
