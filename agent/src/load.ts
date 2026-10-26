import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyDocument } from "./slice.ts";
import type {
  Baseline,
  Card,
  Config,
  FieldValue,
  LibraryAccess,
  MatchCondition,
  RideshareConstraints,
  SkippedCard,
  Text,
} from "./types.ts";

const PROSE_LIMIT = 4500;

export function packageRoot(): string {
  return resolve(dirname(fileURLToPath(import.meta.url)), "..");
}

export function resolveLibrary(config: Config): LibraryAccess {
  return {
    mode: "committed-cards",
    driveFolderUrl: config.driveFolderUrl,
    contacted: false,
  };
}

export function loadConfig(root: string): Config {
  const file = join(root, "config.json");
  const raw = parseJson(file);
  if (!isRecord(raw)) fail(file, "config must be an object");
  const keys = Object.keys(raw);
  if (keys.length !== 1 || keys[0] !== "driveFolderUrl") {
    fail(file, "config.json has a single field, driveFolderUrl");
  }
  if (typeof raw.driveFolderUrl !== "string") fail(file, "driveFolderUrl must be a string");
  return { driveFolderUrl: raw.driveFolderUrl };
}

export function loadBaseline(root: string): Baseline {
  const file = join(root, "data", "baseline.json");
  const raw = parseJson(file);
  if (!isRecord(raw)) fail(file, "baseline must be an object");
  const mission = readText(raw.mission, file, "mission");
  const configuration = readStringMap(raw.configuration, file, "configuration");
  if (!Array.isArray(raw.lines)) fail(file, "lines must be an array");
  const lines = raw.lines.map((line, index) => readLine(line, file, index));
  if (typeof raw.id !== "string" || raw.id === "") fail(file, "id is required");
  if (typeof raw.name !== "string" || raw.name === "") fail(file, "name is required");
  return { id: raw.id, name: raw.name, mission, configuration, lines };
}

export function loadRideshare(root: string): RideshareConstraints {
  const file = join(root, "data", "rideshare.json");
  const raw = parseJson(file);
  if (!isRecord(raw)) fail(file, "rideshare constraints must be an object");
  if (typeof raw.id !== "string" || raw.id === "") fail(file, "id is required");
  if (typeof raw.document !== "string" || raw.document === "") fail(file, "document is required");
  return {
    id: raw.id,
    document: raw.document,
    summary: readText(raw.summary, file, "summary"),
  };
}

export function loadCards(dir: string): { cards: Card[]; skipped: SkippedCard[] } {
  let names: string[];
  try {
    names = readdirSync(dir);
  } catch {
    fail(dir, "card directory cannot be read");
  }
  const cards: Card[] = [];
  const skipped: SkippedCard[] = [];
  for (const name of names.sort()) {
    if (!name.endsWith(".json")) continue;
    const file = join(dir, name);
    if (!statSync(file).isFile()) continue;
    const card = readCard(file);
    const decision = classifyDocument(card.document, card.topic, card.id);
    if (decision.kind === "refused") {
      skipped.push({
        file: name,
        document: card.document,
        reason: "refused",
        detail: decision.topic,
      });
      continue;
    }
    if (decision.kind === "out-of-slice") {
      skipped.push({
        file: name,
        document: card.document,
        reason: "out-of-slice",
        detail: "outside the locked standards slice",
      });
      continue;
    }
    cards.push(card);
  }
  return { cards, skipped };
}

