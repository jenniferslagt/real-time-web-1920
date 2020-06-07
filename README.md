## Draw Your Route App
![Schermafbeelding 2020-05-15 om 10 51 54](https://user-images.githubusercontent.com/45489420/82031377-1afade80-969a-11ea-9e6b-c4aba28464ea.png)

## Description
What if you could draw and ride figures on a map, based on the roads? This is the idea behind my app. A user can draw a route on the map. Thereafter, he can cycle his self-made route! How do you draw a route? If the user clicks on the map, a marker gets displayed. If a second marker is displayed, there will be a polyline between those markers, which creates a route. So you actually have to display a marker by every intersection to accomplish this.

This geolocation (longitude and lattitude) of the markers are registrated! In this way the app can calcucate the distance and the route.


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
HERE Technologies is a company that provides mapping and location data and related services to individuals and companies. They also offer a special page for developers. Before using this API, I investigated the possibilities of the API. It turns out that they offer <b> a lot </b> of cool features which can be added to an interactive map! HERE has a strong documentation which guides you through the possiblities. They also offer tutorials and examples. Besides, it's also free to make an account to use their API. 

This are the features that I used:
* Display a map at a specified location
* Adding markers on the map
* Events - Calculating a Location from a Mouse Click
* Geoshapes - Polyline on the Map


## Real-time events
If users are going to the app, they actually join each other in the same map, or let's say, the same room. They can also change the room type based on their preferences. This are the real-time events:

* <b>"joinRoom"</b>: This event determines the room of the sockets based on their preferences. The socket chooses the room on the client en this gets sends to the server.
* <b>"draw-route"</b>: This event sends the markers from the socket between the server and client. It's getting stored in the server and then it's send to all the connected clients.
* <b>"random-color"</b>: I made a color generater which sends a random color to a connected server.

## Data life cycle
I made a data life cycle to show how the data flows through my app. In this way, it can be easier to understand what happens with the data. In this data model you'll see which information is stored. 
The cycle shows how to information "flows" through the app. Based on the user events (rooms), it's determined which data goes to which client. 
<br>
![datalifecycle](https://user-images.githubusercontent.com/45489420/82030669-09fd9d80-9699-11ea-8025-f95e3410f6b5.png)

## Wishlist
* Add an undo / delete button
* Draw route together? Or separated? Or add a chat?
* Emit the color to all users?
* Add a filter? (based on the distance)
* Add database


## Sources 
[Socket.IO](https://socket.io/)

[Here: Maps API for Javascript - Guide](https://developer.here.com/documentation/maps/3.1.14.0/dev_guide/index.html)

[Here: Maps API for Javascript - Examples](https://developer.here.com/documentation/examples/maps-js)

## Credits
In the past weeks we all worked from home, because of the virus. This makes it harder to communicate and to concentrate on your work. That's why I would like to thank my fellow students, the help students and the teachers for helping me during this time.

