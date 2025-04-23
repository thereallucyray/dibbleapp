import './App.css';
import FarmCard from './components/farmcard'
import WeatherCard from './components/weathercard';
import { Grid, Item } from '@mui/material';

function Dashboard() {
  const userId = "d8f9585a-4478-4282-b896-82e595f54e32"
  return (
      <div className="App">
        <Grid container spacing={3}>
          <Grid size={6}>
            <FarmCard userId={userId}/>
          </Grid>
          <Grid size='grow'>
            <WeatherCard/>
          </Grid>
        </Grid>
      </div>
  );
}

export default Dashboard;
