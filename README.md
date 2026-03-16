# Jeu du pendu React

Application React réalisée avec Vite. Le jeu récupère un mot aléatoire via l'API https://hangman.alexischarp.fr/ avec une requête `POST /`, puis permet de jouer au pendu en français ou en anglais britannique.

## Fonctionnalités

- récupération d'un mot aléatoire depuis l'API
- sélection de langue `fr-FR` ou `en-GB`
- saisie via clavier visuel intégré
- compteur de tentatives restantes et dessin progressif du pendu
- gestion des erreurs API avec relance rapide
- historique local des dernières parties via `localStorage`
- interface responsive desktop et mobile

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Structure

- `src/hooks/useHangmanGame.js` : état et règles du jeu
- `src/services/hangmanApi.js` : appel à l'API
- `src/components/` : composants d'interface
- `src/App.css` et `src/index.css` : styles globaux et mise en page

## API utilisée

Exemple de requête envoyée par l'application :

```http
POST /
Content-Type: application/x-www-form-urlencoded

locale=fr-FR
```

Réponse attendue :

```json
{
	"word": "nomenclature"
}
```

## Remarques

- si l'API échoue ou renvoie une réponse invalide, l'application affiche un message d'erreur dédié
- les lettres accentuées sont gérées de façon tolérante pour faciliter la saisie
