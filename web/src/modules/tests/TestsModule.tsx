import "./tests.css";

type Locale = "en" | "pt";

type Status = "planned" | "missing";

type RowCopy = {
  name: string;
  procedure: string;
  detail: string;
};

type Row = {
  id: string;
  status: Status;
  en: RowCopy;
  pt: RowCopy;
};

const copy = {
  en: {
    title: "Test procedures",
    lede: "Register for Lumen-1. REQ-IMG-03, optical MTF, has no verification method. That row stays missing.",
    procedure: "Procedure",
    planned: "Planned",
    missing: "Missing",
  },
  pt: {
    title: "Procedimentos de ensaio",
    lede: "Registo do Lumen-1. O REQ-IMG-03, MTF ótica, não tem método de verificação. Essa linha fica em falta.",
    procedure: "Procedimento",
    planned: "Planeado",
    missing: "Em falta",
  },
} as const;

const rows: Row[] = [
  {
    id: "REQ-IMG-01",
    status: "planned",
    en: {
      name: "Ground sample distance",
      procedure: "TP-L1-GSD — ground-sample check",
      detail: "Named on the plan. The test article is not chosen yet.",
    },
    pt: {
      name: "Distância de amostragem ao solo",
      procedure: "TP-L1-GSD — verificação da amostragem ao solo",
      detail: "Nomeado no plano. O artigo de ensaio ainda não está escolhido.",
    },
  },
  {
    id: "REQ-IMG-02",
    status: "planned",
    en: {
      name: "Spectral band",
      procedure: "TP-L1-BAND — filter band-edge inspection",
      detail: "Planned visual check of the filter edges against the drawing.",
    },
    pt: {
      name: "Banda espectral",
      procedure: "TP-L1-BAND — inspeção dos limites de banda do filtro",
      detail: "Inspeção visual planeada dos limites do filtro contra o desenho.",
    },
  },
  {
    id: "REQ-IMG-03",
    status: "missing",
    en: {
      name: "Optical MTF",
      procedure: "No procedure",
      detail: "No verification method. Method, level, and stage are empty. This row is not done.",
    },
    pt: {
      name: "MTF ótica",
      procedure: "Sem procedimento",
      detail: "Sem método de verificação. Método, nível e fase estão vazios. Esta linha não está feita.",
    },
  },
  {
    id: "TP-L1-DET",
    status: "planned",
    en: {
      name: "Detector and controller",
      procedure: "TP-L1-DET — bench functional",
      detail: "Planned at room temperature. It does not verify optical MTF.",
    },
    pt: {
      name: "Detetor e controlador",
      procedure: "TP-L1-DET — funcional de banco",
      detail: "Planeado à temperatura ambiente. Não verifica a MTF ótica.",
    },
  },
];

export function TestsModule({ locale }: { locale: Locale }) {
  const text = copy[locale];

  return (
    <section className="tests-panel" lang={locale} aria-label={text.title}>
      <header className="tests-head">
        <p className="tests-kicker">Lumen-1</p>
        <h1>{text.title}</h1>
        <p className="tests-lede">{text.lede}</p>
      </header>
      <ol className="tests-list">
        {rows.map((row) => {
          const body = row[locale];
          const missing = row.status === "missing";
          const status = missing ? text.missing : text.planned;
          return (
            <li key={row.id} className={missing ? "tests-row is-missing" : "tests-row"}>
              <div className="tests-row-top">
                <p className="tests-id">{row.id}</p>
                <p className={missing ? "tests-pill is-missing" : "tests-pill"}>{status}</p>
              </div>
              <h2>{body.name}</h2>
              <p className="tests-procedure">
                <span>{text.procedure}</span>
                {body.procedure}
              </p>
              <p className="tests-detail">{body.detail}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
