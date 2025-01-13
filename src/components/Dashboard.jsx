import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const makeModelCount = (data) => {
  const count = {};
  data.forEach(item => {
    const key = `${item.Make} ${item.Model}`;
    count[key] = (count[key] || 0) + 1;
  });
  return count;
};

const Dashboard = ({ data }) => {
  const makeModelData = makeModelCount(data);
  const chartData = {
    labels: Object.keys(makeModelData),
    datasets: [
      {
        label: 'Number of Vehicles',
        data: Object.values(makeModelData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Vehicles by Make/Model</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;