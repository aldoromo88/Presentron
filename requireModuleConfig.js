require.config({
    baseUrl: 'modules/',
    paths: {
        lib: '../jsLibs',
        text: '../jsLibs/require/text',
        css: '../jsLibs/require/css',
        domReady: '../jsLibs/require/domReady',
        logger:'../jsLibs/toastr/logger/logger',
        knockout: '../jsLibs/knockout/knockout'
    },

    //urlArgs: window.isDebug ? undefined : "bust=" + (new Date()).getTime()

});

require.nodeRequire = nodeRequire;
