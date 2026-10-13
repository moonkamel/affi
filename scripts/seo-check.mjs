// Audit SEO du site généré (dist/). Lancer après `npm run build` : `npm run check`.
// Échoue (code 1) au moindre problème bloquant, pour ne jamais publier une page cassée.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
if (!existsSync(DIST)) {
  console.error('dist/ introuvable : lance `npm run build` avant.');
  process.exit(1);
}

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const htmlFiles = walk(DIST).filter((f) => f.endsWith('.html'));
const routeOf = (file) => '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '').replace(/\.html$/, '/');
const exists = (path) => {
  const clean = path.split('#')[0].split('?')[0];
  if (!clean.startsWith('/')) return true;
  const p = join(DIST, clean);
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
};

const sitemap = walk(DIST)
  .filter((f) => /sitemap-\d+\.xml$/.test(f))
  .map((f) => readFileSync(f, 'utf8'))
  .join('');

const errors = [];
const warnings = [];
const titles = new Map();
const descs = new Map();
let checked = 0;

for (const file of htmlFiles) {
  const route = routeOf(file);
  if (route.startsWith('/go/') || route.startsWith('/embed/')) continue;
  const html = readFileSync(file, 'utf8');
  const err = (m) => errors.push(`${route} → ${m}`);
  const warn = (m) => warnings.push(`${route} → ${m}`);
  const noindex = /<meta name="robots" content="noindex/.test(html);
  checked++;

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const h1s = html.match(/<h1[\s>]/g) ?? [];
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];

  if (h1s.length !== 1) err(`${h1s.length} balises <h1> (il en faut exactement 1)`);
  if (title.length < 20 || title.length > 65) warn(`<title> de ${title.length} caractères : « ${title} »`);
  if (!noindex && (desc.length < 110 || desc.length > 160)) warn(`meta description de ${desc.length} caractères`);
  if (!noindex) {
    if (titles.has(title)) err(`<title> dupliqué avec ${titles.get(title)}`);
    if (descs.has(desc)) err(`meta description dupliquée avec ${descs.get(desc)}`);
    titles.set(title, route);
    descs.set(desc, route);
  }
  if (route !== '/404/') {
    if (!canonical) err('pas de balise canonical');
    else if (!canonical.endsWith(route)) err(`canonical ${canonical} ne correspond pas à l’URL`);
  }
  if (!/<html lang="fr"/.test(html)) err('attribut lang="fr" manquant');
  if (!/property="og:image"/.test(html)) err('og:image manquant');

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      err('JSON-LD invalide');
    }
  }

  for (const m of html.matchAll(/<a\s([^>]*)>/g)) {
    const attrs = m[1];
    const href = attrs.match(/href="([^"]*)"/)?.[1];
    if (!href) continue;
    if (href.startsWith('/go/') && !/rel="[^"]*sponsored/.test(attrs)) err(`lien affilié ${href} sans rel="sponsored"`);
    if (href.startsWith('/') && !exists(href)) err(`lien interne cassé : ${href}`);
    if (href.startsWith('/') && !href.startsWith('/go/') && !/\/$|#|\.[a-z]+$/.test(href.split('#')[0].split('?')[0]) && href !== '/')
      warn(`lien interne sans slash final : ${href}`);
  }
  for (const m of html.matchAll(/<img\s([^>]*)>/g)) {
    if (!/alt="/.test(m[1])) err('image sans attribut alt');
  }

  const inSitemap = sitemap.includes(`${route}</loc>`);
  if (noindex && inSitemap) err('page noindex présente dans le sitemap');
  if (!noindex && route !== '/404/' && !inSitemap) err('page indexable absente du sitemap');
}

// Pages orphelines : indexables mais jamais liées depuis une autre page.
const linked = new Set();
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) if (routeOf(file) !== m[1]) linked.add(m[1]);
}
for (const file of htmlFiles) {
  const route = routeOf(file);
  if (route.startsWith('/go/') || route.startsWith('/embed/') || route === '/' || route === '/404/') continue;
  if (!linked.has(route)) warnings.push(`${route} → page orpheline (aucun lien interne entrant)`);
}

for (const w of warnings) console.warn('⚠️ ', w);
for (const e of errors) console.error('❌', e);
console.log(`\n${checked} pages auditées · ${errors.length} erreur(s) · ${warnings.length} avertissement(s)`);
process.exit(errors.length ? 1 : 0);
