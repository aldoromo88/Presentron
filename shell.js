const ipc = nodeRequire('electron').ipcRenderer;
ipc.on('shell:load', function (event, arg) {
	let view;
	let viewModel;

	if (typeof arg == 'string') {
		view = 'text!' + arg + 'View.html';
		viewModel = arg + 'ViewModel';
	} else {
		view = 'text!' + arg.view + '.html';
		viewModel = arg.viewModel;
	}

	require(['requireModuleConfig'], function () {
		require(['knockout', viewModel, view], function (ko, vm, v) {
			document.body.innerHTML = v;
			ko.applyBindings(vm);
		});
	});
});
