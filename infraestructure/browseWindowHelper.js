const {
	BrowserWindow,
	Menu
} = require('electron');


module.exports = function (modulePath, options) {
	options = options || {
		width: 400,
		height: 300
	};

	win = new BrowserWindow(options);
	win.loadURL(`file://${__dirname}/../shell.html`);
	//win.toggleDevTools();

  var menuTemplate = require(`./../modules/${modulePath}Menu`);
	const menuInflated = Menu.buildFromTemplate(menuTemplate);
	win.setMenu(menuInflated);

	win.webContents.on('did-finish-load', function () {
		win.send('shell:load', modulePath);
	});

	return win;
}
