import React from 'react';
import { Bar } from 'react-chartjs-2'; 
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const VehicleCountByMake = ({ data }) => {
  const makeCount = data.reduce((acc, item) => {
    const make = item.Make;
    acc[make] = (acc[make] || 0) + 1;
    return acc;
  }, {});

  const makes = Object.keys(makeCount);
  const counts = Object.values(makeCount); 

  const chartData = {
    labels: makes,
    datasets: [
      {
        label: 'Vehicle Count by Make',
        data: counts,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Vehicle Count by Make</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default VehicleCountByMake;
