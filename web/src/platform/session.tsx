import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Intent } from "./answers";
import { desktopBridge } from "./desktop";
import type { Locale, ViewId } from "./locale";
import type { Note } from "./notes";

export type { Note };

type SessionValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  view: ViewId;
  setView: (view: ViewId) => void;
  notes: Note[];
  addLog: (text: string) => void;
  addQuestion: (text: string, intent: Intent) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  desktop: boolean;
};

const SessionContext = createContext<SessionValue | null>(null);

function makeNote(kind: Note["kind"], text: string, intent?: Intent): Note {
  return { id: crypto.randomUUID(), kind, text, intent, at: new Date().toISOString() };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const bridge = desktopBridge();
  const [locale, setLocaleState] = useState<Locale>("en");
  const [view, setView] = useState<ViewId>("missions");
  const [notes, setNotes] = useState<Note[]>([]);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    if (!bridge) return;
    let live = true;
    void bridge.getSession().then((snapshot) => {
      if (!live) return;
      setLocaleState(snapshot.locale);
      setNotes(snapshot.notes);
    });
    const stop = bridge.onSession((snapshot) => {
      setLocaleState(snapshot.locale);
      setNotes(snapshot.notes);
    });
    return () => {
      live = false;
      stop();
    };
  }, [bridge]);

  const value = useMemo<SessionValue>(() => {
    function publish(note: Note) {
      if (bridge) {
        void bridge.patchSession({ note });
        return;
      }
      setNotes((current) => [...current, note]);
    }

    return {
      locale,
      setLocale: (next) => {
        setLocaleState(next);
        if (bridge) void bridge.patchSession({ locale: next });
      },
      view,
      setView,
      notes,
      addLog: (text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        publish(makeNote("log", trimmed));
      },
      addQuestion: (text, intent) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        publish(makeNote("question", trimmed, intent));
      },
      chatOpen,
      setChatOpen,
      desktop: Boolean(bridge),
    };
  }, [bridge, locale, view, notes, chatOpen]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const value = useContext(SessionContext);
  if (!value) throw new Error("Session is missing.");
  return value;
}
