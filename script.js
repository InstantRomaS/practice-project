 import {DAY_ARRAY, weatherAPIKEY, weatherApiUrl, insertIcon, weathersearchAPIUrl, form1, search, defaultCity, forecast, cityNameElement, temperatureEl, windEl, iconEl} from './consts.js';

const createForecastSection = (respData) => {
    const il = document.createElement("ul");
    il.classList.add('il');
    document.querySelector('.showforecast').appendChild(il);
    respData.list.forEach((element) => {
        const {main:{temp}, weather:{0: {description, icon}}, dt_txt} = element;
        const dateAPI = new Date(dt_txt);
        if(dateAPI.getHours() == 15){
            const forecastEl = document.createElement
            ("li");
            forecastEl.classList.add("weatherDaily");
            forecastEl.innerHTML = `
                    <span>${DAY_ARRAY[dateAPI.getDay()]}</span>
                    ${insertIcon(icon)}
                    <div class="weather-info">
                        <h3>${Math.round(temp)}</h3>
                        <span>${description}</span>
                    </div>
            `;

            document.querySelector('.il').appendChild(forecastEl);
        }
    });
};

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
    let searchTerm = search.value;
    fetch(`${weathersearchAPIUrl}?q=${searchTerm}&lang=ru&units=metric&day=5${weatherAPIKEY}`)
        .then((resp) => resp.json())
        .then((respData) => {
            console.log(respData);
            createForecastSection(respData);
        })
        .catch(function(err){
            console.log(err);
        });
    if (searchTerm) {
        search.value = "";
    }
    
});