const { app, BrowserWindow, ipcMain, screen, Menu } = require("electron");
const fs = require("fs");
const path = require("path");

if (typeof process.getuid === "function" && process.getuid() === 0) {
  app.commandLine.appendSwitch("no-sandbox");
}
app.commandLine.appendSwitch("enable-transparent-visuals");
app.commandLine.appendSwitch("force-device-scale-factor", "1");

Menu.setApplicationMenu(null);

const session = { locale: "en", notes: [] };
let mainWindow = null;
let widgetWindow = null;

const indexHtml = path.join(__dirname, "../dist/index.html");
const preload = path.join(__dirname, "preload.cjs");

function webPreferences() {
  return {
    preload,
    contextIsolation: true,
    nodeIntegration: false,
    sandbox: false,
  };
}

function broadcast() {
  for (const win of BrowserWindow.getAllWindows()) {
    if (!win.isDestroyed()) win.webContents.send("session:changed", session);
  }
}

function createMain() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1440,
    minHeight: 900,
    show: false,
    frame: false,
    backgroundColor: "#0e0d0b",
    hasShadow: false,
    roundedCorners: false,
    title: "Astrea",
    useContentSize: true,
    webPreferences: webPreferences(),
  });
  mainWindow.loadFile(indexHtml);
  mainWindow.once("ready-to-show", () => {
    mainWindow.setContentSize(1440, 900);
    mainWindow.show();
    mainWindow.focus();
  });
}

function placeWidget() {
  const area = screen.getPrimaryDisplay().workArea;
  const width = 340;
  const height = 520;
  return {
    x: Math.round(area.x + area.width - width - 16),
    y: Math.round(area.y + area.height - height - 16),
    width,
    height,
  };
}

function createWidget() {
  if (widgetWindow && !widgetWindow.isDestroyed()) {
    widgetWindow.show();
    widgetWindow.focus();
    return;
  }
  widgetWindow = new BrowserWindow({
    ...placeWidget(),
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    skipTaskbar: true,
    hasShadow: true,
    title: "Astrea",
    webPreferences: webPreferences(),
  });
  widgetWindow.setAlwaysOnTop(true, "floating");
  widgetWindow.loadFile(indexHtml, { query: { surface: "widget" } });
  widgetWindow.once("ready-to-show", () => widgetWindow.showInactive());
  widgetWindow.on("closed", () => {
    widgetWindow = null;
  });
}

function cleanNote(note) {
  const next = {
    id: String(note.id),
    kind: note.kind === "log" ? "log" : "question",
    text: String(note.text).slice(0, 8000),
    at: typeof note.at === "string" ? note.at : new Date().toISOString(),
  };
  if (typeof note.intent === "string") next.intent = note.intent.slice(0, 40);
  if (typeof note.attachmentName === "string" && note.attachmentName.trim()) {
    next.attachmentName = note.attachmentName.trim().slice(0, 240);
  }
  if (typeof note.reply === "string") next.reply = note.reply.slice(0, 16000);
  return next;
}

ipcMain.handle("session:get", () => session);
ipcMain.handle("session:patch", (_event, patch) => {
  if (patch && (patch.locale === "en" || patch.locale === "pt")) session.locale = patch.locale;
  if (patch && patch.note && typeof patch.note.id === "string" && typeof patch.note.text === "string") {
    const note = cleanNote(patch.note);
    const index = session.notes.findIndex((item) => item.id === note.id);
    if (index >= 0) {
      const next = session.notes.slice();
      next[index] = { ...next[index], ...note };
      session.notes = next;
    } else if (note.text.trim()) {
      session.notes = [...session.notes, note];
    }
  }
  broadcast();
  return session;
});

function readApiKey() {
  const file = path.join(__dirname, "..", ".env");
  let raw = "";
  try {
    raw = fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    if (trimmed.slice(0, eq).trim() !== "XAI_API_KEY") continue;
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    return value.trim();
  }
  return "";
}

