fetch('http://api.openweathermap.org/data/2.5/weather?q=Mogilev&lang=ru&units=metric&appid=1cfada82e70e7faaaa7e751061a54e46')
    .then(function(resp){ return resp.json() })
    .then(function(data) {
        console.log(data);
        document.querySelector('.city-name').innerHTML=data.name;
        document.querySelector('.temperature').innerHTML=Math.round(data.main.temp)+'&deg';
        document.querySelector('.wind').innerHTML=data.weather[0].description;
        document.querySelector('.icon').innerHTML=`<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    })
    .catch(function(){
    });
/*async function getWeatherByLocation(location){
    const resp = await fetch(url(location),{
        origin: "cors"
    });
    const respData = await resp.json();
}*/
