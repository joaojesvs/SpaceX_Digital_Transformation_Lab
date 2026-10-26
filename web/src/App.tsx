import { useEffect, useState } from "react";
import { Frame } from "./components/Frame";
import { baseline, cards, clauses } from "./data/load";
import { prefersReducedMotion } from "./i18n";
import { findingCardsFor, runReview, type ReviewResult } from "./review/runReview";
import { Thread } from "./screens/AuditScreen";
import { Intro } from "./screens/BaselineScreen";
import { Findings } from "./screens/FindingsScreen";
import type { Lang } from "./types";

type RunStatus = "idle" | "running" | "done";

export function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [status, setStatus] = useState<RunStatus>("idle");
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = "Second Reader";
  }, [lang]);

  useEffect(() => {
    if (status !== "running" || !review) return;
    if (shown >= review.steps.length) {
      setStatus("done");
      return;
    }
    const delay = prefersReducedMotion() ? 0 : 480;
    const id = window.setTimeout(() => setShown((count) => count + 1), delay);
    return () => window.clearTimeout(id);
  }, [status, shown, review]);

  function startReview() {
    if (status !== "idle") return;
    const result = runReview(baseline, clauses);
    setReview(result);
    setShown(1);
    setStatus("running");
  }

  const firedCards = review && status === "done" ? findingCardsFor(review, cards) : [];

  return (
    <Frame lang={lang} onLang={setLang}>
      {status === "idle" ? <Intro lang={lang} onRun={startReview} /> : null}
      {review && status !== "idle" ? <Thread lang={lang} review={review} shown={shown} /> : null}
      {status === "done" ? <Findings lang={lang} cards={firedCards} /> : null}
    </Frame>
  );
}
