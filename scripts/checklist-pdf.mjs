// Génère la check-list « Facture électronique 2027 » (PDF A4 imprimable + aperçu WebP) dans public/ressources/.
// `npm run checklist`. Thème clair pour l'impression, aux couleurs du site.
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/ressources');
const NAME = 'checklist-facture-electronique-2027';
const FONT = (f) => 'data:font/woff2;base64,' + readFileSync(join(ROOT, 'public/fonts', f)).toString('base64');

// Contenu partagé avec la page /ressources/checklist-facture-electronique-2027/ (check-list interactive).
const sections = JSON.parse(readFileSync(join(ROOT, 'src/data/checklist.json'), 'utf8'));
const total = sections.reduce((n, s) => n + s.items.length, 0);

const box = '<span class="box"></span>';
const html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Check-list facture électronique 2027 – Logimalin</title><style>
@font-face{font-family:B;src:url(${FONT('bricolage.woff2')})}
@font-face{font-family:F;src:url(${FONT('figtree.woff2')})}
@page{size:A4;margin:11mm 13mm 10mm}
*{box-sizing:border-box}
body{margin:0;font-family:F;color:#161a2b;font-size:9.6pt;line-height:1.35}
header{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;border-bottom:2px solid #161a2b;padding-bottom:8px;margin-bottom:9px}
.pill{display:inline-block;font:800 8.5pt B;letter-spacing:.06em;text-transform:uppercase;background:#f7c35a;color:#18213a;padding:3px 9px;border-radius:6px;transform:rotate(-2deg)}
h1{font:800 20pt/1.05 B;letter-spacing:-.02em;margin:6px 0 3px}
.sub{margin:0;color:#4a5068;font-size:11pt}
.brand{display:flex;align-items:center;gap:7px;font:800 13pt B;white-space:nowrap}
.logo{width:24px;height:24px;border-radius:7px;background:#3d5afe;color:#fff;display:flex;align-items:center;justify-content:center;font:800 13pt B}
section{break-inside:avoid;margin:0 0 7px;border:1.2px solid #dde1ec;border-radius:10px;overflow:hidden}
.sh{display:flex;justify-content:space-between;align-items:center;padding:5px 12px;background:#f4f6fb;border-left:5px solid var(--c)}
.sh h2{font:800 12pt B;margin:0}
.when{font-size:8.5pt;font-weight:700;color:#4a5068;text-transform:uppercase;letter-spacing:.04em}
ul{list-style:none;margin:0;padding:2px 12px 3px}
li{display:flex;gap:10px;padding:3.5px 0;border-top:1px dashed #e3e6ef}
li:first-child{border-top:0}
.box{flex:0 0 13px;height:13px;border:1.6px solid #161a2b;border-radius:3px;margin-top:2px}
li b{font-weight:800}
li span.t{color:#4a5068}
footer{margin-top:8px;font-size:8.5pt;color:#4a5068;display:flex;justify-content:space-between;gap:12px;border-top:1px solid #dde1ec;padding-top:6px}
footer b{color:#161a2b}
</style></head><body>
<header><div><span class="pill">Réforme 2026-2027</span><h1>Facture électronique 2027 :<br>la check-list de la TPE</h1><p class="sub">${total} actions pour être prêt au 1er septembre 2027, coche au fur et à mesure.</p></div><div class="brand"><span class="logo">L</span>Logimalin</div></header>
${sections
  .map(
    (s) => `<section style="--c:${s.color}"><div class="sh"><h2>${s.title}</h2><span class="when">${s.when}</span></div><ul>${s.items
      .map(([t, d]) => `<li>${box}<div><b>${t}</b><span class="t">\u00a0: ${d.replace(/ ([?:!;])/g, '\u00a0$1')}</span></div></li>`)
      .join('')}</ul></section>`,
  )
  .join('')}
<footer><span><b>Guides complets et gratuits :</b> logi-malin.fr/facturation/facture-electronique-2026/ · logi-malin.fr/facturation/plateforme-agreee-facture-electronique/</span><span>Version octobre 2026 · Vérifie les règles en vigueur sur impots.gouv.fr</span></footer>
</body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: join(OUT, `${NAME}.pdf`), format: 'A4', printBackground: true, preferCSSPageSize: true });
// Aperçu de la première page (vignette pour la page de téléchargement).
await page.setViewportSize({ width: 794, height: 1123 });
const png = await page.screenshot({ clip: { x: 0, y: 0, width: 794, height: 1123 } });
await sharp(png).resize(600).webp({ quality: 82 }).toFile(join(OUT, `${NAME}.webp`));
await browser.close();
console.log(`Check-list générée (${total} actions) dans public/ressources/`);
