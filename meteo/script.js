const apiKey = '2415f1d8f98f3d0998bcf0112e36d1ad';


const weatherContainer = document.querySelector('.afficherWeather');
const placeholder = document.getElementById('input');
const cityName = document.querySelector('.city');
const temp = document.querySelector('.temp');
const form = document.querySelector('.inputWeather')
const images = document.querySelector('.icons')


form.addEventListener('submit',(e) =>{
    e.preventDefault();

    const value = placeholder.value;
    let apiUrl2;
    //faire en sorte de verifier si c'est une ville écrite ou un code postal
    if(!isNaN(value)){
        apiUrl2 = `https://api.openweathermap.org/geo/1.0/zip?zip=${value},FR&appid=${apiKey}&units=metric`;
    }else{
        apiUrl2 = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&appid=${apiKey}&units=metric`;
    }


    fetch(apiUrl2)
      .then(response => response.json())
      .then(data =>{
        let lat, lon, city;
        if(!isNaN(value)){
            lat= data.lat;
            lon= data.lon;
            city = data.name;
        }
        else{
            lat = data[0].lat;
            lon = data[0].lon;
            city = data[0].name;
        }

        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

        fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
            console.log(data);
            cityName.textContent = `${city}`;
            temp.textContent = `${Math.round(weatherData.main.temp)}°C`;
            const iconCode = weatherData.weather[0].icon;
            images.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            images.alt = weatherData.weather[0].description;
            weatherContainer.classList.remove('hidden');
        })
      })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        alert('Bobo le bonobo');
        weatherContainer.classList.add('hidden');
      });
});
