import './App.css';
import Navbar from './components/navbar'
import FarmCard from './components/farmcard'
import { Grid, Item } from '@mui/material';

function App() {
  const userId = "d8f9585a-4478-4282-b896-82e595f54e32"
  return (
    <div className="App">
      <Navbar user='Lucy'/>

      <Grid container spacing={3}>
        <Grid size={6}>
          <FarmCard userId={userId}/>
        </Grid>
        <Grid size='grow'>
          {/* <FarmCard user='Lucy'/> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
