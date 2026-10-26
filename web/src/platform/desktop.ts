import type { Locale } from "./locale";
import type { Note } from "./notes";

export type SessionSnapshot = {
  locale: Locale;
  notes: Note[];
};

export type SessionPatch = {
  locale?: Locale;
  note?: Note;
};

export type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export type ChatAttachment = {
  name: string;
  kind: "image" | "text" | "file";
  dataUrl?: string;
  text?: string;
};

export type ChatRequest = {
  id: string;
  locale: Locale;
  text: string;
  history: ChatTurn[];
  attachment?: ChatAttachment;
};

export type DesktopBridge = {
  getSession: () => Promise<SessionSnapshot>;
  patchSession: (patch: SessionPatch) => Promise<SessionSnapshot>;
  onSession: (listener: (snapshot: SessionSnapshot) => void) => () => void;
  ask: (request: ChatRequest, onToken: (token: string) => void, onDone: (reply: string) => void) => () => void;
  close: () => void;
  minimize: () => void;
  zoom: () => void;
  showWidget: () => void;
};

declare global {
  interface Window {
    astraea?: DesktopBridge;
  }
}

export function desktopBridge(): DesktopBridge | null {
  return typeof window === "undefined" ? null : window.astraea ?? null;
}

export function isWidgetSurface(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("surface") === "widget";
}
