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

console.log('haaloooo')