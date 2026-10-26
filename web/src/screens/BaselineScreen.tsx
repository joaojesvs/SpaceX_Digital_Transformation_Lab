import { useEffect } from "react";
import { baseline, cards } from "../data/load";
import { SLICE, copy } from "../i18n";
import type { Lang } from "../types";

type BaselineScreenProps = {
  lang: Lang;
  phase: "idle" | "loading" | "ready";
  auditDone: boolean;
  focusLine: number | null;
  onLoad: () => void;
  onContinue: () => void;
};

export function BaselineScreen({
  lang,
  phase,
  auditDone,
  focusLine,
  onLoad,
  onContinue,
}: BaselineScreenProps) {
  useEffect(() => {
    if (phase !== "ready" || focusLine == null) return;
    const node = document.getElementById(`line-${focusLine}`);
    node?.scrollIntoView({
      block: "center",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  }, [phase, focusLine]);

  const marks = new Map<number, "agree" | "dispute">();
  if (auditDone) {
    for (const card of cards) {
      for (const lineNumber of card.lineNumbers) {
        marks.set(lineNumber, card.verdict);
      }
    }
  }

  return (
    <section>
      <p className="kicker">{copy.project[lang]}</p>
      <h1>{copy.baselineTitle[lang]}</h1>
      <p className="lead">{copy.baselineLead[lang]}</p>
      <div className="actions">
        {phase === "idle" ? (
          <button type="button" className="btn primary" onClick={onLoad}>
            {copy.load[lang]}
          </button>
        ) : null}
        {phase === "loading" ? (
          <button type="button" className="btn primary" disabled>
            {copy.loading[lang]}
          </button>
        ) : null}
        {phase === "ready" ? (
          <button type="button" className="btn primary" onClick={onContinue}>
            {copy.continueAudit[lang]}
          </button>
        ) : null}
      </div>
      <p className="slice-label">{copy.slice[lang]}</p>
      <ul className="slice">
        {SLICE.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {phase === "ready" ? (
        <article className="sheet" aria-label={copy.baselineTitle[lang]}>
          <header className="sheet-head">
            <span>
              {baseline.id} · Rev {baseline.revision}
            </span>
            <span>{copy.sample[lang]}</span>
            <span>{copy.baselineLang[lang]}</span>
          </header>
          <ol className="lines">
            {baseline.lines.map((line) => {
              const mark = marks.get(line.n) ?? null;
              const card = cards.find((item) => item.lineNumbers.includes(line.n));
              const focused = focusLine === line.n;
              const text = line.text;
              return (
                <li
                  key={line.n}
                  id={`line-${line.n}`}
                  className={["line", mark ? `is-${mark}` : "", focused ? "is-focus" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="ln">{String(line.n).padStart(2, "0")}</span>
                  <span className="lt">{text || "\u00a0"}</span>
                  {mark && card ? <span className="tag">{card.clauseId}</span> : <span />}
                </li>
              );
            })}
          </ol>
          <p className="path">{copy.baselinePath[lang]}</p>
        </article>
      ) : null}
    </section>
  );
}
