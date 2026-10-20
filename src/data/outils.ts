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
    intro: 'Fixer tes prix, lire tes comptes et suivre les indicateurs que regarde ton banquier.',
    outils: ['comptabilite/chiffre-d-affaires', 'outils/calcul-marge', 'outils/calcul-seuil-de-rentabilite', 'comptabilite/compte-de-resultat', 'comptabilite/bilan-comptable', 'outils/calcul-bfr', 'outils/calcul-ebe', 'outils/calcul-caf', 'outils/calcul-tjm-freelance'],
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
    intro: 'Embaucher, payer et voir partir un salarié : les calculs et les documents, prêts en PDF.',
    outils: ['equipe/promesse-d-embauche', 'equipe/fiche-de-poste', 'equipe/heures-supplementaires', 'equipe/gratification-stage', 'equipe/rupture-conventionnelle', 'equipe/indemnite-licenciement', 'equipe/attestation-employeur', 'equipe/certificat-de-travail', 'equipe/solde-de-tout-compte'],
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

export type TypeOutil = 'calculateur' | 'modele' | 'generateur' | 'analyse';
export const TYPES_OUTIL: Record<TypeOutil, { label: string; pluriel: string; action: string }> = {
  calculateur: { label: 'Calculateur', pluriel: 'Calculateurs', action: 'Calculer' },
  modele: { label: 'Modèle PDF', pluriel: 'Modèles PDF', action: 'Remplir' },
  generateur: { label: 'Générateur', pluriel: 'Générateurs', action: 'Générer' },
  analyse: { label: 'Analyse', pluriel: 'Analyses', action: 'Analyser' },
};

