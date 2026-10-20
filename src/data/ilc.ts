// Indice des loyers commerciaux (ILC), base 100 au 1er trimestre 2008, série INSEE 001532540.
// Mise à jour trimestrielle (tâche programmée) : ajouter la nouvelle valeur en fin de liste, puis mettre à jour
// `derniereVerification`, `dernierePublication` et `prochainePublication`, ainsi que la dernière valeur citée en dur
// dans src/content/articles/outils/indice-ilc.mdx (résumé, FAQ, exemple). Ne jamais modifier une valeur déjà publiée.
export interface ValeurIlc { annee: number; trimestre: 1 | 2 | 3 | 4; valeur: number }

export const ILC: ValeurIlc[] = [
  { annee: 2021, trimestre: 1, valeur: 116.73 },
  { annee: 2021, trimestre: 2, valeur: 118.41 },
  { annee: 2021, trimestre: 3, valeur: 119.7 },
  { annee: 2021, trimestre: 4, valeur: 118.59 },
  { annee: 2022, trimestre: 1, valeur: 120.61 },
  { annee: 2022, trimestre: 2, valeur: 123.65 },
  { annee: 2022, trimestre: 3, valeur: 126.13 },
  { annee: 2022, trimestre: 4, valeur: 126.05 },
  { annee: 2023, trimestre: 1, valeur: 128.68 },
  { annee: 2023, trimestre: 2, valeur: 131.81 },
  { annee: 2023, trimestre: 3, valeur: 133.66 },
  { annee: 2023, trimestre: 4, valeur: 132.63 },
  { annee: 2024, trimestre: 1, valeur: 134.58 },
  { annee: 2024, trimestre: 2, valeur: 136.72 },
  { annee: 2024, trimestre: 3, valeur: 137.71 },
  { annee: 2024, trimestre: 4, valeur: 135.3 },
  { annee: 2025, trimestre: 1, valeur: 135.87 },
  { annee: 2025, trimestre: 2, valeur: 136.81 },
  { annee: 2025, trimestre: 3, valeur: 137.09 },
  { annee: 2025, trimestre: 4, valeur: 134.62 },
  { annee: 2026, trimestre: 1, valeur: 135.26 },
  { annee: 2026, trimestre: 2, valeur: 137.16 },
];

/** Date de la dernière vérification de la série et prochaine publication attendue de l'INSEE. */
export const ILC_INFO = {
  derniereVerification: '2026-10-20',
  dernierePublication: 'publié le 23 septembre 2026',
  prochainePublication: 'fin décembre 2026 (3e trimestre 2026)',
};

export const libelleIlc = (v: ValeurIlc) => `${v.trimestre === 1 ? '1er' : `${v.trimestre}e`} trimestre ${v.annee}`;
