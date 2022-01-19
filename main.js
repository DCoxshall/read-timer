const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");

function createWindow() {
	const win = new BrowserWindow({
		width: 600,
		height: 170,
		resizable: false,
		icon: "assets/clock.png",
	});

	win.removeMenu();

	win.loadFile("countdown.html");

	ipcMain.handle("dark-mode:toggle", () => {
		if (nativeTheme.shouldUseDarkColors) {
			nativeTheme.themeSource = "light";
		} else {
			nativeTheme.themeSource = "dark";
		}
		return nativeTheme.shouldUseDarkColors;
	});

	ipcMain.handle("dark-mode:system", () => {
		nativeTheme.themeSource = "system";
	});
}

app.whenReady().then(() => {
	createWindow();
	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") app.quit();
});
