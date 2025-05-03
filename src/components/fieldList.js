import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';


const FieldList = (data) => {
  if(data !== null && data !== undefined){
    if(data.data !== null && data.data !== undefined){
      return (
        <Grid container spacing={2}>
          {data.data.map((item) => (
            <Grid key={item.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h2">
                    {item.fieldName}
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

export default FieldList;
