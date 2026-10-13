// Génère une image de partage (Open Graph, 1200×630) par article dans public/og/.
// À lancer après avoir ajouté ou renommé des articles : `npm run og`.
// Utilise Chromium via playwright-core : définis CHROME_PATH si Chromium n'est pas trouvé.
import { chromium } from 'playwright-core';
import { readFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const ARTICLES = join(ROOT, 'src/content/articles');
const OUT = join(ROOT, 'public/og');
const FONT = (f) => 'data:font/woff2;base64,' + readFileSync(join(ROOT, 'public/fonts', f)).toString('base64');
const LABELS = {
  facturation: 'Facturation', comptabilite: 'Comptabilité', encaissement: 'Encaissement', 'site-internet': 'Site internet',
  crm: 'CRM & marketing', equipe: 'Équipe', metiers: 'Par métier', comparatifs: 'Comparatif', alternatives: 'Alternatives',
  avis: 'Avis', outils: 'Outil gratuit',
};

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

const pages = walk(ARTICLES)
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => {
    const id = relative(ARTICLES, f).replace(/\.mdx$/, '');
    const title = readFileSync(f, 'utf8').match(/^title: "(.*)"$/m)?.[1] ?? id;
    return { id, title, silo: id.split('/')[0] };
  });

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const p of pages) {
  const size = p.title.length > 80 ? 52 : p.title.length > 55 ? 60 : 68;
  await page.setContent(`<!doctype html><html><head><style>
    @font-face{font-family:B;src:url(${FONT('bricolage.woff2')})}
    @font-face{font-family:F;src:url(${FONT('figtree.woff2')})}
    body{margin:0;width:1200px;height:630px;background:#11131b;color:#eef0f7;font-family:F;position:relative;overflow:hidden}
    .halo{position:absolute;right:-120px;top:-120px;width:620px;height:620px;background:radial-gradient(closest-side,#3e2a24,transparent 70%),radial-gradient(closest-side at 30% 70%,#1e2946,transparent 70%)}
    .wrap{position:absolute;inset:70px 80px;display:flex;flex-direction:column}
    .pill{align-self:flex-start;font:800 22px B;letter-spacing:.04em;text-transform:uppercase;background:#f7c35a;color:#18213a;padding:8px 18px;border-radius:10px;transform:rotate(-2deg);box-shadow:3px 3px 0 #eef0f7}
    h1{font:800 ${size}px/1.08 B;letter-spacing:-.02em;margin:34px 0 0;max-width:1000px}
    .foot{margin-top:auto;display:flex;align-items:center;gap:16px;font:800 34px B}
    .foot svg{width:54px;height:54px}
    .foot span{font:500 24px F;color:#a5acbe;margin-left:auto}
  </style></head><body><div class="halo"></div><div class="wrap">
    <div class="pill">${esc(LABELS[p.silo] ?? 'Guide')}</div>
    <h1>${esc(p.title)}</h1>
    <div class="foot"><svg viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2747d8"/><path d="M10.5 8v15h11" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M22.5 6.5l1.1 2.6 2.6 1.1-2.6 1.1-1.1 2.6-1.1-2.6-2.6-1.1 2.6-1.1z" fill="#f4ad1f"/></svg>Logimalin<span>logimalin.fr</span></div>
  </div></body></html>`);
  await page.evaluate(() => document.fonts.ready);
  const file = join(OUT, p.id.replace(/\//g, '--') + '.jpg');
  await page.screenshot({ path: file, type: 'jpeg', quality: 82 });
}
await browser.close();
console.log(`${pages.length} images générées dans public/og/`);
