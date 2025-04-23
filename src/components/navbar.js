import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import YardIcon from '@mui/icons-material/Yard';

const pages = ['Dashboard', 'My Farm', 'My Crops', 'Resources'];

function Navbar({user}) {
  const handleClickDashboard = () => {
    window.location.assign(`http://localhost:3000/`);
  };

  const handleClickCrops= () => {
    window.location.assign(`http://localhost:3000/Crops`);
  };

  const handleClickFarm= () => {
    window.location.assign(`http://localhost:3000/Farm`);
  };

  const handleClickResources= () => {
    window.location.assign(`http://localhost:3000/Resources`);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#0C3100" }} style={{ marginBottom: '20px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <YardIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key='Dashboard'
                onClick={handleClickDashboard}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Dashboard
              </Button>
              <Button
                key='Farm'
                onClick={handleClickFarm}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                My Farm
              </Button>
              <Button
                key='Crops'
                onClick={handleClickCrops}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                My Crops
              </Button>
              <Button
                key='Resources'
                onClick={handleClickResources}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Resources
              </Button>
            
          </Box>
          <div>Hello, {user}</div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
