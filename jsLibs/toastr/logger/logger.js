define([], function () {

    // This logger wraps the toastr logger and also logs to console
    // toastr.js is library by John Papa that shows messages in pop up toast.
    // https://github.com/CodeSeven/toastr

    toastr.options.timeOut = 4000; // 4 second toast timeout
    toastr.options.positionClass = 'toast-top-right';

    function error(e) {

		if(_.isString(e)){
			toastr.error(e);
			return;
		}

		if(_.has(e,'HuboErrores')){
			operationResponse(e);
			return;
		}


		if(_.has(e,'status')){
			if(e.status == 0){
				toastr.error('Sin conexión con el servidor remoto', 'Error');
			}else{
				toastr.error('Code: '+ e.status + '. '+ e.statusText,'Error');
			}
		}
    }

    function info(message, title) {
        toastr.info(message, title);
        log("Info: " + message);
    }

    function success(message, title) {
        toastr.success(message, title);
        log("Success: " + message);
    }

    function warning(message, title) {
        toastr.warning(message, title);
        log("Warning: " + message);
    }

    function exception(e) {
        
        toastr.error(e.message, e.name);
        log(e.name + ' : ' + e.message);
    }

    function operationResponse(response) {
        if (response.HuboErrores) {
            warning(response.MensajeError);
        } else {
            success(response.MensajeError);
        }
        return response;
    }


    // IE and google chrome workaround
    // http://code.google.com/p/chromium/issues/detail?id=48662
    function log() {
        console.log(arguments);
    }

    return {
        error: error,
        info: info,
        success: success,
        warning: warning,
        log: log, // straight to console; bypass toast
        operationResponse: operationResponse,
        exception: exception
    }
});
