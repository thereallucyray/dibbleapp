export async function getHistoricForecast(latitude, longitude, start_date, end_date){
  const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m&temperature_unit=fahrenheit`;

  fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      console.log('Network response not ok')
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Weather data:', data);
    setWeather(data)
  })
  .catch(error => {
    console.log('There has been a problem with your fetch operation:', error);
  });
}
