import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { answer } from "../../platform/answers";
import { desktopBridge, type ChatAttachment, type ChatTurn } from "../../platform/desktop";
import type { Note } from "../../platform/notes";
import { useSession } from "../../platform/session";

const copy = {
  hint: {
    en: "Opened findings and the phase list.",
    pt: "Constatações abertas e a lista de fases.",
  },
  close: { en: "Close", pt: "Fechar" },
  ask: { en: "Ask Astrea", pt: "Perguntar à Astrea" },
  you: { en: "You", pt: "Tu" },
  attach: { en: "Attach a file", pt: "Anexar um ficheiro" },
  remove: { en: "Remove file", pt: "Retirar ficheiro" },
  placeholder: {
    en: "Message Astrea",
    pt: "Mensagem para a Astrea",
  },
  typing: { en: "Astrea is writing", pt: "A Astrea está a escrever" },
  missing: { en: "The key is not set.", pt: "A chave não está definida." },
};

const TEXT_EXT = /\.(txt|md|csv|json)$/i;

type Draft = {
  id: string;
  text: string;
  attachmentName?: string;
  reply: string;
  live: boolean;
  at: string;
};

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(reader.error ?? new Error("unreadable"));
    reader.readAsDataURL(file);
  });
}

async function readAttachment(file: File): Promise<ChatAttachment> {
  const name = file.name;
  const image = file.type.startsWith("image/");
  if (image) {
    if (file.size > 2_800_000) return { name, kind: "file" };
    try {
      const dataUrl = await readAsDataUrl(file);
      if (dataUrl.startsWith("data:image/") && dataUrl.length < 4_000_000) return { name, kind: "image", dataUrl };
    } catch {
      return { name, kind: "file" };
    }
    return { name, kind: "file" };
  }
  const textFile = file.type.startsWith("text/") || file.type === "application/json" || TEXT_EXT.test(name);
  if (textFile && file.size <= 64_000) {
    try {
      const text = (await file.text()).replace(/\s+/g, " ").trim().slice(0, 6000);
      if (text) return { name, kind: "text", text };
    } catch {
      return { name, kind: "file" };
    }
  }
  return { name, kind: "file" };
}

function priorTurns(notes: Note[], locale: "en" | "pt"): ChatTurn[] {
  return notes
    .filter((note) => note.kind === "question")
    .flatMap((note) => {
      const assistant = note.reply || (note.intent ? answer(locale, note.intent) : "");
      const turns: ChatTurn[] = [{ role: "user", content: note.text }];
      if (assistant) turns.push({ role: "assistant", content: assistant });
      return turns;
    });
}

export function Chat() {
  const { chatOpen } = useSession();
  const reduced = useReducedMotion() === true;
  return <AnimatePresence>{chatOpen ? <ChatSheet reduced={reduced} /> : null}</AnimatePresence>;
}

