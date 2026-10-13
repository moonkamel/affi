# Coup de Feu

Site d'affiliation SEO : logiciels pour restaurants (caisse, réservation, planning) et facturation / facture électronique pour TPE et indépendants.

Stack : [Astro](https://astro.build) statique + MDX. Zéro framework JS côté client.

## Commandes

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # génère dist/
npm run check    # audit SEO de dist/ (à lancer après build)
```

## Où modifier quoi

| Quoi | Où |
|---|---|
| Domaine, auteur, mentions légales | `src/data/site.ts` |
| Logiciels, prix, **liens affiliés** | `src/data/software.ts` (`affiliateUrl`) |
| Articles | `src/content/articles/<silo>/<slug>.mdx` → URL `/<silo>/<slug>/` |
| Composants d'article | `src/components/` (`ProductCard`, `ComparisonTable`, `AffLink`, `Verdict`, `Callout`) |
| Stratégie, mots-clés, check-list de lancement | `docs/STRATEGIE-SEO.md` |

Ajouter un article : copier un `.mdx` existant, changer le frontmatter (le schéma dans `src/content.config.ts` refuse un `seoTitle` > 60 caractères ou une description hors 110-160). Tout le reste (sitemap, JSON-LD, maillage, hub du silo, llms.txt) est automatique.

## Déploiement

Cloudflare Pages ou Netlify : commande `npm run build`, dossier `dist`. Les fichiers `_redirects` (liens `/go/`) et `_headers` sont pris en charge nativement. Définir `SITE_URL` si le domaine diffère de celui de `site.ts`.
