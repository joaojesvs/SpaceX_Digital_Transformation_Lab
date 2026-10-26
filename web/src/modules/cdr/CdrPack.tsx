import { motion, useReducedMotion } from "framer-motion";
import { agreedIds, type AgreedId } from "../../platform/cdr";
import { useSession } from "../../platform/session";

type Locale = "en" | "pt";

const actions: Record<Locale, Record<AgreedId, string>> = {
  en: {
    "F-01": "Add a verification method for REQ-IMG-03 optical MTF.",
    "F-02": "Add contamination and outgassing control on the optic.",
    "F-03": "Add qualification against the rideshare mechanical environment.",
  },
  pt: {
    "F-01": "Acrescentar um método de verificação ao REQ-IMG-03, MTF ótica.",
    "F-02": "Acrescentar o controlo de contaminação e desgaseificação na ótica.",
    "F-03": "Acrescentar a qualificação face ao ambiente mecânico do rideshare.",
  },
};

const copy = {
  en: {
    kicker: "CDR · 21 Dec 2026",
    open: "Open",
    accepted: "Accepted",
    accept: "Accept",
    leave: "Leave open",
    dispute: "In dispute",
    f04: "The close is an FMEA, not a second camera.",
    locked: "No accept control",
  },
  pt: {
    kicker: "CDR · 21 dez 2026",
    open: "Em aberto",
    accepted: "Aceite",
    accept: "Aceitar",
    leave: "Deixar aberto",
    dispute: "Em disputa",
    f04: "O fecho é uma FMEA, não uma segunda câmara.",
    locked: "Sem controlo de aceitação",
  },
} as const;

export function AcceptControl({ id, locale }: { id: AgreedId; locale: Locale }) {
  const { accepted, setAccepted } = useSession();
  const on = accepted[id];
  const text = copy[locale];
  return (
    <button
      type="button"
      className={on ? "cdr-accept is-on" : "cdr-accept"}
      aria-pressed={on}
      onClick={() => setAccepted(id, !on)}
    >
      {on ? text.leave : text.accept}
    </button>
  );
}

export function CdrPack({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const { accepted } = useSession();
  const text = copy[locale];

  return (
    <div className="cdr-pack">
      <p className="screen-kicker">{text.kicker}</p>
      <ul>
        {agreedIds.map((id, index) => {
          const on = accepted[id];
          return (
            <motion.li
              key={id}
              className={on ? "is-accepted" : "is-open"}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : index * 0.05, duration: 0.28 }}
            >
              <span className="cdr-id">{id}</span>
              <span className="cdr-title">{actions[locale][id]}</span>
              <em className="cdr-state">{on ? text.accepted : text.open}</em>
              <AcceptControl id={id} locale={locale} />
            </motion.li>
          );
        })}
        <li className="is-dispute">
          <span className="cdr-id">F-04</span>
          <span className="cdr-title">{text.f04}</span>
          <em className="cdr-state">{text.dispute}</em>
          <span className="cdr-locked">{text.locked}</span>
        </li>
      </ul>
    </div>
  );
}

export function cdrLine(locale: Locale, open: number) {
  if (locale === "pt") {
    if (open === 3) return "Seguinte, a 21 dez 2026. Três ações em acordo continuam abertas. A F-04 fica em disputa.";
    if (open === 0) return "Seguinte, a 21 dez 2026. As três ações em acordo estão aceites. A F-04 fica em disputa. A CDR não fecha.";
    const noun = open === 1 ? "ação em acordo continua aberta" : "ações em acordo continuam abertas";
    return `Seguinte, a 21 dez 2026. ${open} ${noun}. A F-04 fica em disputa.`;
  }
  if (open === 3) return "Next, on 21 Dec 2026. Three agreed actions are still open. F-04 stays in dispute.";
  if (open === 0) return "Next, on 21 Dec 2026. The three agreed actions are accepted. F-04 stays in dispute. CDR is not closed.";
  const noun = open === 1 ? "agreed action is still open" : "agreed actions are still open";
  return `Next, on 21 Dec 2026. ${open} ${noun}. F-04 stays in dispute.`;
}
