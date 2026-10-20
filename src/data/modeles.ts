// Bibliothèque de modèles (/modeles/) : chaque modèle renvoie vers la page qui le contient.
// `format` : « en-ligne » = formulaire à remplir puis PDF ; « a-copier » = texte prêt à recopier ; « pdf » = fichier à télécharger.
// `apercu` : forme de la miniature dessinée en CSS sur la carte.

export type CategorieModele = 'facturer' | 'creer' | 'employer' | 'clients';
export type FormatModele = 'en-ligne' | 'a-copier' | 'pdf';
export type ApercuModele = 'facture' | 'devis' | 'avoir' | 'recu' | 'bon' | 'lettre' | 'plan' | 'dossier' | 'matrice' | 'pestel' | 'contrat' | 'fiche' | 'certificat' | 'affiche' | 'checklist';

export const CATEGORIES_MODELES: Record<CategorieModele, string> = {
  facturer: 'Facturer et se faire payer',
  creer: 'Créer et financer',
  employer: 'Employer',
  clients: 'Clients et visibilité',
};

export const FORMATS_MODELES: Record<FormatModele, { label: string; action: string }> = {
  'en-ligne': { label: 'À remplir en ligne', action: 'Remplir et télécharger' },
  'a-copier': { label: 'Modèle à recopier', action: 'Voir le modèle' },
  pdf: { label: 'PDF à imprimer', action: 'Télécharger' },
};

export interface Modele {
  titre: string;
  accroche: string;
  categorie: CategorieModele;
  format: FormatModele;
  apercu: ApercuModele;
  /** Article qui contient le modèle (chemin sans barre finale), ou adresse complète pour une ressource. */
  page: string;
  ancre?: string;
  nouveau?: boolean;
}

export const MODELES: Modele[] = [
  { titre: 'Facture', accroche: 'Conforme, numérotée, avec la bonne mention de TVA.', categorie: 'facturer', format: 'en-ligne', apercu: 'facture', page: 'outils/modele-facture-gratuit' },
  { titre: 'Devis', accroche: 'Durée de validité, acompte et zone de signature.', categorie: 'facturer', format: 'en-ligne', apercu: 'devis', page: 'outils/modele-devis-gratuit' },
  { titre: 'Facture d’avoir', accroche: 'Pour annuler ou corriger une facture sans la supprimer.', categorie: 'facturer', format: 'a-copier', apercu: 'avoir', page: 'facturation/facture-avoir', ancre: 'modèle-de-facture-davoir-à-recopier' },
  { titre: 'Facture proforma', accroche: 'Le modèle de devis, intitulé « Facture proforma ».', categorie: 'facturer', format: 'en-ligne', apercu: 'facture', page: 'facturation/facture-proforma', ancre: 'faire-une-facture-proforma-rapidement' },
  { titre: 'Reçu de paiement', accroche: 'La preuve d’un paiement, en espèces ou par virement.', categorie: 'facturer', format: 'a-copier', apercu: 'recu', page: 'facturation/recu-de-paiement', ancre: 'modèle-de-reçu-de-paiement' },
  { titre: 'Attestation de paiement', accroche: 'Quand un client te demande un justificatif.', categorie: 'facturer', format: 'a-copier', apercu: 'certificat', page: 'facturation/recu-de-paiement', ancre: 'modèle-dattestation-de-paiement' },
  { titre: 'Bon de commande', accroche: 'L’accord du client, avant la livraison.', categorie: 'facturer', format: 'a-copier', apercu: 'bon', page: 'facturation/bon-de-commande', ancre: 'le-bon-de-commande' },
  { titre: 'Bon de livraison', accroche: 'Ce qui a été livré, signé à la réception.', categorie: 'facturer', format: 'a-copier', apercu: 'bon', page: 'facturation/bon-de-commande', ancre: 'le-bon-de-livraison' },
  { titre: 'Lettre de premier rappel', accroche: 'Une relance cordiale, le lendemain de l’échéance.', categorie: 'facturer', format: 'a-copier', apercu: 'lettre', page: 'facturation/relance-facture-impayee', ancre: 'modèle-1--premier-rappel-j1' },
  { titre: 'Lettre de relance ferme', accroche: 'Quinze jours plus tard, avec les pénalités.', categorie: 'facturer', format: 'a-copier', apercu: 'lettre', page: 'facturation/relance-facture-impayee', ancre: 'modèle-2--relance-ferme-j15' },
  { titre: 'Business plan', accroche: 'Prévisionnel sur 3 ans calculé pour toi.', categorie: 'creer', format: 'en-ligne', apercu: 'plan', page: 'creer/business-plan' },
  { titre: 'Dossier de financement', accroche: 'Le dossier complet à remettre à la banque.', categorie: 'creer', format: 'en-ligne', apercu: 'dossier', page: 'creer/dossier-de-financement' },
  { titre: 'Matrice SWOT', accroche: 'Forces, faiblesses, opportunités, menaces.', categorie: 'creer', format: 'en-ligne', apercu: 'matrice', page: 'creer/analyse-swot' },
  { titre: 'Analyse PESTEL', accroche: 'Ton environnement en six axes.', categorie: 'creer', format: 'en-ligne', apercu: 'pestel', page: 'creer/analyse-pestel' },
  { titre: 'Promesse d’embauche', accroche: 'Poste, salaire, date : ce qui t’engage.', categorie: 'employer', format: 'en-ligne', apercu: 'contrat', page: 'equipe/promesse-d-embauche', nouveau: true },
  { titre: 'Fiche de poste', accroche: 'Missions, compétences et rattachement.', categorie: 'employer', format: 'en-ligne', apercu: 'fiche', page: 'equipe/fiche-de-poste', nouveau: true },
  { titre: 'Certificat de travail', accroche: 'À remettre au salarié à la fin du contrat.', categorie: 'employer', format: 'en-ligne', apercu: 'certificat', page: 'equipe/certificat-de-travail', nouveau: true },
  { titre: 'Attestation employeur', accroche: 'Attestation de travail, prête à signer.', categorie: 'employer', format: 'en-ligne', apercu: 'certificat', page: 'equipe/attestation-employeur', nouveau: true },
  { titre: 'Solde de tout compte', accroche: 'Le reçu détaillé des sommes versées au départ.', categorie: 'employer', format: 'en-ligne', apercu: 'recu', page: 'equipe/solde-de-tout-compte', nouveau: true },
  { titre: 'Affichette avis Google', accroche: 'Ton QR code d’avis, prêt à poser sur le comptoir.', categorie: 'clients', format: 'en-ligne', apercu: 'affiche', page: 'outils/lien-avis-google' },
  { titre: 'Check-list facture électronique', accroche: 'Les 18 actions avant le 1er septembre 2027.', categorie: 'facturer', format: 'pdf', apercu: 'checklist', page: 'ressources/checklist-facture-electronique-2027' },
];
