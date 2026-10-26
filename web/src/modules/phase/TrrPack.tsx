import { motion, useReducedMotion } from "framer-motion";
import { agreedIds, type AgreedId } from "../../platform/cdr";
import { useSession } from "../../platform/session";

type Locale = "en" | "pt";

const procedures: Record<Locale, Record<AgreedId, string>> = {
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
  en: { kicker: "TRR · 15 Mar 2027", missing: "Missing", accepted: "Accepted", tests: "Tests", leave: "Leave open" },
  pt: { kicker: "TRR · 15 mar 2027", missing: "Em falta", accepted: "Aceite", tests: "Ensaios", leave: "Deixar aberto" },
} as const;

export function TrrPack({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const { accepted, setAccepted, setTestId, setView } = useSession();
  const text = copy[locale];

  function openTest(id: AgreedId) {
    setTestId(id);
    setView("tests");
  }

  return (
    <div className="cdr-pack trr-pack">
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
              <button type="button" className="trr-jump" onClick={() => openTest(id)}>
                <span className="cdr-id">{id}</span>
                <span className="cdr-title">{procedures[locale][id]}</span>
                <em className="cdr-state">{on ? text.accepted : text.missing}</em>
                <span className="trr-go">{text.tests}</span>
              </button>
              {on ? (
                <button type="button" className="cdr-accept is-on" onClick={() => setAccepted(id, false)}>
                  {text.leave}
                </button>
              ) : null}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
