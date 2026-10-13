// Génère les infographies du site (PNG 1080 × 1350 pour le partage + WebP pour l'affichage) dans public/infographies/,
// à partir de src/data/infographics.json. Format portrait adapté à LinkedIn et Pinterest.
//   npm run infographie            → toutes les infographies
//   npm run infographie -- <slug>  → une seule
// Utilise Chromium via playwright-core (définis CHROME_PATH si besoin) et sharp pour le WebP.
import { chromium } from 'playwright-core';
import sharp from 'sharp';
import { readFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/infographies');
const DATA = JSON.parse(readFileSync(join(ROOT, 'src/data/infographics.json'), 'utf8'));
const DOMAIN = 'logi-malin.fr';
const FONT = (f) => 'data:font/woff2;base64,' + readFileSync(join(ROOT, 'public/fonts', f)).toString('base64');
const C = { blue: '#8fa5ff', sun: '#f7c35a', green: '#4cc98a', red: '#ff7a6e' };

const blocks = {
  timeline: (b) =>
    `<div class="tl${b.compact ? ' compact' : ''}">${b.steps
      .map(
        (s) =>
          `<div class="step"><span class="dot" style="color:${C[s.color]};background:${C[s.color]}"></span><div><span class="date" style="color:${C[s.color]}">${s.date}</span><span class="tag">${s.tag}</span></div><div class="title">${s.title}</div><div class="text">${s.text}</div></div>`,
      )
      .join('')}</div>`,
  stats: (b) =>
    `<div class="stats${b.three ? ' three' : ''}">${b.items
      .map((s) => `<div class="stat" style="--c:${C[s.color]}"><div class="v">${s.value}</div><div class="l">${s.label}</div><div class="s">${s.sub}</div></div>`)
      .join('')}</div>`,
  table: (b) =>
    `<table class="tbl${b.big ? ' big' : ''}${b.nowrap ? ' nowrap' : ''}"><thead><tr>${b.head.map((h) => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.rows
      .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
      .join('')}</tbody></table>`,
  check: (b) =>
    `<div class="check-wrap"${b.color ? ` style="--c:${C[b.color]}"` : ''}>${b.title ? `<div class="check-title">${b.title}</div>` : ''}<div class="check">${b.items
      .map((i) => `<div class="ci"><span class="tick"><svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#11131b" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div><b>${i.t}</b><span>${i.s}</span></div></div>`)
      .join('')}</div></div>`,
  steps: (b) =>
    `<div class="steps">${b.items
      .map((i, n) => `<div class="st"><span class="num">${n + 1}</span><div><div class="title">${i.t}</div><div class="text">${i.s}</div></div></div>`)
      .join('')}</div>`,
  formula: (b) =>
    `<div class="formula"><div class="fl">${b.label}</div><div class="fx">${b.expr}</div>${b.example ? `<div class="fe">${b.example}</div>` : ''}</div>`,
  cards: (b) =>
    `<div class="cards">${b.items
      .map(
        (i) =>
          `<div class="cd" style="--c:${C[i.color]}"><span class="ic">${i.icon === 'ok' ? '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="#11131b" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>' : i.icon === 'ko' ? '<svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="#11131b" stroke-width="3.4" stroke-linecap="round"/></svg>' : i.icon}</span><div><div class="title">${i.t}</div><div class="text">${i.s}</div></div></div>`,
      )
      .join('')}</div>`,
};

const css = `
@font-face{font-family:B;src:url(${FONT('bricolage.woff2')})}
@font-face{font-family:F;src:url(${FONT('figtree.woff2')})}
*{box-sizing:border-box}
body{margin:0;width:1080px;height:1350px;background:#11131b;color:#eef0f7;font-family:F;position:relative;overflow:hidden}
.halo{position:absolute;right:-200px;top:-200px;width:760px;height:760px;background:radial-gradient(closest-side,#3e2a24,transparent 70%),radial-gradient(closest-side at 30% 70%,#1e2946,transparent 70%)}
.wrap{position:absolute;inset:64px 80px 52px;display:flex;flex-direction:column}
.pill{align-self:flex-start;display:inline-block;font:800 24px B;letter-spacing:.04em;text-transform:uppercase;background:#f7c35a;color:#18213a;padding:8px 18px;border-radius:10px;transform:rotate(-2deg);box-shadow:3px 3px 0 #eef0f7}
h1{font:800 64px/1.04 B;letter-spacing:-.03em;margin:26px 0 12px}
.sub{font-size:27px;color:#a5acbe;margin:0 0 30px}
.body{display:flex;flex-direction:column;gap:22px}
.title{font:800 27px B;margin:6px 0 4px}
.text{font-size:21px;line-height:1.38;color:#c9cede}
.text b{color:#eef0f7}
/* timeline */
.tl{position:relative;padding-left:56px}
.tl:before{content:"";position:absolute;left:17px;top:14px;bottom:30px;width:4px;border-radius:4px;background:linear-gradient(#8fa5ff,#f7c35a,#4cc98a)}
.step{position:relative;background:#1c2030;border:2px solid #2c3245;border-radius:18px;padding:18px 24px;margin-bottom:18px;box-shadow:8px 9px 0 -2px #1e2946}
.compact .step{padding:13px 22px;margin-bottom:13px}
.compact .title{font-size:24px;margin:3px 0 2px}
.compact .text{font-size:20px}
.dot{position:absolute;left:-52px;top:22px;width:30px;height:30px;border-radius:50%;border:5px solid #11131b;box-shadow:0 0 0 3px currentColor}
.date{font:800 30px B;letter-spacing:-.01em}
.tag{display:inline-block;margin-left:12px;font-size:19px;font-weight:700;padding:4px 12px;border-radius:999px;background:#212a4c;color:#c9d3ff;vertical-align:4px}
/* stats */
.stats{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.stats.three{grid-template-columns:1fr 1fr 1fr}
.stat{background:#1c2030;border:2px solid #2c3245;border-top:6px solid var(--c);border-radius:18px;padding:18px 22px;box-shadow:8px 9px 0 -2px #1e2946}
.stat .v{font:800 52px/1 B;letter-spacing:-.03em;color:var(--c)}
.three .stat .v{font-size:29px;white-space:nowrap}
.stat .l{font:800 23px B;margin:10px 0 4px}
.stat .s{font-size:19px;line-height:1.35;color:#a5acbe}
/* table */
.tbl{width:100%;border-collapse:separate;border-spacing:0;background:#1c2030;border:2px solid #2c3245;border-radius:18px;overflow:hidden;box-shadow:8px 9px 0 -2px #1e2946}
.tbl th{text-align:left;font-size:17px;letter-spacing:.06em;text-transform:uppercase;color:#a5acbe;padding:14px 18px;background:#181b26}
.tbl td{font-size:21px;padding:13px 18px;border-top:2px solid #2c3245;line-height:1.3}
.tbl td:first-child{font-weight:800;color:#eef0f7}
.tbl td:not(:first-child){color:#c9cede}
.tbl.big td{font-size:20px;padding:15px 18px}
.tbl.nowrap td,.tbl.nowrap th{white-space:nowrap}
.tbl.nowrap td{padding:15px 14px}.tbl.nowrap th{padding:14px}
/* checklist */
.check-title{font:800 24px B;color:var(--c,#f7c35a);margin:0 0 10px}
.check{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px}
.ci{display:flex;gap:12px;align-items:flex-start;background:#1c2030;border:2px solid #2c3245;border-radius:14px;padding:11px 14px}
.tick{flex:0 0 30px;height:30px;border-radius:50%;background:var(--c,#f7c35a);color:#11131b;display:flex;align-items:center;justify-content:center;font:800 18px F}
.ci b{display:block;font:800 21px B}
.ci span{font-size:18px;color:#a5acbe}
/* steps */
.steps{display:flex;flex-direction:column;gap:16px}
.st{display:flex;gap:20px;align-items:flex-start;background:#1c2030;border:2px solid #2c3245;border-radius:18px;padding:18px 22px;box-shadow:8px 9px 0 -2px #1e2946}
.num{flex:0 0 52px;height:52px;border-radius:14px;background:#f7c35a;color:#18213a;display:flex;align-items:center;justify-content:center;font:800 30px B;transform:rotate(-3deg);box-shadow:3px 3px 0 #eef0f7}
/* formula */
.formula{background:#212a4c;border:2px dashed #8fa5ff;border-radius:18px;padding:18px 24px}
.fl{font-size:19px;font-weight:700;color:#c9d3ff;margin-bottom:6px}
.fx{font:800 30px/1.25 B;letter-spacing:-.01em}
.fx span,.fe span{color:#f7c35a}
.fe{font-size:20px;color:#c9cede;margin-top:8px}
/* cards */
.cards{display:flex;flex-direction:column;gap:16px}
.cd{display:flex;gap:20px;align-items:flex-start;background:#1c2030;border:2px solid #2c3245;border-left:6px solid var(--c);border-radius:18px;padding:18px 22px;box-shadow:8px 9px 0 -2px #1e2946}
.ic{flex:0 0 46px;height:46px;border-radius:50%;background:var(--c);color:#11131b;display:flex;align-items:center;justify-content:center;font:800 24px B}
/* bas */
.note{margin-top:22px;font-size:20px;line-height:1.45;color:#a5acbe;border-top:2px dashed #2c3245;padding-top:18px}
.note b{color:#eef0f7}
.foot{margin-top:auto;display:flex;justify-content:space-between;align-items:center;font-size:20px;color:#a5acbe}
.brand{display:flex;align-items:center;gap:12px;font:800 30px B;color:#eef0f7}
.logo{width:44px;height:44px;border-radius:12px;background:#3d5afe;color:#fff;display:flex;align-items:center;justify-content:center;font:800 26px B;box-shadow:3px 3px 0 #f7c35a}
`;

const nbsp = (h) => h.replace(/(\d) (?=\d{3}\b)/g, '$1\u00a0').replace(/(\d) (?=[%€]|j\b|km\b|CV\b)/g, '$1\u00a0').replace(/ ([:;?!»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
const render = (g) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="halo"></div><div class="wrap">
<span class="pill">${g.pill}</span>
<h1>${g.h1}</h1>
<p class="sub">${g.sub}</p>
<div class="body">${nbsp(g.blocks.map((b) => blocks[b.type](b)).join(''))}</div>
${g.note ? `<div class="note">${nbsp(g.note)}</div>` : ''}
<div class="foot"><span class="brand"><span class="logo">L</span>Logimalin</span><span>${DOMAIN} · ${g.asOf}</span></div>
</div></body></html>`;

const only = process.argv[2];
const list = only ? DATA.filter((g) => g.slug === only) : DATA;
if (!list.length) throw new Error(`Infographie inconnue : ${only}`);

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
for (const g of list) {
  await page.setContent(render(g), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // Agrandit le contenu (zoom CSS) pour occuper la hauteur disponible, sans chevaucher le pied de page.
  const zoom = await page.evaluate(() => {
    const body = document.querySelector('.body');
    const last = () => (document.querySelector('.note') ?? body).getBoundingClientRect().bottom;
    const limit = () => document.querySelector('.foot').getBoundingClientRect().top - 36;
    const wide = () => [...body.querySelectorAll('*')].some((el) => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== 'hidden');
    let z = 1;
    while (z < 1.4) {
      body.style.zoom = String(z + 0.02);
      if (last() > limit() || wide()) { body.style.zoom = String(z); break; }
      z += 0.02;
    }
    return { z, overflow: last() > limit() + 20 };
  });
  if (zoom.overflow) console.warn(`⚠️  ${g.slug} : contenu trop haut, il chevauche le pied de page`);
  const png = join(OUT, `${g.slug}.png`);
  await page.screenshot({ path: png });
  await sharp(png).webp({ quality: 86 }).toFile(join(OUT, `${g.slug}.webp`));
  console.log(`✓ ${g.slug} (zoom ${zoom.z.toFixed(2)})`);
}
await browser.close();
