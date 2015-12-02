var SERVER_PORT = 3000,

    express     = require('express'),
    expressApp  = express(),

    server      = require('http').Server(expressApp),
    io          = require('socket.io')(server);

//configure Express to default web requests to /www/ folder
expressApp.use(express.static(__dirname));

io.on('connection', function (socket) {
    socket.on('message', function (r, g, b) {
        console.log([ r, g, b ]);

        //TODO: possibly construct the JavaScript function entirely in Java?
        var evalStr = '(' + fn + ')(' + r + ', ' + g + ', ' + b + ')';

        io.emit('ide_request', evalStr);
    });
});

io.on('message', function (data) {
    console.log('io::message -- ' + data);
});

server.listen(SERVER_PORT, function () {
    console.log('Please open your Sencha application in the browser...');
});


var fn = function (r, g, b) {
    Fashion.setVariables({
        '$base_color' : '#' + r + g + b
    });
};