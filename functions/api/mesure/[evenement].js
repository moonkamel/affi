// Compteur d'usage anonyme des outils (aucun cookie, aucune donnée personnelle) :
// chaque appel apparaît dans les statistiques Cloudflare avec son chemin, par exemple /api/mesure/etude.
const EVENEMENTS = new Set(['etude', 'zone', 'evolution', 'ca-vers-bp', 'previsionnel', 'dossier-apercu', 'dossier-pdf', 'identifiants', 'swot', 'swot-pdf', 'pestel', 'pestel-pdf', 'qr-avis', 'qr-lien', 'qr-wifi', 'qr-telechargement', 'qr-affiche', 'emp-certificat', 'emp-attestation', 'emp-solde', 'emp-promesse', 'emp-fiche', 'emp-certificat-pdf', 'emp-attestation-pdf', 'emp-solde-pdf', 'emp-promesse-pdf', 'emp-fiche-pdf', 'ilc', 'indemnite-rupture', 'indemnite-licenciement', 'indemnite-faute', 'heures-sup', 'gratification']);

export function onRequest({ params }) {
  const status = EVENEMENTS.has(params.evenement) ? 204 : 404;
  return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
}
