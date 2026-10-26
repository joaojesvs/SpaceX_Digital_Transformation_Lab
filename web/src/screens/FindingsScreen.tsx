import { baseline } from "../data/load";
import { copy } from "../i18n";
import type { Card, Lang } from "../types";

type FindingsProps = {
  lang: Lang;
  cards: Card[];
};

export function Findings({ lang, cards }: FindingsProps) {
  const lines = new Map(baseline.lines.map((line) => [line.n, line]));

  return (
    <div className="findings">
      {cards.map((card) => {
        const text = card[lang];
        return (
          <article
            key={card.id}
            className={card.verdict === "dispute" ? "card is-open" : "card"}
            id={`finding-${card.id}`}
          >
            <p className={card.verdict === "agree" ? "pill agree" : "pill open"}>
              {card.verdict === "agree" ? copy.agreed[lang] : copy.open[lang]}
            </p>
            <h2>{text.title}</h2>
            <p className="clause">{card.clauseId}</p>
            <section className="field">
              <h3>{copy.projectLine[lang]}</h3>
              {card.lineNumbers.map((lineNumber) => {
                const line = lines.get(lineNumber);
                return (
                  <p className="quote" key={lineNumber}>
                    <span className="qn">{String(lineNumber).padStart(2, "0")}</span>
                    {line ? line.text : ""}
                  </p>
                );
              })}
            </section>
            <section className="field">
              <h3>{copy.change[lang]}</h3>
              <p>{text.change}</p>
            </section>
            <section className="field quiet">
              <h3>{card.verdict === "agree" ? copy.why[lang] : copy.whyDisputed[lang]}</h3>
              <p>{text.whyCritical}</p>
            </section>
            <section className="field quiet">
              <h3>{copy.versus[lang]}</h3>
              <p>{text.agreement}</p>
              {card.verdict === "dispute" ? (
                <div className="readers">
                  <div>
                    <h4>{copy.auditorA[lang]}</h4>
                    <p>{text.auditorA}</p>
                  </div>
                  <div>
                    <h4>{copy.auditorB[lang]}</h4>
                    <p>{text.auditorB}</p>
                  </div>
                </div>
              ) : null}
            </section>
          </article>
        );
      })}
    </div>
  );
}
