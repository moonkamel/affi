# Stratégie SEO : Coup de Feu

Document de travail : mots-clés, plan de contenu, check-list de lancement et plan Google Ads.

> **Volumes de recherche** : je n'ai pas pu obtenir de volumes chiffrés fiables (ils nécessitent Google Keyword Planner, Semrush ou Ahrefs).
> Les priorités ci-dessous viennent de l'intention d'achat, de la concurrence observée dans les SERP et de l'actualité (réforme de la facture électronique).
> **Première action** : passe la colonne « mot-clé » dans Google Keyword Planner (gratuit avec un compte Ads), localisation France, et ajuste les priorités.

---

## 1. Le positionnement qui fait la différence

Les SERP « logiciel caisse restaurant » sont tenues par des comparateurs généralistes (Capterra, Appvizer, La Fabrique du Net, tool-advisor) et par les blogs des éditeurs eux-mêmes (Skello, Eat App, Abby), qui sont juges et parties. Personne n'écrit avec une **expérience réelle de la cuisine**. Ce critère (le « E » d'E-E-A-T) est celui que Google valorise le plus depuis 2023.

**Pour l'exploiter, il faut des preuves visibles :**
- ta photo et ton parcours réel sur `/a-propos/` ;
- des captures d'écran de tes propres essais et démos dans chaque avis (`src/assets/`, avec un `alt` descriptif) ;
- des anecdotes de service précises (« au passe, ce qui compte c'est… »).

Sans ces éléments, le site ressemble aux autres. C'est **la** tâche la plus importante avant le lancement.

---

## 2. Carte des mots-clés (1 mot-clé principal = 1 URL)

### Pages déjà en ligne

| URL | Mot-clé principal | Intention | Priorité |
|---|---|---|---|
| /restaurant/logiciel-caisse-restaurant/ | logiciel caisse restaurant | Comparaison → achat | ★★★ |
| /facturation/facture-electronique-2026/ | facture électronique 2026 | Info (gros volume, actualité) | ★★★ |
| /facturation/logiciel-facturation-auto-entrepreneur/ | logiciel facturation auto entrepreneur | Comparaison → achat | ★★★ |
| /restaurant/logiciel-reservation-restaurant/ | logiciel réservation restaurant | Comparaison → achat | ★★☆ |
| /outils/simulateur-cout-caisse-enregistreuse/ | prix caisse enregistreuse restaurant | Prix → achat | ★★☆ |
| /comparatifs/zelty-vs-lightspeed/ | zelty vs lightspeed | Décision finale | ★★☆ (faible volume, conversion max) |
| /alternatives/alternatives-lightspeed/ | alternative lightspeed | Décision finale | ★★☆ |
| /avis/lightspeed-restaurant/ | lightspeed restaurant avis | Décision finale | ★★☆ |
| /avis/sumup-caisse-pro/ | sumup caisse pro avis | Décision finale | ★★☆ |
| /restaurant/logiciel-planning-restaurant/ | logiciel planning restaurant | Comparaison → achat | ★★☆ |
| /restaurant/facture-electronique-restaurant/ | facture électronique restaurant | Info → pont vers la caisse | ★☆☆ |

### Les 30 prochaines pages, par ordre de priorité

**Vague 1 (mois 1-2) : facture électronique, la vague de recherche en cours jusqu'à septembre 2027**
1. /facturation/plateforme-agreee-facture-electronique/ : « plateforme agréée facture électronique », « liste PDP »
2. /facturation/facture-electronique-auto-entrepreneur/ : « facture électronique auto entrepreneur »
3. /facturation/logiciel-facturation-gratuit/ : « logiciel facturation gratuit »
4. /facturation/factur-x/ : « factur-x c'est quoi »
5. /facturation/e-reporting/ : « e-reporting »
6. /facturation/logiciel-facturation-artisan/ : « logiciel devis facture artisan »
7. /facturation/logiciel-facturation-btp/ : « logiciel devis facture btp » (Tolteck, Obat : chercher leurs programmes)
8. /comparatifs/abby-vs-indy/
9. /avis/abby/ · /avis/axonaut/ (Axonaut : 300 € par client, à prioriser)
10. Pages « alternatives à X » pour les outils de facturation non agréés (vérifier la liste officielle) : trafic de migration

**Vague 2 (mois 2-4) : silo restaurant**
11. /restaurant/caisse-enregistreuse-bar/ · /restaurant/caisse-enregistreuse-food-truck/ · /restaurant/caisse-boulangerie/
12. /restaurant/logiciel-gestion-stock-restaurant/
13. /restaurant/borne-de-commande-restaurant/
14. /restaurant/commande-en-ligne-restaurant-sans-commission/
15. /restaurant/logiciel-fiche-technique-restaurant/ (ton expertise cuisine, très peu de concurrence)
16. /outils/calculateur-cout-matiere/ (food cost) : outil + aimant à liens
17. /outils/calculateur-coefficient-multiplicateur/
18. /comparatifs/zenchef-vs-thefork/ · /comparatifs/skello-vs-combo/ · /comparatifs/sumup-vs-zettle/
19. /alternatives/alternatives-thefork/ · /alternatives/alternatives-zenchef/
20. /avis/zelty/ · /avis/zenchef/ · /avis/skello/ · /avis/combo/ · /avis/laddition/

**Vague 3 (mois 4+) : élargissement**
- Ouvrir un restaurant : « business plan restaurant », « licence IV », « permis d'exploitation » → guides qui renvoient vers tous les comparatifs.
- Création de site pour restaurant (Systeme.io 40 % récurrent, Hostinger, Shopify).
- Terminaux de paiement : « tpe sans abonnement », « meilleur terminal de paiement commerçant » (SumUp, Zettle, myPOS).

### Modèles de titres qui marchent dans ces SERP
- `Meilleur logiciel de X en 2026 : comparatif de N solutions`
- `X vs Y : lequel choisir pour [profil] ?`
- `Avis X 2026 : prix, points forts et limites`
- `N alternatives à X (moins chères / sans commission)`

---

## 3. Ce qui est déjà en place techniquement

- **Astro statique** : HTML pur, CSS inline, zéro JS sauf le simulateur. Core Web Vitals au maximum.
- **URLs propres par silo**, slash final partout, canonical absolue, hreflang fr-FR.
- **Données structurées** : Organization, WebSite, Person (auteur), Article, BreadcrumbList, ItemList (classements), Review (avis), FAQPage, CollectionPage.
- **Sitemap XML** automatique (sans /go/ ni pages noindex) + robots.txt.
- **llms.txt** pour être cité par ChatGPT, Perplexity et les AI Overviews.
- **Liens affiliés** via `/go/<slug>/` : `rel="sponsored nofollow"`, redirection 302 (`_redirects`), bloqués dans robots.txt, en-tête `X-Robots-Tag: noindex`.
- **Maillage interne** automatique (articles liés + même silo) et pages hub par silo.
- **Bloc « L'essentiel en 30 secondes »** en haut de chaque page : format repris par les extraits optimisés et les réponses IA.
- **Date de mise à jour visible** + `dateModified` : Google privilégie les comparatifs récents.
- **Audit automatique** : `npm run build && npm run check` contrôle h1, title, description, doublons, canonical, JSON-LD, liens cassés, rel sponsored, sitemap et pages orphelines.

---

## 4. Check-list de lancement

1. [ ] Acheter le domaine (ex. coupdefeu.fr) et le mettre dans `src/data/site.ts` (ou variable `SITE_URL`).
2. [ ] Compléter les mentions légales (`SITE.publisher`).
3. [ ] Ajouter ta photo et tes profils (`SITE.author.sameAs`, LinkedIn par exemple).
4. [ ] S'inscrire aux programmes d'affiliation et coller les liens dans `src/data/software.ts` (`affiliateUrl`).
5. [ ] **Revérifier chaque prix** auprès des éditeurs (ils sont indicatifs, relevés en octobre 2026).
6. [ ] Ajouter tes captures d'écran et tes retours d'essai dans les avis.
7. [ ] Déployer sur **Cloudflare Pages** ou **Netlify** (gratuits, gèrent `_redirects` et `_headers`) : build `npm run build`, dossier `dist`.
8. [ ] Google Search Console : valider le domaine, soumettre `sitemap-index.xml`, demander l'indexation des 4 pages piliers.
9. [ ] Bing Webmaster Tools : importer depuis Search Console (Bing alimente aussi ChatGPT Search).
10. [ ] Mesure d'audience sans cookie (Plausible, Umami ou Cloudflare Web Analytics) pour éviter le bandeau cookies, avec suivi des clics `data-aff`.

---

## 5. Obtenir des liens (ce qui fait vraiment monter vite)

Un site neuf sans liens ne se positionne pas sur « logiciel caisse restaurant », même avec un contenu parfait. Plan réaliste :

1. **Les outils comme aimants à liens** : le simulateur de caisse et les futurs calculateurs de food cost sont citables par les blogs CHR, les écoles hôtelières, les CCI et les forums.
2. **Annuaires et fiches** : Google Business Profile (si tu as une adresse pro), annuaires de startups et d'outils.
3. **Relations presse sectorielle** : L'Hôtellerie Restauration, Néorestauration, Food Service Vision. Angle : « un ancien cuisinier compare les caisses : ce que les éditeurs ne disent pas ».
4. **Éditeurs partenaires** : une fois affilié, demande à figurer sur leur page partenaires (souvent un lien).
5. **Communautés** : groupes Facebook de restaurateurs, Reddit r/france et r/vosfinances (pour la facture électronique), en apportant de l'aide, pas du spam.
6. **Témoignage** : propose un retour d'expérience à des podcasts restauration.

Objectif : 10 à 20 domaines référents de qualité les 6 premiers mois.

---

## 6. Google Ads : quand et comment

- **Pas avant 2 à 3 mois de données SEO.** Commence par les pages qui convertissent déjà.
- **Lis les règles de chaque programme** : beaucoup interdisent d'enchérir sur leur marque (« zelty », « axonaut »…).
- **Cibles rentables** : mots-clés génériques à forte intention et prime fixe élevée :
  - SumUp (200 € par Caisse Pro) → « caisse enregistreuse restaurant prix », « caisse ipad restaurant »
  - Axonaut (300 € par client) → « logiciel gestion tpe », « logiciel devis facture »
- **Page de destination = le comparatif** (jamais une redirection directe : Google refuse les « bridge pages »).
- Budget de test : 5 à 10 €/jour, mots-clés exacts, extensions de lien vers le simulateur. On coupe tout ce qui ne rentre pas dans un coût par lead inférieur à 30 % de la commission.

---

## 7. Routine de mise à jour

- **Chaque mois** : vérifier les prix (`priceChecked` dans `software.ts`), mettre à jour `updated` dans les articles modifiés, `SITE.pricesChecked`.
- **Chaque trimestre** : dans Search Console, repérer les requêtes en position 8 à 20 et enrichir la page correspondante (section H2 dédiée + entrée de FAQ).
- **Septembre 2027** (fin de la réforme pour les TPE) : basculer les pages facture électronique vers « mise en conformité » et « changer de logiciel ».
