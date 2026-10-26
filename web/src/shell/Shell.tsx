import { useEffect } from "react";
import { MissionsModule } from "../modules/missions/MissionsModule";
import { desktopBridge } from "../platform/desktop";
import type { ModuleId } from "../platform/locale";
import { useSession } from "../platform/session";
import { Icon } from "./icons";
import { ModuleHost } from "./ModuleHost";
import { moduleLabel, modules } from "./modules";

const chrome = {
  ask: { en: "Ask", pt: "Perguntar" },
  widget: { en: "Widget", pt: "Widget" },
  language: { en: "Language", pt: "Língua" },
  close: { en: "Close", pt: "Fechar" },
  minimize: { en: "Minimize", pt: "Minimizar" },
  zoom: { en: "Zoom", pt: "Zoom" },
  open: { en: "Open mission", pt: "Missão aberta" },
  budget: { en: "Budget", pt: "Orçamento" },
  spent: { en: "Spent", pt: "Gasto" },
  budgetValue: "€2,400,000",
  spentValue: "€1,100,000",
  phaseNow: { en: "PDR now", pt: "PDR agora" },
  phaseNext: { en: "Next, CDR", pt: "Seguinte, CDR" },
  list: { en: "On the missions list", pt: "Na lista de missões" },
};

export function Shell() {
  const { locale, setLocale, view, setView, setChatOpen, desktop } = useSession();
  const bridge = desktopBridge();
  const moduleView: ModuleId = view === "desk" ? "missions" : view;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = "Astraea";
  }, [locale]);

  return (
    <div className="window">
      <header className="titlebar">
        <div className="lights" aria-hidden={desktop ? undefined : true}>
          <button type="button" className="light close" aria-label={chrome.close[locale]} onClick={() => bridge?.close()} />
          <button type="button" className="light min" aria-label={chrome.minimize[locale]} onClick={() => bridge?.minimize()} />
          <button type="button" className="light zoom" aria-label={chrome.zoom[locale]} onClick={() => bridge?.zoom()} />
        </div>
        <nav className="menubar" aria-label="Astraea">
          <span className="appname">Astraea</span>
          {modules.map((item) => (
            <button
              key={item.id}
              type="button"
              className={moduleView === item.id ? "menu-item is-on" : "menu-item"}
              aria-current={moduleView === item.id ? "page" : undefined}
              onClick={() => setView(item.id)}
            >
              {item[locale]}
            </button>
          ))}
        </nav>
        <div className="title-actions">
          <button type="button" className="menu-item" onClick={() => setChatOpen(true)}>
            {chrome.ask[locale]}
          </button>
          {desktop ? (
            <button type="button" className="menu-item" onClick={() => bridge?.showWidget()}>
              {chrome.widget[locale]}
            </button>
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
      <div className="workspace">
        <aside className="sidebar">
          <p className="side-kicker">{chrome.open[locale]}</p>
          <p className="side-name">Lumen-1</p>
          <p className="side-quiet">{chrome.phaseNow[locale]}</p>
          <p className="side-quiet">{chrome.phaseNext[locale]}</p>
          <dl className="side-figures">
            <div>
              <dt>{chrome.budget[locale]}</dt>
              <dd>{chrome.budgetValue}</dd>
            </div>
            <div>
              <dt>{chrome.spent[locale]}</dt>
              <dd>{chrome.spentValue}</dd>
            </div>
          </dl>
          <p className="side-kicker">{chrome.list[locale]}</p>
          <ul className="side-list">
            <li>Halcyon-3</li>
            <li>Cinder-2</li>
          </ul>
          <div className="side-rail" aria-label={moduleLabel(moduleView, locale)}>
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
          </div>
        </aside>
        <main className="stage">
          <h1>{moduleLabel(moduleView, locale)}</h1>
          {moduleView === "missions" ? <MissionsModule locale={locale} /> : <ModuleHost id={moduleView} locale={locale} />}
        </main>
      </div>
    </div>
  );
}
