import { motion, useReducedMotion } from "framer-motion";
import { agreedIds, type AgreedId } from "../../platform/cdr";
import { useSession } from "../../platform/session";

type Locale = "en" | "pt";
type Gate = "PRR" | "SAR" | "ORR" | "FRR";

const lines: Record<Locale, Record<Gate, string>> = {
  en: {
    PRR: "Production readiness is ahead. No production evidence is opened.",
    SAR: "Acceptance is ahead. No acceptance evidence is opened.",
    ORR: "Operations readiness is ahead. No operations evidence is opened.",
    FRR: "5 Jul 2027. Still ahead. Flight readiness is not opened.",
  },
  pt: {
    PRR: "A prontidão de produção está à frente. Nenhuma evidência de produção está aberta.",
    SAR: "A aceitação está à frente. Nenhuma evidência de aceitação está aberta.",
    ORR: "A prontidão operacional está à frente. Nenhuma evidência de operações está aberta.",
    FRR: "5 jul 2027. Continua à frente. A prontidão de voo não está aberta.",
  },
};

const actions: Record<Locale, Record<AgreedId, string>> = {
  en: {
    "F-01": "Optical MTF method",
    "F-02": "Optic contamination and outgassing",
    "F-03": "Rideshare mechanical qualification",
  },
  pt: {
    "F-01": "Método de MTF ótica",
    "F-02": "Contaminação e desgaseificação na ótica",
    "F-03": "Qualificação mecânica do rideshare",
  },
};

const copy = {
  en: { ahead: "Ahead", open: "Open", accepted: "Accepted", dispute: "In dispute", now: "Now", next: "Next · 21 Dec 2026", trr: "15 Mar 2027" },
  pt: { ahead: "À frente", open: "Em aberto", accepted: "Aceite", dispute: "Em disputa", now: "Agora", next: "Seguinte · 21 dez 2026", trr: "15 mar 2027" },
} as const;

export function gateLine(locale: Locale, code: Gate) {
  return lines[locale][code];
}

export function AheadPack({ locale, code }: { locale: Locale; code: Gate }) {
  const reduced = useReducedMotion() === true;
  const { accepted } = useSession();
  const text = copy[locale];
  const facts = code === "FRR"
    ? [
        { id: "PDR", title: locale === "pt" ? "O Lumen-1 está aqui." : "Lumen-1 is here.", state: text.now },
        { id: "CDR", title: locale === "pt" ? "Não fecha." : "Not closed.", state: text.next },
        ...agreedIds.map((id) => ({
          id,
          title: actions[locale][id],
          state: accepted[id] ? text.accepted : text.open,
        })),
        { id: "F-04", title: locale === "pt" ? "Fiabilidade, sem FMEA." : "Reliability, no FMEA.", state: text.dispute },
        { id: "TRR", title: locale === "pt" ? "À frente." : "Ahead.", state: text.trr },
      ]
    : [{ id: code, title: locale === "pt" ? "Não aberto." : "Not opened.", state: text.ahead }];

  return (
    <div className="cdr-pack ahead-pack">
      <p className="screen-kicker">{code === "FRR" ? (locale === "pt" ? "FRR · 5 jul 2027" : "FRR · 5 Jul 2027") : text.ahead}</p>
      <ul>
        {facts.map((fact, index) => (
          <motion.li
            key={fact.id}
            className={fact.id === "F-04" ? "is-dispute" : undefined}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : index * 0.04, duration: 0.28 }}
          >
            <span className="cdr-id">{fact.id}</span>
            <span className="cdr-title">{fact.title}</span>
            <em className="cdr-state">{fact.state}</em>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
