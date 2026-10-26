export type Lang = "en" | "pt";

export type Pair = Record<Lang, string>;

export type Layout = "mark" | "bleed" | "poster" | "desk" | "phase" | "split";

export type Tone = "plain" | "dispute";

export type Scene = {
  id: string;
  ms: number;
  layout: Layout;
  image?: string;
  wide?: boolean;
  tone?: Tone;
  eyebrow?: Pair;
  title: Pair;
  detail?: Pair;
  note?: string;
  aside?: Pair;
};

export const phases = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

export const scenes: Scene[] = [
  {
    id: "open",
    ms: 12000,
    layout: "mark",
    image: "/astraea-mark.jpg",
    eyebrow: { en: "Astraea", pt: "Astraea" },
    title: { en: "Audit the review.", pt: "Auditar a revisão." },
  },
  {
    id: "instrument",
    ms: 15000,
    layout: "bleed",
    image: "/optical-payload.jpg",
    eyebrow: { en: "The instrument", pt: "O instrumento" },
    title: { en: "A CubeSat optical payload.", pt: "Carga útil ótica de um CubeSat." },
    detail: { en: "Falcon 9 rideshare.", pt: "Rideshare da Falcon 9." },
  },
  {
    id: "baseline",
    ms: 12000,
    layout: "poster",
    eyebrow: { en: "The handoff", pt: "A passagem" },
    title: { en: "One engineering baseline.", pt: "Uma linha de base de engenharia." },
    detail: {
      en: "It marks what is critical, and it names the change.",
      pt: "Marca o que é crítico e nomeia a alteração.",
    },
  },
  {
    id: "reader",
    ms: 16000,
    layout: "bleed",
    image: "/atmosphere.jpg",
    wide: true,
    eyebrow: { en: "The wait", pt: "A espera" },
    title: { en: "The review waits on one reader.", pt: "A revisão espera por um leitor." },
    detail: {
      en: "ECSS and the design, read together.",
      pt: "A ECSS e o desenho, lidos em conjunto.",
    },
  },
  {
    id: "gap-method",
    ms: 13000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "01", pt: "01" },
    title: {
      en: "A requirement with no verification method.",
      pt: "Um requisito sem método de verificação.",
    },
  },
  {
    id: "gap-optic",
    ms: 13000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "02", pt: "02" },
    title: {
      en: "An optic with no contamination control.",
      pt: "Uma ótica sem controlo de contaminação.",
    },
  },
  {
    id: "gap-loads",
    ms: 13000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "03", pt: "03" },
    title: {
      en: "Launch loads never qualified.",
      pt: "Cargas de lançamento nunca qualificadas.",
    },
  },
  {
    id: "one",
    ms: 12000,
    layout: "poster",
    eyebrow: { en: "This camera", pt: "Esta câmara" },
    title: { en: "One camera. One review.", pt: "Uma câmara. Uma revisão." },
    detail: {
      en: "A checker for this review, on this camera.",
      pt: "Um verificador para esta revisão, nesta câmara.",
    },
  },
  {
    id: "product",
    ms: 22000,
    layout: "desk",
    eyebrow: { en: "Astraea", pt: "Astraea" },
    title: { en: "The mission desk.", pt: "A secretária da missão." },
  },
  {
    id: "phase",
    ms: 16000,
    layout: "phase",
    image: "/phase-rail.jpg",
    eyebrow: { en: "Lumen-1", pt: "Lumen-1" },
    title: { en: "In PDR.\nNext, CDR.", pt: "Em PDR.\nA seguir, o CDR." },
    detail: {
      en: "6U CubeSat optical camera. Falcon\u00a09 rideshare.",
      pt: "Câmara ótica CubeSat 6U. Rideshare da Falcon\u00a09.",
    },
    aside: {
      en: "Halcyon-3 stays at SRR. Cinder-2 stays at MDR.",
      pt: "Halcyon-3 fica no SRR. Cinder-2 fica no MDR.",
    },
  },
  {
    id: "decide",
    ms: 15000,
    layout: "split",
    image: "/desk-widget.jpg",
    eyebrow: { en: "The demo", pt: "A demonstração" },
    title: { en: "The engineer decides.", pt: "O engenheiro decide." },
    detail: {
      en: "Committed cards. Two auditors. No live model.",
      pt: "Fichas commitadas. Dois auditores. Sem modelo ao vivo.",
    },
  },
  {
    id: "f1",
    ms: 20000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "Agreed", pt: "Acordado" },
    title: {
      en: "No verification method for the optical MTF requirement.",
      pt: "Sem método de verificação para o requisito de MTF ótico.",
    },
    detail: {
      en: "The change is a method: test, analysis, inspection, or review of design.",
      pt: "A alteração é um método: ensaio, análise, inspeção ou revisão do desenho.",
    },
    note: "ECSS-E-ST-10-02C Rev.1 · 5.2.1e\nECSS-E-ST-10C Rev.1 · 5.2.3.4a",
  },
  {
    id: "f2",
    ms: 16000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "Agreed", pt: "Acordado" },
    title: {
      en: "No contamination or outgassing control on the optic.",
      pt: "Sem controlo de contaminação ou de desgaseificação na ótica.",
    },
    detail: {
      en: "The change is a cleanliness programme and an outgassing check.",
      pt: "A alteração é um programa de limpeza e uma avaliação de desgaseificação.",
    },
    note: "ECSS-Q-ST-70C Rev.2 · 4.4a",
  },
  {
    id: "f3",
    ms: 16000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "Agreed", pt: "Acordado" },
    title: {
      en: "No qualification against the rideshare mechanical environment.",
      pt: "Sem qualificação face ao ambiente mecânico do rideshare.",
    },
    detail: {
      en: "The change is a qualification for that mechanical environment.",
      pt: "A alteração é uma qualificação para esse ambiente mecânico.",
    },
    note: "ECSS-E-ST-10-03C Rev.1 · 4.5.2a",
  },
  {
    id: "f4",
    ms: 20000,
    layout: "poster",
    wide: true,
    tone: "dispute",
    eyebrow: { en: "In dispute", pt: "Em disputa" },
    title: {
      en: "Reliability is asserted. There is no FMEA.",
      pt: "A fiabilidade é afirmada. Não há FMEA.",
    },
    detail: {
      en: "The clause requires the analysis, not a second camera.",
      pt: "A cláusula exige a análise, não uma segunda câmara.",
    },
    note: "ECSS-Q-ST-30C Rev.1 · 6.4.2.2a",
  },
  {
    id: "result",
    ms: 16000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "On this baseline", pt: "Nesta linha de base" },
    title: { en: "Three accepted. One left open.", pt: "Três aceites. Um em aberto." },
    detail: {
      en: "The engineer still decides. This does not certify the camera.",
      pt: "O engenheiro ainda decide. Isto não certifica a câmara.",
    },
  },
  {
    id: "source",
    ms: 14000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "The source", pt: "A origem" },
    title: { en: "The demo reads the cards.", pt: "A demonstração lê as fichas." },
    detail: {
      en: "Drive holds 317 ECSS files. Git holds the requirements, the FMEA, the verification plan, and the cards.",
      pt: "O Drive guarda 317 ficheiros ECSS. O Git guarda os requisitos, a FMEA, o plano de verificação e as fichas.",
    },
  },
  {
    id: "domains",
    ms: 14000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "Four domains", pt: "Quatro domínios" },
    title: {
      en: "Then the second auditor. Then the human.",
      pt: "Depois o segundo auditor. Depois a pessoa.",
    },
    detail: {
      en: "The ECSS applicability index, the project configuration, the finding register, and the Falcon 9 rideshare constraints.",
      pt: "O índice de aplicabilidade ECSS, a configuração do projeto, o registo de achados e as restrições do rideshare da Falcon 9.",
    },
  },
  {
    id: "next",
    ms: 12000,
    layout: "poster",
    wide: true,
    eyebrow: { en: "Next", pt: "A seguir" },
    title: { en: "The specialist takes the dispute.", pt: "O especialista fica com a disputa." },
    detail: {
      en: "The next review of this camera.",
      pt: "A próxima revisão desta câmara.",
    },
  },
  {
    id: "thanks",
    ms: 13000,
    layout: "mark",
    image: "/astraea-mark.jpg",
    eyebrow: { en: "Astraea", pt: "Astraea" },
    title: { en: "Thank you.", pt: "Obrigado." },
  },
];

export const ui = {
  hint: { en: "Space", pt: "Espaço" },
  playing: { en: "Playing", pt: "A correr" },
  language: { en: "Language", pt: "Língua" },
} as const;
