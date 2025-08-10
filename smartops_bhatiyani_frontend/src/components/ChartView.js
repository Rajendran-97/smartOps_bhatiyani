import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartView({ data }) {
  const chartData = {
    labels: data.map((d) => d.month),
    datasets: [
      {
        label: 'Monthly Revenue',
        data: data.map((d) => d.value),
        backgroundColor: '#008080'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Revenue Overview',
        font: { size: 18 }
      },
      legend: {
        display: false
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}
