import { useState } from "react";
import { answer, interpret, nextPrompt, prompts, type Intent } from "../../platform/answers";
import { useSession } from "../../platform/session";

type Mode = "log" | "rule" | "next";

const copy = {
  title: { en: "Employee widget", pt: "Widget do colaborador" },
  log: { en: "Log book", pt: "Diário" },
  rule: { en: "Regulation", pt: "Norma" },
  next: { en: "Next phase", pt: "Fase seguinte" },
  placeholder: { en: "A line for Lumen-1…", pt: "Uma linha para o Lumen-1…" },
  add: { en: "File on Lumen-1", pt: "Arquivar no Lumen-1" },
  send: { en: "Send", pt: "Enviar" },
  ask: { en: "Ask the next phase", pt: "Perguntar a fase seguinte" },
  filed: { en: "Filed on the open mission.", pt: "Arquivado na missão aberta." },
  field: { en: "Question", pt: "Pergunta" },
};

export function Widget() {
  const { locale, addLog, addQuestion, notes } = useSession();
  const [mode, setMode] = useState<Mode>("log");
  const [log, setLog] = useState("");
  const [question, setQuestion] = useState("");
  const [last, setLast] = useState<Intent | null>(null);
  const regulation = prompts.find((prompt) => prompt.intent === "verification");

  function ask(value: string, intent?: Intent) {
    const trimmed = value.trim();
    if (!trimmed) return;
    const resolved = intent ?? interpret(trimmed);
    addQuestion(trimmed, resolved);
    setLast(resolved);
    setQuestion("");
  }

  return (
    <section className="widget-panel" aria-label={copy.title[locale]}>
      <header className="widget-drag">
        <p className="appname">Astraea</p>
        <p className="quiet">{copy.title[locale]}</p>
      </header>
      <div className="modes" role="tablist">
        <button type="button" role="tab" aria-selected={mode === "log"} onClick={() => setMode("log")}>
          {copy.log[locale]}
        </button>
        <button type="button" role="tab" aria-selected={mode === "rule"} onClick={() => setMode("rule")}>
          {copy.rule[locale]}
        </button>
        <button type="button" role="tab" aria-selected={mode === "next"} onClick={() => setMode("next")}>
          {copy.next[locale]}
        </button>
      </div>
      {mode === "log" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            addLog(log);
            setLog("");
            setLast(null);
          }}
        >
          <textarea value={log} rows={4} onChange={(event) => setLog(event.target.value)} placeholder={copy.placeholder[locale]} aria-label={copy.log[locale]} />
          <button type="submit">{copy.add[locale]}</button>
        </form>
      ) : null}
      {mode === "rule" && regulation ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            ask(question);
          }}
        >
          <button type="button" className="suggest-one" onClick={() => ask(regulation[locale], "verification")}>
            {regulation[locale]}
          </button>
          <input value={question} onChange={(event) => setQuestion(event.target.value)} aria-label={copy.field[locale]} />
          <button type="submit">{copy.send[locale]}</button>
        </form>
      ) : null}
      {mode === "next" ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            ask(nextPrompt[locale], "next");
          }}
        >
          <p>{nextPrompt[locale]}</p>
          <button type="submit">{copy.ask[locale]}</button>
        </form>
      ) : null}
      {last ? <p className="reply">{answer(locale, last)}</p> : null}
      {notes.length > 0 ? <p className="quiet">{copy.filed[locale]}</p> : null}
    </section>
  );
}