/** Nom court, type et accroche de chaque outil (cartes de l'accueil et de /outils/). `cles` : mots de la recherche rapide. */
export const OUTILS_INFO: Record<string, { titre: string; type: TypeOutil; accroche: string; cles?: string; nouveau?: boolean }> = {
  'outils/modele-facture-gratuit': { titre: 'Modèle de facture', type: 'modele', accroche: 'Conforme, prête en PDF en 2 minutes.', cles: 'facture facturer pdf mentions' },
  'outils/modele-devis-gratuit': { titre: 'Modèle de devis', type: 'modele', accroche: 'À envoyer et à faire signer.', cles: 'devis' },
  'outils/calcul-ht-ttc': { titre: 'Convertisseur HT ↔ TTC', type: 'calculateur', accroche: 'Tous les taux de TVA en une saisie.', cles: 'tva ht ttc taux' },
  'outils/numero-tva-intracommunautaire': { titre: 'Numéro de TVA intracommunautaire', type: 'calculateur', accroche: 'Calculé à partir du SIREN.', cles: 'tva intracommunautaire siren siret' },
  'outils/calcul-penalites-de-retard': { titre: 'Pénalités de retard', type: 'calculateur', accroche: 'Ce que tu peux réclamer, au taux en vigueur.', cles: 'retard impayé relance pénalités' },
  'outils/calcul-marge': { titre: 'Calcul de marge', type: 'calculateur', accroche: 'Taux de marge, de marque et coefficient.', cles: 'marge prix coefficient marque' },
  'outils/calcul-seuil-de-rentabilite': { titre: 'Seuil de rentabilité', type: 'calculateur', accroche: 'Combien vendre, et à quelle date.', cles: 'seuil rentabilité point mort' },
  'comptabilite/chiffre-d-affaires': { titre: 'Chiffre d’affaires', type: 'calculateur', accroche: 'HT, TVA collectée, plafonds micro et seuils de TVA.', cles: 'chiffre affaires ca ventes plafond micro', nouveau: true },
  'comptabilite/compte-de-resultat': { titre: 'Compte de résultat', type: 'calculateur', accroche: 'Du chiffre d’affaires au résultat net, avec l’impôt.', cles: 'compte résultat sig bénéfice résultat net impôt sociétés comptabilité', nouveau: true },
  'comptabilite/bilan-comptable': { titre: 'Bilan comptable', type: 'calculateur', accroche: 'Actif, passif, fonds de roulement et trésorerie.', cles: 'bilan actif passif capitaux propres trésorerie comptabilité', nouveau: true },
  'outils/calcul-bfr': { titre: 'Calcul du BFR', type: 'calculateur', accroche: 'L’argent bloqué dans ton cycle d’activité.', cles: 'bfr fonds de roulement trésorerie' },
  'outils/calcul-ebe': { titre: 'Calcul de l’EBE', type: 'calculateur', accroche: 'Ta rentabilité d’exploitation.', cles: 'ebe excédent brut' },
  'outils/calcul-caf': { titre: 'Calcul de la CAF', type: 'calculateur', accroche: 'Ce que ton activité dégage pour investir.', cles: 'caf autofinancement' },
  'outils/calcul-tjm-freelance': { titre: 'TJM freelance', type: 'calculateur', accroche: 'Le tarif journalier qui couvre tout.', cles: 'tjm freelance tarif prix journalier' },
  'creer/etude-de-marche': { titre: 'Étude de marché locale', type: 'analyse', accroche: 'Tes concurrents dans ta commune, comptés en ligne.', cles: 'étude marché concurrents' },
  'creer/business-plan': { titre: 'Business plan', type: 'modele', accroche: 'Prévisionnel sur 3 ans calculé pour toi.', cles: 'business plan prévisionnel banque' },
  'creer/dossier-de-financement': { titre: 'Dossier de financement', type: 'modele', accroche: 'Tout réuni en PDF pour la banque.', cles: 'dossier financement banque prêt' },
  'creer/analyse-swot': { titre: 'Analyse SWOT', type: 'generateur', accroche: 'Forces, faiblesses, opportunités, menaces.', cles: 'swot matrice' },
  'creer/analyse-pestel': { titre: 'Analyse PESTEL', type: 'generateur', accroche: 'Ton environnement en 6 axes.', cles: 'pestel matrice' },
  'outils/simulateur-charges-auto-entrepreneur': { titre: 'Charges auto-entrepreneur', type: 'calculateur', accroche: 'Combien il te reste vraiment.', cles: 'charges urssaf cotisations auto-entrepreneur micro' },
  'outils/simulateur-seuil-tva': { titre: 'Seuil de TVA', type: 'calculateur', accroche: 'Dois-tu facturer la TVA ?', cles: 'tva franchise seuil' },
  'outils/indice-ilc': { titre: 'Indice ILC', type: 'calculateur', accroche: 'Révision du loyer commercial.', cles: 'ilc loyer bail commercial', nouveau: true },
  'outils/indemnites-kilometriques': { titre: 'Indemnités kilométriques', type: 'calculateur', accroche: 'Le barème officiel en vigueur.', cles: 'kilométriques ik voiture frais' },
  'outils/simulateur-cout-caisse-enregistreuse': { titre: 'Coût d’une caisse', type: 'calculateur', accroche: 'Achat, abonnement et frais cachés.', cles: 'caisse enregistreuse coût' },
  'equipe/promesse-d-embauche': { titre: 'Promesse d’embauche', type: 'modele', accroche: 'Ce qui t’engage, en PDF.', cles: 'embauche salarié recrutement' },
  'equipe/fiche-de-poste': { titre: 'Fiche de poste', type: 'modele', accroche: 'Missions et compétences, en PDF.', cles: 'fiche poste salarié recrutement' },
  'equipe/heures-supplementaires': { titre: 'Heures supplémentaires', type: 'calculateur', accroche: 'Majorations de 25 % et 50 %.', cles: 'heures sup salarié', nouveau: true },
  'equipe/gratification-stage': { titre: 'Gratification de stage', type: 'calculateur', accroche: 'Le minimum légal à verser.', cles: 'stage stagiaire gratification', nouveau: true },
  'equipe/rupture-conventionnelle': { titre: 'Rupture conventionnelle', type: 'calculateur', accroche: 'Indemnité et coût pour l’employeur.', cles: 'rupture salarié indemnité départ', nouveau: true },
  'equipe/indemnite-licenciement': { titre: 'Indemnité de licenciement', type: 'calculateur', accroche: 'Le minimum légal à verser.', cles: 'licenciement salarié indemnité', nouveau: true },
  'equipe/attestation-employeur': { titre: 'Attestation employeur', type: 'modele', accroche: 'Le bon document, prêt à signer.', cles: 'attestation salarié france travail' },
  'equipe/certificat-de-travail': { titre: 'Certificat de travail', type: 'modele', accroche: 'Mentions obligatoires incluses.', cles: 'certificat travail salarié' },
  'equipe/solde-de-tout-compte': { titre: 'Solde de tout compte', type: 'modele', accroche: 'Le reçu à faire signer.', cles: 'solde tout compte salarié départ' },
  'outils/lien-avis-google': { titre: 'QR code avis Google', type: 'generateur', accroche: 'Ton lien d’avis et l’affichette à imprimer.', cles: 'avis google qr code clients' },
};

