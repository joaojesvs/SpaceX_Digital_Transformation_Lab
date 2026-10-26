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
});
