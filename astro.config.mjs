// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { writeFileSync } from 'node:fs';
import { SITE } from './src/data/site.ts';
import { SOFTWARE } from './src/data/software.ts';

// Redirections 302 côté serveur pour /go/<slug>/ (Netlify, Cloudflare Pages). Les pages HTML
// /go/<slug>/ restent en secours pour les hébergeurs qui ignorent ce fichier.
const affiliateRedirects = {
  name: 'affiliate-redirects',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const lines = SOFTWARE.map((s) => `/go/${s.slug}/ ${s.affiliateUrl ?? s.website} 302`);
      writeFileSync(new URL('_redirects', dir), lines.join('\n') + '\n');
    },
  },
};

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
    sitemap({
      // Les pages de redirection affiliées, les simulateurs intégrables et la 404 ne doivent jamais être indexées.
      filter: (page) => !/\/(go|embed|404|mentions-legales)\//.test(page),
      changefreq: 'weekly',
      i18n: { defaultLocale: 'fr', locales: { fr: 'fr-FR' } },
    }),
  ],
});
