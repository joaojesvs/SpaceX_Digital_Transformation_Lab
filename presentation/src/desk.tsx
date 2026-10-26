import type { Lang } from "./copy";

const modules: { id: string; en: string; pt: string; icon: IconName }[] = [
  { id: "missions", en: "Missions", pt: "Missões", icon: "missions" },
  { id: "compliance", en: "Compliance", pt: "Conformidade", icon: "compliance" },
  { id: "phase", en: "Phase", pt: "Fase", icon: "phase" },
  { id: "budget", en: "Budget", pt: "Orçamento", icon: "budget" },
  { id: "schedule", en: "Schedule", pt: "Cronograma", icon: "schedule" },
  { id: "tests", en: "Tests", pt: "Ensaios", icon: "tests" },
  { id: "correspondence", en: "Correspondence", pt: "Correspondência", icon: "mail" },
  { id: "team", en: "Team", pt: "Equipa", icon: "team" },
];

type IconName = "missions" | "compliance" | "phase" | "budget" | "schedule" | "tests" | "mail" | "team";

const copy = {
  en: {
    missions: "Missions",
    open: "Open record",
    lumenSub: "6U CubeSat optical camera · Falcon 9 rideshare, piggyback · PDR → CDR",
    employee: "Employee desk",
    section: "Aerospace missions",
    lumenLede: "6U CubeSat optical camera. Falcon 9 rideshare, piggyback.",
    lumenPhase: "Preliminary Design Review · Falcon 9 rideshare, piggyback",
    rail: "The rail opens this record: compliance, phase, budget, schedule, tests, correspondence, and team.",
    halcyonLede: "Hosted S-band beacon on a rideshare plate.",
    halcyonMeta: "System Requirements Review · Demo budget €0.86M",
    stay: "Stays on this list. Not the open record.",
    cinderLede: "12U thermal pathfinder.",
    cinderMeta: "Mission Definition Review · Demo budget €1.15M",
    session: "Lumen-1 this session",
    sessionLine: "The corner agent and the employee desk write into this open mission.",
    empty: "Nothing from the desk yet. Open the desk, add a log line, and come back.",
    footer: "Offline mock on committed cards. Not a live model.",
  },
  pt: {
    missions: "Missões",
    open: "Registo aberto",
    lumenSub: "Câmara ótica CubeSat 6U · rideshare da Falcon 9, piggyback · PDR → CDR",
    employee: "Secretária",
    section: "Missões aeroespaciais",
    lumenLede: "Câmara ótica CubeSat 6U. Rideshare da Falcon 9, em piggyback.",
    lumenPhase: "Revisão preliminar de projeto · rideshare da Falcon 9, piggyback",
    rail: "O carril abre este registo: conformidade, fase, orçamento, cronograma, ensaios, correspondência e equipa.",
    halcyonLede: "Radiofarol em banda S, alojado numa placa de rideshare.",
    halcyonMeta: "Revisão de requisitos de sistema · Orçamento de demonstração €0.86M",
    stay: "Fica nesta lista. Não é o registo aberto.",
    cinderLede: "Precursor térmico 12U.",
    cinderMeta: "Revisão de definição da missão · Orçamento de demonstração €1.15M",
    session: "Lumen-1 nesta sessão",
    sessionLine: "O agente do canto e a secretária escrevem nesta missão aberta.",
    empty: "Ainda nada da secretária. Abra a secretária, deixe uma linha e volte.",
    footer: "Simulação offline sobre fichas commitadas. Não é um modelo ao vivo.",
  },
} as const;

