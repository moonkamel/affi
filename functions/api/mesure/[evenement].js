// Compteur d'usage anonyme des outils (aucun cookie, aucune donnée personnelle) :
// chaque appel apparaît dans les statistiques Cloudflare avec son chemin, par exemple /api/mesure/etude.
const EVENEMENTS = new Set(['etude', 'zone', 'evolution', 'ca-vers-bp', 'previsionnel', 'dossier-apercu', 'dossier-pdf', 'identifiants']);

export function onRequest({ params }) {
  const status = EVENEMENTS.has(params.evenement) ? 204 : 404;
  return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } });
}
