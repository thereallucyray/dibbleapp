import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'texture', headerName: 'Texture', width: 130 },
  { field: 'structure', headerName: 'Structure', width: 130 },
  { field: 'moisture', headerName: 'Moisture', width: 130 },
  { field: 'ph', headerName: 'pH', width: 70 },
  { field: 'notes', headerName: 'Notes'}
];

const paginationModel = { page: 0, pageSize: 5 };

const handleEvent = (
  params, // GridRowParams
  event, // MuiEvent<React.MouseEvent<HTMLElement>>
  details, // GridCallbackDetails
) => {
  console.log("row clicked: ", params.row.id);
};

export default function SoilTable({soils}) {
  return (
    <Paper sx={{ height: 'fit-content', width: 'fit-content' }}>
      <DataGrid
        rows={soils}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        onRowClick={handleEvent}
      />
    </Paper>
  );
}
