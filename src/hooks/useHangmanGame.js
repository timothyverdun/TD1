import { useEffect, useState } from 'react'
import { recupererMot } from '../services/hangmanApi'
import {
  obtenirCasesMot,
  motEstTrouve,
  normaliserSaisie,
  motContientLettre,
} from '../utils/gameLogic'

// Clé utilisée pour sauvegarder l'historique dans le navigateur.
const cleHistorique = 'hangman-history-v1'
const langueParDefaut = 'fr-FR'

// Nombre d'erreurs autorisées avant la défaite.
export const maxErreurs = 6

// Langues proposées dans l'interface.
export const optionsLangue = [
  { value: 'fr-FR', label: 'Français'},
  { value: 'en-GB', label: 'English'},
]

function chargerHistorique() {
  try {
    const donneesStockees = window.localStorage.getItem(cleHistorique)

    if (!donneesStockees) {
      return []
    }

    const historiqueAnalyse = JSON.parse(donneesStockees)
    return Array.isArray(historiqueAnalyse) ? historiqueAnalyse : []
  } catch {
    // Si le JSON est invalide, on repart d'un historique vide.
    return []
  }
}

function sauvegarderHistorique(historique) {
  // Sauvegarde immédiate après chaque fin de partie.
  window.localStorage.setItem(cleHistorique, JSON.stringify(historique))
}

function nettoyerMot(mot, langue) {
  return String(mot || '').trim().toLocaleLowerCase(langue)
}

function creerEntreeHistorique(resultat, langue, mot, nbErreurs) {
  return {
    id: `${Date.now()}-${resultat}`,
    langue,
    joueeLe: new Date().toISOString(),
    resultat,
    mot,
    nbErreurs,
  }
}

export function useJeuDuPendu() {
  const [langue, setLangue] = useState(langueParDefaut)
  const [mot, setMot] = useState('')
  const [lettresJouees, setLettresJouees] = useState([])
  const [nbErreurs, setNbErreurs] = useState(0)
  const [statut, setStatut] = useState('loading')
  const [messageErreur, setMessageErreur] = useState('')
  const [historique, setHistorique] = useState(() => chargerHistorique())

  function ajouterHistorique(entree) {
    setHistorique((historiqueActuel) => {
      // On ajoute la dernière partie en tête de liste.
      const prochainHistorique = [entree, ...historiqueActuel]
      sauvegarderHistorique(prochainHistorique)
      return prochainHistorique
    })
  }

  async function demarrerPartie(langueChoisie = langueParDefaut) {
    // Reset complet de la partie avant de charger un nouveau mot.
    setLangue(langueChoisie)
    setStatut('loading')
    setMessageErreur('')
    setMot('')
    setLettresJouees([])
    setNbErreurs(0)

    try {
      const prochainMot = await recupererMot(langueChoisie)
      setMot(nettoyerMot(prochainMot, langueChoisie))
      setStatut('playing')
    } catch (erreur) {
      setStatut('error')
      setMessageErreur(
        erreur instanceof Error
          ? erreur.message
          : "Une erreur s'est produite.",
      )
    }
  }

  useEffect(() => {
    // Démarre une partie au premier affichage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void demarrerPartie(langueParDefaut)
  }, [])

  function selectionnerLettre(saisie) {
    // On accepte une lettre seulement si la partie est active.
    if (statut !== 'playing' || !mot) {
      return
    }

    const proposition = normaliserSaisie(saisie, langue)
    // Ignore les saisies invalides et les lettres déjà jouées.
    if (!proposition || lettresJouees.includes(proposition)) {
      return
    }

    const prochLettresJouees = [...lettresJouees, proposition]
    const estRate = !motContientLettre(mot, proposition, langue)
    const prochNbErreurs = estRate ? nbErreurs + 1 : nbErreurs
    const gagne = motEstTrouve(mot, prochLettresJouees, langue)
    const perdu = !gagne && prochNbErreurs >= maxErreurs

    setLettresJouees(prochLettresJouees)
    setNbErreurs(prochNbErreurs)

    if (gagne) {
      setStatut('won')
      ajouterHistorique(creerEntreeHistorique('won', langue, mot, prochNbErreurs))
      return
    }

    if (perdu) {
      setStatut('lost')
      ajouterHistorique(creerEntreeHistorique('lost', langue, mot, prochNbErreurs))
    }
  }

  function changerLangue(prochLangue) {
    void demarrerPartie(prochLangue)
  }

  // Données calculées pour l'interface.
  const tentativesRestantes = maxErreurs - nbErreurs
  const toutReveler = statut === 'lost'
  const casesMot = obtenirCasesMot(mot, lettresJouees, langue, toutReveler)

  return {
    changerLangue,
    messageErreur,
    lettresJouees,
    historique,
    langue,
    tentativesRestantes,
    selectionnerLettre,
    demarrerPartie,
    statut,
    mot,
    casesMot,
    nbErreurs,
  }
}