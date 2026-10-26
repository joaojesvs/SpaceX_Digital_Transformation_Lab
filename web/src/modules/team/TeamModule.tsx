import { motion, useReducedMotion } from "framer-motion";
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
  },
  {
    id: "OPT",
    image: portraitOpt,
    en: "Optical engineer",
    pt: "Engenheiro ótico",
    enLine: "Owns REQ-IMG-03. The method is still missing.",
    ptLine: "Tem o REQ-IMG-03. O método ainda falta.",
  },
  {
    id: "AIT",
    image: portraitAit,
    en: "AIT engineer",
    pt: "Engenheiro de AIT",
    enLine: "The bench does not close optical MTF.",
    ptLine: "A bancada não fecha a MTF ótica.",
  },
  {
    id: "PA",
    image: portraitPa,
    en: "Product assurance",
    pt: "Garantia do produto",
    enLine: "Watches the open gaps. F-04 stays in dispute.",
    ptLine: "Acompanha as falhas abertas. A F-04 fica em disputa.",
  },
] as const;

export function TeamModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const fictional = locale === "pt" ? "Fictício" : "Fictional";

  return (
    <section className="crew-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <div className="crew-grid">
        {seats.map((seat, index) => (
          <motion.article
            key={seat.id}
            className="crew-card"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : index * 0.07, duration: 0.4 }}
          >
            <img src={seat.image} alt="" />
            <p className="crew-role">{seat[locale]}</p>
            <p className="crew-line">{locale === "pt" ? seat.ptLine : seat.enLine}</p>
            <span>{fictional}</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
