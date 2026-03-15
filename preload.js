const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("frameDesktop", {
  isElectron: true,
});
