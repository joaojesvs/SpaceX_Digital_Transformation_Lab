import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BlueprintsModule } from "../modules/blueprints/BlueprintsModule";
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
import { Icon } from "./icons";
import { moduleLabel, modules } from "./modules";

const chrome = {
  language: { en: "Language", pt: "Língua" },
  close: { en: "Close", pt: "Fechar" },
  minimize: { en: "Minimize", pt: "Minimizar" },
  zoom: { en: "Zoom", pt: "Zoom" },
  ask: { en: "Ask Astrea", pt: "Perguntar à Astrea" },
  foot: { en: "Open · Lumen-1", pt: "Aberto · Lumen-1" },
  overview: { en: "Overview", pt: "Visão geral" },
  mission: {
    en: "Lumen-1  ·  6U optical camera  ·  Falcon 9 rideshare",
    pt: "Lumen-1  ·  Câmara ótica 6U  ·  Rideshare da Falcon 9",
  },
  context: { en: "Lumen-1  ·  Demo", pt: "Lumen-1  ·  Demonstração" },
  now: { en: "PDR", pt: "PDR" },
  next: { en: "Next, CDR", pt: "Seguinte, CDR" },
};

function StarMark() {
  return (
    <svg className="star-mark" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 1.1 13.15 10.85 22.9 12 13.15 13.15 12 22.9 10.85 13.15 1.1 12 10.85 10.85Z" />
    </svg>
  );
}

function ModuleView({ id, locale }: { id: ModuleId; locale: "en" | "pt" }) {
  if (id === "missions") return <MissionsModule locale={locale} />;
  if (id === "compliance") return <ComplianceModule locale={locale} />;
  if (id === "phase") return <PhaseModule locale={locale} />;
  if (id === "budget") return <BudgetModule locale={locale} />;
  if (id === "schedule") return <ScheduleModule locale={locale} />;
  if (id === "tests") return <TestsModule locale={locale} />;
  if (id === "correspondence") return <CorrespondenceModule locale={locale} />;
  if (id === "team") return <TeamModule locale={locale} />;
  return <BlueprintsModule locale={locale} />;
}

export function Shell() {
  const reduced = useReducedMotion() === true;
  const { locale, setLocale, view, setView, chatOpen, setChatOpen, desktop } = useSession();
  const bridge = desktopBridge();
  const moduleView: ModuleId = view === "desk" ? "missions" : view;
  const title = moduleView === "missions" ? chrome.overview[locale] : moduleLabel(moduleView, locale);

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
                <Icon name={item.id} />
                <span>{item[locale]}</span>
              </button>
            ))}
          </nav>
          <p className="side-foot">{chrome.foot[locale]}</p>
        </aside>
        <section className="canvas">
          <header className="dash-bar">
            <div>
              <h1>{title}</h1>
              <p>{moduleView === "missions" ? chrome.mission[locale] : chrome.context[locale]}</p>
            </div>
            <div className="dash-tools">
              {moduleView === "missions" ? (
                <>
                  <span className="pill-now">{chrome.now[locale]}</span>
                  <span className="pill-next">{chrome.next[locale]}</span>
                </>
              ) : null}
              <div className="lang" role="group" aria-label={chrome.language[locale]}>
                <button type="button" aria-pressed={locale === "en"} className={locale === "en" ? "is-on" : undefined} onClick={() => setLocale("en")}>
                  EN
                </button>
                <button type="button" aria-pressed={locale === "pt"} className={locale === "pt" ? "is-on" : undefined} onClick={() => setLocale("pt")}>
                  PT
                </button>
              </div>
            </div>
          </header>
          <AnimatePresence mode="wait">
            <motion.div
              key={moduleView}
              className={moduleView === "missions" ? "stage" : "stage stage-hosted"}
              initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <ModuleView id={moduleView} locale={locale} />
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
      <motion.button
        type="button"
        className={chatOpen ? "ask-fab is-on" : "ask-fab"}
        aria-expanded={chatOpen}
        aria-label={chrome.ask[locale]}
        onClick={() => setChatOpen(!chatOpen)}
        whileTap={reduced ? undefined : { scale: 0.88 }}
        whileHover={reduced ? undefined : { scale: 1.05 }}
        transition={{ type: "spring", stiffness: 520, damping: 26 }}
      >
        <StarMark />
      </motion.button>
    </div>
  );
}
