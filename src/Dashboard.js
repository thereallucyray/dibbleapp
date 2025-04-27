import './App.css';
import CropList from './components/cropList';
import FarmCard from './components/farmcard'
import WeatherCard from './components/weathercard';
import { Grid, Card, CardContent } from '@mui/material';
import {useState, useEffect} from 'react'
import { getFarm } from './api/FarmerService';

function Dashboard() {
  const userId = "d8f9585a-4478-4282-b896-82e595f54e32"
  const [farm, setFarm] = useState(null);
  const [crops, setCrops] = useState(null);

  const getFarmerFarm = async () => {
    try {
      const data  = await getFarm(userId);
      setFarm(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFarmerFarm();
  }, []);

  useEffect(()=>{
    if(farm !== null){
      console.log("CROPS: ", Array.from(farm.crops))
      setCrops(farm.crops)
    }
    // console.log(farm.crops)
  }, [farm])

  return (
      <div className="App">
        <Grid container spacing={3}>
          <Grid size={6}>
            <FarmCard userId={userId}/>
          </Grid>
          <Grid size='grow'>
            <WeatherCard latitude={farm?.latitude} longitude={farm?.longitude}/>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <h1>My Crops</h1>
                {crops && <CropList data={Array.from(crops)}/>}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
  );
}

export default Dashboard;
