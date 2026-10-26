import type { Locale } from "./locale";

export const INTENTS = [
  "project",
  "verification",
  "contamination",
  "qualification",
  "fmea",
  "next",
  "actions",
  "phases",
  "iso",
  "rideshare",
  "refuse",
] as const;

export type Intent = (typeof INTENTS)[number];

type Copy = Record<Locale, string>;

export const prompts: { intent: Intent; en: string; pt: string }[] = [
  {
    intent: "project",
    en: "What is open on Lumen-1?",
    pt: "O que está aberto no Lumen-1?",
  },
  {
    intent: "verification",
    en: "Which opened clause covers verification?",
    pt: "Que cláusula aberta cobre a verificação?",
  },
  {
    intent: "actions",
    en: "What should we do next?",
    pt: "O que devemos fazer a seguir?",
  },
];

export const nextPrompt: Copy = {
  en: "What is the next phase?",
  pt: "Qual é a fase seguinte?",
};

const answers: Record<Intent, Copy> = {
  project: {
    en: "Lumen-1 is a 6U CubeSat optical camera, a Falcon 9 rideshare piggyback. The opened review is at PDR. Three findings are agreed. REQ-IMG-03 has no verification method (ECSS-E-ST-10-02C Rev.1, 5.2.1e). The optic has no contamination or outgassing control (ECSS-Q-ST-70C Rev.2, 4.4a). There is no qualification against the rideshare mechanical environment (ECSS-E-ST-10-03C Rev.1, 4.5.2a). One finding is in dispute: reliability is asserted with no FMEA (ECSS-Q-ST-30C Rev.1, 6.4.2.2a). That clause requires the analysis, not a second camera. ISO and the rideshare guide are not opened.",
    pt: "O Lumen-1 é uma câmara ótica num CubeSat 6U, em piggyback num rideshare da Falcon 9. A revisão aberta está na PDR. Três constatações estão em acordo. O REQ-IMG-03 não tem método de verificação (ECSS-E-ST-10-02C Rev.1, 5.2.1e). A ótica não tem controlo de contaminação nem de desgaseificação (ECSS-Q-ST-70C Rev.2, 4.4a). Não há qualificação face ao ambiente mecânico do rideshare (ECSS-E-ST-10-03C Rev.1, 4.5.2a). Uma constatação está em disputa: a fiabilidade é afirmada sem FMEA (ECSS-Q-ST-30C Rev.1, 6.4.2.2a). Essa cláusula exige a análise, não uma segunda câmara. A ISO e o guia de rideshare não estão abertos.",
  },
  verification: {
    en: "The opened verification clause is ECSS-E-ST-10-02C Rev.1, 5.2.1e. Each requirement in the verification set needs a strategy in the matrix: method, product level, and stage. REQ-IMG-03 leaves all three empty. Allowed methods, from 5.2.2.1a, are test, analysis, review of design, or inspection. ECSS-E-ST-10C Rev.1, 5.2.3.4a says the same from system engineering, and 5.2.3.4b puts the method in the matrix. No procedure is on the register for this row. Astraea will not invent one.",
    pt: "A cláusula de verificação aberta é a ECSS-E-ST-10-02C Rev.1, 5.2.1e. Cada requisito no conjunto de verificação precisa de uma estratégia na matriz: método, nível de produto e fase. O REQ-IMG-03 deixa os três por preencher. Os métodos admitidos, pela 5.2.2.1a, são ensaio, análise, revisão de projeto ou inspeção. A ECSS-E-ST-10C Rev.1, 5.2.3.4a diz o mesmo do lado da engenharia de sistemas, e a 5.2.3.4b põe o método na matriz. Não há procedimento no registo para esta linha. A Astraea não inventa um.",
  },
  contamination: {
    en: "ECSS-Q-ST-70C Rev.2, 4.4a requires a contamination and cleanliness control programme. The minimum is cleaning procedures plus a way to monitor cleanliness. The baseline has neither. Clause 4.4c applies because this optic is contamination-critical. Clause 5.1.4b requires outgassing screening of the materials. Clause 5.1.4c requires every organic material to be evaluated for outgassing. The silicone stake is organic and has no evaluation. No procedure on the register closes this gap.",
    pt: "A ECSS-Q-ST-70C Rev.2, 4.4a exige um programa de controlo de contaminação e limpeza. O mínimo são procedimentos de limpeza e uma forma de vigiar a limpeza. A linha de base não tem nenhum dos dois. A cláusula 4.4c aplica-se porque esta ótica é crítica à contaminação. A cláusula 5.1.4b exige o rastreio de desgaseificação dos materiais. A cláusula 5.1.4c exige que cada material orgânico seja avaliado quanto à desgaseificação. O silicone de fixação é orgânico e não tem avaliação. Nenhum procedimento no registo fecha esta lacuna.",
  },
  qualification: {
    en: "ECSS-E-ST-10-03C Rev.1, 4.5.2a asks for qualification evidence in the intended environments, with the qualification margins, on a qualification model or under a protoflight approach. Clause 4.5.1b puts launch-segment compatibility into the test programme. Clause 5.1b treats a camera as both electronic (type a) and optical (type i). Table 5-1, via 5.2a, marks sinusoidal vibration and shock as required for both types, and random vibration as required for the electronic type. None of those tests is planned. The rideshare guide is not opened, so no load number is cited.",
    pt: "A ECSS-E-ST-10-03C Rev.1, 4.5.2a pede evidência de qualificação nos ambientes previstos, com as margens de qualificação, num modelo de qualificação ou numa abordagem protoflight. A cláusula 4.5.1b mete a compatibilidade com o segmento de lançamento no programa de ensaios. A cláusula 5.1b trata uma câmara como eletrónica (tipo a) e ótica (tipo i). A Tabela 5-1, pela 5.2a, marca vibração sinusoidal e choque como obrigatórios para os dois tipos, e vibração aleatória como obrigatória para o tipo eletrónico. Nenhum desses ensaios está planeado. O guia de rideshare não está aberto, por isso não se cita um número de carga.",
  },
  fmea: {
    en: "ECSS-Q-ST-30C Rev.1, 6.4.2.2a requires an FMEA, or a FMECA when criticality is included. Clause 6.4.2.2b is the part both auditors use: the analysis names the potential failure modes and classes them by severity, or by criticality if a FMECA is used. The heritage sentence does not do that. REQ-REL-01 states 0.95 over two years with no such list. The clause requires the analysis, not a second camera. The dispute stays on that point. A person decides.",
    pt: "A ECSS-Q-ST-30C Rev.1, 6.4.2.2a exige uma FMEA, ou uma FMECA quando se inclui a criticidade. A cláusula 6.4.2.2b é a parte que os dois auditores usam: a análise nomeia os modos de falha potenciais e classifica-os pela severidade, ou pela criticidade se for uma FMECA. A frase de herança de voo não faz isso. O REQ-REL-01 declara 0,95 ao longo de dois anos sem essa lista. A cláusula exige a análise, não uma segunda câmara. A disputa fica nesse ponto. A pessoa decide.",
  },
  next: {
    en: "Lumen-1 is in PDR, the Preliminary Design Review. The next phase is CDR, the Critical Design Review. The order on this programme is MCR, SRR, MDR, SDR, PDR, CDR, PRR, TRR, SAR, ORR, FRR.",
    pt: "O Lumen-1 está na PDR, a revisão preliminar de projeto. A fase seguinte é a CDR, a revisão crítica de projeto. A ordem neste programa é MCR, SRR, MDR, SDR, PDR, CDR, PRR, TRR, SAR, ORR, FRR.",
  },
  actions: {
    en: "Stay in PDR. Before treating the design as ready for CDR: write a method, a level, and a stage for REQ-IMG-03, and leave the register empty until that exists; add a contamination and cleanliness programme and an outgassing evaluation for materials in view of the detector; plan a qualification or protoflight campaign against the rideshare mechanical environment. The rideshare guide is not opened, so no environment level is available. On reliability, ECSS-Q-ST-30C Rev.1, 6.4.2.2a requires an FMEA. It does not require a second camera. That point stays in dispute for a person to decide.",
    pt: "Ficar na PDR. Antes de tratar o projeto como pronto para a CDR: escrever método, nível e fase para o REQ-IMG-03, e deixar o registo vazio até isso existir; acrescentar um programa de limpeza e uma avaliação de desgaseificação dos materiais na vista do detetor; planear uma campanha de qualificação ou protoflight face ao ambiente mecânico do rideshare. O guia de rideshare não está aberto, por isso não há nível de ambiente. Na fiabilidade, a ECSS-Q-ST-30C Rev.1, 6.4.2.2a exige uma FMEA. Não exige uma segunda câmara. Esse ponto fica em disputa para uma pessoa decidir.",
  },
  phases: {
    en: "The review order, from concept to flight, is MCR, SRR, MDR, SDR, PDR, CDR, PRR, TRR, SAR, ORR, FRR. Lumen-1 is in PDR, the Preliminary Design Review. The next phase is CDR, the Critical Design Review.",
    pt: "A ordem das revisões, do conceito até ao voo, é MCR, SRR, MDR, SDR, PDR, CDR, PRR, TRR, SAR, ORR, FRR. O Lumen-1 está na PDR, a revisão preliminar de projeto. A fase seguinte é a CDR, a revisão crítica de projeto.",
  },
  iso: {
    en: "ISO is a layer on the cross-check, and it is not opened. Astraea has no opened ISO source, and it will not quote an ISO clause.",
    pt: "A ISO é uma camada na verificação cruzada, e não está aberta. A Astraea não tem uma fonte ISO aberta, e não cita uma cláusula ISO.",
  },
  rideshare: {
    en: "The SpaceX Rideshare Payload User's Guide is the launch-side constraint named for this slice, and it is not opened. No section and no load number are cited. The agreed gap is the missing qualification evidence under ECSS-E-ST-10-03C Rev.1, 4.5.2a.",
    pt: "O guia de rideshare da SpaceX é a restrição de lançamento nomeada nesta fatia, e não está aberto. Não se cita secção nem número de carga. A lacuna em acordo é a falta de evidência de qualificação ao abrigo da ECSS-E-ST-10-03C Rev.1, 4.5.2a.",
  },
  refuse: {
    en: "Astraea has no opened source for that. It only answers from the four Lumen-1 findings, the review phase list, and the next phase.",
    pt: "A Astraea não tem uma fonte aberta para isso. Só responde a partir das quatro constatações do Lumen-1, da lista de fases de revisão e da fase seguinte.",
  },
};

