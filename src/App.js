import './App.css';
import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/navbar'
import Dashboard from './Dashboard';
import Crops from './Crops'
import Resources from './Resources';
import Farm from './Farm'
import Field from './Field'

function App() {
  return (
    <Router>
        <Navbar user='Lucy'/>
        <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/Crops" element={<Crops />} />
            <Route exact path="/Farm" element={<Farm/>} />
            <Route path="/Resources" element={<Resources />} />
            <Route path="/Field/:id" element={<Field />} />
        </Routes>
    </Router>
  );
}

export default App;
