import {useState, useEffect} from 'react'
import { getFarm } from './api/FarmerService';
import { Grid, Card, CardContent } from '@mui/material';
import NewSoilPopUp from './components/newSoilPopup';
import CropList from './components/cropList';
import { getField } from './api/FieldService';
import { useParams } from 'react-router';
import SoilTable from './components/soilTable';
import { getFieldActiveCrops, getFieldHistoricCrops } from './api/FieldService';
import CropTable from './components/cropTable';

function Field() {
  const { id } = useParams();
  const [field, setField] = useState(null);
  const [soils, setSoils] = useState([]);
  const [activeCrops, setActiveCrops] = useState([]);
  const [historicCrops, setHistoricCrops] = useState([]);
  
  const getFarmerField = async () => {
    try {
      const data  = await getField(id);
      setField(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveCrops = async () => {
    try {
      const data  = await getFieldActiveCrops(field.id);
      setActiveCrops(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getHistoricCrops = async () => {
    try {
      const data  = await getFieldHistoricCrops(field.id);
      setHistoricCrops(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFarmerField();
  }, []);

  useEffect(()=>{
    if(field !== null){
      setSoils(field.soils);
      getActiveCrops();
      getHistoricCrops();
    }
  }, [field])
  
  if (field !== null && soils !== null && activeCrops !== null && historicCrops !== null){
  return (
    <div className="Field">
      <h1>{field.fieldName}</h1>
        <Grid container spacing={3}>
          <Grid size='grow'>
          <Card style={{backgroundColor: "#E5F3CE"}}>
            <CardContent>
              <h2>Soils</h2>
              <div>
                {soils && <SoilTable soils={soils}/>}
              </div>
              <br/>
              <div>
                <NewSoilPopUp fieldId={field.id}/>
              </div>
            </CardContent>
          </Card>
          </Grid>
          <Grid size='grow'>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <h2>Crops</h2>
                <h3>Currently Planted:</h3>
                <div>
                {activeCrops && <CropList data={activeCrops}/>}
                </div>
                <br/>
                <h3>Previously Planted:</h3>
                <div>
                  {historicCrops && <CropTable crops={historicCrops}/>}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      
    </div>
  );
  }
}

export default Field;