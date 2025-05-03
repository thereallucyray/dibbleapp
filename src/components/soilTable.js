import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'texture', headerName: 'Texture', width: 130 },
  { field: 'structure', headerName: 'Structure', width: 130 },
  { field: 'moisture', headerName: 'Moisture', width: 130 },
  { field: 'ph', headerName: 'pH', width: 70 },

  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  // },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function SoilTable({soils}) {
  console.log(soils)
  return (
    <Paper sx={{ height: 400, width: 'fit-content' }}>
      <DataGrid
        rows={soils}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
