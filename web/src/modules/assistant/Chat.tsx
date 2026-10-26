import { useEffect, useRef, useState } from "react";
import { answer, interpret, prompts } from "../../platform/answers";
import { useSession } from "../../platform/session";

const copy = {
  hint: {
    en: "Scripted answers from the opened findings, the phase list, and the next phase.",
    pt: "Respostas escritas a partir das constatações abertas, da lista de fases e da fase seguinte.",
  },
  close: { en: "Close", pt: "Fechar" },
  send: { en: "Send", pt: "Enviar" },
  ask: { en: "Ask Astraea", pt: "Perguntar à Astraea" },
  placeholder: {
    en: "This mission, a regulation, or the next step",
    pt: "Esta missão, uma norma, ou o passo seguinte",
  },
};

export function Chat() {
  const { locale, notes, addQuestion, chatOpen, setChatOpen } = useSession();
  const [text, setText] = useState("");
  const field = useRef<HTMLInputElement>(null);
  const questions = notes.filter((note) => note.kind === "question");

  useEffect(() => {
    if (chatOpen) field.current?.focus();
  }, [chatOpen]);

  if (!chatOpen) return null;

  function send(value: string) {
    const trimmed = value.trim();
    if (!trimmed) return;
    addQuestion(trimmed, interpret(trimmed));
    setText("");
  }

  return (
    <section className="ask-panel" role="dialog" aria-label="Astraea">
      <header>
        <div>
          <p className="appname">Astraea</p>
          <p className="quiet">{copy.hint[locale]}</p>
        </div>
        <button type="button" className="text-btn" onClick={() => setChatOpen(false)}>
          {copy.close[locale]}
        </button>
      </header>
      <div className="suggest">
        {prompts.map((prompt) => (
          <button key={prompt.intent} type="button" onClick={() => send(prompt[locale])}>
            {prompt[locale]}
          </button>
        ))}
      </div>
      <div className="transcript">
        {questions.map((note) => (
          <div key={note.id} className="exchange">
            <p className="ask-line">{note.text}</p>
            <p className="reply">{note.intent ? answer(locale, note.intent) : ""}</p>
          </div>
        ))}
      </div>
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          send(text);
        }}
      >
        <input
          ref={field}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={copy.placeholder[locale]}
          aria-label={copy.ask[locale]}
        />
        <button type="submit">{copy.send[locale]}</button>
      </form>
    </section>
  );
}
