var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
require('dotenv').config();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

const routeRooms = ["walking route", "cycle route", "car route"];

// Store the data of the users
const userList = [];
const user = {};
const markerList = [];

// Generate a random color for each user
const randomColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);


// with namespaces you change the path (or route), to separate the connections 
// to create a namespace and acces, you have to use the of method
io.of("/drawroute").on("connection", socket => {

    socket.emit("welcome", "hello and welcome to the games area")

    socket.on("joinRoom", room => {
        // before joining a room, check if the game does exist on the list 
        // the includes method takes any string and checks if it exists
        if (routeRooms.includes(room)) {
            socket.join(room)

            // Use the io library, this is broadcasting to the whole thing (instead of the only socket)
            // Acces the namespace and then the room, this is must when you want to acces the socket
            io.of("/drawroute").in(room).emit("newUser", "new player has joined the" + room)
            io.of("/drawroute").in(room).emit("rooms", routeRooms)
            io.of("/drawroute").in(room).emit("random-color", randomColor)


            // Share the route with other sockets
            for (let i = 0; i < markerList.length; i++) {
                socket.emit("draw-route", markerList[i]);
            }

            socket.on("draw-route", data => {
                markerList.push(data);
                io.of("/drawroute").in(room).emit("draw-route", data);
                user.markerList = markerList;
                console.log("user list", userList)
                io.of("/drawroute").in(room).emit("user-list", userList);

            });

            // Add data to the userList to store all the data of the users
            user.id = socket.id;
            user.color = randomColor;
            console.log("user", user)
            userList.push(user);

            return socket.emit("succes", "you have succesfully joines this room" + room)
        } else {
            return socket.emit("err", "ERROR no room named" + room)
        }

    })

    // socket.disconnect();

})



http.on('listening', function () {
    console.log('yay, server is running');
});

http.listen(process.env.PORT || 3333, function () {
    console.log("listening on *:3333");
});


// Here some import notes which can be helpfull:
// *  Socket.io picks the name and creates actually a room for you
// *  The in method sends an event to all the user including the "new" socket
// *  The of method sends an event ot all the users excluding the "new" socket