import {useState, useEffect} from 'react'
import { getFarm } from './api/FarmerService';
import {
  TextField,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material';
import SoilList from './components/soilList';
import FieldList from './components/fieldList';
import NewSoilPopUp from './components/newSoilPopup';
import NewFieldPopUp from './components/newFieldPopUp';

const climates = [
  "Tropical Rainforest",
  "Tropical Monsoon",
  "Tropical Savanna",
  "Hot Desert Climate",
  "Cold Desert Climate",
  "Hot Semi-Arid Climate",
  "Cold Semi-Arid Climate",
  "Mediterranean Climate",
  "Warm Oceanic Climate",
  "Subtropical highland climate",
  "Cold subtropical highland",
  "Humid Subtropical Climate",
  "Temperate Oceanic Climate",
  "Humid Continental Climate",
  "Continental Subarctic",
  "Tundra Climate"
];

function Farm() {
  const userId = "d8f9585a-4478-4282-b896-82e595f54e32"
  const [farm, setFarm] = useState(null);
  const [name, setName] = useState("")
  const [zip, setZip] = useState("")
  const [lat, setLat] = useState(0.0)
  const [lon, setLon] = useState(0.0)
  const [size, setSize] = useState(0)
  const [growZone, setGrowZone] = useState("")
  const [climate, setClimate] = useState("")
  const [edited, setEdited] = useState(false)
  
  const [soils, setSoils] = useState([])
  const [fields, setFields] = useState([])
  
  const getFarmerFarm = async () => {
    try {
      const data  = await getFarm(userId);
      setFarm(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFarmerFarm();
  }, []);

  useEffect(()=> {
    if(farm !== null){
      setName(farm.farmName)
      setZip(farm.zipcode)
      setLat(farm.latitude)
      setLon(farm.longitude)
      setSize(farm.size)
      setGrowZone(farm.growingZone)
      setClimate(farm.climate)
      setFields(farm.fields)
    }
  }, [farm])


  const handleSave = async () => {
    const result = await fetch(`http://localhost:8080/farms/${farm.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            farmName: name,
            zipcode: zip,
            latitude: lat,
            longitude: lon,
            size: size,
            growingZone: growZone,
            climate: climate
        })
    });

    return (window.location.assign(`http://localhost:3000/Farm`))
  }

  return (
    <div className="Farm" >
      <h1>My Farm</h1>
      <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 2 } }}
      noValidate
      autoComplete="off"
      >
      <div>
      <TextField
          id="outlined-helperText"
          fullWidth
          label="Farm Name"
          defaultValue={farm?.farmName}
          onChange={(e) => {setName(e.target.value); setEdited(true)}}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
      />
      </div>
      <div>
      <TextField
          id="outlined-helperText"
          label="Zipcode"
          type="number"
          defaultValue={farm?.zipcode}
          onChange={(e) => {setZip(e.target.value); setEdited(true)}}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
      />
      <TextField
          id="outlined-helperText"
          label="Latitude (degrees)"
          type="number"
          defaultValue={farm?.latitude}
          onChange={(e) => {setLat(e.target.value); setEdited(true)}}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
      />
      <TextField
          id="outlined-helperText"
          label="Longitude (degrees)"
          type="number"
          defaultValue={farm?.longitude}
          onChange={(e) => {setLon(e.target.value); setEdited(true)}}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
      />
      </div>
      <div>
      <TextField
          id="outlined-helperText"
          label="Size (Acres)"
          type="number"
          defaultValue={farm?.size}
          onChange={(e) => {setSize(e.target.value); setEdited(true)}}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
      />
      <TextField
          id="outlined-helperText"
          label="USDA Growing Zone"
          defaultValue={farm?.growingZone}
          onChange={(e) => {setGrowZone(e.target.value); setEdited(true)}}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
      />
      </div>
      <div>
      <InputLabel id="select-clim">Climate</InputLabel>
      <Select
          labelId="select-clim"
          id="climate"
          variant="outlined"
          fullWidth
          value={climate}
          onChange={(e) => {setClimate(e.target.value); setEdited(true)}}
      >
          {climates.map((climate, index) => (
              <MenuItem key={index} value={climate}>
                  {climate}
              </MenuItem>
          ))}
      </Select>
      </div>
      </Box>

      {edited && <Button variant='contained' onClick={handleSave}>Save Edits</Button>}

      
      <h1>Fields</h1>
      <NewFieldPopUp farmId={farm?.id}/>
      <br/>
      <FieldList data={fields}/>
    </div>
  );
}

export default Farm;