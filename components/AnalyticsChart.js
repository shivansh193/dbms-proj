import React, { useEffect, useRef } from 'react';

const AnalyticsChart = ({ type = 'line', data, options }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new window.Chart(ctx, {
        type: type,
        data: data,
        options: options
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default AnalyticsChart;