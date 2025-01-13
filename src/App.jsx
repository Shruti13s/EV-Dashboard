import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Dashboard from './components/Dashboard';
import ElectricRangeHistogram from './components/ElectricRangeHistogram';
import VehicleCountByState from './components/VehicleStateCount';
import VehicleCountByMake from './components/VehicleMakeCount';
import VehicleTypeDistribution from './components/ElectricVehicleType';
import VehicleCountByMake2 from './components/VehicleCountByMake';
import "./App.css"
const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/vedant-patil-mapup/analytics-dashboard-assessment/refs/heads/main/data-to-visualize/Electric_Vehicle_Population_Data.csv')
      .then(response => response.text())  
      .then(csvData => {
        Papa.parse(csvData, {
          header: true,  
          dynamicTyping: true,  
          complete: (result) => {
             setData(result.data);  
          },
          error: (error) => {
            console.error('Error parsing CSV:', error); 
          }
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);  
      });
     
  }, []); 

  const Header = () => {
    return  <header className="header">
    <div className="header-content">
      <div className="header-title">
        <h1>Electric Vehicle Dashboard</h1>
        <h3 className="subtitle">Your insights into electric vehicle trends and data</h3>
      </div>
      <div className="header-icon">
        <img 
          src="https://images.hindustantimes.com/auto/img/2024/09/09/1600x900/World_EV_Day_1725852183267_1725852184506.png" 
          alt="Electric Vehicle Icon" 
          className="header-img" 
        />
      </div>
    </div>
  </header>
  }

  return (
    <div className="App">
     {Header()}
      <div className="grid-container">
        <Dashboard data={data} />
        <ElectricRangeHistogram data={data} />
        <VehicleTypeDistribution data={data} />
        <VehicleCountByState data={data} />
        <VehicleCountByMake data={data} />
        <VehicleCountByMake2 data={data} />
      </div>
    </div>
  );
};

export default App;
