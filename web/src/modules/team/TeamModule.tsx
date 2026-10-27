import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import portraitAit from "../../assets/team/portrait-ait.jpg";
import portraitOpt from "../../assets/team/portrait-opt.jpg";
import portraitPa from "../../assets/team/portrait-pa.jpg";
import portraitSys from "../../assets/team/portrait-sys.jpg";

type Locale = "en" | "pt";

const seats = [
  {
    id: "SYS",
    image: portraitSys,
    en: "Systems lead",
    pt: "Responsável de sistemas",
    enLine: "Holds Lumen-1 at PDR.",
    ptLine: "Tem o Lumen-1 na PDR.",
    enDuty: "Holds the Lumen-1 review at PDR and the path to CDR.",
    ptDuty: "Tem a revisão do Lumen-1 na PDR e o caminho até à CDR.",
    enLog: "CDR is in 8 weeks, on 21 Dec 2026.",
    ptLog: "A CDR é em 8 semanas, a 21 dez 2026.",
    enTopic: "Open review",
    ptTopic: "Revisão aberta",
  },
  {
    id: "OPT",
    image: portraitOpt,
    en: "Optical engineer",
    pt: "Engenheiro ótico",
    enLine: "Owns REQ-IMG-03. The method is still missing.",
    ptLine: "Tem o REQ-IMG-03. O método ainda falta.",
    enDuty: "Owns REQ-IMG-03. The verification method is still missing.",
    ptDuty: "Tem o REQ-IMG-03. O método de verificação ainda falta.",
    enLog: "No procedure is on the register.",
    ptLog: "Não há procedimento no registo.",
    enTopic: "Open image requirement",
    ptTopic: "Requisito de imagem aberto",
  },
  {
    id: "AIT",
    image: portraitAit,
    en: "AIT engineer",
    pt: "Engenheiro de AIT",
    enLine: "The bench does not close optical MTF.",
    ptLine: "A bancada não fecha a MTF ótica.",
    enDuty: "Holds the bench. It does not close optical MTF.",
    ptDuty: "Tem a bancada. Ela não fecha a MTF ótica.",
    enLog: "The procedure is still missing.",
    ptLog: "O procedimento ainda falta.",
    enTopic: "Missing procedure",
    ptTopic: "Procedimento em falta",
  },
  {
    id: "PA",
    image: portraitPa,
    en: "Product assurance",
    pt: "Garantia do produto",
    enLine: "Watches the open gaps. F-04 stays in dispute.",
    ptLine: "Acompanha as falhas abertas. A F-04 fica em disputa.",
    enDuty: "Watches the open gaps. F-04 stays in dispute.",
    ptDuty: "Acompanha as falhas abertas. A F-04 fica em disputa.",
    enLog: "The close is an FMEA, not a second camera.",
    ptLog: "O fecho é uma FMEA, não uma segunda câmara.",
    enTopic: "Open dispute",
    ptTopic: "Disputa aberta",
  },
] as const;

const labels = {
  en: { duty: "What they do", log: "Last log", chat: "Astrea chat", with: "With", when: "When", topic: "Topic", mark: "Mark", recent: "This week", fictional: "Fictional" },
  pt: { duty: "O que faz", log: "Último registo", chat: "Conversa Astrea", with: "Com", when: "Quando", topic: "Tema", mark: "Marca", recent: "Esta semana", fictional: "Fictício" },
} as const;

export function TeamModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const text = labels[locale];
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="crew-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <div className="crew-grid">
        {seats.map((seat, index) => {
          const on = open === seat.id;
          return (
            <motion.button
              key={seat.id}
              type="button"
              className={on ? "crew-card is-open" : "crew-card"}
              aria-expanded={on}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : index * 0.07, duration: 0.4 }}
              onClick={() => setOpen(on ? null : seat.id)}
            >
              <img src={seat.image} alt="" />
              <p className="crew-role">{seat[locale]}</p>
              <p className="crew-line">{locale === "pt" ? seat.ptLine : seat.enLine}</p>
              <span className="crew-flag">{text.fictional}</span>
              <AnimatePresence initial={false}>
                {on ? (
                  <motion.div
                    key="more"
                    className="crew-more"
                    initial={reduced ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: reduced ? 0 : 0.25 }}
                  >
                    <div>
                      <h3>{text.duty}</h3>
                      <p>{locale === "pt" ? seat.ptDuty : seat.enDuty}</p>
                    </div>
                    <div>
                      <h3>{text.log}</h3>
                      <p>{locale === "pt" ? seat.ptLog : seat.enLog}</p>
                    </div>
                    <div>
                      <h3>{text.chat}</h3>
                      <dl className="crew-meta">
                        <div><dt>{text.with}</dt><dd>Astrea</dd></div>
                        <div><dt>{text.when}</dt><dd>{text.recent}</dd></div>
                        <div><dt>{text.topic}</dt><dd>{locale === "pt" ? seat.ptTopic : seat.enTopic}</dd></div>
                        <div><dt>{text.mark}</dt><dd>{text.fictional}</dd></div>
                      </dl>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
