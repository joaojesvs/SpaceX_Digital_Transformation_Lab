export type Lang = "en" | "pt";

export type Text = {
  en: string;
  pt: string;
};

export type Agreement = "agree" | "dispute";

export type CardStatus = "ready";

export type FindingStatus = "agreed" | "in dispute";

export type FieldValue = string | boolean | null;

export type MatchCondition =
  | { field: string; op: "missing" }
  | { field: string; op: "equals"; value: string | boolean };

export type CardMatch = {
  section: string;
  all: MatchCondition[];
};

export type Card = {
  id: string;
  demoOrder: number;
  document: string;
  clause: string;
  topic: string;
  domain: "ecss-applicability";
  match: CardMatch;
  environmentRef?: string;
  libraryAnchor?: string;
  supportingClauses?: string;
  launchConstraint?: string;
  cardStatus: CardStatus;
  whyCritical: Text;
  recommendedChange: Text;
  secondAuditor: {
    stance: Agreement;
    note: Text;
  };
};

export type BaselineLine = {
  id: string;
  section: string;
  text: Text;
  fields: Record<string, FieldValue>;
};

export type Baseline = {
  id: string;
  name: string;
  mission: Text;
  configuration: Record<string, string>;
  lines: BaselineLine[];
};

export type RideshareConstraints = {
  id: string;
  document: string;
  summary: Text;
};

export type Config = {
  driveFolderUrl: string;
};

export type LibraryAccess = {
  mode: "committed-cards";
  driveFolderUrl: string;
  contacted: false;
};

export type SkippedCard = {
  file: string;
  document: string;
  reason: "refused" | "out-of-slice";
  detail: string;
};

export type FindingCard = {
  id: string;
  status: FindingStatus;
  cardStatus: CardStatus;
  clause: string;
  supportingClauses?: string;
  triggeringLine: { id: string; en: string; pt: string };
  whyCritical: Text;
  recommendedChange: Text;
  agreement: Agreement;
  auditors: {
    primary: Text;
    second: Text;
  };
  launchConstraint?: string;
};

export type ClearCheck = {
  id: string;
  clause: string;
  checkedLineIds: string[];
};

export type AuditReport = {
  sourceSystem: "engineering baseline";
  mission: Text;
  baselineId: string;
  driveFolderUrl: string;
  network: false;
  domains: {
    ecssApplicabilityIndex: string;
    projectConfiguration: string;
    findingRegister: string;
    rideshareConstraints: string;
  };
  cardsLoaded: string[];
  cardsSkipped: SkippedCard[];
  findings: FindingCard[];
  clear: ClearCheck[];
};
