const { app, BrowserWindow, ipcMain, shell } = require("electron");
const { spawn } = require("child_process");
const path = require("path");

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1680,
    height: 1100,
    minWidth: 1000,
    minHeight: 760,
    backgroundColor: "#f2efe8",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, "index.html"));

  win.webContents.setWindowOpenHandler(({ url }) => {
    return {
      action: "allow",
      overrideBrowserWindowOptions: {
        width: 1440,
        height: 960,
        autoHideMenuBar: true,
      },
    };
  });

  win.webContents.on("will-navigate", (event, url) => {
    const isLocalAppShell = url.startsWith("file://");
    if (!isLocalAppShell) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });
}

app.whenReady().then(() => {
  ipcMain.handle("frame:open-device-emulation", async (_, payload) => {
    const scriptPath = path.join(__dirname, "scripts", "playwright-emulate.mjs");
    const child = spawn(process.execPath, [scriptPath, JSON.stringify(payload)], {
      detached: true,
      stdio: "ignore",
      cwd: __dirname,
    });
    child.unref();
    return true;
  });

  createMainWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
