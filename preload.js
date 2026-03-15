const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("frameDesktop", {
  isElectron: true,
  openDeviceEmulation: (payload) => ipcRenderer.invoke("frame:open-device-emulation", payload),
});
