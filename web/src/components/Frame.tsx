import type { ReactNode } from "react";
import { copy } from "../i18n";
import type { Lang } from "../types";

type FrameProps = {
  lang: Lang;
  onLang: (lang: Lang) => void;
  children: ReactNode;
};

export function Frame({ lang, onLang, children }: FrameProps) {
  return (
    <div className="page">
      <div className="column">
        <header className="bar">
          <div className="brand">
            <p className="name">{copy.name[lang]}</p>
            <p className="project">Lumen-1</p>
          </div>
          <div className="lang" role="group" aria-label={copy.language[lang]}>
            <button
              type="button"
              className={lang === "en" ? "is-current" : undefined}
              aria-pressed={lang === "en"}
              onClick={() => onLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={lang === "pt" ? "is-current" : undefined}
              aria-pressed={lang === "pt"}
              onClick={() => onLang("pt")}
            >
              PT
            </button>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
