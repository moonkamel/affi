# Dossier de création « prêt pour la banque » : conception

Décision du 20/10/2026, après mesure des volumes (docs/recherche/volumes-outil-payant-2026-10-20.md) : un produit payant à l'unité pour les créateurs d'entreprise, qui remplace un prévisionnel d'expert-comptable (500 à 1 500 €) ou une étude de marché de cabinet.

## Phase 1 : gratuite, en ligne (20/10/2026)

- **Étude de marché locale** sur /creer/etude-de-marche/ (composant `MarketStudy.astro`) :
  - 83 activités courantes de TPE avec leurs codes NAF (`src/data/activites-naf.ts`) ;
  - recherche de la commune par nom ou code postal (`public/data/communes-2026.json`, populations légales INSEE en vigueur en 2026, paquet @etalab/decoupage-administratif 6.0.0) ;
  - nombre d'entreprises actives de l'activité dans la commune, l'intercommunalité (EPCI, 1 255 groupements), le département et en France (API Recherche d'entreprises, `etat_administratif=A`) ;
  - pour une commune de moins de 3 000 habitants, la comparaison se fait sur l'intercommunalité ;
  - impression ou enregistrement en PDF du résultat ;
  - chiffre d'affaires médian et fourchette (25 % à 75 %) des concurrents qui publient leurs comptes, dans la commune ou à défaut le département (champ `finances` de l'API, 3 entreprises au minimum) ;
  - bouton qui pré-remplit le chiffre d'affaires du business plan (`/creer/business-plan/?ca=…&source=…`) ;
  - zone de chalandise : communes dont le centre est à moins de 5, 10, 20 ou 30 km (centres calculés à partir des contours IGN Admin Express 2018, dépôt france-geojson de Grégoire David, licence ouverte ; communes fusionnées depuis : moyenne de leurs anciennes communes ou de leur intercommunalité). Un seul appel à l'API avec la liste des codes communes (arrondissements inclus pour Paris, Lyon, Marseille) : concurrents, habitants, densité, verdict et principales communes de la zone ;
  - évolution du marché sur 5 ans dans la commune : créations et fermetures par année, solde, taux de fermeture annuel, survie des entreprises créées il y a 3 à 5 ans (dates de création et de fermeture Sirene ; toutes les entreprises actives et fermées sont lues, 25 par appel). Au-delà de 500 entreprises actives ou fermées, le calcul est renvoyé au dossier complet (à faire côté serveur) ;
  - densité pour 10 000 habitants et verdict (moins de 0,7 fois la moyenne nationale, dans la moyenne, plus de 1,3 fois) ;
  - liste des 10 premières entreprises de la commune ;
  - lien vers le business plan gratuit.
- **Appel direct** à l'API depuis le navigateur ; si le navigateur le bloque (CORS), bascule automatique sur le relais Cloudflare `functions/api/entreprises.js` (seul `/api/*` passe par une fonction, voir `public/_routes.json`).
- **Accès** : menu principal (« Étude de marché »), page Outils gratuits (section « Outils pour créer ton entreprise »), pied de page.
- **Mesure d'usage** (anonyme, sans cookie) : `functions/api/mesure/[evenement].js` répond 204 ; chaque événement est un appel `navigator.sendBeacon` vers `/api/mesure/<événement>` : `etude` (analyse lancée), `zone` (rayon changé), `evolution` (évolution calculée), `ca-vers-bp` (chiffre d'affaires repris dans le business plan), `previsionnel` (prévisionnel modifié, une fois par visite), `dossier-apercu`, `dossier-pdf`, `identifiants` (recherche dans l’outil numéro de TVA / SIRET), `swot`, `pestel` (matrice modifiée, une fois par visite), `swot-pdf`, `pestel-pdf`, `qr-avis`, `qr-lien`, `qr-wifi` (premier QR code généré dans la visite), `qr-telechargement` (PNG), `qr-affiche` (impression), `emp-<document>` et `emp-<document>-pdf` pour les documents employeur (certificat, attestation, solde, promesse, fiche), `ilc` (calcul de révision du loyer commercial), `indemnite-rupture`, `indemnite-licenciement`, `indemnite-faute`, `heures-sup`, `gratification`, `partage-calcul` (lien d’un calcul copié, tous calculateurs), et les interactions du nouveau design (une fois par page vue) : `journee-passer` (lien « Passer l’animation » de l’accueil), `recherche-rapide` (recherche d’outils de l’accueil), `situation` (onglets « Où en es-tu ? »), `vitrine` (onglets de la vitrine des outils), `reprise` (carte « Reprends où tu en étais »), `filtre-outils`, `filtre-modeles`, `visionneuse` (infographie agrandie), `checklist-coche` (première case cochée), `checklist-complete` (18 actions cochées), `suite-lire` (clic sur « À lire ensuite »), `carte-methode` (carte retournée sur À propos), `note-simulee` (simulateur de la méthodologie), `copie-email`, puis les calculateurs comptables `compte-resultat`, `bilan`, `chiffre-affaires`. Relevé mensuel : requête GraphQL Cloudflare `httpRequestsAdaptiveGroups` filtrée sur `clientRequestPath_like: "/api/mesure/%"`, groupée par chemin.

- **Dossier de financement PDF** sur /creer/dossier-de-financement/ (composant `DossierBuilder.astro`) :
  - l'étude de marché (`localStorage` « logimalin-etude ») et le prévisionnel (« logimalin-bp ») sont sauvegardés dans le navigateur à chaque calcul ;
  - le dossier reprend ces données, ajoute l'identité du projet et 7 parties rédigées (brouillon enregistré dans « logimalin-dossier ») ;
  - document A4 : couverture et sommaire, puis une partie par page (résumé, porteur, offre, marché avec tableaux de l'étude, stratégie, moyens, prévisions financières, calendrier) ;
  - textes des outils rendus neutres (pas de tutoiement dans un document destiné à un financeur) ;
  - impression : le dossier passe sous `<body>`, tout le reste est masqué ; testé à 10 pages A4.

## Phase 2 : payante (39 à 49 €, paiement unique)

Contenu du dossier :
1. **Étude de marché locale complète** : zone de chalandise en rayon de 5, 10 ou 20 km (l'API propose une recherche `near_point` avec `lat`, `long` et `radius`), liste complète des concurrents exportable, évolution des créations et fermetures pour les grandes villes (calcul côté serveur), revenus des ménages de la zone (INSEE Filosofi).
2. **Prévisionnel sur 3 ans mois par mois** : reprise du `BusinessPlanBuilder` avec BFR, TVA, emprunt et amortissements détaillés.
3. **Plan de financement et trésorerie** au format attendu par les banques et les réseaux (Initiative France, Réseau Entreprendre).
4. **Dossier PDF** mis en page, avec la trame des 8 parties du business plan pré-remplie par les réponses.

Prérequis avant de vendre :
- structure juridique, mentions légales complètes, CGV ;
- Stripe (Checkout, paiement unique) : connecteur à autoriser dans claude.ai ;
- génération du PDF côté navigateur (pas de stockage des données du créateur) ou fonction Cloudflare.

Critère de passage en phase 2 : au moins quelques centaines d'utilisations par mois de l'étude gratuite et des recherches « étude de marché » où la page entre en première ou deuxième page.
