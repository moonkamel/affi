"""Liste les entreprises créées récemment dans les métiers couverts par le site,
à partir de la base Sirene de l'Insee (données publiques, Licence ouverte).

Seuls les établissements sièges, actifs et à diffusion publique sont retenus :
les entrepreneurs qui ont demandé à ne pas apparaître (diffusion partielle) sont exclus.
Sirene ne contient aucune adresse e-mail.

Clé gratuite : portail-api.insee.fr, API Sirene, à placer dans INSEE_API_KEY.
Usage : INSEE_API_KEY=... python3 docs/prospection/creations.py 2026-10-01 2026-10-26 sortie.csv
Le CSV contient des données sur des personnes : ne pas le committer (voir .gitignore).
"""
import csv, json, os, sys, time, urllib.parse, urllib.request

API = 'https://api.insee.fr/api-sirene/3.11/siret'

# Codes NAF par page métier du site
METIERS = {
    '96.02A': ('Coiffure', '/metiers/logiciel-coiffure/'),
    '96.02B': ('Soins de beauté', '/metiers/logiciel-coiffure/'),
    '56.10A': ('Restauration traditionnelle', '/metiers/logiciels-restaurant/'),
    '56.10C': ('Restauration rapide', '/metiers/logiciels-restaurant/'),
    '56.30Z': ('Débit de boissons', '/metiers/logiciels-restaurant/'),
    '10.71C': ('Boulangerie-pâtisserie', '/metiers/logiciel-boulangerie/'),
    '45.20A': ('Garage automobile', '/metiers/logiciel-garage-automobile/'),
    '81.30Z': ('Paysagiste', '/metiers/logiciel-paysagiste/'),
    '43.22A': ('Plomberie', '/metiers/logiciel-plombier/'),
    '43.22B': ('Chauffage, climatisation', '/metiers/logiciel-plombier/'),
    '43.21A': ('Électricité', '/metiers/logiciels-artisan-btp/'),
    '43.32A': ('Menuiserie', '/metiers/logiciels-artisan-btp/'),
    '43.34Z': ('Peinture', '/metiers/logiciels-artisan-btp/'),
    '43.99C': ('Maçonnerie', '/metiers/logiciels-artisan-btp/'),
    '62.01Z': ('Développement informatique', '/metiers/logiciels-freelance/'),
    '62.02A': ('Conseil informatique', '/metiers/logiciels-freelance/'),
    '70.22Z': ('Conseil', '/metiers/logiciels-freelance/'),
    '74.10Z': ('Design', '/metiers/logiciels-freelance/'),
}


def requete(debut, fin, naf, curseur):
    q = (f'dateCreationEtablissement:[{debut} TO {fin}] AND etablissementSiege:true'
         f' AND statutDiffusionEtablissement:O'
         f' AND periode(etatAdministratifEtablissement:A AND activitePrincipaleEtablissement:{naf})')
    url = API + '?' + urllib.parse.urlencode({'q': q, 'nombre': 1000, 'curseur': curseur})
    req = urllib.request.Request(url, headers={'X-INSEE-Api-Key-Integration': os.environ['INSEE_API_KEY'],
                                               'Accept': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        if e.code == 404:  # aucun résultat
            return {'etablissements': [], 'header': {'curseur': curseur, 'curseurSuivant': curseur}}
        raise


def main(debut, fin, sortie):
    lignes = []
    for naf, (metier, page) in METIERS.items():
        curseur = '*'
        while True:
            data = requete(debut, fin, naf, curseur)
            for e in data['etablissements']:
                ul, adr = e['uniteLegale'], e['adresseEtablissement']
                nom = ul.get('denominationUniteLegale') or ' '.join(
                    filter(None, [ul.get('prenomUsuelUniteLegale'), ul.get('nomUniteLegale')]))
                lignes.append({
                    'siret': e['siret'], 'nom': nom, 'date_creation': e.get('dateCreationEtablissement'),
                    'naf': naf, 'metier': metier, 'page_du_site': page,
                    'forme': 'Entreprise individuelle' if ul.get('categorieJuridiqueUniteLegale') == '1000' else 'Société',
                    'code_postal': adr.get('codePostalEtablissement'), 'commune': adr.get('libelleCommuneEtablissement'),
                })
            suivant = data['header'].get('curseurSuivant')
            if not suivant or suivant == data['header'].get('curseur'):
                break
            curseur = suivant
            time.sleep(2.1)  # limite de l'API : 30 requêtes par minute
        time.sleep(2.1)
    with open(sortie, 'w', newline='', encoding='utf-8') as f:
        w = csv.DictWriter(f, fieldnames=list(lignes[0]) if lignes else ['siret'])
        w.writeheader()
        w.writerows(lignes)
    print(f'{len(lignes)} établissements écrits dans {sortie}')


if __name__ == '__main__':
    main(*sys.argv[1:4])
