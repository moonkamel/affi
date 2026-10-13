# Stratégie SEO : Logimalin (toutes les TPE et indépendants)

Document de travail : positionnement, architecture, mots-clés **avec données réelles**, plan de contenu, liens, Google Ads.

> **Source des données** : OpenSEO (données DataForSEO / Google Ads), marché France, langue française, octobre 2026.
> **Volume** = recherches mensuelles moyennes en France. **KD** = difficulté de classement (0 à 100) : sous 20, un site neuf avec un bon contenu peut viser la première page ; au-dessus de 50, il faut de l'autorité (liens).
> Les mots-clés et le contexte sont enregistrés dans le projet OpenSEO « Logimalin (France) ».

---

## 1. Le constat : qui occupe le terrain aujourd'hui

Sur « logiciel facturation », « logiciel comptabilité TPE », « CRM TPE », les résultats sont tenus par trois types de sites :

1. **Les blogs des éditeurs** (Abby, Pennylane, Tiime, Skello, Combo…) : juges et parties, ils se classent premiers dans leurs propres comparatifs.
2. **Les comparateurs généralistes** (Capterra, Appvizer, La Fabrique du Net, tool-advisor, independant.io, Codeur.com) : très larges, souvent superficiels.
3. **Les médias** (Clubic, Journal du Net, Le Blog du Dirigeant).

Leur faiblesse commune : **ils raisonnent par logiciel, pas par entreprise**. Personne ne répond bien à « je suis plombier, de quoi ai-je besoin et combien ça coûte au total ? ». C'est notre angle.

## 2. Le nom : Logimalin

Choisi à partir des données OpenSEO (octobre 2026) : environ 70 noms testés sur le volume de recherche, puis la page de résultats Google des 13 finalistes.

- **Volume de recherche nul et page Google vierge** : aucune marque ni aucun autre sens à combattre, le site peut se classer premier sur son propre nom très vite.
- **« logi » + « malin »** : le sujet (les logiciels) et la promesse (le bon choix, le bon plan), sans enfermer le site dans une seule thématique.
- **Écartés** : Bon Outil Pro (Google l’associe au bricolage), Kit Indé et Bureau des Indés (confondus avec l’Inde), Pilote TPE (pilotes de terminaux), Logiciel Futé (Bison Futé), Logiciel Malin (Programme Malin de la CAF), Bonne Facture (marque existante), Choisir mon logiciel (concurrents mon-logiciel.net et monlogiciel.fr), Les bons logiciels (requête générique), Logipro, Gestio, Lebonlogiciel (déjà utilisés).

## 2 bis. Le positionnement

**« Le bon outil pour chaque TPE, choisi par un entrepreneur. »** Trois promesses visibles sur chaque page :

- **Le coût réel** (abonnement + options + commissions + engagement), pas le prix d'appel ;
- **Le profil** pour lequel chaque outil est fait, et celui pour lequel il ne l'est pas ;
- **Le kit complet par métier**, avec un budget mensuel total.

Pour la crédibilité (E-E-A-T), la page `/a-propos/` doit montrer une vraie personne : photo, parcours d'entrepreneur, projets, profil LinkedIn (`SITE.author.sameAs`). Les avis doivent contenir tes captures d'essai. C'est ce qui distingue un site d'affiliation qui se classe d'un site qui stagne.

---

## 3. L'architecture : besoins × métiers

```
Accueil
├── /facturation/      Facture électronique, devis-factures, facturation par statut et par métier
├── /comptabilite/     Compta en ligne TPE, SASU, EURL, avec ou sans expert-comptable
├── /encaissement/     Terminal de paiement, caisse enregistreuse, liens de paiement
├── /site-internet/    Site vitrine, e-commerce, pages de vente, hébergement
├── /crm/              CRM, emailing, prospection, avis clients
├── /equipe/           Planning, badgeuse, paie, notes de frais
├── /metiers/          Le kit complet par métier (hubs de longue traîne)
├── /comparatifs/      « X vs Y »            ← conversion maximale
├── /alternatives/     « alternatives à X »  ← conversion maximale
├── /avis/             « avis X »            ← conversion maximale
└── /outils/           Simulateurs gratuits  ← aimants à liens
```

