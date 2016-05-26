require(['modules/requireModuleConfig'], function () {
	require(['knockout', 'domReady!'], function (ko) {
		ko.applyBindings({
			Title: 'Ko is working!'
		});
	});
});

// $(function () {
//
// 	window.$ = window.jQuery = require('../lib/jquery-2.2.4.min.js');
//
// 	const BrowserWindow = require('electron').remote.BrowserWindow;
// 	const ipc = require('electron').ipcRenderer;
//
// 	var _vm ={
//
// 	}
//
// 	ipc.on('ps:openFile', function(event, arg) {
// 		$('body').append(`File opened ${arg}`);
// 	});
// });
