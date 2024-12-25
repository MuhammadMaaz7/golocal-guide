import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; // or the appropriate import for your chart library

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

      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: 'line',  // Line chart to show trends over months
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months of the year
          datasets: [{
            label: 'Number of Guides Booked',
            data: [3, 7, 5, 8, 6, 10, 12, 9, 14, 13, 11, 15], // Example data for the number of guides booked each month
            borderColor: 'rgba(34, 193, 195, 1)', // Greenish border color
            backgroundColor: 'rgba(34, 193, 195, 0.2)', // Light greenish fill
            borderWidth: 2,
            tension: 0.3, // Makes the line smooth
            pointRadius: 5, // Increases the size of the points
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true, // Starts y-axis at 0
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
