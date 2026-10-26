import baselineFile from "./baseline.json";
import cardFile from "./cards.json";
import clauseFile from "./clauses.json";
import { findingCardsFor, runReview } from "../review/runReview";
import type { ClauseCard } from "../review/runReview";
import type { BaselineFile, Card } from "../types";

const EXPECTED_CLAUSES = [
  "ECSS-E-ST-10-02C Rev.1, 5.2.1e",
  "ECSS-Q-ST-70C Rev.2, 4.4a",
  "ECSS-E-ST-10-03C Rev.1, 4.5.2a",
  "ECSS-Q-ST-30C Rev.1, 6.4.2.2a",
] as const;

const EXPECTED_SUPPORTING = [
  ["ECSS-E-ST-10-02C Rev.1, 5.2.2.1a", "ECSS-E-ST-10C Rev.1, 5.2.3.4a"],
  ["ECSS-Q-ST-70C Rev.2, 4.4c", "ECSS-Q-ST-70C Rev.2, 5.1.4b", "ECSS-Q-ST-70C Rev.2, 5.1.4c"],
  [
    "ECSS-E-ST-10-03C Rev.1, 4.5.1b",
    "ECSS-E-ST-10-03C Rev.1, 5.1b",
    "ECSS-E-ST-10-03C Rev.1, 5.2a with Table 5-1 columns a and i",
    "ECSS-E-ST-10-03C Rev.1, 5.5.2.3",
    "ECSS-E-ST-10-03C Rev.1, 5.5.2.5",
    "ECSS-E-ST-10-03C Rev.1, 5.5.2.6",
  ],
  ["ECSS-Q-ST-30C Rev.1, 6.4.2.2b"],
] as const;

const UNCITED = ["Payload User", "User's Guide", "guia de rideshare", "guia do utilizador"];

export const baseline = baselineFile as BaselineFile;
export const cards = cardFile as Card[];
export const clauses = clauseFile as ClauseCard[];

const stageReview = runReview(baseline, clauses);
const stageCards = findingCardsFor(stageReview, cards);
if (stageCards.map((card) => `${card.id}:${card.verdict}`).join(",") !== "F-01:agree,F-02:agree,F-03:agree,F-04:dispute") {
  throw new Error("The loaded Lumen-1 baseline must produce three agreed findings and one dispute.");
}

function assertSample(list: Card[], lines: BaselineFile["lines"]) {
  if (list.length !== EXPECTED_CLAUSES.length) {
    throw new Error("The sample set must contain exactly four cards.");
  }
  const known = new Set(lines.map((line) => line.n));
  const corpus = JSON.stringify({ list, lines });
  for (const phrase of UNCITED) {
    if (corpus.includes(phrase)) {
      throw new Error(`The sample cites a document that stays uncited: ${phrase}`);
    }
  }
  list.forEach((card, index) => {
    if (card.clauseId !== EXPECTED_CLAUSES[index]) {
      throw new Error(`Card ${index + 1} must use ${EXPECTED_CLAUSES[index]}.`);
    }
    const supporting = EXPECTED_SUPPORTING[index];
    if (card.supportingClauses.join("|") !== supporting.join("|")) {
      throw new Error(`Card ${card.id} must keep the opened supporting clauses.`);
    }
    for (const lineNumber of card.lineNumbers) {
      if (!known.has(lineNumber)) {
        throw new Error(`Card ${card.id} cites missing baseline line ${lineNumber}.`);
      }
    }
  });
  if (list[3]?.verdict !== "dispute") {
    throw new Error("The dependability card stays in dispute.");
  }
  const disputes = list.filter((card) => card.verdict === "dispute");
  if (disputes.length !== 1) {
    throw new Error("Exactly one card stays in dispute.");
  }
}

assertSample(cards, baseline.lines);
