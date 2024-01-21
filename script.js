document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector(".search-box button");
    const inputCity = document.querySelector(".search-box input");

    searchButton.addEventListener("click", function () {
        getWeather();
    });
});

function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();

    if (cityName !== "") {
        fetch(`/weather?address=${cityName}`)
            .then(response => response.json())
            .then(data => {
                updateWeatherUI(data);
                getCityInfo(cityName);
            })
            .catch(error => {
                console.error("Error fetching weather data:", error);
            });
    }
    
}

function getCityInfo(cityName) {
    fetch(`/cityInfo?cityName=${cityName}`)
        .then(response => response.json())
        .then(data => {
            const cityDescription = data.cityDescription || 'No information available.';
            displayCityInfo(cityDescription);
        })
        .catch(error => {
            console.error("Error fetching city information:", error);
            displayCityInfo('No information available.');
        });
}

// function to display city information
function displayCityInfo(cityDescription) {
    const cityInfoElement = document.querySelector(".city-info");
    // shorten the city information to 3-4 sentences
    const shortenedInfo = cityDescription.split('.').slice(0, 3).join('.') + '.';
    cityInfoElement.textContent = `City Information: ${shortenedInfo}`;
}


let map;

function updateWeatherUI(weatherData) {
    const temperatureElement = document.querySelector(".temperature");
    const descriptionElement = document.querySelector(".description");
    const sunsetTimeElement = document.querySelector(".sunset-time");
    const pressureElement = document.querySelector(".pressure");
    const humidityElement = document.querySelector(".humidity");
    const feelsLikeElement = document.querySelector(".feels-like");
    const currentTimeElement = document.querySelector(".current-time");

    temperatureElement.innerHTML = `${weatherData.temperature} <span>°C</span>`;
    descriptionElement.textContent = `Description: ${weatherData.description}`;
    sunsetTimeElement.textContent = `Sunset Time: ${weatherData.sunsetTime}`;
    pressureElement.textContent = `Pressure: ${weatherData.pressure}`;
    humidityElement.textContent = `Humidity: ${weatherData.humidity}`;
    feelsLikeElement.textContent = `Feels like: ${weatherData.feelsLike}`;
    currentTimeElement.textContent = `Current Time: ${weatherData.currentTime}`;

    // update map location
    if (!map) {
        map = L.map('map').setView([weatherData.latitude, weatherData.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    } else {
        map.setView([weatherData.latitude, weatherData.longitude], 13);
    }

    if (weatherData.marker) {
        weatherData.marker.setLatLng([weatherData.latitude, weatherData.longitude]).update();
    } else {
        weatherData.marker = L.marker([weatherData.latitude, weatherData.longitude]).addTo(map)
            .bindPopup(weatherData.cityName)
            .openPopup();
    }
}
