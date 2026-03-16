import './App.css'
import { GameHistory } from './components/GameHistory'
import { HangmanFigure } from './components/HangmanFigure'
import { Keyboard } from './components/Keyboard'
import { LanguageSelector } from './components/LanguageSelector'
import { StatusPanel } from './components/StatusPanel'
import { WordDisplay } from './components/WordDisplay'
import { optionsLangue, maxErreurs, useJeuDuPendu } from './hooks/useHangmanGame'

const messagesStatut = {
  error: 'La récupération du mot a échoué.',
  loading: 'Connexion à l’API du pendu.',
  lost: 'La partie est terminée.',
  playing: 'Choisissez une lettre pour faire avancer la partie.',
  won: 'Le mot est trouvé, vous avez gagné.',
}

function App() {
  const {
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
  } = useJeuDuPendu()

  const titreClavier = messagesStatut[statut] || 'Partie en cours'

  return (
    <div className="app-shell">
      <header className="hero-panel">
        <div className="hero-copy">
          <p className="eyebrow">L'Auréole des Mots</p>
          <h1>Le défi bilingue, lettre par lettre.</h1>
          <p className="hero-text">
            Devinez le mot secret, passez du francais à l'anglais,
            et conservez l'historique de vos parties.
          </p>
        </div>

        <div className="hero-actions">
          <LanguageSelector
            langueActuelle={langue}
            disabled={statut === 'loading'}
            langues={optionsLangue}
            auChangement={changerLangue}
          />
          <button
            className="primary-button"
            onClick={() => void demarrerPartie(langue)}
            type="button"
          >
            {statut === 'loading' ? 'Chargement...' : 'Nouvelle partie'}
          </button>
        </div>
      </header>

      <main className="game-layout">
        <section className="game-stage panel">
          <div className="figure-card">
            <div>
              <p className="panel-label">Situation</p>
            </div>

            <HangmanFigure
              maxErreurs={maxErreurs}
              nbErreurs={nbErreurs}
            />

            <div className="attempt-strip" aria-label="Tentatives restantes">
              {Array.from({ length: maxErreurs }).map((_, index) => (
                <span
                  key={index}
                  className={index < tentativesRestantes ? 'attempt on' : 'attempt off'}
                />
              ))}
            </div>
          </div>

          <StatusPanel
            messageErreur={messageErreur}
            lettresJouees={lettresJouees}
            langue={langue}
            tentativesRestantes={tentativesRestantes}
            statut={statut}
          />
        </section>

        <section className="game-board panel">
          <div className="board-top">
            <div>
              <p className="panel-label">Mot à trouver</p>
              <h2>{titreClavier}</h2>
            </div>
          </div>

          <WordDisplay statut={statut} casesMot={casesMot} />

          <Keyboard
            disabled={statut !== 'playing'}
            lettresJouees={lettresJouees}
            langue={langue}
            auClic={selectionnerLettre}
            mot={mot}
          />
        </section>
      </main>

      <GameHistory historique={historique} />
    </div>
  )
}

export default App
