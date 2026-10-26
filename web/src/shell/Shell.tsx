import { useEffect } from "react";
import { BudgetModule } from "../modules/budget/BudgetModule";
import { ComplianceModule } from "../modules/compliance/ComplianceModule";
import { CorrespondenceModule } from "../modules/correspondence/CorrespondenceModule";
import { MissionsModule } from "../modules/missions/MissionsModule";
import { PhaseModule } from "../modules/phase/PhaseModule";
import { ScheduleModule } from "../modules/schedule/ScheduleModule";
import { TeamModule } from "../modules/team/TeamModule";
import { TestsModule } from "../modules/tests/TestsModule";
import { desktopBridge } from "../platform/desktop";
import type { ModuleId } from "../platform/locale";
import { useSession } from "../platform/session";
import { moduleLabel, modules } from "./modules";

const chrome = {
  language: { en: "Language", pt: "Língua" },
  close: { en: "Close", pt: "Fechar" },
  minimize: { en: "Minimize", pt: "Minimizar" },
  zoom: { en: "Zoom", pt: "Zoom" },
  ask: { en: "Ask Astrea", pt: "Perguntar à Astrea" },
  foot: { en: "Open · Lumen-1", pt: "Aberto · Lumen-1" },
};

function StarMark() {
  return (
    <svg className="star-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 1.1 13.15 10.85 22.9 12 13.15 13.15 12 22.9 10.85 13.15 1.1 12 10.85 10.85Z" />
    </svg>
  );
}

export function Shell() {
  const { locale, setLocale, view, setView, chatOpen, setChatOpen, desktop } = useSession();
  const bridge = desktopBridge();
  const moduleView: ModuleId = view === "desk" ? "missions" : view;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = "Astrea";
  }, [locale]);

  return (
    <div className="window">
      <header className="titlebar">
        <div className="lights" aria-hidden={desktop ? undefined : true}>
          <button type="button" className="light close" aria-label={chrome.close[locale]} onClick={() => bridge?.close()} />
          <button type="button" className="light min" aria-label={chrome.minimize[locale]} onClick={() => bridge?.minimize()} />
          <button type="button" className="light zoom" aria-label={chrome.zoom[locale]} onClick={() => bridge?.zoom()} />
        </div>
        <div className="lang" role="group" aria-label={chrome.language[locale]}>
          <button type="button" aria-pressed={locale === "en"} className={locale === "en" ? "is-on" : undefined} onClick={() => setLocale("en")}>
            EN
          </button>
          <button type="button" aria-pressed={locale === "pt"} className={locale === "pt" ? "is-on" : undefined} onClick={() => setLocale("pt")}>
            PT
          </button>
        </div>
      </header>
      <div className="workspace">
        <aside className="sidebar">
          <div className="brand">
            <StarMark />
            <span className="wordmark">Astrea</span>
          </div>
          <nav className="side-rail" aria-label={moduleLabel(moduleView, locale)}>
            {modules.map((item) => (
              <button
                key={item.id}
                type="button"
                className={moduleView === item.id ? "rail-btn is-on" : "rail-btn"}
                aria-current={moduleView === item.id ? "page" : undefined}
                onClick={() => setView(item.id)}
              >
                <span>{item[locale]}</span>
              </button>
            ))}
          </nav>
          <p className="side-foot">{chrome.foot[locale]}</p>
        </aside>
        <main className={moduleView === "missions" ? "stage" : "stage stage-hosted"}>
          {moduleView === "missions" ? <MissionsModule locale={locale} /> : null}
          {moduleView === "compliance" ? <ComplianceModule locale={locale} /> : null}
          {moduleView === "phase" ? <PhaseModule locale={locale} /> : null}
          {moduleView === "budget" ? <BudgetModule locale={locale} /> : null}
          {moduleView === "schedule" ? <ScheduleModule locale={locale} /> : null}
          {moduleView === "tests" ? <TestsModule locale={locale} /> : null}
          {moduleView === "correspondence" ? <CorrespondenceModule locale={locale} /> : null}
          {moduleView === "team" ? <TeamModule locale={locale} /> : null}
        </main>
      </div>
      <button
        type="button"
        className={chatOpen ? "ask-fab is-on" : "ask-fab"}
        aria-expanded={chatOpen}
        aria-label={chrome.ask[locale]}
        onClick={() => setChatOpen(!chatOpen)}
      >
        <StarMark />
      </button>
    </div>
  );
}
