// Configuration globale du site. Remplace `url` par ton vrai domaine avant la mise en ligne :
// il sert aux URLs canoniques, au sitemap et aux données structurées.
export const SITE = {
  name: 'Coup de Feu',
  tagline: 'Les logiciels des restaurateurs et indépendants, choisis par un ancien cuisinier',
  url: process.env.SITE_URL ?? 'https://www.coupdefeu.fr',
  locale: 'fr_FR',
  lang: 'fr',
  // Mois de la dernière vérification globale des tarifs affichés.
  pricesChecked: 'octobre 2026',
  author: {
    name: 'Tarik',
    role: 'Ancien cuisinier professionnel, développeur web',
    url: '/a-propos/',
    // Ajoute ici tes profils publics (LinkedIn, etc.) : Google s'en sert pour relier l'auteur à une vraie personne.
    sameAs: [] as string[],
  },
  // Éditeur légal du site (mentions légales). À compléter.
  publisher: {
    legalName: 'À compléter',
    address: 'À compléter',
    email: 'contact@coupdefeu.fr',
    host: 'À compléter (ex. Cloudflare, Inc.)',
  },
} as const;

export const SILOS = {
  restaurant: {
    label: 'Restaurant',
    title: 'Logiciels pour restaurant',
    seoTitle: 'Logiciels pour restaurant : comparatifs et prix 2026',
    description: 'Caisse enregistreuse, réservation, planning, stocks : tous les logiciels de restaurant comparés par un ancien cuisinier, avec les prix 2026.',
  },
  facturation: {
    label: 'Facturation',
    title: 'Facturation et facture électronique',
    seoTitle: 'Facturation et facture électronique : guides 2026',
    description: 'Facture électronique 2026-2027 et logiciels de facturation : calendrier, obligations et comparatifs pour TPE, artisans et auto-entrepreneurs.',
  },
  comparatifs: {
    label: 'Comparatifs',
    title: 'Comparatifs face à face',
    seoTitle: 'Comparatifs de logiciels face à face',
    description: 'Deux logiciels face à face, un verdict clair : nos duels détaillés (prix, fonctions, support) pour départager les solutions les plus demandées.',
  },
  alternatives: {
    label: 'Alternatives',
    title: 'Alternatives aux logiciels populaires',
    seoTitle: 'Alternatives aux logiciels de restaurant et facturation',
    description: 'Trop cher, trop rigide, engagement trop long ? Les meilleures alternatives aux grands logiciels de caisse, réservation et facturation.',
  },
  avis: {
    label: 'Avis',
    title: 'Avis et tests de logiciels',
    seoTitle: 'Avis logiciels restaurant et facturation 2026',
    description: 'Avis détaillés sur les logiciels pour restaurants et indépendants : tarifs, points forts, limites et profil idéal de chaque solution.',
  },
  outils: {
    label: 'Outils',
    title: 'Outils et simulateurs gratuits',
    seoTitle: 'Simulateurs gratuits pour restaurateurs',
    description: 'Simulateurs et calculateurs gratuits pour chiffrer le coût réel de ta caisse et de tes logiciels avant de signer un contrat.',
  },
} as const;

export type Silo = keyof typeof SILOS;
