// Baromètre des prix des logiciels pour TPE : statistiques calculées à partir de src/data/software.ts.
// Tout est recalculé à chaque build : mettre à jour les prix dans software.ts suffit.
import { SOFTWARE as ALL, type Category, type Software } from '../data/software';

// Périmètre figé de l'édition 2027 (relevé d'octobre 2026) : une étude datée ne doit pas changer à chaque
// logiciel ajouté au site. Pour l'édition suivante, mets à jour cette liste et le texte de la page.
const STUDY_SLUGS = [
  'lightspeed', 'lightspeed-retail', 'zelty', 'sumup', 'laddition', 'innovorder', 'zenchef', 'thefork-manager',
  'guestonline', 'eatapp', 'skello', 'combo', 'abby', 'indy', 'tiime', 'axonaut', 'pennylane', 'tolteck', 'obat',
  'batappli', 'sumup-terminal', 'zettle', 'mypos', 'hostinger', 'wix', 'shopify', 'systemeio', 'hubspot',
  'pipedrive', 'sellsy', 'brevo', 'zoho-inventory', 'odoo', 'n2f', 'planity', 'kiute', 'salonkee', 'learnybox',
  'podia', 'teachable',
];
export const STUDY = ALL.filter((s) => STUDY_SLUGS.includes(s.slug));

export const FAMILIES: Record<Category, string> = {
  facturation: 'Facturation',
  compta: 'Comptabilité et notes de frais',
  caisse: 'Logiciels de caisse',
  paiement: 'Terminaux de paiement',
  reservation: 'Réservation et rendez-vous',
  planning: 'Planning d’équipe',
  btp: 'Devis et factures bâtiment',
  site: 'Site internet et vente en ligne',
  crm: 'CRM et emailing',
  gestion: 'Gestion de stock',
  projet: 'Gestion de projet',
};

const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0);
// Offre gratuite sans limite de durée (les terminaux « sans abonnement » prélèvent des commissions : exclus).
const isFree = (s: Software) => s.price.from === 0 && s.category !== 'paiement';
// « Sans prix public » : l'éditeur ne publie aucun tarif et renvoie vers un devis (≠ tarif non relevé).
const noPublicPrice = (s: Software) => /sur devis/i.test(s.price.label);
const isFrench = (s: Software) => (s.badges ?? []).includes('Français');

export const families = (Object.keys(FAMILIES) as Category[])
  .map((c) => {
    const list = STUDY.filter((s) => s.category === c);
    const prices = list.filter((s) => s.price.from !== null).map((s) => s.price.from as number);
    return {
      category: c,
      label: FAMILIES[c],
      count: list.length,
      free: list.filter(isFree).length,
      noPrice: list.filter(noPublicPrice).length,
      french: list.filter(isFrench).length,
      minPrice: prices.length ? Math.min(...prices) : null,
      maxPrice: prices.length ? Math.max(...prices) : null,
      names: list.map((s) => s.name),
    };
  })
  .filter((f) => f.count > 0);

export const totals = {
  count: STUDY.length,
  families: families.length,
  free: STUDY.filter(isFree).length,
  noPrice: STUDY.filter(noPublicPrice).length,
  french: STUDY.filter(isFrench).length,
  freeTrial: STUDY.filter((s) => s.freeTrial === true).length,
};
export const share = {
  free: pct(totals.free, totals.count),
  noPrice: pct(totals.noPrice, totals.count),
  french: pct(totals.french, totals.count),
  freeTrial: pct(totals.freeTrial, totals.count),
};

/** Familles triées par part de logiciels sans prix public (graphique). */
export const opacity = families
  .map((f) => ({ label: f.label, value: pct(f.noPrice, f.count), n: f.noPrice, of: f.count }))
  .sort((a, b) => b.value - a.value);

// Budgets types : prix d'entrée publics des outils recommandés sur le site (hors matériel, commissions et taxes).
const price = (slug: string) => STUDY.find((s) => s.slug === slug)?.price.from ?? 0;
export const budgets = [
  { profile: 'Freelance ou micro-entrepreneur de services', tools: [['Facturation', 'abby'], ['Site internet', 'hostinger'], ['Emailing', 'brevo']] },
  { profile: 'Artisan du bâtiment', tools: [['Devis et factures', 'obat'], ['Site internet', 'hostinger'], ['Terminal de paiement', 'sumup-terminal']] },
  { profile: 'Commerçant avec boutique en ligne', tools: [['Boutique en ligne', 'shopify'], ['Gestion de stock', 'zoho-inventory'], ['Facturation', 'indy']] },
  { profile: 'Restaurant avec salariés', tools: [['Caisse', 'lightspeed'], ['Réservation', 'zenchef'], ['Planning', 'combo']] },
].map((b) => {
  const rows = b.tools.map(([need, slug]) => {
    const sw = STUDY.find((s) => s.slug === slug)!;
    return { need, name: sw.name.replace(/ \(.*\)$/, ''), price: price(slug), paiement: sw.category === 'paiement' };
  });
  return { profile: b.profile, rows, total: rows.reduce((t, r) => t + r.price, 0) };
});

export const eur = (n: number) => n.toLocaleString('fr-FR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €';
