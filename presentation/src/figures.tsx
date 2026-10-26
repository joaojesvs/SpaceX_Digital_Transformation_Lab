import { brandLine, phases, ui, type Lang, type Scene } from "./copy";

export function Figure({ scene, lang }: { scene: Scene; lang: Lang }) {
  switch (scene.figure) {
    case "late":
      return <Late lang={lang} />;
    case "spec":
      return <Spec lang={lang} />;
    case "reader":
      return <Reader lang={lang} />;
    case "method":
      return <Method lang={lang} />;
    case "optic":
      return <Optic lang={lang} />;
    case "loads":
      return <Loads lang={lang} />;
    case "plate":
      return <Plate lang={lang} />;
    case "record":
      return <Record lang={lang} />;
    case "auditors":
      return <Auditors lang={lang} />;
    case "finding":
      return <Finding scene={scene} lang={lang} />;
    case "human":
      return <Human lang={lang} />;
    case "source":
      return <Source lang={lang} />;
    case "close":
      return <Close scene={scene} lang={lang} />;
    default:
      return null;
  }
}

export function BrandScene({ lang }: { lang: Lang }) {
  return (
    <div className="brand-scene">
      <img className="brand-mark" src="/astrea-mark.png" alt="" />
      <img className="brand-word" src="/astrea-wordmark.png" alt="Astrea" />
      <ul className="palette">
        <li>
          <i className="swatch swatch-ground" />
          {ui.ground[lang]}
        </li>
        <li>
          <i className="swatch swatch-type" />
          {ui.type[lang]}
        </li>
        <li>
          <i className="swatch swatch-accent" />
          {ui.accent[lang]}
        </li>
      </ul>
      <p className="brand-line">{brandLine[lang]}</p>
    </div>
  );
}

function Late({ lang }: { lang: Lang }) {
  const steps =
    lang === "en"
      ? [
          { k: "Written", s: "In the baseline" },
          { k: "In review", s: "PDR" },
          { k: "Found late", s: "Rework" },
        ]
      : [
          { k: "Escrito", s: "Na linha de base" },
          { k: "Em revisão", s: "PDR" },
          { k: "Tarde", s: "Retrabalho" },
        ];
  return (
    <div className="fig">
      <ol className="steps">
        {steps.map((step, index) => (
          <li key={step.k} data-on={index === 2 ? "true" : "false"}>
            <span>{step.k}</span>
            <small>{step.s}</small>
          </li>
        ))}
      </ol>
      <p className="fig-note">
        {lang === "en" ? "The change comes back as rework." : "A alteração volta como retrabalho."}
      </p>
    </div>
  );
}

