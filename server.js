const express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


http.listen(3000, function () {
    console.log('listening on port 3000');
});




const users = {}


io.on(("connection"), function (socket) {
    console.log('new user ');
    // socket.emit('chat-message', "Hello world")
    socket.on('new-user', function (name) {
        users[users.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    socket.on('send-chat-message', function (message) {
        socket.broadcast.emit('chat-message', {
            message: message,
            name: users[socket.id]
        })
        socket.on('disconnect', function () {
            broadcast.emit('user-disconnected', users[socket.id])
            delete users[users.id]
        })
    })
})