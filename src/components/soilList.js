import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';


const SoilList = (data) => {
  if(data !== null && data !== undefined){
    if(data.data !== null && data.data !== undefined){
      return (
        <Grid container spacing={2}>
          {data.data.map((item) => (
            <Grid key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {item.texture}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Soil Moisture: {item.moisture}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Soil Structure: {item.structure}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    pH: {item.ph}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }
  }
};

export default SoilList;
