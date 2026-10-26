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

export type DesktopBridge = {
  getSession: () => Promise<SessionSnapshot>;
  patchSession: (patch: SessionPatch) => Promise<SessionSnapshot>;
  onSession: (listener: (snapshot: SessionSnapshot) => void) => () => void;
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