export function MissionDesk({ lang }: { lang: Lang }) {
  const text = copy[lang];
  const chips = modules.filter((item) => item.id !== "missions");

  return (
    <div className="mac" aria-hidden="true">
      <div className="mac-bar">
        <span className="lights">
          <i className="light light-r" />
          <i className="light light-y" />
          <i className="light light-g" />
        </span>
        <span className="mac-title">Astraea</span>
        <span />
      </div>
      <div className="mac-body">
        <aside className="side">
          <div className="brand">
            <Star />
            <span>Astraea</span>
          </div>
          <div className="nav">
            {modules.map((item) => (
              <div key={item.id} className="nav-item" data-active={item.id === "missions" ? "true" : "false"}>
                <Icon name={item.icon} />
                <span>{item[lang]}</span>
              </div>
            ))}
          </div>
        </aside>
        <div className="main">
          <header className="main-top">
            <span className="kicker">Astraea</span>
            <span className="mini-lang">
              <em data-on={lang === "en" ? "true" : "false"}>EN</em>
              <em data-on={lang === "pt" ? "true" : "false"}>PT</em>
            </span>
          </header>
          <h2>{text.missions}</h2>
          <div className="record">
            <div>
              <p className="kicker">{text.open}</p>
              <p className="record-name">Lumen-1</p>
              <p className="quiet">{text.lumenSub}</p>
            </div>
            <span className="employee">{text.employee}</span>
          </div>
          <p className="section">{text.section}</p>
          <article className="card card-open">
            <div className="card-head">
              <h3>Lumen-1</h3>
              <span className="pill pill-gold">{text.open}</span>
            </div>
            <p className="lede">{text.lumenLede}</p>
            <p className="quiet">{text.lumenPhase}</p>
            <p className="quiet rail-line">{text.rail}</p>
            <div className="chips">
              {chips.map((item) => (
                <span key={item.id} className="pill">
                  {item[lang]}
                </span>
              ))}
            </div>
          </article>
          <div className="pair">
            <article className="card">
              <div className="card-head">
                <h3>Halcyon-3</h3>
                <span className="pill">SRR</span>
              </div>
              <p className="lede">{text.halcyonLede}</p>
              <p className="quiet">{text.halcyonMeta}</p>
              <p className="faint">{text.stay}</p>
            </article>
            <article className="card">
              <div className="card-head">
                <h3>Cinder-2</h3>
                <span className="pill">MDR</span>
              </div>
              <p className="lede">{text.cinderLede}</p>
              <p className="quiet">{text.cinderMeta}</p>
              <p className="faint">{text.stay}</p>
            </article>
          </div>
          <article className="card card-session">
            <p className="kicker">{text.session}</p>
            <p className="lede">{text.sessionLine}</p>
            <p className="quiet">{text.empty}</p>
          </article>
          <p className="foot">{text.footer}</p>
          <span className="agent">
            <Chat />
          </span>
        </div>
      </div>
    </div>
  );
}

function Star() {
  return (
    <svg className="star" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d="M12 1.2 13.15 10.2 22.2 12 13.15 13.8 12 22.8 10.85 13.8 1.8 12 10.85 10.2 Z" />
    </svg>
  );
}

function Chat() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M6 16.5 4.2 19.2c-.3.5.1 1.1.7.9L9 18.8A8 8 0 1 0 6 16.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Icon({ name }: { name: IconName }) {
  const props = {
    viewBox: "0 0 24 24",
    width: 16,
    height: 16,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  if (name === "missions") {
    return (
      <svg {...props}>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  if (name === "compliance") {
    return (
      <svg {...props}>
        <circle cx="12" cy="12" r="7.2" />
        <path d="m8.8 12.2 2.1 2.1 4.4-4.6" />
      </svg>
    );
  }
  if (name === "phase") {
    return (
      <svg {...props}>
        <path d="M4 12h16" />
        <circle cx="7" cy="12" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        <circle cx="17" cy="12" r="1.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "budget") {
    return (
      <svg {...props}>
        <path d="M5 16V9M10 16V6M15 16v-4M20 16V8" />
      </svg>
    );
  }
  if (name === "schedule") {
    return (
      <svg {...props}>
        <rect x="4.5" y="5.5" width="15" height="14" rx="2" />
        <path d="M8 4.5v3M16 4.5v3M4.5 10h15" />
      </svg>
    );
  }
  if (name === "tests") {
    return (
      <svg {...props}>
        <path d="M8 4.5h8M9 4.5v6.2L6.2 16a3.2 3.2 0 0 0 2.7 4.8h6.2a3.2 3.2 0 0 0 2.7-4.8L15 10.7V4.5" />
      </svg>
    );
  }
  if (name === "mail") {
    return (
      <svg {...props}>
        <rect x="3.8" y="6" width="16.4" height="12" rx="2" />
        <path d="m4.5 7.5 7.5 6 7.5-6" />
      </svg>
    );
  }
  return (
    <svg {...props}>
      <circle cx="9" cy="9" r="2.3" />
      <circle cx="16" cy="10" r="1.8" />
      <path d="M4.8 17.2c.7-2 2.4-3 4.2-3s3.5 1 4.2 3" />
      <path d="M14 14.4c1.2-.3 2.4 0 3.4.8 1 .9 1.5 2 1.6 2.8" />
    </svg>
  );
}
