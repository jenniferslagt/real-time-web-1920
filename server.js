var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// const markers = [];
// const randomColor

// Add a namespace which assigns different endpoints or paths. 
// Within this namespace, you can add channels to separate or minimalize the number of TCP connections
// You can define different channels that sockets can join and leave within the namespace
// Use .to to broadcast or emit messages

// create a namespace with the .of method and set up a connection
// io.of('/noord-holland').on("connection", socket => {
//     console.log("a user connected on noord-holland", socket.id);
//     socket.emit("welcome", "hello and welcome")
// })

// Make a event when a user is connected
io.on("connection", socket => {

    // socket.on("join-room", room => {
    //     socket.join(room)
    // })
    console.log("a new user connected", socket.id)

    socket.on("draw-route", position => {
        socket.broadcast.emit("draw-route", position);
    });

});


http.on('listening', function () {
    console.log('ok, server is running');
});

http.listen(process.env.PORT || 8181, function () {
    console.log("listening on *:8181");
});