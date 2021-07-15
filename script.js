import { weatherAPIKEY, weatherApiUrl, insertIcon, weathersearchAPIUrl, forecastSlider, search, defaultCity, forecast, cityNameElement, temperatureEl, windEl, iconEl } from './consts.js';

import { createForecastSection } from './utils.js';

import { BuildMap } from './map.js';


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

forecastSlider.addEventListener("submit", (e) => {
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
            const { city: { coord: { lat, lon } } } = respData;
            BuildMap(lat, lon);
            createForecastSection(respData);
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
            });

            btnNext.addEventListener('click', () => {
                const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

                position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
                SetPosition();
                checkBtns();
            });

            btnPrev.addEventListener('click', () => {
                const itemsLeft = Math.abs(position) / itemWidth;

                position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
                SetPosition();
                checkBtns();

            });

            const SetPosition = () => {
                sliderTrack.style.transform = `translateX(${position}px)`;
            };
            
            const checkBtns = () => {
                btnPrev.disabled = position === 0;
                btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
            };
        })
        .catch(function (err) {
            console.log(err);
        });

    if (searchCity) {
        search.value = "";
    }
});
