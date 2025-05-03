import NewCropPopUp from './components/newCropPopup'
import { Grid, Item } from '@mui/material';
import { getFarm } from './api/FarmerService';
import { useState, useEffect } from 'react';
import CropList from './components/cropList';
import { getFarmCrops } from './api/FarmService';

function Crops() {
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

  const getFarmerCrops = async () => {
    const data = await getFarmCrops(farm.id);
    setCrops(data.data);
  }

  useEffect(() => {
    getFarmerFarm();
  }, []);

  useEffect(()=>{
    if(farm !== null){
      getFarmerCrops();
    }
  }, [farm])

  return (
    <div className="Crops">
      {farm && <NewCropPopUp farmId={farm.id}/>}
      <h1>My Crops</h1>
      {crops && <CropList data={Array.from(crops)}/>}
    </div>
  );
}

export default Crops;
