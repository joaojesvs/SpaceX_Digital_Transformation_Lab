import { spawn, execFileSync } from "node:child_process";
import { createConnection } from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const port = 4731;
const url = `http://127.0.0.1:${port}/`;

function which(cmd) {
  try {
    return execFileSync("which", [cmd], { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function waitForPort() {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = () => {
      const socket = createConnection({ port, host: "127.0.0.1" }, () => {
        socket.end();
        resolve();
      });
      socket.on("error", () => {
        socket.destroy();
        if (Date.now() - started > 20000) {
          reject(new Error("The presentation server did not start."));
          return;
        }
        setTimeout(attempt, 150);
      });
    };
    attempt();
  });
}

function openFullscreen(target) {
  if (process.platform === "darwin") {
    const child = spawn(
      "open",
      ["-a", "Google Chrome", "--args", "--new-window", "--start-fullscreen", target],
      { detached: true, stdio: "ignore" },
    );
    child.on("error", () => {
      console.log(`\nOpen ${target} and press F for fullscreen.\n`);
    });
    child.unref();
    return;
  }

  if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", "chrome", "--start-fullscreen", target], {
      detached: true,
      stdio: "ignore",
    }).unref();
    return;
  }

  const bin = ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].find(which);
  if (!bin) {
    console.log(`\nOpen ${target} and press F for fullscreen.\n`);
    const opener = which("xdg-open");
    if (opener) spawn(opener, [target], { detached: true, stdio: "ignore" }).unref();
    return;
  }

  const child = spawn(bin, ["--new-window", "--start-fullscreen", target], {
    detached: true,
    stdio: "ignore",
  });
  child.on("error", () => {
    console.log(`\nOpen ${target} and press F for fullscreen.\n`);
  });
  child.unref();
}

const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js");
const vite = spawn(
  process.execPath,
  [viteBin, "--host", "127.0.0.1", "--port", String(port), "--strictPort"],
  { cwd: root, stdio: "inherit" },
);

waitForPort()
  .then(() => openFullscreen(url))
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
  });

function stop() {
  vite.kill("SIGTERM");
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
vite.on("exit", (code) => process.exit(code ?? 0));
