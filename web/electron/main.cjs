const { app, BrowserWindow, ipcMain, screen, Menu } = require("electron");
const path = require("path");

if (typeof process.getuid === "function" && process.getuid() === 0) {
  app.commandLine.appendSwitch("no-sandbox");
}
app.commandLine.appendSwitch("enable-transparent-visuals");

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
    width: 1180,
    height: 760,
    minWidth: 960,
    minHeight: 640,
    show: false,
    frame: false,
    transparent: true,
    backgroundColor: "#00000000",
    hasShadow: true,
    roundedCorners: true,
    title: "Astraea",
    webPreferences: webPreferences(),
  });
  mainWindow.loadFile(indexHtml);
  mainWindow.once("ready-to-show", () => {
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
    title: "Astraea",
    webPreferences: webPreferences(),
  });
  widgetWindow.setAlwaysOnTop(true, "floating");
  widgetWindow.loadFile(indexHtml, { query: { surface: "widget" } });
  widgetWindow.once("ready-to-show", () => widgetWindow.showInactive());
  widgetWindow.on("closed", () => {
    widgetWindow = null;
  });
}

ipcMain.handle("session:get", () => session);
ipcMain.handle("session:patch", (_event, patch) => {
  if (patch && (patch.locale === "en" || patch.locale === "pt")) session.locale = patch.locale;
  if (patch && patch.note && typeof patch.note.text === "string" && patch.note.text.trim()) {
    session.notes = [...session.notes, patch.note];
  }
  broadcast();
  return session;
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
  createWidget();
});

app.on("window-all-closed", () => {
  app.quit();
});
