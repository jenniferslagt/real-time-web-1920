// Draw map
const platform = new H.service.Platform({
    "app_id": "fz16h8uAyopsUA8WDaso",
    "app_code": "APP_CODE_HERE"
});


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
    const marker = new H.map.Marker(data);
    map.addObject(marker);
});

map.addEventListener("tap", event => {
    const position = map.screenToGeo(
        event.currentPointer.viewportX,
        event.currentPointer.viewportY
    );
    const marker = new H.map.Marker(position);
    map.addObject(marker);
    socket.emit("marker", position);
});

// Add lines between the marker
function addPolylineToMap(map) {
    var lineString = new H.geo.LineString();

    lineString.pushPoint({
        lat: 53.3477,
        lng: -6.2597
    });
    lineString.pushPoint({
        lat: 51.5008,
        lng: -0.1224
    });
    lineString.pushPoint({
        lat: 48.8567,
        lng: 2.3508
    });
    lineString.pushPoint({
        lat: 52.5166,
        lng: 13.3833
    });

    map.addObject(new H.map.Polyline(
        lineString, {
            style: {
                lineWidth: 4
            }
        }
    ));
}

addPolylineToMap(map);



console.log('haaloooo')