// export async function getHistoricForecast(latitude, longitude, start_date, end_date){
//   console.log("I'm here!")
//   console.log(latitude, longitude, start_date, end_date)
//   const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m&temperature_unit=fahrenheit`;
//   fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       console.log('Network response not ok')
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   }).then(data => {
//     // console.log('Weather data:', data);
//     // console.log(data.daily.temperature_2m_max)
//     const aveHi = data.daily.temperature_2m_max.reduce((a, b) => a + b) / data.daily.temperature_2m_max.length;
//     // console.log(aveHi)
//     const aveLo = data.daily.temperature_2m_min.reduce((a, b) => a + b) / data.daily.temperature_2m_min.length;
//     // console.log(aveLo)
//     const avePrecip = data.daily.precipitation_sum.reduce((a, b) => a + b) / data.daily.precipitation_sum.length;
//     // console.log(avePrecip)
//     const frostDays = data.daily.temperature_2m_min.filter(d => (d <= 32.0)).length;
//     // console.log(frostDays);
//     console.log({ aveHi, aveLo, avePrecip, frostDays })
//     return { aveHi: aveHi, aveLo: aveLo, avePrecip: avePrecip, frostDays: frostDays };
//   })
//   .catch(error => {
//     console.log('There has been a problem with your fetch operation:', error);
//   });
//   console.log("I'm here!")
// }
