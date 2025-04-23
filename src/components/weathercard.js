import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useState, useEffect } from 'react';

function WeatherCard () {
  const [weather, setWeather] = useState(null);

  async function getForecast(){
    const lat = 52.52;
    const lon = 13.405;
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=fahrenheit`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // console.log('Weather data:', data);
        setWeather(data)
      })
      .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
  }

  useEffect(() => {
    getForecast();
  }, []);

  return (
    <div>
      <Card style={{backgroundColor: "#E5F3CE"}}>
        <CardContent>
          <h1>Weather Today: {weather?.current_weather?.temperature} °F</h1>
        </CardContent>
      </Card>
    </div>
  );
}

export default WeatherCard;