export type Lang = "en" | "pt";

export type Screen = "baseline" | "audit" | "findings";

export type Verdict = "agree" | "dispute";

export type BaselineLine = {
  n: number;
  text: string;
};

export type BaselineFile = {
  id: string;
  revision: string;
  lines: BaselineLine[];
};

export type CardCopy = {
  title: string;
  whyCritical: string;
  change: string;
  agreement: string;
  auditorA: string;
  auditorB: string;
};

export type Card = {
  id: string;
  clauseId: string;
  supportingClauses: string[];
  lineNumbers: number[];
  verdict: Verdict;
  en: CardCopy;
  pt: CardCopy;
};
