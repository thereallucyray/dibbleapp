import React from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import {Link} from 'react-router-dom'


const FieldList = (data) => {
  if(data !== null && data !== undefined){
    if(data.data !== null && data.data !== undefined){
      return (
        <Grid container spacing={2}>
          {data.data.map((item) => (
            <Grid key={item.id}>
              <Card style={{backgroundColor: "#E5F3CE"}}>
                <CardContent>
                  <Link to={`/Field/${item.id}`}>{item.fieldName}</Link>
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
