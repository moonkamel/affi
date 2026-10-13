// Base de données des logiciels comparés sur le site.
//
// - `affiliateUrl` : colle ici ton lien affilié une fois inscrit au programme. Tant qu'il vaut null,
//   le bouton renvoie vers le site officiel (aucune commission). Tous les liens passent par /go/<slug>/,
//   donc changer un lien ici le met à jour partout sur le site.
// - `program` : notes internes sur le programme d'affiliation (jamais affichées sur le site).
// - Les prix sont indicatifs, relevés sur des sources publiques en octobre 2026. Revérifie-les
//   auprès de chaque éditeur avant publication et mets à jour `priceChecked`.

export type Category = 'caisse' | 'reservation' | 'planning' | 'facturation';

export interface Software {
  slug: string;
  name: string;
  category: Category;
  website: string;
  affiliateUrl: string | null;
  program: { network: string; commission: string; notes?: string };
  price: { from: number | null; label: string; note?: string };
  priceChecked: string;
  freeTrial: boolean | null;
  commitment: string;
  bestFor: string;
  short: string;
  pros: string[];
  cons: string[];
  /** Note éditoriale sur 10. */
  score: number;
  badges?: string[];
}

export const SOFTWARE: Software[] = [
  // ───────────── Caisse ─────────────
  {
    slug: 'lightspeed',
    name: 'Lightspeed Restaurant',
    category: 'caisse',
    website: 'https://www.lightspeedhq.fr/pos/restaurant/',
    affiliateUrl: null,
    program: {
      network: 'Direct (programme de parrainage partenaires)',
      commission: 'Sur mesure : bonus fixe par prospect signé ou partenariat',
      notes: 'Contacter l’équipe partenaires avec quelques pages et des chiffres de trafic.',
    },
    price: { from: 89, label: 'à partir de 89 € HT/mois', note: 'hors matériel, formules Essentiel / Plus / Pro' },
    priceChecked: '2026-10',
    freeTrial: true,
    commitment: 'Variable selon l’offre',
    bestFor: 'Restaurants à service à table et groupes multi-sites',
    short: 'La référence polyvalente : très complète, nombreuses intégrations, mais l’addition grimpe vite avec les modules.',
    pros: [
      'Très complet : plan de salle, KDS, stocks, rapports avancés',
      'Écosystème d’intégrations ouvert (compta, livraison, réservation)',
      'Convient du bistrot indépendant au groupe multi-établissements',
    ],
    cons: [
      'Prix final peu lisible : beaucoup de modules en option',
      'Plus cher que la moyenne pour un petit établissement',
      'Interface riche, donc formation de l’équipe nécessaire',
    ],
    score: 8.6,
    badges: ['NF525'],
  },
  {
    slug: 'zelty',
    name: 'Zelty',
    category: 'caisse',
    website: 'https://www.zelty.fr/',
    affiliateUrl: null,
    program: { network: 'Direct (apporteur d’affaires)', commission: 'Non public, à négocier' },
    price: { from: null, label: 'sur devis', note: 'environ 80 à 120 € HT/mois constatés selon les formules' },
    priceChecked: '2026-10',
    freeTrial: false,
    commitment: 'Sur devis',
    bestFor: 'Restauration rapide, chaînes et franchises',
    short: 'Solution française taillée pour la restauration rapide et les réseaux, avec un support inclus très apprécié.',
    pros: [
      'Pensé pour la restauration rapide et les multi-sites',
      'Support client inclus, sans surcoût',
      'Fonctionne hors ligne en cas de coupure internet',
      'Nombreuses intégrations (bornes, livraison, click & collect)',
    ],
    cons: [
      'Tarifs uniquement sur devis',
      'Pas d’essai gratuit en libre-service',
      'Moins adapté à la gastronomie avec gestion fine des envois',
    ],
    score: 8.7,
    badges: ['NF525', 'Français'],
  },
  {
    slug: 'sumup',
    name: 'SumUp Caisse Pro',
    category: 'caisse',
    website: 'https://www.sumup.com/fr-fr/caisse-enregistreuse/',
    affiliateUrl: null,
    program: {
      network: 'Direct (programme « Promouvoir SumUp »)',
      commission: '200 € par commerçant qui souscrit à la Caisse Pro (à revérifier)',
      notes: 'Prime fixe : idéale pour Google Ads. Vérifier les règles sur les enchères de marque.',
    },
    price: { from: null, label: 'sur devis', note: 'matériel et terminal de paiement SumUp intégrés' },
    priceChecked: '2026-10',
    freeTrial: null,
    commitment: 'Selon l’offre',
    bestFor: 'Petits restaurants, cafés et bars qui veulent caisse + paiement en un seul fournisseur',
    short: 'L’héritière de Tiller (racheté par SumUp en 2021) : caisse iPad simple, paiement intégré, idéale pour démarrer.',
    pros: [
      'Caisse et terminal de paiement chez le même fournisseur',
      'Prise en main rapide sur iPad',
      'Base Tiller éprouvée en restauration',
    ],
    cons: [
      'Moins de fonctions avancées que Lightspeed ou Zelty',
      'Dépendance à l’écosystème de paiement SumUp',
      'Tarif complet à demander',
    ],
    score: 8.1,
    badges: ['NF525'],
  },
  {
    slug: 'laddition',
    name: 'L’Addition',
    category: 'caisse',
    website: 'https://www.laddition.com/',
    affiliateUrl: null,
    program: { network: 'Direct', commission: 'Non public, à négocier' },
    price: { from: null, label: 'sur devis', note: 'positionnement premium' },
    priceChecked: '2026-10',
    freeTrial: false,
    commitment: 'Sur devis',
    bestFor: 'Restaurants traditionnels et bistronomiques',
    short: 'Caisse iPad française premium, très appréciée en service à table pour sa simplicité en plein rush.',
    pros: [
      'Interface très claire pour le service en salle',
      'Bonne gestion des envois en cuisine',
      'Éditeur français, support réactif',
    ],
    cons: ['Plus cher que la moyenne', 'Tarifs sur devis uniquement'],
    score: 8.2,
    badges: ['NF525', 'Français'],
  },
  {
    slug: 'innovorder',
    name: 'Innovorder',
    category: 'caisse',
    website: 'https://www.innovorder.fr/',
    affiliateUrl: null,
    program: { network: 'Direct', commission: 'Non public, à négocier' },
    price: { from: null, label: 'sur devis' },
    priceChecked: '2026-10',
    freeTrial: false,
    commitment: 'Sur devis',
    bestFor: 'Fast-food, bornes de commande et click & collect',
    short: 'Spécialiste de la prise de commande multicanale : bornes, click & collect, commande à table.',
    pros: ['Bornes de commande intégrées', 'Très orienté vente à emporter et livraison', 'Éditeur français'],
    cons: ['Moins pertinent pour le service à table classique', 'Tarifs sur devis'],
    score: 7.9,
    badges: ['NF525', 'Français'],
  },

  // ───────────── Réservation ─────────────
  {
    slug: 'zenchef',
    name: 'Zenchef',
    category: 'reservation',
    website: 'https://www.zenchef.com/fr',
    affiliateUrl: null,
    program: { network: 'Direct / partenaires', commission: 'Non public, à négocier' },
    price: { from: 129, label: '129 à 249 € HT/mois', note: 'selon modules, engagement souvent de 12 mois' },
    priceChecked: '2026-10',
    freeTrial: false,
    commitment: 'Souvent 12 mois',
    bestFor: 'Restaurants qui veulent arrêter de payer une commission par couvert',
    short: 'Réservation sans commission par couvert, avec CRM client et module d’avis. Abonnement fixe.',
    pros: ['Pas de commission par couvert', 'CRM et fichier client complets', 'Gestion des empreintes bancaires anti no-show'],
    cons: ['Engagement souvent annuel', 'Frais sur les prépaiements et acomptes à vérifier'],
    score: 8.5,
    badges: ['Sans commission'],
  },
  {
    slug: 'thefork-manager',
    name: 'TheFork Manager',
    category: 'reservation',
    website: 'https://www.theforkmanager.com/fr-fr/',
    affiliateUrl: null,
    program: { network: '—', commission: 'Pas de programme connu' },
    price: { from: 139, label: 'environ 139 € HT/mois', note: '+ commission de 2 à 4 € par couvert venu via TheFork' },
    priceChecked: '2026-10',
    freeTrial: false,
    commitment: 'Variable',
    bestFor: 'Restaurants qui veulent la visibilité de la plateforme TheFork',
    short: 'Le plus gros apporteur de clients, mais la commission par couvert pèse lourd quand la plateforme représente une grosse part des réservations.',
    pros: ['Énorme visibilité grand public', 'Remplit les services creux grâce aux promotions'],
    cons: ['Commission par couvert', 'Clientèle attirée par les remises', 'Le fichier client reste en partie chez TheFork'],
    score: 7.4,
  },
  {
    slug: 'guestonline',
    name: 'Guestonline',
    category: 'reservation',
    website: 'https://www.guestonline.io/',
    affiliateUrl: null,
    program: { network: 'Direct', commission: 'Non public, à négocier' },
    price: { from: null, label: 'sur devis', note: 'sans commission' },
    priceChecked: '2026-10',
    freeTrial: false,
    commitment: 'Sur devis',
    bestFor: 'Restaurants indépendants qui veulent un outil simple, sans commission',
    short: 'Alternative française sans commission, simple à prendre en main.',
    pros: ['Sans commission', 'Simple', 'Éditeur français'],
    cons: ['Moins de marketing intégré que Zenchef', 'Prix non public'],
    score: 7.8,
    badges: ['Sans commission', 'Français'],
  },
  {
    slug: 'eatapp',
    name: 'Eat App',
    category: 'reservation',
    website: 'https://restaurant.eatapp.co/fr',
    affiliateUrl: null,
    program: { network: 'Direct', commission: 'À vérifier' },
    price: { from: 0, label: 'à partir de 0 €', note: 'forfaits fixes, sans commission' },
    priceChecked: '2026-10',
    freeTrial: true,
    commitment: 'Sans engagement sur l’offre d’entrée',
    bestFor: 'Petits budgets et restaurants qui démarrent',
    short: 'Offre d’entrée gratuite et forfaits fixes sans commission : la porte d’entrée la moins chère.',
    pros: ['Offre gratuite pour démarrer', 'Forfaits fixes sans commission'],
    cons: ['Moins connu en France', 'Fonctions avancées réservées aux forfaits payants'],
    score: 7.6,
    badges: ['Sans commission'],
  },

  // ───────────── Planning ─────────────
  {
    slug: 'skello',
    name: 'Skello',
    category: 'planning',
    website: 'https://www.skello.io/',
    affiliateUrl: null,
    program: { network: 'Direct / partenaires', commission: 'Non public, à négocier' },
    price: { from: 79, label: 'à partir de 79 € HT/mois', note: 'par établissement, pas par salarié' },
    priceChecked: '2026-10',
    freeTrial: true,
    commitment: 'Mensuel ou annuel',
    bestFor: 'Restaurants qui veulent un planning conforme à la convention HCR',
    short: 'Le planning le plus répandu en CHR : convention HCR intégrée, badgeuse et préparation de la paie.',
    pros: ['Règles de la convention HCR intégrées', 'Prix par établissement, pas par salarié', 'Export paie'],
    cons: ['Badgeuse facturée en plus selon la formule', 'Beaucoup de fonctions pour un très petit effectif'],
    score: 8.6,
    badges: ['Français'],
  },
  {
    slug: 'combo',
    name: 'Combo',
    category: 'planning',
    website: 'https://combohr.com/fr',
    affiliateUrl: null,
    program: { network: 'Direct / partenaires', commission: 'Non public, à négocier' },
    price: { from: 60, label: 'à partir de 60 € HT/mois', note: 'par établissement (Time 60 €, People 80 €)' },
    priceChecked: '2026-10',
    freeTrial: true,
    commitment: 'Mensuel ou annuel',
    bestFor: 'Équipes de restauration qui veulent une appli très simple pour les salariés',
    short: 'Planning pensé pour la restauration, très simple côté équipe, un peu moins cher que Skello à l’entrée.',
    pros: ['Application salariés très simple', 'Prix d’entrée plus bas', 'Spécialisé restauration'],
    cons: ['Moins d’intégrations que Skello', 'Fonctions RH complètes dans la formule supérieure'],
    score: 8.3,
    badges: ['Français'],
  },

  // ───────────── Facturation ─────────────
  {
    slug: 'abby',
    name: 'Abby',
    category: 'facturation',
    website: 'https://abby.fr/',
    affiliateUrl: null,
    program: { network: 'Direct', commission: 'À vérifier' },
    price: { from: 0, label: 'gratuit, puis dès 7,20 €/mois', note: 'factures illimitées dans l’offre gratuite' },
    priceChecked: '2026-10',
    freeTrial: true,
    commitment: 'Sans engagement',
    bestFor: 'Micro-entrepreneurs',
    short: 'Le plus adapté au régime micro : offre gratuite généreuse, déclarations URSSAF, immatriculée plateforme agréée.',
    pros: ['Offre gratuite sans limite de factures', 'Pensé pour le régime micro-entreprise', 'Immatriculée plateforme agréée (PA)'],
    cons: ['Moins adapté aux sociétés au réel', 'Fonctions avancées dans les offres payantes'],
    score: 9.0,
    badges: ['Plateforme agréée', 'Gratuit'],
  },
  {
    slug: 'indy',
    name: 'Indy',
    category: 'facturation',
    website: 'https://www.indy.fr/',
    affiliateUrl: null,
    program: { network: 'Direct', commission: 'À vérifier' },
    price: { from: 0, label: 'gratuit, puis dès 9 € HT/mois', note: 'accès plateforme agréée inclus' },
    priceChecked: '2026-10',
    freeTrial: true,
    commitment: 'Sans engagement',
    bestFor: 'Indépendants qui veulent facturation et comptabilité automatisées',
    short: 'Facturation et comptabilité automatique dans le même outil, très bon pour les BNC et les sociétés.',
    pros: ['Comptabilité automatisée', 'Accès plateforme agréée inclus', 'Bon pour les professions libérales'],
    cons: ['Plus riche que nécessaire pour une micro très simple'],
    score: 8.7,
    badges: ['Plateforme agréée'],
  },
  {
    slug: 'tiime',
    name: 'Tiime',
    category: 'facturation',
    website: 'https://www.tiime.fr/',
    affiliateUrl: null,
    program: { network: 'Direct', commission: 'À vérifier' },
    price: { from: 0, label: 'offre gratuite, puis dès 17,99 € HT/mois' },
    priceChecked: '2026-10',
    freeTrial: true,
    commitment: 'Sans engagement',
    bestFor: 'TPE qui travaillent avec un expert-comptable',
    short: 'Suite de gestion complète, très utilisée par les cabinets comptables, immatriculée plateforme agréée.',
    pros: ['Très utilisé par les experts-comptables', 'Immatriculée plateforme agréée', 'Suite complète (notes de frais, banque)'],
    cons: ['Offres payantes plus chères que la concurrence'],
    score: 8.3,
    badges: ['Plateforme agréée'],
  },
  {
    slug: 'axonaut',
    name: 'Axonaut',
    category: 'facturation',
    website: 'https://axonaut.com/',
    affiliateUrl: null,
    program: {
      network: 'Direct (espace partenaires)',
      commission: '300 € par client apporté selon les conditions partenaires 2021 (à revérifier)',
      notes: 'Meilleure commission fixe identifiée : à prioriser dans les comparatifs TPE.',
    },
    price: { from: null, label: 'voir site', note: 'abonnement mensuel, essai gratuit' },
    priceChecked: '2026-10',
    freeTrial: true,
    commitment: 'Sans engagement',
    bestFor: 'TPE et PME qui veulent CRM + facturation + trésorerie',
    short: 'Logiciel de gestion tout-en-un français (CRM, devis, factures, trésorerie), agréé pour la facture électronique.',
    pros: ['CRM, devis, factures et trésorerie dans un seul outil', 'Agréé pour la facture électronique', 'Éditeur français'],
    cons: ['Trop complet pour un micro-entrepreneur seul'],
    score: 8.5,
    badges: ['Plateforme agréée', 'Français'],
  },
];

export const byCategory = (c: Category) =>
  SOFTWARE.filter((s) => s.category === c).sort((a, b) => b.score - a.score);

export function getSoftware(slug: string): Software {
  const s = SOFTWARE.find((x) => x.slug === slug);
  if (!s) throw new Error(`Logiciel inconnu : ${slug}`);
  return s;
}

/** URL interne de redirection affiliée (non indexée, bloquée dans robots.txt). */
export const goUrl = (slug: string) => `/go/${slug}/`;
