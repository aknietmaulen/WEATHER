# WeatherApp

![WeatherApp Logo](img/weather.png)

WeatherApp is a simple web application that provides real-time weather information for cities around the world. With WeatherApp, users can quickly check the current temperature, description, humidity, pressure, and more for a specific location. The app also displays additional information about the city obtained from Wikipedia.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- Real-time weather data retrieval using the OpenWeatherMap API.
- Display of temperature, description, humidity, pressure, and other relevant weather information.
- Integration with Wikipedia API to provide additional city information.
- Integration with TimezoneDB API to provide current time information.
- Dynamic map that updates based on the entered city.

## Getting Started

To run WeatherApp locally, follow these steps:

1. Clone the repository: `git clone https://github.com/aknietmaulen/WEATHER.git`
2. Navigate to the project directory: `cd WEATHER`
3. Install dependencies: `npm install`
4. Start the server: node app.js
5. Open your browser and go to http://localhost:3000

## Dependencies
Express
Axios
Leaflet
Bootstrap
For a complete list of dependencies, check the package.json file.

## Usage
Enter the desired city in the search box.
Click the search button or press Enter.
View real-time weather information, including temperature, description, sunset time, and more.
Explore additional city information provided by Wikipedia.
Interact with the dynamic map that updates based on the entered city.

## Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue. If you want to contribute to the codebase, feel free to fork the repository and submit a pull request.
