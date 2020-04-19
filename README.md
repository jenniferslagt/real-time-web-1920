## App



## Description



## What is socket.IO?
Socket.io is a JavaScript framework for real time web applications. This enables communication between the server and the web clients. This means that the server can push messages to clients. 
Socket.IO enables real-time, bidirectional and event-based communication. It works on every platform, browser or device, focusing equally on reliability and speed.

For example, you can make a basic chat app. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients.

So the main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do, and binary data is supported too.

## Installing socket.io
Socket.IO is composed of two parts:
* A server that integrates with (or works on) the Node.JS HTTP Server: socket.io
* A client library that loads on the browser side: socket.io-client

During development, socket.io serves the client automatically for us, so for now we only have to install one module:
` npm install socket.io `

That will install the module and add the dependency to package.json. Now I added this to the main file (server.js) to import Socket.IO:
` const io = require('socket.io')(http); `


## Here API


## Data life cycle


## Sources 
[Socket.IO](https://socket.io/)
