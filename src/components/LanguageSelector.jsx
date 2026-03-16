export function LanguageSelector({ langueActuelle, disabled, langues, auChangement }) {
  return (
    <div className="language-selector">
      <p className="language-label">Langue du mot</p>
      <div className="language-options" role="group" aria-label="Choisir une langue">
        {langues.map((option) => {
          const actif = option.value === langueActuelle

          return (
            <button
              key={option.value}
              className={`language-option ${actif ? 'active' : ''}`}
              disabled={disabled}
              onClick={() => auChangement(option.value)}
              type="button"
            >
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}