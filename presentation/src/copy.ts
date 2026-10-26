export type Lang = "en" | "pt";

export type Pair = Record<Lang, string>;

export type Layout = "mark" | "bleed" | "poster" | "desk" | "split" | "brand";

export type Tone = "plain" | "dispute";

export type FigureId =
  | "late"
  | "spec"
  | "reader"
  | "method"
  | "optic"
  | "loads"
  | "plate"
  | "record"
  | "auditors"
  | "finding"
  | "human"
  | "source"
  | "close";

export type Scene = {
  id: string;
  ms: number;
  layout: Layout;
  image?: string;
  wide?: boolean;
  tone?: Tone;
  figure?: FigureId;
  eyebrow?: Pair;
  title: Pair;
  detail?: Pair;
  note?: string;
  aside?: Pair;
};

export const phases = ["MCR", "SRR", "MDR", "SDR", "PDR", "CDR", "PRR", "TRR", "SAR", "ORR", "FRR"] as const;

const line = {
  en: "Astrea is the mission desk that audits a space project against the standards it has actually opened.",
  pt: "Astrea é a secretária da missão que audita um projeto espacial face às normas que realmente abriu.",
} as const;

export const scenes: Scene[] = [
  {
    id: "late",
    ms: 18000,
    layout: "poster",
    wide: true,
    figure: "late",
    eyebrow: { en: "The cost", pt: "O custo" },
    title: { en: "A missed requirement is found late.", pt: "Um requisito em falta encontra-se tarde." },
    detail: { en: "The camera is already in review.", pt: "A câmara já está em revisão." },
  },
  {
    id: "instrument",
    ms: 14000,
    layout: "bleed",
    image: "/optical-payload.jpg",
    figure: "spec",
    eyebrow: { en: "The instrument", pt: "O instrumento" },
    title: { en: "A CubeSat optical payload.", pt: "Carga útil ótica de um CubeSat." },
    detail: { en: "Falcon 9 rideshare.", pt: "Rideshare da Falcon 9." },
  },
  {
    id: "reader",
    ms: 14000,
    layout: "bleed",
    image: "/atmosphere.jpg",
    wide: true,
    figure: "reader",
    eyebrow: { en: "The wait", pt: "A espera" },
    title: { en: "The review waits on one reader.", pt: "A revisão espera por um leitor." },
    detail: { en: "ECSS and the design, read together.", pt: "A ECSS e o desenho, lidos em conjunto." },
  },
  {
    id: "gap-method",
    ms: 14000,
    layout: "poster",
    wide: true,
    figure: "method",
    eyebrow: { en: "01", pt: "01" },
    title: {
      en: "A requirement with no verification method.",
      pt: "Um requisito sem método de verificação.",
    },
    detail: {
      en: "The optical MTF line names none.",
      pt: "A linha de MTF ótico não nomeia nenhum.",
    },
  },
  {
    id: "gap-optic",
    ms: 13000,
    layout: "poster",
    wide: true,
    figure: "optic",
    eyebrow: { en: "02", pt: "02" },
    title: {
      en: "An optic with no contamination control.",
      pt: "Uma ótica sem controlo de contaminação.",
    },
    detail: {
      en: "No outgassing check on the optic.",
      pt: "Sem verificação de desgaseificação na ótica.",
    },
  },
  {
    id: "gap-loads",
    ms: 13000,
    layout: "poster",
    wide: true,
    figure: "loads",
    eyebrow: { en: "03", pt: "03" },
    title: { en: "Launch loads never qualified.", pt: "Cargas de lançamento nunca qualificadas." },
    detail: {
      en: "No qualification against the rideshare mechanical environment.",
      pt: "Sem qualificação face ao ambiente mecânico do rideshare.",
    },
  },
  {
    id: "one",
    ms: 12000,
    layout: "poster",
    figure: "plate",
    eyebrow: { en: "This camera", pt: "Esta câmara" },
    title: { en: "One camera. One review.", pt: "Uma câmara. Uma revisão." },
    detail: {
      en: "A checker for this review, on this camera.",
      pt: "Um verificador para esta revisão, nesta câmara.",
    },
  },
  {
    id: "brand",
    ms: 20000,
    layout: "brand",
    title: line,
  },
  {
    id: "product",
    ms: 26000,
    layout: "desk",
    eyebrow: { en: "Astrea", pt: "Astrea" },
    title: { en: "The mission desk.", pt: "A secretária da missão." },
    detail: { en: "Installed for aerospace missions.", pt: "Instalada para missões aeroespaciais." },
  },
  {
    id: "record",
    ms: 24000,
    layout: "poster",
    wide: true,
    figure: "record",
    eyebrow: { en: "The record", pt: "O registo" },
    title: { en: "The open record is Lumen-1.", pt: "O registo aberto é o Lumen-1." },
    detail: {
      en: "The rail opens that record. The other missions stay on the list.",
      pt: "O carril abre esse registo. As outras missões ficam na lista.",
    },
  },
  {
    id: "decide",
    ms: 14000,
    layout: "split",
    image: "/desk-widget.jpg",
    figure: "auditors",
    eyebrow: { en: "The demo", pt: "A demonstração" },
    title: { en: "The engineer decides.", pt: "O engenheiro decide." },
    detail: {
      en: "Committed cards. Two auditors. No live model.",
      pt: "Fichas commitadas. Dois auditores. Sem modelo ao vivo.",
    },
  },
  {
    id: "f1",
    ms: 16000,
    layout: "poster",
    wide: true,
    figure: "finding",
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
    ms: 14000,
    layout: "poster",
    wide: true,
    figure: "finding",
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
    ms: 14000,
    layout: "poster",
    wide: true,
    figure: "finding",
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
    ms: 18000,
    layout: "poster",
    wide: true,
    tone: "dispute",
    figure: "finding",
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
    id: "human",
    ms: 18000,
    layout: "poster",
    wide: true,
    figure: "human",
    eyebrow: { en: "The person", pt: "A pessoa" },
    title: { en: "The engineer still decides.", pt: "O engenheiro ainda decide." },
    detail: {
      en: "Three accepted. One left open. This does not certify the camera.",
      pt: "Três aceites. Um em aberto. Isto não certifica a câmara.",
    },
  },
  {
    id: "source",
    ms: 20000,
    layout: "poster",
    wide: true,
    figure: "source",
    eyebrow: { en: "The source", pt: "A origem" },
    title: { en: "The demo reads the opened cards.", pt: "A demonstração lê as fichas abertas." },
    detail: { en: "Not all 317 files.", pt: "Não são os 317 ficheiros." },
  },
  {
    id: "close",
    ms: 18000,
    layout: "mark",
    image: "/astraea-mark.jpg",
    figure: "close",
    eyebrow: { en: "Next", pt: "A seguir" },
    title: { en: "The specialist\ntakes the dispute.", pt: "O especialista\nfica com a disputa." },
    detail: { en: "The next review of this camera.", pt: "A próxima revisão desta câmara." },
    aside: { en: "Thank you.", pt: "Obrigado." },
  },
];

export const ui = {
  hint: { en: "Space", pt: "Espaço" },
  playing: { en: "Playing", pt: "A correr" },
  language: { en: "Language", pt: "Língua" },
  ground: { en: "Ground", pt: "Fundo" },
  type: { en: "Type", pt: "Tipo" },
  accent: { en: "Accent", pt: "Acento" },
} as const;

export const brandLine = line;
