import { formatClause } from "./slice.ts";
import type {
  AuditReport,
  Baseline,
  BaselineLine,
  Card,
  ClearCheck,
  FindingCard,
  RideshareConstraints,
  SkippedCard,
} from "./types.ts";

export function audit(input: {
  baseline: Baseline;
  cards: Card[];
  skipped: SkippedCard[];
  rideshare: RideshareConstraints;
  driveFolderUrl: string;
}): AuditReport {
  const findings: FindingCard[] = [];
  const clear: ClearCheck[] = [];
  const cards = [...input.cards].sort((a, b) => a.demoOrder - b.demoOrder || a.id.localeCompare(b.id));

  for (const card of cards) {
    const hits = input.baseline.lines.filter((line) => lineMatches(line, card));
    if (hits.length === 0) {
      clear.push({
        id: card.id,
        clause: formatClause(card),
        checkedLineIds: input.baseline.lines.filter((line) => line.section === card.match.section).map((line) => line.id),
      });
      continue;
    }
    for (const line of hits) {
      findings.push(toFinding(card, line, input.rideshare));
    }
  }

  return {
    sourceSystem: "engineering baseline",
    mission: input.baseline.mission,
    baselineId: input.baseline.id,
    driveFolderUrl: input.driveFolderUrl,
    network: false,
    domains: {
      ecssApplicabilityIndex: "agent/data/cards",
      projectConfiguration: "agent/data/baseline.json",
      findingRegister: "demo output",
      rideshareConstraints: "agent/data/rideshare.json",
    },
    cardsLoaded: cards.map((card) => card.id),
    cardsSkipped: input.skipped,
    findings,
    clear,
  };
}

function lineMatches(line: BaselineLine, card: Card): boolean {
  if (line.section !== card.match.section) return false;
  return card.match.all.every((condition) => {
    const value = Object.prototype.hasOwnProperty.call(line.fields, condition.field)
      ? line.fields[condition.field]
      : null;
    if (condition.op === "missing") return value === null || value === "";
    return value === condition.value;
  });
}

function toFinding(card: Card, line: BaselineLine, rideshare: RideshareConstraints): FindingCard {
  if (card.environmentRef !== undefined && card.environmentRef !== rideshare.id) {
    throw new Error(`Card ${card.id} points at ${card.environmentRef}, not the loaded rideshare constraints`);
  }
  return {
    id: card.id,
    status: card.secondAuditor.stance === "agree" ? "agreed" : "in dispute",
    cardStatus: card.cardStatus,
    clause: formatClause(card),
    supportingClauses: card.supportingClauses,
    triggeringLine: { id: line.id, en: line.text.en, pt: line.text.pt },
    whyCritical: card.whyCritical,
    recommendedChange: card.recommendedChange,
    agreement: card.secondAuditor.stance,
    auditors: {
      primary: card.whyCritical,
      second: card.secondAuditor.note,
    },
    launchConstraint: card.launchConstraint,
  };
}
