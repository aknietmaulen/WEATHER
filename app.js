require('dotenv').config();
const express = require("express");
const axios = require("axios");
const app = express();

const API_KEY = process.env.API_KEY;
const TIMEZONE_API_KEY = process.env.TIMEZONE_API_KEY;
const port = 3000;

const cors = require('cors');
app.use(cors());


app.use(express.static(__dirname));
app.use(express.json());
app.get('/weather', function (req, res) {
    const address = req.query.address;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=${API_KEY}&units=metric`;

    axios.get(url)
        .then(weatherResponse => {
            const weatherData = weatherResponse.data;
            const cityName = weatherData.name;
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
            const humidity = weatherData.main.humidity;
            const pressure = weatherData.main.pressure;
            const feelsLike = weatherData.main.feels_like;
            const latitude = weatherData.coord.lat;
            const longitude = weatherData.coord.lon;
            

            // fetch timezone data
            axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${TIMEZONE_API_KEY}&format=json&by=position&lat=${latitude}&lng=${longitude}`)
                .then(timezoneResponse => {
                    const timezoneData = timezoneResponse.data;
                    const timezone = timezoneData.zoneName;

                    const currentDate = new Date().toLocaleDateString('en-US', { timeZone: timezone });
                    const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: timezone });

                    res.json({
                        cityName: cityName,
                        temperature: temperature,
                        description: description,
                        humidity: humidity,
                        pressure: pressure,
                        sunsetTime: sunsetTime,
                        feelsLike: feelsLike,
                        latitude: latitude,
                        longitude: longitude,
                        timezone: timezone,
                        currentDate: currentDate,
                        currentTime: currentTime,
                    });
                })
                .catch(timezoneError => {
                    console.error(timezoneError);
                    res.status(500).json({ error: 'Error occurred while fetching timezone' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error occurred while fetching weather data' });
        });
});


app.get('/cityInfo', function (req, res) {
    const cityName = req.query.cityName;

    axios.get(`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&explaintext=true&titles=${cityName}`)
        .then(response => {
            const pages = response.data.query.pages;
            const cityInfo = Object.values(pages)[0];
            const cityDescription = cityInfo.extract || 'No information available.';
            res.json({ cityDescription });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error occurred while fetching city information from Wikipedia' });
        });
});


app.listen(port, function () {
    console.log(`Server is running on http://localhost:${port}`);
});

