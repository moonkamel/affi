// Seuils fiscaux utilisés par les calculateurs comptables (compte de résultat, chiffre d'affaires).
// Vérifiés le 20/10/2026 : à revoir à chaque loi de finances (tâche automatique du 27 décembre).

/** Impôt sur les sociétés (article 219 du CGI), loi de finances 2026 : relèvement à 100 000 € écarté. */
export const IS = {
  tauxReduit: 0.15,
  plafondTauxReduit: 42500,
  tauxNormal: 0.25,
  derniereVerification: '2026-10-20',
};

/** Plafonds de chiffre d'affaires de la micro-entreprise (2026-2028) et seuils de la franchise en base de TVA. */
export const MICRO = {
  plafond: { vente: 203100, services: 83600 },
  franchiseTva: { vente: 85000, services: 37500 },
  franchiseTvaMajore: { vente: 93500, services: 41250 },
};
