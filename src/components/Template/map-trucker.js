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
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.2.1/axios.min.js"></script>
<script>

const handleRequest = async (lat, long) => {
    try {
        const response = await axios.get("http://192.168.42.12:1337/api/aproved-truckers");
        const truckerLocations = response.data.data
            .filter(trucker => trucker.attributes.Online === true)
            .map(trucker => ({
                name: trucker.attributes.firstname +"-"+ trucker.attributes.lastname  +"_"+ trucker.id,
                lat: trucker.attributes.Location.lat,
                long: trucker.attributes.Location.long,
            }));
        displayMap(lat, long, truckerLocations);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayMap = (lat, long, truckerLocations) => {
    const map = L.map("map").setView([lat, long], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const truckIcon = L.icon({
        iconUrl: "https://res.cloudinary.com/doszhdiv2/image/upload/v1712198394/truck_Image_04adf952fa.png",
        iconSize: [50, 80],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
    });

    for (const location of truckerLocations) {
        L.marker([location.lat, location.long], { icon: truckIcon })
            .addTo(map)
            .bindPopup(location.name)
            .openPopup();
    }

    // Call handleClientPosition to add client's position marker
    handleClientPosition(lat, long, map);
}

const handleClientPosition = (lat, long, map) => {
    const clientMarker = L.marker([lat, long]).addTo(map).bindPopup("Your Position").openPopup();
    return clientMarker;
}

// Example usage
// handleRequest(33.783237, 2.846313);

</script>

</html>
`;
export default MapComponentHTML;
