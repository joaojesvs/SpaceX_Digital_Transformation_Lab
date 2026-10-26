import { useEffect, useRef, useState } from "react";
import { answer, interpret, prompts } from "../../platform/answers";
import { useSession } from "../../platform/session";

const copy = {
  hint: {
    en: "Opened findings and the phase list.",
    pt: "Constatações abertas e a lista de fases.",
  },
  close: { en: "Close", pt: "Fechar" },
  send: { en: "Send", pt: "Enviar" },
  ask: { en: "Ask Astrea", pt: "Perguntar à Astrea" },
  placeholder: {
    en: "Ask from the opened record",
    pt: "Perguntar a partir do registo aberto",
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
    <section className="ask-panel" role="dialog" aria-label="Astrea">
      <header>
        <p className="wordmark">Astrea</p>
        <button type="button" className="text-btn" onClick={() => setChatOpen(false)}>
          {copy.close[locale]}
        </button>
      </header>
      <p className="quiet">{copy.hint[locale]}</p>
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
