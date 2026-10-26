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
    en: ["Baseline", "Review", "Findings"],
    pt: ["Linha de base", "Revisão", "Constatações"],
  },
  language: { en: "Language", pt: "Língua" },
  baselineTitle: { en: "Engineering baseline", pt: "Linha de base de engenharia" },
  auditTitle: { en: "Review", pt: "Revisão" },
  name: { en: "Second Reader", pt: "Second Reader" },
  introTitle: { en: "The baseline is ready.", pt: "A linha de base está pronta." },
  introBody: {
    en: "Lumen-1 is loaded. Run review reads that file and the opened clause cards.",
    pt: "O Lumen-1 está carregado. Correr revisão lê esse ficheiro e os cartões de cláusula abertos.",
  },
  checksLine: {
    en: "Verification, contamination, launch qualification, and failure analysis.",
    pt: "Verificação, contaminação, qualificação de lançamento e análise de falhas.",
  },
  findingsTitle: { en: "Findings", pt: "Constatações" },
  baselineLead: {
    en: "Lumen-1 is loaded from the committed engineering baseline. Run review reads that file and the opened clause cards. No model and no network.",
    pt: "O Lumen-1 está carregado a partir da linha de base de engenharia commitada. Correr revisão lê esse ficheiro e os cartões de cláusula abertos. Sem modelo e sem rede.",
  },
  auditLead: {
    en: "Each step is a check against the loaded baseline and the opened clause cards.",
    pt: "Cada passo é uma verificação sobre a linha de base carregada e os cartões de cláusula abertos.",
  },
  findingsLead: {
    en: "These are the checks that fired. A corrected line stays quiet and is not shown.",
    pt: "Estas são as verificações que dispararam. Uma linha corrigida fica em silêncio e não aparece.",
  },
  load: { en: "Load baseline", pt: "Carregar linha de base" },
  loading: {
    en: "Reading the committed baseline…",
    pt: "A ler a linha de base commitada…",
  },
  continueAudit: { en: "Continue to audit", pt: "Seguir para a auditoria" },
  run: { en: "Run review", pt: "Correr revisão" },
  reading: { en: "Second Reader is working…", pt: "O Second Reader está a trabalhar…" },
  quiet: { en: "Stays quiet.", pt: "Fica em silêncio." },
  readBaseline: { en: "Read the baseline", pt: "Ler a linha de base" },
  openedCards: { en: "Opened clause cards", pt: "Cartões de cláusula abertos" },
  checkLabel: {
    en: ["Empty verification method", "No contamination or outgassing control", "Launch tests marked not applicable", "Reliability number with no FMEA"],
    pt: ["Método de verificação vazio", "Sem controlo de contaminação ou desgaseificação", "Ensaios de lançamento marcados como não aplicáveis", "Número de fiabilidade sem FMEA"],
  },
  accepts: { en: "Second reader accepts", pt: "O segundo leitor aceita" },
  disputes: { en: "Second reader disputes", pt: "O segundo leitor disputa" },
  showFindings: { en: "Show findings", pt: "Mostrar constatações" },
  needBaseline: {
    en: "Load the engineering baseline first.",
    pt: "Carregue primeiro a linha de base de engenharia.",
  },
  needAudit: {
    en: "Run review to apply the checks.",
    pt: "Corra a revisão para aplicar as verificações.",
  },
  backBaseline: { en: "Back to baseline", pt: "Voltar à linha de base" },
  backAudit: { en: "Back to review", pt: "Voltar à revisão" },
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
  open: { en: "Open", pt: "Em aberto" },
  disputed: { en: "In dispute", pt: "Em disputa" },
  projectLine: { en: "Project line", pt: "Linha do projeto" },
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
