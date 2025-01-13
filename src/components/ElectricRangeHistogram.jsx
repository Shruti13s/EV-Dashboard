import React from 'react';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ElectricRangeHistogram = ({ data }) => {
  const electricRanges = data.map(item => parseFloat(item['Electric Range']) || 0);

  const binCount = 10;
  const maxRange = Math.max(...electricRanges);
  const minRange = Math.min(...electricRanges);
  const binSize = (maxRange - minRange) / binCount;

  const bins = Array(binCount).fill(0);
  electricRanges.forEach(range => {
    const binIndex = Math.floor((range - minRange) / binSize);
    if (binIndex < bins.length) {
      bins[binIndex]++;
    }
  });

  const chartData = {
    labels: Array.from({ length: binCount }, (_, i) => `${Math.round(minRange + binSize * i)} - ${Math.round(minRange + binSize * (i + 1))} miles`),
    datasets: [
      {
        label: 'Electric Range Distribution',
        data: bins,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Electric Range Distribution</h2>
      <Chart type="bar" data={chartData} />
    </div>
  );
};

export default ElectricRangeHistogram;
