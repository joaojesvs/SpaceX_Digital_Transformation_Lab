import { useEffect, useState } from "react";
import { Frame } from "./components/Frame";
import { cards } from "./data/load";
import { prefersReducedMotion } from "./i18n";
import { AuditScreen } from "./screens/AuditScreen";
import { BaselineScreen } from "./screens/BaselineScreen";
import { FindingsScreen } from "./screens/FindingsScreen";
import type { Lang, Screen } from "./types";

type BaselinePhase = "idle" | "loading" | "ready";
type AuditStatus = "idle" | "running" | "done";

export function App() {
  const [lang, setLang] = useState<Lang>("en");
  const [screen, setScreen] = useState<Screen>("baseline");
  const [baselinePhase, setBaselinePhase] = useState<BaselinePhase>("idle");
  const [auditStatus, setAuditStatus] = useState<AuditStatus>("idle");
  const [auditStep, setAuditStep] = useState(0);
  const [focusLine, setFocusLine] = useState<number | null>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === "en" ? "RANGE — ECSS audit" : "RANGE — auditoria ECSS";
  }, [lang]);

  useEffect(() => {
    if (baselinePhase !== "loading") return;
    const delay = prefersReducedMotion() ? 0 : 480;
    const id = window.setTimeout(() => setBaselinePhase("ready"), delay);
    return () => window.clearTimeout(id);
  }, [baselinePhase]);

  useEffect(() => {
    if (auditStatus !== "running") return;
    if (auditStep >= cards.length) {
      setAuditStatus("done");
      return;
    }
    const delay = prefersReducedMotion() ? 0 : 680;
    const id = window.setTimeout(() => setAuditStep((step) => step + 1), delay);
    return () => window.clearTimeout(id);
  }, [auditStatus, auditStep]);

  function loadBaseline() {
    if (baselinePhase !== "idle") return;
    setBaselinePhase("loading");
  }

  function runAudit() {
    if (baselinePhase !== "ready" || auditStatus !== "idle") return;
    setAuditStep(0);
    setAuditStatus("running");
  }

  function showLine(lineNumber: number) {
    setFocusLine(lineNumber);
    setScreen("baseline");
  }

  return (
    <Frame
      lang={lang}
      screen={screen}
      baselineReady={baselinePhase === "ready"}
      auditDone={auditStatus === "done"}
      onLang={setLang}
      onScreen={setScreen}
    >
      {screen === "baseline" ? (
        <BaselineScreen
          lang={lang}
          phase={baselinePhase}
          auditDone={auditStatus === "done"}
          focusLine={focusLine}
          onLoad={loadBaseline}
          onContinue={() => setScreen("audit")}
        />
      ) : null}
      {screen === "audit" ? (
        <AuditScreen
          lang={lang}
          baselineReady={baselinePhase === "ready"}
          status={auditStatus}
          step={auditStep}
          onRun={runAudit}
          onBack={() => setScreen("baseline")}
          onFindings={() => setScreen("findings")}
        />
      ) : null}
      {screen === "findings" ? (
        <FindingsScreen
          lang={lang}
          auditDone={auditStatus === "done"}
          onShowLine={showLine}
          onBack={() => setScreen("audit")}
        />
      ) : null}
    </Frame>
  );
}
