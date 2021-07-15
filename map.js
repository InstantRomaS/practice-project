// let mapContainer = 'map';
// var map = L.map(mapContainer).setView([0, 0], 1);
// L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=lO2bKDOssVK4qXhl3eit', {
//     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
// }).addTo(map);

export function BuildMap(Lat, Lon) {
    document.getElementById('searchMap').innerHTML = "<div id='map'></div>";
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
            ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        osmLayer = new L.TileLayer(osmUrl, { maxZoom: 18, attribution: osmAttribution });
    var map = new L.Map('map');

    map.setView(new L.LatLng(Lat, Lon), 9);
    map.addLayer(osmLayer);
}