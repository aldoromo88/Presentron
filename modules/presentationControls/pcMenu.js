let helperMenu = require('../core/helperMenu');
let menu = [{
	label: 'Presentation',
	submenu: [{
		label: 'New presentation window',
		accelerator: 'CmdOrCtrl+P',
		click: function (item, focusedWindow) {
			focusedWindow.send('pc:newPresentationViewer');
		}
	}, {
    label: 'Designer window',
		accelerator: 'CmdOrCtrl+D',
		click: function (item, focusedWindow) {
			focusedWindow.send('pc:showDesigner');
		}
	}]
}]

module.exports = menu.concat(helperMenu);
