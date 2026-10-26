import "./team.css";

type Locale = "en" | "pt";

type Seat = {
  code: string;
  en: { role: string; note: string };
  pt: { role: string; note: string };
};

const copy = {
  en: {
    title: "Team",
    lede: "Four fictional seats on Lumen-1. Roles only, with no named people.",
  },
  pt: {
    title: "Equipa",
    lede: "Quatro lugares fictícios no Lumen-1. Só funções, sem pessoas nomeadas.",
  },
} as const;

const seats: Seat[] = [
  {
    code: "SYS",
    en: {
      role: "Systems lead",
      note: "Holds the review phase. Lumen-1 is in PDR, and the next phase is CDR.",
    },
    pt: {
      role: "Responsável de sistemas",
      note: "Guarda a fase da revisão. O Lumen-1 está na PDR, e a fase seguinte é a CDR.",
    },
  },
  {
    code: "OPT",
    en: {
      role: "Optical engineer",
      note: "Owns the image chain. REQ-IMG-03, optical MTF, still has no verification method.",
    },
    pt: {
      role: "Engenheiro ótico",
      note: "Trata da cadeia de imagem. O REQ-IMG-03, MTF ótica, continua sem método de verificação.",
    },
  },
  {
    code: "AIT",
    en: {
      role: "AIT engineer",
      note: "Keeps the planned bench procedures. None of them verifies optical MTF.",
    },
    pt: {
      role: "Engenheiro de AIT",
      note: "Mantém os procedimentos de banco planeados. Nenhum deles verifica a MTF ótica.",
    },
  },
  {
    code: "PA",
    en: {
      role: "Product assurance",
      note: "Watches the missing MTF row on the test register before the review moves on.",
    },
    pt: {
      role: "Garantia do produto",
      note: "Vigia a linha de MTF em falta no registo de ensaios antes de a revisão avançar.",
    },
  },
];

export function TeamModule({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="team-panel" lang={locale} aria-label={text.title}>
      <header className="team-head">
        <p className="team-kicker">Lumen-1</p>
        <h1>{text.title}</h1>
        <p className="team-lede">{text.lede}</p>
      </header>
      <ol className="team-list">
        {seats.map((seat) => {
          const body = seat[locale];
          return (
            <li key={seat.code} className="team-row">
              <p className="team-code">{seat.code}</p>
              <div>
                <h2>{body.role}</h2>
                <p>{body.note}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
