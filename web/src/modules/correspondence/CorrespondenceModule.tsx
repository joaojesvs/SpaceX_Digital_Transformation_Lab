import "./correspondence.css";

type Locale = "en" | "pt";

const reviewOrder = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

const copy = {
  en: {
    title: "Sample mail",
    lede: "Fictional notes for Lumen-1. This is not a live mailbox.",
    sample: "Sample",
    scrub: "Scrub",
    phase: "Phase",
    next: "Next phase",
    action: "Action",
    phaseValue: "PDR",
    nextValue: "CDR",
    actionValue: "Close the missing MTF verification on REQ-IMG-03.",
  },
  pt: {
    title: "Correio de amostra",
    lede: "Notas fictícias do Lumen-1. Isto não é uma caixa de correio ativa.",
    sample: "Amostra",
    scrub: "Scrub",
    phase: "Fase",
    next: "Fase seguinte",
    action: "Ação",
    phaseValue: "PDR",
    nextValue: "CDR",
    actionValue: "Fechar a verificação de MTF em falta no REQ-IMG-03.",
  },
} as const;

const notes = {
  en: {
    systemsDesk: "Systems desk",
    systemsSubject: "Review order for Lumen-1",
    systemsBody:
      "Lumen-1 is in PDR. The review order is MCR, SRR, MDR, SDR, PDR, CDR, PRR, TRR, SAR, ORR, FRR.",
    opticalDesk: "Optical desk",
    opticalSubject: "MTF row still empty",
    opticalBody:
      "REQ-IMG-03 asks for an on-orbit modulation transfer of at least 0.15 at Nyquist. No verification method is named. This sample does not close the row.",
    aitDesk: "AIT desk",
    aitSubject: "Bench functional stays planned",
    aitBody:
      "TP-L1-DET is still only a plan: detector and controller, room temperature. It is not a method for optical MTF.",
  },
  pt: {
    systemsDesk: "Mesa de sistemas",
    systemsSubject: "Ordem de revisão do Lumen-1",
    systemsBody:
      "O Lumen-1 está na PDR. A ordem de revisão é MCR, SRR, MDR, SDR, PDR, CDR, PRR, TRR, SAR, ORR, FRR.",
    opticalDesk: "Mesa ótica",
    opticalSubject: "A linha de MTF continua vazia",
    opticalBody:
      "O REQ-IMG-03 pede uma transferência de modulação em órbita de pelo menos 0,15 em Nyquist. Não há método de verificação. Esta amostra não fecha a linha.",
    aitDesk: "Mesa de AIT",
    aitSubject: "O funcional de banco continua planeado",
    aitBody:
      "O TP-L1-DET ainda é só um plano: detetor e controlador, à temperatura ambiente. Não é um método para a MTF ótica.",
  },
} as const;

export function CorrespondenceModule({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const note = notes[locale];

  return (
    <section className="mail-panel" lang={locale} aria-label={text.title}>
      <header className="mail-head">
        <p className="mail-kicker">Lumen-1</p>
        <h1>{text.title}</h1>
        <p className="mail-lede">{text.lede}</p>
      </header>
      <div className="mail-list">
        <article className="mail-card">
          <div className="mail-card-top">
            <p className="mail-desk">{note.systemsDesk}</p>
            <p className="mail-sample">{text.sample}</p>
          </div>
          <h2>{note.systemsSubject}</h2>
          <p className="mail-body">{note.systemsBody}</p>
          <ol className="mail-order" aria-label={note.systemsSubject}>
            {reviewOrder.map((phase) => (
              <li
                key={phase}
                className={phase === "PDR" ? "is-current" : undefined}
                aria-current={phase === "PDR" ? "step" : undefined}
              >
                {phase}
              </li>
            ))}
          </ol>
          <aside className="mail-scrub" aria-label={text.scrub}>
            <h3>{text.scrub}</h3>
            <dl>
              <div>
                <dt>{text.phase}</dt>
                <dd>{text.phaseValue}</dd>
              </div>
              <div>
                <dt>{text.next}</dt>
                <dd>{text.nextValue}</dd>
              </div>
              <div>
                <dt>{text.action}</dt>
                <dd>{text.actionValue}</dd>
              </div>
            </dl>
          </aside>
        </article>
        <article className="mail-card">
          <div className="mail-card-top">
            <p className="mail-desk">{note.opticalDesk}</p>
            <p className="mail-sample">{text.sample}</p>
          </div>
          <h2>{note.opticalSubject}</h2>
          <p className="mail-body">{note.opticalBody}</p>
        </article>
        <article className="mail-card">
          <div className="mail-card-top">
            <p className="mail-desk">{note.aitDesk}</p>
            <p className="mail-sample">{text.sample}</p>
          </div>
          <h2>{note.aitSubject}</h2>
          <p className="mail-body">{note.aitBody}</p>
        </article>
      </div>
    </section>
  );
}
