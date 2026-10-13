// Flux RSS des guides et comparatifs : utile pour les agrégateurs, les lecteurs RSS et la découverte rapide des nouvelles pages.
import type { APIRoute } from 'astro';
import { SITE } from '../data/site';
import { articlePath, getArticles } from '../lib/articles';

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]!);

export const GET: APIRoute = async ({ site }) => {
  const items = (await getArticles())
    .map((a) => {
      const url = new URL(articlePath(a), site).href;
      return `<item><title>${esc(a.data.title)}</title><link>${url}</link><guid>${url}</guid><description>${esc(a.data.description)}</description><pubDate>${a.data.updated.toUTCString()}</pubDate></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.name)}</title><link>${new URL('/', site).href}</link><description>${esc(SITE.tagline)}</description><language>fr-FR</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
