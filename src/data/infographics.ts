// Infographies du site. Le contenu est dans infographics.json (partagé avec scripts/infographie.mjs, qui génère
// les images dans public/infographies/<slug>.png et .webp).
import data from './infographics.json';

export interface Infographic {
  slug: string;
  title: string;
  /** Article hôte (id de la collection), qui reçoit les liens de crédit. */
  page: string;
  /** auto : affichée automatiquement en fin d'article ; manual : placée à la main dans le MDX. */
  placement: 'auto' | 'manual';
  teaser: string;
  alt: string;
}

export const INFOGRAPHICS = data as unknown as Infographic[];
export const WIDTH = 1080;
export const HEIGHT = 1350;
export const png = (g: Infographic) => `/infographies/${g.slug}.png`;
export const webp = (g: Infographic) => `/infographies/${g.slug}.webp`;
export const hostPath = (g: Infographic) => `/${g.page}/`;
export const getInfographic = (slug: string) => {
  const g = INFOGRAPHICS.find((x) => x.slug === slug);
  if (!g) throw new Error(`Infographie inconnue : ${slug}`);
  return g;
};
export const autoForPage = (id: string) => INFOGRAPHICS.filter((g) => g.placement === 'auto' && g.page === id);

// « L'infographie de la semaine » : rotation chaque lundi (heure de Paris), à partir du lundi 5 janvier 2026.
// Le même calcul tourne au build (HTML statique) et dans le navigateur (pour changer sans redéploiement).
export const WEEK_EPOCH = '2026-01-05';
export function weekIndex(now: Date = new Date()): number {
  const paris = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  const days = Math.floor((Date.parse(paris) - Date.parse(WEEK_EPOCH)) / 86400000);
  return Math.floor(days / 7);
}
export const infographicOfWeek = (now?: Date) => INFOGRAPHICS[((weekIndex(now) % INFOGRAPHICS.length) + INFOGRAPHICS.length) % INFOGRAPHICS.length];
