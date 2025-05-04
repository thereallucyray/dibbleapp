import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Typography,
    TextField,
    FormControlLabel,
    Grid,
    Card,
    CardContent,
    Box,
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import { getFieldActiveCrops } from '../api/FieldService';
import { getIntercrops, addIntercrop } from '../api/CropService';

function EditCropPopUp({fieldId, crop}) {
    const [open, setOpen] = useState(false);
    const [Yield, setYield] = useState(0);
    const [Notes, setNotes] = useState('');
    const [Terminated, setTerminated] = useState(false);
    const [ActiveCrops, setActiveCrops] = useState([]);
    const [Intercrops, setIntercrops] = useState([]);
    const [SelectedIntercrop, setSelectedIntercrop] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
        setNotes(crop.notes)
        setYield(crop.yield)
        if(crop.terminated !== undefined){
          setTerminated(crop.terminated)
        }
    };

    const handleClose = () => {
        setOpen(false);
        setNotes(crop.notes)
        setYield(crop.yield)
        setTerminated(crop.terminated)
        setSelectedIntercrop('');
    };

    const getActiveCrops = async () => {
      try {
        const data  = await getFieldActiveCrops(fieldId);
        setActiveCrops(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    const getCropInterCrops = async() => {
      try {
        const data  = await getIntercrops(crop.id);
        setIntercrops(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    const handleUpdateCrop = async () => {
      console.log("CROP ID ", crop.id)
      setOpen(false);
      const result = await fetch(`http://localhost:8080/fields/${fieldId}/crop`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },

          body: JSON.stringify({
              id: crop.id,
              yield: Yield,
              notes: Notes,
              terminated: Terminated
          })
      });

      if(SelectedIntercrop !== ''){
        const result2 = await addIntercrop(crop.id, SelectedIntercrop.id);
      }

      return (window.location.assign(`http://localhost:3000/Crops`))
    }

    useEffect(()=>{
      getActiveCrops();
      getCropInterCrops();
    }, [])

    return (
        <>
            <IconButton aria-label="edit" onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={handleClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 20, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                  <Typography variant="h6" component="h2">
                    Crop: {crop.species}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Variety: {crop.variety}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Date Planted: {crop.datePlanted}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Days to Maturity: {crop.daysToMaturity}
                  </Typography>
                  <br/>
                  <FormControlLabel
                    control={
                      <Checkbox
                      id="terminated-checkbox"
                      checked={Terminated} // if the checkbox is checked (or not)
                      onChange={() => setTerminated(!Terminated)} // toggles the checked state
                      label="Terminated?"
                    />
                    }
                    label="Terminated?"/>
                  
                  <div>
                    <TextField
                        required
                        label="Yield"
                        variant="outlined"
                        type="number"
                        onChange={(e) => setYield(e.target.value)}
                        fullWidth
                    />
                  </div>
                  <br/>
                  <div>
                  <TextField
                      id="outlined-multiline-static"
                      label="Additional Notes"
                      multiline
                      rows={4}
                      fullWidth
                      value={Notes}
                      onChange={(e) => setNotes(e.target.value)}
                      />
                  </div>
                  <br/>
                  <Typography variant="h6" component="h2">
                    Intercrops
                  </Typography>

                  <Grid container spacing={2}>
                    {Intercrops.map((item) => (
                      <Grid key={item.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" component="h2">
                              {item.species}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              Variety: {item.variety}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <div style={{ marginTop: '20px'}}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-intercrop">Add an Intercrop</InputLabel>
                                <Select
                                    labelId="select-intercrop"
                                    id="intercrop"
                                    variant="outlined"
                                    fullWidth
                                    value={SelectedIntercrop}
                                    onChange={(event) => {setSelectedIntercrop(event.target.value);}}
                                    displayEmpty
                                >
                                    {ActiveCrops?.map((crop, index) => (
                                        <MenuItem key={index} value={crop}>
                                            {crop.species}: {crop.variety}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdateCrop} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditCropPopUp;