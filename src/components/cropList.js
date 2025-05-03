import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';


const CropList = (data) => {
  if(data !== null && data !== undefined){
    return (
      <Grid container spacing={2}>
        {data.data.map((item) => (
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
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
};

export default CropList;
