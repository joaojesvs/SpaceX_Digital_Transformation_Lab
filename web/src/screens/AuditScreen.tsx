import { copy } from "../i18n";
import type { ReviewResult } from "../review/runReview";
import type { Lang } from "../types";

const CHECK_INDEX: Record<string, number> = { "F-01": 0, "F-02": 1, "F-03": 2, "F-04": 3 };

type ThreadProps = {
  lang: Lang;
  review: ReviewResult;
  shown: number;
};

export function Thread({ lang, review, shown }: ThreadProps) {
  const steps = review.steps.slice(0, shown);

  return (
    <ol className="thread" aria-live="polite">
      {steps.map((step, index) => (
        <li className="msg" key={`${step.kind}-${index}`}>
          <p className="who">{copy.name[lang]}</p>
          {step.kind === "baseline" ? (
            <>
              <p>
                {copy.readBaseline[lang]} {step.project}. {step.lineCount} {copy.lines[lang]}.
              </p>
              <p className="quote">
                <span className="qn">{String(step.quote.n).padStart(2, "0")}</span>
                {step.quote.text}
              </p>
            </>
          ) : null}
          {step.kind === "clauses" ? (
            <>
              <p>{copy.openedCards[lang]}</p>
              <ul className="ids">
                {step.ids.map((id) => (
                  <li key={id}>{id}</li>
                ))}
              </ul>
            </>
          ) : null}
          {step.kind === "check" ? (
            <>
              <p>{copy.checkLabel[lang][CHECK_INDEX[step.id] ?? 0]}</p>
              <p className="clause">{step.clauseId}</p>
              {step.quiet ? <p className="quote">{copy.quiet[lang]}</p> : null}
              {step.quotes.map((quote) => (
                <p className="quote" key={quote.n}>
                  <span className="qn">{String(quote.n).padStart(2, "0")}</span>
                  {quote.text}
                </p>
              ))}
            </>
          ) : null}
          {step.kind === "second-reader" ? <p>{step.note[lang]}</p> : null}
          {step.kind === "done" ? (
            <p>
              {step.agreed} {copy.agreedCount[lang]}. {step.disputed} {copy.disputeCount[lang]}.
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
