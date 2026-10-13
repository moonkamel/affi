// Génère l'infographie « Calendrier de la facture électronique 2026-2027 » (PNG 1080 × 1350, format portrait
// adapté à LinkedIn et Pinterest) dans public/infographies/. À relancer si le calendrier change : `npm run infographie`.
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/infographies');
const FONT = (f) => 'data:font/woff2;base64,' + readFileSync(join(ROOT, 'public/fonts', f)).toString('base64');

const steps = [
  { date: 'Dès maintenant', tag: 'Toutes les entreprises', title: 'Choisir sa plateforme agréée', text: 'Vérifier que son logiciel de facturation est plateforme agréée (PA) ou connecté à l’une d’elles.', color: '#8fa5ff' },
  { date: '1er septembre 2026', tag: 'Toutes les entreprises', title: 'Réception obligatoire', text: 'Toutes les entreprises assujetties à la TVA, micro-entreprises comprises, doivent pouvoir recevoir des factures électroniques.', color: '#f7c35a' },
  { date: '1er septembre 2026', tag: 'Grandes entreprises et ETI', title: 'Émission + e-reporting', text: 'Les grandes entreprises et les ETI émettent leurs factures B2B en électronique et transmettent leurs données de vente.', color: '#f7c35a' },
  { date: '1er septembre 2027', tag: 'PME, TPE, micro-entreprises', title: 'Émission + e-reporting', text: 'Factures B2B émises via une plateforme agréée. Ventes aux particuliers et à l’international déclarées en e-reporting.', color: '#4cc98a' },
];

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:B;src:url(${FONT('bricolage.woff2')})}
@font-face{font-family:F;src:url(${FONT('figtree.woff2')})}
*{box-sizing:border-box}
body{margin:0;width:1080px;height:1350px;background:#11131b;color:#eef0f7;font-family:F;position:relative;overflow:hidden}
.halo{position:absolute;right:-200px;top:-200px;width:760px;height:760px;background:radial-gradient(closest-side,#3e2a24,transparent 70%),radial-gradient(closest-side at 30% 70%,#1e2946,transparent 70%)}
.wrap{position:absolute;inset:64px 80px 52px;display:flex;flex-direction:column}
.pill{align-self:flex-start;display:inline-block;font:800 24px B;letter-spacing:.04em;text-transform:uppercase;background:#f7c35a;color:#18213a;padding:8px 18px;border-radius:10px;transform:rotate(-2deg);box-shadow:3px 3px 0 #eef0f7}
h1{font:800 64px/1.04 B;letter-spacing:-.03em;margin:26px 0 12px}
.sub{font-size:27px;color:#a5acbe;margin:0 0 34px}
.tl{position:relative;padding-left:56px}
.tl:before{content:"";position:absolute;left:17px;top:14px;bottom:30px;width:4px;border-radius:4px;background:linear-gradient(#8fa5ff,#f7c35a,#4cc98a)}
.step{position:relative;background:#1c2030;border:2px solid #2c3245;border-radius:18px;padding:18px 24px;margin-bottom:18px;box-shadow:8px 9px 0 -2px #1e2946}
.dot{position:absolute;left:-52px;top:24px;width:30px;height:30px;border-radius:50%;border:5px solid #11131b;box-shadow:0 0 0 3px currentColor}
.date{font:800 30px B;letter-spacing:-.01em}
.tag{display:inline-block;margin-left:12px;font-size:19px;font-weight:700;padding:4px 12px;border-radius:999px;background:#212a4c;color:#c9d3ff;vertical-align:4px}
.title{font:800 27px B;margin:8px 0 4px}
.text{font-size:21px;line-height:1.38;color:#c9cede}
.note{margin-top:8px;font-size:20px;line-height:1.45;color:#a5acbe;border-top:2px dashed #2c3245;padding-top:20px}
.note b{color:#eef0f7}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:20px;color:#a5acbe}
.brand{display:flex;align-items:center;gap:12px;font:800 30px B;color:#eef0f7}
.logo{width:44px;height:44px;border-radius:12px;background:#3d5afe;color:#fff;display:flex;align-items:center;justify-content:center;font:800 26px B;box-shadow:3px 3px 0 #f7c35a}
</style></head><body><div class="halo"></div><div class="wrap">
<span class="pill">Réforme 2026-2027</span>
<h1>Facture électronique :<br>le calendrier à retenir</h1>
<p class="sub">Ce qui change, et quand, pour les TPE, PME et micro-entreprises</p>
<div class="tl">${steps.map((s) => `<div class="step"><span class="dot" style="color:${s.color};background:${s.color}"></span><div><span class="date" style="color:${s.color}">${s.date}</span><span class="tag">${s.tag}</span></div><div class="title">${s.title}</div><div class="text">${s.text}</div></div>`).join('')}</div>
<div class="note"><b>Formats acceptés :</b> Factur-X, UBL, CII. <b>Un PDF envoyé par e-mail n’est pas une facture électronique.</b> Le portail public sert d’annuaire, pas à facturer.</div>
<div class="foot"><span class="brand"><span class="logo">L</span>Logimalin</span><span>logi-malin.fr · Calendrier en vigueur en octobre 2026</span></div>
</div></body></html>`;

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(OUT, 'calendrier-facture-electronique-2026-2027.png') });
await browser.close();
console.log('PNG généré dans public/infographies/. Reconvertis ensuite la version WebP affichée sur le site :');
console.log('  python3 -c "from PIL import Image; Image.open(\'public/infographies/calendrier-facture-electronique-2026-2027.png\').save(\'public/infographies/calendrier-facture-electronique-2026-2027.webp\', quality=86)"');
