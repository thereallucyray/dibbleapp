import {useState, useEffect} from 'react'
import { Grid, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router';
import { getCrop, getIntercrops } from './api/CropService';
import { getFarm } from './api/FarmService';
import CropList from './components/cropList';
import dayjs from "dayjs";


function Crop() {
  // hardcoded for now
  const farmId = 1; 
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  const [farm, setFarm] = useState(null);
  const [hi, setAveHi] = useState(0);
  const [lo, setAveLo] = useState(0);
  const [precip, setAvePrecip] = useState(0);
  const [frost, setFrostDays] = useState(0);
  const [intercrops, setIntercrops] = useState(null);

  async function getHistoricForecast(latitude, longitude, start_date, end_date){
    const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&hourly=temperature_2m&temperature_unit=fahrenheit`;
    fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        console.log('Network response not ok')
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then(data => {
      const aveHi = data.daily.temperature_2m_max.reduce((a, b) => a + b) / data.daily.temperature_2m_max.length;
      setAveHi(aveHi);
      const aveLo = data.daily.temperature_2m_min.reduce((a, b) => a + b) / data.daily.temperature_2m_min.length;
      setAveLo(aveLo);
      const avePrecip = data.daily.precipitation_sum.reduce((a, b) => a + b) / data.daily.precipitation_sum.length;
      setAvePrecip(avePrecip);
      const frostDays = data.daily.temperature_2m_min.filter(d => (d <= 32.0)).length;
      setFrostDays(frostDays);
    })
    .catch(error => {
      console.log('There has been a problem with your fetch operation:', error);
    });
  }

  const getFarmCrop = async () => {
    try {
      const data  = await getCrop(id);
      setCrop(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFarmerFarm = async () => {
    const farmData = await getFarm(farmId);
    setFarm(farmData.data);
  }

  const getCropInterCrops = async() => {
    try {
      const data  = await getIntercrops(crop.id);
      setIntercrops(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const calcEndDate = (datePlanted, daysToMaturity)=>{
    const date1 = dayjs(datePlanted, "MM/DD/YYYY")
    date1.add(daysToMaturity, 'day')
    if(date1 > dayjs()){
      return date1.format('YYYY-MM-DD');
    } else {
      return dayjs().format('YYYY-MM-DD');
    }
  }

  const getWeatherData = async (farm) => {
    const start_date = dayjs(crop.datePlanted, "MM/DD/YYYY").format('YYYY-MM-DD');
    const end_date = calcEndDate(crop.datePlanted, crop.daysToMaturity);
    const data = await getHistoricForecast(farm.latitude, farm.longitude, start_date, end_date);
  }

  useEffect(() => {
    getFarmCrop();
    getFarmerFarm();
  }, []);

  useEffect(()=>{
    if(crop !== null && farm !== null){
      if(crop.weather == null){
        getWeatherData(farm)
      }
    }
  }, [crop, farm])

  useEffect(()=>{
    if(crop !== null){
      getCropInterCrops();
    }
  }, [crop])

  if (crop !== null){
  return (
    <div className="Crop">
      <Grid container spacing={3}>
        <Grid size='grow'>
        <Card style={{backgroundColor: "#E5F3CE"}}>
          <CardContent>
            <h1>{crop.species} - {crop.variety}</h1>
            <h2>Planted: {crop.datePlanted}</h2>
            <h3>{crop.daysToMaturity} days to mature</h3>
            <h3>Yield: {crop.yield} lbs</h3>
            <h3>Additional Notes: </h3>
            
            { crop.notes && <Card>
              <CardContent>
                <h4>{crop.notes}</h4>
              </CardContent>
            </Card>}
          </CardContent>
        </Card>
        </Grid>
        <Grid size='grow'>
          <Card style={{backgroundColor: "#E5F3CE"}}>
            <CardContent>
              <h2>Weather during crop lifetime</h2>
              <h3>Average High: {hi} °F</h3>
              <h3>Average Low: {lo} °F</h3>
              <h3>Average Precipitation: {precip.toFixed(2)} mm</h3>
              <h3>Number of Frost Days: {frost}</h3>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br/>
      <Grid size='grow'>
          <Card style={{backgroundColor: "#E5F3CE"}}>
            <CardContent>
              <h2>Intercrops</h2>
              {intercrops? <CropList data={intercrops}/> : <h3>No intercrops listed</h3>}
            </CardContent>
          </Card>
        </Grid>
    </div>
  );
  }
}

export default Crop;