function Spec({ lang }: { lang: Lang }) {
  const items =
    lang === "en"
      ? ["Lumen-1", "6U", "Optical camera", "PDR", "Next, CDR"]
      : ["Lumen-1", "6U", "Câmara ótica", "PDR", "A seguir, CDR"];
  return (
    <ul className="spec">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Reader({ lang }: { lang: Lang }) {
  const cols =
    lang === "en"
      ? [
          ["Standards", "The opened clauses"],
          ["Design", "The Lumen-1 baseline"],
        ]
      : [
          ["Normas", "As cláusulas abertas"],
          ["Desenho", "A linha de base Lumen-1"],
        ];
  return (
    <div className="fig fig-reader">
      <div className="pair-fig">
        {cols.map(([name, body]) => (
          <div key={name}>
            <p className="fig-kicker">{name}</p>
            <p>{body}</p>
          </div>
        ))}
      </div>
      <p className="fig-join">{lang === "en" ? "One reader" : "Um leitor"}</p>
    </div>
  );
}

function Method({ lang }: { lang: Lang }) {
  return (
    <div className="fig">
      <p className="fig-kicker">Lumen-1</p>
      <p className="fig-strong">{lang === "en" ? "Optical MTF" : "MTF ótico"}</p>
      <p className="fig-label">{lang === "en" ? "Verification method" : "Método de verificação"}</p>
      <p className="empty">{lang === "en" ? "Empty" : "Vazio"}</p>
    </div>
  );
}

function Optic({ lang }: { lang: Lang }) {
  const rows =
    lang === "en"
      ? [
          ["Aperture", ""],
          ["Optic", "No contamination control"],
          ["Detector", "No outgassing check"],
        ]
      : [
          ["Abertura", ""],
          ["Ótica", "Sem controlo de contaminação"],
          ["Detetor", "Sem verificação de desgaseificação"],
        ];
  return (
    <ol className="stack">
      {rows.map(([name, note]) => (
        <li key={name}>
          <span>{name}</span>
          {note ? <small>{note}</small> : <small className="quiet-slot"> </small>}
        </li>
      ))}
    </ol>
  );
}

function Loads({ lang }: { lang: Lang }) {
  return (
    <div className="fig">
      <p className="fig-kicker">{lang === "en" ? "Environment" : "Ambiente"}</p>
      <p className="fig-strong">
        {lang === "en" ? "Rideshare mechanical environment" : "Ambiente mecânico do rideshare"}
      </p>
      <p className="fig-label">{lang === "en" ? "Qualification" : "Qualificação"}</p>
      <p className="empty">{lang === "en" ? "Not in the baseline" : "Não está na linha de base"}</p>
    </div>
  );
}

function Plate({ lang }: { lang: Lang }) {
  return (
    <div className="fig">
      <p className="fig-kicker">{lang === "en" ? "Open record" : "Registo aberto"}</p>
      <p className="fig-strong">Lumen-1</p>
      <p>{lang === "en" ? "6U CubeSat optical camera" : "Câmara ótica CubeSat 6U"}</p>
      <p className="fig-note">{lang === "en" ? "Falcon 9 rideshare" : "Rideshare da Falcon 9"}</p>
    </div>
  );
}

function Record({ lang }: { lang: Lang }) {
  const rail =
    lang === "en"
      ? ["Compliance", "Phase", "Budget", "Schedule", "Tests", "Correspondence", "Team"]
      : ["Conformidade", "Fase", "Orçamento", "Cronograma", "Ensaios", "Correspondência", "Equipa"];
  return (
    <div className="fig fig-record">
      <p className="fig-kicker">{lang === "en" ? "Open record" : "Registo aberto"}</p>
      <p className="fig-strong">Lumen-1</p>
      <p>{lang === "en" ? "6U CubeSat optical camera · Falcon 9 rideshare" : "Câmara ótica CubeSat 6U · rideshare da Falcon 9"}</p>
      <ol className="mini-rail">
        {phases.map((code) => (
          <li key={code} data-state={code === "PDR" ? "now" : code === "CDR" ? "next" : "idle"}>
            {code}
          </li>
        ))}
      </ol>
      <div className="mini-chips">
        {rail.map((name) => (
          <span key={name}>{name}</span>
        ))}
      </div>
      <div className="budget">
        <p className="fig-kicker">{lang === "en" ? "Demo budget" : "Orçamento de demonstração"}</p>
        <p>
          <strong>€2,400,000</strong>
          <span>{lang === "en" ? "Spent €1,100,000" : "Gasto €1,100,000"}</span>
        </p>
      </div>
      <p className="fig-note">
        {lang === "en" ? "Halcyon-3 stays at SRR. Cinder-2 stays at MDR." : "Halcyon-3 fica no SRR. Cinder-2 fica no MDR."}
      </p>
    </div>
  );
}

function Auditors({ lang }: { lang: Lang }) {
  const pair = lang === "en" ? ["Auditor one", "Auditor two"] : ["Auditor um", "Auditor dois"];
  return (
    <div className="fig fig-auditors">
      {pair.map((name) => (
        <p key={name}>{name}</p>
      ))}
      <p className="fig-join">{lang === "en" ? "One baseline" : "Uma linha de base"}</p>
    </div>
  );
}

function Finding({ scene, lang }: { scene: Scene; lang: Lang }) {
  return (
    <div className={scene.tone === "dispute" ? "fig fig-dispute" : "fig"}>
      <p className="fig-kicker">Lumen-1</p>
      <p className={scene.tone === "dispute" ? "pill-word pill-open" : "pill-word"}>{scene.eyebrow?.[lang]}</p>
      {scene.detail ? <p className="fig-body">{scene.detail[lang]}</p> : null}
      {scene.note ? <p className="fig-clause">{scene.note}</p> : null}
    </div>
  );
}

function Human({ lang }: { lang: Lang }) {
  const rows =
    lang === "en"
      ? [
          ["Verification method", "Agreed"],
          ["Contamination and outgassing", "Agreed"],
          ["Rideshare qualification", "Agreed"],
          ["FMEA", "Open"],
        ]
      : [
          ["Método de verificação", "Acordado"],
          ["Contaminação e desgaseificação", "Acordado"],
          ["Qualificação do rideshare", "Acordado"],
          ["FMEA", "Aberto"],
        ];
  return (
    <ol className="verdicts">
      {rows.map(([name, state], index) => (
        <li key={name} data-open={index === 3 ? "true" : "false"}>
          <span>{name}</span>
          <em>{state}</em>
        </li>
      ))}
    </ol>
  );
}

function Source({ lang }: { lang: Lang }) {
  const domains =
    lang === "en"
      ? ["Applicability index", "Configuration", "Finding register", "Rideshare constraints"]
      : ["Índice de aplicabilidade", "Configuração", "Registo de achados", "Restrições do rideshare"];
  return (
    <div className="fig fig-source">
      <div className="pair-fig">
        <div>
          <p className="fig-kicker">Drive</p>
          <p className="fig-strong">317</p>
          <p>{lang === "en" ? "ECSS files. Not read." : "Ficheiros ECSS. Não lidos."}</p>
        </div>
        <div>
          <p className="fig-kicker">Git</p>
          <p className="fig-strong">{lang === "en" ? "Cards" : "Fichas"}</p>
          <p>{lang === "en" ? "Requirements, FMEA, verification plan." : "Requisitos, FMEA, plano de verificação."}</p>
        </div>
      </div>
      <ul className="domains">
        {domains.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <p className="fig-join">{lang === "en" ? "Then the second auditor. Then the human." : "Depois o segundo auditor. Depois a pessoa."}</p>
    </div>
  );
}

function Close({ scene, lang }: { scene: Scene; lang: Lang }) {
  return <p className="thanks">{scene.aside?.[lang]}</p>;
}
