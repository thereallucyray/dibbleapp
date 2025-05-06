import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';


const columns = [
  { field: 'species', headerName: 'Crop', width: 130 },
  { field: 'variety', headerName: 'Variety', width: 130 },
  { field: 'datePlanted', headerName: 'Date Planted', width: 130 },
  { field: 'daysToMaturity', headerName: 'Days to Maturity', width: 130 },
  { field: 'yield', headerName: 'Yield (lbs)', width: 130 }
];

const paginationModel = { page: 0, pageSize: 5 };


export default function CropTable({crops}) {
  const navigate = useNavigate();

  const handleEvent = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log("row clicked: ", params.row.id);
    navigate(`/Crop/${params.row.id}`);
  };

  return (
    <Paper sx={{ height: 'fit-content', width: 'fit-content' }}>
      <DataGrid
        rows={crops}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        onRowClick={handleEvent}
      />
    </Paper>
  );
}
