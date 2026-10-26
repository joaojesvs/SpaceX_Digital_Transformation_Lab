import type { Card } from "./types.ts";

export const REFUSED_TOPICS = ["pyrotechnics", "explosives", "propulsion"] as const;

const REFUSAL: { topic: (typeof REFUSED_TOPICS)[number]; pattern: RegExp }[] = [
  { topic: "pyrotechnics", pattern: /pyrotechn|e-30\s*part\s*6|e-30-06/i },
  { topic: "explosives", pattern: /explosiv|e-33-11|e-st-33-11/i },
  { topic: "propulsion", pattern: /propulsion|propellant|e-30\s*part\s*5|e-st-35/i },
];

export type SliceDecision =
  | { kind: "in-slice" }
  | { kind: "refused"; topic: string }
  | { kind: "out-of-slice" };

export function classifyDocument(document: string, topic: string, id: string): SliceDecision {
  const haystack = `${document}\n${topic}\n${id}`;
  for (const rule of REFUSAL) {
    if (rule.pattern.test(haystack)) {
      return { kind: "refused", topic: rule.topic };
    }
  }
  if (inLockedSlice(document)) return { kind: "in-slice" };
  return { kind: "out-of-slice" };
}

function inLockedSlice(document: string): boolean {
  if (/ECSS-E-ST-10-02/i.test(document)) return true;
  if (/ECSS-E-ST-10-03/i.test(document)) return true;
  if (/ECSS-Q-ST-30/i.test(document)) return true;
  if (/ECSS-Q-ST-70/i.test(document)) return true;
  if (/ECSS-E-ST-10-\d/i.test(document)) return false;
  if (/ECSS-E-ST-10C?(?:\b|$)/i.test(document)) return true;
  if (/rideshare payload user'?s guide/i.test(document)) return true;
  return false;
}

export function formatClause(card: Pick<Card, "document" | "clause">): string {
  if (/^\d/.test(card.clause)) return `${card.document} clause ${card.clause}`;
  return card.clause;
}

export const PLANTED: { id: string; agreement: "agree" | "dispute"; status: "agreed" | "in dispute" }[] = [
  { id: "F-01", agreement: "agree", status: "agreed" },
  { id: "F-02", agreement: "agree", status: "agreed" },
  { id: "F-03", agreement: "agree", status: "agreed" },
  { id: "F-04", agreement: "dispute", status: "in dispute" },
];
