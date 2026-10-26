import { readFileSync } from "node:fs";
import { runReview } from "./runReview.ts";
import type { BaselineFile } from "../types.ts";
import type { ClauseCard } from "./runReview.ts";

const baseline = readJson<BaselineFile>("../data/baseline.json");
const clauses = readJson<ClauseCard[]>("../data/clauses.json");

const stage = runReview(baseline, clauses);
const fired = stage.fired.map((item) => `${item.id}:${item.verdict}`).join(",");
if (fired !== "F-01:agree,F-02:agree,F-03:agree,F-04:dispute") {
  fail(`stage was ${fired}`);
}
if (stage.fired.some((item) => item.quotes.length === 0)) fail("a fired check has no project line");
const dispute = stage.fired[3];
if (!dispute || !dispute.note.en.includes("does not require a second camera")) {
  fail("F-04 dispute note is missing");
}

const corrected: BaselineFile = {
  ...baseline,
  lines: baseline.lines.map((line) =>
    line.n === 17 || line.n === 21 ? { ...line, text: "REQ-IMG-03 verification method: Test. Level: Equipment. Stage: Qualification." } : line,
  ),
};
const quiet = runReview(corrected, clauses);
if (quiet.fired.some((item) => item.id === "F-01")) fail("a filled verification method still fired");
if (quiet.fired.map((item) => item.id).join(",") !== "F-02,F-03,F-04") {
  fail(`quiet check changed other findings: ${quiet.fired.map((item) => item.id).join(",")}`);
}

const withFmea: BaselineFile = {
  ...baseline,
  lines: baseline.lines.map((line) =>
    line.n === 32 ? { ...line, text: "FMEA: detector, controller, and power feed, with the accepted mission effect of each." } : line,
  ),
};
const fmea = runReview(withFmea, clauses);
if (fmea.fired.some((item) => item.id === "F-04")) fail("an FMEA still left the reliability check open");

process.stdout.write("stage checks ok\n");

function readJson<T>(relativePath: string): T {
  return JSON.parse(readFileSync(new URL(relativePath, import.meta.url), "utf8")) as T;
}

function fail(message: string): never {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}
