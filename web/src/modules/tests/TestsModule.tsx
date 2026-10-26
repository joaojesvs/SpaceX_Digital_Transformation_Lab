import { motion, useReducedMotion } from "framer-motion";
import { useSession } from "../../platform/session";

type Locale = "en" | "pt";

const gaps = [
  {
    id: "F-01",
    en: "Optical MTF",
    pt: "MTF ótica",
    req: { en: "REQ-IMG-03", pt: "REQ-IMG-03" },
    enNote: "No procedure is opened. No test level.",
    ptNote: "Nenhum procedimento está aberto. Nenhum nível de ensaio.",
  },
  {
    id: "F-02",
    en: "Contamination and outgassing",
    pt: "Contaminação e desgaseificação",
    req: { en: "Optic", pt: "Ótica" },
    enNote: "No procedure is opened for the optic.",
    ptNote: "Nenhum procedimento está aberto para a ótica.",
  },
  {
    id: "F-03",
    en: "Rideshare mechanical qualification",
    pt: "Qualificação mecânica do rideshare",
    req: { en: "Not opened", pt: "Não aberto" },
    enNote: "No procedure is opened. No load number. The guide is not opened.",
    ptNote: "Nenhum procedimento está aberto. Sem fator de carga. O guia não está aberto.",
  },
] as const;

export function TestsModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const { testId, setTestId, accepted } = useSession();
  const missing = locale === "pt" ? "Em falta" : "Missing";
  const fromCdr = locale === "pt"
    ? "Ação da CDR aceite. O procedimento continua em falta."
    : "CDR action accepted. The procedure is still missing.";

  return (
    <section className="lab-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <div className="lab-grid">
        {gaps.map((gap, index) => {
          const on = testId === gap.id;
          return (
            <motion.button
              key={gap.id}
              type="button"
              className={on ? "lab-card is-on" : "lab-card"}
              aria-pressed={on}
              onClick={() => setTestId(gap.id)}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : index * 0.08, duration: 0.4 }}
            >
              <header>
                <span>{gap.id}</span>
                <em>{missing}</em>
              </header>
              <div className="lab-scope" aria-hidden="true">
                <span className="lab-beam" />
                <i />
                <i />
              </div>
              <h2>{gap[locale]}</h2>
              <p className="lab-req">{gap.req[locale]}</p>
              <p className="lab-note">{locale === "pt" ? gap.ptNote : gap.enNote}</p>
              {accepted[gap.id] ? <p className="lab-note">{fromCdr}</p> : null}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