function readCard(file: string): Card {
  const raw = parseJson(file);
  if (!isRecord(raw)) fail(file, "card must be an object");
  const id = readId(raw.id, file);
  const demoOrder = raw.demoOrder;
  if (typeof demoOrder !== "number" || !Number.isInteger(demoOrder)) fail(file, "demoOrder must be an integer");
  const document = readShort(raw.document, file, "document");
  const clause = readShort(raw.clause, file, "clause");
  const topic = readShort(raw.topic, file, "topic");
  if (raw.domain !== "ecss-applicability") fail(file, "domain must be ecss-applicability");
  const match = readMatch(raw.match, file);
  let environmentRef: string | undefined;
  if (raw.environmentRef !== undefined) {
    environmentRef = readShort(raw.environmentRef, file, "environmentRef");
  }
  let libraryAnchor: string | undefined;
  if (raw.libraryAnchor !== undefined) {
    libraryAnchor = readProse(raw.libraryAnchor, file, "libraryAnchor");
  }
  let supportingClauses: string | undefined;
  if (raw.supportingClauses !== undefined) {
    supportingClauses = readProse(raw.supportingClauses, file, "supportingClauses");
  }
  let launchConstraint: string | undefined;
  if (raw.launchConstraint !== undefined) {
    launchConstraint = readShort(raw.launchConstraint, file, "launchConstraint");
  }
  if (raw.cardStatus !== "ready") fail(file, "cardStatus must be ready");
  const second = raw.secondAuditor;
  if (!isRecord(second)) fail(file, "secondAuditor is required");
  if (second.stance !== "agree" && second.stance !== "dispute") {
    fail(file, "secondAuditor.stance must be agree or dispute");
  }
  return {
    id,
    demoOrder,
    document,
    clause,
    topic,
    domain: "ecss-applicability",
    match,
    environmentRef,
    libraryAnchor,
    supportingClauses,
    launchConstraint,
    cardStatus: "ready",
    whyCritical: readText(raw.whyCritical, file, "whyCritical"),
    recommendedChange: readText(raw.recommendedChange, file, "recommendedChange"),
    secondAuditor: {
      stance: second.stance,
      note: readText(second.note, file, "secondAuditor.note"),
    },
  };
}

function readLine(value: unknown, file: string, index: number): Baseline["lines"][number] {
  if (!isRecord(value)) fail(file, `lines[${index}] must be an object`);
  const id = readId(value.id, file);
  if (typeof value.section !== "string" || value.section === "") fail(file, `${id} section is required`);
  if (!isRecord(value.fields)) fail(file, `${id} fields must be an object`);
  const fields: Record<string, FieldValue> = {};
  for (const [key, field] of Object.entries(value.fields)) {
    if (typeof field === "string" || typeof field === "boolean" || field === null) {
      fields[key] = field;
    } else {
      fail(file, `${id} field ${key} must be a string, boolean, or null`);
    }
  }
  return { id, section: value.section, text: readText(value.text, file, id), fields };
}

function readMatch(value: unknown, file: string): Card["match"] {
  if (!isRecord(value)) fail(file, "match must be an object");
  if (typeof value.section !== "string" || value.section === "") fail(file, "match.section is required");
  if (!Array.isArray(value.all) || value.all.length === 0) fail(file, "match.all must be a non-empty array");
  const all = value.all.map((condition) => readCondition(condition, file));
  return { section: value.section, all };
}

function readCondition(value: unknown, file: string): MatchCondition {
  if (!isRecord(value)) fail(file, "match condition must be an object");
  if (typeof value.field !== "string" || value.field === "") fail(file, "match.field is required");
  if (value.op === "missing") return { field: value.field, op: "missing" };
  if (value.op === "equals") {
    if (typeof value.value !== "string" && typeof value.value !== "boolean") {
      fail(file, "match.equals value must be a string or boolean");
    }
    return { field: value.field, op: "equals", value: value.value };
  }
  fail(file, "match.op must be missing or equals");
}

function readText(value: unknown, file: string, label: string): Text {
  if (!isRecord(value)) fail(file, `${label} must be { en, pt }`);
  return {
    en: readProse(value.en, file, `${label}.en`),
    pt: readProse(value.pt, file, `${label}.pt`),
  };
}

function readStringMap(value: unknown, file: string, label: string): Record<string, string> {
  if (!isRecord(value)) fail(file, `${label} must be an object`);
  const out: Record<string, string> = {};
  for (const [key, entry] of Object.entries(value)) {
    if (typeof entry !== "string" || entry === "") fail(file, `${label}.${key} must be a string`);
    out[key] = entry;
  }
  return out;
}

function readId(value: unknown, file: string): string {
  if (typeof value !== "string" || !/^[a-z0-9][a-z0-9-]*$/i.test(value)) {
    fail(file, "id must be a short token");
  }
  return value;
}

function readShort(value: unknown, file: string, label: string): string {
  if (typeof value !== "string" || value.trim() === "" || value.length > 180) {
    fail(file, `${label} must be a short string`);
  }
  return value.trim();
}

function readProse(value: unknown, file: string, label: string): string {
  if (typeof value !== "string" || value.trim() === "" || value.length > PROSE_LIMIT) {
    fail(file, `${label} must be original prose under ${PROSE_LIMIT} characters`);
  }
  return value.trim();
}

function parseJson(file: string): unknown {
  try {
    return JSON.parse(readFileSync(file, "utf8")) as unknown;
  } catch {
    fail(file, "invalid JSON");
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function fail(file: string, message: string): never {
  throw new Error(`${file}: ${message}`);
}