const SYSTEM_PROMPT = `You are Astrea, speaking inside a desktop tool for one mission.

Lumen-1 is a 6U optical camera, a Falcon 9 rideshare piggyback. The open review is PDR. The next review is CDR. The review order is MCR, SRR, MDR, SDR, PDR, CDR, PRR, TRR, SAR, ORR, FRR. Earlier reviews are not passed. Do not mark them passed.

Only these findings are opened:

F-01, agreed, critical. Missing verification method for REQ-IMG-03, on-orbit modulation transfer of at least 0.15 at Nyquist. ECSS-E-ST-10-02C Rev.1 5.2.1e requires method, product level, and stage in the verification matrix. 5.2.2.1a lists test, analysis, review of design, or inspection. ECSS-E-ST-10C Rev.1 5.2.3.4a and 5.2.3.4b require the method on the requirement and in the matrix. No procedure is on the register. Do not invent one that closes REQ-IMG-03.

F-02, agreed, critical. Missing contamination and outgassing control on the optic. ECSS-Q-ST-70C Rev.2 4.4a requires a contamination and cleanliness control programme. 4.4c applies because the optic is contamination-critical. 5.1.4b requires outgassing screening. 5.1.4c requires every organic material, including the silicone stake, to be evaluated. No procedure on the register closes this.

F-03, agreed, critical. Missing qualification against the rideshare mechanical environment. ECSS-E-ST-10-03C Rev.1 4.5.2a asks for qualification evidence in the intended environments, with qualification margins, on a qualification model or under a protoflight approach. 4.5.1b puts launch-segment compatibility in the test programme. 5.1b treats a camera as electronic (type a) and optical (type i). Table 5-1, via 5.2a, marks sinusoidal vibration and shock as required for both, and random vibration as required for the electronic type. None of those tests is planned. The SpaceX rideshare payload user's guide is not opened. Do not state a section, a load, or a vibration number.

F-04, in dispute. Reliability is asserted with no FMEA. REQ-REL-01 states 0.95 over two years. ECSS-Q-ST-30C Rev.1 6.4.2.2a requires an FMEA, or a FMECA when criticality is included. 6.4.2.2b requires the analysis to name potential failure modes and class them. The clause requires the analysis, not a second camera. A person decides. Do not close the dispute.

How to answer:

A general question gets a real answer. That includes an acronym or a definition when the user does not name a specific document, table, or clause. Explain the term. Do not answer a general question with only "It is not opened." That reply by itself is not allowed.

If the user names a specific ECSS document, table, or clause, answer from the four findings above only when that document, table, or clause is already written in F-01, F-02, F-03, or F-04. Otherwise the whole reply is exactly: "That document was not opened." Do not add a title, a table number, columns, criteria, a paraphrase, or any other sentence. Explaining the term does not apply. Do not describe the table.

Do not cite ECSS-Q-ST-70-08, ECSS-Q-ST-70-01, ECSS-Q-ST-70-02, or ECSS-Q-ST-30-02 as if they were read. They are not among the opened findings.

A question about whether Lumen-1 complies uses only the four findings above. If the asked standard is not one of those findings, say the project was not checked against it. If that question also names a document, table, or clause outside those findings, use "That document was not opened." and do not describe it.

For Lumen-1, do not invent a clause number, an ISO pass, or a rideshare load. ISO was not checked for this project, so do not call it a pass and do not attach an ISO clause to the mission. The rideshare guide was not opened, so do not state a section or a load for this camera. None of that stops you from explaining a general term that names no document, table, or clause.

Be concise.`;

function calmMissing(locale) {
  return locale === "pt" ? "A chave não está definida." : "The key is not set.";
}

