import './App.css';
import { Grid, Card, CardContent, Link, Typography } from '@mui/material';


function Resources() {
  

  return (
      <div className="Resources">
          <Grid size='grow'>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <Link href="https://www.plantmaps.com/koppen-climate-classification-map-united-states.php">
                  <h2>What's my climate?</h2>
                </Link>
                <Typography>
                  Use this interactive map to determine which Koppen climate category best describes your region. 
                  Climate groups are based on seasonal rainfall and average temperatures.
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <Link href="https://planthardiness.ars.usda.gov/">
                  <h2>What's my USDA Growing Zone?</h2>
                </Link>
                <Typography>
                  Use this interactive map to determine which USDA growing zone your farm lies in, based on your zip code. 
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <Link href="https://www.almanac.com/gardening/planting-calendar">
                  <h2>Farmer's Almanac Planting Calendar</h2>
                </Link>
                <Typography>
                  Get recommendations for when to plant your vegetables based on your City, State, or Zipcode. 
                  Planting your crops at climatically optimal times can reduce the need for external inputs and improve yields.
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <h2>Soil help!</h2>
                <Link href="https://www.qld.gov.au/environment/land/management/soil/soil-properties/texture#:~:text=Soil%20texture%20(such%20as%20loam,made%20up%20largely%20of%20clay.">
                  <h3>Soil Texture</h3>
                </Link>
                <Link href="https://mandako.com/agripedia/what-is-soil-structure/">
                  <h3>Soil Structure</h3>
                </Link>
                <Link href="https://www.umass.edu/agriculture-food-environment/landscape/fact-sheets/measuring-soil-moisture">
                  <h3>Soil Moisture</h3>
                </Link>
                <Link href="https://extensionpubs.unl.edu/publication/g2283/na/html/view">
                  <h3>Soil Organic Matter</h3>
                </Link>
                <Typography>
                  
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <Link href="https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2015.01020/full">
                  <h2>Crop Allelopathy</h2>
                </Link>
                <Typography>
                  Intercropping and increasing crop diversity has the potential for positive, allelopathic interactions. 
                  These things can aid in pest and weed control, without the need for chemical pesticides and insecticides.
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <Link href="https://www.epa.gov/safepestcontrol/integrated-pest-management-ipm-principles">
                  <h2>Integrated Pest Management</h2>
                </Link>
                <Typography>
                  Reduce the need for chemical pesticides with early monitoring and prevention measures, as described by the EPA.
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <Link href="https://www.vatican.va/content/francesco/en/encyclicals/documents/papa-francesco_20150524_enciclica-laudato-si.html">
                  <h2>Laudato Si'</h2>
                </Link>
                <Typography>
                  Read a letter written by Pope Francis, urging Christians and people of good will to move towards environmentally sustainable and 
                  socially equitable and just food systems.
                </Typography>
              </CardContent>
            </Card>
            <br/>
            <Card style={{backgroundColor: "#E5F3CE"}}>
              <CardContent>
                <Link href="https://farmandranchfreedom.org/">
                  <h2>Farm and Ranch Freedom Alliance</h2>
                </Link>
                <Typography>
                  Stay informed on the issues affecting your farms and your food, while building skills and resources to make change at the state and national legislative level.
                </Typography>
              </CardContent>
            </Card>
            <br/>
          </Grid>
      </div>
  );
}

export default Resources;
