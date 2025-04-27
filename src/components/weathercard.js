import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useState, useEffect } from 'react';

function WeatherCard ({latitude, longitude}) {
  const [weather, setWeather] = useState(null);

  async function getForecast(){
    if (latitude && longitude){
      const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit&daily=temperature_2m_max,temperature_2m_min,wind_speed_10m_max,et0_fao_evapotranspiration,precipitation_sum,precipitation_probability_max`;
    
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('Weather data:', data);
          setWeather(data)
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }
  }

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <div>
      <Card style={{backgroundColor: "#E5F3CE"}}>
        <CardContent>
          <h1>Weather Today: </h1>
          <h2>Current Temperature: {weather?.current_weather?.temperature} °F</h2>
          <h2>High: {weather?.daily?.temperature_2m_max[0]} °F</h2>
          <h2>Low: {weather?.daily?.temperature_2m_min[0]} °F</h2>
          <h2>Wind Speed: {weather?.daily?.wind_speed_10m_max[0]}</h2>
          <h2>Evapotranspiration: {weather?.daily?.et0_fao_evapotranspiration}</h2>
          <h2>Precipitation: {weather?.daily?.precipitation_probability_max[0]}% chance of {weather?.daily?.precipitation_sum}</h2>
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherCard;