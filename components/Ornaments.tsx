type OrnamentProps = {
  className?: string;
};

/** A hand drawn olive branch, the studio's signature mark. */
export function OliveBranch({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M60 195C58 150 56 100 62 55C66 30 74 14 88 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M61 170C45 165 34 154 31 138C47 142 58 153 61 170Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M60 150C74 143 81 131 81 115C67 121 60 133 60 150Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M59 128C43 124 33 114 29 99C45 102 56 112 59 128Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M60 106C73 98 79 86 78 70C65 77 59 89 60 106Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M62 84C47 81 37 72 33 58C48 60 58 69 62 84Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M66 62C78 54 83 42 81 27C69 34 64 46 66 62Z" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="46" cy="44" r="5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="94" cy="18" r="5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** Ionic column capital, sketched in a single line weight. */
export function ColumnCapital({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M20 30H140" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M28 42H132" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M30 30C18 30 10 22 10 14C10 8 14 4 20 4C25 4 28 8 28 12C28 15 26 17 23 17"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M130 30C142 30 150 22 150 14C150 8 146 4 140 4C135 4 132 8 132 12C132 15 134 17 137 17"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M46 42V116M60 42V116M74 42V116M88 42V116M102 42V116M116 42V116" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Asterisk-like classical rosette used as a bullet. */
export function Rosette({ className }: OrnamentProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}
