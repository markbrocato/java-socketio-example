(function () {
    console.info('Attempting to connect to Socket.io...');

    var socketDomain = 'http://localhost:3000',
        socketIO = socketDomain + '/socket.io/socket.io.js',
        IDE_Socket;

    var afterLoad = function () {
        connect();
        console.info('Socket.io: connected!');
    };

    var load = function () {
        if (Ext.versions.extjs !== undefined) {
            Ext.Loader.loadScript({
                scope  : this,
                url    : socketIO,
                onLoad : afterLoad
            });
        }
        //Sencha Touch
        else {
            Ext.Loader.loadScriptFile(
                socketIO,
                afterLoad,
                Ext.emptyFn,
                this
            );
        }
    };

    var connect = function () {
        //establish connection to socket.io
        IDE_Socket = io(socketDomain);

        IDE_Socket.on('ide_request', eventHandler);

        IDE_Socket.on('reconnect', function () {
            console.warn('Socket.io has reconnected...');
        });
    };

    var eventHandler = function (evalString) {
        eval(evalString);
    };

    load();
})();