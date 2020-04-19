var app = require('express')();
const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);

// app.use(Express.static(__dirname + '/public'));
// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/public/index.html');
// });

Http.listen(3000, () => {
    console.log("Listening at :3000...");
});

// Store the info of a merker is a array 
const markers = [];

Socketio.on("connection", socket => {
    for (let i = 0; i < markers.length; i++) {
        socket.emit("marker", markers[i]);
    }
    socket.on("marker", data => {
        markers.push(data);
        Socketio.emit("marker", data);
    });
});