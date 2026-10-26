import type { Lang } from "./types";

export const SLICE = [
  "ECSS-E-ST-10C Rev.1",
  "ECSS-E-ST-10-02C Rev.1",
  "ECSS-E-ST-10-03C Rev.1",
  "ECSS-Q-ST-30C Rev.1",
  "ECSS-Q-ST-70C Rev.2",
] as const;

type Copy = Record<Lang, string>;

export const copy = {
  product: { en: "Project-aware ECSS audit", pt: "Auditoria ECSS do projeto" },
  project: {
    en: "Lumen-1 · 6U CubeSat camera · Falcon 9 rideshare",
    pt: "Lumen-1 · Câmara de CubeSat 6U · rideshare Falcon 9",
  },
  source: {
    en: "Standards library on Google Drive. This review uses the project cards.",
    pt: "Biblioteca de normas no Google Drive. Esta revisão usa os cartões do projeto.",
  },
  domains: {
    en: "Source system: engineering baseline. Domains: applicability index, project configuration, finding register, rideshare constraints.",
    pt: "Sistema de origem: linha de base de engenharia. Domínios: índice de aplicabilidade, configuração do projeto, registo de constatações, restrições de rideshare.",
  },
  steps: {
    en: ["Baseline", "Audit", "Findings"],
    pt: ["Linha de base", "Auditoria", "Constatações"],
  },
  language: { en: "Language", pt: "Língua" },
  baselineTitle: { en: "Engineering baseline", pt: "Linha de base de engenharia" },
  auditTitle: { en: "Audit", pt: "Auditoria" },
  findingsTitle: { en: "Findings", pt: "Constatações" },
  baselineLead: {
    en: "Lumen-1 is a 6U CubeSat camera on a Falcon 9 rideshare. Load the committed engineering baseline, then run the audit.",
    pt: "O Lumen-1 é uma câmara de CubeSat 6U num rideshare da Falcon 9. Carregue a linha de base de engenharia commitada e corra a auditoria.",
  },
  auditLead: {
    en: "The pass reads four committed cards, one planted issue each. It does not call a model.",
    pt: "A passagem lê quatro cartões commitados, uma questão plantada em cada um. Não chama um modelo.",
  },
  findingsLead: {
    en: "Three findings are agreed. One stays in dispute. Each clause identifier is an opened clause for that issue.",
    pt: "Três constatações estão em acordo. Uma fica em disputa. Cada identificador de cláusula é uma cláusula aberta para essa questão.",
  },
  load: { en: "Load baseline", pt: "Carregar linha de base" },
  loading: {
    en: "Reading the committed baseline…",
    pt: "A ler a linha de base commitada…",
  },
  continueAudit: { en: "Continue to audit", pt: "Seguir para a auditoria" },
  run: { en: "Run audit", pt: "Correr auditoria" },
  reading: { en: "Reading the card set…", pt: "A ler o conjunto de cartões…" },
  readDone: {
    en: "Four cards read. One finding stays in dispute.",
    pt: "Quatro cartões lidos. Uma constatação fica em disputa.",
  },
  showFindings: { en: "Show findings", pt: "Mostrar constatações" },
  needBaseline: {
    en: "Load the engineering baseline first.",
    pt: "Carregue primeiro a linha de base de engenharia.",
  },
  needAudit: {
    en: "Run the audit to read the four cards.",
    pt: "Corra a auditoria para ler os quatro cartões.",
  },
  backBaseline: { en: "Back to baseline", pt: "Voltar à linha de base" },
  backAudit: { en: "Back to audit", pt: "Voltar à auditoria" },
  slice: { en: "Standards slice", pt: "Fatia de normas" },
  sample: { en: "Committed sample", pt: "Amostra commitada" },
  clause: { en: "Clause", pt: "Cláusula" },
  trigger: { en: "Triggering line", pt: "Linha desencadeante" },
  why: { en: "Why it is critical", pt: "Porque é crítico" },
  whyDisputed: {
    en: "Why it is called critical",
    pt: "Porque é considerado crítico",
  },
  change: { en: "Recommended change", pt: "Alteração recomendada" },
  versus: { en: "Agreement versus dispute", pt: "Acordo ou disputa" },
  agreed: { en: "Agreed", pt: "Em acordo" },
  disputed: { en: "In dispute", pt: "Em disputa" },
  critical: { en: "Critical", pt: "Crítico" },
  alsoOpened: { en: "Also opened", pt: "Também abertas" },
  baselineLang: { en: "Baseline language: English", pt: "Língua da linha de base: inglês" },
  auditorA: { en: "Auditor A", pt: "Auditor A" },
  auditorB: { en: "Auditor B", pt: "Auditor B" },
  showLine: { en: "Show in baseline", pt: "Ver na linha de base" },
  line: { en: "line", pt: "linha" },
  lines: { en: "lines", pt: "linhas" },
  agreedCount: { en: "agreed", pt: "em acordo" },
  disputeCount: { en: "in dispute", pt: "em disputa" },
  cardsPath: { en: "web/src/data/cards.json", pt: "web/src/data/cards.json" },
  baselinePath: { en: "web/src/data/baseline.json", pt: "web/src/data/baseline.json" },
} satisfies Record<string, Copy | Record<Lang, string[]>>;

export function tx(lang: Lang, value: Copy): string {
  return value[lang];
}

export function formatLineNumbers(numbers: number[], lang: Lang): string {
  const label = numbers.length > 1 ? copy.lines[lang] : copy.line[lang];
  return `${label} ${numbers.join(", ")}`;
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
