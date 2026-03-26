import { normaliserCaractere, motContientLettre } from '../utils/gameLogic'

// On découpe le clavier en 3 lignes pour l'affichage.
const lignesClavier = ['ABCDEFGHIJ', 'KLMNOPQRST', 'UVWXYZ']

export function Keyboard({ disabled, lettresJouees, langue, auClic, mot }) {
  return (
    <div className="keyboard" aria-label="Clavier du jeu">
      {lignesClavier.map((ligne) => (
        <div key={ligne} className="keyboard-row">
          {Array.from(ligne).map((lettre) => {
            // On normalise la lettre pour pouvoir la comparer avec les lettres déjà jouées.
            const lettreNormalisee = normaliserCaractere(lettre, langue)
            const dejaJouee = lettresJouees.includes(lettreNormalisee)

            // Ces deux variables servent uniquement à appliquer la bonne couleur au bouton.
            const estCorrecte = dejaJouee && motContientLettre(mot, lettreNormalisee, langue)
            const estIncorrecte = dejaJouee && !estCorrecte

            return (
              <button
                key={lettre}
                className={[
                  'keyboard-key',
                  dejaJouee ? 'locked' : '',
                  estCorrecte ? 'correct' : '',
                  estIncorrecte ? 'incorrect' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={disabled || dejaJouee}
                // Quand on clique, on envoie la lettre au hook du jeu.
                onClick={() => auClic(lettre)}
                type="button"
              >
                {lettre}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}