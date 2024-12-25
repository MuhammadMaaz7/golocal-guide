import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // Importing Chart.js

const ChartComponent = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      
      // Destroy the previous chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // New sample data: guide fee per hour trend (over 12 months)
      const feeData = [15, 17, 18, 16, 20, 22, 23, 21, 25, 28, 30, 33]; // Sample fees per hour data
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      chartInstanceRef.current = new Chart(ctx, {
        type: 'line', // Line chart for trend visualization
        data: {
          labels: months, // X-axis labels (months)
          datasets: [{
            label: 'Guide Fee Per Hour (USD)',
            data: feeData, // Data points representing fee per hour over the months
            borderColor: 'rgba(34, 197, 94, 1)', // Greenish color for the trend line
            backgroundColor: 'rgba(34, 197, 94, 0.2)', // Light green for the background fill
            tension: 0.4, // Smooth line curve
            borderWidth: 3,
            pointBackgroundColor: 'rgba(34, 197, 94, 1)',
            pointRadius: 5,
          }],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false, // Start y-axis from the lowest fee value
              ticks: {
                stepSize: 5, // Step size for y-axis (e.g., increase by 5)
              },
            },
          },
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
        },
      });
    }

    // Cleanup chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures this only runs on mount/unmount

  return <canvas ref={chartRef}></canvas>;
};

export default ChartComponent;
