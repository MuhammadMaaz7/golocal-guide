import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RatingsGraph = ({ rating, totalReviews }) => {
  const chartRef = useRef(null);

  // Ensure the chart is rendered only when the ref is available
  useEffect(() => {
    if (chartRef.current) {
      console.log('Chart is ready');
    }
  }, [chartRef]);

  // Data for the graph (replace this with real data later)
  const data = {
    labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
    datasets: [
      {
        label: 'Number of Reviews',
        data: [5, 10, 15, 20, 50], // Replace this with actual data
        backgroundColor: ['#ff4d4f', '#ffa940', '#ffc53d', '#bae637', '#73d13d'],
        borderWidth: 1,
      },
    ],
  };

  // Options for the graph
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} Reviews`,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-xl font-semibold text-blue-700 mb-4">Ratings Overview</h4>
      {/* Add chart only when chartRef is set */}
      {chartRef.current ? (
        <Bar ref={chartRef} data={data} options={options} />
      ) : (
        <p>Loading chart...</p>
      )}
      <p className="mt-4 text-gray-600">
        Average Rating: <strong>{rating.toFixed(1)}</strong> / 5 (
        <strong>{totalReviews}</strong> total reviews)
      </p>
    </div>
  );
};

export default RatingsGraph;
