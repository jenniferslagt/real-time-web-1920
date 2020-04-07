const io = require("socket.io")(3000);

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