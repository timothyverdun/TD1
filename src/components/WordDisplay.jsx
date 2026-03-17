export function WordDisplay({ statut, casesMot }) {
  if (statut === 'loading') {
    return (
      <div className="word-display" aria-live="polite">
        {/* Affiche un gabarit fixe pendant le chargement pour eviter un saut de mise en page. */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="word-slot">
            <span className="word-underscore" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="word-display" aria-live="polite">
      {/* Chaque cellule represente soit une lettre, soit un separateur comme un espace ou un tiret. */}
      {casesMot.map((cellule) => (
        <div
          key={cellule.id}
          className={`word-slot ${cellule.revele ? 'revealed' : ''} ${cellule.separateur ? 'separator' : ''}`}
        >
          {cellule.revele ? (
            <span className="word-character">{cellule.caractere}</span>
          ) : (
            // Le trait reste decoratif tant que la lettre n'est pas revelee.
            <span className="word-underscore" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}