const BANNED = [
  /ECSS-Q-ST-70-01/i,
  /ECSS-Q-ST-70-02/i,
  /ECSS-Q-ST-30-02/i,
  /ISO\s*\d/i,
  /\b\d+(?:[.,]\d+)?\s*g(?:rms)?\b/i,
];

function fold(value: string): string {
  return value.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();
}

const exact = new Map<string, Intent>();
for (const prompt of prompts) {
  exact.set(fold(prompt.en), prompt.intent);
  exact.set(fold(prompt.pt), prompt.intent);
}
exact.set(fold(nextPrompt.en), "next");
exact.set(fold(nextPrompt.pt), "next");

function citesUnopened(value: string): boolean {
  if (/ecss-q-st-70-0[12]/.test(value) || /ecss-q-st-30-02/.test(value)) return true;
  const ids = value.match(/ecss-[a-z0-9-]+/g) ?? [];
  const allowed = /ecss-e-st-10-02|ecss-e-st-10c|ecss-e-st-10-03|ecss-q-st-30c|ecss-q-st-70c/;
  return ids.some((id) => !allowed.test(id));
}

function isGuideAsk(value: string): boolean {
  return /user'?s guide|payload user|rideshare guide|guia de rideshare|guia do utilizador|load factor|fator de carga|factor de carga|grms|g-load/.test(value);
}

