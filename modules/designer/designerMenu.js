const {
	dialog
} = require('electron');

let helperMenu = require('../core/helperMenu');
let menu = [{
	label: 'File',
	submenu: [{
		label: 'New presentation',
		accelerator: 'CmdOrCtrl+N',
		click: function (item, focusedWindow) {
			focusedWindow.send('ps:newFile');
		}
	}, {
		label: 'Open presentation',
		accelerator: 'CmdOrCtrl+O',
		click: (item, focusedWindow) => {
			dialog.showOpenDialog({
				properties: ['openFile'],
				filters: [{
					name: 'Presentron Presentation File',
					extensions: ['ppf']
				}, {
					name: 'JSON',
					extensions: ['json']
				}]
			}, function (file) {
				if (file) {
					console.log(`Opening file ${file}`);
					focusedWindow.send('ps:openFile', file);
				}
			})
		}
	}]
}]

module.exports = menu.concat(helperMenu);
