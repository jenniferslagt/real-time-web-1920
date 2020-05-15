const drawRoute = "http://localhost:3333/drawroute"
const localhost = "http://localhost:3333"
const socket = io(drawRoute);
// to show the content of the namespace, add the name of the space after the path
// for example: const socket = io("http://localhost:5555/games");

// Let the user choose what kind of route they want to draw
let room;

const walkRouteRoom = "walking route";
const cycleRouteRoom = "cycle route";
const carRouteRoom = "car route";

const roomContainer = document.getElementById("room-container")
const walkRoomBtn = document.getElementById("walk-room")
const cycleRoomBtn = document.getElementById("cycle-room")
const carRoomBtn = document.getElementById("car-room")

if (walkRoomBtn.checked == true) {
    room = walkRouteRoom;
} else if (cycleRoomBtn.checked == true) {
    room = cycleRouteRoom;
} else {
    room = carRouteRoom;
}

const headingTwo = document.querySelector("h2");
headingTwo.innerText = "I would like to do a .. " + room;

// choose which you the sockets wants to join by adding the name after the event
let chosenRoom = JSON.stringify(room)
socket.emit("joinRoom", "car route")
console.log("chosen room:", chosenRoom)

socket.on("newUser", res => {
    console.log("new user", res)
})

socket.on("err", error => {
    console.log("error:", error)
})

socket.on("succes", res => {
    console.log("succes", res)
})

let array = [];

// Draw a route 
socket.on("draw-route", data => {
    // array.push(data);
    addMarkerToMap(data);

    addPolylineToMap(map);

});

// Import the user list from the server
socket.on("user-list", list => {
    console.log("User list", list)
    let markerPositions = list.map(element => {
        // Get the list with markerpositions
        return element.markerList
    });
    console.log("nieuwe list?", markerPositions)
})


// Use your key to acces the API
const platform = new H.service.Platform({
    "apikey": "fz16h8uAyopsUA8WDaso",
    "app_code": "APP_CODE_HERE"
});

// Display a map 
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

// Give acces to zoom in or out
const mapEvent = new H.mapevents.MapEvents(map);
const behavior = new H.mapevents.Behavior(mapEvent);

// Make a empty array with the locations of the markers
let markerLocation = [];

map.addEventListener("tap", event => {
    const position = map.screenToGeo(
        event.currentPointer.viewportX,
        event.currentPointer.viewportY
    );
    addMarkerToMap(position);
    addPolylineToMap(map);
    calculateDistance();
    socket.emit("draw-route", position);
    socket.emit("marker-list-user", markerLocation)

    const selectParagraph = document.getElementById("distance");
    selectParagraph.innerText = "Your roadtrip will be " +
        calculatedTotalDistance + " km!";
});


// Add a marker to the map and the markerLocations array
function addMarkerToMap(position) {
    const marker = new H.map.Marker(position);
    map.addObject(marker);

    let latitude = position.lat;
    let longitude = position.lng;
    markerLocation.push({
        latitude,
        longitude
    });
}

socket.on("random-color", color => {
    console.log("color", color)
})

// Add lines between the markers
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
                strokeColor: "red"
            }
        }
    ));
}

// Make a variable which is calculating the route in km
let calculatedTotalDistance = 0;

function calculateDistance() {
    const markerLength = markerLocation.length;
    markerLocation.map((distance, index) => {
        // console.log('check deze', distance, index)
        if (index < markerLength - 1) {
            const currentDistance = distance;
            const nextDistance = markerLocation[index + 1];
            calculatedTotalDistance += getDistanceFromLatLonInKm(currentDistance.latitude, currentDistance.longitude, nextDistance.latitude, nextDistance.longitude);
            console.log("Total distance:", calculatedTotalDistance + "km");
        }
    })
}

// calculate the distance based on the position of the markers
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Math.round(Number(d.toFixed(1)) + 1)
}

// Short formule which calculates the circle (arc) of the earth
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}