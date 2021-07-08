import { DAY_ARRAY, insertIcon, } from './consts.js';

export const createForecastSection = (respData) => {
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