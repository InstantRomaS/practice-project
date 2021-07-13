import { weatherAPIKEY, weatherApiUrl, insertIcon, weathersearchAPIUrl, form1, search, defaultCity, forecast, cityNameElement, temperatureEl, windEl, iconEl } from './consts.js';

import { createForecastSection } from './utils.js';


fetch(`${weatherApiUrl}?q=${defaultCity}&lang=ru&units=metric${weatherAPIKEY}`)
    .then((resp) => resp.json())
    .then((data) => {
        console.log(data);
        cityNameElement.innerHTML = data.name;
        temperatureEl.innerHTML = Math.round(data.main.temp) + '&degC';
        windEl.innerHTML = data.weather[0].description;
        iconEl.innerHTML = insertIcon(data.weather[0]['icon']);
    })
    .catch((err) => {
        console.log(err);
    });

form1.addEventListener("submit", (e) => {
    forecast.innerHTML = "";
    e.preventDefault();
    let searchCity = search.value;
    if (!searchCity) return;
    if (searchCity) {
        if (searchCity.match(/[0-9]/)) {
            search.classList.add('search-err');
            return;
        } else {
            if (search.classList.contains('search-err')) {
                search.classList.remove('search-err');
            }
        }

    }

    fetch(`${weathersearchAPIUrl}?q=${searchCity}&lang=ru&units=metric&day=5${weatherAPIKEY}`)
        .then((resp) => resp.json())
        .then((respData) => {
            console.log(respData);
            createForecastSection(respData);
            const { city: { coord: { lat, lon } } } = respData;
            console.log(lat, lon);
            // BuildMap(lat, lon);
        })
        .then(() => {
            let position = 0;
            const slidesToShow = 3;
            const slidesToScroll = 1;
            const sliderTrack = document.querySelector('.il');
            const btnPrev = document.querySelector('.btn_prev');
            const btnNext = document.querySelector('.btn_next');
            const items = document.querySelectorAll('.weatherDaily');
            const itemsCount = items.length;
            const container = document.querySelector('.slider-container');
            const itemWidth = container.clientWidth / slidesToShow;
            const movePosition = slidesToScroll * itemWidth;
            items.forEach((item) => {
                item.style.minWidth = `${itemWidth}px`;
            })

            btnNext.addEventListener('click', () => {
                const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

                position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
                console.log(position);
                SetPosition();
                checkBtns();
            })

            btnPrev.addEventListener('click', () => {
                const itemsLeft = Math.abs(position) / itemWidth;

                position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
                console.log(position);
                SetPosition();
                checkBtns();

            })

            const SetPosition = () => {
                sliderTrack.style.transform = `translateX(${position}px)`;
            }
            
            const checkBtns = () => {
                btnPrev.disabled = position === 0;
                btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    if (searchCity) {
        search.value = "";
    }
});

function BuildMap(Lat, Lon) {
    document.getElementById('map').innerHTML = "<div id='map'></div>";
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttribution = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
            ' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        osmLayer = new L.TileLayer(osmUrl, { maxZoom: 18, attribution: osmAttribution });
    var map = new L.Map('map');

    map.setView(new L.LatLng(Lat, Lon), 9);
    map.addLayer(osmLayer);
    var map = L.map('map').setView([Lat, Lon], 12);
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=lO2bKDOssVK4qXhl3eit', {
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
    }).addTo(map);
}
