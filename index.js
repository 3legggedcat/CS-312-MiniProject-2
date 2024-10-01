//Import modules
const express = require('express');
const axios = require('axios'); // Axios for making HTTP requests

const router = express.Router();

//Home page route
router.get('/', (req, res) => {
  res.render('index', { weather: null, error: null }); // Render home page with initial values
});

//Handle form submission with city name
router.post('/', async (req, res) => {
  const cityName = req.body.city; //city name from the input
  const apiKey = 'd7c5e044f3bf2442a849fd3ebaa62216';  //API key

  //OpenWeatherMap Current Weather API URL
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  try {
    //Fetch weather data using city name
    const weatherResponse = await axios.get(weatherUrl);
    const weather = {
      location: `${weatherResponse.data.name}, ${weatherResponse.data.sys.country}`,
      temperature: weatherResponse.data.main.temp,
      description: weatherResponse.data.weather[0].description
    };

    //Render the weather data on the home page
    res.render('index', { weather, error: null });

  } catch (error) {
    console.error(error.response ? error.response.data : error.message); //log for debugging
    res.render('index', { weather: null, error: 'Location not found. Please try again!' }); //error message
  }
});

module.exports = router;
