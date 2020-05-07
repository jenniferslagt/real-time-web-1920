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

    addMarkerToMap(data);
    addPolylineToMap(map);
});

// Make a empty array with the locations of the markers
let markerLocation = [];
let calculatedTotalDistance = 0;

// Adding events to buttons
const newBtn = document.getElementById("new-btn")
newBtn.addEventListener("click", event => {
    markerLocation = [];
})

let color = 'red'

const redBtn = document.getElementById("red-btn");
redBtn.addEventListener("click", event => {
    color = 'red'
});
const pinkBtn = document.getElementById("pink-btn");
pinkBtn.addEventListener("click", event => {
    color = '#c96bff'
});
const blueBtn = document.getElementById("blue-btn");
blueBtn.addEventListener("click", event => {
    color = 'blue'
});
const greenBtn = document.getElementById("green-btn");
greenBtn.addEventListener("click", event => {
    color = '#03fc41'
});
const yellowBtn = document.getElementById("yellow-btn");
yellowBtn.addEventListener("click", event => {
    color = 'yellow'
});
const blackBtn = document.getElementById("black-btn");
blackBtn.addEventListener("click", event => {
    color = 'black'
});

// Adding a marker on the place where the users clicks
map.addEventListener("tap", event => {
    const position = map.screenToGeo(
        event.currentPointer.viewportX,
        event.currentPointer.viewportY
    );
    console.log('markerlocaitons', markerLocation)

    addMarkerToMap(position);
    addPolylineToMap(map);
    calculateDistance();
    socket.emit("marker", position);
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

function calculateDistance() {
    const markerLength = markerLocation.length;
    console.log(markerLength)
    markerLocation.map((distance, index) => {
        // console.log('check deze', distance, index)
        if (index < markerLength - 1) {
            const currentDistance = distance;
            const nextDistance = markerLocation[index + 1];
            calculatedTotalDistance += getDistanceFromLatLonInKm(currentDistance.latitude, currentDistance.longitude, nextDistance.latitude, nextDistance.longitude);
            console.log(calculatedTotalDistance);
        }
    })
}


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

console.log('markerarray', markerLocation)
console.log('afstand in km', getDistanceFromLatLonInKm(37.7397, -121.4252, 37.9577, -121.2908));

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

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}