/** Parcours de l'accueil (« Où en es-tu aujourd'hui ? ») : quatre outils dans l'ordre où on en a besoin. */
export const SITUATIONS: { id: string; label: string; etape: string; titre: string; texte: string; cta: { label: string; id: string }; outils: string[] }[] = [
  { id: 'lancer', label: 'Je me lance', etape: 'Avant l’immatriculation', titre: 'Valider ton idée et convaincre la banque', texte: 'Compte tes concurrents, chiffre ton prévisionnel sur 3 ans et repars avec un dossier PDF prêt pour ton banquier.', cta: { label: 'Commencer par l’étude de marché', id: 'creer/etude-de-marche' }, outils: ['creer/etude-de-marche', 'creer/business-plan', 'creer/analyse-swot', 'creer/dossier-de-financement'] },
  { id: 'facturer', label: 'Je facture', etape: 'Au quotidien', titre: 'Être payé vite, sans erreur', texte: 'Factures et devis conformes, conversions de TVA et relances chiffrées. Prêt pour la facture électronique.', cta: { label: 'Créer une facture', id: 'outils/modele-facture-gratuit' }, outils: ['outils/modele-facture-gratuit', 'outils/modele-devis-gratuit', 'outils/calcul-ht-ttc', 'outils/calcul-penalites-de-retard'] },
  { id: 'piloter', label: 'Je pilote ma rentabilité', etape: 'Chaque mois', titre: 'Savoir où tu en es, chiffres à l’appui', texte: 'Marge, seuil de rentabilité, BFR, EBE : les indicateurs que regarde ton banquier, calculés en direct.', cta: { label: 'Calculer ma marge', id: 'outils/calcul-marge' }, outils: ['outils/calcul-marge', 'outils/calcul-seuil-de-rentabilite', 'outils/calcul-bfr', 'outils/calcul-ebe'] },
  { id: 'embaucher', label: 'J’embauche', etape: 'Premier salarié', titre: 'Recruter et gérer sans faux pas', texte: 'Promesse d’embauche, fiche de poste, heures supplémentaires et fin de contrat : les calculs et les documents en PDF.', cta: { label: 'Rédiger une promesse d’embauche', id: 'equipe/promesse-d-embauche' }, outils: ['equipe/promesse-d-embauche', 'equipe/fiche-de-poste', 'equipe/heures-supplementaires', 'equipe/rupture-conventionnelle'] },
];

/** Données lues par le navigateur pour « Reprends où tu en étais » (clé de stockage → page de l'outil). */
export const STOCKAGES_OUTILS: Record<string, string> = {
  'logimalin-bp': 'creer/business-plan',
  'logimalin-dossier': 'creer/dossier-de-financement',
  'logimalin-etude': 'creer/etude-de-marche',
  'logimalin-swot': 'creer/analyse-swot',
  'logimalin-pestel': 'creer/analyse-pestel',
  'logimalin-generateur-emetteur': 'outils/modele-facture-gratuit',
};
