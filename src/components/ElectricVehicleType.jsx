import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const VehicleTypeDistribution = ({ data }) => {
  const filteredData = data.filter(item => item['Electric Vehicle Type'] && item['Electric Vehicle Type'] !== 'undefined');
  const vehicleTypeCount = filteredData.reduce((acc, item) => {
    const vehicleType = item['Electric Vehicle Type'];
    acc[vehicleType] = (acc[vehicleType] || 0) + 1;
    return acc;
  }, {});
  const vehicleTypes = Object.keys(vehicleTypeCount);
  const counts = Object.values(vehicleTypeCount);
  const chartData = {
    labels: vehicleTypes,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    animation: {
      animateScale: true,
    },
  };
  return (
    <div>
      <h2>Electric Vehicle Type Distribution</h2>
      <div style={{ position: 'relative', width: '80%', height: '300px' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default VehicleTypeDistribution;