**Le principe** : les silos « besoin » captent les requêtes génériques (« logiciel comptabilité TPE »), le silo « métiers » capte la longue traîne peu disputée (« logiciel devis plombier », « logiciels pour coiffeur »), et chaque page métier renvoie vers les comparatifs de chaque besoin. Le maillage interne fait circuler l'autorité dans les deux sens.

### Les métiers à couvrir (une page « kit » + des pages spécifiques)

| Métier | Poids estimé | Besoins spécifiques | Outils à étudier (programmes à vérifier) |
|---|---|---|---|
| Artisans du bâtiment | Très élevé | Devis sur chantier, acomptes, décennale | Tolteck, Obat, SumUp |
| Freelances, consultants | Très élevé (micro-entreprise) | Facturation, CRM, site | Abby, Indy, HubSpot, Systeme.io |
| Commerçants (boutique) | Élevé | Caisse, TPE, stock, site e-commerce | SumUp, Shopify, Zettle |
| Restaurants, bars | Élevé | Caisse, réservation, planning | SumUp Caisse Pro, Zelty, Zenchef |
| Coiffure, esthétique | Élevé | Prise de RDV, caisse, fidélité | Planity, Wix, SumUp |
| Coachs, formateurs | En forte croissance | Pages de vente, paiement, visio | Systeme.io (40 % récurrent) |
| E-commerçants | Élevé | Boutique, paiement, emailing, compta | Shopify, Brevo, Pennylane |
| Professions libérales (non santé réglementée) | Élevé | Facturation BNC, compta, RDV | Indy, Abby |
| VTC, taxis, livreurs | Élevé | Facturation, compta, TPE | Abby, SumUp |
| Agents immobiliers indépendants | Moyen | CRM, signature électronique, site | HubSpot, Pipedrive |

---

## 4. Carte des mots-clés (données réelles, 1 mot-clé principal = 1 URL)

### Les grandes découvertes de la recherche

