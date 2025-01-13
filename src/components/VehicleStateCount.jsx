import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const VehicleCountByState = ({ data }) => {
  const filteredData = data.filter(item => item.State && item.State !== 'undefined');

  const stateCount = filteredData.reduce((acc, item) => {
    const state = item.State;
    acc[state] = (acc[state] || 0) + 1;
    return acc;
  }, {});

  const states = Object.keys(stateCount);
  const counts = Object.values(stateCount);

  const chartData = {
    labels: states,
    datasets: [
      {
        label: 'Vehicle Count by State',
        data: counts,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Vehicle Count by State</h2>
      <Chart type="bar" data={chartData} />
    </div>
  );
};

export default VehicleCountByState;
