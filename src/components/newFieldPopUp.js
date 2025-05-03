import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    TextField
} from '@mui/material';
import CloseIcon from "@mui/icons-material/Close"
import AddRoundedIcon from "@mui/icons-material/AddRounded";

function NewFieldPopUp({farmId}) {
    const [open, setOpen] = useState(false);
    const [fieldName, setFieldName] = useState('');
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        //reset all form fields
        setFieldName('');
    };

    const handleCreateField = async () => {
      setOpen(false);
      const result = await fetch(`http://localhost:8080/farms/${farmId}/field`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },

          body: JSON.stringify({
              fieldName: fieldName
          })
      });

      return (window.location.assign(`http://localhost:3000/Farm`))
    }

    return (
        <div>
            <Button variant="contained" startIcon={<AddRoundedIcon/>} onClick={handleClickOpen}>
                Add Field
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>
                    Add a new field to your farm
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
                    <div>
                        <TextField
                            required
                            label="Field Name"
                            variant="outlined"
                            value={fieldName}
                            onChange={(e) => setFieldName(e.target.value)}
                            fullWidth
                        />
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateField} variant="contained" color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewFieldPopUp;