const etiquettesStatut = {
  error: 'Erreur',
  loading: 'Chargement',
  lost: 'Défaite',
  playing: 'En cours',
  won: 'Victoire',
}

const etiquettesLangue = {
  'en-GB': 'English',
  'fr-FR': 'Français',
}

export function StatusPanel({
  messageErreur,
  lettresJouees,
  langue,
  tentativesRestantes,
  statut,
}) {
  const etiquetteStatut = etiquettesStatut[statut] || statut
  const labelLangue = etiquettesLangue[langue] || langue

  return (
    <div className="status-panel">
      <div className="status-header">
        <strong>Statut</strong>
        <span className={`status-pill ${statut}`}>{etiquetteStatut}</span>
      </div>

      <div className="status-header">
        <strong>Tentatives restantes</strong>
        <span>{tentativesRestantes}</span>
      </div>

      <div className="status-header">
        <strong>Langue active</strong>
        <span>{labelLangue}</span>
      </div>

      <div className="guesses-block">
        <strong>Lettres déjà jouées</strong>
        {lettresJouees.length ? (
          <div className="guesses-list">
            {lettresJouees.map((lettre) => (
              <span key={lettre} className="guess-chip">
                {lettre.toLocaleUpperCase(langue)}
              </span>
            ))}
          </div>
        ) : (
          <p className="panel-copy">Aucune lettre proposée pour le moment.</p>
        )}
      </div>

      {statut === 'error' ? (
        <div className="error-banner" role="alert">
          <strong>Impossible de démarrer la partie.</strong>
          <p>{messageErreur}</p>
        </div>
      ) : null}
    </div>
  )
}