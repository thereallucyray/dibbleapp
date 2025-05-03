import React from 'react';
import { Card, CardContent, Typography, Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteCrop } from '../api/FieldService';


function CropList ({data, fieldId}) {

  const handleDeleteCrop = async (cropId) => {
    console.log(fieldId, " ", cropId)
    const result = await deleteCrop(fieldId, cropId);

    return (window.location.assign(`http://localhost:3000/Crops`))
  }

  if(data !== null && data !== undefined){
    return (
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Crop: {item.species}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Variety: {item.variety}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Date Planted: {item.datePlanted}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Days to Maturity: {item.daysToMaturity}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Yield (lbs): {item.yield}
                </Typography>
                <IconButton aria-label="delete" onClick={()=> {handleDeleteCrop(item.id)}}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default CropList;
