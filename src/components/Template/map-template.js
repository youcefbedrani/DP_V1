import React from "react";

const MapComponentHTML = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Display a map</title>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css" />
    <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <style>
        body {
            margin: 0;
            padding: 0;
        }

        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>

<body>
    <div id="map"></div>
</body>
<script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
    integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM=" crossorigin=""></script>
<script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle"></script>
<script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
<script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"></script>
<script>
var map = L.map("map").setView([33.7883266, 2.8499703], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var TruckIcon = L.icon({
    iconUrl: "https://res.cloudinary.com/doszhdiv2/image/upload/v1712198394/truck_Image_04adf952fa.png",
    iconSize: [50, 80], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});

const handleTruckerPosition = (location) => {
    L.marker([location.lat, location.lang], {icon: TruckIcon}).addTo(map).bindPopup("TruckerPosition").openPopup();
};

// handleTruckerPosition(2.881027 , 33.804185);
// handleTruckerPosition(2.860971 , 33.788849);
// handleTruckerPosition(2.824269 , 33.764146);
// handleTruckerPosition(2.843275 , 33.794743);


var routingControl = null;
var routing;
var lastMarker = null;
var data = {};

const handleDestinationPosition = (Longitude, Latitude) => {

    if (lastMarker) {
        map.removeLayer(lastMarker);
    }

    var newMarker = L.marker([Latitude, Longitude]).addTo(map).bindPopup("Your Position").openPopup();
    lastMarker = newMarker;

    var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
    })
    .on("markgeocode", function(e) {
        var latlan = e.geocode.center;

        if (lastMarker) {
            map.removeLayer(lastMarker);
        }

        var newMarker = L.marker(latlan).addTo(map).bindPopup("Distination").openPopup();
        lastMarker = newMarker;

        map.fitBounds(e.geocode.bbox);

        data["data"] = e.geocode.name;

        // manageHistory(data);

        // Check if routing control already exists
        if (routingControl) {
            map.removeControl(routingControl);
            routingControl = null;
        }

        routing = L.Routing.control({
            waypoints: [L.latLng(latlan.lat, latlan.lng), L.latLng(Latitude, Longitude)],
            lineOptions: {
                styles: [{
                    color: "green",
                    weight: 5
                }, ],
            },
            routeWhileDragging: false,
            geocoder: L.Control.Geocoder.nominatim(),
        }).addTo(map);

        // Store reference to routing control
        routingControl = routing;

        routingControl.on('routesfound', function(e) {
            var routes = e.routes;
            var summary = routes[0].summary;
            // alert distance and time in km and minutes
            data["distance"] = summary.totalDistance / 1000 ;
            data["duration"] = Math.round(summary.totalTime % 3600 / 60) ;

            sendDataToReactNativeApp(JSON.stringify(data));
            // sendDistanceToReactNativeApp(summary.totalDistance / 1000 + ' km ' + Math.round(summary.totalTime % 3600 / 60) + ' minutes');
         });
    })
    .addTo(map);
};

const sendDistanceToReactNativeApp = async (place) => {
    try {
        window.ReactNativeWebView.postMessage("Distance"+place);
    } catch (error) {
        console.error('Error:', error);
        window.ReactNativeWebView.postMessage('Error occurred while fetching data');
    }
};

const sendDataToReactNativeApp = async (place) => {
    try {
        window.ReactNativeWebView.postMessage(place);
    } catch (error) {
        console.error('Error:', error);
        window.ReactNativeWebView.postMessage('Error occurred while fetching data');
    }
};

const manageHistory = (place) => {
    try {
        window.ReactNativeWebView.postMessage("History"+place);
    } catch (error) {
        console.error('Error:', error);
        window.ReactNativeWebView.postMessage('Error occurred while fetching data');
    }
};

// const handleShowOnMap = (Longitude, Latitude) => {
//     L.marker([Latitude, Longitude]).addTo(map).bindPopup("New ClientPosition Show on map  ").openPopup();
// }

        // const handleDestinationPosition = (Longitude, Latitude) => {
        //     L.marker([Latitude, Longitude]).addTo(map).bindPopup("ClientDestinition").openPopup();
        // };
</script>

</html>
`;
export default MapComponentHTML;
