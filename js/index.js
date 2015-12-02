var SERVER_PORT = 3000,

    express     = require('express'),
    expressApp  = express(),

    server      = require('http').Server(expressApp),
    io          = require('socket.io')(server);

//configure Express to default web requests to /www/ folder
expressApp.use(express.static(__dirname));

io.on('connection', function (socket) {
    socket.on('message', function(msg) {
        console.log('socket::message -- ' + msg);
    });
});

io.on('message', function(data) {
    console.log('io::message -- ' + data);
});

server.listen(SERVER_PORT, function () {
    console.log('Please open your Sencha application in the browser...');
});


var fn = function () {
    var num = function() {
        return Math.floor(Math.random() * 10);
    };

    var r = num(),
        g = num(),
        b = num();

    Fashion.setVariables({
        '$base_color' : '#' + r + g + b
    });

    //We have to send variables as strings into the inspected window, so we need to JSON encode our data
    //however, we also need to escape the quote marks to avoid quirky runtime errors
    //Ext.String.htmlEncode(Ext.JSON.encode(data));
};

setInterval(function () {
    var evalStr = '(' + fn + ')()';

    io.emit('ide_request', evalStr);
}, 5000);