import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Locale = "en" | "pt";

const rows = {
  en: [
    { id: "F-01", title: "Missing verification method for REQ-IMG-03 (optical MTF).", status: "Agreed · critical", clause: "ECSS-E-ST-10-02C Rev.1 5.2.1e · ECSS-E-ST-10C Rev.1 5.2.3.4a", tone: "agreed" },
    { id: "F-02", title: "Missing contamination and outgassing control on the optic.", status: "Agreed · critical", clause: "ECSS-Q-ST-70C Rev.2 4.4a", tone: "agreed" },
    { id: "F-03", title: "Missing qualification against the rideshare mechanical environment.", status: "Agreed · critical", clause: "ECSS-E-ST-10-03C Rev.1 4.5.2a", tone: "agreed" },
    { id: "F-04", title: "Reliability asserted with no FMEA.", status: "In dispute", clause: "ECSS-Q-ST-30C Rev.1 6.4.2.2a", tone: "dispute" },
    { id: "ISO", title: "ISO", status: "Not opened · Not a pass", clause: "", tone: "wait" },
    { id: "Rideshare", title: "SpaceX Rideshare Payload User's Guide", status: "Not opened · Not a pass", clause: "", tone: "wait" },
  ],
  pt: [
    { id: "F-01", title: "Método de verificação em falta no REQ-IMG-03 (MTF ótica).", status: "Acordado · crítico", clause: "ECSS-E-ST-10-02C Rev.1 5.2.1e · ECSS-E-ST-10C Rev.1 5.2.3.4a", tone: "agreed" },
    { id: "F-02", title: "Controlo de contaminação e desgaseificação em falta na ótica.", status: "Acordado · crítico", clause: "ECSS-Q-ST-70C Rev.2 4.4a", tone: "agreed" },
    { id: "F-03", title: "Qualificação em falta face ao ambiente mecânico do rideshare.", status: "Acordado · crítico", clause: "ECSS-E-ST-10-03C Rev.1 4.5.2a", tone: "agreed" },
    { id: "F-04", title: "Fiabilidade afirmada sem FMEA.", status: "Em disputa", clause: "ECSS-Q-ST-30C Rev.1 6.4.2.2a", tone: "dispute" },
    { id: "ISO", title: "ISO", status: "Não aberto · Não é uma aprovação", clause: "", tone: "wait" },
    { id: "Rideshare", title: "Guia do utilizador de carga útil Rideshare da SpaceX", status: "Não aberto · Não é uma aprovação", clause: "", tone: "wait" },
  ],
} as const;

const board = {
  en: [
    { n: 3, label: "Contradicted", hint: "Agreed gaps" },
    { n: 0, label: "In order", hint: "Opened and clear" },
    { n: 2, label: "Not opened", hint: "ISO and the guide" },
    { n: 1, label: "In dispute", hint: "F-04" },
  ],
  pt: [
    { n: 3, label: "Contraditados", hint: "Falhas em acordo" },
    { n: 0, label: "Em ordem", hint: "Aberto e limpo" },
    { n: 2, label: "Não abertos", hint: "ISO e o guia" },
    { n: 1, label: "Em disputa", hint: "F-04" },
  ],
} as const;

