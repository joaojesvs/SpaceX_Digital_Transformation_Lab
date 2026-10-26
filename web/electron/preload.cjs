const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("astraea", {
  getSession: () => ipcRenderer.invoke("session:get"),
  patchSession: (patch) => ipcRenderer.invoke("session:patch", patch),
  onSession: (listener) => {
    const channel = (_event, snapshot) => listener(snapshot);
    ipcRenderer.on("session:changed", channel);
    return () => ipcRenderer.removeListener("session:changed", channel);
  },
  close: () => ipcRenderer.send("window:close"),
  minimize: () => ipcRenderer.send("window:minimize"),
  zoom: () => ipcRenderer.send("window:zoom"),
  showWidget: () => ipcRenderer.send("widget:show"),
  ask: (request, onToken, onDone) => {
    const tokenChannel = (_event, payload) => {
      if (payload && payload.id === request.id && typeof payload.token === "string") onToken(payload.token);
    };
    const doneChannel = (_event, payload) => {
      if (payload && payload.id === request.id && typeof payload.reply === "string") onDone(payload.reply);
    };
    ipcRenderer.on("chat:token", tokenChannel);
    ipcRenderer.on("chat:done", doneChannel);
    ipcRenderer.send("chat:ask", request);
    return () => {
      ipcRenderer.removeListener("chat:token", tokenChannel);
      ipcRenderer.removeListener("chat:done", doneChannel);
    };
  },
});
