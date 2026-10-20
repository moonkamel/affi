// Relais vers l'API publique Recherche d'entreprises (DINUM), utilisé par l'étude de marché locale
// si l'appel direct depuis le navigateur est bloqué. Seuls les paramètres utiles sont transmis.
const API = 'https://recherche-entreprises.api.gouv.fr/search';
const ALLOWED = ['q', 'activite_principale', 'epci', 'code_commune', 'code_postal', 'departement', 'etat_administratif', 'per_page', 'page', 'minimal', 'include', 'limite_matching_etablissements'];

export async function onRequestGet({ request }) {
  const incoming = new URL(request.url).searchParams;
  const params = new URLSearchParams();
  for (const key of ALLOWED) {
    const value = incoming.get(key);
    if (value && value.length <= 400) params.set(key, value);
  }
  if (![...params.keys()].length) {
    return new Response(JSON.stringify({ erreur: 'Paramètre manquant' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
  const upstream = await fetch(`${API}?${params}`, {
    headers: { Accept: 'application/json', 'User-Agent': 'Logimalin etude de marche (https://www.logi-malin.fr)' },
    cf: { cacheTtl: 86400, cacheEverything: true },
  });
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': upstream.ok ? 'public, max-age=86400' : 'no-store',
  };
  const retry = upstream.headers.get('Retry-After');
  if (retry) headers['Retry-After'] = retry;
  return new Response(upstream.body, { status: upstream.status, headers });
}
