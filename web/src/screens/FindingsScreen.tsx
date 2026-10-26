import { baseline, cards } from "../data/load";
import { copy, formatLineNumbers } from "../i18n";
import type { Lang } from "../types";

type FindingsScreenProps = {
  lang: Lang;
  auditDone: boolean;
  onShowLine: (lineNumber: number) => void;
  onBack: () => void;
};

export function FindingsScreen({ lang, auditDone, onShowLine, onBack }: FindingsScreenProps) {
  const lines = new Map(baseline.lines.map((line) => [line.n, line]));
  const agreed = cards.filter((card) => card.verdict === "agree").length;
  const disputed = cards.length - agreed;

  if (!auditDone) {
    return (
      <section>
        <p className="kicker">{copy.project[lang]}</p>
        <h1>{copy.findingsTitle[lang]}</h1>
        <p className="lead">{copy.needAudit[lang]}</p>
        <div className="actions">
          <button type="button" className="btn" onClick={onBack}>
            {copy.backAudit[lang]}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <p className="kicker">{copy.project[lang]}</p>
      <h1>{copy.findingsTitle[lang]}</h1>
      <p className="lead">{copy.findingsLead[lang]}</p>
      <p className="tally">
        <span>{agreed}</span> {copy.agreedCount[lang]}
        <span className="dot" aria-hidden="true">
          ·
        </span>
        <span>{disputed}</span> {copy.disputeCount[lang]}
      </p>
      <div className="cards">
        {cards.map((card) => {
          const text = card[lang];
          const firstLine = card.lineNumbers[0];
          return (
            <article key={card.id} className={`card ${card.verdict}`} id={`finding-${card.id}`}>
              <header className="card-top">
                <div>
                  <p className="clause">
                    <span className="meta">{copy.clause[lang]}</span>
                    {card.clauseId}
                  </p>
                  {card.supportingClauses.length > 0 ? (
                    <div className="constraint">
                      <span className="meta">{copy.alsoOpened[lang]}</span>
                      <ul className="support">
                        {card.supportingClauses.map((clause) => (
                          <li key={clause}>{clause}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="pills">
                  {card.verdict === "agree" ? <span className="pill critical">{copy.critical[lang]}</span> : null}
                  <span className={`pill ${card.verdict}`}>
                    {card.verdict === "agree" ? copy.agreed[lang] : copy.disputed[lang]}
                  </span>
                </div>
              </header>
              <h2>{text.title}</h2>
              <div className="card-grid">
                <section>
                  <h3>{copy.trigger[lang]}</h3>
                  <blockquote className="quote">
                    {card.lineNumbers.map((lineNumber) => {
                      const line = lines.get(lineNumber);
                      return (
                        <p key={lineNumber}>
                          <span className="qn">{String(lineNumber).padStart(2, "0")}</span>
                          {line ? line.text : ""}
                        </p>
                      );
                    })}
                  </blockquote>
                  <button type="button" className="text-btn" onClick={() => onShowLine(firstLine)}>
                    {copy.showLine[lang]}
                    <span className="meta"> {formatLineNumbers([firstLine], lang)}</span>
                  </button>
                </section>
                <section>
                  <h3>{card.verdict === "agree" ? copy.why[lang] : copy.whyDisputed[lang]}</h3>
                  <p>{text.whyCritical}</p>
                </section>
                <section>
                  <h3>{copy.change[lang]}</h3>
                  <p>{text.change}</p>
                </section>
                <section className={card.verdict === "dispute" ? "span" : undefined}>
                  <h3>{copy.versus[lang]}</h3>
                  <p>{text.agreement}</p>
                  {card.verdict === "dispute" ? (
                    <div className="split">
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
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
