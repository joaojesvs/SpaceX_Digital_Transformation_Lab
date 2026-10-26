import { audit } from "./audit.ts";
import { formatReport } from "./format.ts";
import { loadBaseline, loadCards, loadConfig, loadRideshare, packageRoot, resolveLibrary } from "./load.ts";
import { classifyDocument, PLANTED, REFUSED_TOPICS } from "./slice.ts";
import type { Lang } from "./types.ts";
import { join } from "node:path";

const lang = readLang(process.argv);
const asJson = process.argv.includes("--json");
const root = packageRoot();
const config = loadConfig(root);
const library = resolveLibrary(config);
const probe = resolveLibrary({ driveFolderUrl: "https://drive.google.com/drive/folders/example" });
if (probe.contacted !== false || probe.mode !== "committed-cards" || library.contacted !== false) {
  fail("The demo contacted a library URL. It must stay on committed cards.");
}
assertRefusals();

const baseline = loadBaseline(root);
const rideshare = loadRideshare(root);
const { cards, skipped } = loadCards(join(root, "data", "cards"));
const report = audit({
  baseline,
  cards,
  skipped,
  rideshare,
  driveFolderUrl: library.driveFolderUrl,
});

const problems = checkPlanted(report);
if (asJson) {
  process.stdout.write(JSON.stringify(report, null, 2) + "\n");
} else {
  process.stdout.write(formatReport(report, lang) + "\n");
}

if (problems.length > 0) {
  for (const problem of problems) process.stderr.write(`Demo check failed: ${problem}\n`);
  process.exit(1);
}

const summary = `Demo check passed: 3 agreed, 1 in dispute, traceability clear. Refused topics: ${REFUSED_TOPICS.join(", ")}.`;
if (asJson) process.stderr.write(summary + "\n");
else process.stdout.write("\n" + summary + "\n");

function readLang(argv: string[]): Lang {
  const index = argv.indexOf("--lang");
  const value = index === -1 ? "en" : argv[index + 1];
  if (value === "en" || value === "pt") return value;
  fail("Use --lang en or --lang pt");
}

function assertRefusals(): void {
  const refused = [
    classifyDocument("ECSS-E-30 Part 6", "pyrotechnics", "initiators"),
    classifyDocument("ECSS-E-33-11A", "explosive devices", "charges"),
    classifyDocument("ECSS-E-ST-35C", "propulsion", "thruster"),
  ];
  if (refused.some((decision) => decision.kind !== "refused")) {
    fail("Pyrotechnics, explosives, or propulsion would enter the demo.");
  }
  const software = classifyDocument("ECSS-E-ST-40C", "flight software", "software");
  if (software.kind !== "out-of-slice") fail("Flight software was accepted outside the locked slice.");
  const verification = classifyDocument("ECSS-E-ST-10-02C Rev.1", "verification method", "verification-method");
  if (verification.kind !== "in-slice") fail("The verification standard fell out of the locked slice.");
}

function checkPlanted(report: ReturnType<typeof audit>): string[] {
  const problems: string[] = [];
  if (report.network !== false) problems.push("network flag is not false");
  const got = report.findings.map((finding) => `${finding.id}:${finding.agreement}`);
  const expected = PLANTED.map((item) => `${item.id}:${item.agreement}`);
  if (got.join(",") !== expected.join(",")) {
    problems.push(`findings were ${got.join(", ") || "(none)"}; expected ${expected.join(", ")}`);
  }
  for (const finding of report.findings) {
    if (finding.clause.trim() === "") problems.push(`${finding.id} has no clause`);
    if (finding.triggeringLine.en.trim() === "" || finding.triggeringLine.pt.trim() === "") {
      problems.push(`${finding.id} is missing a triggering line`);
    }
    if (finding.whyCritical.en.trim() === "" || finding.whyCritical.pt.trim() === "") {
      problems.push(`${finding.id} is missing why it is critical`);
    }
    if (finding.recommendedChange.en.trim() === "" || finding.recommendedChange.pt.trim() === "") {
      problems.push(`${finding.id} is missing the recommended change`);
    }
  }
  const trace = report.clear.find((item) => item.id === "requirement-traceability");
  if (!trace) problems.push("requirement traceability did not come back clear");
  if (report.cardsSkipped.some((skip) => skip.reason === "refused" && report.findings.some((finding) => finding.id === skip.file))) {
    problems.push("a refused card produced a finding");
  }
  return problems;
}

function fail(message: string): never {
  process.stderr.write(message + "\n");
  process.exit(1);
}
