// Formateur reutilisable pour afficher date + heure au format francais court.
const formateur = new Intl.DateTimeFormat('fr-FR', {
  dateStyle: 'short',
  timeStyle: 'short',
})

const etiquettesLangue = {
  'en-GB': 'EN',
  'fr-FR': 'FR',
}

function formaterDate(joueeLe) {
  // Conversion defensive: joueeLe est normalement une date ISO stockee dans l'historique.
  const date = new Date(joueeLe)

  if (Number.isNaN(date.getTime())) {
    // Si la date est invalide.
    return 'Date inconnue'
  }

  return formateur.format(date)
}

export function GameHistory({ historique }) {
  return (
    <section className="history-panel">
      <div className="history-header">
        <div>
          <p className="history-label">Historique local</p>
          <h2>Les dernières parties</h2>
        </div>
      </div>

      {/* Si on a des parties en memoire, on affiche la liste complete. */}
      {historique.length ? (
        <ol className="history-list">
          {historique.map((entree) => (
            <li key={entree.id} className="history-item">
              <span className={`history-badge ${entree.resultat}`}>
                {entree.resultat === 'won' ? 'Victoire' : 'Défaite'}
              </span>

              <div>
                <p className="history-word">{entree.mot}</p>
                <p className="history-meta">
                  {etiquettesLangue[entree.langue]} · {entree.nbErreurs} erreur
                  {entree.nbErreurs > 1 ? 's' : ''}
                </p>
              </div>

              <span className="history-time">{formaterDate(entree.joueeLe)}</span>
            </li>
          ))}
        </ol>
      ) : (
        // Sinon, on affiche un etat vide explicite.
        <p className="history-empty">Aucune partie terminée n’a encore été enregistrée.</p>
      )}
    </section>
  )
}