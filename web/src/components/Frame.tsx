import type { ReactNode } from "react";
import { copy } from "../i18n";
import type { Lang, Screen } from "../types";

type FrameProps = {
  lang: Lang;
  screen: Screen;
  baselineReady: boolean;
  auditDone: boolean;
  onLang: (lang: Lang) => void;
  onScreen: (screen: Screen) => void;
  children: ReactNode;
};

const SCREEN_ORDER: Screen[] = ["baseline", "audit", "findings"];

export function Frame({
  lang,
  screen,
  baselineReady,
  auditDone,
  onLang,
  onScreen,
  children,
}: FrameProps) {
  const labels = copy.steps[lang];

  function allowed(next: Screen): boolean {
    if (next === "baseline") return true;
    if (next === "audit") return baselineReady;
    return auditDone;
  }

  return (
    <div className="app">
      <div className="frame">
        <header className="top">
          <div className="wrap top-row">
            <div className="brand">
              <Reticle />
              <div>
                <p className="word">RANGE</p>
                <p className="product">{copy.product[lang]}</p>
              </div>
            </div>
            <p className="chip">{copy.project[lang]}</p>
            <nav className="steps" aria-label={lang === "en" ? "Review steps" : "Passos da revisão"}>
              {SCREEN_ORDER.map((id, index) => {
                const open = allowed(id);
                const current = screen === id;
                return (
                  <button
                    key={id}
                    type="button"
                    className={current ? "step is-current" : "step"}
                    aria-current={current ? "step" : undefined}
                    disabled={!open}
                    onClick={() => onScreen(id)}
                  >
                    <span className="step-index">0{index + 1}</span>
                    {labels[index]}
                  </button>
                );
              })}
            </nav>
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
          </div>
        </header>
        <main className="content wrap">{children}</main>
        <footer className="foot">
          <div className="wrap">
            <p className="source">{copy.source[lang]}</p>
            <p className="domains">{copy.domains[lang]}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Reticle() {
  return (
    <svg className="reticle" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M12 2.5v4.2M12 17.3v4.2M2.5 12h4.2M17.3 12h4.2" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
