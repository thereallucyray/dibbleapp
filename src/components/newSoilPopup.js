import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    Select,
    TextField,
    MenuItem,
    InputLabel,
    FormControl,
    Box
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import AddRoundedIcon from "@mui/icons-material/AddRounded";


const soils = [
  "sand", 
  "loamy-sand", 
  "sandy-loam", 
  "sandy-silt-loam", 
  "silt", 
  "silty-clay-loam", 
  "clay-loam", 
  "sandy-clay-loam", 
  "sandy-clay", 
  "silty-clay", 
  "clay",
  "peat"
];

const structures = [
  "granular", 
  "aggregated", 
  "blocky", 
  "columnar/prismatic", 
  "platey", 
  "massive",
];

function NewSoilPopUp({farmId}) {
    const [open, setOpen] = useState(false);
    const [texture, setTexture] = useState('');
    const [moisture, setMoisture] = useState('');
    const [structure, setStructure] = useState('');
    const [pH, setpH] = useState(7);

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //reset all form fields
        setTexture('');
        setMoisture('');
        setStructure('');
        setpH(7);
    };

    const handleCreateSoil = async () => {
      setOpen(false);
      const result = await fetch(`http://localhost:8080/farms/${farmId}/soil`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },

          body: JSON.stringify({
              texture: texture,
              moisture: moisture,
              structure: structure,
              pH: pH
          })
      });

      //return (window.location.assign(`http://${process.env.STUDY_BUDDY_FRONTEND_URL}/home`))
    }

    return (
        <div>
            <Button variant="contained" startIcon={<AddRoundedIcon/>} onClick={handleClickOpen}>
                Add Soil
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    Plant a New Crop!
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
                    <div style={{ marginTop: '20px'}}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-soil">Soil Texture</InputLabel>
                                <Select
                                    labelId="select-soil"
                                    id="soil"
                                    variant="outlined"
                                    value={texture}
                                    onChange={(e) => setTexture(e.target.value)}
                                    displayEmpty
                                >
                                    {soils.map((soil, index) => (
                                        <MenuItem key={index} value={soil}>
                                            {soil}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <br/>
                    <div>
                        <TextField
                            required
                            label="Soil Moisture"
                            variant="outlined"
                            value={moisture}
                            onChange={(e) => setMoisture(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div style={{ marginTop: '20px'}}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-struct">Soil Structure</InputLabel>
                                <Select
                                    labelId="select-struct"
                                    id="struct"
                                    variant="outlined"
                                    value={structure}
                                    onChange={(e) => setStructure(e.target.value)}
                                    displayEmpty
                                >
                                    {structures.map((struct, index) => (
                                        <MenuItem key={index} value={struct}>
                                            {struct}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <TextField
                        id="outlined-helperText"
                        label="pH"
                        type="number"
                        value={pH}
                        onChange={(e) => setpH(e.target.value)}
                        slotProps={{
                          inputLabel: {
                            shrink: true,
                          },
                        }}
                    />
                    <br/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateSoil} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewSoilPopUp;