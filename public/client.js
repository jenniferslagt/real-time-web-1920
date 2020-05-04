const platform = new H.service.Platform({
    "app_id": "fz16h8uAyopsUA8WDaso",
    "app_code": "APP_CODE_HERE"
});

// Draw a map
const map = new H.Map(
    document.getElementById("map"),
    platform.createDefaultLayers().normal.map, {
        zoom: 10,
        center: {
            lat: 52.3667,
            lng: 4.8945
        }
    }
);
const mapEvent = new H.mapevents.MapEvents(map);
const behavior = new H.mapevents.Behavior(mapEvent);

const socket = io("http://localhost:3000");

// Draw a marker when the users "taps"
socket.on("marker", data => {
    const marker = new H.map.Marker(data, {
        strokeColor: "red"
    });
    map.addObject(marker);
});

// Add an undo button
// var body = document.querySelector("body");
// var undoButton = document.createElement('button');
// undoButton.innerText = "reset"
// body.appendChild(undoButton);

// undoButton.addEventListener("click", event => {
//     console.log('CLICK')
//     // markerLocation.pop()
//     location.reload();
// })


let markerLocation = [];
let color = 'red'

const redBtn = document.getElementById("red-btn");
redBtn.addEventListener("click", event => {
    color = 'red'
});
const pinkBtn = document.getElementById("pink-btn");
pinkBtn.addEventListener("click", event => {
    color = 'pink'
});
const blueBtn = document.getElementById("blue-btn");
blueBtn.addEventListener("click", event => {
    color = 'blue'
});
const greenBtn = document.getElementById("green-btn");
greenBtn.addEventListener("click", event => {
    color = 'green'
});
const yellowBtn = document.getElementById("yellow-btn");
yellowBtn.addEventListener("click", event => {
    color = 'yellow'
});
const blackBtn = document.getElementById("black-btn");
blackBtn.addEventListener("click", event => {
    color = 'black'
});


map.addEventListener("tap", event => {
    const position = map.screenToGeo(
        event.currentPointer.viewportX,
        event.currentPointer.viewportY
    );

    const marker = new H.map.Marker(position);
    map.addObject(marker);
    socket.emit("marker", position);

    let latitude = position.lat;
    let longitude = position.lng;
    markerLocation.push({
        latitude,
        longitude
    });

    // Add lines between the marker
    function addPolylineToMap(map) {
        const lineString = new H.geo.LineString();
        markerLocation.forEach(location => {
            lineString.pushPoint({
                lat: location.latitude,
                lng: location.longitude
            });
        })

        map.addObject(new H.map.Polyline(
            lineString, {
                style: {
                    lineWidth: 4,
                    strokeColor: color
                }
            }
        ));
    }
    addPolylineToMap(map);

});






// Calculate the distance between the polylines
const tracyMarker = new H.map.Marker({
    lat: 37.7397,
    lng: -121.4252
});

const stocktonMarker = new H.map.Marker({
    lat: 37.9577,
    lng: -121.2908
});

const distance = tracyMarker.getPosition().distance(stocktonMarker.getPosition())
console.log("afstand in meters", distance)