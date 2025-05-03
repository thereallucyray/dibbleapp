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
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';

function EditCropPopUp({fieldId, crop}) {
    const [open, setOpen] = useState(false);
    const [Yield, setYield] = useState(0);
    const [Notes, setNotes] = useState('');
    const [Terminated, setTerminated] = useState(false);

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
    };

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

      return (window.location.assign(`http://localhost:3000/Crops`))
    }

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
                  <Checkbox
                    id="terminated-checkbox"
                    checked={Terminated} // if the checkbox is checked (or not)
                    onChange={() => setTerminated(!Terminated)} // toggles the checked state
                    label="Terminated?"
                  />
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