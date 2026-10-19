// Configuration globale du site. Remplace `url` par ton vrai domaine avant la mise en ligne :
// il sert aux URLs canoniques, au sitemap et aux données structurées.
export const SITE = {
  name: 'Logimalin',
  tagline: 'Les bons logiciels pour TPE et indépendants, comparés sans jargon',
  url: process.env.SITE_URL ?? 'https://www.logi-malin.fr',
  // Profils officiels de la marque (pas de l'auteur) : relient le site à ses pages sociales dans les données structurées.
  sameAs: ['https://www.linkedin.com/company/logimalin'],
  locale: 'fr_FR',
  lang: 'fr',
  // Mois de la dernière vérification globale des tarifs affichés.
  pricesChecked: 'octobre 2026',
  // Signature éditoriale : le site est signé par l'équipe, sans nom de personne.
  author: {
    name: 'L’équipe Logimalin',
    url: '/a-propos/',
  },
  // Newsletter Brevo. Colle ici l'URL « action » de ton formulaire Brevo (Contacts → Formulaires → Partager →
  // code HTML : l'attribut action="https://….sibforms.com/serve/…"). Tant qu'elle vaut null, la check-list
  // se télécharge directement, sans formulaire.
  newsletter: {
    brevoFormAction: null as string | null,
  },
  // Éditeur légal du site (mentions légales). À compléter.
  publisher: {
    legalName: 'À compléter',
    // Directeur de la publication : obligatoire pour un éditeur professionnel (nom de la personne ou de la société).
    director: 'À compléter',
    address: 'À compléter',
    email: 'contact@logi-malin.fr',
    host: 'Cloudflare, Inc., 101 Townsend St, San Francisco, CA 94107, États-Unis (Cloudflare Pages)',
  },
} as const;

// Silos thématiques : le premier segment de l'URL d'un article (/facturation/…) désigne son silo.
// Les silos « besoin » captent les requêtes génériques, le silo « métiers » la longue traîne
// (« logiciel devis artisan », « logiciels restaurant »…), et les silos comparatifs / alternatives / avis
// les requêtes de décision finale, celles qui convertissent le mieux.
export const SILOS = {
  facturation: {
    label: 'Facturation',
    title: 'Facturation et facture électronique',
    seoTitle: 'Facturation et facture électronique : guides 2026',
    description: 'Facture électronique 2026-2027 et logiciels de facturation : calendrier, obligations et comparatifs pour TPE, artisans et auto-entrepreneurs.',
  },
  comptabilite: {
    label: 'Comptabilité',
    title: 'Logiciels de comptabilité',
    seoTitle: 'Logiciels de comptabilité pour TPE : comparatifs 2026',
    description: 'Comptabilité en ligne pour TPE, indépendants et sociétés : comparatifs, prix et conseils pour choisir avec ou sans expert-comptable.',
  },
  encaissement: {
    label: 'Encaissement',
    title: 'Caisse et terminal de paiement',
    seoTitle: 'Caisse et terminal de paiement : comparatifs 2026',
    description: 'Terminaux de paiement, caisses enregistreuses et logiciels de caisse pour commerçants : frais réels, NF525 et comparatifs détaillés.',
  },
  'site-internet': {
    label: 'Site internet',
    title: 'Créer son site internet',
    seoTitle: 'Créer un site internet pour son entreprise : guides',
    description: 'Créateurs de sites, e-commerce et hébergement : comment créer le site de ton entreprise au bon prix, sans être développeur.',
  },
  crm: {
    label: 'CRM & marketing',
    title: 'CRM, prospection et marketing',
    seoTitle: 'CRM et emailing pour TPE : comparatifs 2026',
    description: 'CRM, emailing et outils de prospection pour TPE : trouver des clients, suivre ses devis et fidéliser sans y passer ses soirées.',
  },
  equipe: {
    label: 'Équipe',
    title: 'Gestion d’équipe et planning',
    seoTitle: 'Logiciels de planning et gestion d’équipe pour TPE',
    description: 'Planning, badgeuse, paie et RH pour les TPE qui emploient : comparatifs des logiciels pour gérer ton équipe simplement.',
  },
  metiers: {
    label: 'Par métier',
    title: 'Les logiciels par métier',
    seoTitle: 'Logiciels par métier : le kit complet de chaque activité',
    description: 'Artisan, freelance, restaurant, commerçant : le kit de logiciels complet pour chaque métier, avec les outils indispensables et leur prix.',
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
    seoTitle: 'Alternatives aux logiciels populaires pour TPE',
    description: 'Trop cher, trop rigide, engagement trop long ? Les meilleures alternatives aux logiciels de gestion les plus utilisés par les TPE.',
  },
  avis: {
    label: 'Avis',
    title: 'Avis et tests de logiciels',
    seoTitle: 'Avis sur les logiciels pour TPE et indépendants',
    description: 'Avis détaillés sur les logiciels pour TPE et indépendants : tarifs, points forts, limites et profil idéal de chaque solution.',
  },
  creer: {
    label: 'Créer et gérer',
    title: 'Créer et gérer son entreprise',
    seoTitle: 'Créer et gérer sa micro-entreprise : guides 2026',
    description: 'Business plan, statut, aides, déclarations URSSAF, impôts et CFE : les démarches pour créer et gérer ton entreprise, expliquées simplement.',
  },
  outils: {
    label: 'Outils',
    title: 'Outils et simulateurs gratuits',
    seoTitle: 'Simulateurs gratuits pour TPE et indépendants',
    description: 'Simulateurs et calculateurs gratuits pour chiffrer le coût réel de tes logiciels et de ton encaissement avant de signer un contrat.',
  },
} as const;

export type Silo = keyof typeof SILOS;