function ChatSheet({ reduced }: { reduced: boolean }) {
  const { locale, notes, addQuestion, setChatOpen } = useSession();
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const picker = useRef<HTMLInputElement>(null);
  const stopAsk = useRef<(() => void) | null>(null);
  const publish = useRef(addQuestion);
  publish.current = addQuestion;
  const questions = notes.filter((note) => note.kind === "question" && note.id !== draft?.id);

  useEffect(() => {
    field.current?.focus();
  }, []);

  useEffect(() => () => stopAsk.current?.(), []);

  useEffect(() => {
    const node = thread.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [questions.length, draft, draft?.reply]);

  useEffect(() => {
    if (!draft || draft.live) return;
    const saved = notes.find((note) => note.id === draft.id && note.reply);
    if (saved) setDraft(null);
  }, [notes, draft]);

  async function revealLocal(id: string, line: string, note: { text: string; attachmentName?: string; at: string }) {
    let built = "";
    const step = reduced ? line.length : 8;
    for (let i = 0; i < line.length; i += step) {
      built += line.slice(i, i + step);
      const snapshot = built;
      setDraft((current) => (current && current.id === id ? { ...current, reply: snapshot } : current));
      if (!reduced) await new Promise((resolve) => window.setTimeout(resolve, 24));
    }
    setDraft((current) => (current && current.id === id ? { ...current, reply: line, live: false } : current));
    publish.current(note.text, undefined, { id, attachmentName: note.attachmentName, reply: line, at: note.at });
  }

  async function send() {
    const trimmed = text.trim();
    if ((!trimmed && !file) || draft?.live) return;
    const id = crypto.randomUUID();
    const at = new Date().toISOString();
    const chosen = file;
    const attachmentName = chosen?.name;
    const message = trimmed || attachmentName || "";
    setText("");
    setFile(null);
    setDraft({ id, text: message, attachmentName, reply: "", live: true, at });
    publish.current(message, undefined, { id, attachmentName, at });
    const attachment = chosen ? await readAttachment(chosen) : undefined;
    const history = priorTurns(
      notes.filter((note) => note.kind === "question"),
      locale,
    );
    const bridge = desktopBridge();
    if (!bridge) {
      await revealLocal(id, copy.missing[locale], { text: message, attachmentName, at });
      return;
    }
    stopAsk.current?.();
    stopAsk.current = bridge.ask(
      { id, locale, text: trimmed, history, attachment },
      (token) => {
        setDraft((current) => (current && current.id === id ? { ...current, reply: current.reply + token } : current));
      },
      (reply) => {
        setDraft((current) => (current && current.id === id ? { ...current, reply, live: false } : current));
        publish.current(message, undefined, { id, attachmentName, reply, at });
      },
    );
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
          <Exchange key={note.id} locale={locale} text={note.text} attachmentName={note.attachmentName} reply={spoken(note, locale)} />
        ))}
        {draft ? (
          <Exchange
            locale={locale}
            text={draft.text}
            attachmentName={draft.attachmentName}
            reply={draft.reply}
            live={draft.live}
          />
        ) : null}
      </div>
      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          void send();
        }}
      >
        <div className="composer-main">
          {file ? (
            <p className="composer-file">
              <span>{file.name}</span>
              <button type="button" onClick={() => setFile(null)} aria-label={copy.remove[locale]}>
                ×
              </button>
            </p>
          ) : null}
          <textarea
            ref={field}
            rows={1}
            value={text}
            placeholder={copy.placeholder[locale]}
            aria-label={copy.ask[locale]}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault();
                void send();
              }
            }}
          />
        </div>
        <button type="button" className="plus" aria-label={copy.attach[locale]} onClick={() => picker.current?.click()}>
          +
        </button>
        <input
          ref={picker}
          type="file"
          hidden
          accept="image/*,.pdf,.doc,.docx,.txt,.md,.csv,.json,text/plain,application/pdf"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
            event.target.value = "";
          }}
        />
      </form>
    </motion.section>
  );
}

function spoken(note: Note, locale: "en" | "pt"): string {
  if (note.reply) return note.reply;
  if (note.intent) return answer(locale, note.intent);
  return "";
}

function Exchange({
  locale,
  text,
  attachmentName,
  reply,
  live,
}: {
  locale: "en" | "pt";
  text: string;
  attachmentName?: string;
  reply: string;
  live?: boolean;
}) {
  const showFile = attachmentName && attachmentName !== text;
  return (
    <div className="exchange">
      <article className="bubble you">
        <p className="who">{copy.you[locale]}</p>
        <p>{text}</p>
        {showFile ? <p className="bubble-file">{attachmentName}</p> : null}
      </article>
      <article className="bubble astrea" aria-label={live && !reply ? copy.typing[locale] : undefined}>
        <p className="who">Astrea</p>
        {reply ? (
          <p>{reply}</p>
        ) : (
          <p className="typing" aria-hidden="true">
            <span />
            <span />
            <span />
          </p>
        )}
      </article>
    </div>
  );
}
