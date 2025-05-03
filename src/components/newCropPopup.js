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
import { getFarmFields } from '../api/FarmService';

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
    const [fields, setFields] = useState(null);
    const [SelectedField, setSelectedField] = useState('');
    const [SelectedCrop, setSelectedCrop] = useState('');
    const [PlantDate, setPlantDate] = useState(dayjs());
    const [Variety, setVariety] = useState('');
    const [Maturity, setMaturity] = useState(0);
    const [Notes, setNotes] = useState('');

    const getFields = async () => {
        const data = await getFarmFields(farmId);
        setFields(data.data);
    }

    const handleOptionChange = (event) => {
        setSelectedCrop(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //reset all form fields
        setSelectedField('');
        setSelectedCrop('');
        setPlantDate(dayjs());
        setVariety('');
        setMaturity(0);
    };

    const handleCreateCrop = async () => {
      setOpen(false);
      const result = await fetch(`http://localhost:8080/fields/${SelectedField.id}/crop`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },

          body: JSON.stringify({
              species: SelectedCrop,
              variety: Variety,
              datePlanted: PlantDate.format('MM/DD/YYYY').toString(),
              daysToMaturity: Maturity,
              notes: Notes
          })
      });

      return (window.location.assign(`http://localhost:3000/Crops`))
    }

    useEffect(()=> {
        getFields();
    }, [])

    useEffect(()=> {
       console.log(fields)
    }, [fields])

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
                                <InputLabel id="select-field">Select field</InputLabel>
                                <Select
                                    labelId="select-field"
                                    id="field"
                                    variant="outlined"
                                    fullWidth
                                    value={SelectedField}
                                    onChange={(event) => {setSelectedField(event.target.value);}}
                                    displayEmpty
                                    required
                                >
                                    {fields?.map((field, index) => (
                                        <MenuItem key={index} value={field}>
                                            {field.fieldName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    <div style={{ marginTop: '20px'}}>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-crop">Select crop</InputLabel>
                                <Select
                                    labelId="select-crop"
                                    id="crop"
                                    variant="outlined"
                                    fullWidth
                                    value={SelectedCrop}
                                    onChange={handleOptionChange}
                                    displayEmpty
                                    required
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
                    <br/>
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
                    <div>
                        <TextField
                            required
                            label="Days to Maturity"
                            variant="outlined"
                            onChange={(e) => setMaturity(e.target.value)}
                            fullWidth
                            type='number'
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