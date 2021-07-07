import { weatherAPIKEY, weatherApiUrl, insertIcon, weathersearchAPIUrl, form1, search, defaultCity, forecast, cityNameElement, temperatureEl, windEl, iconEl} from './consts.js';

import {createForecastSection} from './utils.js'

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
        if(searchCity.match(/[0-9]/)) {
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
        })
        .catch(function(err){
            console.log(err);
        });

    if (searchCity) {
        search.value = "";
    }
});