export function interpret(text: string): Intent {
  const value = fold(text);
  if (!value) return "refuse";
  const known = exact.get(value);
  if (known) return known;
  if (citesUnopened(value)) return "refuse";
  if (/\biso\b/.test(value)) return "iso";
  if (/fmea|fmeca|fiabil|reliab|0[.,]95|redundan|segunda c[aâ]mara|second camera|6\.4\.2\.2/.test(value)) return "fmea";
  if (/contamin|outgas|desgase|limpez|silicone|4\.4a|4\.4c|5\.1\.4/.test(value)) return "contamination";
  if (/qualif|vibra|shock|choque|4\.5\.2|4\.5\.1|table 5-1|tabela 5-1|mec-01|protoflight|dispenser|launch load|carga de lancamento|mechanical environment|ambiente mecanico/.test(value)) {
    return "qualification";
  }
  if (isGuideAsk(value)) return "rideshare";
  if (/verificat|img-03|mtf|nyquist|5\.2\.1e|5\.2\.2\.1a|5\.2\.3\.4|metod[oa] de verifica/.test(value)) return "verification";
  if (/what should|o que devemos|o que fazer|antes da cdr|before cdr|proximo passo|proxima coisa/.test(value)) return "actions";
  if (/next phase|fase seguinte|proxima fase|what is cdr|o que e a cdr|qual e a cdr/.test(value)) return "next";
  if (/\b(mcr|srr|mdr|sdr|pdr|prr|trr|sar|orr|frr)\b|review order|ordem das revis|phase list|lista de fases|que fase|which phase|em que fase/.test(value)) {
    return "phases";
  }
  if (/lumen|projeto|project|cubesat|camera|camara|missao|mission|finding|constatac|payload|otica|optic/.test(value)) return "project";
  if (/\becss\b|regulation|norma|clausul|clause/.test(value)) return "verification";
  return "refuse";
}

export function answer(locale: Locale, intent: Intent): string {
  return answers[intent][locale];
}

for (const intent of INTENTS) {
  for (const lang of ["en", "pt"] as const) {
    const text = answers[intent][lang];
    for (const pattern of BANNED) {
      if (pattern.test(text)) {
        throw new Error(`Scripted ${intent} ${lang} tripped ${pattern}.`);
      }
    }
  }
}
