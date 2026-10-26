import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Locale = "en" | "pt";

const threads = [
  {
    id: "F-01",
    en: "Optical MTF method still open",
    pt: "O método de MTF ótica continua em aberto",
    enLines: [
      "Sample note. This is not the review mail.",
      "REQ-IMG-03, optical MTF, still has no verification method.",
      "Close it by naming the method on that row.",
    ],
    ptLines: [
      "Nota de amostra. Não é o correio da revisão.",
      "O REQ-IMG-03, MTF ótica, continua sem método de verificação.",
      "Fecha-se nomeando o método nessa linha.",
    ],
  },
  {
    id: "F-02",
    en: "Contamination and outgassing still open",
    pt: "Contaminação e desgaseificação continuam em aberto",
    enLines: [
      "Sample note. This is not the review mail.",
      "The optic still has no contamination or outgassing control.",
      "The cleanliness programme and the outgassing check are still missing.",
    ],
    ptLines: [
      "Nota de amostra. Não é o correio da revisão.",
      "A ótica continua sem controlo de contaminação ou de desgaseificação.",
      "O programa de limpeza e a avaliação de desgaseificação ainda faltam.",
    ],
  },
  {
    id: "F-03",
    en: "Rideshare qualification still open",
    pt: "A qualificação do rideshare continua em aberto",
    enLines: [
      "Sample note. This is not the review mail.",
      "Qualification against the rideshare mechanical environment is still open.",
      "No load number. The guide is not opened.",
    ],
    ptLines: [
      "Nota de amostra. Não é o correio da revisão.",
      "A qualificação face ao ambiente mecânico do rideshare continua em aberto.",
      "Sem fator de carga. O guia não está aberto.",
    ],
  },
] as const;

export function CorrespondenceModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const [selected, setSelected] = useState<(typeof threads)[number]["id"]>("F-01");
  const thread = threads.find((item) => item.id === selected) ?? threads[0];
  const sample = locale === "pt" ? "Amostra" : "Sample";
  const lines = locale === "pt" ? thread.ptLines : thread.enLines;

  return (
    <section className="mail-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <ul className="mail-list">
        {threads.map((item) => (
          <li key={item.id}>
            <button type="button" className={item.id === selected ? "is-on" : undefined} aria-pressed={item.id === selected} onClick={() => setSelected(item.id)}>
              <span>{item.id}</span>
              <strong>{item[locale]}</strong>
              <em>{sample}</em>
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence mode="wait">
        <motion.article
          key={thread.id}
          className="mail-read"
          initial={reduced ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
        >
          <p className="mail-flag">{sample}</p>
          <h2>{thread[locale]}</h2>
          <p className="mail-meta">{thread.id} · 26 Oct 2026 · {sample}</p>
          {lines.map((line) => <p key={line}>{line}</p>)}
        </motion.article>
      </AnimatePresence>
    </section>
  );
}
