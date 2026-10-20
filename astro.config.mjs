// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { writeFileSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { SITE } from './src/data/site.ts';
import { SOFTWARE } from './src/data/software.ts';

// Redirections 302 côté serveur pour /go/<slug>/ (Netlify, Cloudflare Pages). Les pages HTML
// /go/<slug>/ restent en secours pour les hébergeurs qui ignorent ce fichier.
const affiliateRedirects = {
  name: 'affiliate-redirects',
  hooks: {
    'astro:build:done': ({ dir }) => {
      // La 2e règle (/go/<slug>/<page d'origine>/) sert au suivi des clics par page. Cloudflare Pages limite
      // les règles dynamiques à 100 : au-delà de 100 logiciels, il faudra passer par une Pages Function.
      const lines = SOFTWARE.flatMap((s) => {
        const to = s.affiliateUrl ?? s.website;
        return [`/go/${s.slug}/ ${to} 302`, `/go/${s.slug}/* ${to} 302`];
      });
      // Ancienne page « transparence » fusionnée dans la méthodologie.
      lines.push('/transparence-affiliation/ /methodologie/ 301');
      writeFileSync(new URL('_redirects', dir), lines.join('\n') + '\n');
    },
  },
};

// Ancres du tableau comparatif sans fiche correspondante sur la page : on pointe vers l'avis du logiciel,
// ou on retire le lien. Sinon le clic sur le nom du logiciel ne mène nulle part.
const fixTableAnchors = {
  name: 'fix-table-anchors',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const root = dir.pathname;
      for (const f of walk(root).filter((f) => f.endsWith('.html'))) {
        const html = readFileSync(f, 'utf8');
        const out = html.replace(/<a href="#(logiciel-[^"]+)"(?: data-review="([^"]*)")?>(.*?)<\/a>/g, (m, id, review, text) => {
          if (html.includes(`id="${id}"`)) return review ? m.replace(/ data-review="[^"]*"/, '') : m;
          return review ? `<a href="${review}">${text}</a>` : text;
        });
        if (out !== html) writeFileSync(f, out);
      }
    },
  },
};

// Typographie française : espace insécable avant « : ; ! ? » et %, à l'intérieur des guillemets et dans les
// nombres (1 800 €), pour qu'un signe ne se retrouve jamais seul en début de ligne. Texte seulement
// (pas les attributs, scripts, styles, code ni zones de saisie).
const typoFr = {
  name: 'typographie-fr',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const IGNORE = /^<(script|style|pre|code|textarea)\b/i;
      for (const f of walk(dir.pathname).filter((f) => f.endsWith('.html'))) {
        const html = readFileSync(f, 'utf8');
        let ignore = null;
        const out = html.split(/(<[^>]+>)/).map((part) => {
          if (part.startsWith('<')) {
            const m = part.match(IGNORE);
            if (m && !ignore) ignore = m[1].toLowerCase();
            else if (ignore && part.toLowerCase().startsWith(`</${ignore}`)) ignore = null;
            return part;
          }
          if (ignore || !part.trim()) return part;
          return part
            .replace(/ ([:;!?»%])/g, '\u00a0$1')
            .replace(/« /g, '«\u00a0')
            .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0')
            .replace(/(\d) (€|h\b|j\b|km\b|ans?\b|mois\b)/g, '$1\u00a0$2');
        }).join('');
        if (out !== html) writeFileSync(f, out);
      }
    },
  },
};

// Sitemap enrichi : date de mise à jour (frontmatter `updated`) et infographies (Google Images).
const ARTICLES = new URL('./src/content/articles/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const lastmods = new Map(
  walk(ARTICLES)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => {
      const updated = readFileSync(f, 'utf8').match(/^updated:\s*(\S+)/m)?.[1];
      return [`/${relative(ARTICLES, f).replace(/\.mdx$/, '')}/`, updated ? new Date(updated) : undefined];
    }),
);
const siteUpdated = new Date(Math.max(...[...lastmods.values()].filter(Boolean).map((d) => d.getTime())));
const INFOGRAPHICS = JSON.parse(readFileSync(new URL('./src/data/infographics.json', import.meta.url), 'utf8'));
const imagesFor = (path) =>
  INFOGRAPHICS.filter((g) => path === '/infographies/' || `/${g.page}/` === path).map((g) => ({
    url: new URL(`/infographies/${g.slug}.png`, SITE.url).href,
    caption: g.alt,
    title: g.title,
  }));


// Enveloppe chaque tableau Markdown dans un conteneur défilant : le tableau garde toute la largeur du cadre
// (sinon, avec `display: block`, les lignes s'arrêtent avant le bord quand le contenu est court).
function rehypeWrapTables() {
  const wrap = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      if (child.type === 'element' && child.tagName === 'table') {
        return { type: 'element', tagName: 'div', properties: { className: ['md-table'] }, children: [child] };
      }
      wrap(child);
      return child;
    });
  };
  return (tree) => wrap(tree);
}

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // CSS dans des fichiers /_astro/ (cache d'un an, voir public/_headers) : téléchargé une fois pour toutes
    // les pages au lieu d'être recopié dans chaque page (plus de 100 Ko).
    inlineStylesheets: 'never',
  },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    mdx({ rehypePlugins: [rehypeWrapTables] }),
    affiliateRedirects,
    fixTableAnchors,
    typoFr,
    sitemap({
      // Les pages de redirection affiliées, les simulateurs intégrables et la 404 ne doivent jamais être indexées.
      filter: (page) => !/\/(go|embed|404|mentions-legales)\//.test(page),
      serialize(item) {
        const path = new URL(item.url).pathname;
        const img = imagesFor(path);
        return {
          ...item,
          changefreq: undefined,
          lastmod: lastmods.get(path) ?? siteUpdated,
          ...(img.length ? { img } : {}),
        };
      },
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
    }),
  ],
});
