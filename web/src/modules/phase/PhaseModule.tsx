import { useState } from "react";
import "./phase.css";

const GATE_ORDER = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

type GateCode = (typeof GATE_ORDER)[number];
type GateState = "earlier" | "now" | "next" | "later";
type FutureCode = "CDR" | "PRR" | "TRR" | "SAR" | "ORR" | "FRR";
type Locale = "en" | "pt";

type PackRow = {
  id: string;
  title: string;
  status: string;
  tone?: "dispute";
};

const FUTURE: FutureCode[] = ["CDR", "PRR", "TRR", "SAR", "ORR", "FRR"];

function gateState(code: GateCode): GateState {
  if (code === "PDR") return "now";
  if (code === "CDR") return "next";
  return GATE_ORDER.indexOf(code) < GATE_ORDER.indexOf("PDR") ? "earlier" : "later";
}

function isFuture(code: GateCode): code is FutureCode {
  return (FUTURE as readonly string[]).includes(code);
}

const names: Record<Locale, Record<GateCode, string>> = {
  en: {
    MCR: "Mission concept review",
    SRR: "System requirements review",
    MDR: "Mission definition review",
    SDR: "System design review",
    PDR: "Preliminary design review",
    CDR: "Critical design review",
    PRR: "Production readiness review",
    TRR: "Test readiness review",
    SAR: "System acceptance review",
    ORR: "Operational readiness review",
    FRR: "Flight readiness review",
  },
  pt: {
    MCR: "Revisão do conceito de missão",
    SRR: "Revisão dos requisitos de sistema",
    MDR: "Revisão da definição de missão",
    SDR: "Revisão do projeto de sistema",
    PDR: "Revisão preliminar de projeto",
    CDR: "Revisão crítica de projeto",
    PRR: "Revisão de prontidão de produção",
    TRR: "Revisão de prontidão de ensaio",
    SAR: "Revisão de aceitação do sistema",
    ORR: "Revisão de prontidão operacional",
    FRR: "Revisão de prontidão de voo",
  },
};

const states: Record<Locale, Record<GateState, string>> = {
  en: { earlier: "Earlier", now: "Now", next: "Next", later: "Later" },
  pt: { earlier: "Anterior", now: "Agora", next: "Seguinte", later: "Depois" },
};

const forward: Record<Locale, Record<Exclude<FutureCode, "CDR">, string>> = {
  en: {
    PRR: "Ahead",
    TRR: "In 20 weeks",
    SAR: "Ahead",
    ORR: "Ahead",
    FRR: "In 36 weeks",
  },
  pt: {
    PRR: "À frente",
    TRR: "Em 20 semanas",
    SAR: "À frente",
    ORR: "À frente",
    FRR: "Em 36 semanas",
  },
};

const labels: Record<Locale, { title: string; open: string; dispute: string; closed: string; weeks8: string }> = {
  en: {
    title: "Phase",
    open: "Open",
    dispute: "In dispute",
    closed: "Not opened",
    weeks8: "In 8 weeks",
  },
  pt: {
    title: "Fase",
    open: "Em aberto",
    dispute: "Em disputa",
    closed: "Não aberto",
    weeks8: "Em 8 semanas",
  },
};

function railStatus(locale: Locale, code: GateCode): string {
  if (code === "CDR") return states[locale].next;
  if (isFuture(code)) return forward[locale][code];
  return states[locale][gateState(code)];
}

function packRows(locale: Locale, code: FutureCode): PackRow[] {
  const text = labels[locale];
  if (code === "CDR") {
    const en = locale === "en";
    return [
      { id: "CDR", title: text.weeks8, status: states[locale].next },
      {
        id: "F-01",
        title: en
          ? "Add a verification method for REQ-IMG-03, optical MTF"
          : "Acrescentar um método de verificação ao REQ-IMG-03, MTF ótica",
        status: text.open,
      },
      {
        id: "F-02",
        title: en
          ? "Add contamination and outgassing control on the optic"
          : "Acrescentar controlo de contaminação e desgaseificação na ótica",
        status: text.open,
      },
      {
        id: "F-03",
        title: en
          ? "Add qualification against the rideshare mechanical environment"
          : "Acrescentar qualificação face ao ambiente mecânico do rideshare",
        status: text.open,
      },
      {
        id: "F-04",
        title: en ? "Reliability asserted, no FMEA" : "Fiabilidade afirmada, sem FMEA",
        status: text.dispute,
        tone: "dispute",
      },
      {
        id: "F-04",
        title: en
          ? "The clause requires the analysis, not a second camera"
          : "A cláusula exige a análise, não uma segunda câmara",
        status: text.dispute,
        tone: "dispute",
      },
    ];
  }
  const evidence: Record<Exclude<FutureCode, "CDR">, Record<Locale, string>> = {
    PRR: { en: "Production evidence", pt: "Evidência de produção" },
    TRR: { en: "Test levels", pt: "Níveis de ensaio" },
    SAR: { en: "Acceptance evidence", pt: "Evidência de aceitação" },
    ORR: { en: "Operations evidence", pt: "Evidência de operações" },
    FRR: { en: "Flight-readiness evidence", pt: "Evidência de prontidão de voo" },
  };
  return [{ id: code, title: evidence[code][locale], status: text.closed }];
}

export function PhaseModule({ locale }: { locale: Locale }) {
  const text = labels[locale];
  const [selected, setSelected] = useState<FutureCode>("CDR");
  const rows = packRows(locale, selected);

  return (
    <section className="astraea-phase scan-page" lang={locale === "pt" ? "pt-PT" : "en"} aria-labelledby="astraea-phase-title">
      <h1 className="ap-title" id="astraea-phase-title">
        {text.title}
      </h1>
      <ul className="scan-list">
        {GATE_ORDER.map((code) => {
          const state = gateState(code);
          const future = isFuture(code);
          const on = future && selected === code;
          const className = `scan-row review is-${state}${on ? " is-selected" : ""}`;
          const status = railStatus(locale, code);
          if (!future) {
            return (
              <li key={code} className={className} aria-current={state === "now" ? "step" : undefined}>
                <span className="scan-id">{code}</span>
                <span className="scan-title">{names[locale][code]}</span>
                <span className="scan-status">{status}</span>
              </li>
            );
          }
          return (
            <li key={code} className="scan-choice">
              <button
                type="button"
                className={className}
                aria-pressed={on}
                aria-controls="phase-pack"
                onClick={() => setSelected(code)}
              >
                <span className="scan-id">{code}</span>
                <span className="scan-title">{names[locale][code]}</span>
                <span className="scan-status">{status}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="scan-list phase-pack" id="phase-pack" aria-label={names[locale][selected]}>
        {rows.map((row, index) => (
          <li key={`${row.id}-${index}`} className="scan-row review">
            <span className="scan-id">{row.id}</span>
            <span className="scan-title">{row.title}</span>
            <span className={row.tone === "dispute" ? "scan-status is-dispute" : "scan-status"}>{row.status}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
