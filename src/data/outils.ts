// Classement des outils gratuits par besoin : page /outils/ et mise en avant sur l'accueil.
// Chaque entrée est l'identifiant d'un article de type « outil » (chemin sans extension).
// Un outil absent de cette liste apparaît quand même sur /outils/, dans « Autres outils ».

export interface GroupeOutils {
  id: string;
  titre: string;
  intro: string;
  outils: string[];
}

export const GROUPES_OUTILS: GroupeOutils[] = [
  {
    id: 'facturer',
    titre: 'Facturer et se faire payer',
    intro: 'Factures et devis conformes, conversions de TVA, relances : tout pour être payé vite.',
    outils: ['outils/modele-facture-gratuit', 'outils/modele-devis-gratuit', 'outils/calcul-ht-ttc', 'outils/numero-tva-intracommunautaire', 'outils/calcul-penalites-de-retard'],
  },
  {
    id: 'rentabilite',
    titre: 'Prix et rentabilité',
    intro: 'Fixer tes prix, savoir combien vendre et suivre les indicateurs que regarde ton banquier.',
    outils: ['outils/calcul-marge', 'outils/calcul-seuil-de-rentabilite', 'outils/calcul-bfr', 'outils/calcul-ebe', 'outils/calcul-caf', 'outils/calcul-tjm-freelance'],
  },
  {
    id: 'creer',
    titre: 'Créer ton entreprise',
    intro: 'De l’étude de marché au dossier pour la banque, en passant par le diagnostic stratégique.',
    outils: ['creer/etude-de-marche', 'creer/business-plan', 'creer/dossier-de-financement', 'creer/analyse-swot', 'creer/analyse-pestel'],
  },
  {
    id: 'charges',
    titre: 'Charges, TVA, loyer et frais',
    intro: 'Cotisations, seuils de TVA, révision du loyer commercial, frais de déplacement et coût d’une caisse.',
    outils: ['outils/simulateur-charges-auto-entrepreneur', 'outils/simulateur-seuil-tva', 'outils/indice-ilc', 'outils/indemnites-kilometriques', 'outils/simulateur-cout-caisse-enregistreuse'],
  },
  {
    id: 'employer',
    titre: 'Employer',
    intro: 'Les documents à remettre à l’embauche et au départ d’un salarié, prêts en PDF.',
    outils: ['equipe/promesse-d-embauche', 'equipe/fiche-de-poste', 'equipe/attestation-employeur', 'equipe/certificat-de-travail', 'equipe/solde-de-tout-compte'],
  },
  {
    id: 'clients',
    titre: 'Trouver des clients',
    intro: 'Être visible et rassurer tes futurs clients.',
    outils: ['outils/lien-avis-google'],
  },
];

/** Outils mis en avant sur la page d'accueil, avec une accroche courte. */
export const OUTILS_ACCUEIL: { id: string; titre: string; accroche: string }[] = [
  { id: 'outils/calcul-ht-ttc', titre: 'Convertisseur HT ↔ TTC', accroche: 'Tous les taux de TVA, en une saisie.' },
  { id: 'outils/calcul-marge', titre: 'Calcul de marge', accroche: 'Taux de marge, de marque, coefficient et effet des remises.' },
  { id: 'creer/etude-de-marche', titre: 'Étude de marché locale', accroche: 'Tes concurrents dans ta commune, chiffrés en 30 secondes.' },
  { id: 'outils/calcul-seuil-de-rentabilite', titre: 'Seuil de rentabilité', accroche: 'Combien vendre, et à quelle date tu deviens rentable.' },
  { id: 'outils/lien-avis-google', titre: 'QR code avis Google', accroche: 'Ton lien d’avis, ton QR code et l’affichette à imprimer.' },
  { id: 'equipe/certificat-de-travail', titre: 'Documents employeur', accroche: 'Certificat de travail, solde de tout compte, promesse d’embauche.' },
];
