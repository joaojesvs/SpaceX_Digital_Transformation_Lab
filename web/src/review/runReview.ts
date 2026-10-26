import type { BaselineFile, BaselineLine, Card, Lang, Verdict } from "../types";

export type ClauseCard = {
  id: string;
};

export type Quote = {
  n: number;
  text: string;
};

export type TraceStep =
  | {
      kind: "baseline";
      project: string;
      revision: string;
      lineCount: number;
      quote: Quote;
    }
  | {
      kind: "clauses";
      ids: string[];
    }
  | {
      kind: "check";
      id: string;
      clauseId: string;
      quiet: boolean;
      quotes: Quote[];
    }
  | {
      kind: "second-reader";
      id: string;
      clauseId: string;
      verdict: Verdict;
      note: Record<Lang, string>;
    }
  | {
      kind: "done";
      agreed: number;
      disputed: number;
    };

export type FiredCheck = {
  id: string;
  clauseId: string;
  verdict: Verdict;
  quotes: Quote[];
  note: Record<Lang, string>;
};

export type ReviewResult = {
  steps: TraceStep[];
  fired: FiredCheck[];
};

const OPENED = [
  "ECSS-E-ST-10C Rev.1",
  "ECSS-E-ST-10-02C Rev.1",
  "ECSS-E-ST-10-03C Rev.1",
  "ECSS-Q-ST-30C Rev.1",
  "ECSS-Q-ST-70C Rev.2",
] as const;

type Check = {
  id: string;
  documentId: (typeof OPENED)[number];
  clause: string;
  scan: (lines: BaselineLine[]) => BaselineLine[];
  verdict: Verdict;
  note: Record<Lang, string>;
};

const CHECKS: Check[] = [
  {
    id: "F-01",
    documentId: "ECSS-E-ST-10-02C Rev.1",
    clause: "5.2.1e",
    scan: emptyVerification,
    verdict: "agree",
    note: {
      en: "Second reader accepts the finding.",
      pt: "O segundo leitor aceita a constatação.",
    },
  },
  {
    id: "F-02",
    documentId: "ECSS-Q-ST-70C Rev.2",
    clause: "4.4a",
    scan: missingContaminationControl,
    verdict: "agree",
    note: {
      en: "Second reader accepts the finding.",
      pt: "O segundo leitor aceita a constatação.",
    },
  },
  {
    id: "F-03",
    documentId: "ECSS-E-ST-10-03C Rev.1",
    clause: "4.5.2a",
    scan: launchTestsNotApplicable,
    verdict: "agree",
    note: {
      en: "Second reader accepts the finding.",
      pt: "O segundo leitor aceita a constatação.",
    },
  },
  {
    id: "F-04",
    documentId: "ECSS-Q-ST-30C Rev.1",
    clause: "6.4.2.2a",
    scan: reliabilityWithoutFmea,
    verdict: "dispute",
    note: {
      en: "ECSS-Q-ST-30C Rev.1, 6.4.2.2a requires the analysis and does not require a second camera.",
      pt: "A ECSS-Q-ST-30C Rev.1, 6.4.2.2a exige a análise e não exige uma segunda câmara.",
    },
  },
];

export function runReview(baseline: BaselineFile, clauses: ClauseCard[]): ReviewResult {
  const ids = loadOpenedClauses(clauses);
  const projectLine = baseline.lines.find((line) => /^Project\s+Lumen-1\b/.test(line.text));
  if (!projectLine) {
    throw new Error("The loaded baseline does not name Lumen-1.");
  }

  const steps: TraceStep[] = [
    {
      kind: "baseline",
      project: "Lumen-1",
      revision: baseline.revision,
      lineCount: baseline.lines.length,
      quote: { n: projectLine.n, text: projectLine.text },
    },
    { kind: "clauses", ids },
  ];

  const fired: FiredCheck[] = [];
  for (const check of CHECKS) {
    if (!ids.includes(check.documentId)) {
      steps.push({ kind: "check", id: check.id, clauseId: check.documentId, quiet: true, quotes: [] });
      continue;
    }
    const clauseId = `${check.documentId}, ${check.clause}`;
    const hits = uniqueLines(check.scan(baseline.lines));
    if (hits.length === 0) {
      steps.push({ kind: "check", id: check.id, clauseId, quiet: true, quotes: [] });
      continue;
    }
    const quotes = hits.map((line) => ({ n: line.n, text: line.text }));
    steps.push({ kind: "check", id: check.id, clauseId, quiet: false, quotes });
    steps.push({
      kind: "second-reader",
      id: check.id,
      clauseId,
      verdict: check.verdict,
      note: check.note,
    });
    fired.push({ id: check.id, clauseId, verdict: check.verdict, quotes, note: check.note });
  }

  const disputed = fired.filter((item) => item.verdict === "dispute").length;
  steps.push({ kind: "done", agreed: fired.length - disputed, disputed });
  assertTraceIsSafe(steps);
  return { steps, fired };
}

