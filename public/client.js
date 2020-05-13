const socket = io('http://localhost:8181');

// socket.on("welcome", data => {
//     console.log("received welcome data", data)
// })


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

// Get the data from the other clients
// const anotherMarkerLocation = [];
// Make a empty array with the locations of the markers
let markerLocation = [];

socket.on("draw-route", position => {
    // const marker = new H.map.Marker(position);
    // map.addObject(marker);

    // let latitude = position.lat;
    // let longitude = position.lng;
    // anotherMarkerLocation.push({
    //     latitude,
    //     longitude
    // });

    // console.log("another array", anotherMarkerLocation)

    // const lineString = new H.geo.LineString();
    // anotherMarkerLocation.forEach(location => {
    //     lineString.pushPoint({
    //         lat: location.latitude,
    //         lng: location.longitude
    //     });
    // })

    // map.addObject(new H.map.Polyline(
    //     lineString, {
    //         style: {
    //             lineWidth: 4,
    //             strokeColor: "blue"
    //         }
    //     }
    // ));

    console.log("andere data", position)
    addMarkerToMap(position);
    addPolylineToMap(map);
});

const mapEvent = new H.mapevents.MapEvents(map);
const behavior = new H.mapevents.Behavior(mapEvent);


let calculatedTotalDistance = 0;

const drawNewRouteBtn = document.getElementById("new-btn");
drawNewRouteBtn.addEventListener("click", event => {
    markerLocation = []
})

// Adding a marker on the place where the users clicks
map.addEventListener("tap", event => {
    const position = map.screenToGeo(
        event.currentPointer.viewportX,
        event.currentPointer.viewportY
    );
    addMarkerToMap(position);
    addPolylineToMap(map);
    calculateDistance();
    socket.emit("draw-route", position);
});

// Add a marker to the map and the markerLocations array
function addMarkerToMap(position) {
    const marker = new H.map.Marker(position);
    map.addObject(marker);
    console.log("dit de positie", position)

    let latitude = position.lat;
    let longitude = position.lng;
    markerLocation.push({
        latitude,
        longitude
    });
}

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
                strokeColor: randomColor
            }
        }
    ));
}

const colors = ["red", "orange", "yellow", "lightgreen", "green", "blue", "darkblue", "purple", "violet", "black", "grey"];
let randomColor = colors[Math.floor(Math.random() * colors.length)];

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