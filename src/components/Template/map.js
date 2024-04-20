var map = L.map("map").setView([33.7883266, 2.8499703], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
var TruckIcon = L.icon({
  iconUrl:
    "https://res.cloudinary.com/doszhdiv2/image/upload/v1712198394/truck_Image_04adf952fa.png",
  iconSize: [50, 80], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
});
const handleCurrentPosition = (Longitude, Latitude) => {
  L.marker([Latitude, Longitude]).addTo(map).bindPopup("Client").openPopup();
};
handleCurrentPosition(2.8499944, 33.7882821);
const handleDestinationPosition = (Longitude, Latitude) => {
  L.marker([Latitude, Longitude]).addTo(map).bindPopup("Client").openPopup();
};
handleDestinationPosition(3.252878, 34.671476);
L.marker([33.806304, 2.880231], { icon: TruckIcon })
  .addTo(map)
  .bindPopup("Trucker")
  .openPopup();
var geocoder = L.Control.geocoder({ defaultMarkGeocode: false })
  .on("markgeocode", function (e) {
    var latlan = e.geocode.center;
    L.marker(latlan).addTo(map).bindPopup(e.geocode.name).openPopup();
    map.fitBounds(e.geocode.bbox);
  })
  .addTo(map);
L.Routing.control({
  waypoints: [L.latLng(33.7883266, 2.8499703), L.latLng(33.748803, 2.794505)],
  lineOptions: {
    styles: [
      {
        color: "green",
      },
    ],
  },
}).addTo(map);
