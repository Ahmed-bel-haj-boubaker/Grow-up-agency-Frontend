// electron/main.js
// eslint-disable-next-line no-undef
const { app, BrowserWindow } = require("electron");
// eslint-disable-next-line no-undef
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // eslint-disable-next-line no-undef
  const startURL = process.env.IS_DEV
    ? "http://localhost:5173"
    // eslint-disable-next-line no-undef
    : `file://${path.join(__dirname, "../dist/index.html")}`;
  win.loadURL(startURL);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  // eslint-disable-next-line no-undef
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
