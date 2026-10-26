import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CdrPack, cdrLine } from "../cdr/CdrPack";
import { AheadPack, gateLine } from "./AheadPack";
import { TrrPack } from "./TrrPack";
import { openAgreed } from "../../platform/cdr";
import { useSession } from "../../platform/session";

type Locale = "en" | "pt";
type Code = "MCR" | "SRR" | "MDR" | "SDR" | "PDR" | "CDR" | "PRR" | "TRR" | "SAR" | "ORR" | "FRR";

const order: Code[] = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"];

const names: Record<Locale, Record<Code, string>> = {
  en: {
    MCR: "Mission concept",
    SRR: "System requirements",
    MDR: "Mission definition",
    SDR: "System design",
    PDR: "Preliminary design",
    CDR: "Critical design",
    PRR: "Production readiness",
    TRR: "Test readiness",
    SAR: "System acceptance",
    ORR: "Operational readiness",
    FRR: "Flight readiness",
  },
  pt: {
    MCR: "Conceito de missão",
    SRR: "Requisitos de sistema",
    MDR: "Definição de missão",
    SDR: "Projeto de sistema",
    PDR: "Projeto preliminar",
    CDR: "Projeto crítico",
    PRR: "Prontidão de produção",
    TRR: "Prontidão de ensaio",
    SAR: "Aceitação do sistema",
    ORR: "Prontidão operacional",
    FRR: "Prontidão de voo",
  },
};

function stateOf(code: Code) {
  if (code === "PDR") return "now";
  if (code === "CDR") return "next";
  return order.indexOf(code) < order.indexOf("PDR") ? "earlier" : "ahead";
}

const when: Record<Locale, Record<string, string>> = {
  en: { earlier: "Earlier", now: "Now", next: "Next · 8 weeks", ahead: "Ahead" },
  pt: { earlier: "Anterior", now: "Agora", next: "Seguinte · 8 semanas", ahead: "À frente" },
};

const lines: Record<Locale, Partial<Record<Code, string>>> = {
  en: {
    PDR: "Lumen-1 is here. It has not left PDR.",
    PRR: gateLine("en", "PRR"),
    TRR: "15 Mar 2027. Ahead. No test levels are opened.",
    SAR: gateLine("en", "SAR"),
    ORR: gateLine("en", "ORR"),
    FRR: gateLine("en", "FRR"),
  },
  pt: {
    PDR: "O Lumen-1 está aqui. Não saiu da PDR.",
    PRR: gateLine("pt", "PRR"),
    TRR: "15 mar 2027. À frente. Nenhum nível de ensaio está aberto.",
    SAR: gateLine("pt", "SAR"),
    ORR: gateLine("pt", "ORR"),
    FRR: gateLine("pt", "FRR"),
  },
};

export function PhaseModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const { accepted } = useSession();
  const [selected, setSelected] = useState<Code>("PDR");
  const state = stateOf(selected);
  const line = selected === "CDR"
    ? cdrLine(locale, openAgreed(accepted))
    : lines[locale][selected] ?? (locale === "pt" ? "Anterior à PDR. O Lumen-1 não saiu da PDR." : "Earlier than PDR. Lumen-1 has not left PDR.");

  return (
    <section className="phase-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <div className="phase-strip" role="list">
        {order.map((code) => {
          const gate = stateOf(code);
          const on = selected === code;
          return (
            <button key={code} type="button" role="listitem" className={`phase-card is-${gate}${on ? " is-on" : ""}`} aria-pressed={on} onClick={() => setSelected(code)}>
              {gate === "now" && !reduced ? <span className="phase-pulse" aria-hidden="true" /> : null}
              <span className="phase-code">{code}</span>
              <span className="phase-name">{names[locale][code]}</span>
              <span className="phase-when">{when[locale][gate]}</span>
            </button>
          );
        })}
      </div>
      <motion.article key={selected} className={`phase-panel is-${state}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }}>
        <p className="phase-kicker">{when[locale][state]}</p>
        <h2>{selected}</h2>
        <p>{names[locale][selected]}</p>
        <p className="phase-line">{line}</p>
        {selected === "CDR" ? <CdrPack locale={locale} /> : null}
        {selected === "TRR" ? <TrrPack locale={locale} /> : null}
        {selected === "PRR" || selected === "SAR" || selected === "ORR" || selected === "FRR" ? <AheadPack locale={locale} code={selected} /> : null}
      </motion.article>
    </section>
  );
}