function calmFail(locale) {
  return locale === "pt" ? "A Astrea não conseguiu responder agora." : "Astrea could not answer just now.";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reveal(sender, id, text) {
  let built = "";
  const step = 12;
  for (let i = 0; i < text.length; i += step) {
    if (sender.isDestroyed()) return built;
    const token = text.slice(i, i + step);
    built += token;
    sender.send("chat:token", { id, token });
    await sleep(18);
  }
  if (!sender.isDestroyed()) sender.send("chat:done", { id, reply: built });
  return built;
}

function historyTurns(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (turn) =>
        turn &&
        (turn.role === "user" || turn.role === "assistant") &&
        typeof turn.content === "string" &&
        turn.content.trim(),
    )
    .slice(-12)
    .map((turn) => ({ role: turn.role, content: turn.content.slice(0, 8000) }));
}

function imageData(attachment) {
  const url = attachment && attachment.dataUrl;
  return typeof url === "string" && url.startsWith("data:image/") && url.length > 32 && url.length < 4_000_000
    ? url
    : "";
}

function userContent(text, attachment) {
  const lines = [];
  if (text) lines.push(text);
  if (attachment && typeof attachment.name === "string" && attachment.name.trim()) {
    const name = attachment.name.trim().slice(0, 180);
    if (attachment.kind === "text" && typeof attachment.text === "string" && attachment.text.trim()) {
      lines.push(`File ${name}: ${attachment.text.replace(/\s+/g, " ").trim().slice(0, 6000)}`);
    } else {
      lines.push(attachment.kind === "image" ? `Image attached: ${name}` : `File attached: ${name}`);
    }
  }
  const contentText = lines.join("\n").slice(0, 12000);
  const picture = attachment && attachment.kind === "image" ? imageData(attachment) : "";
  if (picture) {
    return {
      pictured: true,
      content: [
        { type: "text", text: contentText || attachment.name },
        { type: "image_url", image_url: { url: picture } },
      ],
    };
  }
  return { pictured: false, content: contentText || " " };
}

