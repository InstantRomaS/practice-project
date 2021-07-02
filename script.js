const defaultCity = 'Mogilev';
const weatherApiUtl = 'http://api.openweathermap.org/data/2.5/weather';

const cityNameElement = document.querySelector('.city-name');

const insertIcon = (iconCipher) => `<img src="https://openweathermap.org/img/wn/${iconCipher}@2x.png">`;

fetch(`${weatherApiUtl}?q=${defaultCity}&lang=ru&units=metric&appid=1cfada82e70e7faaaa7e751061a54e46`)
    .then(function(resp){ return resp.json() })
    .then(function(data) {
        console.log(data);
        cityNameElement.innerHTML = data.name;
        document.querySelector('.temperature').innerHTML=Math.round(data.main.temp) + '&degC';
        document.querySelector('.wind').innerHTML=data.weather[0].description;
        document.querySelector('.icon').innerHTML = insertIcon(data.weather[0]['icon']);
    })
    .catch(function(){
    });
/*async function getWeatherByLocation(){
    let city=document.getElementById("sear").nodeValue;
    let URL=`http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=1cfada82e70e7faaaa7e751061a54e46`;
    const resp = await fetch(URL,
    const respData = await resp.json();
}*/
