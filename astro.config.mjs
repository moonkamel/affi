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

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    // Tout le CSS inline : zéro requête bloquante, meilleur LCP.
    inlineStylesheets: 'always',
  },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  integrations: [
    mdx(),
    affiliateRedirects,
    fixTableAnchors,
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
