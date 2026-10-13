// Données brutes du baromètre, téléchargeables (journalistes, chercheurs, blogueurs).
import type { APIRoute } from 'astro';
import { SOFTWARE } from '../../data/software';
import { FAMILIES } from '../../lib/barometre';

const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
export const GET: APIRoute = () => {
  const head = ['logiciel', 'famille', 'prix_entree_eur_mois', 'tarif_affiche', 'precision', 'offre_gratuite', 'essai_gratuit', 'editeur_francais', 'releve'];
  const rows = SOFTWARE.map((s) => [
    s.name,
    FAMILIES[s.category],
    s.price.from ?? '',
    s.price.label,
    s.price.note ?? '',
    s.price.from === 0 ? 'oui' : 'non',
    s.freeTrial === null ? 'inconnu' : s.freeTrial ? 'oui' : 'non',
    (s.badges ?? []).includes('Français') ? 'oui' : 'non',
    s.priceChecked,
  ]);
  const csv = '﻿' + [head, ...rows].map((r) => r.map(esc).join(';')).join('\r\n') + '\r\n';
  return new Response(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8' } });
};
