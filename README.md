## A basic chat app with a feature 
![Schermafbeelding 2020-04-10 om 10 42 09](https://user-images.githubusercontent.com/45489420/78977201-07e37480-7b18-11ea-9930-1a2be7cdbca8.png)


## Description
A basic chat app made with Node.js and Socket.io. I also added a extra feature: if a user sends a chat message, there will append a random emoji, which can affect the meaning of a message.


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


## Sources 
[Socket.IO](https://socket.io/)


<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜  -->


