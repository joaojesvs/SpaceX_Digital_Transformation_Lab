import "./phase.css";

const GATE_ORDER = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

type GateCode = (typeof GATE_ORDER)[number];
type GateState = "earlier" | "now" | "next" | "later";

type PhaseCopy = {
  kicker: string;
  title: string;
  lede: string;
  note: string;
  order: string;
  states: Record<GateState, string>;
  names: Record<GateCode, string>;
  gloss: Record<GateCode, string>;
  pdrEyebrow: string;
  pdrTitle: string;
  pdrBody: string[];
  cdrEyebrow: string;
  cdrTitle: string;
  cdrBody: string[];
};

function gateState(code: GateCode): GateState {
  if (code === "PDR") return "now";
  if (code === "CDR") return "next";
  return GATE_ORDER.indexOf(code) < GATE_ORDER.indexOf("PDR") ? "earlier" : "later";
}

const copy: Record<"en" | "pt", PhaseCopy> = {
  en: {
    kicker: "Lumen-1",
    title: "Phase",
    lede: "NASA review order. Lumen-1 is in PDR. Next is CDR.",
    note: "Earlier reviews stay in the order below. This screen does not mark them passed.",
    order: "Review order",
    states: {
      earlier: "Earlier",
      now: "Now",
      next: "Next",
      later: "Later",
    },
    names: {
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
    gloss: {
      MCR: "Confirms the mission need and the concept for meeting it.",
      SRR: "Checks that the system requirements answer the mission objectives.",
      MDR: "Checks that the mission definition is complete, feasible, and within the resources.",
      SDR: "Checks that the system design and the requirement flow-down can proceed.",
      PDR: "Asks whether the preliminary design can proceed into detailed design.",
      CDR: "Asks whether the detailed design can be built, assembled, integrated, and tested.",
      PRR: "Asks whether the design and the plans are ready for production.",
      TRR: "Asks whether the article, facilities, procedures, and people are ready to test.",
      SAR: "Asks whether verification is complete enough to accept the system.",
      ORR: "Asks whether people, procedures, and facilities are ready to operate.",
      FRR: "Asks whether the system is ready for a safe flight.",
    },
    pdrEyebrow: "Now · Lumen-1",
    pdrTitle: "What PDR is asking",
    pdrBody: [
      "Preliminary design review asks whether the preliminary design meets the requirements with acceptable risk, whether the interfaces are identified, and whether each requirement has a verification method. That is the basis for starting detailed design.",
      "Lumen-1 is in this review. It is a 6U CubeSat optical camera on a Falcon 9 rideshare. Still open: the verification method for optical modulation transfer (REQ-IMG-03), contamination and outgassing control on the optic, qualification against the rideshare mechanical environment, and a reliability figure asserted with no FMEA. The project has not left PDR.",
    ],
    cdrEyebrow: "Next",
    cdrTitle: "What CDR is next",
    cdrBody: [
      "Critical design review is the next gate. It asks whether the detailed design is mature enough to fabricate, assemble, integrate, and test, and whether performance, cost, and schedule still close.",
      "Lumen-1 is not at CDR. Moving along this order is not a flight release. Production readiness, test readiness, system acceptance, operational readiness, and flight readiness all come after CDR.",
    ],
  },
  pt: {
    kicker: "Lumen-1",
    title: "Fase",
    lede: "Ordem de revisão da NASA. A Lumen-1 está na PDR. A seguinte é a CDR.",
    note: "As revisões anteriores ficam na ordem abaixo. Este ecrã não as marca como aprovadas.",
    order: "Ordem de revisão",
    states: {
      earlier: "Anterior",
      now: "Agora",
      next: "Seguinte",
      later: "Depois",
    },
    names: {
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
    gloss: {
      MCR: "Confirma a necessidade da missão e o conceito para a cumprir.",
      SRR: "Verifica se os requisitos de sistema respondem aos objetivos da missão.",
      MDR: "Verifica se a definição da missão está completa, é viável e cabe nos recursos.",
      SDR: "Verifica se o projeto de sistema e a repartição dos requisitos podem avançar.",
      PDR: "Pergunta se o projeto preliminar pode passar ao projeto de detalhe.",
      CDR: "Pergunta se o projeto de detalhe pode ser construído, montado, integrado e ensaiado.",
      PRR: "Pergunta se o projeto e os planos estão prontos para produção.",
      TRR: "Pergunta se o artigo, as instalações, os procedimentos e as pessoas estão prontos para ensaiar.",
      SAR: "Pergunta se a verificação chega para aceitar o sistema.",
      ORR: "Pergunta se pessoas, procedimentos e instalações estão prontos a operar.",
      FRR: "Pergunta se o sistema está pronto para um voo seguro.",
    },
    pdrEyebrow: "Agora · Lumen-1",
    pdrTitle: "O que a PDR está a pedir",
    pdrBody: [
      "A revisão preliminar de projeto pergunta se o projeto preliminar cumpre os requisitos com risco aceitável, se as interfaces estão identificadas e se cada requisito tem um método de verificação. Essa é a base para começar o projeto de detalhe.",
      "A Lumen-1 está nesta revisão. É uma câmara ótica num CubeSat 6U, em rideshare na Falcon 9. Continuam abertas: o método de verificação da transferência de modulação ótica (REQ-IMG-03), o controlo de contaminação e desgaseificação na ótica, a qualificação face ao ambiente mecânico do rideshare, e um valor de fiabilidade afirmado sem FMEA. O projeto não saiu da PDR.",
    ],
    cdrEyebrow: "Seguinte",
    cdrTitle: "O que a CDR pede a seguir",
    cdrBody: [
      "A revisão crítica de projeto é a revisão seguinte. Pergunta se o projeto de detalhe está maduro para fabricar, montar, integrar e ensaiar, e se o desempenho, o custo e o prazo ainda fecham.",
      "A Lumen-1 não está na CDR. Avançar nesta ordem não é uma autorização de voo. A prontidão de produção, a prontidão de ensaio, a aceitação do sistema, a prontidão operacional e a prontidão de voo vêm todas depois da CDR.",
    ],
  },
};

export function PhaseModule({ locale }: { locale: "en" | "pt" }) {
  const text = copy[locale];
  const htmlLang = locale === "pt" ? "pt-PT" : "en";

  return (
    <section className="astraea-phase scan-page" lang={htmlLang} aria-labelledby="astraea-phase-title">
      <h1 className="ap-title" id="astraea-phase-title">
        {text.title}
      </h1>
      <ul className="scan-list">
        {GATE_ORDER.map((code) => {
          const state = gateState(code);
          return (
            <li key={code} className={`scan-row review is-${state}`} aria-current={state === "now" ? "step" : undefined}>
              <span className="scan-id">{code}</span>
              <span className="scan-title">{text.names[code]}</span>
              <span className="scan-status">{text.states[state]}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
