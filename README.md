# Jeu du pendu React

Application web de jeu du pendu développée avec React + Vite.

Le jeu récupère un mot aléatoire depuis l'API publique https://hangman.alexischarp.fr/ et permet de jouer en français (`fr-FR`) ou en anglais britannique (`en-GB`), avec clavier visuel.

## Aperçu

- Framework: React 19
- Bundler: Vite 8
- Lint: ESLint 9
- API: `POST https://hangman.alexischarp.fr/`
- Langues: `fr-FR`, `en-GB`

## Fonctionnalités

- récupération d'un mot aléatoire depuis l'API au démarrage d'une partie
- changement de langue à la volée (français / anglais)
- saisie des lettres avec:
	- clavier visuel intégré
	- clavier physique
- affichage progressif du mot et des lettres proposées
- dessin du pendu selon le nombre d'erreurs
- compteur des tentatives restantes
- historique local des dernières parties via `localStorage`
- gestion robuste des erreurs réseau / réponse API invalide
- interface responsive (desktop et mobile)

## Prérequis

- Node.js 20+ recommandé
- npm 10+ recommandé

## Installation

```bash
npm install
```

## Lancer le projet en développement

```bash
npm run dev
```

Puis ouvrir l'URL affichée dans le terminal (en général http://localhost:5173).

## Scripts disponibles

```bash
npm run dev      # démarre le serveur Vite en mode développement
npm run build    # génère le build de production dans dist/
npm run preview  # prévisualise le build de production
npm run lint     # lance ESLint sur le projet
```

## Vérifications attendues

Avant livraison, exécuter:

```bash
npm run lint
npm run build
```

## API utilisée

Endpoint:

- `POST https://hangman.alexischarp.fr/`

Payload (`application/x-www-form-urlencoded`):

- `locale=fr-FR`
- ou `locale=en-GB`

Exemple de requête:

```http
POST /
Host: hangman.alexischarp.fr
Content-Type: application/x-www-form-urlencoded

locale=fr-FR
```

Exemple de réponse attendue:

```json
{
	"word": "nomenclature"
}
```

Si l'API échoue ou renvoie un format inattendu, l'application affiche une erreur et permet de relancer rapidement une partie.

## Structure du projet

```text
src/
	components/
		GameHistory.jsx
		HangmanFigure.jsx
		Keyboard.jsx
		LanguageSelector.jsx
		StatusPanel.jsx
		WordDisplay.jsx
	hooks/
		useHangmanGame.js
	services/
		hangmanApi.js
	utils/
		gameLogic.js
	App.jsx
	App.css
	index.css
	main.jsx
```

Roles principaux:

- `src/hooks/useHangmanGame.js`: logique d'etat de la partie (mot, essais, statut)
- `src/services/hangmanApi.js`: appel HTTP vers l'API du pendu
- `src/utils/gameLogic.js`: regles metier (comparaison de lettres, progression)
- `src/components/*`: composants d'interface utilisateur

## Accessibilite et UX

- interface utilisable au clavier
- retour visuel clair sur les lettres deja tentees
- informations de statut (gagne/perdu/en cours) visibles en permanence
- design adapte aux petits ecrans

## Depannage

Si le projet ne demarre pas:

1. verifier la version de Node.js
2. supprimer `node_modules` puis relancer `npm install`
3. verifier que le reseau autorise l'acces a https://hangman.alexischarp.fr/

Si le lint echoue:

1. lancer `npm run lint`
2. corriger les erreurs signalees
3. relancer `npm run build`

## Auteur

Projet realise dans le cadre d'un exercice de developpement front-end (R4.06).
Test de timothy
