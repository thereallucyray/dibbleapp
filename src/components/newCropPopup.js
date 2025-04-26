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
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const crops = [
  "Corn",
  "Soybeans",
  "Wheat",
  "Cotton",
  "Hay",
  "Rice",
  "Barley",
  "Sorghum",
  "Oats",
  "Peanuts",
  "Sunflowers",
  "Sugar beets",
  "Sugarcane",
  "Tobacco",
  "Potatoes",
  "Sweet potatoes",
  "Tomatoes",
  "Lettuce",
  "Carrots",
  "Onions",
  "Apples",
  "Oranges",
  "Grapes",
  "Strawberries",
  "Blueberries",
  "Cranberries",
  "Almonds",
  "Pistachios",
  "Walnuts"
];

function NewCropPopUp({farmId}) {
    const [open, setOpen] = useState(false);
    const [SelectedCrop, setSelectedCrop] = useState('');
    const [PlantDate, setPlantDate] = useState(dayjs());
    const [Variety, setVariety] = useState('');

    const handleOptionChange = (event) => {
        setSelectedCrop(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //reset all form fields
        setSelectedCrop('');
        setPlantDate(dayjs());
        setVariety('');
    };

    const handleCreateCrop = async () => {
      setOpen(false);
      const result = await fetch(`http://localhost:8080/farms/${farmId}/crop`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },

          body: JSON.stringify({
              species: SelectedCrop,
              variety: Variety,
              datePlanted: PlantDate.format('MM/DD/YYYY').toString(),
          })
      });

      // return (window.location.assign(`http://${process.env.STUDY_BUDDY_FRONTEND_URL}/home`))
    }

    return (
        <div>
            <Button variant="contained" startIcon={<AddRoundedIcon/>} onClick={handleClickOpen}>
                Plant New Crop
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
                                <InputLabel id="select-crop">Select crop</InputLabel>
                                <Select
                                    labelId="select-crop"
                                    id="crop"
                                    label="Select crop"
                                    variant="outlined"
                                    fullWidth
                                    value={SelectedCrop}
                                    onChange={handleOptionChange}
                                    displayEmpty
                                >
                                    {crops.map((crop, index) => (
                                        <MenuItem key={index} value={crop}>
                                            {crop}
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
                            label="Variety"
                            variant="outlined"
                            onChange={(e) => setVariety(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={PlantDate}
                                inputFormat="DD/MM/YYYY"
                                onChange={(newValue) => setPlantDate(newValue)}
                            />
                        </LocalizationProvider>
                    </div>
                    <br/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateCrop} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewCropPopUp;