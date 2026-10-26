import { cards } from "../data/load";
import { copy, formatLineNumbers } from "../i18n";
import type { Lang } from "../types";

type AuditScreenProps = {
  lang: Lang;
  baselineReady: boolean;
  status: "idle" | "running" | "done";
  step: number;
  onRun: () => void;
  onBack: () => void;
  onFindings: () => void;
};

export function AuditScreen({
  lang,
  baselineReady,
  status,
  step,
  onRun,
  onBack,
  onFindings,
}: AuditScreenProps) {
  const visible = cards.slice(0, step);

  return (
    <section>
      <p className="kicker">{copy.project[lang]}</p>
      <h1>{copy.auditTitle[lang]}</h1>
      <p className="lead">{copy.auditLead[lang]}</p>
      <p className="path">{copy.cardsPath[lang]}</p>
      {!baselineReady ? (
        <div className="actions">
          <p className="note">{copy.needBaseline[lang]}</p>
          <button type="button" className="btn" onClick={onBack}>
            {copy.backBaseline[lang]}
          </button>
        </div>
      ) : (
        <div className="actions">
          {status === "idle" ? (
            <button type="button" className="btn primary" onClick={onRun}>
              {copy.run[lang]}
            </button>
          ) : null}
          {status === "done" ? (
            <button type="button" className="btn primary" onClick={onFindings}>
              {copy.showFindings[lang]}
            </button>
          ) : null}
        </div>
      )}
      <div className="pass" aria-live="polite">
        {status === "running" && step < cards.length ? <p className="note">{copy.reading[lang]}</p> : null}
        {status === "done" ? <p className="note">{copy.readDone[lang]}</p> : null}
        {visible.length > 0 ? (
          <ol className="pass-list">
            {visible.map((card) => (
              <li key={card.id}>
                <span className="pass-clause">{card.clauseId}</span>
                <span className="pass-lines">{formatLineNumbers(card.lineNumbers, lang)}</span>
                <span className="pass-title">{card[lang].title}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
