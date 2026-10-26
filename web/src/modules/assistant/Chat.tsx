import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { answer, interpret, prompts, type Intent } from "../../platform/answers";
import { useSession } from "../../platform/session";

const copy = {
  hint: {
    en: "Opened findings and the phase list.",
    pt: "Constatações abertas e a lista de fases.",
  },
  close: { en: "Close", pt: "Fechar" },
  send: { en: "Send", pt: "Enviar" },
  ask: { en: "Ask Astrea", pt: "Perguntar à Astrea" },
  you: { en: "You", pt: "Tu" },
  placeholder: {
    en: "Message Astrea",
    pt: "Mensagem para a Astrea",
  },
  typing: { en: "Astrea is writing", pt: "A Astrea está a escrever" },
};

export function Chat() {
  const { chatOpen } = useSession();
  const reduced = useReducedMotion() === true;
  return (
    <AnimatePresence>
      {chatOpen ? <ChatSheet reduced={reduced} /> : null}
    </AnimatePresence>
  );
}

function ChatSheet({ reduced }: { reduced: boolean }) {
  const { locale, notes, addQuestion, setChatOpen } = useSession();
  const [text, setText] = useState("");
  const [pending, setPending] = useState<{ text: string; intent: Intent } | null>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const publish = useRef(addQuestion);
  publish.current = addQuestion;
  const questions = notes.filter((note) => note.kind === "question");

  useEffect(() => {
    field.current?.focus();
  }, []);

  useEffect(() => {
    const node = thread.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [questions.length, pending]);

  useEffect(() => {
    if (!pending) return;
    const timer = window.setTimeout(() => {
      publish.current(pending.text, pending.intent);
      setPending(null);
    }, reduced ? 0 : 700);
    return () => window.clearTimeout(timer);
  }, [pending, reduced]);

  function send(value: string) {
    const trimmed = value.trim();
    if (!trimmed || pending) return;
    setText("");
    setPending({ text: trimmed, intent: interpret(trimmed) });
  }

  return (
    <motion.section
      className="ask-panel"
      role="dialog"
      aria-label="Astrea"
      initial={reduced ? { opacity: 1 } : { opacity: 0, scale: 0.82, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: reduced ? 0.01 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "bottom right" }}
    >
      <header>
        <p className="wordmark">Astrea</p>
        <button type="button" className="text-btn" onClick={() => setChatOpen(false)}>
          {copy.close[locale]}
        </button>
      </header>
      <div className="thread" ref={thread}>
        <article className="bubble astrea">
          <p className="who">Astrea</p>
          <p>{copy.hint[locale]}</p>
        </article>
        {questions.map((note) => (
          <div key={note.id} className="exchange">
            <article className="bubble you">
              <p className="who">{copy.you[locale]}</p>
              <p>{note.text}</p>
            </article>
            <article className="bubble astrea">
              <p className="who">Astrea</p>
              <p>{note.intent ? answer(locale, note.intent) : ""}</p>
            </article>
          </div>
        ))}
        {pending ? (
          <div className="exchange">
            <article className="bubble you">
              <p className="who">{copy.you[locale]}</p>
              <p>{pending.text}</p>
            </article>
            <article className="bubble astrea" aria-label={copy.typing[locale]}>
              <p className="who">Astrea</p>
              <p className="typing" aria-hidden="true">
                <span />
                <span />
                <span />
              </p>
            </article>
          </div>
        ) : null}
      </div>
      <div className="chips" role="group" aria-label={copy.ask[locale]}>
        {prompts.map((prompt) => (
          <button key={prompt.intent} type="button" onClick={() => send(prompt[locale])} disabled={pending !== null}>
            {prompt[locale]}
          </button>
        ))}
      </div>
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          send(text);
        }}
      >
        <textarea
          ref={field}
          rows={1}
          value={text}
          placeholder={copy.placeholder[locale]}
          aria-label={copy.ask[locale]}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send(text);
            }
          }}
        />
        <button type="submit" disabled={pending !== null || text.trim() === ""}>
          {copy.send[locale]}
        </button>
      </form>
    </motion.section>
  );
}
