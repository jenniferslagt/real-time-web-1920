var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


const markers = [];

// Make a event when a user is connected
io.on("connection", socket => {

    // the event name is "message" en het output is hello world
    // socket.emit("message", "hello world")

    // get the event with the data from the client on the server
    // socket.on("test-message", message => {
    //     console.log("This is the test message", message)
    // })

    for (let i = 0; i < markers.length; i++) {
        socket.emit("marker", markers[i]);
    }
    socket.on("marker", data => {
        markers.push(data);
        io.emit("marker", data);
    });
});


http.on('listening', function () {
    console.log('ok, server is running');
});

http.listen(process.env.PORT || 8181, function () {
    console.log("listening on *:8181");
});