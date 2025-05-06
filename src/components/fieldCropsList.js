import { useEffect, useState } from "react";
import {Card, CardContent, Grid} from '@mui/material'
import CropList from "./cropList";
import { getFieldActiveCrops } from "../api/FieldService";

function FieldCropsList({field, active}){
  const [crops, setCrops] = useState([]);
  const getActiveCrops = async () => {
    try {
      const data  = await getFieldActiveCrops(field.id);
      setCrops(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(active === true){
      getActiveCrops();
    } else {
      setCrops(field.crops)
    }
  }, [])
  
  if(active === true && crops && crops.length === 0){
    return(
      <div>
        <h1>{field.fieldName}</h1>
        <Grid container spacing={2}>
          <Card style={{backgroundColor: "#ffdad9"}}>
            <CardContent>
              <div>
              <h3>Consider planting a cover crop to protect the soil!</h3>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  } else {
    return(
      <div>
        <h1>{field.fieldName}</h1>
        {crops && <CropList data={crops} fieldId={field.id}/>}
      </div>
    );
  }
  
};

export default FieldCropsList;