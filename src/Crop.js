import {useState, useEffect} from 'react'
import { Grid, Card, CardContent } from '@mui/material';
import { useParams } from 'react-router';
import { getCrop } from './api/CropService';

function Crop() {
  const { id } = useParams();
  const [crop, setCrop] = useState(null);
  
  const getFarmCrop = async () => {
    try {
      const data  = await getCrop(id);
      setCrop(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFarmCrop();
  }, []);

  useEffect(()=>{
    if(crop !== null){
      if(crop.weather == null){
        console.log("no weather")
      }
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
              <h2>Crops</h2>
              <h3>Currently Planted:</h3>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
  }
}

export default Crop;