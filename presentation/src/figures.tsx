import { brandLine, ui, type Lang, type Scene } from "./copy";

export function Figure({ scene, lang }: { scene: Scene; lang: Lang }) {
  switch (scene.figure) {
    case "context":
      return <Context lang={lang} />;
    case "findings":
      return <Findings lang={lang} />;
    case "cursor":
      return <CursorUse lang={lang} />;
    case "grok":
      return <GrokUse lang={lang} />;
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

function Context({ lang }: { lang: Lang }) {
  const items =
    lang === "en"
      ? ["Lumen-1", "6U", "Optical camera", "Falcon 9 rideshare", "PDR"]
      : ["Lumen-1", "6U", "Câmara ótica", "Rideshare da Falcon 9", "PDR"];
  return (
    <div className="fig">
      <p className="fig-kicker">{lang === "en" ? "Open record" : "Registo aberto"}</p>
      <ul className="spec">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Findings({ lang }: { lang: Lang }) {
  const rows =
    lang === "en"
      ? [
          ["F-01", "No verification method", "Agreed", "ECSS-E-ST-10-02C Rev.1 · 5.2.1e · ECSS-E-ST-10C Rev.1 · 5.2.3.4a", false],
          ["F-02", "No contamination or outgassing control", "Agreed", "ECSS-Q-ST-70C Rev.2 · 4.4a", false],
          ["F-03", "No rideshare qualification", "Agreed", "ECSS-E-ST-10-03C Rev.1 · 4.5.2a", false],
          ["F-04", "Reliability asserted. No FMEA.", "In dispute", "ECSS-Q-ST-30C Rev.1 · 6.4.2.2a", true],
        ]
      : [
          ["F-01", "Sem método de verificação", "Acordado", "ECSS-E-ST-10-02C Rev.1 · 5.2.1e · ECSS-E-ST-10C Rev.1 · 5.2.3.4a", false],
          ["F-02", "Sem controlo de contaminação ou desgaseificação", "Acordado", "ECSS-Q-ST-70C Rev.2 · 4.4a", false],
          ["F-03", "Sem qualificação do rideshare", "Acordado", "ECSS-E-ST-10-03C Rev.1 · 4.5.2a", false],
          ["F-04", "Fiabilidade afirmada. Sem FMEA.", "Em disputa", "ECSS-Q-ST-30C Rev.1 · 6.4.2.2a", true],
        ];
  return (
    <ol className="board">
      {rows.map(([id, name, state, clause, open]) => (
        <li key={String(id)} data-open={open ? "true" : "false"}>
          <span className="board-id">{id}</span>
          <span className="board-name">
            <strong>{name}</strong>
            <small>{clause}</small>
          </span>
          <em>{state}</em>
        </li>
      ))}
    </ol>
  );
}

function CursorUse({ lang }: { lang: Lang }) {
  const rows =
    lang === "en"
      ? [
          ["Cards", "Committed"],
          ["Review", "English, with Portuguese"],
          ["Stage", "This opener"],
        ]
      : [
          ["Fichas", "Commitadas"],
          ["Revisão", "Inglês, com português"],
          ["Palco", "Esta abertura"],
        ];
  return (
    <ol className="board board-quiet">
      {rows.map(([name, state]) => (
        <li key={name}>
          <span className="board-name">
            <strong>{name}</strong>
          </span>
          <em>{state}</em>
        </li>
      ))}
    </ol>
  );
}

function GrokUse({ lang }: { lang: Lang }) {
  const rows =
    lang === "en"
      ? [
          ["Grokbot", "The question"],
          ["xAI API", "The call"],
          ["Key", "Never shown"],
        ]
      : [
          ["Grokbot", "A pergunta"],
          ["API da xAI", "A chamada"],
          ["Chave", "Nunca aparece"],
        ];
  return (
    <ol className="board board-quiet">
      {rows.map(([name, state]) => (
        <li key={name} data-open={name === "Key" || name === "Chave" ? "true" : "false"}>
          <span className="board-name">
            <strong>{name}</strong>
          </span>
          <em>{state}</em>
        </li>
      ))}
    </ol>
  );
}

function Close({ scene, lang }: { scene: Scene; lang: Lang }) {
  return <p className="thanks">{scene.aside?.[lang]}</p>;
}
