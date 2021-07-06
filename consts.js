export const DAY_ARRAY = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
export const weatherAPIKEY = '&appid=1cfada82e70e7faaaa7e751061a54e46';
export const weatherApiUrl = 'http://api.openweathermap.org/data/2.5/weather'; 
export const weathersearchAPIUrl='http://api.openweathermap.org/data/2.5/forecast'; 
export const insertIcon = (iconCipher) => `<img src="https://openweathermap.org/img/wn/${iconCipher}@2x.png">`;

export const form1 = document.getElementById("form1");
export const search = document.getElementById("search");
export const defaultCity = 'Mogilev';
export const forecast = document.querySelector('.showforecast');
export const cityNameElement = document.querySelector('.city-name');
export const temperatureEl = document.querySelector('.temperature');
export const windEl = document.querySelector('.wind');
export const iconEl = document.querySelector('.icon');
//export default DAY_ARRAY;

// module.exports = { dayArray };