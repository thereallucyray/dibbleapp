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

function NewSoilPopUp({fieldId}) {
    const [open, setOpen] = useState(false);
    const [texture, setTexture] = useState('');
    const [moisture, setMoisture] = useState('');
    const [structure, setStructure] = useState('');
    const [pH, setpH] = useState(7.0);
    const [notes, setNotes] = useState('');

    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //reset all form fields
        setTexture('');
        setMoisture('');
        setStructure('');
        setpH(7.0);
        setNotes('');
    };

    const handleCreateSoil = async () => {
      setOpen(false);
      const result = await fetch(`http://localhost:8080/fields/${fieldId}/soil`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },

          body: JSON.stringify({
              texture: texture,
              moisture: moisture,
              structure: structure,
              ph: pH,
              notes: notes
          })
      });

      window.location.reload()
    }

    return (
        <div>
            <Button variant="contained" sx={{ bgcolor: "#0C3100" }} startIcon={<AddRoundedIcon/>} onClick={handleClickOpen}>
                Add Soil
            </Button>
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
                    <div>
                        <TextField
                            id="outlined-multiline-static"
                            label="Additional Notes"
                            multiline
                            rows={4}
                            fullWidth
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>
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