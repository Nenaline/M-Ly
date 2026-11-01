# M&Ly — Site vitrine statique

Site vitrine élégant pour le salon de coiffure mixte **M&Ly**. Aucun outil de compilation, aucune clé API, aucune base de données, aucun abonnement et **aucune dépendance JavaScript distante** ne sont nécessaires. Tous les fichiers sont présents dans ce dossier.

## 1. Tester le site

Ouvrir `index.html` dans un navigateur pour voir l'apparence du site. Pour une prévisualisation locale plus fidèle, lancer `python -m http.server 8000` depuis ce dossier, puis ouvrir `http://localhost:8000`.

## 2. Ce qu'il faut personnaliser AVANT de publier publiquement

Ouvrir `assets/config.js` avec un éditeur de texte (VS Code, Bloc-notes, etc.) :

- `address` : adresse du salon ; `city` : ville.
- `phone` : téléphone ; `email` : e-mail professionnel.
- `mapUrl` : lien officiel d'itinéraire vers l'adresse.
- `instagramUrl` : compte Instagram réel.
- `bookingUrl` : adresse réelle du service de réservation existant. **Si vide, aucun bouton de réservation ne sera affiché.**
- `hours` : jours et horaires vérifiés.
- `services` : catégories, descriptions et tarifs **validés par Mélanie**. Les quatre catégories fournies sont des exemples, et **aucun tarif n'a été inventé**.
- `demoMode: false` : enlève le bandeau de présentation, le message « prestations indicatives » et la note de galerie.

Ensuite, dans `index.html`, supprimer la ligne :

```html
<meta name="robots" content="noindex, nofollow" id="robots-meta">
```

**Attention :** les photos `assets/ambiance-facade.webp` et `assets/identite-visuelle.webp` sont des **maquettes conceptuelles de marque** issues du travail de création M&Ly. La façade représentée n'est pas la façade réelle du salon : **remplacez la photo de façade par une vraie photographie du salon avant mise en ligne officielle**, et ajustez les textes alternatifs correspondants. Les compositions abstraites de la section « Univers » peuvent rester en place, ou être remplacées par de vraies photos des réalisations.

À vérifier aussi avant ouverture au public : les informations légales (mentions légales, responsable de publication, hébergeur, coordonnées), la politique de confidentialité si des services ou outils de suivi sont ajoutés, l'autorisation d'utilisation des photos de personnes, et la disponibilité du nom/marque.

## 3. Publier GRATUITEMENT sur GitHub + Cloudflare Pages

1. Créer un compte GitHub, puis **New repository**, nom proposé : `m-et-ly-site`, dépôt **privé** si souhaité (Cloudflare Pages accepte les dépôts privés). Ne pas cocher de création automatique de fichiers si vous téléversez ensuite le contenu.
2. Sur le dépôt GitHub, cliquer **Add file > Upload files**. Extraire d'abord le ZIP, puis envoyer le **contenu** du dossier `M-et-Ly-site` (et non le ZIP lui-même). Vérifier que `index.html` est à la racine du dépôt, avec `assets/`, `_headers` et `README.md`. Valider avec **Commit changes**.
3. Créer un compte Cloudflare et ouvrir **Workers & Pages > Create application > Pages > Connect to Git** (le libellé peut évoluer).
4. Autoriser l'accès au dépôt GitHub `m-et-ly-site`, sélectionner ce dépôt et la branche `main`.
5. Configuration Pages : **Framework preset : None** ; **Build command : laisser vide** (ou `exit 0` si l'interface exige une valeur) ; **Build output directory : `.`** (le dossier racine). Sauvegarder et déployer.
6. L'adresse temporaire aura la forme `nom-du-projet.pages.dev`. Chaque modification publiée dans la branche `main` sera automatiquement déployée.

Pour un site **strictement statique** comme celui-ci, les requêtes vers les fichiers statiques Cloudflare Pages sont annoncées gratuites et illimitées. Le forfait gratuit limite notamment le nombre de constructions à **500 par mois** (conditions à recontrôler si elles changent). Le site n'utilise ni Pages Functions, ni Workers, ni services facturés à l'usage.

Documentation officielle :
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/platform/limits/

## 4. Changer le domaine

Un domaine personnel (exemple fictif : `m-et-ly.fr`) est **facultatif** et doit être acheté si vous le souhaitez et s'il est disponible. Le sous-domaine gratuit `*.pages.dev` suffit pour les essais.

## 5. Notes techniques

- HTML, CSS et JavaScript simple sans framework.
- Responsive téléphone / tablette / ordinateur.
- Favicon SVG inclus.
- Navigation mobile et liens accessibles au clavier.
- Aucune collecte de données, aucun cookie de tracking, aucun formulaire trompeur.
- Aucune publicité ou police importée depuis un service externe.
- Des en-têtes de sécurité de base sont inclus dans `_headers`.
- Le fichier `index.html` contient temporairement une directive `noindex` : tant qu'elle est présente, le site n'est pas destiné à être référencé sur Google.
