import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const VehicleCountByMake2 = ({ data }) => {
  const filteredData = data.filter(item => item.State && item.State !== 'undefined');

  const stateMakeCount = filteredData.reduce((acc, item) => {
    const state = item.State;
    const make = item.Make;

    if (!acc[state]) acc[state] = {}; 
    acc[state][make] = (acc[state][make] || 0) + 1; 

    return acc;
  }, {});


  const states = Object.keys(stateMakeCount); 
  const makes = [...new Set(filteredData.map(item => item.Make))]; 

  const chartData = {
    labels: states,
    datasets: makes.map(make => ({
      label: make,
      data: states.map(state => stateMakeCount[state][make] || 0),
      backgroundColor: getRandomColor(), 
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return tooltipItem.raw + ' vehicles';
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true, 
      },
      y: {
        stacked: true, 
      },
    },
  };

  
  function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  }

  return (
    <div>
      <h2>Vehicle Count by Make (Stacked Bar Chart)</h2>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};

export default VehicleCountByMake2;
