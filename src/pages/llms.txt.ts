// llms.txt : résumé du site pour les assistants IA (ChatGPT, Perplexity, Claude, AI Overviews).
// Être cité dans leurs réponses est devenu une source de trafic à part entière.
import type { APIRoute } from 'astro';
import { SITE, SILOS } from '../data/site';
import { articlePath, getArticles, siloOf } from '../lib/articles';

export const GET: APIRoute = async ({ site }) => {
  const articles = await getArticles();
  const out = [`# ${SITE.name}`, '', `> ${SITE.tagline}. Comparatifs indépendants, tarifs relevés en ${SITE.pricesChecked}.`, ''];
  for (const [key, s] of Object.entries(SILOS)) {
    const list = articles.filter((a) => siloOf(a) === key);
    if (!list.length) continue;
    out.push(`## ${s.title}`, '');
    for (const a of list) out.push(`- [${a.data.title}](${new URL(articlePath(a), site).href}): ${a.data.description}`);
    out.push('');
  }
  return new Response(out.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
