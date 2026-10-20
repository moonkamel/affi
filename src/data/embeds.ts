// Simulateurs intégrables sur d'autres sites (iframe /embed/<slug>/).
// Chaque intégration affiche un lien de crédit vers la page outil : c'est une source de backlinks naturels.
export interface Embed {
  slug: string;
  title: string;
  /** Page outil complète, cible du lien de crédit. */
  page: string;
  /** Hauteur de départ de l'iframe (px), ajustée ensuite automatiquement si le script est conservé. */
  height: number;
}

export const EMBEDS: Embed[] = [
  { slug: 'seuil-tva', title: 'Simulateur de seuil de TVA auto-entrepreneur', page: '/outils/simulateur-seuil-tva/', height: 560 },
  { slug: 'charges-auto-entrepreneur', title: 'Simulateur de charges auto-entrepreneur', page: '/outils/simulateur-charges-auto-entrepreneur/', height: 660 },
  { slug: 'tjm-freelance', title: 'Calcul du TJM freelance', page: '/outils/calcul-tjm-freelance/', height: 660 },
  { slug: 'indemnites-kilometriques', title: 'Calcul des indemnités kilométriques', page: '/outils/indemnites-kilometriques/', height: 520 },
  { slug: 'penalites-de-retard', title: 'Calcul des pénalités de retard', page: '/outils/calcul-penalites-de-retard/', height: 580 },
  { slug: 'ht-ttc', title: 'Convertisseur HT TTC', page: '/outils/calcul-ht-ttc/', height: 620 },
  { slug: 'marge', title: 'Calcul de marge et de prix de vente', page: '/outils/calcul-marge/', height: 780 },
  { slug: 'seuil-rentabilite', title: 'Calcul du seuil de rentabilité', page: '/outils/calcul-seuil-de-rentabilite/', height: 760 },
  { slug: 'bfr', title: 'Calcul du BFR et du fonds de roulement', page: '/outils/calcul-bfr/', height: 980 },
  { slug: 'ebe', title: 'Calcul de l’EBE', page: '/outils/calcul-ebe/', height: 860 },
  { slug: 'caf', title: 'Calcul de la capacité d’autofinancement', page: '/outils/calcul-caf/', height: 900 },
  { slug: 'tva-intracom', title: 'Numéro de TVA intracommunautaire et SIRET', page: '/outils/numero-tva-intracommunautaire/', height: 640 },
  { slug: 'swot', title: 'Générateur de matrice SWOT', page: '/creer/analyse-swot/', height: 900 },
  { slug: 'pestel', title: 'Générateur d’analyse PESTEL', page: '/creer/analyse-pestel/', height: 900 },
  { slug: 'qr-avis-google', title: 'Générateur de QR code avis Google', page: '/outils/lien-avis-google/', height: 760 },
  { slug: 'documents-employeur', title: 'Générateur de documents employeur', page: '/equipe/certificat-de-travail/', height: 1400 },
  { slug: 'cout-caisse', title: 'Simulateur de coût de caisse enregistreuse', page: '/outils/simulateur-cout-caisse-enregistreuse/', height: 820 },
];

export const getEmbed = (slug: string) => {
  const e = EMBEDS.find((x) => x.slug === slug);
  if (!e) throw new Error(`Simulateur intégrable inconnu : ${slug}`);
  return e;
};
