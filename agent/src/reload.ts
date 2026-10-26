import { join } from "node:path";
import { loadCards, loadConfig, packageRoot, resolveLibrary } from "./load.ts";
import { REFUSED_TOPICS } from "./slice.ts";

const root = packageRoot();
const cardsArg = process.argv.indexOf("--cards");
const dir = cardsArg === -1 ? join(root, "data", "cards") : process.argv[cardsArg + 1];
if (!dir) {
  process.stderr.write("Use --cards <directory> or omit it to reload agent/data/cards\n");
  process.exit(1);
}

const config = loadConfig(root);
const library = resolveLibrary(config);
const { cards, skipped } = loadCards(dir);
const accepted = [...cards].sort((a, b) => a.demoOrder - b.demoOrder || a.id.localeCompare(b.id));

process.stdout.write("Card index reloaded from committed JSON. Regulations are not read.\n");
process.stdout.write(`Directory: ${dir}\n`);
process.stdout.write(
  library.driveFolderUrl === ""
    ? "Drive folder URL: empty. Not contacted.\n"
    : `Drive folder URL: ${library.driveFolderUrl}. Not contacted.\n`,
);
process.stdout.write(`Accepted (${accepted.length}): ${accepted.map((card) => card.id).join(", ") || "(none)"}\n`);
if (skipped.length === 0) {
  process.stdout.write("Skipped: 0\n");
} else {
  process.stdout.write(`Skipped (${skipped.length}):\n`);
  for (const skip of skipped) {
    process.stdout.write(`  ${skip.file}: ${skip.reason} (${skip.detail})\n`);
  }
}
process.stdout.write(`Refused topics, never loaded: ${REFUSED_TOPICS.join(", ")}.\n`);
