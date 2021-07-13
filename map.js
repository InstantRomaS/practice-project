// import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
// import 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
let mapContainer = 'map';
var map = L.map(mapContainer).setView([0,0], 1);
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=lO2bKDOssVK4qXhl3eit', {
            attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        }).addTo(map);
