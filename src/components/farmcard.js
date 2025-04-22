import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { getFarm } from '../api/FarmerService';
import React, { useState, useEffect } from 'react';
import SimpleMap from './simpleMap';

function FarmCard ({userId}) {
  const [farm, setFarm] = useState(null);

  const getFarmerFarm = async () => {
    try {
      const data  = await getFarm(userId);
      setFarm(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
      // toastError(error.message);
    }
  };

  useEffect(() => {
    getFarmerFarm();
    // console.log("FARM: ", f)
    // setFarm(f);
  }, []);

  return (
    <div>
      <Card style={{backgroundColor: "#E5F3CE"}}>
        <CardContent>
          <h1>Farm at a Glance</h1>
          <h1>{farm?.farmName}</h1>
          <h2>Growing Zone {farm?.growingZone}</h2>
          <SimpleMap />
        </CardContent>
      </Card>
    </div>
  );
}

export default FarmCard;