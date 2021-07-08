import { DAY_ARRAY, insertIcon, } from './consts.js';

export const createForecastSection = (respData) => {
    const slider_container = document.createElement("div");
    slider_container.classList.add('slider-container');
    document.querySelector('.showforecast').appendChild(slider_container);
    const il = document.createElement("ul");
    il.classList.add('il');
    document.querySelector('.slider-container').appendChild(il);
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
    scrollBtns();
};

function scrollBtns() {
    const slider_buttons = document.createElement("div");
    slider_buttons.classList.add("slider_buttons");
    slider_buttons.innerHTML = `
            <button class="btn_prev">Пред</button>
            <button class="btn_next">След</button>
    `;
    document.querySelector('.showforecast').appendChild(slider_buttons);
}
