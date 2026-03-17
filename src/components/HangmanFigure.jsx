const partiesCorps = [
  <circle key="head" className="figure-line" cx="180" cy="78" r="26" />, // Tête
  <line
    key="body"
    className="figure-line"
    x1="180"
    y1="104"
    x2="180"
    y2="176"
  />, // Corps
  <line
    key="arm-left"
    className="figure-line"
    x1="180"
    y1="124"
    x2="142"
    y2="150"
  />, // Bras gauche
  <line
    key="arm-right"
    className="figure-line"
    x1="180"
    y1="124"
    x2="218"
    y2="150"
  />, // Bras droit
  <line
    key="leg-left"
    className="figure-line"
    x1="180"
    y1="176"
    x2="150"
    y2="224"
  />, // Jambe gauche
  <line
    key="leg-right"
    className="figure-line"
    x1="180"
    y1="176"
    x2="210"
    y2="224"
  />, // Jambe droite
];

export function HangmanFigure({ maxErreurs, nbErreurs }) {
  return (
    <svg
      className="figure-svg"
      viewBox="0 0 260 260"
      role="img"
      aria-label={`${nbErreurs} erreur${nbErreurs > 1 ? 's' : ''} sur ${maxErreurs}`}
    >
      {/* Accessibilité: on indique le nombre d'erreurs et le maximum pour que les utilisateurs de lecteurs d'écran puissent comprendre l'état du pendu. */}
      <line className="figure-line" x1="46" y1="236" x2="210" y2="236" />
      <line className="figure-line" x1="82" y1="236" x2="82" y2="28" />
      <line className="figure-line" x1="82" y1="28" x2="180" y2="28" />
      <line className="figure-line" x1="180" y1="28" x2="180" y2="52" />

      {partiesCorps.map((partie, index) => (
        <g
          key={partie.key}
          className={`figure-part ${nbErreurs > index ? 'visible' : ''}`}
        >
          {partie}
        </g>
      ))}
    </svg>
  );
}
