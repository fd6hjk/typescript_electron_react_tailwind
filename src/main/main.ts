import { app, BrowserWindow } from "electron";
import isDev from "electron-is-dev";
import { join } from "path";

app.whenReady().then(() => {
  const win = new BrowserWindow();
  if(isDev) {
    win.loadURL("http://localhost:3000");
  } else {
    win.loadFile(join(__dirname, "..", "/renderer/index.html"));
  }
});

app.on("window-all-closed", () => {
  if(process.env.platform !== "darwin") {
    app.quit();
  }
})
