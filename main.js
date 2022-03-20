const { app, BrowserWindow, ipcMain, nativeTheme } = require("electron");

function createWindow() {
	const win = new BrowserWindow({
		width: 600,
		height: 150,
		resizable: false,
		icon: "./assets/clock_Y5v_icon.ico",
		backgroundColor: "#312450",
		show: false,
	});

	//win.webContents.openDevTools();  debug mode

	win.loadFile("countdown.html");

	win.removeMenu();

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

	win.once("ready-to-show", () => {
		win.show();
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