function messagesFor(request) {
  const locale = request.locale === "pt" ? "pt" : "en";
  const built = userContent(typeof request.text === "string" ? request.text.trim().slice(0, 8000) : "", request.attachment);
  const messages = [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}\n\nAnswer in ${locale === "pt" ? "Portuguese" : "English"}.`,
    },
    ...historyTurns(request.history),
    { role: "user", content: built.content },
  ];
  const plain = userContent(
    typeof request.text === "string" ? request.text.trim().slice(0, 8000) : "",
    request.attachment ? { ...request.attachment, kind: "file", dataUrl: undefined } : undefined,
  );
  return { locale, messages, pictured: built.pictured, plainMessages: messages.slice(0, -1).concat([{ role: "user", content: plain.content }]) };
}

async function readReply(response, sender, id, locale) {
  if (!response.ok || !response.body) {
    await reveal(sender, id, calmFail(locale));
    return;
  }
  const type = response.headers.get("content-type") || "";
  if (!type.includes("text/event-stream")) {
    const json = await response.json().catch(() => null);
    const text = json && json.choices && json.choices[0] && json.choices[0].message && json.choices[0].message.content;
    await reveal(sender, id, typeof text === "string" && text.trim() ? text : calmFail(locale));
    return;
  }
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let reply = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split(/\n/);
    buffer = parts.pop() || "";
    for (const line of parts) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const data = trimmed.slice(5).trim();
      if (!data || data === "[DONE]") continue;
      let json = null;
      try {
        json = JSON.parse(data);
      } catch {
        json = null;
      }
      const token = json && json.choices && json.choices[0] && json.choices[0].delta && json.choices[0].delta.content;
      if (typeof token === "string" && token && !sender.isDestroyed()) {
        reply += token;
        sender.send("chat:token", { id, token });
      }
    }
  }
  if (!reply.trim()) {
    await reveal(sender, id, calmFail(locale));
    return;
  }
  if (!sender.isDestroyed()) sender.send("chat:done", { id, reply });
}

const CHAT_MODEL = "grok-4";
const CHAT_MODEL_FALLBACK = "grok-4.7";

function keyRejected(locale) {
  return locale === "pt" ? "A chave foi recusada." : "The key was rejected.";
}

function redact(text, key) {
  let out = String(text || "");
  if (key) out = out.split(key).join("[redacted]");
  out = out.replace(/xai-[A-Za-z0-9_-]{6,}/g, "[redacted]");
  out = out.replace(/Bearer\s+\S+/gi, "Bearer [redacted]");
  return out.replace(/\s+/g, " ").trim().slice(0, 500);
}

function modelRejected(status, message, model) {
  const text = String(message || "").toLowerCase();
  if (/api key|unauthorized|permission|quota|rate limit/.test(text)) return false;
  if (model && text.includes(String(model).toLowerCase()) && /model|not found|does not exist|unknown|unsupported|invalid/.test(text)) {
    return true;
  }
  if (/model[_ -]?not[_ -]?found|unknown[_ -]?model|invalid[_ -]?model|no such model/.test(text)) return true;
  if (status === 404 && /model/.test(text)) return true;
  return /model/.test(text) && /(not found|does not exist|unknown|unsupported|unavailable|no such)/.test(text);
}

async function postChat(messages, key, model) {
  return fetch("https://api.x.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ model, stream: true, messages }),
    signal: AbortSignal.timeout(180000),
  });
}

async function failureDetail(response, key) {
  const raw = await response.text().catch(() => "");
  let message = "";
  try {
    const json = JSON.parse(raw);
    if (typeof json.error === "string") message = json.error;
    else if (json.error && typeof json.error.message === "string") message = json.error.message;
    else if (typeof json.message === "string") message = json.message;
    else if (typeof json.code === "string" && !message) message = json.code;
  } catch {
    message = raw;
  }
  return { status: response.status, message: redact(message, key) };
}

function failureLine(detail, locale) {
  if (detail.status === 401) return keyRejected(locale);
  return detail.message ? `${detail.status} ${detail.message}` : String(detail.status);
}

ipcMain.on("chat:ask", (event, request) => {
  const sender = event.sender;
  const id = request && typeof request.id === "string" ? request.id : "";
  const locale = request && request.locale === "pt" ? "pt" : "en";
  if (!id) return;
  void (async () => {
    const key = readApiKey();
    if (!key) {
      await reveal(sender, id, calmMissing(locale));
      return;
    }
    try {
      const built = messagesFor(request);
      let model = CHAT_MODEL;
      let response = await postChat(built.messages, key, model);
      if (!response.ok) {
        const detail = await failureDetail(response, key);
        if (detail.status === 401) {
          await reveal(sender, id, keyRejected(locale));
          return;
        }
        if (modelRejected(detail.status, detail.message, model)) {
          model = CHAT_MODEL_FALLBACK;
          response = await postChat(built.messages, key, model);
        } else if (built.pictured) {
          response = await postChat(built.plainMessages, key, model);
        } else {
          await reveal(sender, id, failureLine(detail, locale));
          return;
        }
      }
      if (!response.ok && built.pictured && model === CHAT_MODEL_FALLBACK) {
        response = await postChat(built.plainMessages, key, model);
      }
      if (!response.ok) {
        const detail = await failureDetail(response, key);
        await reveal(sender, id, failureLine(detail, locale));
        return;
      }
      await readReply(response, sender, id, locale);
    } catch (err) {
      if (sender.isDestroyed()) return;
      const message = redact(err && err.message ? err.message : "", key);
      const name = err && err.name ? err.name : "Error";
      await reveal(sender, id, message ? `${name}: ${message}` : name);
    }
  })();
});

ipcMain.on("window:close", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win?.close();
});

ipcMain.on("window:minimize", (event) => {
  BrowserWindow.fromWebContents(event.sender)?.minimize();
});

ipcMain.on("window:zoom", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  if (!win) return;
  if (win.isMaximized()) win.unmaximize();
  else win.maximize();
});

ipcMain.on("widget:show", () => createWidget());

app.whenReady().then(() => {
  createMain();
});

app.on("window-all-closed", () => {
  app.quit();
});
