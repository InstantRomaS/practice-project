// import {DAY_ARRAY} from './consts';

// console.log(DAY_ARRAY);

const form1 = document.getElementById("form1");
const search = document.getElementById("search");
const defaultCity = 'Mogilev';
const currDate = new Date();
console.log(currDate);

const weatherAPIKEY = '&appid=1cfada82e70e7faaaa7e751061a54e46';
const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather';
const weathersearchAPIUrl='http://api.openweathermap.org/data/2.5/forecast';
const insertIcon = (iconCipher) => `<img src="https://openweathermap.org/img/wn/${iconCipher}@2x.png">`;

const forecast = document.querySelector('.showforecast');
const cityNameElement = document.querySelector('.city-name');
const temperatureEl = document.querySelector('.temperature');
const windEl = document.querySelector('.wind');
const iconEl = document.querySelector('.icon');


const createForecastSection = (respData) => {
    const il = document.createElement("ul");
    il.classList.add('il');
    document.querySelector('.showforecast').appendChild(il);
    respData.list.forEach((element) => {
        const {main:{temp}, weather:{0: {description, icon}}, dt_txt} = element;
        const dateAPI = new Date(dt_txt);
        if(dateAPI.getHours() == 15){
            const dayArray = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

            const forecastEl = document.createElement
            ("li");
            forecastEl.classList.add("weatherDaily");
            forecastEl.innerHTML = `
                    <span>${dayArray[dateAPI.getDay()]}</span>
                    <img
                        src="https://openweathermap.org/img/wn/${icon}@2x.png"
                    >
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
    const searchTerm = search.value;
    fetch(`${weathersearchAPIUrl}?q=${searchTerm}&lang=ru&units=metric&day=5${weatherAPIKEY}`)
        .then((resp) => resp.json())
        .then((respData) => {
            console.log(respData);
            createForecastSection(respData);
        })
        .catch(function(){
        });
    if (searchTerm) {
        search.value = "";
    }
    
});