export function findingCardsFor(result: ReviewResult, cards: Card[]): Card[] {
  const byId = new Map(cards.map((card) => [card.id, card]));
  return result.fired.map((item) => {
    const card = byId.get(item.id);
    if (!card) throw new Error(`No pitch card for ${item.id}.`);
    if (card.clauseId !== item.clauseId) {
      throw new Error(`${item.id} clause ${item.clauseId} does not match the pitch card.`);
    }
    return {
      ...card,
      lineNumbers: item.quotes.map((quote) => quote.n),
      verdict: item.verdict,
    };
  });
}

function loadOpenedClauses(clauses: ClauseCard[]): string[] {
  const ids = clauses.map((card) => card.id);
  const extra = ids.filter((id) => !OPENED.includes(id as (typeof OPENED)[number]));
  const missing = OPENED.filter((id) => !ids.includes(id));
  if (extra.length > 0 || missing.length > 0 || ids.length !== OPENED.length) {
    throw new Error("The review loads only the five opened clause cards.");
  }
  return [...OPENED];
}

function emptyVerification(lines: BaselineLine[]): BaselineLine[] {
  return lines.filter((line) => /method:\s*none\b/i.test(line.text) || /\bno method\b/i.test(line.text));
}

function missingContaminationControl(lines: BaselineLine[]): BaselineLine[] {
  const gaps = lines.filter((line) =>
    /no cleanliness|no contamination|screened for outgassing|no outgassing/i.test(line.text),
  );
  if (gaps.length === 0) return [];
  const bench = lines.filter((line) => /assemble on a clean bench/i.test(line.text));
  return [...gaps, ...bench];
}

function launchTestsNotApplicable(lines: BaselineLine[]): BaselineLine[] {
  return lines.filter(
    (line) => /not applicable/i.test(line.text) && /vibration|shock|acoustic|launch/i.test(line.text),
  );
}

function reliabilityWithoutFmea(lines: BaselineLine[]): BaselineLine[] {
  const recordsFmea = lines.some(
    (line) => /\bFMEA\b/.test(line.text) && !/\b(no|none|nenhuma)\b/i.test(line.text),
  );
  if (recordsFmea) return [];
  const numbers = lines.filter((line) => /reliab/i.test(line.text) && /\b0[.,]\d+/.test(line.text));
  if (numbers.length === 0) return [];
  const denial = lines.filter((line) =>
    /no failure-modes|failure modes and effects analysis:\s*none/i.test(line.text),
  );
  return [...numbers, ...denial];
}

function uniqueLines(lines: BaselineLine[]): BaselineLine[] {
  const seen = new Set<number>();
  return lines
    .filter((line) => {
      if (seen.has(line.n)) return false;
      seen.add(line.n);
      return true;
    })
    .sort((a, b) => a.n - b.n);
}

function assertTraceIsSafe(steps: TraceStep[]): void {
  const text = JSON.stringify(steps);
  const banned = [/payload user/i, /user's guide/i, /guia do utilizador/i, /guia de rideshare/i, /load factor/i];
  for (const pattern of banned) {
    if (pattern.test(text)) {
      throw new Error("The review cited a rideshare-guide section or a load.");
    }
  }
}
