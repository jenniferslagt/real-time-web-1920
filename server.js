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

io.on("connection", socket => {
    for (let i = 0; i < markers.length; i++) {
        socket.emit("marker", markers[i]);
    }
    socket.on("marker", data => {
        markers.push(data);
        io.emit("marker", data);
    });
});


http.listen(process.env.PORT || 3000, function () {
    console.log("listening on *:3000");
});