"use strict";

// A simple socket.io server that writes all messages to the console
// To run: node server <port>

var port = process.argv[2];

if (!port) {
    console.log("usage node server <port>");
}

var io = require('socket.io').listen(port);

io.on('connection', socket => {
    socket.on('message', msg => console.log(`received: ${msg}`));
});

console.log(`listening on ${port}...`);