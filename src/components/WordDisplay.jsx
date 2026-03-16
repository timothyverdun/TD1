export function WordDisplay({ statut, casesMot }) {
  if (statut === 'loading') {
    return (
      <div className="word-display" aria-live="polite">
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
      {casesMot.map((cellule) => (
        <div
          key={cellule.id}
          className={`word-slot ${cellule.revele ? 'revealed' : ''} ${cellule.separateur ? 'separator' : ''}`}
        >
          {cellule.revele ? (
            <span className="word-character">{cellule.caractere}</span>
          ) : (
            <span className="word-underscore" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  )
}