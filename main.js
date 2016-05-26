// var requirejs = require('requirejs');
//
// requirejs.config({
//     baseUrl: `${__dirname}/modules/`,
//     nodeRequire: require
// });


const {
	app,
	BrowserWindow,
	globalShortcut,
	Menu,
	ipcMain
} = require('electron');

const browseWindowHelper = require('./infraestructure/browseWindowHelper');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let winControls;
let winDesigner;
let winViewers = [];

function toggleControlsWindow() {
	if (winControls) {
		if (winDesigner || winViewers.length) {
			winControls.close();
		}
		return;
	}
	winControls = browseWindowHelper('presentationControls/pc');
	winControls.on('closed', () => {
		winControls = null;
	});
}


function createDesignerWindow() {

	while (winViewers.length) {
		winViewers[0].close();
	}

	if (winDesigner) { //If winDesigner already exists just show window;
		winDesigner.show();
		return;
	}
	winDesigner = browseWindowHelper('designer/designer');
	winDesigner.on('closed', () => {
		winDesigner = null;
	});
}

function createPresentationWindow() {
	if (winDesigner) {
		winDesigner.hide();
	}

	var presentationWindow = new BrowserWindow({
		width: 400,
		height: 300
	});
	presentationWindow.loadURL(`file://${__dirname}/modules/presentationViewer/pvView.html`);
	winViewers.push(presentationWindow);
	presentationWindow.on('closed', (event) => {
		var index = winViewers.indexOf(event.sender);
		if (index > -1) {
			winViewers.splice(index, 1);
		}

		if (!winViewers.length) {
			createDesignerWindow();
		}
	});
}

function registerShorcuts() {
	globalShortcut.register('CmdOrCtrl+Shift+C', toggleControlsWindow);
}

function init() {
	registerShorcuts();
	createDesignerWindow();

	ipcMain.on('pc:newPresentationViewer', createPresentationWindow);
	ipcMain.on('pc:showDesigner', createDesignerWindow);

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (winDesigner === null) {
		createDesignerWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

app.on('will-quit', function () {
	globalShortcut.unregisterAll()
})

app.on('browser-window-created', function (e, window) {
	//window.setMenu(null);
});
