const {
	//BrowserWindow,
	//Menu,
	//ipcMain,
	dialog
} = require('electron');


module.exports = [{
	label: 'Help',
	submenu: [{
		label: 'About',
		click: function (item, focusedWindow) {
			if (focusedWindow) {
				const options = {
					type: 'info',
					title: 'Presentron',
					buttons: ['Ok'],
					message: 'This app has been developed by Aldo Romo @aldoromo88.'
				}
				dialog.showMessageBox(focusedWindow, options)
			}
		}
	}, {
		label: 'Toggle Developer Tools',
		visible: false,
		accelerator: (function () {
			if (process.platform === 'darwin') {
				return 'Alt+Command+I'
			} else {
				return 'Ctrl+Shift+I'
			}
		})(),
		click: function (item, focusedWindow) {
			if (focusedWindow) {
				focusedWindow.toggleDevTools();
			}
		}
	}]
}]