1. **La facture électronique est LA mine d'or** : « facture électronique auto entrepreneur » (14 800/mois, KD 7), « annuaire facturation électronique » (14 800, KD 3), « facture électronique 2026 » (9 900, KD 28), « plateforme agréée facture électronique » (8 100, KD 21), « facture électronique micro entreprise » (5 400, KD 15). Énormes volumes, faible concurrence, et la première page est tenue par de petits blogs : c'est la priorité absolue jusqu'en septembre 2027.
2. **Les modèles et guides pratiques** ont des volumes forts avec un KD proche de 0 : « modèle facture » (5 400, KD 0), « facture proforma » (6 600, KD 0), « facture auto entrepreneur » (4 400, KD 10), « mention obligatoire facture » (3 600, KD 12), « modèle devis » (2 400, KD 3). D'où le générateur de facture/devis gratuit.
3. **Les requêtes génériques commerciales sont accessibles** : « créer un site internet » (5 400, KD 0), « terminal de paiement » (4 400, KD 0), « logiciel de facturation » (3 600, KD 0), « logiciel de caisse » (2 400, KD 9). Les CPC sont élevés (9 à 13 €), preuve d'une forte valeur commerciale.
4. **Les avis de marque** sont quasi sans concurrence : « shopify avis » (2 900, KD 0), « indy avis » (2 400, KD 4), « pennylane avis » (1 300, KD 9), « tiime avis » (720, KD 0).
5. **Le restaurant est une niche faible en volume** : « logiciel réservation restaurant » 70, « logiciel planning restaurant » 10. On garde les pages mais ce n'est plus une priorité. Exception : « caisse enregistreuse restaurant » (880, KD 4).
6. **À éviter** : « caisse enregistreuse » (12 100) est une SERP de boutiques (intention d'achat de matériel) ; « simulateur auto entrepreneur » (KD 71) et « nom de domaine » (KD 77) sont trop disputés.

### Pages en ligne et leur cible

| URL | Mot-clé principal | Volume | KD | Volume cumulé du cluster (env.) |
|---|---|---|---|---|
| /facturation/facture-electronique-auto-entrepreneur/ | facture électronique auto entrepreneur | 14 800 | 7 | ~22 000 (+ micro entreprise 5 400, obligatoire 1 300…) |
| /facturation/annuaire-facturation-electronique/ | annuaire facturation électronique | 14 800 | 3 | ~15 000 |
| /facturation/facture-electronique-2026/ | facture électronique 2026 | 9 900 | 28 | ~18 000 (+ obligatoire 6 600, date 1 600) |
| /facturation/plateforme-agreee-facture-electronique/ | plateforme agréée facture électronique | 8 100 | 21 | ~15 000 (+ gratuite 2 900, portail public 2 400, PDP 1 300) |
| /facturation/facture-proforma/ | facture proforma | 6 600 | 0 | ~6 600 |
| /outils/modele-facture-gratuit/ | modèle facture | 5 400 | 0 | ~15 000 (+ facture en ligne gratuit 3 600, modèle AE 2 400, faire une facture 1 900, exemple 1 600) |
| /site-internet/creer-un-site-internet/ | créer un site internet | 5 400 | 0 | ~16 000 (+ créer un site web gratuit 3 600, gratuit 2 900, comment 2 400) |
| /facturation/facture-auto-entrepreneur/ | facture auto entrepreneur | 4 400 | 10 | ~8 000 (+ micro entreprise 1 300, sans TVA 720…) |
| /comptabilite/logiciel-comptabilite/ | logiciel comptabilité | 5 400 | 44 | ~10 000 (+ gratuit 1 600, de comptabilité 1 900, association 880) |
| /encaissement/terminal-de-paiement/ | terminal de paiement | 4 400 | 0 | ~7 500 (+ TPE carte bancaire 1 600, TPE portable 880) |
| /crm/logiciel-crm/ | logiciel crm | 3 600 | 40 | ~7 000 (+ CRM gratuit 1 300, CRM français 720) |
| /facturation/mentions-obligatoires-facture/ | mention obligatoire facture | 3 600 | 12 | ~5 500 |
| /facturation/logiciel-de-facturation/ | logiciel de facturation | 3 600 | 0 | ~12 000 (+ logiciel facturation 2 900, devis facture 1 600, gratuit 3 600) |
| /avis/shopify/ | shopify avis | 2 900 | 0 | ~4 000 (+ prix 1 000) |
| /facturation/e-reporting/ | e-reporting | 2 900 | 1 | ~3 000 |
| /avis/indy/ | indy avis | 2 400 | 4 | ~2 700 |
| /outils/modele-devis-gratuit/ | modèle devis | 2 400 | 3 | ~3 000 |
| /encaissement/logiciel-de-caisse/ | logiciel de caisse | 2 400 | 9 | ~4 500 |
| /facturation/factur-x/ | factur-x | 1 600 | 0 | ~1 600 |
| /facturation/logiciel-facturation-auto-entrepreneur/ | logiciel facturation auto entrepreneur | 1 600 | 0 | ~2 500 |
| /avis/pennylane/ | pennylane avis | 1 300 | 9 | ~1 800 |
| /encaissement/logiciel-caisse-restaurant/ | caisse enregistreuse restaurant | 880 | 4 | ~1 200 |
| /outils/simulateur-cout-caisse-enregistreuse/ | prix caisse enregistreuse | 880 | 0 | ~900 |
| /avis/tiime/, /avis/wix/, /avis/sumup/, /avis/abby/ | avis de marque | 390 à 720 | 0 | ~2 300 |
| /facturation/logiciel-devis-batiment/ | logiciel devis batiment | 320 | 3 | ~1 500 (+ logiciel bâtiment 590) |
| Pages restaurant, kits métier, comparatifs | longue traîne | < 300 | — | maillage et conversion |

**Potentiel adressé : de l’ordre de 200 000 recherches mensuelles** en cumulant les clusters (avec des chevauchements possibles), dont la majorité sur des mots-clés à KD inférieur à 30. Un site bien placé capte en général 20 à 30 % des clics d’une première position, beaucoup moins au-delà de la 5e.

### Les prochaines pages, par ordre de priorité (données réelles)

| Page à créer | Mot-clé | Volume | KD |
|---|---|---|---|
| /facturation/tva-auto-entrepreneur/ | tva auto entrepreneur | 12 100 | 17 |
| /facturation/logiciel-auto-entrepreneur/ (ou enrichir la page facturation AE) | logiciel auto entrepreneur | 590 | 2 |
| /facturation/facture-electronique-gratuite/ | facture électronique gratuit | 9 900 | 43 |
| /facturation/relance-facture-impayee/ (+ modèle de lettre) | relance facture impayée | 1 000 | 0 |
| /facturation/facture-acompte/ | facture acompte | 1 300 | 0 |
| /facturation/facture-electronique-association/ | facture électronique association | 1 300 | 0 |
| /equipe/badgeuse/ | badgeuse | 2 400 | 0 |
| /encaissement/lien-de-paiement/ | lien de paiement | 720 | 1 |
| /comptabilite/logiciel-gestion-de-stock/ | logiciel gestion de stock | 1 300 | 5 |
| /equipe/logiciel-note-de-frais/ | logiciel note de frais (CPC 43 €) | 880 | 0 |
| /equipe/logiciel-planning/ | logiciel planning (+ gratuit 590) | 880 | 0 |
| /comptabilite/comptabilite-auto-entrepreneur/ | comptabilité auto entrepreneur (+ livre des recettes 480) | 720 | 0 |
| /crm/emailing-gratuit/ | emailing gratuit | 1 600 | 22 |
| /site-internet/site-internet-pas-cher/ | site internet pas cher | 590 | 4 |
| /metiers/logiciels-coiffure/ | logiciel coiffure | 390 | 0 |
| /comparatifs/abby-vs-indy/ | abby ou indy | 140 | 0 |
| Avis : systeme io (320), hostinger (320), axonaut (260), obat (170), tolteck (140) | avis de marque | 140 à 320 | 0 à 12 |

### Modèles de titres qui marchent
- `Meilleur logiciel de X en 2026 : comparatif de N solutions`
- `X : définition, obligations et [bénéfice] (2026)` pour les sujets réglementaires
- `Modèle de X gratuit : crée ton X en ligne (PDF)` pour les outils
- `Avis X 2026 : prix, avantages et limites`

## 5. Ce qui est volontairement exclu

**Banque pro, crédit, assurance, crypto, paris** : selon le montage, recommander ces produits contre rémunération peut relever d'un statut réglementé (IOBSP ou intermédiaire en assurance, avec immatriculation ORIAS), et la publicité crypto ou paris est très encadrée. Ces niches paient bien, mais c'est un autre projet, avec un conseil juridique.

**Santé réglementée** (médecins, kinés…) : les logiciels médicaux ont leurs propres contraintes de certification ; à éviter au démarrage.

---

## 6. Ce qui est en place techniquement

- **Astro statique** : HTML pur, CSS inline, zéro JS sauf le simulateur. Core Web Vitals au maximum.
- **URLs propres par silo**, slash final, canonical absolue, hreflang fr-FR.
- **Données structurées** : Organization, WebSite, Person, Article, BreadcrumbList, ItemList, Review, FAQPage, CollectionPage.
- **Sitemap** automatique (sans /go/ ni pages noindex), robots.txt, **llms.txt** pour les assistants IA.
- **Liens affiliés** via `/go/<slug>/` : `rel="sponsored nofollow"`, redirection 302, bloqués dans robots.txt.
- **Maillage interne** automatique (liés + même silo), hubs par silo, pages « kit métier » qui relient tous les silos.
- **« L'essentiel en 30 secondes »** en haut de chaque page, repris par les extraits optimisés et les réponses IA.
- **Audit automatique** : `npm run build && npm run check`.

---

## 7. Check-list de lancement

1. [ ] Acheter le domaine et le mettre dans `src/data/site.ts` (ou `SITE_URL`). Domaine acheté : logi-malin.fr (IONOS, DNS sur Cloudflare). Vérifier l’absence de marque déposée sur data.inpi.fr.
2. [ ] Compléter les mentions légales (`SITE.publisher`).
3. [ ] Ajouter ta photo, ton parcours et tes profils sur `/a-propos/`.
4. [ ] S'inscrire aux programmes d'affiliation, coller les liens dans `src/data/software.ts` (`affiliateUrl`). Priorités : Systeme.io, Hostinger, Shopify, SumUp, Axonaut, Pipedrive, HubSpot, Abby, Indy, Tolteck, Obat.
5. [ ] **Revérifier chaque prix** auprès des éditeurs (indicatifs, relevés en octobre 2026 sur des sources tierces).
6. [ ] Ajouter tes captures d'essai et ton retour personnel dans les avis.
7. [ ] Déployer sur Cloudflare Pages ou Netlify (build `npm run build`, dossier `dist`).
8. [ ] Google Search Console : soumettre `sitemap-index.xml`, demander l'indexation des pages principales.
9. [ ] Bing Webmaster Tools (alimente aussi ChatGPT Search).
10. [ ] Mesure d'audience sans cookie (Plausible, Umami, Cloudflare Web Analytics) avec suivi des clics `data-aff`.

---

## 8. Obtenir des liens

Un site neuf sans liens ne se classe pas sur les requêtes principales, même avec un contenu parfait. Plan réaliste :

1. **Outils gratuits comme aimants à liens** : simulateurs (coût de caisse, frais de terminal, tarif journalier freelance) et générateur de mentions légales sont cités par les blogs, CCI, CMA, forums et écoles.
2. **Chambres consulaires et réseaux** : CCI, Chambres de métiers, BGE, couveuses, réseaux d'entrepreneurs. Propose un guide de la facture électronique utilisable par leurs adhérents.
3. **Presse et blogs entrepreneurs** : Maddyness, Les Echos Entrepreneurs, Le Blog du Dirigeant (tribunes, témoignages).
4. **Éditeurs partenaires** : une fois affilié, demande à figurer sur leur page partenaires.
5. **Communautés** : groupes Facebook d'auto-entrepreneurs et d'artisans, Reddit, LinkedIn, en apportant de l'aide, pas des liens en masse.
6. **Podcasts entrepreneurs** : témoigner apporte des liens et de la notoriété.

Objectif : 15 à 30 domaines référents de qualité les 6 premiers mois.

---

## 9. Google Ads : quand et comment

- **Pas avant 2 à 3 mois de données SEO.** Commence par les pages qui convertissent déjà.
- **Lis les règles de chaque programme** : beaucoup interdisent d'enchérir sur leur marque.
- **Cibles rentables** (CPC relevés par OpenSEO) : programmes à forte commission fixe ou récurrente, sur des mots-clés génériques :
  - Systeme.io (40 % récurrent) → « créer tunnel de vente », « logiciel formation en ligne »
  - Axonaut (prime par client) → « logiciel gestion TPE », « logiciel devis facture »
  - SumUp (prime par commerçant) → « terminal de paiement », « caisse enregistreuse prix »
  - Hostinger (≈ 40 %) → « hébergement site pas cher », « créer site vitrine »
- **Page de destination = le comparatif**, jamais une redirection directe (Google refuse les pages passerelles).
- Budget de test : 5 à 10 €/jour, mots-clés exacts. On coupe tout ce dont le coût par conversion dépasse 30 % de la commission.

---

## 10. Routine de mise à jour

- **Chaque mois** : vérifier les prix (`priceChecked`), mettre à jour `updated` dans les articles modifiés et `SITE.pricesChecked`.
- **Chaque trimestre** : dans Search Console, repérer les requêtes en position 8 à 20 et enrichir la page (nouvelle section + FAQ).
- **Septembre 2027** : basculer les pages facture électronique vers « mise en conformité » et « changer de logiciel ».

---

## 11. Plan de croissance complet (octobre 2026)

### Fait dans cette série
- 17 nouvelles pages : TVA auto-entrepreneur, facture électronique gratuite, relance facture impayée, facture d'acompte, facture électronique association, badgeuse, logiciel de planning (généraliste), lien de paiement, comptabilité auto-entrepreneur, emailing gratuit, avis Systeme.io / Hostinger / Axonaut / Obat / Tolteck, Abby vs Indy, Indy vs Tiime.
- Image Open Graph propre à chaque page (`npm run og`), flux RSS (`/rss.xml`), IndexNow (`npm run indexnow` après chaque mise en ligne), en-têtes de cache.

### Vague 4 (faite)
- Pages : logiciel de gestion de stock, note de frais, site internet pas cher, logiciel coiffure et institut, alternatives à Henrri, facture sur Excel.
- Calculateurs (aimants à liens) : calcul de TJM freelance, simulateur de charges auto-entrepreneur, simulateur de seuil de TVA.
- Maillage : chaque fiche produit renvoie automatiquement vers notre avis du logiciel ; un paragraphe de liens contextuels (`<p data-maillage>`) dans 63 pages. Chaque article reçoit au moins 5 liens internes dans le corps de texte (hors menus et « À lire aussi »).
- Nouveaux logiciels dans `software.ts` : Zoho Inventory, Odoo, N2F, Planity, Kiute, Salonkee.

### Vague 5 (faite)
- Avis Planity, Zoho Inventory, N2F.
- Calculateurs : indemnités kilométriques (barème 2026), pénalités de retard (taux du 2nd semestre 2026).
- Correction : taux BNC micro 2026 = 25,6 % (et non 26,1 %), plafonds micro 2026-2028 = 203 100 € / 83 600 €.
- Crédibilité : photo d'auteur (`SITE.author.photo`), bloc « Notre test » (champ `tested` des articles, à remplir seulement après un vrai test), composant `<Capture>` pour les captures d'écran (`public/captures/<logiciel>/`).

### Backlinks passifs (fait)
- **Simulateurs intégrables** : 6 versions iframe sur `/embed/<outil>/` (noindex, hors sitemap, thème clair avec `?theme=light`, hauteur auto). Chaque page outil propose le code à copier, avec un lien de crédit vers la page outil. Liste dans `src/data/embeds.ts`.
- **Infographie** « Calendrier de la facture électronique 2026-2027 » (`npm run infographie`), affichée sur `/facturation/facture-electronique-2026/` avec un code de partage qui crédite la page.
- ⚠ Les codes d'intégration utilisent `SITE_URL` : ne les diffuser qu'une fois le domaine définitif en place, sinon les liens pointeront vers l'ancienne adresse.
- Diffusion : envoyer les codes aux CCI, CMA, BGE, experts-comptables blogueurs, formations à la création d'entreprise ; publier l'infographie sur LinkedIn et Pinterest avec le lien.

### À mettre à jour chaque semestre
- 1er janvier et 1er juillet : taux des pénalités de retard (`PenalitesCalculator.astro` + page).
- Chaque année : barème kilométrique (`IkCalculator.astro` + page), taux URSSAF (`ChargesSimulator.astro`, `TjmCalculator.astro`).

### Pistes suivantes
- Logiciel pour esthéticienne à domicile, logiciel pour boulangerie, logiciel pour commerce de détail.

### Indexation
- Google Search Console + sitemap, Bing Webmaster Tools (import depuis GSC), IndexNow à chaque publication.

### Liens
- Outils gratuits (générateur de facture, simulateur caisse) proposés aux CCI, CMA, BGE, écoles et blogs.
- Étude annuelle « prix des logiciels TPE 2027 » pour la presse (données déjà dans `software.ts`).
- Témoignages podcasts, tribunes Maddyness / Le Blog du Dirigeant.

### Audience propre
- Newsletter Brevo « 1 astuce TPE par semaine » + lead magnet (check-list facture électronique 2027).
- LinkedIn (3 posts/semaine) et vidéos courtes « 60 s pour comprendre la facture électronique ».

### Visibilité dans les IA
- `llms.txt`, FAQ structurées, résumés en tête d'article, données datées : ce que ChatGPT, Perplexity et Gemini citent. Bing Webmaster est indispensable (ChatGPT Search s'appuie dessus).

### Calendrier
- Pic septembre 2026 → septembre 2027 sur la facture électronique : publier et mettre à jour en priorité ces pages.
