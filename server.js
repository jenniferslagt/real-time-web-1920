var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

const randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
const userList = [];

const markers = [];
const user = [];
const users = [];

// Make a event when a user is connected
io.on("connection", socket => {

    // the event name is "message" en het output is hello world
    // socket.emit("message", "hello world")

    // get the event with the data from the client on the server
    // socket.on("test-message", message => {
    //     console.log("This is the test message", message)
    // })


    for (let i = 0; i < markers.length; i++) {
        socket.emit("draw-route", markers[i]);
    }

    socket.on("draw-route", data => {
        markers.push(data);


        io.emit("draw-route", data);
    });

    user.push(['id:', socket.id, 'color:', 'red', ]);
    console.log(user)
    const obj = Object.fromEntries(user);
    console.log("object", obj)
    users.push
});


http.on('listening', function () {
    console.log('ok, server is running');
});

http.listen(process.env.PORT || 5555, function () {
    console.log("listening on *:5555");
});