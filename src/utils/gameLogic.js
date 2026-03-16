const motifLettre = /[A-Za-zÀ-ÖØ-öø-ÿ]/
const motifDiacritiques = /[\u0300-\u036f]/g

// Vérifie qu'un caractère est bien une lettre (accents courants).
export function estUneLettre(caractere) {
  return motifLettre.test(caractere)
}

// Met un caractère dans un format comparable : minuscule, sans accent.
export function normaliserCaractere(caractere, langue = 'fr-FR') {
  return caractere
    .toLocaleLowerCase(langue)
    .normalize('NFD')
    .replace(motifDiacritiques, '')
}

// Transforme la saisie utilisateur en une seule lettre exploitable.
export function normaliserSaisie(saisie, langue = 'fr-FR') {
  const valeur = String(saisie || '').trim()
  const premierCaractere = valeur.charAt(0)

  if (!premierCaractere || !estUneLettre(premierCaractere)) {
    return ''
  }

  return normaliserCaractere(premierCaractere, langue)
}

// Dit si la lettre proposée existe dans le mot.
export function motContientLettre(mot, proposition, langue = 'fr-FR') {
  const caracteres = Array.from(mot)

  for (const caractere of caracteres) {
    if (!estUneLettre(caractere)) {
      continue
    }

    if (normaliserCaractere(caractere, langue) === proposition) {
      return true
    }
  }

  return false
}

// Le mot est résolu si toutes les lettres sont présentes dans lettresJouees.
export function motEstTrouve(mot, lettresJouees, langue = 'fr-FR') {
  const caracteres = Array.from(mot)

  for (const caractere of caracteres) {
    if (!estUneLettre(caractere)) {
      continue
    }

    const normalise = normaliserCaractere(caractere, langue)
    if (!lettresJouees.includes(normalise)) {
      return false
    }
  }

  return true
}

// Prépare les cases du mot pour l'UI (lettre visible ou underscore).
export function obtenirCasesMot(mot, lettresJouees, langue = 'fr-FR', toutReveler = false) {
  const caracteres = Array.from(mot)
  const cases = []

  for (let index = 0; index < caracteres.length; index += 1) {
    const caractere = caracteres[index]
    const separateur = !estUneLettre(caractere)
    const normalise = normaliserCaractere(caractere, langue)
    const revele = toutReveler || separateur || lettresJouees.includes(normalise)

    cases.push({
      id: `${caractere}-${index}`,
      caractere,
      separateur,
      revele,
    })
  }

  return cases
}