const detail = {
  en: {
    back: "Back",
    more: "See more",
    fail: "Where it fails",
    close: "How to close it",
    note: "Improvement",
    cards: [
      { id: "F-01", tone: "agreed", state: "Agreed", fail: "REQ-IMG-03, optical MTF, has no verification method.", close: "Name the method on that row.", note: "The image chain cannot close while the row is empty." },
      { id: "F-02", tone: "agreed", state: "Agreed", fail: "The optic has no contamination or outgassing control.", close: "Add the cleanliness programme and an outgassing check.", note: "A film on this optic lowers the modulation." },
      { id: "F-03", tone: "agreed", state: "Agreed", fail: "No qualification against the rideshare mechanical environment.", close: "Plan the qualification. Fill levels when the guide is opened.", note: "No load number. The guide is not opened." },
      { id: "F-04", tone: "dispute", state: "In dispute", fail: "Reliability is asserted. There is no FMEA.", close: "The clause requires the analysis, not a second camera.", note: "This row stays in dispute. A person decides." },
    ],
    closed: [
      { id: "ISO", text: "Not opened. Not a pass. No clause is named." },
      { id: "Guide", text: "The rideshare guide is not opened. No section and no load." },
    ],
  },
  pt: {
    back: "Voltar",
    more: "Ver mais",
    fail: "Onde falha",
    close: "Como fechar",
    note: "Melhoria",
    cards: [
      { id: "F-01", tone: "agreed", state: "Acordado", fail: "O REQ-IMG-03, MTF ótica, não tem método de verificação.", close: "Nomear o método nessa linha.", note: "A cadeia de imagem não fecha com a linha vazia." },
      { id: "F-02", tone: "agreed", state: "Acordado", fail: "A ótica não tem controlo de contaminação nem de desgaseificação.", close: "Acrescentar o programa de limpeza e a avaliação de desgaseificação.", note: "Uma película nesta ótica baixa a modulação." },
      { id: "F-03", tone: "agreed", state: "Acordado", fail: "Não há qualificação face ao ambiente mecânico do rideshare.", close: "Planear a qualificação. Os níveis ficam para quando o guia abrir.", note: "Sem fator de carga. O guia não está aberto." },
      { id: "F-04", tone: "dispute", state: "Em disputa", fail: "A fiabilidade é afirmada. Não há FMEA.", close: "A cláusula exige a análise, não uma segunda câmara.", note: "Esta linha fica em disputa. Uma pessoa decide." },
    ],
    closed: [
      { id: "ISO", text: "Não aberto. Não é uma aprovação. Nenhuma cláusula é nomeada." },
      { id: "Guia", text: "O guia de rideshare não está aberto. Sem secção e sem carga." },
    ],
  },
} as const;

export function ComplianceModule({ locale }: { locale: Locale }) {
  const reduced = useReducedMotion() === true;
  const [more, setMore] = useState(false);
  const text = detail[locale];

  return (
    <section className="comp-screen screen-pad" lang={locale === "pt" ? "pt-PT" : "en"}>
      <AnimatePresence mode="wait">
        {more ? (
          <motion.div key="more" className="comp-detail" initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <button type="button" className="comp-back" onClick={() => setMore(false)}>{text.back}</button>
            <div className="comp-cards">
              {text.cards.map((card) => (
                <article key={card.id} className={`comp-card is-${card.tone}`}>
                  <header><span>{card.id}</span><em>{card.state}</em></header>
                  <p><strong>{text.fail}</strong>{card.fail}</p>
                  <p><strong>{text.close}</strong>{card.close}</p>
                  <p><strong>{text.note}</strong>{card.note}</p>
                </article>
              ))}
            </div>
            <ul className="comp-closed">
              {text.closed.map((item) => (
                <li key={item.id}><span>{item.id}</span>{item.text}</li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div key="board" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div className="comp-board">
              {board[locale].map((item, index) => (
                <motion.article key={item.label} className={index === 3 ? "comp-stat is-dispute" : "comp-stat"} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : index * 0.06 }}>
                  <strong>{item.n}</strong>
                  <span>{item.label}</span>
                  <em>{item.hint}</em>
                </motion.article>
              ))}
            </div>
            <div className="comp-toolbar">
              <button type="button" className="comp-more" onClick={() => setMore(true)}>{text.more}</button>
            </div>
            <ul className="scan-list">
              {rows[locale].map((row) => (
                <li key={row.id} className="scan-row">
                  <span className="scan-id">{row.id}</span>
                  <span className="scan-title">{row.title}</span>
                  <span className={row.tone === "dispute" ? "scan-status is-dispute" : row.tone === "agreed" ? "scan-status is-agreed" : "scan-status"}>{row.status}</span>
                  <span className="scan-clause">{row.clause}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
