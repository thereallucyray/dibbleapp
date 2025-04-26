import NewCropPopUp from './components/newCropPopup'
import { Grid, Item } from '@mui/material';

function Crops() {
  return (
    <div className="Crops">
      <Grid container spacing={3}>
        <Grid size={6}>
          <NewCropPopUp/>
          This is the Crops page!
        </Grid>
        <Grid size='grow'>
        </Grid>
      </Grid>
    </div>
  );
}

export default Crops;
