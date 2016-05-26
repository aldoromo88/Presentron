define(['knockout'], function (ko) {
	const	{ipcRenderer} = nodeRequire('electron');



	var _i = {

		//functions
		bindingCompleted:(view) =>{

		},
		newPresentationViewer: () => {
			ipcRenderer.send('pc:newPresentationViewer');
		},
		shwoDesigner: () => {
			ipcRenderer.send('pc:showDesigner');
		}
	}


	function init(){
		ipcRenderer.on('pc:showDesigner',_i.shwoDesigner);
		ipcRenderer.on('pc:newPresentationViewer',_i.newPresentationViewer);
	}

	init();
	return _i;
});
